// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package generator

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"

	"github.com/blang/semver"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/ksonnet"
)

var (
	// ksonnetEmitter is the function which emits the ksonnet standard library.
	ksonnetEmitter = ksonnet.GenerateLib
	// revision is the current revision of ksonnet based on the git ref.
	revision string
)

// KsonnetLib is the ksonnet standard library for a version of swagger.
type KsonnetLib struct {
	// K is ksonnet extensions.
	K []byte
	// K is the generated ksonnet library.
	K8s []byte
	// Swagger is the swagger JSON used to generate the library.
	Swagger []byte
	// Version is the API version of the swagger.
	Version string
}

// Ksonnet generates the ksonnet standard library or returns an error if there was
// a problem.
func Ksonnet(swaggerData []byte) (*KsonnetLib, error) {
	f, err := ioutil.TempFile("", "")
	if err != nil {
		return nil, err
	}

	defer os.Remove(f.Name())

	var apiSpec kubespec.APISpec
	if err = json.Unmarshal(swaggerData, &apiSpec); err != nil {
		return nil, err
	}

	ver, err := semver.Make(strings.TrimPrefix(apiSpec.Info.Version, "v"))
	if err != nil {
		return nil, err
	}

	_, err = f.Write(swaggerData)
	if err != nil {
		return nil, err
	}

	if err = f.Close(); err != nil {
		return nil, err
	}

	astMin := semver.MustParse("1.8.0")
	if ver.LT(astMin) {
		return textBuilder(&apiSpec, swaggerData)
	}

	return astBuilder(f.Name(), swaggerData)
}

func astBuilder(input string, swaggerData []byte) (*KsonnetLib, error) {
	lib, err := ksonnetEmitter(input)
	if err != nil {
		return nil, err
	}

	kl := &KsonnetLib{
		K:       lib.Extensions,
		K8s:     lib.K8s,
		Swagger: swaggerData,
		Version: lib.Version,
	}

	return kl, nil
}

func textBuilder(apiSpec *kubespec.APISpec, swaggerData []byte) (*KsonnetLib, error) {
	bK, bK8s, err := ksonnet.Emit(apiSpec, &revision, &revision)
	if err != nil {
		return nil, err
	}

	kl := &KsonnetLib{
		K:       bK,
		K8s:     bK8s,
		Swagger: swaggerData,
		Version: apiSpec.Info.Version,
	}

	return kl, nil
}

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

package template

import (
	"fmt"
	"os"
	"strings"

	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"

	jsonnet "github.com/google/go-jsonnet"
	"github.com/ksonnet/ksonnet/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

type Expander struct {
	EnvJPath    []string
	FlagJpath   []string
	ExtVars     []string
	ExtVarFiles []string
	TlaVars     []string
	TlaVarFiles []string
	ExtCodes    []string

	Resolver   string
	FailAction string

	fs afero.Fs
}

func NewExpander(fs afero.Fs) Expander {
	if fs == nil {
		fs = afero.NewOsFs()
	}

	return Expander{
		fs: fs,
	}
}

// Expand expands paths to a slice of v1 Unstructured objects.
func (spec *Expander) Expand(paths []string) ([]*unstructured.Unstructured, error) {
	vm, err := spec.jsonnetVM()
	if err != nil {
		return nil, errors.Wrap(err, "initialize jsonnet VM")
	}

	res := []*unstructured.Unstructured{}
	for _, path := range paths {
		objs, err := utils.Read(spec.fs, vm, path)
		if err != nil {
			return nil, errors.Wrapf(err, "unable to read %s", path)
		}
		res = append(res, utils.FlattenToV1(objs)...)
	}

	return res, nil
}

// JsonnetVM constructs a new jsonnet.VM, according to command line
// flags
func (spec *Expander) jsonnetVM() (*jsonnet.VM, error) {
	vm := jsonnet.MakeVM()
	importer := jsonnet.FileImporter{
		JPaths: []string{},
	}

	for _, p := range spec.EnvJPath {
		log.Debugln("Adding jsonnet search path", p)
		importer.JPaths = append(importer.JPaths, p)
	}

	for _, p := range spec.FlagJpath {
		log.Debugln("Adding jsonnet search path", p)
		importer.JPaths = append(importer.JPaths, p)
	}

	vm.Importer(&importer)

	for _, extvar := range spec.ExtVars {
		kv := strings.SplitN(extvar, "=", 2)
		switch len(kv) {
		case 1:
			v, present := os.LookupEnv(kv[0])
			if present {
				vm.ExtVar(kv[0], v)
			} else {
				return nil, fmt.Errorf("Missing environment variable: %s", kv[0])
			}
		case 2:
			vm.ExtVar(kv[0], kv[1])
		}
	}

	for _, extvar := range spec.ExtVarFiles {
		kv := strings.SplitN(extvar, "=", 2)
		if len(kv) != 2 {
			return nil, fmt.Errorf("Failed to parse ext var files: missing '=' in %s", extvar)
		}
		v, err := afero.ReadFile(spec.fs, kv[1])
		if err != nil {
			return nil, err
		}
		vm.ExtVar(kv[0], string(v))
	}

	for _, tlavar := range spec.TlaVars {
		kv := strings.SplitN(tlavar, "=", 2)
		switch len(kv) {
		case 1:
			v, present := os.LookupEnv(kv[0])
			if present {
				vm.TLAVar(kv[0], v)
			} else {
				return nil, fmt.Errorf("Missing environment variable: %s", kv[0])
			}
		case 2:
			vm.TLAVar(kv[0], kv[1])
		}
	}

	for _, tlavar := range spec.TlaVarFiles {
		kv := strings.SplitN(tlavar, "=", 2)
		if len(kv) != 2 {
			return nil, fmt.Errorf("Failed to parse tla var files: missing '=' in %s", tlavar)
		}
		v, err := afero.ReadFile(spec.fs, kv[1])
		if err != nil {
			return nil, err
		}
		vm.TLAVar(kv[0], string(v))
	}

	for _, extcode := range spec.ExtCodes {
		kv := strings.SplitN(extcode, "=", 2)
		switch len(kv) {
		case 1:
			v, present := os.LookupEnv(kv[0])
			if present {
				vm.ExtCode(kv[0], v)
			} else {
				return nil, fmt.Errorf("Missing environment variable: %s", kv[0])
			}
		case 2:
			vm.ExtCode(kv[0], kv[1])
		}
	}

	resolver, err := spec.buildResolver()
	if err != nil {
		return nil, err
	}
	utils.RegisterNativeFuncs(vm, resolver)

	return vm, nil
}

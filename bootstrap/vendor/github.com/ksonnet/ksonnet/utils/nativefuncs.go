// Copyright 2017 The kubecfg authors
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

package utils

import (
	"bytes"
	"encoding/json"
	"io"
	"regexp"

	jsonnet "github.com/google/go-jsonnet"
	"github.com/google/go-jsonnet/ast"
	"k8s.io/apimachinery/pkg/util/yaml"
)

func resolveImage(resolver Resolver, image string) (string, error) {
	n, err := ParseImageName(image)
	if err != nil {
		return "", err
	}

	if err := resolver.Resolve(&n); err != nil {
		return "", err
	}

	return n.String(), nil
}

// RegisterNativeFuncs adds kubecfg's native jsonnet functions to provided VM
func RegisterNativeFuncs(vm *jsonnet.VM, resolver Resolver) {
	// NB: libjsonnet native functions can only pass primitive
	// types, so some functions json-encode the arg.  These
	// "*FromJson" functions will be replaced by regular native
	// version when libjsonnet is able to support this.

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "parseJson",
			Params: ast.Identifiers{"json"},
			Func: func(dataString []interface{}) (res interface{}, err error) {
				data := []byte(dataString[0].(string))
				err = json.Unmarshal(data, &res)
				return
			},
		})

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "parseYaml",
			Params: ast.Identifiers{"yaml"},
			Func: func(dataString []interface{}) (interface{}, error) {
				data := []byte(dataString[0].(string))
				ret := []interface{}{}
				d := yaml.NewYAMLToJSONDecoder(bytes.NewReader(data))
				for {
					var doc interface{}
					if err := d.Decode(&doc); err != nil {
						if err == io.EOF {
							break
						}
						return nil, err
					}
					ret = append(ret, doc)
				}
				return ret, nil
			},
		})

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "resolveImage",
			Params: ast.Identifiers{"image"},
			Func: func(image []interface{}) (interface{}, error) {
				return resolveImage(resolver, image[0].(string))
			},
		})

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "escapeStringRegex",
			Params: ast.Identifiers{"str"},
			Func: func(s []interface{}) (interface{}, error) {
				return regexp.QuoteMeta(s[0].(string)), nil
			},
		})

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "regexMatch",
			Params: ast.Identifiers{"regex", "string"},
			Func: func(s []interface{}) (interface{}, error) {
				return regexp.MatchString(s[0].(string), s[1].(string))
			},
		})

	vm.NativeFunction(
		&jsonnet.NativeFunction{
			Name:   "regexSubst",
			Params: ast.Identifiers{"regex", "src", "repl"},
			Func: func(data []interface{}) (interface{}, error) {
				regex, src, repl := data[0].(string), data[1].(string), data[2].(string)

				r, err := regexp.Compile(regex)
				if err != nil {
					return "", err
				}
				return r.ReplaceAllString(src, repl), nil
			},
		})
}

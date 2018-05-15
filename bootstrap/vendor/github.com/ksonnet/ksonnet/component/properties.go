// Copyright 2018 The ksonnet authors
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

package component

import (
	"sort"
	"strings"

	"github.com/pkg/errors"
)

// PropertyPath contains a property path.
type PropertyPath struct {
	Path  []string
	Value interface{}
}

// Properties are document properties
type Properties map[interface{}]interface{}

// Name extract name or generateName from metadata. If either are not found,
// it returns an error.
func (p Properties) Name() (string, error) {
	i, ok := p["metadata"]
	if !ok {
		return "", errors.New("properties does not have metadata")
	}

	metadata, ok := i.(map[interface{}]interface{})
	if !ok {
		return "", errors.New("metadata is not an object")
	}

	v, ok := metadata["name"]
	if ok {
		var name string
		name, ok = v.(string)
		if !ok {
			return "", errors.New("name was not a string")
		}
		return sanitizeName(name), nil
	}

	v, ok = metadata["generateName"]
	if ok {
		generateName, ok := v.(string)
		if !ok {
			return "", errors.New("generateName was not a string")
		}
		return sanitizeName(string(generateName)), nil
	}

	return "", errors.New("could not find name or generateName in properties")
}

func sanitizeName(in string) string {
	return strings.Replace(in, ".", "_", -1)
}

// Paths returns a list of paths in properties.
func (p Properties) Paths(gvk GVK) []PropertyPath {
	ch := make(chan PropertyPath)

	go func() {
		g := gvk.Group()

		base := append(g, gvk.Version, gvk.Kind)
		iterateMap(ch, base, p)
		close(ch)
	}()

	var out []PropertyPath
	for pr := range ch {
		out = append(out, pr)
	}

	return out
}

func iterateMap(ch chan PropertyPath, base []string, m map[interface{}]interface{}) {
	localBase := make([]string, len(base))
	copy(localBase, base)

	var keys []interface{}
	for k := range m {
		keys = append(keys, k)
	}

	sort.SliceStable(keys, func(i, j int) bool {
		a := keys[i].(string)
		b := keys[j].(string)

		return a < b
	})

	for i := range keys {
		name := keys[i].(string)

		switch t := m[name].(type) {
		default:
			ch <- PropertyPath{
				Path: append(localBase, name),
			}
		case map[interface{}]interface{}:
			newBase := append(localBase, name)
			iterateMap(ch, newBase, t)
		}
	}
}

// Value returns the value at a path.
func (p Properties) Value(path []string) (interface{}, error) {
	return valueSearch(path, p)
}

func valueSearch(path []string, m map[interface{}]interface{}) (interface{}, error) {
	if len(path) > 0 && path[0] == "mixin" {
		return valueSearch(path[1:], m)
	}

	var keys []interface{}
	for k := range m {
		keys = append(keys, k)
	}

	sort.SliceStable(keys, func(i, j int) bool {
		a := keys[i].(string)
		b := keys[j].(string)

		return a < b
	})

	for i := range keys {
		name := keys[i].(string)
		if name == path[0] {

			switch t := m[name].(type) {
			default:
				return nil, errors.Errorf("can't handle type %T", t)
			case map[interface{}]interface{}:
				if len(path) == 1 {
					return t, nil
				}
				return valueSearch(path[1:], t)
			case string, int, []interface{}:
				return t, nil
			}
		}

	}

	return nil, errors.Errorf("unable to find %s", strings.Join(path, "."))
}

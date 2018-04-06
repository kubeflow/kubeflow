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

package params

import (
	"bytes"
	"encoding/json"
	"fmt"
	"reflect"
	"regexp"
	"strconv"
	"strings"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	jsonnetutil "github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
)

// Set sets a param value.
func Set(path []string, paramsData, key string, value interface{}, root string) (string, error) {
	props, err := ToMap(key, paramsData, root)
	if err != nil {
		props = make(map[string]interface{})
	}

	changes := make(map[string]interface{})
	cur := changes

	for i, k := range path {
		if i == len(path)-1 {
			cur[k] = value
		} else {
			if _, ok := cur[k]; !ok {
				m := make(map[string]interface{})
				cur[k] = m
				cur = m
			}
		}
	}

	if err = mergeMaps(props, changes, nil); err != nil {
		return "", err
	}

	return Update([]string{root, key}, paramsData, props)
}

// Delete deletes a param value.
func Delete(path []string, paramsData, key, root string) (string, error) {
	props, err := ToMap(key, paramsData, root)
	if err != nil {
		return "", err
	}

	cur := props

	for i, k := range path {
		if i == len(path)-1 {
			delete(cur, k)
		} else {
			m, ok := cur[k].(map[string]interface{})
			if !ok {
				return "", errors.New("path not found")
			}

			cur = m
		}
	}

	updatePath := []string{root}
	if key != "" {
		updatePath = []string{root, key}
	}

	return Update(updatePath, paramsData, props)
}

// Update updates a params file with the params for a component.
func Update(path []string, src string, params map[string]interface{}) (string, error) {
	obj, err := jsonnetutil.Parse("params.libsonnet", src)
	if err != nil {
		return "", errors.Wrap(err, "parse jsonnet")
	}

	paramsObject, err := nm.KVFromMap(params)
	if err != nil {
		return "", errors.Wrap(err, "convert params to object")
	}

	if err := jsonnetutil.Set(obj, path, paramsObject.Node()); err != nil {
		return "", errors.Wrap(err, "update params")
	}

	var buf bytes.Buffer
	if err := printer.Fprint(&buf, obj); err != nil {
		return "", errors.Wrap(err, "rebuild params")
	}

	return buf.String(), nil
}

// ToMap converts a component's params to a map.
func ToMap(componentName, src, root string) (map[string]interface{}, error) {
	obj, err := jsonnetutil.Parse("params.libsonnet", src)
	if err != nil {
		return nil, errors.Wrap(err, "parse jsonnet")
	}

	path := make([]string, 0)
	if root != "" {
		path = append(path, root)
	}

	if componentName != "" {
		path = append(path, componentName)
	}

	child, err := jsonnetutil.FindObject(obj, path)
	if err != nil {
		return nil, errors.Wrapf(err, "find child paths for %s", strings.Join(path, "."))
	}

	m, err := findValues(child)
	if err != nil {
		return nil, err
	}

	if componentName == "" {
		return m[root].(map[string]interface{}), nil
	}

	paramsMap, ok := m[componentName].(map[string]interface{})
	if !ok {
		return nil, errors.Errorf("could not find %q in components", componentName)
	}

	return paramsMap, nil
}

var (
	reFloat = regexp.MustCompile(`^([0-9]+[.])?[0-9]$`)
	reInt   = regexp.MustCompile(`^[1-9]{1}[0-9]?$`)
	reArray = regexp.MustCompile(`^\[`)
	reMap   = regexp.MustCompile(`^\{`)
)

// DecodeValue decodes a string to an interface value.
func DecodeValue(s string) (interface{}, error) {
	if s == "" {
		return nil, errors.New("value was blank")
	}

	switch {
	case reInt.MatchString(s):
		return strconv.Atoi(s)
	case reFloat.MatchString(s):
		return strconv.ParseFloat(s, 64)
	case strings.ToLower(s) == "true" || strings.ToLower(s) == "false":
		return strconv.ParseBool(s)
	case reArray.MatchString(s):
		var array []interface{}
		if err := json.Unmarshal([]byte(s), &array); err != nil {
			return nil, errors.Errorf("array value is badly formatted: %s", s)
		}
		return array, nil
	case reMap.MatchString(s):
		var obj map[string]interface{}
		if err := json.Unmarshal([]byte(s), &obj); err != nil {
			return nil, errors.Errorf("map value is badly formatted: %s", s)
		}
		return obj, nil
	default:
		return s, nil
	}
}

func findValues(obj *astext.Object) (map[string]interface{}, error) {
	m := make(map[string]interface{})

	for i := range obj.Fields {
		id, err := jsonnetutil.FieldID(obj.Fields[i])
		if err != nil {
			return nil, err
		}

		switch t := obj.Fields[i].Expr2.(type) {
		default:
			return nil, errors.Errorf("unknown value type %T", t)
		case *ast.LiteralString, *ast.LiteralBoolean, *ast.LiteralNumber:
			v, err := nodeValue(t)
			if err != nil {
				return nil, err
			}
			m[id] = v
		case *ast.Array:
			array, err := arrayValues(t)
			if err != nil {
				return nil, err
			}
			m[id] = array
		case *astext.Object:
			child, err := findValues(t)
			if err != nil {
				return nil, err
			}

			m[id] = child
		}

	}

	return m, nil
}

func nodeValue(node ast.Node) (interface{}, error) {
	switch t := node.(type) {
	default:
		return nil, errors.Errorf("unknown value type %T", t)
	case *ast.LiteralString:
		return t.Value, nil
	case *ast.LiteralBoolean:
		return t.Value, nil
	case *ast.LiteralNumber:
		return t.Value, nil
	}
}

func arrayValues(array *ast.Array) ([]interface{}, error) {
	out := make([]interface{}, 0)
	for i := range array.Elements {
		v, err := nodeValue(array.Elements[i])
		if err != nil {
			return nil, errors.Errorf("arrays can't contain at %T", array.Elements[i])
		}

		out = append(out, v)
	}

	return out, nil
}

func mergeMaps(m1 map[string]interface{}, m2 map[string]interface{}, path []string) error {
	for k := range m2 {
		_, ok := m1[k]
		if ok {
			v1, isMap1 := m1[k].(map[string]interface{})
			v2, isMap2 := m2[k].(map[string]interface{})
			if isMap1 && isMap2 {
				err := mergeMaps(v1, v2, append(path, k))
				if err != nil {
					return err
				}
			} else if reflect.TypeOf(v1) == reflect.TypeOf(v2) {
				m1[k] = m2[k]
			} else {
				errorPath := append(path, k)
				return fmt.Errorf("not same types at %s", strings.Join(errorPath, "."))
			}
		} else {
			m1[k] = m2[k]
		}
	}

	return nil
}

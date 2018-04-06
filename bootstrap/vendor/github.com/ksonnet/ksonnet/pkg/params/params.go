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

var (
	convertObjectToMapFn = convertObjectToMap
	jsonnetFieldIDFn     = jsonnetutil.FieldID
	jsonnetFindObjectFn  = jsonnetutil.FindObject
	jsonnetParseFn       = jsonnetutil.Parse
	jsonnetPrinterFn     = printer.Fprint
	jsonnetSetFn         = jsonnetutil.Set
	nmKVFromMapFn        = nm.KVFromMap
	updateFn             = update
)

// SetInObject sets a value in an object. `root` will generally be either `components` or
// `global`. `key` is the component name.
func SetInObject(fieldPath []string, paramsData, key string, value interface{}, root string) (string, error) {
	props, err := ToMap(key, paramsData, root)
	if err != nil {
		props = make(map[string]interface{})
	}

	changes := make(map[string]interface{})
	cur := changes

	for i, k := range fieldPath {
		if i == len(fieldPath)-1 {
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

	updatePath := []string{root}
	if key != "" {
		updatePath = []string{root, key}
	}

	return updateFn(updatePath, paramsData, props)
}

// DeleteFromObject deletes a value from an object. `root` will generally be either
// `components` or `global`. `key` is the component name.
func DeleteFromObject(fieldPath []string, paramsData, key, root string) (string, error) {
	props, err := ToMap(key, paramsData, root)
	if err != nil {
		return "", err
	}

	cur := props

	for i, k := range fieldPath {
		if i == len(fieldPath)-1 {
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

	return updateFn(updatePath, paramsData, props)
}

// update updates a params file with the params for a component.
func update(path []string, src string, params map[string]interface{}) (string, error) {
	obj, err := jsonnetParseFn("params.libsonnet", src)
	if err != nil {
		return "", errors.Wrap(err, "parse jsonnet")
	}

	paramsObject, err := nmKVFromMapFn(params)
	if err != nil {
		return "", errors.Wrap(err, "convert params to object")
	}

	if err := jsonnetSetFn(obj, path, paramsObject.Node()); err != nil {
		return "", errors.Wrap(err, "update params")
	}

	var buf bytes.Buffer
	if err := jsonnetPrinterFn(&buf, obj); err != nil {
		return "", errors.Wrap(err, "rebuild params")
	}

	return buf.String(), nil
}

// ToMap converts a component's params to a map.
func ToMap(componentName, src, root string) (map[string]interface{}, error) {
	obj, err := jsonnetParseFn("params.libsonnet", src)
	if err != nil {
		return nil, errors.Wrap(err, "parse jsonnet")
	}

	componentObject, err := componentParams(obj, componentName)
	if err != nil {
		return nil, err
	}

	m, err := convertObjectToMapFn(componentObject)
	if err != nil {
		return nil, err
	}

	if componentName == "" {
		return m[root].(map[string]interface{}), nil
	}

	paramsMap, ok := m[componentName].(map[string]interface{})
	if !ok {
		return nil, errors.Errorf("component %q params is not an object", componentName)
	}

	return paramsMap, nil
}

var (
	reFloat = regexp.MustCompile(`^[-+]?[0-9]*\.?[0-9]+$`)
	reInt   = regexp.MustCompile(`^([+-]?[1-9]\d*|0)$`)
	reArray = regexp.MustCompile(`^\[`)
	reMap   = regexp.MustCompile(`^\{`)
)

// DecodeValue decodes a string to an interface value.
// nolint: gocyclo
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

func convertObjectToMap(obj *astext.Object) (map[string]interface{}, error) {
	m := make(map[string]interface{})

	for i := range obj.Fields {
		id, err := jsonnetFieldIDFn(obj.Fields[i])
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
			child, err := convertObjectToMap(t)
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
		return DecodeValue(fmt.Sprint(t.Value))
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

func componentParams(node ast.Node, componentName string) (*astext.Object, error) {
	switch t := node.(type) {
	default:
		return nil, errors.Errorf("unknown params format: %T", t)
	case *astext.Object:
		if len(componentName) > 0 {
			path := []string{"components", componentName}
			if componentName == "" {
				// NOTE: this is module params, so return global
				path = []string{"global"}
			}

			return jsonnetFindObjectFn(t, path)
		}
		return t, nil
	case *ast.Local:
		root, ok := node.(*ast.Local)
		if !ok {
			return nil, errors.Wrap(errUnsupportedEnvParams, "root node should be a local")
		}

		body := root.Body
		l, err := findNamedLocal(root, "envParams")
		if err == nil {
			body = l.Binds[0].Body
		}

		var obj *astext.Object

		switch t := body.(type) {
		default:
			return nil, errors.Wrapf(errUnsupportedEnvParams, "unsupported object type %T", t)
		case *ast.Binary:
			obj, ok = t.Right.(*astext.Object)
			if !ok {
				return nil, errors.Wrapf(errUnsupportedEnvParams,
					"right side is %T of binary should be object", t.Right)
			}
		case *ast.ApplyBrace:
			obj, ok = t.Right.(*astext.Object)
			if !ok {
				return nil, errors.Wrapf(errUnsupportedEnvParams,
					"right side is %T of apply brace should be object", t.Right)
			}
		}

		return obj, nil
	}
}

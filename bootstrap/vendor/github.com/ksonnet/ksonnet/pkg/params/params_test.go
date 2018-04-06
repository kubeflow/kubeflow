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
	"io"
	"testing"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// withParamConfig allows tests to change the params package settings without
// affecting other tests. It resets the following variables:
// * findValuesFn
// * jsonnetFieldIDFn
// * jsonnetFindObjectFn
// * jsonnetParseFn
// * jsonnetPrinterFn
// * jsonnetSetFn
// * nmKVFromMapFn
// * updateFn
func withParamConfig(t *testing.T, fn func()) {
	ogConvertObjectToMapFn := convertObjectToMapFn
	ogJsonnetFieldIDFn := jsonnetFieldIDFn
	ogJsonnetFindObjectFn := jsonnetFindObjectFn
	ogJsonnetParseFn := jsonnetParseFn
	ogJsonnetPrinterFn := jsonnetPrinterFn
	ogJsonnetSetFn := jsonnetSetFn
	ogNmKVFromMapFn := nmKVFromMapFn
	ogUpdateFn := updateFn

	defer func() {
		convertObjectToMapFn = ogConvertObjectToMapFn
		jsonnetFieldIDFn = ogJsonnetFieldIDFn
		jsonnetFindObjectFn = ogJsonnetFindObjectFn
		jsonnetParseFn = ogJsonnetParseFn
		jsonnetPrinterFn = ogJsonnetPrinterFn
		jsonnetSetFn = ogJsonnetSetFn
		nmKVFromMapFn = ogNmKVFromMapFn
		updateFn = ogUpdateFn
	}()

	fn()
}

func Test_SetInObject(t *testing.T) {
	withParamConfig(t, func() {
		cases := []struct {
			name          string
			paramsData    string
			root          string
			componentName string
			fieldPath     []string
			value         interface{}
			updateFn      func([]string, string, map[string]interface{}) (string, error)
			isErr         bool
		}{
			{
				name:          "update existing field",
				paramsData:    test.ReadTestData(t, "params.libsonnet"),
				root:          "components",
				componentName: "guestbook-ui",
				fieldPath:     []string{"containerPort"},
				value:         8080,
				updateFn: func(sl []string, paramsData string, props map[string]interface{}) (string, error) {
					assert.Equal(t, []string{"components", "guestbook-ui"}, sl)

					m := map[string]interface{}{
						"containerPort": 8080,
						"image":         "gcr.io/heptio-images/ks-guestbook-demo:0.1",
						"name":          "guestbook-ui",
						"replicas":      1,
						"servicePort":   80,
						"type":          "ClusterIP",
					}
					assert.Equal(t, m, props)

					return paramsData, nil
				},
			},
			{
				name:          "set nested field",
				paramsData:    test.ReadTestData(t, "params.libsonnet"),
				root:          "components",
				componentName: "guestbook-ui",
				fieldPath:     []string{"nested", "field"},
				value:         "set",
				updateFn: func(sl []string, paramsData string, props map[string]interface{}) (string, error) {
					assert.Equal(t, []string{"components", "guestbook-ui"}, sl)

					m := map[string]interface{}{
						"containerPort": 80,
						"image":         "gcr.io/heptio-images/ks-guestbook-demo:0.1",
						"name":          "guestbook-ui",
						"replicas":      1,
						"servicePort":   80,
						"type":          "ClusterIP",
						"nested": map[string]interface{}{
							"field": "set",
						},
					}
					assert.Equal(t, m, props)

					return paramsData, nil
				},
			},

			{
				name:       "set component global style",
				paramsData: test.ReadTestData(t, "params.libsonnet"),
				root:       "global",
				fieldPath:  []string{"shared"},
				value:      "value",
				updateFn: func(sl []string, paramsData string, props map[string]interface{}) (string, error) {
					assert.Equal(t, []string{"global"}, sl)

					m := map[string]interface{}{
						"shared":  "value",
						"restart": false,
					}
					assert.Equal(t, m, props)

					return paramsData, nil
				},
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				updateFn = tc.updateFn

				_, err := SetInObject(tc.fieldPath, tc.paramsData, tc.componentName, tc.value, tc.root)
				if err != nil {
					require.Error(t, err)
					return
				}

				require.NoError(t, err)
			})
		}
	})
}

func Test_DeleteFromObject(t *testing.T) {
	withParamConfig(t, func() {
		cases := []struct {
			name          string
			paramsData    string
			root          string
			componentName string
			fieldPath     []string
			updateFn      func([]string, string, map[string]interface{}) (string, error)
			isErr         bool
		}{
			{
				name:          "delete existing field",
				paramsData:    test.ReadTestData(t, "params.libsonnet"),
				root:          "components",
				componentName: "guestbook-ui",
				fieldPath:     []string{"containerPort"},
				updateFn: func(sl []string, paramsData string, props map[string]interface{}) (string, error) {
					assert.Equal(t, []string{"components", "guestbook-ui"}, sl)

					m := map[string]interface{}{
						"image":       "gcr.io/heptio-images/ks-guestbook-demo:0.1",
						"name":        "guestbook-ui",
						"replicas":    1,
						"servicePort": 80,
						"type":        "ClusterIP",
					}
					assert.Equal(t, m, props)

					return paramsData, nil
				},
			},
			{
				name:       "delete from global component param",
				paramsData: test.ReadTestData(t, "params.libsonnet"),
				root:       "global",
				fieldPath:  []string{"restart"},
				updateFn: func(sl []string, paramsData string, props map[string]interface{}) (string, error) {
					assert.Equal(t, []string{"global"}, sl)

					m := map[string]interface{}{}
					assert.Equal(t, m, props)

					return paramsData, nil
				},
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				updateFn = tc.updateFn

				_, err := DeleteFromObject(tc.fieldPath, tc.paramsData, tc.componentName, tc.root)
				if err != nil {
					require.Error(t, err)
					return
				}

				require.NoError(t, err)
			})
		}
	})
}

func Test_update(t *testing.T) {
	cases := []struct {
		name        string
		init        func()
		paramSource string
		expected    string
		path        []string
		params      map[string]interface{}
		isErr       bool
	}{
		{
			name:        "update params - functional",
			paramSource: test.ReadTestData(t, "params.libsonnet"),
			expected:    test.ReadTestData(t, "updated.libsonnet"),
			path:        []string{"components", "guestbook-ui"},
			params: map[string]interface{}{
				"containerPort": 80,
				"image":         "gcr.io/heptio-images/ks-guestbook-demo:0.2",
				"name":          "guestbook-ui",
				"replicas":      5,
				"servicePort":   80,
				"type":          "NodePort",
			},
		},
		{
			name: "invalid source",
			init: func() {
				jsonnetParseFn = func(string, string) (*astext.Object, error) {
					return nil, errors.New("failed")
				}
			},
			isErr: true,
		},
		{
			name: "invalid params",
			init: func() {
				jsonnetParseFn = func(string, string) (*astext.Object, error) {
					return &astext.Object{}, nil
				}
				nmKVFromMapFn = func(map[string]interface{}) (*nm.Object, error) {
					return nil, errors.New("failed")
				}
			},
			isErr: true,
		},
		{
			name: "unable to set in jsonnet",
			init: func() {
				jsonnetParseFn = func(string, string) (*astext.Object, error) {
					return &astext.Object{}, nil
				}
				nmKVFromMapFn = func(map[string]interface{}) (*nm.Object, error) {
					return &nm.Object{}, nil
				}
				jsonnetSetFn = func(*astext.Object, []string, ast.Node) error {
					return errors.New("failed")
				}
			},
			isErr: true,
		},
		{
			name: "unable to print",
			init: func() {
				jsonnetParseFn = func(string, string) (*astext.Object, error) {
					return &astext.Object{}, nil
				}
				nmKVFromMapFn = func(map[string]interface{}) (*nm.Object, error) {
					return &nm.Object{}, nil
				}
				jsonnetSetFn = func(*astext.Object, []string, ast.Node) error {
					return nil
				}
				jsonnetPrinterFn = func(io.Writer, ast.Node) error {
					return errors.New("failed")
				}
			},
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			withParamConfig(t, func() {
				if tc.init != nil {
					tc.init()
				}

				got, err := update(tc.path, tc.paramSource, tc.params)
				if tc.isErr {
					require.Error(t, err)
					return
				}

				require.NoError(t, err)
				assert.Equal(t, tc.expected, got)
			})
		})
	}

}

func TestToMap(t *testing.T) {
	cases := []struct {
		name          string
		init          func()
		paramsData    string
		componentName string
		expected      map[string]interface{}
		isErr         bool
	}{
		{
			name:          "convert component params to a map - functional",
			paramsData:    test.ReadTestData(t, "nested-params.libsonnet"),
			componentName: "guestbook-ui",
			expected: map[string]interface{}{
				"int":        80,
				"float":      0.1,
				"string":     "string",
				"string-key": "string-key",
				"m": map[string]interface{}{
					"a": "a",
					"b": map[string]interface{}{
						"c": "c",
					},
				},
				"list": []interface{}{"one", "two", "three"},
			},
		},
		{
			name:       "convert all component params to a map - functional",
			paramsData: test.ReadTestData(t, "nested-params.libsonnet"),
			expected: map[string]interface{}{
				"guestbook-ui": map[string]interface{}{
					"int":        80,
					"float":      0.1,
					"string":     "string",
					"string-key": "string-key",
					"m": map[string]interface{}{
						"a": "a",
						"b": map[string]interface{}{
							"c": "c",
						},
					},
					"list": []interface{}{"one", "two", "three"},
				},
				"name": "name",
			},
		},
		{
			name:          "component param is not an object - functional",
			paramsData:    test.ReadTestData(t, "nested-params.libsonnet"),
			componentName: "name",
			isErr:         true,
		},
		{
			name:       "unable to convert object to map",
			paramsData: test.ReadTestData(t, "nested-params.libsonnet"),
			init: func() {
				convertObjectToMapFn = func(*astext.Object) (map[string]interface{}, error) {
					return nil, errors.New("failed")
				}
			},
			isErr: true,
		},
		{
			name: "invalid source",
			init: func() {
				jsonnetParseFn = func(string, string) (*astext.Object, error) {
					return nil, errors.New("failed")
				}
			},
			isErr: true,
		},
		{
			name:          "unsupported value in param object",
			paramsData:    test.ReadTestData(t, "nested-params.libsonnet"),
			componentName: "guestbook-ui",
			init: func() {
				convertObjectToMapFn = func(*astext.Object) (map[string]interface{}, error) {
					return nil, errors.New("failed")
				}
			},
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			withParamConfig(t, func() {
				if tc.init != nil {
					tc.init()
				}

				got, err := ToMap(tc.componentName, tc.paramsData, "components")
				if tc.isErr {
					require.Error(t, err)
					return
				}

				require.NoError(t, err)
				assert.Equal(t, tc.expected, got)
			})
		})
	}

}

func TestDecodeValue(t *testing.T) {
	cases := []struct {
		name     string
		val      string
		expected interface{}
		isErr    bool
	}{
		{
			name:  "blank",
			val:   "",
			isErr: true,
		},
		{
			name:     "float",
			val:      "0.9",
			expected: 0.9,
		},
		{
			name:     "int",
			val:      "9",
			expected: 9,
		},
		{
			name:     "0",
			val:      "0",
			expected: 0,
		},
		{
			name:     "bool true",
			val:      "True",
			expected: true,
		},
		{
			name:     "bool false",
			val:      "false",
			expected: false,
		},
		{
			name:     "array string",
			val:      `["a", "b", "c"]`,
			expected: []interface{}{"a", "b", "c"},
		},
		{
			name:  "broken array",
			val:   `["a", "b", "c"`,
			isErr: true,
		},
		{
			name:     "array float",
			val:      `[1,2,3]`,
			expected: []interface{}{1.0, 2.0, 3.0},
		},
		{
			name: "map",
			val:  `{"a": "1", "b": "2"}`,
			expected: map[string]interface{}{
				"a": "1",
				"b": "2",
			},
		},
		{
			name:  "broken map",
			val:   `{"a": "1", "b": "2"`,
			isErr: true,
		},
		{
			name: "nested map",
			val:  `{"a": "1", "b": "2", "c": {"d": "3"}}`,
			expected: map[string]interface{}{
				"a": "1",
				"b": "2",
				"c": map[string]interface{}{
					"d": "3",
				},
			},
		},
		{
			name:     "string",
			val:      "foo",
			expected: "foo",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			v, err := DecodeValue(tc.val)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.Equal(t, tc.expected, v)
			}
		})
	}
}

func Test_mergeMaps(t *testing.T) {
	m1 := map[string]interface{}{
		"apiVersion": "apiextensions.k8s.io/v1beta1",
		"kind":       "CustomResourceDefinition",
		"metadata": map[string]interface{}{
			"labels": map[string]interface{}{
				"app":      "cert-manager",
				"chart":    "cert-manager-0.2.2",
				"heritage": "Tiller",
				"release":  "cert-manager",
			},
			"name": "certificates.certmanager.k8s.io",
		},
		"spec": map[string]interface{}{
			"version": "v1",
			"group":   "certmanager.k8s.io",
			"names": map[string]interface{}{
				"kind":   "Certificate",
				"plural": "certificates",
			},
			"scope": "Namespaced",
		},
	}

	m2 := map[string]interface{}{
		"spec": map[string]interface{}{
			"version": "v2",
		},
	}

	expected := map[string]interface{}{
		"apiVersion": "apiextensions.k8s.io/v1beta1",
		"kind":       "CustomResourceDefinition",
		"metadata": map[string]interface{}{
			"labels": map[string]interface{}{
				"app":      "cert-manager",
				"chart":    "cert-manager-0.2.2",
				"heritage": "Tiller",
				"release":  "cert-manager",
			},
			"name": "certificates.certmanager.k8s.io",
		},
		"spec": map[string]interface{}{
			"version": "v2",
			"group":   "certmanager.k8s.io",
			"names": map[string]interface{}{
				"kind":   "Certificate",
				"plural": "certificates",
			},
			"scope": "Namespaced",
		},
	}

	err := mergeMaps(m1, m2, nil)
	require.NoError(t, err)
	require.Equal(t, expected, m1)
}

func Test_mergeMaps_simple(t *testing.T) {
	m1 := map[string]interface{}{
		"a": 1,
		"b": 2,
	}

	m2 := map[string]interface{}{
		"b": 4,
	}

	expected := map[string]interface{}{
		"a": 1,
		"b": 4,
	}

	err := mergeMaps(m1, m2, nil)

	require.NoError(t, err)
	require.Equal(t, expected, m1)
}

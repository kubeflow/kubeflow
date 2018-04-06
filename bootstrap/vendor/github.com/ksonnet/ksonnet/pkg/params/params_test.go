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
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestUpdate(t *testing.T) {
	paramsSource, err := ioutil.ReadFile("testdata/params.libsonnet")
	require.NoError(t, err)

	componentName := "guestbook-ui"

	params := map[string]interface{}{
		"containerPort": 80,
		"image":         "gcr.io/heptio-images/ks-guestbook-demo:0.2",
		"name":          "guestbook-ui",
		"replicas":      5,
		"servicePort":   80,
		"type":          "NodePort",
	}

	got, err := Update([]string{"components", componentName}, string(paramsSource), params)
	require.NoError(t, err)

	expected, err := ioutil.ReadFile("testdata/updated.libsonnet")
	require.NoError(t, err)

	fmt.Printf("got:\n%s\n", got)
	fmt.Printf("expected:\n%s\n", expected)

	require.Equal(t, string(expected), got)
}

func TestToMap(t *testing.T) {
	b, err := ioutil.ReadFile("testdata/nested-params.libsonnet")
	require.NoError(t, err)

	got, err := ToMap("guestbook-ui", string(b), "components")
	require.NoError(t, err)

	expected := map[string]interface{}{
		"int":        float64(80),
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
	}

	require.Equal(t, expected, got)
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

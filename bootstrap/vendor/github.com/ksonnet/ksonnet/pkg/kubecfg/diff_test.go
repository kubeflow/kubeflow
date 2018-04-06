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

package kubecfg

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestRemoveListFields(t *testing.T) {
	for _, tc := range []struct {
		config, live, expected []interface{}
	}{
		{
			config:   []interface{}{"a"},
			live:     []interface{}{"a"},
			expected: []interface{}{"a"},
		},

		// Check that extra fields in config are not propagated.
		{
			config:   []interface{}{"a", "b"},
			live:     []interface{}{"a"},
			expected: []interface{}{"a"},
		},

		// Check that extra entries in live are propagated.
		{
			config:   []interface{}{"a"},
			live:     []interface{}{"a", "b"},
			expected: []interface{}{"a", "b"},
		},
	} {
		require.EqualValues(t, tc.expected, removeListFields(tc.config, tc.live))
	}
}

func TestRemoveMapFields(t *testing.T) {
	for _, tc := range []struct {
		config, live, expected map[string]interface{}
	}{
		{
			config:   map[string]interface{}{"foo": "bar"},
			live:     map[string]interface{}{"foo": "bar"},
			expected: map[string]interface{}{"foo": "bar"},
		},

		{
			config:   map[string]interface{}{"foo": "bar", "bar": "baz"},
			live:     map[string]interface{}{"foo": "bar"},
			expected: map[string]interface{}{"foo": "bar"},
		},

		{
			config:   map[string]interface{}{"foo": "bar"},
			live:     map[string]interface{}{"foo": "bar", "bar": "baz"},
			expected: map[string]interface{}{"foo": "bar"},
		},
	} {
		require.Equal(t, tc.expected, removeMapFields(tc.config, tc.live))
	}
}

func TestRemoveFields(t *testing.T) {
	for _, tc := range []struct {
		config, live, expected interface{}
	}{
		// Check we can handle embedded structs.
		{
			config:   map[string]interface{}{"foo": "bar", "bar": "baz"},
			live:     map[string]interface{}{"foo": "bar"},
			expected: map[string]interface{}{"foo": "bar"},
		},

		// Check we can handle embedded lists.
		{
			config:   []interface{}{"a", "b"},
			live:     []interface{}{"a"},
			expected: []interface{}{"a"},
		},

		// Check we can handle arbitrary types.
		{
			config:   "a",
			live:     "b",
			expected: "b",
		},

		// Check we can handle combinations.
		{
			config: map[string]interface{}{
				"apiVersion": "v1",
				"kind":       "Service",
				"metadata": map[string]interface{}{
					"name":      "foo",
					"namespace": "default",
				},
				"spec": map[string]interface{}{
					"selector": map[string]interface{}{
						"name": "foo",
					},
					"ports": []interface{}{
						map[string]interface{}{
							"name": "http",
							"port": 80,
						},
						map[string]interface{}{
							"name": "https",
							"port": 443,
						},
					},
				},
			},
			live: map[string]interface{}{
				"apiVersion": "v1",
				"kind":       "Service",
				"metadata": map[string]interface{}{
					"name": "foo",
					// NB Namespace missing.
				},
				"spec": map[string]interface{}{
					"selector": map[string]interface{}{
						"bar": "foo",
					},
					"ports": []interface{}{
						// NB HTTP port missing.
						map[string]interface{}{
							"name": "https",
							"port": 443,
						},
					},
				},
			},
			expected: map[string]interface{}{
				"apiVersion": "v1",
				"kind":       "Service",
				"metadata": map[string]interface{}{
					"name": "foo",
				},
				"spec": map[string]interface{}{
					"selector": map[string]interface{}{},
					"ports": []interface{}{
						map[string]interface{}{
							"name": "https",
							"port": 443,
						},
					},
				},
			},
		},
	} {
		require.Equal(t, tc.expected, removeFields(tc.config, tc.live))
	}
}

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

package params

import (
	"io/ioutil"
	"path/filepath"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAppendComponentParams(t *testing.T) {
	tests := []struct {
		componentName string
		jsonnet       string
		params        Params
		expected      string
	}{
		// Test case with existing components
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    foo: {
      name: "foo",
      replicas: 1,
    },
    bar: {
      name: "bar",
    },
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    foo: {
      name: "foo",
      replicas: 1,
    },
    bar: {
      name: "bar",
    },
    baz: {
      name: "baz",
      replicas: 5,
    },
  },
}`,
		},
		// Test case with no existing components
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    baz: {
      name: "baz",
      replicas: 5,
    },
  },
}`,
		},
		// Test appending a component with a hyphenated name
		{
			"foo-bar",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
  },
}`,
			Params{"replicas": "5", "name": `"foo-bar"`},
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "foo-bar": {
      name: "foo-bar",
      replicas: 5,
    },
  },
}`,
		},
		// Test top of file imports
		{
			"foo-bar",
			`
local foo = import "foo";
local bar = import "bar";
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
  },
}`,
			Params{"replicas": "5", "name": `"foo-bar"`},
			`
local foo = import "foo";
local bar = import "bar";
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "foo-bar": {
      name: "foo-bar",
      replicas: 5,
    },
  },
}`,
		},
	}

	errors := []struct {
		componentName string
		jsonnet       string
		params        Params
	}{
		// Test case where there isn't a components object
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
		},
		// Test case where components isn't a top level object
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
		components: {},
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
		},
		// Test case where component already exists
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
	},
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    baz: {
      name: "baz",
      replicas: 5,
    },
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
		},
	}

	for _, s := range tests {
		parsed, err := AppendComponent(s.componentName, s.jsonnet, s.params)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if parsed != s.expected {
			t.Errorf("Wrong conversion\n  expected: %v\n  got: %v", s.expected, parsed)
		}
	}

	for _, e := range errors {
		parsed, err := AppendComponent(e.componentName, e.jsonnet, e.params)
		if err == nil {
			t.Errorf("Expected error but not found\n  input: %v  got: %v", e, parsed)
		}
	}
}

func TestDeleteComponent(t *testing.T) {
	tests := []struct {
		componentName string
		jsonnet       string
		expected      string
	}{
		// Test case with existing component
		{
			"bar",
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
    bar: {
      name: "bar",
    },
  },
}`,
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
		},
		// Test another case with existing component
		{
			"bar",
			`
{
  components: {
    bar: {
      name: "bar",
    },
  },
}`,
			`
{
  components: {
  },
}`,
		},
		// Test case where component doesn't exist
		{
			"bar",
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
		},
	}

	for _, s := range tests {
		parsed, err := DeleteComponent(s.componentName, s.jsonnet)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if parsed != s.expected {
			t.Errorf("Wrong conversion\n  expected: %v\n  got: %v", s.expected, parsed)
		}
	}
}

func TestGetComponentParams(t *testing.T) {
	tests := []struct {
		componentName string
		jsonnet       string
		expected      Params
	}{
		// Test getting the parameters where there is a single component
		{
			"foo",
			`
{
  global: {},
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
			Params{"name": `"foo"`, "replicas": "1"},
		},
		// Test getting the parameters where there are multiple components
		{
			"foo",
			`
{
  global: {},
  components: {
    bar: {
      replicas: 5
    },
    foo: {
      name: "foo",
      "replica-count": 1,
    },
  },
}`,
			Params{"name": `"foo"`, "replica-count": "1"},
		},
		// Test getting the parameters for a component name with special characters
		{
			"foo-bar",
			`
{
  global: {},
  components: {
    "foo-bar": {
      name: "foo-bar",
      replicas: 1,
    },
  },
}`,
			Params{"name": `"foo-bar"`, "replicas": "1"},
		},
		// Test case where one of the param values is a block string
		{
			"foo",
			`
{
	components: {
		"foo": {
			name: |||
        name
        is
        foo
			|||,
		}
	},
}`,
			Params{"name": "|||\nname\nis\nfoo\n|||"},
		},
	}

	errors := []struct {
		componentName string
		jsonnet       string
	}{
		// Test case where component doesn't exist
		{
			"baz",
			`
{
  components: {
    foo: {
      name: "foo",
    },
  },
}`,
		},
		// Test case where components isn't a top level object
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
		components: {},
  },
}`,
		},
		// Test case where one of the component names is a block string
		{
			"foo",
			`
{
	components: {
		|||foo|||: {
			name: "foo",
		}
	},
}`,
		},
	}

	for _, s := range tests {
		params, err := GetComponentParams(s.componentName, s.jsonnet)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if !reflect.DeepEqual(params, s.expected) {
			t.Errorf("Wrong conversion\n  expected:%v\n  got:%v", s.expected, params)
		}
	}

	for _, e := range errors {
		params, err := GetComponentParams(e.componentName, e.jsonnet)
		if err == nil {
			t.Errorf("Expected error but not found\n  input: %v  got: %v", e, params)
		}
	}
}

func TestGetAllComponentParams(t *testing.T) {
	tests := []struct {
		jsonnet  string
		expected map[string]Params
	}{
		// Test getting the parameters where there are zero components
		{
			`
{
  global: {},
  components: {
  },
}`,
			map[string]Params{},
		},
		// Test getting the parameters where there is a single component
		{
			`
{
  global: {},
  components: {
    bar: {
      replicas: 5
    },
  },
}`,
			map[string]Params{
				"bar": Params{"replicas": "5"},
			},
		},
		// Test getting the parameters where there are multiple components
		{
			`
{
  global: {},
  components: {
    bar: {
      replicas: 5
    },
    "foo-bar": {
      name: "foo-bar",
      replicas: 1,
    },
  },
}`,
			map[string]Params{
				"bar":     Params{"replicas": "5"},
				"foo-bar": Params{"name": `"foo-bar"`, "replicas": "1"},
			},
		},
	}

	for _, s := range tests {
		params, err := GetAllComponentParams(s.jsonnet)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if !reflect.DeepEqual(params, s.expected) {
			t.Errorf("Wrong conversion\n  expected:%v\n  got:%v", s.expected, params)
		}
	}
}

func TestSetComponentParams(t *testing.T) {
	tests := []struct {
		componentName string
		jsonnet       string
		params        Params
		expected      string
	}{
		// Test setting one parameter
		{
			"foo",
			`
{
  global: {},
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
    bar: {
      name: "bar",
    },
  },
}`,
			Params{"replicas": "5"},
			`
{
  global: {},
  components: {
    foo: {
      name: "foo",
      replicas: 5,
    },
    bar: {
      name: "bar",
    },
  },
}`,
		},
		// Test setting multiple parameters
		{
			"foo",
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
			Params{"replicas": "5", "name": `"foobar"`},
			`
{
  components: {
    foo: {
      name: "foobar",
      replicas: 5,
    },
  },
}`,
		},
		// Test setting parameter that does not exist -- this should add the param
		{
			"foo",
			`
{
  components: {
    foo: {
      name: "foo",
    },
  },
}`,
			Params{"replicas": "5"},
			`
{
  components: {
    foo: {
      name: "foo",
      replicas: 5,
    },
  },
}`,
		},
		// Test adding a parameter with special characters in the param name
		{
			"foo",
			`
{
  components: {
    foo: {
      "foo-bar": 5,
      name: "foo",
    },
  },
}`,
			Params{"replica-count": "5"},
			`
{
  components: {
    foo: {
      "foo-bar": 5,
      name: "foo",
      "replica-count": 5,
    },
  },
}`,
		},
		// Test setting parameter for a component with a special character in name
		{
			"foo-bar",
			`
{
  components: {
    "foo-bar": {
      name: "foo-bar",
    },
  },
}`,
			Params{"replicas": "5"},
			`
{
  components: {
    "foo-bar": {
      name: "foo-bar",
      replicas: 5,
    },
  },
}`,
		},
		// Test setting parameter for jsonnet file with top-level imports
		{
			"foo-bar",
			`
local foo = import "foo";
local bar = import "bar";

{
  components: {
    "foo-bar": {
      name: "foo-bar",
    },
  },
}`,
			Params{"replicas": "5"},
			`
local foo = import "foo";
local bar = import "bar";

{
  components: {
    "foo-bar": {
      name: "foo-bar",
      replicas: 5,
    },
  },
}`,
		},
		// Test setting parameter for jsonnet file with multi-string field
		{
			"foo-bar",
			`
{
  components: {
    "foo-bar": {
      description: |||
        foo
        bar
      |||,
      name: "foo-bar",
    },
  },
}`,
			Params{"replicas": "5"},
			`
{
  components: {
    "foo-bar": {
      description: |||
        foo
        bar
      |||,
      name: "foo-bar",
      replicas: 5,
    },
  },
}`,
		},
	}

	errors := []struct {
		componentName string
		jsonnet       string
		params        Params
	}{
		// Test case where component doesn't exist
		{
			"baz",
			`
{
  components: {
    foo: {
      name: "foo",
    },
  },
}`,
			Params{"name": `"baz"`},
		},
		// Test case where components isn't a top level object
		{
			"baz",
			`
{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
		components: {},
  },
}`,
			Params{"replicas": "5", "name": `"baz"`},
		},
	}

	for _, s := range tests {
		parsed, err := SetComponentParams(s.componentName, s.jsonnet, s.params)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if parsed != s.expected {
			t.Errorf("Wrong conversion\n  expected:%v\n  got:%v", s.expected, parsed)
		}
	}

	for _, e := range errors {
		parsed, err := SetComponentParams(e.componentName, e.jsonnet, e.params)
		if err == nil {
			t.Errorf("Expected error but not found\n  input: %v  got: %v", e, parsed)
		}
	}
}

func TestGetAllEnvironmentParams(t *testing.T) {
	tests := []struct {
		jsonnet  string
		expected map[string]Params
	}{
		// Test getting the parameters where there are zero components
		{
			`
local params = import "/fake/path";
params + {
  components +: {
  },
}`,
			map[string]Params{},
		},
		// Test getting the parameters where there is a single component
		{
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      replicas: 1,
    },
  },
}`,
			map[string]Params{
				"bar": Params{"name": `"bar"`, "replicas": "1"},
			},
		},
		// Test getting the parameters where there are multiple components
		{
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      replicas: 1,
    },
    "foo" +: {
      name: "foo",
      "replica-count": 5,
    },
  },
}`,
			map[string]Params{
				"bar": Params{"name": `"bar"`, "replicas": "1"},
				"foo": Params{"name": `"foo"`, "replica-count": "5"},
			},
		},
	}

	for _, s := range tests {
		params, err := GetAllEnvironmentParams(s.jsonnet)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if !reflect.DeepEqual(params, s.expected) {
			t.Errorf("Wrong conversion\n  expected:%v\n  got:%v", s.expected, params)
		}
	}
}

func TestSetEnvironmentParams(t *testing.T) {
	tests := []struct {
		componentName string
		jsonnet       string
		params        Params
		expected      string
	}{
		// Test environment param case
		{
			"foo",
			`
local params = import "/fake/path";
params + {
  components +: {
    foo +: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
			Params{"replicas": "5"},
			`
local params = import "/fake/path";
params + {
  components +: {
    foo +: {
      name: "foo",
      replicas: 5,
    },
  },
}`,
		},
		// Test setting environment param case where component name is a string identifier
		{
			"foo-bar",
			`
local params = import "/fake/path";
params + {
  components +: {
    "foo-bar" +: {
      name: "foo-bar",
    },
  },
}`,
			Params{"name": `"foo"`},
			`
local params = import "/fake/path";
params + {
  components +: {
    "foo-bar" +: {
      name: "foo",
    },
  },
}`,
		},
		// Test environment param case with multiple components
		{
			"foo",
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      replicas: 1,
    },
    foo +: {
      description: |||
        foo
      |||,
      name: "foo",
      replicas: 1,
    },
  },
}`,
			Params{"name": `"foobar"`, "replicas": "5"},
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      replicas: 1,
    },
    foo +: {
      description: |||
        foo
      |||,
      name: "foobar",
      replicas: 5,
    },
  },
}`,
		},
		// Test special character in param identifier
		{
			"foo",
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      "replica-count": 1,
    },
    foo +: {
      name: "foo",
    },
  },
}`,
			Params{"replica-count": "5"},
			`
local params = import "/fake/path";
params + {
  components +: {
    bar +: {
      name: "bar",
      "replica-count": 1,
    },
    foo +: {
      name: "foo",
      "replica-count": 5,
    },
  },
}`,
		},
		// Test setting environment param case where component isn't in the snippet
		{
			"foo",
			`
local params = import "/fake/path";
params + {
  components +: {
  },
}`,
			Params{"replicas": "5"},
			`
local params = import "/fake/path";
params + {
  components +: {
    foo +: {
      replicas: 5,
    },
  },
}`,
		},
		// Test setting environment param case where component isn't in the snippet
		// and the component name has special characters
		{
			"foo-bar",
			`
local params = import "/fake/path";
params + {
  components +: {
  },
}`,
			Params{"replicas": "5"},
			`
local params = import "/fake/path";
params + {
  components +: {
    "foo-bar" +: {
      replicas: 5,
    },
  },
}`,
		},
		// Test top-of-file import cases
		{
			"foo",
			`
local foo = import "foo";
local bar = import "bar";

local params = import "/fake/path";
params + {
  components +: {
    foo +: {
      name: "foo",
      replicas: 1,
    },
  },
}`,
			Params{"replicas": "5"},
			`
local foo = import "foo";
local bar = import "bar";

local params = import "/fake/path";
params + {
  components +: {
    foo +: {
      name: "foo",
      replicas: 5,
    },
  },
}`,
		},
	}

	errors := []struct {
		componentName string
		jsonnet       string
		params        Params
	}{
		// Test bad schema
		{
			"foo",
			`
local params = import "/fake/path";
params + {
  badobj +: {
  },
}`,
			Params{"replicas": "5"},
		},
	}

	for _, s := range tests {
		parsed, err := SetEnvironmentParams(s.componentName, s.jsonnet, s.params)
		if err != nil {
			t.Errorf("Unexpected error\n  input: %v\n  error: %v", s.jsonnet, err)
		}

		if parsed != s.expected {
			t.Errorf("Wrong conversion\n  expected:%v\n  got:%v", s.expected, parsed)
		}
	}

	for _, e := range errors {
		parsed, err := SetEnvironmentParams(e.componentName, e.jsonnet, e.params)
		if err == nil {
			t.Errorf("Expected error but not found\n  input: %v  got: %v", e, parsed)
		}
	}
}

func TestDeleteEnvironmentParams(t *testing.T) {
	buildPath := func(in ...string) []string {
		return append([]string{"delete-env-param"}, in...)
	}

	cases := []struct {
		name          string
		componentName string
		paramName     string
		snippetPath   []string
		expectedPath  []string
		isErr         bool
	}{
		{
			name:          "params binary",
			componentName: "foo",
			paramName:     "name",
			snippetPath:   buildPath("case1.libsonnet"),
			expectedPath:  buildPath("expected1.libsonnet"),
		},
		{
			name:          "params apply brace",
			componentName: "foo",
			paramName:     "name",
			snippetPath:   buildPath("case2.libsonnet"),
			expectedPath:  buildPath("expected2.libsonnet"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			snippet := readSnippet(t, tc.snippetPath...)

			updated, err := DeleteEnvironmentParam(tc.componentName, tc.paramName, snippet)
			if tc.isErr {
				require.Error(t, err)
				return
			}

			expected := readSnippet(t, tc.expectedPath...)

			require.NoError(t, err)
			assert.Equal(t, expected, updated)
		})
	}
}

func readSnippet(t *testing.T, path ...string) string {
	snippetPath := filepath.Join(append([]string{"testdata"}, path...)...)

	data, err := ioutil.ReadFile(snippetPath)
	require.NoError(t, err)

	return string(data)
}

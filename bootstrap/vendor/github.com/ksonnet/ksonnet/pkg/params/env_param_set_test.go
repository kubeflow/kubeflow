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
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/stretchr/testify/require"
)

func TestEnvParamSet(t *testing.T) {
	cases := []struct {
		name          string
		input         string
		output        string
		componentName string
		params        params.Params
	}{
		{
			name:          "no globals",
			input:         filepath.Join("env", "no-globals", "set", "in.libsonnet"),
			output:        filepath.Join("env", "no-globals", "set", "out.libsonnet"),
			componentName: "guestbook",
			params: params.Params{
				"containerPort": "8080",
			},
		},
		{
			name:          "globals",
			input:         filepath.Join("env", "globals", "set", "in.libsonnet"),
			output:        filepath.Join("env", "globals", "set", "out.libsonnet"),
			componentName: "guestbook",
			params: params.Params{
				"containerPort": "8080",
			},
		},
		{
			name:          "globals new component",
			input:         filepath.Join("env", "globals", "set", "in.libsonnet"),
			output:        filepath.Join("env", "globals", "set", "out-new-component.libsonnet"),
			componentName: "component",
			params: params.Params{
				"name": "new-component",
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			snippet := test.ReadTestData(t, tc.input)

			epa := NewEnvParamSet()

			got, err := epa.Set(tc.componentName, snippet, tc.params)
			require.NoError(t, err)

			expected := test.ReadTestData(t, tc.output)
			require.Equal(t, expected, got)
		})
	}
}

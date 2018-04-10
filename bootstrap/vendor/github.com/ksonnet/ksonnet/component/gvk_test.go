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
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGVK_Group(t *testing.T) {
	cases := []struct {
		name      string
		groupPath []string
		expected  []string
	}{
		{
			name:      "unqualified group",
			groupPath: []string{"apps"},
			expected:  []string{"apps"},
		},
		{
			name:      "qualified group",
			groupPath: []string{"apiextensions.k8s.io"},
			expected:  []string{"apiextensions"},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			gvk := GVK{
				GroupPath: tc.groupPath,
				Version:   "v1",
				Kind:      "deployment",
			}

			group := gvk.Group()
			require.Equal(t, tc.expected, group)
		})
	}
}

func TestGVK_Path(t *testing.T) {
	gvk := GVK{
		GroupPath: []string{"apps"},
		Version:   "v1",
		Kind:      "deployment",
	}

	expected := []string{"apps", "v1", "deployment"}
	require.Equal(t, expected, gvk.Path())
}

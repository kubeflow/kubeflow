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

func TestNewTypeSpec(t *testing.T) {
	cases := []struct {
		name    string
		kind    string
		version string
		isErr   bool
	}{
		{
			name:    "with kind and version",
			kind:    "Deployment",
			version: "v1",
		},
		{
			name:    "missing kind or version",
			version: "v1",
			isErr:   true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			_, err := NewTypeSpec(tc.version, tc.kind)

			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestTypeSpec_Group(t *testing.T) {
	cases := []struct {
		name    string
		version string
		group   []string
	}{
		{
			name:    "with an explicit group in the version",
			version: "group/v1",
			group:   []string{"group"},
		},
		{
			name:    "without an explicit group in the version",
			version: "v1",
			group:   []string{"core"},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ts, err := NewTypeSpec(tc.version, "kind")
			require.NoError(t, err)

			require.Equal(t, tc.group, ts.Group())
		})
	}
}

func TestTypeSpec_Version(t *testing.T) {
	cases := []struct {
		name     string
		version  string
		expected string
	}{
		{
			name:     "with an explicit group in the version",
			version:  "group/v1",
			expected: "v1",
		},
		{
			name:     "without an explicit group in the version",
			version:  "v1",
			expected: "v1",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ts, err := NewTypeSpec(tc.version, "kind")
			require.NoError(t, err)

			require.Equal(t, tc.expected, ts.Version())
		})
	}
}

func TestTypeSpec_Kind(t *testing.T) {
	cases := []struct {
		name     string
		kind     string
		expected string
	}{
		{
			name:     "with an explicit group in the version",
			kind:     "Group",
			expected: "group",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ts, err := NewTypeSpec("v1", tc.kind)
			require.NoError(t, err)

			require.Equal(t, tc.expected, ts.Kind())
		})
	}
}

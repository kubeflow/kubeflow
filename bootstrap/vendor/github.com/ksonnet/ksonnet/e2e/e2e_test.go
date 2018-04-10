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

package e2e

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_initOptions_toSlice(t *testing.T) {
	cases := []struct {
		name     string
		io       initOptions
		expected []string
		isErr    bool
	}{
		{
			name: "namespace",
			io: initOptions{
				namespace: "ns",
			},
			expected: []string{
				"--server", "http://example.com",
				"--namespace", "ns",
			},
		},
		{
			name: "no server or context",
			io:   initOptions{},
			expected: []string{
				"--server", "http://example.com",
			},
		},
		{
			name: "server",
			io: initOptions{
				server: "http://example.com/2",
			},
			expected: []string{
				"--server", "http://example.com/2",
			},
		},
		{
			name: "context",
			io: initOptions{
				context: "minikube",
			},
			expected: []string{
				"--context", "minikube",
			},
		},
		{
			name: "server and context",
			io: initOptions{
				context: "minikube",
				server:  "http://example.com",
			},
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			sl, err := tc.io.toSlice()
			if tc.isErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)

			assert.Equal(t, tc.expected, sl)
		})
	}
}

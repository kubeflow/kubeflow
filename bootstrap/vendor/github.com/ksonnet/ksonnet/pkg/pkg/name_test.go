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

package pkg

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_ParseName(t *testing.T) {
	cases := []struct {
		name     string
		expected Descriptor
		isErr    bool
	}{
		{
			name:     "parts-infra/contour",
			expected: Descriptor{Registry: "parts-infra", Part: "contour"},
		},
		{
			name:     "contour",
			expected: Descriptor{Part: "contour"},
		},
		{
			name:     "parts-infra/contour@0.1.0",
			expected: Descriptor{Registry: "parts-infra", Part: "contour", Version: "0.1.0"},
		},
		{
			name:  "@foo/bar@baz@doh",
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			d, err := ParseName(tc.name)
			if tc.isErr {
				require.Error(t, err)
				return
			}

			require.NoError(t, err)
			require.Equal(t, tc.expected, d)
		})
	}
}

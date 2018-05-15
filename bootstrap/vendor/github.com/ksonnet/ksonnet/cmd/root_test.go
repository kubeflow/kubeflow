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

package cmd

import (
	"fmt"
	"testing"
)

func TestConstructBaseObj(t *testing.T) {
	tests := []struct {
		inputPaths []string
		expected   string
	}{
		// test simple case with 1 .jsonnet path
		{
			[]string{
				"some/fake/path/foo.jsonnet",
			},
			`{
  foo: import "some/fake/path/foo.jsonnet",
}
`,
		},
		// test multiple .jsonnet path case
		{
			[]string{
				"some/fake/path/foo.jsonnet",
				"another/fake/path/bar.jsonnet",
			},
			`{
  foo: import "some/fake/path/foo.jsonnet",
  bar: import "another/fake/path/bar.jsonnet",
}
`,
		},
		// test zero path case
		{
			[]string{},
			`{
}
`,
		},
		// test non-jsonnet extension case
		{
			[]string{
				"some/fake/path/foo.libsonnet",
				"another/fake/path/bar.jsonnet",
			},
			`{
  bar: import "another/fake/path/bar.jsonnet",
}
`,
		},
		// test special character case
		{
			[]string{
				"another/fake/path/foo-bar.jsonnet",
			},
			`{
  "foo-bar": import "another/fake/path/foo-bar.jsonnet",
}
`,
		},
	}

	for _, s := range tests {
		res, err := constructBaseObj(s.inputPaths, nil)
		if err != nil {
			t.Error(err)
		}

		if res != fmt.Sprintf("__ksonnet/components=%s", s.expected) {
			t.Errorf("Wrong object constructed\n  expected: %v\n  got: %v", s.expected, res)
		}
	}
}

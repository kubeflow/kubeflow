// Copyright 2017 The ksonnet authors
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

package lib

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
)

type parseSuccess struct {
	input  string
	target ClusterSpec
}

func TestClusterSpecParsingSuccess(t *testing.T) {
	testFS := afero.NewMemMapFs()
	afero.WriteFile(testFS, blankSwagger, []byte(blankSwaggerData), os.ModePerm)

	var successTests = []parseSuccess{
		{"version:v1.7.1", &clusterSpecVersion{"v1.7.1"}},
		{"file:swagger.json", &clusterSpecFile{"swagger.json", testFS}},
		{"url:file:///some_file", &clusterSpecLive{"file:///some_file"}},
	}

	for _, test := range successTests {
		parsed, err := ParseClusterSpec(test.input, testFS)
		if err != nil {
			t.Errorf("Failed to parse spec: %v", err)
		}

		parsedResource := parsed.Resource()
		targetResource := test.target.Resource()

		switch pt := parsed.(type) {
		case *clusterSpecLive:
		case *clusterSpecVersion:
			if parsedResource != targetResource {
				t.Errorf("Expected version '%v', got '%v'", parsedResource, targetResource)
			}
		case *clusterSpecFile:
			// Techncially we're cheating here by passing a *relative path*
			// into `newPathSpec` instead of an absolute one. This is to
			// make it work on multiple machines. We convert it here, after
			// the fact.
			absPath, err := filepath.Abs(targetResource)
			if err != nil {
				t.Errorf("Failed to convert `file:` spec to an absolute path: %v", err)
			}

			if parsedResource != absPath {
				t.Errorf("Expected path '%v', got '%v'", absPath, parsedResource)
			}
		default:
			t.Errorf("Unknown cluster spec type '%v'", pt)
		}
	}
}

type parseFailure struct {
	input    string
	errorMsg string
}

var failureTests = []parseFailure{
	{"fakeprefix:foo", "Could not parse cluster spec 'fakeprefix:foo'"},
	{"foo:", "Invalid API specification 'foo:'"},
	{"version:", "Invalid API specification 'version:'"},
	{"file:", "Invalid API specification 'file:'"},
	{"url:", "Invalid API specification 'url:'"},
}

func TestClusterSpecParsingFailure(t *testing.T) {

	for _, test := range failureTests {
		testFS := afero.NewMemMapFs()
		afero.WriteFile(testFS, blankSwagger, []byte(blankSwaggerData), os.ModePerm)
		_, err := ParseClusterSpec(test.input, testFS)
		if err == nil {
			t.Errorf("Cluster spec parse for '%s' should have failed, but succeeded", test.input)
		} else if msg := err.Error(); msg != test.errorMsg {
			t.Errorf("Expected cluster spec parse error: '%s', got: '%s'", test.errorMsg, msg)
		}
	}
}

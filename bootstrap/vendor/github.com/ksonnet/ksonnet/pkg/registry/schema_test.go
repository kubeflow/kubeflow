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

package registry

import (
	"io/ioutil"
	"testing"

	"github.com/blang/semver"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/stretchr/testify/require"
)

func Test_Unmarshal(t *testing.T) {
	data, err := ioutil.ReadFile("testdata/registry.yaml")
	require.NoError(t, err)

	spec, err := Unmarshal(data)
	require.NoError(t, err)

	expected := &Spec{
		APIVersion: DefaultAPIVersion,
		Kind:       DefaultKind,
		GitVersion: &app.GitVersionSpec{
			CommitSHA: "40285d8a14f1ac5787e405e1023cf0c07f6aa28c",
			RefSpec:   "master",
		},
		Libraries: LibraryRefSpecs{
			"apache": &LibraryRef{
				Path:    "apache",
				Version: "master",
			},
		},
	}

	require.Equal(t, expected, spec)
}

func TestSpec_Marshal(t *testing.T) {
	spec := &Spec{
		APIVersion: DefaultAPIVersion,
		Kind:       DefaultKind,
		GitVersion: &app.GitVersionSpec{
			CommitSHA: "40285d8a14f1ac5787e405e1023cf0c07f6aa28c",
			RefSpec:   "master",
		},
		Libraries: LibraryRefSpecs{
			"apache": &LibraryRef{
				Path:    "apache",
				Version: "master",
			},
		},
	}

	expected, err := ioutil.ReadFile("testdata/registry.yaml")
	require.NoError(t, err)

	data, err := spec.Marshal()
	require.NoError(t, err)

	require.Equal(t, string(expected), string(data))
}

func Test_ApiVersionValidate(t *testing.T) {
	type spec struct {
		spec string
		err  bool
	}
	tests := []spec{
		// Versions that we accept.
		{spec: "0.1.0", err: false},
		{spec: "0.1.0+build.1", err: false},

		// Other versions.
		{spec: "0.0.0", err: true},
		{spec: "0.0.1", err: true},
		{spec: "1.0.0", err: true},

		// Builds and pre-releases of current version.
		{spec: "0.1.0-alpha", err: true},
		{spec: "0.1.0-beta+build.2", err: true},

		// Other versions.
		{spec: "0.0.1-alpha", err: true},
		{spec: "0.0.1+build.1", err: true},
		{spec: "0.0.1-beta+build.2", err: true},
		{spec: "1.0.0-alpha", err: true},
		{spec: "1.0.0+build.1", err: true},
		{spec: "1.0.0-beta+build.2", err: true},
	}

	for _, test := range tests {
		_, err := semver.Make(test.spec)
		if err != nil {
			t.Errorf("Failed to parse version '%s':\n%v", test.spec, err)
		}

		spec := &Spec{APIVersion: test.spec}
		err = spec.validate()
		if (test.err && err == nil) || (!test.err && err != nil) {
			t.Errorf("Expected error for version '%s'? %t. Value of error: '%v'", test.spec, test.err, err)
		}
	}
}

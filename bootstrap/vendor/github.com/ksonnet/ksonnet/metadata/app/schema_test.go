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

package app

import (
	"io/ioutil"
	"path/filepath"
	"testing"

	"github.com/blang/semver"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func makeSimpleRefSpec(name, protocol, uri, version string) *RegistryRefSpec {
	return &RegistryRefSpec{
		Name:     name,
		Protocol: protocol,
		URI:      uri,
		GitVersion: &GitVersionSpec{
			RefSpec:   version,
			CommitSHA: version,
		},
	}
}

func makeSimpleEnvironmentSpec(name, namespace, server, k8sVersion string) *EnvironmentSpec {
	return &EnvironmentSpec{
		Name: name,
		Destination: &EnvironmentDestinationSpec{
			Namespace: namespace,
			Server:    server,
		},
		KubernetesVersion: k8sVersion,
	}
}

func TestApiVersionValidate(t *testing.T) {
	type spec struct {
		spec string
		err  bool
	}
	tests := []spec{
		// Versions that we accept.
		{spec: "0.0.1", err: false},
		{spec: "0.0.1+build.1", err: false},
		{spec: "0.1.0-alpha", err: false},
		{spec: "0.1.0+build.1"},

		// Other versions.
		{spec: "0.0.0", err: true},
		{spec: "0.1.0"},
		{spec: "1.0.0", err: true},
	}

	for _, tc := range tests {
		t.Run(tc.spec, func(t *testing.T) {
			_, err := semver.Make(tc.spec)
			require.NoError(t, err, "failed to parse version %q", tc.spec)

			spec := &Spec{APIVersion: tc.spec}
			err = spec.validate()
			if tc.err {
				require.Error(t, err)
				return
			}

			require.NoError(t, err)
		})
	}
}

func TestGetRegistryRefSuccess(t *testing.T) {
	example1 := Spec{
		Registries: RegistryRefSpecs{
			"simple1": &RegistryRefSpec{
				URI:      "example.com",
				Protocol: "github",
			},
		},
	}

	r1, ok := example1.GetRegistryRef("simple1")
	if r1 == nil || !ok {
		t.Error("Expected registry to contain 'simple1'")
	}

	if r1.URI != "example.com" || r1.Name != "simple1" || r1.Protocol != "github" {
		t.Errorf("Registry did not add correct values:\n%v", r1)
	}
}

func TestGetRegistryRefFailure(t *testing.T) {
	example1 := Spec{
		Registries: RegistryRefSpecs{
			"simple1": &RegistryRefSpec{
				URI:      "example.com",
				Protocol: "github",
			},
		},
	}

	r1, ok := example1.GetRegistryRef("simple2")
	if r1 != nil || ok {
		t.Error("Expected registry to not contain 'simple2'")
	}
}

func TestAddRegistryRefSuccess(t *testing.T) {
	var example1 = Spec{
		Registries: RegistryRefSpecs{},
	}

	err := example1.AddRegistryRef(makeSimpleRefSpec("simple1", "github", "example.com", "master"))
	require.NoError(t, err)

	r1, ok1 := example1.GetRegistryRef("simple1")
	assert.True(t, ok1)
	expectedR1 := &RegistryRefSpec{URI: "example.com", Name: "simple1", Protocol: "github", GitVersion: &GitVersionSpec{RefSpec: "master", CommitSHA: "master"}}
	require.Equal(t, expectedR1, r1)

	r2, ok2 := example1.GetRegistryRef("simple1")
	assert.True(t, ok2)
	require.Equal(t, expectedR1, r2)

}

func TestAddRegistryRefFailure(t *testing.T) {
	example1 := Spec{
		Registries: RegistryRefSpecs{
			"simple1": &RegistryRefSpec{
				URI:      "example.com",
				Protocol: "github",
			},
		},
	}

	err := example1.AddRegistryRef(makeSimpleRefSpec("", "github", "example.com", "master"))
	if err != ErrRegistryNameInvalid {
		t.Error("Expected registry to fail to add registry with invalid name")
	}

	err = example1.AddRegistryRef(makeSimpleRefSpec("simple1", "fakeProtocol", "example.com", "master"))
	if err != ErrRegistryExists {
		t.Error("Expected registry to fail to add registry with duplicate name and different protocol")
	}

	err = example1.AddRegistryRef(makeSimpleRefSpec("simple1", "github", "fakeUrl", "master"))
	if err != ErrRegistryExists {
		t.Error("Expected registry to fail to add registry with duplicate name and different uri")
	}
}

func TestGetEnvironmentSpecs(t *testing.T) {
	example1 := Spec{
		Environments: EnvironmentSpecs{
			"dev": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "default",
					Server:    "http://example.com",
				},
				KubernetesVersion: "1.8.0",
			},
		},
	}

	r1 := example1.GetEnvironmentSpecs()
	if len(r1) != 1 {
		t.Error("Expected environments to contain to be of length 1")
	}

	if r1["dev"].Name != "dev" {
		t.Error("Expected to populate name value")
	}
}

func TestGetEnvironmentSpecSuccess(t *testing.T) {
	const (
		env        = "dev"
		namespace  = "default"
		server     = "http://example.com"
		k8sVersion = "1.8.0"
	)

	example1 := Spec{
		Environments: EnvironmentSpecs{
			env: &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: namespace,
					Server:    server,
				},
				KubernetesVersion: k8sVersion,
			},
		},
	}

	r1, ok := example1.GetEnvironmentSpec(env)
	if r1 == nil || !ok {
		t.Errorf("Expected environments to contain '%s'", env)
	}

	if r1.Destination.Namespace != namespace ||
		r1.Destination.Server != server || r1.KubernetesVersion != k8sVersion {
		t.Errorf("Environment did not add correct values:\n%v", r1)
	}
}

func TestGetEnvironmentSpecFailure(t *testing.T) {
	example1 := Spec{
		Environments: EnvironmentSpecs{
			"dev": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "default",
					Server:    "http://example.com",
				},
				KubernetesVersion: "1.8.0",
			},
		},
	}

	r1, ok := example1.GetEnvironmentSpec("prod")
	if r1 != nil || ok {
		t.Error("Expected environments to not contain 'prod'")
	}
}

func TestAddEnvironmentSpecSuccess(t *testing.T) {
	const (
		env        = "dev"
		namespace  = "default"
		server     = "http://example.com"
		k8sVersion = "1.8.0"
	)

	example1 := Spec{
		Environments: EnvironmentSpecs{},
	}

	err := example1.AddEnvironmentSpec(makeSimpleEnvironmentSpec(env, namespace, server, k8sVersion))
	if err != nil {
		t.Errorf("Expected environment add to succeed:\n%s", err)
	}

	r1, ok1 := example1.GetEnvironmentSpec(env)
	if !ok1 || r1.Destination.Namespace != namespace ||
		r1.Destination.Server != server || r1.KubernetesVersion != k8sVersion {
		t.Errorf("Environment did not add correct values:\n%v", r1)
	}
}

func TestAddEnvironmentSpecFailure(t *testing.T) {
	const (
		envName1   = "dev"
		envName2   = ""
		namespace  = "default"
		server     = "http://example.com"
		k8sVersion = "1.8.0"
	)

	example1 := Spec{
		Environments: EnvironmentSpecs{
			envName1: &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: namespace,
					Server:    server,
				},
				KubernetesVersion: k8sVersion,
			},
		},
	}

	err := example1.AddEnvironmentSpec(makeSimpleEnvironmentSpec(envName2, namespace, server, k8sVersion))
	if err != ErrEnvironmentNameInvalid {
		t.Error("Expected failure while adding environment with an invalid name")
	}

	err = example1.AddEnvironmentSpec(makeSimpleEnvironmentSpec(envName1, namespace, server, k8sVersion))
	if err != ErrEnvironmentExists {
		t.Error("Expected failure while adding environment with duplicate name")
	}
}

func TestDeleteEnvironmentSpec(t *testing.T) {
	example1 := Spec{
		Environments: EnvironmentSpecs{
			"dev": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "default",
					Server:    "http://example.com",
				},
				KubernetesVersion: "1.8.0",
			},
		},
	}

	err := example1.DeleteEnvironmentSpec("dev")
	if err != nil {
		t.Error("Expected to successfully delete an environment in spec")
	}

	if _, ok := example1.GetEnvironmentSpec("dev"); ok {
		t.Error("Expected environment 'dev' to be deleted from spec, but still exists")
	}
}

func TestUpdateEnvironmentSpec(t *testing.T) {
	example1 := Spec{
		Environments: EnvironmentSpecs{
			"dev": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "default",
					Server:    "http://example.com",
				},
				KubernetesVersion: "1.8.0",
			},
		},
	}

	example2 := EnvironmentSpec{
		Name: "foo",
		Destination: &EnvironmentDestinationSpec{
			Namespace: "foo",
			Server:    "http://example.com",
		},
		KubernetesVersion: "1.8.0",
	}

	err := example1.UpdateEnvironmentSpec("dev", &example2)
	if err != nil {
		t.Error("Expected to successfully update an environment in spec")
	}

	if _, ok := example1.GetEnvironmentSpec("dev"); ok {
		t.Error("Expected environment 'dev' to be deleted from spec, but still exists")
	}

	if _, ok := example1.GetEnvironmentSpec("foo"); !ok {
		t.Error("Expected environment 'foo' to be created in spec, but does not exists")
	}
}

func Test_write(t *testing.T) {
	fs := afero.NewMemMapFs()

	spec := &Spec{
		APIVersion: "0.1.0",
		Environments: EnvironmentSpecs{
			"a": &EnvironmentSpec{},
			"b": &EnvironmentSpec{isOverride: true},
		},
		Registries: RegistryRefSpecs{
			"a": &RegistryRefSpec{},
			"b": &RegistryRefSpec{isOverride: true},
		},
	}

	err := write(fs, "/", spec)
	require.NoError(t, err)

	assertExists(t, fs, specPath("/"))
	assertContents(t, fs, "write-app.yaml", specPath("/"))

	assertExists(t, fs, overridePath("/"))
	assertContents(t, fs, "write-override.yaml", overridePath("/"))
}

func Test_write_no_override(t *testing.T) {
	fs := afero.NewMemMapFs()

	spec := &Spec{
		APIVersion: "0.1.0",
		Environments: EnvironmentSpecs{
			"a": &EnvironmentSpec{},
		},
		Registries: RegistryRefSpecs{
			"a": &RegistryRefSpec{},
		},
	}

	err := write(fs, "/", spec)
	require.NoError(t, err)

	assertExists(t, fs, specPath("/"))
	assertContents(t, fs, "write-app.yaml", specPath("/"))

	assertNotExists(t, fs, overridePath("/"))
}

func Test_read(t *testing.T) {
	fs := afero.NewMemMapFs()

	stageFile(t, fs, "write-app.yaml", specPath("/"))
	stageFile(t, fs, "write-override.yaml", overridePath("/"))

	spec, err := read(fs, "/")
	require.NoError(t, err)

	expected := &Spec{
		APIVersion:   "0.1.0",
		Contributors: ContributorSpecs{},
		Environments: EnvironmentSpecs{
			"a": &EnvironmentSpec{},
			"b": &EnvironmentSpec{isOverride: true},
		},
		Libraries: LibraryRefSpecs{},
		Registries: RegistryRefSpecs{
			"a": &RegistryRefSpec{},
			"b": &RegistryRefSpec{isOverride: true},
		},
	}

	require.Equal(t, expected, spec)
}

func TestEnvironmentSpec_MakePath(t *testing.T) {
	rootPath := "/"

	spec := EnvironmentSpec{Path: "default"}

	expected := filepath.Join("/", "environments", "default")
	got := spec.MakePath(rootPath)

	require.Equal(t, expected, got)
}

func assertExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)

	require.True(t, exists, "%q does not exist", path)
}

func assertNotExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)

	require.False(t, exists, "%q exists", path)
}

func assertContents(t *testing.T, fs afero.Fs, expectedPath, contentPath string) {
	expected, err := ioutil.ReadFile(filepath.Join("testdata", expectedPath))
	require.NoError(t, err)

	got, err := afero.ReadFile(fs, contentPath)
	require.NoError(t, err)

	require.Equal(t, string(expected), string(got), "unexpected %q contents", contentPath)
}

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

package appinit

import (
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/ksonnet/ksonnet/pkg/registry/mocks"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

func TestInit(t *testing.T) {
	name := "app"
	rootPath := "/app"
	specFlag := "version:v1.8.7"
	serverURI := "http://example.com"
	namespace := "my-namespace"

	r := &mocks.Registry{}

	regRefSpec := &app.RegistryRefSpec{
		Name: "incubator",
	}
	r.On("MakeRegistryRefSpec").Return(regRefSpec)

	regSpec := &registry.Spec{}
	r.On("FetchRegistrySpec").Return(regSpec, nil)

	specFilePath := filepath.Join("testdata", "registry.yaml")
	r.On("RegistrySpecFilePath").Return(specFilePath)

	registries := []registry.Registry{r}

	cases := []struct {
		name     string
		appName  string
		rootPath string
		envName  string
		isErr    bool
	}{
		{
			name:     "with valid aptions",
			appName:  name,
			rootPath: rootPath,
		},
		{
			name:     "set env name",
			appName:  name,
			rootPath: rootPath,
			envName:  "env-name",
		},
		{
			name:     "path exists",
			rootPath: "/existing",
			isErr:    true,
		},
		{
			name:    "invalid app name",
			appName: "--",
			isErr:   true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			fs := afero.NewMemMapFs()
			err := fs.MkdirAll("/existing", 0755)
			require.NoError(t, err)

			i := new(fs, tc.appName, tc.rootPath, tc.envName, specFlag, serverURI, namespace, registries)
			err = i.Run()

			if tc.isErr {
				require.Error(t, err)
				return
			}

			require.NoError(t, err)

			envName := tc.envName
			if envName == "" {
				envName = "default"
			}

			checkApp(t, fs, rootPath, "v1.8.7", envName)
		})
	}

}

func checkApp(t *testing.T, fs afero.Fs, rootPath, version, namespace string) {
	expectedDirs := []string{
		".gitignore",
		"app.yaml",
		filepath.Join(".ksonnet", "registries", "testdata", "registry.yaml"),
		filepath.Join("components", "params.libsonnet"),
		"vendor",
		filepath.Join("environments", "base.libsonnet"),
		filepath.Join("environments", namespace, "main.jsonnet"),
		filepath.Join("environments", namespace, "params.libsonnet"),
		filepath.Join("environments", namespace, "globals.libsonnet"),
	}

	for _, d := range expectedDirs {
		p := filepath.Join(rootPath, d)
		assertExists(t, fs, p)
	}

	assertLib(t, fs, rootPath, version)

}

func assertExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)
	require.True(t, exists, "expected %s to exist", path)

}

func assertLib(t *testing.T, fs afero.Fs, root, version string) {
	files := []string{"swagger.json", "k.libsonnet", "k8s.libsonnet"}
	for _, f := range files {
		path := filepath.Join(root, "lib", version, f)
		assertExists(t, fs, path)
	}
}

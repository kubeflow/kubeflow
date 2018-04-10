// Copyright 2018 The kubecfg authors
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
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestApp010_AddEnvironment(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		envs, err := app.Environments()
		require.NoError(t, err)

		envLen := len(envs)

		newEnv := &EnvironmentSpec{
			Destination: &EnvironmentDestinationSpec{
				Namespace: "some-namespace",
				Server:    "http://example.com",
			},
			Path: "us-west/qa",
		}

		k8sSpecFlag := "version:v1.8.7"
		err = app.AddEnvironment("us-west/qa", k8sSpecFlag, newEnv, false)
		require.NoError(t, err)

		envs, err = app.Environments()
		require.NoError(t, err)
		require.Len(t, envs, envLen+1)

		env, err := app.Environment("us-west/qa")
		require.NoError(t, err)
		require.Equal(t, "v1.8.7", env.KubernetesVersion)
	})
}

func TestApp010_AddEnvironment_empty_spec_flag(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		envs, err := app.Environments()
		require.NoError(t, err)

		envLen := len(envs)

		env, err := app.Environment("default")
		require.NoError(t, err)

		env.Destination.Namespace = "updated"

		err = app.AddEnvironment("default", "", env, false)
		require.NoError(t, err)

		envs, err = app.Environments()
		require.NoError(t, err)
		require.Len(t, envs, envLen)

		env, err = app.Environment("default")
		require.NoError(t, err)
		require.Equal(t, "v1.7.0", env.KubernetesVersion)
		require.Equal(t, "updated", env.Destination.Namespace)
	})
}

func TestApp0101_Environments(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		expected := EnvironmentSpecs{
			"default": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "some-namespace",
					Server:    "http://example.com",
				},
				KubernetesVersion: "v1.7.0",
				Path:              "default",
			},
			"us-east/test": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "some-namespace",
					Server:    "http://example.com",
				},
				KubernetesVersion: "v1.7.0",
				Path:              "us-east/test",
			},
			"us-west/test": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "some-namespace",
					Server:    "http://example.com",
				},
				KubernetesVersion: "v1.7.0",
				Path:              "us-west/test",
			},
			"us-west/prod": &EnvironmentSpec{
				Destination: &EnvironmentDestinationSpec{
					Namespace: "some-namespace",
					Server:    "http://example.com",
				},
				KubernetesVersion: "v1.7.0",
				Path:              "us-west/prod",
			},
		}
		envs, err := app.Environments()
		require.NoError(t, err)

		require.Equal(t, expected, envs)
	})
}

func TestApp010_Environment(t *testing.T) {
	cases := []struct {
		name    string
		envName string
		isErr   bool
	}{
		{
			name:    "existing env",
			envName: "us-east/test",
		},
		{
			name:    "invalid env",
			envName: "missing",
			isErr:   true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			withApp010Fs(t, "app010_app.yaml", func(app *App010) {
				spec, err := app.Environment(tc.envName)
				if tc.isErr {
					require.Error(t, err)
				} else {
					require.NoError(t, err)
					require.Equal(t, tc.envName, spec.Path)
				}
			})
		})
	}
}

func TestApp010_Init_no_legacy_environments(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		err := app.Init()
		require.NoError(t, err)
	})
}

func TestApp010_Init_legacy_environments(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		stageFile(t, app.Fs(), "spec.json", "/environments/default/spec.json")

		err := app.Init()
		require.Error(t, err)
	})
}

func TestApp0101_LibPath(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		path, err := app.LibPath("default")
		require.NoError(t, err)

		expected := filepath.Join("/", "lib", "v1.7.0")
		require.Equal(t, expected, path)
	})
}

func TestApp010_RemoveEnvironment(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		_, err := app.Environment("default")
		require.NoError(t, err)

		err = app.RemoveEnvironment("default", false)
		require.NoError(t, err)

		_, err = app.Environment("default")
		require.Error(t, err)
	})
}

func TestApp010_RenameEnvironment(t *testing.T) {
	cases := []struct {
		name           string
		from           string
		to             string
		shouldExist    []string
		shouldNotExist []string
	}{
		{
			name: "rename",
			from: "default",
			to:   "renamed",
			shouldExist: []string{
				"/environments/renamed/main.jsonnet",
			},
			shouldNotExist: []string{
				"/environments/default",
			},
		},
		{
			name: "rename to nested",
			from: "default",
			to:   "default/nested",
			shouldExist: []string{
				"/environments/default/nested/main.jsonnet",
			},
			shouldNotExist: []string{
				"/environments/default/main.jsonnet",
			},
		},
		{
			name: "un-nest",
			from: "us-east/test",
			to:   "us-east",
			shouldExist: []string{
				"/environments/us-east/main.jsonnet",
			},
			shouldNotExist: []string{
				"/environments/us-east/test",
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			withApp010Fs(t, "app010_app.yaml", func(app *App010) {
				err := app.RenameEnvironment(tc.from, tc.to, false)
				require.NoError(t, err)

				for _, p := range tc.shouldExist {
					checkExist(t, app.Fs(), p)
				}

				for _, p := range tc.shouldNotExist {
					checkNotExist(t, app.Fs(), p)
				}

				_, err = app.Environment(tc.from)
				assert.Error(t, err)

				_, err = app.Environment(tc.to)
				assert.NoError(t, err)
			})
		})
	}
}

func TestApp010_Upgrade(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		err := app.Upgrade(false)
		require.NoError(t, err)
	})
}

func TestApp0101_UpdateTargets(t *testing.T) {
	withApp010Fs(t, "app010_app.yaml", func(app *App010) {
		err := app.UpdateTargets("default", []string{"foo"})
		require.NoError(t, err)

		e, err := app.Environment("default")
		require.NoError(t, err)

		expected := []string{"foo"}
		require.Equal(t, expected, e.Targets)
	})
}

func withApp010Fs(t *testing.T, appName string, fn func(app *App010)) {
	ogLibUpdater := LibUpdater
	LibUpdater = func(fs afero.Fs, k8sSpecFlag string, libPath string, useVersionPath bool) (string, error) {
		return "v1.8.7", nil
	}

	defer func() {
		LibUpdater = ogLibUpdater
	}()

	dir, err := ioutil.TempDir("", "")
	require.NoError(t, err)

	defer os.RemoveAll(dir)

	fs := afero.NewBasePathFs(afero.NewOsFs(), dir)

	envDirs := []string{
		"default",
		"us-east/test",
		"us-west/test",
		"us-west/prod",
	}

	for _, dir := range envDirs {
		path := filepath.Join("/environments", dir)
		err = fs.MkdirAll(path, DefaultFolderPermissions)
		require.NoError(t, err)

		swaggerPath := filepath.Join(path, "main.jsonnet")
		stageFile(t, fs, "main.jsonnet", swaggerPath)
	}

	stageFile(t, fs, appName, "/app.yaml")

	app := NewApp010(fs, "/")

	fn(app)
}

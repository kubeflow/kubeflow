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

package app

import (
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

func Test_baseApp_AddRegistry(t *testing.T) {
	fs := afero.NewMemMapFs()

	stageFile(t, fs, "app010_app.yaml", "/app.yaml")

	ba := newBaseApp(fs, "/")

	reg := &RegistryRefSpec{
		Name: "new",
	}

	err := ba.AddRegistry(reg, false)
	require.NoError(t, err)

	assertContents(t, fs, "add-registry.yaml", ba.configPath())
	assertNotExists(t, fs, ba.overridePath())
}

func Test_baseApp_AddRegistry_override(t *testing.T) {
	fs := afero.NewMemMapFs()

	stageFile(t, fs, "app010_app.yaml", "/app.yaml")

	ba := newBaseApp(fs, "/")

	reg := &RegistryRefSpec{
		Name: "new",
	}

	err := ba.AddRegistry(reg, true)
	require.NoError(t, err)

	assertContents(t, fs, "app010_app.yaml", ba.configPath())
	assertContents(t, fs, "add-registry-override.yaml", ba.overridePath())
}

func Test_baseApp_AddRegistry_override_existing(t *testing.T) {
	fs := afero.NewMemMapFs()

	stageFile(t, fs, "app010_app.yaml", "/app.yaml")

	ba := newBaseApp(fs, "/")

	reg := &RegistryRefSpec{
		Name: "incubator",
	}

	err := ba.AddRegistry(reg, true)
	require.NoError(t, err)
}

func Test_baseApp_load_override(t *testing.T) {
	fs := afero.NewMemMapFs()

	stageFile(t, fs, "app010_app.yaml", "/app.yaml")
	stageFile(t, fs, "add-registry-override.yaml", "/app.override.yaml")

	ba := newBaseApp(fs, "/")

	err := ba.load()
	require.NoError(t, err)

	_, ok := ba.overrides.Registries["new"]
	require.True(t, ok)
}

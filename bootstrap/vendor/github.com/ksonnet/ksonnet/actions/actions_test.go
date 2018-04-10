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

package actions

import (
	"io/ioutil"
	"path/filepath"
	"testing"

	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/registry"
	rmocks "github.com/ksonnet/ksonnet/pkg/registry/mocks"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_optionsLoader_loadApp(t *testing.T) {
	withApp(t, func(a *mocks.App) {
		cases := []struct {
			name  string
			m     map[string]interface{}
			isErr bool
		}{
			{
				name: "with app",
				m: map[string]interface{}{
					OptionApp: a,
				},
			},
			{
				name: "with invalid app",
				m: map[string]interface{}{
					OptionApp: "invalid",
				},
				isErr: true,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				ol := newOptionLoader(tc.m)

				got := ol.loadApp()
				if tc.isErr {
					require.Error(t, ol.err)
					return
				}

				require.NoError(t, ol.err)
				assert.Equal(t, a, got)
			})
		}

	})
}

func withApp(t *testing.T, fn func(*mocks.App)) {
	fs := afero.NewMemMapFs()

	appMock := &mocks.App{}
	appMock.On("Fs").Return(fs)
	appMock.On("Root").Return("/")

	fn(appMock)
}

func assertOutput(t *testing.T, filename, actual string) {
	path := filepath.Join("testdata", filename)
	b, err := ioutil.ReadFile(path)
	require.NoError(t, err)

	require.Equal(t, string(b), actual)
}

func stageFile(t *testing.T, fs afero.Fs, src, dest string) {
	in := filepath.Join("testdata", src)

	b, err := ioutil.ReadFile(in)
	require.NoError(t, err)

	dir := filepath.Dir(dest)
	err = fs.MkdirAll(dir, 0755)
	require.NoError(t, err)

	err = afero.WriteFile(fs, dest, b, 0644)
	require.NoError(t, err)
}

func mockNsWithName(name string) *cmocks.Module {
	m := &cmocks.Module{}
	m.On("Name").Return(name)
	return m
}

func mockRegistry(name string, isOverride bool) *rmocks.Registry {
	m := &rmocks.Registry{}
	m.On("Name").Return(name)
	m.On("Protocol").Return(registry.ProtocolGitHub)
	m.On("URI").Return("github.com/ksonnet/parts/tree/master/incubator")
	m.On("IsOverride").Return(isOverride)

	return m
}

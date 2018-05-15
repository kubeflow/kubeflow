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
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/registry"
	rmocks "github.com/ksonnet/ksonnet/pkg/registry/mocks"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestInit(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		aFs := appMock.Fs()
		aName := "my-app"
		aRootPath := appMock.Root()
		aK8sSpecFlag := "specFlag"
		aServerURI := "http://example.com"
		aNamespace := "my-namespace"

		cases := []struct {
			name           string
			skipRegistries bool
			envName        string
		}{
			{
				name: "with registries",
			},
			{
				name:           "without registries",
				skipRegistries: true,
			},
			{
				name:    "custom env name",
				envName: "env-name",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				in := map[string]interface{}{
					OptionFs:                    aFs,
					OptionName:                  aName,
					OptionRootPath:              aRootPath,
					OptionEnvName:               tc.envName,
					OptionSpecFlag:              aK8sSpecFlag,
					OptionServer:                aServerURI,
					OptionNamespace:             aNamespace,
					OptionSkipDefaultRegistries: tc.skipRegistries,
				}

				a, err := NewInit(in)
				require.NoError(t, err)

				a.appInitFn = func(fs afero.Fs, name, rootPath, envName, k8sSpecFlag, serverURI, namespace string, registries []registry.Registry) error {
					assert.Equal(t, aFs, fs)
					assert.Equal(t, aName, name)
					assert.Equal(t, aRootPath, rootPath)
					assert.Equal(t, tc.envName, envName)
					assert.Equal(t, aK8sSpecFlag, k8sSpecFlag)
					assert.Equal(t, aServerURI, serverURI)
					assert.Equal(t, aNamespace, namespace)

					if !tc.skipRegistries {
						assert.Len(t, registries, 1)
						r := registries[0]

						assert.Equal(t, "github", r.Protocol())
						assert.Equal(t, "github.com/ksonnet/parts/tree/master/incubator", r.URI())
						assert.Equal(t, "incubator", r.Name())
					} else {
						assert.Empty(t, registries)
					}

					return nil
				}

				a.appLoadFn = func(fs afero.Fs, root string, skipFindRoot bool) (app.App, error) {
					return appMock, nil
				}

				a.initIncubatorFn = func(a app.App) (registry.Registry, error) {
					r := &rmocks.Registry{}
					r.On("Protocol").Return("github")
					r.On("URI").Return("github.com/ksonnet/parts/tree/master/incubator")
					r.On("Name").Return("incubator")
					return r, nil
				}

				err = a.Run()
				require.NoError(t, err)
			})
		}

	})
}

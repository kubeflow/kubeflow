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
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/stretchr/testify/require"
)

func TestPkgInstall(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		libName := "incubator/apache"
		customName := "customName"

		dc := func(a app.App, d pkg.Descriptor, cn string) error {
			expectedD := pkg.Descriptor{
				Registry: "incubator",
				Part:     "apache",
			}
			require.Equal(t, expectedD, d)
			require.Equal(t, "customName", cn)
			return nil
		}

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionLibName: libName,
			OptionName:    customName,
		}

		a, err := NewPkgInstall(in)
		require.NoError(t, err)

		a.depCacherFn = dc

		libaries := app.LibraryRefSpecs{}
		appMock.On("Libraries").Return(libaries, nil)

		registries := app.RegistryRefSpecs{
			"incubator": &app.RegistryRefSpec{
				Protocol: registry.ProtocolFilesystem,
				URI:      "file:///tmp",
			},
		}
		appMock.On("Registries").Return(registries, nil)

		err = a.Run()
		require.NoError(t, err)
	})
}

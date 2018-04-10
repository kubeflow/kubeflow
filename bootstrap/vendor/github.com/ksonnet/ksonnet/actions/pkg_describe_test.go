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
	"bytes"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/stretchr/testify/require"
)

func TestPkgDescribe_library(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		libaries := app.LibraryRefSpecs{
			"apache": &app.LibraryRefSpec{},
		}
		appMock.On("Libraries").Return(libaries, nil)

		in := map[string]interface{}{
			OptionApp:         appMock,
			OptionPackageName: "apache",
		}

		a, err := NewPkgDescribe(in)
		require.NoError(t, err)

		var buf bytes.Buffer
		a.out = &buf

		a.libPartFn = func(a app.App, name string) (*pkg.Package, error) {
			p := &pkg.Package{
				Name:        "apache",
				Description: "description",
			}

			return p, nil
		}

		err = a.Run()
		require.NoError(t, err)

		assertOutput(t, "pkg/describe/output.txt", buf.String())
	})
}

func TestPkgDescribe_registry(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		registries := app.RegistryRefSpecs{
			"incubator": &app.RegistryRefSpec{},
		}
		appMock.On("Registries").Return(registries, nil)

		in := map[string]interface{}{
			OptionApp:         appMock,
			OptionPackageName: "incubator/apache",
		}

		a, err := NewPkgDescribe(in)
		require.NoError(t, err)

		var buf bytes.Buffer
		a.out = &buf

		a.registryPartFn = func(a app.App, name string) (*pkg.Package, error) {
			p := &pkg.Package{
				Name:        "apache",
				Description: "description",
			}

			return p, nil
		}

		err = a.Run()
		require.NoError(t, err)

		assertOutput(t, "pkg/describe/output.txt", buf.String())
	})
}

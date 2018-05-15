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

package registry

import (
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

func Test_CacheDependency(t *testing.T) {
	withApp(t, func(a *amocks.App, fs afero.Fs) {
		test.StageDir(t, fs, "incubator", filepath.Join("/work", "incubator"))

		libraries := app.LibraryRefSpecs{}
		a.On("Libraries").Return(libraries, nil)

		registries := app.RegistryRefSpecs{
			"incubator": &app.RegistryRefSpec{
				Name:     "incubator",
				Protocol: ProtocolFilesystem,
				URI:      "file:///work/incubator",
			},
		}
		a.On("Registries").Return(registries, nil)

		library := &app.LibraryRefSpec{
			Name:     "apache",
			Registry: "incubator",
		}
		a.On("UpdateLib", "apache", library).Return(nil)

		d := pkg.Descriptor{Registry: "incubator", Part: "apache"}

		err := CacheDependency(a, d, "")
		require.NoError(t, err)

		test.AssertExists(t, fs, filepath.Join(a.Root(), "vendor", "incubator", "apache", "parts.yaml"))
	})
}

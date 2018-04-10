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
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/stretchr/testify/require"
)

func TestRegistryDescribe(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		in := map[string]interface{}{
			OptionApp:  appMock,
			OptionName: "incubator",
		}

		a, err := NewRegistryDescribe(in)
		require.NoError(t, err)

		var buf bytes.Buffer
		a.out = &buf

		a.fetchRegistrySpecFn = func(a app.App, name string) (*registry.Spec, *app.RegistryRefSpec, error) {
			require.Equal(t, "incubator", name)

			spec := &registry.Spec{
				Libraries: registry.LibraryRefSpecs{
					"apache":    &registry.LibraryRef{Path: "apache"},
					"efk":       &registry.LibraryRef{Path: "efk"},
					"mariadb":   &registry.LibraryRef{Path: "mariadb"},
					"memcached": &registry.LibraryRef{Path: "memcached"},
					"mongodb":   &registry.LibraryRef{Path: "mongodb"},
					"mysql":     &registry.LibraryRef{Path: "mysql"},
					"nginx":     &registry.LibraryRef{Path: "nginx"},
					"node":      &registry.LibraryRef{Path: "node"},
					"postres":   &registry.LibraryRef{Path: "postgres"},
					"redis":     &registry.LibraryRef{Path: "redis"},
					"tomcat":    &registry.LibraryRef{Path: "tomcat"},
				},
			}

			regRef := &app.RegistryRefSpec{
				Name:     "incubator",
				URI:      "github.com/ksonnet/parts/tree/master/incubator",
				Protocol: "github",
			}

			return spec, regRef, nil
		}

		err = a.Run()
		require.NoError(t, err)

		assertOutput(t, "registry/describe/output.txt", buf.String())
	})
}

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

package pkg

import (
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPackage_Prototypes(t *testing.T) {
	test.WithApp(t, "/", func(a *mocks.App, fs afero.Fs) {
		test.StageDir(t, fs, filepath.Join("incubator", "apache"), "/vendor/apache")

		libs := app.LibraryRefSpecs{
			"apache": &app.LibraryRefSpec{},
		}
		a.On("Libraries").Return(libs, nil)

		p, err := Find(a, "apache")
		require.NoError(t, err)

		require.Len(t, p.Prototypes, 1)
	})
}

func Test_Find(t *testing.T) {
	test.WithApp(t, "/", func(a *mocks.App, fs afero.Fs) {
		test.StageDir(t, fs, filepath.Join("incubator", "apache"), "/vendor/incubator/apache")

		libs := app.LibraryRefSpecs{
			"apache": &app.LibraryRefSpec{
				Registry: "incubator",
			},
		}
		a.On("Libraries").Return(libs, nil)

		cases := []struct {
			name     string
			partName string
			desc     string
			isErr    bool
		}{
			{
				name:     "part exists",
				partName: "apache",
				desc:     "part description",
			},
			{
				name:     "part does not exist",
				partName: "invalid",
				isErr:    true,
			},
			{
				name:     "invalid part name",
				partName: "@invalid",
				isErr:    true,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				p, err := Find(a, tc.partName)

				if tc.isErr {
					require.Error(t, err)
					return
				}

				require.NoError(t, err)

				assert.Equal(t, tc.partName, p.Name)
				assert.Equal(t, tc.desc, p.Description)
			})
		}

	})
}

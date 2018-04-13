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

package component

import (
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestModule_Components(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {
		test.StageFile(t, fs, "certificate-crd.yaml", "/app/components/ns1/certificate-crd.yaml")
		test.StageFile(t, fs, "params-with-entry.libsonnet", "/app/components/ns1/params.libsonnet")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/app/components/params.libsonnet")

		cases := []struct {
			name   string
			module string
			count  int
		}{
			{
				name:   "no components",
				module: "/",
			},
			{
				name:   "with components",
				module: "ns1",
				count:  1,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {

				ns, err := GetModule(a, tc.module)
				require.NoError(t, err)

				assert.Equal(t, tc.module, ns.Name())
				components, err := ns.Components()
				require.NoError(t, err)

				assert.Len(t, components, tc.count)
			})
		}
	})
}

func TestFilesystemModule_DeleteParam(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {
		test.StageFile(t, fs, "params-global.libsonnet", "/app/components/params.libsonnet")

		module := NewModule(a, "/")

		err := module.DeleteParam([]string{"metadata"})
		require.NoError(t, err)

		test.AssertContents(t, fs, "params-delete-global.libsonnet", "/app/components/params.libsonnet")
	})
}

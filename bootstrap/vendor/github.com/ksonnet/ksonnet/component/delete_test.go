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
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

func TestDelete(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {
		test.StageDir(t, fs, "delete", "/app")

		envs := app.EnvironmentSpecs{
			"default": &app.EnvironmentSpec{},
		}
		a.On("Environments").Return(envs, nil)

		err := Delete(a, "guestbook-ui")
		require.NoError(t, err)

		test.AssertNotExists(t, fs, filepath.Join("/app", "components", "guestbook-ui.jsonnet"))
		test.AssertContents(
			t,
			fs,
			"delete-params.libsonnet",
			filepath.Join("/app", "components", "params.libsonnet"),
		)
		test.AssertContents(
			t,
			fs,
			"delete-env-params.libsonnet",
			filepath.Join("/app", "environments", "default", "params.libsonnet"),
		)
	})
}

// Copyright 2018 The kubecfg authors
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

package env

import (
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
)

func TestRename(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		appMock.On("RenameEnvironment", "env1", "env1-updated", false).Return(nil)

		err := Rename(appMock, "env1", "env1-updated", false)
		require.NoError(t, err)
	})
}

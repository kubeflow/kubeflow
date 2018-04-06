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
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEnvRm(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		aName := "my-app"
		aIsOverride := false

		in := map[string]interface{}{
			OptionApp:      appMock,
			OptionEnvName:  aName,
			OptionOverride: aIsOverride,
		}

		a, err := NewEnvRm(in)
		require.NoError(t, err)

		a.envDeleteFn = func(a app.App, name string, override bool) error {
			assert.Equal(t, appMock, a)
			assert.Equal(t, aName, name)
			assert.Equal(t, aIsOverride, override)

			return nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

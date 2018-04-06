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
	"github.com/ksonnet/ksonnet/pkg/env"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEnvAdd(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		aName := "my-app"
		aServer := "http://example.com"
		aNamespace := "default"
		aK8sSpecFlag := "flag"
		aIsOverride := false

		in := map[string]interface{}{
			OptionApp:      appMock,
			OptionEnvName:  aName,
			OptionServer:   aServer,
			OptionModule:   aNamespace,
			OptionSpecFlag: aK8sSpecFlag,
			OptionOverride: aIsOverride,
		}

		a, err := NewEnvAdd(in)
		require.NoError(t, err)

		a.envCreateFn = func(a app.App, d env.Destination, name, specFlag string, od, pd []byte, override bool) error {

			expectedDest := env.NewDestination(aServer, aNamespace)
			assert.Equal(t, expectedDest, d)

			assert.Equal(t, appMock, a)
			assert.Equal(t, aName, name)
			assert.Equal(t, aK8sSpecFlag, specFlag)
			assert.Equal(t, aIsOverride, override)

			return nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

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

	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/require"
)

func TestUpgrade(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		appMock.On("Upgrade", true).Return(nil)

		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionDryRun: true,
		}

		a, err := newUpgrade(in)
		require.NoError(t, err)

		err = a.run()
		require.NoError(t, err)
	})
}

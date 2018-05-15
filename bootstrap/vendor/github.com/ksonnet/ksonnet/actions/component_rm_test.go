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

func TestComponentRm(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		name := "component-name"

		var didDelete bool

		deleteFn := func(a app.App, componentName string) error {
			assert.Equal(t, componentName, name)
			didDelete = true
			return nil
		}

		in := map[string]interface{}{
			OptionApp:           appMock,
			OptionComponentName: name,
		}

		a, err := NewComponentRm(in)
		require.NoError(t, err)

		a.componentDeleteFn = deleteFn

		err = a.Run()
		require.NoError(t, err)

		assert.True(t, didDelete)
	})
}

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

func TestEnvSet_name(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "default"
		newName := "dev"

		in := map[string]interface{}{
			OptionApp:        appMock,
			OptionEnvName:    envName,
			OptionNewEnvName: newName,
		}

		a, err := NewEnvSet(in)
		require.NoError(t, err)

		a.envRenameFn = func(a app.App, from, to string, override bool) error {
			assert.Equal(t, envName, from)
			assert.Equal(t, newName, to)
			assert.False(t, override)

			return nil
		}

		spec := &app.EnvironmentSpec{
			Destination: &app.EnvironmentDestinationSpec{
				Namespace: "default",
			},
		}

		appMock.On("Environment", envName).Return(spec, nil)

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestEnvSet_namespace(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "default"
		namespace := "ns2"

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionEnvName: envName,
			OptionModule:  namespace,
		}
		a, err := NewEnvSet(in)
		require.NoError(t, err)

		spec := &app.EnvironmentSpec{
			Destination: &app.EnvironmentDestinationSpec{
				Namespace: "default",
			},
		}

		updatedSpec := &app.EnvironmentSpec{
			Destination: &app.EnvironmentDestinationSpec{
				Namespace: namespace,
			},
		}

		appMock.On("Environment", envName).Return(spec, nil)
		appMock.On("AddEnvironment", envName, "", updatedSpec, false).Return(nil)

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestEnvSet_name_and_namespace(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "default"
		newName := "dev"
		namespace := "ns2"

		in := map[string]interface{}{
			OptionApp:        appMock,
			OptionEnvName:    envName,
			OptionNewEnvName: newName,
			OptionModule:     namespace,
		}

		a, err := NewEnvSet(in)
		require.NoError(t, err)

		a.envRenameFn = func(a app.App, from, to string, override bool) error {
			assert.Equal(t, envName, from)
			assert.Equal(t, newName, to)
			assert.False(t, override)

			return nil
		}

		a.updateEnvFn = func(a app.App, name string, spec *app.EnvironmentSpec, override bool) error {
			assert.Equal(t, envName, name)
			assert.Equal(t, namespace, spec.Destination.Namespace)
			assert.False(t, override)

			return nil
		}

		spec := &app.EnvironmentSpec{
			Destination: &app.EnvironmentDestinationSpec{
				Namespace: "default",
			},
		}

		updatedSpec := &app.EnvironmentSpec{
			Destination: &app.EnvironmentDestinationSpec{
				Namespace: namespace,
			},
		}

		appMock.On("Environment", "default").Return(spec, nil)
		appMock.On("AddEnvironment", newName, "", updatedSpec, false).Return(nil)

		err = a.Run()
		require.NoError(t, err)
	})
}

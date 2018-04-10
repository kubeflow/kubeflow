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
	"errors"
	"testing"

	"github.com/stretchr/testify/mock"

	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/require"
)

func TestEnvTargets(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "default"
		modules := []string{"foo"}

		env := &app.EnvironmentSpec{}
		appMock.On("Environment", "default").Return(env, nil)
		appMock.On("UpdateTargets", envName, modules).Return(nil)

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionEnvName: envName,
			OptionModule:  modules,
		}

		a, err := NewEnvTargets(in)
		require.NoError(t, err)

		ns := &cmocks.Module{}

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "foo").Return(ns, nil)

		a.cm = cm

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestEnvTargets_invalid_module(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "default"
		modules := []string{"foo"}

		env := &app.EnvironmentSpec{}
		appMock.On("Environment", "default").Return(env, nil)
		appMock.On("UpdateTargets", envName, modules).Return(nil)

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionEnvName: envName,
			OptionModule:  modules,
		}

		a, err := NewEnvTargets(in)
		require.NoError(t, err)

		ns := &cmocks.Module{}

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "foo").Return(ns, errors.New("fail"))

		a.cm = cm

		err = a.Run()
		require.Error(t, err)
	})
}

func TestEnvTargets_invalid_environment(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		envName := "invalid"
		modules := []string{"foo"}

		env := &app.EnvironmentSpec{}
		envErr := errors.New("environment invalid was not found")
		appMock.On("Environment", "invalid").Return(env, envErr)

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionEnvName: envName,
			OptionModule:  modules,
		}

		a, err := NewEnvTargets(in)
		require.NoError(t, err)

		cm := &cmocks.Manager{}

		a.cm = cm

		err = a.Run()
		require.Error(t, err)
	})
}

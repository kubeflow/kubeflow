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

	"github.com/ksonnet/ksonnet/component"
	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestParamDelete(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		componentName := "deployment"
		path := "replicas"

		c := &cmocks.Component{}
		c.On("DeleteParam", []string{"replicas"}, component.ParamOptions{}).Return(nil)

		in := map[string]interface{}{
			OptionApp:  appMock,
			OptionName: componentName,
			OptionPath: path,
		}

		a, err := NewParamDelete(in)
		require.NoError(t, err)

		a.resolvePathFn = func(app.App, string) (component.Module, component.Component, error) {
			return nil, c, nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestParamDelete_index(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		componentName := "deployment"
		path := "replicas"

		c := &cmocks.Component{}
		c.On("DeleteParam", []string{"replicas"}, component.ParamOptions{Index: 1}).Return(nil)

		in := map[string]interface{}{
			OptionApp:   appMock,
			OptionName:  componentName,
			OptionPath:  path,
			OptionIndex: 1,
		}

		a, err := NewParamDelete(in)
		require.NoError(t, err)

		a.resolvePathFn = func(app.App, string) (component.Module, component.Component, error) {
			return nil, c, nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestParamDelete_global(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		module := "/"
		path := "replicas"

		m := &cmocks.Module{}
		m.On("DeleteParam", []string{"replicas"}).Return(nil)

		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionName:   module,
			OptionPath:   path,
			OptionGlobal: true,
		}

		a, err := NewParamDelete(in)
		require.NoError(t, err)

		a.getModuleFn = func(app.App, string) (component.Module, error) {
			return m, nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestParamDelete_env(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		name := "deployment"
		path := "replicas"

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionName:    name,
			OptionPath:    path,
			OptionEnvName: "default",
		}

		a, err := NewParamDelete(in)
		require.NoError(t, err)

		envDelete := func(ksApp app.App, envName, name, pName string) error {
			assert.Equal(t, "default", envName)
			assert.Equal(t, "deployment", name)
			assert.Equal(t, "replicas", pName)
			return nil
		}
		a.deleteEnvFn = envDelete

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestParamDelete_env_global(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		path := "replicas"

		in := map[string]interface{}{
			OptionApp:     appMock,
			OptionPath:    path,
			OptionEnvName: "default",
		}

		a, err := NewParamDelete(in)
		require.NoError(t, err)

		envDelete := func(ksApp app.App, envName, pName string) error {
			assert.Equal(t, "default", envName)
			assert.Equal(t, "replicas", pName)
			return nil
		}
		a.deleteEnvGlobalFn = envDelete

		err = a.Run()
		require.NoError(t, err)
	})
}

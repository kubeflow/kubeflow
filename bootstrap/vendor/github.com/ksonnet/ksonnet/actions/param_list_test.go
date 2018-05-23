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
	"bytes"
	"testing"

	"github.com/ksonnet/ksonnet/component"
	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestParamList_with_component_name(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		componentName := "deployment"
		module := "ns"
		envName := ""

		ns := &cmocks.Module{}

		c := &cmocks.Component{}

		nsParams := []component.ModuleParameter{
			{Component: "deployment", Index: "0", Key: "key", Value: `"value"`},
		}
		c.On("Params", "").Return(nsParams, nil)

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "ns").Return(ns, nil)
		cm.On("Component", mock.Anything, "ns", "deployment").Return(c, nil)

		in := map[string]interface{}{
			OptionApp:           appMock,
			OptionComponentName: componentName,
			OptionModule:        module,
			OptionEnvName:       envName,
		}

		a, err := NewParamList(in)
		require.NoError(t, err)

		a.cm = cm

		var buf bytes.Buffer
		a.out = &buf

		err = a.Run()
		require.NoError(t, err)

		assertOutput(t, "param_list/with_component.txt", buf.String())
	})
}

func TestParamList_without_component_name(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		componentName := ""
		module := "ns"
		envName := ""

		nsParams := []component.ModuleParameter{
			{Component: "deployment", Index: "0", Key: "key1", Value: `"value"`},
			{Component: "deployment", Index: "0", Key: "key2", Value: `"value"`},
		}

		ns := &cmocks.Module{}

		ns.On("Params", "").Return(nsParams, nil)

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "ns").Return(ns, nil)

		in := map[string]interface{}{
			OptionApp:           appMock,
			OptionComponentName: componentName,
			OptionModule:        module,
			OptionEnvName:       envName,
		}

		a, err := NewParamList(in)
		require.NoError(t, err)

		a.cm = cm

		var buf bytes.Buffer
		a.out = &buf

		err = a.Run()
		require.NoError(t, err)

		assertOutput(t, "param_list/without_component.txt", buf.String())
	})
}

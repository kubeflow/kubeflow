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

	"github.com/pkg/errors"
	"github.com/stretchr/testify/mock"

	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/require"
)

func TestModuleCreate(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionModule: "name",
		}

		a, err := NewModuleCreate(in)
		require.NoError(t, err)

		ns := &cmocks.Module{}

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "name").Return(ns, errors.New("it exists"))
		cm.On("CreateModule", mock.Anything, "name").Return(nil)

		a.cm = cm

		err = a.Run()
		require.NoError(t, err)

	})
}

func TestModuleCreate_already_exists(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionModule: "name",
		}

		a, err := NewModuleCreate(in)
		require.NoError(t, err)

		ns := &cmocks.Module{}

		cm := &cmocks.Manager{}
		cm.On("Module", mock.Anything, "name").Return(ns, nil)

		a.cm = cm

		err = a.Run()
		require.Error(t, err)
	})
}

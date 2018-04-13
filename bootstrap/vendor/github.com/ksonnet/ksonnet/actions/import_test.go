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

	"github.com/stretchr/testify/mock"

	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/stretchr/testify/require"
)

func TestImport_file(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		module := "/"
		path := "/file.yaml"

		stageFile(t, appMock.Fs(), "import/file.yaml", path)

		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionModule: module,
			OptionPath:   path,
		}

		a, err := NewImport(in)
		require.NoError(t, err)

		cm := &cmocks.Manager{}
		cm.On("CreateComponent", mock.Anything, "/file", "",
			params.Params{}, prototype.YAML).Return("/", nil)

		a.cm = cm

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestImport_directory(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		module := "/"
		path := "/import"

		stageFile(t, appMock.Fs(), "import/file.yaml", "/import/file.yaml")

		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionModule: module,
			OptionPath:   path,
		}

		a, err := NewImport(in)
		require.NoError(t, err)

		cm := &cmocks.Manager{}
		cm.On("CreateComponent", mock.Anything, "/file", "",
			params.Params{}, prototype.YAML).Return("/", nil)

		a.cm = cm

		err = a.Run()
		require.NoError(t, err)
	})
}

func TestImport_invalid_file(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		module := "/"
		path := "/import"

		in := map[string]interface{}{
			OptionApp:    appMock,
			OptionModule: module,
			OptionPath:   path,
		}

		a, err := NewImport(in)
		require.NoError(t, err)

		err = a.Run()
		require.Error(t, err)
	})
}

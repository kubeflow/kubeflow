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
	param "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPrototypeUse(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		libaries := app.LibraryRefSpecs{}

		appMock.On("Libraries").Return(libaries, nil)

		args := []string{
			"single-port-deployment",
			"myDeployment",
			"--name", "myDeployment",
			"--image", "nginx",
			"--port", "80",
		}

		in := map[string]interface{}{
			OptionApp:       appMock,
			OptionArguments: args,
		}

		a, err := NewPrototypeUse(in)
		require.NoError(t, err)

		a.createComponentFn = func(_ app.App, name string, text string, params param.Params, template prototype.TemplateType) (string, error) {
			assert.Equal(t, "myDeployment", name)
			assertOutput(t, "prototype/use/text.txt", text)

			expectedParams := param.Params{
				"name":     `"myDeployment"`,
				"image":    `"nginx"`,
				"replicas": "1",
				"port":     "80",
			}

			assert.Equal(t, expectedParams, params)
			assert.Equal(t, prototype.Jsonnet, template)

			return "", nil
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

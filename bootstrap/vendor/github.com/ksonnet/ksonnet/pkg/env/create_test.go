// Copyright 2018 The kubecfg authors
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

package env

import (
	"errors"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/mock"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/require"
)

func TestCreate(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		appMock.On("Environment", "newenv").Return(nil, errors.New("it does not exist"))
		appMock.On(
			"AddEnvironment",
			"newenv",
			"version:v1.8.7",
			mock.AnythingOfType("*app.EnvironmentSpec"),
			false,
		).Return(nil)

		d := NewDestination("http://example.com", "default")
		var od, pd []byte
		err := Create(appMock, d, "newenv", "version:v1.8.7", od, pd, false)
		require.NoError(t, err)

		checkExists(t, fs, "/environments/newenv/main.jsonnet")
		checkExists(t, fs, "/environments/newenv/params.libsonnet")
	})
}

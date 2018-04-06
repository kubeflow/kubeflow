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
	"reflect"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/metadata/params"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

func TestSetGlobalParams(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		p := params.Params{
			"foo": "bar",
		}

		err := SetGlobalParams(appMock, "env1", p)
		require.NoError(t, err)

		compareOutput(t, fs, "add-global.libsonnet", "/environments/env1/globals.libsonnet")
	})
}

func TestUnsetGlobalParams(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		err := UnsetGlobalParams(appMock, "env1", "foo")
		require.NoError(t, err)

		compareOutput(t, fs, "remove-global.libsonnet", "/environments/env1/globals.libsonnet")
	})
}

func TestSetParams(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		config := SetParamsConfig{
			App: appMock,
		}

		p := params.Params{
			"foo": "bar",
		}

		err := SetParams("env1", "component1", p, config)
		require.NoError(t, err)

		compareOutput(t, fs, "updated-params.libsonnet", "/environments/env1/params.libsonnet")
	})
}

func TestDeleteParams(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		err := DeleteParam(appMock, "env1", "component1", "foo")
		require.NoError(t, err)

		compareOutput(t, fs, "delete-params.libsonnet", "/environments/env1/params.libsonnet")
	})
}

func TestGetParams(t *testing.T) {
	withEnv(t, func(appMock *mocks.App, fs afero.Fs) {
		config := GetParamsConfig{
			App: appMock,
		}

		p, err := GetParams("env1", "", config)
		require.NoError(t, err)

		expected := map[string]params.Params{
			"component1": params.Params{
				"foo": `"bar"`,
			},
		}

		require.Equal(t, expected, p)
	})
}

func TestMergeParamMaps(t *testing.T) {
	tests := []struct {
		base      map[string]params.Params
		overrides map[string]params.Params
		expected  map[string]params.Params
	}{
		{
			map[string]params.Params{
				"bar": params.Params{"replicas": "5"},
			},
			map[string]params.Params{
				"foo": params.Params{"name": `"foo"`, "replicas": "1"},
			},
			map[string]params.Params{
				"bar": params.Params{"replicas": "5"},
				"foo": params.Params{"name": `"foo"`, "replicas": "1"},
			},
		},
		{
			map[string]params.Params{
				"bar": params.Params{"replicas": "5"},
			},
			map[string]params.Params{
				"bar": params.Params{"name": `"foo"`},
			},
			map[string]params.Params{
				"bar": params.Params{"name": `"foo"`, "replicas": "5"},
			},
		},
		{
			map[string]params.Params{
				"bar": params.Params{"name": `"bar"`, "replicas": "5"},
				"foo": params.Params{"name": `"foo"`, "replicas": "4"},
				"baz": params.Params{"name": `"baz"`, "replicas": "3"},
			},
			map[string]params.Params{
				"foo": params.Params{"replicas": "1"},
				"baz": params.Params{"name": `"foobaz"`},
			},
			map[string]params.Params{
				"bar": params.Params{"name": `"bar"`, "replicas": "5"},
				"foo": params.Params{"name": `"foo"`, "replicas": "1"},
				"baz": params.Params{"name": `"foobaz"`, "replicas": "3"},
			},
		},
	}

	for _, s := range tests {
		result := mergeParamMaps(s.base, s.overrides)
		if !reflect.DeepEqual(s.expected, result) {
			t.Errorf("Wrong merge\n  expected:\n%v\n  got:\n%v", s.expected, result)
		}
	}
}

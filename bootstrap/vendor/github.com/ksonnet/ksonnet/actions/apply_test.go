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

	"github.com/ksonnet/ksonnet/client"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/cluster"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestApply(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		in := map[string]interface{}{
			OptionApp:            appMock,
			OptionClientConfig:   &client.Config{},
			OptionComponentNames: []string{},
			OptionCreate:         true,
			OptionDryRun:         true,
			OptionEnvName:        "default",
			OptionGcTag:          "gc-tag",
			OptionSkipGc:         true,
		}

		expected := cluster.ApplyConfig{
			App:            appMock,
			ClientConfig:   &client.Config{},
			ComponentNames: []string{},
			Create:         true,
			DryRun:         true,
			EnvName:        "default",
			GcTag:          "gc-tag",
			SkipGc:         true,
		}

		runApplyOpt := func(a *Apply) {
			a.runApplyFn = func(config cluster.ApplyConfig, opts ...cluster.ApplyOpts) error {
				assert.Equal(t, expected, config)
				return nil
			}
		}

		a, err := newApply(in, runApplyOpt)
		require.NoError(t, err)

		err = a.run()
		require.NoError(t, err)
	})
}

func TestApply_invalid_input(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		in := map[string]interface{}{
			OptionClientConfig: "invalid",
		}

		_, err := newApply(in)
		require.Error(t, err)
	})
}

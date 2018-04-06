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
	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/cluster"
)

type runApplyFn func(cluster.ApplyConfig, ...cluster.ApplyOpts) error

// RunApply runs `apply`.
func RunApply(m map[string]interface{}) error {
	a, err := newApply(m)
	if err != nil {
		return err
	}

	return a.run()
}

type applyOpt func(*Apply)

// Apply collects options for applying objects to a cluster.
type Apply struct {
	app            app.App
	clientConfig   *client.Config
	componentNames []string
	create         bool
	dryRun         bool
	envName        string
	gcTag          string
	skipGc         bool

	runApplyFn runApplyFn
}

// RunApply runs `apply`
func newApply(m map[string]interface{}, opts ...applyOpt) (*Apply, error) {
	ol := newOptionLoader(m)

	a := &Apply{
		app:            ol.loadApp(),
		clientConfig:   ol.loadClientConfig(),
		componentNames: ol.loadStringSlice(OptionComponentNames),
		create:         ol.loadBool(OptionCreate),
		dryRun:         ol.loadBool(OptionDryRun),
		envName:        ol.loadString(OptionEnvName),
		gcTag:          ol.loadString(OptionGcTag),
		skipGc:         ol.loadBool(OptionSkipGc),

		runApplyFn: cluster.RunApply,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	for _, opt := range opts {
		opt(a)
	}

	return a, nil
}

func (a *Apply) run() error {
	config := cluster.ApplyConfig{
		App:            a.app,
		ClientConfig:   a.clientConfig,
		ComponentNames: a.componentNames,
		Create:         a.create,
		DryRun:         a.dryRun,
		EnvName:        a.envName,
		GcTag:          a.gcTag,
		SkipGc:         a.skipGc,
	}

	return a.runApplyFn(config)
}

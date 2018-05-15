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
	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
)

// RunEnvTargets runs `env targets`
func RunEnvTargets(m map[string]interface{}) error {
	et, err := NewEnvTargets(m)
	if err != nil {
		return err
	}

	return et.Run()
}

// EnvTargets sets targets for an environment.
type EnvTargets struct {
	app     app.App
	envName string
	modules []string
	cm      component.Manager
}

// NewEnvTargets creates an instance of EnvTargets.
func NewEnvTargets(m map[string]interface{}) (*EnvTargets, error) {
	ol := newOptionLoader(m)

	et := &EnvTargets{
		app:     ol.loadApp(),
		envName: ol.loadString(OptionEnvName),
		modules: ol.loadStringSlice(OptionModule),

		cm: component.DefaultManager,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return et, nil
}

// Run assigns targets to an environment.
func (et *EnvTargets) Run() error {
	_, err := et.app.Environment(et.envName)
	if err != nil {
		return err
	}

	for _, module := range et.modules {
		_, err := et.cm.Module(et.app, module)
		if err != nil {
			return err
		}
	}

	return et.app.UpdateTargets(et.envName, et.modules)
}

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
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/env"
)

// RunEnvAdd runs `env add`
func RunEnvAdd(m map[string]interface{}) error {
	ea, err := NewEnvAdd(m)
	if err != nil {
		return err
	}

	return ea.Run()
}

// EnvAdd sets targets for an environment.
type EnvAdd struct {
	app         app.App
	envName     string
	server      string
	namespace   string
	k8sSpecFlag string
	isOverride  bool

	envCreateFn func(a app.App, d env.Destination, name, k8sSpecFlag string, overrideData, paramsData []byte, isOverride bool) error
}

// NewEnvAdd creates an instance of EnvAdd.
func NewEnvAdd(m map[string]interface{}) (*EnvAdd, error) {
	ol := newOptionLoader(m)

	ea := &EnvAdd{
		app:         ol.loadApp(),
		envName:     ol.loadString(OptionEnvName),
		server:      ol.loadString(OptionServer),
		namespace:   ol.loadString(OptionModule),
		k8sSpecFlag: ol.loadString(OptionSpecFlag),
		isOverride:  ol.loadBool(OptionOverride),

		envCreateFn: env.Create,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return ea, nil
}

// Run assigns targets to an environment.
func (ea *EnvAdd) Run() error {
	destination := env.NewDestination(ea.server, ea.namespace)

	return ea.envCreateFn(
		ea.app,
		destination,
		ea.envName,
		ea.k8sSpecFlag,
		env.DefaultOverrideData,
		env.DefaultParamsData,
		ea.isOverride,
	)
}

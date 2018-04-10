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

// RunEnvRm runs `env rm`
func RunEnvRm(m map[string]interface{}) error {
	ea, err := NewEnvRm(m)
	if err != nil {
		return err
	}

	return ea.Run()
}

type envDeleteFn func(a app.App, name string, override bool) error

// EnvRm sets targets for an environment.
type EnvRm struct {
	app        app.App
	envName    string
	isOverride bool

	envDeleteFn envDeleteFn
}

// NewEnvRm creates an instance of EnvRm.
func NewEnvRm(m map[string]interface{}) (*EnvRm, error) {
	ol := newOptionLoader(m)

	ea := &EnvRm{
		app:        ol.loadApp(),
		envName:    ol.loadString(OptionEnvName),
		isOverride: ol.loadBool(OptionOverride),

		envDeleteFn: env.Delete,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return ea, nil
}

// Run assigns targets to an environment.
func (er *EnvRm) Run() error {
	return er.envDeleteFn(
		er.app,
		er.envName,
		er.isOverride,
	)
}

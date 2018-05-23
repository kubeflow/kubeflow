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

// EnvSetNamespace is an option for setting a new namespace name.
func EnvSetNamespace(nsName string) EnvSetOpt {
	return func(es *EnvSet) {
		es.newNsName = nsName
	}
}

// EnvSetName is an option for setting a new name.
func EnvSetName(name string) EnvSetOpt {
	return func(es *EnvSet) {
		es.newName = name
	}
}

// EnvSetOpt is an option for configuring EnvSet.
type EnvSetOpt func(*EnvSet)

// RunEnvSet runs `env set`
// func RunEnvSet(ksApp app.App, envName string, opts ...EnvSetOpt) error {
func RunEnvSet(m map[string]interface{}) error {
	et, err := NewEnvSet(m)
	if err != nil {
		return err
	}

	return et.Run()
}

// EnvSet sets targets for an environment.
type EnvSet struct {
	app       app.App
	envName   string
	newName   string
	newNsName string

	envRenameFn func(a app.App, from, to string, override bool) error
	updateEnvFn func(a app.App, envName string, spec *app.EnvironmentSpec, override bool) error
}

// NewEnvSet creates an instance of EnvSet.
func NewEnvSet(m map[string]interface{}) (*EnvSet, error) {
	ol := newOptionLoader(m)

	es := &EnvSet{
		app:       ol.loadApp(),
		envName:   ol.loadString(OptionEnvName),
		newName:   ol.loadOptionalString(OptionNewEnvName),
		newNsName: ol.loadOptionalString(OptionNamespace),

		envRenameFn: env.Rename,
		updateEnvFn: updateEnv,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return es, nil
}

// Run assigns targets to an environment.
func (es *EnvSet) Run() error {
	env, err := es.app.Environment(es.envName)
	if err != nil {
		return err
	}

	if err := es.updateName(env.IsOverride()); err != nil {
		return err
	}

	return es.updateNamespace(env)
}

func (es *EnvSet) updateName(isOverride bool) error {
	if es.newName != "" {
		if err := es.envRenameFn(es.app, es.envName, es.newName, isOverride); err != nil {
			return err
		}

		es.envName = es.newName
	}

	return nil
}

func (es *EnvSet) updateNamespace(env *app.EnvironmentSpec) error {
	if es.newNsName != "" {
		env.Destination.Namespace = es.newNsName
		return updateEnv(es.app, es.envName, env, env.IsOverride())
	}

	return nil
}

func updateEnv(a app.App, envName string, spec *app.EnvironmentSpec, override bool) error {
	return a.AddEnvironment(envName, "", spec, override)
}

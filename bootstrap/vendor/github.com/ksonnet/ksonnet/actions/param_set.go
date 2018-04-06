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
	"strings"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	mp "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/pkg/env"
	"github.com/ksonnet/ksonnet/pkg/params"
	"github.com/pkg/errors"
)

// RunParamSet runs `param set`
func RunParamSet(m map[string]interface{}) error {
	ps, err := NewParamSet(m)
	if err != nil {
		return err
	}

	return ps.Run()
}

// ParamSet sets a parameter for a component.
type ParamSet struct {
	app      app.App
	name     string
	rawPath  string
	rawValue string
	index    int
	global   bool
	envName  string

	getModuleFn    getModuleFn
	resolvePathFn  func(a app.App, path string) (component.Module, component.Component, error)
	setEnvFn       func(ksApp app.App, envName, name, pName, value string) error
	setGlobalEnvFn func(ksApp app.App, envName, pName, value string) error
}

// NewParamSet creates an instance of ParamSet.
func NewParamSet(m map[string]interface{}) (*ParamSet, error) {
	ol := newOptionLoader(m)

	ps := &ParamSet{
		app:      ol.loadApp(),
		name:     ol.loadOptionalString(OptionName),
		rawPath:  ol.loadString(OptionPath),
		rawValue: ol.loadString(OptionValue),
		global:   ol.loadOptionalBool(OptionGlobal),
		envName:  ol.loadOptionalString(OptionEnvName),
		index:    ol.loadOptionalInt(OptionIndex),

		getModuleFn:    component.GetModule,
		resolvePathFn:  component.ResolvePath,
		setEnvFn:       setEnv,
		setGlobalEnvFn: setGlobalEnv,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	if ps.envName != "" && ps.global {
		return nil, errors.New("unable to set global param for environments")
	}

	return ps, nil
}

// Run runs the action.
func (ps *ParamSet) Run() error {
	value, err := params.DecodeValue(ps.rawValue)
	if err != nil {
		return errors.Wrap(err, "value is invalid")
	}

	if ps.envName != "" {
		if ps.name != "" {
			return ps.setEnvFn(ps.app, ps.envName, ps.name, ps.rawPath, ps.rawValue)
		}
		return ps.setGlobalEnvFn(ps.app, ps.envName, ps.rawPath, ps.rawValue)
	}

	path := strings.Split(ps.rawPath, ".")

	if ps.global {
		return ps.setGlobal(path, value)
	}

	return ps.setLocal(path, value)
}

func (ps *ParamSet) setGlobal(path []string, value interface{}) error {
	module, err := ps.getModuleFn(ps.app, ps.name)
	if err != nil {
		return errors.Wrap(err, "retrieve module")
	}

	if err := module.SetParam(path, value); err != nil {
		return errors.Wrap(err, "set global param")
	}

	return nil
}

func (ps *ParamSet) setLocal(path []string, value interface{}) error {
	_, c, err := ps.resolvePathFn(ps.app, ps.name)
	if err != nil {
		return errors.Wrap(err, "could not find component")
	}

	options := component.ParamOptions{
		Index: ps.index,
	}
	if err := c.SetParam(path, value, options); err != nil {
		return errors.Wrap(err, "set param")
	}

	return nil
}

// TODO: move this to pkg/env
func setEnv(ksApp app.App, envName, name, pName, value string) error {
	spc := env.SetParamsConfig{
		App: ksApp,
	}

	p := mp.Params{
		pName: value,
	}

	return env.SetParams(envName, name, p, spc)
}

func setGlobalEnv(ksApp app.App, envName, pName, value string) error {
	p := mp.Params{
		pName: value,
	}

	return env.SetGlobalParams(ksApp, envName, p)
}

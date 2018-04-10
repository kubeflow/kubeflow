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
	"github.com/pkg/errors"
)

// RunModuleCreate creates a module.
func RunModuleCreate(m map[string]interface{}) error {
	mc, err := NewModuleCreate(m)
	if err != nil {
		return err
	}

	return mc.Run()
}

// ModuleCreate creates a component module
type ModuleCreate struct {
	app    app.App
	module string
	cm     component.Manager
}

// NewModuleCreate creates an instance of ModuleCreate.
func NewModuleCreate(m map[string]interface{}) (*ModuleCreate, error) {
	ol := newOptionLoader(m)

	mc := &ModuleCreate{
		app:    ol.loadApp(),
		module: ol.loadString(OptionModule),

		cm: component.DefaultManager,
	}

	return mc, nil
}

// Run runs that ns create action.
func (mc *ModuleCreate) Run() error {
	_, err := mc.cm.Module(mc.app, mc.module)
	if err == nil {
		return errors.Errorf("module %q already exists", mc.module)
	}

	return mc.cm.CreateModule(mc.app, mc.module)
}

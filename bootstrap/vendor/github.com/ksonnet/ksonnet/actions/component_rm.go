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

// RunComponentRm runs `component list`
func RunComponentRm(m map[string]interface{}) error {
	cr, err := NewComponentRm(m)
	if err != nil {
		return err
	}

	return cr.Run()
}

// ComponentRm removes a component from a module.
type ComponentRm struct {
	app  app.App
	name string

	componentDeleteFn func(app.App, string) error
}

// NewComponentRm creates an instance of ComponentRm.
func NewComponentRm(m map[string]interface{}) (*ComponentRm, error) {
	ol := newOptionLoader(m)

	cr := &ComponentRm{
		app:  ol.loadApp(),
		name: ol.loadString(OptionComponentName),

		componentDeleteFn: component.Delete,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return cr, nil
}

// Run runs the ComponentRm action.
func (cr *ComponentRm) Run() error {
	return cr.componentDeleteFn(cr.app, cr.name)
}

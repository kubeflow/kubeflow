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
	"io"
	"os"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/util/table"
	"github.com/pkg/errors"
)

// RunParamList runs `param list`.
func RunParamList(m map[string]interface{}) error {
	pl, err := NewParamList(m)
	if err != nil {
		return err
	}

	return pl.Run()
}

// ParamList lists parameters for a component.
type ParamList struct {
	app           app.App
	module        string
	componentName string
	envName       string
	cm            component.Manager
	out           io.Writer
}

// NewParamList creates an instances of ParamList.
func NewParamList(m map[string]interface{}) (*ParamList, error) {
	ol := newOptionLoader(m)

	pl := &ParamList{
		app:           ol.loadApp(),
		module:        ol.loadString(OptionModule),
		componentName: ol.loadString(OptionComponentName),
		envName:       ol.loadString(OptionEnvName),

		cm:  component.DefaultManager,
		out: os.Stdout,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return pl, nil
}

// Run runs the ParamList action.
func (pl *ParamList) Run() error {
	ns, err := pl.cm.Module(pl.app, pl.module)
	if err != nil {
		return errors.Wrap(err, "could not find namespace")
	}

	params, err := pl.collectParams(ns)
	if err != nil {
		return err
	}

	table := table.New(pl.out)

	table.SetHeader([]string{"COMPONENT", "INDEX", "PARAM", "VALUE"})
	for _, data := range params {
		table.Append([]string{data.Component, data.Index, data.Key, data.Value})
	}

	table.Render()

	return nil
}

func (pl *ParamList) collectParams(ns component.Module) ([]component.ModuleParameter, error) {
	if pl.componentName == "" {
		return ns.Params(pl.envName)
	}

	c, err := pl.cm.Component(pl.app, pl.module, pl.componentName)
	if err != nil {
		return nil, err
	}

	return c.Params(pl.envName)
}

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
	"sort"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/util/table"
	"github.com/pkg/errors"
)

// RunComponentList runs `component list`
func RunComponentList(m map[string]interface{}) error {
	cl, err := NewComponentList(m)
	if err != nil {
		return err
	}

	return cl.Run()
}

// ComponentList create a list of components in a module.
type ComponentList struct {
	app    app.App
	module string
	output string
	cm     component.Manager
	out    io.Writer
}

// NewComponentList creates an instance of ComponentList.
func NewComponentList(m map[string]interface{}) (*ComponentList, error) {
	ol := newOptionLoader(m)

	cl := &ComponentList{
		app:    ol.loadApp(),
		module: ol.loadString(OptionModule),
		output: ol.loadString(OptionOutput),

		cm:  component.DefaultManager,
		out: os.Stdout,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return cl, nil
}

// Run runs the ComponentList action.
func (cl *ComponentList) Run() error {
	ns, err := cl.cm.Module(cl.app, cl.module)
	if err != nil {
		return err
	}

	components, err := ns.Components()
	if err != nil {
		return err
	}

	switch cl.output {
	default:
		return errors.Errorf("invalid output option %q", cl.output)
	case "":
		cl.listComponents(components)
	case "wide":
		if err := cl.listComponentsWide(components); err != nil {
			return err
		}
	}

	return nil
}

func (cl *ComponentList) listComponents(components []component.Component) {
	var list []string
	for _, c := range components {
		list = append(list, c.Name(false))
	}

	sort.Strings(list)

	table := table.New(cl.out)
	table.SetHeader([]string{"component"})
	for _, item := range list {
		table.Append([]string{item})
	}
	table.Render()
}

func (cl *ComponentList) listComponentsWide(components []component.Component) error {
	var rows [][]string
	for _, c := range components {
		summaries, err := c.Summarize()
		if err != nil {
			return err
		}

		for _, summary := range summaries {
			row := []string{
				summary.ComponentName,
				summary.Type,
				summary.IndexStr,
				summary.APIVersion,
				summary.Kind,
				summary.Name,
			}

			rows = append(rows, row)

		}
	}

	table := table.New(cl.out)
	table.SetHeader([]string{"component", "type", "index", "apiversion", "kind", "name"})
	table.AppendBulk(rows)
	table.Render()

	return nil
}

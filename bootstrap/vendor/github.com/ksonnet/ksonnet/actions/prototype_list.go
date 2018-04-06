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

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/pkg/util/table"
	"github.com/ksonnet/ksonnet/prototype"
)

// RunPrototypeList runs `prototype list`
func RunPrototypeList(m map[string]interface{}) error {
	pl, err := NewPrototypeList(m)
	if err != nil {
		return err
	}

	return pl.Run()
}

// PrototypeList lists available prototypes.
type PrototypeList struct {
	app          app.App
	out          io.Writer
	prototypesFn func(app.App, pkg.Descriptor) (prototype.SpecificationSchemas, error)
}

// NewPrototypeList creates an instance of PrototypeList
func NewPrototypeList(m map[string]interface{}) (*PrototypeList, error) {
	ol := newOptionLoader(m)

	pl := &PrototypeList{
		app: ol.loadApp(),

		out:          os.Stdout,
		prototypesFn: pkg.LoadPrototypes,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return pl, nil
}

// Run runs the env list action.
func (pl *PrototypeList) Run() error {
	prototypes, err := allPrototypes(pl.app, pl.prototypesFn)
	if err != nil {
		return err
	}

	index := prototype.NewIndex(prototypes)

	prototypes, err = index.List()
	if err != nil {
		return err
	}

	var rows [][]string
	for _, p := range prototypes {
		rows = append(rows, []string{p.Name, p.Template.ShortDescription})
	}

	t := table.New(pl.out)
	t.SetHeader([]string{"name", "description"})

	sort.Slice(rows, func(i, j int) bool {
		return rows[i][0] < rows[j][0]
	})

	t.AppendBulk(rows)

	return t.Render()
}

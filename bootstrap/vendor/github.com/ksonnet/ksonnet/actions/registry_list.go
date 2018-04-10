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
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/ksonnet/ksonnet/pkg/util/table"
)

// RunRegistryList runs `env list`
func RunRegistryList(m map[string]interface{}) error {
	rl, err := NewRegistryList(m)
	if err != nil {
		return err
	}

	return rl.Run()
}

// RegistryList lists available registries
type RegistryList struct {
	app            app.App
	registryListFn func(ksApp app.App) ([]registry.Registry, error)
	out            io.Writer
}

// NewRegistryList creates an instance of RegistryList
func NewRegistryList(m map[string]interface{}) (*RegistryList, error) {
	ol := newOptionLoader(m)

	rl := &RegistryList{
		app: ol.loadApp(),

		registryListFn: registry.List,
		out:            os.Stdout,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return rl, nil
}

// Run runs the env list action.
func (rl *RegistryList) Run() error {
	registries, err := rl.registryListFn(rl.app)
	if err != nil {
		return err
	}

	t := table.New(rl.out)
	t.SetHeader([]string{"name", "override", "protocol", "uri"})

	var rows [][]string

	for _, r := range registries {
		override := ""
		if r.IsOverride() {
			override = "*"
		}

		rows = append(rows, []string{
			r.Name(),
			override,
			r.Protocol(),
			r.URI(),
		})
	}

	sort.Slice(rows, func(i, j int) bool {
		return rows[i][0] < rows[j][0]
	})

	t.AppendBulk(rows)

	return t.Render()
}

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
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/ksonnet/ksonnet/pkg/util/table"
)

const (
	// pkgInstalled denotes a package is installed
	pkgInstalled = "*"
)

// RunPkgList runs `pkg list`
func RunPkgList(m map[string]interface{}) error {
	rl, err := NewPkgList(m)
	if err != nil {
		return err
	}

	return rl.Run()
}

// PkgList lists available registries
type PkgList struct {
	app            app.App
	registryListFn func(ksApp app.App) ([]registry.Registry, error)
	out            io.Writer
}

// NewPkgList creates an instance of PkgList
func NewPkgList(m map[string]interface{}) (*PkgList, error) {
	ol := newOptionLoader(m)

	rl := &PkgList{
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
func (pl *PkgList) Run() error {
	registries, err := pl.registryListFn(pl.app)
	if err != nil {
		return err
	}

	var rows [][]string

	appLibraries, err := pl.app.Libraries()
	if err != nil {
		return err
	}

	for _, r := range registries {
		spec, err := r.FetchRegistrySpec()
		if err != nil {
			return err
		}

		for libName := range spec.Libraries {
			row := []string{r.Name(), libName}
			_, isInstalled := appLibraries[libName]
			if isInstalled {
				row = append(row, pkgInstalled)
			}

			rows = append(rows, row)
		}
	}

	sort.Slice(rows, func(i, j int) bool {
		nameI := strings.Join([]string{rows[i][0], rows[i][1]}, "-")
		nameJ := strings.Join([]string{rows[j][0], rows[j][1]}, "-")

		return nameI < nameJ
	})

	t := table.New(pl.out)
	t.SetHeader([]string{"registry", "name", "installed"})
	t.AppendBulk(rows)
	return t.Render()
}

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
	"github.com/ksonnet/ksonnet/pkg/util/table"
)

// RunEnvList runs `env list`
func RunEnvList(m map[string]interface{}) error {
	nl, err := NewEnvList(m)
	if err != nil {
		return err
	}

	return nl.Run()
}

// EnvList lists available namespaces
type EnvList struct {
	app app.App
	out io.Writer
}

// NewEnvList creates an instance of EnvList
func NewEnvList(m map[string]interface{}) (*EnvList, error) {
	ol := newOptionLoader(m)

	nl := &EnvList{
		app: ol.loadApp(),

		out: os.Stdout,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return nl, nil
}

// Run runs the env list action.
func (nl *EnvList) Run() error {
	environments, err := nl.app.Environments()
	if err != nil {
		return err
	}

	table := table.New(nl.out)
	table.SetHeader([]string{"name", "override", "kubernetes-version", "namespace", "server"})

	var rows [][]string

	for name, env := range environments {
		override := ""
		if env.IsOverride() {
			override = "*"
		}

		rows = append(rows, []string{
			name,
			override,
			env.KubernetesVersion,
			env.Destination.Namespace,
			env.Destination.Server,
		})
	}

	sort.Slice(rows, func(i, j int) bool {
		return rows[i][0] < rows[j][0]
	})

	table.AppendBulk(rows)

	table.Render()
	return nil
}

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

package kubecfg

import (
	"fmt"
	"io"
	"reflect"
	"sort"

	"github.com/fatih/color"
	"github.com/ksonnet/ksonnet/component"
	param "github.com/ksonnet/ksonnet/metadata/params"
	str "github.com/ksonnet/ksonnet/strings"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

// ParamDiffCmd stores the information necessary to diff between environment
// parameters.
type ParamDiffCmd struct {
	fs   afero.Fs
	root string
	env1 string
	env2 string

	component string
}

// NewParamDiffCmd acts as a constructor for ParamDiffCmd.
func NewParamDiffCmd(fs afero.Fs, root, env1, env2, componentName string) *ParamDiffCmd {
	return &ParamDiffCmd{
		fs:        fs,
		root:      root,
		env1:      env1,
		env2:      env2,
		component: componentName,
	}
}

type paramDiffRecord struct {
	component string
	param     string
	value1    string
	value2    string
}

// Run executes the diffing of environment params.
func (c *ParamDiffCmd) Run(out io.Writer) error {
	const (
		componentHeader = "COMPONENT"
		paramHeader     = "PARAM"
	)

	manager, err := manager()
	if err != nil {
		return err
	}

	ksApp, err := manager.App()
	if err != nil {
		return err
	}

	ns, componentName := component.ExtractModuleComponent(ksApp, c.component)

	params1, err := manager.GetEnvironmentParams(c.env1, ns.Name())
	if err != nil {
		return err
	}

	params2, err := manager.GetEnvironmentParams(c.env2, ns.Name())
	if err != nil {
		return err
	}

	if len(c.component) != 0 {
		params1 = map[string]param.Params{componentName: params1[componentName]}
		params2 = map[string]param.Params{componentName: params2[componentName]}
	}

	if reflect.DeepEqual(params1, params2) {
		log.Info("No differences found.")
		return nil
	}

	componentNames := collectComponents(params1, params2)

	headers := str.Row{
		Content: []string{componentHeader, paramHeader, c.env1, c.env2},
	}

	var body []str.Row
	for _, componentName := range componentNames {
		paramNames := collectParams(params1[componentName], params2[componentName])

		for _, paramName := range paramNames {
			var v1, v2 string

			if p, ok := params1[componentName]; ok {
				v1 = p[paramName]
			}

			if p, ok := params2[componentName]; ok {
				v2 = p[paramName]
			}

			var bgColor *color.Color
			if v1 == "" {
				bgColor = color.New(color.BgGreen)
			} else if v2 == "" {
				bgColor = color.New(color.BgRed)
			} else if v1 != v2 {
				bgColor = color.New(color.BgYellow)
			}

			body = append(body, str.Row{
				Content: []string{
					componentName,
					paramName,
					v1,
					v2,
				},
				Color: bgColor,
			})
		}
	}

	formatted, err := str.Table(headers, body)
	if err != nil {
		return err
	}

	for _, row := range formatted {
		if row.Color != nil {
			_, err = row.Color.Fprint(out, row.Content)
			if err != nil {
				return err
			}
			// Must print new line separately otherwise color alignment will be
			// incorrect.
			fmt.Println()
		} else {
			_, err = fmt.Fprintln(out, row.Content)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func collectComponents(param1, param2 map[string]param.Params) []string {
	m := make(map[string]bool)
	for k := range param1 {
		m[k] = true
	}
	for k := range param2 {
		m[k] = true
	}

	var names []string

	for k := range m {
		names = append(names, k)
	}

	sort.Strings(names)

	return names
}

func collectParams(param1, param2 param.Params) []string {
	m := make(map[string]bool)
	for k := range param1 {
		m[k] = true
	}
	for k := range param2 {
		m[k] = true
	}

	var names []string

	for k := range m {
		names = append(names, k)
	}

	sort.Strings(names)

	return names
}

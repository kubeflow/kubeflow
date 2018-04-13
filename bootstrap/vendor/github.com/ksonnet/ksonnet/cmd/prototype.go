// Copyright 2017 The kubecfg authors
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

package cmd

import (
	"fmt"
	"strings"

	"github.com/spf13/pflag"

	"github.com/ksonnet/ksonnet/metadata"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/ksonnet/ksonnet/prototype/snippet"
	"github.com/ksonnet/ksonnet/prototype/snippet/jsonnet"
	str "github.com/ksonnet/ksonnet/strings"
	"github.com/spf13/cobra"
)

var protoShortDesc = map[string]string{
	"list":     "List all locally available ksonnet prototypes",
	"describe": "See more info about a prototype's output and usage",
	"preview":  "Preview a prototype's output without creating a component (stdout)",
	"search":   "Search for a prototype",
	"use":      "Use the specified prototype to generate a component manifest",
}

func init() {
	RootCmd.AddCommand(prototypeCmd)
}

var prototypeCmd = &cobra.Command{
	Use:   "prototype",
	Short: `Instantiate, inspect, and get examples for ksonnet prototypes`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("%s is not a valid subcommand\n\n%s", strings.Join(args, " "), cmd.UsageString())
		}
		return fmt.Errorf("Command 'prototype' requires a subcommand\n\n%s", cmd.UsageString())
	},
	Long: `
Use the` + " `prototype` " + `subcommands to manage, inspect, instantiate, and get
examples for ksonnet prototypes.

Prototypes are pre-written but incomplete Kubernetes manifests, with "holes"
(parameters) that can be filled in with the ksonnet CLI or manually. For example,
the prototype` + " `io.ksonnet.pkg.single-port-deployment` " + `requires a name and image,
and the ksonnet CLI can expand this into a fully-formed 'Deployment' object.

These complete manifests are output into your ` + "`components/`" + ` directory. In other
words, prototypes provide the basis for the **components** of your app. You can
use prototypes to autogenerate boilerplate code and focus on customizing them
for your use case.

----
`,
}

func bindPrototypeFlags(cmd *cobra.Command, proto *prototype.SpecificationSchema) {
	for _, param := range proto.RequiredParams() {
		cmd.PersistentFlags().String(param.Name, "", param.Description)
	}

	for _, param := range proto.OptionalParams() {
		cmd.PersistentFlags().String(param.Name, *param.Default, param.Description)
	}
}

func expandPrototype(proto *prototype.SpecificationSchema, templateType prototype.TemplateType, params map[string]string, componentName string) (string, error) {
	template, err := proto.Template.Body(templateType)
	if err != nil {
		return "", err
	}
	if templateType == prototype.Jsonnet {
		componentsText := "components." + componentName
		if !str.IsASCIIIdentifier(componentName) {
			componentsText = fmt.Sprintf(`components["%s"]`, componentName)
		}
		template = append([]string{
			`local env = std.extVar("` + metadata.EnvExtCodeKey + `");`,
			`local params = std.extVar("` + metadata.ParamsExtCodeKey + `").` + componentsText + ";"},
			template...)
		return jsonnet.Parse(componentName, strings.Join(template, "\n"))
	}

	tm := snippet.Parse(strings.Join(template, "\n"))
	return tm.Evaluate(params)
}

func getParameters(proto *prototype.SpecificationSchema, flags *pflag.FlagSet) (map[string]string, error) {
	missingReqd := prototype.ParamSchemas{}
	values := map[string]string{}
	for _, param := range proto.RequiredParams() {
		val, err := flags.GetString(param.Name)
		if err != nil {
			return nil, err
		} else if val == "" {
			missingReqd = append(missingReqd, param)
		} else if _, ok := values[param.Name]; ok {
			return nil, fmt.Errorf("Prototype '%s' has multiple parameters with name '%s'", proto.Name, param.Name)
		}

		quoted, err := param.Quote(val)
		if err != nil {
			return nil, err
		}
		values[param.Name] = quoted
	}

	if len(missingReqd) > 0 {
		return nil, fmt.Errorf("Failed to instantiate prototype '%s'. The following required parameters are missing:\n%s", proto.Name, missingReqd.PrettyString(""))
	}

	for _, param := range proto.OptionalParams() {
		val, err := flags.GetString(param.Name)
		if err != nil {
			return nil, err
		} else if _, ok := values[param.Name]; ok {
			return nil, fmt.Errorf("Prototype '%s' has multiple parameters with name '%s'", proto.Name, param.Name)
		}

		quoted, err := param.Quote(val)
		if err != nil {
			return nil, err
		}
		values[param.Name] = quoted
	}

	return values, nil
}

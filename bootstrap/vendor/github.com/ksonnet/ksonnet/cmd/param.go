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

	"github.com/spf13/cobra"
)

var paramShortDesc = map[string]string{
	"delete": "Delete component or environment parameters",
	"set":    "Change component or environment parameters (e.g. replica count, name)",
	"list":   "List known component parameters",
	"diff":   "Display differences between the component parameters of two environments",
}

func init() {
	RootCmd.AddCommand(paramCmd)

	paramCmd.AddCommand(paramListCmd)
}

var paramCmd = &cobra.Command{
	Use:   "param",
	Short: `Manage ksonnet parameters for components and environments`,
	Long: `
Parameters are customizable fields that are used inside ksonnet *component*
manifests. Examples might include a deployment's 'name' or 'image'. Parameters
can also be defined on a *per-environment* basis. (Environments are ksonnet
deployment targets, e.g. specific clusters. For more info, run ` + "`ks env --help`" + `.)

For example, this allows a ` + "`dev`" + ` and ` + "`prod`" + ` environment to use the same component
manifest for an nginx deployment, but customize ` + "`prod`" + ` to use more replicas to meet
heavier load demands.

Params are structured as follows:

* App params (stored in ` + "`components/params.libsonnet`" + `)
    * Component-specific params
        * Originally populated from ` + "`ks generate`" + `
        * e.g. 80 for ` + "`deployment-example.port`" + `
    * Global params
        * Out of scope for CLI (requires Jsonnet editing)
        * Use to make a variable accessible to multiple components (e.g. service name)

* Per-environment params (stored in + ` + "`environments/<env-name>/params.libsonnet`" + `)
    * Component-specific params ONLY
    * Override app params (~inheritance)

Note that all of these params are tracked **locally** in version-controllable
Jsonnet files.

----
`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("%s is not a valid subcommand\n\n%s", strings.Join(args, " "), cmd.UsageString())
		}
		return fmt.Errorf("Command 'param' requires a subcommand\n\n%s", cmd.UsageString())
	},
}

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

package cmd

import (
	"github.com/ksonnet/ksonnet/actions"
	"github.com/spf13/cobra"
)

// generateCmd acts as an alias for `prototype use`
var generateCmd = &cobra.Command{
	Use:                "generate <prototype-name> <component-name> [type] [parameter-flags]",
	Short:              prototypeUseCmd.Short,
	DisableFlagParsing: prototypeUseCmd.DisableFlagParsing,
	RunE:               prototypeUseCmd.RunE,
	Long:               prototypeUseCmd.Long,
	Example:            prototypeUseCmd.Example,
}

var prototypeUseCmd = &cobra.Command{
	Use:                "use <prototype-name> <componentName> [type] [parameter-flags]",
	Short:              protoShortDesc["use"],
	DisableFlagParsing: true,
	RunE: func(cmd *cobra.Command, rawArgs []string) error {
		if len(rawArgs) == 1 && (rawArgs[0] == "--help" || rawArgs[0] == "-h") {
			return cmd.Help()
		}

		m := map[string]interface{}{
			actions.OptionApp:       ka,
			actions.OptionArguments: rawArgs,
		}

		return runAction(actionPrototypeUse, m)
	},
	Long: `
The ` + "`generate`" + ` command (aliased from ` + "`prototype use`" + `) generates Kubernetes-
compatible, Jsonnet ` + `manifests for components in your ksonnet app. Each component
corresponds to a single manifest in the` + " `components/` " + `directory. This manifest
can define one or more Kubernetes resources, and is generated from a ksonnet
*prototype* (a customizable, reusable Kubernetes configuration snippet).

1. The first argument, the **prototype name**, can either be fully qualified
(e.g.` + " `io.ksonnet.pkg.single-port-service`" + `) or a partial match (e.g.` +
		" `service`" + `).
If using a partial match, note that any ambiguity in resolving the name will
result in an error.

2. The second argument, the **component name**, determines the filename for the
generated component manifest. For example, the following command will expand
template` + " `io.ksonnet.pkg.single-port-deployment` " + `and place it in the
file` + " `components/nginx-depl.jsonnet` " + `. Note that by default ksonnet will
expand prototypes into Jsonnet files.

       ks prototype use io.ksonnet.pkg.single-port-deployment nginx-depl \
         --image=nginx

  If the optional ` + "`--name`" + ` tag is not specified, all Kubernetes API resources
  declared by this prototype use this argument as their own ` + "`metadata.name`" + `

3. Prototypes can be further customized by passing in **parameters** via additional
command line flags, such as ` + " `--image` " + `in the example above. Note that
different prototypes support their own unique flags.

### Related Commands

* ` + "`ks show` " + `— ` + showShortDesc + `
* ` + "`ks apply` " + `— ` + applyShortDesc + `
* ` + "`ks param set` " + paramShortDesc["set"] + `

### Syntax
`,
	Example: `
# Instantiate prototype 'io.ksonnet.pkg.single-port-deployment', using the
# 'nginx' image. The expanded prototype is placed in
# 'components/nginx-depl.jsonnet'.
# The associated Deployment has metadata.name 'nginx-depl'.
ks prototype use io.ksonnet.pkg.single-port-deployment nginx-depl \
  --image=nginx

# Instantiate prototype 'io.ksonnet.pkg.single-port-deployment' using the
# suffix, 'deployment'. (This works unless there is an ambiguity, e.g. another
# prototype with 'deployment' in its name.) The expanded prototype is again
# placed in 'components/nginx-depl.jsonnet'.
# The associated Deployment has metadata.name 'nginx' instead of 'nginx-depl'
# (due to --name).
ks prototype use deployment nginx-depl \
  --name=nginx                         \
  --image=nginx`,
}

func init() {
	RootCmd.AddCommand(generateCmd)
	prototypeCmd.AddCommand(prototypeUseCmd)
}

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
	"fmt"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/spf13/cobra"
)

var paramListCmd = &cobra.Command{
	Use:   "list [<component-name>] [--env <env-name>]",
	Short: paramShortDesc["list"],
	RunE: func(cmd *cobra.Command, args []string) error {
		flags := cmd.Flags()
		if len(args) > 1 {
			return fmt.Errorf("'param list' takes at most one argument, that is the name of the component")
		}

		component := ""
		if len(args) == 1 {
			component = args[0]
		}

		env, err := flags.GetString(flagEnv)
		if err != nil {
			return err
		}

		module, err := flags.GetString(flagModule)
		if err != nil {
			return err
		}

		m := map[string]interface{}{
			actions.OptionApp:           ka,
			actions.OptionComponentName: component,
			actions.OptionEnvName:       env,
			actions.OptionModule:        module,
		}

		return runAction(actionParamList, m)
	},
	Long: `
The ` + "`list`" + ` command displays all known component parameters or environment parameters.

If a component is specified, this command displays all of its specific parameters.
If a component is NOT specified, parameters for **all** components are listed.
Furthermore, parameters can be listed on a per-environment basis.

### Related Commands

* ` + "`ks param set` " + `— ` + paramShortDesc["set"] + `

### Syntax
`,
	Example: `
# List all component parameters
ks param list

# List all parameters for the component "guestbook"
ks param list guestbook

# List all parameters for the environment "dev"
ks param list --env=dev

# List all parameters for the component "guestbook" in the environment "dev"
ks param list guestbook --env=dev`,
}

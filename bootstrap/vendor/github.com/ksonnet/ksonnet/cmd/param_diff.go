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
	"os"

	"github.com/ksonnet/ksonnet/pkg/kubecfg"
	"github.com/spf13/cobra"
)

var paramDiffCmd = &cobra.Command{
	Use:   "diff <env1> <env2> [--component <component-name>]",
	Short: paramShortDesc["diff"],
	RunE: func(cmd *cobra.Command, args []string) error {
		flags := cmd.Flags()
		if len(args) != 2 {
			return fmt.Errorf("'param diff' takes exactly two arguments: the respective names of the environments being diffed")
		}

		cwd, err := os.Getwd()
		if err != nil {
			return err
		}

		env1 := args[0]
		env2 := args[1]

		component, err := flags.GetString(flagComponent)
		if err != nil {
			return err
		}

		c := kubecfg.NewParamDiffCmd(appFs, cwd, env1, env2, component)

		// TODO: convert param diff to action
		return c.Run(cmd.OutOrStdout())
	},
	Long: `
The ` + "`diff`" + ` command pretty prints differences between the component parameters
of two environments.

By default, the diff is performed for all components. Diff-ing for a single component
is supported via a component flag.

### Related Commands

* ` + "`ks param set` " + `— ` + paramShortDesc["set"] + `
* ` + "`ks apply` " + `— ` + applyShortDesc + `

### Syntax
`,
	Example: `
# Diff between all component parameters for environments 'dev' and 'prod'
ks param diff dev prod

# Diff only between the parameters for the 'guestbook' component for environments
# 'dev' and 'prod'
ks param diff dev prod --component=guestbook`,
}

func init() {
	paramCmd.AddCommand(paramDiffCmd)

	paramListCmd.PersistentFlags().String(flagEnv, "", "Specify environment to list parameters for")
	paramListCmd.Flags().String(flagModule, "", "Specify module to list parameters for")
	paramDiffCmd.PersistentFlags().String(flagComponent, "", "Specify the component to diff against")
}

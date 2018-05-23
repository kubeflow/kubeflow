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

var registryDescribeCmd = &cobra.Command{
	Use:   "describe <registry-name>",
	Short: regShortDesc["describe"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("Command 'registry describe' takes one argument, which is the name of the registry to describe")
		}

		m := map[string]interface{}{
			actions.OptionApp:  ka,
			actions.OptionName: args[0],
		}

		return runAction(actionRegistryDescribe, m)
	},

	Long: `
The ` + "`describe`" + ` command outputs documentation for the ksonnet registry identified
by ` + "`<registry-name>`" + `. Specifically, it displays the following:

1. Registry URI
2. Protocol (e.g. ` + "`github`" + `)
3. List of packages included in the registry

### Related Commands

* ` + "`ks pkg install` " + `— ` + pkgShortDesc["install"] + `

### Syntax
`,
}

func init() {
	registryCmd.AddCommand(registryDescribeCmd)
}

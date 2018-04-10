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

var registryListCmd = &cobra.Command{
	Use:   "list",
	Short: regShortDesc["list"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("Command 'registry list' does not take arguments")
		}

		m := map[string]interface{}{
			actions.OptionApp: ka,
		}

		return runAction(actionRegistryList, m)
	},
	Long: `
The ` + "`list`" + ` command displays all known ksonnet registries in a table. This
table includes the following info:

1. Registry name
2. Protocol (e.g. ` + "`github`" + `)
3. Registry URI

### Related Commands

* ` + "`ks registry describe` " + `— ` + regShortDesc["describe"] + `

### Syntax
`,
}

func init() {
	registryCmd.AddCommand(registryListCmd)
}

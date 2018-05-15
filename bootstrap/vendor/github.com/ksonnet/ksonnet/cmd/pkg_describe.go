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

var pkgDescribeCmd = &cobra.Command{
	Use:   "describe [<registry-name>/]<package-name>",
	Short: pkgShortDesc["describe"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("Command 'pkg describe' requires a package name\n\n%s", cmd.UsageString())
		}

		m := map[string]interface{}{
			actions.OptionApp:         ka,
			actions.OptionPackageName: args[0],
		}

		return runAction(actionPkgDescribe, m)
	},

	Long: `
The ` + "`describe`" + ` command outputs documentation for a package that is available
(e.g. downloaded) in the current ksonnet application. (This must belong to an already
known ` + "`<registry-name>`" + ` like *incubator*). The output includes:

1. The library name
2. A brief description provided by the library authors
3. A list of available prototypes provided by the library

### Related Commands

* ` + "`ks pkg list` " + `— ` + pkgShortDesc["list"] + `
* ` + "`ks prototype describe` " + `— ` + protoShortDesc["describe"] + `
* ` + "`ks generate` " + `— ` + protoShortDesc["use"] + `

### Syntax
`,
}

func init() {
	pkgCmd.AddCommand(pkgDescribeCmd)
}

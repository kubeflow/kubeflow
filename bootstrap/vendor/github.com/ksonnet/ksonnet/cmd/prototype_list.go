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

var prototypeListCmd = &cobra.Command{
	Use:   "list",
	Short: protoShortDesc["list"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("Command 'prototype list' does not take any arguments")
		}

		m := map[string]interface{}{
			actions.OptionApp: ka,
		}

		return runAction(actionPrototypeList, m)
	},
	Long: `
The ` + "`list`" + ` command displays all prototypes that are available locally, as
well as brief descriptions of what they generate.

ksonnet comes with a set of system prototypes that you can use out-of-the-box
(e.g.` + " `io.ksonnet.pkg.configMap`" + `). However, you can use more advanced
prototypes like ` + "`io.ksonnet.pkg.redis-stateless`" + ` by downloading extra packages
from the *incubator* registry.

### Related Commands

* ` + "`ks prototype describe` " + `— ` + protoShortDesc["describe"] + `
* ` + "`ks prototype preview` " + `— ` + protoShortDesc["preview"] + `
* ` + "`ks prototype use` " + `— ` + protoShortDesc["use"] + `
* ` + "`ks pkg install` " + pkgShortDesc["install"] + `

### Syntax
`,
}

func init() {
	prototypeCmd.AddCommand(prototypeListCmd)
}

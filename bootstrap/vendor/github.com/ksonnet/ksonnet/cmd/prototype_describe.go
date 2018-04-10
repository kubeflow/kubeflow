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

var prototypeDescribeCmd = &cobra.Command{
	Use:   "describe <prototype-name>",
	Short: protoShortDesc["describe"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("Command 'prototype describe' requires a prototype name\n\n%s", cmd.UsageString())
		}

		m := map[string]interface{}{
			actions.OptionApp:   ka,
			actions.OptionQuery: args[0],
		}

		return runAction(actionPrototypeDescribe, m)
	},
	Long: `
This command outputs documentation, examples, and other information for
the specified prototype (identified by name). Specifically, this describes:

  1. What sort of component is generated
  2. Which parameters (required and optional) can be passed in via CLI flags
     to customize the component
  3. The file format of the generated component manifest (currently, Jsonnet only)

### Related Commands

* ` + "`ks prototype preview` " + `— ` + protoShortDesc["preview"] + `
* ` + "`ks prototype use` " + `— ` + protoShortDesc["use"] + `

### Syntax
`,
	Example: `
# Display documentation about the prototype 'io.ksonnet.pkg.single-port-deployment'
ks prototype describe deployment`,
}

func init() {
	prototypeCmd.AddCommand(prototypeDescribeCmd)
}

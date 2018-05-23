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

var envListCmd = &cobra.Command{
	Use:   "list",
	Short: envShortDesc["list"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("'env list' takes zero arguments")
		}

		m := map[string]interface{}{
			actions.OptionApp: ka,
		}

		return runAction(actionEnvList, m)
	}, Long: `
The ` + "`list`" + ` command lists all of the available environments for the
current ksonnet app. Specifically, this will display the (1) *name*,
(2) *server*, and (3) *namespace* of each environment.

### Related Commands

* ` + "`ks env add` " + `— ` + envShortDesc["add"] + `
* ` + "`ks env set` " + `— ` + envShortDesc["set"] + `
* ` + "`ks env rm` " + `— ` + envShortDesc["rm"] + `

### Syntax
`,
}

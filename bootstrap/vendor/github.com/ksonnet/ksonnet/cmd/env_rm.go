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
	"github.com/spf13/viper"
)

const (
	vEnvRmOverride = "env-rm-override"
)

var envRmCmd = &cobra.Command{
	Use:   "rm <env-name>",
	Short: envShortDesc["rm"],
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("'env rm' takes a single argument, that is the name of the environment")
		}

		m := map[string]interface{}{
			actions.OptionApp:      ka,
			actions.OptionEnvName:  args[0],
			actions.OptionOverride: viper.GetBool(vEnvRmOverride),
		}

		return runAction(actionEnvRm, m)
	},
	Long: `
The ` + "`rm`" + ` command deletes an environment from a ksonnet application. This is
the same as removing the ` + "`<env-name>`" + ` environment directory and all files
contained. All empty parent directories are also subsequently deleted.

NOTE: This does *NOT* delete the components running in ` + "`<env-name>`" + `. To do that, you
need to use the ` + "`ks delete`" + ` command.

### Related Commands

* ` + "`ks env list` " + `— ` + protoShortDesc["list"] + `
* ` + "`ks env add` " + `— ` + protoShortDesc["add"] + `
* ` + "`ks env set` " + `— ` + protoShortDesc["set"] + `
* ` + "`ks delete` " + `— ` + `Delete all the app components running in an environment (cluster)` + `

### Syntax
`,
	Example: `
# Remove the directory 'environments/us-west/staging' and all of its contents.
# This will also remove the parent directory 'us-west' if it is empty.
ks env rm us-west/staging`,
}

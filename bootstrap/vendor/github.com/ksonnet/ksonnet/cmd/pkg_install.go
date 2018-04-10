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

	"github.com/spf13/viper"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/spf13/cobra"
)

var (
	vPkgInstallName = "pkg-install-name"
)

var pkgInstallCmd = &cobra.Command{
	Use:     "install <registry>/<library>@<version>",
	Short:   pkgShortDesc["install"],
	Aliases: []string{"get"},
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("Command requires a single argument of the form <registry>/<library>@<version>\n\n%s", cmd.UsageString())
		}

		m := map[string]interface{}{
			actions.OptionApp:     ka,
			actions.OptionLibName: args[0],
			actions.OptionName:    viper.GetString(vPkgInstallName),
		}

		return runAction(actionPkgInstall, m)
	},
	Long: `
The ` + "`install`" + ` command caches a ksonnet library locally, and makes it available
for use in the current ksonnet application. Enough info and metadata is recorded in
` + "`app.yaml` " + `that new users can retrieve the dependency after a fresh clone of this app.

The library itself needs to be located in a registry (e.g. Github repo). By default,
ksonnet knows about two registries: *incubator* and *stable*, which are the release
channels for official ksonnet libraries.

### Related Commands

* ` + "`ks pkg list` " + `— ` + pkgShortDesc["list"] + `
* ` + "`ks prototype list` " + `— ` + protoShortDesc["list"] + `
* ` + "`ks registry describe` " + `— ` + regShortDesc["describe"] + `

### Syntax
`,
	Example: `
# Install an nginx dependency, based on the latest branch.
# In a ksonnet source file, this can be referenced as:
#   local nginx = import "incubator/nginx/nginx.libsonnet";
ks pkg install incubator/nginx

# Install an nginx dependency, based on the 'master' branch.
# In a ksonnet source file, this can be referenced as:
#   local nginx = import "incubator/nginx/nginx.libsonnet";
ks pkg install incubator/nginx@master
`,
}

func init() {
	pkgCmd.AddCommand(pkgInstallCmd)

	pkgInstallCmd.Flags().String(flagName, "", "Name to give the dependency, to use within the ksonnet app")
	viper.BindPFlag(vPkgInstallName, pkgInstallCmd.Flags().Lookup(flagName))
}

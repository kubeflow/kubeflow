// Copyright 2017 The kubecfg authors
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
	flagFormat    = "format"
	showShortDesc = "Show expanded manifests for a specific environment."
)

const (
	vShowComponent = "show-components"
	vShowFormat    = "show-format"
)

func init() {
	RootCmd.AddCommand(showCmd)

	bindJsonnetFlags(showCmd)

	showCmd.Flags().StringSliceP(flagComponent, shortComponent, nil, "Name of a specific component (multiple -c flags accepted, allows YAML, JSON, and Jsonnet)")
	viper.BindPFlag(vShowComponent, showCmd.Flags().Lookup(flagComponent))

	showCmd.Flags().StringP(flagFormat, shortFormat, "yaml", "Output format.  Supported values are: json, yaml")
	viper.BindPFlag(vShowFormat, showCmd.Flags().Lookup(flagFormat))
}

var showCmd = &cobra.Command{
	Use:   "show <env> [-c <component-filename>]",
	Short: showShortDesc,
	Long: `
Show expanded manifests (resource definitions) for a specific environment.
Jsonnet manifests, each defining a ksonnet component, are expanded into their
JSON or YAML equivalents (YAML is the default). Any parameters in these Jsonnet
manifests are resolved based on environment-specific values.

When NO component is specified (no ` + "`-c`" + ` flag), this command expands all of
the files in the ` + "`components/`" + ` directory into a list of resource definitions.
This is the YAML version of what gets deployed to your cluster with
` + "`ks apply <env-name>`" + `.

When a component IS specified via the ` + "`-c`" + ` flag, this command only expands the
manifest for that particular component.

### Related Commands

* ` + "`ks validate` " + `— ` + valShortDesc + `
* ` + "`ks apply` " + `— ` + applyShortDesc + `

### Syntax
`,
	Example: `
# Show all of the components for the 'dev' environment, in YAML
# (In other words, expands all manifests in the components/ directory)
ks show dev

# Show a single component from the 'prod' environment, in JSON
ks show prod -c redis -o json

# Show multiple components from the 'dev' environment, in YAML
ks show dev -c redis -c nginx-server
`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("'show' requires an environment name; use `env list` to see available environments\n\n%s", cmd.UsageString())
		}

		m := map[string]interface{}{
			actions.OptionApp:            ka,
			actions.OptionComponentNames: viper.GetStringSlice(vShowComponent),
			actions.OptionEnvName:        args[0],
			actions.OptionFormat:         viper.GetString(vShowFormat),
		}

		return runAction(actionShow, m)
	},
}

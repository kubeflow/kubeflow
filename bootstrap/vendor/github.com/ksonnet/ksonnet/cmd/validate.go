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
	"github.com/spf13/viper"

	"github.com/pkg/errors"
	"github.com/spf13/cobra"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/ksonnet/ksonnet/client"
)

const (
	vValidateComponent = "validate-component"
	valShortDesc       = "Check generated component manifests against the server's API"
)

var (
	validateClientConfig *client.Config
)

func init() {
	RootCmd.AddCommand(validateCmd)
	addEnvCmdFlags(validateCmd)
	bindJsonnetFlags(validateCmd)
	validateClientConfig = client.NewDefaultClientConfig()
	validateClientConfig.BindClientGoFlags(validateCmd)

	viper.BindPFlag(vValidateComponent, validateCmd.Flag(flagComponent))
}

var validateCmd = &cobra.Command{
	Use:   "validate <env-name> [-c <component-name>]",
	Short: valShortDesc,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return errors.Errorf("'validate' requires an environment name; use `env list` to see available environments\n\n%s", cmd.UsageString())
		}

		m := map[string]interface{}{
			actions.OptionApp:            ka,
			actions.OptionEnvName:        args[0],
			actions.OptionModule:         "",
			actions.OptionComponentNames: viper.GetStringSlice(vValidateComponent),
			actions.OptionClientConfig:   validateClientConfig,
		}

		return runAction(actionValidate, m)
	},
	Long: `
The ` + "`validate`" + ` command checks that an application or file is compliant with the
server API's Kubernetes specification. Note that this command actually communicates
*with* the server for the specified ` + "`<env-name>`" + `, so it only works if your
$KUBECONFIG specifies a valid kubeconfig file.

When NO component is specified (no ` + "`-c`" + ` flag), this command checks all of
the files in the ` + "`components/`" + ` directory. This is the same as what would
get deployed to your cluster with ` + "`ks apply <env-name>`" + `.

When a component IS specified via the ` + "`-c`" + ` flag, this command only checks
the manifest for that particular component.

### Related Commands

* ` + "`ks show` " + `— ` + showShortDesc + `
* ` + "`ks apply` " + `— ` + applyShortDesc + `

### Syntax
`,
	Example: `
# Validate all resources described in the ksonnet app, against the server
# specified by the 'dev' environment.
# NOTE: Make sure your current $KUBECONFIG matches the 'dev' cluster info
ksonnet validate dev

# Validate resources from the 'redis' component only, against the server specified
# by the 'prod' environment
# NOTE: Make sure your current $KUBECONFIG matches the 'prod' cluster info
ksonnet validate prod -c redis
`,
}

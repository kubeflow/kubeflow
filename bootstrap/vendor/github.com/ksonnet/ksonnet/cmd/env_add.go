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

const (
	vEnvAddOverride = "env-add-override"
)

var envAddCmd = &cobra.Command{
	Use:   "add <env-name>",
	Short: envShortDesc["add"],
	RunE: func(cmd *cobra.Command, args []string) error {
		flags := cmd.Flags()
		if len(args) != 1 {
			return fmt.Errorf("'env add' takes exactly one argument, which is the name of the environment")
		}

		name := args[0]

		server, namespace, err := resolveEnvFlags(flags)
		if err != nil {
			return err
		}

		// TODO: pass envClientConfig to the action so it can pull out the
		// spec flag if it is empty.
		specFlag, err := flags.GetString(flagAPISpec)
		if err != nil {
			return err
		}
		if specFlag == "" {
			specFlag = envClientConfig.GetAPISpec(server)
		}

		isOverride := viper.GetBool(vEnvAddOverride)

		m := map[string]interface{}{
			actions.OptionApp:      ka,
			actions.OptionEnvName:  name,
			actions.OptionServer:   server,
			actions.OptionModule:   namespace,
			actions.OptionSpecFlag: specFlag,
			actions.OptionOverride: isOverride,
		}

		return runAction(actionEnvAdd, m)
	},

	Long: `
The ` + "`add`" + ` command creates a new environment (specifically for the ksonnet app
whose directory it's executed in). This environment is cached with the following
info:

1. **Name** — A string used to uniquely identify the environment.
2. **Server** — The address and port of a Kubernetes API server (i.e. cluster).
3. **Namespace**  — A Kubernetes namespace. *Must already exist on the cluster.*
4. **Kubernetes API Version**  — Used to generate a library with compatible type defs.

(1) is mandatory. (2) and (3) can be inferred from $KUBECONFIG, *or* from the
` + "`--kubeconfig`" + ` or ` + "`--context`" + ` flags. Otherwise, (2), (3), and (4) can all be
specified by individual flags. Unless otherwise specified, (4) defaults to the
latest Kubernetes version that ksonnet supports.

Note that an environment *DOES NOT* contain user-specific data such as private keys.

### Related Commands

* ` + "`ks env list` " + `— ` + protoShortDesc["list"] + `
* ` + "`ks env rm` " + `— ` + protoShortDesc["rm"] + `
* ` + "`ks env set` " + `— ` + protoShortDesc["set"] + `
* ` + "`ks param set` " + `— ` + paramShortDesc["set"] + `
* ` + "`ks apply` " + `— ` + applyShortDesc + `

### Syntax
`,
	Example: `
# Initialize a new environment, called "staging". No flags are set, so 'server'
# and 'namespace' info are pulled from the file specified by $KUBECONFIG.
# 'version' defaults to the latest that ksonnet supports.
ks env add us-west/staging

# Initialize a new environment called "us-west/staging" with the pre-existing
# namespace 'staging'. 'version' is specified, so the OpenAPI spec from the
# Kubernetes v1.7.1 build is used to generate the helper library 'ksonnet-lib'.
#
# NOTE: "us-west/staging" indicates a hierarchical structure, so the env-specific
# files here are saved in "<ksonnet-app-root>/environments/us-west/staging".
ks env add us-west/staging --api-spec=version:v1.7.1 --namespace=staging

# Initialize a new environment "my-env" using the "dev" context in your current
# kubeconfig file ($KUBECONFIG).
ks env add my-env --context=dev

# Initialize a new environment "prod" using the address of a cluster's Kubernetes
# API server.
ks env add prod --server=https://ksonnet-1.us-west.elb.amazonaws.com`,
}

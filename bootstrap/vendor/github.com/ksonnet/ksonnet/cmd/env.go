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
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"

	"github.com/ksonnet/ksonnet/client"
)

const (
	flagEnvName      = "name"
	flagEnvServer    = "server"
	flagEnvNamespace = "namespace"
	flagEnvContext   = "context"
)

var (
	envClientConfig *client.Config
	envShortDesc    = map[string]string{
		"add":  "Add a new environment to a ksonnet application",
		"list": "List all environments in a ksonnet application",
		"rm":   "Delete an environment from a ksonnet application",
		"set":  "Set environment-specific fields (name, namespace, server)",
	}
)

func init() {
	RootCmd.AddCommand(envCmd)
	envClientConfig = client.NewDefaultClientConfig()
	envClientConfig.BindClientGoFlags(envCmd)

	envCmd.AddCommand(envAddCmd)
	envCmd.AddCommand(envRmCmd)
	envCmd.AddCommand(envListCmd)

	// TODO: We need to make this default to checking the `kubeconfig` file.
	envAddCmd.PersistentFlags().String(flagAPISpec, "version:v1.7.0",
		"Manually specify API version from OpenAPI schema, cluster, or Kubernetes version")

	envAddCmd.Flags().BoolP(flagOverride, shortOverride, false, "Add environment as override")
	viper.BindPFlag(vEnvAddOverride, envAddCmd.Flags().Lookup(flagOverride))

	envRmCmd.Flags().BoolP(flagOverride, shortOverride, false, "Remove the overridden environment")
	viper.BindPFlag(vEnvRmOverride, envRmCmd.Flags().Lookup(flagOverride))
}

var envCmd = &cobra.Command{
	Use:   "env",
	Short: `Manage ksonnet environments`,
	Long: `
An environment is a deployment target for your ksonnet app and its constituent
components. You can use ksonnet to deploy a given app to *multiple* environments,
such as ` + "`dev`" + ` and ` + "`prod`" + `.

Intuitively, an environment acts as a sort of "named cluster", similar to a
Kubernetes context. (Running ` + "`ks env add --help`" + ` provides more detail
about the fields that you need to create an environment).

**All of this environment info is cached in local files**. Environments are
represented as a hierarchy in the ` + "`environments/`" + ` directory of a ksonnet app, like
'default' and 'us-west/staging' in the example below.

` + "```" + `
├── environments
│   ├── base.libsonnet
│   ├── default                      // Default generated environment ('ks init')
│   │   ├── .metadata
│   │   │   ├── k.libsonnet
│   │   │   ├── k8s.libsonnet
│   │   │   └── swagger.json
│   │   ├── main.jsonnet
│   │   ├── params.libsonnet
│   │   └── spec.json
│   └── us-west
│       └── staging                  // Example of user-generated env ('ks env add')
│           ├── .metadata
│           │   ├── k.libsonnet      // Jsonnet library with Kubernetes-compatible types and definitions
│           │   ├── k8s.libsonnet
│           │   └── swagger.json
│           ├── main.libsonnet       // Main file that imports all components (expanded on apply, delete, etc). Add environment-specific logic here.
│           ├── params.libsonnet     // Customize components *per-environment* here.
│           └── spec.json            // Contains the environment's API server address and namespace
` + "```" + `
----
`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("%s is not a valid subcommand\n\n%s", strings.Join(args, " "), cmd.UsageString())
		}
		return fmt.Errorf("Command 'env' requires a subcommand\n\n%s", cmd.UsageString())
	},
}

func commonEnvFlags(flags *pflag.FlagSet) (server, namespace, context string, err error) {
	server, err = flags.GetString(flagEnvServer)
	if err != nil {
		return "", "", "", err
	}

	namespace, err = flags.GetString(flagEnvNamespace)
	if err != nil {
		return "", "", "", err
	}

	context, err = flags.GetString(flagEnvContext)
	if err != nil {
		return "", "", "", err
	}

	if flags.Changed(flagEnvContext) && flags.Changed(flagEnvServer) {
		return "", "", "", fmt.Errorf("flags '%s' and '%s' are mutually exclusive, because '%s' has a server. Try setting '%s', '%s' to the desired values",
			flagEnvContext, flagEnvServer, flagEnvContext, flagEnvServer, flagEnvNamespace)
	}

	return server, namespace, context, nil
}

func resolveEnvFlags(flags *pflag.FlagSet) (string, string, error) {
	defaultNamespace := "default"

	server, envNs, context, err := commonEnvFlags(flags)
	if err != nil {
		return "", "", err
	}

	var ctxNs string
	if server == "" {
		// server is not provided -- use the context.
		server, ctxNs, err = envClientConfig.ResolveContext(context)
		if err != nil {
			return "", "", err
		}
	}

	ns := defaultNamespace
	if envNs != "" {
		ns = envNs
	} else if ctxNs != "" {
		ns = ctxNs
	}

	return server, ns, nil
}

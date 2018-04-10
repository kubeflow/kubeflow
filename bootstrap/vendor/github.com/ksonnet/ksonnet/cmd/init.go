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
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/viper"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/ksonnet/ksonnet/client"
	"github.com/spf13/cobra"
)

const (
	initShortDesc = "Initialize a ksonnet application"

	vInitAPISpec               = "init-api-spec"
	vInitDir                   = "init-dir"
	vInitSkipDefaultRegistries = "init-skip-default-registries"
	vInitEnvironment           = "init-environment"
)

var (
	initClientConfig *client.Config
)

func init() {
	RootCmd.AddCommand(initCmd)
	initClientConfig = client.NewDefaultClientConfig()
	initClientConfig.BindClientGoFlags(initCmd)

	initCmd.Flags().String(flagDir, "", "Ksonnet application directory")
	viper.BindPFlag(vInitDir, initCmd.Flag(flagDir))

	// TODO: We need to make this default to checking the `kubeconfig` file.
	initCmd.Flags().String(flagAPISpec, "",
		"Manually specified Kubernetes API version. The corresponding OpenAPI spec is used to generate ksonnet's Kubernetes libraries")
	viper.BindPFlag(vInitAPISpec, initCmd.Flag(flagAPISpec))

	initCmd.Flags().Bool(flagSkipDefaultRegistries, false, "Skip configuration of default registries")
	viper.BindPFlag(vInitSkipDefaultRegistries, initCmd.Flag(flagSkipDefaultRegistries))

	initCmd.Flags().String(flagEnv, "", "Name of initial environment to create")
	viper.BindPFlag(vInitEnvironment, initCmd.Flag(flagEnv))
}

var initCmd = &cobra.Command{
	Use:   "init <app-name>",
	Short: initShortDesc,
	RunE: func(cmd *cobra.Command, args []string) error {
		flags := cmd.Flags()
		if len(args) != 1 {
			return fmt.Errorf("'init' takes a single argument that names the application we're initializing")
		}

		appName := args[0]
		wd, err := os.Getwd()
		if err != nil {
			return err
		}

		initDir := viper.GetString(vInitDir)

		appRoot, err := genKsRoot(appName, wd, initDir)
		if err != nil {
			return err
		}

		server, namespace, err := resolveEnvFlags(flags)
		if err != nil {
			return err
		}

		specFlag := viper.GetString(vInitAPISpec)
		if specFlag == "" {
			specFlag = initClientConfig.GetAPISpec(server)
		}

		m := map[string]interface{}{
			actions.OptionFs:                    appFs,
			actions.OptionName:                  appName,
			actions.OptionRootPath:              appRoot,
			actions.OptionEnvName:               viper.GetString(vInitEnvironment),
			actions.OptionSpecFlag:              specFlag,
			actions.OptionServer:                server,
			actions.OptionNamespace:             namespace,
			actions.OptionSkipDefaultRegistries: viper.GetBool(vInitSkipDefaultRegistries),
		}

		return runAction(actionInit, m)
	},
	Long: `
The ` + "`init`" + ` command initializes a ksonnet application in a new directory,` + " `app-name`" + `.

This command generates all the project scaffolding required to begin creating and
deploying components to Kubernetes clusters.

ksonnet applications are initialized based on your current cluster configurations,
as defined in your` + " `$KUBECONFIG` " + `environment variable. The *Examples* section
below demonstrates how to customize these configurations.

Creating a ksonnet application results in the following directory tree.

    app-name/
      .ksonnet/      Metadata for ksonnet
      app.yaml       Application specifications (e.g. name, API version)
      components/    Top-level Kubernetes objects defining the application
      environments/  Kubernetes cluster definitions
        default/     Default environment, initialized from the current kubeconfig
          .metadata/ Contains a versioned ksonnet-lib, see [1] for details
      lib/           User-written .libsonnet files
      vendor/        Libraries that define prototypes and their constituent parts

To begin populating your ksonnet application, see the docs for` + " `ks generate` " + `.

[1] ` + "`ksonnet-lib`" + ` is a Jsonnet helper library that wraps Kubernetes-API-compatible
types. A specific version of ` + "`ksonnet-lib`" + ` is automatically provided for each
environment. Users can set flags to generate the library based on a variety of data,
including server configuration and an OpenAPI specification of a specific Kubernetes
build. By default, this is generated using cluster information specified by the
current context, in the file pointed to by` + " `$KUBECONFIG`" + `.

### Related Commands

* ` + "`ks generate` " + `— ` + protoShortDesc["use"] + `

### Syntax
`,
	Example: `# Initialize a ksonnet application, based on cluster information from the
# active kubeconfig file (as specified by the environment variable $KUBECONFIG).
# More specifically, the current context is used.
ks init app-name

# Initialize a ksonnet application, using the context 'dev' from the current
# kubeconfig file ($KUBECONFIG). The default environment is created using the
# server address and default namespace located at the context 'dev'.
ks init app-name --context=dev

# Initialize a ksonnet application, using the context 'dev' and the namespace
# 'dc-west' from the current kubeconfig file ($KUBECONFIG). The default environment
# is created using the server address from the 'dev' context, and the specified
# 'dc-west' namespace.
ks init app-name --context=dev --namespace=dc-west

# Initialize a ksonnet application, using v1.7.1 of the Kubernetes OpenAPI spec
# to generate 'ksonnet-lib'.
ks init app-name --api-spec=version:v1.7.1

# Initialize a ksonnet application, using the OpenAPI spec generated by a
# specific build of Kubernetes to generate 'ksonnet-lib'.
ks init app-name --api-spec=file:swagger.json

# Initialize a ksonnet application, outputting the application directory into
# the specified 'custom-location'.
ks init app-name --dir=custom-location`,
}

func genKsRoot(appName, ksDir, wd string) (string, error) {
	if ksDir == "" {
		return "", errors.New("invalid working directory")
	}

	if appName == "" && wd == "" {
		return "", errors.New("invalid application name")
	}

	if wd != "" {
		if filepath.IsAbs(wd) {
			return wd, nil
		}

		return filepath.Abs(filepath.Join(ksDir, wd))
	}

	return filepath.Join(ksDir, appName), nil
}

// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"fmt"
	"os"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var initCfg = viper.New()

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init <[path/]name>",
	Short: "Create a kubeflow application under <[path/]name>",
	Long: `Create a kubeflow application under <[path/]name>. The <[path/]name> argument can either be a full path
or a <name>. If just <name> a directory <name> will be created in the current directory.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if initCfg.GetBool(string(kftypes.VERBOSE)) == true {
			log.SetLevel(log.InfoLevel)
		} else {
			log.SetLevel(log.WarnLevel)
		}
		if len(args) == 0 {
			return fmt.Errorf("name is required")
		}
		appName := args[0]
		platform := initCfg.GetString(string(kftypes.PLATFORM))
		namespace := initCfg.GetString(string(kftypes.NAMESPACE))
		version := initCfg.GetString(string(kftypes.VERSION))
		repo := initCfg.GetString(string(kftypes.REPO))
		project := initCfg.GetString(string(kftypes.PROJECT))
		init_gcp := initCfg.GetBool(string(kftypes.SKIP_INIT_GCP_PROJECT))

		useBasicAuth := initCfg.GetBool(string(kftypes.USE_BASIC_AUTH))
		if useBasicAuth && (os.Getenv(kftypes.KUBEFLOW_USERNAME) == "" ||
			os.Getenv(kftypes.KUBEFLOW_PASSWORD) == "") {
			// Printing warning message instead of bailing out as both ENV are used in apply,
			// not init.
			log.Warnf("you need to set the environment variable %s to the username you "+
				"want to use to login and variable %s to the password you want to use.",
				kftypes.KUBEFLOW_USERNAME, kftypes.KUBEFLOW_PASSWORD)
		}

		useIstio := initCfg.GetBool(string(kftypes.USE_ISTIO))
		disableUsageReport := initCfg.GetBool(string(kftypes.DISABLE_USAGE_REPORT))

		options := map[string]interface{}{
			string(kftypes.PLATFORM):              platform,
			string(kftypes.NAMESPACE):             namespace,
			string(kftypes.VERSION):               version,
			string(kftypes.APPNAME):               appName,
			string(kftypes.REPO):                  repo,
			string(kftypes.PROJECT):               project,
			string(kftypes.SKIP_INIT_GCP_PROJECT): init_gcp,
			string(kftypes.USE_BASIC_AUTH):        useBasicAuth,
			string(kftypes.USE_ISTIO):             useIstio,
			string(kftypes.DISABLE_USAGE_REPORT):  disableUsageReport,
		}
		kfApp, kfAppErr := coordinator.NewKfApp(options)
		if kfAppErr != nil || kfApp == nil {
			return fmt.Errorf("couldn't create KfApp: %v", kfAppErr)
		}
		initErr := kfApp.Init(kftypes.ALL)
		if initErr != nil {
			return fmt.Errorf("KfApp initialization failed: %v", initErr)
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCfg.SetConfigName("app")
	initCfg.SetConfigType("yaml")

	initCmd.Flags().StringP(string(kftypes.PLATFORM), "p", "",
		"one of 'gcp|minikube'")
	bindErr := initCfg.BindPFlag(string(kftypes.PLATFORM), initCmd.Flags().Lookup(string(kftypes.PLATFORM)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.PLATFORM), bindErr)
		return
	}

	initCmd.Flags().StringP(string(kftypes.NAMESPACE), "n", kftypes.DefaultNamespace,
		string(kftypes.NAMESPACE)+" where kubeflow will be deployed")
	bindErr = initCfg.BindPFlag(string(kftypes.NAMESPACE), initCmd.Flags().Lookup(string(kftypes.NAMESPACE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.NAMESPACE), bindErr)
		return
	}

	initCmd.Flags().StringP(string(kftypes.VERSION), "v", kftypes.DefaultVersion,
		"desired "+string(kftypes.VERSION)+" of Kubeflow or master if not specified. Version can be "+
			"master (eg --version master) or a git tag (eg --version=v0.5.0), or a PR (eg --version pull/<id>).")
	bindErr = initCfg.BindPFlag(string(kftypes.VERSION), initCmd.Flags().Lookup(string(kftypes.VERSION)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERSION), bindErr)
		return
	}

	initCmd.Flags().StringP(string(kftypes.REPO), "r", "",
		"local github kubeflow "+string(kftypes.REPO))
	bindErr = initCfg.BindPFlag(string(kftypes.REPO), initCmd.Flags().Lookup(string(kftypes.REPO)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.REPO), bindErr)
		return
	}

	// platform gcp
	initCmd.Flags().String(string(kftypes.PROJECT), "",
		"name of the gcp "+string(kftypes.PROJECT)+" if --platform gcp")
	bindErr = initCfg.BindPFlag(string(kftypes.PROJECT), initCmd.Flags().Lookup(string(kftypes.PROJECT)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.PROJECT), bindErr)
		return
	}

	// verbose output
	initCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr = initCfg.BindPFlag(string(kftypes.VERBOSE), initCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}

	// Skip initGcpProject.
	initCmd.Flags().BoolP(string(kftypes.SKIP_INIT_GCP_PROJECT), "", false,
		"Set if you want to skip project initialization. Only meaningful if --platform gcp. Default to false")
	bindErr = initCfg.BindPFlag(string(kftypes.SKIP_INIT_GCP_PROJECT), initCmd.Flags().Lookup(
		string(kftypes.SKIP_INIT_GCP_PROJECT)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.SKIP_INIT_GCP_PROJECT), bindErr)
		return
	}

	// Use basic auth
	initCmd.Flags().Bool(string(kftypes.USE_BASIC_AUTH), false,
		string(kftypes.USE_BASIC_AUTH)+" use basic auth service instead of IAP.")
	bindErr = initCfg.BindPFlag(string(kftypes.USE_BASIC_AUTH), initCmd.Flags().Lookup(string(kftypes.USE_BASIC_AUTH)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.USE_BASIC_AUTH), bindErr)
		return
	}

	// Use Istio
	initCmd.Flags().Bool(string(kftypes.USE_ISTIO), false,
		string(kftypes.USE_ISTIO)+" use istio for auth and traffic routing.")
	bindErr = initCfg.BindPFlag(string(kftypes.USE_ISTIO), initCmd.Flags().Lookup(string(kftypes.USE_ISTIO)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.USE_ISTIO), bindErr)
		return
	}

	// Skip usage report
	initCmd.Flags().Bool(string(kftypes.DISABLE_USAGE_REPORT), false,
		string(kftypes.DISABLE_USAGE_REPORT)+" disable anonymous usage reporting.")
	bindErr = initCfg.BindPFlag(string(kftypes.DISABLE_USAGE_REPORT),
		initCmd.Flags().Lookup(string(kftypes.DISABLE_USAGE_REPORT)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.DISABLE_USAGE_REPORT), bindErr)
		return
	}
}

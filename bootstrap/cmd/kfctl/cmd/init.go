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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/coordinator"
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
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		if initCfg.GetBool(string(kftypes.VERBOSE)) == true {
			log.SetLevel(log.InfoLevel)
		} else {
			log.SetLevel(log.WarnLevel)
		}
		if len(args) == 0 {
			log.Errorf("name is required")
			return
		}
		appName := args[0]
		platform := initCfg.GetString(string(kftypes.PLATFORM))
		namespace := initCfg.GetString(string(kftypes.NAMESPACE))
		version := initCfg.GetString(string(kftypes.VERSION))
		repo := initCfg.GetString(string(kftypes.REPO))
		project := initCfg.GetString(string(kftypes.PROJECT))
		init_gcp := initCfg.GetBool(string(kftypes.SKIP_INIT_GCP_PROJECT))
		basic_auth := initCfg.GetBool(string(kftypes.USE_BASIC_AUTH))
		options := map[string]interface{}{
			string(kftypes.PLATFORM):              platform,
			string(kftypes.NAMESPACE):             namespace,
			string(kftypes.VERSION):               version,
			string(kftypes.APPNAME):               appName,
			string(kftypes.REPO):                  repo,
			string(kftypes.PROJECT):               project,
			string(kftypes.SKIP_INIT_GCP_PROJECT): init_gcp,
			string(kftypes.USE_BASIC_AUTH):        basic_auth,
		}
		kfApp, kfAppErr := coordinator.NewKfApp(options)
		if kfAppErr != nil || kfApp == nil {
			log.Errorf("couldn't create KfApp: %v", kfAppErr)
			return
		}
		initErr := kfApp.Init(kftypes.ALL, options)
		if initErr != nil {
			log.Errorf("KfApp initialization failed: %v", initErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCfg.SetConfigName("app")
	initCfg.SetConfigType("yaml")

	initCmd.Flags().StringP(string(kftypes.PLATFORM), "p", kftypes.DefaultPlatform,
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
		"desired "+string(kftypes.VERSION)+" Kubeflow or latest tag if not provided by user ")
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

	initCmd.Flags().Bool(string(kftypes.USE_BASIC_AUTH), false,
		string(kftypes.USE_BASIC_AUTH)+" use basic auth service instead of IAP.")
	bindErr = initCfg.BindPFlag(string(kftypes.USE_BASIC_AUTH), initCmd.Flags().Lookup(string(kftypes.USE_BASIC_AUTH)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.USE_BASIC_AUTH), bindErr)
		return
	}
}

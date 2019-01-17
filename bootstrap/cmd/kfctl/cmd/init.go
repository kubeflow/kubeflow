// Copyright © 2018 NAME HERE <EMAIL ADDRESS>
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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"

	"github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"

	"os"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		fs := afero.NewOsFs()
		if len(args) == 0 {
			log.Errorf("appName required")
			return
		}
		appName := args[0]
		_, err := fs.Stat(appName)
		if err == nil {
			log.Errorf("cannot create app in existing directory %v", appName)
			return
		}
		err = os.Mkdir(appName, os.ModePerm)
		if err != nil {
			log.Errorf("cannot create directory %v", appName)
			return
		}
		config := utils.GetKubeConfigFile("")
		var appConfigFile kftypes.ApplicationSpec
		if err := utils.LoadConfig(config, &appConfigFile); err != nil {
			log.Errorf("couldn't load appConfigfile: %v", err)
			return
		}
		registries := make(map[string]kftypes.RegistryConfig)
		for _, registry := range appConfigFile.App.Registries {
			registries[registry.Name] = registry
		}
		_, err = v1alpha1.NewKfApi(appName, appName, registries)
		if err != nil {
			log.Errorf("couldn't create a new KfApi: %v", err)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
	createCmd.Flags().StringVarP(&platform, "platform", "p", "none", "Platform")
}

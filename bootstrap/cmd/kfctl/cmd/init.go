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
	"fmt"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"

	"github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	log "github.com/sirupsen/logrus"

	"os"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		fs := afero.NewOsFs()

		if appName == "" {
			fmt.Print("name required")
			return
		}
		_, err := fs.Stat(appName)
		if err == nil {
			log.Errorf("Failed getting GKE cluster config: %v", err)
			return
		}
		err = os.Mkdir(appName, os.ModePerm)
		if err != nil {

		}
		config := utils.GetKubeConfigFile("")
		var appConfigFile kftypes.ApplicationSpec
		if err := utils.LoadConfig(config, &appConfigFile); err != nil {
			return
		}

		_, err = v1alpha1.NewKfApi(appName, appName, appConfigFile.App.Registries)
		if err != nil {

		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
	createCmd.Flags().StringVarP(&appName, "name", "n", "app", "Name of yaml file")
}

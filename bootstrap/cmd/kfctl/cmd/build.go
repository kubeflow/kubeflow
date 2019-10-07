// Copyright © 2019 NAME HERE <EMAIL ADDRESS>
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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var configFilePath string
var buildCfg = viper.New()

// buildCmd represents the build command
var buildCmd = &cobra.Command{
	Use:   "build",
	Short: "Builds a KF App from a config file",
	Long:  `Builds a KF App from a config file`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if buildCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}
		_, err := coordinator.BuildKfAppFromURI(configFilePath)
		return err
	},
}

func init() {
	rootCmd.AddCommand(buildCmd)

	buildCfg.SetConfigName("app")
	buildCfg.SetConfigType("yaml")

	// Config file option
	buildCmd.PersistentFlags().StringVarP(&configFilePath, "file", "f", "",
		`Static config file to use. Can be either a local path or a URL.
For example:
--config=https://raw.githubusercontent.com/kubeflow/kubeflow/master/bootstrap/config/kfctl_platform_existing.yaml
--config=kfctl_platform_gcp.yaml`)
	bindErr := buildCfg.BindPFlag(string(kftypes.CONFIG), buildCmd.Flags().Lookup(string(kftypes.CONFIG)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.CONFIG), bindErr)
		return
	}

	// verbose output
	buildCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr = buildCfg.BindPFlag(string(kftypes.VERBOSE), buildCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

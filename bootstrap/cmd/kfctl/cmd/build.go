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
	"fmt"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfupgrade"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
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

		kind, err := utils.GetObjectKindFromUri(configFilePath)
		if err != nil {
			return fmt.Errorf("Cannot determine the object kind: %v", err)
		}

		if kind == string(kftypes.KFDEF) {
			_, err = coordinator.BuildKfAppFromURI(configFilePath)
		} else if kind == string(kftypes.KFUPGRADE) {
			kfUpgrade, kfUpgradeErr := kfupgrade.NewKfUpgrade(configFilePath)
			if kfUpgradeErr != nil {
				return fmt.Errorf("couldn't load KfUpgrade: %v", kfUpgradeErr)
			}

			generateErr := kfUpgrade.Generate()
			if generateErr != nil {
				return fmt.Errorf("couldn't generate KfApp: %v", generateErr)
			}
			return nil
		} else {
			return fmt.Errorf("Unsupported object kind: %v", kind)
		}

		return err
	},
}

func init() {
	rootCmd.AddCommand(buildCmd)

	buildCfg.SetConfigName("app")
	buildCfg.SetConfigType("yaml")

	// Config file option
	buildCmd.PersistentFlags().StringVarP(&configFilePath, string(kftypes.FILE), "f", "",
		`Static config file to use. Can be either a local path or a URL.
	For example:
	export CONFIG=`+arritkoConfig+`
	export CONFIG=`+awsConfig+`
	export CONFIG=`+gcpConfig+`
	export CONFIG=`+k8sConfig+`
	kfctl apply -V --file=${CONFIG}`)

	// verbose output
	buildCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := buildCfg.BindPFlag(string(kftypes.VERBOSE), buildCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

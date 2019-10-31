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

	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfupgrade"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var applyCfg = viper.New()
var kfApp kftypes.KfApp
var err error

// KFDef example configs to be printed out from apply --help
const (
	arritkoConfig = "https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_existing_arrikto.0.7.0.yaml"
	awsConfig     = "https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_aws.0.7.0.yaml"
	gcpConfig     = "https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_gcp_iap.0.7.0.yaml"
	k8sConfig     = "https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_k8s_istio.0.7.0.yaml"
)

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply -f ${CONFIG}",
	Short: "deploys a kubeflow application.",
	Long: `'kfctl apply' builds and deploys a kubeflow application from a KFDef config.` + "\n" +
		`To install run -> ` + ColorPrint("kfctl apply -f ${CONFIG}") + "\n" +
		`For more information, run 'kfctl apply -h' or read the docs at www.kubeflow.org.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if applyCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}

		// Load config from exisiting app.yaml
		if configFilePath == "" {
			return fmt.Errorf("Must pass in -f configFile")
		}

		kind, err := utils.GetObjectKindFromUri(configFilePath)
		if err != nil {
			return fmt.Errorf("Cannot determine the object kind: %v", err)
		}
		switch kind {
		case string(kftypes.KFDEF):
			kfApp, err = coordinator.NewLoadKfAppFromURI(configFilePath)
			if err != nil {
				return fmt.Errorf("failed to build kfApp from URI %s: %v", configFilePath, err)
			}
			if err := kfApp.Apply(kftypes.ALL); err != nil {
				return fmt.Errorf("failed to apply: %s", err)
			}
			log.Info("Applied the configuration Successfully!")
			return nil
		case string(kftypes.KFUPGRADE):
			kfUpgrade, err := kfupgrade.NewKfUpgrade(configFilePath)
			if err != nil {
				return fmt.Errorf("couldn't load KfUpgrade: %v", err)
			}

			err = kfUpgrade.Apply()
			if err != nil {
				return fmt.Errorf("couldn't apply KfUpgrade: %v", err)
			}
			return nil
		default:
			return fmt.Errorf("Unsupported object kind: %v", kind)
		}
	},
}

func init() {
	rootCmd.AddCommand(applyCmd)

	applyCfg.SetConfigName("app")
	applyCfg.SetConfigType("yaml")

	// Config file option
	applyCmd.PersistentFlags().StringVarP(&configFilePath, string(kftypes.FILE), "f", "",
		`Static config file to use. Can be either a local path:
		export CONFIG=./kfctl_gcp_iap.yaml
	or a URL:
		export CONFIG=`+gcpConfig+`
		export CONFIG=`+arritkoConfig+`
		export CONFIG=`+awsConfig+`
		export CONFIG=`+k8sConfig+`
	kfctl apply -V --file=${CONFIG}`)

	// verbose output
	applyCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := applyCfg.BindPFlag(string(kftypes.VERBOSE), applyCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

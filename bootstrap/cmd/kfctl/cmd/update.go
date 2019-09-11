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
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var updateCfg = viper.New()

// updateCmd represents the update command
var updateCmd = &cobra.Command{
	Use:   "update build|apply",
	Short: "Update an existing kubeflow application.",
	Long:  `Update an existing kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if updateCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}
		if len(args) < 1 {
			return fmt.Errorf("missing argument for update; requires either build or apply")
		}
		switch kftypes.UpdateEnum(args[0]) {
		case kftypes.BUILD:
			config := updateCfg.GetString(string(kftypes.CONFIG))
			kfApp, kfAppErr := coordinator.NewUpdateApp(config)

			if kfAppErr != nil || kfApp == nil {
				return fmt.Errorf("couldn't create KfApp: %v", kfAppErr)
			}
			buildErr := kfApp.UpdateBuild()
			if buildErr != nil {
				return fmt.Errorf("KfApp update build failed: %v", buildErr)
			}
			return nil
		case kftypes.APPLY:
			if len(args) < 2 {
				return fmt.Errorf("missing argument for update apply; must specify a kfUpdate file")
			}

			kfApp, kfAppErr := coordinator.LoadKfAppFromUpdateFile(args[1])

			if kfAppErr != nil || kfApp == nil {
				return fmt.Errorf("couldn't create KfApp: %v", kfAppErr)
			}
			applyErr := kfApp.UpdateApply()
			if applyErr != nil {
				return fmt.Errorf("KfApp apply build failed: %v", applyErr)
			}

			return nil
		default:
			return fmt.Errorf("unknown argument for update: %v", args[0])
		}
	},
	ValidArgs: []string{"build", "apply"},
}

func init() {
	rootCmd.AddCommand(updateCmd)

	updateCfg.SetConfigName("app")
	updateCfg.SetConfigType("yaml")

	// verbose output
	updateCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := updateCfg.BindPFlag(string(kftypes.VERBOSE), updateCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}

	// Config file option
	updateCmd.Flags().String(string(kftypes.CONFIG), "",
		`Static config file to use. Can be either a local path or a URL.
For example:
--config=https://raw.githubusercontent.com/kubeflow/kubeflow/master/bootstrap/config/kfctl_platform_existing.yaml
--config=kfctl_platform_gcp.yaml`)
	bindErr = updateCfg.BindPFlag(string(kftypes.CONFIG), updateCmd.Flags().Lookup(string(kftypes.CONFIG)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.CONFIG), bindErr)
		return
	}
}

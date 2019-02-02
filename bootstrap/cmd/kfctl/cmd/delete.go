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
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var deleteCfg = viper.New()

// deleteCmd represents the delete command
var deleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete a kubeflow application.",
	Long:  `Delete a kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		kfApp, kfAppErr := LoadKfApp(deleteCfg)
		if kfAppErr != nil {
			log.Errorf("couldn't load KfApp: %v", kfAppErr)
			return
		}
		resources := kftypes.ALL
		if len(args) == 1 {
			switch resources {
			case kftypes.ALL:
			case kftypes.K8S:
				resources = kftypes.K8S
			case "platform":
				resources = kftypes.PLATFORM
			default:
				log.Errorf("unknown resource %v", resources)
				return
			}
		}
		deleteErr := kfApp.Delete(resources)
		if deleteErr != nil {
			log.Errorf("couldn't delete KfApp: %v", deleteErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(deleteCmd)

	deleteCfg.SetConfigName("app")
	deleteCfg.SetConfigType("yaml")
}

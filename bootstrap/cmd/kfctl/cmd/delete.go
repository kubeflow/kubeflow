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
	Use:   "delete [all(=default)|k8s|platform]",
	Short: "Delete a kubeflow application.",
	Long:  `Delete a kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		log.Info("deleting kubeflow application")
		if deleteCfg.GetBool(string(kftypes.VERBOSE)) == true {
			log.SetLevel(log.InfoLevel)
		} else {
			log.SetLevel(log.WarnLevel)
		}
		resource, resourceErr := processResourceArg(args)
		if resourceErr != nil {
			log.Errorf("invalid resource: %v", resourceErr)
			return
		}
		options := map[string]interface{}{}
		kfApp, kfAppErr := loadKfApp(options)
		if kfAppErr != nil {
			log.Errorf("couldn't load KfApp: %v", kfAppErr)
			return
		}
		deleteErr := kfApp.Delete(resource, options)
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

	// verbose output
	deleteCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := deleteCfg.BindPFlag(string(kftypes.VERBOSE), deleteCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

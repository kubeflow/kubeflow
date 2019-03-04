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

var showCfg = viper.New()

// showCmd represents the show command
var showCmd = &cobra.Command{
	Use:   "show [all(=default)|k8s|platform]",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		log.Info("show kubeflow application")
		if showCfg.GetBool(string(kftypes.VERBOSE)) == true {
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
		kfApp, kfAppErr := coordinator.LoadKfApp(options)
		if kfAppErr != nil {
			log.Errorf("couldn't load KfApp: %v", kfAppErr)
			return
		}
		show, ok := kfApp.(kftypes.KfShow)
		if ok && show != nil {
			showErr := show.Show(resource, options)
			if showErr != nil {
				log.Errorf("couldn't show KfApp: %v", showErr)
				return
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(showCmd)

	showCfg.SetConfigName("app")
	showCfg.SetConfigType("yaml")

	// verbose output
	showCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := showCfg.BindPFlag(string(kftypes.VERBOSE), showCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

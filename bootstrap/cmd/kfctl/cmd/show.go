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

var showCfg = viper.New()

// showCmd represents the show command
var showCmd = &cobra.Command{
	Use:   "show [all(=default)|k8s|platform]",
	Short: "Show a generated kubeflow application.",
	Long:  `Show a generated kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if showCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}
		resource, resourceErr := processResourceArg(args)
		if resourceErr != nil {
			return fmt.Errorf("invalid resource: %v", resourceErr)
		}
		options := map[string]interface{}{}
		kfApp, kfAppErr := coordinator.LoadKfApp(options)
		if kfAppErr != nil {
			return fmt.Errorf("couldn't load KfApp: %v", kfAppErr)
		}
		show, ok := kfApp.(kftypes.KfShow)
		if ok && show != nil {
			showErr := show.Show(resource, options)
			if showErr != nil {
				return fmt.Errorf("couldn't show KfApp: %v", showErr)
			}
		}
		return nil
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

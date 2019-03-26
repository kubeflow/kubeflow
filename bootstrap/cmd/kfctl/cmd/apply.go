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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var applyCfg = viper.New()

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply [all(=default)|k8s|platform]",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		log.Info("deploying kubeflow application")
		if applyCfg.GetBool(string(kftypes.VERBOSE)) == true {
			log.SetLevel(log.InfoLevel)
		} else {
			log.SetLevel(log.WarnLevel)
		}
		resource, resourceErr := processResourceArg(args)
		if resourceErr != nil {
			return fmt.Errorf("invalid resource: %v", resourceErr)
		}
		kfApp, kfAppErr := coordinator.LoadKfApp(map[string]interface{}{})
		if kfAppErr != nil {
			return fmt.Errorf("couldn't load KfApp: %v", kfAppErr)
		}
		applyErr := kfApp.Apply(resource)
		if applyErr != nil {
			return fmt.Errorf("couldn't apply KfApp: %v", applyErr)
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(applyCmd)

	applyCfg.SetConfigName("app")
	applyCfg.SetConfigType("yaml")

	// verbose output
	applyCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := applyCfg.BindPFlag(string(kftypes.VERBOSE), applyCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

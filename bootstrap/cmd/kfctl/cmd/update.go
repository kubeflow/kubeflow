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
	//"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
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
			fmt.Println("BUILDING")
			return nil
		case kftypes.APPLY:
			fmt.Println("APPLYING")
			return nil
		default:
			return fmt.Errorf("unknown argument for update: %v", args[0])
		}
		//resource, resourceErr := processResourceArg(args)
		//if resourceErr != nil {
		//	return fmt.Errorf("invalid resource: %v", resourceErr)
		//}
		//kfApp, kfAppErr := coordinator.LoadKfApp(map[string]interface{}{})
		//if kfAppErr != nil {
		//	return fmt.Errorf("couldn't load KfApp: %v", kfAppErr)
		//}
		//applyErr := kfApp.Apply(resource)
		//if applyErr != nil {
		//	return fmt.Errorf("couldn't apply KfApp: %v", applyErr)
		//}
		//return nil
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
}

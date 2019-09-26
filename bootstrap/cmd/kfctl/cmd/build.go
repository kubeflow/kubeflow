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
)

// buildCmd represents the apply command
var buildCmd = &cobra.Command{
	Use:   "build",
	Short: "Build a kubeflow application.",
	Long:  `Build a kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if applyCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}
		kfApp, buildErr := coordinator.NewLoadKfAppFromConfig(configFilePath)
		if buildErr != nil {
			return fmt.Errorf("couldn't load config file - %v", buildErr)
		}
		if kfApp == nil {
			return fmt.Errorf("couldn't build kfapp from config")
		}
		err := kfApp.Generate(kftypes.ALL)
		if err != nil {
			return fmt.Errorf("couldn't generate KfApp: %v", err)
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(buildCmd)

	applyCfg.SetConfigName("app")
	applyCfg.SetConfigType("yaml")

	// configfilepath as a flag
	buildCmd.Flags().StringVarP(&configFilePath, "file", "f", "", "-f path/to/config/")

	// verbose output
	buildCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := applyCfg.BindPFlag(string(kftypes.VERBOSE), buildCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

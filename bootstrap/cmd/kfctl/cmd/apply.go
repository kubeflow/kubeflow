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
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/builder"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/kustomize"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var applyCfg = viper.New()

// ConfigFilePath is a flag for the apply sub-command to take in a config file (i.e KfDef)
// and bootstrap a KfApp by filling in the necessary fields
var ConfigFilePath string

var resource kftypes.ResourceEnum

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if applyCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}

		var kfApp kftypes.KfApp
		var err error

		// Check if file flag was passed.
		if ConfigFilePath != "" {
			// Use builder with the incoming config file
			kfDef, err := builder.LoadConfigFile(ConfigFilePath)
			if err != nil {
				return fmt.Errorf("couldn't load config file - %v", err)
			}
			resource = builder.GetPlatform(kfDef)
			kfApp := kustomize.GetKfApp(kfDef)

			generateErr := kfApp.Generate(resource)
			if generateErr != nil {
				return fmt.Errorf("couldn't generate KfApp: %v", generateErr)
			}
		} else {
			kfApp, err = coordinator.LoadKfApp(map[string]interface{}{})
			if err != nil {
				return fmt.Errorf("couldn't load KfApp: %v", err)
			}
			resource, err = processResourceArg(args)
			if err != nil {
				return fmt.Errorf("invalid resource: %v", err)
			}
		}

		err = kfApp.Apply(resource)
		if err != nil {
			return fmt.Errorf("couldn't apply KfApp: %v", err)
		}

		return nil
	},
}

func init() {
	rootCmd.AddCommand(applyCmd)

	applyCfg.SetConfigName("app")
	applyCfg.SetConfigType("yaml")

	// configfilepath as a flag
	applyCmd.Flags().StringVarP(&ConfigFilePath, "file", "f", "", "-f /path/to/config")

	// verbose output
	applyCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := applyCfg.BindPFlag(string(kftypes.VERBOSE), applyCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

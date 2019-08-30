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

	kfapply "github.com/kubeflow/kubeflow/bootstrap/v3/cmd/kfctl/cmd/apply"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var applyCfg = viper.New()

// ConfigFilePath is a flag for the apply sub-command to take in a config file (i.e KfDef)
// and bootstrap a KfApp by filling in the necessary fields
var ConfigFilePath string

// Resource is set to k8s by default
const resource = kftypes.K8S

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Args:  cobra.NoArgs,
	Use:   "apply [all(=default)|k8s|platform]",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		if applyCfg.GetBool(string(kftypes.VERBOSE)) != true {
			log.SetLevel(log.WarnLevel)
		}
		// LoadKfApp looks for an app.yaml in the present directory and loads the KfApp
		// from that. In the case, where an user wants to apply a configfile directly
		// LoadKfApp would give out an error while failing to find the app.yaml
		// In that case, we look for a -f flag and load the configfile from the flag to
		// bootstrap a KfApp from scratch. The only caveat being that the current directory should be empty.
		kfApp, err := coordinator.LoadKfApp(map[string]interface{}{})
		if kfApp == nil {
			if ConfigFilePath == "" && err != nil {
				return fmt.Errorf("couldn't load KfApp: %v", err)
			}
			err = kfapply.BootstrapKubeflow(ConfigFilePath, resource)
		}
		if err != nil {
			return fmt.Errorf("couldn't load KfApp: %v", err)
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
	applyCmd.Flags().StringVarP(&ConfigFilePath, "file", "f", "", "`-f /path/to/config`")

	// verbose output
	applyCmd.Flags().BoolP(string(kftypes.VERBOSE), "V", false,
		string(kftypes.VERBOSE)+" output default is false")
	bindErr := applyCfg.BindPFlag(string(kftypes.VERBOSE), applyCmd.Flags().Lookup(string(kftypes.VERBOSE)))
	if bindErr != nil {
		log.Errorf("couldn't set flag --%v: %v", string(kftypes.VERBOSE), bindErr)
		return
	}
}

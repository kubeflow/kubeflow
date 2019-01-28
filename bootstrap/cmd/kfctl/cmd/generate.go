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
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var generateCfg = viper.New()

// generateCmd represents the generate command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a kubeflow application and generate an app.yaml.",
	Long:  `Generate a kubeflow application and generate an app.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		kfApp, kfAppErr := LoadKfApp(generateCfg)
		if kfAppErr != nil {
			log.Errorf("couldn't create KfApp: %v", kfAppErr)
			return
		}
		resources := kftypes.ALL
		if len(args) == 1 {
			switch resources {
			case kftypes.ALL:
			case kftypes.E8S:
				resources = kftypes.E8S
			case "platform":
				resources = kftypes.PLATFORM
			default:
				log.Errorf("unknown resource %v", resources)
				return
			}
		}
		generateErr := kfApp.Generate(resources)
		if generateErr != nil {
			log.Errorf("couldn't generate KfApp: %v", generateErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)

	generateCfg.SetConfigName("app")
	generateCfg.SetConfigType("yaml")

	generateCmd.Flags().StringSliceP("packages", "p", kstypes.DefaultPackages,
		"provide a comma delimited list of package names")
	generateCfg.BindPFlag("packages", generateCmd.Flags().Lookup("packages"))

	generateCmd.Flags().StringSliceP("components", "c", kstypes.DefaultComponents,
		"provide a comma delimited list of component names")
	generateCfg.BindPFlag("components", generateCmd.Flags().Lookup("components"))

	generateCmd.Flags().StringP("namespace", "n", kftypes.DefaultNamespace,
		"namespace where kubeflow will be deployed")
	generateCfg.BindPFlag("namespace", generateCmd.Flags().Lookup("namespace"))
}

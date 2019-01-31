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
	Use:   "generate [resources]",
	Short: "Generate a kubeflow application where resources is one of 'platform | k8s | all'.",
	Long: `Generate a kubeflow application where resources is one of 'platform | k8s | all'.

  platform: non kubernetes resources (eg --platform gcp)
  k8s: kubernetes resources
  all: both platform and k8s

The default is 'all' for any selected platform.`,
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
	bindErr := generateCfg.BindPFlag("packages", generateCmd.Flags().Lookup("packages"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --packages: %v", bindErr)
		return
	}

	generateCmd.Flags().StringSliceP("components", "c", kstypes.DefaultComponents,
		"provide a comma delimited list of component names")
	bindErr = generateCfg.BindPFlag("components", generateCmd.Flags().Lookup("components"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --components: %v", bindErr)
		return
	}

	generateCmd.Flags().StringP("namespace", "n", kftypes.DefaultNamespace,
		"namespace where kubeflow will be deployed")
	bindErr = generateCfg.BindPFlag("namespace", generateCmd.Flags().Lookup("namespace"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --namespace: %v", bindErr)
		return
	}

	generateCmd.Flags().String("email", "",
		"email if '--platform gcp'")
	bindErr = generateCfg.BindPFlag("email", generateCmd.Flags().Lookup("email"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --email: %v", bindErr)
		return
	}

	generateCmd.Flags().String("ipName", "",
		"ipName if '--platform gcp'")
	bindErr = generateCfg.BindPFlag("ipName", generateCmd.Flags().Lookup("ipName"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --ipName: %v", bindErr)
		return
	}

	generateCmd.Flags().String("mount-local", "false",
		"mount-local if '--platform minikube || --platform docker-for-desktop'")
	bindErr = generateCfg.BindPFlag("mount-local", generateCmd.Flags().Lookup("mount-local"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --mount-local: %v", bindErr)
		return
	}
}

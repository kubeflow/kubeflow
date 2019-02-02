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
		log.Info("generating kubeflow application")
		if generateCfg.GetBool("verbose") == true {
			log.SetLevel(log.InfoLevel)
		} else {
			log.SetLevel(log.WarnLevel)
		}
		kfApp, kfAppErr := LoadKfApp(generateCfg)
		if kfAppErr != nil {
			log.Errorf("couldn't load KfApp: %v", kfAppErr)
			return
		}
		resources := kftypes.ALL
		if len(args) == 1 {
			switch resources {
			case kftypes.ALL:
			case kftypes.K8S:
				resources = kftypes.K8S
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

	// platform gcp
	generateCmd.Flags().String("email", "",
		"email if '--platform gcp'")
	bindErr := generateCfg.BindPFlag("email", generateCmd.Flags().Lookup("email"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --email: %v", bindErr)
		return
	}

	// platform gcp
	generateCmd.Flags().String("ipName", "",
		"ipName if '--platform gcp'")
	bindErr = generateCfg.BindPFlag("ipName", generateCmd.Flags().Lookup("ipName"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --ipName: %v", bindErr)
		return
	}

	// platforms minikube, docker-for-desktop
	generateCmd.Flags().String("mount-local", "false",
		"mount-local if '--platform minikube || --platform docker-for-desktop'")
	bindErr = generateCfg.BindPFlag("mount-local", generateCmd.Flags().Lookup("mount-local"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --mount-local: %v", bindErr)
		return
	}

	// verbose output
	generateCmd.Flags().BoolP("verbose", "V", false,
		"verbose output default is false")
	bindErr = generateCfg.BindPFlag("verbose", generateCmd.Flags().Lookup("verbose"))
	if bindErr != nil {
		log.Errorf("couldn't set flag --verbose: %v", bindErr)
		return
	}
}

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
	"github.com/spf13/cobra"
	"os"
)

func processResourceArg(args []string) (kftypes.ResourceEnum, error) {
	if len(args) > 1 {
		return kftypes.ALL, fmt.Errorf("unknown extra args %v", args[1:])
	}
	resources := kftypes.ALL
	if len(args) == 1 {
		switch kftypes.ResourceEnum(args[0]) {
		case kftypes.ALL:
		case kftypes.K8S:
			resources = kftypes.K8S
		case kftypes.PLATFORM:
			resources = kftypes.PLATFORM
		default:
			return kftypes.ALL, fmt.Errorf("unknown argument %v", args[0])
		}
	}
	return resources, nil
}

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "kfctl",
	Short: "A client CLI to create kubeflow applications",
	Long: `A client CLI to create kubeflow applications for specific platforms or 'on-prem' 
to an existing k8s cluster.`,
}

var (
	// VERSION is set during build
	VERSION string
)

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute(version string) {
	VERSION = version

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
}

// initConfig creates a Viper config file and set's it's name and type
func initConfig() {
}

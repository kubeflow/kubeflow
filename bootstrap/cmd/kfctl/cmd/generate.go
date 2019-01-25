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
	kfapi "github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

// generateCmd represents the generate command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a kubeflow application using <name>.yaml.",
	Long:  `Generate a kubeflow application using <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		kfApi, kfApiErr := kfapi.NewKfAppWithConfig(kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApp: %v", kfApiErr)
			return
		}
		generateErr := kfApi.Generate()
		if generateErr != nil {
			log.Errorf("couldn't generate KfApp: %v", generateErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)
}

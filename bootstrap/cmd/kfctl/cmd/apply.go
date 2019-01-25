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
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		kfApi, kfApiErr := v1alpha1.NewKfAppWithConfig(kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApp: %v", kfApiErr)
			return
		}
		applyErr := kfApi.Apply()
		if applyErr != nil {
			log.Errorf("couldn't generate KfApp: %v", applyErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(applyCmd)
}

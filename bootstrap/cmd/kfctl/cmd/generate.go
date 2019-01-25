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
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	flag "github.com/spf13/pflag"
)

// generateCmd represents the generate command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a kubeflow application and generate an app.yaml.",
	Long:  `Generate a kubeflow application and generate an app.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		kfApp, kfAppErr := NewKfAppWithConfig(kfctlConfig)
		if kfAppErr != nil {
			log.Errorf("couldn't create KfApp: %v", kfAppErr)
			return
		}
		generateErr := kfApp.Generate()
		if generateErr != nil {
			log.Errorf("couldn't generate KfApp: %v", generateErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)
	flag.StringSliceP("Spec.Components", "c", []string{"all"},
		"provide a comma delimited list of components")
	kfctlConfig.BindPFlag("Spec.Components", flag.Lookup("Spec.Components"))

}

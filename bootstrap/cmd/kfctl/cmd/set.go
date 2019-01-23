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

// setCmd sets a parameter of a component.
// EG: kfctl set ambassador ambassadorServiceType LoadBalancer
var setCmd = &cobra.Command{
	Use:   "set",
	Short: "Apply one or more parameters to a component within a kubeflow application.",
	Long:  `Apply one or more parameters to a component within a kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		if len(args) != 3 {
			log.Errorf("args {Component Name Value} required")
			return
		}
		component := args[0]
		name := args[1]
		value := args[2]
		kfApi, kfApiErr := kfapi.NewKfApiWithConfig(kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApi: %v", kfApiErr)
			return
		}
		log.Infof("setting %v %v on %v", name, value, component)
		parameterSetErr := kfApi.ParamSet(component, name, value)
		if parameterSetErr != nil {
			log.Errorf("couldn't set %v for component %v. Error: %v", name, component, parameterSetErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(setCmd)
}

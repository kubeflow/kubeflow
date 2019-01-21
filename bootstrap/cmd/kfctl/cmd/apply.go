// Copyright © 2018 NAME HERE <EMAIL ADDRESS>
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
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply",
	Short: "Deploy a generated kubeflow application.",
	Long:  `Deploy a generated kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("apply called")
		cli, cliErr := v1alpha1.GetClientOutOfCluster()
		if cliErr == nil {
			log.Errorf("couldn't create client Error: %v", cliErr)
			return
		}
		kfApi, kfApiErr := v1alpha1.NewKfApiWithConfig(kfctlConfig, kfctlEnv)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApi: %v", kfApiErr)
			return
		}
		host, _, err := ServerVersion()
		if err != nil {
			log.Errorf("couldn't get server version: %v", err)
			return
		}
		namespace := kfctlEnv.GetString("K8S_NAMESPACE")
		nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
		_, nsErr := cli.CoreV1().Namespaces().Create(nsSpec)
		if nsErr != nil {
			log.Errorf("couldn't create namespace %v Error: %v", namespace, nsErr)
			return
		}
		envSetErr := kfApi.EnvSet("default", host)
		if envSetErr != nil {
			log.Errorf("couldn't create ksonnet env default Error: %v", envSetErr)
			return
		}

		//rest := client.RESTClient()

	},
}

func init() {
	rootCmd.AddCommand(applyCmd)
}

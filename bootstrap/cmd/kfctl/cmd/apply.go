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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	"os"

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
		log.SetLevel(log.InfoLevel)
		kfApi, kfApiErr := v1alpha1.NewKfApiWithConfig(kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApi: %v", kfApiErr)
			return
		}
		host, _, err := ServerVersion()
		if err != nil {
			log.Errorf("couldn't get server version: %v", err)
			return
		}
		cli, cliErr := v1alpha1.GetClientOutOfCluster()
		if cliErr != nil {
			log.Errorf("couldn't create client Error: %v", cliErr)
			return
		}
		envSetErr := kfApi.EnvSet(kftypes.KsEnvName, host)
		if envSetErr != nil {
			log.Errorf("couldn't create ksonnet env %v Error: %v", kftypes.KsEnvName, envSetErr)
			return
		}
		//ks param set application name ${DEPLOYMENT_NAME}
		name := kfApi.Application().Name
		paramSetErr := kfApi.ParamSet("application", "name", name)
		if paramSetErr != nil {
			log.Errorf("couldn't set application component's name to %v Error: %v", name, paramSetErr)
			return
		}
		namespace := os.Getenv("K8S_NAMESPACE")
		if namespace == "" {
			namespace = kftypes.DefaultNamespace
		}
		_, nsMissingErr := cli.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
		if nsMissingErr != nil {
			nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
			_, nsErr := cli.CoreV1().Namespaces().Create(nsSpec)
			if nsErr != nil {
				log.Errorf("couldn't create namespace %v Error: %v", namespace, nsErr)
				return
			}
		}
		clientConfig, clientConfigErr := v1alpha1.GetClientConfig()
		if clientConfigErr != nil {
			log.Errorf("couldn't load client config Error: %v", clientConfigErr)
			return
		}
		applyErr := kfApi.Apply([]string{"metacontroller"}, clientConfig)
		if applyErr != nil {
			log.Errorf("couldn't apply metacontroller Error: %v", applyErr)
			return
		}
		applyErr = kfApi.Apply([]string{"application"}, clientConfig)
		if applyErr != nil {
			log.Errorf("couldn't apply application Error: %v", applyErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(applyCmd)
}

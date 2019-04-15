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

// Package apps contains apps API versions
package apps

import (
	log "github.com/sirupsen/logrus"
	ext "k8s.io/apiextensions-apiserver/v2/pkg/apis/apiextensions/v1beta1"
	crdclientset "k8s.io/apiextensions-apiserver/v2/pkg/client/clientset/clientset"
	apiext "k8s.io/apiextensions-apiserver/v2/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	"k8s.io/client-go/v2/kubernetes"
	"k8s.io/client-go/v2/rest"
	"k8s.io/client-go/v2/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/v2/tools/clientcmd/api"
	"os"
	"path/filepath"
)

// KubeConfigPath returns the filepath to the k8 client config file
func KubeConfigPath() string {
	kubeconfigEnv := os.Getenv("KUBECONFIG")
	if kubeconfigEnv == "" {
		home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
		if home == "" {
			for _, h := range []string{"HOME", "USERPROFILE"} {
				if home = os.Getenv(h); home != "" {
					break
				}
			}
		}
		kubeconfigPath := filepath.Join(home, ".kube", "config")
		return kubeconfigPath
	}
	return kubeconfigEnv
}

// GetConfig returns rest.Config using $HOME/.kube/config
func GetConfig() *rest.Config {
	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
	loadingRules.ExplicitPath = KubeConfigPath()
	overrides := &clientcmd.ConfigOverrides{}
	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(loadingRules, overrides).ClientConfig()
	if err != nil {
		log.Warnf("could not open %v Error %v", loadingRules.ExplicitPath, err)
	}
	return config
}

// GetKubeConfig returns a representation of  $HOME/.kube/config
func GetKubeConfig() *clientcmdapi.Config {
	kubeconfig := KubeConfigPath()
	config, configErr := clientcmd.LoadFromFile(kubeconfig)
	if configErr != nil {
		log.Warnf("could not load config Error: %v", configErr)
	}
	return config
}

// GetClientset returns a k8s clientset using .kube/config credentials
func GetClientset(config *rest.Config) *kubernetes.Clientset {
	_clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get kubernetes kfdef: %v", err)
	}
	return _clientset
}

// GetApiExtClientset returns a k8s clientset that can query for CRDs
func GetApiExtClientset(config *rest.Config) apiext.ApiextensionsV1beta1Interface {
	v := ext.SchemeGroupVersion
	config.GroupVersion = &v
	crdClient, err := crdclientset.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get apiextensions kfdef: %v", err)
	}
	return crdClient.ApiextensionsV1beta1()
}

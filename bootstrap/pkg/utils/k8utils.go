/*
Copyright (c) 2016-2017 Bitnami
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package utils

import (
	"errors"
	"fmt"
	"github.com/ghodss/yaml"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"io/ioutil"

	"os"
	"os/user"
	"path"
	"path/filepath"

	"github.com/sirupsen/logrus"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"

	// Auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
)

// BuildOutOfClusterConfig returns k8s config
func BuildOutOfClusterConfig() (*rest.Config, error) {
	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
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
		loadingRules.ExplicitPath = kubeconfigPath
	}
	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		loadingRules, &clientcmd.ConfigOverrides{}).ClientConfig()
	if err != nil {
		return nil, err
	}
	return config, nil
}

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

// GetKubeConfigFile tries to find a kubeconfig file.
func GetKubeConfigFile() string {
	configFile := ""
	usr, err := user.Current()
	if err != nil {
		log.Warningf("Could not get current user; error %v", err)
	} else {
		configFile = path.Join(usr.HomeDir, ".kube", "config")
	}
	if len(os.Getenv(RecommendedConfigPathEnvVar)) > 0 {
		configFile = os.Getenv(RecommendedConfigPathEnvVar)
	}
	return configFile
}

func GetApiServer() (string, error) {
	kubeconfig := viper.New()
	path := GetKubeConfigFile()
	kubeconfig.SetConfigType("yaml")
	kubeconfig.SetConfigFile(path)
	configErr := kubeconfig.ReadInConfig()
	if configErr != nil {
		return "", fmt.Errorf("could not read in %v. Error: %v", path, configErr)
	}
	currentContext := kubeconfig.GetString("current-context")
	log.Infof("current-context is %v", currentContext)

	clusters := kubeconfig.GetStringMap("clusters")
	for cluster := range clusters {
		log.Infof("cluster is %v", cluster)

	}
	return "", nil
}

// GetClientOutOfCluster returns a k8s clientset to the request from outside of cluster
func GetClientOutOfCluster() kubernetes.Interface {
	config, err := BuildOutOfClusterConfig()
	if err != nil {
		logrus.Fatalf("Can not get kubernetes config: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		logrus.Fatalf("Can not get kubernetes client: %v", err)
	}

	return clientset
}

// Load yaml config
func LoadConfigFile(path string, o interface{}) error {
	if path == "" {
		return errors.New("empty path")
	}
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}
	if err = yaml.Unmarshal(data, o); err != nil {
		return err
	}
	return nil
}

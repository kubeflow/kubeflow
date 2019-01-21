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

	// Auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
)

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

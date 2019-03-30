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
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	log "github.com/sirupsen/logrus"
	"io"
	ext "k8s.io/apiextensions-apiserver/v2/pkg/apis/apiextensions/v1beta1"
	"k8s.io/apiextensions-apiserver/v2/pkg/client/clientset/clientset"
	apiextensionsv1beta1 "k8s.io/apiextensions-apiserver/v2/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	"k8s.io/client-go/v2/kubernetes"
	"k8s.io/client-go/v2/rest"
	"k8s.io/client-go/v2/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/v2/tools/clientcmd/api"
	"os"
	"path/filepath"
	"plugin"
	"regexp"
	"strings"
)


func LoadKfApp(platform string, options map[string]interface{}) (kftypes.KfApp, error) {
	platform = strings.Replace(platform, "-", "", -1)
	plugindir := os.Getenv("PLUGINS_ENVIRONMENT")
	pluginpath := filepath.Join(plugindir, platform+".so")
	p, err := plugin.Open(pluginpath)
	if err != nil {
		return nil, fmt.Errorf("could not load plugin %v for platform %v Error %v", pluginpath, platform, err)
	}
	symName := "GetKfApp"
	symbol, symbolErr := p.Lookup(symName)
	if symbolErr != nil {
		return nil, fmt.Errorf("could not find symbol %v for platform %v Error %v", symName, platform, symbolErr)
	}
	return symbol.(func(map[string]interface{}) kftypes.KfApp)(options), nil
}

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

// GetConfig returns k8s config
func BuildOutOfClusterConfig() (*rest.Config, error) {
	loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
	loadingRules.ExplicitPath = KubeConfigPath()
	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		loadingRules, &clientcmd.ConfigOverrides{}).ClientConfig()
	if err != nil {
		return nil, err
	}
	return config, nil
}

func ServerVersion() (host string, version string, err error) {
	restApi, err := BuildOutOfClusterConfig()
	if err != nil {
		return "", "", fmt.Errorf("couldn't build out-of-cluster config. Error: %v", err)
	}
	clnt, clntErr := kubernetes.NewForConfig(restApi)
	if clntErr != nil {
		return "", "", fmt.Errorf("couldn't get clientset. Error: %v", err)
	}
	serverVersion, serverVersionErr := clnt.ServerVersion()
	if serverVersionErr != nil {
		return "", "", fmt.Errorf("couldn't get server version info. Error: %v", serverVersionErr)
	}
	re := regexp.MustCompile("^v[0-9]+.[0-9]+.[0-9]+")
	version = re.FindString(serverVersion.String())
	return restApi.Host, "version:" + version, nil
}

func GetClientConfig() (*clientcmdapi.Config, error) {
	kubeconfig := KubeConfigPath()
	config, configErr := clientcmd.LoadFromFile(kubeconfig)
	if configErr != nil {
		return nil, fmt.Errorf("could not load config Error: %v", configErr)

	}
	return config, nil
}

// GetClientset returns a k8s clientset to the request from outside of cluster
func GetClientOutOfCluster() (kubernetes.Interface, error) {
	config, err := BuildOutOfClusterConfig()
	if err != nil {
		log.Fatalf("Can not get kubernetes config: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get kubernetes kfdef: %v", err)
	}

	return clientset, nil
}

func GetApiExtensionsClientOutOfCluster() (apiextensionsv1beta1.ApiextensionsV1beta1Interface, error) {
	config, err := BuildOutOfClusterConfig()
	if err != nil {
		log.Fatalf("Can not get kubernetes config: %v", err)
	}
	v := ext.SchemeGroupVersion
	config.GroupVersion = &v
	crdClient, err := clientset.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get apiextensions kfdef: %v", err)
	}

	return crdClient.ApiextensionsV1beta1(), nil
}

// Capture replaces os.Stdout with a writer that buffers any data written
// to os.Stdout. Call the returned function to cleanup and get the data
// as a string.
func Capture() func() (string, error) {
	r, w, err := os.Pipe()
	if err != nil {
		panic(err)
	}

	done := make(chan error, 1)

	save := os.Stdout
	os.Stdout = w

	var buf strings.Builder

	go func() {
		_, err := io.Copy(&buf, r)
		_ = r.Close()
		done <- err
	}()

	return func() (string, error) {
		os.Stdout = save
		_ = w.Close()
		err := <-done
		return buf.String(), err
	}
}

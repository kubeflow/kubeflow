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
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	"io"
	ext "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	crdclientset "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset"
	apiext "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	"k8s.io/client-go/kubernetes"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"os"
	"path/filepath"
	"plugin"
	"regexp"
	"strings"
)

const (
	DefaultNamespace = "kubeflow"
	// TODO: find the latest tag dynamically
	DefaultVersion     = "master"
	DefaultGitRepo     = "https://github.com/kubeflow/kubeflow/tarball"
	KfConfigFile       = "app.yaml"
	DefaultCacheDir    = ".cache"
	DefaultConfigDir   = "bootstrap/config"
	DefaultConfigFile  = "kfctl_default.yaml"
	GcpIapConfig       = "kfctl_iap.yaml"
	GcpBasicAuth       = "kfctl_basic_auth.yaml"
	DefaultZone        = "us-east1-d"
	DefaultGkeApiVer   = "v1beta1"
	DefaultAppLabel    = "app.kubernetes.io/name"
	KUBEFLOW_USERNAME  = "KUBEFLOW_USERNAME"
	KUBEFLOW_PASSWORD  = "KUBEFLOW_PASSWORD"
	DefaultSwaggerFile = "bootstrap/k8sSpec/v1.11.7/api/openapi-spec/swagger.json"
)

type ResourceEnum string

const (
	ALL      ResourceEnum = "all"
	K8S      ResourceEnum = "k8s"
	PLATFORM ResourceEnum = "platform"
)

type CliOption string

const (
	EMAIL                 CliOption = "email"
	IPNAME                CliOption = "ipName"
	HOSTNAME              CliOption = "hostname"
	MOUNT_LOCAL           CliOption = "mount-local"
	SKIP_INIT_GCP_PROJECT CliOption = "skip-init-gcp-project"
	VERBOSE               CliOption = "verbose"
	NAMESPACE             CliOption = "namespace"
	VERSION               CliOption = "version"
	REPO                  CliOption = "repo"
	PROJECT               CliOption = "project"
	APPNAME               CliOption = "appname"
	DATA                  CliOption = "Data"
	ZONE                  CliOption = "zone"
	USE_BASIC_AUTH        CliOption = "use_basic_auth"
	USE_ISTIO             CliOption = "use_istio"
	DELETE_STORAGE        CliOption = "delete_storage"
	DISABLE_USAGE_REPORT  CliOption = "disable_usage_report"
)

//
// KfApp provides a common
// API for platforms like gcp or minikube
// They all implement the API below
//
type KfApp interface {
	Apply(resources ResourceEnum) error
	Delete(resources ResourceEnum) error
	Generate(resources ResourceEnum) error
	Init(resources ResourceEnum) error
}

//
// This is used in the ksonnet implementation for `ks show`
//
type KfShow interface {
	Show(resources ResourceEnum, options map[string]interface{}) error
}

func QuoteItems(items []string) []string {
	var withQuotes []string
	for _, item := range items {
		withQuote := "\"" + item + "\""
		withQuotes = append(withQuotes, withQuote)
	}
	return withQuotes
}

func RemoveItem(defaults []string, name string) []string {
	var pkgs []string
	for _, pkg := range defaults {
		if pkg != name {
			pkgs = append(pkgs, pkg)
		}
	}
	return pkgs
}

func RemoveItems(defaults []string, names ...string) []string {
	pkgs := make([]string, len(defaults))
	copy(pkgs, defaults)
	for _, name := range names {
		pkgs = RemoveItem(pkgs, name)
	}
	return pkgs
}

// Platforms
const (
	GCP      = "gcp"
	MINIKUBE = "minikube"
)

func LoadKfApp(client *kfdefs.KfDef) (KfApp, error) {
	platform := strings.Replace(client.Spec.Platform, "-", "", -1)
	plugindir := os.Getenv("PLUGINS_ENVIRONMENT")
	pluginpath := filepath.Join(plugindir, platform+".so")
	p, err := plugin.Open(pluginpath)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not load plugin %v for platform %v Error %v", pluginpath, platform, err),
		}
	}
	symName := "GetKfApp"
	symbol, symbolErr := p.Lookup(symName)
	if symbolErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not find symbol %v for platform %v Error %v", symName, platform, symbolErr),
		}
	}
	return symbol.(func(*kfdefs.KfDef) KfApp)(client), nil
}

// TODO(#2586): Consolidate kubeconfig and API calls.
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

func GetServerVersion(c *clientset.Clientset) string {
	serverVersion, serverVersionErr := c.ServerVersion()
	if serverVersionErr != nil {
		log.Fatalf("couldn't get server version info. Error: %v", serverVersionErr)
	}
	re := regexp.MustCompile("^v[0-9]+.[0-9]+.[0-9]+")
	version := re.FindString(serverVersion.String())
	return "version:" + version
}

// Get $HOME/.kube/config
func GetKubeConfig() *clientcmdapi.Config {
	kubeconfig := KubeConfigPath()
	config, configErr := clientcmd.LoadFromFile(kubeconfig)
	if configErr != nil {
		log.Warnf("could not load config Error: %v", configErr)
	}
	return config
}

// GetClientset returns a k8s clientset using .kube/config credentials
func GetClientset(config *rest.Config) *clientset.Clientset {
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get kubernetes kfdef: %v", err)
	}
	return clientset
}

// Gets a clientset which can query for CRDs
func GetApiExtClientset(config *rest.Config) apiext.ApiextensionsV1beta1Interface {
	v := ext.SchemeGroupVersion
	config.GroupVersion = &v
	crdClient, err := crdclientset.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get apiextensions kfdef: %v", err)
	}
	return crdClient.ApiextensionsV1beta1()
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
		if err == nil {
			return buf.String(), nil
		} else {
			return "", &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: err.Error(),
			}
		}
	}
}

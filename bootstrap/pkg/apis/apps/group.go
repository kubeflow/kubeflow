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
	"io"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"plugin"
	"regexp"
	"strings"

	gogetter "github.com/hashicorp/go-getter"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	ext "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	crdclientset "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset"
	apiext "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	"k8s.io/client-go/kubernetes"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

const (
	DefaultNamespace = "kubeflow"
	// TODO: find the latest tag dynamically
	DefaultVersion         = "master"
	KfConfigFile           = "app.yaml"
	KustomizationFile      = "kustomization.yaml"
	KustomizationParamFile = "params.env"
	DefaultCacheDir        = ".cache"
	KubeflowRepoName       = "kubeflow"
	ManifestsRepoName      = "manifests"
	KubeflowRepo           = "kubeflow"
	ManifestsRepo          = "manifests"
	DefaultConfigDir       = "bootstrap/config"
	DefaultZone            = "us-east1-d"
	DefaultGkeApiVer       = "v1beta1"
	DefaultAppLabel        = "app.kubernetes.io/name"
	DefaultAppVersion      = "app.kubernetes.io/version"
	DefaultAppType         = "kubeflow"
	KUBEFLOW_USERNAME      = "KUBEFLOW_USERNAME"
	KUBEFLOW_PASSWORD      = "KUBEFLOW_PASSWORD"
	DefaultSwaggerFile     = "bootstrap/k8sSpec/v1.11.7/api/openapi-spec/swagger.json"
	YamlSeparator          = "(?m)^---[ \t]*$"
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
	PACKAGE_MANAGER       CliOption = "package-manager"
	CONFIG                CliOption = "config"
)

//
// KfApp provides a common
// API for PackageManagers like ksonnet or kustomize
// They all implement the API below
//
type KfApp interface {
	Apply(resources ResourceEnum) error
	Delete(resources ResourceEnum) error
	Generate(resources ResourceEnum) error
	Init(resources ResourceEnum) error
}

//
// Platform provides a common
// API for platforms like gcp or minikube
// They all implement the API below
//
type Platform interface {
	KfApp
	// Return k8s config built with platform-specific ways; or nil to use default kube config
	GetK8sConfig() (*rest.Config, *clientcmdapi.Config)
}

//
// This is used in the ksonnet implementation for `ks show`
//
type KfShow interface {
	Show(resources ResourceEnum, options map[string]interface{}) error
}

// QuoteItems will place quotes around the string arrays items
func QuoteItems(items []string) []string {
	var withQuotes []string
	for _, item := range items {
		withQuote := "\"" + item + "\""
		withQuotes = append(withQuotes, withQuote)
	}
	return withQuotes
}

// RemoveItem will remove a string item from the string array
func RemoveItem(defaults []string, name string) []string {
	var pkgs []string
	for _, pkg := range defaults {
		if pkg != name {
			pkgs = append(pkgs, pkg)
		}
	}
	return pkgs
}

// Platforms
const (
	AWS              = "aws"
	GCP              = "gcp"
	MINIKUBE         = "minikube"
	EXISTING_ARRIKTO = "existing_arrikto"
)

// PackageManagers
const (
	KSONNET   = "ksonnet"
	KUSTOMIZE = "kustomize"
)

// LoadKfApp will load a shared library of the form <name>.so
func LoadKfApp(name string, kfdef *kfdefs.KfDef) (KfApp, error) {
	pluginname := strings.Replace(name, "-", "", -1)
	plugindir := os.Getenv("PLUGINS_ENVIRONMENT")
	pluginpath := filepath.Join(plugindir, name+".so")
	p, err := plugin.Open(pluginpath)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not load plugin %v for platform %v Error %v", pluginpath, pluginname, err),
		}
	}
	symName := "GetKfApp"
	symbol, symbolErr := p.Lookup(symName)
	if symbolErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not find symbol %v for platform %v Error %v", symName, pluginname, symbolErr),
		}
	}
	return symbol.(func(*kfdefs.KfDef) KfApp)(kfdef), nil
}

// DownloadToCache will download a version of kubeflow github repo or the manifests repo where version can be
//   master
//	 tag
//	 pull/<ID>[/head]
// It returns the local file path of where the repo was downloaded
func DownloadToCache(appDir string, repo string, version string) (string, error) {
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		appdirErr := os.Mkdir(appDir, os.ModePerm)
		if appdirErr != nil {
			log.Errorf("couldn't create directory %v Error %v", appDir, appdirErr)
		}
	}
	cacheDir := path.Join(appDir, DefaultCacheDir)
	cacheDir = path.Join(cacheDir, repo)
	// idempotency
	if _, err := os.Stat(cacheDir); !os.IsNotExist(err) {
		_ = os.RemoveAll(cacheDir)
	}
	cacheDirErr := os.MkdirAll(cacheDir, os.ModePerm)
	if cacheDirErr != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't create directory %v Error %v", cacheDir, cacheDirErr),
		}
	}
	// Version can be
	// --version master
	// --version tag
	// --version pull/<ID>/head
	if strings.HasPrefix(version, "pull") {
		if !strings.HasSuffix(version, "head") {
			version = version + "/head"
		}
	}
	tarballUrl := "https://github.com/kubeflow/" + repo + "/tarball/" + version + "?archive=tar.gz"
	tarballUrlErr := gogetter.GetAny(cacheDir, tarballUrl)
	if tarballUrlErr != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't download kubeflow repo %v Error %v", tarballUrl, tarballUrlErr),
		}
	}
	files, filesErr := ioutil.ReadDir(cacheDir)
	if filesErr != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't read %v Error %v", cacheDir, filesErr),
		}
	}
	subdir := files[0].Name()
	extractedPath := filepath.Join(cacheDir, subdir)
	newPath := filepath.Join(cacheDir, version)
	if strings.Contains(version, "/") {
		parts := strings.Split(version, "/")
		versionPath := cacheDir
		for i := 0; i < len(parts)-1; i++ {
			versionPath = filepath.Join(versionPath, parts[i])
			versionPathErr := os.Mkdir(versionPath, os.ModePerm)
			if versionPathErr != nil {
				return "", &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("couldn't create directory %v Error %v",
						versionPath, versionPathErr),
				}
			}
		}
	}
	renameErr := os.Rename(extractedPath, newPath)
	if renameErr != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't rename %v to %v Error %v", extractedPath, newPath, renameErr),
		}
	}
	return newPath, nil
}

// TODO(#2586): Consolidate kubeconfig and API calls.
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

// GetServerVersion returns the verison of the k8 api server
func GetServerVersion(c *clientset.Clientset) string {
	serverVersion, serverVersionErr := c.ServerVersion()
	if serverVersionErr != nil {
		log.Fatalf("couldn't get server version info. Error: %v", serverVersionErr)
	}
	re := regexp.MustCompile("^v[0-9]+.[0-9]+.[0-9]+")
	version := re.FindString(serverVersion.String())
	return "version:" + version
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
func GetClientset(config *rest.Config) *clientset.Clientset {
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get kubernetes kfdef: %v", err)
	}
	return clientset
}

// GetApiExtClientset returns a client that can query for CRDs
func GetApiExtClientset(config *rest.Config) apiext.ApiextensionsV1beta1Interface {
	v := ext.SchemeGroupVersion
	config.GroupVersion = &v
	crdClient, err := crdclientset.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get apiextensions kfdef: %v", err)
	}
	return crdClient.ApiextensionsV1beta1()
}

// Remove unvalid characters to compile a valid name for default Profile. To prevent
// violation to the naming length restriction, ignore everything after `@`.
func EmailToDefaultName(email string) string {
	name := strings.NewReplacer(".", "-").Replace(email)
	splitted := strings.Split(name, "@")
	if len(splitted) > 1 {
		return "kubeflow-" + splitted[0]
	} else {
		return "kubeflow-" + name
	}
}

// Capture replaces os.Stdout with a writer that buffers any data written
// to os.Stdout. Call the returned function to cleanup and get the data
// as a string. This is used in cases where the API we're calling writes to stdout
// eg ksonnet's show
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

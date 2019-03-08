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
	"encoding/base64"

	"cloud.google.com/go/container/apiv1"
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/option"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"io"
	ext "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	"k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset"
	apiextensionsv1beta1 "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"math/rand"
	"os"
	"path/filepath"
	/* PLUGINS
	"plugin"
	/* PLUGINS */
	"regexp"
	"strings"
)

const (
	DefaultNamespace = "kubeflow"
	DefaultPlatform  = "none"
	// TODO: find the latest tag dynamically
	DefaultVersion    = "master"
	DefaultGitRepo    = "https://github.com/kubeflow/kubeflow/tarball"
	KfConfigFile      = "app.yaml"
	DefaultCacheDir   = ".cache"
	DefaultConfigDir  = "bootstrap/config"
	DefaultConfigFile = "kfctl_default.yaml"
	GcpIapConfig      = "kfctl_iap.yaml"
	GcpBasicAuth      = "kfctl_basic_auth.yaml"
	DefaultZone       = "us-east1-d"
	DefaultGkeApiVer  = "v1beta1"
	DefaultAppLabel   = "app.kubernetes.io/name"
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
	APPDIR                CliOption = "appDir"
	DATA                  CliOption = "Data"
	ZONE                  CliOption = "zone"
	USE_BASIC_AUTH        CliOption = "use_basic_auth"
	OAUTH_ID              CliOption = "oauth_id"
	OAUTH_SECRET          CliOption = "oauth_secret"
	DEFAULT_CONFIG        CliOption = "default_config"
)

var DefaultPackages = []string{
	"application",
	"argo",
	"common",
	"examples",
	"jupyter",
	"katib",
	"metacontroller",
	"modeldb",
	"mpi-job",
	"openvino",
	"pipeline",
	"profiles",
	"pytorch-job",
	"seldon",
	"tensorboard",
	"tf-serving",
	"tf-training",
}
var DefaultComponents = []string{
	"ambassador",
	"application",
	"argo",
	"centraldashboard",
	"jupyter",
	"jupyter-web-app",
	"katib",
	"metacontroller",
	"notebooks",
	"notebook-controller",
	"openvino",
	"pipeline",
	"profiles",
	"pytorch-operator",
	"spartakus",
	"tensorboard",
	"tf-job-operator",
}

var DefaultParameters = map[string][]NameValue{
	"spartakus": {
		NameValue{
			Name:  "usageId",
			Value: fmt.Sprintf("%08d", 10000000+rand.Intn(90000000)),
		},
		NameValue{
			Name:  "reportUsage",
			Value: "true",
		},
	},
}

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

//
// KfApp provides a common
// API for platforms like gcp or minikube
// They all implementation the API below
//
type KfApp interface {
	Apply(resources ResourceEnum, options map[string]interface{}) error
	Delete(resources ResourceEnum, options map[string]interface{}) error
	Generate(resources ResourceEnum, options map[string]interface{}) error
	Init(resources ResourceEnum, options map[string]interface{}) error
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

const (
	DOCKER_FOR_DESKTOP = "docker-for-desktop"
	GCP                = "gcp"
	NONE               = DefaultPlatform
	MINIKUBE           = "minikube"
)

func LoadPlatform(options map[string]interface{}) (KfApp, error) {
	/* PLUGINS
	platform := options[string(PLATFORM)].(string)
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
	return symbol.(func(map[string]interface{}) KfApp)(options), nil
	/* PLUGINS */
	// STATIC
	return nil, fmt.Errorf("could not load platform")
	// -STATIC //
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

func GetClusterInfo(ctx context.Context, project string, location string,
	cluster string) (*containerpb.Cluster, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	getClusterReq := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone:      location,
		ClusterId: cluster,
	}
	return c.GetCluster(ctx, getClusterReq)
}

func BuildConfigFromClusterInfo(ctx context.Context, cluster *containerpb.Cluster) (*rest.Config, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	t, err := ts.Token()
	if err != nil {
		return nil, fmt.Errorf("Token retrieval error: %v", err)
	}
	caDec, _ := base64.StdEncoding.DecodeString(cluster.MasterAuth.ClusterCaCertificate)
	config := &rest.Config{
		Host:        "https://" + cluster.Endpoint,
		BearerToken: t.AccessToken,
		TLSClientConfig: rest.TLSClientConfig{
			CAData: []byte(string(caDec)),
		},
	}
	return config, nil
}

// BuildOutOfClusterConfig returns k8s config
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

func ServerVersionWithConfig(client *rest.Config) (host string, version string, err error) {
	clnt, clntErr := kubernetes.NewForConfig(client)
	if clntErr != nil {
		return "", "", fmt.Errorf("couldn't get clientset. Error: %v", err)
	}
	serverVersion, serverVersionErr := clnt.ServerVersion()
	if serverVersionErr != nil {
		return "", "", fmt.Errorf("couldn't get server version info. Error: %v", serverVersionErr)
	}
	re := regexp.MustCompile("^v[0-9]+.[0-9]+.[0-9]+")
	version = re.FindString(serverVersion.String())
	return client.Host, "version:" + version, nil
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
	log.Infof("Reading config: %v", kubeconfig)
	config, configErr := clientcmd.LoadFromFile(kubeconfig)
	if configErr != nil {
		return nil, fmt.Errorf("could not load config Error: %v", configErr)

	}
	return config, nil
}

// GetClientOutOfCluster returns a k8s clientset to the request from outside of cluster
func GetClientOutOfCluster() (kubernetes.Interface, error) {
	config, err := BuildOutOfClusterConfig()
	if err != nil {
		log.Fatalf("Can not get kubernetes config: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get kubernetes client: %v", err)
	}

	return clientset, nil
}

// Gets a client which can query for CRDs
func GetApiExtensionsClientOutOfCluster() (apiextensionsv1beta1.ApiextensionsV1beta1Interface, error) {
	config, err := BuildOutOfClusterConfig()
	if err != nil {
		log.Fatalf("Can not get kubernetes config: %v", err)
	}
	v := ext.SchemeGroupVersion
	config.GroupVersion = &v
	crdClient, err := clientset.NewForConfig(config)
	if err != nil {
		log.Fatalf("Can not get dynamic client: %v", err)
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

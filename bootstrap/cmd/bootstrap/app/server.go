// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package app

import (
	"errors"
	"github.com/prometheus/client_golang/prometheus"
	"io/ioutil"
	"net"
	"os"
	"os/user"
	"path"
	"regexp"
	"strconv"
	"strings"

	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/v3/cmd/bootstrap/app/options"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/version"
	log "github.com/sirupsen/logrus"
	"k8s.io/api/storage/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	k8sVersion "k8s.io/apimachinery/pkg/version"
	kubeclientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

// DefaultStorageAnnotation is the Name of the default annotation used to indicate
// whether a storage class is the default.
const DefaultStorageAnnotation = "storageclass.beta.kubernetes.io/is-default-class"

// Assume gcloud is on the path.
const GcloudPath = "gcloud"

const RegistriesRoot = "/opt/registries"

// AppConfigFile corresponds to a YAML file specifying information
// about the app to create.
type AppConfigFile struct {
	// App describes a ksonnet application.
	App kstypes.AppConfig
}

type LibrarySpec struct {
	Version string
	Path    string
}

var (
	// Counter metrics
	// num of requests counter vec
	// status field has values: {"OK", "UNKNOWN", "INTERNAL", "INVALID_ARGUMENT"}
	deployReqCounter = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "deploy_requests",
			Help: "Number of requests for deployments",
		},
		[]string{"status"},
	)
	deploymentFailure = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "deployments_failure",
		Help: "Number of failed Kubeflow deployments",
	}, []string{"status"})

	serviceHeartbeat = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "service_heartbeat",
		Help: "Heartbeat signal every 10 seconds indicating pods are alive.",
	})

	deployReqCounterUser = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "deploy_requests_user",
		Help: "Number of user requests for deployments",
	})
	kfDeploymentsDoneUser = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "kubeflow_deployments_done_user",
		Help: "Number of successfully finished Kubeflow user deployments",
	})

	// Gauge metrics
	deployReqCounterRaw = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "deploy_requests_raw",
		Help: "Number of requests for deployments",
	})
	kfDeploymentsDoneRaw = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "kubeflow_deployments_done_raw",
		Help: "Number of successfully finished Kubeflow deployments",
	})

	// latencies
	clusterDeploymentLatencies = prometheus.NewHistogram(prometheus.HistogramOpts{
		Name:    "cluster_dep_duration_seconds",
		Help:    "A histogram of the GKE cluster deployment request duration in seconds",
		Buckets: prometheus.LinearBuckets(30, 30, 15),
	})
	kfDeploymentLatencies = prometheus.NewHistogram(prometheus.HistogramOpts{
		Name:    "kubeflow_dep_duration_seconds",
		Help:    "A histogram of the KF deployment request duration in seconds",
		Buckets: prometheus.LinearBuckets(150, 30, 20),
	})
)

func init() {
	// Register prometheus counters
	prometheus.MustRegister(deployReqCounter)
	prometheus.MustRegister(clusterDeploymentLatencies)
	prometheus.MustRegister(kfDeploymentLatencies)
	prometheus.MustRegister(deployReqCounterUser)
	prometheus.MustRegister(kfDeploymentsDoneUser)
	prometheus.MustRegister(deployReqCounterRaw)
	prometheus.MustRegister(kfDeploymentsDoneRaw)
	prometheus.MustRegister(deploymentFailure)
	prometheus.MustRegister(serviceHeartbeat)
}

// Load yaml config
func LoadConfig(path string, o interface{}) error {
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

// ModifyGcloudCommand modifies the cmd-path in the kubeconfig file.
//
// We do this because we want to be able to mount the kubeconfig file into the container.
// The kubeconfig file typically uses the full path for the binary. This won't work inside the boostrap
// container because the path will be different. However, we can assume gcloud is on the path.
// TODO(jlewi): Do we still use this?
func modifyGcloudCommand(config *clientcmdapi.Config) error {
	for k, a := range config.AuthInfos {
		if a.AuthProvider == nil || a.AuthProvider.Name != "gcp" {
			continue
		}

		if p, hasP := a.AuthProvider.Config["cmd-path"]; hasP {
			log.Infof("AuthInfo %v changing cmd-path %v to %v", k, p, GcloudPath)
			a.AuthProvider.Config["cmd-path"] = GcloudPath
		}
		config.AuthInfos[k] = a
	}
	return nil
}

// getKubeConfigFile tries to find a kubeconfig file.
func getKubeConfigFile() string {
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

// gGetClusterConfig obtain the config from the Kube configuration used by kubeconfig.
// If inCluster is true it returns the in cluster configuration.
//
// TODO(jlewi): We also have method KubeConfigPath in v3/pkg/apis/apps/group.go
func getClusterConfig(inCluster bool) (*rest.Config, error) {
	if inCluster {
		return rest.InClusterConfig()
	}
	configFile := getKubeConfigFile()

	if len(configFile) > 0 {

		log.Infof("Reading config from file: %v", configFile)
		// use the current context in kubeconfig
		// This is very useful for running locally.
		clientConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
			&clientcmd.ClientConfigLoadingRules{ExplicitPath: configFile},
			&clientcmd.ConfigOverrides{ClusterInfo: clientcmdapi.Cluster{Server: ""}})

		rawConfig, err := clientConfig.RawConfig()

		if err != nil {
			return nil, err
		}

		if err := modifyGcloudCommand(&rawConfig); err != nil {
			return nil, err
		}

		config, err := clientConfig.ClientConfig()
		return config, err
	}

	// Work around https://github.com/kubernetes/kubernetes/issues/40973
	// See https://github.com/coreos/etcd-operator/issues/731#issuecomment-283804819
	if len(os.Getenv("KUBERNETES_SERVICE_HOST")) == 0 {
		addrs, err := net.LookupHost("kubernetes.default.svc")
		if err != nil {
			panic(err)
		}
		if err := os.Setenv("KUBERNETES_SERVICE_HOST", addrs[0]); err != nil {
			return nil, err
		}
	}
	if len(os.Getenv("KUBERNETES_SERVICE_PORT")) == 0 {
		if err := os.Setenv("KUBERNETES_SERVICE_PORT", "443"); err != nil {
			panic(err)
		}
	}

	config, err := rest.InClusterConfig()
	return config, err
}

func isGke(v *k8sVersion.Info) bool {
	pattern := regexp.MustCompile(`.*gke.*`)
	log.Infof("Cluster platform: %v", v.Platform)

	return pattern.MatchString(v.String())
}

func hasDefaultStorage(sClasses *v1.StorageClassList) bool {
	for _, i := range sClasses.Items {
		log.Infof("Storage class: %v", i.GetName())
		if _, has := i.GetAnnotations()[DefaultStorageAnnotation]; !has {
			log.Infof("Storage class %v doesn't have annotation %v", i.GetName(), DefaultStorageAnnotation)
			continue
		}

		v, _ := i.GetAnnotations()[DefaultStorageAnnotation]

		isDefault, err := strconv.ParseBool(v)

		if err != nil {
			log.Infof("Error parsing %v as bool; error %v", v, err)
		}

		log.Infof("StorageClass %v is default %v", i.GetName(), isDefault)

		if isDefault {
			return true
		}
	}
	return false
}

// Run the application.
func Run(opt *options.ServerOption) error {
	// Check if the -version flag was passed and, if so, print the version and exit.
	if opt.PrintVersion {
		version.PrintVersionAndExit()
	}

	// Load information about the default registries.
	var regConfig kfdefs.RegistriesConfigFile

	if opt.RegistriesConfigFile != "" {
		log.Infof("Loading registry info in file %v", opt.RegistriesConfigFile)
		if err := LoadConfig(opt.RegistriesConfigFile, &regConfig); err != nil {
			return err
		}
	} else {
		log.Info("--registries-config-file not provided; not loading any registries")
	}

	if strings.ToLower(opt.Mode) == "kfctl" {
		log.Info("Creating kfctl server")
		kServer, err := NewKfctlServer(opt.AppDir)

		if err != nil {
			return err
		}
		kServer.RegisterEndpoints()
	} else {
		if strings.ToLower(opt.Mode) == "gc" {
			log.Info("Creating gc server")
			kServer, err := NewKfctlServer(opt.AppDir)
			if err != nil {
				return err
			}
			kServer.RegisterEndpoints()
		} else {
			log.Infof("Getting K8s client")

			// Create a K8s client to talk to the cluster in which the server is running.
			// This will be used by the router to spin up statefulsets to handle the requests.
			config, err := getClusterConfig(opt.InCluster)

			if err != nil {
				return err
			}

			log.Info("Creating router")

			kubeClientSet, err := kubeclientset.NewForConfig(rest.AddUserAgent(config, "kfctl-server"))

			if err != nil {
				return err
			}

			// Determine the docker image by fetching the pod spec.
			podName := os.Getenv("MY_POD_NAME")
			podNamespace := os.Getenv("MY_POD_NAMESPACE")

			log.Infof("Running in pod %v, %v", podNamespace, podName)

			pod, err := kubeClientSet.CoreV1().Pods(podNamespace).Get(podName, metav1.GetOptions{})

			if err != nil {
				log.Fatalf("Could not fetch pod info for %v.%v; Error: %+v", podNamespace, podName, err)
				return err
			}

			image := pod.Spec.Containers[0].Image
			log.Infof("Using image: %v", image)
			router, err := NewRouter(kubeClientSet, image, opt.KfctlAppsNamespace)

			if err != nil {
				return err
			}
			router.RegisterEndpoints()
		}
	}

	log.Info("Creating server")
	ksServer, err := NewServer(opt.AppDir, regConfig.Registries, opt.GkeVersionOverride, opt.InstallIstio)
	if err != nil {
		return err
	}

	if opt.KeepAlive {
		log.Infof("Starting http server.")
		ksServer.StartHttp(opt.Port)
	}

	return nil
}

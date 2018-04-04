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
	"fmt"
	"net"
	"os/user"
	"path/filepath"

	"github.com/ksonnet/ksonnet/actions"
	kApp "github.com/ksonnet/ksonnet/metadata/app"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app/options"
	"github.com/kubeflow/kubeflow/bootstrap/version"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"

	"os"
	"path"
	"regexp"
	"strconv"
	"strings"

	v1 "k8s.io/api/storage/v1"
	k8sVersion "k8s.io/apimachinery/pkg/version"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

// DefaultStorageAnnotation is the name of the default annotation used to indicate
// whether a storage class is the default.
const DefaultStorageAnnotation = "storageclass.beta.kubernetes.io/is-default-class"

const DefaultNamespace = "kubeflow"

// Assume gcloud is on the path.
const GcloudPath = "gcloud"

// TODO(jlewi): If we use the same userid and groupid when running in a container then
// we shoiuld be able to map in a user's home directory which could be useful e.g for
// avoiding the oauth flow.

// ModifyGcloudCommand modifies the cmd-path in the kubeconfig file.
//
// We do this because we want to be able to mount the kubeconfig file into the container.
// The kubeconfig file typically uses the full path for the binary. This won't work inside the boostrap
// container because the path will be different. However, we can assume gcloud is on the path.
func modifyGcloudCommand(config *clientcmdapi.Config) error {
	for k, a := range config.AuthInfos {
		if a.AuthProvider.Name != "gcp" {
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

// GetKubeConfigFile tries to find a kubeconfig file.
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
//
func getClusterConfig() (*rest.Config, string, error) {
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
			return nil, "", err
		}

		if err := modifyGcloudCommand(&rawConfig); err != nil {
			return nil, "", err
		}

		namespace, _, err := clientConfig.Namespace()

		if err != nil {
			return nil, "", err
		}

		config, err := clientConfig.ClientConfig()
		return config, namespace, err
	}

	// Work around https://github.com/kubernetes/kubernetes/issues/40973
	// See https://github.com/coreos/etcd-operator/issues/731#issuecomment-283804819
	if len(os.Getenv("KUBERNETES_SERVICE_HOST")) == 0 {
		addrs, err := net.LookupHost("kubernetes.default.svc")
		if err != nil {
			panic(err)
		}
		if err := os.Setenv("KUBERNETES_SERVICE_HOST", addrs[0]); err != nil {
			return nil, "", err
		}
	}
	if len(os.Getenv("KUBERNETES_SERVICE_PORT")) == 0 {
		if err := os.Setenv("KUBERNETES_SERVICE_PORT", "443"); err != nil {
			panic(err)
		}
	}

	config, err := rest.InClusterConfig()
	return config, DefaultNamespace, err
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

// Run the tool.
func Run(opt *options.ServerOption) error {
	// Check if the -version flag was passed and, if so, print the version and exit.
	if opt.PrintVersion {
		version.PrintVersionAndExit()
	}

	config, namespace, err := getClusterConfig()
	log.Infof("Using namespace: %v", namespace)
	if err != nil {
		return err
	}

	kubeClient, err := clientset.NewForConfig(rest.AddUserAgent(config, "kubeflow-bootstraper"))
	if err != nil {
		return err
	}

	clusterVersion, err := kubeClient.DiscoveryClient.ServerVersion()

	if err != nil {
		return err
	}

	isGke(clusterVersion)
	log.Infof("Cluster version: %v", clusterVersion.String())

	s := kubeClient.StorageV1()
	sClasses, err := s.StorageClasses().List(meta_v1.ListOptions{})

	if err != nil {
		return err
	}

	hasDefault := hasDefaultStorage(sClasses)

	fs := afero.NewOsFs()

	_, err = fs.Stat(opt.AppDir)

	log.Infof("Using K8s host %v", config.Host)

	envName := "default"

	if err != nil {
		options := map[string]interface{}{
			actions.OptionFs:                    fs,
			actions.OptionName:                  "app",
			actions.OptionEnvName:               envName,
			actions.OptionRootPath:              opt.AppDir,
			actions.OptionServer:                config.Host,
			// TODO(jlewi): What is the proper version to use? It shouldn't be a version like v1.9.0-gke as that
			// will create an error because ksonnet will be unable to fetch a swagger spec.
			actions.OptionSpecFlag:              "version:v1.7.0",
			actions.OptionNamespace:             namespace,
			actions.OptionSkipDefaultRegistries: true,
		}

		err := actions.RunInit(options)

		if err != nil {
			log.Fatalf("There was a problem initializing the app: %v", err)
		}

		log.Infof("Successfully initialized the app %v.", opt.AppDir)

	} else {

		log.Infof("Directory %v exists", opt.AppDir)
	}

	kfApp, err := kApp.Load(fs, opt.AppDir, true)

	if err != nil {
		log.Fatalf("There was a problem loading the app: %v", err)
	}

	registryUri := fmt.Sprintf("github.com/kubeflow/kubeflow/tree/%v/kubeflow", opt.KfVersion)

	registryName := "kubeflow"

	options := map[string]interface{}{
		actions.OptionApp:  kfApp,
		actions.OptionName: registryName,
		actions.OptionURI:  registryUri,
		// Version doesn't actually appear to be used by the add function.
		actions.OptionVersion: "",
		// Looks like override allows us to override existing registries; we shouldn't
		// need to do that.
		actions.OptionOverride: false,
	}

	registries, err := kfApp.Registries()

	if err != nil {
		log.Fatal("There was a problem listing registries; %v", err)
	}

	if _, found := registries[registryName]; found {
		log.Infof("App already has registry %v", registryName)
	} else {

		err = actions.RunRegistryAdd(options)
		if err != nil {
			log.Fatalf("There was a problem adding the registry: %v", err)
		}
	}

	libs, err := kfApp.Libraries()

	if err != nil {
		log.Fatalf("Could not list libraries for app; error %v", err)
	}

	// Install packages.
	for _, p := range []string{"kubeflow/core", "kubeflow/tf-serving", "kubeflow/tf-job"} {
		full := fmt.Sprintf("%v@%v", p, opt.KfVersion)
		log.Infof("Installing package %v", full)

		pieces := strings.Split(p, "/")
		pkgName := pieces[1]

		if _, found := libs[pkgName]; found {
			log.Infof("Package %v already exists", pkgName)
			continue
		}
		err := actions.RunPkgInstall(map[string]interface{}{
			actions.OptionApp:     kfApp,
			actions.OptionLibName: full,
			actions.OptionName:    pkgName,
		})

		if err != nil {
			log.Fatalf("There was a problem installing package %v; error %v", full, err)
		}
	}

	// Create the Kubeflow component
	prototypeName := "kubeflow-core"
	componentName := "kubeflow-core"
	componentPath := filepath.Join(opt.AppDir, "components", componentName+".jsonnet")

	if exists, _ := afero.Exists(fs, componentPath); !exists {
		err = actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionApp: kfApp,
			actions.OptionArguments: []string{
				prototypeName,
				componentName,
			},
		})
	} else {
		log.Infof("Component %v already exists", componentName)
	}

	if err != nil {
		log.Fatalf("There was a problem creating protoype package kubeflow-core; error %v", err)
	}

	pvcMount := ""
	if hasDefault {
		pvcMount = "/home/jovyan/work"
	}

	err = actions.RunParamSet(map[string]interface{}{
		actions.OptionApp:   kfApp,
		actions.OptionName:  componentName,
		actions.OptionPath:  "jupyterNotebookPVCMount",
		actions.OptionValue: pvcMount,
	})

	if err != nil {
		return err
	}


	if err := os.Chdir(kfApp.Root()); err != nil {
		return err
	}
	log.Infof("App root %v", kfApp.Root())
	err = actions.RunShow(map[string]interface{}{
		actions.OptionApp:   kfApp,
		actions.OptionFormat: "yaml",
		actions.OptionComponentNames: []string{},
		actions.OptionEnvName:  envName,
	})

	fmt.Printf("Initialized app %v\n", opt.AppDir)
	return err
}

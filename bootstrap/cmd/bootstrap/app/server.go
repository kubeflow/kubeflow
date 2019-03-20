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
	"io/ioutil"
	"net"
	"os"
	"os/user"
	"path"
	"regexp"
	"strconv"

	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app/options"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/version"
	log "github.com/sirupsen/logrus"
	"k8s.io/api/storage/v1"
	k8sVersion "k8s.io/apimachinery/pkg/version"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"

	"context"
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

// processFile creates an app based on a configuration file.
func processFile(opt *options.ServerOption, ksServer *ksServer) error {
	ctx := context.Background()

	appName := "kubeflow"

	var appConfigFile AppConfigFile
	if err := LoadConfig(opt.Config, &appConfigFile); err != nil {
		return err
	}

	request := CreateRequest{
		Name:          appName,
		AppConfig:     appConfigFile.App,
		Namespace:     opt.NameSpace,
		AutoConfigure: true,
	}
	if err := ksServer.CreateApp(ctx, request, nil); err != nil {
		return err
	}

	if opt.Apply {
		req := ApplyRequest{
			Name:        appName,
			Environment: "default",
			Components:  make([]string, 0),
		}

		for _, component := range appConfigFile.App.Components {
			req.Components = append(req.Components, component.Name)
		}

		if err := ksServer.Apply(ctx, req); err != nil {
			log.Errorf("Failed to apply app %v; Error: %v", appName, err)
			return err
		}
	}
	return nil
}

// Run the application.
func Run(opt *options.ServerOption) error {
	// Check if the -version flag was passed and, if so, print the version and exit.
	if opt.PrintVersion {
		version.PrintVersionAndExit()
	}

	// Load information about the default registries.
	var regConfig kstypes.RegistriesConfigFile

	if opt.RegistriesConfigFile != "" {
		log.Infof("Loading registry info in file %v", opt.RegistriesConfigFile)
		if err := LoadConfig(opt.RegistriesConfigFile, &regConfig); err != nil {
			return err
		}
	} else {
		log.Info("--registries-config-file not provided; not loading any registries")
	}

	ksServer, err := NewServer(opt.AppDir, regConfig.Registries, opt.GkeVersionOverride, opt.InstallIstio)

	if err != nil {
		return err
	}

	if opt.Config != "" {
		log.Infof("Processing file: %v", opt.Config)
		if err := processFile(opt, ksServer); err != nil {
			log.Errorf("Error occurred tyring to process file %v; %v", opt.Config, err)
		}
	}

	if opt.KeepAlive {
		log.Infof("Starting http server.")
		ksServer.StartHttp(opt.Port)
	}

	return nil
}

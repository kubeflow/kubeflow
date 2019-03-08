/*
Copyright The Kubernetes Authors.

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

package coordinator

import (
	"fmt"
	"github.com/ghodss/yaml"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	"github.com/mitchellh/go-homedir"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	// STATIC
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/dockerfordesktop"

	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
	log "github.com/sirupsen/logrus"
)

// The common entry point used to retrieve an implementation of KfApp.
// In this case it returns a composite class (coordinator) which aggregates
// platform and ksonnet implementations in Children.
func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_client := &coordinator{
		Children: make(map[string]kftypes.KfApp),
		Client: &cltypes.Client{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Client",
				APIVersion: "client.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	_client.Children[kftypes.NONE] = ksonnet.GetKfApp(options)
	platform := options[string(kftypes.PLATFORM)].(string)
	if !(platform == "" || platform == kftypes.NONE) {
		_platform, _platformErr := GetPlatform(options)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil
		}
		if _platform != nil {
			_client.Children[platform] = _platform
		}
	}
	_client.Client.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	if options[string(kftypes.APPNAME)] != nil {
		_client.Client.Name = options[string(kftypes.APPNAME)].(string)
	}
	if options[string(kftypes.APPDIR)] != nil {
		_client.Client.Spec.AppDir = options[string(kftypes.APPDIR)].(string)
	}
	if options[string(kftypes.NAMESPACE)] != nil {
		namespace := options[string(kftypes.NAMESPACE)].(string)
		_client.Client.Namespace = namespace
	}
	if options[string(kftypes.REPO)] != nil {
		kubeflowRepo := options[string(kftypes.REPO)].(string)
		re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
		goPathVar := os.Getenv("GOPATH")
		if goPathVar != "" {
			kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
		}
		_client.Client.Spec.Repo = path.Join(kubeflowRepo, "kubeflow")
	}
	if options[string(kftypes.VERSION)] != nil {
		kubeflowVersion := options[string(kftypes.VERSION)].(string)
		_client.Client.Spec.Version = kubeflowVersion
	}
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _client.Client)
		if specErr != nil {
			log.Errorf("couldn't unmarshal Ksonnet. Error: %v", specErr)
		}
	}
	return _client
}

// GetPlatform will return an implementation of kftypes.KfApp that matches the platform string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadPlatform which will try and dynamically load a .so
func GetPlatform(options map[string]interface{}) (kftypes.KfApp, error) {
	platform := options[string(kftypes.PLATFORM)].(string)
	switch platform {
	case string(kftypes.MINIKUBE):
		return minikube.GetKfApp(options), nil
	case string(kftypes.GCP):
		return gcp.GetKfApp(options), nil
	// STATIC
	case string(kftypes.DOCKER_FOR_DESKTOP):
		return dockerfordesktop.GetKfApp(options), nil
	// -STATIC //
	default:
		log.Infof("** loading %v.so for platform %v **", platform, platform)
		return kftypes.LoadPlatform(options)
	}
}

// NewKfApp is called from the Init subcommand and will create a directory based on
// the path/name argument given to the Init subcommand
func NewKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	//appName can be a path
	appName := options[string(kftypes.APPNAME)].(string)
	appDir := path.Dir(appName)
	if appDir == "" || appDir == "." {
		cwd, err := os.Getwd()
		if err != nil {
			return nil, fmt.Errorf("could not get current directory %v", err)
		}
		appDir = path.Join(cwd, appName)
	} else {
		if appDir == "~" {
			home, homeErr := homedir.Dir()
			if homeErr != nil {
				return nil, fmt.Errorf("could not get home directory %v", homeErr)
			}
			expanded, expandedErr := homedir.Expand(home)
			if expandedErr != nil {
				return nil, fmt.Errorf("could not expand home directory %v", homeErr)
			}
			appName = path.Base(appName)
			appDir = path.Join(expanded, appName)
		} else {
			appName = path.Base(appName)
			appDir = path.Join(appDir, appName)
		}
	}
	re := regexp.MustCompile(`[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$`)
	validName := re.FindString(appName)
	if strings.Compare(validName, appName) != 0 {
		return nil, fmt.Errorf(`invalid name %v must consist of lower case alphanumeric characters, '-' or '.',
and must start and end with an alphanumeric character`, appName)
	}
	options[string(kftypes.APPNAME)] = appName
	options[string(kftypes.APPDIR)] = appDir
	pApp := GetKfApp(options)
	return pApp, nil
}

// LoadKfApp is called from subcommands Apply, Delete, Generate and assumes the existence of an app.yaml
// file which was created by the Init subcommand. It sets options needed by these subcommands
func LoadKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("could not get current directory %v", err)
	}
	appName := filepath.Base(appDir)
	cfgfile := filepath.Join(appDir, kftypes.KfConfigFile)
	log.Infof("reading from %v", cfgfile)
	buf, bufErr := ioutil.ReadFile(cfgfile)
	if bufErr != nil {
		return nil, fmt.Errorf("couldn't read %v. Error: %v", cfgfile, bufErr)
	}
	var v interface{}
	err = yaml.Unmarshal(buf, &v)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal %v. Error: %v", cfgfile, err)
	}
	data := v.(map[string]interface{})
	metadata := data["metadata"].(map[string]interface{})
	spec := data["spec"].(map[string]interface{})
	platform := spec["platform"].(string)
	appName = metadata["name"].(string)
	appDir = spec["appdir"].(string)
	options[string(kftypes.PLATFORM)] = platform
	options[string(kftypes.APPNAME)] = appName
	options[string(kftypes.APPDIR)] = appDir
	options[string(kftypes.DATA)] = buf
	pApp := GetKfApp(options)
	return pApp, nil
}

// this type holds platform implementations of KfApp and ksonnet (also an implementation of KfApp)
// eg Children[kftypes.GCP], Children[kftypes.MINIKUBE], Children[kftypes.NONE] (ksonnet)
// The data attributes in cltypes.Client are used by different KfApp implementations
type coordinator struct {
	Children map[string]kftypes.KfApp
	Client   *cltypes.Client
}

func (kfapp *coordinator) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfapp.Client.Spec.Platform == "" || kfapp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfapp.Children[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Apply(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Apply failed for %v: %v", kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Children", kfapp.Client.Spec.Platform)
			}
		}
		none := kfapp.Children[kftypes.NONE]
		if none != nil {
			noneErr := none.Apply(kftypes.K8S, options)
			if noneErr != nil {
				return fmt.Errorf("coordinator Apply failed for %v: %v", string(kftypes.NONE), noneErr)
			}
		} else {
			return fmt.Errorf("%v not in Children", string(kftypes.NONE))
		}
	}
	return nil
}

func (kfapp *coordinator) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfapp.Client.Spec.Platform == "" || kfapp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfapp.Children[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Delete(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Delete failed for %v: %v", kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Children", kfapp.Client.Spec.Platform)
			}
		}
		none := kfapp.Children[kftypes.NONE]
		if none != nil {
			noneErr := none.Delete(kftypes.K8S, options)
			if noneErr != nil {
				return fmt.Errorf("coordinator Init failed for %v: %v", string(kftypes.NONE), noneErr)
			}
		} else {
			return fmt.Errorf("%v not in Children", string(kftypes.NONE))
		}
	}
	return nil
}

func (kfapp *coordinator) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfapp.Client.Spec.Platform == "" || kfapp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfapp.Children[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Generate(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Generate failed for %v: %v", kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Children", kfapp.Client.Spec.Platform)
			}
		}
		none := kfapp.Children[kftypes.NONE]
		if none != nil {
			noneGenerateErr := none.Generate(kftypes.K8S, options)
			if noneGenerateErr != nil {
				return fmt.Errorf("coordinator Generate failed for %v: %v", string(kftypes.NONE), noneGenerateErr)
			}
		} else {
			return fmt.Errorf("%v not in Children", string(kftypes.NONE))
		}
	}
	return nil
}

func (kfapp *coordinator) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		none := kfapp.Children[kftypes.NONE]
		if none != nil {
			noneErr := none.Init(kftypes.K8S, options)
			if noneErr != nil {
				return fmt.Errorf("coordinator Init failed for %v: %v", string(kftypes.NONE), noneErr)
			}
		} else {
			return fmt.Errorf("%v not in Children", string(kftypes.NONE))
		}
		if !(kfapp.Client.Spec.Platform == "" || kfapp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfapp.Children[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Init(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Init failed for %v: %v", kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Children", kfapp.Client.Spec.Platform)
			}
		}
	}
	return nil
}

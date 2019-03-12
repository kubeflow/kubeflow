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
	gogetter "github.com/hashicorp/go-getter"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
	"github.com/kubeflow/kubeflow/bootstrap/v2/pkg/client/kustomize"
	"github.com/mitchellh/go-homedir"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

// The common entry point used to retrieve an implementation of KfApp.
// In this case it returns a composite class (coordinator) which aggregates
// platform and ksonnet implementations in Children.
func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_client := &coordinator{
		Platforms:       make(map[string]kftypes.KfApp),
		PackageManagers: make(map[string]kftypes.KfApp),
		Client: &cltypes.Client{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Client",
				APIVersion: "client.apps.kubeflow.org/v1alpha1",
			},
			Spec: cltypes.ClientSpec{},
		},
	}
	// options[string(kftypes.DATA)] value is the contents of app.yaml
	// called from LoadKfApp. Subcommands: {Apply, Delete, Generate}
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _client.Client)
		if specErr != nil {
			log.Errorf("couldn't unmarshal app.yaml. Error: %v", specErr)
		}
	}
	// options[string(kftypes.DATA)] value is the contents of one of the config files in bootstrap/config/
	// called from NewKfApp Subcommands: {Init}
	if options[string(kftypes.CONFIG)] != nil {
		dat := options[string(kftypes.CONFIG)].([]byte)
		configErr := yaml.Unmarshal(dat, &_client.Client.Spec)
		if configErr != nil {
			log.Errorf("couldn't unmarshal config file. Error: %v", configErr)
		}
	}
	// CLI options, REPO will override the CONFIG file value
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
	// fetch the platform [gcp,minikube]
	platform := options[string(kftypes.PLATFORM)].(string)
	if platform != "" {
		_platform, _platformErr := GetPlatform(platform, options)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil
		}
		if _platform != nil {
			_client.Platforms[platform] = _platform
		}
		_client.Client.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	}
	//TODO we need a way to specific different types of package managers
	// most likely by specifying them in the app.yaml per package
	//
	_packagemanager, _packagemanagerErr := GetPackageManager("ksonnet", options)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", "ksonnet", _packagemanagerErr)

	}
	if _packagemanager != nil {
		_client.PackageManagers["ksonnet"] = _packagemanager
	}
	_packagemanager, _packagemanagerErr = GetPackageManager("kustomize", options)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", "kustomize", _packagemanagerErr)

	}
	if _packagemanager != nil {
		_client.PackageManagers["kustomize"] = _packagemanager
	}
	return _client
}

func downloadToCache(platform string, appDir string, version string, useBasicAuth bool) ([]byte, error) {
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		appdirErr := os.Mkdir(appDir, os.ModePerm)
		if appdirErr != nil {
			log.Fatalf("couldn't create directory %v Error %v", appDir, appdirErr)
		}
	}
	cacheDir := path.Join(appDir, kftypes.DefaultCacheDir)
	cacheDirErr := os.Mkdir(cacheDir, os.ModePerm)
	if cacheDirErr != nil {
		return nil, fmt.Errorf("couldn't create directory %v Error %v", cacheDir, cacheDirErr)
	}
	// Version can be
	// --version master
	// --version tag
	// --version pull/<ID>/head
	tarballUrl := kftypes.DefaultGitRepo + "/" + version + "?archive=tar.gz"
	tarballUrlErr := gogetter.GetAny(cacheDir, tarballUrl)
	if tarballUrlErr != nil {
		return nil, fmt.Errorf("couldn't download kubeflow repo %v Error %v", tarballUrl, tarballUrlErr)
	}
	files, filesErr := ioutil.ReadDir(cacheDir)
	if filesErr != nil {
		return nil, fmt.Errorf("couldn't read %v Error %v", cacheDir, filesErr)
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
				return nil, fmt.Errorf("couldn't create directory %v Error %v", versionPath, versionPathErr)
			}
		}
	}
	renameErr := os.Rename(extractedPath, newPath)
	if renameErr != nil {
		return nil, fmt.Errorf("couldn't rename %v to %v Error %v", extractedPath, newPath, renameErr)
	}
	//TODO see #2629
	configPath := filepath.Join(newPath, kftypes.DefaultConfigDir)
	if platform == "gcp" {
		if useBasicAuth {
			configPath = filepath.Join(configPath, kftypes.GcpBasicAuth)
		} else {
			configPath = filepath.Join(configPath, kftypes.GcpIapConfig)
		}
	} else {
		configPath = filepath.Join(configPath, kftypes.DefaultConfigFile)
	}
	return ioutil.ReadFile(configPath)
}

// GetPlatform will return an implementation of kftypes.KfApp that matches the platform string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadKfApp which will try and dynamically load a .so
func GetPlatform(platform string, options map[string]interface{}) (kftypes.KfApp, error) {
	switch platform {
	case string(kftypes.MINIKUBE):
		return minikube.GetKfApp(options), nil
	case string(kftypes.GCP):
		return gcp.GetKfApp(options), nil
	default:
		log.Infof("** loading %v.so for platform %v **", platform, platform)
		return kftypes.LoadKfApp(platform, options)
	}
}

// GetPackageManager will return an implementation of kftypes.KfApp that matches the packagemanager string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadKfApp which will try and dynamically load a .so
func GetPackageManager(packagemanager string, options map[string]interface{}) (kftypes.KfApp, error) {
	switch packagemanager {
	case "ksonnet":
		return ksonnet.GetKfApp(options), nil
	case "kustomize":
		return kustomize.GetKfApp(options), nil
	default:
		log.Infof("** loading %v.so for package manager %v **", packagemanager, packagemanager)
		return kftypes.LoadKfApp(packagemanager, options)
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
	platform := options[string(kftypes.PLATFORM)].(string)
	version := options[string(kftypes.VERSION)].(string)
	if strings.HasPrefix(version, "pull") {
		if !strings.HasSuffix(version, "head") {
			version = version + "/head"
			options[string(kftypes.VERSION)] = version
		}
	}
	useBasicAuth := options[string(kftypes.USE_BASIC_AUTH)].(bool)

	cache, cacheErr := downloadToCache(platform, appDir, version, useBasicAuth)
	if cacheErr != nil {
		log.Fatalf("could not download repo to cache Error %v", cacheErr)
	}
	options[string(kftypes.CONFIG)] = cache
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
	platform := ""
	if spec["platform"] != nil {
		platform = spec["platform"].(string)
	}
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
// eg Platforms[kftypes.GCP], Platforms[kftypes.MINIKUBE], PackageManagers["ksonnet"],
// PackageManagers["kustomize"]
// The data attributes in cltypes.Client are used by different KfApp implementations
type coordinator struct {
	Platforms       map[string]kftypes.KfApp
	PackageManagers map[string]kftypes.KfApp
	Client          *cltypes.Client
}

func (kfapp *coordinator) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Apply(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Apply failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Apply(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Apply failed for %v: %v", packageManagerName, packageManagerErr)
			}
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
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Delete(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Delete failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Delete failed for %v: %v", packageManagerName, packageManagerErr)
			}
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
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Generate(resources, options)
				if platformErr != nil {
					return fmt.Errorf("coordinator Generate failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Generate(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("coordinator Generate failed for %v: %v", packageManagerName, packageManagerErr)
			}
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Init(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Init failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Init(resources, options)
				if platformErr != nil {
					return fmt.Errorf("kfApp Generate failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
	}
	return nil
}

func (kfapp *coordinator) Show(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			show, ok := packageManager.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypes.K8S, options)
				if showErr != nil {
					return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, showErr)
				}
			}
		}
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			show, ok := platform.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(resources, options)
				if showErr != nil {
					return fmt.Errorf("kfApp Init failed for %v: %v",
						kfapp.Client.Spec.Platform, showErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
	}
	return nil
}

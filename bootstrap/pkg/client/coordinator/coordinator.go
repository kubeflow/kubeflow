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
func GetKfApp(client *cltypes.Client) kftypes.KfApp {
	_client := &coordinator{
		Platforms:       make(map[string]kftypes.KfApp),
		PackageManagers: nil,
		Client: client,
	}
	// fetch the platform [gcp,minikube]
	platform := _client.Client.Spec.Platform
	if platform != "" {
		_platform, _platformErr := getPlatform(_client.Client)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil
		}
		if _platform != nil {
			_client.Platforms[platform] = _platform
		}
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
func getPlatform(client *cltypes.Client) (kftypes.KfApp, error) {
	switch client.Spec.Platform {
	case string(kftypes.MINIKUBE):
		return minikube.GetKfApp(client), nil
	case string(kftypes.GCP):
		return gcp.GetKfApp(client), nil
	default:
		log.Infof("** loading %v.so for platform %v **", client.Spec.Platform, client.Spec.Platform)
		return kftypes.LoadKfApp(client)
	}
}

func getPackageManagers(client *cltypes.Client) *map[string]kftypes.KfApp {
	appyaml := filepath.Join(client.Spec.AppDir, kftypes.KfConfigFile)
	err := unmarshalAppYaml(appyaml, client)
	if err != nil {
		log.Fatalf("failed unmarshalling %v Error %v", appyaml, err)
	}
	var packagemanagers = make(map[string]kftypes.KfApp)
	_packagemanager, _packagemanagerErr := getPackageManager("ksonnet", client)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", "ksonnet", _packagemanagerErr)
	}
	if _packagemanager != nil {
		packagemanagers["ksonnet"] = _packagemanager
	}
	/*
	_packagemanager, _packagemanagerErr = getPackageManager("kustomize", client)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", "kustomize", _packagemanagerErr)

	}
	if _packagemanager != nil {
		packagemanagers["kustomize"] = _packagemanager
	}
	 */
	return &packagemanagers
}

// getPackageManager will return an implementation of kftypes.KfApp that matches the packagemanager string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadKfApp which will try and dynamically load a .so
func getPackageManager(packagemanager string, client *cltypes.Client) (kftypes.KfApp, error) {
	switch packagemanager {
	case "ksonnet":
		return ksonnet.GetKfApp(client), nil
	case "kustomize":
		return kustomize.GetKfApp(client), nil
	default:
		log.Infof("** loading %v.so for package manager %v **", packagemanager, packagemanager)
		return kftypes.LoadKfApp(client)
	}
}

// newKfApp is called from the Init subcommand and will create a directory based on
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
	platform := options[string(kftypes.PLATFORM)].(string)
	version := options[string(kftypes.VERSION)].(string)
	if strings.HasPrefix(version, "pull") {
		if !strings.HasSuffix(version, "head") {
			version = version + "/head"
			options[string(kftypes.VERSION)] = version
		}
	}
	if options[string(kftypes.REPO)] != nil {
		kubeflowRepo := options[string(kftypes.REPO)].(string)
		re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
		goPathVar := os.Getenv("GOPATH")
		if goPathVar != "" {
			kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
		}
		options[string(kftypes.REPO)] = path.Join(kubeflowRepo, "kubeflow")
	}
	useBasicAuth := options[string(kftypes.USE_BASIC_AUTH)].(bool)
	cache, cacheErr := downloadToCache(platform, appDir, version, useBasicAuth)
	if cacheErr != nil {
		log.Fatalf("could not download repo to cache Error %v", cacheErr)
	}
	client := &cltypes.Client{
		TypeMeta: metav1.TypeMeta{
			Kind:       "Client",
			APIVersion: "client.apps.kubeflow.org/v1alpha1",
		},
		Spec: cltypes.ClientSpec{
		},
	}
	specErr := yaml.Unmarshal(cache, &client.Spec)
	if specErr != nil {
		log.Errorf("couldn't unmarshal app.yaml. Error: %v", specErr)
	}
	client.Name = appName
	client.Spec.AppDir = appDir
	client.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	client.Namespace = options[string(kftypes.NAMESPACE)].(string)
	client.Spec.Version = options[string(kftypes.VERSION)].(string)
	client.Spec.Repo = options[string(kftypes.REPO)].(string)
	client.Spec.Project = options[string(kftypes.PROJECT)].(string)
	client.Spec.SkipInitProject = options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
	client.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	client.Spec.BasicAuthUsername = options[string(kftypes.BASIC_AUTH_USERNAME)].(string)
	client.Spec.BasicAuthPassword = options[string(kftypes.BASIC_AUTH_PASSWORD)].(string)
	pApp := GetKfApp(client)
	return pApp, nil
}

func unmarshalAppYaml(cfgfile string, spec *cltypes.ClientSpec) error {
	if _, err := os.Stat(cfgfile); err == nil {
		log.Infof("reading from %v", cfgfile)
		buf, bufErr := ioutil.ReadFile(cfgfile)
		if bufErr != nil {
			return fmt.Errorf("couldn't read %v. Error: %v", cfgfile, bufErr)
		}
		err := yaml.Unmarshal(buf, spec)
		if err != nil {
			return fmt.Errorf("could not unmarshal %v. Error: %v", cfgfile, err)
		}
	}
	return nil
}

// LoadKfApp is called from subcommands Apply, Delete, Generate and assumes the existence of an app.yaml
// file which was created by the Init subcommand. It sets options needed by these subcommands
func LoadKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("could not get current directory %v", err)
	}
	cfgfile := filepath.Join(appDir, kftypes.KfConfigFile)
	client := &cltypes.Client{
		TypeMeta: metav1.TypeMeta{
			Kind:       "Client",
			APIVersion: "client.apps.kubeflow.org/v1alpha1",
		},
		Spec: cltypes.ClientSpec{
		},
	}
	err = unmarshalAppYaml(cfgfile, &client.Spec)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal %v. Error: %v", cfgfile, err)
	}
	if options[string(kftypes.EMAIL)] != nil && options[string(kftypes.EMAIL)].(string) != "" {
		client.Spec.Email = options[string(kftypes.EMAIL)].(string)
	}
	if options[string(kftypes.IPNAME)] != nil && options[string(kftypes.IPNAME)].(string) != "" {
		client.Spec.IpName = options[string(kftypes.IPNAME)].(string)
	} else if client.Name != "" {
		client.Spec.IpName = client.Name + "-ip"
	}
	if options[string(kftypes.PROJECT)] != nil && options[string(kftypes.PROJECT)].(string) != "" {
		client.Spec.Project = options[string(kftypes.PROJECT)].(string)
	}
	if options[string(kftypes.HOSTNAME)] != nil && options[string(kftypes.HOSTNAME)].(string) != "" {
		client.Spec.Hostname = options[string(kftypes.HOSTNAME)].(string)
	} else if client.Name != "" && client.Spec.Project != "" {
		client.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog", client.Name, client.Spec.Project)
	}
	if options[string(kftypes.ZONE)] != nil && options[string(kftypes.ZONE)].(string) != "" {
		client.Spec.Zone = options[string(kftypes.HOSTNAME)].(string)
	} else  {
		client.Spec.Zone = kftypes.DefaultZone
	}
	if options[string(kftypes.USE_BASIC_AUTH)] != nil {
		client.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	}
	if options[string(kftypes.BASIC_AUTH_USERNAME)] != nil {
		client.Spec.BasicAuthUsername = options[string(kftypes.BASIC_AUTH_USERNAME)].(string)
	}
	if options[string(kftypes.BASIC_AUTH_PASSWORD)] != nil {
		client.Spec.BasicAuthPassword = options[string(kftypes.BASIC_AUTH_PASSWORD)].(string)
	}
	if options[string(kftypes.SKIP_INIT_GCP_PROJECT)] != nil {
		client.Spec.SkipInitProject = options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
	}
	if options[string(kftypes.MOUNT_LOCAL)] != nil {
		client.Spec.MountLocal = options[string(kftypes.MOUNT_LOCAL)].(bool)
	}
	pApp := GetKfApp(client)
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

func (kfapp *coordinator) Apply(resources kftypes.ResourceEnum) error {
	platform := func() error {
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Apply(resources)
				if platformErr != nil {
					return fmt.Errorf("coordinator Apply failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.Client)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Apply(kftypes.K8S)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Apply failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
		return nil
	}

	switch resources {
	case kftypes.ALL:
		if err := platform(); err != nil {
			return err
		}
		return k8s()
	case kftypes.PLATFORM:
		return platform()
	case kftypes.K8S:
		return k8s()
	}
	return nil
}

func (kfapp *coordinator) Delete(resources kftypes.ResourceEnum) error {
	platform := func() error {
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Delete(resources)
				if platformErr != nil {
					return fmt.Errorf("coordinator Delete failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.Client)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypes.K8S)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Delete failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
		return nil
	}

	switch resources {
		case kftypes.ALL:
			if err := platform(); err != nil {
				return err
			}
			return k8s()
		case kftypes.PLATFORM:
			return platform()
		case kftypes.K8S:
			return k8s()
	}
	return nil
}

func (kfapp *coordinator) Generate(resources kftypes.ResourceEnum) error {
	platform := func() error {
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Generate(resources)
				if platformErr != nil {
					return fmt.Errorf("coordinator Generate failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.Client)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Generate(kftypes.K8S)
			if packageManagerErr != nil {
				return fmt.Errorf("coordinator Generate failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
		return nil
	}

	switch resources {
	case kftypes.ALL:
		if err := platform(); err != nil {
			return err
		}
		return k8s()
	case kftypes.PLATFORM:
		return platform()
	case kftypes.K8S:
		return k8s()
	}
	return nil
}

func (kfapp *coordinator) Init(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if kfapp.Client.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Init(resources)
				if platformErr != nil {
					return fmt.Errorf("kfApp Generate failed for %v: %v",
						kfapp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfapp.Client.Spec.Platform)
			}
		}
		kfapp.PackageManagers = *getPackageManagers(kfapp.Client)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Init(kftypes.K8S)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Init failed for %v: %v", packageManagerName, packageManagerErr)
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
		kfapp.PackageManagers = *getPackageManagers(kfapp.Client)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			show, ok := packageManager.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypes.K8S, options)
				if showErr != nil {
					return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, showErr)
				}
			}
		}
	}
	return nil
}



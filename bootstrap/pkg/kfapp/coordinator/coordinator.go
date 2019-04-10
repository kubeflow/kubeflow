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
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/ksonnet"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/minikube"
	"github.com/kubeflow/kubeflow/bootstrap/v2/pkg/kfapp/kustomize"
	"github.com/mitchellh/go-homedir"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	valid "k8s.io/apimachinery/pkg/api/validation"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"strings"
)

// The common entry point used to retrieve an implementation of KfApp.
// In this case it returns a composite class (coordinator) which aggregates
// platform and ksonnet implementations in Children.
func GetKfApp(kfdef *kfdefs.KfDef) kftypes.KfApp {
	_coordinator := &coordinator{
		Platforms:       make(map[string]kftypes.KfApp),
		PackageManagers: nil,
		KfDef:           kfdef,
	}
	// fetch the platform [gcp,minikube]
	platform := _coordinator.KfDef.Spec.Platform
	if platform != "" {
		_platform, _platformErr := getPlatform(_coordinator.KfDef)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil
		}
		if _platform != nil {
			_coordinator.Platforms[platform] = _platform
		}
	}
	return _coordinator
}

// This function will download a version of kubeflow github repo where version can be
//   master
//	 tag
//	 pull/<ID>[/head]
// It returns one of the config files under bootstrap/config as a []byte buffer
func downloadToCache(platform string, appDir string, version string, useBasicAuth bool) ([]byte, error) {
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		appdirErr := os.Mkdir(appDir, os.ModePerm)
		if appdirErr != nil {
			log.Errorf("couldn't create directory %v Error %v", appDir, appdirErr)
		}
	}
	cacheDir := path.Join(appDir, kftypes.DefaultCacheDir)
	// idempotency
	if _, err := os.Stat(cacheDir); !os.IsNotExist(err) {
		os.RemoveAll(cacheDir)
	}
	cacheDirErr := os.Mkdir(cacheDir, os.ModePerm)
	if cacheDirErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't create directory %v Error %v", cacheDir, cacheDirErr),
		}
	}
	// Version can be
	// --version master
	// --version tag
	// --version pull/<ID>/head
	tarballUrl := kftypes.DefaultGitRepo + "/" + version + "?archive=tar.gz"
	tarballUrlErr := gogetter.GetAny(cacheDir, tarballUrl)
	if tarballUrlErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't download kubeflow repo %v Error %v", tarballUrl, tarballUrlErr),
		}
	}
	files, filesErr := ioutil.ReadDir(cacheDir)
	if filesErr != nil {
		return nil, &kfapis.KfError{
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
				return nil, &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("couldn't create directory %v Error %v",
						versionPath, versionPathErr),
				}
			}
		}
	}
	renameErr := os.Rename(extractedPath, newPath)
	if renameErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't rename %v to %v Error %v", extractedPath, newPath, renameErr),
		}
	}
	//TODO see #2629
	configPath := filepath.Join(newPath, kftypes.DefaultConfigDir)
	if platform == kftypes.GCP {
		if useBasicAuth {
			configPath = filepath.Join(configPath, kftypes.GcpBasicAuth)
		} else {
			configPath = filepath.Join(configPath, kftypes.GcpIapConfig)
		}
	} else {
		configPath = filepath.Join(configPath, kftypes.DefaultConfigFile)
	}
	if data, err := ioutil.ReadFile(configPath); err == nil {
		return data, nil
	} else {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}
}

// GetPlatform will return an implementation of kftypes.KfApp that matches the platform string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadKfApp which will try and dynamically load a .so
func getPlatform(kfdef *kfdefs.KfDef) (kftypes.KfApp, error) {
	switch kfdef.Spec.Platform {
	case string(kftypes.MINIKUBE):
		return minikube.GetKfApp(kfdef), nil
	case string(kftypes.GCP):
		return gcp.GetKfApp(kfdef)
	default:
		log.Infof("** loading %v.so for platform %v **", kfdef.Spec.Platform, kfdef.Spec.Platform)
		return kftypes.LoadKfApp(kfdef)
	}
}

func getPackageManagers(kfdef *kfdefs.KfDef) *map[string]kftypes.KfApp {
	appyaml := filepath.Join(kfdef.Spec.AppDir, kftypes.KfConfigFile)
	err := unmarshalAppYaml(appyaml, kfdef)
	if err != nil {
		log.Fatalf("failed unmarshalling %v Error %v", appyaml, err)
	}
	var packagemanagers = make(map[string]kftypes.KfApp)
	_packagemanager, _packagemanagerErr := getPackageManager("ksonnet", kfdef)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", "ksonnet", _packagemanagerErr)
	}
	if _packagemanager != nil {
		packagemanagers["ksonnet"] = _packagemanager
	}
	//TODO provide a global flag that adds kustomize so either kustomize or ksonnet can be selected
	/*
		_packagemanager, _packagemanagerErr = getPackageManager("kustomize", kfdef)
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
func getPackageManager(packagemanager string, kfdef *kfdefs.KfDef) (kftypes.KfApp, error) {
	switch packagemanager {
	case "ksonnet":
		return ksonnet.GetKfApp(kfdef), nil
	case "kustomize":
		return kustomize.GetKfApp(kfdef), nil
	default:
		log.Infof("** loading %v.so for package manager %v **", packagemanager, packagemanager)
		return kftypes.LoadKfApp(kfdef)
	}
}

// Helper function to filter out spartakus.
func filterSpartakus(components []string) []string {
	ret := []string{}
	for _, comp := range components {
		if comp != "spartakus" {
			ret = append(ret, comp)
		}
	}
	return ret
}

// Helper function to print out warning message if using usage reporting.
func usageReportWarn(components []string) {
	msg := "\n" +
		"****************************************************************\n" +
		"Notice anonymous usage reporting enabled using spartakus\n" +
		"To disable it\n" +
		"If you have already deployed it run the following commands:\n" +
		"  cd $(pwd)\n" +
		"  ks delete default -c spartakus\n" +
		"  kubectl -n ${K8S_NAMESPACE} delete deploy -l app=spartakus\n" +
		"\n" +
		"Then run the following command to remove it from your ksonnet app:\n" +
		"  ks component rm spartakus\n" +
		"\n" +
		"For more info: https://www.kubeflow.org/docs/guides/usage-reporting/\n" +
		"****************************************************************\n" +
		"\n"
	for _, comp := range components {
		if comp == "spartakus" {
			log.Warnf(msg)
			return
		}
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
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("could not get current directory %v", err),
			}
		}
		appDir = path.Join(cwd, appName)
	} else {
		if appDir == "~" {
			home, homeErr := homedir.Dir()
			if homeErr != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.INVALID_ARGUMENT),
					Message: fmt.Sprintf("could not get home directory %v", homeErr),
				}
			}
			expanded, expandedErr := homedir.Expand(home)
			if expandedErr != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.INVALID_ARGUMENT),
					Message: fmt.Sprintf("could not expand home directory %v", homeErr),
				}
			}
			appName = path.Base(appName)
			appDir = path.Join(expanded, appName)
		} else {
			appName = path.Base(appName)
			appDir = path.Join(appDir, appName)
		}
	}
	errs := valid.NameIsDNSLabel(appName, false)
	if errs != nil && len(errs) > 0 {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf(`invalid name due to %v`, strings.Join(errs, ", ")),
		}
	}
	platform := options[string(kftypes.PLATFORM)].(string)
	version := options[string(kftypes.VERSION)].(string)
	if strings.HasPrefix(version, "pull") {
		if !strings.HasSuffix(version, "head") {
			version = version + "/head"
			options[string(kftypes.VERSION)] = version
		}
	}
	useBasicAuth := options[string(kftypes.USE_BASIC_AUTH)].(bool)
	configFileBuffer, configFileErr := downloadToCache(platform, appDir, version, useBasicAuth)
	if configFileErr != nil {
		log.Fatalf("could not download repo to cache Error %v", configFileErr)
	}
	kfDef := &kfdefs.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		Spec: kfdefs.KfDefSpec{},
	}
	specErr := yaml.Unmarshal(configFileBuffer, &kfDef.Spec)
	if specErr != nil {
		log.Errorf("couldn't unmarshal app.yaml. Error: %v", specErr)
	}
	disableUsageReport := options[string(kftypes.DISABLE_USAGE_REPORT)].(bool)
	if disableUsageReport {
		kfDef.Spec.Components = filterSpartakus(kfDef.Spec.Components)
		delete(kfDef.Spec.ComponentParams, "spartakus")
	}

	kfDef.Name = appName
	kfDef.Spec.AppDir = appDir
	kfDef.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	kfDef.Namespace = options[string(kftypes.NAMESPACE)].(string)
	kfDef.Spec.Version = options[string(kftypes.VERSION)].(string)
	kfDef.Spec.Repo = options[string(kftypes.REPO)].(string)
	kfDef.Spec.Project = options[string(kftypes.PROJECT)].(string)
	kfDef.Spec.SkipInitProject = options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
	kfDef.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	kfDef.Spec.UseIstio = options[string(kftypes.USE_ISTIO)].(bool)
	pApp := GetKfApp(kfDef)
	return pApp, nil
}

// unmarshalAppYaml is a local function to marshal the contents of app.yaml into
// the KfDef type
func unmarshalAppYaml(cfgfile string, kfdef *kfdefs.KfDef) error {
	if _, err := os.Stat(cfgfile); err == nil {
		log.Infof("reading from %v", cfgfile)
		buf, bufErr := ioutil.ReadFile(cfgfile)
		if bufErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't read %v. Error: %v", cfgfile, bufErr),
			}
		}
		err := yaml.Unmarshal(buf, kfdef)
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("could not unmarshal %v. Error: %v", cfgfile, err),
			}
		}
	}
	return nil
}

// LoadKfApp is called from subcommands Apply, Delete, Generate and assumes the existence of an app.yaml
// file which was created by the Init subcommand. It sets options needed by these subcommands
func LoadKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}
	cfgfile := filepath.Join(appDir, kftypes.KfConfigFile)
	kfdef := &kfdefs.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		Spec: kfdefs.KfDefSpec{},
	}
	err = unmarshalAppYaml(cfgfile, kfdef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal %v. Error: %v", cfgfile, err),
		}
	}
	if options[string(kftypes.EMAIL)] != nil && options[string(kftypes.EMAIL)].(string) != "" {
		kfdef.Spec.Email = options[string(kftypes.EMAIL)].(string)
	}
	if options[string(kftypes.IPNAME)] != nil && options[string(kftypes.IPNAME)].(string) != "" {
		kfdef.Spec.IpName = options[string(kftypes.IPNAME)].(string)
	} else if kfdef.Spec.Platform == kftypes.GCP && kfdef.Name != "" {
		kfdef.Spec.IpName = kfdef.Name + "-ip"
	}
	if options[string(kftypes.PROJECT)] != nil && options[string(kftypes.PROJECT)].(string) != "" {
		kfdef.Spec.Project = options[string(kftypes.PROJECT)].(string)
	}
	if options[string(kftypes.HOSTNAME)] != nil && options[string(kftypes.HOSTNAME)].(string) != "" {
		kfdef.Spec.Hostname = options[string(kftypes.HOSTNAME)].(string)
	} else if kfdef.Name != "" && kfdef.Spec.Project != "" && kfdef.Spec.Hostname == "" {
		kfdef.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog", kfdef.Name, kfdef.Spec.Project)
	}
	if options[string(kftypes.ZONE)] != nil && options[string(kftypes.ZONE)].(string) != "" {
		kfdef.Spec.Zone = options[string(kftypes.ZONE)].(string)
	} else if kfdef.Spec.Platform == kftypes.GCP && kfdef.Spec.Zone == "" {
		kfdef.Spec.Zone = kftypes.DefaultZone
	}
	if options[string(kftypes.USE_BASIC_AUTH)] != nil {
		kfdef.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	}
	if options[string(kftypes.SKIP_INIT_GCP_PROJECT)] != nil {
		kfdef.Spec.SkipInitProject = options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
	}
	if options[string(kftypes.MOUNT_LOCAL)] != nil {
		kfdef.Spec.MountLocal = options[string(kftypes.MOUNT_LOCAL)].(bool)
	}
	if options[string(kftypes.DELETE_STORAGE)] != nil && kfdef.Spec.Platform == kftypes.GCP {
		kfdef.Spec.DeleteStorage = options[string(kftypes.DELETE_STORAGE)].(bool)
	}
	pApp := GetKfApp(kfdef)
	return pApp, nil
}

// this type holds platform implementations of KfApp and ksonnet (also an implementation of KfApp)
// eg Platforms[kftypes.GCP], Platforms[kftypes.MINIKUBE], PackageManagers["ksonnet"],
// PackageManagers["kustomize"]
// The data attributes in kfdefs.KfDef are used by different KfApp implementations
type coordinator struct {
	Platforms       map[string]kftypes.KfApp
	PackageManagers map[string]kftypes.KfApp
	KfDef           *kfdefs.KfDef
}

func (kfapp *coordinator) Apply(resources kftypes.ResourceEnum) error {
	platform := func() error {
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			if platform != nil {
				platformErr := platform.Apply(resources)
				if platformErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("coordinator Apply failed for %v: %v",
							kfapp.KfDef.Spec.Platform, platformErr),
					}
				}
			} else {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v not in Platforms",
						kfapp.KfDef.Spec.Platform),
				}
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.KfDef)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Apply(kftypes.K8S)
			if packageManagerErr != nil {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("kfApp Apply failed for %v: %v",
						packageManagerName, packageManagerErr),
				}
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
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			if platform != nil {
				platformErr := platform.Delete(resources)
				if platformErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("coordinator Delete failed for %v: %v",
							kfapp.KfDef.Spec.Platform, platformErr),
					}
				}
			} else {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v not in Platforms",
						kfapp.KfDef.Spec.Platform),
				}
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.KfDef)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypes.K8S)
			if packageManagerErr != nil {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("kfApp Delete failed for %v: %v",
						packageManagerName, packageManagerErr),
				}
			}
		}
		return nil
	}

	switch resources {
	case kftypes.ALL:
		// if we're deleting ALL, any problems with deleting k8s will abort and not delete the platform
		if err := k8s(); err != nil {
			return err
		}
		if err := platform(); err != nil {
			return err
		}
	case kftypes.PLATFORM:
		// deleting the PLATFORM means deleting the cluster. We remove k8s first in order free up any cloud vendor
		// resources. Deleting k8 resources is a best effort and partial delete or failure should not
		// prevent PLATFORM (cluster) deletion
		_ = k8s()
		if err := platform(); err != nil {
			return err
		}
	case kftypes.K8S:
		if err := k8s(); err != nil {
			return err
		}
	}
	return nil
}

func (kfapp *coordinator) Generate(resources kftypes.ResourceEnum) error {
	platform := func() error {
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			if platform != nil {
				platformErr := platform.Generate(resources)
				if platformErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("coordinator Generate failed for %v: %v",
							kfapp.KfDef.Spec.Platform, platformErr),
					}
				}
			} else {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v not in Platforms",
						kfapp.KfDef.Spec.Platform),
				}
			}
		}
		return nil
	}

	k8s := func() error {
		kfapp.PackageManagers = *getPackageManagers(kfapp.KfDef)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Generate(kftypes.K8S)
			if packageManagerErr != nil {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("kfApp Generate failed for %v: %v",
						packageManagerName, packageManagerErr),
				}
			}
		}
		return nil
	}

	// Print out warning message if using usage reporting component.
	usageReportWarn(kfapp.KfDef.Spec.Components)

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
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			if platform != nil {
				platformErr := platform.Init(resources)
				if platformErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("coordinator Init failed for %v: %v",
							kfapp.KfDef.Spec.Platform, platformErr),
					}
				}
			} else {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v not in Platforms",
						kfapp.KfDef.Spec.Platform),
				}
			}
		}
		kfapp.PackageManagers = *getPackageManagers(kfapp.KfDef)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Init(kftypes.K8S)
			if packageManagerErr != nil {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("kfApp Init failed for %v: %v",
						packageManagerName, packageManagerErr),
				}
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
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			show, ok := platform.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(resources, options)
				if showErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("coordinator Show failed for %v: %v",
							kfapp.KfDef.Spec.Platform, showErr),
					}
				}
			} else {
				return &kfapis.KfError{
					Code: int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v not in Platforms",
						kfapp.KfDef.Spec.Platform),
				}
			}
		}
		kfapp.PackageManagers = *getPackageManagers(kfapp.KfDef)
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			show, ok := packageManager.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypes.K8S, options)
				if showErr != nil {
					return &kfapis.KfError{
						Code: int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("kfApp Show failed for %v: %v",
							packageManagerName, showErr),
					}
				}
			}
		}
	}
	return nil
}

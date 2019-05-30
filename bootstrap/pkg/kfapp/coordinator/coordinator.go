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
	bootstrap "github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app"
	"github.com/kubeflow/kubeflow/bootstrap/config"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
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
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	valid "k8s.io/apimachinery/pkg/api/validation"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"strconv"
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

func getConfigFromCache(pathDir string, kfDef *kfdefs.KfDef) ([]byte, error) {

	configPath := filepath.Join(pathDir, kftypes.DefaultConfigDir)
	overlays := []config.NameValue{
		{
			Name:  "overlay",
			Value: strings.Split(kfDef.Spec.PackageManager, "@")[0],
		},
	}
	if kfDef.Spec.UseBasicAuth {
		overlays = append(overlays, config.NameValue{Name: "overlay", Value: "basic_auth"})
	} else if kfDef.Spec.Platform != "" {
		overlays = append(overlays, config.NameValue{Name: "overlay", Value: kfDef.Spec.Platform})
	}
	compPath := strings.Split(kftypes.DefaultConfigDir, "/")[1]
	resMap, resMapErr := kustomize.GenerateKustomizationFile(kfDef,
		path.Dir(configPath), compPath, overlays)
	if resMapErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to %v Error %v", configPath, resMapErr),
		}
	}
	writeErr := kustomize.WriteKustomizationFile(kfDef.Name, configPath, resMap)
	if writeErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to %v Error %v", kfDef.Name, writeErr),
		}
	}
	data, dataErr := resMap.EncodeAsYaml()
	if dataErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("can not encode as yaml Error %v", dataErr),
		}
	}
	return data, nil
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
		return kftypes.LoadKfApp(kfdef.Spec.Platform, kfdef)
	}
}

func getPackageManagers(kfdef *kfdefs.KfDef) *map[string]kftypes.KfApp {
	appyaml := filepath.Join(kfdef.Spec.AppDir, kftypes.KfConfigFile)
	err := unmarshalAppYaml(appyaml, kfdef)
	if err != nil {
		log.Fatalf("failed unmarshalling %v Error %v", appyaml, err)
	}
	var packagemanagers = make(map[string]kftypes.KfApp)
	_packagemanager, _packagemanagerErr := getPackageManager(kfdef.Spec.PackageManager, kfdef)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", kfdef.Spec.PackageManager, _packagemanagerErr)
	}
	if _packagemanager != nil {
		packagemanagers[kfdef.Spec.PackageManager] = _packagemanager
	}
	return &packagemanagers
}

// getPackageManager will return an implementation of kftypes.KfApp that matches the packagemanager string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypes.LoadKfApp which will try and dynamically load a .so
func getPackageManager(packagemanager string, kfdef *kfdefs.KfDef) (kftypes.KfApp, error) {
	packagemanager = strings.Split(packagemanager, "@")[0]
	switch packagemanager {
	case kftypes.KSONNET:
		return ksonnet.GetKfApp(kfdef), nil
	case kftypes.KUSTOMIZE:
		return kustomize.GetKfApp(kfdef), nil
	default:
		log.Infof("** loading %v.so for package manager %v **", packagemanager, packagemanager)
		return kftypes.LoadKfApp(packagemanager, kfdef)
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
			log.Infof(msg)
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
	packageManager := options[string(kftypes.PACKAGE_MANAGER)].(string)
	version := options[string(kftypes.VERSION)].(string)
	useBasicAuth := options[string(kftypes.USE_BASIC_AUTH)].(bool)
	useIstio := options[string(kftypes.USE_ISTIO)].(bool)
	namespace := options[string(kftypes.NAMESPACE)].(string)
	project := options[string(kftypes.PROJECT)].(string)
	cacheDir := ""
	if options[string(kftypes.REPO)].(string) != "" {
		cacheDir = options[string(kftypes.REPO)].(string)
		if _, err := os.Stat(cacheDir); err != nil {
			log.Fatalf("repo %v does not exist Error %v", cacheDir, err)
		}
	} else {
		var cacheDirErr error
		cacheDir, cacheDirErr = kftypes.DownloadToCache(appDir, kftypes.KubeflowRepo, version)
		if cacheDirErr != nil || cacheDir == "" {
			log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
		}
	}
	kfDef := &kfdefs.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      appName,
			Namespace: namespace,
		},
		Spec: kfdefs.KfDefSpec{
			ComponentConfig: config.ComponentConfig{
				Platform: platform,
			},
			Project:        project,
			PackageManager: packageManager,
			UseBasicAuth:   useBasicAuth,
			UseIstio:       useIstio,
		},
	}
	configFileBuffer, configFileErr := getConfigFromCache(cacheDir, kfDef)
	if configFileErr != nil {
		log.Fatalf("could not get config file Error %v", configFileErr)
	}
	specErr := yaml.Unmarshal(configFileBuffer, kfDef)
	if specErr != nil {
		log.Errorf("couldn't unmarshal app.yaml. Error: %v", specErr)
	}
	disableUsageReport := options[string(kftypes.DISABLE_USAGE_REPORT)].(bool)
	if disableUsageReport {
		kfDef.Spec.Components = filterSpartakus(kfDef.Spec.Components)
		delete(kfDef.Spec.ComponentParams, "spartakus")
	}

	injectIstio := strconv.FormatBool(options[string(kftypes.USE_ISTIO)].(bool))
	for name, params := range kfDef.Spec.ComponentParams {
		for idx, param := range params {
			if param.Name == "injectIstio" {
				kfDef.Spec.ComponentParams[name][idx].Value = injectIstio
			}
		}
	}

	kfDef.Name = appName
	kfDef.Spec.AppDir = appDir
	kfDef.Spec.Platform = platform
	kfDef.Namespace = namespace
	kfDef.Spec.Version = version
	kfDef.Spec.Repo = path.Join(cacheDir, kftypes.KubeflowRepo)
	kfDef.Spec.Project = options[string(kftypes.PROJECT)].(string)
	kfDef.Spec.SkipInitProject = options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
	kfDef.Spec.UseBasicAuth = useBasicAuth
	kfDef.Spec.UseIstio = useIstio
	kfDef.Spec.PackageManager = packageManager
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

	if err := kfapp.applyCommon(); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("failed to apply common resources: %v", err),
		}
	}

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

func (kfapp *coordinator) applyCommon() error {

	// Get a K8s client
	config := kftypes.GetConfig()
	kubeclient := kftypes.GetClientset(config)

	// Create KFApp's namespace
	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: kfapp.KfDef.Namespace,
		},
	}
	log.Infof("Creating namespace: %v", ns.Name)

	_, err := kubeclient.CoreV1().Namespaces().Create(ns)
	if err != nil && !errors.IsAlreadyExists(err) {
		log.Errorf("Error creating namespace %v", ns.Name)
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}

	// Apply Istio if use_istio option is set
	if kfapp.KfDef.Spec.UseIstio {
		log.Infof("Installing istio...")
		nv := configtypes.NameValue{Name: "namespace", Value: kfapp.KfDef.Namespace}
		parentDir := path.Dir(kfapp.KfDef.Spec.Repo)
		err := bootstrap.CreateResourceFromFile(kftypes.GetConfig(), path.Join(parentDir, "dependencies/istio/install/crds.yaml"))

		if err != nil {
			log.Errorf("Failed to create istio CRD: %v", err)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: err.Error(),
			}
		}
		err = bootstrap.CreateResourceFromFile(config, path.Join(parentDir, "dependencies/istio/install/istio-noauth.yaml"))
		if err != nil {
			log.Errorf("Failed to create istio manifest: %v", err)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: err.Error(),
			}
		}
		err = bootstrap.CreateResourceFromFile(config, path.Join(parentDir, "dependencies/istio/kf-istio-resources.yaml"), nv)
		if err != nil {
			log.Errorf("Failed to create kubeflow istio resource: %v", err)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: err.Error(),
			}
		}
		log.Infof("Done installing istio.")
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
	platform := func() error {
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
		return nil
	}

	k8s := func() error {
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
					Message: fmt.Sprintf("coordinator Show failed for %v: Not support 'Show'",
						kfapp.KfDef.Spec.Platform),
				}
			}
		} else {
			return &kfapis.KfError{
				Code: int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("%v not in Platforms",
					kfapp.KfDef.Spec.Platform),
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

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
	"io/ioutil"
	netUrl "net/url"
	"path"
	"path/filepath"
	"strings"

	"os"

	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/aws"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/existing_arrikto"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/kustomize"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/minikube"
	log "github.com/sirupsen/logrus"
)

// Builder defines the methods used to create KfApps.
// Primary purpose is to allow injecting a fake for use in testing.
type Builder interface {
	LoadKfAppCfgFile(cfgFile string) (kftypesv3.KfApp, error)
}

type DefaultBuilder struct {
}

func (b *DefaultBuilder) LoadKfAppCfgFile(cfgFile string) (kftypesv3.KfApp, error) {
	return LoadKfAppCfgFile(cfgFile)
}

func getConfigFromCache(pathDir string, kfDef *kfdefsv3.KfDef) ([]byte, error) {
	configPath := filepath.Join(pathDir, kftypesv3.DefaultConfigDir)
	overlays := []string{}

	overlays = append(overlays, strings.Split(kfDef.Spec.PackageManager, "@")[0])

	if kfDef.Spec.UseIstio {
		overlays = append(overlays, "istio")
	}
	if kfDef.Spec.UseBasicAuth {
		overlays = append(overlays, "basic_auth")
	} else if kfDef.Spec.Platform != "" {
		overlays = append(overlays, kfDef.Spec.Platform)
	}
	overlays = append(overlays, "application")
	compPath := strings.Split(kftypesv3.DefaultConfigDir, "/")[1]
	params := []config.NameValue{}
	genErr := kustomize.GenerateKustomizationFile(kfDef,
		path.Dir(configPath), compPath, overlays, params)

	if genErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to kustomization.yaml %v Error %v", configPath, genErr),
		}
	}
	resMap, resMapErr := kustomize.EvaluateKustomizeManifest(path.Join(path.Dir(configPath), compPath))
	if resMapErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to %v Error %v", configPath, resMapErr),
		}
	}
	// TODO: Do we need to write to file here?
	writeErr := kustomize.WriteKustomizationFile(kfDef.Name, configPath, resMap)
	if writeErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to %v Error %v", kfDef.Name, writeErr),
		}
	}
	data, dataErr := resMap.AsYaml()
	if dataErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("can not encode as yaml Error %v", dataErr),
		}
	}
	return data, nil
}

// GetPlatform will return an implementation of kftypesv3.GetPlatform that matches the platform string
// It looks for statically compiled-in implementations, otherwise throws unrecognized error
func getPlatform(kfdef *kfdefsv3.KfDef) (kftypesv3.Platform, error) {
	switch kfdef.Spec.Platform {
	case string(kftypesv3.MINIKUBE):
		return minikube.Getplatform(kfdef), nil
	case string(kftypesv3.GCP):
		return gcp.GetPlatform(kfdef)
	case string(kftypesv3.EXISTING_ARRIKTO):
		return existing_arrikto.GetPlatform(kfdef)
	case string(kftypesv3.AWS):
		return aws.GetPlatform(kfdef)
	default:
		// TODO(https://github.com/kubeflow/kubeflow/issues/3520) Fix dynamic loading
		// of platform plugins.
		log.Infof("** Unrecognized platform %v **", kfdef.Spec.Platform)
		return nil, fmt.Errorf("Unrecognized platform %v", kfdef.Spec.Platform)
	}
}

func (coord *coordinator) getPackageManagers(kfdef *kfdefsv3.KfDef) *map[string]kftypesv3.KfApp {
	var packagemanagers = make(map[string]kftypesv3.KfApp)
	_packagemanager, _packagemanagerErr := getPackageManager(kfdef)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", kfdef.Spec.PackageManager, _packagemanagerErr)
	}
	if _packagemanager != nil {
		packagemanagers[kfdef.Spec.PackageManager] = _packagemanager
	}
	return &packagemanagers
}

// getPackageManager will return an implementation of kftypesv3.KfApp that matches the packagemanager string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypesv3.LoadKfApp which will try and dynamically load a .so
//
func getPackageManager(kfdef *kfdefsv3.KfDef) (kftypesv3.KfApp, error) {
	switch kfdef.Spec.PackageManager {
	case kftypesv3.KUSTOMIZE:
		return kustomize.GetKfApp(kfdef), nil
	case kftypesv3.KSONNET:
		return nil, fmt.Errorf("Support for ksonnet is no longer implemented")
	default:
		log.Infof("** loading %v.so for package manager %v **", kfdef.Spec.PackageManager, kfdef.Spec.PackageManager)
		return kftypesv3.LoadKfApp(kfdef.Spec.PackageManager, kfdef)
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
		"  kubectl -n ${K8S_NAMESPACE} delete deploy -l app=spartakus\n" +
		"\n" +
		"For more info: https://www.kubeflow.org/docs/other-guides/usage-reporting/\n" +
		"****************************************************************\n" +
		"\n"
	for _, comp := range components {
		if comp == "spartakus" {
			log.Infof(msg)
			return
		}
	}
}

// repoVersionToRepoStruct converts the name of a repo and the old style version
// into a new go-getter style syntax and a Repo spec
//
//   master
//	 tag
//	 pull/<ID>[/head]
//
func repoVersionToUri(repo string, version string) string {
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

	return tarballUrl
}

// isCwdEmpty - quick check to determine if the working directory is empty
// if the current working directory
func isCwdEmpty() string {
	cwd, _ := os.Getwd()
	files, _ := ioutil.ReadDir(cwd)
	if len(files) > 1 {
		return ""
	}
	return cwd
}

// NewLoadKfAppFromURI takes in a config file and constructs the KfApp
// used by the build and apply semantics for kfctl
func NewLoadKfAppFromURI(configFile string) (kftypesv3.KfApp, error) {
	// TODO(jlewi): Can we merge NewLoadKfAppFromURI and LoadKFAppCfgFile
	kfApp, err := LoadKfAppCfgFile(configFile)
	if err != nil || kfApp == nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
		}
	}

	return kfApp, nil
}

// BuildKfAppFromURI used by both build and apply for the new code path
func BuildKfAppFromURI(configFile string) (kftypesv3.KfApp, error) {
	// Construct KfApp from config file
	kfApp, err := NewLoadKfAppFromURI(configFile)
	if err != nil || kfApp == nil {
		return nil, err
	}

	// KfApp Init
	err = kfApp.Init(kftypesv3.ALL)
	if err != nil {
		return nil, fmt.Errorf("KfApp initiliazation failed: %v", err)
	}

	// kfApp Generate
	generateErr := kfApp.Generate(kftypesv3.ALL)
	if generateErr != nil {
		return nil, fmt.Errorf("couldn't generate KfApp: %v", generateErr)
	}
	return kfApp, nil
}

// CreateKfAppCfgFile will create the application directory and persist
// the KfDef to it as app.yaml.
// Returns an error if the app.yaml file already exists
// Returns path to the app.yaml file.
func CreateKfAppCfgFile(d *kfdefsv3.KfDef) (string, error) {
	if _, err := os.Stat(d.Spec.AppDir); os.IsNotExist(err) {
		log.Infof("Creating directory %v", d.Spec.AppDir)
		appdirErr := os.MkdirAll(d.Spec.AppDir, os.ModePerm)
		if appdirErr != nil {
			log.Errorf("couldn't create directory %v Error %v", d.Spec.AppDir, appdirErr)
			return "", appdirErr
		}
	} else {
		log.Infof("App directory %v already exists", d.Spec.AppDir)
	}

	// Rewrite app.yaml
	cfgFilePath := filepath.Join(d.Spec.AppDir, kftypesv3.KfConfigFile)

	if _, err := os.Stat(cfgFilePath); err == nil {
		log.Errorf("%v already exists", cfgFilePath)
		return cfgFilePath, fmt.Errorf("%v already exists", cfgFilePath)
	}
	log.Infof("Writing KfDef to %v", cfgFilePath)
	cfgFilePathErr := d.WriteToFile(cfgFilePath)
	return cfgFilePath, cfgFilePathErr
}

// LoadKfAppCfgFile constructs a KfApp by loading the provided app.yaml file.
func LoadKfAppCfgFile(cfgfile string) (kftypesv3.KfApp, error) {
	url, err := netUrl.ParseRequestURI(cfgfile)
	isRemoteFile := false
	cwd := ""
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error parsing config file path: %v", err),
		}
	} else {
		if url.Scheme != "" {
			isRemoteFile = true
		}
	}

	// If the config file is a remote URI, check to see if the current directory
	// is empty because we will be generating the KfApp there.
	appFile := cfgfile
	if isRemoteFile {
		cwd = isCwdEmpty()
		if cwd == "" {
			wd, _ := os.Getwd()
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("current directory %v not empty, please switch directories", wd),
			}
		}

		kfDef, err := kfdefsv3.LoadKFDefFromURI(cfgfile)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
			}
		}

		appFile, err = CreateKfAppCfgFile(kfDef)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
			}
		}
	}

	// Set default TypeMeta information. This will get overwritten by explicit values if set in the cfg file.
	kfdef, err := kfdefsv3.LoadKFDefFromURI(appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", cfgfile, err),
		}
	}

	// Since we know we have a local file we can set a default name if none is set based on the local directory
	if kfdef.Name == "" {
		absAppPath, err := filepath.Abs(appFile)

		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("KfDef.Name isn't set and there was a problem inferring the name based on the path %v; error: %v\nPlease set the name explicitly in the KFDef spec.", appFile, err),
			}
		}

		appDir := filepath.Dir(absAppPath)

		kfdef.Name = filepath.Base(appDir)
		log.Infof("No name specified in KfDef.Metadata.Name; defaulting to %v based on location of config file: %v.", kfdef.Name, appFile)
	}

	c := &coordinator{
		Platforms:       make(map[string]kftypesv3.Platform),
		PackageManagers: make(map[string]kftypesv3.KfApp),
		KfDef:           kfdef,
	}

	// fetch the platform [gcp,minikube]
	platform := c.KfDef.Spec.Platform
	if platform != "" {
		_platform, _platformErr := getPlatform(c.KfDef)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil, _platformErr
		}
		if _platform != nil {
			c.Platforms[platform] = _platform
		}
	}

	packageManager := c.KfDef.Spec.PackageManager

	if packageManager != "" {
		pkg, pkgErr := getPackageManager(c.KfDef)
		if pkgErr != nil {
			log.Fatalf("could not get package manager %v Error %v **", packageManager, pkgErr)
			return nil, pkgErr
		}
		if pkg != nil {
			c.PackageManagers[packageManager] = pkg
		}
	}

	// If the config file is downloaded remotely, use the current working directory to create the KfApp.
	// Otherwise use the directory where the config file is stored.
	if isRemoteFile {
		cwd, err = os.Getwd()
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("could not get current directory for KfDef %v", err),
			}
		}
		c.KfDef.Spec.AppDir = cwd
	} else {
		c.KfDef.Spec.AppDir = path.Dir(cfgfile)
	}

	// Set some defaults
	// TODO(jlewi): This code doesn't belong here. It should probably be called from inside KfApp; e.g. from
	// KfApp.generate. We should do all initialization of defaults as part of the reconcile loop in one function.
	if c.KfDef.Spec.PackageManager == "" {
		c.KfDef.Spec.PackageManager = kftypesv3.KUSTOMIZE
	}

	return c, nil
}

// this type holds platform implementations of KfApp
// eg Platforms[kftypesv3.GCP], Platforms[kftypes.MINIKUBE], PackageManagers["kustomize"]
// The data attributes in kfdefsv3.KfDef are used by different KfApp implementations
type coordinator struct {
	Platforms       map[string]kftypesv3.Platform
	PackageManagers map[string]kftypesv3.KfApp
	KfDef           *kfdefsv3.KfDef
}

type KfDefGetter interface {
	GetKfDef() *kfdefsv3.KfDef
	GetPlugin(name string) (kftypesv3.KfApp, bool)
}

// GetKfDef returns a pointer to the KfDef used by this application.
func (kfapp *coordinator) GetKfDef() *kfdefsv3.KfDef {
	return kfapp.KfDef
}

// GetPlatform returns the specified platform.
func (kfapp *coordinator) GetPlugin(name string) (kftypesv3.KfApp, bool) {

	if r, ok := kfapp.Platforms[name]; ok {
		return r, ok
	}

	r, ok := kfapp.PackageManagers[name]
	return r, ok
}

func (kfapp *coordinator) Apply(resources kftypesv3.ResourceEnum) error {
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Apply(kftypesv3.K8S)
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

	// TODO(kunming): move to profile v1beta1 so it can be applied to all user namespaces
	_ = func() error {
		if kfapp.KfDef.Spec.Email == "" || kfapp.KfDef.Spec.Platform != kftypesv3.GCP {
			return nil
		}

		if p, ok := kfapp.Platforms[kfapp.KfDef.Spec.Platform]; !ok {
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: "Platform GCP specified but not loaded.",
			}
		} else {
			gcp := p.(*gcp.Gcp)
			p, err := gcp.GetPluginSpec()
			if err != nil {
				return err
			}
			if *p.EnableWorkloadIdentity {
				return gcp.SetupDefaultNamespaceWorkloadIdentity()
			} else {
				return gcp.ConfigPodDefault()
			}
		}
	}

	if err := kfapp.KfDef.SyncCache(); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not sync cache. Error: %v", err),
		}
	}

	switch resources {
	case kftypesv3.ALL:
		if err := platform(); err != nil {
			return err
		}
		if err := k8s(); err != nil {
			return err
		}
		return nil
	case kftypesv3.PLATFORM:
		return platform()
	case kftypesv3.K8S:
		if err := k8s(); err != nil {
			return err
		}
		// TODO(gabrielwen): Need to find a more proper way of injecting plugings.
		// https://github.com/kubeflow/kubeflow/issues/3708
		return nil
	}
	return nil
}

func (kfapp *coordinator) Delete(resources kftypesv3.ResourceEnum) error {
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypesv3.K8S)
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

	if err := kfapp.KfDef.SyncCache(); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not sync cache. Error: %v", err),
		}
	}

	switch resources {
	case kftypesv3.ALL:
		// if we're deleting ALL, any problems with deleting k8s will abort and not delete the platform
		if err := k8s(); err != nil {
			return err
		}
		if err := platform(); err != nil {
			return err
		}
	case kftypesv3.PLATFORM:
		// deleting the PLATFORM means deleting the cluster. We remove k8s first in order free up any cloud vendor
		// resources. Deleting k8 resources is a best effort and partial delete or failure should not
		// prevent PLATFORM (cluster) deletion
		_ = k8s()
		if err := platform(); err != nil {
			return err
		}
	case kftypesv3.K8S:
		if err := k8s(); err != nil {
			return err
		}
	}
	return nil
}

func (kfapp *coordinator) Generate(resources kftypesv3.ResourceEnum) error {
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Generate(kftypesv3.K8S)
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

	if err := kfapp.KfDef.SyncCache(); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not sync cache. Error: %v", err),
		}
	}

	switch resources {
	case kftypesv3.ALL:
		if err := platform(); err != nil {
			return err
		}
		return k8s()
	case kftypesv3.PLATFORM:
		return platform()
	case kftypesv3.K8S:
		return k8s()
	}
	return nil
}

func (kfapp *coordinator) Init(resources kftypesv3.ResourceEnum) error {
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			packageManagerErr := packageManager.Init(kftypesv3.K8S)
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
	case kftypesv3.ALL:
		if err := platform(); err != nil {
			return err
		}
		return k8s()
	case kftypesv3.PLATFORM:
		return platform()
	case kftypesv3.K8S:
		return k8s()
	}
	return nil
}

func (kfapp *coordinator) Show(resources kftypesv3.ResourceEnum) error {
	switch resources {
	case kftypesv3.K8S:
		fallthrough
	case kftypesv3.PLATFORM:
		fallthrough
	case kftypesv3.ALL:
		if kfapp.KfDef.Spec.Platform != "" {
			platform := kfapp.Platforms[kfapp.KfDef.Spec.Platform]
			show, ok := platform.(kftypesv3.KfShow)
			if ok && show != nil {
				showErr := show.Show(resources)
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			show, ok := packageManager.(kftypesv3.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypesv3.K8S)
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

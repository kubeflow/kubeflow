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
	"os"
	"path/filepath"
	"strings"

	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/configconverters"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/aws"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/existing_arrikto"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/kustomize"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/minikube"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
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

// GetPlatform will return an implementation of kftypesv3.GetPlatform that matches the platform string
// It looks for statically compiled-in implementations, otherwise throws unrecognized error
func getPlatform(kfdef *kfconfig.KfConfig) (kftypesv3.Platform, error) {
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

func (coord *coordinator) getPackageManagers(kfdef *kfconfig.KfConfig) *map[string]kftypesv3.KfApp {
	var packagemanagers = make(map[string]kftypesv3.KfApp)
	_packagemanager, _packagemanagerErr := getPackageManager(kfdef)
	if _packagemanagerErr != nil {
		log.Fatalf("could not get packagemanager %v Error %v **", kftypesv3.KUSTOMIZE, _packagemanagerErr)
	}
	if _packagemanager != nil {
		packagemanagers[kftypesv3.KUSTOMIZE] = _packagemanager
	}
	return &packagemanagers
}

// getPackageManager will return an implementation of kftypesv3.KfApp that matches the packagemanager string
// It looks for statically compiled-in implementations, otherwise it delegates to
// kftypesv3.LoadKfApp which will try and dynamically load a .so
//
func getPackageManager(kfdef *kfconfig.KfConfig) (kftypesv3.KfApp, error) {
	return kustomize.GetKfApp(kfdef), nil
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
func usageReportWarn(applications []kfconfig.Application) {
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
	for _, app := range applications {
		if app.Name == "spartakus" {
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

// isDirEmpty - quick check to determine if the  directory is empty
func isDirEmpty(dir string) bool {
	files, _ := ioutil.ReadDir(dir)
	if len(files) > 1 {
		return false
	}
	return true
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

// TODO: remove this
// This is for kfctlServer. We can remove this after kfctlServer uses kfconfig
func CreateKfAppCfgFileWithKfDef(d *kfdefsv3.KfDef) (string, error) {
	alphaConverter := configconverters.V1alpha1{}
	kfdefBytes, err := yaml.Marshal(d)
	if err != nil {
		return "", err
	}
	kfconfig, err := alphaConverter.ToKfConfig(d.Spec.AppDir, kfdefBytes)
	if err != nil {
		return "", err
	}
	return CreateKfAppCfgFile(kfconfig)
}

// CreateKfAppCfgFile will create the application directory and persist
// the KfDef to it as app.yaml.
// Returns an error if the app.yaml file already exists
// Returns path to the app.yaml file.
func CreateKfAppCfgFile(d *kfconfig.KfConfig) (string, error) {
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

	log.Infof("Writing KfDef to %v", cfgFilePath)
	cfgFilePathErr := configconverters.WriteConfigToFile(*d, cfgFilePath)
	if cfgFilePathErr != nil {
		log.Errorf("failed to write config: %v", cfgFilePathErr)
	}
	return cfgFilePath, cfgFilePathErr
}

// nameFromAppFile infers a default name given the path to the KFDef file.
// returns the empty string if there is a problem getting the name.
func nameFromAppFile(appFile string) string {
	absAppPath, err := filepath.Abs(appFile)

	if err != nil {
		log.Errorf("KfDef.Name isn't set and there was a problem inferring the name based on the path %v; error: %v\nPlease set the name explicitly in the KFDef spec.", appFile, err)
		return ""
	}

	appDir := filepath.Dir(absAppPath)

	name := filepath.Base(appDir)

	if name == appDir {
		// This case happens if appFile is in the root directory
		return ""
	}

	return name
}

// LoadKfAppCfgFile constructs a KfApp by loading the provided app.yaml file.
func LoadKfAppCfgFile(cfgfile string) (kftypesv3.KfApp, error) {
	isRemoteFile, err := utils.IsRemoteFile(cfgfile)
	if err != nil {
		return nil, err
	}

	// If the config file is a remote URI, check to see if the current directory
	// is empty because we will be generating the KfApp there.
	appFile := cfgfile
	if isRemoteFile {
		cwd, _ := os.Getwd()
		if !isDirEmpty(cwd) {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("current directory %v not empty, please switch directories", cwd),
			}
		}

		kfdef, err := configconverters.LoadConfigFromURI(cfgfile)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
			}
		}

		appFile, err = CreateKfAppCfgFile(kfdef)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
			}
		}
	}

	// Set default TypeMeta information. This will get overwritten by explicit values if set in the cfg file.
	kfdef, err := configconverters.LoadConfigFromURI(appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", cfgfile, err),
		}
	}

	kfdef.Spec.AppDir = filepath.Dir(appFile)
	// Since we know we have a local file we can set a default name if none is set based on the local directory
	if kfdef.Name == "" {
		kfdef.Name = nameFromAppFile(appFile)
		if kfdef.Name == "" {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("KfDef.Name isn't set and there was a problem inferring the name based on the path %v\nPlease set the name explicitly in the KFDef spec.", appFile),
			}
		}
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

	pkg, pkgErr := getPackageManager(c.KfDef)
	if pkgErr != nil {
		log.Fatalf("could not get package manager %v Error %v **", kftypesv3.KUSTOMIZE, pkgErr)
		return nil, pkgErr
	}
	if pkg != nil {
		c.PackageManagers[kftypesv3.KUSTOMIZE] = pkg
	}

	// Set some defaults
	// TODO(jlewi): This code doesn't belong here. It should probably be called from inside KfApp; e.g. from
	// KfApp.generate. We should do all initialization of defaults as part of the reconcile loop in one function.
	// if c.KfDef.Spec.PackageManager == "" {
	// 	c.KfDef.Spec.PackageManager = kftypesv3.KUSTOMIZE
	// }

	return c, nil
}

// this type holds platform implementations of KfApp
// eg Platforms[kftypesv3.GCP], Platforms[kftypes.MINIKUBE], PackageManagers["kustomize"]
// The data attributes in kfconfig.KfConfig are used by different KfApp implementations
type coordinator struct {
	Platforms       map[string]kftypesv3.Platform
	PackageManagers map[string]kftypesv3.KfApp
	KfDef           *kfconfig.KfConfig
}

// TODO: change this
type KfDefGetter interface {
	GetKfDef() *kfdefsv3.KfDef
	GetPlugin(name string) (kftypesv3.KfApp, bool)
}

// GetKfDef returns a pointer to the KfDef used by this application.
func (kfapp *coordinator) GetKfDef() *kfconfig.KfConfig {
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

	gcpAddedConfig := func() error {
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
			if err := gcp.SetupWorkloadIdentityPermission(); err != nil {
				return err
			}
			// Keep podDefault for backward compatibility
			return gcp.ConfigPodDefault()
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
		return gcpAddedConfig()
	case kftypesv3.PLATFORM:
		return platform()
	case kftypesv3.K8S:
		if err := k8s(); err != nil {
			return err
		}
		// TODO(gabrielwen): Need to find a more proper way of injecting plugings.
		// https://github.com/kubeflow/kubeflow/issues/3708
		return gcpAddedConfig()
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
				createConfigErr := configconverters.WriteConfigToFile(
					*kfapp.KfDef, filepath.Join(kfapp.KfDef.Spec.AppDir, kftypesv3.KfConfigFile))
				if createConfigErr != nil {
					return &kfapis.KfError{
						Code: createConfigErr.(*kfapis.KfError).Code,
						Message: fmt.Sprintf("cannot create config file %v: %v", kftypesv3.KfConfigFile,
							createConfigErr.(*kfapis.KfError).Message),
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
	usageReportWarn(kfapp.KfDef.Spec.Applications)

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
				createConfigErr := configconverters.WriteConfigToFile(
					*kfapp.KfDef, filepath.Join(kfapp.KfDef.Spec.AppDir, kftypesv3.KfConfigFile))
				if createConfigErr != nil {
					return &kfapis.KfError{
						Code: createConfigErr.(*kfapis.KfError).Code,
						Message: fmt.Sprintf("cannot create config file %v: %v", kftypesv3.KfConfigFile,
							createConfigErr.(*kfapis.KfError).Message),
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

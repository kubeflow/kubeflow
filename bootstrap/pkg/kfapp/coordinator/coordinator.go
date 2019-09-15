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
	"path"
	"path/filepath"
	"strings"

	"os"

	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/aws"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/existing_arrikto"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/kustomize"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/minikube"
	homedir "github.com/mitchellh/go-homedir"
	log "github.com/sirupsen/logrus"
	valid "k8s.io/apimachinery/pkg/api/validation"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"time"
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
	if kfDef.Spec.EnableApplications {
		overlays = append(overlays, "application")
	}
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
	data, dataErr := resMap.EncodeAsYaml()
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

// A strawman approach for reconcile semantics. We keep retrying until the fn returns nil.
type simpleReconcileReq struct {
	Fn      func() error
	Requeue bool
}

func newReconcileReq(fn func() error) simpleReconcileReq {
	return simpleReconcileReq{
		Fn:      fn,
		Requeue: true,
	}
}

func simpleReconcile(requests []simpleReconcileReq) error {
	return backoff.Retry(func() error {
		retry := false
		for idx := range requests {
			if requests[idx].Requeue == false {
				continue
			}

			if err := requests[idx].Fn(); err == nil {
				requests[idx].Requeue = false
			} else {
				log.Warnf("reconcile process has error: %v; retrying...", err)
				requests[idx].Requeue = true
				retry = true
			}
		}

		if retry {
			return fmt.Errorf("Retrying to reconcile in 10 seconds.")
		} else {
			// Exit the simple reconcile.
			return nil
		}
	}, backoff.NewConstantBackOff(10*time.Second))
}

// CreateKfDefFromOptions creates a KfDef from the supplied options.
func CreateKfDefFromOptions(options map[string]interface{}) (*kfdefsv3.KfDef, error) {
	//appName can be a path
	appName := options[string(kftypesv3.APPNAME)].(string)
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

	// If a config file is specified, construct the KfDef entirely from that.
	configFile := options[string(kftypesv3.CONFIG)].(string)

	kfDef := &kfdefsv3.KfDef{}
	if configFile != "" {
		newkfDef, err := kfdefsv3.LoadKFDefFromURI(configFile)

		kfDef = newkfDef
		if err != nil {
			log.Errorf("Could not load %v; error %v", configFile, err)
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: err.Error(),
			}
		}

		if kfDef.Name != "" {
			log.Warnf("Overriding KfDef.Spec.Name; old value %v; new value %v", kfDef.Name, appName)
		}

		kfDef.Name = appName

		//TODO(yanniszark): sane defaults for missing fields
		//TODO(yanniszark): validate KfDef
	} else {
		platform := options[string(kftypesv3.PLATFORM)].(string)
		packageManager := options[string(kftypesv3.PACKAGE_MANAGER)].(string)
		version := options[string(kftypesv3.VERSION)].(string)
		useBasicAuth := options[string(kftypesv3.USE_BASIC_AUTH)].(bool)
		useIstio := options[string(kftypesv3.USE_ISTIO)].(bool)
		namespace := options[string(kftypesv3.NAMESPACE)].(string)
		project := options[string(kftypesv3.PROJECT)].(string)
		cacheDir := ""
		if options[string(kftypesv3.REPO)].(string) != "" {
			cacheDir = options[string(kftypesv3.REPO)].(string)
			if _, err := os.Stat(cacheDir); err != nil {
				log.Fatalf("repo %v does not exist Error %v", cacheDir, err)
			}
		} else {
			var cacheDirErr error
			// TODO(jlewi): We should call repoVersionToUri and pass the value to DownloadToCache
			cacheDir, cacheDirErr = kftypesv3.DownloadToCache(appDir, kftypesv3.KubeflowRepo, version)
			if cacheDirErr != nil || cacheDir == "" {
				log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
			}
		}

		// This is a deprecated code path for constructing kfDef using kustomize style overlays
		kfDef = &kfdefsv3.KfDef{
			TypeMeta: metav1.TypeMeta{
				Kind:       "KfDef",
				APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name:      appName,
				Namespace: namespace,
			},
			Spec: kfdefsv3.KfDefSpec{
				ComponentConfig: config.ComponentConfig{
					Platform: platform,
				},
				Project:            project,
				PackageManager:     packageManager,
				UseBasicAuth:       useBasicAuth,
				UseIstio:           useIstio,
				EnableApplications: true,
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

		kfDef.Name = appName
		kfDef.Spec.Platform = platform
		kfDef.Namespace = namespace
		kfDef.Spec.Version = version
		kfDef.Spec.Repo = path.Join(cacheDir, kftypesv3.KubeflowRepo)
		kfDef.Spec.Project = options[string(kftypesv3.PROJECT)].(string)
		kfDef.Spec.SkipInitProject = options[string(kftypesv3.SKIP_INIT_GCP_PROJECT)].(bool)
		kfDef.Spec.UseBasicAuth = useBasicAuth
		kfDef.Spec.UseIstio = useIstio
		kfDef.Spec.PackageManager = packageManager
		// Add the repo
		if kfDef.Spec.Repos == nil {
			kfDef.Spec.Repos = []kfdefsv3.Repo{}
		}

		repoUri := repoVersionToUri(kftypesv3.KubeflowRepo, version)
		kfDef.Spec.Repos = append(kfDef.Spec.Repos, kfdefsv3.Repo{
			Name: kftypesv3.KubeflowRepoName,
			Uri:  repoUri,
		})
	}
	kfDef.Spec.AppDir = appDir

	// Disable usage report if requested
	// TODO(jlewi): We should be able to get rid of this once we depend on this being
	// configured in the config file.
	disableUsageReport := options[string(kftypesv3.DISABLE_USAGE_REPORT)].(bool)
	if disableUsageReport {
		kfDef.Spec.Components = filterSpartakus(kfDef.Spec.Components)
		delete(kfDef.Spec.ComponentParams, "spartakus")

	}

	err := backfillKfDefFromInitOptions(kfDef, options)

	if err != nil {
		log.Errorf("Could not backfill KfDef from options; error %v", err)
		return nil, err
	}

	return kfDef, nil
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

// NewKfApp is called from the Init subcommand and will create a directory based on
// the path/name argument given to the Init subcommand
func NewKfApp(options map[string]interface{}) (kftypesv3.KfApp, error) {
	kfDef, err := CreateKfDefFromOptions(options)

	if err != nil {
		return nil, err
	}

	isValid, msg := kfDef.IsValid()

	if !isValid {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: msg,
		}
	}

	cfgFilePath, err := CreateKfAppCfgFile(kfDef)

	if err != nil {
		return nil, err
	}

	log.Infof("Synchronize cache")

	err = kfDef.SyncCache()

	if err != nil {
		log.Errorf("Failed to synchronize the cache; error: %v", err)
		return nil, err
	}

	// Save app.yaml because we need to preserve information about the cache.
	if err := kfDef.WriteToFile(cfgFilePath); err != nil {
		log.Errorf("Failed to save KfDef to %v; error %v", cfgFilePath, err)
		return nil, err
	}

	return LoadKfAppCfgFile(cfgFilePath)
}

// backfillKfDefFromInitOptions fills in a KfDef spec based on various command line options.
//
// TODO(jlewi): We should eventually be able to get rid of this function once we remove
// a bunch of command line options and rely on users editing the KfDef file in app.yaml file
// as needed. The function only overrides the KfDef spec if the option isn't already set.
// The reason we need this is because in 0.5 different command line options were supplied as arguments
// to different commands (e.g. init & generate) took different command line options.
// With 0.6 we want to move to a world in which all the options should be stored in app.yaml.
// Support for the command line options is only provided for backwards compatibility until
// we remove the options.
func backfillKfDefFromInitOptions(kfdef *kfdefsv3.KfDef, options map[string]interface{}) error {
	if kfdef.Spec.Platform == "" {
		if options[string(kftypesv3.PLATFORM)] != nil && options[string(kftypesv3.PLATFORM)].(string) != "" {
			kfdef.Spec.Platform = options[string(kftypesv3.PLATFORM)].(string)

			log.Warnf("Setting KfDef.Spec.Platform to %v based on command line flags; this is deprecated. "+
				"Platform should be set in the app.yaml file.", kfdef.Spec.Platform)
		}
	}

	if kfdef.Spec.Platform == kftypesv3.GCP {
		if kfdef.Spec.Project == "" {
			if options[string(kftypesv3.PROJECT)] != nil && options[string(kftypesv3.PROJECT)].(string) != "" {

				kfdef.Spec.Project = options[string(kftypesv3.PROJECT)].(string)
				log.Warnf("Setting KfDef.Spec.Project to %v based on command line flags; this is deprecated. "+
					"Project should be set in the app.yaml file.", kfdef.Spec.Project)

			}
		}
	}

	if options[string(kftypesv3.PACKAGE_MANAGER)] != nil && options[string(kftypesv3.PACKAGE_MANAGER)].(string) != "" {
		if kfdef.Spec.PackageManager == "" {
			kfdef.Spec.PackageManager = options[string(kftypesv3.PACKAGE_MANAGER)].(string)
			log.Warnf("Defaulting Spec.PackageManager to %v. This is deprecated; "+
				"PackageManager should be explicitly set in app.yaml", kfdef.Spec.PackageManager)
		}
	}

	// Backfill repos
	if strings.Contains(kfdef.Spec.PackageManager, kftypesv3.KUSTOMIZE) {
		pFlag := kfdef.Spec.PackageManager
		parts := strings.Split(pFlag, "@")
		version := "master"
		if len(parts) == 2 {
			version = parts[1]
		}

		// Set the kustomize repo if its not already set.
		// Note kfdef.Spec.PackageManager might get set in getConfigFromCache.
		// So we might need to backfill repos even if PackageManager is set.
		hasRepo := false
		for _, r := range kfdef.Spec.Repos {
			if r.Name == kftypesv3.ManifestsRepoName {
				hasRepo = true
			}
		}

		if hasRepo {
			log.Warnf("Repo %v exists in app.yaml ignoring version provided by --package-manager", kftypesv3.ManifestsRepoName)
		} else {
			root := fmt.Sprintf("manifests-%v", version)
			kfdef.Spec.Repos = append(kfdef.Spec.Repos, kfdefsv3.Repo{
				Name: kftypesv3.ManifestsRepoName,
				Uri:  fmt.Sprintf("https://github.com/kubeflow/manifests/archive/%v.tar.gz", version),
				Root: root,
			})
		}

		// Make sure we strip out the "@"
		kfdef.Spec.PackageManager = kftypesv3.KUSTOMIZE
	}

	// For boolean options there is no way to test whether they have been explicitly set in KfDef or
	// not so we always override the value with the command line flag.
	// TODO(lunkai): I think we shouldn't backfill bool flags when using --config
	// See https://github.com/kubeflow/kubeflow/issues/3744.
	if options[string(kftypesv3.CONFIG)] == nil {
		if options[string(kftypesv3.USE_BASIC_AUTH)] != nil {
			kfdef.Spec.UseBasicAuth = options[string(kftypesv3.USE_BASIC_AUTH)].(bool)
		}
		if options[string(kftypesv3.SKIP_INIT_GCP_PROJECT)] != nil {
			kfdef.Spec.SkipInitProject = options[string(kftypesv3.SKIP_INIT_GCP_PROJECT)].(bool)
		}
		if options[string(kftypesv3.DELETE_STORAGE)] != nil && kfdef.Spec.Platform == kftypesv3.GCP {
			kfdef.Spec.DeleteStorage = options[string(kftypesv3.DELETE_STORAGE)].(bool)
		}
	}

	return nil
}

// backfillKfDefFromGenerateOptions fills in a KfDef spec based on various command line options passed
// during kfctl generate
//
// TODO(jlewi): We should eventually be able to get rid of this function once we remove
// a bunch of command line options and rely on users editing the KfDef file in app.yaml file
// as needed. The function only overrides the KfDef spec if the option isn't already set.
// The reason we need this is because in 0.5 different command line options were supplied as arguments
// to different commands (e.g. init & generate) took different command line options.
// With 0.6 we want to move to a world in which all the options should be stored in app.yaml.
// Support for the command line options is only provided for backwards compatibility until
// we remove the options.
func backfillKfDefFromGenerateOptions(kfdef *kfdefsv3.KfDef, options map[string]interface{}) error {
	if kfdef.Spec.Platform == kftypesv3.GCP {
		if options[string(kftypesv3.EMAIL)] != nil && options[string(kftypesv3.EMAIL)].(string) != "" {
			if kfdef.Spec.Email == "" {
				kfdef.Spec.Email = options[string(kftypesv3.EMAIL)].(string)
			} else {
				log.Warnf("KfDef.Spec.Email is already set; not overwritting with options value")
			}
		}

		if kfdef.Spec.IpName == "" {
			if options[string(kftypesv3.IPNAME)] != nil && options[string(kftypesv3.IPNAME)].(string) != "" {
				kfdef.Spec.IpName = options[string(kftypesv3.IPNAME)].(string)

			} else if kfdef.Spec.Platform == kftypesv3.GCP && kfdef.Name != "" {
				kfdef.Spec.IpName = kfdef.Name + "-ip"
			}

			log.Warnf("Defaulting Spec.IpName to %v. This is deprecated; "+
				"IpName should be explicitly set in app.yaml", kfdef.Spec.IpName)
		}

		if kfdef.Spec.Hostname == "" {

			if options[string(kftypesv3.HOSTNAME)] != nil && options[string(kftypesv3.HOSTNAME)].(string) != "" {
				kfdef.Spec.Hostname = options[string(kftypesv3.HOSTNAME)].(string)
			} else if kfdef.Name != "" && kfdef.Spec.Project != "" && kfdef.Spec.Hostname == "" {
				kfdef.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog", kfdef.Name, kfdef.Spec.Project)
			}
			log.Warnf("Defaulting Spec.Hostame to %v. This is deprecated; "+
				"Hostname should be explicitly set in app.yaml", kfdef.Spec.Hostname)
		}

		if kfdef.Spec.Zone == "" {
			if options[string(kftypesv3.ZONE)] != nil && options[string(kftypesv3.ZONE)].(string) != "" {
				kfdef.Spec.Zone = options[string(kftypesv3.ZONE)].(string)
			} else {
				kfdef.Spec.Zone = kftypesv3.DefaultZone
			}
			log.Warnf("Defaulting Spec.Zone to %v. This is deprecated; "+
				"Zone should be explicitly set in app.yaml", kfdef.Spec.Zone)
		}
	}

	if options[string(kftypesv3.MOUNT_LOCAL)] != nil {
		kfdef.Spec.MountLocal = options[string(kftypesv3.MOUNT_LOCAL)].(bool)
	}

	return nil
}

// LoadKfApp is called from subcommands Apply, Delete, Generate and assumes the existence of an app.yaml
// file which was created by the Init subcommand. It sets options needed by these subcommands
//
// TODO(jlewi): This method is deprecated. It is providing backwards compatibility with existing call sites.
// New callers should use LoadKfAppCfgFile to load it from a file. If callers need to modify
// KfDef they should modify it and then serialize to disk.
func LoadKfApp(options map[string]interface{}) (kftypesv3.KfApp, error) {
	appDir, err := os.Getwd()

	// Handle backfilling options.
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}
	cfgfile := filepath.Join(appDir, kftypesv3.KfConfigFile)
	kfdef, err := kfdefsv3.LoadKFDefFromURI(cfgfile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", cfgfile, err),
		}
	}

	err = backfillKfDefFromGenerateOptions(kfdef, options)

	if err != nil {
		log.Warnf("There was a problem filling in KfDef based on command line options %v", err)
	}

	if err := kfdef.WriteToFile(cfgfile); err != nil {
		log.Errorf("Could not write KfDef changes to %v; error %v", cfgfile, err)
		return nil, err
	}

	return LoadKfAppCfgFile(cfgfile)
}

// LoadKfAppCfgFile constructs a KfApp by loading the provided app.yaml file.
func LoadKfAppCfgFile(cfgfile string) (kftypesv3.KfApp, error) {
	// Set default TypeMeta information. This will get overwritten by explicit values if set in the cfg file.
	kfdef, err := kfdefsv3.LoadKFDefFromURI(cfgfile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", cfgfile, err),
		}
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

	// TODO(gabrielwen): Move `gcpAddedConfig` back to gcp.go.
	switch resources {
	case kftypesv3.ALL:
		return simpleReconcile([]simpleReconcileReq{
			newReconcileReq(platform),
			newReconcileReq(k8s),
			newReconcileReq(gcpAddedConfig),
		})
	case kftypesv3.PLATFORM:
		return platform()
	case kftypesv3.K8S:
		return simpleReconcile([]simpleReconcileReq{
			newReconcileReq(k8s),
			newReconcileReq(gcpAddedConfig),
		})
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

func (kfapp *coordinator) Show(resources kftypesv3.ResourceEnum, options map[string]interface{}) error {
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
		for packageManagerName, packageManager := range kfapp.PackageManagers {
			show, ok := packageManager.(kftypesv3.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypesv3.K8S, options)
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

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	"io/ioutil"
	netUrl "net/url"
	"os"
	"path"
=======
>>>>>>> 236085d3... coordinator use kfconfig wip
=======
=======
	"io/ioutil"
>>>>>>> 111a8d84... fix delete
	"os"
>>>>>>> 65dbea91... coordinator can compile now
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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
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
	url, err := netUrl.ParseRequestURI(configFile)
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

	// If the config file is downloaded remotely, check to see if the current directory
	// is empty because we will be generating the KfApp there.
	if isRemoteFile {
		cwd = isCwdEmpty()
		if cwd == "" {
			wd, _ := os.Getwd()
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("current directory %v not empty, please switch directories", wd),
			}
		}
	}

	// kfDef is a kfconfig
	kfDef, err := configconverters.LoadConfigFromURI(configFile)
	if err != nil {
>>>>>>> e25a3a1a... fix?
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
=======
// NewLoadKfAppFromURI takes in a config file and constructs the KfApp
// used by the build and apply semantics for kfctl
func NewLoadKfAppFromURI(configFile string) (kftypesv3.KfApp, error) {
	// kfDef is a kfconfig
	kfDef, err := configconverters.LoadConfigFromURI(configFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
		}
	}
	// basic auth check and warn
	useBasicAuth := kfDef.Spec.UseBasicAuth
	if useBasicAuth && (os.Getenv(kftypesv3.KUBEFLOW_USERNAME) == "" ||
		os.Getenv(kftypesv3.KUBEFLOW_PASSWORD) == "") {
		// Printing warning message instead of bailing out as both ENV are used in apply,
		// not init.
		log.Warnf("you need to set the environment variable %s to the username you "+
			"want to use to login and variable %s to the password you want to use.",
			kftypesv3.KUBEFLOW_USERNAME, kftypesv3.KUBEFLOW_PASSWORD)
	}
	// check if zone is set and warn ONLY for GCP
	isPlatformGCP := kfDef.Spec.Platform == "gcp"
	if isPlatformGCP && os.Getenv("ZONE") == "" {
		log.Warn("you need to set the environment variable `ZONE` to the GCP zone you want to use")
	}

	// if kfDef.Spec.PackageManager == "" {
	// 	kfDef.Spec.PackageManager = kftypesv3.KUSTOMIZE
	// }

	appFile, err := CreateKfAppCfgFile(kfDef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error creating KfApp from config file: %v", err),
		}
	}
	kfApp, err := LoadKfAppCfgFile(appFile)
>>>>>>> 236085d3... coordinator use kfconfig wip
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

	if _, err := os.Stat(cfgFilePath); err == nil {
		log.Errorf("%v already exists", cfgFilePath)
		return cfgFilePath, fmt.Errorf("%v already exists", cfgFilePath)
	}
	log.Infof("Writing KfDef to %v", cfgFilePath)
	cfgFilePathErr := configconverters.WriteConfigToFile(*d, cfgFilePath)
	if cfgFilePathErr != nil {
		log.Errorf("failed to write config: %v", cfgFilePathErr)
	}
	return cfgFilePath, cfgFilePathErr
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

<<<<<<< HEAD
// LoadKfAppCfgFile constructs a KfApp by loading the provided app.yaml file.
func LoadKfAppCfgFile(cfgfile string) (kftypesv3.KfApp, error) {
	url, err := netUrl.ParseRequestURI(cfgfile)
	isRemoteFile := false
	cwd := ""
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error parsing config file path: %v", err),
=======
// GetKfAppFromCfgFile gets the KfApp from app.yaml for `kfctl delete`
// Why not use LoadKfAppCfgFile?
// Because LoadKfAppCfgFile is used by the build and apply commands for checking if the cwd is empty
// For delete, the cwd is not emptyu so we need a different way to load the KfApp
func GetKfAppFromCfgFile(appFile string, deleteStorage bool) (kftypesv3.KfApp, error) {
	// Read contents
	configFileBytes, err := ioutil.ReadFile(appFile)
	// TODO: can we use this?
	// kfdef, err := configconverters.LoadConfigFromURI(appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not read from config file %s: %v", appFile, err),
		}
	}
	alpha1Converter := configconverters.V1alpha1{}
	kfdef, err := alpha1Converter.ToKfConfig(filepath.Dir(appFile), configFileBytes)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not read from config file %s: %v", appFile, err),
		}
	}
	kfdef.Spec.DeleteStorage = deleteStorage
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
>>>>>>> 236085d3... coordinator use kfconfig wip
		}
	} else {
		if url.Scheme != "" {
			isRemoteFile = true
		}
	}

<<<<<<< HEAD
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
=======
	pkg, pkgErr := getPackageManager(c.KfDef)
	if pkgErr != nil {
		log.Fatalf("could not get package manager %v Error %v **", kftypesv3.KUSTOMIZE, pkgErr)
		return nil, pkgErr
	}
	if pkg != nil {
		c.PackageManagers[kftypesv3.KUSTOMIZE] = pkg
>>>>>>> 236085d3... coordinator use kfconfig wip
	}

	// Set default TypeMeta information. This will get overwritten by explicit values if set in the cfg file.
<<<<<<< HEAD
	kfdef, err := kfdefsv3.LoadKFDefFromURI(appFile)
=======
	kfdef, err := configconverters.LoadConfigFromURI(cfgfile)
>>>>>>> 236085d3... coordinator use kfconfig wip
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

	pkg, pkgErr := getPackageManager(c.KfDef)
	if pkgErr != nil {
		log.Fatalf("could not get package manager %v Error %v **", kftypesv3.KUSTOMIZE, pkgErr)
		return nil, pkgErr
	}
	if pkg != nil {
		c.PackageManagers[kftypesv3.KUSTOMIZE] = pkg
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
				createConfigErr := configconverters.WriteConfigToFile(*kfapp.KfDef, kftypesv3.KfConfigFile)
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
				createConfigErr := configconverters.WriteConfigToFile(*kfapp.KfDef, kftypesv3.KfConfigFile)
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

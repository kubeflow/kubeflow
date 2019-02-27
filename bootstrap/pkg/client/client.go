package client

import (
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/ksonnet/ksonnet/pkg/app"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	// STATIC
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kustomize"
	// -STATIC //
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/afero"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	// STATIC
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/dockerfordesktop"
	// -STATIC //
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
	log "github.com/sirupsen/logrus"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_client := &kfApp{
		KfApps: kftypes.KfApps{
			Platforms:       make(map[string]kftypes.KfApp),
			PackageManagers: make(map[string]kftypes.KfApp),
		},
		Client: &cltypes.Client{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Client",
				APIVersion: "client.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	_client.PackageManagers[kftypes.KSONNET] = ksonnet.GetKfApp(options)
	platform := options[string(kftypes.PLATFORM)].(string)
	if !(platform == "" || platform == kftypes.NONE) {
		_platform, _platformErr := GetPlatform(options)
		if _platformErr != nil {
			log.Fatalf("could not get platform %v Error %v **", platform, _platformErr)
			return nil
		}
		if _platform != nil {
			_client.Platforms[platform] = _platform
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
	case string(kftypes.KUSTOMIZE):
		return kustomize.GetKfApp(options), nil
	// -STATIC //
	default:
		log.Infof("** loading %v.so for platform %v **", platform, platform)
		return kftypes.LoadPlatform(options)
	}
}

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
	yaml.Unmarshal(buf, &v)
	data := v.(map[string]interface{})
	metadata := data["metadata"].(map[string]interface{})
	spec := data["spec"].(map[string]interface{})
	platform := spec["platform"].(string)
	appName = metadata["name"].(string)
	appDir = spec["appdir"].(string)
	fs := afero.NewOsFs()
	ksDir := path.Join(appDir, kstypes.KsName)
	kApp, kAppErr := app.Load(fs, nil, ksDir)
	if kAppErr != nil {
		return nil, fmt.Errorf("there was a problem loading app %v. Error: %v", appName, kAppErr)
	}
	options[string(kftypes.PLATFORM)] = platform
	options[string(kftypes.APPNAME)] = appName
	options[string(kftypes.APPDIR)] = appDir
	options[string(kftypes.KAPP)] = kApp
	options[string(kftypes.DATA)] = buf
	pApp := GetKfApp(options)
	return pApp, nil
}

type kfApp struct {
	kftypes.KfApps
	Client *cltypes.Client
}

func (kfApp *kfApp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfApp.Client.Spec.Platform == "" || kfApp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfApp.Platforms[kfApp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Apply(resources, options)
				if platformErr != nil {
					return fmt.Errorf("kfApp Apply failed for %v: %v", kfApp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfApp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfApp.PackageManagers {
			packageManagerErr := packageManager.Apply(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
	}
	return nil
}

func (kfApp *kfApp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfApp.Client.Spec.Platform == "" || kfApp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfApp.Platforms[kfApp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Delete(resources, options)
				if platformErr != nil {
					return fmt.Errorf("kfApp Delete failed for %v: %v", kfApp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfApp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfApp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
	}
	return nil
}

func (kfApp *kfApp) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfApp.Client.Spec.Platform == "" || kfApp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfApp.Platforms[kfApp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Generate(resources, options)
				if platformErr != nil {
					return fmt.Errorf("kfApp Generate failed for %v: %v", kfApp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfApp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfApp.PackageManagers {
			packageManagerErr := packageManager.Delete(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
	}
	return nil
}

func (kfApp *kfApp) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		if !(kfApp.Client.Spec.Platform == "" || kfApp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfApp.Platforms[kfApp.Client.Spec.Platform]
			if platform != nil {
				platformErr := platform.Init(resources, options)
				if platformErr != nil {
					return fmt.Errorf("kfApp Generate failed for %v: %v", kfApp.Client.Spec.Platform, platformErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfApp.Client.Spec.Platform)
			}
		}
		for packageManagerName, packageManager := range kfApp.PackageManagers {
			packageManagerErr := packageManager.Init(kftypes.K8S, options)
			if packageManagerErr != nil {
				return fmt.Errorf("kfApp Init failed for %v: %v", packageManagerName, packageManagerErr)
			}
		}
	}
	return nil
}

func (kfApp *kfApp) Show(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		fallthrough
	case kftypes.PLATFORM:
		fallthrough
	case kftypes.ALL:
		for packageManagerName, packageManager := range kfApp.PackageManagers {
			show, ok := packageManager.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(kftypes.K8S, options)
				if showErr != nil {
					return fmt.Errorf("kfApp Show failed for %v: %v", packageManagerName, showErr)
				}
			}
		}
		if !(kfApp.Client.Spec.Platform == "" || kfApp.Client.Spec.Platform == kftypes.NONE) {
			platform := kfApp.Platforms[kfApp.Client.Spec.Platform]
			show, ok := platform.(kftypes.KfShow)
			if ok && show != nil {
				showErr := show.Show(resources, options)
				if showErr != nil {
					return fmt.Errorf("kfApp Init failed for %v: %v", kfApp.Client.Spec.Platform, showErr)
				}
			} else {
				return fmt.Errorf("%v not in Platforms", kfApp.Client.Spec.Platform)
			}
		}
	}
	return nil
}

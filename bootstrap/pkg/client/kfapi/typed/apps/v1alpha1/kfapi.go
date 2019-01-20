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

package v1alpha1

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ksonnet/ksonnet/pkg/actions"
	"github.com/ksonnet/ksonnet/pkg/app"
	"github.com/ksonnet/ksonnet/pkg/client"
	"github.com/ksonnet/ksonnet/pkg/component"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/viper"
	"k8s.io/apimachinery/pkg/apimachinery/registered"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"path/filepath"
	"time"
)

type KfApi interface {
	Apply(components []string, cfg clientcmdapi.Config) error
	ComponentAdd(component string, args []string) error
	Components() (map[string]*v1alpha1.KsComponent, error)
	EnvSet(env string, host string) error
	Init(envName string, k8sSpecFlag string, serverURI string, namespace string) error
	Libraries() (map[string]*v1alpha1.KsLibrary, error)
	ParamSet(component string, name string, value string) error
	PkgInstall(full string, pkgName string) error
	PrototypeUse(m map[string]interface{}) error
	Registries() (map[string]*v1alpha1.Registry, error)
	RegistryAdd(name string, reguri string) error
	RegistryConfigs() (map[string]v1alpha1.RegistryConfig, error)
	Root() string
}

type kfConfig struct {
	init *viper.Viper
	env  *viper.Viper
}

// ksServer provides a server to wrap ksonnet.
// This allows ksonnet applications to be managed remotely.
type kfApi struct {
	appName string
	// appDir is the directory where apps should be stored.
	appDir string
	// knownRegistries is a list of known registries
	// This can be used to map the name of a registry to info about the registry.
	// This allows apps to specify a registry by name without having to know any
	// other information about the regisry.
	knownRegistries map[string]v1alpha1.RegistryConfig
	configs         kfConfig
	fs              afero.Fs
	kApp            app.App
}

func NewKfApiWithRegistries(appName string, appsDir string, knownRegistries map[string]v1alpha1.RegistryConfig) (KfApi, error) {
	return NewKfApi(appName, appsDir, knownRegistries, nil, nil)
}

func NewKfApiWithConfig(cfg *viper.Viper, env *viper.Viper) (KfApi, error) {
	cfgfile := cfg.ConfigFileUsed()
	if cfgfile == "" {
		return nil, fmt.Errorf("config file does not exist")
	}
	appDir := filepath.Dir(cfgfile)
	appName := filepath.Base(cfgfile)
	return NewKfApi(appName, appDir, nil, cfg, env)
}

func NewKfApi(appName string, appsDir string, knownRegistries map[string]v1alpha1.RegistryConfig,
	init *viper.Viper, env *viper.Viper) (KfApi, error) {

	fs := afero.NewOsFs()
	kApp, err := app.Load(fs, nil, appsDir)
	if err != nil {
		return nil, fmt.Errorf("There was a problem loading app %v. Error: %v", appName, err)
	}
	kfapi := &kfApi{
		appName:         appName,
		appDir:          appsDir,
		fs:              afero.NewOsFs(),
		knownRegistries: make(map[string]v1alpha1.RegistryConfig),
		configs: kfConfig{
			init: viper.New(),
			env:  viper.New(),
		},
		kApp: kApp,
	}
	if knownRegistries != nil {
		kfapi.knownRegistries = knownRegistries
	}
	if init != nil {
		kfapi.configs.init = init
	}
	if env != nil {
		kfapi.configs.env = env
	}
	return kfapi, nil
}

func (kfApi *kfApi) Libraries() (map[string]*v1alpha1.KsLibrary, error) {
	libs, error := kfApi.kApp.Libraries()
	if error != nil {
		return nil, fmt.Errorf("there was a problem getting the libraries %v. Error: %v", kfApi.appName, error)
	}

	libraries := make(map[string]*v1alpha1.KsLibrary)
	for k, v := range libs {
		libraries[k] = &v1alpha1.KsLibrary{
			Name:     v.Name,
			Registry: v.Registry,
			Version:  v.Version,
		}
	}
	return libraries, nil
}

func (kfApi *kfApi) Registries() (map[string]*v1alpha1.Registry, error) {
	regs, err := kfApi.kApp.Registries()
	if err != nil {
		return nil, fmt.Errorf("There was a problem getting the Registries %v. Error: %v", kfApi.appName, err)
	}

	registries := make(map[string]*v1alpha1.Registry)
	for k, v := range regs {
		registries[k] = &v1alpha1.Registry{
			Name:     v.Name,
			Protocol: v.Protocol,
			URI:      v.URI,
		}
	}

	return registries, nil
}

func (kfApi *kfApi) RegistryConfigs() (map[string]v1alpha1.RegistryConfig, error) {
	return kfApi.knownRegistries, nil
}

func (kfApi *kfApi) Root() string {
	return kfApi.kApp.Root()
}

func (kfApi *kfApi) Apply(components []string, cfg clientcmdapi.Config) error {

	applyOptions := map[string]interface{}{
		actions.OptionApp: kfApi.kApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(cfg, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionComponentNames: components,
		actions.OptionCreate:         true,
		actions.OptionDryRun:         false,
		actions.OptionEnvName:        "default",
		actions.OptionGcTag:          "gc-tag",
		actions.OptionSkipGc:         true,
	}
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(5*time.Second), 6)
	doneApply := make(map[string]bool)
	err := backoff.Retry(func() error {
		for _, comp := range components {
			if _, ok := doneApply[comp]; ok {
				continue
			}
			applyOptions[actions.OptionComponentNames] = []string{comp}
			err := actions.RunApply(applyOptions)
			if err == nil {
				log.Infof("Component %v apply succeeded", comp)
				doneApply[comp] = true
			} else {
				log.Errorf("(Will retry) Component %v apply failed; Error: %v", comp, err)
			}
		}
		if len(doneApply) == len(components) {
			return nil
		}
		return fmt.Errorf("%v failed components in last try", len(components)-len(doneApply))
	}, bo)
	if err != nil {
		log.Errorf("Components apply failed; Error: %v", err)
	} else {
		log.Infof("All components apply succeeded")
	}
	return err

}

func (kfApi *kfApi) ComponentAdd(component string, args []string) error {
	componentName := component
	componentPath := filepath.Join(kfApi.Root(), "components", componentName+".jsonnet")

	if exists, _ := afero.Exists(kfApi.fs, componentPath); !exists {
		log.Infof("Creating Component: %v ...", componentName)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   kfApi.Root(),
			actions.OptionArguments: args,
		})
		if err != nil {
			return fmt.Errorf("There was a problem creating component %v: %v", componentName, err)
		}
	} else {
		log.Infof("Component %v already exists", componentName)
	}
	return nil
}

func (kfApi *kfApi) Components() (map[string]*v1alpha1.KsComponent, error) {
	moduleName := "/"

	topModule := component.NewModule(kfApi.kApp, moduleName)
	components, error := topModule.Components()
	if error != nil {
		return nil, fmt.Errorf("there was a problem getting the Components %v. Error: %v", kfApi.appName, error)
	}

	comps := make(map[string]*v1alpha1.KsComponent)
	for _, comp := range components {
		name := comp.Name(false)
		comps[name] = &v1alpha1.KsComponent{
			Name:      name,
			Prototype: name,
		}
	}

	return comps, nil
}

func (kfApi *kfApi) Init(envName string, k8sSpecFlag string, serverURI string, namespace string) error {
	_, regErr := registered.NewAPIRegistrationManager(k8sSpecFlag)
	if regErr != nil {
		log.Infof("no registration manager for %v.", k8sSpecFlag)
	}

	options := map[string]interface{}{
		actions.OptionFs:                    kfApi.fs,
		actions.OptionName:                  kfApi.appName,
		actions.OptionEnvName:               envName,
		actions.OptionAppRoot:               kfApi.appDir,
		actions.OptionServer:                serverURI,
		actions.OptionSpecFlag:              k8sSpecFlag,
		actions.OptionNamespace:             namespace,
		actions.OptionSkipDefaultRegistries: true,
	}

	err := actions.RunInit(options)
	if err != nil {
		return fmt.Errorf("there was a problem initializing the app: %v", err)
	}
	log.Infof("Successfully initialized the app %v.", kfApi.appName)

	return nil
}

func (kfApi *kfApi) EnvSet(env string, host string) error {
	return nil
}

func (kfApi *kfApi) ParamSet(component string, name string, value string) error {
	err := actions.RunParamSet(map[string]interface{}{
		actions.OptionAppRoot: kfApi.Root(),
		actions.OptionName:    component,
		actions.OptionPath:    name,
		actions.OptionValue:   value,
	})
	if err != nil {
		return fmt.Errorf("Error when setting Parameters %v for Component %v: %v", name, component, err)
	}
	return nil
}

func (kfApi *kfApi) PkgInstall(full string, pkgName string) error {
	err := actions.RunPkgInstall(map[string]interface{}{
		actions.OptionAppRoot: kfApi.Root(),
		actions.OptionPkgName: full,
		actions.OptionName:    pkgName,
		actions.OptionForce:   false,
	})
	if err != nil {
		return fmt.Errorf("There was a problem installing package %v: %v", pkgName, err)
	}
	return nil
}

func (kfApi *kfApi) PrototypeUse(m map[string]interface{}) error {
	return nil
}

func (kfApi *kfApi) RegistryAdd(name string, reguri string) error {
	log.Infof("App %v add registry %v URI %v", kfApi.appName, name, reguri)
	options := map[string]interface{}{
		actions.OptionAppRoot: kfApi.Root(),
		actions.OptionName:    name,
		actions.OptionURI:     reguri,
		// Version doesn't actually appear to be used by the add function.
		actions.OptionVersion: "",
		// Looks like override allows us to override existing registries; we shouldn't
		// need to do that.
		actions.OptionOverride: false,
	}

	registries, err := kfApi.Registries()
	if err != nil {
		log.Errorf("There was a problem listing registries; %v", err)
	}

	if _, found := registries[name]; found {
		log.Infof("App already has registry %v", name)
	} else {
		err = actions.RunRegistryAdd(options)
		if err != nil {
			return fmt.Errorf("There was a problem adding registry %v: %v", name, err)
		}
	}
	return nil
}

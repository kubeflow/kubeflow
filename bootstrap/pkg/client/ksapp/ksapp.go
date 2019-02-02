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

package ksapp

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/ksonnet/ksonnet/pkg/actions"
	"github.com/ksonnet/ksonnet/pkg/app"
	"github.com/ksonnet/ksonnet/pkg/client"
	"github.com/ksonnet/ksonnet/pkg/component"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/viper"
	"io/ioutil"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"os"
	"path"
	"path/filepath"
	"reflect"
	"regexp"
	"strings"
	"time"
)

// KsApp implements the KfApp Interface
type KsApp struct {
	AppName string
	// AppDir is the directory where apps should be stored.
	AppDir string
	// ksonnet root name
	KsName string
	// ksonnet env name
	KsEnvName string
	CfgFile   *viper.Viper
	KApp      app.App
	KsApp     *kstypes.KsApp
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_kfapp := &KsApp{
		AppName:   "",
		AppDir:    "",
		KsName:    kstypes.KsName,
		KsEnvName: kstypes.KsEnvName,
		CfgFile:   nil,
		KApp:      nil,
		KsApp: &kstypes.KsApp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "KsApp",
				APIVersion: "ksapp.apps.kubeflow.org/v1alpha1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name: "",
			},
			Spec: kstypes.KsAppSpec{
				Platform:   "none",
				Version:    "",
				Repo:       "",
				Packages:   []string{},
				Components: []string{},
				Parameters: map[string][]kstypes.NameValue{},
			},
			Status: kstypes.KsAppStatus{
				Conditions: []kstypes.KsAppCondition{
					{
						Type:   "Pending",
						Status: "Unknown",
					},
				},
			},
		},
	}
	_kfapp.KsApp.Name = options["AppName"].(string)
	for k, v := range options {
		x := reflect.ValueOf(_kfapp).Elem().FieldByName(k)
		x.Set(reflect.ValueOf(v))
	}
	if options["KsApp"] == nil {
		platform := _kfapp.CfgFile.GetString("platform")
		_kfapp.KsApp.Spec.Platform = platform
	} else {
		value := options["KsApp"]
		ksApp := value.(*kstypes.KsApp)
		_kfapp.KsApp = ksApp
	}
	return _kfapp
}

func (ksApp *KsApp) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(ksApp.KsApp)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(ksApp.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (ksApp *KsApp) Apply(resources kftypes.ResourceEnum) error {
	host, _, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	cli, cliErr := kftypes.GetClientOutOfCluster()
	if cliErr != nil {
		return fmt.Errorf("couldn't create client Error: %v", cliErr)
	}
	envSetErr := ksApp.envSet(kstypes.KsEnvName, host)
	if envSetErr != nil {
		return fmt.Errorf("couldn't create ksonnet env %v Error: %v", kstypes.KsEnvName, envSetErr)
	}
	//ks param set application name ${DEPLOYMENT_NAME}
	name := ksApp.KsApp.Name
	paramSetErr := ksApp.paramSet("application", "name", name)
	if paramSetErr != nil {
		return fmt.Errorf("couldn't set application component's name to %v Error: %v", name, paramSetErr)
	}
	namespace := ksApp.KsApp.ObjectMeta.Namespace
	log.Infof("namespace: %v", namespace)
	_, nsMissingErr := cli.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr != nil {
		nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
		_, nsErr := cli.CoreV1().Namespaces().Create(nsSpec)
		if nsErr != nil {
			return fmt.Errorf("couldn't create namespace %v Error: %v", namespace, nsErr)
		}
	}
	clientConfig, clientConfigErr := kftypes.GetClientConfig()
	if clientConfigErr != nil {
		return fmt.Errorf("couldn't load client config Error: %v", clientConfigErr)
	}
	applyErr := ksApp.applyComponent([]string{"metacontroller"}, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't create metacontroller component Error: %v", applyErr)
	}
	applyErr = ksApp.applyComponent([]string{"application"}, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't create application component Error: %v", applyErr)
	}
	return nil
}

func (ksApp *KsApp) applyComponent(components []string, cfg *clientcmdapi.Config) error {
	applyOptions := map[string]interface{}{
		actions.OptionApp: ksApp.KApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(*cfg, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionComponentNames: components,
		actions.OptionCreate:         true,
		actions.OptionDryRun:         false,
		actions.OptionEnvName:        kstypes.KsEnvName,
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
		log.Errorf("components apply failed; Error: %v", err)
	} else {
		log.Infof("All components apply succeeded")
	}
	return err

}

func (ksApp *KsApp) componentAdd(component kstypes.KsComponent, args []string) error {
	componentPath := filepath.Join(ksApp.ksRoot(), "components", component.Name+".jsonnet")
	componentArgs := make([]string, 0)
	componentArgs = append(componentArgs, component.Prototype)
	componentArgs = append(componentArgs, component.Name)
	if args != nil && len(args) > 0 {
		componentArgs = append(componentArgs, args[0:]...)
	}
	if exists, _ := afero.Exists(afero.NewOsFs(), componentPath); !exists {
		log.Infof("Creating Component: %v ...", component.Name)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   ksApp.ksRoot(),
			actions.OptionArguments: componentArgs,
		})
		if err != nil {
			return fmt.Errorf("there was a problem adding component %v: %v", component.Name, err)
		}
	} else {
		log.Infof("Component %v already exists", component.Name)
	}
	return nil
}

func (ksApp *KsApp) components() (map[string]*kstypes.KsComponent, error) {
	moduleName := "/"
	topModule := component.NewModule(ksApp.KApp, moduleName)
	components, err := topModule.Components()
	if err != nil {
		return nil, fmt.Errorf("there was a problem getting the components %v. Error: %v", ksApp.AppName, err)
	}
	comps := make(map[string]*kstypes.KsComponent)
	for _, comp := range components {
		name := comp.Name(false)
		comps[name] = &kstypes.KsComponent{
			Name:      name,
			Prototype: name,
		}
	}
	return comps, nil
}

func (ksApp *KsApp) Delete(resources kftypes.ResourceEnum) error {
	//TODO not deleting the following
	//clusterrolebinding.rbac.authorization.k8s.io "meta-controller-cluster-role-binding" deleted
	//customresourcedefinition.apiextensions.k8s.io "compositecontrollers.metacontroller.k8s.io" deleted
	//customresourcedefinition.apiextensions.k8s.io "controllerrevisions.metacontroller.k8s.io" deleted
	//customresourcedefinition.apiextensions.k8s.io "decoratorcontrollers.metacontroller.k8s.io" deleted
	host, _, serverErr := kftypes.ServerVersion()
	if serverErr != nil {
		return fmt.Errorf("couldn't get server version: %v", serverErr)
	}
	cli, cliErr := kftypes.GetClientOutOfCluster()
	if cliErr != nil {
		return fmt.Errorf("couldn't create client Error: %v", cliErr)
	}
	envSetErr := ksApp.envSet(kstypes.KsEnvName, host)
	if envSetErr != nil {
		return fmt.Errorf("couldn't create ksonnet env %v Error: %v", kstypes.KsEnvName, envSetErr)
	}
	clientConfig, clientConfigErr := kftypes.GetClientConfig()
	if clientConfigErr != nil {
		return fmt.Errorf("couldn't load client config Error: %v", clientConfigErr)
	}
	components := []string{"application", "metacontroller"}
	err := actions.RunDelete(map[string]interface{}{
		actions.OptionApp: ksApp.KApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(*clientConfig, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionEnvName:        ksApp.KsEnvName,
		actions.OptionComponentNames: components,
		actions.OptionGracePeriod:    int64(5),
	})
	if err != nil {
		log.Infof("there was a problem deleting %v: %v", components, err)
	}
	namespace := ksApp.KsApp.ObjectMeta.Namespace
	log.Infof("deleting namespace: %v", namespace)
	ns, nsMissingErr := cli.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr == nil {
		nsErr := cli.CoreV1().Namespaces().Delete(ns.Name, metav1.NewDeleteOptions(int64(20)))
		if nsErr != nil {
			return fmt.Errorf("couldn't delete namespace %v Error: %v", namespace, nsErr)
		}
	}
	return nil
}

func (ksApp *KsApp) Generate(resources kftypes.ResourceEnum) error {
	host, k8sSpec, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	pkgs := ksApp.CfgFile.GetStringSlice("packages")
	if pkgs == nil {
		pkgs = kstypes.DefaultPackages
		ksApp.CfgFile.Set("packages", pkgs)
	}
	ksApp.KsApp.Spec.Packages = pkgs
	comps := ksApp.CfgFile.GetStringSlice("components")
	if comps == nil {
		comps = kstypes.DefaultComponents
		ksApp.CfgFile.Set("components", comps)
	}
	ksApp.KsApp.Spec.Components = comps
	ksApp.KsApp.Spec.Parameters = kstypes.DefaultParameters
	parameters := ksApp.CfgFile.GetStringMapStringSlice("parameters")
	if len(parameters) > 0 {
		for comp, parms := range parameters {
			plen := len(parms)
			nvlen := plen / 2
			nv := make([]kstypes.NameValue, nvlen)
			ksApp.KsApp.Spec.Parameters[comp] = nv
			j := 0
			for i := 0; i < plen; i += 2 {
				name := parms[i]
				value := parms[i+1]
				nv[j] = kstypes.NameValue{
					Name:  name,
					Value: value,
				}
				j++
			}
		}
	}
	writeConfigErr := ksApp.writeConfigFile()
	if writeConfigErr != nil {
		return fmt.Errorf("couldn't write config file app.yaml in %v Error %v", ksApp.AppDir, writeConfigErr)
	}
	initErr := ksApp.initKs("default", k8sSpec, host, ksApp.KsApp.Namespace)
	if initErr != nil {
		return fmt.Errorf("couldn't initialize KfApi: %v", initErr)
	}
	ksRegistry := kstypes.DefaultRegistry
	ksRegistry.Version = ksApp.KsApp.Spec.Version
	ksRegistry.RegUri = ksApp.KsApp.Spec.Repo
	registryAddErr := ksApp.registryAdd(ksRegistry)
	if registryAddErr != nil {
		return fmt.Errorf("couldn't add registry %v. Error: %v", ksRegistry.Name, registryAddErr)
	}
	packageArray := ksApp.KsApp.Spec.Packages
	for _, pkgName := range packageArray {
		pkg := kstypes.KsPackage{
			Name:     pkgName,
			Registry: "kubeflow",
		}
		packageAddErr := ksApp.pkgInstall(pkg)
		if packageAddErr != nil {
			return fmt.Errorf("couldn't add package %v. Error: %v", pkg.Name, packageAddErr)
		}
	}
	componentArray := ksApp.KsApp.Spec.Components
	for _, compName := range componentArray {
		comp := kstypes.KsComponent{
			Name:      compName,
			Prototype: compName,
		}
		parameterMap := ksApp.KsApp.Spec.Parameters
		parameterArgs := []string{}
		parameters := parameterMap[compName]
		if parameters != nil {
			for _, parameter := range parameters {
				name := "--" + parameter.Name
				parameterArgs = append(parameterArgs, name)
				value := parameter.Value
				parameterArgs = append(parameterArgs, value)
			}
		}
		if compName == "application" {
			parameterArgs = append(parameterArgs, "--components")
			prunedArray := kstypes.RemoveItems(componentArray, "application", "metacontroller")
			quotedArray := kstypes.QuoteItems(prunedArray)
			arrayString := "[" + strings.Join(quotedArray, ",") + "]"
			parameterArgs = append(parameterArgs, arrayString)
		}
		componentAddErr := ksApp.componentAdd(comp, parameterArgs)
		if componentAddErr != nil {
			return fmt.Errorf("couldn't add comp %v. Error: %v", comp.Name, componentAddErr)
		}
	}
	return nil
}

func (ksApp *KsApp) Init() error {
	re := regexp.MustCompile(`[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$`)
	validName := re.FindString(ksApp.AppName)
	if strings.Compare(validName, ksApp.AppName) != 0 {
		return fmt.Errorf(`invalid name %v must consist of lower case alphanumeric characters, '-' or '.',
and must start and end with an alphanumeric character`, ksApp.AppName)
	}
	log.Infof("KsApp.Init AppName %v AppDir %v", ksApp.AppName, ksApp.AppDir)
	err := os.Mkdir(ksApp.AppDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("couldn't create directory %v, most likely it already exists", ksApp.AppDir)
	}
	cfgFilePath := filepath.Join(ksApp.AppDir, kftypes.KfConfigFile)
	_, appDirErr := afero.NewOsFs().Stat(cfgFilePath)
	if appDirErr == nil {
		return fmt.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, ksApp.AppDir)
	}
	namespace := ksApp.CfgFile.GetString("namespace")
	ksApp.KsApp.Namespace = namespace
	kubeflowRepo := ksApp.CfgFile.GetString("repo")
	re = regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	ksApp.KsApp.Spec.Repo = kubeflowRepo
	kubeflowVersion := ksApp.CfgFile.GetString("version")
	ksApp.KsApp.Spec.Version = kubeflowVersion
	createConfigErr := ksApp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", ksApp.AppDir)
	}
	return nil
}

func (ksApp *KsApp) initKs(envName string, k8sSpecFlag string, host string, namespace string) error {
	newRoot := path.Join(ksApp.AppDir, ksApp.KsName)
	ksApp.KsEnvName = envName
	options := map[string]interface{}{
		actions.OptionFs:                    afero.NewOsFs(),
		actions.OptionName:                  ksApp.KsName,
		actions.OptionEnvName:               ksApp.KsEnvName,
		actions.OptionNewRoot:               newRoot,
		actions.OptionServer:                host,
		actions.OptionSpecFlag:              k8sSpecFlag,
		actions.OptionNamespace:             namespace,
		actions.OptionSkipDefaultRegistries: true,
	}
	err := actions.RunInit(options)
	if err != nil {
		return fmt.Errorf("there was a problem initializing the app: %v", err)
	}
	log.Infof("Successfully initialized the app %v.", ksApp.AppName)

	return nil
}

func (ksApp *KsApp) envSet(envName string, host string) error {
	ksApp.KsEnvName = envName
	err := actions.RunEnvSet(map[string]interface{}{
		actions.OptionAppRoot: ksApp.ksRoot(),
		actions.OptionEnvName: ksApp.KsEnvName,
		actions.OptionServer:  host,
	})
	if err != nil {
		return fmt.Errorf("There was a problem setting ksonnet env: %v", err)
	}
	return nil
}

func (ksApp *KsApp) ksRoot() string {
	root := path.Join(ksApp.AppDir, ksApp.KsName)
	return root
}

func (ksApp *KsApp) libraries() (map[string]*kstypes.KsLibrary, error) {
	libs, err := ksApp.KApp.Libraries()
	if err != nil {
		return nil, fmt.Errorf("there was a problem getting the libraries %v. Error: %v", ksApp.AppName, err)
	}

	libraries := make(map[string]*kstypes.KsLibrary)
	for k, v := range libs {
		libraries[k] = &kstypes.KsLibrary{
			Name:     v.Name,
			Registry: v.Registry,
			Version:  v.Version,
		}
	}
	return libraries, nil
}

func (ksApp *KsApp) registries() (map[string]*kstypes.Registry, error) {
	regs, err := ksApp.KApp.Registries()
	if err != nil {
		return nil, fmt.Errorf("There was a problem getting the registries %v. Error: %v", ksApp.AppName, err)
	}
	registries := make(map[string]*kstypes.Registry)
	for k, v := range regs {
		registries[k] = &kstypes.Registry{
			Name:     v.Name,
			Protocol: v.Protocol,
			URI:      v.URI,
		}
	}

	return registries, nil
}

func (ksApp *KsApp) root() string {
	return ksApp.AppDir
}

func (ksApp *KsApp) paramSet(component string, name string, value string) error {
	err := actions.RunParamSet(map[string]interface{}{
		actions.OptionAppRoot: ksApp.ksRoot(),
		actions.OptionName:    component,
		actions.OptionPath:    name,
		actions.OptionValue:   value,
	})
	if err != nil {
		return fmt.Errorf("Error when setting Parameters %v for Component %v: %v", name, component, err)
	}
	return nil
}

func (ksApp *KsApp) pkgInstall(pkg kstypes.KsPackage) error {
	root := ksApp.ksRoot()
	err := actions.RunPkgInstall(map[string]interface{}{
		actions.OptionAppRoot: root,
		actions.OptionPkgName: pkg.Registry + "/" + pkg.Name,
		actions.OptionName:    pkg.Name,
		actions.OptionForce:   false,
	})
	if err != nil {
		return fmt.Errorf("there was a problem installing package %v: %v", pkg.Name, err)
	}
	return nil
}

func (ksApp *KsApp) prototypeUse(m map[string]interface{}) error {
	return nil
}

func (ksApp *KsApp) registryAdd(registry *kstypes.RegistryConfig) error {
	log.Infof("App %v add registry %v URI %v", ksApp.AppName, registry.Name, registry.RegUri)
	root := ksApp.ksRoot()
	options := map[string]interface{}{
		actions.OptionAppRoot:  root,
		actions.OptionName:     registry.Name,
		actions.OptionURI:      registry.RegUri,
		actions.OptionPath:     registry.Path,
		actions.OptionVersion:  registry.Version,
		actions.OptionOverride: false,
	}
	err := actions.RunRegistryAdd(options)
	if err != nil {
		return fmt.Errorf("there was a problem adding registry %v: %v", registry.Name, err)
	}
	return nil
}

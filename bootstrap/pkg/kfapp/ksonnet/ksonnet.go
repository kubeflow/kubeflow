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

package ksonnet

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/ksonnet/ksonnet/pkg/actions"
	"github.com/ksonnet/ksonnet/pkg/app"
	"github.com/ksonnet/ksonnet/pkg/client"
	"github.com/ksonnet/ksonnet/pkg/component"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"io/ioutil"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"time"
)

// Ksonnet implements the KfApp Interface
type ksApp struct {
	kfdefs.KfDef
	// ksonnet root name
	KsName string
	// ksonnet env name
	KsEnvName  string
	KApp       app.App
	restConfig *rest.Config
	apiConfig  *clientcmdapi.Config
}

const (
	KsName    = "ks_app"
	KsEnvName = "default"
)

func GetKfApp(kfdef *kfdefs.KfDef) kftypes.KfApp {
	_kfapp := &ksApp{
		KfDef:     *kfdef,
		KsName:    KsName,
		KsEnvName: KsEnvName,
	}
	ksDir := path.Join(_kfapp.Spec.AppDir, KsName)
	if _, err := os.Stat(ksDir); !os.IsNotExist(err) {
		fs := afero.NewOsFs()
		kApp, kAppErr := app.Load(fs, nil, ksDir)
		if kAppErr != nil {
			log.Fatalf("there was a problem loading ksonnet app from %v. Error: %v", ksDir, kAppErr)
		}
		_kfapp.KApp = kApp
	}
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		_kfapp.Spec.Repo = re.ReplaceAllString(_kfapp.Spec.Repo, goPathVar+`$2`)
	}
	// build restConfig and apiConfig using $HOME/.kube/config if the file exist
	_kfapp.restConfig = kftypes.GetConfig()
	_kfapp.apiConfig = kftypes.GetKubeConfig()
	return _kfapp
}

// Apply applies the ksonnet components to target k8s cluster.
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (ksApp *ksApp) Apply(resources kftypes.ResourceEnum) error {
	if ksApp.restConfig == nil || ksApp.apiConfig == nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Error: ksApp has nil restConfig or apiConfig, exit",
		}
	}
	clientset := kftypes.GetClientset(ksApp.restConfig)
	// TODO(gabrielwen): Make env name an option.
	envSetErr := ksApp.envSet(KsEnvName, ksApp.restConfig.Host)
	if envSetErr != nil {
		return &kfapis.KfError{
			Code: envSetErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("couldn't create ksonnet env %v Error: %v",
				KsEnvName, envSetErr.(*kfapis.KfError).Message),
		}
	}
	namespace := ksApp.ObjectMeta.Namespace
	log.Infof(string(kftypes.NAMESPACE)+": %v", namespace)
	_, nsMissingErr := clientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr != nil {
		log.Infof("Creating namespace: %v", namespace)
		nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
		_, nsErr := clientset.CoreV1().Namespaces().Create(nsSpec)
		if nsErr != nil {
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create %v %v Error: %v",
					string(kftypes.NAMESPACE), namespace, nsErr),
			}
		}
	}
	cwd, err := os.Getwd()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}
	if cwd != ksApp.Spec.AppDir {
		err = os.Chdir(ksApp.Spec.AppDir)
		if err != nil {
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("could not change directory to %v Error %v",
					ksApp.Spec.AppDir, err),
			}
		}
	}
	return ksApp.applyComponent(ksApp.Spec.Components, ksApp.apiConfig)
}

func (ksApp *ksApp) getCompsFilePath() string {
	return filepath.Join(ksApp.Spec.AppDir, ksApp.KsName, ksApp.KsEnvName+".yaml")
}

func (ksApp *ksApp) applyComponent(components []string, cfg *clientcmdapi.Config) error {
	applyOptions := map[string]interface{}{
		actions.OptionApp: ksApp.KApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(*cfg, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionComponentNames: components,
		actions.OptionCreate:         true,
		actions.OptionDryRun:         false,
		actions.OptionEnvName:        ksApp.KsEnvName,
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
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("%v failed components in last try", len(components)-len(doneApply)),
		}
	}, bo)
	if err != nil {
		log.Errorf("components apply failed; Error: %v", err)
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("components apply failed; Error: %v", err.Error()),
		}
	} else {
		log.Infof("All components apply succeeded")
		return nil
	}

}

func (ksApp *ksApp) componentAdd(component kfdefs.KsComponent, args []string) error {
	componentPath := filepath.Join(ksApp.ksRoot(), "components", component.Name+".jsonnet")
	componentArgs := make([]string, 0)
	componentArgs = append(componentArgs, component.Prototype)
	componentArgs = append(componentArgs, component.Name)
	if args != nil && len(args) > 0 {
		componentArgs = append(componentArgs, args[0:]...)
	}
	if exists, _ := afero.Exists(afero.NewOsFs(), componentPath); !exists {
		log.Infof("Creating Component: %v ...", component.Name)
		log.Infof("Args: %v", componentArgs)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   ksApp.ksRoot(),
			actions.OptionArguments: componentArgs,
		})
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("there was a problem adding component %v: %v", component.Name, err),
			}
		}
	} else {
		log.Infof("Component %v already exists", component.Name)
	}
	return nil
}

func (ksApp *ksApp) components() (map[string]*kfdefs.KsComponent, error) {
	moduleName := "/"
	topModule := component.NewModule(ksApp.KApp, moduleName)
	components, err := topModule.Components()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("there was a problem getting the components %v. Error: %v", ksApp.Name, err),
		}
	}
	comps := make(map[string]*kfdefs.KsComponent)
	for _, comp := range components {
		name := comp.Name(false)
		comps[name] = &kfdefs.KsComponent{
			Name:      name,
			Prototype: name,
		}
	}
	return comps, nil
}

func (ksApp *ksApp) deleteGlobalResources(config *rest.Config) error {
	apiextclientset := kftypes.GetApiExtClientset(config)
	do := &metav1.DeleteOptions{}
	lo := metav1.ListOptions{
		LabelSelector: kftypes.DefaultAppLabel + "=" + ksApp.Name,
	}
	crdsErr := apiextclientset.CustomResourceDefinitions().DeleteCollection(do, lo)
	if crdsErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete customresourcedefinitions Error: %v", crdsErr),
		}
	}
	crdsByName := []string{
		"compositecontrollers.metacontroller.k8s.io",
		"controllerrevisions.metacontroller.k8s.io",
		"decoratorcontrollers.metacontroller.k8s.io",
		"applications.app.k8s.io",
	}
	for _, crd := range crdsByName {
		do := &metav1.DeleteOptions{}
		dErr := apiextclientset.CustomResourceDefinitions().Delete(crd, do)
		if dErr != nil {
			log.Errorf("could not delete %v Error %v", crd, dErr)
		}
	}
	clientset := kftypes.GetClientset(config)
	crbsErr := clientset.RbacV1().ClusterRoleBindings().DeleteCollection(do, lo)
	if crbsErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't get list of clusterrolebindings Error: %v", crbsErr),
		}
	}
	crbName := "meta-controller-cluster-role-binding"
	dErr := clientset.RbacV1().ClusterRoleBindings().Delete(crbName, do)
	if dErr != nil {
		log.Errorf("could not delete %v Error %v", crbName, dErr)
	}
	crsErr := clientset.RbacV1().ClusterRoles().DeleteCollection(do, lo)
	if crsErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete clusterroles Error: %v", crsErr),
		}
	}
	return nil
}

func (ksApp *ksApp) Delete(resources kftypes.ResourceEnum) error {
	config := kftypes.GetConfig()
	err := ksApp.deleteGlobalResources(config)
	if err != nil {
		log.Errorf("there was a problem deleting global resources: %v", err)
	}
	envSetErr := ksApp.envSet(ksApp.KsEnvName, config.Host)
	if envSetErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't create ksonnet env %v Error: %v", ksApp.KsEnvName, envSetErr),
		}
	}
	clientConfig := kftypes.GetKubeConfig()
	components := []string{"application", "metacontroller"}
	err = actions.RunDelete(map[string]interface{}{
		actions.OptionApp: ksApp.KApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(*clientConfig, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionEnvName:        ksApp.KsEnvName,
		actions.OptionComponentNames: components,
		actions.OptionGracePeriod:    int64(10),
	})
	if err != nil {
		log.Infof("there was a problem deleting %v: %v", components, err)
	}
	namespace := ksApp.ObjectMeta.Namespace
	log.Infof("deleting namespace: %v", namespace)
	clientset := kftypes.GetClientset(config)
	ns, nsMissingErr := clientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr == nil {
		nsErr := clientset.CoreV1().Namespaces().Delete(ns.Name, metav1.NewDeleteOptions(int64(100)))
		if nsErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't delete namespace %v Error: %v", namespace, nsErr),
			}
		}
	}
	name := "meta-controller-cluster-role-binding"
	crb, crbErr := clientset.RbacV1().ClusterRoleBindings().Get(name, metav1.GetOptions{})
	if crbErr == nil {
		crbDeleteErr := clientset.RbacV1().ClusterRoleBindings().Delete(crb.Name, metav1.NewDeleteOptions(int64(5)))
		if crbDeleteErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't delete clusterrolebinding %v Error: %v", name, crbDeleteErr),
			}
		}
	}
	return nil
}

func setNameVal(entries []configtypes.NameValue, name string, val string) []configtypes.NameValue {
	for i, nv := range entries {
		if nv.Name == name {
			log.Infof("Setting %v to %v", name, val)
			entries[i].Value = val
			return entries
		}
	}
	log.Infof("Appending %v as %v", name, val)
	entries = append(entries, configtypes.NameValue{
		Name:  name,
		Value: val,
	})
	return entries
}

// Generate generates ksonnet app in app dir with info in ksApp
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (ksApp *ksApp) Generate(resources kftypes.ResourceEnum) error {
	log.Infof("Ksonnet.Generate Name %v AppDir %v Platform %v", ksApp.Name,
		ksApp.Spec.AppDir, ksApp.Spec.Platform)
	initErr := ksApp.initKs()
	if initErr != nil {
		return &kfapis.KfError{
			Code: initErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("couldn't initialize KfApi: %v",
				initErr.(*kfapis.KfError).Message),
		}
	}

	ksRegistry := kfdefs.DefaultRegistry
	ksRegistry.Version = ksApp.Spec.Version
	ksRegistry.RegUri = ksApp.Spec.Repo
	registryAddErr := ksApp.registryAdd(ksRegistry)
	if registryAddErr != nil {
		return &kfapis.KfError{
			Code: registryAddErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("couldn't add registry %v. Error: %v", ksRegistry.Name,
				registryAddErr.(*kfapis.KfError).Message),
		}
	}
	for _, pkgName := range ksApp.Spec.Packages {
		pkg := kfdefs.KsPackage{
			Name:     pkgName,
			Registry: "kubeflow",
		}
		packageAddErr := ksApp.pkgInstall(pkg)
		if packageAddErr != nil {
			return &kfapis.KfError{
				Code: packageAddErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("couldn't add package %v. Error: %v", pkg.Name,
					packageAddErr.(*kfapis.KfError).Message),
			}
		}
	}
	for _, compName := range ksApp.Spec.Components {
		comp := kfdefs.KsComponent{
			Name:      compName,
			Prototype: compName,
		}
		parameterArgs := []string{}
		if val, ok := ksApp.Spec.ComponentParams[compName]; ok {
			for _, nv := range val {
				if nv.InitRequired {
					name := "--" + nv.Name
					parameterArgs = append(parameterArgs, name)
					parameterArgs = append(parameterArgs, nv.Value)
				}
			}
		}
		componentAddErr := ksApp.componentAdd(comp, parameterArgs)
		if componentAddErr != nil {
			return &kfapis.KfError{
				Code: componentAddErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("couldn't add comp %v. Error: %v", comp.Name,
					componentAddErr.(*kfapis.KfError).Message),
			}
		}
	}
	for compName, namevals := range ksApp.Spec.ComponentParams {
		for _, nv := range namevals {
			args := map[string]interface{}{
				actions.OptionAppRoot: ksApp.ksRoot(),
				actions.OptionName:    compName,
				actions.OptionPath:    nv.Name,
				actions.OptionValue:   nv.Value,
			}
			if err := actions.RunParamSet(args); err != nil {
				return &kfapis.KfError{
					Code: int(kfapis.INVALID_ARGUMENT),
					Message: fmt.Sprintf("Failed to set param %v %v %v: %v",
						compName, nv.Name, nv.Value, err),
				}
			}
		}
	}
	createConfigErr := ksApp.writeConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot write to config file app.yaml in %v", ksApp.Spec.AppDir),
		}
	}
	return nil
}

func (ksApp *ksApp) Init(resources kftypes.ResourceEnum) error {
	ksApp.Spec.Repo = path.Join(path.Join(ksApp.Spec.AppDir, kftypes.DefaultCacheDir, ksApp.Spec.Version), "kubeflow")
	return ksApp.writeConfigFile()
}

func (ksApp *ksApp) initKs() error {
	newRoot := path.Join(ksApp.Spec.AppDir, ksApp.KsName)
	ksApp.KsEnvName = KsEnvName
	k8sSpec := ksApp.Spec.ServerVersion
	host := "127.0.0.1"
	if k8sSpec == "" {
		host = ksApp.restConfig.Host
		k8sSpec = kftypes.GetServerVersion(kftypes.GetClientset(ksApp.restConfig))
		if k8sSpec == "" {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: "could not find kubernetes version info",
			}
		}
	}
	options := map[string]interface{}{
		actions.OptionFs:                    afero.NewOsFs(),
		actions.OptionName:                  ksApp.KsName,
		actions.OptionEnvName:               ksApp.KsEnvName,
		actions.OptionNewRoot:               newRoot,
		actions.OptionServer:                host,
		actions.OptionSpecFlag:              k8sSpec,
		actions.OptionNamespace:             ksApp.Namespace,
		actions.OptionSkipDefaultRegistries: true,
	}
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 5)
	err := backoff.Retry(func() error {
		// Clean up leftovers from previous run if exists
		if initErr := os.RemoveAll(newRoot); initErr != nil {
			log.Warnf("Failed to cleanup app dir from previous run, error: %v. will retry up to 5 times", initErr)
			return initErr
		}
		if initErr := actions.RunInit(options); initErr != nil {
			log.Warnf("app init failed with error: %v. will retry up to 5 times", initErr)
			return initErr
		}
		return nil
	}, bo)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("there was a problem initializing the app: %v", err),
		}
	}
	log.Infof("Successfully initialized the app %v.", ksApp.Name)
	return nil
}

func (ksApp *ksApp) envSet(envName string, host string) error {
	ksApp.KsEnvName = envName
	err := actions.RunEnvSet(map[string]interface{}{
		actions.OptionAppRoot:  ksApp.ksRoot(),
		actions.OptionEnvName:  ksApp.KsEnvName,
		actions.OptionServer:   host,
		actions.OptionOverride: true,
	})
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("There was a problem setting ksonnet env: %v", err),
		}
	}
	loadApp, loadErr := app.Load(afero.NewOsFs(), ksApp.KApp.HTTPClient(), ksApp.ksRoot())
	if loadErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not reload the ksonnet env: %v", err),
		}
	}
	ksApp.KApp = loadApp
	return nil
}

func (ksApp *ksApp) ksRoot() string {
	root := path.Join(ksApp.Spec.AppDir, ksApp.KsName)
	return root
}

func (ksApp *ksApp) libraries() (map[string]*kfdefs.KsLibrary, error) {
	libs, err := ksApp.KApp.Libraries()
	if err != nil {
		return nil, &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("there was a problem getting the libraries %v. Error: %v",
				ksApp.Name, err),
		}
	}

	libraries := make(map[string]*kfdefs.KsLibrary)
	for k, v := range libs {
		libraries[k] = &kfdefs.KsLibrary{
			Name:     v.Name,
			Registry: v.Registry,
			Version:  v.Version,
		}
	}
	return libraries, nil
}

func (ksApp *ksApp) registries() (map[string]*kfdefs.Registry, error) {
	regs, err := ksApp.KApp.Registries()
	if err != nil {
		return nil, &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("There was a problem getting the registries %v. Error: %v",
				ksApp.Name, err),
		}
	}
	registries := make(map[string]*kfdefs.Registry)
	for k, v := range regs {
		registries[k] = &kfdefs.Registry{
			Name:     v.Name,
			Protocol: v.Protocol,
			URI:      v.URI,
		}
	}

	return registries, nil
}

func (ksApp *ksApp) paramSet(component string, name string, value string) error {
	err := actions.RunParamSet(map[string]interface{}{
		actions.OptionAppRoot: ksApp.ksRoot(),
		actions.OptionName:    component,
		actions.OptionPath:    name,
		actions.OptionValue:   value,
	})
	if err != nil {
		return &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when setting Parameters %v for Component %v: %v",
				name, component, err),
		}
	}
	return nil
}

func (ksApp *ksApp) pkgInstall(pkg kfdefs.KsPackage) error {
	root := ksApp.ksRoot()
	err := actions.RunPkgInstall(map[string]interface{}{
		actions.OptionAppRoot: root,
		actions.OptionPkgName: pkg.Registry + "/" + pkg.Name,
		actions.OptionName:    pkg.Name,
		actions.OptionForce:   false,
	})
	if err != nil {
		return &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("there was a problem installing package %v: %v",
				pkg.Name, err),
		}
	}
	return nil
}

func (ksApp *ksApp) prototypeUse(m map[string]interface{}) error {
	return nil
}

func (ksApp *ksApp) registryAdd(registry *kfdefs.RegistryConfig) error {
	log.Infof("App %v add registry %v URI %v", ksApp.Name, registry.Name, registry.RegUri)
	root := ksApp.ksRoot()
	options := map[string]interface{}{
		actions.OptionAppRoot:  root,
		actions.OptionName:     registry.Name,
		actions.OptionURI:      registry.RegUri,
		actions.OptionVersion:  registry.Version,
		actions.OptionOverride: false,
	}
	err := actions.RunRegistryAdd(options)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("there was a problem adding registry %v: %v", registry.Name, err),
		}
	}
	return nil
}

func (ksApp *ksApp) Show(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	capture := kftypes.Capture()
	err := actions.RunShow(map[string]interface{}{
		actions.OptionApp:            ksApp.KApp,
		actions.OptionComponentNames: []string{},
		actions.OptionEnvName:        ksApp.KsEnvName,
		actions.OptionFormat:         "yaml",
	})
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("there was a problem calling show: %v", err),
		}
	}
	yamlDir := filepath.Join(ksApp.Spec.AppDir, "yamls")
	err = os.Mkdir(yamlDir, os.ModePerm)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't create directory %v, most likely it already exists", yamlDir),
		}
	}
	output, outputErr := capture()
	if outputErr != nil {
		return &kfapis.KfError{
			Code: outputErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("there was a problem calling capture: %v",
				outputErr.(*kfapis.KfError).Message),
		}
	}
	yamlFile := filepath.Join(yamlDir, "default.yaml")
	yamlFileErr := ioutil.WriteFile(yamlFile, []byte(output), 0644)
	if yamlFileErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not write to %v Error %v", yamlFile, yamlFileErr),
		}
	}
	return nil
}

func (ksApp *ksApp) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(&ksApp.KfDef)
	if bufErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: bufErr.Error(),
		}
	}
	cfgFilePath := filepath.Join(ksApp.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: cfgFilePathErr.Error(),
		}
	}
	return nil
}

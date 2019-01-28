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
	"bytes"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ksonnet/ksonnet/pkg/actions"
	"github.com/ksonnet/ksonnet/pkg/app"
	"github.com/ksonnet/ksonnet/pkg/client"
	"github.com/ksonnet/ksonnet/pkg/component"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/viper"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"math/rand"
	"os"
	"path"
	"path/filepath"
	"reflect"
	"regexp"
	"text/template"
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
				Components: []string{"all"},
				Packages:   []string{"all"},
				App: kstypes.AppConfig{
					Registries: []*kstypes.RegistryConfig{
						{
							Name: "kubeflow",
							Repo: "https://github.com/kubeflow/kubeflow.git",
							Path: "kubeflow",
						},
					},
					Packages:   []kstypes.KsPackage{},
					Components: []kstypes.KsComponent{},
					Parameters: []kstypes.KsParameter{
						{
							Component: "spartakus",
							Name:      "usageId",
							Value:     fmt.Sprintf("%08d", 10000000+rand.Intn(90000000)),
						},
						{
							Component: "spartakus",
							Name:      "reportUsage",
							Value:     "true",
						},
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
	return _kfapp
}

var KsAppTemplate = string(`
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
metadata:
  name: {{.Name}}
  namespace: {{.Namespace}}
spec:
  platform: {{.Spec.Platform}}
  repo: {{.Spec.Repo}}
  version: {{.Spec.Version}}
  packages: {{.Spec.Packages}}
  components: {{.Spec.Components}}
  app:
    registries:
{{range $registry := .Spec.App.Registries }}
      - name: {{$registry.Name}}
        repo: {{$registry.Repo}}
        version: {{$registry.Version}}
        path: {{$registry.Path}}
        RegUri: {{$registry.RegUri}}
{{end}}
    packages:
{{range $package := .Spec.App.Packages }}
      - name: {{$package.Name}}
        registry: {{$package.Registry}}
{{end}}
    components:
{{range $component := .Spec.App.Components }}
      - name: {{$component.Name}}
        prototype: {{$component.Prototype}}
{{end}}
    parameters:
{{range $parameter := .Spec.App.Parameters }}
      - component: {{$parameter.Component}}
        name: {{$parameter.Name}}
        value: {{$parameter.Value}}
{{end}}
`)

func (ksApp *KsApp) writeConfigFile() error {
	tmpl, tmplErr := template.New(kftypes.KfConfigFile).Parse(KsAppTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, ksApp.KsApp)
	if execErr != nil {
		return execErr
	}
	cfgFile := viper.New()
	cfgFile.SetConfigName("app")
	cfgFile.SetConfigType("yaml")
	cfgFileErr := cfgFile.ReadConfig(bytes.NewBuffer(buf.Bytes()))
	if cfgFileErr != nil {
		return cfgFileErr
	}
	cfgFilePath := filepath.Join(ksApp.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := cfgFile.WriteConfigAs(cfgFilePath)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (ksApp *KsApp) Apply() error {
	host, _, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	cli, cliErr := kftypes.GetClientOutOfCluster()
	if cliErr != nil {
		return fmt.Errorf("couldn't create client Error: %v", cliErr)
	}
	envSetErr := ksApp.EnvSet(kstypes.KsEnvName, host)
	if envSetErr != nil {
		return fmt.Errorf("couldn't create ksonnet env %v Error: %v", kstypes.KsEnvName, envSetErr)
	}
	//ks param set application name ${DEPLOYMENT_NAME}
	name := ksApp.KsApp.Name
	paramSetErr := ksApp.ParamSet("application", "name", name)
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
	components := []string{"metacontroller"}
	applyErr := ksApp.ApplyComponent(components, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't apply metacontroller Error: %v", applyErr)
	}
	components = []string{"application"}
	applyErr = ksApp.ApplyComponent(components, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't apply application Error: %v", applyErr)
	}
	return nil
}

func (ksApp *KsApp) ApplyComponent(components []string, cfg *clientcmdapi.Config) error {
	applyOptions := map[string]interface{}{
		actions.OptionApp: ksApp.KApp,
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(*cfg, &clientcmd.ConfigOverrides{}),
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

func (ksApp *KsApp) ComponentAdd(component kstypes.KsComponent, args []string) error {
	componentPath := filepath.Join(ksApp.KsRoot(), "components", component.Name+".jsonnet")
	componentArgs := make([]string, 0)
	componentArgs = append(componentArgs, component.Prototype)
	componentArgs = append(componentArgs, component.Name)
	if args != nil && len(args) > 0 {
		componentArgs = append(componentArgs, args[0:]...)
	}
	if exists, _ := afero.Exists(afero.NewOsFs(), componentPath); !exists {
		log.Infof("Creating Component: %v ...", component.Name)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   ksApp.KsRoot(),
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

func (ksApp *KsApp) Components() (map[string]*kstypes.KsComponent, error) {
	moduleName := "/"
	topModule := component.NewModule(ksApp.KApp, moduleName)
	components, err := topModule.Components()
	if err != nil {
		return nil, fmt.Errorf("there was a problem getting the Components %v. Error: %v", ksApp.AppName, err)
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

func (ksApp *KsApp) Delete() error {
	return nil
}

func (ksApp *KsApp) Generate(resources kftypes.ResourceEnum) error {
	host, k8sSpec, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	namespace := ksApp.CfgFile.GetString("namespace")
	ksApp.KsApp.Namespace = namespace
	components := ksApp.CfgFile.GetStringSlice("components")
	ksApp.KsApp.Spec.Components = components
	packages := ksApp.CfgFile.GetStringSlice("packages")
	ksApp.KsApp.Spec.Packages = packages
	writeConfigErr := ksApp.writeConfigFile()
	if writeConfigErr != nil {
		return fmt.Errorf("couldn't write config file app.yaml in %v Error %v", ksApp.AppDir, writeConfigErr)
	}
	initErr := ksApp.InitKs("default", k8sSpec, host, namespace)
	if initErr != nil {
		return fmt.Errorf("couldn't initialize KfApi: %v", initErr)
	}
	for _, registry := range ksApp.KsApp.Spec.App.Registries {
		registryAddErr := ksApp.RegistryAdd(registry)
		if registryAddErr != nil {
			return fmt.Errorf("couldn't add registry %v. Error: %v", registry.Name, registryAddErr)
		}
	}
	packageArray := ksApp.KsApp.Spec.Packages
	if len(packageArray) == 1 && packageArray[0] == "all" {
		packageArray = []string{
			"application",
			"argo",
			"common",
			"examples",
			"jupyter",
			"katib",
			"metacontroller",
			"modeldb",
			"mpi-job",
			"openvino",
			"pipeline",
			"profiles",
			"pytorch-job",
			"seldon",
			"tensorboard",
			"tf-serving",
			"tf-training",
		}
		for _, pkgName := range packageArray {
			pkg := kstypes.KsPackage{
				Name:     pkgName,
				Registry: "kubeflow",
			}
			packageAddErr := ksApp.PkgInstall(pkg)
			if packageAddErr != nil {
				return fmt.Errorf("couldn't add package %v. Error: %v", pkg.Name, packageAddErr)
			}
		}
	}
	componentArray := ksApp.KsApp.Spec.Components
	if len(componentArray) == 1 && componentArray[0] == "all" {
		componentArray = []string{
			"ambassador",
			"application",
			"argo",
			"centraldashboard",
			"jupyter",
			"katib",
			"metacontroller",
			"notebooks",
			"openvino",
			"pipeline",
			"profiles",
			"pytorch-operator",
			"spartakus",
			"tensorboard",
			"tf-job-operator",
		}
		for _, compName := range componentArray {
			comp := kstypes.KsComponent{
				Name:      compName,
				Prototype: compName,
			}
			componentAddErr := ksApp.ComponentAdd(comp, []string{})
			if componentAddErr != nil {
				return fmt.Errorf("couldn't add comp %v. Error: %v", comp.Name, componentAddErr)
			}
		}
	}
	for _, parameter := range ksApp.KsApp.Spec.App.Parameters {
		parameterSetErr := ksApp.ParamSet(parameter.Component, parameter.Name, parameter.Value)
		if parameterSetErr != nil {
			return fmt.Errorf("couldn't set %v for comp %v. Error: %v",
				parameter.Name, parameter.Component, parameterSetErr)
		}
	}
	return nil
}

func (ksApp *KsApp) Init() error {
	//TODO must be checked eg `kfctl init kf_app` results in
	// metadata.name: Invalid value:
	// "kf_app-controller": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.',
	// and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is
	// '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
	log.Infof("KsApp.Init AppName %v AppDir %v", ksApp.AppName, ksApp.AppDir)
	err := os.Mkdir(ksApp.AppDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", ksApp.AppDir)
	}
	CfgFilePath := filepath.Join(ksApp.AppDir, kftypes.KfConfigFile)
	_, appDirErr := afero.NewOsFs().Stat(CfgFilePath)
	if appDirErr == nil {
		return fmt.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, ksApp.AppDir)
	}
	kubeflowRepo := ksApp.CfgFile.GetString("repo")
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	ksApp.KsApp.Spec.Repo = kubeflowRepo
	kubeflowVersion := ksApp.CfgFile.GetString("version")
	ksApp.KsApp.Spec.Version = kubeflowVersion
	for _, registry := range ksApp.KsApp.Spec.App.Registries {
		if registry.Name == "kubeflow" {
			registry.RegUri = ksApp.KsApp.Spec.Repo
			registry.Version = ksApp.KsApp.Spec.Version
		}
	}
	createConfigErr := ksApp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", ksApp.AppDir)
	}
	return nil
}

func (ksApp *KsApp) InitKs(envName string, k8sSpecFlag string, host string, namespace string) error {
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

func (ksApp *KsApp) EnvSet(envName string, host string) error {
	ksApp.KsEnvName = envName
	err := actions.RunEnvSet(map[string]interface{}{
		actions.OptionAppRoot: ksApp.KsRoot(),
		actions.OptionEnvName: ksApp.KsEnvName,
		actions.OptionServer:  host,
	})
	if err != nil {
		return fmt.Errorf("There was a problem setting ksonnet env: %v", err)
	}
	return nil
}

func (ksApp *KsApp) KsRoot() string {
	root := path.Join(ksApp.AppDir, ksApp.KsName)
	return root
}

func (ksApp *KsApp) Libraries() (map[string]*kstypes.KsLibrary, error) {
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

func (ksApp *KsApp) Registries() (map[string]*kstypes.Registry, error) {
	regs, err := ksApp.KApp.Registries()
	if err != nil {
		return nil, fmt.Errorf("There was a problem getting the Registries %v. Error: %v", ksApp.AppName, err)
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

func (ksApp *KsApp) Root() string {
	return ksApp.AppDir
}

func (ksApp *KsApp) ParamSet(component string, name string, value string) error {
	err := actions.RunParamSet(map[string]interface{}{
		actions.OptionAppRoot: ksApp.KsRoot(),
		actions.OptionName:    component,
		actions.OptionPath:    name,
		actions.OptionValue:   value,
	})
	if err != nil {
		return fmt.Errorf("Error when setting Parameters %v for Component %v: %v", name, component, err)
	}
	return nil
}

func (ksApp *KsApp) PkgInstall(pkg kstypes.KsPackage) error {
	root := ksApp.KsRoot()
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

func (ksApp *KsApp) PrototypeUse(m map[string]interface{}) error {
	return nil
}

func (ksApp *KsApp) RegistryAdd(registry *kstypes.RegistryConfig) error {
	log.Infof("App %v add registry %v URI %v", ksApp.AppName, registry.Name, registry.RegUri)
	root := ksApp.KsRoot()
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

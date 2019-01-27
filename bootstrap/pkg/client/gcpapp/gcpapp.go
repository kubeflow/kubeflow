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

package gcpapp

import (
	"bytes"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ksonnet/ksonnet/pkg/actions"
	"github.com/ksonnet/ksonnet/pkg/client"
	"github.com/ksonnet/ksonnet/pkg/component"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
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

// GcpApp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type GcpApp struct {
	ksApp *ksapp.KsApp
	//TODO add additional types required for gcp platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_gcpapp := &GcpApp{
		ksApp: &ksapp.KsApp{
			AppName:   "",
			AppDir:    "",
			KsName:    kstypes.KsName,
			KsEnvName: kstypes.KsEnvName,
			Fs:        nil,
			CfgFile:   nil,
			KApp:      nil,
			KsApp: kstypes.KsApp{
				TypeMeta: metav1.TypeMeta{
					Kind:       "KsApp",
					APIVersion: "ksapp.apps.kubeflow.org/v1alpha1",
				},
				ObjectMeta: metav1.ObjectMeta{
					Name: "",
				},
				Spec: kstypes.KsAppSpec{
					Platform:   "gcp",
					Version:    "",
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
		},
	}
	_gcpapp.ksApp.KsApp.Name = options["AppName"].(string)
	for k, v := range options {
		x := reflect.ValueOf(_gcpapp.ksApp).Elem().FieldByName(k)
		x.Set(reflect.ValueOf(v))
	}
	return _gcpapp
}

var GcpAppTemplate = string(`
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
metadata: 
  name: {{.ObjectMeta.Name}}
  namespace: {{.ObjectMeta.Namespace}}
spec:
  platform: {{.Spec.Platform}}
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

func (gcpApp *GcpApp) writeConfigFile() error {
	tmpl, tmplErr := template.New(kftypes.KfConfigFile).Parse(GcpAppTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, gcpApp.ksApp.KsApp)
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
	cfgFilePath := filepath.Join(gcpApp.ksApp.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := cfgFile.WriteConfigAs(cfgFilePath)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (gcpApp *GcpApp) Apply() error {
	host, _, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	cli, cliErr := kftypes.GetClientOutOfCluster()
	if cliErr != nil {
		return fmt.Errorf("couldn't create client Error: %v", cliErr)
	}
	envSetErr := gcpApp.EnvSet(kstypes.KsEnvName, host)
	if envSetErr != nil {
		return fmt.Errorf("couldn't create ksonnet env %v Error: %v", kstypes.KsEnvName, envSetErr)
	}
	//ks param set application name ${DEPLOYMENT_NAME}
	name := gcpApp.ksApp.KsApp.Name
	paramSetErr := gcpApp.ParamSet("application", "name", name)
	if paramSetErr != nil {
		return fmt.Errorf("couldn't set application component's name to %v Error: %v", name, paramSetErr)
	}
	namespace := os.Getenv("K8S_NAMESPACE")
	if namespace == "" {
		namespace = kftypes.DefaultNamespace
	}
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
	applyErr := gcpApp.ApplyComponent(components, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't apply metacontroller Error: %v", applyErr)
	}
	components = []string{"application"}
	applyErr = gcpApp.ApplyComponent(components, clientConfig)
	if applyErr != nil {
		return fmt.Errorf("couldn't apply application Error: %v", applyErr)
	}
	return nil
}

func (gcpApp *GcpApp) ApplyComponent(components []string, cfg *clientcmdapi.Config) error {
	applyOptions := map[string]interface{}{
		actions.OptionApp: gcpApp.ksApp.KApp,
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

func (gcpApp *GcpApp) ComponentAdd(component kstypes.KsComponent, args []string) error {
	componentPath := filepath.Join(gcpApp.KsRoot(), "components", component.Name+".jsonnet")
	componentArgs := make([]string, 0)
	componentArgs = append(componentArgs, component.Prototype)
	componentArgs = append(componentArgs, component.Name)
	if args != nil && len(args) > 0 {
		componentArgs = append(componentArgs, args[0:]...)
	}
	if exists, _ := afero.Exists(gcpApp.ksApp.Fs, componentPath); !exists {
		log.Infof("Creating Component: %v ...", component.Name)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   gcpApp.KsRoot(),
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

func (gcpApp *GcpApp) Components() (map[string]*kstypes.KsComponent, error) {
	moduleName := "/"

	topModule := component.NewModule(gcpApp.ksApp.KApp, moduleName)
	components, err := topModule.Components()
	if err != nil {
		return nil, fmt.Errorf("there was a problem getting the Components %v. Error: %v", gcpApp.ksApp.AppName, err)
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

func (gcpApp *GcpApp) Delete() error {
	return nil
}

func (gcpApp *GcpApp) Generate() error {
	host, k8sSpec, err := kftypes.ServerVersion()
	if err != nil {
		return fmt.Errorf("couldn't get server version: %v", err)
	}
	namespace := os.Getenv("K8S_NAMESPACE")
	writeConfigErr := gcpApp.writeConfigFile()
	if writeConfigErr != nil {
		return fmt.Errorf("couldn't write config file app.yaml in %v Error %v", gcpApp.ksApp.AppDir, writeConfigErr)
	}
	initErr := gcpApp.InitKs("default", k8sSpec, host, namespace)
	if initErr != nil {
		return fmt.Errorf("couldn't initialize KfApi: %v", initErr)
	}
	for _, registry := range gcpApp.ksApp.KsApp.Spec.App.Registries {
		registryAddErr := gcpApp.RegistryAdd(registry)
		if registryAddErr != nil {
			return fmt.Errorf("couldn't add registry %v. Error: %v", registry.Name, registryAddErr)
		}
	}
	for _, pkg := range gcpApp.ksApp.KsApp.Spec.App.Packages {
		packageAddErr := gcpApp.PkgInstall(pkg)
		if packageAddErr != nil {
			return fmt.Errorf("couldn't add package %v. Error: %v", pkg.Name, packageAddErr)
		}
	}
	for _, comp := range gcpApp.ksApp.KsApp.Spec.App.Components {
		componentAddErr := gcpApp.ComponentAdd(comp, []string{})
		if componentAddErr != nil {
			return fmt.Errorf("couldn't add comp %v. Error: %v", comp.Name, componentAddErr)
		}
	}
	for _, parameter := range gcpApp.ksApp.KsApp.Spec.App.Parameters {
		parameterSetErr := gcpApp.ParamSet(parameter.Component, parameter.Name, parameter.Value)
		if parameterSetErr != nil {
			return fmt.Errorf("couldn't set %v for comp %v. Error: %v",
				parameter.Name, parameter.Component, parameterSetErr)
		}
	}
	return nil
}

func (gcpApp *GcpApp) Init() error {
	//TODO must be checked eg `kfctl init kf_app` results in
	// metadata.name: Invalid value:
	// "kf_app-controller": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.',
	// and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is
	// '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
	log.Infof("GcpApp.Init AppName %v AppDir %v", gcpApp.ksApp.AppName, gcpApp.ksApp.AppDir)
	err := os.Mkdir(gcpApp.ksApp.AppDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", gcpApp.ksApp.AppDir)
	}
	fs := afero.NewOsFs()
	CfgFilePath := filepath.Join(gcpApp.ksApp.AppDir, kftypes.KfConfigFile)
	_, appDirErr := fs.Stat(CfgFilePath)
	if appDirErr == nil {
		return fmt.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, gcpApp.ksApp.AppDir)
	}
	kubeflowRepo := gcpApp.ksApp.CfgFile.GetString("repo")
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	gcpApp.ksApp.KsApp.Spec.Repo = kubeflowRepo
	kubeflowVersion := gcpApp.ksApp.CfgFile.GetString("version")
	gcpApp.ksApp.KsApp.Spec.Version = kubeflowVersion
	for _, registry := range gcpApp.ksApp.KsApp.Spec.App.Registries {
		if registry.Name == "kubeflow" {
			registry.RegUri = gcpApp.ksApp.KsApp.Spec.Repo
			registry.Version = gcpApp.ksApp.KsApp.Spec.Version
		}
	}
	createConfigErr := gcpApp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcpApp.ksApp.AppDir)
	}
	return nil
}

func (gcpApp *GcpApp) InitKs(envName string, k8sSpecFlag string, host string, namespace string) error {
	newRoot := path.Join(gcpApp.ksApp.AppDir, gcpApp.ksApp.KsName)
	gcpApp.ksApp.KsEnvName = envName
	options := map[string]interface{}{
		actions.OptionFs:                    gcpApp.ksApp.Fs,
		actions.OptionName:                  gcpApp.ksApp.KsName,
		actions.OptionEnvName:               gcpApp.ksApp.KsEnvName,
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
	log.Infof("Successfully initialized the app %v.", gcpApp.ksApp.AppName)

	return nil
}

func (gcpApp *GcpApp) EnvSet(envName string, host string) error {
	gcpApp.ksApp.KsEnvName = envName
	err := actions.RunEnvSet(map[string]interface{}{
		actions.OptionAppRoot: gcpApp.KsRoot(),
		actions.OptionEnvName: gcpApp.ksApp.KsEnvName,
		actions.OptionServer:  host,
	})
	if err != nil {
		return fmt.Errorf("There was a problem setting ksonnet env: %v", err)
	}
	return nil
}

func (gcpApp *GcpApp) KsRoot() string {
	root := path.Join(gcpApp.ksApp.AppDir, gcpApp.ksApp.KsName)
	return root
}

func (gcpApp *GcpApp) Libraries() (map[string]*kstypes.KsLibrary, error) {
	libs, err := gcpApp.ksApp.KApp.Libraries()
	if err != nil {
		return nil, fmt.Errorf("there was a problem getting the libraries %v. Error: %v", gcpApp.ksApp.AppName, err)
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

func (gcpApp *GcpApp) Registries() (map[string]*kstypes.Registry, error) {
	regs, err := gcpApp.ksApp.KApp.Registries()
	if err != nil {
		return nil, fmt.Errorf("There was a problem getting the Registries %v. Error: %v", gcpApp.ksApp.AppName, err)
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

func (gcpApp *GcpApp) Root() string {
	return gcpApp.ksApp.AppDir
}

func (gcpApp *GcpApp) ParamSet(component string, name string, value string) error {
	err := actions.RunParamSet(map[string]interface{}{
		actions.OptionAppRoot: gcpApp.KsRoot(),
		actions.OptionName:    component,
		actions.OptionPath:    name,
		actions.OptionValue:   value,
	})
	if err != nil {
		return fmt.Errorf("Error when setting Parameters %v for Component %v: %v", name, component, err)
	}
	return nil
}

func (gcpApp *GcpApp) PkgInstall(pkg kstypes.KsPackage) error {
	root := gcpApp.KsRoot()
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

func (gcpApp *GcpApp) PrototypeUse(m map[string]interface{}) error {
	return nil
}

func (gcpApp *GcpApp) RegistryAdd(registry *kstypes.RegistryConfig) error {
	log.Infof("App %v add registry %v URI %v", gcpApp.ksApp.AppName, registry.Name, registry.RegUri)
	root := gcpApp.KsRoot()
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

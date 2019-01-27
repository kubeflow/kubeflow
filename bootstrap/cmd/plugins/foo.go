package main

import (
	"bytes"
	"fmt"
	"github.com/ksonnet/ksonnet/pkg/app"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/viper"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"math/rand"
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"text/template"
)

// FooApp implements the KfApp Interface
type FooApp struct {
	AppName string
	// AppDir is the directory where apps should be stored.
	AppDir string
	// ksonnet root name
	KsName string
	// ksonnet env name
	KsEnvName string
	CfgFile   *viper.Viper
	Fs        afero.Fs
	KApp      app.App
	FooApp    kstypes.KsApp
}

func GetFooApp(options map[string]interface{}) kftypes.KfApp {
	_fooapp := &FooApp{
		AppName:   "",
		AppDir:    "",
		KsName:    kstypes.KsName,
		KsEnvName: kstypes.KsEnvName,
		Fs:        nil,
		CfgFile:   nil,
		KApp:      nil,
		FooApp: kstypes.KsApp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "KsApp",
				APIVersion: "ksapp.apps.kubeflow.org/v1alpha1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name: "",
			},
			Spec: kstypes.KsAppSpec{
				Platform:   "foo",
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
	}
	_fooapp.FooApp.Name = options["AppName"].(string)
	for k, v := range options {
		x := reflect.ValueOf(_fooapp).Elem().FieldByName(k)
		x.Set(reflect.ValueOf(v))
	}
	return _fooapp
}

var FooAppTemplate = string(`
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

func (fooApp *FooApp) writeConfigFile() error {
	tmpl, tmplErr := template.New(kftypes.KfConfigFile).Parse(FooAppTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, fooApp.FooApp)
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
	cfgFilePath := filepath.Join(fooApp.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := cfgFile.WriteConfigAs(cfgFilePath)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (fooApp *FooApp) Apply() error {
	log.Infof("FooApp.Apply")
	return nil
}

func (fooApp *FooApp) Delete() error {
	log.Infof("FooApp.Delete")
	return nil
}

func (fooApp *FooApp) Generate() error {
	log.Infof("FooApp.Generate")
	return nil
}

func (fooApp *FooApp) Init() error {
	log.Infof("FooApp.Init AppName %v AppDir %v", fooApp.AppName, fooApp.AppDir)
	err := os.Mkdir(fooApp.AppDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", fooApp.AppDir)
	}
	fs := afero.NewOsFs()
	cfgFilePath := filepath.Join(fooApp.AppDir, kftypes.KfConfigFile)
	_, appDirErr := fs.Stat(cfgFilePath)
	if appDirErr == nil {
		return fmt.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, fooApp.AppDir)
	}
	kubeflowRepo := fooApp.CfgFile.GetString("repo")
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	fooApp.FooApp.Spec.Repo = kubeflowRepo
	kubeflowVersion := fooApp.CfgFile.GetString("version")
	fooApp.FooApp.Spec.Version = kubeflowVersion
	for _, registry := range fooApp.FooApp.Spec.App.Registries {
		if registry.Name == "kubeflow" {
			registry.RegUri = fooApp.FooApp.Spec.Repo
			registry.Version = fooApp.FooApp.Spec.Version
		}
	}
	createConfigErr := fooApp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", fooApp.AppDir)
	}
	return nil
}

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

// AwsApp implements the KfApp Interface
type AwsApp struct {
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
	AwsApp    kstypes.KsApp
}

func GetAwsApp(options map[string]interface{}) kftypes.KfApp {
	log.Infof("in GetAwsApp!")
	_awsapp := &AwsApp{
		AppName:   "",
		AppDir:    "",
		KsName:    kstypes.KsName,
		KsEnvName: kstypes.KsEnvName,
		Fs:        nil,
		CfgFile:   nil,
		KApp:      nil,
		AwsApp: kstypes.KsApp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "AwsApp",
				APIVersion: "apps.kubeflow.org/v1alpha1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name: "",
			},
			Spec: kstypes.KsAppSpec{
				Platform:   "aws",
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
	_awsapp.AwsApp.Name = options["AppName"].(string)
	for k, v := range options {
		x := reflect.ValueOf(_awsapp).Elem().FieldByName(k)
		x.Set(reflect.ValueOf(v))
	}
	return _awsapp
}

var AwsAppTemplate = string(`
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

func (awsApp *AwsApp) writeConfigFile() error {
	tmpl, tmplErr := template.New(kftypes.KfConfigFile).Parse(AwsAppTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, awsApp.AwsApp)
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
	cfgFilePath := filepath.Join(awsApp.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := cfgFile.WriteConfigAs(cfgFilePath)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (awsApp *AwsApp) Apply() error {
	log.Infof("in AwsApp.Apply!")
	return nil
}

func (awsApp *AwsApp) Delete() error {
	log.Infof("in AwsApp.Delete!")
	return nil
}

func (awsApp *AwsApp) Generate() error {
	log.Infof("in AwsApp.Generate!")
	return nil
}

func (awsApp *AwsApp) Init() error {
	log.Infof("in AwsApp.Init!")
	err := os.Mkdir(awsApp.AppDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", awsApp.AppDir)
	}
	fs := afero.NewOsFs()
	cfgFilePath := filepath.Join(awsApp.AppDir, kftypes.KfConfigFile)
	_, appDirErr := fs.Stat(cfgFilePath)
	if appDirErr == nil {
		return fmt.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, awsApp.AppDir)
	}
	kubeflowRepo := awsApp.CfgFile.GetString("repo")
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	awsApp.AwsApp.Spec.Repo = kubeflowRepo
	kubeflowVersion := awsApp.CfgFile.GetString("version")
	awsApp.AwsApp.Spec.Version = kubeflowVersion
	for _, registry := range awsApp.AwsApp.Spec.App.Registries {
		if registry.Name == "kubeflow" {
			registry.RegUri = awsApp.AwsApp.Spec.Repo
			registry.Version = awsApp.AwsApp.Spec.Version
		}
	}
	createConfigErr := awsApp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", awsApp.AppDir)
	}
	return nil
}

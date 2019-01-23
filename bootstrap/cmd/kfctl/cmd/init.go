// Copyright © 2018 NAME HERE <EMAIL ADDRESS>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"bytes"
	"os"
	"path"
	"path/filepath"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/spf13/viper"
	"text/template"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var platform string

var ApplicationTemplate = string(`
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
spec:
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

func createConfigFiles(cfg *viper.Viper, path string) error {
	tmpl, tmplErr := template.New("default").Parse(ApplicationTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	application := kftypes.Application{
		TypeMeta: metav1.TypeMeta{
			Kind:       "Application",
			APIVersion: "apps.kubeflow.org/v1alpha1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name: "default",
		},
		Spec: kftypes.ApplicationSpec{
			App: kftypes.AppConfig{
				Registries: []*kftypes.RegistryConfig{
					{
						Name:    "kubeflow",
						Repo:    "https://github.com/kubeflow/kubeflow.git",
						Version: "0.4",
						Path:    "kubeflow",
						RegUri:  path,
					},
				},
				Packages: []kftypes.KsPackage{
					//TODO for a list of packages we need to use `kfctl add <registry|pkg|module|component>`
					// (do we need an env var similar to DEFAULT_KUBEFLOW_COMPONENTS)?
				},
				Components: []kftypes.KsComponent{
					//TODO list of components from DEFAULT_KUBEFLOW_COMPONENTS or
					//     if that's not defined then depending on the platform option
					//     platform=none
					//       ["ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator",
					//        "spartakus","argo","pipeline"]
					//     platform=gcp
					//       ["ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator",
					//        "spartakus","argo","pipeline","cloud-endpoints","cert-manager","iap-ingress"]
					//     platform=minikube|docker-for-desktop
					//       ["ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator",
					//        "spartakus","argo","pipeline","katib"]
				},
				Parameters: []kftypes.KsParameter{
					//TODO for a component's parameter list we need to use `kfctl set <component> <name> <value>`
				},
			},
		},
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, application)
	if execErr != nil {
		return execErr
	}
	errDefaultConfig := cfg.ReadConfig(bytes.NewBuffer(buf.Bytes()))
	if errDefaultConfig != nil {
		return errDefaultConfig
	}
	cfg.AutomaticEnv() //TODO need to update application based on DEFAULT_KUBEFLOW_COMPONENTS
	defaultConfig := filepath.Join("default.yaml", path)
	cfg.WriteConfigAs(defaultConfig)
	//TODO need to write out env.sh
	return nil
}

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.WarnLevel)
		if len(args) == 0 {
			log.Errorf("Application name is required")
			return
		}
		appName := args[0]
		dir, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
		appDir := path.Join(dir, appName)
		err = os.Mkdir(appDir, os.ModePerm)
		if err != nil {
			log.Errorf("cannot create directory %v", appDir)
			return
		}
		createConfigErr := createConfigFiles(kfctlConfig, appDir)
		if createConfigErr != nil {
			log.Errorf("cannot create config files in %v", appDir)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
	initCmd.Flags().StringVarP(&platform, "platform", "p", "", "gcp | minikube | docker-for-desktop | ack")
	err := kfctlConfig.BindPFlag("platform", initCmd.Flags().Lookup("platform"))
	if err != nil {
		panic(err.Error())
	}
}

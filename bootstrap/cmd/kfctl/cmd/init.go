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
	"path/filepath"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
	"regexp"
	"text/template"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"

	"os"
)

var platform string

var ApplicationTemplate = string(`
apiVersion: {{.apiVersion}}
kind: {{.kind}}
app:
  registries:
{{range $registry := .Registries }}
    - name: {{$registry.Name}}
      repo: {{$registry.Repo}}
      version: {{$registry.Version}}
      path: {{$registry.Path}}
      RegUri: {{$registry.RegUri}}
{{end}}
  packages:
{{range $package := .Packages }}
    - name: {{$package.Name}}
      registry: {{$package.Registry}}
{{end}}
  components:
{{range $component := .Components }}
    - name: {{$component.Name}}
      prototype: {{$component.Prototype}}
{{end}}
  parameters:
{{range $parameter := .Parameters }}
    - component: {{$parameter.Component}}
      name: {{$parameter.Name}}
      value: {{$parameter.Value}}
{{end}}
`)

func createConfig(cfg *viper.Viper, path string) error {
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
				Registries: []kftypes.RegistryConfig{
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
	return nil
}

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		fs := afero.NewOsFs()
		if len(args) == 0 {
			log.Errorf("appName required")
			return
		}
		path := args[0]
		re := regexp.MustCompile(`^~`)
		if re.MatchString(path) {
			home, err := homedir.Dir()
			if err != nil {
				log.Errorf("can't find home directory")
				return
			}
			path = re.ReplaceAllString(path, home)
		}
		_, err := fs.Stat(path)
		if err == nil {
			log.Errorf("cannot create app in existing directory %v", path)
			return
		}
		appName := regexp.MustCompile(`^.*/`).FindString(path)
		parentDir := regexp.MustCompile(`/*$`).FindString(path)
		_, noParentErr := fs.Stat(parentDir)
		if noParentErr != nil {
			log.Errorf("parent directory does not exist %v", parentDir)
			return
		}
		err = os.Mkdir(path, os.ModePerm)
		if err != nil {
			log.Errorf("cannot create directory %v", path)
			return
		}
		createConfigErr := createConfig(kfctlConfig, path)
		if createConfigErr != nil {
			log.Errorf("cannot create config in %v", path)
			return
		}
		kfApi, kfApiErr := v1alpha1.NewKfApiWithConfig(appName, path, kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApi: %v", kfApiErr)
			return
		}
		initErr := kfApi.Init(appName, "default", "", "", "")
		if initErr != nil {
			log.Errorf("couldn't initialize KfApi: %v", initErr)
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
	initCmd.Flags().StringVarP(&platform, "platform", "p", "", "gcp | minikube | microsk8s")
	err := kfctlConfig.BindPFlag("platform", initCmd.Flags().Lookup("platform"))
	if err != nil {
		panic(err.Error())
	}
}

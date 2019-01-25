// Copyright 2018 The Kubeflow Authors
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
	"fmt"
	"github.com/spf13/afero"
	"math/rand"
	"os"
	"path"
	"path/filepath"
	"regexp"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/spf13/viper"
	"text/template"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var platform string

var KsAppTemplate = string(`
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
metadata: 
  name: {{.ObjectMeta.Name}}
  namespace: {{.ObjectMeta.Namespace}}
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

func createConfigFile(cfg *viper.Viper, appName string, appDir string) error {
	tmpl, tmplErr := template.New(kftypes.KfConfigFile).Parse(KsAppTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	namespace := os.Getenv("K8S_NAMESPACE")
	if namespace == "" {
		namespace = kftypes.DefaultNamespace
	}
	kubeflowRepo := os.Getenv("DEFAULT_KUBEFLOW_REPO")
	if kubeflowRepo == "" {
		kubeflowRepo = kftypes.DefaultKfRepo
	}
	re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
	goPathVar := os.Getenv("GOPATH")
	if goPathVar != "" {
		kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
	}
	log.Infof("kubeflowRepo %v", kubeflowRepo)
	application := kftypes.KsApp{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KsApp",
			APIVersion: "apps.kubeflow.org/v1alpha1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      appName,
			Namespace: namespace,
		},
		Spec: kftypes.KsAppSpec{
			App: kftypes.AppConfig{
				Registries: []*kftypes.RegistryConfig{
					{
						Name:    "kubeflow",
						Repo:    "https://github.com/kubeflow/kubeflow.git",
						Version: "0.4",
						Path:    "kubeflow",
						RegUri:  kubeflowRepo,
					},
				},
				Packages: []kftypes.KsPackage{
					{
						Name:     "argo",
						Registry: "kubeflow",
					},
					{
						Name:     "pipeline",
						Registry: "kubeflow",
					},
					{
						Name:     "common",
						Registry: "kubeflow",
					},
					{
						Name:     "examples",
						Registry: "kubeflow",
					},
					{
						Name:     "jupyter",
						Registry: "kubeflow",
					},
					{
						Name:     "katib",
						Registry: "kubeflow",
					},
					{
						Name:     "mpi-job",
						Registry: "kubeflow",
					},
					{
						Name:     "pytorch-job",
						Registry: "kubeflow",
					},
					{
						Name:     "seldon",
						Registry: "kubeflow",
					},
					{
						Name:     "tf-serving",
						Registry: "kubeflow",
					},
					{
						Name:     "openvino",
						Registry: "kubeflow",
					},
					{
						Name:     "tensorboard",
						Registry: "kubeflow",
					},
					{
						Name:     "tf-training",
						Registry: "kubeflow",
					},
					{
						Name:     "metacontroller",
						Registry: "kubeflow",
					},
					{
						Name:     "profiles",
						Registry: "kubeflow",
					},
					{
						Name:     "application",
						Registry: "kubeflow",
					},
					{
						Name:     "modeldb",
						Registry: "kubeflow",
					},
				},
				Components: []kftypes.KsComponent{
					{
						Name:      "pytorch-operator",
						Prototype: "pytorch-operator",
					},
					{
						Name:      "ambassador",
						Prototype: "ambassador",
					},
					{
						Name:      "openvino",
						Prototype: "openvino",
					},
					{
						Name:      "jupyter",
						Prototype: "jupyter",
					},
					{
						Name:      "centraldashboard",
						Prototype: "centraldashboard",
					},
					{
						Name:      "tf-job-operator",
						Prototype: "tf-job-operator",
					},
					{
						Name:      "tensorboard",
						Prototype: "tensorboard",
					},
					{
						Name:      "metacontroller",
						Prototype: "metacontroller",
					},
					{
						Name:      "profiles",
						Prototype: "profiles",
					},
					{
						Name:      "notebooks",
						Prototype: "notebooks",
					},
					{
						Name:      "argo",
						Prototype: "argo",
					},
					{
						Name:      "pipeline",
						Prototype: "pipeline",
					},
					{
						Name:      "katib",
						Prototype: "katib",
					},
					{
						Name:      "spartakus",
						Prototype: "spartakus",
					},
					{
						Name:      "application",
						Prototype: "application",
					},
				},
				Parameters: []kftypes.KsParameter{
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
	cfgFile := filepath.Join(appDir, kftypes.KfConfigFile)
	cfgFileErr := cfg.WriteConfigAs(cfgFile)
	if cfgFileErr != nil {
		return cfgFileErr
	}
	return nil
}

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		if len(args) == 0 {
			log.Errorf("KsApp name is required")
			return
		}
		appName := args[0]
		//TODO must be checked eg `kfctl init kf_app` results in
		// metadata.name: Invalid value:
		// "kf_app-controller": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.',
		// and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is
		// '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
		dir, err := os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
		appDir := path.Join(dir, appName)
		log.Infof("appDir %v", appDir)
		err = os.Mkdir(appDir, os.ModePerm)
		if err != nil {
			log.Errorf("cannot create directory %v", appDir)
			return
		}
		fs := afero.NewOsFs()
		cfgFilePath := filepath.Join(appDir, kftypes.KfConfigFile)
		_, appDirErr := fs.Stat(cfgFilePath)
		if appDirErr == nil {
			log.Errorf("config file %v already exists in %v", kftypes.KfConfigFile, appDir)
			return
		}
		createConfigErr := createConfigFile(kfctlConfig, appName, appDir)
		if createConfigErr != nil {
			log.Errorf("cannot create config file app.yaml in %v", appDir)
			return
		}
	},
}

func init() {
	initCmd.Flags().StringVarP(&platform, "platform", "p", "", "gcp | minikube | docker-for-desktop | ack")
	rootCmd.AddCommand(initCmd)
}

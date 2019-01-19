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
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
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

var appTemplate = string(`
apiVersion: {{.Version}}\n
kind: KfConfig\n
appAddress: {{.ApiServer}}\n
app:\n
  env:\n
    name: default\n
    targets:\n
    - metacontroller\n
    - application\n
  components:\n
  parameters:\n
  registries:\n
  - name: {{.Registry.Name}}\n
    version: {{.Registry.Version}}\n
    path: {{.Registry.Path}}\n
`)

func createConfig(cfg *viper.Viper, path string) error {
	tmpl, tmplErr := template.New("defaultConfig").Parse(appTemplate)
	if tmplErr != nil {
		return tmplErr
	}
	type Repository struct {
		Name    string
		Version string
		Path    string
	}
	type TemplateData struct {
		ApiServer string
		Repository
	}
	templateData := TemplateData{
		ApiServer: "foo",
		Repository: Repository{
			Name:    "bar",
			Version: "0.4",
			Path:    "kubeflow",
		},
	}
	var buf bytes.Buffer
	execErr := tmpl.Execute(&buf, templateData)
	if execErr != nil {
		return execErr
	}
	errDefaultConfig := kfctlConfig.ReadConfig(bytes.NewBuffer(buf.Bytes()))
	if errDefaultConfig != nil {
		return errDefaultConfig
	}
	kfctlConfig.AutomaticEnv() // read in environment variables that match
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

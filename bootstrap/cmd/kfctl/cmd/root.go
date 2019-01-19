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
	"fmt"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"os"
	"text/template"
)

var cfgFile string
var token string
var url string
var platform string
var appFile string
var kfctlConfig = viper.New()
var appYamlTemplate = string(`
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

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "kfctl",
	Short: "A client tool to create kubeflow applications",
	Long:  `kubeflow client tool`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	rootCmd.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "config file (default is $HOME/.kfctl.yaml)")
	err := kfctlConfig.BindPFlag("config", rootCmd.PersistentFlags().Lookup("config"))
	if err != nil {
		panic(err.Error())
	}
	rootCmd.PersistentFlags().StringVarP(&token, "token", "t", "", "token used in auth header")
	err = kfctlConfig.BindPFlag("token", rootCmd.PersistentFlags().Lookup("token"))
	if err != nil {
		panic(err.Error())
	}

	cobra.OnInitialize(initConfig)
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		kfctlConfig.SetConfigFile(cfgFile)
		fmt.Println("Using config file:", kfctlConfig.ConfigFileUsed())
	} else {
		fs := afero.NewOsFs()
		home, err := homedir.Dir()
		if err != nil {
			panic(err.Error())
		}
		dir, err := fs.Stat(home + "/.kfctl")
		if err != nil {
			tmpl, tmplErr := template.New("defaultConfig").Parse(appYamlTemplate)
			if tmplErr != nil {
				panic(err)
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
				panic(execErr.Error())
			}
			errDefaultConfig := kfctlConfig.ReadConfig(bytes.NewBuffer(buf.Bytes()))
			if errDefaultConfig != nil {
				panic(errDefaultConfig.Error())
			}
		} else {
			if dir.IsDir() {
				_, configErr := fs.Stat(home + "/.kfctl/config")
				if configErr == nil {
					kfctlConfig.SetConfigName("config")
					kfctlConfig.SetConfigType("yaml")
					kfctlConfig.AddConfigPath(dir.Name())
					fileErr := kfctlConfig.ReadInConfig()
					if fileErr != nil {
						panic(fileErr.Error())
					}
				}
			}
		}
	}
	kfctlConfig.AutomaticEnv() // read in environment variables that match

}

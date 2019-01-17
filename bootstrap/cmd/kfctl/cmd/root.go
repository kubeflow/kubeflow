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
	"flag"
	"fmt"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"path/filepath"
)

var cfgFile string
var token string
var url string
var debug bool
var kubeconfig *string
var KfConfig *rest.Config
var platform string
var appFile string
var appYamlTemplate = []byte(
	`appAddress: https://35.203.163.54\n
app:\n
  env:\n
    name: default\n
    targets:\n
    - core\n
    - jupyter\n
  modules:\n
  - name: core\n
    components:\n
    - name: ambassador\n
      prototype: ambassador\n
    - name: centraldashboard\n
      prototype: centraldashboard\n
  - name: jupyter\n
    components:\n
    - name: jupyter\n
      prototype: jupyter\n
  parameters:\n
  - module: core\n
    - component: ambassador\n
      name: ambassadorServiceType\n
      value: LoadBalancer\n
  registries:\n
  - name: kubeflow\n
    version: github.com/kubeflow/kubeflow@v0.3.4\n
    path: kubeflow\n`)

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
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "config file (default is $HOME/.kfctl.yaml)")

	rootCmd.PersistentFlags().StringVarP(&url, "url", "u", "", "url where bootstrapper is running")

	rootCmd.PersistentFlags().StringVarP(&token, "token", "t", "", "token used in auth header")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")

		KfConfig, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
		if err != nil {
			panic(err.Error())
		}
		if err != nil {
			panic(err.Error())
		}

		// Search config in home directory with name ".kfctl" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".kfctl")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
}

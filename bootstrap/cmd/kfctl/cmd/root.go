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
	"fmt"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"os"
	"regexp"
)

var token string
var kfctlConfig = viper.New()

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "kfctl",
	Short: "A client tool to create kubeflow applications",
	Long:  `kubeflow client tool`,
}

func ServerVersion() (host string, version string, err error) {
	restApi, err := v1alpha1.BuildOutOfClusterConfig()
	if err != nil {
		return "", "", fmt.Errorf("couldn't build out-of-cluster config. Error: %v", err)
	}
	clnt, clntErr := kfapi.NewForConfig(restApi)
	if clntErr != nil {
		return "", "", fmt.Errorf("couldn't get clientset. Error: %v", err)
	}
	serverVersion, serverVersionErr := clnt.ServerVersion()
	if serverVersionErr != nil {
		return "", "", fmt.Errorf("couldn't get server version info. Error: %v", serverVersionErr)
	}
	re := regexp.MustCompile("^v[0-9]+.[0-9]+.[0-9]+")
	version = re.FindString(serverVersion.String())
	return restApi.Host, "version:" + version, nil
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
	rootCmd.PersistentFlags().StringVarP(&token, "token", "t", "", "token used in auth header")
	cobra.OnInitialize(initConfig)
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	kfctlConfig.SetConfigName("app")
	kfctlConfig.SetConfigType("yaml")
	kfctlConfig.AddConfigPath(".")
	kfctlConfigErr := kfctlConfig.ReadInConfig()
	if kfctlConfigErr != nil {
		panic(kfctlConfigErr.Error())
	}
}

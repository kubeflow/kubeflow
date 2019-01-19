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
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"os"
)

var token string
var kfctlConfig = viper.New()

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
	rootCmd.PersistentFlags().StringVarP(&token, "token", "t", "", "token used in auth header")
	err := kfctlConfig.BindPFlag("token", rootCmd.PersistentFlags().Lookup("token"))
	if err != nil {
		panic(err.Error())
	}

	cobra.OnInitialize(initConfig)
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	kfctlConfig.SetConfigName("config")
	kfctlConfig.SetConfigType("yaml")
	kfctlConfig.AddConfigPath(".")
	fileErr := kfctlConfig.ReadInConfig()
	if fileErr == nil {
		fmt.Println("Using config file:", kfctlConfig.ConfigFileUsed())
	}
}

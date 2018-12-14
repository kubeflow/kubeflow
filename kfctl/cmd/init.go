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
	"os"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create a kubeflow application template as <name>.yaml.",
	Long:  `Create a kubeflow application template as <name>.yaml.`,
	Run: func(cmd *cobra.Command, args []string) {
		if appName == "" {
			fmt.Print("name required")
			return
		}
		file, err := os.Create(appName + ".yaml")
		if err != nil {
			panic(err)
		}
		defer file.Close()
		_, err = file.Write(appYamlTemplate)
		if err != nil {
			panic(err)
		}
		file.Sync()
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
	createCmd.Flags().StringVarP(&appName, "name", "n", "app", "Name of yaml file")
}

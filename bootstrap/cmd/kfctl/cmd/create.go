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
	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app"
	"gopkg.in/resty.v1"
	"io/ioutil"

	"github.com/spf13/cobra"
)

// createCmd represents the create command
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Send the yaml created from init to the backend server",
	Long:  `Send the yaml created from init to the backend server`,
	Run: func(cmd *cobra.Command, args []string) {
		if appFile == "" {
			fmt.Print("file required")

		}
		var createRequest app.CreateRequest
		data, err := ioutil.ReadFile(appFile)
		if err != nil {
			fmt.Printf("\nError: %v", err)
		}

		err = yaml.Unmarshal([]byte(data), &createRequest)
		if err != nil {
			fmt.Printf("\nError: %v", err)
		}
		var json []byte
		json, err = yaml.YAMLToJSON([]byte(data))
		body := string(json)

		resp, err := resty.R().
			SetHeader("Accept", "application/json").
			SetAuthToken(token).
			SetBody(body).
			Post(url + "/kfctl/apps/create")
		fmt.Printf("\nError: %v", err)
		fmt.Printf("\nResponse Status Code: %v", resp.StatusCode())
		fmt.Printf("\nResponse Body: %s\n", resp.Body())
	},
}

func init() {
	rootCmd.AddCommand(createCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// createCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// createCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
	createCmd.Flags().StringVarP(&appFile, "file", "f", "", "Name of yaml file")

}

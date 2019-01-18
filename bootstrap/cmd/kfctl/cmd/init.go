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
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	"github.com/mitchellh/go-homedir"
	"regexp"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"

	"os"
)

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
		err = os.Mkdir(path, os.ModePerm)
		if err != nil {
			log.Errorf("cannot create directory %v", path)
			return
		}
		appName := regexp.MustCompile(`^.*/`).FindString(path)
		appDir := regexp.MustCompile(`/*$`).FindString(path)
		kfApi, newErr := v1alpha1.NewKfApiWithConfig(appName, appDir, kfctlConfig)
		if newErr != nil {
			log.Errorf("couldn't create a new KfApi: %v", newErr)
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
	createCmd.Flags().StringVarP(&platform, "platform", "p", "none", "Platform")
}

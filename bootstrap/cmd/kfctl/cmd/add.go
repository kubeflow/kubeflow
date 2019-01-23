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
	log "github.com/sirupsen/logrus"
	kfapi "github.com/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"

	"github.com/spf13/cobra"
)

// addCmd represents the add command
var addCmd = &cobra.Command{
	Use:   "add",
	Short: "Add a registry|pkg|module|component to the kubeflow application.",
	Long:  `Add a registry|pkg|module|component to the kubeflow application.`,
	Run: func(cmd *cobra.Command, args []string) {
		log.SetLevel(log.InfoLevel)
		if len(args) == 0 {
			log.Errorf("add type required <registry|package|component>")
			return
		}
		kfApi, kfApiErr := kfapi.NewKfApiWithConfig(kfctlConfig)
		if kfApiErr != nil {
			log.Errorf("couldn't create KfApi: %v", kfApiErr)
			return
		}
		addType := args[0]
		switch addType {
		case "registry":
			log.Infof("registry")
			//TODO get these using Flags and Viper binding
			if len(args) != 6 {
				log.Errorf("add registry --name= --repo= --version= --path= --reguri=")
				return
			}
			name := args[1]
			repo := args[2]
			version := args[3]
			path := args[4]
			reguri := args[5]
			registry := &kftypes.RegistryConfig{
				name,
				repo,
				version,
				path,
				reguri,
			}
			registryAddErr := kfApi.RegistryAdd(registry)
			if registryAddErr != nil {
				log.Errorf("couldn't add registry %v. Error: %v", registry.Name, registryAddErr)
				return
			}
		case "package":
			log.Infof("package")
			//TODO get these using Flags and Viper binding
			if len(args) != 3 {
				log.Errorf("add pkg --name= --registry=")
				return
			}
			name := args[1]
			registry := args[2]
			pkg := kftypes.KsPackage{
				Name: name,
				Registry: registry,
			}
			pkgErr := kfApi.PkgInstall(pkg)
			if pkgErr != nil {
				log.Errorf("couldn't install package %v. Error: %v", pkg.Name, pkgErr)
				return
			}
		case "component":
			log.Infof("component")
			//TODO get these using Flags and Viper binding
			if len(args) != 3 {
				log.Errorf("add component --name= --prototype=")
				return
			}
			name := args[1]
			prototype := args[2]
			component := kftypes.KsComponent{
				Name: name,
				Prototype: prototype,
			}
			componentErr := kfApi.ComponentAdd(component, []string{})
			if componentErr != nil {
				log.Errorf("couldn't add component %v. Error: %v", component.Name, componentErr)
				return
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}

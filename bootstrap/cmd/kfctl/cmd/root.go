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
	"fmt"
	"github.com/ksonnet/ksonnet/pkg/app"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
	"github.com/mitchellh/go-homedir"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
)

func NewKfAppWithNameAndConfig(appName string, cfgFile *viper.Viper) (kftypes.KfApp, error) {
	//appName can be a path
	appDir := path.Dir(appName)
	if appDir == "" {
		cwd, err := os.Getwd()
		if err != nil {
			return nil, fmt.Errorf("could not get current directory %v", err)
		}
		appDir = cwd
	} else {
		if appDir == "~" {
			home, homeErr := homedir.Dir()
			if homeErr != nil {
				return nil, fmt.Errorf("could not get home directory %v", homeErr)
			}
			expanded, expandedErr := homedir.Expand(home)
			if expandedErr != nil {
				return nil, fmt.Errorf("could not expand home directory %v", homeErr)
			}
			appName = path.Base(appName)
			appDir = path.Join(expanded, appName)
		} else {
			appName = path.Base(appName)
			appDir = path.Join(appDir, appName)
		}
	}
	fs := afero.NewOsFs()
	platform := cfgFile.GetString("platform")
	if platform == "none" {
		_kfapp := &ksapp.Kfapp
		_kfapp.AppName = appName
		_kfapp.AppDir = appDir
		_kfapp.Fs = fs
		_kfapp.CfgFile = cfgFile
		_kfapp.KsApp.Spec.Platform = platform
		_kfapp.KsApp.Name = appName
		return _kfapp, nil
	}
	return nil, fmt.Errorf("unknown platform %v", platform)
}

func NewKfAppWithConfig(cfg *viper.Viper) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("could not get current directory %v", err)
	}
	appName := filepath.Base(appDir)
	log.Infof("AppName %v AppDir %v", appName, appDir)
	cfg.AddConfigPath(appDir)
	cfgErr := cfg.ReadInConfig()
	if cfgErr != nil {
		return nil, fmt.Errorf("could not read config file %v Error %v", kftypes.KfConfigFile, cfgErr)
	}
	cfgfile := cfg.ConfigFileUsed()
	if cfgfile == "" {
		return nil, fmt.Errorf("config file does not exist")
	}
	return NewKfApp(appName, appDir, cfg)
}

func NewKfApp(appName string, appDir string, cfgFile *viper.Viper) (kftypes.KfApp, error) {
	fs := afero.NewOsFs()
	ksDir := path.Join(appDir, kftypes.KsName)
	kApp, kAppErr := app.Load(fs, nil, ksDir)
	if kAppErr != nil {
		return nil, fmt.Errorf("there was a problem loading app %v. Error: %v", appName, kAppErr)
	}
	spec := kftypes.KsAppSpec{}
	if cfgFile != nil {
		metadata := v1.ObjectMeta{}
		metadataErr := cfgFile.Sub("metadata").Unmarshal(&metadata)
		if metadataErr != nil {
			return nil, fmt.Errorf("couldn't unmarshall yaml. Error: %v", metadataErr)
		}
		applicationSpecErr := cfgFile.Sub("spec").Unmarshal(&spec)
		if applicationSpecErr != nil {
			return nil, fmt.Errorf("couldn't unmarshall yaml. Error: %v", applicationSpecErr)
		}
		if spec.Platform == "none" {
			_kfapp := &ksapp.Kfapp
			_kfapp.AppName = appName
			_kfapp.AppDir = appDir
			_kfapp.Fs = fs
			_kfapp.KApp = kApp
			_kfapp.CfgFile = cfgFile
			_kfapp.KsApp.ObjectMeta.Name = metadata.Name
			_kfapp.KsApp.ObjectMeta.Namespace = metadata.Namespace
			_kfapp.KsApp.Spec = spec
			_kfapp.KsApp.Name = appName
			return _kfapp, nil
		}
	}
	return nil, fmt.Errorf("unknown platform %v", spec.Platform)
}

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
}

// initConfig creates a Viper config file and set's it's name and type
func initConfig() {
}

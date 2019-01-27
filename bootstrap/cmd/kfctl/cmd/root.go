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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcpapp"
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
	"plugin"
	"strings"
)

func LoadPlatform(platform string, options map[string]interface{}) (kftypes.KfApp, error) {
	switch platform {
	case "none":
		_kfapp := ksapp.GetKfApp(options)
		return _kfapp, nil
	case "gcp":
		_gcpapp := gcpapp.GetKfApp(options)
		return _gcpapp, nil
	default:
		// To enable goland debugger:
		// Comment out this section and comment in the line
		//   return nil, fmt.Errorf("unknown platform %v", platform
		plugindir := os.Getenv("PLUGINS_ENVIRONMENT")
		pluginpath := filepath.Join(plugindir, platform+".so")
		p, err := plugin.Open(pluginpath)
		if err != nil {
			return nil, fmt.Errorf("could not load plugin %v for platform %v Error %v", pluginpath, platform, err)
		}
		symName := "Get" + strings.ToUpper(platform[0:1]) + platform[1:] + "App"
		symbol, symbolErr := p.Lookup(symName)
		if symbolErr != nil {
			return nil, fmt.Errorf("could not find symbol %v for platform %v Error %v", symName, platform, symbolErr)
		}
		return symbol.(func(map[string]interface{}) kftypes.KfApp)(options), nil

		//return nil, fmt.Errorf("unknown platform %v", platform)
	}
}

func NewKfApp(appName string, cfgFile *viper.Viper) (kftypes.KfApp, error) {
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
	platform := cfgFile.GetString("platform")
	options := map[string]interface{}{
		"AppName": appName,
		"AppDir":  appDir,
		"CfgFile": cfgFile,
	}
	app, appErr := LoadPlatform(platform, options)
	if appErr != nil {
		return nil, fmt.Errorf("unable to load platform %v Error: %v", platform, appErr)
	}
	return app, nil
}

func LoadKfApp(cfgFile *viper.Viper) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("could not get current directory %v", err)
	}
	appName := filepath.Base(appDir)
	log.Infof("AppName %v AppDir %v", appName, appDir)
	cfgFile.AddConfigPath(appDir)
	cfgErr := cfgFile.ReadInConfig()
	if cfgErr != nil {
		return nil, fmt.Errorf("could not read config file %v Error %v", kftypes.KfConfigFile, cfgErr)
	}
	cfgfile := cfgFile.ConfigFileUsed()
	if cfgfile == "" {
		return nil, fmt.Errorf("config file does not exist")
	}
	fs := afero.NewOsFs()
	ksDir := path.Join(appDir, kstypes.KsName)
	kApp, kAppErr := app.Load(fs, nil, ksDir)
	if kAppErr != nil {
		return nil, fmt.Errorf("there was a problem loading app %v. Error: %v", appName, kAppErr)
	}
	spec := kstypes.KsAppSpec{}
	metadata := v1.ObjectMeta{}
	metadataErr := cfgFile.Sub("metadata").Unmarshal(&metadata)
	if metadataErr != nil {
		return nil, fmt.Errorf("couldn't unmarshall yaml. Error: %v", metadataErr)
	}
	applicationSpecErr := cfgFile.Sub("spec").Unmarshal(&spec)
	if applicationSpecErr != nil {
		return nil, fmt.Errorf("couldn't unmarshall yaml. Error: %v", applicationSpecErr)
	}
	platform := cfgFile.GetString("platform")
	options := map[string]interface{}{
		"AppName": appName,
		"AppDir":  appDir,
		"CfgFile": cfgFile,
		"KApp":    kApp,
	}
	app, appErr := LoadPlatform(platform, options)
	if appErr != nil {
		return nil, fmt.Errorf("unable to load platform %v Error: %v", platform, appErr)
	}
	return app, nil
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

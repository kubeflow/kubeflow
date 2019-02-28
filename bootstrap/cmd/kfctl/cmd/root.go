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
	"github.com/ghodss/yaml"
	"github.com/ksonnet/ksonnet/pkg/app"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcp"
	// STATIC
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/dockerfordesktop"
	// -STATIC //
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
	"github.com/mitchellh/go-homedir"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

func GetPlatform(options map[string]interface{}) (kftypes.KfApp, error) {
	platform := options[string(kftypes.PLATFORM)].(string)
	switch platform {
	case "ksonnet":
		return ksonnet.GetKfApp(options), nil
	case "minikube":
		return minikube.GetKfApp(options), nil
	case "gcp":
		return gcp.GetKfApp(options), nil
	// STATIC
	case "docker-for-desktop":
		return dockerfordesktop.GetKfApp(options), nil
	// -STATIC //
	default:
		log.Infof("** loading %v.so for platform %v **", platform, platform)
		return kftypes.LoadPlatform(options)
	}
}

func processResourceArg(args []string) (kftypes.ResourceEnum, error) {
	if len(args) > 1 {
		return kftypes.NONE, fmt.Errorf("unknown extra args %v", args[1:])
	}
	resources := kftypes.ALL
	if len(args) == 1 {
		switch kftypes.ResourceEnum(args[0]) {
		case kftypes.ALL:
		case kftypes.K8S:
			resources = kftypes.K8S
		case kftypes.PLATFORM:
			resources = kftypes.PLATFORM
		default:
			return kftypes.NONE, fmt.Errorf("unknown argument %v", args[0])
		}
	}
	return resources, nil
}

func newKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	//appName can be a path
	appName := options[string(kftypes.APPNAME)].(string)
	appDir := path.Dir(appName)
	if appDir == "" || appDir == "." {
		cwd, err := os.Getwd()
		if err != nil {
			return nil, fmt.Errorf("could not get current directory %v", err)
		}
		appDir = path.Join(cwd, appName)
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
	re := regexp.MustCompile(`[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$`)
	validName := re.FindString(appName)
	if strings.Compare(validName, appName) != 0 {
		return nil, fmt.Errorf(`invalid name %v must consist of lower case alphanumeric characters, '-' or '.',
and must start and end with an alphanumeric character`, appName)
	}
	options[string(kftypes.APPNAME)] = appName
	options[string(kftypes.APPDIR)] = appDir
	platform := options[string(kftypes.PLATFORM)].(string)
	pApp, pAppErr := GetPlatform(options)
	if pAppErr != nil {
		return nil, fmt.Errorf("unable to load platform %v Error: %v", platform, pAppErr)
	}
	return pApp, nil
}

func loadKfApp(options map[string]interface{}) (kftypes.KfApp, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("could not get current directory %v", err)
	}
	appName := filepath.Base(appDir)
	log.Infof("AppName %v AppDir %v", appName, appDir)
	cfgfile := filepath.Join(appDir, kftypes.KfConfigFile)
	log.Infof("reading from %v", cfgfile)
	fs := afero.NewOsFs()
	ksDir := path.Join(appDir, kstypes.KsName)
	kApp, kAppErr := app.Load(fs, nil, ksDir)
	if kAppErr != nil {
		return nil, fmt.Errorf("there was a problem loading app %v. Error: %v", appName, kAppErr)
	}
	buf, bufErr := ioutil.ReadFile(cfgfile)
	if bufErr != nil {
		return nil, fmt.Errorf("couldn't read %v. Error: %v", cfgfile, bufErr)
	}
	var v interface{}
	yaml.Unmarshal(buf, &v)
	data := v.(map[string]interface{})
	metadata := data["metadata"].(map[string]interface{})
	spec := data["spec"].(map[string]interface{})
	platform := spec["platform"].(string)
	appName = metadata["name"].(string)
	appDir = spec["appdir"].(string)
	options[string(kftypes.PLATFORM)] = platform
	options[string(kftypes.APPNAME)] = appName
	options[string(kftypes.APPDIR)] = appDir
	options[string(kftypes.KAPP)] = kApp
	options[string(kftypes.DATA)] = buf
	pApp, pAppErr := GetPlatform(options)
	if pAppErr != nil {
		return nil, fmt.Errorf("unable to load platform %v Error: %v", platform, pAppErr)
	}
	return pApp, nil
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

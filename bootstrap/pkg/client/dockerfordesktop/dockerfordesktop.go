/*
Copyright The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package dockerfordesktop

import (
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
)

// DockerForDesktop implements KfApp Interface
// It should include functionality needed for the dockerfordesktop platform
type DockerForDesktop struct {
	cltypes.Client
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_dockerfordesktop := &DockerForDesktop{
		Client: cltypes.Client{
			TypeMeta:metav1.TypeMeta{
				Kind:       "Client",
				APIVersion: "client.apps.kubeflow.org/v1alpha1",
			},
			Spec: cltypes.ClientSpec{},
		},
	}
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _dockerfordesktop)
		if specErr != nil {
			log.Errorf("couldn't unmarshal Ksonnet. Error: %v", specErr)
		}
	}
	if options[string(kftypes.CONFIG)] != nil {
		dat := options[string(kftypes.CONFIG)].([]byte)
		specErr := yaml.Unmarshal(dat, &_dockerfordesktop.Spec)
		if specErr != nil {
			log.Errorf("couldn't unmarshal Ksonnet. Error: %v", specErr)
		}
	}
	return _dockerfordesktop
}

func (dockerfordesktop *DockerForDesktop) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (dockerfordesktop *DockerForDesktop) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (dockerfordesktop *DockerForDesktop) generate(options map[string]interface{}) error {
	platform := options[string(kftypes.PLATFORM)].(string)
	mountLocal := false
	if options[string(kftypes.MOUNT_LOCAL)] != nil {
		mountLocal = options[string(kftypes.MOUNT_LOCAL)].(bool)
	}
	// remove Katib package and component
	dockerfordesktop.Spec.Packages = kftypes.RemoveItem(dockerfordesktop.Spec.Packages, "katib")
	dockerfordesktop.Spec.Components = kftypes.RemoveItem(dockerfordesktop.Spec.Components, "katib")
	dockerfordesktop.Spec.ComponentParams["application"] = []config.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kftypes.QuoteItems(dockerfordesktop.Spec.Components), ",") + "]",
		},
	}
	usr, err := user.Current()
	if err != nil {
		return fmt.Errorf("Could not get current user; error %v", err)
	}
	uid := usr.Uid
	gid := usr.Gid
	dockerfordesktop.Spec.ComponentParams["jupyter"] = []config.NameValue{
		{
			Name:  string(kftypes.PLATFORM),
			Value: platform,
		},
		{
			Name:  "accessLocalFs",
			Value: strconv.FormatBool(mountLocal),
		},
		{
			Name:  "disks",
			Value: "local-notebooks",
		},
		{
			Name:  "notebookUid",
			Value: uid,
		},
		{
			Name:  "notebookGid",
			Value: gid,
		},
	}
	dockerfordesktop.Spec.ComponentParams["ambassador"] = []config.NameValue{
		{
			Name:  string(kftypes.PLATFORM),
			Value: platform,
		},
		{
			Name:  "replicas",
			Value: "1",
		},
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := dockerfordesktop.generate(options)
		if generateErr != nil {
			return fmt.Errorf("dockerfordesktop generate failed Error: %v", generateErr)
		}
	}
	createConfigErr := dockerfordesktop.writeConfigFile(options)
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", dockerfordesktop.Client.Spec.AppDir)
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (dockerfordesktop *DockerForDesktop) writeConfigFile(options map[string]interface{}) error {
	buf, bufErr := yaml.Marshal(dockerfordesktop.Client)
	if bufErr != nil {
		return bufErr
	}
	options[string(kftypes.CONFIG)] = buf
	cfgFilePath := filepath.Join(dockerfordesktop.Client.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

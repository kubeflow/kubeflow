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
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"io/ioutil"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
)

// DockerForDesktop implements KfApp Interface
// It should include functionality needed for the dockerfordesktop platform
type DockerForDesktop struct {
	kfdefs.KfDef
}

func GetKfApp(kfdef *kfdefs.KfDef) kftypes.KfApp {
	_dockerfordesktop := &DockerForDesktop{
		KfDef: *kfdef,
	}
	return _dockerfordesktop
}

func (dockerfordesktop *DockerForDesktop) Apply(resources kftypes.ResourceEnum) error {
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (dockerfordesktop *DockerForDesktop) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (dockerfordesktop *DockerForDesktop) generate() error {
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
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Could not get current user; error %v", err),
		}
	}
	uid := usr.Uid
	gid := usr.Gid
	dockerfordesktop.Spec.ComponentParams["jupyter"] = []config.NameValue{
		{
			Name:  string(kftypes.PLATFORM),
			Value: dockerfordesktop.Spec.Platform,
		},
		{
			Name:  "accessLocalFs",
			Value: strconv.FormatBool(dockerfordesktop.Spec.MountLocal),
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
			Value: dockerfordesktop.Spec.Platform,
		},
		{
			Name:  "replicas",
			Value: "1",
		},
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Generate(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := dockerfordesktop.generate()
		if generateErr != nil {
			return generateErr
		}
	}
	createConfigErr := dockerfordesktop.writeConfigFile()
	if createConfigErr != nil {
		return createConfigErr
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Init(resources kftypes.ResourceEnum) error {
	return nil
}

func (dockerfordesktop *DockerForDesktop) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(dockerfordesktop.KfDef)
	if bufErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot marshal config file: %v", bufErr),
		}
	}
	cfgFilePath := filepath.Join(dockerfordesktop.KfDef.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot write config file: %v", cfgFilePathErr),
		}
	}
	return nil
}

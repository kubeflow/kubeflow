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
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"os/user"
	"strconv"
	"strings"
)

// DockerForDesktop implements KfApp Interface
// It should include functionality needed for the docker-for-desktop platform
type DockerForDesktop struct {
	//Add additional types required for dockerfordesktop platform
}

func GetKfApp(_ map[string]interface{}) kftypes.KfApp {
	return &DockerForDesktop{}
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
	kftypes.DefaultPackages = kftypes.RemoveItem(kftypes.DefaultPackages, "katib")
	kftypes.DefaultComponents = kftypes.RemoveItem(kftypes.DefaultComponents, "katib")
	kftypes.DefaultParameters["application"] = []kftypes.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kftypes.QuoteItems(kftypes.DefaultComponents), ",") + "]",
		},
	}
	usr, err := user.Current()
	if err != nil {
		return fmt.Errorf("Could not get current user; error %v", err)
	}
	uid := usr.Uid
	gid := usr.Gid
	kftypes.DefaultParameters["jupyter"] = []kftypes.NameValue{
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
	kftypes.DefaultParameters["ambassador"] = []kftypes.NameValue{
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
	return nil
}

func (dockerfordesktop *DockerForDesktop) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

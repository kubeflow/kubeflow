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
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	log "github.com/sirupsen/logrus"
	"os/user"
	"strconv"
	"strings"
)

// DockerForDesktop implements KfApp Interface
// It includes the Ksonnet along with functionality needed for dockerfordesktop
type DockerForDesktop struct {
	Ksonnet kftypes.KfApp
	//TODO add additional types required for dockerfordesktop platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	options[string(kftypes.PLATFORM)] = "ksonnet"
	log.Infof("getting ksonnet platform in minikube")
	_ksonnet := ksonnet.GetKfApp(options)
	options[string(kftypes.PLATFORM)] = "docker-for-desktop"
	_dockerfordesktop := &DockerForDesktop{
		Ksonnet: _ksonnet,
	}
	return _dockerfordesktop
}

func (dockerfordesktop *DockerForDesktop) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksApplyErr := dockerfordesktop.Ksonnet.Apply(resources, options)
	if ksApplyErr != nil {
		return fmt.Errorf("dockerfordesktop apply failed for ksonnet: %v", ksApplyErr)
	}
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (dockerfordesktop *DockerForDesktop) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksDeleteErr := dockerfordesktop.Ksonnet.Delete(resources, options)
	if ksDeleteErr != nil {
		return fmt.Errorf("dockerfordesktop delete failed for ksonnet: %v", ksDeleteErr)
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) generateKsApp(options map[string]interface{}) error {
	platform := options[string(kftypes.PLATFORM)].(string)
	mountLocal := false
	if options[string(kftypes.MOUNT_LOCAL)] != nil {
		mountLocal = options[string(kftypes.MOUNT_LOCAL)].(bool)
	}
	// remove Katib package and component
	kstypes.DefaultPackages = kstypes.RemoveItem(kstypes.DefaultPackages, "katib")
	kstypes.DefaultComponents = kstypes.RemoveItem(kstypes.DefaultComponents, "katib")
	kstypes.DefaultParameters["application"] = []kstypes.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kstypes.QuoteItems(kstypes.DefaultComponents), ",") + "]",
		},
	}
	usr, err := user.Current()
	if err != nil {
		return fmt.Errorf("Could not get current user; error %v", err)
	}
	uid := usr.Uid
	gid := usr.Gid
	kstypes.DefaultParameters["jupyter"] = []kstypes.NameValue{
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
	kstypes.DefaultParameters["ambassador"] = []kstypes.NameValue{
		{
			Name:  string(kftypes.PLATFORM),
			Value: platform,
		},
		{
			Name:  "replicas",
			Value: "1",
		},
	}
	ksGenerateErr := dockerfordesktop.Ksonnet.Generate(kftypes.ALL, options)
	if ksGenerateErr != nil {
		return fmt.Errorf("dockerfordesktop generate failed for ksonnet: %v", ksGenerateErr)
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.ALL:
		fallthrough
	case kftypes.K8S:
		ksErr := dockerfordesktop.generateKsApp(options)
		if ksErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksErr)
		}
	case kftypes.PLATFORM:
	}
	return nil
}

func (dockerfordesktop *DockerForDesktop) Init(options map[string]interface{}) error {
	ksInitErr := dockerfordesktop.Ksonnet.Init(options)
	if ksInitErr != nil {
		return fmt.Errorf("dockerfordesktop init failed for ksonnet: %v", ksInitErr)
	}
	return nil
}

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

package minikube

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"os/user"
	"strconv"
	"strings"
)

// Minikube implements KfApp Interface
type Minikube struct {
	//TODO add additional types required for minikube platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return &Minikube{}
}

func (minikube *Minikube) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (minikube *Minikube) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (minikube *Minikube) generate(options map[string]interface{}) error {
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

func (minikube *Minikube) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := minikube.generate(options)
		if generateErr != nil {
			return fmt.Errorf("minikube generate failed Error: %v", generateErr)
		}
	}
	return nil
}

func (minikube *Minikube) Init(kftypes.ResourceEnum, map[string]interface{}) error {
	return nil
}

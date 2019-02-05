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
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
	"os/user"
	"strconv"
	"strings"
)

// MinikubeApp implements KfApp Interface
// It includes the KsApp along with functionality needed for minikube
type MinikubeApp struct {
	ksApp kftypes.KfApp
	//TODO add additional types required for minikube platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_minikubeapp := &MinikubeApp{
		ksApp: ksapp.GetKfApp(options),
	}
	return _minikubeapp
}

func (minikubeApp *MinikubeApp) writeConfigFile() error {
	//TODO write out specific minikube parameters
	return nil
}

func (minikubeApp *MinikubeApp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksApplyErr := minikubeApp.ksApp.Apply(resources, options)
	if ksApplyErr != nil {
		return fmt.Errorf("minikube apply failed for ksapp: %v", ksApplyErr)
	}
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (minikubeApp *MinikubeApp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksDeleteErr := minikubeApp.ksApp.Delete(resources, options)
	if ksDeleteErr != nil {
		return fmt.Errorf("minikube delete failed for ksapp: %v", ksDeleteErr)
	}
	return nil
}

func (minikubeApp *MinikubeApp) generateKsApp(options map[string]interface{}) error {
	ksApp := minikubeApp.ksApp.(*ksapp.KsApp)
	mountLocal := false
	if options["MountLocal"] != nil {
		mountLocal = options["MountLocal"].(bool)
	}
	// remove Katib package and component
	pkgs := kstypes.RemoveItem(kstypes.DefaultPackages, "katib")
	ksApp.KsApp.Spec.Packages = pkgs
	comps := kstypes.RemoveItem(kstypes.DefaultComponents, "katib")
	ksApp.KsApp.Spec.Components = comps
	parameters := make(map[string][]kstypes.NameValue)
	parameters["application"] = []kstypes.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kstypes.QuoteItems(comps), ",") + "]",
		},
	}
	usr, err := user.Current()
	if err != nil {
		return fmt.Errorf("Could not get current user; error %v", err)
	}
	uid := usr.Uid
	gid := usr.Gid
	parameters["jupyter"] = []kstypes.NameValue{
		{
			Name:  "platform",
			Value: ksApp.KsApp.Spec.Platform,
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
	parameters["ambassador"] = []kstypes.NameValue{
		{
			Name:  "platform",
			Value: ksApp.KsApp.Spec.Platform,
		},
		{
			Name:  "replicas",
			Value: "1",
		},
	}
	ksApp.KsApp.Spec.Parameters = parameters
	ksGenerateErr := minikubeApp.ksApp.Generate(kftypes.ALL, options)
	if ksGenerateErr != nil {
		return fmt.Errorf("minikube generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (minikubeApp *MinikubeApp) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		ksErr := minikubeApp.generateKsApp(options)
		if ksErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksErr)
		}
	case kftypes.K8S:
	}
	return nil
}

func (minikubeApp *MinikubeApp) Init(options map[string]interface{}) error {
	ksInitErr := minikubeApp.ksApp.Init(options)
	if ksInitErr != nil {
		return fmt.Errorf("minikube init failed for ksapp: %v", ksInitErr)
	}
	return nil
}

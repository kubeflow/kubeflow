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

func (minikubeApp *MinikubeApp) Apply() error {
	ksApplyErr := minikubeApp.ksApp.Apply()
	if ksApplyErr != nil {
		return fmt.Errorf("minikube apply failed for ksapp: %v", ksApplyErr)
	}
	//mount_local_fs
	//setup_tunnels
	return nil
}

func (minikubeApp *MinikubeApp) Delete() error {
	return nil
}

func (minikubeApp *MinikubeApp) generateKsApp() error {
	ksApp := minikubeApp.ksApp.(*ksapp.KsApp)
	mountLocal := ksApp.CfgFile.GetString("mount-local")
	// remove Katib package and component
	pkgs := kstypes.RemoveItem(kstypes.DefaultPackages, "katib")
	ksApp.CfgFile.Set("packages", pkgs)
	comps := kstypes.RemoveItem(kstypes.DefaultComponents, "katib")
	ksApp.CfgFile.Set("components", comps)
	parameters := make(map[string][]string)
	parameters["application"] = []string{
		"components",
		"[" + strings.Join(kstypes.QuoteItems(comps), ",") + "]",
	}
	usr, err := user.Current()
	if err != nil {
		return fmt.Errorf("Could not get current user; error %v", err)
	}
	uid := usr.Uid
	gid := usr.Gid
	parameters["jupyter"] = []string{
		"platform",
		ksApp.KsApp.Spec.Platform,
		"accessLocalFs",
		mountLocal,
		"disks",
		"local-notebooks",
		"notebookUid",
		uid,
		"notebookGid",
		gid,
	}
	parameters["ambassador"] = []string{
		"replicas",
		"1",
	}
	ksApp.CfgFile.Set("parameters", parameters)
	ksGenerateErr := minikubeApp.ksApp.Generate(kftypes.ALL)
	if ksGenerateErr != nil {
		return fmt.Errorf("minikube generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (minikubeApp *MinikubeApp) Generate(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		ksErr := minikubeApp.generateKsApp()
		if ksErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksErr)
		}
	case kftypes.E8S:
	}
	return nil
}

func (minikubeApp *MinikubeApp) Init() error {
	ksInitErr := minikubeApp.ksApp.Init()
	if ksInitErr != nil {
		return fmt.Errorf("minikube init failed for ksapp: %v", ksInitErr)
	}
	return nil
}

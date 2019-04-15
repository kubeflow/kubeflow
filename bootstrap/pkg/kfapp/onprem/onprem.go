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

package onprem

import (
	"fmt"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"io/ioutil"
	"path/filepath"
)

// onprem implements KfApp Interface
// It should include functionality needed for the onprem platform
type Onprem struct {
	kfdefs.KfDef
}

func GetKfApp(kfdef *kfdefs.KfDef) kftypes.KfApp {
	_onprem := &Onprem{
		KfDef: *kfdef,
	}
	return _onprem
}

func (Onprem *Onprem) Apply(resources kftypes.ResourceEnum) error {
	return nil
}

func (Onprem *Onprem) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (Onprem *Onprem) generate() error {
	return nil
}

func (Onprem *Onprem) Generate(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := Onprem.generate()
		if generateErr != nil {
			return generateErr
		}
	}
	createConfigErr := Onprem.writeConfigFile()
	if createConfigErr != nil {
		return createConfigErr
	}
	return nil
}

func (Onprem *Onprem) Init(resources kftypes.ResourceEnum) error {
	return nil
}

func (Onprem *Onprem) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(Onprem.KfDef)
	if bufErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot marshal config file: %v", bufErr),
		}
	}
	cfgFilePath := filepath.Join(Onprem.KfDef.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot write config file: %v", cfgFilePathErr),
		}
	}
	return nil
}

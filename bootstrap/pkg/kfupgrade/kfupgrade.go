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

// Package kfupgrade
package kfupgrade

import (
	"bytes"
	"crypto/sha256"
	"encoding/base32"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfupgrade "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfupgrade/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
)

func NewKfUpgrade(upgradeConfig string) (kftypesv3.KfApp, error) {
	upgrade, err := kfupgrade.LoadKfUpgradeFromUri(upgradeConfig)
	if err != nil {
		log.Errorf("Could not load %v; error %v", upgradeConfig, err)
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}

	// First find the existing KfDef
	appDir, err := os.Getwd()

	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}
	oldConfig := filepath.Join(appDir, kftypesv3.KfConfigFile)

	oldKfDef, err := kfdefsv3.LoadKFDefFromURI(oldConfig)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", oldConfig, err),
		}
	}

	// Load the new KfDef from the base config
	newConfig := upgrade.Spec.BaseConfigPath
	newKfDef, err := kfdefsv3.LoadKFDefFromURI(newConfig)

	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not load %v. Error: %v", newConfig, err),
		}
	}

	// Merge the previous KfDef's customized values into the new KfDef
	newKfDef.Name = oldKfDef.Name
	newKfDef.Spec.Project = oldKfDef.Spec.Project
	for appIndex, newApp := range newKfDef.Spec.Applications {
		for _, oldApp := range oldKfDef.Spec.Applications {
			if newApp.Name == oldApp.Name {
				for paramIndex, newParam := range newApp.KustomizeConfig.Parameters {
					for _, oldParam := range oldApp.KustomizeConfig.Parameters {
						if newParam.Name == oldParam.Name && newParam.Value != oldParam.Value {
							log.Infof("Merging application %v param %v from %v to %v\n",
								newApp.Name, newParam.Name, newParam.Value, oldParam.Value)
							newKfDef.Spec.Applications[appIndex].KustomizeConfig.Parameters[paramIndex].Value = oldParam.Value
							break
						}
					}
				}
				break
			}
		}
	}

	// Compute hash from the new KfDef and use it to create the new app directory
	h, err := ComputeHash(newKfDef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not compute sha256 hash. Error: %v", err),
		}
	}

	newAppDir := filepath.Join(appDir, h)
	newKfDef.Spec.AppDir = newAppDir

	updateCfg, err := coordinator.CreateKfAppCfgFile(newKfDef)

	if err != nil {
		return nil, err
	}

	return coordinator.LoadKfAppCfgFile(updateCfg)
}

func ComputeHash(d *kfdefsv3.KfDef) (string, error) {
	h := sha256.New()
	buf := new(bytes.Buffer)
	json.NewEncoder(buf).Encode(d)
	h.Write([]byte(buf.Bytes()))
	id := base32.HexEncoding.WithPadding(base32.NoPadding).EncodeToString(h.Sum(nil))
	id = strings.ToLower(id)[0:7]

	return id, nil
}

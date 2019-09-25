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
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/kustomize"
	log "github.com/sirupsen/logrus"
)

// Given a KfUpgrade config, create a new KfApp.
func NewKfUpgrade(upgradeConfig string) (kftypesv3.KfApp, error) {
	// Parse the KfUpgrade spec
	upgrade, err := kfupgrade.LoadKfUpgradeFromUri(upgradeConfig)
	if err != nil {
		log.Errorf("Could not load %v; error %v", upgradeConfig, err)
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}

	appDir, err := os.Getwd()

	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}

	// Find the existing KfDef
	oldKfDef, err := FindKfDef(upgrade.Spec.CurrentKfDef)
	if err != nil || oldKfDef == nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not find existing KfDef %v. Error: %v", upgrade.Spec.CurrentKfDef.Name, err),
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
	MergeKfDef(oldKfDef, newKfDef)

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
	newKfDef.Spec.Version = upgrade.Spec.NewKfDef.Version

	updateCfg, err := coordinator.CreateKfAppCfgFile(newKfDef)

	if err != nil {
		return nil, err
	}

	return coordinator.LoadKfAppCfgFile(updateCfg)
}

// Given a KfUpgrade config, either find the KfApp that matches the NewKfDef reference or
// create a new one.
func LoadKfUpgrade(upgradeConfig string) (kftypesv3.KfApp, error) {
	// Parse the KfUpgrade spec.
	upgrade, err := kfupgrade.LoadKfUpgradeFromUri(upgradeConfig)
	if err != nil {
		log.Errorf("Could not load %v; error %v", upgradeConfig, err)
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}

	// Try to find the new KfDef.
	kfDef, err := FindKfDef(upgrade.Spec.NewKfDef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not find %v. Error: %v", upgrade.Spec.NewKfDef.Name, err),
		}
	}

	if kfDef != nil {
		// If we find the exising KfDef, return it
		return kustomize.GetKfApp(kfDef), nil
	} else {
		// If we cannot find one, create a new one and generate the kustomize packages for it.
		newKfApp, err := NewKfUpgrade(upgradeConfig)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("Failed to create new KfApp. Error: %v", err),
			}
		}

		err = newKfApp.Generate(kftypesv3.K8S)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("Failed to build KfApp. Error: %v", err),
			}
		}
		return newKfApp, nil
	}
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

func FindKfDef(kfDefRef *kfupgrade.KfDefRef) (*kfdefsv3.KfDef, error) {
	var target *kfdefsv3.KfDef
	err := filepath.Walk(".",
		func(path string, info os.FileInfo, err error) error {
			if target != nil {
				// If we already found the target directory, skip
				return nil
			}

			if !info.Mode().IsDir() {
				// Skip non-directories
				return nil
			}

			if strings.Contains(path, ".cache") {
				// Skip cache directories
				return nil
			}

			config := filepath.Join(path, kftypesv3.KfConfigFile)
			info, err = os.Stat(config)
			if os.IsNotExist(err) {
				// App.yaml does not exist, skip this directory
				return nil
			}

			kfDef, err := kfdefsv3.LoadKFDefFromURI(config)
			if err != nil {
				log.Warnf("Failed to load KfDef from %v", config)
				return nil
			}

			if kfDef.Name == kfDefRef.Name && kfDef.Spec.Version == kfDefRef.Version {
				if kfDefRef.Version == "" {
					log.Infof("Found KfDef with matching name: %v", kfDef.Name)
					target = kfDef
				} else if kfDef.Spec.Version == kfDefRef.Version {
					log.Infof("Found KfDef with matching name: %v version: %v", kfDef.Name, kfDef.Spec.Version)
					target = kfDef
				}
			}

			return err
		})
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return target, err
}

func MergeKfDef(oldKfDef *kfdefsv3.KfDef, newKfDef *kfdefsv3.KfDef) {
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
}

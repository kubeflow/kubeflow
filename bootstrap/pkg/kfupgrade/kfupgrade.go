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

type KfUpgrader struct {
	OldKfDef *kfdefsv3.KfDef
	NewKfDef *kfdefsv3.KfDef
}

// Given a path to a base config and the existing KfDef, create and return a new KfDef
// while keeping the existing KfApp's customizations. Also create a new KfApp in the
// current working directory.
func createNewKfApp(baseConfig string, oldKfDef *kfdefsv3.KfDef) (*kfdefsv3.KfDef, error) {
	appDir, err := os.Getwd()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not get current directory %v", err),
		}
	}

	// Load the new KfDef from the base config
	newKfDef, err := kfdefsv3.LoadKFDefFromURI(baseConfig)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Could not load %v. Error: %v", baseConfig, err),
		}
	}

	// Merge the previous KfDef's customized values into the new KfDef
	MergeKfDef(oldKfDef, newKfDef)

	// Compute hash from the new KfDef and use it to create the new app directory
	h, err := computeHash(newKfDef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Could not compute sha256 hash. Error: %v", err),
		}
	}

	newAppDir := filepath.Join(appDir, h)
	newKfDef.Spec.AppDir = newAppDir

	// Make sure the new KfApp is created.
	_, err = coordinator.CreateKfAppCfgFile(newKfDef)
	if err != nil {
		return nil, err
	}

	return newKfDef, nil
}

// Given a KfUpgrade config, either find the KfApp that matches the NewKfDef reference or
// create a new one.
func NewKfUpgrade(upgradeConfig string) (*KfUpgrader, error) {
	// Parse the KfUpgrade spec.
	upgrade, err := kfupgrade.LoadKfUpgradeFromUri(upgradeConfig)
	if err != nil {
		log.Errorf("Could not load %v; error %v", upgradeConfig, err)
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}

	// Try to find the old KfDef.
	oldKfDef, err := findKfDef(upgrade.Spec.CurrentKfDef)
	if err != nil || oldKfDef == nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Could not find existing KfDef %v. Error: %v", upgrade.Spec.CurrentKfDef.Name, err),
		}
	}

	// Try to find the new KfDef.
	newKfDef, err := findKfDef(upgrade.Spec.NewKfDef)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Encountered error while trying to find %v: %v", upgrade.Spec.NewKfDef.Name, err),
		}
	}

	// If the new KfDef is not found, create it
	if newKfDef == nil {
		newKfDef, err = createNewKfApp(upgrade.Spec.BaseConfigPath, oldKfDef)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("Encountered error while creating new KfApp %v: %v", upgrade.Spec.NewKfDef.Name, err),
			}
		}
	}

	return &KfUpgrader{
		OldKfDef: oldKfDef,
		NewKfDef: newKfDef,
	}, nil
}

func computeHash(d *kfdefsv3.KfDef) (string, error) {
	h := sha256.New()
	buf := new(bytes.Buffer)
	json.NewEncoder(buf).Encode(d)
	h.Write([]byte(buf.Bytes()))
	id := base32.HexEncoding.WithPadding(base32.NoPadding).EncodeToString(h.Sum(nil))
	id = strings.ToLower(id)[0:7]

	return id, nil
}

func findKfDef(kfDefRef *kfupgrade.KfDefRef) (*kfdefsv3.KfDef, error) {
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

			if kfDef.Name == kfDefRef.Name {
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

func (upgrader *KfUpgrader) Generate() error {
	kfApp := kustomize.GetKfApp(upgrader.NewKfDef)
	return kfApp.Generate(kftypesv3.K8S)
}

func (upgrader *KfUpgrader) Apply() error {
	kfApp := kustomize.GetKfApp(upgrader.NewKfDef)
	err := kfApp.Generate(kftypesv3.K8S)
	if err != nil {
		log.Errorf("Failed to generate KfApp: %v", err)
		return err
	}

	return kfApp.Apply(kftypesv3.K8S)
}

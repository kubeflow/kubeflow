// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package app

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/lib"

	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

// App010 is a ksonnet 0.1.0 application.
type App010 struct {
	*baseApp
}

var _ App = (*App010)(nil)

// NewApp010 creates an App010 instance.
func NewApp010(fs afero.Fs, root string) *App010 {
	ba := newBaseApp(fs, root)

	a := &App010{
		baseApp: ba,
	}

	return a
}

// AddEnvironment adds an environment spec to the app spec. If the spec already exists,
// it is overwritten.
func (a *App010) AddEnvironment(name, k8sSpecFlag string, newEnv *EnvironmentSpec, isOverride bool) error {
	if err := a.load(); err != nil {
		return errors.Wrap(err, "load configuration")
	}

	if k8sSpecFlag != "" {
		ver, err := LibUpdater(a.fs, k8sSpecFlag, app010LibPath(a.root), true)
		if err != nil {
			return err
		}

		newEnv.KubernetesVersion = ver
	}

	newEnv.isOverride = isOverride

	if isOverride {
		a.overrides.Environments[name] = newEnv
	} else {
		a.config.Environments[name] = newEnv
	}

	return a.save()
}

// Environment returns the spec for an environment.
func (a *App010) Environment(name string) (*EnvironmentSpec, error) {
	if err := a.load(); err != nil {
		return nil, errors.Wrap(err, "load configuration")
	}

	for k, v := range a.overrides.Environments {
		if k == name {
			return v, nil
		}
	}

	for k, v := range a.config.Environments {
		if k == name {
			return v, nil
		}
	}

	return nil, errors.Errorf("environment %q was not found", name)
}

// Environments returns all environment specs.
func (a *App010) Environments() (EnvironmentSpecs, error) {
	if err := a.load(); err != nil {
		return nil, errors.Wrap(err, "load configuration")
	}

	environments := EnvironmentSpecs{}
	for k, v := range a.config.Environments {
		environments[k] = v
	}

	for k, v := range a.overrides.Environments {
		environments[k] = v
	}

	return environments, nil
}

// Init initializes the App.
func (a *App010) Init() error {
	// check to see if there are spec.json files.

	legacyEnvs, err := a.findLegacySpec()
	if err != nil {
		return err
	}

	if len(legacyEnvs) == 0 {
		return nil
	}

	msg := "Your application's apiVersion is 0.1.0, but legacy environment declarations " +
		"where found in environments: %s. In order to proceed, you will have to run `ks upgrade` to " +
		"upgrade your application. <see url>"

	return errors.Errorf(msg, strings.Join(legacyEnvs, ", "))
}

// LibPath returns the lib path for an env environment.
func (a *App010) LibPath(envName string) (string, error) {
	env, err := a.Environment(envName)
	if err != nil {
		return "", err
	}

	ver := fmt.Sprintf("version:%s", env.KubernetesVersion)
	lm, err := lib.NewManager(ver, a.fs, app010LibPath(a.root))
	if err != nil {
		return "", err
	}

	return lm.GetLibPath(true)
}

// Libraries returns application libraries.
func (a *App010) Libraries() (LibraryRefSpecs, error) {
	if err := a.load(); err != nil {
		return nil, errors.Wrap(err, "load configuration")
	}

	return a.config.Libraries, nil
}

// Registries returns application registries.
func (a *App010) Registries() (RegistryRefSpecs, error) {
	if err := a.load(); err != nil {
		return nil, errors.Wrap(err, "load configuration")
	}

	registries := RegistryRefSpecs{}

	for k, v := range a.config.Registries {
		registries[k] = v
	}

	for k, v := range a.overrides.Registries {
		registries[k] = v
	}

	return registries, nil
}

// RemoveEnvironment removes an environment.
func (a *App010) RemoveEnvironment(envName string, override bool) error {
	if err := a.load(); err != nil {
		return errors.Wrap(err, "load configuration")
	}

	if override {
		delete(a.overrides.Environments, envName)
	} else {
		delete(a.config.Environments, envName)
	}

	return a.save()
}

// RenameEnvironment renames environments.
func (a *App010) RenameEnvironment(from, to string, override bool) error {
	if err := a.load(); err != nil {
		return errors.Wrap(err, "load configuration")
	}

	if override {
		if _, ok := a.overrides.Environments[from]; !ok {
			return errors.Errorf("environment %q does not exist", from)
		}
		a.overrides.Environments[to] = a.overrides.Environments[from]
		a.overrides.Environments[to].Path = to
		delete(a.overrides.Environments, from)
	} else {
		if _, ok := a.config.Environments[from]; !ok {
			return errors.Errorf("environment %q does not exist", from)
		}
		a.config.Environments[to] = a.config.Environments[from]
		a.config.Environments[to].Path = to
		delete(a.config.Environments, from)
	}

	if err := moveEnvironment(a.fs, a.root, from, to); err != nil {
		return err
	}

	return a.save()
}

// UpdateTargets updates the list of targets for a 0.1.0 application.
func (a *App010) UpdateTargets(envName string, targets []string) error {
	spec, err := a.Environment(envName)
	if err != nil {
		return err
	}

	spec.Targets = targets

	return errors.Wrap(a.AddEnvironment(envName, "", spec, spec.isOverride), "update targets")
}

// Upgrade upgrades the app to the latest apiVersion.
func (a *App010) Upgrade(dryRun bool) error {
	return nil
}

func (a *App010) findLegacySpec() ([]string, error) {
	var found []string

	envPath := filepath.Join(a.root, EnvironmentDirName)
	err := afero.Walk(a.fs, envPath, func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if fi.IsDir() {
			return nil
		}

		if fi.Name() == app001specJSON {
			envName := strings.TrimPrefix(path, envPath+"/")
			envName = strings.TrimSuffix(envName, "/"+app001specJSON)
			found = append(found, envName)
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return found, nil
}

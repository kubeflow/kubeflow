// Copyright 2018 The ksonnet authors
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

package appinit

import (
	"path/filepath"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/env"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

// Init initializes a ksonnet application.
func Init(fs afero.Fs, name, rootPath, envName, k8sSpecFlag, serverURI, namespace string, registries []registry.Registry) error {
	i := new(fs, name, rootPath, envName, k8sSpecFlag, serverURI, namespace, registries)
	return i.Run()
}

type initApp struct {
	fs          afero.Fs
	name        string
	rootPath    string
	envName     string
	k8sSpecFlag string
	serverURI   string
	namespace   string
	registries  []registry.Registry
}

// New creates an instance of Init.
func new(fs afero.Fs, name, rootPath, envName, k8sSpecFlag, serverURI, namespace string, registries []registry.Registry) *initApp {
	i := &initApp{
		fs:          fs,
		name:        name,
		rootPath:    rootPath,
		envName:     envName,
		k8sSpecFlag: k8sSpecFlag,
		serverURI:   serverURI,
		namespace:   namespace,
		registries:  registries,
	}

	return i
}

func (i *initApp) Run() error {
	// Initialize directory structure.
	if err := i.createAppDirTree(); err != nil {
		return err
	}

	// Load application.
	a, err := app.Load(i.fs, i.rootPath, false)
	if err != nil {
		return err
	}

	envName := i.envName
	if envName == "" {
		envName = env.DefaultEnvName
	}

	// Initialize environment, and cache specification data.
	if i.serverURI != "" {
		d := env.NewDestination(i.serverURI, i.namespace)
		err = env.Create(
			a,
			d,
			envName,
			i.k8sSpecFlag,
			env.DefaultOverrideData,
			env.DefaultParamsData,
			false,
		)

		if err != nil {
			return errorOnCreateFailure(i.name, err)
		}
	}

	for _, r := range i.registries {
		if err = i.setupRegistry(r); err != nil {
			return errorOnCreateFailure(i.name, err)
		}
	}

	return nil
}

func (i *initApp) setupRegistry(r registry.Registry) error {
	// Retrieve `registry.yaml`.
	registryYAMLData, err := registry.DefaultYAMLData(r)
	if err != nil {
		return err
	}

	// Write out `incubator` registry spec.
	registryPath := filepath.Join(
		i.rootPath,
		".ksonnet",
		"registries",
		r.RegistrySpecFilePath())

	registryDir := filepath.Dir(registryPath)
	if err = i.fs.MkdirAll(registryDir, app.DefaultFolderPermissions); err != nil {
		return err
	}

	if err = afero.WriteFile(i.fs, registryPath, registryYAMLData, app.DefaultFilePermissions); err != nil {
		return err
	}

	return nil
}

func generateAppYAMLData(name string, refs ...*app.RegistryRefSpec) ([]byte, error) {
	content := app.Spec{
		APIVersion:   app.DefaultAPIVersion,
		Kind:         app.Kind,
		Name:         name,
		Version:      app.DefaultVersion,
		Registries:   app.RegistryRefSpecs{},
		Environments: app.EnvironmentSpecs{},
	}

	for _, ref := range refs {
		err := content.AddRegistryRef(ref)
		if err != nil {
			return nil, err
		}
	}

	return content.Marshal()
}

func errorOnCreateFailure(appName string, err error) error {
	return errors.Errorf("%s\nTo undo this simply delete directory '%s' and re-run `ks init`.\nIf the error persists, try using flag '--context' to set a different context or run `ks init --help` for more options", err, appName)
}

func (i *initApp) createAppDirTree() error {
	exists, err := afero.DirExists(i.fs, i.rootPath)
	if err != nil {
		return errors.Errorf("Could not check existence of directory '%s':\n%v", i.rootPath, err)
	} else if exists {
		return errors.Errorf("Could not create app; directory '%s' already exists", i.rootPath)
	}

	appPaths := []string{
		filepath.Join(".ksonnet", "registries"),
		"components",
		"environments",
		"lib",
		"vendor",
	}

	for _, p := range appPaths {
		path := filepath.Join(i.rootPath, p)
		log.Debugf("Creating directory %s", path)

		if err = i.fs.MkdirAll(path, app.DefaultFolderPermissions); err != nil {
			return errorOnCreateFailure(i.name, err)
		}
	}

	var specs []*app.RegistryRefSpec
	for _, r := range i.registries {
		specs = append(specs, r.MakeRegistryRefSpec())
	}

	// Generate data for `app.yaml`.
	appYAMLData, err := generateAppYAMLData(i.name, specs...)
	if err != nil {
		return err
	}

	filePaths := []struct {
		path    string
		content []byte
	}{
		{
			filepath.Join(i.rootPath, ".gitignore"),
			ignoreData,
		},
		{
			filepath.Join(i.rootPath, "components", "params.libsonnet"),
			component.GenParamsContent(),
		},
		{
			filepath.Join(i.rootPath, "environments", "base.libsonnet"),
			env.DefaultBaseData,
		},
		{
			filepath.Join(i.rootPath, "app.yaml"),
			appYAMLData,
		},
	}

	for _, f := range filePaths {
		log.Debugf("Creating file %s", f.path)
		if err := afero.WriteFile(i.fs, f.path, f.content, app.DefaultFilePermissions); err != nil {
			return err
		}
	}

	return nil
}

var ignoreData = []byte(`/lib
/.ksonnet/registries
/app.override.yaml
`)

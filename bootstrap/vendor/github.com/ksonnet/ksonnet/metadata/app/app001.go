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
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/ghodss/yaml"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

const (
	// app001specJSON is the name for environment schema
	app001specJSON = "spec.json"
)

// App001 is a ksonnet 0.0.1 application.
type App001 struct {
	out io.Writer
	*baseApp
}

var _ App = (*App001)(nil)

// NewApp001 creates an App001 instance.
func NewApp001(fs afero.Fs, root string) *App001 {
	ba := newBaseApp(fs, root)

	return &App001{
		out:     os.Stdout,
		baseApp: ba,
	}
}

// AddEnvironment adds an environment spec to the app spec. If the spec already exists,
// it is overwritten.
func (a *App001) AddEnvironment(name, k8sSpecFlag string, spec *EnvironmentSpec, isOverride bool) error {
	// if it is an override, write the destination to override file. If not, do the normal thing.

	envPath := filepath.Join(a.root, EnvironmentDirName, name)
	if err := a.fs.MkdirAll(envPath, DefaultFolderPermissions); err != nil {
		return err
	}

	specPath := filepath.Join(envPath, app001specJSON)

	b, err := json.Marshal(spec.Destination)
	if err != nil {
		return err
	}

	if err = afero.WriteFile(a.fs, specPath, b, DefaultFilePermissions); err != nil {
		return err
	}

	_, err = LibUpdater(a.fs, k8sSpecFlag, a.appLibPath(name), false)
	return err
}

func (a *App001) overrideDestintation(name string, envSpec *EnvironmentSpec) error {
	return nil
}

// Environment returns the spec for an environment. In 0.1.0, the file lives in
// /environments/name/spec.json.
func (a *App001) Environment(name string) (*EnvironmentSpec, error) {
	path := filepath.Join(a.root, EnvironmentDirName, name, app001specJSON)
	return read001EnvSpec(a.fs, name, path)
}

// Environments returns specs for all environments. In 0.1.0, the environment spec
// lives in spec.json files.
func (a *App001) Environments() (EnvironmentSpecs, error) {
	specs := EnvironmentSpecs{}

	root := filepath.Join(a.root, EnvironmentDirName)

	err := afero.Walk(a.fs, root, func(path string, fi os.FileInfo, err error) error {
		if fi.IsDir() {
			return nil
		}

		if fi.Name() == app001specJSON {
			dir := filepath.Dir(path)
			envName := strings.TrimPrefix(dir, root+"/")
			spec, err := read001EnvSpec(a.fs, envName, path)
			if err != nil {
				return err
			}

			specs[envName] = spec
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return specs, nil
}

// Init initializes the App.
func (a *App001) Init() error {
	msg := "Your application's apiVersion is below 0.1.0. In order to use all ks features, you " +
		"can upgrade your application using `ks upgrade`."
	log.Warn(msg)

	return nil
}

// LibPath returns the lib path for an env environment.
func (a *App001) LibPath(envName string) (string, error) {
	return filepath.Join(a.envDir(envName), ".metadata"), nil
}

// Libraries returns application libraries.
func (a *App001) Libraries() (LibraryRefSpecs, error) {
	if err := a.load(); err != nil {
		return nil, errors.Wrap(err, "load configuration")
	}

	return a.config.Libraries, nil
}

// Registries returns application registries.
func (a *App001) Registries() (RegistryRefSpecs, error) {
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
func (a *App001) RemoveEnvironment(envName string, override bool) error {
	a.Fs().RemoveAll(a.envDir(envName))
	return nil
}

// RenameEnvironment renames environments.
func (a *App001) RenameEnvironment(from, to string, override bool) error {
	return moveEnvironment(a.fs, a.root, from, to)
}

// UpdateTargets returns an error since 0.0.1 based applications don't have support
// for targets.
func (a *App001) UpdateTargets(envName string, targets []string) error {
	return errors.New("ks apps with version 0.0.1 do not have support for targets")
}

// Upgrade upgrades the app to the latest apiVersion.
func (a *App001) Upgrade(dryRun bool) error {
	if err := a.load(); err != nil {
		return errors.Wrap(err, "load configuration")
	}

	if dryRun {
		fmt.Fprintf(a.out, "\n[dry run] Upgrading application settings from version 0.0.1 to to 0.1.0.\n")
	}

	envs, err := a.Environments()
	if err != nil {
		return err
	}

	if dryRun {
		fmt.Fprintf(a.out, "[dry run] Converting 0.0.1 environments to 0.1.0a:\n")
	}
	for _, env := range envs {
		a.convertEnvironment(env.Path, dryRun)
	}

	a.config.APIVersion = "0.1.0"

	if dryRun {
		data, err := yaml.Marshal(a.config)
		if err != nil {
			return err
		}

		fmt.Fprintf(a.out, "\n[dry run] Upgraded app.yaml:\n%s\n", string(data))
		fmt.Fprintf(a.out, "[dry run] You can preform the migration by running `ks upgrade`.\n")
		return nil
	}

	return a.save()
}

type k8sSchema struct {
	Info struct {
		Version string `json:"version,omitempty"`
	} `json:"info,omitempty"`
}

func read001EnvSpec(fs afero.Fs, name, path string) (*EnvironmentSpec, error) {
	b, err := afero.ReadFile(fs, path)
	if err != nil {
		return nil, err
	}

	var s EnvironmentDestinationSpec
	if err = json.Unmarshal(b, &s); err != nil {
		return nil, err
	}

	if s.Namespace == "" {
		s.Namespace = "default"
	}

	envPath := filepath.Dir(path)
	swaggerPath := filepath.Join(envPath, ".metadata", "swagger.json")

	b, err = afero.ReadFile(fs, swaggerPath)
	if err != nil {
		return nil, err
	}

	var ks k8sSchema
	if err = json.Unmarshal(b, &ks); err != nil {
		return nil, err
	}

	if ks.Info.Version == "" {
		return nil, errors.New("unable to determine environment Kubernetes version")
	}

	spec := EnvironmentSpec{
		Path:              name,
		Destination:       &s,
		KubernetesVersion: ks.Info.Version,
	}

	return &spec, nil
}

func (a *App001) convertEnvironment(envName string, dryRun bool) error {
	if err := a.load(); err != nil {
		return errors.Wrap(err, "load configuration")
	}

	path := filepath.Join(a.root, EnvironmentDirName, envName, "spec.json")
	env, err := read001EnvSpec(a.fs, envName, path)
	if err != nil {
		return err
	}

	a.config.Environments[envName] = env

	if dryRun {
		fmt.Fprintf(a.out, "[dry run]\t* adding the environment description in environment `%s to `app.yaml`.\n",
			envName)
		return nil
	}

	if err = a.fs.Remove(path); err != nil {
		return err
	}

	k8sSpecFlag := fmt.Sprintf("version:%s", env.KubernetesVersion)
	_, err = LibUpdater(a.fs, k8sSpecFlag, app010LibPath(a.root), true)
	if err != nil {
		return err
	}

	return a.save()
}

func (a *App001) appLibPath(envName string) string {
	return filepath.Join(a.root, EnvironmentDirName, envName, ".metadata")
}

func (a *App001) envDir(envName string) string {
	envParts := strings.Split(envName, "/")
	envRoot := filepath.Join(a.Root(), EnvironmentDirName)
	return filepath.Join(append([]string{envRoot}, envParts...)...)
}

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
	"os"
	"path/filepath"
	"sort"

	"github.com/ksonnet/ksonnet/metadata/lib"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

const (

	// appYamlName is the name for the app configuration.
	appYamlName = "app.yaml"

	// overrideYamlName is the name for the app overrides.
	overrideYamlName = "app.override.yaml"

	// EnvironmentDirName is the directory name for environments.
	EnvironmentDirName = "environments"

	// LibDirName is the directory name for libraries.
	LibDirName = "lib"
)

var (
	// DefaultFilePermissions are the default permissions for a file.
	DefaultFilePermissions = os.FileMode(0644)
	// DefaultFolderPermissions are the default permissions for a folder.
	DefaultFolderPermissions = os.FileMode(0755)

	// LibUpdater updates ksonnet lib versions.
	LibUpdater = updateLibData
)

// App is a ksonnet application.
type App interface {
	AddEnvironment(name, k8sSpecFlag string, spec *EnvironmentSpec, isOverride bool) error
	AddRegistry(spec *RegistryRefSpec, isOverride bool) error
	Environment(name string) (*EnvironmentSpec, error)
	Environments() (EnvironmentSpecs, error)
	EnvironmentParams(name string) (string, error)
	Fs() afero.Fs
	Init() error
	LibPath(envName string) (string, error)
	Libraries() (LibraryRefSpecs, error)
	Registries() (RegistryRefSpecs, error)
	RemoveEnvironment(name string, override bool) error
	RenameEnvironment(from, to string, override bool) error
	Root() string
	UpdateTargets(envName string, targets []string) error
	UpdateLib(name string, spec *LibraryRefSpec) error
	Upgrade(dryRun bool) error
}

// Load loads the application configuration.
func Load(fs afero.Fs, cwd string, skipFindRoot bool) (App, error) {
	appRoot := cwd
	if !skipFindRoot {
		var err error
		appRoot, err = findRoot(fs, cwd)
		if err != nil {
			return nil, err
		}
	}

	spec, err := read(fs, appRoot)
	if err != nil {
		return NewApp010(fs, appRoot), nil
	}

	switch spec.APIVersion {
	default:
		return nil, errors.Errorf("unknown apiVersion %q in %s", spec.APIVersion, appYamlName)
	case "0.0.1":
		return NewApp001(fs, appRoot), nil
	case "0.1.0":
		return NewApp010(fs, appRoot), nil
	}
}

func updateLibData(fs afero.Fs, k8sSpecFlag, libPath string, useVersionPath bool) (string, error) {
	lm, err := lib.NewManager(k8sSpecFlag, fs, libPath)
	if err != nil {
		return "", err
	}

	if lm.GenerateLibData(useVersionPath); err != nil {
		return "", err
	}

	return lm.K8sVersion, nil
}

func app010LibPath(root string) string {
	return filepath.Join(root, LibDirName)
}

// StubUpdateLibData always returns no error.
func StubUpdateLibData(fs afero.Fs, k8sSpecFlag, libPath string, useVersionPath bool) (string, error) {
	return "v1.8.7", nil
}

func moveEnvironment(fs afero.Fs, root, from, to string) error {
	toPath := filepath.Join(root, EnvironmentDirName, to)

	exists, err := afero.Exists(fs, filepath.Join(toPath, "main.jsonnet"))
	if err != nil {
		return err
	}

	if exists {
		return errors.Errorf("unable to rename %q because %q exists", from, to)
	}

	fromPath := filepath.Join(root, EnvironmentDirName, from)
	exists, err = afero.Exists(fs, fromPath)
	if err != nil {
		return err
	}

	if !exists {
		return errors.Errorf("environment %q does not exist", from)
	}

	// create to directory
	if err = fs.MkdirAll(toPath, DefaultFolderPermissions); err != nil {
		return err
	}

	fis, err := afero.ReadDir(fs, fromPath)
	if err != nil {
		return err
	}

	for _, fi := range fis {
		if fi.IsDir() && fi.Name() != ".metadata" {
			continue
		}

		oldPath := filepath.Join(fromPath, fi.Name())
		newPath := filepath.Join(toPath, fi.Name())
		if err := fs.Rename(oldPath, newPath); err != nil {
			return err
		}
	}

	return cleanEnv(fs, root)
}

func cleanEnv(fs afero.Fs, root string) error {
	var dirs []string

	envDir := filepath.Join(root, EnvironmentDirName)
	err := afero.Walk(fs, envDir, func(path string, fi os.FileInfo, err error) error {
		if !fi.IsDir() {
			return nil
		}

		dirs = append(dirs, path)
		return nil
	})

	if err != nil {
		return err
	}

	sort.Sort(sort.Reverse(sort.StringSlice(dirs)))

	for _, dir := range dirs {
		fis, err := afero.ReadDir(fs, dir)
		if err != nil {
			return err
		}

		if len(fis) == 0 {
			if err := fs.RemoveAll(dir); err != nil {
				return err
			}
		}
	}

	return nil
}

func findRoot(fs afero.Fs, cwd string) (string, error) {
	prev := cwd

	for {
		path := filepath.Join(cwd, appYamlName)
		exists, err := afero.Exists(fs, path)
		if err != nil {
			return "", err
		}

		if exists {
			return cwd, nil
		}

		cwd, err = filepath.Abs(filepath.Join(cwd, ".."))
		if err != nil {
			return "", err
		}

		if cwd == prev {
			return "", errors.Errorf("unable to find ksonnet project")
		}

		prev = cwd
	}
}

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

package component

import (
	"path"
	"path/filepath"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	param "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

func ResolvePath(ksApp app.App, path string) (Module, Component, error) {
	isDir, err := isComponentDir2(ksApp, path)
	if err != nil {
		return nil, nil, errors.Wrap(err, "check for namespace directory")
	}

	if isDir {
		ns, err := GetModule(ksApp, path)
		if err != nil {
			return nil, nil, err
		}

		return ns, nil, nil
	}

	module, cName, err := checkComponent(ksApp, path)
	if err != nil {
		return nil, nil, err
	}

	ns, err := GetModule(ksApp, module)
	if err != nil {
		return nil, nil, err
	}

	c, err := LocateComponent(ksApp, module, cName)
	if err != nil {
		return nil, nil, err
	}

	return ns, c, nil
}

var (
	// DefaultManager is the default manager for components.
	DefaultManager = &defaultManager{}
)

// Manager is an interface for interating with components.
type Manager interface {
	Components(ns Module) ([]Component, error)
	Component(ksApp app.App, module, componentName string) (Component, error)
	CreateComponent(ksApp app.App, name, text string, params param.Params, templateType prototype.TemplateType) (string, error)
	CreateModule(ksApp app.App, name string) error
	Module(ksApp app.App, moduleName string) (Module, error)
	Modules(ksApp app.App, envName string) ([]Module, error)
	NSResolveParams(ns Module) (string, error)
}

type defaultManager struct{}

var _ Manager = (*defaultManager)(nil)

func (dm *defaultManager) Modules(ksApp app.App, envName string) ([]Module, error) {
	return ModulesFromEnv(ksApp, envName)
}

func (dm *defaultManager) Module(ksApp app.App, module string) (Module, error) {
	return GetModule(ksApp, module)
}

func (dm *defaultManager) NSResolveParams(ns Module) (string, error) {
	return ns.ResolvedParams()
}

func (dm *defaultManager) Components(ns Module) ([]Component, error) {
	return ns.Components()
}

func (dm *defaultManager) Component(ksApp app.App, module, componentName string) (Component, error) {
	return LocateComponent(ksApp, module, componentName)
}

func (dm *defaultManager) CreateComponent(ksApp app.App, name, text string, params param.Params, templateType prototype.TemplateType) (string, error) {
	return Create(ksApp, name, text, params, templateType)
}

func (dm *defaultManager) CreateModule(ksApp app.App, name string) error {
	parts := strings.Split(name, "/")
	dir := filepath.Join(append([]string{ksApp.Root(), "components"}, parts...)...)

	if err := ksApp.Fs().MkdirAll(dir, app.DefaultFolderPermissions); err != nil {
		return err
	}

	paramsDir := filepath.Join(dir, "params.libsonnet")
	return afero.WriteFile(ksApp.Fs(), paramsDir, GenParamsContent(), app.DefaultFilePermissions)
}

func isComponentDir2(ksApp app.App, path string) (bool, error) {
	parts := strings.Split(path, "/")
	dir := filepath.Join(append([]string{ksApp.Root(), componentsRoot}, parts...)...)
	dir = filepath.Clean(dir)

	return afero.DirExists(ksApp.Fs(), dir)
}

func checkComponent(ksApp app.App, name string) (string, string, error) {
	parts := strings.Split(name, "/")
	base := filepath.Join(append([]string{ksApp.Root(), componentsRoot}, parts...)...)
	base = filepath.Clean(base)

	exts := []string{".yaml", ".jsonnet", ".json"}
	for _, ext := range exts {
		exists, err := afero.Exists(ksApp.Fs(), base+ext)
		if err != nil {
			return "", "", errors.Wrap(err, "check for component")
		}

		if exists {
			dir, file := path.Split(base)
			module := strings.TrimPrefix(dir, path.Join(ksApp.Root(), componentsRoot))
			if len(module) > 0 {
				module = strings.TrimSuffix(module, "/")
			}

			return module, file, nil
		}
	}

	return "", "", errors.Errorf("%q is not a component or a module", name)
}

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
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/params"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

func nsErrorMsg(format, module string) string {
	s := fmt.Sprintf("module %q", module)
	if module == "" {
		s = "root module"
	}

	return fmt.Sprintf(format, s)
}

// Module is a component module
type Module interface {
	Components() ([]Component, error)
	// TODO: is this needed?
	Dir() string
	Name() string
	Params(envName string) ([]ModuleParameter, error)
	ParamsPath() string
	ResolvedParams() (string, error)
	SetParam(path []string, value interface{}) error
	DeleteParam(path []string) error
}

// FilesystemModule is a component module that uses a filesystem for storage.
type FilesystemModule struct {
	path string

	app app.App
}

var _ Module = (*FilesystemModule)(nil)

// NewModule creates an instance of module.
func NewModule(ksApp app.App, path string) *FilesystemModule {
	return &FilesystemModule{app: ksApp, path: path}
}

// ExtractModuleComponent extracts a module and a component from a path.
func ExtractModuleComponent(a app.App, path string) (Module, string) {
	nsPath, component := filepath.Split(path)
	ns := &FilesystemModule{path: nsPath, app: a}
	return ns, component
}

// Name returns the module name.
func (n *FilesystemModule) Name() string {
	if n.path == "" {
		return "/"
	}
	return n.path
}

// GetModule gets a module by path.
func GetModule(a app.App, moduleName string) (Module, error) {
	parts := strings.Split(moduleName, "/")
	nsDir := filepath.Join(append([]string{a.Root(), componentsRoot}, parts...)...)

	exists, err := afero.Exists(a.Fs(), nsDir)
	if err != nil {
		return nil, err
	}

	if !exists {
		return nil, errors.New(nsErrorMsg("unable to find %s", moduleName))
	}

	return &FilesystemModule{path: moduleName, app: a}, nil
}

// ParamsPath generates the path to params.libsonnet for a module.
func (n *FilesystemModule) ParamsPath() string {
	return filepath.Join(n.Dir(), paramsFile)
}

// SetParam sets params for a module.
func (n *FilesystemModule) SetParam(path []string, value interface{}) error {
	paramsData, err := n.readParams()
	if err != nil {
		return err
	}

	updated, err := params.Set(path, paramsData, "", value, "global")
	if err != nil {
		return err
	}

	return n.writeParams(updated)
}

// DeleteParam deletes params for a module.
func (n *FilesystemModule) DeleteParam(path []string) error {
	paramsData, err := n.readParams()
	if err != nil {
		return err
	}

	updated, err := params.Delete(path, paramsData, "", "global")
	if err != nil {
		return err
	}

	return n.writeParams(updated)
}

func (n *FilesystemModule) writeParams(src string) error {
	return afero.WriteFile(n.app.Fs(), n.ParamsPath(), []byte(src), 0644)
}

// Dir is the absolute directory for a namespace.
func (n *FilesystemModule) Dir() string {
	parts := strings.Split(n.path, "/")
	path := []string{n.app.Root(), componentsRoot}
	if len(n.path) != 0 {
		path = append(path, parts...)
	}

	return filepath.Join(path...)
}

// ModuleParameter is a module parameter.
type ModuleParameter struct {
	Component string
	Index     string
	Key       string
	Value     string
}

// ResolvedParams resolves paramaters for a module. It returns a JSON encoded
// string of component parameters.
func (n *FilesystemModule) ResolvedParams() (string, error) {
	s, err := n.readParams()
	if err != nil {
		return "", err
	}

	return applyGlobals(s)
}

// Params returns the params for a module.
func (n *FilesystemModule) Params(envName string) ([]ModuleParameter, error) {
	components, err := n.Components()
	if err != nil {
		return nil, err
	}

	var nsps []ModuleParameter
	for _, c := range components {
		params, err := c.Params(envName)
		if err != nil {
			return nil, err
		}

		for _, p := range params {
			nsps = append(nsps, p)
		}
	}

	return nsps, nil
}

func (n *FilesystemModule) readParams() (string, error) {
	b, err := afero.ReadFile(n.app.Fs(), n.ParamsPath())
	if err != nil {
		return "", err
	}

	return string(b), nil
}

// ModulesFromEnv returns all modules given an environment.
func ModulesFromEnv(a app.App, env string) ([]Module, error) {
	paths, err := MakePaths(a, env)
	if err != nil {
		return nil, err
	}

	prefix := a.Root() + "/components"

	seen := make(map[string]bool)
	var namespaces []Module
	for _, path := range paths {
		module := strings.TrimPrefix(path, prefix)
		if _, ok := seen[module]; !ok {
			seen[module] = true
			ns, err := GetModule(a, module)
			if err != nil {
				return nil, err
			}

			namespaces = append(namespaces, ns)
		}
	}

	return namespaces, nil
}

// Modules returns all component modules
func Modules(a app.App) ([]Module, error) {
	componentRoot := filepath.Join(a.Root(), componentsRoot)

	var namespaces []Module

	err := afero.Walk(a.Fs(), componentRoot, func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if fi.IsDir() {
			ok, err := isComponentDir(a.Fs(), path)
			if err != nil {
				return err
			}

			if ok {
				nsPath := strings.TrimPrefix(path, componentRoot)
				nsPath = strings.TrimPrefix(nsPath, string(filepath.Separator))
				ns := &FilesystemModule{path: nsPath, app: a}
				namespaces = append(namespaces, ns)
			}
		}

		return nil
	})

	if err != nil {
		return nil, errors.Wrap(err, "walk component path")
	}

	sort.Slice(namespaces, func(i, j int) bool {
		return namespaces[i].Name() < namespaces[j].Name()
	})

	return namespaces, nil
}

// Components returns the components in a module.
func (n *FilesystemModule) Components() ([]Component, error) {
	parts := strings.Split(n.path, "/")
	nsDir := filepath.Join(append([]string{n.app.Root(), componentsRoot}, parts...)...)

	fis, err := afero.ReadDir(n.app.Fs(), nsDir)
	if err != nil {
		return nil, err
	}

	var components []Component
	for _, fi := range fis {

		ext := filepath.Ext(fi.Name())
		path := filepath.Join(nsDir, fi.Name())

		switch ext {
		// TODO: these should be constants
		case ".yaml", ".json":
			component := NewYAML(n.app, n.Name(), path, n.ParamsPath())
			components = append(components, component)
		case ".jsonnet":
			component := NewJsonnet(n.app, n.Name(), path, n.ParamsPath())
			components = append(components, component)
		}
	}

	return components, nil
}

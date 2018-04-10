// Copyright 2017 The ksonnet authors
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

package metadata

import (
	"os"
	"path"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	param "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

func (m *manager) ComponentPaths() ([]string, error) {
	paths := []string{}
	err := afero.Walk(m.appFS, m.componentsPath, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Only add file paths and exclude the params.libsonnet file
		if !info.IsDir() && path.Base(p) != componentParamsFile {
			paths = append(paths, p)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return paths, nil
}

func (m *manager) GetAllComponents() ([]component.Component, error) {
	ksApp, err := m.App()
	if err != nil {
		return nil, err
	}
	namespaces, err := component.Modules(ksApp)
	if err != nil {
		return nil, err
	}

	var components []component.Component
	for _, ns := range namespaces {

		comps, err := ns.Components()
		if err != nil {
			return nil, err
		}

		components = append(components, comps...)
	}

	return components, nil
}

func (m *manager) CreateComponent(name string, text string, params param.Params, templateType prototype.TemplateType) error {
	ksApp, err := m.App()
	if err != nil {
		return err
	}

	_, err = component.Create(ksApp, name, text, params, templateType)
	if err != nil {
		return errors.Wrap(err, "create component")
	}

	return nil
}

func (m *manager) GetComponentParams(component string) (param.Params, error) {
	text, err := afero.ReadFile(m.appFS, m.componentParamsPath)
	if err != nil {
		return nil, err
	}

	return param.GetComponentParams(component, string(text))
}

func (m *manager) GetAllComponentParams(root string) (map[string]param.Params, error) {
	ksApp, err := m.App()
	if err != nil {
		return nil, err
	}

	namespaces, err := component.Modules(ksApp)
	if err != nil {
		return nil, errors.Wrap(err, "find component namespaces")
	}

	out := make(map[string]param.Params)

	for _, ns := range namespaces {
		paramsPath := ns.ParamsPath()

		text, err := afero.ReadFile(m.appFS, paramsPath)
		if err != nil {
			return nil, err
		}

		params, err := param.GetAllComponentParams(string(text))
		if err != nil {
			return nil, errors.Wrapf(err, "get all component params for %s", ns.Name())
		}

		for k, v := range params {
			if ns.Name() != "" {
				k = ns.Name() + "/" + k
			}
			out[k] = v
		}
	}

	return out, nil
}

func (m *manager) SetComponentParams(path string, params param.Params) error {
	ksApp, err := m.App()
	if err != nil {
		return err
	}

	ns, componentName := component.ExtractModuleComponent(ksApp, path)
	paramsPath := ns.ParamsPath()

	text, err := afero.ReadFile(m.appFS, paramsPath)
	if err != nil {
		return err
	}

	jsonnet, err := param.SetComponentParams(componentName, string(text), params)
	if err != nil {
		return err
	}

	return afero.WriteFile(m.appFS, paramsPath, []byte(jsonnet), app.DefaultFilePermissions)
}

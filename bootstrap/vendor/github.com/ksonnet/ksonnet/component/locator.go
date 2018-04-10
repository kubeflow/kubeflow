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
	"os"
	"path/filepath"
	"sort"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

type componentPathLocator struct {
	app     app.App
	envName string
}

func newComponentPathLocator(a app.App, envName string) (*componentPathLocator, error) {
	if a == nil {
		return nil, errors.New("app is nil")
	}

	return &componentPathLocator{
		app:     a,
		envName: envName,
	}, nil
}

func (cpl *componentPathLocator) Locate() ([]string, error) {
	if cpl.envName == "" {
		return cpl.allNamespaces()
	}

	env, err := cpl.app.Environment(cpl.envName)
	if err != nil {
		return nil, err
	}

	targets := env.Targets
	rootPath := cpl.app.Root()

	if len(targets) == 0 {
		return []string{filepath.Join(rootPath, componentsRoot)}, nil
	}

	var paths []string

	for _, target := range targets {
		childPath := filepath.Join(rootPath, componentsRoot, target)
		exists, err := afero.DirExists(cpl.app.Fs(), childPath)
		if err != nil {
			return nil, err
		}

		if !exists {
			return nil, errors.Errorf("target %q is not valid", target)
		}

		paths = append(paths, childPath)
	}

	sort.Strings(paths)

	return paths, nil
}

func (cpl *componentPathLocator) allNamespaces() ([]string, error) {
	var paths []string

	root := filepath.Join(cpl.app.Root(), componentsRoot)
	err := afero.Walk(cpl.app.Fs(), root, func(path string, fi os.FileInfo, err error) error {
		if !fi.IsDir() {
			return nil
		}

		paramsPath := filepath.Join(path, paramsFile)
		exists, err := afero.Exists(cpl.app.Fs(), paramsPath)
		if err != nil {
			return err
		}

		if exists {
			paths = append(paths, path)
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return paths, nil
}

// isComponent reports if a file is a component. Components have a `jsonnet` extension.
func isComponent(path string) bool {
	for _, s := range []string{".jsonnet", ".yaml", "json"} {
		if s == filepath.Ext(path) {
			return true
		}
	}
	return false
}

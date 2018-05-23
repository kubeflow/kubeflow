// Copyright 2017 The kubecfg authors
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
	"fmt"
	"os/user"
	"path"
	"path/filepath"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

const (
	ksonnetDir      = ".ksonnet"
	registriesDir   = ksonnetDir + "/registries"
	libDir          = "lib"
	componentsDir   = "components"
	environmentsDir = "environments"
	vendorDir       = "vendor"

	// Files names.
	componentParamsFile = "params.libsonnet"
	baseLibsonnetFile   = "base.libsonnet"
	appYAMLFile         = "app.yaml"
	registryYAMLFile    = "registry.yaml"
	partsYAMLFile       = "parts.yaml"

	// ComponentsExtCodeKey is the ExtCode key for component imports
	ComponentsExtCodeKey = "__ksonnet/components"
	// EnvExtCodeKey is the ExtCode key for importing environment metadata
	EnvExtCodeKey = "__ksonnet/environments"
	// ParamsExtCodeKey is the ExtCode key for importing component parameters
	ParamsExtCodeKey = "__ksonnet/params"

	// User-level ksonnet directories.
	userKsonnetRootDir = ".ksonnet"
	pkgSrcCacheDir     = "src"
)

type manager struct {
	appFS afero.Fs

	// Application paths.
	rootPath         string
	ksonnetPath      string
	registriesPath   string
	libPath          string
	componentsPath   string
	environmentsPath string
	vendorPath       string

	componentParamsPath string
	baseLibsonnetPath   string
	appYAMLPath         string

	// User-level paths.
	userKsonnetRootPath string
	pkgSrcCachePath     string
}

func findManager(p string, appFS afero.Fs) (*manager, error) {
	var lastBase string
	currBase := p

	for {
		currPath := path.Join(currBase, ksonnetDir)
		exists, err := afero.Exists(appFS, currPath)
		if err != nil {
			return nil, err
		}
		if exists {
			m, err := newManager(currBase, appFS)
			if err != nil {
				return nil, err
			}

			app, err := m.App()
			if err != nil {
				return nil, err
			}

			if err = app.Init(); err != nil {
				return nil, errors.Wrap(err, "initialize app schema")
			}

			return m, nil
		}

		lastBase = currBase
		currBase = filepath.Dir(currBase)
		if lastBase == currBase {
			return nil, fmt.Errorf("No ksonnet application found")
		}
	}
}

func newManager(rootPath string, appFS afero.Fs) (*manager, error) {
	usr, err := user.Current()
	if err != nil {
		return nil, err
	}
	userRootPath := filepath.Join(usr.HomeDir, userKsonnetRootDir)

	m := &manager{
		appFS: appFS,

		// Application paths.
		rootPath:         rootPath,
		ksonnetPath:      filepath.Join(rootPath, ksonnetDir),
		registriesPath:   filepath.Join(rootPath, registriesDir),
		libPath:          filepath.Join(rootPath, libDir),
		componentsPath:   filepath.Join(rootPath, componentsDir),
		environmentsPath: filepath.Join(rootPath, environmentsDir),
		vendorPath:       filepath.Join(rootPath, vendorDir),

		componentParamsPath: filepath.Join(rootPath, componentsDir, componentParamsFile),
		baseLibsonnetPath:   filepath.Join(rootPath, environmentsDir, baseLibsonnetFile),
		appYAMLPath:         filepath.Join(rootPath, appYAMLFile),

		// User-level paths.
		userKsonnetRootPath: userRootPath,
		pkgSrcCachePath:     filepath.Join(userRootPath, pkgSrcCacheDir),
	}

	return m, nil
}

func (m *manager) Root() string {
	return m.rootPath
}

func (m *manager) App() (app.App, error) {
	return app.Load(m.appFS, m.rootPath, false)
}

func (m *manager) LibPaths() (envPath, vendorPath string) {
	return m.environmentsPath, m.vendorPath
}

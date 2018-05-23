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
	"path/filepath"

	"github.com/ksonnet/ksonnet/pkg/env"

	param "github.com/ksonnet/ksonnet/metadata/params"
)

const (
	// primary environment files
	envFileName    = "main.jsonnet"
	paramsFileName = "params.libsonnet"
)

var (
	// envCreate is a function which creates environments.
	envCreate = env.Create
)

func (m *manager) GetEnvironmentParams(name, module string) (map[string]param.Params, error) {
	a, err := m.App()
	if err != nil {
		return nil, err
	}

	config := env.GetParamsConfig{
		App: a,
	}

	return env.GetParams(name, module, config)
}

func (m *manager) SetEnvironmentParams(envName, component string, params param.Params) error {
	a, err := m.App()
	if err != nil {
		return err
	}

	config := env.SetParamsConfig{
		App: a,
	}

	return env.SetParams(envName, component, params, config)
}

func (m *manager) EnvPaths(env string) (libPath, mainPath, paramsPath string, err error) {
	mainPath, paramsPath = m.makeEnvPaths(env)
	libPath, err = m.getLibPath(env)
	return
}

func (m *manager) makeEnvPaths(env string) (mainPath, paramsPath string) {
	envPath := filepath.Join(m.environmentsPath, env)

	// main.jsonnet file
	mainPath = filepath.Join(envPath, envFileName)
	// params.libsonnet file
	paramsPath = filepath.Join(envPath, componentParamsFile)

	return
}

func (m *manager) getLibPath(envName string) (string, error) {
	a, err := m.App()
	if err != nil {
		return "", err
	}

	return a.LibPath(envName)
}

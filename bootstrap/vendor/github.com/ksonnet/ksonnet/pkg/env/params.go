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

package env

import (
	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	param "github.com/ksonnet/ksonnet/metadata/params"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

// SetParamsConfig is config items for setting environment params.
type SetParamsConfig struct {
	App app.App
}

// SetParams sets params for an environment.
func SetParams(envName, component string, params param.Params, config SetParamsConfig) error {
	if err := ensureEnvExists(config.App, envName); err != nil {
		return err
	}

	path := envPath(config.App, envName, paramsFileName)

	text, err := afero.ReadFile(config.App.Fs(), path)
	if err != nil {
		return err
	}

	appended, err := param.SetEnvironmentParams(component, string(text), params)
	if err != nil {
		return err
	}

	err = afero.WriteFile(config.App.Fs(), path, []byte(appended), app.DefaultFilePermissions)
	if err != nil {
		return err
	}

	log.Debugf("Successfully set parameters for component %q at environment %q", component, envName)
	return nil
}

// DeleteParam deletes a param in an environment.
func DeleteParam(a app.App, envName, component, name string) error {
	if err := ensureEnvExists(a, envName); err != nil {
		return err
	}

	path := envPath(a, envName, paramsFileName)

	text, err := afero.ReadFile(a.Fs(), path)
	if err != nil {
		return err
	}

	updated, err := param.DeleteEnvironmentParam(component, name, string(text))
	if err != nil {
		return err
	}

	err = afero.WriteFile(a.Fs(), path, []byte(updated), app.DefaultFilePermissions)
	if err != nil {
		return err
	}

	log.Debugf("deleted parameter %q for component %q at environment %q",
		name, component, envName)
	return nil
}

// GetParamsConfig is config items for getting environment params.
type GetParamsConfig struct {
	App app.App
}

// GetParams gets all parameters for an environment.
func GetParams(envName, module string, config GetParamsConfig) (map[string]param.Params, error) {
	if err := ensureEnvExists(config.App, envName); err != nil {
		return nil, err
	}

	// Get the environment specific params
	envParamsPath := envPath(config.App, envName, paramsFileName)
	envParamsText, err := afero.ReadFile(config.App.Fs(), envParamsPath)
	if err != nil {
		return nil, err
	}
	envParams, err := param.GetAllEnvironmentParams(string(envParamsText))
	if err != nil {
		return nil, err
	}

	// figure out what component we need
	ns := component.NewModule(config.App, module)
	componentParamsFile, err := afero.ReadFile(config.App.Fs(), ns.ParamsPath())
	if err != nil {
		return nil, err
	}

	componentParams, err := param.GetAllComponentParams(string(componentParamsFile))
	if err != nil {
		return nil, err
	}

	return mergeParamMaps(componentParams, envParams), nil
}

// TODO: move this to the consolidated params support namespace.
func mergeParamMaps(base, overrides map[string]param.Params) map[string]param.Params {
	for component, params := range overrides {
		if _, contains := base[component]; !contains {
			base[component] = params
		} else {
			for k, v := range params {
				base[component][k] = v
			}
		}
	}
	return base
}

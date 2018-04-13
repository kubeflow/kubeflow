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
	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	param "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/spf13/afero"
)

var appFS afero.Fs

// Manager abstracts over a ksonnet application's metadata, allowing users to do
// things like: create and delete environments; search for prototypes; vendor
// libraries; and other non-core-application tasks.
type Manager interface {
	// App returns the object for the application.
	App() (app.App, error)
	Root() string
	LibPaths() (envPath, vendorPath string)
	EnvPaths(env string) (libPath, mainPath, paramsPath string, err error)

	// Components API.
	ComponentPaths() ([]string, error)
	GetAllComponents() ([]component.Component, error)
	CreateComponent(name string, text string, params param.Params, templateType prototype.TemplateType) error

	// Params API.
	SetComponentParams(component string, params param.Params) error
	GetComponentParams(name string) (param.Params, error)
	GetAllComponentParams(cwd string) (map[string]param.Params, error)
	// GetEnvironmentParams will take the name of an environment and return a
	// mapping of parameters of the form:
	// componentName => {param key => param val}
	// i.e.: "nginx" => {"replicas" => 1, "name": "nginx"}
	GetEnvironmentParams(name, module string) (map[string]param.Params, error)
	SetEnvironmentParams(env, component string, params param.Params) error
}

// Find will recursively search the current directory and its parents for a
// `.ksonnet` folder, which marks the application root. Returns error if there
// is no application root.
func Find(path string) (Manager, error) {
	return findManager(path, afero.NewOsFs())
}

func init() {
	appFS = afero.NewOsFs()
}

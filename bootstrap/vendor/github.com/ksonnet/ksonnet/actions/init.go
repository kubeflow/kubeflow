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

package actions

import (
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/appinit"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/spf13/afero"
)

const (
	defaultIncubatorRegName = "incubator"
	defaultIncubatorURI     = "github.com/ksonnet/parts/tree/master/" + defaultIncubatorRegName
)

// RunInit initializes an app.
func RunInit(m map[string]interface{}) error {
	i, err := NewInit(m)
	if err != nil {
		return err
	}

	return i.Run()
}

type appLoadFn func(fs afero.Fs, root string, skipFindRoot bool) (app.App, error)

type appInitFn func(fs afero.Fs, name, rootPath, envName, k8sSpecFlag, serverURI, namespace string, registries []registry.Registry) error

type initIncubatorFn func(app.App) (registry.Registry, error)

// Init creates a component namespace
type Init struct {
	fs                    afero.Fs
	name                  string
	rootPath              string
	envName               string
	k8sSpecFlag           string
	serverURI             string
	namespace             string
	skipDefaultRegistries bool

	appInitFn       appInitFn
	appLoadFn       appLoadFn
	initIncubatorFn initIncubatorFn
}

// NewInit creates an instance of Init.
func NewInit(m map[string]interface{}) (*Init, error) {
	ol := newOptionLoader(m)

	i := &Init{
		fs:                    ol.loadFs(OptionFs),
		name:                  ol.loadString(OptionName),
		rootPath:              ol.loadString(OptionRootPath),
		envName:               ol.loadString(OptionEnvName),
		k8sSpecFlag:           ol.loadString(OptionSpecFlag),
		serverURI:             ol.loadOptionalString(OptionServer),
		namespace:             ol.loadString(OptionNamespace),
		skipDefaultRegistries: ol.loadBool(OptionSkipDefaultRegistries),

		appInitFn:       appinit.Init,
		appLoadFn:       app.Load,
		initIncubatorFn: initIncubator,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return i, nil
}

// Run runs that ns create action.
func (i *Init) Run() error {
	var registries []registry.Registry

	if !i.skipDefaultRegistries {
		a, err := i.appLoadFn(i.fs, i.rootPath, true)
		if err != nil {
			return err
		}

		gh, err := i.initIncubatorFn(a)
		if err != nil {
			return err
		}

		registries = append(registries, gh)
	}

	return i.appInitFn(
		i.fs,
		i.name,
		i.rootPath,
		i.envName,
		i.k8sSpecFlag,
		i.serverURI,
		i.namespace,
		registries,
	)
}

func initIncubator(a app.App) (registry.Registry, error) {
	return registry.NewGitHub(
		a,
		&app.RegistryRefSpec{
			Name:     "incubator",
			Protocol: registry.ProtocolGitHub,
			URI:      defaultIncubatorURI,
		})
}

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
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/pkg/registry"
)

// DepCacher is a function that caches a dependency.j
type DepCacher func(app.App, pkg.Descriptor, string) error

// RunPkgInstall runs `pkg install`
func RunPkgInstall(m map[string]interface{}) error {
	pi, err := NewPkgInstall(m)
	if err != nil {
		return err
	}

	return pi.Run()
}

// PkgInstall installs packages.
type PkgInstall struct {
	app         app.App
	libName     string
	customName  string
	depCacherFn DepCacher
}

// NewPkgInstall creates an instance of PkgInstall.
func NewPkgInstall(m map[string]interface{}) (*PkgInstall, error) {
	ol := newOptionLoader(m)

	nl := &PkgInstall{
		app:        ol.loadApp(),
		libName:    ol.loadString(OptionLibName),
		customName: ol.loadString(OptionName),

		depCacherFn: registry.CacheDependency,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return nl, nil
}

// Run installs packages.
func (pi *PkgInstall) Run() error {
	d, customName, err := pi.parseDepSpec()
	if err != nil {
		return err
	}

	return pi.depCacherFn(pi.app, d, customName)
}

func (pi *PkgInstall) parseDepSpec() (pkg.Descriptor, string, error) {
	d, err := pkg.ParseName(pi.libName)
	if err != nil {
		return pkg.Descriptor{}, "", err
	}

	customName := pi.customName
	if customName == "" {
		customName = d.Part
	}

	return d, customName, nil
}

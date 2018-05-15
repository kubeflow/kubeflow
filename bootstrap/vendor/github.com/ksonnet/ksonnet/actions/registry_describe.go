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
	"fmt"
	"io"
	"os"
	"sort"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/registry"
	"github.com/pkg/errors"
)

// RunRegistryDescribe runs `prototype list`
func RunRegistryDescribe(m map[string]interface{}) error {
	rd, err := NewRegistryDescribe(m)
	if err != nil {
		return err
	}

	return rd.Run()
}

// RegistryDescribe describes a registry
type RegistryDescribe struct {
	app                 app.App
	name                string
	out                 io.Writer
	fetchRegistrySpecFn func(a app.App, name string) (*registry.Spec, *app.RegistryRefSpec, error)
}

// NewRegistryDescribe creates an instance of RegistryDescribe
func NewRegistryDescribe(m map[string]interface{}) (*RegistryDescribe, error) {
	ol := newOptionLoader(m)

	rd := &RegistryDescribe{
		app:  ol.loadApp(),
		name: ol.loadString(OptionName),

		out:                 os.Stdout,
		fetchRegistrySpecFn: fetchRegistrySpec,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return rd, nil
}

// Run runs the env list action.
func (rd *RegistryDescribe) Run() error {
	spec, regRef, err := rd.fetchRegistrySpecFn(rd.app, rd.name)
	if err != nil {
		return err
	}

	fmt.Fprintln(rd.out, `REGISTRY NAME:`)
	fmt.Fprintln(rd.out, regRef.Name)
	fmt.Fprintln(rd.out)
	fmt.Fprintln(rd.out, `URI:`)
	fmt.Fprintln(rd.out, regRef.URI)
	fmt.Fprintln(rd.out)
	fmt.Fprintln(rd.out, `PROTOCOL:`)
	fmt.Fprintln(rd.out, regRef.Protocol)
	fmt.Fprintln(rd.out)
	fmt.Fprintln(rd.out, `PACKAGES:`)

	libs := make([]string, 0, len(spec.Libraries))
	for _, lib := range spec.Libraries {
		libs = append(libs, lib.Path)
	}
	sort.Strings(libs)
	for _, libPath := range libs {
		fmt.Fprintf(rd.out, "  %s\n", libPath)
	}

	return nil
}

func fetchRegistrySpec(a app.App, name string) (*registry.Spec, *app.RegistryRefSpec, error) {
	appRegistries, err := a.Registries()
	if err != nil {
		return nil, nil, err
	}
	regRef, exists := appRegistries[name]
	if !exists {
		return nil, nil, errors.Errorf("registry %q doesn't exist", name)
	}

	r, err := registry.Locate(a, regRef)
	if err != nil {
		return nil, nil, err
	}

	spec, err := r.FetchRegistrySpec()
	if err != nil {
		return nil, nil, err
	}

	return spec, regRef, nil
}

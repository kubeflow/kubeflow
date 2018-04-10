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

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/pkg/registry"
)

// RunPkgDescribe runs `pkg install`
func RunPkgDescribe(m map[string]interface{}) error {
	pd, err := NewPkgDescribe(m)
	if err != nil {
		return err
	}

	return pd.Run()
}

// PkgDescribe describes a package.
type PkgDescribe struct {
	app            app.App
	pkgName        string
	out            io.Writer
	libPartFn      func(app.App, string) (*pkg.Package, error)
	registryPartFn func(app.App, string) (*pkg.Package, error)
}

// NewPkgDescribe creates an instance of PkgDescribe.
func NewPkgDescribe(m map[string]interface{}) (*PkgDescribe, error) {
	ol := newOptionLoader(m)

	pd := &PkgDescribe{
		app:     ol.loadApp(),
		pkgName: ol.loadString(OptionPackageName),

		out:            os.Stdout,
		libPartFn:      pkg.Find,
		registryPartFn: registry.Package,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return pd, nil
}

// Run describes a package.
func (pd *PkgDescribe) Run() error {
	d, err := pkg.ParseName(pd.pkgName)
	if err != nil {
		return err
	}

	var p *pkg.Package
	if d.Registry == "" {
		p, err = pd.libPartFn(pd.app, pd.pkgName)
		if err != nil {
			return err
		}
	} else {
		p, err = pd.registryPartFn(pd.app, pd.pkgName)
		if err != nil {
			return err
		}
	}

	fmt.Fprintln(pd.out, `LIBRARY NAME:`)
	fmt.Fprintln(pd.out, p.Name)
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `DESCRIPTION:`)
	fmt.Fprintln(pd.out, p.Description)
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `PROTOTYPES:`)

	for _, proto := range p.Prototypes {
		fmt.Fprintf(pd.out, "  %s\n", proto.Name)
	}

	return nil
}

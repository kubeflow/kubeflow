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

package pkg

import (
	"os"
	"path/filepath"

	"github.com/spf13/afero"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/parts"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/pkg/errors"
)

// Package is a ksonnet package.
type Package struct {
	Name        string
	Description string
	Prototypes  prototype.SpecificationSchemas
}

// New creates a new new instance of Package using a part.
func New(a app.App, d Descriptor, part *parts.Spec) (*Package, error) {
	prototypes, err := LoadPrototypes(a, d)
	if err != nil {
		return nil, err
	}

	p := &Package{
		Name:        part.Name,
		Description: part.Description,
		Prototypes:  prototypes,
	}

	return p, nil
}

// NewFromData creates a new instance of Package using part data bytes.
func NewFromData(a app.App, d Descriptor, data []byte) (*Package, error) {
	part, err := parts.Unmarshal(data)
	if err != nil {
		return nil, err
	}

	return New(a, d, part)
}

// LoadPrototypes returns prototypes for a Package.
func LoadPrototypes(a app.App, d Descriptor) (prototype.SpecificationSchemas, error) {
	vp := vendorPath(a)

	var prototypes prototype.SpecificationSchemas

	protoPath := filepath.Join(vp, d.Registry, d.Part, "prototypes")
	exists, err := afero.DirExists(a.Fs(), protoPath)
	if err != nil {
		return nil, err
	}

	if !exists {
		return prototypes, nil
	}

	err = afero.Walk(a.Fs(), protoPath, func(path string, fi os.FileInfo, err error) error {
		if fi.IsDir() || filepath.Ext(path) != ".jsonnet" {
			return nil
		}

		data, err := afero.ReadFile(a.Fs(), path)
		if err != nil {
			return err
		}

		spec, err := prototype.FromJsonnet(string(data))
		if err != nil {
			return err
		}

		prototypes = append(prototypes, spec)
		return nil
	})

	if err != nil {
		return nil, err
	}

	return prototypes, nil

}

// Find finds a package by name.
func Find(a app.App, name string) (*Package, error) {
	d, err := ParseName(name)
	if err != nil {
		return nil, err
	}

	libs, err := a.Libraries()
	if err != nil {
		return nil, err
	}

	lib, ok := libs[d.Part]
	if !ok {
		return nil, errors.Errorf("library %q not found", d.Part)
	}

	partConfigPath := filepath.Join(vendorPath(a), lib.Registry, d.Part, "parts.yaml")
	exists, err := afero.Exists(a.Fs(), partConfigPath)
	if err != nil {
		return nil, err
	}

	if !exists {
		return nil, errors.Errorf("part %q configuration not found in %s", d.Part, partConfigPath)
	}

	data, err := afero.ReadFile(a.Fs(), partConfigPath)
	if err != nil {
		return nil, err
	}

	return NewFromData(a, d, data)
}

func vendorPath(a app.App) string {
	return filepath.Join(a.Root(), "vendor")
}

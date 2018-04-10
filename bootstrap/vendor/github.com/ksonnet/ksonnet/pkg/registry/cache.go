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

package registry

import (
	"fmt"
	"path/filepath"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

// CacheDependency vendors registry dependencies.
// TODO: create unit tests for this once mocks for this package are
// worked out.
func CacheDependency(a app.App, d pkg.Descriptor, customName string) error {
	libs, err := a.Libraries()
	if err != nil {
		return err
	}

	if _, ok := libs[customName]; ok {
		return errors.Errorf("package '%s' already exists. Use the --name flag to install this package with a unique identifier",
			customName)
	}

	registries, err := a.Registries()
	if err != nil {
		return err
	}

	regRefSpec, exists := registries[d.Registry]
	if !exists {
		return fmt.Errorf("registry '%s' does not exist", d.Registry)
	}

	r, err := Locate(a, regRefSpec)
	if err != nil {
		return err
	}

	vendorPath := filepath.Join(a.Root(), "vendor")

	// Get all directories and files first, then write to disk. This
	// protects us from failing with a half-cached dependency because of
	// a network failure.
	directories := []string{}
	files := map[string][]byte{}
	_, libRef, err := r.ResolveLibrary(
		d.Part,
		customName,
		d.Version,
		func(relPath string, contents []byte) error {
			files[filepath.Join(vendorPath, relPath)] = contents
			return nil
		},
		func(relPath string) error {
			directories = append(directories, filepath.Join(vendorPath, relPath))
			return nil
		})
	if err != nil {
		return err
	}

	// Add library to app specification, but wait to write it out until
	// the end, in case one of the network calls fails.
	log.Infof("Retrieved %d files", len(files))

	for _, dir := range directories {
		if err = a.Fs().MkdirAll(dir, app.DefaultFolderPermissions); err != nil {
			return err
		}
	}

	for path, content := range files {
		if err = afero.WriteFile(a.Fs(), path, content, app.DefaultFilePermissions); err != nil {
			return err
		}
	}

	libRef.Registry = d.Registry

	return a.UpdateLib(libRef.Name, libRef)
}

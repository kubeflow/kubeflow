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
	"path/filepath"

	"github.com/ksonnet/ksonnet/metadata/app"
	log "github.com/sirupsen/logrus"
)

// Delete deletes an environment.
func Delete(a app.App, name string, override bool) error {
	d, err := newDeleter(a, name, override)
	if err != nil {
		return err
	}
	return d.Delete()
}

type deleter struct {
	app      app.App
	name     string
	override bool
}

func newDeleter(a app.App, name string, override bool) (*deleter, error) {
	return &deleter{
		app:      a,
		name:     name,
		override: override,
	}, nil
}

func (d *deleter) Delete() error {
	envPath, err := filepath.Abs(filepath.Join(d.app.Root(), envRoot, d.name))
	if err != nil {
		return err
	}

	log.Infof("Deleting environment %q with metadata at path %q", d.name, envPath)

	// Remove the directory and all files within the environment path.
	if err = d.app.Fs().RemoveAll(envPath); err != nil {
		// if err = d.cleanEmptyParentDirs(); err != nil {
		log.Debugf("Failed to remove environment directory at path %q", envPath)
		return err
	}

	if err = d.app.RemoveEnvironment(d.name, d.override); err != nil {
		return err
	}

	if err = cleanEmptyDirs(d.app); err != nil {
		return err
	}

	log.Infof("Successfully removed environment '%s'", d.name)
	return nil
}

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
	"fmt"
	"os"
	"path/filepath"

	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"

	"github.com/ksonnet/ksonnet/metadata/app"
)

// Rename renames an environment
func Rename(a app.App, from, to string, override bool) error {
	r, err := newRenamer(a, from, to, override)
	if err != nil {
		return err
	}
	return r.Rename()
}

type renamer struct {
	app      app.App
	from     string
	to       string
	override bool
}

func newRenamer(a app.App, from, to string, override bool) (*renamer, error) {
	return &renamer{
		app:      a,
		from:     from,
		to:       to,
		override: override,
	}, nil
}

func (r *renamer) Rename() error {
	if r.from == r.to || r.to == "" {
		return nil
	}

	if err := r.preflight(); err != nil {
		return err
	}

	log.Infof("Setting environment name from %q to %q", r.from, r.to)

	if err := r.app.RenameEnvironment(r.from, r.to, r.override); err != nil {
		return err
	}

	if err := cleanEmptyDirs(r.app); err != nil {
		return errors.Wrap(err, "clean empty directories")
	}

	log.Infof("Successfully moved %q to %q", r.from, r.to)
	return nil
}

func (r *renamer) preflight() error {
	if !isValidName(r.to) {
		return fmt.Errorf("Environment name %q is not valid; must not contain punctuation, spaces, or begin or end with a slash",
			r.to)
	}

	exists, err := envExists(r.app, r.to)
	if err != nil {
		log.Debugf("Failed to check whether environment %q already exists", r.to)
		return err
	}
	if exists {
		return fmt.Errorf("Failed to update %q; environment %q exists", r.from, r.to)
	}

	return nil
}

func envExists(ksApp app.App, name string) (bool, error) {
	path := envPath(ksApp, name, envFileName)
	return afero.Exists(ksApp.Fs(), path)
}

func ensureEnvExists(a app.App, name string) error {
	exists, err := envExists(a, name)
	if err != nil {
		return err
	}

	if !exists {
		return errors.Errorf("environment %q does not exist", name)
	}

	return nil
}

func envPath(ksApp app.App, name string, subPath ...string) string {
	return filepath.Join(append([]string{ksApp.Root(), envRoot, name}, subPath...)...)
}

func cleanEmptyDirs(ksApp app.App) error {
	log.Debug("Removing empty environment directories, if any")
	envPath := filepath.Join(ksApp.Root(), envRoot)
	return afero.Walk(ksApp.Fs(), envPath, func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return nil
		}

		if !fi.IsDir() {
			return nil
		}

		isEmpty, err := afero.IsEmpty(ksApp.Fs(), path)
		if err != nil {
			log.Debugf("Failed to check whether directory at path %q is empty", path)
			return err
		}
		if isEmpty {
			return ksApp.Fs().RemoveAll(path)
		}
		return nil
	})
}

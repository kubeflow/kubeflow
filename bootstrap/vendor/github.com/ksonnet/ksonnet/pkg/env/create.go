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
	"path"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

const (
	// DefaultEnvName is the name of the default environment.
	DefaultEnvName = "default"
)

// Create creates a new environment for the project.
func Create(a app.App, d Destination, name, k8sSpecFlag string, overrideData, paramsData []byte, isOverride bool) error {
	c, err := newCreator(a, d, name, k8sSpecFlag, overrideData, paramsData, isOverride)
	if err != nil {
		return err
	}
	return c.Create()
}

type creator struct {
	app          app.App
	d            Destination
	name         string
	k8sSpecFlag  string
	overrideData []byte
	paramsData   []byte
	isOverride   bool
}

func newCreator(a app.App, d Destination, name, k8sSpecFlag string, overrideData, paramsData []byte, isOverride bool) (*creator, error) {
	return &creator{
		app:          a,
		d:            d,
		name:         name,
		k8sSpecFlag:  k8sSpecFlag,
		overrideData: overrideData,
		paramsData:   paramsData,
		isOverride:   isOverride,
	}, nil
}

func (c *creator) Create() error {
	if c.environmentExists() {
		return errors.Errorf("environment %q already exists", c.name)
	}

	// ensure environment name does not contain punctuation
	if !isValidName(c.name) {
		return fmt.Errorf("environment name %q is not valid; must not contain punctuation, spaces, or begin or end with a slash", c.name)
	}

	log.Infof("Creating environment %q with namespace %q, pointing to cluster at address %q",
		c.name, c.d.Namespace(), c.d.Server())

	envPath := filepath.Join(c.app.Root(), app.EnvironmentDirName, c.name)
	err := c.app.Fs().MkdirAll(envPath, app.DefaultFolderPermissions)
	if err != nil {
		return err
	}

	metadata := []struct {
		path string
		data []byte
	}{
		{
			// environment base override file
			filepath.Join(envPath, envFileName),
			c.overrideData,
		},
		{
			// params file
			filepath.Join(envPath, paramsFileName),
			c.paramsData,
		},
	}

	for _, a := range metadata {
		fileName := path.Base(a.path)
		log.Debugf("Generating '%s', length: %d", fileName, len(a.data))
		if err = afero.WriteFile(c.app.Fs(), a.path, a.data, app.DefaultFilePermissions); err != nil {
			log.Debugf("Failed to write '%s'", fileName)
			return err
		}
	}

	// update app.yaml
	err = c.app.AddEnvironment(c.name, c.k8sSpecFlag, &app.EnvironmentSpec{
		Path: c.name,
		Destination: &app.EnvironmentDestinationSpec{
			Server:    c.d.Server(),
			Namespace: c.d.Namespace(),
		},
	}, c.isOverride)

	return err
}

func (c *creator) environmentExists() bool {
	if c.isOverride {
		return false
	}

	_, err := c.app.Environment(c.name)
	if err != nil {
		return false
	}

	return true
}

// isValidName returns true if a name (e.g., for an environment) is valid.
// Broadly, this means it does not contain punctuation, whitespace, leading or
// trailing slashes.
func isValidName(name string) bool {
	// No unicode whitespace is allowed. `Fields` doesn't handle trailing or
	// leading whitespace.
	fields := strings.Fields(name)
	if len(fields) > 1 || len(strings.TrimSpace(name)) != len(name) {
		return false
	}

	hasPunctuation := regexp.MustCompile(`[\\,;':!()?"{}\[\]*&%@$]+`).MatchString
	hasTrailingSlashes := regexp.MustCompile(`/+$`).MatchString
	hasLeadingSlashes := regexp.MustCompile(`^/+`).MatchString
	return len(name) != 0 && !hasPunctuation(name) && !hasTrailingSlashes(name) && !hasLeadingSlashes(name)
}

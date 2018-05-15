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
	"net/url"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/registry"
)

// RunRegistryAdd runs `registry add`
func RunRegistryAdd(m map[string]interface{}) error {
	ra, err := NewRegistryAdd(m)
	if err != nil {
		return err
	}

	return ra.Run()
}

// RegistryAdd adds a registry.
type RegistryAdd struct {
	app           app.App
	name          string
	uri           string
	version       string
	isOverride    bool
	registryAddFn func(a app.App, name, protocol, uri, version string, isOverride bool) (*registry.Spec, error)
}

// NewRegistryAdd creates an instance of RegistryAdd.
func NewRegistryAdd(m map[string]interface{}) (*RegistryAdd, error) {
	ol := newOptionLoader(m)

	ra := &RegistryAdd{
		app:        ol.loadApp(),
		name:       ol.loadString(OptionName),
		uri:        ol.loadString(OptionURI),
		version:    ol.loadString(OptionVersion),
		isOverride: ol.loadBool(OptionOverride),

		registryAddFn: registry.Add,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return ra, nil
}

// Run adds a registry.
func (ra *RegistryAdd) Run() error {
	uri, protocol := ra.protocol()
	_, err := ra.registryAddFn(ra.app, ra.name, protocol, uri, ra.version, ra.isOverride)
	return err
}

func (ra *RegistryAdd) protocol() (string, string) {
	if strings.HasPrefix(ra.uri, "file://") {
		return ra.uri, registry.ProtocolFilesystem
	}

	if strings.HasPrefix(ra.uri, "/") {
		u := url.URL{
			Scheme: "file",
			Path:   ra.uri,
		}

		return u.String(), registry.ProtocolFilesystem
	}

	return ra.uri, registry.ProtocolGitHub
}

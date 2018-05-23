// Copyright 2017 The kubecfg authors
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

	"github.com/blang/semver"
	"github.com/ghodss/yaml"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
)

const (
	// DefaultAPIVersion is the default version of the registry API.
	DefaultAPIVersion = "0.1.0"
	// DefaultKind is the default kind of the registry API.
	DefaultKind = "ksonnet.io/registry"
)

// Spec describes how a registry is stored.
type Spec struct {
	APIVersion string              `json:"apiVersion"`
	Kind       string              `json:"kind"`
	GitVersion *app.GitVersionSpec `json:"gitVersion"`
	Libraries  LibraryRefSpecs     `json:"libraries"`
}

// Unmarshal unmarshals bytes to a Spec.
func Unmarshal(bytes []byte) (*Spec, error) {
	schema := Spec{}
	err := yaml.Unmarshal(bytes, &schema)
	if err != nil {
		return nil, err
	}

	if err = schema.validate(); err != nil {
		return nil, err
	}

	return &schema, nil
}

// Marshal marshals a Spec to YAML.
func (s *Spec) Marshal() ([]byte, error) {
	return yaml.Marshal(s)
}

func (s *Spec) validate() error {
	// Originally, the default value for `apiVersion` was `0.1`. This is not a
	// valid semver, so before we do anything, we need to convert it to one.
	if s.APIVersion == "0.1" {
		s.APIVersion = "0.1.0"
	}

	compatVer, _ := semver.Make(DefaultAPIVersion)
	ver, err := semver.Make(s.APIVersion)
	if err != nil {
		return errors.Wrap(err, "Failed to parse version in app spec")
	} else if compatVer.Compare(ver) != 0 {
		return fmt.Errorf(
			"Registry uses unsupported spec version '%s' (this client only supports %s)",
			s.APIVersion,
			DefaultAPIVersion)
	}

	return nil
}

// Specs is a slice of *Spec.
type Specs []*Spec

// LibraryRef is library reference.
type LibraryRef struct {
	Version string `json:"version"`
	Path    string `json:"path"`
}

// LibraryRefSpecs maps LibraryRefs to a name.
type LibraryRefSpecs map[string]*LibraryRef

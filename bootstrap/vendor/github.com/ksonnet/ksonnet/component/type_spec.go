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

package component

import (
	"strings"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/ksonnet"
	"github.com/pkg/errors"
)

// TypeSpec describes an object's type.
type TypeSpec struct {
	// kind is the kind for the object.
	kind string
	// APIVersion is the api version of the object.
	apiVersion string
}

// NewTypeSpec creates an instance of TypeSpec.
func NewTypeSpec(apiVersion, kind string) (*TypeSpec, error) {
	ts := &TypeSpec{
		kind:       kind,
		apiVersion: apiVersion,
	}

	if err := ts.validate(); err != nil {
		return nil, err
	}

	return ts, nil
}

// validate validates the TypeSpec.
func (ts TypeSpec) validate() error {
	if ts.kind == "" || ts.apiVersion == "" {
		return errors.Errorf("document doesn't describe a kubernetes object: %#v", ts)
	}

	return nil
}

// GVK returns the GVK descriptor for the TypeSpec.
func (ts TypeSpec) GVK() GVK {
	group := ts.Group()
	version := ts.Version()
	kind := ts.Kind()

	return GVK{GroupPath: group, Version: version, Kind: kind}
}

// Group is the group as defined by the TypeSpec.
func (ts TypeSpec) Group() []string {
	parts := strings.Split(ts.apiVersion, "/")
	if len(parts) == 1 {
		return []string{"core"}
	}

	return []string{parts[0]}
}

// Version is the version as defined by the TypeSpec.
func (ts TypeSpec) Version() string {
	parts := strings.Split(ts.apiVersion, "/")
	if len(parts) == 1 {
		return parts[0]
	}

	return parts[1]
}

// Kind is the kind as specified by the TypeSpec.
func (ts TypeSpec) Kind() string {
	return ksonnet.FormatKind(ts.kind)
}

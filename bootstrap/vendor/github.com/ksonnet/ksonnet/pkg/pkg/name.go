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
	"fmt"
	"regexp"
	"strings"
)

var (
	errInvalidSpec = fmt.Errorf("package name should be in the form `<registry>/<library>@<version>`")

	reDescriptor = regexp.MustCompile(`^([A-Za-z0-9\-]+)(\/[^@]+)?(@[^@]+)?$`)
)

// Descriptor describes a package.
type Descriptor struct {
	Registry string
	Part     string
	Version  string
}

// ParseName parses a package name into its components
func ParseName(name string) (Descriptor, error) {
	matches := reDescriptor.FindStringSubmatch(name)
	if len(matches) == 0 {
		return Descriptor{}, errInvalidSpec
	}

	if matches[2] == "" {
		return Descriptor{Part: strings.TrimPrefix(matches[1], "/")}, nil
	}

	registry := matches[1]
	partName := strings.TrimPrefix(matches[2], "/")
	version := strings.TrimPrefix(matches[3], "@")

	return Descriptor{
		Registry: registry,
		Part:     partName,
		Version:  version,
	}, nil
}

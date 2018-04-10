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

package utils

import (
	"bytes"
	"fmt"
	"net/http"
	"strings"
)

const defaultRegistry = "registry-1.docker.io"

// ImageName represents the parts of a docker image name
type ImageName struct {
	// eg: "myregistryhost:5000/fedora/httpd:version1.0"
	Registry   string // "myregistryhost:5000"
	Repository string // "fedora"
	Name       string // "httpd"
	Tag        string // "version1.0"
	Digest     string
}

// String implements the Stringer interface
func (n ImageName) String() string {
	buf := bytes.Buffer{}
	if n.Registry != "" {
		buf.WriteString(n.Registry)
		buf.WriteString("/")
	}
	if n.Repository != "" {
		buf.WriteString(n.Repository)
		buf.WriteString("/")
	}
	buf.WriteString(n.Name)
	if n.Digest != "" {
		buf.WriteString("@")
		buf.WriteString(n.Digest)
	} else {
		buf.WriteString(":")
		buf.WriteString(n.Tag)
	}
	return buf.String()
}

// RegistryRepoName returns the "repository" as used in the registry URL
func (n ImageName) RegistryRepoName() string {
	repo := n.Repository
	if repo == "" {
		repo = "library"
	}
	return fmt.Sprintf("%s/%s", repo, n.Name)
}

// RegistryURL returns the deduced base URL of the registry for this image
func (n ImageName) RegistryURL() string {
	reg := n.Registry
	if reg == "" {
		reg = defaultRegistry
	}
	return fmt.Sprintf("https://%s", reg)
}

// ParseImageName parses a docker image into an ImageName struct
func ParseImageName(image string) (ImageName, error) {
	ret := ImageName{}

	if parts := strings.Split(image, "/"); len(parts) == 1 {
		ret.Name = parts[0]
	} else if len(parts) == 2 {
		ret.Repository = parts[0]
		ret.Name = parts[1]
	} else if len(parts) == 3 {
		ret.Registry = parts[0]
		ret.Repository = parts[1]
		ret.Name = parts[2]
	} else {
		return ret, fmt.Errorf("Malformed docker image name: %s", image)
	}

	if parts := strings.Split(ret.Name, "@"); len(parts) == 2 {
		ret.Name = parts[0]
		ret.Digest = parts[1]
	} else if parts := strings.Split(ret.Name, ":"); len(parts) == 2 {
		ret.Name = parts[0]
		ret.Tag = parts[1]
	} else if len(parts) == 1 {
		ret.Name = parts[0]
		ret.Tag = "latest"
	} else {
		return ret, fmt.Errorf("Malformed docker image name/tag: %s", image)
	}

	return ret, nil
}

// Resolver is able to resolve docker image names into more specific forms
type Resolver interface {
	Resolve(image *ImageName) error
}

// NewIdentityResolver returns a resolver that does only trivial
// :latest canonicalisation
func NewIdentityResolver() Resolver {
	return identityResolver{}
}

type identityResolver struct{}

func (r identityResolver) Resolve(image *ImageName) error {
	return nil
}

// NewRegistryResolver returns a resolver that looks up a docker
// registry to resolve digests
func NewRegistryResolver(httpClient *http.Client) Resolver {
	return &registryResolver{
		Client: httpClient,
		cache:  make(map[string]string),
	}
}

type registryResolver struct {
	Client *http.Client
	cache  map[string]string
}

func (r *registryResolver) Resolve(n *ImageName) error {
	if n.Digest != "" {
		// Already has explicit digest
		return nil
	}

	if digest, ok := r.cache[n.String()]; ok {
		n.Digest = digest
		return nil
	}

	c := NewRegistryClient(r.Client, n.RegistryURL())
	digest, err := c.ManifestDigest(n.RegistryRepoName(), n.Tag)
	if err != nil {
		return fmt.Errorf("Unable to fetch digest for %s: %v", n, err)
	}

	r.cache[n.String()] = digest
	n.Digest = digest
	return nil
}

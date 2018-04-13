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
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/parts"
)

const (
	// ProtocolFilesystem is the protocol for file system based registries.
	ProtocolFilesystem = "fs"
	// ProtocolGitHub is a the protocol for GitHub based registries.
	ProtocolGitHub = "github"

	registryYAMLFile = "registry.yaml"
	partsYAMLFile    = "parts.yaml"
)

// ResolveFile resolves files found when searching a part.
type ResolveFile func(relPath string, contents []byte) error

// ResolveDirectory resolves directories when searching a part.
type ResolveDirectory func(relPath string) error

// Registry is a Registry
type Registry interface {
	RegistrySpecDir() string
	RegistrySpecFilePath() string
	FetchRegistrySpec() (*Spec, error)
	MakeRegistryRefSpec() *app.RegistryRefSpec
	ResolveLibrarySpec(libID, libRefSpec string) (*parts.Spec, error)
	ResolveLibrary(libID, libAlias, version string, onFile ResolveFile, onDir ResolveDirectory) (*parts.Spec, *app.LibraryRefSpec, error)
	Name() string
	Protocol() string
	URI() string
	IsOverride() bool
}

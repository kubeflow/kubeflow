// Copyright 2017 The ksonnet authors
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

package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/spf13/afero"
)

const (
	k8sVersionURLTemplate = "https://raw.githubusercontent.com/kubernetes/kubernetes/%s/api/openapi-spec/swagger.json"
)

// ClusterSpec represents the API supported by some cluster. There are several
// ways to specify a cluster, including: querying the API server, reading an
// OpenAPI spec in some file, or consulting the OpenAPI spec released in a
// specific version of Kubernetes.
type ClusterSpec interface {
	OpenAPI() ([]byte, error)
	Resource() string // For testing parsing logic.
	Version() (string, error)
}

// ParseClusterSpec will parse a cluster spec flag and output a well-formed
// ClusterSpec object. For example, if the flag is `--version:v1.7.1`, then we
// will output a ClusterSpec representing the cluster specification associated
// with the `v1.7.1` build of Kubernetes.
func ParseClusterSpec(specFlag string, fs afero.Fs) (ClusterSpec, error) {
	split := strings.SplitN(specFlag, ":", 2)
	if len(split) <= 1 || split[1] == "" {
		return nil, fmt.Errorf("Invalid API specification '%s'", specFlag)
	}

	switch split[0] {
	case "version":
		return &clusterSpecVersion{k8sVersion: split[1]}, nil
	case "file":
		p, err := filepath.Abs(split[1])
		if err != nil {
			return nil, err
		}
		return &clusterSpecFile{specPath: p, fs: fs}, nil
	case "url":
		return &clusterSpecLive{apiServerURL: split[1]}, nil
	default:
		return nil, fmt.Errorf("Could not parse cluster spec '%s'", specFlag)
	}
}

type clusterSpecFile struct {
	specPath string
	fs       afero.Fs
}

func (cs *clusterSpecFile) OpenAPI() ([]byte, error) {
	return afero.ReadFile(cs.fs, string(cs.specPath))
}

func (cs *clusterSpecFile) Resource() string {
	return string(cs.specPath)
}

func (cs *clusterSpecFile) Version() (string, error) {
	//
	// Condensed representation of the spec file, containing the minimal
	// information necessary to retrieve the spec version.
	//
	type Info struct {
		Version string `json:"version"`
	}

	type Spec struct {
		Info Info `json:"info"`
	}

	bytes, err := cs.OpenAPI()
	if err != nil {
		return "", err
	}

	var spec *Spec
	if err := json.Unmarshal(bytes, &spec); err != nil {
		return "", err
	}

	return spec.Info.Version, nil
}

type clusterSpecLive struct {
	apiServerURL string
}

func (cs *clusterSpecLive) OpenAPI() ([]byte, error) {
	return nil, fmt.Errorf("Initializing from OpenAPI spec in live cluster is not implemented")
}

func (cs *clusterSpecLive) Resource() string {
	return string(cs.apiServerURL)
}

func (cs *clusterSpecLive) Version() (string, error) {
	return "", fmt.Errorf("Retrieving version spec in live cluster is not implemented")
}

type clusterSpecVersion struct {
	k8sVersion string
}

func (cs *clusterSpecVersion) OpenAPI() ([]byte, error) {
	versionURL := fmt.Sprintf(k8sVersionURLTemplate, cs.k8sVersion)
	resp, err := http.Get(versionURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf(
			"Received status code '%d' when trying to retrieve OpenAPI schema for cluster version '%s' from URL '%s'",
			resp.StatusCode, cs.k8sVersion, versionURL)
	}

	return ioutil.ReadAll(resp.Body)
}

func (cs *clusterSpecVersion) Resource() string {
	return string(cs.k8sVersion)
}

func (cs *clusterSpecVersion) Version() (string, error) {
	return string(cs.k8sVersion), nil
}

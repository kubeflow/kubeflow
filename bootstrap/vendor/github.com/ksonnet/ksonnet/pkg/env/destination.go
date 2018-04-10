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

import "encoding/json"

const (
	// destDefaultNamespace is the default namespace name.
	destDefaultNamespace = "default"
)

// Destination contains destination information for a cluster.
type Destination struct {
	server    string
	namespace string
}

// NewDestination creates an instance of Destination.
func NewDestination(server, namespace string) Destination {
	return Destination{
		server:    server,
		namespace: namespace,
	}
}

// MarshalJSON marshals a Destination to JSON.
func (d *Destination) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Server    string `json:"server"`
		Namespace string `json:"namespace"`
	}{
		Server:    d.Server(),
		Namespace: d.Namespace(),
	})
}

// Server is URL to the Kubernetes server that the cluster is running on.
func (d *Destination) Server() string {
	return d.server
}

// Namespace is the namespace of the Kubernetes server that targets should
// be deployed.
func (d *Destination) Namespace() string {
	if d.namespace == "" {
		return destDefaultNamespace
	}

	return d.namespace
}

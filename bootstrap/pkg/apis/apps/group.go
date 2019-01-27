// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Package apps contains apps API versions
package apps

const (
	DefaultNamespace = "kubeflow"
	DefaultPlatform  = "none"
	// TODO: find the latest tag dynamically
	DefaultVersion = "v0.4.1"
	DefaultKfRepo  = "$GOPATH/src/github.com/kubeflow/kubeflow/kubeflow"
	KfConfigFile   = "app.yaml"
)

//
// KfApp is used by commands under bootstrap/cmd/{bootstrap,kfctl}. KfApp provides a common
// API for different implementations like KsApp, GcpApp, etc.
//
type KfApp interface {
	Apply() error
	Delete() error
	Generate() error
	Init() error
}

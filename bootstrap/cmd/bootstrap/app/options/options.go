// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package options

import (
	"flag"
)

// ServerOption is the main context object for the controller manager.
type ServerOption struct {
	Apply         bool
	PrintVersion  bool
	JsonLogFormat bool
	InCluster	  bool
	AppDir        string
	KfVersion     string
	NameSpace     string
	Project       string
	Email         string
	IpName        string
	RegistryUri	  string
}

// NewServerOption creates a new CMServer with a default config.
func NewServerOption() *ServerOption {
	s := ServerOption{}
	return &s
}

// AddFlags adds flags for a specific Server to the specified FlagSet
func (s *ServerOption) AddFlags(fs *flag.FlagSet) {
	fs.BoolVar(&s.PrintVersion, "version", false, "Show version and quit")
	fs.BoolVar(&s.JsonLogFormat, "json-log-format", true, "Set true to use json style log format. Set false to use plaintext style log format")
	fs.StringVar(&s.AppDir, "app-dir", "/opt/bootstrap/default", "The directory for the ksonnet application.")
	fs.StringVar(&s.KfVersion, "kubeflow-version", "v0.1.0-rc.4", "The Kubeflow version to use.")
	fs.StringVar(&s.NameSpace, "namespace", "kubeflow", "The namespace where all resources for kubeflow will be created")
	fs.BoolVar(&s.Apply, "apply", false, "Whether or not to apply the configuration.")
	fs.StringVar(&s.Project, "project", "", "The GCP project where kubeflow will be installed")
	fs.StringVar(&s.Email, "email", "", "Your Email address for GCP account, if you are using GKE.")
	fs.StringVar(&s.IpName, "ip-name", "kubeflow", "Name of the ip you reserved on GCP project")
	fs.BoolVar(&s.InCluster, "in-cluster", false, "Whether bootstrapper is executed inside a pod")
	fs.StringVar(&s.RegistryUri, "registry-uri", "/opt/kubeflow/kubeflow", "Location of kubeflow registry.")
}

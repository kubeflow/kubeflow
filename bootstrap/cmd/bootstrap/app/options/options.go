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
	Apply                bool
	PrintVersion         bool
	JsonLogFormat        bool
	InCluster            bool
	KeepAlive            bool
	InstallIstio         bool
	Port                 int
	AppName              string
	AppDir               string
	Config               string
	Email                string
	GkeVersionOverride   string
	Mode                 string
	NameSpace            string
	RegistriesConfigFile string
	KfctlAppsNamespace   string
}

// NewServerOption creates a new CMServer with a default config.
func NewServerOption() *ServerOption {
	s := ServerOption{}
	return &s
}

const RegistriesDefaultConfig = "/opt/kubeflow/image_registries.yaml"

// AddFlags adds flags for a specific Server to the specified FlagSet
func (s *ServerOption) AddFlags(fs *flag.FlagSet) {
	fs.BoolVar(&s.PrintVersion, "version", false, "Show version and quit")
	fs.BoolVar(&s.JsonLogFormat, "json-log-format", true, "Set true to use json style log format. Set false to use plaintext style log format")
	fs.IntVar(&s.Port, "port", 8080, "The port to use when running an http server.")
	fs.StringVar(&s.AppDir, "app-dir", "/opt/bootstrap", "The directory for the ksonnet applications.")
	fs.StringVar(&s.GkeVersionOverride, "gke-version-override", "", "Override GKE master version only when GKE latest breaks")
	fs.StringVar(&s.NameSpace, "namespace", "kubeflow", "The namespace where all resources for kubeflow will be created")
	fs.BoolVar(&s.Apply, "apply", false, "Whether or not to apply the configuration.")

	fs.StringVar(&s.RegistriesConfigFile, "registries-config-file", RegistriesDefaultConfig, "A file containing information about known ksonnet registries.")

	// TODO(jlewi): Email is no longer used. We can remove it as soon as we verify no manifests are trying
	// to set this command line argument.
	fs.StringVar(&s.Email, "email", "", "Your Email address for GCP account, if you are using GKE.")
	fs.BoolVar(&s.InCluster, "in-cluster", false, "Whether bootstrapper is executed inside a pod")
	fs.BoolVar(&s.KeepAlive, "keep-alive", true, "Whether bootstrapper will stay alive after setup resources.")
	// TODO(jlewi): We should probably change the default to the empty string because running as a server
	// will be far more common then doing a one off batch job based on a config file.
	fs.StringVar(&s.Config, "config", "", "Path to a YAML file describing an app to create on startup.")
	// Whether to install istio. Remove after we always install it.
	fs.BoolVar(&s.InstallIstio, "install-istio", false, "Whether to install istio.")

	// Options below are related to the new API and router + backend design
	fs.StringVar(&s.Mode, "mode", "router", "What mode to start the binary in. Options are router, kfctl and gc.")
	fs.StringVar(&s.KfctlAppsNamespace, "kfctl-apps-namespace", "", "The namespace where the kfctl apps will be created.")
}

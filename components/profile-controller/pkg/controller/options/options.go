/*
Copyright 2019 The Kubeflow Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package options

import (
	"flag"
)

// ControllerOption is the context object for the controller manager.
type ControllerOption struct {
	MetricsAddr string
	UseIstio    bool
}

// NewControllerOption creates a new ControllerOption.
func NewControllerOption() *ControllerOption {
	s := ControllerOption{}
	return &s
}

// AddFlags adds flags for the controller manager.
func (s *ControllerOption) AddFlags(fs *flag.FlagSet) {
	fs.StringVar(&s.MetricsAddr, "metrics-addr", ":8080", "The address the metric endpoint binds to.")
	fs.BoolVar(&s.UseIstio, "use-istio", false, "Whether to use Istio for auth and routing.")
}

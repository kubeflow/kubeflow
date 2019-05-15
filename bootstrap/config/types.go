/*
Copyright The Kubeflow Authors.

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

package config

type NameValue struct {
	Name         string `json:"name,omitempty"`
	Value        string `json:"value,omitempty"`
	InitRequired bool   `json:"initRequired,omitempty"`
}

type Parameters map[string][]NameValue

// Default components configuration definitions.
type ComponentConfig struct {
	// Name of repository.
	Repo string `json:"repo,omitempty"`
	// List of default components.
	Components []string `json:"components,omitempty"`
	// List of default packages.
	Packages []string `json:"packages,omitempty"`
	// Parameters to be set to components using ks param set.
	ComponentParams Parameters `json:"componentParams,omitempty"`
	// Platform type.
	Platform string `json:"platform,omitempty"`
}

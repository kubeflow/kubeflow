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

package component

var (
	// TODO: might need something in ksonnet lib to look this up
	groupMappings = map[string][]string{
		"apiextensions.k8s.io":      []string{"apiextensions"},
		"rbac.authorization.k8s.io": []string{"rbac"},
	}
)

// GVK is a group, version, kind descriptor.
type GVK struct {
	GroupPath []string
	Version   string
	Kind      string
}

// Group returns the group this GVK represents.
func (gvk *GVK) Group() []string {
	g, ok := groupMappings[gvk.GroupPath[0]]
	if !ok {
		return gvk.GroupPath
	}

	return g
}

// Path returns the path of the current descriptor as a slice of strings.
func (gvk *GVK) Path() []string {
	return append(gvk.Group(), gvk.Version, gvk.Kind)
}

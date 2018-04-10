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

package utils

import (
	"testing"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	fakediscovery "k8s.io/client-go/discovery/fake"
	ktesting "k8s.io/client-go/testing"
)

func TestParseVersion(t *testing.T) {
	tests := []struct {
		input    version.Info
		expected ServerVersion
		error    bool
	}{
		{
			input:    version.Info{GitVersion: "v1.7.0"},
			expected: ServerVersion{Major: 1, Minor: 7},
		},
		{
			input:    version.Info{GitVersion: "v1.7.11-gke.1"},
			expected: ServerVersion{Major: 1, Minor: 7},
		},
		// Bad GitVersion case
		{
			input:    version.Info{Major: "1", Minor: "6", GitVersion: "invalid"},
			expected: ServerVersion{Major: 1, Minor: 6},
		},
		// GitVersion does not exist cases
		{
			input:    version.Info{Major: "1", Minor: "6"},
			expected: ServerVersion{Major: 1, Minor: 6},
		},
		{
			input:    version.Info{Major: "1", Minor: "70"},
			expected: ServerVersion{Major: 1, Minor: 70},
		},
		{
			input:    version.Info{Major: "1", Minor: "6x"},
			expected: ServerVersion{Major: 1, Minor: 6},
		},
		{
			input:    version.Info{Major: "1", Minor: "6+custom7"},
			expected: ServerVersion{Major: 1, Minor: 6},
		},
		{
			input: version.Info{Major: "", Minor: "6"},
			error: true,
		},
		{
			input: version.Info{Major: "1", Minor: ""},
			error: true,
		},
	}

	for _, test := range tests {
		v, err := ParseVersion(&test.input)
		if test.error {
			if err == nil {
				t.Errorf("test %s should have failed and did not", test.input)
			}
			continue
		}
		if err != nil {
			t.Errorf("test %v failed: %v", test.input, err)
			continue
		}
		if v != test.expected {
			t.Errorf("Expected %v, got %v", test.expected, v)
		}
	}
}

func TestVersionCompare(t *testing.T) {
	v := ServerVersion{Major: 2, Minor: 3}
	tests := []struct {
		major, minor, result int
	}{
		{major: 1, minor: 0, result: 1},
		{major: 2, minor: 0, result: 1},
		{major: 2, minor: 2, result: 1},
		{major: 2, minor: 3, result: 0},
		{major: 2, minor: 4, result: -1},
		{major: 3, minor: 0, result: -1},
	}
	for _, test := range tests {
		res := v.Compare(test.major, test.minor)
		if res != test.result {
			t.Errorf("%d.%d => Expected %d, got %d", test.major, test.minor, test.result, res)
		}
	}
}

func TestResourceNameFor(t *testing.T) {
	obj := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "tests/v1alpha1",
			"kind":       "Test",
			"metadata": map[string]interface{}{
				"name":      "myname",
				"namespace": "mynamespace",
			},
		},
	}

	fake := &ktesting.Fake{
		Resources: []*metav1.APIResourceList{
			{
				GroupVersion: "tests/v1alpha1",
				APIResources: []metav1.APIResource{
					{
						Name: "tests",
						Kind: "Test",
					},
				},
			},
		},
	}
	disco := &fakediscovery.FakeDiscovery{Fake: fake}

	if n := ResourceNameFor(disco, obj); n != "tests" {
		t.Errorf("Got resource name %q for %v", n, obj)
	}

	obj.SetKind("Unknown")
	if n := ResourceNameFor(disco, obj); n != "unknown" {
		t.Errorf("Got resource name %q for %v", n, obj)
	}

	obj.SetGroupVersionKind(schema.GroupVersionKind{Group: "unknown", Version: "noversion", Kind: "SomeKind"})
	if n := ResourceNameFor(disco, obj); n != "somekind" {
		t.Errorf("Got resource name %q for %v", n, obj)
	}
}

func TestFqName(t *testing.T) {
	obj := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "tests/v1alpha1",
			"kind":       "Test",
			"metadata": map[string]interface{}{
				"name": "myname",
			},
		},
	}

	if n := FqName(obj); n != "myname" {
		t.Errorf("Got %q for %v", n, obj)
	}

	obj.SetNamespace("mynamespace")
	if n := FqName(obj); n != "mynamespace.myname" {
		t.Errorf("Got %q for %v", n, obj)
	}
}

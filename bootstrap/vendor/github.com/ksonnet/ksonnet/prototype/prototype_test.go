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

package prototype

import (
	"sort"
	"testing"

	"github.com/blang/semver"
)

const (
	unmarshalErrPattern = "Expected value of %s: '%s', got: '%s'"
)

var simpleService = `{
  "apiVersion": "0.0.1",
  "name": "io.some-vendor.pkg.simple-service",
  "template": {
    "description": "Generates a simple service with a port exposed",
    "body": [
      "local k = import 'ksonnet.beta.2/k.libsonnet';",
      "",
      "local service = k.core.v1.service;",
      "local servicePort = k.core.v1.service.mixin.spec.portsType;",
      "local port = servicePort.new(std.extVar('port'), std.extVar('portName'));",
      "",
      "local name = std.extVar('name');",
      "k.core.v1.service.new('%-service' % name, {app: name}, port)"
    ]
  }
}`

var simpleDeployment = `{
  "apiVersion": "0.0.1",
  "name": "io.some-vendor.pkg.simple-deployment",
  "template": {
    "description": "Generates a simple service with a port exposed",
    "body": [
      "local k = import 'ksonnet.beta.2/k.libsonnet';",
      "local deployment = k.apps.v1beta1.deployment;",
      "local container = deployment.mixin.spec.template.spec.containersType;",
      "",
      "local appName = std.extVar('name');",
      "local appContainer = container.new(appName, std.extVar('image'));",
      "deployment.new(appName, std.extVar('replicas'), appContainer, {app: appName})"
    ]
  }
}`

func unmarshal(t *testing.T, bytes []byte) *SpecificationSchema {
	p, err := Unmarshal(bytes)
	if err != nil {
		t.Fatalf("Failed to deserialize prototype:\n%v", err)
	}

	return p
}

func assertProp(t *testing.T, name string, expected string, actual string) {
	if actual != expected {
		t.Errorf(unmarshalErrPattern, name, expected, actual)
	}
}

func TestSimpleUnmarshal(t *testing.T) {
	p := unmarshal(t, []byte(simpleService))

	assertProp(t, "apiVersion", p.APIVersion, "0.0.1")
	assertProp(t, "name", p.Name, "io.some-vendor.pkg.simple-service")
	assertProp(t, "description", p.Template.Description, "Generates a simple service with a port exposed")
}

var testPrototypes = map[string]string{
	"io.ksonnet.pkg.simple-service": simpleService,
}

func assertSearch(t *testing.T, idx Index, opts SearchOptions, query string, expectedNames []string) {
	ps, err := idx.SearchNames(query, opts)
	if err != nil {
		t.Fatalf("Failed to search index:\n%v", err)
	}

	sort.Slice(ps, func(i, j int) bool {
		return ps[i].Name < ps[j].Name
	})

	actualNames := []string{}
	for _, p := range ps {
		actualNames = append(actualNames, p.Name)
	}

	sort.Slice(expectedNames, func(i, j int) bool {
		return expectedNames[i] < expectedNames[j]
	})

	if len(expectedNames) != len(ps) {
		t.Fatalf("Query '%s' returned results:\n%s, but expected:\n%s", query, actualNames, expectedNames)
	}

	for i := 0; i < len(expectedNames); i++ {
		if actualNames[i] != expectedNames[i] {
			t.Fatalf("Query '%s' returned results:\n%s, but expected:\n%s", query, actualNames, expectedNames)
		}
	}
}

func TestSearch(t *testing.T) {
	svc := unmarshal(t, []byte(simpleService))
	depl := unmarshal(t, []byte(simpleDeployment))
	idx := NewIndex([]*SpecificationSchema{svc, depl})

	// Prefix searches.
	assertSearch(t, idx, Prefix, "service", []string{})
	assertSearch(t, idx, Prefix, "simple", []string{})
	assertSearch(t, idx, Prefix, "io.ksonnet", []string{
		"io.ksonnet.pkg.single-port-service",
		"io.ksonnet.pkg.namespace",
		"io.ksonnet.pkg.configMap",
		"io.ksonnet.pkg.deployed-service",
		"io.ksonnet.pkg.single-port-deployment",
	})
	assertSearch(t, idx, Prefix, "foo", []string{})

	// Suffix searches.
	assertSearch(t, idx, Suffix, "service", []string{
		"io.ksonnet.pkg.single-port-service",
		"io.ksonnet.pkg.deployed-service",
		"io.some-vendor.pkg.simple-service",
	})
	assertSearch(t, idx, Suffix, "simple", []string{})
	assertSearch(t, idx, Suffix, "io.ksonnet", []string{})
	assertSearch(t, idx, Suffix, "foo", []string{})

	// Substring searches.
	assertSearch(t, idx, Substring, "service", []string{
		"io.ksonnet.pkg.single-port-service",
		"io.ksonnet.pkg.deployed-service",
		"io.some-vendor.pkg.simple-service",
	})
	assertSearch(t, idx, Substring, "simple", []string{
		"io.some-vendor.pkg.simple-deployment",
		"io.some-vendor.pkg.simple-service",
	})
	assertSearch(t, idx, Substring, "io.ksonnet", []string{
		"io.ksonnet.pkg.deployed-service",
		"io.ksonnet.pkg.single-port-service",
		"io.ksonnet.pkg.single-port-deployment",
		"io.ksonnet.pkg.configMap",
		"io.ksonnet.pkg.namespace",
	})
	assertSearch(t, idx, Substring, "foo", []string{})
}

func TestApiVersionValidate(t *testing.T) {
	type spec struct {
		spec string
		err  bool
	}
	tests := []spec{
		// Versions that we accept.
		{spec: "0.0.1", err: false},
		{spec: "0.0.1+build.1", err: false},

		// Other versions.
		{spec: "0.0.0", err: true},
		{spec: "0.1.0", err: true},
		{spec: "1.0.0", err: true},

		// Builds and pre-releases of current version.
		{spec: "0.0.1-alpha", err: true},
		{spec: "0.0.1-beta+build.2", err: true},

		// Other versions.
		{spec: "0.1.0-alpha", err: true},
		{spec: "0.1.0+build.1", err: true},
		{spec: "0.1.0-beta+build.2", err: true},
		{spec: "1.0.0-alpha", err: true},
		{spec: "1.0.0+build.1", err: true},
		{spec: "1.0.0-beta+build.2", err: true},
	}

	for _, test := range tests {
		_, err := semver.Make(test.spec)
		if err != nil {
			t.Errorf("Failed to parse version '%s':\n%v", test.spec, err)
		}

		spec := &SpecificationSchema{APIVersion: test.spec}
		err = spec.validate()
		if (test.err && err == nil) || (!test.err && err != nil) {
			t.Errorf("Expected error for version '%s'? %t. Value of error: '%v'", test.spec, test.err, err)
		}
	}
}

// Copyright 2017 The kubecfg authors
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
	"crypto/tls"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

func TestParseImageName(t *testing.T) {
	// Local image
	n, err := ParseImageName("foo")
	if err != nil {
		t.Errorf("failed to parse local image name: %v", err)
	}
	if n.Registry != "" {
		t.Errorf("Incorrect local registry: %v", n.Registry)
	}
	if n.Repository != "" {
		t.Errorf("Incorrect local repository: %v", n.Repository)
	}
	if n.Name != "foo" {
		t.Errorf("Incorrect local name: %v", n.Name)
	}
	if n.Tag != "latest" {
		t.Errorf("Incorrect local tag: %v", n.Tag)
	}
	if n.String() != "foo:latest" {
		t.Errorf("Incorrect local image string: %v", n.String())
	}

	// Full non-dockerhub image
	n, err = ParseImageName("myregistryhost:5000/fedora/httpd:version1.0")
	if err != nil {
		t.Errorf("failed to parse remote image name: %v", err)
	}
	if n.Registry != "myregistryhost:5000" {
		t.Errorf("Incorrect remote registry: %v", n.Registry)
	}
	if n.Repository != "fedora" {
		t.Errorf("Incorrect remote repository: %v", n.Repository)
	}
	if n.Name != "httpd" {
		t.Errorf("Incorrect remote name: %v", n.Name)
	}
	if n.Tag != "version1.0" {
		t.Errorf("Incorrect remote tag: %v", n.Tag)
	}
	if n.String() != "myregistryhost:5000/fedora/httpd:version1.0" {
		t.Errorf("Incorrect remote image string: %v", n.String())
	}
	n.Digest = "sha256:xxxxx"
	if n.String() != "myregistryhost:5000/fedora/httpd@sha256:xxxxx" {
		t.Errorf("Incorrect remote image string w/ digest: %v", n.String())
	}

	// Image with digest
	n, err = ParseImageName("myregistryhost:5000/fedora/httpd@sha256:12345")
	if err != nil {
		t.Errorf("failed to parse remote image name: %v", err)
	}
	if n.Registry != "myregistryhost:5000" {
		t.Errorf("Incorrect remote registry: %v", n.Registry)
	}
	if n.Repository != "fedora" {
		t.Errorf("Incorrect remote repository: %v", n.Repository)
	}
	if n.Name != "httpd" {
		t.Errorf("Incorrect remote name: %v", n.Name)
	}
	if n.Digest != "sha256:12345" {
		t.Errorf("Incorrect remote tag: %v", n.Tag)
	}
	if n.String() != "myregistryhost:5000/fedora/httpd@sha256:12345" {
		t.Errorf("Incorrect remote image string: %v", n.String())
	}
	n.Digest = "sha256:xxxxx"
	if n.String() != "myregistryhost:5000/fedora/httpd@sha256:xxxxx" {
		t.Errorf("Incorrect remote image string w/ digest: %v", n.String())
	}
}

func TestIdentityResolver(t *testing.T) {
	r := NewIdentityResolver()

	n, err := ParseImageName("myregistryhost:5000/fedora/httpd:version1.0")
	if err != nil {
		t.Fatalf("Failed to parse test name: %v", err)
	}
	nCopy := n
	r.Resolve(&n)
	if nCopy != n {
		t.Errorf("Identity resolver altered image: %v", n)
	}
}

func TestRegistryResolver(t *testing.T) {
	reqCount := 0
	fake := httptest.NewTLSServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqCount++
		if r.Method != http.MethodHead {
			t.Errorf("Wrong method: %v", r.Method)
		}
		if r.URL.Path != "/v2/library/busybox/manifests/latest" {
			t.Errorf("Wrong URL: %v", r.URL)
		}

		w.Header().Add("Docker-Content-Digest", "sha256:12345")
	}))
	defer fake.Close()

	url, err := url.Parse(fake.URL)
	if err != nil {
		t.Fatalf("Failed to parse testserver URL: %v", err)
	}

	n, err := ParseImageName("busybox")
	if err != nil {
		t.Errorf("Failed to parse image: %v", err)
	}
	n.Registry = url.Host

	r := NewRegistryResolver(&http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		}})
	if err := r.Resolve(&n); err != nil {
		t.Fatalf("Error resolving image name: %v", err)
	}
	if reqCount != 1 {
		t.Errorf("registry resolver required %d requests?", reqCount)
	}
	if n.Digest != "sha256:12345" {
		t.Errorf("registry resolver resolved incorrect digest: %v", n.Digest)
	}

	// Test cache hit on repeat request
	n.Digest = ""
	if err := r.Resolve(&n); err != nil {
		t.Fatalf("Error re-resolving image name: %v", err)
	}
	if reqCount > 1 {
		t.Errorf("registry resolver repeated cachable request")
	}
	if n.Digest != "sha256:12345" {
		t.Errorf("registry resolver re-resolved incorrect digest: %v", n.Digest)
	}
}

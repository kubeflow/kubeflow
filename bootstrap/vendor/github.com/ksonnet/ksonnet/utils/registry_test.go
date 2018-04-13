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
	"net/http"
	"net/url"
	"reflect"
	"testing"
)

var _ http.RoundTripper = &authTransport{}

func TestStripPort(t *testing.T) {
	cases := []struct {
		input  string
		output string
	}{
		{input: "foo:80", output: "foo"},
		{input: "foo", output: "foo"},
		{input: "[ip:v6]:80", output: "ip:v6"},
		{input: "[ip:v6]", output: "ip:v6"},
	}
	for _, c := range cases {
		if x := stripPort(c.input); x != c.output {
			t.Errorf("Got %q from %q, expected %q", x, c.input, c.output)
		}
	}
}

func TestMatchesDomain(t *testing.T) {
	cases := []struct {
		url    string
		domain string
		result bool
	}{
		{url: "http://foo.bar.baz:80", domain: "baz", result: true},
		{url: "http://foo.bar.baz:80", domain: "com", result: false},
		{url: "http://foo.bar.baz:80", domain: "bar.baz", result: true},
		{url: "http://foo.bar.baz:80", domain: "bar.com", result: false},
		{url: "http://foo.bar.baz:80", domain: "foo.bar.baz", result: true},
	}
	for _, c := range cases {
		url, err := url.Parse(c.url)
		if err != nil {
			t.Fatalf("Failed to parse url %s: %s", c.url, err)
		}
		if x := matchesDomain(url, c.domain); x != c.result {
			t.Errorf("Wrong result: matchesDomain(%s, %s) => %v", url, c.domain, x)
		}
	}
}

func TestParseAuthHeader(t *testing.T) {
	h := http.Header{}
	h.Add("WWW-Authenticate", `Basic`)
	h.Add("WWW-Authenticate", `Basic realm="User Visible Realm"`)
	h.Add("WWW-Authenticate", `Bearer realm="https://auth.docker.io/token",service="registry.docker.io"`)
	h.Add("WWW-Authenticate", ``)

	expected := []*authChallenge{
		{
			Scheme: "basic",
			Params: map[string]string{},
		},
		{
			Scheme: "basic",
			Params: map[string]string{
				"realm": "User Visible Realm",
			},
		},
		{
			Scheme: "bearer",
			Params: map[string]string{
				"realm":   "https://auth.docker.io/token",
				"service": "registry.docker.io",
			},
		},
	}
	auths := parseAuthHeader(h)
	if len(auths) != len(expected) {
		t.Errorf("Unexpected number of results: %d != %d", len(auths), len(expected))
	}
	for i := range auths {
		if expected[i].Scheme != auths[i].Scheme {
			t.Errorf("%d: Unexpected scheme: %q", i, auths[i].Scheme)
		}
		if !reflect.DeepEqual(expected[i].Params, auths[i].Params) {
			t.Errorf("%d: Unexpected params: %v", i, auths[i].Params)
		}
	}
}

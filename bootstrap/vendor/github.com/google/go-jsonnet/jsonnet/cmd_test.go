/*
Copyright 2017 Google Inc. All rights reserved.

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

package main

import (
	"testing"
)

func testEq(a, b []string) bool {
	if a == nil && b == nil {
		return true
	}
	if a == nil || b == nil {
		return false
	}
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func testSimplifyAux(t *testing.T, name string, input, expected []string) {
	t.Run(name, func(t *testing.T) {
		got := simplifyArgs(input)
		if !testEq(got, expected) {
			t.Fail()
			t.Errorf("Got %v, expected %v\n", got, expected)
		}
	})
}

func TestSimplifyArgs(t *testing.T) {
	testSimplifyAux(t, "empty", []string{}, []string{})
	testSimplifyAux(t, "-a", []string{"-a"}, []string{"-a"})
	testSimplifyAux(t, "-a -b", []string{"-a", "-b"}, []string{"-a", "-b"})
	testSimplifyAux(t, "-a -c -b", []string{"-a", "-c", "-b"}, []string{"-a", "-c", "-b"})
	testSimplifyAux(t, "-abc", []string{"-abc"}, []string{"-a", "-b", "-c"})
	testSimplifyAux(t, "-acb", []string{"-acb"}, []string{"-a", "-c", "-b"})
}

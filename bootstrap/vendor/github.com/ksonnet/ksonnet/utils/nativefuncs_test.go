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
	"testing"

	jsonnet "github.com/google/go-jsonnet"
)

// check there is no err, and a == b.
func check(t *testing.T, err error, actual, expected string) {
	if err != nil {
		t.Errorf("Expected %q, got error: %q", expected, err.Error())
	} else if actual != expected+"\n" {
		t.Errorf("Expected %q, got %q", expected, actual)
	}
}

func TestParseJson(t *testing.T) {
	vm := jsonnet.MakeVM()
	RegisterNativeFuncs(vm, NewIdentityResolver())

	_, err := vm.EvaluateSnippet("failtest", `std.native("parseJson")("barf{")`)
	if err == nil {
		t.Errorf("parseJson succeeded on invalid json")
	}

	x, err := vm.EvaluateSnippet("test", `std.native("parseJson")("null")`)
	check(t, err, x, "null")

	x, err = vm.EvaluateSnippet("test", `
    local a = std.native("parseJson")('{"foo": 3, "bar": 4}');
    a.foo + a.bar`)
	check(t, err, x, "7")
}

func TestParseYaml(t *testing.T) {
	vm := jsonnet.MakeVM()
	RegisterNativeFuncs(vm, NewIdentityResolver())

	_, err := vm.EvaluateSnippet("failtest", `std.native("parseYaml")("[barf")`)
	if err == nil {
		t.Errorf("parseYaml succeeded on invalid yaml")
	}

	x, err := vm.EvaluateSnippet("test", `std.native("parseYaml")("")`)
	check(t, err, x, "[ ]")

	x, err = vm.EvaluateSnippet("test", `
    local a = std.native("parseYaml")("foo:\n- 3\n- 4\n")[0];
    a.foo[0] + a.foo[1]`)
	check(t, err, x, "7")

	x, err = vm.EvaluateSnippet("test", `
    local a = std.native("parseYaml")("---\nhello\n---\nworld");
    a[0] + a[1]`)
	check(t, err, x, "\"helloworld\"")
}

func TestRegexMatch(t *testing.T) {
	vm := jsonnet.MakeVM()
	RegisterNativeFuncs(vm, NewIdentityResolver())

	_, err := vm.EvaluateSnippet("failtest", `std.native("regexMatch")("[f", "foo")`)
	if err == nil {
		t.Errorf("regexMatch succeeded with invalid regex")
	}

	x, err := vm.EvaluateSnippet("test", `std.native("regexMatch")("foo.*", "seafood")`)
	check(t, err, x, "true")

	x, err = vm.EvaluateSnippet("test", `std.native("regexMatch")("bar.*", "seafood")`)
	check(t, err, x, "false")
}

func TestRegexSubst(t *testing.T) {
	vm := jsonnet.MakeVM()
	RegisterNativeFuncs(vm, NewIdentityResolver())

	_, err := vm.EvaluateSnippet("failtest", `std.native("regexSubst")("[f",s "foo", "bar")`)
	if err == nil {
		t.Errorf("regexSubst succeeded with invalid regex")
	}

	x, err := vm.EvaluateSnippet("test", `std.native("regexSubst")("a(x*)b", "-ab-axxb-", "T")`)
	check(t, err, x, "\"-T-T-\"")

	x, err = vm.EvaluateSnippet("test", `std.native("regexSubst")("a(x*)b", "-ab-axxb-", "${1}W")`)
	check(t, err, x, "\"-W-xxW-\"")
}

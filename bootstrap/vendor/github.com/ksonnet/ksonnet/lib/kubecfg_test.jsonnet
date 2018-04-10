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

// Run me with `../ks show -f kubecfg_test.jsonnet`
local kubecfg = import "kubecfg.libsonnet";

assert kubecfg.parseJson("[3, 4]") == [3, 4];

local x = kubecfg.parseYaml("---
- 3
- 4
---
foo: bar
baz: xyzzy
");
assert x == [[3, 4], {foo: "bar", baz: "xyzzy"}] : "got " + x;

local i = kubecfg.resolveImage("busybox");
assert i == "busybox:latest" : "got " + i;

assert kubecfg.regexMatch("o$", "foo");

local r = kubecfg.escapeStringRegex("f[o");
assert r == "f\\[o" : "got " + r;

local r = kubecfg.regexSubst("e", "tree", "oll");
assert r == "trolloll" : "got " + r;

// Kubecfg wants to see something that looks like a k8s object
{
  apiVersion: "test",
  kind: "Result",
  result: "SUCCESS"
}

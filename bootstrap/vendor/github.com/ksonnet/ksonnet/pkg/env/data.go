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

package env

const (
	// ComponentsExtCodeKey is the ExtCode key for component imports
	ComponentsExtCodeKey = "__ksonnet/components"

	relComponentParamsPath = "../../components/params.libsonnet"
)

// DefaultOverrideData generates the contents for an environment's `main.jsonnet`.
var DefaultOverrideData = []byte(`local base = import "base.libsonnet";
local k = import "k.libsonnet";

base + {
  // Insert user-specified overrides here. For example if a component is named \"nginx-deployment\", you might have something like:\n")
  // "nginx-deployment"+: k.deployment.mixin.metadata.labels({foo: "bar"})
}
`)

// DefaultParamsData generates the contents for an environment's `params.libsonnet`
var DefaultParamsData = []byte(`local params = std.extVar("__ksonnet/params");
local globals = import "globals.libsonnet";
local envParams = params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
  },
};

{
  components: {
    [x]: envParams.components[x] + globals, for x in std.objectFields(envParams.components)
  },
}
`)

// DefaultBaseData generates environment `base.libsonnet`.
var DefaultBaseData = []byte(`local components = std.extVar("` + ComponentsExtCodeKey + `");
components + {
  // Insert user-specified overrides here.
}
`)

// DefaultGlobalsData generates the contents for an environment's `globals.libsonnet`
var DefaultGlobalsData = []byte(`{
}`)

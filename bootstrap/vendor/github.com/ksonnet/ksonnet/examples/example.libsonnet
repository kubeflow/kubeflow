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

// This library is intended to support kubecfg examples, and should
// not necessarily be considered recommended jsonnet structure.

local kubecfg = import "kubecfg.libsonnet";

{
  service(name):: {
    local this = self,

    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: name,
      labels: { name: name },
    },

    targetPod_:: error "targetPod_ required in this usage",
    spec: {
      ports: [{port: p.containerPort}
              for p in this.targetPod_.spec.containers[0].ports],
      selector: this.targetPod_.metadata.labels,
    }},

  container(name, image):: {
    local this = self,

    name: name,
    image: kubecfg.resolveImage(image),

    env_:: {},  // key/value version of `env` (hidden)
    env: [{name: k, value: this.env_[k]} for k in std.objectFields(this.env_)],

    ports: [],
  },

  deployment(name):: {
    local this = self,

    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: name,
      labels: { name: name },
    },
    spec: {
      replicas: 1,
      template: {
        metadata: { labels: this.metadata.labels },
        spec: {
          containers: []
        }}}},
}

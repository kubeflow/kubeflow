# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

/** A collection of templates and utility functions to make it easier to configure Kubernetes
 * workloads.
 */
{
    v1:: {

        local ApiVersion = { apiVersion: "v1" },

        local Metadata(name) = {
            metadata: {
                name: name,
                labels: {
                    name: name,
                },
            },
        },

        ReplicationController(name): ApiVersion + Metadata(name) {
            kind: "ReplicationController",
        },

        Service(name): ApiVersion + Metadata(name) {
            kind: "Service",
        },
    },

    pair_list_ex(tab, kfield, vfield)::
        [{ [kfield]: k, [vfield]: tab[k] } for k in std.objectFields(tab)],

    pair_list(tab)::
        self.pair_list_ex(tab, "name", "value"),
}

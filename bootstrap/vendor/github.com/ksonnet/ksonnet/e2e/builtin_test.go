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

// +build e2e

package e2e

import (
	. "github.com/onsi/ginkgo"
)

type builtinRunner struct {
	prototypeName string
	options       []string
}

var _ = Describe("builtin prototypes", func() {
	var (
		a         app
		namespace string

		runners = []builtinRunner{
			{
				prototypeName: "configMap",
				options: []string{
					"--data", `{"key1": "value1", "key2": "value2"}`,
				},
			},
			{
				prototypeName: "deployed-service",
				options: []string{
					"--image", "gcr.io/heptio-images/ks-guestbook-demo:0.1",
					"--type", "ClusterIP",
				},
			},
			{
				prototypeName: "single-port-deployment",
				options: []string{
					"--image", "gcr.io/heptio-images/ks-guestbook-demo:0.1",
				},
			},
			{
				prototypeName: "single-port-service",
				options: []string{
					"--targetLabelSelector", `{app: "MyApp"}`,
				},
			},
		}
	)

	BeforeEach(func() {
		namespace = e.createNamespace()

		io := &initOptions{
			context:   "gke_bryan-heptio_us-central1-a_dev2",
			namespace: namespace,
		}

		a = e.initApp(io)
	})

	AfterEach(func() {
		e.removeNamespace(namespace)
	})

	for i := range runners {
		r := runners[i]
		Context(r.prototypeName, func() {
			JustBeforeEach(func() {
				runOpts := []string{
					"generate",
					r.prototypeName,
					"unit",
				}

				runOpts = append(runOpts, r.options...)

				o := a.runKs(runOpts...)
				assertExitStatus(o, 0)
			})

			It("validates", func() {
				o := a.runKs("validate", "default")
				assertExitStatus(o, 0)
			})

			It("applies to the cluster", func() {
				o := a.runKs("apply", "default")
				assertExitStatus(o, 0)
			})
		})
	}
})

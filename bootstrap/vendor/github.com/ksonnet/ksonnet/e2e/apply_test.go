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

var _ = Describe("ks apply", func() {
	var a app
	var namespace string
	var o *output

	BeforeEach(func() {
		namespace = e.createNamespace()

		io := &initOptions{
			context:   "gke_bryan-heptio_us-central1-a_dev2",
			namespace: namespace,
		}

		a = e.initApp(io)
		a.generateDeployedService()
	})

	AfterEach(func() {
		e.removeNamespace(namespace)
	})

	JustBeforeEach(func() {
		o = a.runKs("apply", "default")
		assertExitStatus(o, 0)
	})

	It("reports which resources it creating", func() {
		assertExitStatus(o, 0)
		assertOutput("apply/output.txt", o.stderr)
	})

	It("creates a guestbook-ui service", func() {
		v := newValidator(e.restConfig, namespace)
		v.hasService("guestbook-ui")
	})

	It("creates a guestbook-ui deployment", func() {
		v := newValidator(e.restConfig, namespace)
		v.hasDeployment("guestbook-ui")
	})
})

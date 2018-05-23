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

var _ = Describe("ks delete", func() {
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

		o := a.runKs("apply", "default")
		assertExitStatus(o, 0)
	})

	AfterEach(func() {
		e.removeNamespace(namespace)
	})

	Context("deleting all items in a module", func() {
		JustBeforeEach(func() {
			o = a.runKs("delete", "default")
			assertExitStatus(o, 0)
		})

		It("reports which resources it deleting", func() {
			assertExitStatus(o, 0)
			assertOutput("delete/output.txt", o.stderr)
		})

		It("deletes guestbook-ui service", func() {
			v := newValidator(e.restConfig, namespace)
			v.hasNoService("guestbook-ui")
		})

		It("deletes guestbook-ui deployment", func() {
			v := newValidator(e.restConfig, namespace)
			v.hasNoDeployment("guestbook-ui")
		})
	})

})

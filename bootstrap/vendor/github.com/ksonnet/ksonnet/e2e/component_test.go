// Copyright 2018 The kubecfg authors
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

var _ = Describe("ks component", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	Describe("list", func() {
		It("lists the components for a namespace", func() {
			o := a.runKs("component", "list")
			assertExitStatus(o, 0)
			assertOutput("component/list/output.txt", o.stdout)
		})

		Context("wide format", func() {
			It("lists the components for a namespace in wide format", func() {
				o := a.runKs("component", "list", "-o", "wide")
				assertExitStatus(o, 0)
				assertOutput("component/list/wide-output.txt", o.stdout)
			})
		})

		Context("with a namespace", func() {
			It("lists the components for a namespace in wide format", func() {
				o := a.runKs("component", "list", "--module", "/")
				assertExitStatus(o, 0)
				assertOutput("component/list/output.txt", o.stdout)
			})
		})
	})

	Describe("rm", func() {
		It("removes a component", func() {
			o := a.runKs("component", "rm", "guestbook-ui", "-v")
			assertExitStatus(o, 0)

			o = a.componentList()
			assertOutput("component/rm/output.txt", o.stdout)

			o = a.paramList()
			assertOutput("component/rm/params-output.txt", o.stdout)
		})
	})
})

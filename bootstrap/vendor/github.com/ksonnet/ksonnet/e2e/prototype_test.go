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

var _ = Describe("ks prototype", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	Describe("describe", func() {
		Context("with a long name", func() {
			It("shows the description", func() {
				o := a.runKs("prototype", "describe", "io.ksonnet.pkg.configMap")
				assertExitStatus(o, 0)
				assertOutput("prototype/describe/output.txt", o.stdout)
			})
		})

		Context("with a short name", func() {
			It("shows the description", func() {
				o := a.runKs("prototype", "describe", "configMap")
				assertExitStatus(o, 0)
				assertOutput("prototype/describe/output.txt", o.stdout)
			})
		})
	})

	Describe("list", func() {
		Context("with system prototypes", func() {
			It("lists available prototypes", func() {
				o := a.runKs("prototype", "list")
				assertExitStatus(o, 0)
				assertOutput("prototype/list/output.txt", o.stdout)
			})
		})
		Context("with a part installed", func() {
			It("lists available prototypes", func() {
				a.pkgInstall("incubator/apache")
				o := a.runKs("prototype", "list")
				assertExitStatus(o, 0)
				assertOutput("prototype/list/output-with-addition.txt", o.stdout)
			})
		})
	})

	Describe("preview", func() {
		It("shows the prototype preview", func() {
			o := a.runKs("prototype", "preview", "deployed-service",
				"--name", "aName",
				"--image", "image:tag")
			assertExitStatus(o, 0)
			assertOutput("prototype/preview/output.txt", o.stdout)
		})
	})

	Describe("search", func() {
		It("returns a list of prototypes whose name maches the search term", func() {
			o := a.runKs("prototype", "search", "service")
			assertExitStatus(o, 0)
			assertOutput("prototype/search/output.txt", o.stdout)
		})
	})
})

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
	"path/filepath"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("ks registry", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	Describe("add", func() {
		Context("global", func() {
			var add = func(path string) {
				o := a.runKs("registry", "add", "local", path)
				assertExitStatus(o, 0)

				uri := convertPathToURI(path)
				m := map[string]interface{}{
					"uri": uri,
				}

				o = a.registryList()

				tPath := filepath.Join("registry", "add", "output.txt.tmpl")
				assertTemplate(m, tPath, o.stdout)
			}

			Context("a filesystem based registry", func() {
				Context("as a path", func() {
					It("adds a registry", func() {
						path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
						Expect(err).ToNot(HaveOccurred())

						add(path)
					})
				})
				Context("as a URL", func() {
					It("adds a registry", func() {
						path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
						Expect(err).ToNot(HaveOccurred())

						uri := convertPathToURI(path)

						add(uri)
					})
				})
			})
		})

		Context("override", func() {
			var add = func(name, path string) {
				o := a.runKs("registry", "add", "--override", name, path)
				assertExitStatus(o, 0)
			}

			Context("a filesystem based registry", func() {
				Context("as a path", func() {
					It("adds a registry", func() {
						path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
						Expect(err).ToNot(HaveOccurred())

						add("local", path)

						o := a.registryList()

						uri := convertPathToURI(path)
						m := map[string]interface{}{
							"uri": uri,
						}
						tPath := filepath.Join("registry", "add", "override-output.txt.tmpl")
						assertTemplate(m, tPath, o.stdout)
					})
				})
				Context("as a URL", func() {
					It("adds a registry", func() {
						path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
						Expect(err).ToNot(HaveOccurred())

						uri := convertPathToURI(path)

						add("local", uri)

						o := a.registryList()

						m := map[string]interface{}{
							"uri": uri,
						}
						tPath := filepath.Join("registry", "add", "override-output.txt.tmpl")
						assertTemplate(m, tPath, o.stdout)
					})
				})
			})

			Context("an existing configuration", func() {
				It("overrides the existing configuration", func() {
					path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
					Expect(err).ToNot(HaveOccurred())

					add("incubator", path)

					o := a.registryList()

					uri := convertPathToURI(path)
					m := map[string]interface{}{
						"uri": uri,
					}
					tPath := filepath.Join("registry", "add", "override-incubator.txt.tmpl")
					assertTemplate(m, tPath, o.stdout)
				})
			})
		})
	})

	Describe("list", func() {
		It("lists the currently configured registries", func() {
			o := a.runKs("registry", "list")
			assertExitStatus(o, 0)
			assertOutput("registry/list/output.txt", o.stdout)
		})
	})

	Describe("describe", func() {
		Context("incubator", func() {
			It("describe a registry", func() {
				o := a.runKs("registry", "describe", "incubator")
				assertExitStatus(o, 0)
				assertOutput("registry/describe/output.txt", o.stdout)
			})
		})
	})
})

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
	"os"
	"path/filepath"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("ks pkg", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
	})

	Describe("add", func() {
		Context("incubator/apache", func() {
			It("describes the package", func() {
				o := a.runKs("pkg", "describe", "incubator/apache")
				assertExitStatus(o, 0)
				assertOutput("pkg/describe/output.txt", o.stdout)
			})
		})
	})

	Describe("describe", func() {
		Context("registry incubator/apache", func() {
			It("describes the registry package", func() {
				o := a.runKs("pkg", "describe", "incubator/apache")
				assertExitStatus(o, 0)
				assertOutput("pkg/describe/output.txt", o.stdout)
			})
		})
		Context("library apache", func() {
			It("describes the library package", func() {
				a.pkgInstall("incubator/apache")

				o := a.runKs("pkg", "describe", "apache")
				assertExitStatus(o, 0)
				assertOutput("pkg/describe/output.txt", o.stdout)
			})
		})
	})

	Describe("install", func() {
		Context("github based part", func() {
			Context("incubator/apache", func() {
				It("describes the package", func() {
					o := a.runKs("pkg", "install", "incubator/apache")
					assertExitStatus(o, 0)

					pkgDir := filepath.Join(a.dir, "vendor", "incubator", "apache")
					Expect(pkgDir).To(BeADirectory())
				})
			})
		})

		Context("fs based part", func() {
			Context("local/contour", func() {
				It("describes the package", func() {
					path, err := filepath.Abs(filepath.Join("testdata", "registries", "parts-infra"))
					Expect(err).ToNot(HaveOccurred())

					o := a.registryAdd("local", path)

					o = a.runKs("pkg", "install", "local/contour")
					assertExitStatus(o, 0)

					o = a.pkgList()

					m := map[string]interface{}{}
					tPath := filepath.Join("pkg", "install", "fs-output.txt.tmpl")
					assertTemplate(m, tPath, o.stdout)
				})
			})
		})

	})

	Describe("list", func() {
		It("lists available packages", func() {
			o := a.runKs("pkg", "list")
			assertExitStatus(o, 0)
			assertOutput("pkg/list/output.txt", o.stdout)
		})

		Context("git spec cache has been been deleted", func() {
			JustBeforeEach(func() {
				err := os.RemoveAll(filepath.Join(a.dir, ".ksonnet"))
				Expect(err).NotTo(HaveOccurred())
			})

			It("generates spec cache", func() {
				o := a.runKs("pkg", "list")
				assertExitStatus(o, 0)
				assertOutput("pkg/list/output.txt", o.stdout)
			})
		})
	})

	Context("use", func() {
		It("generates a component using the prototype", func() {
			o := a.runKs(
				"prototype", "use", "deployed-service", "guestbook-ui",
				"--image", "gcr.io/heptio-images/ks-guestbook-demo:0.1",
				"--type", "ClusterIP")
			assertExitStatus(o, 0)

			component := filepath.Join(a.dir, "components", "guestbook-ui.jsonnet")
			assertContents("generate/guestbook-ui.jsonnet", component)

			params := filepath.Join(a.dir, "components", "params.libsonnet")
			assertContents("generate/params.libsonnet", params)
		})
	})

})

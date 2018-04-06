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

var _ = Describe("ks env", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	Describe("add", func() {
		It("adds an environment", func() {
			o := a.runKs("env", "add", "prod",
				"--server", "http://example.com",
				"--namespace", "prod")
			assertExitStatus(o, 0)

			o = a.envList()
			assertOutput("env/add/output.txt", o.stdout)
		})

		Context("override", func() {
			It("adds an environment as an override", func() {
				o := a.runKs("env", "add", "prod",
					"-o",
					"--server", "http://example.com",
					"--namespace", "prod")
				assertExitStatus(o, 0)

				o = a.envList()
				assertOutput("env/add/output-with-override.txt", o.stdout)
			})
		})
	})

	Describe("describe", func() {
		It("describes an environment", func() {
			o := a.runKs("env", "describe", "default")
			assertExitStatus(o, 0)
			assertOutput("env/describe/output.txt", o.stdout)
		})

		Context("with override", func() {
			It("describes the override environment", func() {
				o := a.runKs("env", "add", "default",
					"-o",
					"--server", "http://example.com",
					"--namespace", "prod")
				assertExitStatus(o, 0)

				o = a.runKs("env", "describe", "default")
				assertExitStatus(o, 0)
				assertOutput("env/describe/output-with-override.txt", o.stdout)
			})
		})
	})

	Describe("list", func() {
		It("lists environments", func() {
			o := a.runKs("env", "list")
			assertExitStatus(o, 0)
			assertOutput("env/list/output.txt", o.stdout)
		})
	})

	Describe("rm", func() {
		It("removes an environment", func() {
			o := a.envAdd("prod", false)

			o = a.runKs("env", "rm", "prod")
			assertExitStatus(o, 0)

			o = a.envList()
			assertOutput("env/rm/output.txt", o.stdout)
		})

		Context("with an override", func() {
			It("removes an override", func() {
				o := a.envAdd("default", true)
				o = a.envList()
				assertOutput("env/rm/list-with-override.txt", o.stdout)

				o = a.runKs("env", "rm", "-o", "default")
				assertExitStatus(o, 0)

				o = a.envList()
				assertOutput("env/rm/list-with-override-removed.txt", o.stdout)
			})
		})
	})

	Describe("set", func() {
		Context("updating env name", func() {
			It("updates the name of an environment", func() {
				o := a.envAdd("prod", false)

				o = a.runKs("env", "set", "prod", "--name", "us-west1/prod")
				assertExitStatus(o, 0)

				o = a.envList()
				assertOutput("env/set/rename.txt", o.stdout)
			})
		})

		Context("updating namespace", func() {
			It("updates the namespace for an environment", func() {
				o := a.runKs("env", "set", "default", "--namespace", "dev")
				assertExitStatus(o, 0)

				o = a.envDescribe("default")
				assertOutput("env/set/rename-namespace.txt", o.stdout)
			})
		})

		Context("with override", func() {
			Context("update the namespace", func() {
				It("updates the override namespace", func() {
					o := a.envAdd("default", true)

					o = a.runKs("env", "set", "default", "--namespace", "new-name")
					assertExitStatus(o, 0)

					o = a.envList()
					assertOutput("env/set/rename-with-override-ns.txt", o.stdout)
				})
			})

			Context("update the name", func() {
				It("renames the environment", func() {
					o := a.envAdd("default", true)

					o = a.runKs("env", "set", "default", "--name", "new-name")
					assertExitStatus(o, 0)

					o = a.envList()
					assertOutput("env/set/rename-with-override-name.txt", o.stdout)
				})
			})
		})
	})

	Describe("targets", func() {
		Context("namespace exists", func() {
			Context("updating the targets", func() {
				It("updates the name of an environment", func() {
					o := a.runKs("env", "targets", "default",
						"--module", "/")
					assertExitStatus(o, 0)

					o = a.envDescribe("default")
					assertOutput("env/targets/updated.txt", o.stdout)

					o = a.runKs("env", "targets", "default")
					assertExitStatus(o, 0)

					o = a.envDescribe("default")
					assertOutput("env/targets/removed.txt", o.stdout)
				})
			})

			Context("target namespace does not exist", func() {
				It("return an error", func() {
					o := a.runKs("env", "targets", "default",
						"--module", "bad")
					assertExitStatus(o, 1)
					assertOutput("env/targets/invalid-target.txt", o.stderr)
				})
			})
		})

		Context("namespace does not exist", func() {
			It("returns an error", func() {
				o := a.runKs("env", "targets", "invalid",
					"--namespace", "/")
				assertExitStatus(o, 1)
				assertOutput("env/targets/invalid-env.txt", o.stderr)
			})
		})
	})
})

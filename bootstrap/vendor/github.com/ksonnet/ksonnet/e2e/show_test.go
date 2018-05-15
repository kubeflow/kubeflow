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

var _ = Describe("ks show", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	It("shows the generated YAML", func() {
		o := a.runKs("show", "default")
		assertExitStatus(o, 0)
		assertOutput("show/output.txt", o.stdout)
	})

	Context("lib does not exists", func() {
		JustBeforeEach(func() {
			err := os.RemoveAll(filepath.Join(a.dir, "lib"))
			Expect(err).NotTo(HaveOccurred())
		})

		It("generates spec cache", func() {
			o := a.runKs("show", "default")
			assertExitStatus(o, 0)
			assertOutput("show/output.txt", o.stdout)
		})
	})

})

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
)

var _ = Describe("ks import", func() {
	var a app

	BeforeEach(func() {
		a = e.initApp(nil)
		a.generateDeployedService()
	})

	Context("directory", func() {
		It("imports the files in the directory", func() {
			path := filepath.Join(e.wd(), "testdata", "input", "import")
			o := a.runKs("import", "-f", path)
			assertExitStatus(o, 0)

			o = a.componentList()
			assertOutput("import/output.txt", o.stdout)
		})
	})

	Context("file", func() {
		It("imports the file", func() {
			path := filepath.Join(e.wd(), "testdata", "input", "import", "deployment.yaml")
			o := a.runKs("import", "-f", path)
			assertExitStatus(o, 0)

			o = a.componentList()
			assertOutput("import/output.txt", o.stdout)
		})
	})

	Context("invalid path", func() {
		It("returns an error", func() {
			path := filepath.Join(e.wd(), "testdata", "input", "import", "invalid.yaml")
			o := a.runKs("import", "-f", path)
			assertExitStatus(o, 1)
			assertOutputContains("import/invalid.txt", o.stderr)
		})
	})
})

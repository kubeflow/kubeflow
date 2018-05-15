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

package e2e

import (
	"bytes"
	"html/template"
	"io/ioutil"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	. "github.com/onsi/gomega"
)

func assertFileExists(path string) {
	_, err := os.Stat(path)
	if err != nil {
		ExpectWithOffset(1, err).To(Not(HaveOccurred()))
	}
}

func assertOutput(name, output string) {
	path := filepath.Join("testdata", "output", name)
	ExpectWithOffset(1, path).To(BeAnExistingFile())

	b, err := ioutil.ReadFile(path)
	ExpectWithOffset(1, err).To(Not(HaveOccurred()))

	ExpectWithOffset(1, output).To(Equal(string(b)),
		"expected output to be:\n%s\nit was:\n%s\n",
		string(b), output)

}

func assertOutputContains(name, output string) {
	path := filepath.Join("testdata", "output", name)
	ExpectWithOffset(1, path).To(BeAnExistingFile())

	b, err := ioutil.ReadFile(path)
	ExpectWithOffset(1, err).To(Not(HaveOccurred()))

	ExpectWithOffset(1, output).To(ContainSubstring(string(b)))
}

func assertExitStatus(o *output, status int) {
	ExpectWithOffset(1, o.exitCode).To(Equal(status),
		"expected exit status to be %d but was %d\nstdout:\n%s\nstderr:\n%s\nargs:%s\npath:%s",
		status, o.exitCode, o.stdout, o.stderr, strings.Join(o.args, " "), o.cmdName)
}

func assertContents(name, path string) {
	expectedPath := filepath.Join("testdata", "output", name)
	ExpectWithOffset(1, expectedPath).To(BeAnExistingFile())
	ExpectWithOffset(1, path).To(BeAnExistingFile())

	b, err := ioutil.ReadFile(expectedPath)
	ExpectWithOffset(1, err).To(Not(HaveOccurred()))
	expected := string(b)

	b, err = ioutil.ReadFile(path)
	ExpectWithOffset(1, err).To(Not(HaveOccurred()))
	got := string(b)

	ExpectWithOffset(1, expected).To(Equal(got),
		"expected output to be:\n%s\nit was:\n%s\n",
		expected, got)
}

func assertTemplate(data interface{}, name, output string) {
	path := filepath.Join("testdata", "output", name)
	ExpectWithOffset(1, path).To(BeAnExistingFile())

	t, err := template.ParseFiles(path)
	ExpectWithOffset(1, err).ToNot(HaveOccurred())

	var buf bytes.Buffer
	err = t.Execute(&buf, data)
	ExpectWithOffset(1, err).ToNot(HaveOccurred())

	expected := buf.String()
	got := output
	ExpectWithOffset(1, expected).To(Equal(got),
		"expected output to be:\n%s\nit was:\n%s\n",
		expected, got)
}

func convertPathToURI(path string) string {
	if strings.HasPrefix(path, "file://") {
		return path
	}

	u := url.URL{
		Scheme: "file",
		Path:   path,
	}

	return u.String()
}

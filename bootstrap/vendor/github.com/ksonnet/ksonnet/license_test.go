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

package main

import (
	"bytes"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

const sentinel = `// Copyright 2018 The ksonnet authors
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

`

const prefix = "// Copyright "

var skippedPrefixes = []string{
	"vendor",
	"pkg/docparser",
}

func TestLicenseHeader(t *testing.T) {
	err := filepath.Walk(".", func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		for _, skipped := range skippedPrefixes {
			if strings.HasPrefix(path, skipped) {
				return nil
			}
		}

		if filepath.Ext(path) != ".go" {
			return nil
		}

		src, err := ioutil.ReadFile(path)
		if err != nil {
			return nil
		}

		// Also check it is at the top of the file.
		if !bytes.HasPrefix(src, []byte(prefix)) {
			var buf bytes.Buffer

			_, err := buf.WriteString(sentinel)
			if err != nil {
				return err
			}
			_, err = buf.Write(src)
			if err != nil {
				return err
			}

			return ioutil.WriteFile(path, buf.Bytes(), 0644)
		}

		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
}

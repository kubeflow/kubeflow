// Copyright 2017 The kubecfg authors
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

package cmd

import (
	"bytes"
	"fmt"
	"regexp"
	"testing"
)

func TestVersion(t *testing.T) {
	output := cmdOutput(t, []string{"version"})

	// Also a good smoke-test that libjsonnet linked successfully
	if !regexp.MustCompile(`jsonnet version: v[\d.]+`).MatchString(output) {
		t.Error("Failed to find jsonnet version in:", output)
	}
}

func cmdOutput(t *testing.T, args []string) string {
	var buf bytes.Buffer
	RootCmd.SetOutput(&buf)
	defer RootCmd.SetOutput(nil)

	t.Log("Running args", args)
	RootCmd.SetArgs(args)
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(buf.String())
		t.Fatal("command failed:", err)
	}

	return buf.String()
}

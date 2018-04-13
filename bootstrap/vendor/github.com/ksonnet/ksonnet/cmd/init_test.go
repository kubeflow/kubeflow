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

package cmd

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/stretchr/testify/require"
)

func Test_initCmd(t *testing.T) {
	cwd, err := os.Getwd()
	require.NoError(t, err)

	root := filepath.Join(cwd, "app")

	cases := []cmdTestCase{
		{
			name: "in general",
			args: []string{"init", "app",
				"--namespace", "new-namespace",
				"--server", "http://127.0.0.1",
				"--env", "env-name",
			},
			action: actionInit,
			expected: map[string]interface{}{
				actions.OptionFs:                    appFs,
				actions.OptionName:                  "app",
				actions.OptionEnvName:               "env-name",
				actions.OptionRootPath:              root,
				actions.OptionServer:                "http://127.0.0.1",
				actions.OptionSpecFlag:              "version:v1.7.0",
				actions.OptionNamespace:             "new-namespace",
				actions.OptionSkipDefaultRegistries: false,
			},
		},
	}

	runTestCmd(t, cases)
}

func Test_genKsRoot(t *testing.T) {
	cases := []struct {
		name     string
		appName  string
		ksDir    string
		wd       string
		expected string
		isErr    bool
	}{
		{name: "no wd", appName: "app", ksDir: "/root", expected: "/root/app"},
		{name: "with abs wd", appName: "app", ksDir: "/root", wd: "/custom", expected: "/custom"},
		{name: "with rel wd #1", appName: "app", ksDir: "/root", wd: "./custom", expected: "/root/custom"},
		{name: "with rel wd #2", appName: "app", ksDir: "/root", wd: "custom", expected: "/root/custom"},
		{name: "with rel wd #2", appName: "app", ksDir: "/root", wd: "../custom", expected: "/custom"},
		{name: "missing ksDir", appName: "app", wd: "./custom", isErr: true},
		{name: "missing appName and wd", ksDir: "/root", isErr: true},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got, err := genKsRoot(tc.appName, tc.ksDir, tc.wd)
			if tc.isErr {
				if err == nil {
					t.Errorf("genKsRoot expected error, but none was received")
				}
			} else {
				if got != tc.expected {
					t.Errorf("genKsRoot got %q; expected %q", got, tc.expected)
				}
			}
		})
	}
}

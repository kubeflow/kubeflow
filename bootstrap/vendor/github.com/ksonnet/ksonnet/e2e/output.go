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
	"os/exec"
	"syscall"
)

type output struct {
	stdout   string
	stderr   string
	exitCode int
	args     []string
	cmdName  string
}

func runWithOutput(cmd *exec.Cmd) (*output, error) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer

	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Start(); err != nil {
		return nil, err
	}

	var exitCode int
	if err := cmd.Wait(); err != nil {
		switch t := err.(type) {
		default:
			return nil, err
		case *exec.ExitError:
			status, ok := t.Sys().(syscall.WaitStatus)
			if !ok {
				return nil, t
			}
			exitCode = status.ExitStatus()
		}
	}

	o := &output{
		stdout:   stdout.String(),
		stderr:   stderr.String(),
		exitCode: exitCode,
		args:     cmd.Args,
		cmdName:  cmd.Path,
	}

	return o, nil
}

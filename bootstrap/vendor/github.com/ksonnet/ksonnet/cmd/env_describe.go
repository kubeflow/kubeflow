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

package cmd

import (
	"github.com/ksonnet/ksonnet/actions"
	"github.com/pkg/errors"
	"github.com/spf13/cobra"
)

// envDescribeCmd represents the env describe command
var envDescribeCmd = &cobra.Command{
	Use:   "describe <env>",
	Short: "describe",
	Long:  `describe`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return errors.New("env describe <environment>")
		}

		m := map[string]interface{}{
			actions.OptionApp:     ka,
			actions.OptionEnvName: args[0],
		}

		return runAction(actionEnvDescribe, m)
	},
}

func init() {
	envCmd.AddCommand(envDescribeCmd)
}

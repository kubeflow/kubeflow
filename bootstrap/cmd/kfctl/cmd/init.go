// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/spf13/cobra"
)

// ColorPrint Sprintf with yellow color
var ColorPrint = color.New(color.FgYellow).SprintFunc()
var initDeprecationMessage = ColorPrint("'kfctl init' has been removed.") + "\n" +
	`Please switch to new semantics.
To install run -> ` + ColorPrint("kfctl apply -f ${CONFIG}") + "\n" +
	`For more information, run 'kfctl apply -h' or read the docs at www.kubeflow.org.`

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: initDeprecationMessage,
	Long:  initDeprecationMessage,
	RunE: func(cmd *cobra.Command, args []string) error {
		return fmt.Errorf(initDeprecationMessage)
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
}

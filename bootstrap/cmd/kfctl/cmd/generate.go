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

	"github.com/spf13/cobra"
)

var generateDeprecationMessage = ColorPrint("'kfctl generate' has been replaced by 'kfctl build'") + "\n" +
	`Please switch to new semantics.
To build a KFAPP run -> ` + ColorPrint("kfctl build -f ${CONFIG}") + "\n" +
	`Then to install -> ` + ColorPrint("kfctl apply") + "\n" +
	`For more information, run 'kfctl build -h' or read the docs at www.kubeflow.org.`

// generateCmd represents the generate command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: generateDeprecationMessage,
	Long:  generateDeprecationMessage,
	RunE: func(cmd *cobra.Command, args []string) error {
		return fmt.Errorf(generateDeprecationMessage)
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)
}

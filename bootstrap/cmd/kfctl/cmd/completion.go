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
	"github.com/spf13/cobra"
	"os"
)

var completionCmd = &cobra.Command{
	Use:       "completion [shell]",
	Args:      cobra.OnlyValidArgs,
	ValidArgs: []string{"bash", "zsh"},
	Short:     "Generate shell completions",
	Long: `To load completion run

. <(kfctl completion)

To configure your bash shell to load completions for each session add to your bashrc

# ~/.bashrc or ~/.profile
. <(kfctl completion)

If you want to use zsh instead, do the following:

$ kfctl completion zsh > _kfctl
Then move _kfctl into $fpath and run compinit.
`,
	Run: func(cmd *cobra.Command, args []string) {
		shell := "bash"
		if len(args) > 0 {
			shell = args[0]
		}

		switch shell {
		case "zsh":
			rootCmd.GenZshCompletion(os.Stdout)
		default:
			rootCmd.GenBashCompletion(os.Stdout)
		}
	},
}

func init() {
	rootCmd.AddCommand(completionCmd)
}

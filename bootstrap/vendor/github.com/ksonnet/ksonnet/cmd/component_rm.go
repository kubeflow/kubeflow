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
	"fmt"

	"github.com/ksonnet/ksonnet/actions"
	"github.com/spf13/cobra"
)

var componentRmCmd = &cobra.Command{
	Use:   "rm <component-name>",
	Short: "Delete a component from the ksonnet application",
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return fmt.Errorf("'component rm' takes a single argument, that is the name of the component")
		}

		m := map[string]interface{}{
			actions.OptionApp:           ka,
			actions.OptionComponentName: args[0],
		}

		return runAction(actionComponentRm, m)
	},
	Long: `Delete a component from the ksonnet application. This is equivalent to deleting the
component file in the components directory and cleaning up all component
references throughout the project.`,
	Example: `# Remove the component 'guestbook'. This is equivalent to deleting guestbook.jsonnet
# in the components directory, and cleaning up references to the component
# throughout the ksonnet application.
ks component rm guestbook`,
}

func init() {
	componentCmd.AddCommand(componentRmCmd)
}

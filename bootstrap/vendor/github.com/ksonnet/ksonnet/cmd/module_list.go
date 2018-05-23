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
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

const (
	vModuleListEnv = "module-list-env"
)

// moduleListCmd represents the ns list command
var nsListCmd = &cobra.Command{
	Use:   "list",
	Short: "list",
	Long:  `list`,
	RunE: func(cmd *cobra.Command, args []string) error {
		m := map[string]interface{}{
			actions.OptionApp:     ka,
			actions.OptionEnvName: viper.GetString(vModuleListEnv),
		}

		return runAction(actionModuleList, m)
	},
}

func init() {
	moduleCmd.AddCommand(nsListCmd)

	nsListCmd.Flags().String(flagEnv, "", "Environment to list modules for")
	viper.BindPFlag(vModuleListEnv, nsListCmd.Flags().Lookup(flagEnv))

}

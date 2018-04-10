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
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

const (
	flagName = "name"
)

var pkgShortDesc = map[string]string{
	"install":  "Install a package (e.g. extra prototypes) for the current ksonnet app",
	"describe": "Describe a ksonnet package and its contents",
	"list":     "List all packages known (downloaded or not) for the current ksonnet app",
}

var errInvalidSpec = fmt.Errorf("Command 'pkg install' requires a single argument of the form <registry>/<library>@<version>")

func init() {
	RootCmd.AddCommand(pkgCmd)
}

var pkgCmd = &cobra.Command{
	Use:   "pkg",
	Short: `Manage packages and dependencies for the current ksonnet application`,
	Long: `
A ksonnet package contains:

* A set of prototypes (see ` + "`ks prototype --help`" + ` for more info on prototypes), which
generate similar types of components (e.g. ` + "`redis-stateless`" + `, ` + "`redis-persistent`" + `)
* Associated helper libraries that define the prototype parts (e.g. ` + "`redis.libsonnet`" + `)

Packages allow you to easily distribute and reuse code in any ksonnet application.
Packages come from registries, such as Github repositories. (For more info, see
` + "`ks registry --help`" + `).

To be recognized and imported by ksonnet, packages need to follow a specific schema.
See the annotated file tree below, as an example:

` + "```" + `
.
├── README.md                      // Human-readable description of the package
├── parts.yaml                     // Provides metadata about the package
├── prototypes                     // Can be imported and used to generate components
│   ├── redis-all-features.jsonnet
│   ├── redis-persistent.jsonnet
│   └── redis-stateless.jsonnet
└── redis.libsonnet                // Helper library, includes prototype parts
` + "```" + `
---
`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 0 {
			return fmt.Errorf("%s is not a valid subcommand\n\n%s", strings.Join(args, " "), cmd.UsageString())
		}
		return fmt.Errorf("Command 'pkg' requires a subcommand\n\n%s", cmd.UsageString())
	},
}

func parsePkgSpec(spec string) (registry, libID string, err error) {
	split := strings.SplitN(spec, "/", 2)
	if len(split) < 2 {
		return "", "", errInvalidSpec
	}
	registry = split[0]
	// Strip off the trailing `@version`.
	libID = strings.SplitN(split[1], "@", 2)[0]
	return
}

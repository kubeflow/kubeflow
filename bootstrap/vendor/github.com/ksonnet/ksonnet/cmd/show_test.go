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
	"testing"

	"github.com/ksonnet/ksonnet/actions"
)

func Test_showCmd(t *testing.T) {
	cases := []cmdTestCase{
		{
			name:   "with no options",
			args:   []string{"show", "default"},
			action: actionShow,
			expected: map[string]interface{}{
				actions.OptionApp:            nil,
				actions.OptionEnvName:        "default",
				actions.OptionComponentNames: make([]string, 0),
				actions.OptionFormat:         "yaml",
			},
		},
		{
			name:   "with no env",
			args:   []string{"show"},
			action: actionShow,
			isErr:  true,
		},
	}

	runTestCmd(t, cases)
}

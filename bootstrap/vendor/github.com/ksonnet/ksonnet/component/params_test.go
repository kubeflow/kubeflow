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

package component

import (
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_applyGlobals(t *testing.T) {
	myParams, err := ioutil.ReadFile("testdata/params-global.libsonnet")
	require.NoError(t, err)

	got, err := applyGlobals(string(myParams))
	require.NoError(t, err)

	expected, err := ioutil.ReadFile("testdata/params-global-expected.json")
	require.NoError(t, err)

	require.Equal(t, string(expected), got)
}

func Test_patchJSON(t *testing.T) {
	jsonObject, err := ioutil.ReadFile("testdata/rbac-1.json")
	require.NoError(t, err)

	patch, err := ioutil.ReadFile("testdata/patch.json")
	require.NoError(t, err)

	got, err := patchJSON(string(jsonObject), string(patch), "rbac-1")
	require.NoError(t, err)

	expected, err := ioutil.ReadFile("testdata/rbac-1-patched.json")
	require.NoError(t, err)

	require.Equal(t, string(expected), got)
}

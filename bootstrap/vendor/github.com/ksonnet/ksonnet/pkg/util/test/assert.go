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

package test

import (
	"io/ioutil"
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// AssertExists asserts if a path exists.
func AssertExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)

	assert.True(t, exists, "%q does not exist", path)
}

// AssertNotExists asserts a path does exist.
func AssertNotExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)

	assert.False(t, exists, "%q exists", path)
}

// AssertContents asserts the contents of a file.
func AssertContents(t *testing.T, fs afero.Fs, expectedPath, contentPath string) {
	expected, err := ioutil.ReadFile(filepath.Join("testdata", expectedPath))
	require.NoError(t, err)

	got, err := afero.ReadFile(fs, contentPath)
	require.NoError(t, err)

	assert.Equal(t, string(expected), string(got), "unexpected %q contents", contentPath)
}

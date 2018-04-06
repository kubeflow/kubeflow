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
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

// StageFile stages a file on on the provided filesystem from
// testdata.
func StageFile(t *testing.T, fs afero.Fs, src, dest string) {
	in := filepath.Join("testdata", src)

	b, err := ioutil.ReadFile(in)
	require.NoError(t, err)

	dir := filepath.Dir(dest)
	err = fs.MkdirAll(dir, 0755)
	require.NoError(t, err)

	err = afero.WriteFile(fs, dest, b, 0644)
	require.NoError(t, err)
}

// StageDir stages a directory on the provided filesystem from
// testdata.
func StageDir(t *testing.T, fs afero.Fs, src, dest string) {
	root, err := filepath.Abs(filepath.Join("testdata", src))
	require.NoError(t, err)

	err = filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		cur := filepath.Join(dest, strings.TrimPrefix(path, root))
		if fi.IsDir() {
			return fs.Mkdir(cur, 0755)
		}

		copyFile(fs, path, cur)
		return nil
	})

	require.NoError(t, err)
}

func copyFile(fs afero.Fs, src, dest string) error {
	from, err := os.Open(src)
	if err != nil {
		return err
	}
	defer from.Close()

	to, err := fs.OpenFile(dest, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return err
	}
	defer to.Close()

	_, err = io.Copy(to, from)
	return err
}

// WithApp runs an enclosure with a mocked app and fs.
func WithApp(t *testing.T, root string, fn func(*mocks.App, afero.Fs)) {
	fs := afero.NewMemMapFs()

	a := &mocks.App{}
	a.On("Fs").Return(fs)
	a.On("Root").Return(root)
	a.On("LibPath", mock.AnythingOfType("string")).Return(filepath.Join(root, "lib", "v1.8.7"), nil)

	fn(a, fs)
}

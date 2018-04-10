// Copyright 2018 The kubecfg authors
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

package plugin

import (
	"archive/tar"
	"io"
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestList(t *testing.T) {
	withPluginEnv(t, func(fs afero.Fs) {
		plugins, err := List(fs)
		require.NoError(t, err)

		require.Len(t, plugins, 1)

		plugin := plugins[0]

		assert.Equal(t, "/home/app/.config/ksonnet/plugins/hello", plugin.RootDir)
		assert.Equal(t, "hello", plugin.Config.Name)
		assert.Equal(t, "0.1.0", plugin.Config.Version)
		assert.Equal(t, "Hello from a ksonnet plugin", plugin.Config.Description)
		assert.Equal(t, "$KS_PLUGIN_DIR/hello.sh", plugin.Config.Command)
	})
}

func TestFind(t *testing.T) {
	cases := []struct {
		name  string
		isErr bool
	}{
		{
			name: "hello",
		},
		{
			name:  "missing",
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			withPluginEnv(t, func(fs afero.Fs) {
				_, err := Find(fs, tc.name)
				if tc.isErr {
					require.Error(t, err)
				} else {
					require.NoError(t, err)
				}
			})
		})
	}
}

func TestBuildRunCmd(t *testing.T) {
	plugin := Plugin{
		RootDir: "/tmp",
		Config:  Config{Command: "$KS_PLUGIN_DIR/runner"},
	}

	env := []string{"KS_1=1"}

	args := []string{"--arg1", "--foo=2", "single"}
	cmd := plugin.BuildRunCmd(env, args)
	assert.Equal(t, os.Stderr, cmd.Stderr)
	assert.Equal(t, os.Stdout, cmd.Stdout)
	assert.Equal(t, env, cmd.Env)
	assert.Equal(t, append([]string{"/tmp/runner"}, args...), cmd.Args, "args")

}

type pluginFn func(afero.Fs)

func withPluginEnv(t *testing.T, fn pluginFn) {
	ogHome := os.Getenv("HOME")
	os.Setenv("HOME", "/home/app")
	defer os.Setenv("HOME", ogHome)

	fs := afero.NewMemMapFs()

	fs.MkdirAll("/home/app/.config/ksonnet/plugins", 0755)
	r, err := os.Open("testdata/hello.tar")
	require.NoError(t, err)

	err = untar(fs, "/home/app/.config/ksonnet/plugins", r)
	require.NoError(t, err)

	fn(fs)
}

// nolint: gocyclo
func untar(fs afero.Fs, dst string, r io.Reader) error {
	tr := tar.NewReader(r)

	for {
		header, err := tr.Next()

		switch {

		case err == io.EOF:
			return nil

		case err != nil:
			return err

		case header == nil:
			continue
		}

		target := filepath.Join(dst, header.Name)

		switch header.Typeflag {

		case tar.TypeDir:
			if _, err := fs.Stat(target); err != nil {
				if err := fs.MkdirAll(target, 0755); err != nil {
					return err
				}
			}

		case tar.TypeReg:
			f, err := fs.OpenFile(target, os.O_CREATE|os.O_RDWR, os.FileMode(header.Mode))
			if err != nil {
				return err
			}
			defer f.Close()

			if _, err := io.Copy(f, tr); err != nil {
				return err
			}
		}
	}
}

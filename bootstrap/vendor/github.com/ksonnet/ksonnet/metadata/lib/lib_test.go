// Copyright 2017 The ksonnet authors
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
package lib

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
)

const (
	blankSwagger     = "/blankSwagger.json"
	blankSwaggerData = `{
  "swagger": "2.0",
  "info": {
   "title": "Kubernetes",
   "version": "v1.7.0"
  },
  "paths": {
  },
  "definitions": {
  }
}`
)

func TestGenerateLibData(t *testing.T) {
	cases := []struct {
		name           string
		useVersionPath bool
		basePath       string
	}{
		{
			name:           "use version path",
			useVersionPath: true,
			basePath:       "v1.7.0",
		},
		{
			name: "don't use version path",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			testFS := afero.NewMemMapFs()
			afero.WriteFile(testFS, blankSwagger, []byte(blankSwaggerData), os.ModePerm)

			specFlag := fmt.Sprintf("file:%s", blankSwagger)
			libPath := "lib"

			libManager, err := NewManager(specFlag, testFS, libPath)
			if err != nil {
				t.Fatal("Failed to initialize lib.Manager")
			}

			err = libManager.GenerateLibData(tc.useVersionPath)
			if err != nil {
				t.Fatal("Failed to generate lib data")
			}

			// Verify contents of lib.
			genPath := filepath.Join(libPath, tc.basePath)
			schemaPath := filepath.Join(genPath, "swagger.json")
			extPath := filepath.Join(genPath, "k.libsonnet")
			k8sPath := filepath.Join(genPath, "k8s.libsonnet")

			checkExists(t, testFS, schemaPath)
			checkExists(t, testFS, extPath)
			checkExists(t, testFS, k8sPath)
		})
	}

}

func checkExists(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)
	require.True(t, exists, "%q did not exist", path)
}

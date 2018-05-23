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

package component

import (
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/prototype"

	"github.com/spf13/afero"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_Create(t *testing.T) {
	cases := []struct {
		name          string
		isErr         bool
		params        map[string]string
		templateType  prototype.TemplateType
		componentDir  string
		ns            string
		componentName string
	}{
		{
			name: "jsonnet component",
			params: map[string]string{
				"name": "name",
			},
			templateType:  prototype.Jsonnet,
			componentDir:  "/components",
			componentName: "component",
		},
		{
			name: "yaml component",
			params: map[string]string{
				"name": "name",
			},
			templateType:  prototype.YAML,
			componentDir:  "/components",
			componentName: "component",
		},
		{
			name: "json component",
			params: map[string]string{
				"name": "name",
			},
			templateType:  prototype.JSON,
			componentDir:  "/components",
			componentName: "component",
		},
		{
			name: "invalid component",
			params: map[string]string{
				"name": "name",
			},
			templateType: prototype.TemplateType("unknown"),
			isErr:        true,
		},
		{
			name:          "nested/component",
			params:        map[string]string{"name": "name"},
			templateType:  prototype.Jsonnet,
			componentName: "nested/component",
			componentDir:  "/components/nested",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			fs := afero.NewMemMapFs()
			root := "/"

			ksApp := &mocks.App{}
			ksApp.On("Fs").Return(fs)
			ksApp.On("Root").Return(root)

			name := filepath.Join(tc.ns, tc.componentName)

			path, err := Create(ksApp, name, "content", tc.params, tc.templateType)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				checkPath(t, fs, path)

				paramsPath := filepath.Join(tc.componentDir, tc.ns, "params.libsonnet")
				checkPath(t, fs, paramsPath)

				assertComponentExt(t, path, tc.templateType)
			}
		})
	}
}

func assertComponentExt(t *testing.T, filename string, templateType prototype.TemplateType) {
	ext := filepath.Ext(filename)

	var got prototype.TemplateType
	switch ext {
	case ".yaml":
		got = prototype.YAML
	case ".json":
		got = prototype.JSON
	case ".jsonnet":
		got = prototype.Jsonnet
	default:
		t.Errorf("unknown component extension: %s", ext)
	}

	assert.Equal(t, templateType, got)
}

func checkPath(t *testing.T, fs afero.Fs, path string) {
	exists, err := afero.Exists(fs, path)
	require.NoError(t, err)
	require.True(t, exists, "expected %s to exist", path)
}

func Test_isValidName(t *testing.T) {
	cases := []struct {
		name    string
		isValid bool
	}{
		{
			name:    "component",
			isValid: true,
		},
		{
			name: "with spaces",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			require.Equal(t, tc.isValid, isValidName(tc.name))
		})
	}
}

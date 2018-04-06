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

	"github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/require"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

func TestYAML_Name(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "params-mixed.libsonnet", "/app/components/params.libsonnet")
		test.StageFile(t, fs, "deployment.yaml", "/app/components/deployment.yaml")
		test.StageFile(t, fs, "k8s.libsonnet", "/app/lib/v1.8.7/k8s.libsonnet")

		y := NewYAML(a, "", "/app/components/deployment.yaml", "/app/components/params.libsonnet")

		cases := []struct {
			name         string
			isNameSpaced bool
			expected     string
		}{
			{
				name:         "wants namespaced",
				isNameSpaced: true,
				expected:     "deployment",
			},
			{
				name:         "no namespace",
				isNameSpaced: false,
				expected:     "deployment",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				require.Equal(t, tc.expected, y.Name(tc.isNameSpaced))
			})
		}
	})

}

func TestYAML_Params(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "params-mixed.libsonnet", "/app/components/params.libsonnet")
		test.StageFile(t, fs, "deployment.yaml", "/app/components/deployment.yaml")
		test.StageFile(t, fs, "k8s.libsonnet", "/app/lib/v1.8.7/k8s.libsonnet")

		y := NewYAML(a, "", "/app/components/deployment.yaml", "/app/components/params.libsonnet")
		params, err := y.Params("")
		require.NoError(t, err)

		require.Len(t, params, 1)

		param := params[0]
		expected := ModuleParameter{
			Component: "deployment",
			Index:     "0",
			Key:       "metadata.labels",
			Value:     `{"label1":"label1","label2":"label2"}`,
		}
		require.Equal(t, expected, param)
	})
}

func TestYAML_Params_literal(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "params-mixed.libsonnet", "/params.libsonnet")
		test.StageFile(t, fs, "rbac.yaml", "/rbac.yaml")
		test.StageFile(t, fs, "k8s.libsonnet", "/app/lib/v1.8.7/k8s.libsonnet")

		y := NewYAML(a, "", "/rbac.yaml", "/params.libsonnet")
		params, err := y.Params("")
		require.NoError(t, err)

		require.Len(t, params, 1)

		param := params[0]
		expected := ModuleParameter{
			Component: "rbac",
			Index:     "1",
			Key:       "metadata.name",
			Value:     "cert-manager2",
		}
		require.Equal(t, expected, param)
	})
}

func TestYAML_Objects_no_params(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.yaml", "/certificate-crd.yaml")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.yaml", "/params.libsonnet")

		list, err := y.Objects("", "")
		require.NoError(t, err)

		expected := []*unstructured.Unstructured{
			{
				Object: map[string]interface{}{
					"apiVersion": "apiextensions.k8s.io/v1beta1",
					"kind":       "CustomResourceDefinition",
					"metadata": map[string]interface{}{
						"labels": map[string]interface{}{
							"app":      "cert-manager",
							"chart":    "cert-manager-0.2.2",
							"heritage": "Tiller",
							"release":  "cert-manager",
						},
						"name": "certificates.certmanager.k8s.io",
					},
					"spec": map[string]interface{}{
						"version": "v1alpha1",
						"group":   "certmanager.k8s.io",
						"names": map[string]interface{}{
							"kind":   "Certificate",
							"plural": "certificates",
						},
						"scope": "Namespaced",
					},
				},
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_Objects_no_params_with_json(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.json", "/certificate-crd.json")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.json", "/params.libsonnet")

		list, err := y.Objects("", "")
		require.NoError(t, err)

		expected := []*unstructured.Unstructured{
			{
				Object: map[string]interface{}{
					"apiVersion": "apiextensions.k8s.io/v1beta1",
					"kind":       "CustomResourceDefinition",
					"metadata": map[string]interface{}{
						"labels": map[string]interface{}{
							"app":      "cert-manager",
							"chart":    "cert-manager-0.2.2",
							"heritage": "Tiller",
							"release":  "cert-manager",
						},
						"name": "certificates.certmanager.k8s.io",
					},
					"spec": map[string]interface{}{
						"version": "v1alpha1",
						"group":   "certmanager.k8s.io",
						"names": map[string]interface{}{
							"kind":   "Certificate",
							"plural": "certificates",
						},
						"scope": "Namespaced",
					},
				},
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_Objects_params_exist_with_no_entry(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.yaml", "/certificate-crd.yaml")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.yaml", "/params.libsonnet")

		list, err := y.Objects("", "")
		require.NoError(t, err)

		expected := []*unstructured.Unstructured{
			{
				Object: map[string]interface{}{
					"apiVersion": "apiextensions.k8s.io/v1beta1",
					"kind":       "CustomResourceDefinition",
					"metadata": map[string]interface{}{
						"labels": map[string]interface{}{
							"app":      "cert-manager",
							"chart":    "cert-manager-0.2.2",
							"heritage": "Tiller",
							"release":  "cert-manager",
						},
						"name": "certificates.certmanager.k8s.io",
					},
					"spec": map[string]interface{}{
						"version": "v1alpha1",
						"group":   "certmanager.k8s.io",
						"names": map[string]interface{}{
							"kind":   "Certificate",
							"plural": "certificates",
						},
						"scope": "Namespaced",
					},
				},
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_Objects_params_exist_with_entry(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.yaml", "/certificate-crd.yaml")
		test.StageFile(t, fs, "params-with-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.yaml", "/params.libsonnet")

		list, err := y.Objects("", "")
		require.NoError(t, err)

		expected := []*unstructured.Unstructured{
			{
				Object: map[string]interface{}{
					"apiVersion": "apiextensions.k8s.io/v1beta1",
					"kind":       "CustomResourceDefinition",
					"metadata": map[string]interface{}{
						"labels": map[string]interface{}{
							"app":      "cert-manager",
							"chart":    "cert-manager-0.2.2",
							"heritage": "Tiller",
							"release":  "cert-manager",
						},
						"name": "certificates.certmanager.k8s.io",
					},
					"spec": map[string]interface{}{
						"version": "v2",
						"group":   "certmanager.k8s.io",
						"names": map[string]interface{}{
							"kind":   "Certificate",
							"plural": "certificates",
						},
						"scope": "Namespaced",
					},
				},
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_SetParam(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.yaml", "/certificate-crd.yaml")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.yaml", "/params.libsonnet")

		err := y.SetParam([]string{"spec", "version"}, "v2", ParamOptions{})
		require.NoError(t, err)

		b, err := afero.ReadFile(fs, "/params.libsonnet")
		require.NoError(t, err)

		expected := testdata(t, "updated-yaml-params.libsonnet")

		require.Equal(t, string(expected), string(b))
	})
}

func TestYAML_DeleteParam(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.yaml", "/certificate-crd.yaml")
		test.StageFile(t, fs, "params-with-entry.libsonnet", "/params.libsonnet")

		y := NewYAML(a, "", "/certificate-crd.yaml", "/params.libsonnet")

		err := y.DeleteParam([]string{"spec", "version"}, ParamOptions{})
		require.NoError(t, err)

		b, err := afero.ReadFile(fs, "/params.libsonnet")
		require.NoError(t, err)

		expected := testdata(t, "params-delete-entry.libsonnet")

		require.Equal(t, string(expected), string(b))
	})
}

func TestYAML_Summarize(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "rbac.yaml", "/components/rbac.yaml")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/components/params.libsonnet")

		y := NewYAML(a, "", "/components/rbac.yaml", "/components/params.libsonnet")

		list, err := y.Summarize()
		require.NoError(t, err)

		expected := []Summary{
			{
				ComponentName: "rbac",
				IndexStr:      "0",
				Type:          "yaml",
				APIVersion:    "rbac.authorization.k8s.io/v1beta1",
				Kind:          "ClusterRole",
				Name:          "cert-manager",
			},
			{
				ComponentName: "rbac",
				IndexStr:      "1",
				Type:          "yaml",
				APIVersion:    "rbac.authorization.k8s.io/v1beta1",
				Kind:          "ClusterRoleBinding",
				Name:          "cert-manager",
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_Summarize_json(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "certificate-crd.json", "/components/certificate-crd.json")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/components/params.libsonnet")

		y := NewYAML(a, "", "/components/certificate-crd.json", "/components/params.libsonnet")

		list, err := y.Summarize()
		require.NoError(t, err)

		expected := []Summary{
			{
				ComponentName: "certificate-crd",
				IndexStr:      "0",
				Type:          "json",
				APIVersion:    "apiextensions.k8s.io/v1beta1",
				Kind:          "CustomResourceDefinition",
				Name:          "certificates_certmanager_k8s_io",
			},
		}

		require.Equal(t, expected, list)
	})
}

func TestYAML_Summarize_yaml_trailing_dashes(t *testing.T) {
	test.WithApp(t, "/app", func(a *mocks.App, fs afero.Fs) {

		test.StageFile(t, fs, "trailing-dash.yaml", "/components/certificate-crd.yaml")
		test.StageFile(t, fs, "params-no-entry.libsonnet", "/components/params.libsonnet")

		y := NewYAML(a, "", "/components/certificate-crd.yaml", "/components/params.libsonnet")

		list, err := y.Summarize()
		require.NoError(t, err)

		expected := []Summary{
			{
				ComponentName: "certificate-crd",
				IndexStr:      "0",
				Type:          "yaml",
				APIVersion:    "apiextensions.k8s.io/v1beta1",
				Kind:          "CustomResourceDefinition",
				Name:          "certificates_certmanager_k8s_io",
			},
		}

		require.Equal(t, expected, list)
	})
}

func Test_mapToPaths(t *testing.T) {
	m := map[string]interface{}{
		"metadata": map[string]interface{}{
			"name": "name",
			"labels": map[string]interface{}{
				"label1": "label1",
			},
		},
	}

	lookup := map[string]bool{
		"metadata.name":   true,
		"metadata.labels": true,
	}

	got := mapToPaths(m, lookup, nil)

	expected := []paramPath{
		{path: []string{"metadata", "labels"}, value: map[string]interface{}{"label1": "label1"}},
		{path: []string{"metadata", "name"}, value: "name"},
	}

	require.Equal(t, expected, got)

}

func testdata(t *testing.T, name string) []byte {
	b, err := ioutil.ReadFile("testdata/" + name)
	require.NoError(t, err, "read testdata %s", name)
	return b
}

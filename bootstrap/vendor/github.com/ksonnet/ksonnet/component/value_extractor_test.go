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
	"testing"

	jsonnetutil "github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/stretchr/testify/require"
)

func TestValueExtractor_Extract(t *testing.T) {
	node, err := jsonnetutil.Import("testdata/k8s.libsonnet")
	require.NoError(t, err)

	props := Properties{
		"metadata": map[interface{}]interface{}{
			"name": "certificates.certmanager.k8s.io",
			"labels": map[interface{}]interface{}{
				"app":      "cert-manager",
				"chart":    "cert-manager-0.2.2",
				"release":  "cert-manager",
				"heritage": "Tiller",
			},
		},
		"spec": map[interface{}]interface{}{
			"group":   "certmanager.k8s.io",
			"version": "v1alpha1",
			"names": map[interface{}]interface{}{
				"kind":   "Certificate",
				"plural": "certificates",
			},
			"scope": "Namespaced",
		},
	}

	gvk := GVK{
		GroupPath: []string{
			"apiextensions.k8s.io",
		},
		Version: "v1beta1",
		Kind:    "customResourceDefinition",
	}

	ve := NewValueExtractor(node)
	got, err := ve.Extract(gvk, props)
	require.NoError(t, err)

	crd := "apiextensions.v1beta1.customResourceDefinition."

	expected := map[string]Values{
		crd + "mixin.metadata.labels": Values{
			Lookup: []string{"metadata", "labels"},
			Setter: crd + "mixin.metadata.withLabels",
			Value: map[interface{}]interface{}{
				"app":      "cert-manager",
				"chart":    "cert-manager-0.2.2",
				"release":  "cert-manager",
				"heritage": "Tiller",
			},
		},
		crd + "mixin.metadata.name": Values{
			Lookup: []string{"metadata", "name"},
			Setter: crd + "mixin.metadata.withName",
			Value:  "certificates.certmanager.k8s.io",
		},
		crd + "mixin.spec.group": Values{
			Lookup: []string{"spec", "group"},
			Setter: crd + "mixin.spec.withGroup",
			Value:  "certmanager.k8s.io",
		},
		crd + "mixin.spec.names.kind": Values{
			Lookup: []string{"spec", "names", "kind"},
			Setter: crd + "mixin.spec.names.withKind",
			Value:  "Certificate",
		},
		crd + "mixin.spec.names.plural": Values{
			Lookup: []string{"spec", "names", "plural"},
			Setter: crd + "mixin.spec.names.withPlural",
			Value:  "certificates",
		},
		crd + "mixin.spec.scope": Values{
			Lookup: []string{"spec", "scope"},
			Setter: crd + "mixin.spec.withScope",
			Value:  "Namespaced",
		},
		crd + "mixin.spec.version": Values{
			Lookup: []string{"spec", "version"},
			Setter: crd + "mixin.spec.withVersion",
			Value:  "v1alpha1",
		},
	}

	require.Equal(t, expected, got)
}

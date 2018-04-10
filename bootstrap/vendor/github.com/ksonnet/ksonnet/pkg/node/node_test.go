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

package node

import (
	"testing"

	jsonnetutil "github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNode_Search2(t *testing.T) {
	cases := []struct {
		name  string
		path  []string
		item  *Item
		isErr bool
	}{
		{
			name:  "empty path",
			isErr: true,
		},
		{
			name: "search for group",
			path: []string{"apps"},
			item: &Item{
				Type: ItemTypeObject,
				Path: []string{"apps"},
			},
		},
		{
			name: "search for version",
			path: []string{"apps", "v1beta2"},
			item: &Item{
				Type: ItemTypeObject,
				Path: []string{"apps", "v1beta2"},
			},
		},
		{
			name: "search for kind",
			path: []string{"apps", "v1beta2", "deployment"},
			item: &Item{
				Type: ItemTypeObject,
				Path: []string{"apps", "v1beta2", "deployment"},
			},
		},
		{
			name: "search for metadata path",
			path: []string{"apps", "v1beta2", "deployment", "metadata"},
			item: &Item{
				Type: ItemTypeObject,
				Path: []string{"apps", "v1beta2", "deployment", "mixin", "metadata"},
			},
		},
		{
			name: "search for metadata name",
			path: []string{"apps", "v1beta2", "deployment", "metadata", "name"},
			item: &Item{
				Type: ItemTypeSetter,
				Name: "apps.v1beta2.deployment.mixin.metadata.withName",
				Path: []string{"apps", "v1beta2", "deployment", "mixin", "metadata", "name"},
			},
		},
		{
			name: "search for object in metadata labels",
			path: []string{"apps", "v1beta2", "deployment", "metadata", "labels", "app"},
			item: &Item{
				Type: ItemTypeSetter,
				Name: "apps.v1beta2.deployment.mixin.metadata.withLabels",
				Path: []string{"apps", "v1beta2", "deployment", "mixin", "metadata", "labels"},
			},
		},
	}

	obj, err := jsonnetutil.Import("testdata/k8s.libsonnet")
	require.NoError(t, err)

	node := New("root", obj)

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			item, err := node.Search2(tc.path...)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tc.item, item)
			}
		})
	}
}

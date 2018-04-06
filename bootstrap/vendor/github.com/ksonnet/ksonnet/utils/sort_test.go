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

package utils

import (
	"reflect"
	"sort"
	"testing"

	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

var _ sort.Interface = DependencyOrder{}

func TestDepSort(t *testing.T) {
	newObj := func(apiVersion, kind string) *unstructured.Unstructured {
		return &unstructured.Unstructured{
			Object: map[string]interface{}{
				"apiVersion": apiVersion,
				"kind":       kind,
			},
		}
	}

	objs := []*unstructured.Unstructured{
		newObj("extensions/v1beta1", "Deployment"),
		newObj("v1", "ConfigMap"),
		newObj("v1", "Namespace"),
		newObj("v1", "Service"),
	}

	sort.Sort(DependencyOrder(objs))

	if objs[0].GetKind() != "Namespace" {
		t.Error("Namespace should be sorted first")
	}
	if objs[3].GetKind() != "Deployment" {
		t.Error("Deployment should be sorted after other objects")
	}
}

func TestAlphaSort(t *testing.T) {
	newObj := func(ns, name, kind string) *unstructured.Unstructured {
		o := unstructured.Unstructured{}
		o.SetNamespace(ns)
		o.SetName(name)
		o.SetKind(kind)
		return &o
	}

	objs := []*unstructured.Unstructured{
		newObj("default", "mysvc", "Deployment"),
		newObj("", "default", "StorageClass"),
		newObj("", "default", "ClusterRole"),
		newObj("default", "mydeploy", "Deployment"),
		newObj("default", "mysvc", "Secret"),
	}

	expected := []*unstructured.Unstructured{
		objs[2],
		objs[1],
		objs[3],
		objs[0],
		objs[4],
	}

	sort.Sort(AlphabeticalOrder(objs))

	if !reflect.DeepEqual(objs, expected) {
		t.Errorf("actual != expected: %v != %v", objs, expected)
	}
}

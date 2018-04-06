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
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

var (
	gkNamespace    = schema.GroupKind{Group: "", Kind: "Namespace"}
	gkTpr          = schema.GroupKind{Group: "extensions", Kind: "ThirdPartyResource"}
	gkStorageClass = schema.GroupKind{Group: "storage.k8s.io", Kind: "StorageClass"}

	gkPod         = schema.GroupKind{Group: "", Kind: "Pod"}
	gkJob         = schema.GroupKind{Group: "batch", Kind: "Job"}
	gkDeployment  = schema.GroupKind{Group: "extensions", Kind: "Deployment"}
	gkDaemonSet   = schema.GroupKind{Group: "extensions", Kind: "DaemonSet"}
	gkStatefulSet = schema.GroupKind{Group: "apps", Kind: "StatefulSet"}
)

// These kinds all start pods.
// TODO: expand this list.
func isPodOrSimilar(gk schema.GroupKind) bool {
	return gk == gkPod ||
		gk == gkJob ||
		gk == gkDeployment ||
		gk == gkDaemonSet ||
		gk == gkStatefulSet
}

// Arbitrary numbers used to do a simple topological sort of resources.
// TODO: expand this list.
func depTier(o schema.ObjectKind) int {
	gk := o.GroupVersionKind().GroupKind()
	if gk == gkNamespace || gk == gkTpr || gk == gkStorageClass {
		return 10
	} else if isPodOrSimilar(gk) {
		return 100
	} else {
		return 50
	}
}

// DependencyOrder is a `sort.Interface` that *best-effort* sorts the
// objects so that known dependencies appear earlier in the list.  The
// idea is to prevent *some* of the "crash-restart" loops when
// creating inter-dependent resources.
type DependencyOrder []*unstructured.Unstructured

func (l DependencyOrder) Len() int      { return len(l) }
func (l DependencyOrder) Swap(i, j int) { l[i], l[j] = l[j], l[i] }
func (l DependencyOrder) Less(i, j int) bool {
	return depTier(l[i].GetObjectKind()) < depTier(l[j].GetObjectKind())
}

// AlphabeticalOrder is a `sort.Interface` that sorts the
// objects by namespace/name/kind alphabetical order
type AlphabeticalOrder []*unstructured.Unstructured

func (l AlphabeticalOrder) Len() int      { return len(l) }
func (l AlphabeticalOrder) Swap(i, j int) { l[i], l[j] = l[j], l[i] }
func (l AlphabeticalOrder) Less(i, j int) bool {
	a, b := l[i], l[j]

	if a.GetNamespace() != b.GetNamespace() {
		return a.GetNamespace() < b.GetNamespace()
	}
	if a.GetName() != b.GetName() {
		return a.GetName() < b.GetName()
	}
	return a.GetKind() < b.GetKind()
}

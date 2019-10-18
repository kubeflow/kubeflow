// Copyright 2019 The Kubernetes Authors.
// SPDX-License-Identifier: Apache-2.0
package kindordertransformer

import (
	"sort"

	"github.com/ghodss/yaml"
	"github.com/pkg/errors"
	// "sigs.k8s.io/yaml"

	"sigs.k8s.io/kustomize/v3/pkg/ifc"
	"sigs.k8s.io/kustomize/v3/pkg/resid"
	"sigs.k8s.io/kustomize/v3/pkg/resmap"
	"sigs.k8s.io/kustomize/v3/pkg/resource"
)

// Sort the resmap using an ordering defined in the KindOrder parameter.
// This plugin is a mix of the kustomize legacyordertransformer.go and
// the helm kinder_sorter.go
type KindOrderTransformer struct {
	BuiltinOrderName string   `json:"builtinordername,omitempty" yaml:"builtinordername,omitempty"`
	KindOrderFirst   []string `json:"kindorder,omitempty" yaml:"kindorder,omitempty"`
	KindOrderLast    []string `json:"kindorderlast,omitempty" yaml:"kindorderlast,omitempty"`
}

const kustomizelegacyorder = "legacy"
const kubectlapply = "kubectlapply"
const kubectldelete = "kubectldelete"

func NewKindOrderTransformer(ordername string) *KindOrderTransformer {
	return &KindOrderTransformer{
		BuiltinOrderName: ordername,
		KindOrderFirst:   []string{},
		KindOrderLast:    []string{},
	}
}

// Nothing needed for configuration.
func (p *KindOrderTransformer) Config(
	_ ifc.Loader, _ *resmap.Factory, c []byte) (err error) {
	p.BuiltinOrderName = ""
	p.KindOrderFirst = []string{}
	p.KindOrderLast = []string{}
	err = yaml.Unmarshal(c, p)
	if err != nil {
		return
	}

	if (p.BuiltinOrderName != "") &&
		((p.KindOrderFirst != nil && len(p.KindOrderFirst) != 0) ||
			(p.KindOrderLast != nil && len(p.KindOrderLast) != 0)) {
		return errors.New("Conflicting Builtin and Custom kind order")
	}

	return
}

// Returns the list of kind to order first.
func (p *KindOrderTransformer) GetOrderFirst() []string {
	if p.KindOrderFirst != nil && len(p.KindOrderFirst) != 0 {
		return p.KindOrderFirst
	}

	switch p.BuiltinOrderName {
	case kustomizelegacyorder:
		return []string{
			"Namespace",
			"ResourceQuota",
			"StorageClass",
			"CustomResourceDefinition",
			"MutatingWebhookConfiguration",
			"ServiceAccount",
			"PodSecurityPolicy",
			"Role",
			"ClusterRole",
			"RoleBinding",
			"ClusterRoleBinding",
			"ConfigMap",
			"Secret",
			"Service",
			"LimitRange",
			"PriorityClass",
			"Deployment",
			"StatefulSet",
			"CronJob",
			"PodDisruptionBudget",
		}

	case kubectlapply, kubectldelete:
		// kubectl apply friendly order
		return []string{
			"Namespace",
			"ResourceQuota",
			"LimitRange",
			"PodSecurityPolicy",
			"Secret",
			"ConfigMap",
			"StorageClass",
			"PersistentVolume",
			"PersistentVolumeClaim",
			"ServiceAccount",
			"CustomResourceDefinition",
			"ClusterRole",
			"ClusterRoleBinding",
			"Role",
			"RoleBinding",
			"Service",
			"DaemonSet",
			"Pod",
			"ReplicationController",
			"ReplicaSet",
			"Deployment",
			"StatefulSet",
			"Job",
			"CronJob",
			"Ingress",
			"APIService",
		}

	default:
		// kubectl apply friendly order
		return []string{
			"Namespace",
			"ResourceQuota",
			"LimitRange",
			"PodSecurityPolicy",
			"Secret",
			"ConfigMap",
			"StorageClass",
			"PersistentVolume",
			"PersistentVolumeClaim",
			"ServiceAccount",
			"CustomResourceDefinition",
			"ClusterRole",
			"ClusterRoleBinding",
			"Role",
			"RoleBinding",
			"Service",
			"DaemonSet",
			"Pod",
			"ReplicationController",
			"ReplicaSet",
			"Deployment",
			"StatefulSet",
			"Job",
			"CronJob",
			"Ingress",
			"APIService",
		}
	}
}

// Returns the list of kind to order first.
func (p *KindOrderTransformer) GetOrderLast() []string {
	if p.KindOrderLast != nil && len(p.KindOrderLast) != 0 {
		return p.KindOrderLast
	}

	switch p.BuiltinOrderName {
	case kustomizelegacyorder:
		return []string{"ValidatingWebhookConfiguration"}

	case kubectlapply, kubectldelete:
		return []string{}

	default:
		return []string{}
	}
}

func (p *KindOrderTransformer) Transform(m resmap.ResMap) (err error) {
	resources := make([]*resource.Resource, m.Size())

	ids := m.AllIds()
	ks := newKindSorter(ids, p.BuiltinOrderName, p.GetOrderFirst(), p.GetOrderLast())
	sort.Sort(ks)

	for i, id := range ks.resids {
		resources[i], err = m.GetByCurrentId(id)
		if err != nil {
			return errors.Wrap(err, "expected match for sorting")
		}
	}
	m.Clear()

	if ks.reversed {
		// kubectl delete is using same algorithm than kubectl apply
		// but the output of the transformer is reversed
		for i := len(resources) - 1; i >= 0; i-- {
			m.Append(resources[i])
		}
	} else {

		for _, r := range resources {
			m.Append(r)
		}
	}
	return nil
}

type kindSorter struct {
	ordering map[string]int
	resids   []resid.ResId
	reversed bool
}

func newKindSorter(m []resid.ResId, ordername string, orderFirst []string, orderLast []string) *kindSorter {
	o := map[string]int{}
	for i, n := range orderFirst {
		o[n] = -len(orderFirst) + i
	}
	for i, n := range orderLast {
		o[n] = 1 + i
	}

	return &kindSorter{
		resids:   m,
		ordering: o,
		reversed: (ordername == kubectldelete),
	}
}

func (k *kindSorter) Len() int { return len(k.resids) }

func (k *kindSorter) Swap(i, j int) { k.resids[i], k.resids[j] = k.resids[j], k.resids[i] }

func (k *kindSorter) Less(i, j int) bool {
	a := k.resids[i]
	b := k.resids[j]
	first, aok := k.ordering[a.Kind]
	second, bok := k.ordering[b.Kind]
	// if same kind (including unknown) sub sort alphanumeric
	if first == second {
		// if both are unknown and of different kind sort by kind alphabetically
		if !aok && !bok && a.Kind != b.Kind {
			return a.Kind < b.Kind
		}
		return a.String() < b.String()
	}
	// unknown kind is last
	if !aok {
		return false
	}
	if !bok {
		return true
	}
	// sort different kinds
	return first < second
}

package ksonnet

import (
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
)

const constructorName = "new"

var (
	specialProperties = map[kubespec.PropertyName]kubespec.PropertyName{
		"apiVersion": "apiVersion",
		"kind":       "kind",
	}

	specialPropertiesList []string
)

func init() {
	for k := range specialProperties {
		specialPropertiesList = append(specialPropertiesList, string(k))
	}
}

func isSpecialProperty(pn kubespec.PropertyName) bool {
	_, ok := specialProperties[pn]
	return ok
}

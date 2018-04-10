package ksonnet

import (
	"fmt"
	"sort"

	"github.com/google/go-jsonnet/ast"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
)

// Version is an API version.
type Version struct {
	name  string
	group string

	resources []*APIObject
}

// NewVersion creates an instance of Version.
func NewVersion(name, group string) *Version {
	v := &Version{
		name:      name,
		group:     group,
		resources: make([]*APIObject, 0),
	}

	return v
}

// APIObjects returns a slice of APIObjects sorted by name.
func (v *Version) APIObjects() []APIObject {
	var objects []APIObject
	for _, resource := range v.resources {
		objects = append(objects, *resource)
	}

	sort.Slice(objects, func(i, j int) bool {
		return objects[i].Kind() < objects[j].Kind()
	})

	return objects
}

// Name is the name of the version.
func (v *Version) Name() string {
	return v.name
}

// AddResource adds a resource to the version.
func (v *Version) AddResource(resource Object) {
	ao := NewAPIObject(resource)
	v.resources = append(v.resources, ao)
}

// APIVersion returns the version.
func (v *Version) APIVersion() string {
	if v.group == "core" || v.group == "" {
		return v.name
	}
	return fmt.Sprintf("%s/%s", v.group, v.name)
}

// Node returns an ast node for this version.
func (v *Version) Node() *nm.Object {
	o := nm.NewObject()

	avo := nm.OnelineObject()
	avo.Set(
		nm.NewKey(
			"apiVersion",
			nm.KeyOptCategory(ast.ObjectFieldID),
			nm.KeyOptVisibility(ast.ObjectFieldInherit)),
		nm.NewStringDouble(v.APIVersion()))

	o.Set(nm.LocalKey("apiVersion"), avo)

	return o
}

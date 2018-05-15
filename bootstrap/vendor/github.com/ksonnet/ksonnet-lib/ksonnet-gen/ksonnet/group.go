package ksonnet

import (
	"sort"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
)

// Group is group of definitions.
type Group struct {
	versions map[string]*Version
	name     string
}

// NewGroup creates an instance of Group.
func NewGroup(name string) *Group {
	return &Group{
		versions: make(map[string]*Version),
		name:     name,
	}
}

// Name is the name of the group.
func (g *Group) Name() string {
	return g.name
}

// Versions returns the versions available for this group.
func (g *Group) Versions() []Version {
	var names []string
	for name := range g.versions {
		names = append(names, name)
	}

	sort.Strings(names)

	var versions []Version
	for _, name := range names {
		versions = append(versions, *g.versions[name])
	}

	return versions
}

// AddResource adds a resource to a version.
func (g *Group) AddResource(r Object) {
	name := r.Version()
	if name == "" {
		return
	}

	v, ok := g.versions[name]
	if !ok {
		v = NewVersion(name, r.QualifiedGroup())
		g.versions[name] = v
	}

	v.AddResource(r)
}

// Node returns an ast node for this group.
func (g *Group) Node() *nm.Object {
	return nm.NewObject()
}

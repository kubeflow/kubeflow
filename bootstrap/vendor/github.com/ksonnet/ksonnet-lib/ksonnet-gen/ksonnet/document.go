package ksonnet

import (
	"sort"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"
)

type renderNodeFn func(c *Catalog, a *APIObject) (*nm.Object, error)

// Document represents a ksonnet lib document.
type Document struct {
	catalog *Catalog

	// these are defined to aid testing Document
	typesFn            func() ([]Type, error)
	fieldsFn           func() ([]Field, error)
	renderFn           func(fn renderNodeFn, c *Catalog, o *nm.Object, groups []Group) error
	renderGroups       func(doc *Document, container *nm.Object) error
	renderHiddenGroups func(doc *Document, container *nm.Object) error
	objectNodeFn       func(c *Catalog, a *APIObject) (*nm.Object, error)
}

// NewDocument creates an instance of Document.
func NewDocument(catalog *Catalog) (*Document, error) {
	if catalog == nil {
		return nil, errors.New("catalog is nil")
	}

	return &Document{
		catalog:            catalog,
		typesFn:            catalog.Types,
		fieldsFn:           catalog.Fields,
		renderFn:           render,
		renderGroups:       renderGroups,
		renderHiddenGroups: renderHiddenGroups,
		objectNodeFn:       apiObjectNode,
	}, nil
}

// Groups returns an alphabetically sorted list of groups.
func (d *Document) Groups() ([]Group, error) {
	resources, err := d.typesFn()
	if err != nil {
		return nil, errors.Wrap(err, "retrieve resources")
	}

	var nodeObjects []Object
	for _, resource := range resources {
		res := resource
		nodeObjects = append(nodeObjects, &res)
	}

	return d.groups(nodeObjects)
}

// HiddenGroups returns an alphabetically sorted list of hidden groups.
func (d *Document) HiddenGroups() ([]Group, error) {
	resources, err := d.fieldsFn()
	if err != nil {
		return nil, errors.Wrap(err, "retrieve types")
	}

	var nodeObjects []Object
	for _, resource := range resources {
		res := resource
		nodeObjects = append(nodeObjects, &res)
	}

	return d.groups(nodeObjects)
}

func (d *Document) groups(resources []Object) ([]Group, error) {
	gMap := make(map[string]*Group)

	for i := range resources {
		res := resources[i]
		name := res.Group()

		g, ok := gMap[name]
		if !ok {
			g = NewGroup(name)
			gMap[name] = g
		}

		g.AddResource(res)
		gMap[name] = g
	}

	var groupNames []string

	for name := range gMap {
		groupNames = append(groupNames, name)
	}

	sort.Strings(groupNames)

	var groups []Group

	for _, name := range groupNames {
		g := gMap[name]
		groups = append(groups, *g)
	}

	return groups, nil
}

// Node converts a document to a node.
func (d *Document) Node() (*nm.Object, error) {
	out := nm.NewObject()

	metadata := map[string]interface{}{
		"kubernetesVersion": d.catalog.Version(),
		"checksum":          d.catalog.Checksum(),
	}
	metadataObj, err := nm.KVFromMap(metadata)
	if err != nil {
		return nil, errors.Wrap(err, "create metadata key")
	}
	out.Set(nm.InheritedKey("__ksonnet"), metadataObj)

	if err := d.renderGroups(d, out); err != nil {
		return nil, err
	}

	hidden := nm.NewObject()

	if err := d.renderHiddenGroups(d, hidden); err != nil {
		return nil, err
	}

	out.Set(nm.LocalKey("hidden"), hidden)

	return out, nil
}

func render(fn renderNodeFn, catalog *Catalog, o *nm.Object, groups []Group) error {
	for _, group := range groups {
		groupNode := group.Node()
		for _, version := range group.Versions() {
			versionNode := version.Node()
			for _, apiObject := range version.APIObjects() {
				objectNode, err := fn(catalog, &apiObject)
				if err != nil {
					return errors.Wrapf(err, "create node %s", apiObject.Kind())
				}

				versionNode.Set(
					nm.NewKey(apiObject.Kind(), nm.KeyOptComment(apiObject.Description())),
					objectNode)
			}

			groupNode.Set(nm.NewKey(version.Name()), versionNode)
		}

		o.Set(nm.NewKey(group.Name()), groupNode)
	}

	return nil

}

func renderGroups(d *Document, container *nm.Object) error {
	groups, err := d.Groups()
	if err != nil {
		return errors.Wrap(err, "retrieve groups")
	}

	if err = d.renderFn(d.objectNodeFn, d.catalog, container, groups); err != nil {
		return errors.Wrap(err, "render groups")
	}

	return nil
}

func renderHiddenGroups(d *Document, container *nm.Object) error {
	groups, err := d.HiddenGroups()
	if err != nil {
		return errors.Wrap(err, "retrieve hidden groups")
	}

	if err = d.renderFn(d.objectNodeFn, d.catalog, container, groups); err != nil {
		return errors.Wrap(err, "render hidden groups")
	}

	return nil
}

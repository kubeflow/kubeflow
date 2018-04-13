package ksonnet

import (
	"sort"
	"testing"

	"github.com/go-openapi/spec"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestDocument_nil_catalog(t *testing.T) {
	_, err := NewDocument(nil)
	require.Error(t, err)
}

func TestDocument_Groups(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	groups, err := doc.Groups()
	require.NoError(t, err)

	var names []string
	for _, group := range groups {
		names = append(names, group.Name())
	}

	sort.Strings(names)
	expected := []string{"admissionregistration", "apiextensions", "apiregistration", "apps",
		"authentication", "authorization", "autoscaling", "batch", "certificates", "core",
		"extensions", "meta", "networking", "policy", "rbac", "scheduling", "settings", "storage"}
	require.Equal(t, expected, names)
}

func TestDocument_Groups_types_error(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("fail")
	}

	c := initCatalog(t, "swagger-1.8.json", CatalogOptExtractProperties(fn))

	doc, err := NewDocument(c)
	require.NoError(t, err)

	_, err = doc.Groups()
	require.Error(t, err)
}

func TestDocument_HiddenGroups(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	groups, err := doc.HiddenGroups()
	require.NoError(t, err)

	var names []string
	for _, group := range groups {
		names = append(names, group.Name())
	}

	sort.Strings(names)

	expected := []string{"admissionregistration", "apiextensions", "apiregistration", "apps",
		"authentication", "authorization", "autoscaling", "batch", "certificates", "core",
		"extensions", "meta", "networking", "policy", "rbac", "scheduling", "settings",
		"storage"}
	require.Equal(t, expected, names)
}

func TestDocument_HiddenGroups_fields_error(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("fail")
	}

	c := initCatalog(t, "swagger-1.8.json", CatalogOptExtractProperties(fn))

	doc, err := NewDocument(c)
	require.NoError(t, err)

	_, err = doc.HiddenGroups()
	require.Error(t, err)
}

func TestDocument_Node(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	n, err := doc.Node()
	require.NoError(t, err)

	for _, name := range []string{"apps", "apiextensions", "core"} {
		_, ok := n.Get(name).(*nm.Object)
		assert.True(t, ok, "node %s was not found", name)
	}

	local, ok := n.Get("hidden").(*nm.Object)
	require.True(t, ok)

	for _, name := range []string{"apps", "core", "meta"} {
		_, ok := local.Get(name).(*nm.Object)
		assert.True(t, ok, "hidden node %s was not found", name)
	}
}

func TestDocument_Node_groups_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	doc.renderGroups = func(*Document, *nm.Object) error {
		return errors.New("fail")
	}

	_, err = doc.Node()
	require.Error(t, err)
}

func TestDocument_Node_hidden_groups_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	doc.renderHiddenGroups = func(*Document, *nm.Object) error {
		return errors.New("fail")
	}

	_, err = doc.Node()
	require.Error(t, err)
}

func TestDocument_Node_api_object_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	doc.objectNodeFn = func(*Catalog, *APIObject) (*nm.Object, error) {
		return nil, errors.New("fail")
	}

	_, err = doc.Node()
	require.Error(t, err)
}

func Test_renderGroups_groups_error(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("fail")
	}

	c := initCatalog(t, "swagger-1.8.json", CatalogOptExtractProperties(fn))

	doc, err := NewDocument(c)
	require.NoError(t, err)

	err = renderGroups(doc, nm.NewObject())
	require.Error(t, err)
}

func TestDocument_renderGroups_render_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	doc.renderFn = func(fn renderNodeFn, c *Catalog, o *nm.Object, groups []Group) error {
		return errors.New("fail")
	}

	err = renderGroups(doc, nm.NewObject())
	require.Error(t, err)
}

func Test_renderHiddenGroups_hidden_groups_error(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("fail")
	}

	c := initCatalog(t, "swagger-1.8.json", CatalogOptExtractProperties(fn))

	doc, err := NewDocument(c)
	require.NoError(t, err)

	err = renderHiddenGroups(doc, nm.NewObject())
	require.Error(t, err)
}

func TestDocument_renderHiddenGroups_render_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	doc, err := NewDocument(c)
	require.NoError(t, err)

	doc.renderFn = func(fn renderNodeFn, c *Catalog, o *nm.Object, groups []Group) error {
		return errors.New("fail")
	}

	err = renderHiddenGroups(doc, nm.NewObject())
	require.Error(t, err)
}

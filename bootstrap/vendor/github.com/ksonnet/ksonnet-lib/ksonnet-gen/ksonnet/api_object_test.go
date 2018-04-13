package ksonnet

import (
	"testing"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/require"
)

func TestAPIObject_Kind(t *testing.T) {
	c1 := Component{Group: "group2", Version: "v1", Kind: "Deployment"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)
	ao := NewAPIObject(&o1)

	require.Equal(t, "deployment", ao.Kind())
}

func TestAPIObject_Description(t *testing.T) {
	c1 := Component{Group: "group2", Version: "v1", Kind: "Deployment"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)
	ao := NewAPIObject(&o1)

	require.Equal(t, "desc", ao.Description())
}

func TestAPIObject_Node_with_type(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	t1 := NewField("io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta", "desc", "apimachinery", "group", "ver", "Kind", nil)
	ao := NewAPIObject(t1)

	n, err := ao.Node(c)
	require.NoError(t, err)

	_, ok := n.Get("kind").(*nm.Object)
	require.False(t, ok)

	require.NotNil(t, n.Get("new"))
}

func TestAPIObject_Node_with_field(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	c1 := Component{Group: "group2", Version: "v1", Kind: "Deployment"}

	o1 := NewType("io.k8s.codebase.pkg.api.version.kind", "desc", "codebase", "group", c1, nil)
	ao := NewAPIObject(&o1)

	n, err := ao.Node(c)
	require.NoError(t, err)

	kindo, ok := n.Get("kind").(*nm.Object)
	require.True(t, ok)
	require.IsType(t, nm.NewObject(), kindo)

	kind, ok := kindo.Get("kind").(*nm.StringDouble)
	require.True(t, ok)
	require.Equal(t, nm.NewStringDouble("Deployment"), kind)

	require.NotNil(t, n.Get("new"))
}

func TestAPIObject_Node_with_nil_catalog(t *testing.T) {
	c1 := Component{Group: "group2", Version: "v1", Kind: "Deployment"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)
	ao := NewAPIObject(&o1)

	_, err := ao.Node(nil)
	require.Error(t, err)
}

func TestAPIObject_Node_fails_when_renderer_fails(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	c1 := Component{Group: "group2", Version: "v1", Kind: "Deployment"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)
	ao := NewAPIObject(&o1)

	ao.renderFieldsFn = func(typeLookup, *nm.Object, string, map[string]Property) error {
		return errors.New("failed")
	}

	_, err := ao.Node(c)
	require.Error(t, err)
}

package ksonnet

import (
	"testing"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/stretchr/testify/require"
)

func TestGroup_Name(t *testing.T) {
	g := NewGroup("groupName")
	require.Equal(t, "groupName", g.Name())
}

func TestGroup_Node(t *testing.T) {
	g := NewGroup("groupName")
	versions := nm.NewObject()

	require.Equal(t, versions, g.Node())
}

func TestGroup_Versions(t *testing.T) {
	g := NewGroup("groupName")
	g.versions = map[string]*Version{
		"v1": &Version{},
		"v2": &Version{},
	}

	require.Len(t, g.Versions(), 2)
}

func TestGroup_AddResource(t *testing.T) {
	c1 := Component{Group: "group2", Version: "v1", Kind: "kind"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)

	g := NewGroup("groupName")
	g.AddResource(&o1)

	require.Len(t, g.Versions(), 1)

	c2 := Component{Group: "group2", Version: "", Kind: "kind"}
	o2 := NewType("beta", "desc", "codebase", "group", c2, nil)
	g.AddResource(&o2)

	require.Len(t, g.Versions(), 1)
}

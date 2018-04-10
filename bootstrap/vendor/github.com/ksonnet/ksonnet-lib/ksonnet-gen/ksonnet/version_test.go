package ksonnet

import (
	"testing"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/stretchr/testify/require"
)

func TestVersion_Name(t *testing.T) {
	v := NewVersion("v1", "groupName")
	require.Equal(t, "v1", v.Name())
}

func TestVersion_APIVersion(t *testing.T) {
	cases := []struct {
		name      string
		groupName string
		expected  string
	}{
		{
			name:      "groupName group",
			groupName: "groupName",
			expected:  "groupName/v1",
		},
		{
			name:      "core group",
			groupName: "core",
			expected:  "v1",
		},
		{
			name:      "empty group",
			groupName: "",
			expected:  "v1",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			v := NewVersion("v1", tc.groupName)
			require.Equal(t, tc.expected, v.APIVersion())
		})
	}
}

func TestVersion_AddResource(t *testing.T) {
	v := NewVersion("v1", "groupName")

	c1 := Component{Group: "group2", Version: "v1", Kind: "kind1"}
	o1 := NewType("alpha", "desc", "codebase", "group", c1, nil)
	v.AddResource(&o1)

	c2 := Component{Group: "group2", Version: "v1", Kind: "kind2"}
	o2 := NewType("beta", "desc", "codebase", "group", c2, nil)
	v.AddResource(&o2)

	require.Len(t, v.APIObjects(), 2)
}

func TestVersion_Node(t *testing.T) {
	v := NewVersion("v1", "groupName")

	n := v.Node()
	require.NotNil(t, n)

	av, ok := n.Get("apiVersion").(*nm.Object)
	require.True(t, ok)

	vStr, ok := av.Get("apiVersion").(*nm.StringDouble)
	require.True(t, ok)

	require.Equal(t, nm.NewStringDouble(v.APIVersion()), vStr)
}

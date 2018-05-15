package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_parsePaths(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	m, err := parsePaths(c.apiSpec)
	require.NoError(t, err)
	require.NotNil(t, m)

	expected := Component{
		Group:   "rbac.authorization.k8s.io",
		Version: "v1alpha1",
		Kind:    "ClusterRoleBinding",
	}

	assert.Equal(t, expected, m["io.k8s.api.rbac.v1alpha1.ClusterRoleBinding"])
}

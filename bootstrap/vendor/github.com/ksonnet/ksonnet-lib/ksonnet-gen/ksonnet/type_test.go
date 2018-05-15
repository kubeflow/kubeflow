package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestType(t *testing.T) {
	props := make(map[string]Property)
	props["foo"] = NewLiteralField("name", "integer", "desc", "ref")

	c := Component{
		Group:   "group2",
		Version: "ver",
		Kind:    "kind",
	}

	r := NewType("id", "desc", "codebase", "group1", c, props)

	assert.Equal(t, "id", r.Identifier())
	assert.Equal(t, "desc", r.Description())
	assert.Equal(t, "group1", r.Group())
	assert.Equal(t, "ver", r.Version())
	assert.Equal(t, "kind", r.Kind())
	assert.Equal(t, "group2", r.QualifiedGroup())
	assert.True(t, r.IsType())

	assert.Len(t, r.Properties(), 1)
}

func TestType_no_group(t *testing.T) {
	props := make(map[string]Property)
	props["foo"] = NewLiteralField("name", "integer", "desc", "ref")

	c := Component{
		Group:   "group2",
		Version: "ver",
		Kind:    "kind",
	}

	r := NewType("id", "desc", "codebase", "", c, props)

	assert.Equal(t, "core", r.Group())
	assert.Equal(t, "group2", r.QualifiedGroup())

}

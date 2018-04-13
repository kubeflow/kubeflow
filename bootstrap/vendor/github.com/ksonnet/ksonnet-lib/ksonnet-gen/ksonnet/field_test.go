package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestField(t *testing.T) {
	props := make(map[string]Property)
	props["foo"] = NewLiteralField("name", "integer", "desc", "ref")

	ty := NewField("id", "desc", "codebase", "group", "ver", "kind", props)

	assert.Equal(t, "id", ty.Identifier())
	assert.Equal(t, "desc", ty.Description())
	assert.Equal(t, "codebase", ty.Codebase())
	assert.Equal(t, "group", ty.Group())
	assert.Equal(t, "group", ty.QualifiedGroup())
	assert.Equal(t, "ver", ty.Version())
	assert.Equal(t, "kind", ty.Kind())
	assert.False(t, ty.IsType())

	assert.Len(t, ty.Properties(), 1)
}

func TestField_no_group(t *testing.T) {
	props := make(map[string]Property)
	props["foo"] = NewLiteralField("name", "integer", "desc", "ref")

	ty := NewField("id", "desc", "codebase", "", "ver", "kind", props)

	assert.Equal(t, "core", ty.Group())
	assert.Equal(t, "core", ty.QualifiedGroup())
}

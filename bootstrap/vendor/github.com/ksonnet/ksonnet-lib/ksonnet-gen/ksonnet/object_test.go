package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLiteralField(t *testing.T) {
	f := NewLiteralField("name", "string", "desc", "ref")

	assert.Equal(t, "name", f.Name())
	assert.Equal(t, "string", f.FieldType())
	assert.Equal(t, "desc", f.Description())
	assert.Equal(t, "ref", f.Ref())
}

func TestReferenceField(t *testing.T) {
	f := NewReferenceField("name", "desc", "ref")

	assert.Equal(t, "name", f.Name())
	assert.Equal(t, "desc", f.Description())
	assert.Equal(t, "ref", f.Ref())
}

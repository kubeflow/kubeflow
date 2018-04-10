package ksonnet

// Type is a Kubernetes kind.
type Type struct {
	description string
	properties  map[string]Property
	component   Component
	group       string
	codebase    string
	identifier  string
}

var _ Object = (*Type)(nil)

// NewType creates an instance of Type.
func NewType(identifier, description, codebase, group string, component Component, props map[string]Property) Type {
	return Type{
		description: description,
		group:       group,
		codebase:    codebase,
		component:   component,
		properties:  props,
		identifier:  identifier,
	}
}

// Kind is the kind for this type
func (t *Type) Kind() string {
	return t.component.Kind
}

// Version is the version for this type
func (t *Type) Version() string {
	return t.component.Version
}

// Codebase is the codebase for this field.
func (t *Type) Codebase() string {
	return t.codebase
}

// Group is the group for this type
func (t *Type) Group() string {
	if t.group == "" {
		return "core"
	}

	return t.group
}

// QualifiedGroup is the group for this type
func (t *Type) QualifiedGroup() string {
	return t.component.Group
}

// Description is description for this type
func (t *Type) Description() string {
	return t.description
}

// Identifier is identifier for this type
func (t *Type) Identifier() string {
	return t.identifier
}

// IsType returns if this item is a type. It always returns true.
func (t *Type) IsType() bool {
	return true
}

// Properties are the properties for this type.
func (t *Type) Properties() map[string]Property {
	return t.properties
}

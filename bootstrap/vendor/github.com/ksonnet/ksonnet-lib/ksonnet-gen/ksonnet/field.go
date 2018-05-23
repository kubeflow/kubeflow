package ksonnet

// Field is a Kubernetes field.
type Field struct {
	kind        string
	description string
	properties  map[string]Property
	version     string
	group       string
	codebase    string
	identifier  string
}

var _ Object = (*Field)(nil)

// NewField creates an instance of Field.
func NewField(id, desc, codebase, group, ver, kind string, props map[string]Property) *Field {
	return &Field{
		identifier:  id,
		description: desc,
		group:       group,
		codebase:    codebase,
		version:     ver,
		kind:        kind,
		properties:  props,
	}
}

// Kind is the kind for this field.
func (f *Field) Kind() string {
	return f.kind
}

// Version is the version for this field.
func (f *Field) Version() string {
	return f.version
}

// Codebase is the codebase for this field.
func (f *Field) Codebase() string {
	return f.codebase
}

// Group is the group for this field.
func (f *Field) Group() string {
	if f.group == "" {
		return "core"
	}

	return f.group
}

// QualifiedGroup is the group for this field.
func (f *Field) QualifiedGroup() string {
	return f.Group()
}

// Description is the description for this field.
func (f *Field) Description() string {
	return f.description
}

// Identifier is the identifier for this field.
func (f *Field) Identifier() string {
	return f.identifier
}

// IsType returns if this item is a type. It always returns false.
func (f *Field) IsType() bool {
	return false
}

// Properties are the properties for this field.
func (f *Field) Properties() map[string]Property {
	return f.properties
}

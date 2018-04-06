package ksonnet

// Object is an object that can be turned into a node by APIObject.
type Object interface {
	Kind() string
	Description() string
	IsType() bool
	Properties() map[string]Property
	Version() string
	Group() string
	Codebase() string
	QualifiedGroup() string
	Identifier() string
}

// Property is a field in a resource
type Property interface {
	Description() string
	Name() string
	Ref() string
}

// LiteralField is a literal field. (e.g. string, number, int, array)
type LiteralField struct {
	name        string
	fieldType   string
	description string
	ref         string
}

var _ Property = (*LiteralField)(nil)

// NewLiteralField creates an instance of LiteralField.
func NewLiteralField(name, fieldType, description, ref string) *LiteralField {
	return &LiteralField{
		name:        name,
		fieldType:   fieldType,
		description: description,
		ref:         ref,
	}
}

// FieldType returns the field type of the LiteralField.
func (f *LiteralField) FieldType() string {
	return f.fieldType
}

// Name returns the name of the LiteralField.
func (f *LiteralField) Name() string {
	return f.name
}

// Description returns the description of the LiteralField.
func (f *LiteralField) Description() string {
	return f.description
}

// Ref returns the ref of the LiteralField.
func (f *LiteralField) Ref() string {
	return f.ref
}

// ReferenceField is a reference field.
type ReferenceField struct {
	name        string
	description string
	ref         string
}

var _ Property = (*ReferenceField)(nil)

// NewReferenceField creates an instance of ReferenceField.
func NewReferenceField(name, description, ref string) *ReferenceField {
	return &ReferenceField{
		name:        name,
		description: description,
		ref:         ref,
	}
}

// Name returns the name of the ReferenceField.
func (f *ReferenceField) Name() string {
	return f.name
}

// Description returns the description of the ReferenceField.
func (f *ReferenceField) Description() string {
	return f.description
}

// Ref returns the defintion this ReferenceField represents.
func (f *ReferenceField) Ref() string {
	return f.ref
}

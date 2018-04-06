package ksonnet

import (
	"fmt"
	"sort"
	"strings"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"
)

// renderer is an item that can be rendered.
type renderer interface {
	Render(parent *nm.Object) error
}

type baseRenderer struct {
	name        string
	description string
	parent      string
	ref         string
}

func newBaseRenderer(field Property, parent string) baseRenderer {
	return baseRenderer{
		name:        field.Name(),
		description: field.Description(),
		parent:      parent,
		ref:         field.Ref(),
	}
}

func (r *baseRenderer) setter() string {
	return fieldName(r.name, false)
}

func (r *baseRenderer) mixin() string {
	return fieldName(r.name, true)
}

// LiteralFieldRenderer renders a literal field.
type LiteralFieldRenderer struct {
	lf         *LiteralField
	parentName string
}

// NewLiteralFieldRenderer creates an instance of LiteralField.
func NewLiteralFieldRenderer(lf *LiteralField, parentName string) *LiteralFieldRenderer {
	return &LiteralFieldRenderer{
		lf:         lf,
		parentName: parentName,
	}
}

// Render renders the literal field in the container.
func (r *LiteralFieldRenderer) Render(container *nm.Object) error {
	var rndr renderer

	switch ft := r.lf.FieldType(); ft {
	case "array":
		rndr = NewArrayRenderer(r.lf, r.parentName)
	case "object":
		rndr = NewObjectRenderer(r.lf, r.parentName)
	case "string", "boolean", "integer", "number":
		rndr = NewItemRenderer(r.lf, r.parentName)
	default:
		return errors.Errorf("unknown literal field type %s", ft)
	}

	return rndr.Render(container)
}

// ReferenceRenderer renders a reference field.
type ReferenceRenderer struct {
	baseRenderer
	rf *ReferenceField
	tl typeLookup
}

// NewReferenceRenderer creates an instance of ReferenceRenderer.
func NewReferenceRenderer(rf *ReferenceField, tl typeLookup, parent string) *ReferenceRenderer {
	return &ReferenceRenderer{
		baseRenderer: newBaseRenderer(rf, parent),
		tl:           tl,
		rf:           rf,
	}
}

// Render renders the reference in the container.
func (r *ReferenceRenderer) Render(container *nm.Object) error {
	name := r.rf.Name()
	desc := r.rf.Description()

	mo := nm.NewObject()
	mixinPreamble(mo, r.parent, name)

	ref := r.rf.Ref()

	ty, err := r.tl.Field(ref)
	if err != nil {
		return errors.Wrapf(err, "fetch type %s", ref)
	}

	renderFields(r.tl, mo, name, ty.Properties())

	formattedName := FormatKind(r.rf.Name())

	container.Set(nm.NewKey(formattedName, nm.KeyOptComment(desc)), mo)
	_ = genTypeAliasEntry(container, name, ref)

	return nil
}

// ObjectRenderer renders an object field.
type ObjectRenderer struct {
	baseRenderer
}

// NewObjectRenderer creates an instance of ObjectRenderer
func NewObjectRenderer(field Property, parent string) *ObjectRenderer {
	return &ObjectRenderer{
		baseRenderer: newBaseRenderer(field, parent),
	}
}

// Render renders the object field in the container.
func (r *ObjectRenderer) Render(container *nm.Object) error {
	wrapper := mixinName(r.parent)
	setterFn := createObjectWithField(r.name, wrapper, false)
	setProperty(container, r.setter(), r.description, []string{FormatKind(r.name)}, setterFn)

	mixinFn := createObjectWithField(r.name, wrapper, true)
	setProperty(container, r.mixin(), r.description, []string{FormatKind(r.name)}, mixinFn)

	_ = genTypeAliasEntry(container, r.name, r.ref)

	return nil
}

// ItemRenderer renders items.
type ItemRenderer struct {
	baseRenderer
}

var _ renderer = (*ItemRenderer)(nil)

// NewItemRenderer creates an instance of ItemRenderer.
func NewItemRenderer(f Property, parent string) *ItemRenderer {
	return &ItemRenderer{baseRenderer: newBaseRenderer(f, parent)}
}

// Render renders an item in its parent object.
func (r *ItemRenderer) Render(parent *nm.Object) error {
	noder := createObjectWithField(r.name, mixinName(r.parent), false)
	setProperty(parent, r.setter(), r.description, []string{FormatKind(r.name)}, noder)

	_ = genTypeAliasEntry(parent, r.name, r.ref)
	return nil
}

// ArrayRenderer renders arrays.
type ArrayRenderer struct {
	baseRenderer
}

// NewArrayRenderer creates an instance of ArrayRenderer.
func NewArrayRenderer(f Property, parent string) *ArrayRenderer {
	return &ArrayRenderer{baseRenderer: newBaseRenderer(f, parent)}
}

// Render renders an item in its parent object.
func (r *ArrayRenderer) Render(container *nm.Object) error {
	wrapper := mixinName(r.parent)
	setterFn := convertToArray(r.name, wrapper, false)
	setProperty(container, r.setter(), r.description, []string{FormatKind(r.name)}, setterFn)

	mixinFn := convertToArray(r.name, wrapper, true)
	setProperty(container, r.mixin(), r.description, []string{FormatKind(r.name)}, mixinFn)

	_ = genTypeAliasEntry(container, r.name, r.ref)
	return nil
}

func convertToArray(varName, parent string, mixin bool) nm.Noder {
	apply := nm.NewApply(
		nm.NewCall("std.type"),
		[]nm.Noder{nm.NewVar(FormatKind(varName))},
		nil)

	test := nm.NewBinary(apply, nm.NewStringDouble("array"), nm.BopEqual)

	var trueBranch nm.Noder
	var falseBranch nm.Noder

	trueO := nm.OnelineObject()
	trueO.Set(
		nm.InheritedKey(varName, nm.KeyOptMixin(mixin)),
		nm.NewVar(FormatKind(varName)))

	falseO := nm.OnelineObject()
	falseO.Set(
		nm.InheritedKey(varName, nm.KeyOptMixin(mixin)),
		nm.NewArray([]nm.Noder{nm.NewVar(FormatKind(varName))}))

	if parent == "" {
		trueBranch = trueO
		falseBranch = falseO
	} else {
		trueBranch = nm.NewApply(nm.NewCall(parent), []nm.Noder{trueO}, nil)
		falseBranch = nm.NewApply(nm.NewCall(parent), []nm.Noder{falseO}, nil)
	}

	return nm.NewConditional(test, trueBranch, falseBranch)
}

// createObjectWithField creates an object with a field. Creates {field: field} or {field+: field}
// if mixin. If it has a parent, it create __parentNameMixin({field: field}).
func createObjectWithField(name, parentName string, mixin bool) nm.Noder {
	var noder nm.Noder
	io := nm.OnelineObject()
	io.Set(nm.InheritedKey(name, nm.KeyOptMixin(mixin)), nm.NewVar(FormatKind(name)))

	if parentName == "" {
		noder = io
	} else {
		noder = nm.NewApply(nm.NewCall(parentName), []nm.Noder{io}, nil)
	}

	return noder
}

func setProperty(o *nm.Object, fnName, desc string, args []string, node nm.Noder) {
	node = nm.NewBinary(&nm.Self{}, node, nm.BopPlus)
	key := nm.FunctionKey(fnName, args, nm.KeyOptComment(desc))
	o.Set(key, node)
}

func mixinPreamble(o *nm.Object, parent, name string) error {
	if o == nil {
		return errors.New("parent object is nil")
	}
	name = FormatKind(name)

	formattedName := mixinName(name)

	var noder nm.Noder

	io := nm.OnelineObject()
	io.Set(nm.InheritedKey(name, nm.KeyOptMixin(true)), nm.NewVar(name))

	if parent == "" {
		noder = io
	} else {
		noder = nm.ApplyCall(mixinName(parent), io)
	}

	o.Set(nm.LocalKey(formattedName, nm.KeyOptParams([]string{name})), noder)

	miFn := nm.NewCall(formattedName)
	o.Set(nm.FunctionKey("mixinInstance", []string{name}), nm.NewApply(miFn, []nm.Noder{nm.NewVar(name)}, nil))

	return nil
}

func genTypeAliasEntry(container *nm.Object, name, refName string) error {
	if refName == "" {
		return errors.New("ref name is blank")
	}

	rd, err := ParseDescription(refName)
	if err != nil {
		return errors.Wrapf(err, "parse ref name from %q and %q", name, refName)
	}

	if rd.Group == "" {
		rd.Group = "core"
	}

	if rd.Version == "" {
		return errors.Errorf("there is no version in the ref name for %q and %q",
			name, refName)
	}

	kind := FormatKind(rd.Kind)
	path := []string{"hidden", rd.Group, rd.Version, kind}
	location := strings.Join(path, ".")

	typeAliasName := fmt.Sprintf("%sType", name)

	c := nm.NewCall(location)

	container.Set(nm.NewKey(typeAliasName), c)

	return nil
}

// Generates a field name.
func fieldName(name string, isMixin bool) string {
	var out string

	name = FormatKind(name)

	out = fmt.Sprintf("with%s", strings.Title(name))
	if isMixin {
		return fmt.Sprintf("%s%s", out, "Mixin")
	}

	return out
}

func mixinName(name string) string {
	if name == "" {
		return ""
	}

	name = FormatKind(name)

	return fmt.Sprintf("__%sMixin", name)
}

// typeLookup can look up types by id.
type typeLookup interface {
	Field(id string) (*Field, error)
}

type renderFieldsFn func(tl typeLookup, parent *nm.Object, parentName string, props map[string]Property) error

// renderFields renders fields from a property map.
func renderFields(tl typeLookup, parent *nm.Object, parentName string, props map[string]Property) error {
	container := parent
	if parentName == "" {
		container = nm.NewObject()
	}

	var names []string
	for name := range props {
		names = append(names, name)
	}

	sort.Strings(names)

	for _, name := range names {
		field := props[name]

		switch t := field.(type) {
		case *LiteralField:
			r := NewLiteralFieldRenderer(t, parentName)
			if err := r.Render(parent); err != nil {
				return errors.Wrap(err, "render literal field")
			}
		case *ReferenceField:
			r := NewReferenceRenderer(t, tl, parentName)
			if err := r.Render(container); err != nil {
				return errors.Wrap(err, "render reference field")
			}
		default:
			return errors.Errorf("unknown field type %T", t)
		}
	}

	if parentName == "" {
		parent.Set(nm.NewKey("mixin"), container)
	}

	return nil
}

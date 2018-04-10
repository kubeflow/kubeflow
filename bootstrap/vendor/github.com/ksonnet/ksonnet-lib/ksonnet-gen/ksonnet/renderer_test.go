package ksonnet

import (
	"io/ioutil"
	"testing"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLiteralFieldRenderer(t *testing.T) {
	cases := []struct {
		name      string
		fieldType string
		hasMixin  bool
		isErr     bool
	}{
		{
			name:      "item",
			fieldType: "string",
		},
		{
			name:      "array",
			fieldType: "array",
			hasMixin:  true,
		},
		{
			name:      "object",
			fieldType: "object",
			hasMixin:  true,
		},
		{
			name:      "unknown field type",
			fieldType: "unknown",
			isErr:     true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			f := NewLiteralField("name", tc.fieldType, "desc", "")
			r := NewLiteralFieldRenderer(f, "")

			o := nm.NewObject()
			err := r.Render(o)

			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				assert.NotNil(t, o.Get(fieldName("name", false)))
				if tc.hasMixin {
					assert.NotNil(t, o.Get(fieldName("name", true)))
				}
			}
		})
	}
}

func TestReferenceRenderer(t *testing.T) {
	cases := []struct {
		name  string
		ref   string
		isErr bool
	}{
		{
			name: "with a reference",
			ref:  "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
		},
		{
			name:  "without a resource",
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			c := initCatalog(t, "swagger-1.8.json")

			f := NewReferenceField("name", "desc", tc.ref)

			r := NewReferenceRenderer(f, c, "")

			o := nm.NewObject()
			err := r.Render(o)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotNil(t, o.Get("name"))
			}
		})
	}
}

func Test_setProperty(t *testing.T) {
	o := nm.NewObject()
	setProperty(o, "fnName", "desc", []string{"arg1"}, nm.NewObject())

	expected := nm.NewObject()
	node := nm.NewBinary(&nm.Self{}, nm.NewObject(), nm.BopPlus)
	expected.Set(
		nm.FunctionKey("fnName", []string{"arg1"}, nm.KeyOptComment("desc")),
		node)

	require.Equal(t, expected, o)

}

func Test_createObjectWithField(t *testing.T) {
	cases := []struct {
		name   string
		parent string
	}{
		{
			name:   "without parent",
			parent: "",
		},
		{
			name:   "with parent",
			parent: "parent",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := createObjectWithField("varName", tc.parent, false)

			io := nm.OnelineObject()
			io.Set(nm.InheritedKey("varName"), nm.NewVar("varName"))

			var expected nm.Noder
			if tc.parent == "" {
				expected = io
			} else {
				expected = nm.NewApply(nm.NewCall(tc.parent), []nm.Noder{io}, nil)
			}

			require.Equal(t, expected, got)
		})
	}
}

func Test_convertToArray(t *testing.T) {
	cases := []struct {
		name   string
		mixin  bool
		parent string
	}{
		{
			name:  "no mixin",
			mixin: false,
		},
		{
			name:  "mixin",
			mixin: true,
		},
		{
			name:   "parent",
			parent: "parent",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			call := nm.NewCall("std.type")
			args := nm.NewVar("varName")
			apply := nm.NewApply(call, []nm.Noder{args}, nil)

			key := nm.InheritedKey("varName", nm.KeyOptMixin(tc.mixin))

			var trueBranch, falseBranch nm.Noder

			bo := nm.NewBinary(apply, nm.NewStringDouble("array"), nm.BopEqual)
			trueObject := nm.OnelineObject()
			trueObject.Set(key, nm.NewVar("varName"))

			falseObject := nm.OnelineObject()
			falseObject.Set(key, nm.NewArray([]nm.Noder{nm.NewVar("varName")}))

			if tc.parent == "" {
				trueBranch = trueObject
				falseBranch = falseObject
			} else {
				trueBranch = nm.NewApply(nm.NewCall(tc.parent), []nm.Noder{trueObject}, nil)
				falseBranch = nm.NewApply(nm.NewCall(tc.parent), []nm.Noder{falseObject}, nil)
			}

			expected := nm.NewConditional(bo, trueBranch, falseBranch)

			got := convertToArray("varName", tc.parent, tc.mixin)

			require.Equal(t, expected, got)
		})
	}
}

func Test_genTypeAlias(t *testing.T) {
	cases := []struct {
		name     string
		propName string
		ref      string
		keyName  string
		alias    string
		isErr    bool
	}{
		{
			name:     "with a ref",
			propName: "prop",
			ref:      "io.k8s.api.group.v1.Prop",
			keyName:  "propType",
			alias:    "hidden.group.v1.prop",
		},
		{
			name:  "with no ref",
			isErr: true,
		},
		{
			name:  "with an un-parsable ref",
			ref:   "none",
			isErr: true,
		},
		{
			name:     "with an item ref",
			propName: "prop",
			ref:      "io.k8s.api.group.v1.Prop",
			keyName:  "propType",
			alias:    "hidden.group.v1.prop",
		},
		{
			name:     "without a group",
			propName: "prop",
			ref:      "io.k8s.codebase.pkg.api.version.kind",
			keyName:  "propType",
			alias:    "hidden.core.version.kind",
		},
		{
			name:     "without a version",
			propName: "prop",
			ref:      "io.k8s.codebase.pkg.runtime.kind",
			isErr:    true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {

			o := nm.NewObject()
			err := genTypeAliasEntry(o, tc.propName, tc.ref)

			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				n := o.Get(tc.keyName)
				assert.NotNil(t, n)

				expectedCall := nm.NewCall(tc.alias)
				assert.Equal(t, expectedCall, n)
			}
		})
	}
}

func Test_mixinPreamble(t *testing.T) {
	cases := []struct {
		name       string
		container  *nm.Object
		parentName string
		mixinName  string
		isErr      bool
	}{
		{
			name:      "with an empty parent container",
			mixinName: "name",
			isErr:     true,
		},
		{
			name:      "without a parent name",
			container: nm.NewObject(),
			mixinName: "name",
		},
		{
			name:       "with a parent name",
			container:  nm.NewObject(),
			parentName: "parent",
			mixinName:  "name",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := mixinPreamble(tc.container, tc.parentName, tc.mixinName)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				require.NotNil(t, tc.container.Get("mixinInstance"))

				n := tc.container.Get(mixinName(tc.mixinName))
				require.NotNil(t, n)

				if tc.parentName == "" {
					require.IsType(t, &nm.Object{}, n)
				} else {
					require.IsType(t, &nm.Apply{}, n)
				}
			}
		})
	}

}

func Test_fieldName(t *testing.T) {
	cases := []struct {
		name     string
		in       string
		isMixin  bool
		expected string
	}{
		{
			name:     "is mixin",
			in:       "name",
			isMixin:  true,
			expected: "withNameMixin",
		},
		{
			name:     "is not mixin",
			in:       "name",
			isMixin:  false,
			expected: "withName",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := fieldName(tc.in, tc.isMixin)
			require.Equal(t, tc.expected, got)
		})
	}
}

func Test_mixinName(t *testing.T) {
	cases := []struct {
		name     string
		in       string
		expected string
	}{
		{
			name: "empty",
		},
		{
			name:     "valid",
			in:       "name",
			expected: "__nameMixin",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := mixinName(tc.in)
			require.Equal(t, tc.expected, got)
		})
	}
}

func Test_renderFields(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")
	o := nm.NewObject()
	props := map[string]Property{
		"name": NewLiteralField("name", "string", "desc", ""),
		"aref": NewReferenceField("aref", "desc", "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector"),
	}

	err := renderFields(c, o, "", props)
	require.NoError(t, err)

	err = printer.Fprint(ioutil.Discard, o.Node())
	require.NoError(t, err)

	require.NotNil(t, o.Get(fieldName("name", false)))
	mo, ok := o.Get("mixin").(*nm.Object)
	require.True(t, ok)
	require.NotNil(t, mo.Get("aref"))
}

type customField struct{}

func (cf *customField) Description() string { return "desc" }
func (cf *customField) Name() string        { return "name" }
func (cf *customField) Ref() string         { return "" }

func Test_renderFields_unknown_type(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")
	o := nm.NewObject()
	props := map[string]Property{
		"name": &customField{},
	}

	err := renderFields(c, o, "", props)
	require.Error(t, err)
}

func Test_renderFields_literal_field_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")
	o := nm.NewObject()
	props := map[string]Property{
		"name": NewLiteralField("name", "unknown", "desc", ""),
	}

	err := renderFields(c, o, "", props)
	require.Error(t, err)
}

func Test_renderFields_reference_field_error(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")
	o := nm.NewObject()
	props := map[string]Property{
		"aref": NewReferenceField("aref", "desc", "unknown-id"),
	}

	err := renderFields(c, o, "", props)
	require.Error(t, err)
}

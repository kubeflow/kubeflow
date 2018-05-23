package ksonnet

import (
	"bytes"
	"io/ioutil"
	"testing"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_matchCtorSetter(t *testing.T) {
	cases := []struct {
		name  string
		in    string
		path  string
		fn    string
		isErr bool
	}{
		{
			name: "with no path",
			in:   "withName",
			fn:   "withName",
			path: "self",
		},
		{
			name: "with a path",
			in:   "foo.bar.baz.withName",
			path: "self.foo.bar.baz",
			fn:   "withName",
		},
		{
			name:  "unrecognized",
			in:    "invalid",
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			path, fn, err := matchCtorSetter(tc.in)
			if tc.isErr {
				require.Error(t, err)
			} else {
				assert.Equal(t, tc.path, path)
				assert.Equal(t, tc.fn, fn)
			}
		})
	}
}

func Test_constructor(t *testing.T) {
	obj := map[string]interface{}{
		"key": "val",
	}

	array := []string{"val"}

	params := []constructorParam{
		*newConstructorParam("name", "withName", nil),
		*newConstructorParam("nestedName", "foo.bar.baz.withName", nil),
		*newConstructorParam("nestedItem", "foo.bar.baz.withItem", nil),
		*newConstructorParam("str", "withStr", "val"),
		*newConstructorParam("obj", "withObj", obj),
		*newConstructorParam("array", "withArray", array),
		*newConstructorParam("other", "other.withArray", nil),
		*newConstructorParam("foo", "last.path.withFoo", nil),
	}

	c := newConstructor("new", params...)

	o := nm.NewObject()

	ctorBase := []nm.Noder{
		nm.NewVar("apiVersion"),
		nm.NewVar("kind"),
	}

	key, err := c.Key()
	require.NoError(t, err)
	o.Set(key, c.Body(ctorBase...))

	var buf bytes.Buffer
	err = printer.Fprint(&buf, o.Node())
	require.NoError(t, err)

	expected, err := ioutil.ReadFile("testdata/constructor.libsonnet")
	require.NoError(t, err)

	assert.Equal(t, string(expected), buf.String())
}

func Test_constructorParam(t *testing.T) {
	obj, err := nm.KVFromMap(map[string]interface{}{"alpha": "beta"})
	require.NoError(t, err)

	cases := []struct {
		name     string
		cp       *constructorParam
		option   nm.OptionalArg
		isOptErr bool
	}{
		{
			name:   "local property",
			cp:     newConstructorParam("name", "withName", nil),
			option: nm.OptionalArg{Name: "name", Default: nm.NewStringDouble("")},
		},
		{
			name:   "nested property",
			cp:     newConstructorParam("name", "foo.bar.baz.withName", nil),
			option: nm.OptionalArg{Name: "name", Default: nm.NewStringDouble("")},
		},
		{
			name:   "string",
			cp:     newConstructorParam("name", "withName", "name"),
			option: nm.OptionalArg{Name: "name", Default: nm.NewStringDouble("name")},
		},
		{
			name:   "map[string]interface{}",
			cp:     newConstructorParam("name", "withName", map[string]interface{}{"alpha": "beta"}),
			option: nm.OptionalArg{Name: "name", Default: obj},
		},
		{
			name:     "invalid item in map[string]interface{}",
			cp:       newConstructorParam("name", "withName", map[string]interface{}{"alpha": []int{1}}),
			isOptErr: true,
		},
		{
			name: "array of strings",
			cp:   newConstructorParam("name", "withName", []string{"one", "two"}),
			option: nm.OptionalArg{Name: "name",
				Default: nm.NewArray([]nm.Noder{nm.NewStringDouble("one"), nm.NewStringDouble("two")})},
		},
		{
			name:   "float64",
			cp:     newConstructorParam("name", "withName", 1.0),
			option: nm.OptionalArg{Name: "name", Default: nm.NewFloat(1.0)},
		},
		{
			name:   "int",
			cp:     newConstructorParam("name", "withName", 1),
			option: nm.OptionalArg{Name: "name", Default: nm.NewInt(1)},
		},
		{
			name:   "bool",
			cp:     newConstructorParam("name", "withName", true),
			option: nm.OptionalArg{Name: "name", Default: nm.NewBoolean(true)},
		},
		{
			name:     "unknown type",
			cp:       newConstructorParam("name", "withName", []int{1}),
			isOptErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			option, err := tc.cp.Option()
			if tc.isOptErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				assert.Equal(t, tc.option, option)
			}
		})
	}
}

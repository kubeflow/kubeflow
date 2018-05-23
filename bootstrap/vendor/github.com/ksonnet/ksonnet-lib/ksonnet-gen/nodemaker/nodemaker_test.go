package nodemaker

import (
	"bytes"
	"fmt"
	"os"
	"testing"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func ExampleApply() {
	o := NewObject()
	k := LocalKey("foo")

	arg1 := NewStringDouble("arg1")

	a := ApplyCall("alpha.beta.charlie", arg1)

	if err := o.Set(k, a); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   local foo = alpha.beta.charlie("arg1"),
	// }
}

func ExampleArray() {
	o := NewObject()

	nodes := []Noder{NewStringDouble("hello")}

	t := NewArray(nodes)
	k := InheritedKey("foo")
	if err := o.Set(k, t); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   foo: ["hello"],
	// }
}

func ExampleBinary() {
	o := NewObject()
	k := NewKey("foo")
	b := NewBinary(NewVar("alpha"), NewVar("beta"), BopPlus)

	if err := o.Set(k, b); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   foo:: alpha + beta,
	// }
}

func ExampleCall() {
	o := NewObject()
	k := NewKey("foo")

	c := NewCall("a.b.c.d")

	if err := o.Set(k, c); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   foo:: a.b.c.d,
	// }
}

func ExampleObject() {
	o := NewObject()

	k := NewKey("foo")
	o2 := NewObject()

	if err := o.Set(k, o2); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   foo:: {
	//   },
	// }
}

func ExampleConditional() {
	o := NewObject()
	k := NewKey("foo")

	cond := NewBinary(
		NewVar("alpha"),
		NewVar("beta"),
		BopEqual,
	)
	trueBranch := NewObject()
	trueBranch.Set(
		NewKey(
			"foo",
			KeyOptCategory(ast.ObjectFieldID),
			KeyOptVisibility(ast.ObjectFieldInherit)),
		NewStringDouble("1"),
	)

	falseBranch := NewObject()
	falseBranch.Set(
		NewKey(
			"foo",
			KeyOptCategory(ast.ObjectFieldID),
			KeyOptVisibility(ast.ObjectFieldInherit)),
		NewStringDouble("2"),
	)

	c := NewConditional(cond, trueBranch, falseBranch)

	if err := o.Set(k, c); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	if err := printer.Fprint(os.Stdout, o.Node()); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	// Output:
	// {
	//   foo:: if alpha == beta then {
	//     foo: "1",
	//   } else {
	//     foo: "2",
	//   },
	// }
}

func TestObject(t *testing.T) {
	cases := []struct {
		name   string
		object func(*testing.T) (Noder, ast.Node)
	}{
		{
			name:   "empty",
			object: newObject,
		},
		{
			name:   "with a single key",
			object: objectWithKeys,
		},
		{
			name:   "with a reserved word as the key",
			object: objectWithReservedWordKey,
		},
		{
			name:   "with a string that needs to be quoted as the key",
			object: objectWithQuotedWordKey,
		},
		{
			name:   "inline",
			object: inline,
		},
		{
			name:   "local field",
			object: localField,
		},
		{
			name:   "text field",
			object: textField,
		},
		{
			name:   "mixin field",
			object: mixinField,
		},
		{
			name:   "number field",
			object: numberField,
		},
		{
			name:   "self field",
			object: selfField,
		},
		{
			name:   "array field",
			object: arrayField,
		},
		{
			name:   "comment field",
			object: commentedField,
		},
		{
			name:   "function",
			object: functionField,
		},
		{
			name:   "function with args",
			object: functionFieldArg,
		},
		{
			name:   "function with optional args",
			object: functionFieldOptionalArguments,
		},
		{
			name:   "binary operation",
			object: binaryOp,
		},
		{
			name:   "conditional",
			object: conditional,
		},
		{
			name:   "conditional without false branch",
			object: conditionalNoFalse,
		},
		{
			name:   "local apply",
			object: localApply,
		},
		{
			name:   "local apply with an index",
			object: localApplyWithAnIndex,
		},
		{
			name:   "local",
			object: local,
		},
		{
			name:   "optional arguments",
			object: optionalArguments,
		},
		{
			name:   "combine 0 nodes",
			object: combine0,
		},
		{
			name:   "combine 1 nodes",
			object: combine1,
		},
		{
			name:   "combine 2 nodes",
			object: combine2,
		},
		{
			name:   "combine 3 nodes",
			object: combine3,
		},
		{
			name:   "kv from map",
			object: kvFromMap1,
		},
		{
			name:   "kv from map invalid value",
			object: kvFromMap2,
		},
		{
			name:   "kv from map invalid map",
			object: kvFromMap3,
		},
		{
			name:   "create function",
			object: function,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			node, expected := tc.object(t)
			if node != nil && expected != nil {
				if !assert.Equal(t, expected, node.Node()) {
					printer.Fprint(os.Stdout, node.Node())
				}
			}
		})
	}
}

func newObject(t *testing.T) (Noder, ast.Node) {
	return NewObject(), &astext.Object{}
}

func objectWithKeys(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("foo")
	o2 := NewObject()
	o.Set(k, o2)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:    newIdentifier("foo"),
					Hide:  ast.ObjectFieldHidden,
					Kind:  ast.ObjectFieldID,
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func objectWithReservedWordKey(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("error")
	o2 := NewObject()
	o.Set(k, o2)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Hide:  ast.ObjectFieldHidden,
					Kind:  ast.ObjectFieldStr,
					Expr1: NewStringDouble("error").Node(),
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func objectWithQuotedWordKey(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("$foo")
	o2 := NewObject()
	o.Set(k, o2)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Hide: ast.ObjectFieldHidden,
					Kind: ast.ObjectFieldStr,
					Expr1: &ast.LiteralString{
						Value: "$foo",
						Kind:  ast.StringDouble,
					},
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func inline(t *testing.T) (Noder, ast.Node) {
	o := OnelineObject()
	k := NewKey("foo")
	o2 := NewObject()
	o.Set(k, o2)

	ao := &astext.Object{
		Oneline: true,
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:    newIdentifier("foo"),
					Hide:  ast.ObjectFieldHidden,
					Kind:  ast.ObjectFieldID,
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func localField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := LocalKey("foo")
	o.Set(k, NewObject())

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:    newIdentifier("foo"),
					Kind:  ast.ObjectLocal,
					Hide:  ast.ObjectFieldHidden,
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func textField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	sd := NewStringDouble("bar")
	k := InheritedKey("foo")
	o.Set(k, sd)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldInherit,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.LiteralString{
						Kind:  ast.StringDouble,
						Value: "bar",
					},
				},
			},
		},
	}

	return o, ao
}

func mixinField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	sd := NewStringDouble("bar")
	k := NewKey("foo",
		KeyOptVisibility(ast.ObjectFieldInherit),
		KeyOptMixin(true))
	o.Set(k, sd)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					SuperSugar: true,
					Id:         newIdentifier("foo"),
					Hide:       ast.ObjectFieldInherit,
					Kind:       ast.ObjectFieldID,
					Expr2: &ast.LiteralString{
						Kind:  ast.StringDouble,
						Value: "bar",
					},
				},
			},
		},
	}

	return o, ao
}

func numberField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	i := NewInt(1)
	k := InheritedKey("foo")
	o.Set(k, i)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldInherit,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.LiteralNumber{
						Value:          1,
						OriginalString: "1",
					},
				},
			},
		},
	}

	return o, ao
}

func selfField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	s := &Self{}
	k := InheritedKey("foo")
	o.Set(k, s)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:    newIdentifier("foo"),
					Hide:  ast.ObjectFieldInherit,
					Kind:  ast.ObjectFieldID,
					Expr2: &ast.Self{},
				},
			},
		},
	}

	return o, ao
}

func arrayField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	nodes := []Noder{NewStringDouble("hello")}
	a := NewArray(nodes)
	k := InheritedKey("foo")
	o.Set(k, a)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldInherit,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.Array{
						Elements: []ast.Node{
							&ast.LiteralString{
								Kind:  ast.StringDouble,
								Value: "hello",
							},
						},
					},
				},
			},
		},
	}

	return o, ao
}

func commentedField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("foo", KeyOptComment("a comment"))
	o2 := NewObject()
	o.Set(k, o2)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:    newIdentifier("foo"),
					Hide:  ast.ObjectFieldHidden,
					Kind:  ast.ObjectFieldID,
					Expr2: &astext.Object{},
				},
				Comment: &astext.Comment{Text: "a comment"},
			},
		},
	}

	return o, ao
}

func functionField(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := FunctionKey("foo", []string{})
	o.Set(k, NewObject())

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Kind: ast.ObjectFieldID,
					Method: &ast.Function{
						Parameters: ast.Parameters{
							Required: ast.Identifiers{},
						},
					},
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func functionFieldArg(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := FunctionKey("foo", []string{"arg1"})
	o.Set(k, NewObject())

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Kind: ast.ObjectFieldID,
					Method: &ast.Function{
						Parameters: ast.Parameters{
							Required: ast.Identifiers{
								*newIdentifier("arg1"),
							},
						},
					},
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func functionFieldOptionalArguments(t *testing.T) (Noder, ast.Node) {
	oa1 := OptionalArg{Name: "opt1"}
	oa2 := OptionalArg{Name: "opt2", Default: NewVar("val")}

	o := NewObject()
	k := FunctionKey("foo", []string{"arg1"}, KeyOptNamedParams(oa1, oa2))
	o.Set(k, NewObject())

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Kind: ast.ObjectFieldID,
					Method: &ast.Function{
						Parameters: ast.Parameters{
							Required: ast.Identifiers{
								*newIdentifier("arg1"),
							},
							Optional: []ast.NamedParameter{
								{Name: *newIdentifier("opt1")},
								{Name: *newIdentifier("opt2"), DefaultArg: &ast.Var{Id: *newIdentifier("val")}},
							},
						},
					},
					Expr2: &astext.Object{},
				},
			},
		},
	}

	return o, ao
}

func binaryOp(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("foo")
	b := NewBinary(NewVar("alpha"), NewVar("beta"), BopPlus)
	o.Set(k, b)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldHidden,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.Binary{
						Left:  &ast.Var{Id: *newIdentifier("alpha")},
						Op:    ast.BopPlus,
						Right: &ast.Var{Id: *newIdentifier("beta")},
					},
				},
			},
		},
	}

	return o, ao
}

func conditional(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("foo")

	cond := NewBinary(
		NewVar("alpha"),
		NewVar("beta"),
		BopEqual,
	)
	trueBranch := NewObject()
	trueBranch.Set(
		NewKey(
			"foo",
			KeyOptCategory(ast.ObjectFieldID),
			KeyOptVisibility(ast.ObjectFieldInherit)),
		NewStringDouble("1"),
	)

	falseBranch := NewObject()
	falseBranch.Set(
		NewKey(
			"foo",
			KeyOptCategory(ast.ObjectFieldID),
			KeyOptVisibility(ast.ObjectFieldInherit)),
		NewStringDouble("2"),
	)

	c := NewConditional(cond, trueBranch, falseBranch)

	o.Set(k, c)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldHidden,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.Conditional{
						Cond: &ast.Binary{
							Left:  &ast.Var{Id: *newIdentifier("alpha")},
							Op:    ast.BopManifestEqual,
							Right: &ast.Var{Id: *newIdentifier("beta")},
						},
						BranchTrue: &astext.Object{
							Fields: astext.ObjectFields{
								{
									ObjectField: ast.ObjectField{
										Kind: ast.ObjectFieldID,
										Hide: ast.ObjectFieldInherit,
										Id:   newIdentifier("foo"),
										Expr2: &ast.LiteralString{
											Kind:  ast.StringDouble,
											Value: "1",
										},
									},
								},
							},
						},
						BranchFalse: &astext.Object{
							Fields: astext.ObjectFields{
								{
									ObjectField: ast.ObjectField{
										Kind: ast.ObjectFieldID,
										Hide: ast.ObjectFieldInherit,
										Id:   newIdentifier("foo"),
										Expr2: &ast.LiteralString{
											Kind:  ast.StringDouble,
											Value: "2",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	return o, ao
}

func conditionalNoFalse(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := NewKey("foo")

	cond := NewBinary(
		NewVar("alpha"),
		NewVar("beta"),
		BopEqual,
	)
	trueBranch := NewObject()
	trueBranch.Set(
		NewKey(
			"foo",
			KeyOptCategory(ast.ObjectFieldID),
			KeyOptVisibility(ast.ObjectFieldInherit)),
		NewStringDouble("1"),
	)

	c := NewConditional(cond, trueBranch, nil)

	o.Set(k, c)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Hide: ast.ObjectFieldHidden,
					Kind: ast.ObjectFieldID,
					Expr2: &ast.Conditional{
						Cond: &ast.Binary{
							Left:  &ast.Var{Id: *newIdentifier("alpha")},
							Op:    ast.BopManifestEqual,
							Right: &ast.Var{Id: *newIdentifier("beta")},
						},
						BranchTrue: &astext.Object{
							Fields: astext.ObjectFields{
								{
									ObjectField: ast.ObjectField{
										Kind: ast.ObjectFieldID,
										Hide: ast.ObjectFieldInherit,
										Id:   newIdentifier("foo"),
										Expr2: &ast.LiteralString{
											Kind:  ast.StringDouble,
											Value: "1",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	return o, ao
}

func localApply(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := LocalKey("foo")

	call := NewCall("alpha")
	arg1 := NewStringDouble("arg1")
	a := NewApply(call, []Noder{arg1}, nil)

	o.Set(k, a)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Kind: ast.ObjectLocal,
					Expr2: &ast.Apply{
						Target: &ast.Var{
							Id: *newIdentifier("alpha"),
						},
						Arguments: ast.Arguments{
							Positional: ast.Nodes{
								&ast.LiteralString{
									Kind:  ast.StringDouble,
									Value: "arg1",
								},
							},
						},
					},
				},
			},
		},
	}

	return o, ao
}

func localApplyWithAnIndex(t *testing.T) (Noder, ast.Node) {
	o := NewObject()
	k := LocalKey("foo")

	arg1 := NewStringDouble("arg1")
	a := ApplyCall("alpha.beta.charlie", arg1)

	o.Set(k, a)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Id:   newIdentifier("foo"),
					Kind: ast.ObjectLocal,
					Expr2: &ast.Apply{
						Target: &ast.Index{
							Id: newIdentifier("charlie"),
							Target: &ast.Index{
								Id: newIdentifier("beta"),
								Target: &ast.Var{
									Id: *newIdentifier("alpha"),
								},
							},
						},
						Arguments: ast.Arguments{
							Positional: ast.Nodes{
								&ast.LiteralString{
									Kind:  ast.StringDouble,
									Value: "arg1",
								},
							},
						},
					},
				},
			},
		},
	}

	return o, ao
}

func local(t *testing.T) (Noder, ast.Node) {
	i := NewImport("value")
	l := NewLocal("value", i, nil)

	ao := &ast.Local{
		Binds: ast.LocalBinds{
			{
				Variable: *newIdentifier("value"),
				Body: &ast.Import{
					File: &ast.LiteralString{
						Kind:  ast.StringDouble,
						Value: "value",
					},
				},
			},
		},
	}

	return l, ao
}

func optionalArguments(t *testing.T) (Noder, ast.Node) {
	apply := NewApply(
		NewVar("thing"), []Noder{NewVar("arg1")},
		[]OptionalArg{{Name: "opt1"}, {Name: "opt2", Default: NewStringDouble("val")}})

	ao := &ast.Apply{
		Target: &ast.Var{Id: *newIdentifier("thing")},
		Arguments: ast.Arguments{
			Positional: ast.Nodes{&ast.Var{Id: *newIdentifier("arg1")}},
			Named: []ast.NamedArgument{
				{Name: *newIdentifier("opt1"), Arg: &ast.LiteralString{Kind: ast.StringDouble}},
				{Name: *newIdentifier("opt2"), Arg: &ast.LiteralString{Value: "val", Kind: ast.StringDouble}},
			},
		},
	}

	return apply, ao
}

func combine0(t *testing.T) (Noder, ast.Node) {
	c := Combine()

	ao := &astext.Object{}

	return c, ao
}

func combine1(t *testing.T) (Noder, ast.Node) {
	c := Combine(NewVar("var1"))

	ao := &ast.Var{Id: *newIdentifier("var1")}

	return c, ao
}

func combine2(t *testing.T) (Noder, ast.Node) {
	c := Combine(NewVar("var1"), NewVar("var2"))

	ao := &ast.Binary{
		Left:  &ast.Var{Id: *newIdentifier("var1")},
		Right: &ast.Var{Id: *newIdentifier("var2")},
		Op:    ast.BopPlus,
	}

	return c, ao
}

func combine3(t *testing.T) (Noder, ast.Node) {
	c := Combine(NewVar("var1"), NewVar("var2"), NewVar("var3"))

	ao := &ast.Binary{
		Left: &ast.Binary{
			Left:  &ast.Var{Id: *newIdentifier("var1")},
			Right: &ast.Var{Id: *newIdentifier("var2")},
			Op:    ast.BopPlus,
		},
		Right: &ast.Var{Id: *newIdentifier("var3")},
		Op:    ast.BopPlus,
	}

	return c, ao
}

func kvFromMap1(t *testing.T) (Noder, ast.Node) {
	m := map[string]interface{}{
		"string":  "string",
		"float64": 1.0,
		"int":     1,
		"bool":    true,
		"obj": map[interface{}]interface{}{
			"a": "a",
			"b": 2,
		},
		"obj2": map[string]interface{}{
			"a": "a",
			"b": 2,
		},
		"array": []interface{}{"a", "b"},
	}

	o, err := KVFromMap(m)
	require.NoError(t, err)

	ao := &astext.Object{
		Fields: astext.ObjectFields{
			{
				ObjectField: ast.ObjectField{
					Kind: ast.ObjectFieldID,
					Hide: ast.ObjectFieldInherit,
					Id:   newIdentifier("array"),
					Expr2: NewArray([]Noder{
						NewStringDouble("a"),
						NewStringDouble("b"),
					}).Node(),
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind:  ast.ObjectFieldID,
					Hide:  ast.ObjectFieldInherit,
					Id:    newIdentifier("bool"),
					Expr2: &ast.LiteralBoolean{Value: true},
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind:  ast.ObjectFieldID,
					Hide:  ast.ObjectFieldInherit,
					Id:    newIdentifier("float64"),
					Expr2: &ast.LiteralNumber{Value: 1, OriginalString: "1"},
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind:  ast.ObjectFieldID,
					Hide:  ast.ObjectFieldInherit,
					Id:    newIdentifier("int"),
					Expr2: &ast.LiteralNumber{Value: 1, OriginalString: "1"},
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind: ast.ObjectFieldID,
					Hide: ast.ObjectFieldInherit,
					Id:   newIdentifier("obj"),
					Expr2: &astext.Object{
						Fields: astext.ObjectFields{
							{
								ObjectField: ast.ObjectField{
									Kind:  ast.ObjectFieldID,
									Hide:  ast.ObjectFieldInherit,
									Id:    newIdentifier("a"),
									Expr2: &ast.LiteralString{Value: "a", Kind: ast.StringDouble},
								},
							},
							{
								ObjectField: ast.ObjectField{
									Kind:  ast.ObjectFieldID,
									Hide:  ast.ObjectFieldInherit,
									Id:    newIdentifier("b"),
									Expr2: NewInt(2).Node(),
								},
							},
						},
					},
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind: ast.ObjectFieldID,
					Hide: ast.ObjectFieldInherit,
					Id:   newIdentifier("obj2"),
					Expr2: &astext.Object{
						Fields: astext.ObjectFields{
							{
								ObjectField: ast.ObjectField{
									Kind:  ast.ObjectFieldID,
									Hide:  ast.ObjectFieldInherit,
									Id:    newIdentifier("a"),
									Expr2: &ast.LiteralString{Value: "a", Kind: ast.StringDouble},
								},
							},
							{
								ObjectField: ast.ObjectField{
									Kind:  ast.ObjectFieldID,
									Hide:  ast.ObjectFieldInherit,
									Id:    newIdentifier("b"),
									Expr2: NewInt(2).Node(),
								},
							},
						},
					},
				},
			},
			{
				ObjectField: ast.ObjectField{
					Kind:  ast.ObjectFieldID,
					Hide:  ast.ObjectFieldInherit,
					Id:    newIdentifier("string"),
					Expr2: &ast.LiteralString{Value: "string", Kind: ast.StringDouble},
				},
			},
		},
	}

	return o, ao
}

func kvFromMap2(t *testing.T) (Noder, ast.Node) {
	m := map[string]interface{}{
		"invalid": nil,
	}

	_, err := KVFromMap(m)
	require.Error(t, err)

	return nil, nil
}

func kvFromMap3(t *testing.T) (Noder, ast.Node) {
	_, err := KVFromMap(nil)
	require.Error(t, err)

	return nil, nil
}

func function(t *testing.T) (Noder, ast.Node) {
	body := NewStringDouble("a")
	f := NewFunction([]string{"option"}, body)

	ao := &ast.Function{
		Parameters: ast.Parameters{
			Required: ast.Identifiers{*newIdentifier("option")},
		},
		Body: &ast.LiteralString{
			Kind:  ast.StringDouble,
			Value: "a",
		},
	}

	return f, ao
}

func TestObject_Get(t *testing.T) {
	o := NewObject()
	v := NewObject()

	o.Set(NewKey("item"), v)

	if expected, got := v, o.Get("item"); got != expected {
		t.Fatalf("Get() got = %#v; expected = %#v", got, expected)
	}

	noder := o.Get("missing")
	if noder != nil {
		t.Fatalf("Get() nonexistant key should return nil")
	}
}

func TestBinary_UnknownOperator(t *testing.T) {
	left := NewInt(1)
	right := NewFloat(2)

	b := NewBinary(left, right, BinaryOp("☃"))

	defer func() {
		if r := recover(); r == nil {
			t.Errorf("expected unknown binary operator to panic")
		}
	}()

	b.Node()
}

func TestObject_HasUniqueKeys(t *testing.T) {
	o := NewObject()

	var err error
	err = o.Set(NewKey("foo"), NewStringDouble("text"))
	if err != nil {
		t.Errorf("Set() returned unexpected error: %v", err)
	}

	err = o.Set(NewKey("foo"), NewStringDouble("text"))
	if err == nil {
		t.Errorf("Set() expected error and there as now")
	}
}

func TestObject_RetrieveKeys(t *testing.T) {
	o := NewObject()

	err := o.Set(NewKey("foo"), NewStringDouble("text"))
	require.NoError(t, err)

	err = o.Set(NewKey("bar"), NewStringDouble("text"))
	require.NoError(t, err)

	keys := o.Keys()

	expected := []Key{NewKey("foo"), NewKey("bar")}
	require.Equal(t, expected, keys)
}

func TestCallChain(t *testing.T) {
	cases := []struct {
		name     string
		noders   []Chainable
		expected ast.Node
	}{
		{
			name: "var",
			noders: []Chainable{
				NewVar("alpha"),
			},
			expected: NewVar("alpha").Node(),
		},
		{
			name: "indexed var",
			noders: []Chainable{
				NewVar("foo"),
				NewIndex("bar"),
			},
			expected: &ast.Index{
				Id:     newIdentifier("bar"),
				Target: NewVar("foo").Node(),
			},
		},
		{
			name: "apply with index with var",
			noders: []Chainable{
				NewVar("std"),
				NewApply(NewIndex("extVar"), []Noder{
					NewStringDouble("__ksonnet/params"),
				}, nil),
				NewIndex("components"),
				NewIndex("certificateCrd"),
			},
			expected: &ast.Index{
				Id: newIdentifier("certificateCrd"),
				Target: &ast.Index{
					Id: newIdentifier("components"),
					Target: &ast.Apply{
						Target: &ast.Index{
							Id:     newIdentifier("extVar"),
							Target: &ast.Var{Id: *newIdentifier("std")},
						},
						Arguments: ast.Arguments{
							Positional: ast.Nodes{
								NewStringDouble("__ksonnet/params").Node(),
							},
						},
					},
				},
			},
		},
		{
			name: "call with apply",
			noders: []Chainable{
				NewCall("a.b.c.d"),
				NewApply(NewIndex("fn"), []Noder{
					NewVar("arg"),
				}, nil),
			},
			expected: &ast.Apply{
				Target: &ast.Index{
					Id: newIdentifier("fn"),
					Target: &ast.Index{
						Id: newIdentifier("d"),
						Target: &ast.Index{
							Id: newIdentifier("c"),
							Target: &ast.Index{
								Id: newIdentifier("b"),
								Target: &ast.Var{
									Id: *newIdentifier("a"),
								},
							},
						},
					},
				},
				Arguments: ast.Arguments{
					Positional: ast.Nodes{
						NewVar("arg").Node(),
					},
				},
			},
		},
		{
			name: "var with call",
			noders: []Chainable{
				NewVar("a"),
				NewCall("b.c.d"),
			},
			expected: &ast.Index{
				Id: newIdentifier("d"),
				Target: &ast.Index{
					Id: newIdentifier("c"),
					Target: &ast.Index{
						Id: newIdentifier("b"),
						Target: &ast.Var{
							Id: *newIdentifier("a"),
						},
					},
				},
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			cc := NewCallChain(tc.noders...)

			var buf bytes.Buffer
			err := printer.Fprint(&buf, cc.Node())
			require.NoError(t, err)

			assert.Equal(t, tc.expected, cc.Node())
		})
	}
}

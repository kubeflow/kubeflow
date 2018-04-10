/*
Copyright 2016 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package jsonnet

import (
	"bytes"
	"encoding/hex"
	"fmt"
	"reflect"
	"unicode/utf8"

	"github.com/google/go-jsonnet/ast"
	"github.com/google/go-jsonnet/parser"
)

func makeStr(s string) *ast.LiteralString {
	return &ast.LiteralString{
		NodeBase:    ast.NodeBase{},
		Value:       s,
		Kind:        ast.StringDouble,
		BlockIndent: "",
	}
}

func stringUnescape(loc *ast.LocationRange, s string) (string, error) {
	var buf bytes.Buffer
	// read one rune at a time
	for i := 0; i < len(s); {
		r, w := utf8.DecodeRuneInString(s[i:])
		i += w
		switch r {
		case '\\':
			if i >= len(s) {
				return "", parser.MakeStaticError("Truncated escape sequence in string literal.", *loc)
			}
			r2, w := utf8.DecodeRuneInString(s[i:])
			i += w
			switch r2 {
			case '"':
				buf.WriteRune('"')
			case '\'':
				buf.WriteRune('\'')
			case '\\':
				buf.WriteRune('\\')
			case '/':
				buf.WriteRune('/') // See json.org, \/ is a valid escape.
			case 'b':
				buf.WriteRune('\b')
			case 'f':
				buf.WriteRune('\f')
			case 'n':
				buf.WriteRune('\n')
			case 'r':
				buf.WriteRune('\r')
			case 't':
				buf.WriteRune('\t')
			case 'u':
				if i+4 > len(s) {
					return "", parser.MakeStaticError("Truncated unicode escape sequence in string literal.", *loc)
				}
				codeBytes, err := hex.DecodeString(s[i : i+4])
				if err != nil {
					return "", parser.MakeStaticError(fmt.Sprintf("Unicode escape sequence was malformed: %s", s[0:4]), *loc)
				}
				code := int(codeBytes[0])*256 + int(codeBytes[1])
				buf.WriteRune(rune(code))
				i += 4
			default:
				return "", parser.MakeStaticError(fmt.Sprintf("Unknown escape sequence in string literal: \\%c", r2), *loc)
			}

		default:
			buf.WriteRune(r)
		}
	}
	return buf.String(), nil
}

func desugarFields(location ast.LocationRange, fields *ast.ObjectFields, objLevel int) error {
	// Simplify asserts
	for i := range *fields {
		field := &(*fields)[i]
		if field.Kind != ast.ObjectAssert {
			continue
		}
		msg := field.Expr3
		if msg == nil {
			msg = buildLiteralString("Object assertion failed.")
		}
		field.Expr3 = nil
		onFailure := &ast.Error{Expr: msg}
		assertion := &ast.Conditional{
			Cond:        field.Expr2,
			BranchTrue:  &ast.LiteralBoolean{Value: true}, // ignored anyway
			BranchFalse: onFailure,
		}
		field.Expr2 = assertion
	}

	for i := range *fields {
		field := &((*fields)[i])
		if field.Method == nil {
			continue
		}
		field.Expr2 = field.Method
		field.Method = nil
		// Body of the function already desugared through expr2
	}

	// Remove object-level locals
	newFields := []ast.ObjectField{}
	for _, field := range *fields {
		if field.Kind == ast.ObjectLocal {
			continue
		}
		var binds ast.LocalBinds
		for _, local := range *fields {
			if local.Kind != ast.ObjectLocal {
				continue
			}
			binds = append(binds, ast.LocalBind{Variable: *local.Id, Body: ast.Clone(local.Expr2)})
		}
		if len(binds) > 0 {
			field.Expr2 = &ast.Local{
				NodeBase: ast.NewNodeBaseLoc(*field.Expr2.Loc()),
				Binds:    binds,
				Body:     field.Expr2,
			}
		}
		newFields = append(newFields, field)
	}
	*fields = newFields

	// Change all to FIELD_EXPR
	for i := range *fields {
		field := &(*fields)[i]
		switch field.Kind {
		case ast.ObjectAssert:
		// Nothing to do.

		case ast.ObjectFieldID:
			field.Expr1 = makeStr(string(*field.Id))
			field.Kind = ast.ObjectFieldExpr

		case ast.ObjectFieldExpr:
		// Nothing to do.

		case ast.ObjectFieldStr:
			// Just set the flag.
			field.Kind = ast.ObjectFieldExpr

		case ast.ObjectLocal:
			return fmt.Errorf("INTERNAL ERROR: Locals should be removed by now")
		}
	}

	return nil
}

func simpleLambda(body ast.Node, paramName ast.Identifier) ast.Node {
	return &ast.Function{
		Body:       body,
		Parameters: ast.Parameters{Required: ast.Identifiers{paramName}},
	}
}

func buildAnd(left ast.Node, right ast.Node) ast.Node {
	return &ast.Binary{Op: ast.BopAnd, Left: left, Right: right}
}

func desugarForSpec(inside ast.Node, forSpec *ast.ForSpec) (ast.Node, error) {
	var body ast.Node
	if len(forSpec.Conditions) > 0 {
		cond := forSpec.Conditions[0].Expr
		for i := 1; i < len(forSpec.Conditions); i++ {
			cond = buildAnd(cond, forSpec.Conditions[i].Expr)
		}
		body = &ast.Conditional{
			Cond:        cond,
			BranchTrue:  inside,
			BranchFalse: &ast.Array{},
		}
	} else {
		body = inside
	}
	function := simpleLambda(body, forSpec.VarName)
	current := buildStdCall("flatMap", function, forSpec.Expr)
	if forSpec.Outer == nil {
		return current, nil
	}
	return desugarForSpec(current, forSpec.Outer)
}

func wrapInArray(inside ast.Node) ast.Node {
	return &ast.Array{Elements: ast.Nodes{inside}}
}

func desugarArrayComp(comp *ast.ArrayComp, objLevel int) (ast.Node, error) {
	return desugarForSpec(wrapInArray(comp.Body), &comp.Spec)
}

func desugarObjectComp(comp *ast.ObjectComp, objLevel int) (ast.Node, error) {

	if objLevel == 0 {
		dollar := ast.Identifier("$")
		comp.Fields = append(comp.Fields, ast.ObjectFieldLocalNoMethod(&dollar, &ast.Self{}))
	}

	err := desugarFields(*comp.Loc(), &comp.Fields, objLevel+1)
	if err != nil {
		return nil, err
	}

	if len(comp.Fields) != 1 {
		panic("Too many fields in object comprehension, it should have been caught during parsing")
	}

	arrComp := ast.ArrayComp{
		Body: buildDesugaredObject(comp.NodeBase, comp.Fields),
		Spec: comp.Spec,
	}

	desugaredArrayComp, err := desugarArrayComp(&arrComp, objLevel)
	if err != nil {
		return nil, err
	}

	desugaredComp := buildStdCall("$objectFlatMerge", desugaredArrayComp)
	return desugaredComp, nil
}

func buildLiteralString(value string) ast.Node {
	return &ast.LiteralString{
		Kind:  ast.StringDouble,
		Value: value,
	}
}

func buildSimpleIndex(obj ast.Node, member ast.Identifier) ast.Node {
	return &ast.Index{
		Target: obj,
		Id:     &member,
	}
}

func buildStdCall(builtinName ast.Identifier, args ...ast.Node) ast.Node {
	std := &ast.Var{Id: "std"}
	builtin := buildSimpleIndex(std, builtinName)
	return &ast.Apply{
		Target:    builtin,
		Arguments: ast.Arguments{Positional: args},
	}
}

func buildDesugaredObject(nodeBase ast.NodeBase, fields ast.ObjectFields) *ast.DesugaredObject {
	var newFields ast.DesugaredObjectFields
	var newAsserts ast.Nodes

	for _, field := range fields {
		if field.Kind == ast.ObjectAssert {
			newAsserts = append(newAsserts, field.Expr2)
		} else if field.Kind == ast.ObjectFieldExpr {
			newFields = append(newFields, ast.DesugaredObjectField{
				Hide:      field.Hide,
				Name:      field.Expr1,
				Body:      field.Expr2,
				PlusSuper: field.SuperSugar,
			})
		} else {
			panic(fmt.Sprintf("INTERNAL ERROR: field should have been desugared: %v", field.Kind))
		}
	}

	return &ast.DesugaredObject{
		NodeBase: nodeBase,
		Asserts:  newAsserts,
		Fields:   newFields,
	}
}

// Desugar Jsonnet expressions to reduce the number of constructs the rest of the implementation
// needs to understand.
//
// Note that despite the name, desugar() is not idempotent.  String literals have their escape
// codes translated to low-level characters during desugaring.
//
// Desugaring should happen immediately after parsing, i.e. before static analysis and execution.
// Temporary variables introduced here should be prefixed with $ to ensure they do not clash with
// variables used in user code.
// TODO(sbarzowski) Actually we may want to do some static analysis before desugaring, e.g.
// warning user about dangerous use of constructs that we desugar.
func desugar(astPtr *ast.Node, objLevel int) (err error) {
	node := *astPtr

	if node == nil {
		return
	}

	switch node := node.(type) {
	case *ast.Apply:
		desugar(&node.Target, objLevel)
		for i := range node.Arguments.Positional {
			err = desugar(&node.Arguments.Positional[i], objLevel)
			if err != nil {
				return
			}
		}
		for i := range node.Arguments.Named {
			err = desugar(&node.Arguments.Named[i].Arg, objLevel)
			if err != nil {
				return
			}
		}

	case *ast.ApplyBrace:
		err = desugar(&node.Left, objLevel)
		if err != nil {
			return
		}
		err = desugar(&node.Right, objLevel)
		if err != nil {
			return
		}
		*astPtr = &ast.Binary{
			NodeBase: node.NodeBase,
			Left:     node.Left,
			Op:       ast.BopPlus,
			Right:    node.Right,
		}

	case *ast.Array:
		for i := range node.Elements {
			err = desugar(&node.Elements[i], objLevel)
			if err != nil {
				return
			}
		}

	case *ast.ArrayComp:
		comp, err := desugarArrayComp(node, objLevel)
		if err != nil {
			return err
		}
		*astPtr = comp
		err = desugar(astPtr, objLevel)
		if err != nil {
			return err
		}

	case *ast.Assert:
		if node.Message == nil {
			node.Message = buildLiteralString("Assertion failed")
		}
		*astPtr = &ast.Conditional{
			Cond:        node.Cond,
			BranchTrue:  node.Rest,
			BranchFalse: &ast.Error{Expr: node.Message},
		}
		err = desugar(astPtr, objLevel)
		if err != nil {
			return err
		}

	case *ast.Binary:
		// some operators get replaced by stdlib functions
		if funcname, replaced := desugaredBop[node.Op]; replaced {
			if funcname == "notEquals" {
				// TODO(sbarzowski) maybe we can handle it in more regular way
				// but let's be consistent with the spec
				*astPtr = &ast.Unary{
					Op:   ast.UopNot,
					Expr: buildStdCall(desugaredBop[ast.BopManifestEqual], node.Left, node.Right),
				}
			} else if node.Op == ast.BopIn {
				// reversed order of arguments
				*astPtr = buildStdCall(funcname, node.Right, node.Left)
			} else {
				*astPtr = buildStdCall(funcname, node.Left, node.Right)
			}
			return desugar(astPtr, objLevel)
		}

		err = desugar(&node.Left, objLevel)
		if err != nil {
			return
		}
		err = desugar(&node.Right, objLevel)
		if err != nil {
			return
		}

	case *ast.Conditional:
		err = desugar(&node.Cond, objLevel)
		if err != nil {
			return
		}
		err = desugar(&node.BranchTrue, objLevel)
		if err != nil {
			return
		}
		if node.BranchFalse == nil {
			node.BranchFalse = &ast.LiteralNull{}
		}
		err = desugar(&node.BranchFalse, objLevel)
		if err != nil {
			return
		}

	case *ast.Dollar:
		if objLevel == 0 {
			return parser.MakeStaticError("No top-level object found.", *node.Loc())
		}
		*astPtr = &ast.Var{NodeBase: node.NodeBase, Id: ast.Identifier("$")}

	case *ast.Error:
		err = desugar(&node.Expr, objLevel)
		if err != nil {
			return
		}

	case *ast.Function:
		for i := range node.Parameters.Optional {
			param := &node.Parameters.Optional[i]
			err = desugar(&param.DefaultArg, objLevel)
			if err != nil {
				return
			}
		}
		err = desugar(&node.Body, objLevel)
		if err != nil {
			return
		}

	case *ast.Import:
		// desugar() is allowed to update the pointer to point to something else, but will never do
		// this for a LiteralString.  We cannot simply do &node.File because the type is
		// **ast.LiteralString which is not compatible with *ast.Node.
		var file ast.Node = node.File
		err = desugar(&file, objLevel)
		if err != nil {
			return
		}

	case *ast.ImportStr:
		// See comment in ast.Import.
		var file ast.Node = node.File
		err = desugar(&file, objLevel)
		if err != nil {
			return
		}

	case *ast.Index:
		err = desugar(&node.Target, objLevel)
		if err != nil {
			return
		}
		if node.Id != nil {
			if node.Index != nil {
				panic(fmt.Sprintf("Node with both Id and Index: %#+v", node))
			}
			node.Index = makeStr(string(*node.Id))
			node.Id = nil
		}
		err = desugar(&node.Index, objLevel)
		if err != nil {
			return
		}

	case *ast.Slice:
		if node.BeginIndex == nil {
			node.BeginIndex = &ast.LiteralNull{}
		}
		if node.EndIndex == nil {
			node.EndIndex = &ast.LiteralNull{}
		}
		if node.Step == nil {
			node.Step = &ast.LiteralNull{}
		}
		*astPtr = buildStdCall("slice", node.Target, node.BeginIndex, node.EndIndex, node.Step)
		err = desugar(astPtr, objLevel)
		if err != nil {
			return
		}

	case *ast.Local:
		for i := range node.Binds {
			if node.Binds[i].Fun != nil {
				node.Binds[i] = ast.LocalBind{
					Variable: node.Binds[i].Variable,
					Body:     node.Binds[i].Fun,
					Fun:      nil,
				}
			}
			err = desugar(&node.Binds[i].Body, objLevel)
			if err != nil {
				return
			}
		}
		err = desugar(&node.Body, objLevel)
		if err != nil {
			return
		}

	case *ast.LiteralBoolean:
		// Nothing to do.

	case *ast.LiteralNull:
		// Nothing to do.

	case *ast.LiteralNumber:
		// Nothing to do.

	case *ast.LiteralString:
		if node.Kind.FullyEscaped() {
			unescaped, err := stringUnescape(node.Loc(), node.Value)
			if err != nil {
				return err
			}
			node.Value = unescaped
		}
		node.Kind = ast.StringDouble
		node.BlockIndent = ""
	case *ast.Object:
		// Hidden variable to allow $ binding.
		if objLevel == 0 {
			dollar := ast.Identifier("$")
			node.Fields = append(node.Fields, ast.ObjectFieldLocalNoMethod(&dollar, &ast.Self{}))
		}

		err = desugarFields(*node.Loc(), &node.Fields, objLevel)
		if err != nil {
			return
		}

		*astPtr = buildDesugaredObject(node.NodeBase, node.Fields)
		err = desugar(astPtr, objLevel)
		if err != nil {
			return
		}

	case *ast.DesugaredObject:
		for i := range node.Fields {
			field := &((node.Fields)[i])
			if field.Name != nil {
				err := desugar(&field.Name, objLevel)
				if err != nil {
					return err
				}
			}
			err := desugar(&field.Body, objLevel+1)
			if err != nil {
				return err
			}
		}
		for i := range node.Asserts {
			assert := &((node.Asserts)[i])
			err := desugar(assert, objLevel+1)
			if err != nil {
				return err
			}
		}

	case *ast.ObjectComp:
		comp, err := desugarObjectComp(node, objLevel)
		if err != nil {
			return err
		}
		err = desugar(&comp, objLevel)
		if err != nil {
			return err
		}
		*astPtr = comp

	case *ast.Parens:
		*astPtr = node.Inner
		err = desugar(astPtr, objLevel)
		if err != nil {
			return err
		}

	case *ast.Self:
		// Nothing to do.

	case *ast.SuperIndex:
		if node.Id != nil {
			node.Index = &ast.LiteralString{Value: string(*node.Id)}
			node.Id = nil
		}

	case *ast.InSuper:
		err := desugar(&node.Index, objLevel)
		if err != nil {
			return err
		}
	case *ast.Unary:
		err = desugar(&node.Expr, objLevel)
		if err != nil {
			return
		}

	case *ast.Var:
		// Nothing to do.

	default:
		panic(fmt.Sprintf("Desugarer does not recognize ast: %s", reflect.TypeOf(node)))
	}

	return nil
}

func desugarFile(ast *ast.Node) error {
	err := desugar(ast, 0)
	if err != nil {
		return err
	}
	return nil
}

/*
Copyright 2018 Google Inc. All rights reserved.

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

package ast

import (
	"fmt"
	"reflect"
)

// Updates fields of specPtr to point to deep clones.
func cloneForSpec(specPtr *ForSpec) {
	clone(&specPtr.Expr)
	oldOuter := specPtr.Outer
	if oldOuter != nil {
		specPtr.Outer = new(ForSpec)
		*specPtr.Outer = *oldOuter
		cloneForSpec(specPtr.Outer)
	}
	for i := range specPtr.Conditions {
		clone(&specPtr.Conditions[i].Expr)
	}
}

// Updates fields of params to point to deep clones.
func cloneParameters(params *Parameters) {
	if params == nil {
		return
	}
	params.Optional = append(make([]NamedParameter, 0), params.Optional...)
	for i := range params.Optional {
		clone(&params.Optional[i].DefaultArg)
	}
}

// Updates fields of field to point to deep clones.
func cloneField(field *ObjectField) {
	if field.Method != nil {
		field.Method = Clone(field.Method).(*Function)
	}

	oldParams := field.Params
	if oldParams != nil {
		field.Params = new(Parameters)
		*field.Params = *oldParams
	}
	cloneParameters(field.Params)

	clone(&field.Expr1)
	clone(&field.Expr2)
	clone(&field.Expr3)
}

// Updates fields of field to point to deep clones.
func cloneDesugaredField(field *DesugaredObjectField) {
	clone(&field.Name)
	clone(&field.Body)
}

// Updates the NodeBase fields of astPtr to point to deep clones.
func cloneNodeBase(astPtr Node) {
	if astPtr.Context() != nil {
		newContext := new(string)
		*newContext = *astPtr.Context()
		astPtr.SetContext(newContext)
	}
	astPtr.SetFreeVariables(append(make(Identifiers, 0), astPtr.FreeVariables()...))
}

// Updates *astPtr to point to a deep clone of what it originally pointed at.
func clone(astPtr *Node) {
	node := *astPtr
	if node == nil {
		return
	}

	switch node := node.(type) {
	case *Apply:
		r := new(Apply)
		*astPtr = r
		*r = *node
		clone(&r.Target)
		r.Arguments.Positional = append(make(Nodes, 0), r.Arguments.Positional...)
		for i := range r.Arguments.Positional {
			clone(&r.Arguments.Positional[i])
		}
		r.Arguments.Named = append(make([]NamedArgument, 0), r.Arguments.Named...)
		for i := range r.Arguments.Named {
			clone(&r.Arguments.Named[i].Arg)
		}

	case *ApplyBrace:
		r := new(ApplyBrace)
		*astPtr = r
		*r = *node
		clone(&r.Left)
		clone(&r.Right)

	case *Array:
		r := new(Array)
		*astPtr = r
		*r = *node
		r.Elements = append(make(Nodes, 0), r.Elements...)
		for i := range r.Elements {
			clone(&r.Elements[i])
		}

	case *ArrayComp:
		r := new(ArrayComp)
		*astPtr = r
		*r = *node
		clone(&r.Body)
		cloneForSpec(&r.Spec)

	case *Assert:
		r := new(Assert)
		*astPtr = r
		*r = *node
		clone(&r.Cond)
		clone(&r.Message)
		clone(&r.Rest)

	case *Binary:
		r := new(Binary)
		*astPtr = r
		*r = *node
		clone(&r.Left)
		clone(&r.Right)

	case *Conditional:
		r := new(Conditional)
		*astPtr = r
		*r = *node
		clone(&r.Cond)
		clone(&r.BranchTrue)
		clone(&r.BranchFalse)

	case *Dollar:
		r := new(Dollar)
		*astPtr = r
		*r = *node

	case *Error:
		r := new(Error)
		*astPtr = r
		*r = *node
		clone(&r.Expr)

	case *Function:
		r := new(Function)
		*astPtr = r
		*r = *node
		cloneParameters(&r.Parameters)
		clone(&r.Body)

	case *Import:
		r := new(Import)
		*astPtr = r
		*r = *node
		r.File = new(LiteralString)
		*r.File = *node.File

	case *ImportStr:
		r := new(ImportStr)
		*astPtr = r
		*r = *node
		r.File = new(LiteralString)
		*r.File = *node.File

	case *Index:
		r := new(Index)
		*astPtr = r
		*r = *node
		clone(&r.Target)
		clone(&r.Index)

	case *Slice:
		r := new(Slice)
		*astPtr = r
		*r = *node
		clone(&r.Target)
		clone(&r.BeginIndex)
		clone(&r.EndIndex)
		clone(&r.Step)

	case *Local:
		r := new(Local)
		*astPtr = r
		*r = *node
		r.Binds = append(make(LocalBinds, 0), r.Binds...)
		for i := range r.Binds {
			if r.Binds[i].Fun != nil {
				r.Binds[i].Fun = Clone(r.Binds[i].Fun).(*Function)
			}
			clone(&r.Binds[i].Body)
		}
		clone(&r.Body)

	case *LiteralBoolean:
		r := new(LiteralBoolean)
		*astPtr = r
		*r = *node

	case *LiteralNull:
		r := new(LiteralNull)
		*astPtr = r
		*r = *node

	case *LiteralNumber:
		r := new(LiteralNumber)
		*astPtr = r
		*r = *node

	case *LiteralString:
		r := new(LiteralString)
		*astPtr = r
		*r = *node

	case *Object:
		r := new(Object)
		*astPtr = r
		*r = *node
		r.Fields = append(make(ObjectFields, 0), r.Fields...)
		for i := range r.Fields {
			cloneField(&r.Fields[i])
		}

	case *DesugaredObject:
		r := new(DesugaredObject)
		*astPtr = r
		*r = *node
		r.Fields = append(make(DesugaredObjectFields, 0), r.Fields...)
		for i := range r.Fields {
			cloneDesugaredField(&r.Fields[i])
		}

	case *ObjectComp:
		r := new(ObjectComp)
		*astPtr = r
		*r = *node
		r.Fields = append(make(ObjectFields, 0), r.Fields...)
		for i := range r.Fields {
			cloneField(&r.Fields[i])
		}
		cloneForSpec(&r.Spec)

	case *Parens:
		r := new(Parens)
		*astPtr = r
		*r = *node
		clone(&r.Inner)

	case *Self:
		r := new(Self)
		*astPtr = r
		*r = *node

	case *SuperIndex:
		r := new(SuperIndex)
		*astPtr = r
		*r = *node
		clone(&r.Index)

	case *InSuper:
		r := new(InSuper)
		*astPtr = r
		*r = *node
		clone(&r.Index)

	case *Unary:
		r := new(Unary)
		*astPtr = r
		*r = *node
		clone(&r.Expr)

	case *Var:
		r := new(Var)
		*astPtr = r
		*r = *node

	default:
		panic(fmt.Sprintf("ast.Clone() does not recognize ast: %s", reflect.TypeOf(node)))
	}

	cloneNodeBase(*astPtr)
}

func Clone(astPtr Node) Node {
	clone(&astPtr)
	return astPtr
}

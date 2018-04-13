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

// Package parser reads Jsonnet files and parses them into AST nodes.
package parser

import (
	"fmt"
	"strconv"

	"github.com/google/go-jsonnet/ast"
)

type precedence int

const (
	applyPrecedence precedence = 2  // ast.Function calls and indexing.
	unaryPrecedence precedence = 4  // Logical and bitwise negation, unary + -
	maxPrecedence   precedence = 16 // ast.Local, If, ast.Import, ast.Function, Error
)

var bopPrecedence = map[ast.BinaryOp]precedence{
	ast.BopMult:            5,
	ast.BopDiv:             5,
	ast.BopPercent:         5,
	ast.BopPlus:            6,
	ast.BopMinus:           6,
	ast.BopShiftL:          7,
	ast.BopShiftR:          7,
	ast.BopGreater:         8,
	ast.BopGreaterEq:       8,
	ast.BopLess:            8,
	ast.BopLessEq:          8,
	ast.BopIn:              8,
	ast.BopManifestEqual:   9,
	ast.BopManifestUnequal: 9,
	ast.BopBitwiseAnd:      10,
	ast.BopBitwiseXor:      11,
	ast.BopBitwiseOr:       12,
	ast.BopAnd:             13,
	ast.BopOr:              14,
}

// ---------------------------------------------------------------------------

func makeUnexpectedError(t *token, while string) error {
	return MakeStaticError(
		fmt.Sprintf("Unexpected: %v while %v", t, while), t.loc)
}

func locFromTokens(begin, end *token) ast.LocationRange {
	return ast.LocationRangeBetween(&begin.loc, &end.loc)
}

func locFromTokenAST(begin *token, end ast.Node) ast.LocationRange {
	return ast.LocationRangeBetween(&begin.loc, end.Loc())
}

// ---------------------------------------------------------------------------

type parser struct {
	t     Tokens
	currT int
}

func makeParser(t Tokens) *parser {
	return &parser{
		t: t,
	}
}

func (p *parser) pop() *token {
	t := &p.t[p.currT]
	p.currT++
	return t
}

func (p *parser) unexpectedTokenError(tk tokenKind, t *token) error {
	if tk == t.kind {
		panic("Unexpectedly expected token kind.")
	}
	return MakeStaticError(fmt.Sprintf("Expected token %v but got %v", tk, t), t.loc)
}

func (p *parser) popExpect(tk tokenKind) (*token, error) {
	t := p.pop()
	if t.kind != tk {
		return nil, p.unexpectedTokenError(tk, t)
	}
	return t, nil
}

func (p *parser) popExpectOp(op string) (*token, error) {
	t := p.pop()
	if t.kind != tokenOperator || t.data != op {
		return nil, MakeStaticError(
			fmt.Sprintf("Expected operator %v but got %v", op, t), t.loc)
	}
	return t, nil
}

func (p *parser) peek() *token {
	return &p.t[p.currT]
}

func (p *parser) doublePeek() *token {
	return &p.t[p.currT+1]
}

// in some cases it's convenient to parse something as an expression, and later
// decide that it should be just an identifer
func astVarToIdentifier(node ast.Node) (*ast.Identifier, bool) {
	v, ok := node.(*ast.Var)
	if ok {
		return &v.Id, true
	}
	return nil, false
}

func (p *parser) parseArgument() (*ast.Identifier, ast.Node, error) {
	var id *ast.Identifier
	if p.peek().kind == tokenIdentifier && p.doublePeek().kind == tokenOperator && p.doublePeek().data == "=" {
		ident := p.pop()
		var tmpID = ast.Identifier(ident.data)
		id = &tmpID
		p.pop() // "=" token
	}
	expr, err := p.parse(maxPrecedence)
	if err != nil {
		return nil, nil, err
	}
	return id, expr, nil
}

// TODO(sbarzowski) - this returned bool is weird
// TODO(sbarzowski) - name - it's also used for parameters
func (p *parser) parseArguments(elementKind string) (*token, *ast.Arguments, bool, error) {
	args := &ast.Arguments{}
	gotComma := false
	namedArgumentAdded := false
	first := true
	for {
		next := p.peek()

		if next.kind == tokenParenR {
			// gotComma can be true or false here.
			return p.pop(), args, gotComma, nil
		}

		if !first && !gotComma {
			return nil, nil, false, MakeStaticError(fmt.Sprintf("Expected a comma before next %s, got %s.", elementKind, next), next.loc)
		}

		id, expr, err := p.parseArgument()
		if err != nil {
			return nil, nil, false, err
		}
		if id == nil {
			if namedArgumentAdded {
				return nil, nil, false, MakeStaticError("Positional argument after a named argument is not allowed", next.loc)
			}
			args.Positional = append(args.Positional, expr)
		} else {
			namedArgumentAdded = true
			args.Named = append(args.Named, ast.NamedArgument{Name: *id, Arg: expr})
		}

		if p.peek().kind == tokenComma {
			p.pop()
			gotComma = true
		} else {
			gotComma = false
		}

		first = false
	}
}

// TODO(sbarzowski) - this returned bool is weird
func (p *parser) parseParameters(elementKind string) (*ast.Parameters, bool, error) {
	_, args, trailingComma, err := p.parseArguments(elementKind)
	if err != nil {
		return nil, false, err
	}
	var params ast.Parameters
	for _, arg := range args.Positional {
		id, ok := astVarToIdentifier(arg)
		if !ok {
			return nil, false, MakeStaticError(fmt.Sprintf("Expected simple identifier but got a complex expression."), *arg.Loc())
		}
		params.Required = append(params.Required, *id)
	}
	for _, arg := range args.Named {
		params.Optional = append(params.Optional, ast.NamedParameter{Name: arg.Name, DefaultArg: arg.Arg})
	}
	return &params, trailingComma, nil
}

// TODO(sbarzowski) add location to all individual binds
func (p *parser) parseBind(binds *ast.LocalBinds) error {
	varID, err := p.popExpect(tokenIdentifier)
	if err != nil {
		return err
	}
	for _, b := range *binds {
		if b.Variable == ast.Identifier(varID.data) {
			return MakeStaticError(fmt.Sprintf("Duplicate local var: %v", varID.data), varID.loc)
		}
	}

	var fun *ast.Function
	if p.peek().kind == tokenParenL {
		p.pop()
		params, gotComma, err := p.parseParameters("function parameter")
		if err != nil {
			return err
		}
		fun = &ast.Function{
			Parameters:    *params,
			TrailingComma: gotComma,
		}
	}

	_, err = p.popExpectOp("=")
	if err != nil {
		return err
	}
	body, err := p.parse(maxPrecedence)
	if err != nil {
		return err
	}

	if fun != nil {
		fun.NodeBase = ast.NewNodeBaseLoc(locFromTokenAST(varID, body))
		fun.Body = body
		*binds = append(*binds, ast.LocalBind{
			Variable: ast.Identifier(varID.data),
			Body:     body,
			Fun:      fun,
		})
	} else {
		*binds = append(*binds, ast.LocalBind{
			Variable: ast.Identifier(varID.data),
			Body:     body,
		})
	}

	return nil
}

func (p *parser) parseObjectAssignmentOp() (plusSugar bool, hide ast.ObjectFieldHide, err error) {
	op, err := p.popExpect(tokenOperator)
	if err != nil {
		return
	}
	opStr := op.data
	if opStr[0] == '+' {
		plusSugar = true
		opStr = opStr[1:]
	}

	numColons := 0
	for len(opStr) > 0 {
		if opStr[0] != ':' {
			err = MakeStaticError(
				fmt.Sprintf("Expected one of :, ::, :::, +:, +::, +:::, got: %v", op.data), op.loc)
			return
		}
		opStr = opStr[1:]
		numColons++
	}

	switch numColons {
	case 1:
		hide = ast.ObjectFieldInherit
	case 2:
		hide = ast.ObjectFieldHidden
	case 3:
		hide = ast.ObjectFieldVisible
	default:
		err = MakeStaticError(
			fmt.Sprintf("Expected one of :, ::, :::, +:, +::, +:::, got: %v", op.data), op.loc)
		return
	}

	return
}

// A LiteralField is a field of an object or object comprehension.
// +gen set
type LiteralField string

// Parse object or object comprehension without leading brace
func (p *parser) parseObjectRemainder(tok *token) (ast.Node, *token, error) {
	var fields ast.ObjectFields
	literalFields := make(LiteralFieldSet)
	binds := make(ast.IdentifierSet)

	gotComma := false
	first := true

	for {
		next := p.pop()
		if !gotComma && !first {
			if next.kind == tokenComma {
				next = p.pop()
				gotComma = true
			}
		}

		if next.kind == tokenBraceR {
			return &ast.Object{
				NodeBase:      ast.NewNodeBaseLoc(locFromTokens(tok, next)),
				Fields:        fields,
				TrailingComma: gotComma,
			}, next, nil
		}

		if next.kind == tokenFor {
			// It's a comprehension
			numFields := 0
			numAsserts := 0
			var field ast.ObjectField
			for _, f := range fields {
				if f.Kind == ast.ObjectLocal {
					continue
				}
				if f.Kind == ast.ObjectAssert {
					numAsserts++
					continue
				}
				numFields++
				field = f
			}

			if numAsserts > 0 {
				return nil, nil, MakeStaticError("Object comprehension cannot have asserts.", next.loc)
			}
			if numFields != 1 {
				return nil, nil, MakeStaticError("Object comprehension can only have one field.", next.loc)
			}
			if field.Hide != ast.ObjectFieldInherit {
				return nil, nil, MakeStaticError("Object comprehensions cannot have hidden fields.", next.loc)
			}
			if field.Kind != ast.ObjectFieldExpr {
				return nil, nil, MakeStaticError("Object comprehensions can only have [e] fields.", next.loc)
			}
			spec, last, err := p.parseComprehensionSpecs(tokenBraceR)
			if err != nil {
				return nil, nil, err
			}
			return &ast.ObjectComp{
				NodeBase:      ast.NewNodeBaseLoc(locFromTokens(tok, last)),
				Fields:        fields,
				TrailingComma: gotComma,
				Spec:          *spec,
			}, last, nil
		}

		if !gotComma && !first {
			return nil, nil, MakeStaticError("Expected a comma before next field.", next.loc)
		}
		first = false

		switch next.kind {
		case tokenBracketL, tokenIdentifier, tokenStringDouble, tokenStringSingle,
			tokenStringBlock, tokenVerbatimStringDouble, tokenVerbatimStringSingle:
			var kind ast.ObjectFieldKind
			var expr1 ast.Node
			var id *ast.Identifier
			switch next.kind {
			case tokenIdentifier:
				kind = ast.ObjectFieldID
				id = (*ast.Identifier)(&next.data)
			case tokenStringDouble, tokenStringSingle,
				tokenStringBlock, tokenVerbatimStringDouble, tokenVerbatimStringSingle:
				kind = ast.ObjectFieldStr
				expr1 = tokenStringToAst(next)
			default:
				kind = ast.ObjectFieldExpr
				var err error
				expr1, err = p.parse(maxPrecedence)
				if err != nil {
					return nil, nil, err
				}
				_, err = p.popExpect(tokenBracketR)
				if err != nil {
					return nil, nil, err
				}
			}

			isMethod := false
			methComma := false
			var params *ast.Parameters
			if p.peek().kind == tokenParenL {
				p.pop()
				var err error
				params, methComma, err = p.parseParameters("method parameter")
				if err != nil {
					return nil, nil, err
				}
				isMethod = true
			}

			plusSugar, hide, err := p.parseObjectAssignmentOp()
			if err != nil {
				return nil, nil, err
			}

			if plusSugar && isMethod {
				return nil, nil, MakeStaticError(
					fmt.Sprintf("Cannot use +: syntax sugar in a method: %v", next.data), next.loc)
			}

			if kind != ast.ObjectFieldExpr {
				if !literalFields.Add(LiteralField(next.data)) {
					return nil, nil, MakeStaticError(
						fmt.Sprintf("Duplicate field: %v", next.data), next.loc)
				}
			}

			body, err := p.parse(maxPrecedence)
			if err != nil {
				return nil, nil, err
			}

			var method *ast.Function
			if isMethod {
				method = &ast.Function{
					Parameters:    *params,
					TrailingComma: methComma,
					Body:          body,
				}
			}

			fields = append(fields, ast.ObjectField{
				Kind:          kind,
				Hide:          hide,
				SuperSugar:    plusSugar,
				MethodSugar:   isMethod,
				Method:        method,
				Expr1:         expr1,
				Id:            id,
				Params:        params,
				TrailingComma: methComma,
				Expr2:         body,
			})

		case tokenLocal:
			varID, err := p.popExpect(tokenIdentifier)
			if err != nil {
				return nil, nil, err
			}

			id := ast.Identifier(varID.data)

			if binds.Contains(id) {
				return nil, nil, MakeStaticError(fmt.Sprintf("Duplicate local var: %v", id), varID.loc)
			}

			// TODO(sbarzowski) Can we reuse regular local bind parsing here?

			isMethod := false
			funcComma := false
			var params *ast.Parameters
			if p.peek().kind == tokenParenL {
				p.pop()
				isMethod = true
				params, funcComma, err = p.parseParameters("function parameter")
				if err != nil {
					return nil, nil, err
				}
			}
			_, err = p.popExpectOp("=")
			if err != nil {
				return nil, nil, err
			}

			body, err := p.parse(maxPrecedence)
			if err != nil {
				return nil, nil, err
			}

			var method *ast.Function
			if isMethod {
				method = &ast.Function{
					Parameters:    *params,
					TrailingComma: funcComma,
					Body:          body,
				}
			}

			binds.Add(id)

			fields = append(fields, ast.ObjectField{
				Kind:          ast.ObjectLocal,
				Hide:          ast.ObjectFieldVisible,
				SuperSugar:    false,
				MethodSugar:   isMethod,
				Method:        method,
				Id:            &id,
				Params:        params,
				TrailingComma: funcComma,
				Expr2:         body,
			})

		case tokenAssert:
			cond, err := p.parse(maxPrecedence)
			if err != nil {
				return nil, nil, err
			}
			var msg ast.Node
			if p.peek().kind == tokenOperator && p.peek().data == ":" {
				p.pop()
				msg, err = p.parse(maxPrecedence)
				if err != nil {
					return nil, nil, err
				}
			}

			fields = append(fields, ast.ObjectField{
				Kind:  ast.ObjectAssert,
				Hide:  ast.ObjectFieldVisible,
				Expr2: cond,
				Expr3: msg,
			})
		default:
			return nil, nil, makeUnexpectedError(next, "parsing field definition")
		}
		gotComma = false
	}
}

/* parses for x in expr for y in expr if expr for z in expr ... */
func (p *parser) parseComprehensionSpecs(end tokenKind) (*ast.ForSpec, *token, error) {
	var parseComprehensionSpecsHelper func(outer *ast.ForSpec) (*ast.ForSpec, *token, error)
	parseComprehensionSpecsHelper = func(outer *ast.ForSpec) (*ast.ForSpec, *token, error) {
		var ifSpecs []ast.IfSpec

		varID, err := p.popExpect(tokenIdentifier)
		if err != nil {
			return nil, nil, err
		}
		id := ast.Identifier(varID.data)
		_, err = p.popExpect(tokenIn)
		if err != nil {
			return nil, nil, err
		}
		arr, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, nil, err
		}
		forSpec := &ast.ForSpec{
			VarName: id,
			Expr:    arr,
			Outer:   outer,
		}

		maybeIf := p.pop()
		for ; maybeIf.kind == tokenIf; maybeIf = p.pop() {
			cond, err := p.parse(maxPrecedence)
			if err != nil {
				return nil, nil, err
			}
			ifSpecs = append(ifSpecs, ast.IfSpec{
				Expr: cond,
			})
		}
		forSpec.Conditions = ifSpecs
		if maybeIf.kind == end {
			return forSpec, maybeIf, nil
		}

		if maybeIf.kind != tokenFor {
			return nil, nil, MakeStaticError(
				fmt.Sprintf("Expected for, if or %v after for clause, got: %v", end, maybeIf), maybeIf.loc)
		}

		return parseComprehensionSpecsHelper(forSpec)
	}
	return parseComprehensionSpecsHelper(nil)
}

// Assumes that the leading '[' has already been consumed and passed as tok.
// Should read up to and consume the trailing ']'
func (p *parser) parseArray(tok *token) (ast.Node, error) {
	next := p.peek()
	if next.kind == tokenBracketR {
		p.pop()
		return &ast.Array{
			NodeBase: ast.NewNodeBaseLoc(locFromTokens(tok, next)),
		}, nil
	}

	first, err := p.parse(maxPrecedence)
	if err != nil {
		return nil, err
	}
	var gotComma bool
	next = p.peek()
	if next.kind == tokenComma {
		p.pop()
		next = p.peek()
		gotComma = true
	}

	if next.kind == tokenFor {
		// It's a comprehension
		p.pop()
		spec, last, err := p.parseComprehensionSpecs(tokenBracketR)
		if err != nil {
			return nil, err
		}
		return &ast.ArrayComp{
			NodeBase:      ast.NewNodeBaseLoc(locFromTokens(tok, last)),
			Body:          first,
			TrailingComma: gotComma,
			Spec:          *spec,
		}, nil
	}
	// Not a comprehension: It can have more elements.
	elements := ast.Nodes{first}

	for {
		if next.kind == tokenBracketR {
			// TODO(dcunnin): SYNTAX SUGAR HERE (preserve comma)
			p.pop()
			break
		}
		if !gotComma {
			return nil, MakeStaticError("Expected a comma before next array element.", next.loc)
		}
		nextElem, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		elements = append(elements, nextElem)
		next = p.peek()
		if next.kind == tokenComma {
			p.pop()
			next = p.peek()
			gotComma = true
		} else {
			gotComma = false
		}
	}

	return &ast.Array{
		NodeBase:      ast.NewNodeBaseLoc(locFromTokens(tok, next)),
		Elements:      elements,
		TrailingComma: gotComma,
	}, nil
}

func tokenStringToAst(tok *token) *ast.LiteralString {
	switch tok.kind {
	case tokenStringSingle:
		return &ast.LiteralString{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    tok.data,
			Kind:     ast.StringSingle,
		}
	case tokenStringDouble:
		return &ast.LiteralString{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    tok.data,
			Kind:     ast.StringDouble,
		}
	case tokenStringBlock:
		return &ast.LiteralString{
			NodeBase:    ast.NewNodeBaseLoc(tok.loc),
			Value:       tok.data,
			Kind:        ast.StringBlock,
			BlockIndent: tok.stringBlockIndent,
		}
	case tokenVerbatimStringDouble:
		return &ast.LiteralString{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    tok.data,
			Kind:     ast.VerbatimStringDouble,
		}
	case tokenVerbatimStringSingle:
		return &ast.LiteralString{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    tok.data,
			Kind:     ast.VerbatimStringSingle,
		}
	default:
		panic(fmt.Sprintf("Not a string token %#+v", tok))
	}
}

func (p *parser) parseTerminal() (ast.Node, error) {
	tok := p.pop()
	switch tok.kind {
	case tokenAssert, tokenBraceR, tokenBracketR, tokenComma, tokenDot, tokenElse,
		tokenError, tokenFor, tokenFunction, tokenIf, tokenIn, tokenImport, tokenImportStr,
		tokenLocal, tokenOperator, tokenParenR, tokenSemicolon, tokenTailStrict, tokenThen:
		return nil, makeUnexpectedError(tok, "parsing terminal")

	case tokenEndOfFile:
		return nil, MakeStaticError("Unexpected end of file.", tok.loc)

	case tokenBraceL:
		obj, _, err := p.parseObjectRemainder(tok)
		return obj, err

	case tokenBracketL:
		return p.parseArray(tok)

	case tokenParenL:
		inner, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		tokRight, err := p.popExpect(tokenParenR)
		if err != nil {
			return nil, err
		}
		return &ast.Parens{
			NodeBase: ast.NewNodeBaseLoc(locFromTokens(tok, tokRight)),
			Inner:    inner,
		}, nil

	// Literals
	case tokenNumber:
		// This shouldn't fail as the lexer should make sure we have good input but
		// we handle the error regardless.
		num, err := strconv.ParseFloat(tok.data, 64)
		if err != nil {
			return nil, MakeStaticError("Could not parse floating point number.", tok.loc)
		}
		return &ast.LiteralNumber{
			NodeBase:       ast.NewNodeBaseLoc(tok.loc),
			Value:          num,
			OriginalString: tok.data,
		}, nil
	case tokenStringDouble, tokenStringSingle,
		tokenStringBlock, tokenVerbatimStringDouble, tokenVerbatimStringSingle:
		return tokenStringToAst(tok), nil
	case tokenFalse:
		return &ast.LiteralBoolean{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    false,
		}, nil
	case tokenTrue:
		return &ast.LiteralBoolean{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Value:    true,
		}, nil
	case tokenNullLit:
		return &ast.LiteralNull{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
		}, nil

	// Variables
	case tokenDollar:
		return &ast.Dollar{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
		}, nil
	case tokenIdentifier:
		return &ast.Var{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Id:       ast.Identifier(tok.data),
		}, nil
	case tokenSelf:
		return &ast.Self{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
		}, nil
	case tokenSuper:
		next := p.pop()
		var index ast.Node
		var id *ast.Identifier
		switch next.kind {
		case tokenDot:
			fieldID, err := p.popExpect(tokenIdentifier)
			if err != nil {
				return nil, err
			}
			id = (*ast.Identifier)(&fieldID.data)
		case tokenBracketL:
			var err error
			index, err = p.parse(maxPrecedence)
			if err != nil {
				return nil, err
			}
			_, err = p.popExpect(tokenBracketR)
			if err != nil {
				return nil, err
			}
		default:
			return nil, MakeStaticError("Expected . or [ after super.", tok.loc)
		}
		return &ast.SuperIndex{
			NodeBase: ast.NewNodeBaseLoc(tok.loc),
			Index:    index,
			Id:       id,
		}, nil
	}

	return nil, MakeStaticError(fmt.Sprintf("INTERNAL ERROR: Unknown tok kind: %v", tok.kind), tok.loc)
}

func (p *parser) parsingFailure(msg string, tok *token) (ast.Node, error) {
	return nil, MakeStaticError(msg, tok.loc)
}

func (p *parser) parse(prec precedence) (ast.Node, error) {
	begin := p.peek()

	switch begin.kind {
	// These cases have effectively maxPrecedence as the first
	// call to parse will parse them.
	case tokenAssert:
		p.pop()
		cond, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		var msg ast.Node
		if p.peek().kind == tokenOperator && p.peek().data == ":" {
			p.pop()
			msg, err = p.parse(maxPrecedence)
			if err != nil {
				return nil, err
			}
		}
		_, err = p.popExpect(tokenSemicolon)
		if err != nil {
			return nil, err
		}
		rest, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		return &ast.Assert{
			NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, rest)),
			Cond:     cond,
			Message:  msg,
			Rest:     rest,
		}, nil

	case tokenError:
		p.pop()
		expr, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		return &ast.Error{
			NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, expr)),
			Expr:     expr,
		}, nil

	case tokenIf:
		p.pop()
		cond, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		_, err = p.popExpect(tokenThen)
		if err != nil {
			return nil, err
		}
		branchTrue, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		var branchFalse ast.Node
		lr := locFromTokenAST(begin, branchTrue)
		if p.peek().kind == tokenElse {
			p.pop()
			branchFalse, err = p.parse(maxPrecedence)
			if err != nil {
				return nil, err
			}
			lr = locFromTokenAST(begin, branchFalse)
		}
		return &ast.Conditional{
			NodeBase:    ast.NewNodeBaseLoc(lr),
			Cond:        cond,
			BranchTrue:  branchTrue,
			BranchFalse: branchFalse,
		}, nil

	case tokenFunction:
		p.pop()
		next := p.pop()
		if next.kind == tokenParenL {
			params, gotComma, err := p.parseParameters("function parameter")
			if err != nil {
				return nil, err
			}
			body, err := p.parse(maxPrecedence)
			if err != nil {
				return nil, err
			}
			return &ast.Function{
				NodeBase:      ast.NewNodeBaseLoc(locFromTokenAST(begin, body)),
				Parameters:    *params,
				TrailingComma: gotComma,
				Body:          body,
			}, nil
		}
		return nil, MakeStaticError(fmt.Sprintf("Expected ( but got %v", next), next.loc)

	case tokenImport:
		p.pop()
		body, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		if lit, ok := body.(*ast.LiteralString); ok {
			if lit.Kind == ast.StringBlock {
				return nil, MakeStaticError("Block string literals not allowed in imports", *body.Loc())
			}
			return &ast.Import{
				NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, body)),
				File:     lit,
			}, nil
		}
		return nil, MakeStaticError("Computed imports are not allowed", *body.Loc())

	case tokenImportStr:
		p.pop()
		body, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		if lit, ok := body.(*ast.LiteralString); ok {
			if lit.Kind == ast.StringBlock {
				return nil, MakeStaticError("Block string literals not allowed in imports", *body.Loc())
			}
			return &ast.ImportStr{
				NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, body)),
				File:     lit,
			}, nil
		}
		return nil, MakeStaticError("Computed imports are not allowed", *body.Loc())

	case tokenLocal:
		p.pop()
		var binds ast.LocalBinds
		for {
			err := p.parseBind(&binds)
			if err != nil {
				return nil, err
			}
			delim := p.pop()
			if delim.kind != tokenSemicolon && delim.kind != tokenComma {
				return nil, MakeStaticError(fmt.Sprintf("Expected , or ; but got %v", delim), delim.loc)
			}
			if delim.kind == tokenSemicolon {
				break
			}
		}
		body, err := p.parse(maxPrecedence)
		if err != nil {
			return nil, err
		}
		return &ast.Local{
			NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, body)),
			Binds:    binds,
			Body:     body,
		}, nil

	default:
		// ast.Unary operator
		if begin.kind == tokenOperator {
			uop, ok := ast.UopMap[begin.data]
			if !ok {
				return nil, MakeStaticError(fmt.Sprintf("Not a unary operator: %v", begin.data), begin.loc)
			}
			if prec == unaryPrecedence {
				op := p.pop()
				expr, err := p.parse(prec)
				if err != nil {
					return nil, err
				}
				return &ast.Unary{
					NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(op, expr)),
					Op:       uop,
					Expr:     expr,
				}, nil
			}
		}

		// Base case
		if prec == 0 {
			return p.parseTerminal()
		}

		lhs, err := p.parse(prec - 1)
		if err != nil {
			return nil, err
		}

		for {
			// Then next token must be a binary operator.

			var bop ast.BinaryOp

			// Check precedence is correct for this level.  If we're parsing operators
			// with higher precedence, then return lhs and let lower levels deal with
			// the operator.
			switch p.peek().kind {
			case tokenIn:
				bop = ast.BopIn
				if bopPrecedence[bop] != prec {
					return lhs, nil
				}
			case tokenOperator:
				_ = "breakpoint"
				if p.peek().data == ":" {
					// Special case for the colons in assert. Since COLON is no-longer a
					// special token, we have to make sure it does not trip the
					// op_is_binary test below.  It should terminate parsing of the
					// expression here, returning control to the parsing of the actual
					// assert AST.
					return lhs, nil
				}
				if p.peek().data == "::" {
					// Special case for [e::]
					// We need to stop parsing e when we see the :: and
					// avoid tripping the op_is_binary test below.
					return lhs, nil
				}
				var ok bool
				bop, ok = ast.BopMap[p.peek().data]
				if !ok {
					return nil, MakeStaticError(fmt.Sprintf("Not a binary operator: %v", p.peek().data), p.peek().loc)
				}

				if bopPrecedence[bop] != prec {
					return lhs, nil
				}

			case tokenDot, tokenBracketL, tokenParenL, tokenBraceL:
				if applyPrecedence != prec {
					return lhs, nil
				}
			default:
				return lhs, nil
			}

			op := p.pop()
			switch op.kind {
			case tokenBracketL:
				// handle slice
				var indexes [3]ast.Node
				colonsConsumed := 0

				var end *token
				readyForNextIndex := true
				for colonsConsumed < 3 {
					if p.peek().kind == tokenBracketR {
						end = p.pop()
						break
					} else if p.peek().data == ":" {
						colonsConsumed++
						end = p.pop()
						readyForNextIndex = true
					} else if p.peek().data == "::" {
						colonsConsumed += 2
						end = p.pop()
						readyForNextIndex = true
					} else if readyForNextIndex {
						indexes[colonsConsumed], err = p.parse(maxPrecedence)
						if err != nil {
							return nil, err
						}
						readyForNextIndex = false
					} else {
						return nil, p.unexpectedTokenError(tokenBracketR, p.peek())
					}
				}
				if colonsConsumed > 2 {
					// example: target[42:42:42:42]
					return p.parsingFailure("Invalid slice: too many colons", end)
				}
				if colonsConsumed == 0 && readyForNextIndex {
					// example: target[]
					return p.parsingFailure("ast.Index requires an expression", end)
				}
				isSlice := colonsConsumed > 0

				if isSlice {
					lhs = &ast.Slice{
						NodeBase:   ast.NewNodeBaseLoc(locFromTokens(begin, end)),
						Target:     lhs,
						BeginIndex: indexes[0],
						EndIndex:   indexes[1],
						Step:       indexes[2],
					}
				} else {
					lhs = &ast.Index{
						NodeBase: ast.NewNodeBaseLoc(locFromTokens(begin, end)),
						Target:   lhs,
						Index:    indexes[0],
					}
				}
			case tokenDot:
				fieldID, err := p.popExpect(tokenIdentifier)
				if err != nil {
					return nil, err
				}
				id := ast.Identifier(fieldID.data)
				lhs = &ast.Index{
					NodeBase: ast.NewNodeBaseLoc(locFromTokens(begin, fieldID)),
					Target:   lhs,
					Id:       &id,
				}
			case tokenParenL:
				end, args, gotComma, err := p.parseArguments("function argument")
				if err != nil {
					return nil, err
				}
				tailStrict := false
				if p.peek().kind == tokenTailStrict {
					p.pop()
					tailStrict = true
				}
				lhs = &ast.Apply{
					NodeBase:      ast.NewNodeBaseLoc(locFromTokens(begin, end)),
					Target:        lhs,
					Arguments:     *args,
					TrailingComma: gotComma,
					TailStrict:    tailStrict,
				}
			case tokenBraceL:
				obj, end, err := p.parseObjectRemainder(op)
				if err != nil {
					return nil, err
				}
				lhs = &ast.ApplyBrace{
					NodeBase: ast.NewNodeBaseLoc(locFromTokens(begin, end)),
					Left:     lhs,
					Right:    obj,
				}
			default:
				if op.kind == tokenIn && p.peek().kind == tokenSuper {
					super := p.pop()
					lhs = &ast.InSuper{
						NodeBase: ast.NewNodeBaseLoc(locFromTokens(begin, super)),
						Index:    lhs,
					}
				} else {
					rhs, err := p.parse(prec - 1)
					if err != nil {
						return nil, err
					}
					lhs = &ast.Binary{
						NodeBase: ast.NewNodeBaseLoc(locFromTokenAST(begin, rhs)),
						Left:     lhs,
						Op:       bop,
						Right:    rhs,
					}
				}
			}
		}
	}
}

// ---------------------------------------------------------------------------

// Parse parses a slice of tokens into a parse tree.
func Parse(t Tokens) (ast.Node, error) {
	p := makeParser(t)
	expr, err := p.parse(maxPrecedence)
	if err != nil {
		return nil, err
	}

	if p.peek().kind != tokenEndOfFile {
		return nil, MakeStaticError(fmt.Sprintf("Did not expect: %v", p.peek()), p.peek().loc)
	}

	addContext(expr, &topLevelContext, anonymous)

	return expr, nil
}

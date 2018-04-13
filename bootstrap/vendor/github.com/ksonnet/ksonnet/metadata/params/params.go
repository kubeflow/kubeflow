// Copyright 2017 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package params

import (
	"bytes"
	"fmt"
	"runtime/debug"
	"sort"
	"strconv"
	"strings"

	str "github.com/ksonnet/ksonnet/strings"
	"github.com/pkg/errors"

	"github.com/google/go-jsonnet/ast"
	"github.com/google/go-jsonnet/parser"
)

const (
	componentsID = "components"
)

func componentsObj(component, snippet string) (*ast.Object, error) {
	tokens, err := parser.Lex(component, snippet)
	if err != nil {
		return nil, errors.Wrap(err, "lex node")
	}

	root, err := parser.Parse(tokens)
	if err != nil {
		return nil, errors.Wrap(err, "parse node")
	}

	return findComponentsObj(root)
}

func findComponentsObj(node ast.Node) (*ast.Object, error) {
	switch n := node.(type) {
	case *ast.Local:
		return findComponentsObj(n.Body)
	case *ast.Binary:
		return findComponentsObj(n.Right)
	case *ast.Object:
		for _, f := range n.Fields {
			if *f.Id == componentsID {
				c, isObj := f.Expr2.(*ast.Object)
				if !isObj {
					debug.PrintStack()
					return nil, errors.Errorf("expected components node type to be object, it was a a %T", f.Expr2)
				}
				return c, nil
			}
		}
		return nil, fmt.Errorf("Invalid params schema -- there must be a top-level object '%s'", componentsID)
	case *ast.ApplyBrace:
		return findComponentsObj(n.Right)
	}
	return nil, fmt.Errorf("Invalid params schema -- did not expect node type: %T", node)
}

func getFieldID(field ast.ObjectField) (string, error) {
	switch field.Kind {
	case ast.ObjectFieldStr:
		// case "foo-bar": {...}
		c, _ := field.Expr1.(*ast.LiteralString)
		switch c.Kind {
		case ast.StringSingle, ast.StringDouble:
			return c.Value, nil
		default:
			return "", fmt.Errorf("Found unsupported LiteralString type %T", c)
		}
	case ast.ObjectFieldID:
		// case foo: {...}
		return string(*field.Id), nil
	}
	return "", fmt.Errorf("Found unsupported ObjectField.Kind, type %T", field)
}

func hasComponent(component string, field ast.ObjectField) (bool, error) {
	id, err := getFieldID(field)
	return id == component, err
}

func visitParams(component ast.Node) (Params, *ast.LocationRange, error) {
	params := make(Params)
	var loc *ast.LocationRange

	n, isObj := component.(*ast.Object)
	if !isObj {
		return nil, nil, fmt.Errorf("Expected component node type to be object")
	}

	loc = n.Loc()
	for _, field := range n.Fields {
		key, err := getFieldID(field)
		if err != nil {
			return nil, nil, err
		}
		val, err := visitParamValue(field.Expr2)
		if err != nil {
			return nil, nil, err
		}
		params[key] = val
	}

	return params, loc, nil
}

func visitAllParams(components ast.Object) (map[string]Params, error) {
	params := make(map[string]Params)

	for _, f := range components.Fields {
		p, _, err := visitParams(f.Expr2)
		if err != nil {
			return nil, err
		}
		id, err := getFieldID(f)
		if err != nil {
			return nil, err
		}
		params[id] = p
	}

	return params, nil
}

// visitParamValue returns a string representation of the param value, quoted
// where necessary. Currently only handles trivial types, ex: string, int, bool
func visitParamValue(param ast.Node) (string, error) {
	switch n := param.(type) {
	case *ast.LiteralNumber:
		return strconv.FormatFloat(n.Value, 'f', -1, 64), nil
	case *ast.LiteralBoolean:
		return strconv.FormatBool(n.Value), nil
	case *ast.LiteralString:
		switch n.Kind {
		case ast.StringSingle, ast.StringDouble:
			return fmt.Sprintf(`"%s"`, n.Value), nil
		case ast.StringBlock:
			return fmt.Sprintf("|||\n%s|||", n.Value), nil
		default:
			return "", fmt.Errorf("Found unsupported LiteralString type %T", n)
		}
	default:
		return "", fmt.Errorf("Found an unsupported param AST node type: %T", n)
	}
}

func writeParams(indent int, params Params) string {
	// keys maintains an alphabetically sorted list of the param keys
	keys := make([]string, 0, len(params))
	for key := range params {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	var indentBuffer bytes.Buffer
	for i := 0; i < indent; i++ {
		indentBuffer.WriteByte(' ')
	}

	var buffer bytes.Buffer
	buffer.WriteString("\n")
	for i, key := range keys {
		param := params[key]
		key := str.QuoteNonASCII(key)

		if strings.HasPrefix(param, "|||\n") {
			// every line in a block string needs to be indented
			lines := strings.Split(param, "\n")
			buffer.WriteString(fmt.Sprintf("%s%s: %s\n", indentBuffer.String(), key, lines[0]))
			for i := 1; i < len(lines)-1; i++ {
				buffer.WriteString(fmt.Sprintf("  %s%s\n", indentBuffer.String(), lines[i]))
			}
			buffer.WriteString(fmt.Sprintf("%s|||,", indentBuffer.String()))
		} else {
			// other param types
			buffer.WriteString(fmt.Sprintf("%s%s: %s,", indentBuffer.String(), key, param))
		}
		if i < len(keys)-1 {
			buffer.WriteString("\n")
		}
	}
	buffer.WriteString("\n")
	return buffer.String()
}

func deleteComponent(component, snippet string) (string, error) {
	componentsNode, err := componentsObj(component, snippet)
	if err != nil {
		return "", errors.Wrap(err, "retrieve component node")
	}

	for _, field := range componentsNode.Fields {
		hasComponent, err := hasComponent(component, field)
		if err != nil {
			return "", err
		}
		if hasComponent {
			lines := strings.Split(snippet, "\n")

			removeLineBegin := field.Expr2.Loc().Begin.Line - 1
			removeLineEnd := field.Expr2.Loc().End.Line

			lines = append(lines[:removeLineBegin], lines[removeLineEnd:]...)

			return strings.Join(lines, "\n"), nil
		}
	}

	// No component references, just return the original snippet.
	return snippet, nil
}

// ---------------------------------------------------------------------------
// Component Parameter-specific functionality

func appendComponent(component, snippet string, params Params) (string, error) {
	componentsNode, err := componentsObj(component, snippet)
	if err != nil {
		return "", err
	}

	// Ensure that the component we are trying to create params for does not already exist.
	for _, field := range componentsNode.Fields {
		hasComponent, err := hasComponent(component, field)
		if err != nil {
			return "", err
		}
		if hasComponent {
			return "", fmt.Errorf("Component parameters for '%s' already exists", component)
		}
	}

	lines := strings.Split(snippet, "\n")

	// Create the jsonnet resembling the component params
	var buffer bytes.Buffer
	buffer.WriteString("    " + str.QuoteNonASCII(component) + ": {")
	buffer.WriteString(writeParams(6, params))
	buffer.WriteString("    },")

	// Insert the new component to the end of the list of components
	insertLine := (*componentsNode).Loc().End.Line - 1
	lines = append(lines, "")
	copy(lines[insertLine+1:], lines[insertLine:])
	lines[insertLine] = buffer.String()

	return strings.Join(lines, "\n"), nil
}

func getComponentParams(component, snippet string) (Params, *ast.LocationRange, error) {
	componentsNode, err := componentsObj(component, snippet)
	if err != nil {
		return nil, nil, err
	}

	for _, field := range componentsNode.Fields {
		hasComponent, err := hasComponent(component, field)
		if err != nil {
			return nil, nil, err
		}
		if hasComponent {
			return visitParams(field.Expr2)
		}
	}

	return nil, nil, fmt.Errorf("Could not find component identifier '%s'", component)
}

func getAllComponentParams(snippet string) (map[string]Params, error) {
	componentsNode, err := componentsObj("", snippet)
	if err != nil {
		return nil, err
	}

	return visitAllParams(*componentsNode)
}

func setComponentParams(component, snippet string, params Params) (string, error) {
	currentParams, loc, err := getComponentParams(component, snippet)
	if err != nil {
		return "", err
	}

	for k, v := range currentParams {
		if _, ok := params[k]; !ok {
			params[k] = v
		}
	}

	// Replace the component param fields
	lines := strings.Split(snippet, "\n")
	paramsSnippet := writeParams(6, params)
	newSnippet := strings.Join(lines[:loc.Begin.Line], "\n") + paramsSnippet + strings.Join(lines[loc.End.Line-1:], "\n")

	return newSnippet, nil
}

// ---------------------------------------------------------------------------
// Environment Parameter-specific functionality

func getEnvironmentParams(component, snippet string) (Params, *ast.LocationRange, bool, error) {
	n, err := componentsObj(component, snippet)
	if err != nil {
		return nil, nil, false, err
	}

	for _, f := range n.Fields {
		hasComponent, err := hasComponent(component, f)
		if err != nil {
			return nil, nil, false, err
		}
		if hasComponent {
			params, loc, err := visitParams(f.Expr2)
			return params, loc, true, err
		}
	}
	// If this point has been reached, it's because we don't have the
	// component in the list of params, return the location after the
	// last field of the components obj
	loc := ast.LocationRange{
		Begin: ast.Location{Line: n.Loc().End.Line - 1, Column: n.Loc().End.Column},
		End:   ast.Location{Line: n.Loc().End.Line, Column: n.Loc().End.Column},
	}

	return make(Params), &loc, false, nil
}

func getAllEnvironmentParams(snippet string) (map[string]Params, error) {
	componentsNode, err := componentsObj("", snippet)
	if err != nil {
		return nil, err
	}

	return visitAllParams(*componentsNode)
}

func setEnvironmentParams(component, snippet string, params Params) (string, error) {
	currentParams, loc, hasComponent, err := getEnvironmentParams(component, snippet)
	if err != nil {
		return "", err
	}

	for k, v := range currentParams {
		if _, ok := params[k]; !ok {
			params[k] = v
		}
	}

	// Replace the component param fields
	var paramsSnippet string
	lines := strings.Split(snippet, "\n")
	if !hasComponent {
		var buffer bytes.Buffer
		buffer.WriteString(fmt.Sprintf("\n    %s +: {", str.QuoteNonASCII(component)))
		buffer.WriteString(writeParams(6, params))
		buffer.WriteString("    },\n")
		paramsSnippet = buffer.String()
	} else {
		paramsSnippet = writeParams(6, params)
	}
	newSnippet := strings.Join(lines[:loc.Begin.Line], "\n") + paramsSnippet + strings.Join(lines[loc.End.Line-1:], "\n")

	return newSnippet, nil
}

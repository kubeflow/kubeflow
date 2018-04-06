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

package jsonnet

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/google/go-jsonnet/ast"
	"github.com/google/go-jsonnet/parser"
	"github.com/pkg/errors"
)

const (
	paramPrefix            = "param://"
	paramReplacementPrefix = "params."

	envPrefix            = "env://"
	envReplacementPrefix = "env."
)

// Parse rewrites the imports in a Jsonnet file before returning the snippet.
func Parse(fn string, jsonnet string) (string, error) {
	s, err := parse(fn, jsonnet)
	if err != nil {
		return "", err
	}

	return s, nil
}

func parse(fn string, jsonnet string) (string, error) {
	tokens, err := parser.Lex(fn, jsonnet)
	if err != nil {
		return "", err
	}

	root, err := parser.Parse(tokens)
	if err != nil {
		return "", err
	}

	var imports []ast.Import

	// Gather all parameter or environment imports
	err = visit(root, &imports)
	if err != nil {
		return "", err
	}

	// Replace all parameter or environment imports
	return replace(jsonnet, imports)
}

// ---------------------------------------------------------------------------

func visit(node ast.Node, imports *[]ast.Import) error {
	switch n := node.(type) {
	case *ast.Import:
		// Add parameter/environment type imports to the list of replacements.
		if strings.HasPrefix(n.File.Value, paramPrefix) {
			param := strings.TrimPrefix(n.File.Value, paramPrefix)
			if len(param) < 1 {
				return fmt.Errorf("There must be a parameter following import %s", paramPrefix)
			}
			*imports = append(*imports, *n)
		} else if strings.HasPrefix(n.File.Value, envPrefix) {
			env := strings.TrimPrefix(n.File.Value, envPrefix)
			if len(env) < 1 {
				return fmt.Errorf("There must be a attribute following import %s", envPrefix)
			}
			*imports = append(*imports, *n)
		}
	case *ast.Apply:
		for _, arg := range n.Arguments.Positional {
			err := visit(arg, imports)
			if err != nil {
				return err
			}
		}

		for _, arg := range n.Arguments.Named {
			err := visit(arg.Arg, imports)
			if err != nil {
				return err
			}
		}
		return visit(n.Target, imports)
	case *ast.ApplyBrace:
		err := visit(n.Left, imports)
		if err != nil {
			return err
		}
		return visit(n.Right, imports)
	case *ast.Array:
		for _, element := range n.Elements {
			err := visit(element, imports)
			if err != nil {
				return err
			}
		}
	case *ast.ArrayComp:
		err := visitCompSpec(n.Spec, imports)
		if err != nil {
			return err
		}
		return visit(n.Body, imports)
	case *ast.Assert:
		err := visit(n.Cond, imports)
		if err != nil {
			return err
		}
		err = visit(n.Message, imports)
		if err != nil {
			return err
		}
		return visit(n.Rest, imports)
	case *ast.Binary:
		err := visit(n.Left, imports)
		if err != nil {
			return err
		}
		return visit(n.Right, imports)
	case *ast.Conditional:
		err := visit(n.BranchFalse, imports)
		if err != nil {
			return err
		}
		err = visit(n.BranchTrue, imports)
		if err != nil {
			return err
		}
		return visit(n.Cond, imports)
	case *ast.Error:
		return visit(n.Expr, imports)
	case *ast.Function:
		for _, p := range n.Parameters.Optional {
			err := visit(p.DefaultArg, imports)
			if err != nil {
				return err
			}
		}

		return visit(n.Body, imports)
	case *ast.Index:
		err := visit(n.Target, imports)
		if err != nil {
			return err
		}
		return visit(n.Index, imports)
	case *ast.Slice:
		err := visit(n.Target, imports)
		if err != nil {
			return err
		}
		err = visit(n.BeginIndex, imports)
		if err != nil {
			return err
		}
		err = visit(n.EndIndex, imports)
		if err != nil {
			return err
		}
		return visit(n.Step, imports)
	case *ast.Local:
		for _, bind := range n.Binds {
			err := visitLocalBind(bind, imports)
			if err != nil {
				return err
			}
		}
		return visit(n.Body, imports)
	case *ast.Object:
		for _, field := range n.Fields {
			err := visitObjectField(field, imports)
			if err != nil {
				return err
			}
		}
	case *ast.DesugaredObject:
		for _, assert := range n.Asserts {
			err := visit(assert, imports)
			if err != nil {
				return err
			}
		}
		for _, field := range n.Fields {
			err := visitDesugaredObjectField(field, imports)
			if err != nil {
				return err
			}
		}
	case *ast.Parens:
		return visit(n.Inner, imports)
	case *ast.ObjectComp:
		for _, field := range n.Fields {
			err := visitObjectField(field, imports)
			if err != nil {
				return err
			}
		}
		err := visitCompSpec(n.Spec, imports)
		if err != nil {
			return err
		}
	case *ast.SuperIndex:
		return visit(n.Index, imports)
	case *ast.InSuper:
		return visit(n.Index, imports)
	case *ast.Unary:
		return visit(n.Expr, imports)
	// The below nodes do not have any child nodes, but visit them anyway to
	// have the capability to error out on unsupported nodes that may later
	// be added to go-jsonnet.
	case *ast.ImportStr:
	case *ast.Dollar:
	case *ast.LiteralBoolean:
	case *ast.LiteralNull:
	case *ast.LiteralNumber:
	case *ast.LiteralString:
	case *ast.Self:
	case *ast.Var:
	case nil:
		return nil
	default:
		return errors.Errorf("Unsupported ast.Node type found: %T", n)
	}

	return nil
}

func visitCompSpec(node ast.ForSpec, imports *[]ast.Import) error {
	if node.Outer != nil {
		err := visitCompSpec(*node.Outer, imports)
		if err != nil {
			return err
		}
	}

	for _, ifspec := range node.Conditions {
		err := visit(ifspec.Expr, imports)
		if err != nil {
			return err
		}
	}
	return visit(node.Expr, imports)
}

func visitObjectField(node ast.ObjectField, imports *[]ast.Import) error {
	if node.Method != nil {
		err := visit(node.Method, imports)
		if err != nil {
			return err
		}
	}

	if node.Params != nil {
		for _, p := range node.Params.Optional {
			err := visit(p.DefaultArg, imports)
			if err != nil {
				return err
			}
		}
	}

	err := visit(node.Expr1, imports)
	if err != nil {
		return err
	}
	err = visit(node.Expr2, imports)
	if err != nil {
		return err
	}
	return visit(node.Expr3, imports)
}

func visitDesugaredObjectField(node ast.DesugaredObjectField, imports *[]ast.Import) error {
	err := visit(node.Name, imports)
	if err != nil {
		return err
	}
	return visit(node.Body, imports)
}

func visitLocalBind(node ast.LocalBind, imports *[]ast.Import) error {
	if node.Fun != nil {
		err := visit(node.Fun, imports)
		if err != nil {
			return err
		}
	}
	return visit(node.Body, imports)
}

var (
	reParam = regexp.MustCompile(`(?s)import\s+(\/\/.*?)?'param:\/\/(\w+)'`)
	reEnv   = regexp.MustCompile(`(?s)import\s+(\/\/.*?)?'env:\/\/(\w+)'`)
)

// replace converts all parameters in the passed Jsonnet of form
//
//   1. `import 'param://port'` into `params.port`.
//   2. `import 'env://namespace'` into `env.namespace`.
func replace(jsonnet string, imports []ast.Import) (string, error) {
	out := reParam.ReplaceAllString(jsonnet, "params.$2")
	out = reEnv.ReplaceAllString(out, "env.$2")
	return out, nil
}

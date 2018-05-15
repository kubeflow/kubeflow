// Package linter analyses Jsonnet code for code "smells".
package linter

import (
	"io"

	"github.com/google/go-jsonnet/ast"
	"github.com/google/go-jsonnet/parser"
)

// ErrorWriter encapsulates a writer and an error state indicating when at least
// one error has been written to the writer.
type ErrorWriter struct {
	ErrorsFound bool
	Writer      io.Writer
}

func (e *ErrorWriter) writeError(err parser.StaticError) {
	e.ErrorsFound = true
	e.Writer.Write([]byte(err.Error() + "\n"))
}

type variable struct {
	name     ast.Identifier
	declNode ast.Node
	uses     []ast.Node
	param    bool // TODO enum
}

// LintingInfo holds additional information about the program
// which was gathered during linting. The data should only be added to it.
// It is global, i.e. it holds the same data regardless of scope we're
// currently analyzing.
type LintingInfo struct {
	variables []variable
}

// Lint analyses a node and reports any issues it encounters to an error writer.
func Lint(node ast.Node, e *ErrorWriter) {
	lintingInfo := LintingInfo{
		variables: nil,
	}
	std := variable{
		name:     "std",
		declNode: nil,
		uses:     nil,
		param:    false,
	}
	findVariables(node, &lintingInfo, vScope{"std": &std})
	for _, v := range lintingInfo.variables {
		if len(v.uses) == 0 && !v.param {
			e.writeError(parser.MakeStaticError("Unused variable: "+string(v.name), *v.declNode.Loc()))
		}
	}
}

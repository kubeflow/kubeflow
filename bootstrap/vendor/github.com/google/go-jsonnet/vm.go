/*
Copyright 2017 Google Inc. All rights reserved.

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
	"errors"
	"fmt"
	"runtime/debug"

	"github.com/google/go-jsonnet/ast"
	"github.com/google/go-jsonnet/parser"
)

// Note: There are no garbage collection params because we're using the native
// Go garbage collector.

// VM is the core interpreter and is the touchpoint used to parse and execute
// Jsonnet.
type VM struct {
	MaxStack       int
	ext            vmExtMap
	tla            vmExtMap
	nativeFuncs    map[string]*NativeFunction
	importer       Importer
	ErrorFormatter ErrorFormatter
	StringOutput   bool
}

// External variable or top level argument provided before execution
type vmExt struct {
	// jsonnet code to evaluate or string to pass
	value string
	// isCode determines whether it should be evaluated as jsonnet code or
	// treated as string.
	isCode bool
}

type vmExtMap map[string]vmExt

// MakeVM creates a new VM with default parameters.
func MakeVM() *VM {
	return &VM{
		MaxStack:       500,
		ext:            make(vmExtMap),
		tla:            make(vmExtMap),
		nativeFuncs:    make(map[string]*NativeFunction),
		ErrorFormatter: &termErrorFormatter{pretty: false, maxStackTraceSize: 20},
		importer:       &FileImporter{},
	}
}

// ExtVar binds a Jsonnet external var to the given value.
func (vm *VM) ExtVar(key string, val string) {
	vm.ext[key] = vmExt{value: val, isCode: false}
}

// ExtCode binds a Jsonnet external code var to the given code.
func (vm *VM) ExtCode(key string, val string) {
	vm.ext[key] = vmExt{value: val, isCode: true}
}

// TLAVar binds a Jsonnet top level argument to the given value.
func (vm *VM) TLAVar(key string, val string) {
	vm.tla[key] = vmExt{value: val, isCode: false}
}

// TLACode binds a Jsonnet top level argument to the given code.
func (vm *VM) TLACode(key string, val string) {
	vm.tla[key] = vmExt{value: val, isCode: true}
}

// Importer sets Importer to use during evaluation (import callback).
func (vm *VM) Importer(i Importer) {
	vm.importer = i
}

type evalKind int

const (
	evalKindRegular = iota
	evalKindMulti   = iota
	evalKindStream  = iota
)

func (vm *VM) evaluateSnippet(filename string, snippet string, kind evalKind) (output interface{}, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("(CRASH) %v\n%s", r, debug.Stack())
		}
	}()
	node, err := snippetToAST(filename, snippet)
	if err != nil {
		return "", err
	}
	switch kind {
	case evalKindRegular:
		output, err = evaluate(node, vm.ext, vm.tla, vm.nativeFuncs, vm.MaxStack, vm.importer, vm.StringOutput)
	case evalKindMulti:
		output, err = evaluateMulti(node, vm.ext, vm.tla, vm.nativeFuncs, vm.MaxStack, vm.importer, vm.StringOutput)
	case evalKindStream:
		output, err = evaluateStream(node, vm.ext, vm.tla, vm.nativeFuncs, vm.MaxStack, vm.importer)
	}
	if err != nil {
		return "", err
	}
	return output, nil
}

// NativeFunction registers a native function.
func (vm *VM) NativeFunction(f *NativeFunction) {
	vm.nativeFuncs[f.Name] = f
}

// EvaluateSnippet evaluates a string containing Jsonnet code, return a JSON
// string.
//
// The filename parameter is only used for error messages.
func (vm *VM) EvaluateSnippet(filename string, snippet string) (json string, formattedErr error) {
	output, err := vm.evaluateSnippet(filename, snippet, evalKindRegular)
	if err != nil {
		return "", errors.New(vm.ErrorFormatter.Format(err))
	}
	json = output.(string)
	return
}

// EvaluateSnippetStream evaluates a string containing Jsonnet code to an array.
// The array is returned as an array of JSON strings.
//
// The filename parameter is only used for error messages.
func (vm *VM) EvaluateSnippetStream(filename string, snippet string) (docs []string, formattedErr error) {
	output, err := vm.evaluateSnippet(filename, snippet, evalKindStream)
	if err != nil {
		return nil, errors.New(vm.ErrorFormatter.Format(err))
	}
	docs = output.([]string)
	return
}

// EvaluateSnippetMulti evaluates a string containing Jsonnet code to key-value
// pairs. The keys are field name strings and the values are JSON strings.
//
// The filename parameter is only used for error messages.
func (vm *VM) EvaluateSnippetMulti(filename string, snippet string) (files map[string]string, formattedErr error) {
	output, err := vm.evaluateSnippet(filename, snippet, evalKindMulti)
	if err != nil {
		return nil, errors.New(vm.ErrorFormatter.Format(err))
	}
	files = output.(map[string]string)
	return
}

func snippetToAST(filename string, snippet string) (ast.Node, error) {
	tokens, err := parser.Lex(filename, snippet)
	if err != nil {
		return nil, err
	}
	node, err := parser.Parse(tokens)
	if err != nil {
		return nil, err
	}
	err = desugarFile(&node)
	if err != nil {
		return nil, err
	}
	err = analyze(node)
	if err != nil {
		return nil, err
	}
	return node, nil
}

// SnippetToAST parses a snippet and returns the resulting AST.
func SnippetToAST(filename string, snippet string) (ast.Node, error) {
	return snippetToAST(filename, snippet)
}

// Version returns the Jsonnet version number.
func Version() string {
	return "v0.10.0"
}

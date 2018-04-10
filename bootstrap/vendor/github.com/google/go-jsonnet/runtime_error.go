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

import "github.com/google/go-jsonnet/ast"

// RuntimeError is an error discovered during evaluation of the program
type RuntimeError struct {
	StackTrace []TraceFrame
	Msg        string
}

func makeRuntimeError(msg string, stackTrace []TraceFrame) RuntimeError {
	return RuntimeError{
		Msg:        msg,
		StackTrace: stackTrace,
	}
}

func (err RuntimeError) Error() string {
	return "RUNTIME ERROR: " + err.Msg
}

// The stack

// TraceFrame is tracing information about a single frame of the call stack.
// TODO(sbarzowski) the difference from TraceElement. Do we even need this?
type TraceFrame struct {
	Loc  ast.LocationRange
	Name string
}

func traceElementToTraceFrame(trace *TraceElement) TraceFrame {
	tf := TraceFrame{Loc: *trace.loc}
	if trace.context != nil {
		// TODO(sbarzowski) maybe it should never be nil
		tf.Name = *trace.context
	} else {
		tf.Name = ""
	}
	return tf
}

// TraceElement represents tracing information, including a location range and a
// surrounding context.
// TODO(sbarzowski) better name
type TraceElement struct {
	loc     *ast.LocationRange
	context ast.Context
}

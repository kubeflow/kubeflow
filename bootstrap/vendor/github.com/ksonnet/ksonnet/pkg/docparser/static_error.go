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

package docparser

import (
	"fmt"

	"github.com/google/go-jsonnet/ast"
)

//////////////////////////////////////////////////////////////////////////////
// StaticError

// StaticError represents an error during parsing/lexing or static analysis.
// TODO(sbarzowski) Make it possible to have multiple static errors and warnings
type StaticError struct {
	Loc ast.LocationRange
	Msg string
}

func MakeStaticErrorMsg(msg string) StaticError {
	return StaticError{Msg: msg}
}

func MakeStaticError(msg string, lr ast.LocationRange) StaticError {
	return StaticError{Msg: msg, Loc: lr}
}

func (err StaticError) Error() string {
	loc := ""
	if err.Loc.IsSet() {
		loc = err.Loc.String()
	}
	return fmt.Sprintf("%v %v", loc, err.Msg)
}

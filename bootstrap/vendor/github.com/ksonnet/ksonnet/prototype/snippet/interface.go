// Copyright 2018 The kubecfg authors
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

// Package snippet provides primitives for parsing and evaluating TextMate
// snippets. In general, snippets are text with "placeholders" for the user to
// fill in. For example something like "foo ${bar}" would expect the user to
// provide a value for the `bar` variable.
//
// This code is influenced heavily by the more formal treatment specified by the
// Language Server Protocol, though (since this does not have to serve an
// interactive prompt in an IDE) we do omit some features for simplification
// (e.g., we have limited support for tabstops and builtin variables like
// `TM_SELECTED_TEXT`).
//
// A parsed snippet template is represented as a tree consisting of one of
// several types:
//
//   * Text: representing free text, i.e., text that is not a part of (e.g.) a
//     variable.
//   * Variable: Takes the forms `${varName}` and `${varName:defaultValue}`.
//     When a variable isn't set, an empty string is inserted. If the variable
//     is undefined, its name is inserted as the default value.
//   * Tabstop (currently unused by our tool, but implemented anyway): takes the
//     form of the '$' character followed by a number, e.g., `$1` or `$2`.
//     Inside an editor, a tabstop represents where to navigate when the user
//     presses tab or shift-tab.
//   * Placeholder (currently unused by our tool, but implemented anyway):
//     representing a tabstop with a default value. These are usually of the
//     form `${3:someDefaultValue}`. They can also be nested, as in
//     `${1:firstValue${2:secondValue}`, or recursive, as in `${1:foo$1}`.
//
// TextMate does not specify a grammar for this templating language. This parser
// implements the following grammar for, which we believe is close enough to the
// intention of TextMate. The characters `$`, `}`, and `\` can be escaped with
// `\`, but for simplicity we omit them from the grammar.
//
//   any         ::= tabstop | placeholder | choice | variable | text
//   tabstop     ::= '$' int | '${' int '}'
//   placeholder ::= '${' int ':' any '}'
//   choice      ::= '${' int '|' text (',' text)* '|}'
//   variable    ::= '$' var | '${' var }' | '${' var ':' any '}'
//   var         ::= [_a-zA-Z] [_a-zA-Z0-9]*
//   int         ::= [0-9]+
//   text        ::= .*
package snippet

// Parse takes a TextMate snippet and parses it, producing a `Template`. There
// is no opportunity for a parse error, since the grammar specifies that
// malformed placeholders are simply text.
//
// The grammar of the parse is formalized in part by the Language Server
// Protocol, and detailed in the package comments.
func Parse(template string) Template {
	return parse(template, false)
}

// Template represents a parsed TextMate snippet. The template can be evaluated
// (with respect to some set of variables) using `Evaluate`.
type Template interface {
	Evaluate(values map[string]string) (string, error)
}

/*
Copyright 2015 Google Inc. All rights reserved.

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

#ifndef JSONNET_PARSER_H
#define JSONNET_PARSER_H

#include <string>

#include "ast.h"
#include "lexer.h"
#include "unicode.h"

/** Parse a given JSON++ string.
 *
 * \param alloc Used to allocate the AST nodes.  The Allocator must outlive the
 * AST pointer returned.
 * \param tokens The list of tokens (all tokens are popped except EOF).
 * \returns The parsed abstract syntax tree.
 */
AST *jsonnet_parse(Allocator *alloc, Tokens &tokens);

/** Outputs a number, trying to preserve precision as well as possible.
 */
std::string jsonnet_unparse_number(double v);

/** The inverse of jsonnet_parse.
 */
std::string jsonnet_unparse_jsonnet(const AST *ast, const Fodder &final_fodder, unsigned indent,
                                    bool pad_arrays, bool pad_objects, char comment_style);

#endif  // JSONNET_PARSER_H

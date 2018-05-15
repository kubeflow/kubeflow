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

#ifndef JSONNET_DESUGARING_H
#define JSONNET_DESUGARING_H

#include <map>
#include <string>

#include "ast.h"
#include "vm.h"

/** Translate the AST to remove syntax sugar.
 * \param alloc Allocator for making new identifiers / ASTs.
 * \param ast The AST to change.
 * \param tla the top level arguments.  If null then do not try to process
 * top-level functions.
 */
void jsonnet_desugar(Allocator *alloc, AST *&ast, std::map<std::string, VmExt> *tla);

#endif

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

#ifndef JSONNET_STATIC_ANALYSIS_H
#define JSONNET_STATIC_ANALYSIS_H

#include "ast.h"

/** Check the ast for appropriate use of self, super, and correctly bound variables.  Also
 * initialize the freeVariables member of function and object ASTs.
 */
void jsonnet_static_analysis(AST *ast);

#endif

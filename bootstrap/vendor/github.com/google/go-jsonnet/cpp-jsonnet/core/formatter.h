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

#ifndef JSONNET_FORMATTER_H
#define JSONNET_FORMATTER_H

#include "ast.h"

struct FmtOpts {
    char stringStyle;
    char commentStyle;
    unsigned indent;
    unsigned maxBlankLines;
    bool padArrays;
    bool padObjects;
    bool stripComments;
    bool stripAllButComments;
    bool stripEverything;
    bool prettyFieldNames;
    bool sortImports;
    FmtOpts(void)
        : stringStyle('s'),
          commentStyle('s'),
          indent(2),
          maxBlankLines(2),
          padArrays(false),
          padObjects(true),
          stripComments(false),
          stripAllButComments(false),
          stripEverything(false),
          prettyFieldNames(true),
          sortImports(true)
    {
    }
};

/** The inverse of jsonnet_parse.
 */
std::string jsonnet_fmt(AST *ast, Fodder &final_fodder, const FmtOpts &opts);

#endif  // JSONNET_PARSER_H

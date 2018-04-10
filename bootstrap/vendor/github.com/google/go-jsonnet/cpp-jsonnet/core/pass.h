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

#ifndef JSONNET_PASS_H
#define JSONNET_PASS_H

#include "ast.h"

/** A generic Pass that does nothing but can be extended to easily define real passes.
 */
class CompilerPass {
   public:
   protected:
    Allocator &alloc;

   public:
    CompilerPass(Allocator &alloc) : alloc(alloc) {}

    virtual void fodderElement(FodderElement &) {}

    virtual void fodder(Fodder &fodder);

    virtual void specs(std::vector<ComprehensionSpec> &specs);

    virtual void params(Fodder &fodder_l, ArgParams &params, Fodder &fodder_r);

    virtual void fieldParams(ObjectField &field);

    virtual void fields(ObjectFields &fields);

    virtual void expr(AST *&ast_);

    virtual void visit(Apply *ast);

    virtual void visit(ApplyBrace *ast);

    virtual void visit(Array *ast);

    virtual void visit(ArrayComprehension *ast);

    virtual void visit(Assert *ast);

    virtual void visit(Binary *ast);

    virtual void visit(BuiltinFunction *) {}

    virtual void visit(Conditional *ast);

    virtual void visit(Dollar *) {}

    virtual void visit(Error *ast);

    virtual void visit(Function *ast);

    virtual void visit(Import *ast);

    virtual void visit(Importstr *ast);

    virtual void visit(InSuper *ast);

    virtual void visit(Index *ast);

    virtual void visit(Local *ast);

    virtual void visit(LiteralBoolean *) {}

    virtual void visit(LiteralNumber *) {}

    virtual void visit(LiteralString *) {}

    virtual void visit(LiteralNull *) {}

    virtual void visit(Object *ast);

    virtual void visit(DesugaredObject *ast);

    virtual void visit(ObjectComprehension *ast);

    virtual void visit(ObjectComprehensionSimple *ast);

    virtual void visit(Parens *ast);

    virtual void visit(Self *) {}

    virtual void visit(SuperIndex *ast);

    virtual void visit(Unary *ast);

    virtual void visit(Var *) {}

    virtual void visitExpr(AST *&ast_);

    virtual void file(AST *&body, Fodder &final_fodder);
};

/** Return an equivalent AST that can be modified without affecting the original.
 *
 * This is a deep copy.
 */
AST *clone_ast(Allocator &alloc, AST *ast);

#endif

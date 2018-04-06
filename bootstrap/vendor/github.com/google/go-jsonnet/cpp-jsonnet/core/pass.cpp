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

#include "pass.h"

void CompilerPass::fodder(Fodder &fodder)
{
    for (auto &f : fodder)
        fodderElement(f);
}

void CompilerPass::specs(std::vector<ComprehensionSpec> &specs)
{
    for (auto &spec : specs) {
        fodder(spec.openFodder);
        switch (spec.kind) {
            case ComprehensionSpec::FOR:
                fodder(spec.varFodder);
                fodder(spec.inFodder);
                expr(spec.expr);
                break;
            case ComprehensionSpec::IF: expr(spec.expr); break;
        }
    }
}

void CompilerPass::params(Fodder &fodder_l, ArgParams &params, Fodder &fodder_r)
{
    fodder(fodder_l);
    for (auto &param : params) {
        fodder(param.idFodder);
        if (param.expr) {
            fodder(param.eqFodder);
            expr(param.expr);
        }
        fodder(param.commaFodder);
    }
    fodder(fodder_r);
}

void CompilerPass::fieldParams(ObjectField &field)
{
    if (field.methodSugar) {
        params(field.fodderL, field.params, field.fodderR);
    }
}

void CompilerPass::fields(ObjectFields &fields)
{
    for (auto &field : fields) {
        switch (field.kind) {
            case ObjectField::LOCAL: {
                fodder(field.fodder1);
                fodder(field.fodder2);
                fieldParams(field);
                fodder(field.opFodder);
                expr(field.expr2);
            } break;

            case ObjectField::FIELD_ID:
            case ObjectField::FIELD_STR:
            case ObjectField::FIELD_EXPR: {
                if (field.kind == ObjectField::FIELD_ID) {
                    fodder(field.fodder1);

                } else if (field.kind == ObjectField::FIELD_STR) {
                    expr(field.expr1);

                } else if (field.kind == ObjectField::FIELD_EXPR) {
                    fodder(field.fodder1);
                    expr(field.expr1);
                    fodder(field.fodder2);
                }
                fieldParams(field);
                fodder(field.opFodder);
                expr(field.expr2);

            } break;

            case ObjectField::ASSERT: {
                fodder(field.fodder1);
                expr(field.expr2);
                if (field.expr3 != nullptr) {
                    fodder(field.opFodder);
                    expr(field.expr3);
                }
            } break;
        }

        fodder(field.commaFodder);
    }
}

void CompilerPass::expr(AST *&ast_)
{
    fodder(ast_->openFodder);
    visitExpr(ast_);
}

void CompilerPass::visit(Apply *ast)
{
    expr(ast->target);
    params(ast->fodderL, ast->args, ast->fodderR);
    if (ast->tailstrict) {
        fodder(ast->tailstrictFodder);
    }
}

void CompilerPass::visit(ApplyBrace *ast)
{
    expr(ast->left);
    expr(ast->right);
}

void CompilerPass::visit(Array *ast)
{
    for (auto &element : ast->elements) {
        expr(element.expr);
        fodder(element.commaFodder);
    }
    fodder(ast->closeFodder);
}

void CompilerPass::visit(ArrayComprehension *ast)
{
    expr(ast->body);
    fodder(ast->commaFodder);
    specs(ast->specs);
    fodder(ast->closeFodder);
}

void CompilerPass::visit(Assert *ast)
{
    expr(ast->cond);
    if (ast->message != nullptr) {
        fodder(ast->colonFodder);
        expr(ast->message);
    }
    fodder(ast->semicolonFodder);
    expr(ast->rest);
}

void CompilerPass::visit(Binary *ast)
{
    expr(ast->left);
    fodder(ast->opFodder);
    expr(ast->right);
}

void CompilerPass::visit(Conditional *ast)
{
    expr(ast->cond);
    fodder(ast->thenFodder);
    if (ast->branchFalse != nullptr) {
        expr(ast->branchTrue);
        fodder(ast->elseFodder);
        expr(ast->branchFalse);
    } else {
        expr(ast->branchTrue);
    }
}

void CompilerPass::visit(Error *ast)
{
    expr(ast->expr);
}

void CompilerPass::visit(Function *ast)
{
    params(ast->parenLeftFodder, ast->params, ast->parenRightFodder);
    expr(ast->body);
}

void CompilerPass::visit(Import *ast)
{
    visit(ast->file);
}

void CompilerPass::visit(Importstr *ast)
{
    visit(ast->file);
}

void CompilerPass::visit(InSuper *ast)
{
    expr(ast->element);
}

void CompilerPass::visit(Index *ast)
{
    expr(ast->target);
    if (ast->id != nullptr) {
    } else {
        if (ast->isSlice) {
            if (ast->index != nullptr)
                expr(ast->index);
            if (ast->end != nullptr)
                expr(ast->end);
            if (ast->step != nullptr)
                expr(ast->step);
        } else {
            expr(ast->index);
        }
    }
}

void CompilerPass::visit(Local *ast)
{
    assert(ast->binds.size() > 0);
    for (auto &bind : ast->binds) {
        fodder(bind.varFodder);
        if (bind.functionSugar) {
            params(bind.parenLeftFodder, bind.params, bind.parenRightFodder);
        }
        fodder(bind.opFodder);
        expr(bind.body);
        fodder(bind.closeFodder);
    }
    expr(ast->body);
}

void CompilerPass::visit(Object *ast)
{
    fields(ast->fields);
    fodder(ast->closeFodder);
}

void CompilerPass::visit(DesugaredObject *ast)
{
    for (AST *assert : ast->asserts) {
        expr(assert);
    }
    for (auto &field : ast->fields) {
        expr(field.name);
        expr(field.body);
    }
}

void CompilerPass::visit(ObjectComprehension *ast)
{
    fields(ast->fields);
    specs(ast->specs);
    fodder(ast->closeFodder);
}

void CompilerPass::visit(ObjectComprehensionSimple *ast)
{
    expr(ast->field);
    expr(ast->value);
    expr(ast->array);
}

void CompilerPass::visit(Parens *ast)
{
    expr(ast->expr);
    fodder(ast->closeFodder);
}

void CompilerPass::visit(SuperIndex *ast)
{
    if (ast->id != nullptr) {
    } else {
        expr(ast->index);
    }
}

void CompilerPass::visit(Unary *ast)
{
    expr(ast->expr);
}

#define VISIT(var,astType,astClass) \
   case astType: { \
     assert(dynamic_cast<astClass *>(var)); \
     auto *ast = static_cast<astClass *>(var); \
     visit(ast); \
   } break

void CompilerPass::visitExpr(AST *&ast_)
{
    switch(ast_->type) {
        VISIT(ast_, AST_APPLY, Apply);
        VISIT(ast_, AST_APPLY_BRACE, ApplyBrace);
        VISIT(ast_, AST_ARRAY, Array);
        VISIT(ast_, AST_ARRAY_COMPREHENSION, ArrayComprehension);
        // VISIT(ast_, AST_ARRAY_COMPREHENSION, ArrayComprehensionSimple);
        VISIT(ast_, AST_ASSERT, Assert);
        VISIT(ast_, AST_BINARY, Binary);
        VISIT(ast_, AST_BUILTIN_FUNCTION, BuiltinFunction);
        VISIT(ast_, AST_CONDITIONAL, Conditional);
        VISIT(ast_, AST_DESUGARED_OBJECT, DesugaredObject);
        VISIT(ast_, AST_DOLLAR, Dollar);
        VISIT(ast_, AST_ERROR, Error);
        VISIT(ast_, AST_FUNCTION, Function);
        VISIT(ast_, AST_IMPORT, Import);
        VISIT(ast_, AST_IMPORTSTR, Importstr);
        VISIT(ast_, AST_INDEX, Index);
        VISIT(ast_, AST_IN_SUPER, InSuper);
        VISIT(ast_, AST_LITERAL_BOOLEAN, LiteralBoolean);
        VISIT(ast_, AST_LITERAL_NULL, LiteralNull);
        VISIT(ast_, AST_LITERAL_NUMBER, LiteralNumber);
        VISIT(ast_, AST_LITERAL_STRING, LiteralString);
        VISIT(ast_, AST_LOCAL, Local);
        VISIT(ast_, AST_OBJECT, Object);
        VISIT(ast_, AST_OBJECT_COMPREHENSION, ObjectComprehension);
        VISIT(ast_, AST_OBJECT_COMPREHENSION_SIMPLE, ObjectComprehensionSimple);
        VISIT(ast_, AST_PARENS, Parens);
        VISIT(ast_, AST_SELF, Self);
        VISIT(ast_, AST_SUPER_INDEX, SuperIndex);
        VISIT(ast_, AST_UNARY, Unary);
        VISIT(ast_, AST_VAR, Var);
        default:
            std::cerr << "INTERNAL ERROR: Unknown AST: " << ast_ << std::endl;
            std::abort();
            break;
    }
}

void CompilerPass::file(AST *&body, Fodder &final_fodder)
{
    expr(body);
    fodder(final_fodder);
}

/** A pass that clones the AST it is given. */
class ClonePass : public CompilerPass {
   public:
    ClonePass(Allocator &alloc) : CompilerPass(alloc) {}
    virtual void expr(AST *&ast);
};

#define CLONE(var,astType,astClass) \
   case astType: { \
     assert(dynamic_cast<astClass *>(var)); \
     auto *ast = static_cast<astClass *>(var); \
     var = alloc.clone(ast); \
   } break

void ClonePass::expr(AST *&ast_)
{
    switch(ast_->type) {
        CLONE(ast_, AST_APPLY, Apply);
        CLONE(ast_, AST_APPLY_BRACE, ApplyBrace);
        CLONE(ast_, AST_ARRAY, Array);
        CLONE(ast_, AST_ARRAY_COMPREHENSION, ArrayComprehension);
        // CLONE(ast_, AST_ARRAY_COMPREHENSION, ArrayComprehensionSimple);
        CLONE(ast_, AST_ASSERT, Assert);
        CLONE(ast_, AST_BINARY, Binary);
        CLONE(ast_, AST_BUILTIN_FUNCTION, BuiltinFunction);
        CLONE(ast_, AST_CONDITIONAL, Conditional);
        CLONE(ast_, AST_DESUGARED_OBJECT, DesugaredObject);
        CLONE(ast_, AST_DOLLAR, Dollar);
        CLONE(ast_, AST_ERROR, Error);
        CLONE(ast_, AST_FUNCTION, Function);
        CLONE(ast_, AST_IMPORT, Import);
        CLONE(ast_, AST_IMPORTSTR, Importstr);
        CLONE(ast_, AST_INDEX, Index);
        CLONE(ast_, AST_IN_SUPER, InSuper);
        CLONE(ast_, AST_LITERAL_BOOLEAN, LiteralBoolean);
        CLONE(ast_, AST_LITERAL_NULL, LiteralNull);
        CLONE(ast_, AST_LITERAL_NUMBER, LiteralNumber);
        CLONE(ast_, AST_LITERAL_STRING, LiteralString);
        CLONE(ast_, AST_LOCAL, Local);
        CLONE(ast_, AST_OBJECT, Object);
        CLONE(ast_, AST_OBJECT_COMPREHENSION, ObjectComprehension);
        CLONE(ast_, AST_OBJECT_COMPREHENSION_SIMPLE, ObjectComprehensionSimple);
        CLONE(ast_, AST_PARENS, Parens);
        CLONE(ast_, AST_SELF, Self);
        CLONE(ast_, AST_SUPER_INDEX, SuperIndex);
        CLONE(ast_, AST_UNARY, Unary);
        CLONE(ast_, AST_VAR, Var);
        default:
            std::cerr << "INTERNAL ERROR: Unknown AST: " << ast_ << std::endl;
            std::abort();
            break;
    }

    CompilerPass::expr(ast_);
}

AST *clone_ast(Allocator &alloc, AST *ast)
{
    AST *r = ast;
    ClonePass(alloc).expr(r);
    return r;
}

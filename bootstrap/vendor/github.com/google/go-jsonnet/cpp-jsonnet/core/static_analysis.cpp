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

#include <set>

#include "ast.h"
#include "static_analysis.h"
#include "static_error.h"

typedef std::set<const Identifier *> IdSet;

/** Inserts all of s into r. */
static void append(IdSet &r, const IdSet &s)
{
    r.insert(s.begin(), s.end());
}

/** Statically analyse the given ast.
 *
 * \param ast_ The AST.
 * \param in_object Whether or not ast_ is within the lexical scope of an object AST.
 * \param vars The variables defined within lexical scope of ast_.
 * \returns The free variables in ast_.
 */
static IdSet static_analysis(AST *ast_, bool in_object, const IdSet &vars)
{
    IdSet r;

    switch (ast_->type) {
    case AST_APPLY: {
        assert(dynamic_cast<Apply *>(ast_));
        auto* ast = static_cast<Apply *>(ast_);
        append(r, static_analysis(ast->target, in_object, vars));
        for (const auto &arg : ast->args)
            append(r, static_analysis(arg.expr, in_object, vars));
    } break;
    case AST_APPLY_BRACE: {
        assert(dynamic_cast<ApplyBrace *>(ast_));
        // Nothing to do.
    } break;
    case AST_ARRAY: {
        assert(dynamic_cast<Array *>(ast_));
        auto* ast = static_cast<Array *>(ast_);
        for (auto &el : ast->elements)
            append(r, static_analysis(el.expr, in_object, vars));
    } break;
    case AST_BINARY: {
        assert(dynamic_cast<Binary *>(ast_));
        auto* ast = static_cast<Binary *>(ast_);
        append(r, static_analysis(ast->left, in_object, vars));
        append(r, static_analysis(ast->right, in_object, vars));
    } break;
    case AST_BUILTIN_FUNCTION: {
        assert(dynamic_cast<BuiltinFunction *>(ast_));
        // Nothing to do.
    } break;
    case AST_CONDITIONAL: {
        assert(dynamic_cast<Conditional *>(ast_));
        auto* ast = static_cast<Conditional *>(ast_);
        append(r, static_analysis(ast->cond, in_object, vars));
        append(r, static_analysis(ast->branchTrue, in_object, vars));
        append(r, static_analysis(ast->branchFalse, in_object, vars));
    } break;
    case AST_ERROR: {
        assert(dynamic_cast<Error *>(ast_));
        auto* ast = static_cast<Error *>(ast_);
        append(r, static_analysis(ast->expr, in_object, vars));
    } break;
    case AST_FUNCTION: {
        assert(dynamic_cast<Function *>(ast_));
        auto* ast = static_cast<Function *>(ast_);
        auto new_vars = vars;
        IdSet params;
        for (const auto &p : ast->params) {
            if (params.find(p.id) != params.end()) {
                std::string msg = "Duplicate function parameter: " + encode_utf8(p.id->name);
                throw StaticError(ast_->location, msg);
            }
            params.insert(p.id);
            new_vars.insert(p.id);
        }

        auto fv = static_analysis(ast->body, in_object, new_vars);
        for (const auto &p : ast->params) {
            if (p.expr != nullptr)
                append(fv, static_analysis(p.expr, in_object, new_vars));
        }
        for (const auto &p : ast->params)
            fv.erase(p.id);
        append(r, fv);
    } break;
    case AST_IMPORT: {
        assert(dynamic_cast<Import *>(ast_));
        // Nothing to do.
    } break;
    case AST_IMPORTSTR: {
        assert(dynamic_cast<Importstr *>(ast_));
        // Nothing to do.
    } break;
    case AST_IN_SUPER: {
        assert(dynamic_cast<const InSuper *>(ast_));
        auto* ast = static_cast<const InSuper *>(ast_);
        if (!in_object)
            throw StaticError(ast_->location, "Can't use super outside of an object.");
        append(r, static_analysis(ast->element, in_object, vars));
    } break;
    case AST_INDEX: {
        assert(dynamic_cast<const Index *>(ast_));
        auto* ast = static_cast<const Index *>(ast_);
        append(r, static_analysis(ast->target, in_object, vars));
        append(r, static_analysis(ast->index, in_object, vars));
    } break;
    case AST_LOCAL: {
        assert(dynamic_cast<const Local *>(ast_));
        auto* ast = static_cast<const Local *>(ast_);
        IdSet ast_vars;
        for (const auto &bind : ast->binds) {
            ast_vars.insert(bind.var);
        }
        auto new_vars = vars;
        append(new_vars, ast_vars);
        IdSet fvs;
        for (const auto &bind : ast->binds) {
            append(fvs, static_analysis(bind.body, in_object, new_vars));
        }

        append(fvs, static_analysis(ast->body, in_object, new_vars));

        for (const auto &bind : ast->binds)
            fvs.erase(bind.var);

        append(r, fvs);
    } break;
    case AST_LITERAL_BOOLEAN: {
        assert(dynamic_cast<const LiteralBoolean *>(ast_));
        // Nothing to do.
    } break;
    case AST_LITERAL_NUMBER: {
        assert(dynamic_cast<const LiteralNumber *>(ast_));
        // Nothing to do.
    } break;
    case AST_LITERAL_STRING: {
        assert(dynamic_cast<const LiteralString *>(ast_));
        // Nothing to do.
    } break;
    case AST_LITERAL_NULL: {
        assert(dynamic_cast<const LiteralNull *>(ast_));
        // Nothing to do.
    } break;
    case AST_DESUGARED_OBJECT: {
        assert(dynamic_cast<DesugaredObject *>(ast_));
        auto* ast = static_cast<DesugaredObject *>(ast_);
        for (auto &field : ast->fields) {
            append(r, static_analysis(field.name, in_object, vars));
            append(r, static_analysis(field.body, true, vars));
        }
        for (AST *assert : ast->asserts) {
            append(r, static_analysis(assert, true, vars));
        }
    } break;
    case AST_OBJECT_COMPREHENSION_SIMPLE: {
        assert(dynamic_cast<ObjectComprehensionSimple *>(ast_));
        auto* ast = static_cast<ObjectComprehensionSimple *>(ast_);
        auto new_vars = vars;
        new_vars.insert(ast->id);
        append(r, static_analysis(ast->field, false, new_vars));
        append(r, static_analysis(ast->value, true, new_vars));
        r.erase(ast->id);
        append(r, static_analysis(ast->array, in_object, vars));
    } break;
    case AST_SELF: {
        assert(dynamic_cast<const Self *>(ast_));
        if (!in_object)
            throw StaticError(ast_->location, "Can't use self outside of an object.");
    } break;
    case AST_SUPER_INDEX: {
        assert(dynamic_cast<const SuperIndex *>(ast_));
        auto* ast = static_cast<const SuperIndex *>(ast_);
        if (!in_object)
            throw StaticError(ast_->location, "Can't use super outside of an object.");
        append(r, static_analysis(ast->index, in_object, vars));
    } break;
    case AST_UNARY: {
        assert(dynamic_cast<const Unary *>(ast_));
        auto* ast = static_cast<const Unary *>(ast_);
        append(r, static_analysis(ast->expr, in_object, vars));
    } break;
    case AST_VAR: {
        assert(dynamic_cast<const Var *>(ast_));
        auto* ast = static_cast<const Var *>(ast_);
        if (vars.find(ast->id) == vars.end()) {
            throw StaticError(ast->location, "Unknown variable: " + encode_utf8(ast->id->name));
        }
        r.insert(ast->id);
    } break;
    default:
        std::cerr << "INTERNAL ERROR: Unknown AST: " << ast_ << std::endl;
        std::abort();
        break;
    }

    for (auto *id : r)
        ast_->freeVariables.push_back(id);

    return r;
}

void jsonnet_static_analysis(AST *ast)
{
    static_analysis(ast, false, IdSet{});
}

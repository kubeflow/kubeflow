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

#include <algorithm>
#include <set>
#include <typeinfo>

#include "formatter.h"
#include "lexer.h"
#include "pass.h"
#include "string_utils.h"
#include "unicode.h"

static std::string unparse_id(const Identifier *id)
{
    return encode_utf8(id->name);
}

/** If left recursive, return the left hand side, else return nullptr. */
static AST *left_recursive(AST *ast_)
{
    if (auto *ast = dynamic_cast<Apply *>(ast_))
        return ast->target;
    if (auto *ast = dynamic_cast<ApplyBrace *>(ast_))
        return ast->left;
    if (auto *ast = dynamic_cast<Binary *>(ast_))
        return ast->left;
    if (auto *ast = dynamic_cast<Index *>(ast_))
        return ast->target;
    if (auto *ast = dynamic_cast<InSuper *>(ast_))
        return ast->element;
    return nullptr;
}
static const AST *left_recursive(const AST *ast_)
{
    return left_recursive(const_cast<AST *>(ast_));
}

/** The transitive closure of left_recursive). */
static AST *left_recursive_deep(AST *ast_)
{
    AST *last = ast_;
    AST *left = left_recursive(ast_);

    while (left != nullptr) {
        last = left;
        left = left_recursive(last);
    }
    return last;
}

/** Pretty-print fodder.
 *
 * \param fodder The fodder to print
 * \param space_before Whether a space should be printed before any other output.
 * \param separate_token If the last fodder was an interstitial, whether a space should follow it.
 */
void fodder_fill(std::ostream &o, const Fodder &fodder, bool space_before, bool separate_token)
{
    unsigned last_indent = 0;
    for (const auto &fod : fodder) {
        switch (fod.kind) {
            case FodderElement::LINE_END:
                if (fod.comment.size() > 0)
                    o << "  " << fod.comment[0];
                o << '\n';
                o << std::string(fod.blanks, '\n');
                o << std::string(fod.indent, ' ');
                last_indent = fod.indent;
                space_before = false;
                break;

            case FodderElement::INTERSTITIAL:
                if (space_before)
                    o << ' ';
                o << fod.comment[0];
                space_before = true;
                break;

            case FodderElement::PARAGRAPH: {
                bool first = true;
                for (const std::string &l : fod.comment) {
                    // Do not indent empty lines (note: first line is never empty).
                    if (l.length() > 0) {
                        // First line is already indented by previous fod.
                        if (!first)
                            o << std::string(last_indent, ' ');
                        o << l;
                    }
                    o << '\n';
                    first = false;
                }
                o << std::string(fod.blanks, '\n');
                o << std::string(fod.indent, ' ');
                last_indent = fod.indent;
                space_before = false;
            } break;
        }
    }
    if (separate_token && space_before)
        o << ' ';
}

/** A model of fodder_fill that just keeps track of the column counter. */
static void fodder_count(unsigned &column, const Fodder &fodder, bool space_before,
                         bool separate_token)
{
    for (const auto &fod : fodder) {
        switch (fod.kind) {
            case FodderElement::PARAGRAPH:
            case FodderElement::LINE_END:
                column = fod.indent;
                space_before = false;
                break;

            case FodderElement::INTERSTITIAL:
                if (space_before)
                    column++;
                column += fod.comment[0].length();
                space_before = true;
                break;
        }
    }
    if (separate_token && space_before)
        column++;
}

class Unparser {
   public:
   private:
    std::ostream &o;
    FmtOpts opts;

   public:
    Unparser(std::ostream &o, const FmtOpts &opts) : o(o), opts(opts) {}

    void unparseSpecs(const std::vector<ComprehensionSpec> &specs)
    {
        for (const auto &spec : specs) {
            fill(spec.openFodder, true, true);
            switch (spec.kind) {
                case ComprehensionSpec::FOR:
                    o << "for";
                    fill(spec.varFodder, true, true);
                    o << unparse_id(spec.var);
                    fill(spec.inFodder, true, true);
                    o << "in";
                    unparse(spec.expr, true);
                    break;
                case ComprehensionSpec::IF:
                    o << "if";
                    unparse(spec.expr, true);
                    break;
            }
        }
    }

    void fill(const Fodder &fodder, bool space_before, bool separate_token)
    {
        fodder_fill(o, fodder, space_before, separate_token);
    }

    void unparseParams(const Fodder &fodder_l, const ArgParams &params, bool trailing_comma,
                       const Fodder &fodder_r)
    {
        fill(fodder_l, false, false);
        o << "(";
        bool first = true;
        for (const auto &param : params) {
            if (!first)
                o << ",";
            fill(param.idFodder, !first, true);
            o << unparse_id(param.id);
            if (param.expr != nullptr) {
                // default arg, no spacing: x=e
                fill(param.eqFodder, false, false);
                o << "=";
                unparse(param.expr, false);
            }
            fill(param.commaFodder, false, false);
            first = false;
        }
        if (trailing_comma)
            o << ",";
        fill(fodder_r, false, false);
        o << ")";
    }

    void unparseFieldParams(const ObjectField &field)
    {
        if (field.methodSugar) {
            unparseParams(field.fodderL, field.params, field.trailingComma, field.fodderR);
        }
    }

    void unparseFields(const ObjectFields &fields, bool space_before)
    {
        bool first = true;
        for (const auto &field : fields) {
            if (!first)
                o << ',';

            switch (field.kind) {
                case ObjectField::LOCAL: {
                    fill(field.fodder1, !first || space_before, true);
                    o << "local";
                    fill(field.fodder2, true, true);
                    o << unparse_id(field.id);
                    unparseFieldParams(field);
                    fill(field.opFodder, true, true);
                    o << "=";
                    unparse(field.expr2, true);
                } break;

                case ObjectField::FIELD_ID:
                case ObjectField::FIELD_STR:
                case ObjectField::FIELD_EXPR: {
                    if (field.kind == ObjectField::FIELD_ID) {
                        fill(field.fodder1, !first || space_before, true);
                        o << unparse_id(field.id);

                    } else if (field.kind == ObjectField::FIELD_STR) {
                        unparse(field.expr1, !first || space_before);

                    } else if (field.kind == ObjectField::FIELD_EXPR) {
                        fill(field.fodder1, !first || space_before, true);
                        o << "[";
                        unparse(field.expr1, false);
                        fill(field.fodder2, false, false);
                        o << "]";
                    }
                    unparseFieldParams(field);

                    fill(field.opFodder, false, false);

                    if (field.superSugar)
                        o << "+";
                    switch (field.hide) {
                        case ObjectField::INHERIT: o << ":"; break;
                        case ObjectField::HIDDEN: o << "::"; break;
                        case ObjectField::VISIBLE: o << ":::"; break;
                    }
                    unparse(field.expr2, true);

                } break;

                case ObjectField::ASSERT: {
                    fill(field.fodder1, !first || space_before, true);
                    o << "assert";
                    unparse(field.expr2, true);
                    if (field.expr3 != nullptr) {
                        fill(field.opFodder, true, true);
                        o << ":";
                        unparse(field.expr3, true);
                    }
                } break;
            }

            first = false;
            fill(field.commaFodder, false, false);
        }
    }

    /** Unparse the given AST.
     *
     * \param ast_ The AST to be unparsed.
     *
     * \param precedence The precedence of the enclosing AST.  If this is greater than the current
     * precedence, parens are not needed.
     */
    void unparse(const AST *ast_, bool space_before)
    {
        bool separate_token = !left_recursive(ast_);

        fill(ast_->openFodder, space_before, separate_token);

        if (auto *ast = dynamic_cast<const Apply *>(ast_)) {
            unparse(ast->target, space_before);
            fill(ast->fodderL, false, false);
            o << "(";
            bool first = true;
            for (const auto &arg : ast->args) {
                if (!first)
                    o << ',';
                bool space = !first;
                if (arg.id != nullptr) {
                    fill(arg.idFodder, space, true);
                    o << unparse_id(arg.id);
                    space = false;
                    o << "=";
                }
                unparse(arg.expr, space);
                fill(arg.commaFodder, false, false);
                first = false;
            }
            if (ast->trailingComma)
                o << ",";
            fill(ast->fodderR, false, false);
            o << ")";
            if (ast->tailstrict) {
                fill(ast->tailstrictFodder, true, true);
                o << "tailstrict";
            }

        } else if (auto *ast = dynamic_cast<const ApplyBrace *>(ast_)) {
            unparse(ast->left, space_before);
            unparse(ast->right, true);

        } else if (auto *ast = dynamic_cast<const Array *>(ast_)) {
            o << "[";
            bool first = true;
            for (const auto &element : ast->elements) {
                if (!first)
                    o << ',';
                unparse(element.expr, !first || opts.padArrays);
                fill(element.commaFodder, false, false);
                first = false;
            }
            if (ast->trailingComma)
                o << ",";
            fill(ast->closeFodder, ast->elements.size() > 0, opts.padArrays);
            o << "]";

        } else if (auto *ast = dynamic_cast<const ArrayComprehension *>(ast_)) {
            o << "[";
            unparse(ast->body, opts.padArrays);
            fill(ast->commaFodder, false, false);
            if (ast->trailingComma)
                o << ",";
            unparseSpecs(ast->specs);
            fill(ast->closeFodder, true, opts.padArrays);
            o << "]";

        } else if (auto *ast = dynamic_cast<const Assert *>(ast_)) {
            o << "assert";
            unparse(ast->cond, true);
            if (ast->message != nullptr) {
                fill(ast->colonFodder, true, true);
                o << ":";
                unparse(ast->message, true);
            }
            fill(ast->semicolonFodder, false, false);
            o << ";";
            unparse(ast->rest, true);

        } else if (auto *ast = dynamic_cast<const Binary *>(ast_)) {
            unparse(ast->left, space_before);
            fill(ast->opFodder, true, true);
            o << bop_string(ast->op);
            // The - 1 is for left associativity.
            unparse(ast->right, true);

        } else if (auto *ast = dynamic_cast<const BuiltinFunction *>(ast_)) {
            o << "/* builtin " << ast->name << " */ null";

        } else if (auto *ast = dynamic_cast<const Conditional *>(ast_)) {
            o << "if";
            unparse(ast->cond, true);
            fill(ast->thenFodder, true, true);
            o << "then";
            if (ast->branchFalse != nullptr) {
                unparse(ast->branchTrue, true);
                fill(ast->elseFodder, true, true);
                o << "else";
                unparse(ast->branchFalse, true);
            } else {
                unparse(ast->branchTrue, true);
            }

        } else if (dynamic_cast<const Dollar *>(ast_)) {
            o << "$";

        } else if (auto *ast = dynamic_cast<const Error *>(ast_)) {
            o << "error";
            unparse(ast->expr, true);

        } else if (auto *ast = dynamic_cast<const Function *>(ast_)) {
            o << "function";
            unparseParams(
                ast->parenLeftFodder, ast->params, ast->trailingComma, ast->parenRightFodder);
            unparse(ast->body, true);

        } else if (auto *ast = dynamic_cast<const Import *>(ast_)) {
            o << "import";
            unparse(ast->file, true);

        } else if (auto *ast = dynamic_cast<const Importstr *>(ast_)) {
            o << "importstr";
            unparse(ast->file, true);

        } else if (auto *ast = dynamic_cast<const InSuper *>(ast_)) {
            unparse(ast->element, true);
            fill(ast->inFodder, true, true);
            o << "in";
            fill(ast->superFodder, true, true);
            o << "super";

        } else if (auto *ast = dynamic_cast<const Index *>(ast_)) {
            unparse(ast->target, space_before);
            fill(ast->dotFodder, false, false);
            if (ast->id != nullptr) {
                o << ".";
                fill(ast->idFodder, false, false);
                o << unparse_id(ast->id);
            } else {
                o << "[";
                if (ast->isSlice) {
                    if (ast->index != nullptr) {
                        unparse(ast->index, false);
                    }
                    fill(ast->endColonFodder, false, false);
                    o << ":";
                    if (ast->end != nullptr) {
                        unparse(ast->end, false);
                    }
                    if (ast->step != nullptr || ast->stepColonFodder.size() > 0) {
                        fill(ast->stepColonFodder, false, false);
                        o << ":";
                        if (ast->step != nullptr) {
                            unparse(ast->step, false);
                        }
                    }
                } else {
                    unparse(ast->index, false);
                }
                fill(ast->idFodder, false, false);
                o << "]";
            }

        } else if (auto *ast = dynamic_cast<const Local *>(ast_)) {
            o << "local";
            assert(ast->binds.size() > 0);
            bool first = true;
            for (const auto &bind : ast->binds) {
                if (!first)
                    o << ",";
                first = false;
                fill(bind.varFodder, true, true);
                o << unparse_id(bind.var);
                if (bind.functionSugar) {
                    unparseParams(bind.parenLeftFodder,
                                  bind.params,
                                  bind.trailingComma,
                                  bind.parenRightFodder);
                }
                fill(bind.opFodder, true, true);
                o << "=";
                unparse(bind.body, true);
                fill(bind.closeFodder, false, false);
            }
            o << ";";
            unparse(ast->body, true);

        } else if (auto *ast = dynamic_cast<const LiteralBoolean *>(ast_)) {
            o << (ast->value ? "true" : "false");

        } else if (auto *ast = dynamic_cast<const LiteralNumber *>(ast_)) {
            o << ast->originalString;

        } else if (auto *ast = dynamic_cast<const LiteralString *>(ast_)) {
            if (ast->tokenKind == LiteralString::DOUBLE) {
                o << "\"";
                o << encode_utf8(ast->value);
                o << "\"";
            } else if (ast->tokenKind == LiteralString::SINGLE) {
                o << "'";
                o << encode_utf8(ast->value);
                o << "'";
            } else if (ast->tokenKind == LiteralString::BLOCK) {
                o << "|||\n";
                if (ast->value.c_str()[0] != U'\n')
                    o << ast->blockIndent;
                for (const char32_t *cp = ast->value.c_str(); *cp != U'\0'; ++cp) {
                    // Formatter always outputs in unix mode.
                    if (*cp == '\r') continue;
                    std::string utf8;
                    encode_utf8(*cp, utf8);
                    o << utf8;
                    if (*cp == U'\n' && *(cp + 1) != U'\n' && *(cp + 1) != U'\0') {
                        o << ast->blockIndent;
                    }
                }
                o << ast->blockTermIndent << "|||";
            } else if (ast->tokenKind == LiteralString::VERBATIM_DOUBLE) {
                o << "@\"";
                for (const char32_t *cp = ast->value.c_str(); *cp != U'\0'; ++cp) {
                    if (*cp == U'"') {
                        o << "\"\"";
                    } else {
                        std::string utf8;
                        encode_utf8(*cp, utf8);
                        o << utf8;
                    }
                }
                o << "\"";
            } else if (ast->tokenKind == LiteralString::VERBATIM_SINGLE) {
                o << "@'";
                for (const char32_t *cp = ast->value.c_str(); *cp != U'\0'; ++cp) {
                    if (*cp == U'\'') {
                        o << "''";
                    } else {
                        std::string utf8;
                        encode_utf8(*cp, utf8);
                        o << utf8;
                    }
                }
                o << "'";
            }

        } else if (dynamic_cast<const LiteralNull *>(ast_)) {
            o << "null";

        } else if (auto *ast = dynamic_cast<const Object *>(ast_)) {
            o << "{";
            unparseFields(ast->fields, opts.padObjects);
            if (ast->trailingComma)
                o << ",";
            fill(ast->closeFodder, ast->fields.size() > 0, opts.padObjects);
            o << "}";

        } else if (auto *ast = dynamic_cast<const DesugaredObject *>(ast_)) {
            o << "{";
            for (AST *assert : ast->asserts) {
                o << "assert";
                unparse(assert, true);
                o << ",";
            }
            for (auto &field : ast->fields) {
                o << "[";
                unparse(field.name, false);
                o << "]";
                switch (field.hide) {
                    case ObjectField::INHERIT: o << ":"; break;
                    case ObjectField::HIDDEN: o << "::"; break;
                    case ObjectField::VISIBLE: o << ":::"; break;
                }
                unparse(field.body, true);
                o << ",";
            }
            o << "}";

        } else if (auto *ast = dynamic_cast<const ObjectComprehension *>(ast_)) {
            o << "{";
            unparseFields(ast->fields, opts.padObjects);
            if (ast->trailingComma)
                o << ",";
            unparseSpecs(ast->specs);
            fill(ast->closeFodder, true, opts.padObjects);
            o << "}";

        } else if (auto *ast = dynamic_cast<const ObjectComprehensionSimple *>(ast_)) {
            o << "{[";
            unparse(ast->field, false);
            o << "]:";
            unparse(ast->value, true);
            o << " for " << unparse_id(ast->id) << " in";
            unparse(ast->array, true);
            o << "}";

        } else if (auto *ast = dynamic_cast<const Parens *>(ast_)) {
            o << "(";
            unparse(ast->expr, false);
            fill(ast->closeFodder, false, false);
            o << ")";

        } else if (dynamic_cast<const Self *>(ast_)) {
            o << "self";

        } else if (auto *ast = dynamic_cast<const SuperIndex *>(ast_)) {
            o << "super";
            fill(ast->dotFodder, false, false);
            if (ast->id != nullptr) {
                o << ".";
                fill(ast->idFodder, false, false);
                o << unparse_id(ast->id);
            } else {
                o << "[";
                unparse(ast->index, false);
                fill(ast->idFodder, false, false);
                o << "]";
            }

        } else if (auto *ast = dynamic_cast<const Unary *>(ast_)) {
            o << uop_string(ast->op);
            if (dynamic_cast<const Dollar *>(left_recursive_deep(ast->expr))) {
                unparse(ast->expr, true);
            } else {
                unparse(ast->expr, false);
            }

        } else if (auto *ast = dynamic_cast<const Var *>(ast_)) {
            o << encode_utf8(ast->id->name);

        } else {
            std::cerr << "INTERNAL ERROR: Unknown AST: " << ast_ << std::endl;
            std::abort();
        }
    }
};

/********************************************************************************
 * The rest of this file contains transformations on the ASTs before unparsing. *
 ********************************************************************************/

/** A generic Pass that does nothing but can be extended to easily define real passes.
 */
class FmtPass : public CompilerPass {
   protected:
    FmtOpts opts;

   public:
    FmtPass(Allocator &alloc, const FmtOpts &opts) : CompilerPass(alloc), opts(opts) {}
};

class EnforceStringStyle : public FmtPass {
    using FmtPass::visit;

   public:
    EnforceStringStyle(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void visit(LiteralString *lit)
    {
        if (lit->tokenKind == LiteralString::BLOCK)
            return;
        if (lit->tokenKind == LiteralString::VERBATIM_DOUBLE)
            return;
        if (lit->tokenKind == LiteralString::VERBATIM_SINGLE)
            return;
        UString canonical = jsonnet_string_unescape(lit->location, lit->value);
        unsigned num_single = 0, num_double = 0;
        for (char32_t c : canonical) {
            if (c == '\'')
                num_single++;
            if (c == '"')
                num_double++;
        }
        if (num_single > 0 && num_double > 0)
            return;  // Don't change it.
        bool use_single = opts.stringStyle == 's';
        if (num_single > 0)
            use_single = false;
        if (num_double > 0)
            use_single = true;

        // Change it.
        lit->value = jsonnet_string_escape(canonical, use_single);
        lit->tokenKind = use_single ? LiteralString::SINGLE : LiteralString::DOUBLE;
    }
};

class EnforceCommentStyle : public FmtPass {
   public:
    bool firstFodder;
    EnforceCommentStyle(Allocator &alloc, const FmtOpts &opts)
        : FmtPass(alloc, opts), firstFodder(true)
    {
    }
    /** Change the comment to match the given style, but don't break she-bang.
     *
     * If preserve_hash is true, do not touch a comment that starts with #!.
     */
    void fixComment(std::string &s, bool preserve_hash)
    {
        if (opts.commentStyle == 'h' && s[0] == '/') {
            s = "#" + s.substr(2);
        }
        if (opts.commentStyle == 's' && s[0] == '#') {
            if (preserve_hash && s[1] == '!')
                return;
            s = "//" + s.substr(1);
        }
    }
    void fodder(Fodder &fodder)
    {
        for (auto &f : fodder) {
            switch (f.kind) {
                case FodderElement::LINE_END:
                case FodderElement::PARAGRAPH:
                    if (f.comment.size() == 1) {
                        fixComment(f.comment[0], firstFodder);
                    }
                    break;

                case FodderElement::INTERSTITIAL: break;
            }
            firstFodder = false;
        }
    }
};

class EnforceMaximumBlankLines : public FmtPass {
   public:
    EnforceMaximumBlankLines(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void fodderElement(FodderElement &f)
    {
        if (f.kind != FodderElement::INTERSTITIAL)
            if (f.blanks > opts.maxBlankLines)
                f.blanks = opts.maxBlankLines;
    }
};

class StripComments : public FmtPass {
   public:
    StripComments(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void fodder(Fodder &fodder)
    {
        Fodder copy = fodder;
        fodder.clear();
        for (auto &f : copy) {
            if (f.kind == FodderElement::LINE_END)
                fodder.push_back(f);
        }
    }
};

class StripEverything : public FmtPass {
   public:
    StripEverything(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void fodder(Fodder &fodder)
    {
        fodder.clear();
    }
};

class StripAllButComments : public FmtPass {
   public:
    StripAllButComments(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    Fodder comments;
    void fodder(Fodder &fodder)
    {
        for (auto &f : fodder) {
            if (f.kind == FodderElement::PARAGRAPH) {
                comments.emplace_back(FodderElement::PARAGRAPH, 0, 0, f.comment);
            } else if (f.kind == FodderElement::INTERSTITIAL) {
                comments.push_back(f);
                comments.emplace_back(FodderElement::LINE_END, 0, 0, std::vector<std::string>{});
            }
        }
        fodder.clear();
    }
    virtual void file(AST *&body, Fodder &final_fodder)
    {
        expr(body);
        fodder(final_fodder);
        body = alloc.make<LiteralNull>(body->location, comments);
        final_fodder.clear();
    }
};

/** These cases are infix so we descend on the left to find the fodder. */
static Fodder &open_fodder(AST *ast_)
{
    return left_recursive_deep(ast_)->openFodder;
}

/** Strip blank lines from the top of the file. */
void remove_initial_newlines(AST *ast)
{
    Fodder &f = open_fodder(ast);
    while (f.size() > 0 && f[0].kind == FodderElement::LINE_END)
        f.erase(f.begin());
}

bool contains_newline(const Fodder &fodder)
{
    for (const auto &f : fodder) {
        if (f.kind != FodderElement::INTERSTITIAL)
            return true;
    }
    return false;
}

/* Commas should appear at the end of an object/array only if the closing token is on a new line. */
class FixTrailingCommas : public FmtPass {
    using FmtPass::visit;

   public:
    FixTrailingCommas(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    Fodder comments;

    // Generalized fix that works across a range of ASTs.
    void fix_comma(Fodder &last_comma_fodder, bool &trailing_comma, Fodder &close_fodder)
    {
        bool need_comma = contains_newline(close_fodder) || contains_newline(last_comma_fodder);
        if (trailing_comma) {
            if (!need_comma) {
                // Remove it but keep fodder.
                trailing_comma = false;
                fodder_move_front(close_fodder, last_comma_fodder);
            } else if (contains_newline(last_comma_fodder)) {
                // The comma is needed but currently is separated by a newline.
                fodder_move_front(close_fodder, last_comma_fodder);
            }
        } else {
            if (need_comma) {
                // There was no comma, but there was a newline before the ] so add a comma.
                trailing_comma = true;
            }
        }
    }

    void remove_comma(Fodder &last_comma_fodder, bool &trailing_comma, Fodder &close_fodder)
    {
        if (trailing_comma) {
            // Remove it but keep fodder.
            trailing_comma = false;
            close_fodder = concat_fodder(last_comma_fodder, close_fodder);
            last_comma_fodder.clear();
        }
    }

    void visit(Array *expr)
    {
        if (expr->elements.size() == 0) {
            // No comma present and none can be added.
            return;
        }

        fix_comma(expr->elements.back().commaFodder, expr->trailingComma, expr->closeFodder);
        FmtPass::visit(expr);
    }

    void visit(ArrayComprehension *expr)
    {
        remove_comma(expr->commaFodder, expr->trailingComma, expr->specs[0].openFodder);
        FmtPass::visit(expr);
    }

    void visit(Object *expr)
    {
        if (expr->fields.size() == 0) {
            // No comma present and none can be added.
            return;
        }

        fix_comma(expr->fields.back().commaFodder, expr->trailingComma, expr->closeFodder);
        FmtPass::visit(expr);
    }

    void visit(ObjectComprehension *expr)
    {
        remove_comma(expr->fields.back().commaFodder, expr->trailingComma, expr->closeFodder);
        FmtPass::visit(expr);
    }
};

/* Remove nested parens. */
class FixParens : public FmtPass {
    using FmtPass::visit;

   public:
    FixParens(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void visit(Parens *expr)
    {
        if (auto *body = dynamic_cast<Parens *>(expr->expr)) {
            // Deal with fodder.
            expr->expr = body->expr;
            fodder_move_front(open_fodder(body->expr), body->openFodder);
            fodder_move_front(expr->closeFodder, body->closeFodder);
        }
        FmtPass::visit(expr);
    }
};

/* Ensure ApplyBrace syntax sugar is used in the case of A + { }. */
class FixPlusObject : public FmtPass {
    using FmtPass::visit;

   public:
    FixPlusObject(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}
    void visitExpr(AST *&expr)
    {
        if (auto *bin_op = dynamic_cast<Binary *>(expr)) {
            // Could relax this to allow more ASTs on the LHS but this seems OK for now.
            if (dynamic_cast<Var *>(bin_op->left) || dynamic_cast<Index *>(bin_op->left)) {
                if (AST *rhs = dynamic_cast<Object *>(bin_op->right)) {
                    if (bin_op->op == BOP_PLUS) {
                        fodder_move_front(rhs->openFodder, bin_op->opFodder);
                        expr = alloc.make<ApplyBrace>(
                            bin_op->location, bin_op->openFodder, bin_op->left, rhs);
                    }
                }
            }
        }
        FmtPass::visitExpr(expr);
    }
};

/* Remove final colon in slices. */
class NoRedundantSliceColon : public FmtPass {
    using FmtPass::visit;

   public:
    NoRedundantSliceColon(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}

    void visit(Index *expr)
    {
        if (expr->isSlice) {
            if (expr->step == nullptr) {
                if (expr->stepColonFodder.size() > 0) {
                    fodder_move_front(expr->idFodder, expr->stepColonFodder);
                }
            }
        }
        FmtPass::visit(expr);
    }
};

/* Ensure syntax sugar is used where possible. */
class PrettyFieldNames : public FmtPass {
    using FmtPass::visit;

   public:
    PrettyFieldNames(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}

    bool isIdentifier(const UString &str)
    {
        // Identifiers cannot be zero-length.
        if (str.length() == 0) return false;

        bool first = true;
        for (char32_t c : str) {
            if (!first && c >= '0' && c <= '9')
                continue;
            first = false;
            if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c == '_'))
                continue;
            return false;
        }
        // Filter out keywords.
        if (lex_get_keyword_kind(encode_utf8(str)) != Token::IDENTIFIER)
            return false;
        return true;
    }

    void visit(Index *expr)
    {
        if (!expr->isSlice && expr->index != nullptr) {
            // Maybe we can use an id instead.
            if (auto *lit = dynamic_cast<LiteralString *>(expr->index)) {
                if (isIdentifier(lit->value)) {
                    expr->id = alloc.makeIdentifier(lit->value);
                    expr->idFodder = lit->openFodder;
                    expr->index = nullptr;
                }
            }
        }
        FmtPass::visit(expr);
    }

    void visit(Object *expr)
    {
        for (auto &field : expr->fields) {
            // First try ["foo"] -> "foo".
            if (field.kind == ObjectField::FIELD_EXPR) {
                if (auto *field_expr = dynamic_cast<LiteralString *>(field.expr1)) {
                    field.kind = ObjectField::FIELD_STR;
                    fodder_move_front(field_expr->openFodder, field.fodder1);
                    if (field.methodSugar) {
                        fodder_move_front(field.fodderL, field.fodder2);
                    } else {
                        fodder_move_front(field.opFodder, field.fodder2);
                    }
                }
            }
            // Then try "foo" -> foo.
            if (field.kind == ObjectField::FIELD_STR) {
                if (auto *lit = dynamic_cast<LiteralString *>(field.expr1)) {
                    if (isIdentifier(lit->value)) {
                        field.kind = ObjectField::FIELD_ID;
                        field.id = alloc.makeIdentifier(lit->value);
                        field.fodder1 = lit->openFodder;
                        field.expr1 = nullptr;
                    }
                }
            }
        }
        FmtPass::visit(expr);
    }
};

/// Add newlines inside complex structures (arrays, objects etc.).
///
/// The main principle is that a structure can either be:
/// * expanded and contain newlines in all the designated places
/// * unexpanded and contain newlines in none of the designated places
///
/// It only looks shallowly at the AST nodes, so there may be some newlines deeper that
/// don't affect expanding. For example:
/// [{
///     'a': 'b',
///     'c': 'd',
/// }]
/// The outer array can stay unexpanded, because there are no newlines between
/// the square brackets and the braces.
class FixNewlines : public FmtPass {
    using FmtPass::visit;

    bool shouldExpand(const Array *array)
    {
        for (const auto &elem : array->elements) {
            if (countNewlines(open_fodder(elem.expr)) > 0) {
                return true;
            }
        }
        if (countNewlines(array->closeFodder) > 0) {
            return true;
        }
        return false;
    }

    void expand(Array *array)
    {
        for (auto &elem : array->elements) {
            ensureCleanNewline(open_fodder(elem.expr));
        }
        ensureCleanNewline(array->closeFodder);
    }

    Fodder &objectFieldOpenFodder(ObjectField &field)
    {
        if (field.kind == ObjectField::Kind::FIELD_STR) {
            return field.expr1->openFodder;
        }
        return field.fodder1;
    }

    bool shouldExpand(Object *object)
    {
        for (auto &field : object->fields) {
            if (countNewlines(objectFieldOpenFodder(field)) > 0) {
                return true;
            }
        }
        if (countNewlines(object->closeFodder) > 0) {
            return true;
        }
        return false;
    }

    void expand(Object *object)
    {
        for (auto &field : object->fields) {
            ensureCleanNewline(objectFieldOpenFodder(field));
        }
        ensureCleanNewline(object->closeFodder);
    }

    bool shouldExpand(Local *local)
    {
        for (auto &bind : local->binds) {
            if (countNewlines(bind.varFodder) > 0) {
                return true;
            }
        }
        return false;
    }

    void expand(Local *local)
    {
        bool first = true;
        for (auto &bind : local->binds) {
            if (!first) {
                ensureCleanNewline(bind.varFodder);
            }
            first = false;
        }
    }

    bool shouldExpand(ArrayComprehension *comp)
    {
        if (countNewlines(open_fodder(comp->body)) > 0) {
            return true;
        }
        for (auto &spec : comp->specs) {
            if (countNewlines(spec.openFodder) > 0) {
                return true;
            }
        }
        if (countNewlines(comp->closeFodder) > 0) {
            return true;
        }
        return false;
    }

    void expand(ArrayComprehension *comp)
    {
        ensureCleanNewline(open_fodder(comp->body));
        for (auto &spec : comp->specs) {
            ensureCleanNewline(spec.openFodder);
        }
        ensureCleanNewline(comp->closeFodder);
    }

    bool shouldExpand(ObjectComprehension *comp)
    {
        for (auto &field : comp->fields) {
            if (countNewlines(objectFieldOpenFodder(field)) > 0) {
                return true;
            }
        }
        for (auto &spec : comp->specs) {
            if (countNewlines(spec.openFodder) > 0) {
                return true;
            }
        }
        if (countNewlines(comp->closeFodder) > 0) {
            return true;
        }
        return false;
    }

    void expand(ObjectComprehension *comp)
    {
        for (auto &field : comp->fields) {
            ensureCleanNewline(objectFieldOpenFodder(field));
        }
        for (auto &spec : comp->specs) {
            ensureCleanNewline(spec.openFodder);
        }
        ensureCleanNewline(comp->closeFodder);
    }

    bool shouldExpand(Parens *parens)
    {
        return countNewlines(open_fodder(parens->expr)) > 0 ||
               countNewlines(parens->closeFodder) > 0;
    }

    void expand(Parens *parens)
    {
        ensureCleanNewline(open_fodder(parens->expr));
        ensureCleanNewline(parens->closeFodder);
    }

    Fodder &argParamOpenFodder(ArgParam &param)
    {
        if (param.id != nullptr) {
            return param.idFodder;
        } else if (param.expr != nullptr) {
            return open_fodder(param.expr);
        } else {
            std::cerr << "Invalid ArgParam" << std::endl;
            abort();
        }
    }

    // Example:
    // f(1, 2,
    //   3)
    // Should be expanded to:
    // f(1,
    //   2,
    //   3)
    bool shouldExpandBetween(ArgParams &params)
    {
        bool first = true;
        for (auto &param : params) {
            if (!first && countNewlines(argParamOpenFodder(param)) > 0) {
                return true;
            }
            first = false;
        }
        return false;
    }

    void expandBetween(ArgParams &params)
    {
        bool first = true;
        for (auto &param : params) {
            if (!first) {
                ensureCleanNewline(argParamOpenFodder(param));
            }
            first = false;
        }
    }

    // Example:
    // foo(
    //     1, 2, 3)
    // Should be expanded to:
    // foo(
    //     1, 2, 3
    // )
    bool shouldExpandNearParens(ArgParams &params, Fodder &fodder_r)
    {
        if (params.empty()) {
            return false;
        }
        auto &argFodder = argParamOpenFodder(params.front());
        return countNewlines(fodder_r) > 0 || countNewlines(argFodder) > 0;
    }

    void expandNearParens(ArgParams &params, Fodder &fodder_r)
    {
        if (!params.empty()) {
            ensureCleanNewline(argParamOpenFodder(params.front()));
        }
        ensureCleanNewline(fodder_r);
    }

   public:
    FixNewlines(Allocator &alloc, const FmtOpts &opts) : FmtPass(alloc, opts) {}

    template <class T>
    void simpleExpandingVisit(T *expr)
    {
        if (shouldExpand(expr)) {
            expand(expr);
        }
        FmtPass::visit(expr);
    }

    void visit(Array *array)
    {
        simpleExpandingVisit(array);
    }

    void visit(Object *object)
    {
        simpleExpandingVisit(object);
    }

    void visit(Local *local)
    {
        simpleExpandingVisit(local);
    }

    void visit(ArrayComprehension *comp)
    {
        simpleExpandingVisit(comp);
    }

    void visit(ObjectComprehension *comp)
    {
        simpleExpandingVisit(comp);
    }

    void visit(Parens *parens)
    {
        simpleExpandingVisit(parens);
    }

    void params(Fodder &fodder_l, ArgParams &params, Fodder &fodder_r)
    {
        if (shouldExpandBetween(params)) {
            expandBetween(params);
        }

        if (shouldExpandNearParens(params, fodder_r)) {
            expandNearParens(params, fodder_r);
        }

        FmtPass::params(fodder_l, params, fodder_r);
    }
};

class FixIndentation {
    FmtOpts opts;
    unsigned column;

   public:
    FixIndentation(const FmtOpts &opts) : opts(opts), column(0) {}

    /* Set the indentation on the fodder elements, adjust column counter as if it was printed.
     * \param fodder The fodder to pretend to print.
     * \param space_before Whether a space should be printed before any other output.
     * \param separate_token If the last fodder was an interstitial, whether a space should follow
     * it.
     * \param all_but_last_indent New indentation value for all but final fodder element.
     * \param last_indent New indentation value for the final fodder element.
     */
    void fill(Fodder &fodder, bool space_before, bool separate_token, unsigned all_but_last_indent,
              unsigned last_indent)
    {
        setIndents(fodder, all_but_last_indent, last_indent);
        fodder_count(column, fodder, space_before, separate_token);
    }

    void fill(Fodder &fodder, bool space_before, bool separate_token, unsigned indent)
    {
        fill(fodder, space_before, separate_token, indent, indent);
    }

    /* This struct is the representation of the indentation level.  The field lineUp is what is
     * generally used to indent after a new line.  The field base is used to help derive a new
     * Indent struct when the indentation level increases.  lineUp is generally > base.
     *
     * In the following case (where spaces are replaced with underscores):
     * ____foobar(1,
     * ___________2)
     *
     * At the AST representing the 2, the indent has base == 4 and lineUp == 11.
     */
    struct Indent {
        unsigned base;
        unsigned lineUp;
        Indent(unsigned base, unsigned line_up) : base(base), lineUp(line_up) {}
    };

    /** Calculate the indentation of sub-expressions.
     *
     * If the first sub-expression is on the same line as the current node, then subsequent
     * ones will be lined up, otherwise subsequent ones will be on the next line indented
     * by 'indent'.
     */
    Indent newIndent(const Fodder &first_fodder, const Indent &old, unsigned line_up)
    {
        if (first_fodder.size() == 0 || first_fodder[0].kind == FodderElement::INTERSTITIAL) {
            return Indent(old.base, line_up);
        } else {
            // Reset
            return Indent(old.base + opts.indent, old.base + opts.indent);
        }
    }

    /** Calculate the indentation of sub-expressions.
     *
     * If the first sub-expression is on the same line as the current node, then subsequent
     * ones will be lined up and further indentations in their subexpressions will be based from
     * this column.
     */
    Indent newIndentStrong(const Fodder &first_fodder, const Indent &old, unsigned line_up)
    {
        if (first_fodder.size() == 0 || first_fodder[0].kind == FodderElement::INTERSTITIAL) {
            return Indent(line_up, line_up);
        } else {
            // Reset
            return Indent(old.base + opts.indent, old.base + opts.indent);
        }
    }

    /** Calculate the indentation of sub-expressions.
     *
     * If the first sub-expression is on the same line as the current node, then subsequent
     * ones will be lined up, otherwise subseqeuent ones will be on the next line with no
     * additional indent.
     */
    Indent align(const Fodder &first_fodder, const Indent &old, unsigned line_up)
    {
        if (first_fodder.size() == 0 || first_fodder[0].kind == FodderElement::INTERSTITIAL) {
            return Indent(old.base, line_up);
        } else {
            // Reset
            return old;
        }
    }

    /** Calculate the indentation of sub-expressions.
     *
     * If the first sub-expression is on the same line as the current node, then subsequent
     * ones will be lined up and further indentations in their subexpresssions will be based from
     * this column.  Otherwise, subseqeuent ones will be on the next line with no
     * additional indent.
     */
    Indent alignStrong(const Fodder &first_fodder, const Indent &old, unsigned line_up)
    {
        if (first_fodder.size() == 0 || first_fodder[0].kind == FodderElement::INTERSTITIAL) {
            return Indent(line_up, line_up);
        } else {
            // Reset
            return old;
        }
    }

    /* Set indentation values within the fodder elements.
     *
     * The last one gets a special indentation value, all the others are set to the same thing.
     */
    void setIndents(Fodder &fodder, unsigned all_but_last_indent, unsigned last_indent)
    {
        // First count how many there are.
        unsigned count = 0;
        for (const auto &f : fodder) {
            if (f.kind != FodderElement::INTERSTITIAL)
                count++;
        }
        // Now set the indents.
        unsigned i = 0;
        for (auto &f : fodder) {
            if (f.kind != FodderElement::INTERSTITIAL) {
                if (i + 1 < count) {
                    f.indent = all_but_last_indent;
                } else {
                    assert(i == count - 1);
                    f.indent = last_indent;
                }
                i++;
            }
        }
    }

    /** Indent comprehension specs.
     * \param indent The indentation level.
     */
    void specs(std::vector<ComprehensionSpec> &specs, const Indent &indent)
    {
        for (auto &spec : specs) {
            fill(spec.openFodder, true, true, indent.lineUp);
            switch (spec.kind) {
                case ComprehensionSpec::FOR: {
                    column += 3;  // for
                    fill(spec.varFodder, true, true, indent.lineUp);
                    column += spec.var->name.length();
                    fill(spec.inFodder, true, true, indent.lineUp);
                    column += 2;  // in
                    Indent new_indent = newIndent(open_fodder(spec.expr), indent, column);
                    expr(spec.expr, new_indent, true);
                } break;

                case ComprehensionSpec::IF: {
                    column += 2;  // if
                    Indent new_indent = newIndent(open_fodder(spec.expr), indent, column);
                    expr(spec.expr, new_indent, true);
                } break;
            }
        }
    }

    void params(Fodder &fodder_l, ArgParams &params, bool trailing_comma, Fodder &fodder_r,
                const Indent &indent)
    {
        fill(fodder_l, false, false, indent.lineUp, indent.lineUp);
        column++;  // (
        const Fodder &first_inside = params.size() == 0 ? fodder_r : params[0].idFodder;

        Indent new_indent = newIndent(first_inside, indent, column);
        bool first = true;
        for (auto &param : params) {
            if (!first)
                column++;  // ','
            fill(param.idFodder, !first, true, new_indent.lineUp);
            column += param.id->name.length();
            if (param.expr != nullptr) {
                // default arg, no spacing: x=e
                fill(param.eqFodder, false, false, new_indent.lineUp);
                column++;
                expr(param.expr, new_indent, false);
            }
            fill(param.commaFodder, false, false, new_indent.lineUp);
            first = false;
        }
        if (trailing_comma)
            column++;
        fill(fodder_r, false, false, new_indent.lineUp, indent.lineUp);
        column++;  // )
    }

    void fieldParams(ObjectField &field, const Indent &indent)
    {
        if (field.methodSugar) {
            params(field.fodderL, field.params, field.trailingComma, field.fodderR, indent);
        }
    }

    /** Indent fields within an object.
     *
     * \params fields
     * \param indent Indent of the first field.
     * \param space_before
     */
    void fields(ObjectFields &fields, const Indent &indent, bool space_before)
    {
        unsigned new_indent = indent.lineUp;
        bool first = true;
        for (auto &field : fields) {
            if (!first)
                column++;  // ','

            switch (field.kind) {
                case ObjectField::LOCAL: {
                    fill(field.fodder1, !first || space_before, true, indent.lineUp);
                    column += 5;  // local
                    fill(field.fodder2, true, true, indent.lineUp);
                    column += field.id->name.length();
                    fieldParams(field, indent);
                    fill(field.opFodder, true, true, indent.lineUp);
                    column++;  // =
                    Indent new_indent2 = newIndent(open_fodder(field.expr2), indent, column);
                    expr(field.expr2, new_indent2, true);
                } break;

                case ObjectField::FIELD_ID:
                case ObjectField::FIELD_STR:
                case ObjectField::FIELD_EXPR: {
                    if (field.kind == ObjectField::FIELD_ID) {
                        fill(field.fodder1, !first || space_before, true, new_indent);
                        column += field.id->name.length();

                    } else if (field.kind == ObjectField::FIELD_STR) {
                        expr(field.expr1, indent, !first || space_before);

                    } else if (field.kind == ObjectField::FIELD_EXPR) {
                        fill(field.fodder1, !first || space_before, true, new_indent);
                        column++;  // [
                        expr(field.expr1, indent, false);
                        fill(field.fodder2, false, false, new_indent);
                        column++;  // ]
                    }

                    fieldParams(field, indent);

                    fill(field.opFodder, false, false, new_indent);

                    if (field.superSugar)
                        column++;
                    switch (field.hide) {
                        case ObjectField::INHERIT: column += 1; break;
                        case ObjectField::HIDDEN: column += 2; break;
                        case ObjectField::VISIBLE: column += 3; break;
                    }
                    Indent new_indent2 = newIndent(open_fodder(field.expr2), indent, column);
                    expr(field.expr2, new_indent2, true);

                } break;

                case ObjectField::ASSERT: {
                    fill(field.fodder1, !first || space_before, true, new_indent);
                    column += 6;  // assert
                    // + 1 for the space after the assert
                    Indent new_indent2 = newIndent(open_fodder(field.expr2), indent, column + 1);
                    expr(field.expr2, indent, true);
                    if (field.expr3 != nullptr) {
                        fill(field.opFodder, true, true, new_indent2.lineUp);
                        column++;  // ":"
                        expr(field.expr3, new_indent2, true);
                    }
                } break;
            }

            first = false;
            fill(field.commaFodder, false, false, new_indent);
        }
    }

    /** Does the given fodder contain at least one new line? */
    bool hasNewLines(const Fodder &fodder)
    {
        for (const auto &f : fodder) {
            if (f.kind != FodderElement::INTERSTITIAL)
                return true;
        }
        return false;
    }

    /** Get the first fodder from an ArgParam. */
    const Fodder &argParamFirstFodder(const ArgParam &ap)
    {
        if (ap.id != nullptr)
            return ap.idFodder;
        return open_fodder(ap.expr);
    }

    /** Reindent an expression.
     *
     * \param ast_ The ast to reindent.
     * \param indent Beginning of the line.
     * \param space_before As defined in the pretty-printer.
     */
    void expr(AST *ast_, const Indent &indent, bool space_before)
    {
        bool separate_token = !left_recursive(ast_);

        fill(ast_->openFodder, space_before, separate_token, indent.lineUp);

        if (auto *ast = dynamic_cast<Apply *>(ast_)) {
            const Fodder &init_fodder = open_fodder(ast->target);
            Indent new_indent = align(init_fodder, indent, column + (space_before ? 1 : 0));
            expr(ast->target, new_indent, space_before);
            fill(ast->fodderL, false, false, new_indent.lineUp);
            column++;  // (
            const Fodder &first_fodder =
                ast->args.size() == 0 ? ast->fodderR : argParamFirstFodder(ast->args[0]);
            bool strong_indent = false;
            // Need to use strong indent if any of the
            // arguments (except the first) are preceded by newlines.
            bool first = true;
            for (auto &arg : ast->args) {
                if (first) {
                    // Skip first element.
                    first = false;
                    continue;
                }
                if (hasNewLines(argParamFirstFodder(arg)))
                    strong_indent = true;
            }

            Indent arg_indent = strong_indent ? newIndentStrong(first_fodder, indent, column)
                                              : newIndent(first_fodder, indent, column);
            first = true;
            for (auto &arg : ast->args) {
                if (!first)
                    column++;  // ","

                bool space = !first;
                if (arg.id != nullptr) {
                    fill(arg.idFodder, space, false, arg_indent.lineUp);
                    column += arg.id->name.length();
                    space = false;
                    column++;  // "="
                }
                expr(arg.expr, arg_indent, space);
                fill(arg.commaFodder, false, false, arg_indent.lineUp);
                first = false;
            }
            if (ast->trailingComma)
                column++;  // ","
            fill(ast->fodderR, false, false, arg_indent.lineUp, indent.base);
            column++;  // )
            if (ast->tailstrict) {
                fill(ast->tailstrictFodder, true, true, indent.base);
                column += 10;  // tailstrict
            }

        } else if (auto *ast = dynamic_cast<ApplyBrace *>(ast_)) {
            const Fodder &init_fodder = open_fodder(ast->left);
            Indent new_indent = align(init_fodder, indent, column + (space_before ? 1 : 0));
            expr(ast->left, new_indent, space_before);
            expr(ast->right, new_indent, true);

        } else if (auto *ast = dynamic_cast<Array *>(ast_)) {
            column++;  // '['
            // First fodder element exists and is a newline
            const Fodder &first_fodder =
                ast->elements.size() > 0 ? open_fodder(ast->elements[0].expr) : ast->closeFodder;
            unsigned new_column = column + (opts.padArrays ? 1 : 0);
            bool strong_indent = false;
            // Need to use strong indent if there are not newlines before any of the sub-expressions
            bool first = true;
            for (auto &el : ast->elements) {
                if (first) {
                    first = false;
                    continue;
                }
                if (hasNewLines(open_fodder(el.expr)))
                    strong_indent = true;
            }

            Indent new_indent = strong_indent ? newIndentStrong(first_fodder, indent, new_column)
                                              : newIndent(first_fodder, indent, new_column);

            first = true;
            for (auto &element : ast->elements) {
                if (!first)
                    column++;
                expr(element.expr, new_indent, !first || opts.padArrays);
                fill(element.commaFodder, false, false, new_indent.lineUp, new_indent.lineUp);
                first = false;
            }
            if (ast->trailingComma)
                column++;

            // Handle penultimate newlines from expr.close_fodder if there are any.
            fill(ast->closeFodder,
                 ast->elements.size() > 0,
                 opts.padArrays,
                 new_indent.lineUp,
                 indent.base);
            column++;  // ']'

        } else if (auto *ast = dynamic_cast<ArrayComprehension *>(ast_)) {
            column++;  // [
            Indent new_indent =
                newIndent(open_fodder(ast->body), indent, column + (opts.padArrays ? 1 : 0));
            expr(ast->body, new_indent, opts.padArrays);
            fill(ast->commaFodder, false, false, new_indent.lineUp);
            if (ast->trailingComma)
                column++;  // ','
            specs(ast->specs, new_indent);
            fill(ast->closeFodder, true, opts.padArrays, new_indent.lineUp, indent.base);
            column++;  // ]

        } else if (auto *ast = dynamic_cast<Assert *>(ast_)) {
            column += 6;  // assert
            // + 1 for the space after the assert
            Indent new_indent = newIndent(open_fodder(ast->cond), indent, column + 1);
            expr(ast->cond, new_indent, true);
            if (ast->message != nullptr) {
                fill(ast->colonFodder, true, true, new_indent.lineUp);
                column++;  // ":"
                expr(ast->message, new_indent, true);
            }
            fill(ast->semicolonFodder, false, false, new_indent.lineUp);
            column++;  // ";"
            expr(ast->rest, indent, true);

        } else if (auto *ast = dynamic_cast<Binary *>(ast_)) {
            const Fodder &first_fodder = open_fodder(ast->left);

            // Need to use strong indent in the case of
            /*
            A
            + B
            or
            A +
            B
            */
            bool strong_indent = hasNewLines(ast->opFodder) || hasNewLines(open_fodder(ast->right));

            unsigned inner_column = column + (space_before ? 1 : 0);
            Indent new_indent = strong_indent ? alignStrong(first_fodder, indent, inner_column)
                                              : align(first_fodder, indent, inner_column);
            expr(ast->left, new_indent, space_before);
            fill(ast->opFodder, true, true, new_indent.lineUp);
            column += bop_string(ast->op).length();
            // Don't calculate a new indent for here, because we like being able to do:
            // true &&
            // true &&
            // true
            expr(ast->right, new_indent, true);

        } else if (auto *ast = dynamic_cast<BuiltinFunction *>(ast_)) {
            column += 11;  // "/* builtin "
            column += ast->name.length();
            column += 8;  // " */ null"

        } else if (auto *ast = dynamic_cast<Conditional *>(ast_)) {
            column += 2;  // if
            Indent cond_indent = newIndent(open_fodder(ast->cond), indent, column + 1);
            expr(ast->cond, cond_indent, true);
            fill(ast->thenFodder, true, true, indent.base);
            column += 4;  // then
            Indent true_indent = newIndent(open_fodder(ast->branchTrue), indent, column + 1);
            expr(ast->branchTrue, true_indent, true);
            if (ast->branchFalse != nullptr) {
                fill(ast->elseFodder, true, true, indent.base);
                column += 4;  // else
                Indent false_indent = newIndent(open_fodder(ast->branchFalse), indent, column + 1);
                expr(ast->branchFalse, false_indent, true);
            }

        } else if (dynamic_cast<Dollar *>(ast_)) {
            column++;  // $

        } else if (auto *ast = dynamic_cast<Error *>(ast_)) {
            column += 5;  // error
            Indent new_indent = newIndent(open_fodder(ast->expr), indent, column + 1);
            expr(ast->expr, new_indent, true);

        } else if (auto *ast = dynamic_cast<Function *>(ast_)) {
            column += 8;  // function
            params(ast->parenLeftFodder,
                   ast->params,
                   ast->trailingComma,
                   ast->parenRightFodder,
                   indent);
            Indent new_indent = newIndent(open_fodder(ast->body), indent, column + 1);
            expr(ast->body, new_indent, true);

        } else if (auto *ast = dynamic_cast<Import *>(ast_)) {
            column += 6;  // import
            Indent new_indent = newIndent(open_fodder(ast->file), indent, column + 1);
            expr(ast->file, new_indent, true);

        } else if (auto *ast = dynamic_cast<Importstr *>(ast_)) {
            column += 9;  // importstr
            Indent new_indent = newIndent(open_fodder(ast->file), indent, column + 1);
            expr(ast->file, new_indent, true);

        } else if (auto *ast = dynamic_cast<InSuper *>(ast_)) {
            expr(ast->element, indent, space_before);
            fill(ast->inFodder, true, true, indent.lineUp);
            column += 2;  // in
            fill(ast->superFodder, true, true, indent.lineUp);
            column += 5;  // super

        } else if (auto *ast = dynamic_cast<Index *>(ast_)) {
            expr(ast->target, indent, space_before);
            fill(ast->dotFodder, false, false, indent.lineUp);
            if (ast->id != nullptr) {
                Indent new_indent = newIndent(ast->idFodder, indent, column);
                column++;  // "."
                fill(ast->idFodder, false, false, new_indent.lineUp);
                column += ast->id->name.length();
            } else {
                column++;  // "["
                if (ast->isSlice) {
                    Indent new_indent(0, 0);
                    if (ast->index != nullptr) {
                        new_indent = newIndent(open_fodder(ast->index), indent, column);
                        expr(ast->index, new_indent, false);
                    }
                    if (ast->end != nullptr) {
                        new_indent = newIndent(ast->endColonFodder, indent, column);
                        fill(ast->endColonFodder, false, false, new_indent.lineUp);
                        column++;  // ":"
                        expr(ast->end, new_indent, false);
                    }
                    if (ast->step != nullptr) {
                        if (ast->end == nullptr) {
                            new_indent = newIndent(ast->endColonFodder, indent, column);
                            fill(ast->endColonFodder, false, false, new_indent.lineUp);
                            column++;  // ":"
                        }
                        fill(ast->stepColonFodder, false, false, new_indent.lineUp);
                        column++;  // ":"
                        expr(ast->step, new_indent, false);
                    }
                    if (ast->index == nullptr && ast->end == nullptr && ast->step == nullptr) {
                        new_indent = newIndent(ast->endColonFodder, indent, column);
                        fill(ast->endColonFodder, false, false, new_indent.lineUp);
                        column++;  // ":"
                    }
                } else {
                    Indent new_indent = newIndent(open_fodder(ast->index), indent, column);
                    expr(ast->index, new_indent, false);
                    fill(ast->idFodder, false, false, new_indent.lineUp, indent.base);
                }
                column++;  // "]"
            }

        } else if (auto *ast = dynamic_cast<Local *>(ast_)) {
            column += 5;  // local
            assert(ast->binds.size() > 0);
            bool first = true;
            Indent new_indent = newIndent(ast->binds[0].varFodder, indent, column + 1);
            for (auto &bind : ast->binds) {
                if (!first)
                    column++;  // ','
                first = false;
                fill(bind.varFodder, true, true, new_indent.lineUp);
                column += bind.var->name.length();
                if (bind.functionSugar) {
                    params(bind.parenLeftFodder,
                           bind.params,
                           bind.trailingComma,
                           bind.parenRightFodder,
                           new_indent);
                }
                fill(bind.opFodder, true, true, new_indent.lineUp);
                column++;  // '='
                Indent new_indent2 = newIndent(open_fodder(bind.body), new_indent, column + 1);
                expr(bind.body, new_indent2, true);
                fill(bind.closeFodder, false, false, new_indent2.lineUp, indent.base);
            }
            column++;  // ';'
            expr(ast->body, indent, true);

        } else if (auto *ast = dynamic_cast<LiteralBoolean *>(ast_)) {
            column += (ast->value ? 4 : 5);

        } else if (auto *ast = dynamic_cast<LiteralNumber *>(ast_)) {
            column += ast->originalString.length();

        } else if (auto *ast = dynamic_cast<LiteralString *>(ast_)) {
            if (ast->tokenKind == LiteralString::DOUBLE) {
                column += 2 + ast->value.length();  // Include quotes
            } else if (ast->tokenKind == LiteralString::SINGLE) {
                column += 2 + ast->value.length();  // Include quotes
            } else if (ast->tokenKind == LiteralString::BLOCK) {
                ast->blockIndent = std::string(indent.base + opts.indent, ' ');
                ast->blockTermIndent = std::string(indent.base, ' ');
                column = indent.base;  // blockTermIndent
                column += 3;           // "|||"
            } else if (ast->tokenKind == LiteralString::VERBATIM_SINGLE) {
                column += 3;  // Include @, start and end quotes
                for (const char32_t *cp = ast->value.c_str(); *cp != U'\0'; ++cp) {
                    if (*cp == U'\'') {
                        column += 2;
                    } else {
                        column += 1;
                    }
                }
            } else if (ast->tokenKind == LiteralString::VERBATIM_DOUBLE) {
                column += 3;  // Include @, start and end quotes
                for (const char32_t *cp = ast->value.c_str(); *cp != U'\0'; ++cp) {
                    if (*cp == U'"') {
                        column += 2;
                    } else {
                        column += 1;
                    }
                }
            }

        } else if (dynamic_cast<LiteralNull *>(ast_)) {
            column += 4;  // null

        } else if (auto *ast = dynamic_cast<Object *>(ast_)) {
            column++;  // '{'
            const Fodder &first_fodder = ast->fields.size() == 0
                                             ? ast->closeFodder
                                             : ast->fields[0].kind == ObjectField::FIELD_STR
                                                   ? open_fodder(ast->fields[0].expr1)
                                                   : ast->fields[0].fodder1;
            Indent new_indent = newIndent(first_fodder, indent, column + (opts.padObjects ? 1 : 0));

            fields(ast->fields, new_indent, opts.padObjects);
            if (ast->trailingComma)
                column++;
            fill(ast->closeFodder,
                 ast->fields.size() > 0,
                 opts.padObjects,
                 new_indent.lineUp,
                 indent.base);
            column++;  // '}'

        } else if (auto *ast = dynamic_cast<DesugaredObject *>(ast_)) {
            // No fodder but need to recurse and maintain column counter.
            column++;  // '{'
            for (AST *assert : ast->asserts) {
                column += 6;  // assert
                expr(assert, indent, true);
                column++;  // ','
            }
            for (auto &field : ast->fields) {
                column++;  // '['
                expr(field.name, indent, false);
                column++;  // ']'
                switch (field.hide) {
                    case ObjectField::INHERIT: column += 1; break;
                    case ObjectField::HIDDEN: column += 2; break;
                    case ObjectField::VISIBLE: column += 3; break;
                }
                expr(field.body, indent, true);
            }
            column++;  // '}'

        } else if (auto *ast = dynamic_cast<ObjectComprehension *>(ast_)) {
            column++;  // '{'
            unsigned start_column = column;
            const Fodder &first_fodder = ast->fields.size() == 0
                                             ? ast->closeFodder
                                             : ast->fields[0].kind == ObjectField::FIELD_STR
                                                   ? open_fodder(ast->fields[0].expr1)
                                                   : ast->fields[0].fodder1;
            Indent new_indent =
                newIndent(first_fodder, indent, start_column + (opts.padObjects ? 1 : 0));

            fields(ast->fields, new_indent, opts.padObjects);
            if (ast->trailingComma)
                column++;  // ','
            specs(ast->specs, new_indent);
            fill(ast->closeFodder, true, opts.padObjects, new_indent.lineUp, indent.base);
            column++;  // '}'

        } else if (auto *ast = dynamic_cast<ObjectComprehensionSimple *>(ast_)) {
            column++;  // '{'
            column++;  // '['
            expr(ast->field, indent, false);
            column++;  // ']'
            column++;  // ':'
            expr(ast->value, indent, true);
            column += 5;  // " for "
            column += ast->id->name.length();
            column += 3;  // " in"
            expr(ast->array, indent, true);
            column++;  // '}'

        } else if (auto *ast = dynamic_cast<Parens *>(ast_)) {
            column++;  // (
            Indent new_indent = newIndentStrong(open_fodder(ast->expr), indent, column);
            expr(ast->expr, new_indent, false);
            fill(ast->closeFodder, false, false, new_indent.lineUp, indent.base);
            column++;  // )

        } else if (dynamic_cast<const Self *>(ast_)) {
            column += 4;  // self

        } else if (auto *ast = dynamic_cast<SuperIndex *>(ast_)) {
            column += 5;  // super
            fill(ast->dotFodder, false, false, indent.lineUp);
            if (ast->id != nullptr) {
                column++;  // ".";
                Indent new_indent = newIndent(ast->idFodder, indent, column);
                fill(ast->idFodder, false, false, new_indent.lineUp);
                column += ast->id->name.length();
            } else {
                column++;  // "[";
                Indent new_indent = newIndent(open_fodder(ast->index), indent, column);
                expr(ast->index, new_indent, false);
                fill(ast->idFodder, false, false, new_indent.lineUp, indent.base);
                column++;  // "]";
            }

        } else if (auto *ast = dynamic_cast<Unary *>(ast_)) {
            column += uop_string(ast->op).length();
            Indent new_indent = newIndent(open_fodder(ast->expr), indent, column);
            if (dynamic_cast<const Dollar *>(left_recursive_deep(ast->expr))) {
                expr(ast->expr, new_indent, true);
            } else {
                expr(ast->expr, new_indent, false);
            }

        } else if (auto *ast = dynamic_cast<Var *>(ast_)) {
            column += ast->id->name.length();

        } else {
            std::cerr << "INTERNAL ERROR: Unknown AST: " << ast_ << std::endl;
            std::abort();
        }
    }
    virtual void file(AST *body, Fodder &final_fodder)
    {
        expr(body, Indent(0, 0), false);
        setIndents(final_fodder, 0, 0);
    }
};

/** Sort top-level imports.
 *
 * Top-level imports are `local x = import 'xxx.jsonnet` expressions
 * that go before anything else in the file (more precisely all such imports
 * that are either the root of AST or a direct child (body) of a top-level
 * import.
 *
 * Grouping of imports is preserved. Groups of imports are separated by blank
 * lines or lines containing comments.
 */
class SortImports {
    /// Internal representation of an import
    struct ImportElem {
        ImportElem(UString key, Fodder adjacentFodder, Local::Bind bind)
            : key(key), adjacentFodder(adjacentFodder), bind(bind)
        {
        }

        // A key by which the imports should be sorted.
        // It's a file path that is imported, represented as UTF-32 codepoints without case folding.
        // In particular "Z" < "a", because 'Z' == 90 and 'a' == 97.
        UString key;

        // Comments adjacent to the import that go after it and that should stay attached
        // when imports are reordered.
        Fodder adjacentFodder;

        // The bind that contains the import
        // Satisfies: bind.functionSugar == false && bind.body->type == AST_IMPORT
        Local::Bind bind;
        bool operator<(const ImportElem &elem) const
        {
            return key < elem.key;
        }
    };

    typedef std::vector<ImportElem> ImportElems;

    Allocator &alloc;

   public:
    SortImports(Allocator &alloc) : alloc(alloc) {}

    /// Get the value by which the imports should be sorted.
    UString sortingKey(Import *import)
    {
        return import->file->value;
    }

    /// Check if `local` expression is used for importing,
    bool isGoodLocal(Local *local)
    {
        for (const auto &bind : local->binds) {
            if (bind.body->type != AST_IMPORT || bind.functionSugar) {
                return false;
            }
        }
        return true;
    }

    Local *goodLocalOrNull(AST *expr)
    {
        if (auto *local = dynamic_cast<Local *>(expr)) {
            return isGoodLocal(local) ? local : nullptr;
        } else {
            return nullptr;
        }
    }

    /** Split fodder after the first new line / paragraph fodder,
     * leaving blank lines after the newline in the second half.
     *
     * The two returned fodders can be concatenated using concat_fodder to get the original fodder.
     *
     * It's a heuristic that given two consecutive tokens `prev_token`, `next_token`
     * with some fodder between them, decides which part of the fodder logically belongs
     * to `prev_token` and which part belongs to the `next_token`.
     *
     * Example:
     * prev_token // prev_token is awesome!
     *
     * // blah blah
     * next_token
     *
     * In such case "// prev_token is awesome!\n" part of the fodder belongs
     * to the `prev_token` and "\n//blah blah\n" to the `next_token`.
     */
    std::pair<Fodder, Fodder> splitFodder(const Fodder &fodder)
    {
        Fodder afterPrev, beforeNext;
        bool inSecondPart = false;
        for (const auto &fodderElem : fodder) {
            if (inSecondPart) {
                fodder_push_back(beforeNext, fodderElem);
            } else {
                afterPrev.push_back(fodderElem);
            }
            if (fodderElem.kind != FodderElement::Kind::INTERSTITIAL && !inSecondPart) {
                inSecondPart = true;
                if (fodderElem.blanks > 0) {
                    // If there are any blank lines at the end of afterPrev, move them
                    // to beforeNext.
                    afterPrev.back().blanks = 0;
                    assert(beforeNext.empty());
                    beforeNext.emplace_back(FodderElement::Kind::LINE_END,
                                            fodderElem.blanks,
                                            fodderElem.indent,
                                            std::vector<std::string>());
                }
            }
        }
        return {afterPrev, beforeNext};
    }

    void sortGroup(ImportElems &imports)
    {
        // We don't want to change behaviour in such case:
        // local foo = "b.jsonnet";
        // local foo = "a.jsonnet";
        // So we don't change the order when there are shadowed variables.
        if (!duplicatedVariables(imports)) {
            std::sort(imports.begin(), imports.end());
        }
    }

    ImportElems extractImportElems(const Local::Binds &binds, Fodder after)
    {
        ImportElems result;
        Fodder before = binds.front().varFodder;
        for (int i = 0; i < int(binds.size()); ++i) {
            const auto &bind = binds[i];
            bool last = i == int(binds.size() - 1);
            Fodder adjacent, beforeNext;
            if (!last) {
                auto &next = binds[i + 1];
                std::tie(adjacent, beforeNext) = splitFodder(next.varFodder);
            } else {
                adjacent = after;
            }
            ensureCleanNewline(adjacent);
            Local::Bind newBind = bind;
            newBind.varFodder = before;
            Import *import = dynamic_cast<Import *>(bind.body);
            assert(import != nullptr);
            result.emplace_back(sortingKey(import), adjacent, newBind);
            before = beforeNext;
        }
        return result;
    }

    AST *buildGroupAST(ImportElems &imports, AST *body, const Fodder &groupOpenFodder)
    {
        for (int i = imports.size() - 1; i >= 0; --i) {
            auto &import = imports[i];
            Fodder fodder;
            if (i == 0) {
                fodder = groupOpenFodder;
            } else {
                fodder = imports[i - 1].adjacentFodder;
            }
            auto *local =
                alloc.make<Local>(LocationRange(), fodder, Local::Binds({import.bind}), body);
            body = local;
        }

        return body;
    }

    bool duplicatedVariables(const ImportElems &elems)
    {
        std::set<UString> idents;
        for (const auto &elem : elems) {
            idents.insert(elem.bind.var->name);
        }
        return idents.size() < elems.size();
    }

    /// Check if the import group ends after this local
    bool groupEndsAfter(Local *local)
    {
        Local *next = goodLocalOrNull(local->body);
        if (!next) {
            return true;
        }

        bool newlineReached = false;
        for (const auto &fodderElem : open_fodder(next)) {
            if (newlineReached || fodderElem.blanks > 0) {
                return true;
            }
            if (fodderElem.kind != FodderElement::Kind::INTERSTITIAL) {
                newlineReached = true;
            }
        }
        return false;
    }

    AST *toplevelImport(Local *local, ImportElems &imports, const Fodder &groupOpenFodder)
    {
        assert(isGoodLocal(local));

        Fodder adjacentCommentFodder, beforeNextFodder;
        std::tie(adjacentCommentFodder, beforeNextFodder) = splitFodder(open_fodder(local->body));

        ensureCleanNewline(adjacentCommentFodder);

        ImportElems newImports = extractImportElems(local->binds, adjacentCommentFodder);
        imports.insert(imports.end(), newImports.begin(), newImports.end());

        if (groupEndsAfter(local)) {
            sortGroup(imports);

            Fodder afterGroup = imports.back().adjacentFodder;
            ensureCleanNewline(beforeNextFodder);
            auto nextOpenFodder = concat_fodder(afterGroup, beforeNextFodder);

            // Process the code after the current group:
            AST *bodyAfterGroup;
            Local *next = goodLocalOrNull(local->body);
            if (next) {
                // Another group of imports
                ImportElems nextImports;
                bodyAfterGroup = toplevelImport(next, nextImports, nextOpenFodder);
            } else {
                // Something else
                bodyAfterGroup = local->body;
                open_fodder(bodyAfterGroup) = nextOpenFodder;
            }

            return buildGroupAST(imports, bodyAfterGroup, groupOpenFodder);
        } else {
            assert(beforeNextFodder.empty());
            return toplevelImport(dynamic_cast<Local *>(local->body), imports, groupOpenFodder);
        }
    }

    void file(AST *&body)
    {
        ImportElems imports;
        Local *local = goodLocalOrNull(body);
        if (local) {
            body = toplevelImport(local, imports, open_fodder(local));
        }
    }
};

std::string jsonnet_fmt(AST *ast, Fodder &final_fodder, const FmtOpts &opts)
{
    Allocator alloc;

    // Passes to enforce style on the AST.
    if (opts.sortImports)
        SortImports(alloc).file(ast);
    remove_initial_newlines(ast);
    if (opts.maxBlankLines > 0)
        EnforceMaximumBlankLines(alloc, opts).file(ast, final_fodder);
    FixNewlines(alloc, opts).file(ast, final_fodder);
    FixTrailingCommas(alloc, opts).file(ast, final_fodder);
    FixParens(alloc, opts).file(ast, final_fodder);
    FixPlusObject(alloc, opts).file(ast, final_fodder);
    NoRedundantSliceColon(alloc, opts).file(ast, final_fodder);
    if (opts.stripComments)
        StripComments(alloc, opts).file(ast, final_fodder);
    else if (opts.stripAllButComments)
        StripAllButComments(alloc, opts).file(ast, final_fodder);
    else if (opts.stripEverything)
        StripEverything(alloc, opts).file(ast, final_fodder);
    if (opts.prettyFieldNames)
        PrettyFieldNames(alloc, opts).file(ast, final_fodder);
    if (opts.stringStyle != 'l')
        EnforceStringStyle(alloc, opts).file(ast, final_fodder);
    if (opts.commentStyle != 'l')
        EnforceCommentStyle(alloc, opts).file(ast, final_fodder);
    if (opts.indent > 0)
        FixIndentation(opts).file(ast, final_fodder);

    std::stringstream ss;
    Unparser unparser(ss, opts);
    unparser.unparse(ast, false);
    unparser.fill(final_fodder, true, false);
    return ss.str();
}

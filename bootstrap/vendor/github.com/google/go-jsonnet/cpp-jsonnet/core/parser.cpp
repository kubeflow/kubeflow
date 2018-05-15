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

#include <cassert>
#include <cmath>
#include <cstdlib>

#include <iomanip>
#include <list>
#include <memory>
#include <set>
#include <sstream>
#include <string>

#include "ast.h"
#include "desugarer.h"
#include "lexer.h"
#include "parser.h"
#include "static_error.h"

std::string jsonnet_unparse_number(double v)
{
    std::stringstream ss;
    if (v == floor(v)) {
        ss << std::fixed << std::setprecision(0) << v;
    } else {
        // See "What Every Computer Scientist Should Know About Floating-Point Arithmetic"
        // Theorem 15
        // http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
        ss << std::setprecision(17);
        ss << v;
    }
    return ss.str();
}

namespace {

static const Fodder EMPTY_FODDER;

static bool op_is_unary(const std::string &op, UnaryOp &uop)
{
    auto it = unary_map.find(op);
    if (it == unary_map.end())
        return false;
    uop = it->second;
    return true;
}

static bool op_is_binary(const std::string &op, BinaryOp &bop)
{
    auto it = binary_map.find(op);
    if (it == binary_map.end())
        return false;
    bop = it->second;
    return true;
}

LocationRange span(const Token &begin)
{
    return LocationRange(begin.location.file, begin.location.begin, begin.location.end);
}

LocationRange span(const Token &begin, const Token &end)
{
    return LocationRange(begin.location.file, begin.location.begin, end.location.end);
}

LocationRange span(const Token &begin, AST *end)
{
    return LocationRange(begin.location.file, begin.location.begin, end->location.end);
}

/** Holds state while parsing a given token list.
 */
class Parser {
    // The private member functions are utilities for dealing with the token stream.

    StaticError unexpected(const Token &tok, const std::string &while_)
    {
        std::stringstream ss;
        ss << "unexpected: " << tok.kind << " while " << while_;
        return StaticError(tok.location, ss.str());
    }

    Token pop(void)
    {
        Token tok = peek();
        tokens.pop_front();
        return tok;
    }

    void push(Token tok)
    {
        tokens.push_front(tok);
    }

    const Token &peek(void)
    {
        return tokens.front();
    }

    /** Only call this is peek() is not an EOF token. */
    Token doublePeek(void)
    {
        Tokens::iterator it = tokens.begin();  // First one.
        it++;                                  // Now pointing at the second one.
        return *(it);
    }

    Token popExpect(Token::Kind k, const char *data = nullptr)
    {
        Token tok = pop();
        if (tok.kind != k) {
            std::stringstream ss;
            ss << "expected token " << k << " but got " << tok;
            throw StaticError(tok.location, ss.str());
        }
        if (data != nullptr && tok.data != data) {
            std::stringstream ss;
            ss << "expected operator " << data << " but got " << tok.data;
            throw StaticError(tok.location, ss.str());
        }
        return tok;
    }

    std::list<Token> &tokens;
    Allocator *alloc;

   public:
    Parser(Tokens &tokens, Allocator *alloc) : tokens(tokens), alloc(alloc) {}

    /** Parse a comma-separated list of expressions.
     *
     * Allows an optional ending comma.
     * \param exprs Expressions added here.
     * \param end The token that ends the list (e.g. ] or )).
     * \param element_kind Used in error messages when a comma was not found.
     * \returns The last token (the one that matched parameter end).
     */
    Token parseArgs(ArgParams &args, Token::Kind end, const std::string &element_kind,
                    bool &got_comma)
    {
        got_comma = false;
        bool first = true;
        do {
            Token next = peek();
            if (next.kind == end) {
                // got_comma can be true or false here.
                return pop();
            }
            if (!first && !got_comma) {
                std::stringstream ss;
                ss << "expected a comma before next " << element_kind << ".";
                throw StaticError(next.location, ss.str());
            }
            // Either id=expr or id or expr, but note that expr could be id==1 so this needs
            // look-ahead.
            Fodder id_fodder;
            const Identifier *id = nullptr;
            Fodder eq_fodder;
            if (peek().kind == Token::IDENTIFIER) {
                Token maybe_eq = doublePeek();
                if (maybe_eq.kind == Token::OPERATOR && maybe_eq.data == "=") {
                    id_fodder = peek().fodder;
                    id = alloc->makeIdentifier(peek().data32());
                    eq_fodder = maybe_eq.fodder;
                    pop();  // id
                    pop();  // eq
                }
            }
            AST *expr = parse(MAX_PRECEDENCE);
            got_comma = false;
            first = false;
            Fodder comma_fodder;
            if (peek().kind == Token::COMMA) {
                Token comma = pop();
                comma_fodder = comma.fodder;
                got_comma = true;
            }
            args.emplace_back(id_fodder, id, eq_fodder, expr, comma_fodder);
        } while (true);
    }

    ArgParams parseParams(const std::string &element_kind, bool &got_comma, Fodder &close_fodder)
    {
        ArgParams params;
        Token paren_r = parseArgs(params, Token::PAREN_R, element_kind, got_comma);

        // Check they're all identifiers
        // parseArgs returns f(x) with x as an expression.  Convert it here.
        for (auto &p : params) {
            if (p.id == nullptr) {
                if (p.expr->type != AST_VAR) {
                    throw StaticError(p.expr->location, "could not parse parameter here.");
                }
                auto *pv = static_cast<Var *>(p.expr);
                p.id = pv->id;
                p.idFodder = pv->openFodder;
                p.expr = nullptr;
            }
        }

        close_fodder = paren_r.fodder;

        return params;
    }

    Token parseBind(Local::Binds &binds)
    {
        Token var_id = popExpect(Token::IDENTIFIER);
        auto *id = alloc->makeIdentifier(var_id.data32());
        for (const auto &bind : binds) {
            if (bind.var == id)
                throw StaticError(var_id.location, "duplicate local var: " + var_id.data);
        }
        bool is_function = false;
        ArgParams params;
        bool trailing_comma = false;
        Fodder fodder_l, fodder_r;
        if (peek().kind == Token::PAREN_L) {
            Token paren_l = pop();
            fodder_l = paren_l.fodder;
            params = parseParams("function parameter", trailing_comma, fodder_r);
            is_function = true;
        }
        Token eq = popExpect(Token::OPERATOR, "=");
        AST *body = parse(MAX_PRECEDENCE);
        Token delim = pop();
        binds.emplace_back(var_id.fodder,
                           id,
                           eq.fodder,
                           body,
                           is_function,
                           fodder_l,
                           params,
                           trailing_comma,
                           fodder_r,
                           delim.fodder);
        return delim;
    }

    Token parseObjectRemainder(AST *&obj, const Token &tok)
    {
        ObjectFields fields;
        std::set<std::string> literal_fields;  // For duplicate fields detection.
        std::set<const Identifier *> binds;    // For duplicate locals detection.

        bool got_comma = false;
        bool first = true;
        Token next = pop();

        do {
            if (next.kind == Token::BRACE_R) {
                obj = alloc->make<Object>(
                    span(tok, next), tok.fodder, fields, got_comma, next.fodder);
                return next;

            } else if (next.kind == Token::FOR) {
                // It's a comprehension
                unsigned num_fields = 0;
                unsigned num_asserts = 0;
                const ObjectField *field_ptr = nullptr;
                for (const auto &field : fields) {
                    if (field.kind == ObjectField::LOCAL)
                        continue;
                    if (field.kind == ObjectField::ASSERT) {
                        num_asserts++;
                        continue;
                    }
                    field_ptr = &field;
                    num_fields++;
                }
                if (num_asserts > 0) {
                    auto msg = "object comprehension cannot have asserts.";
                    throw StaticError(next.location, msg);
                }
                if (num_fields != 1) {
                    auto msg = "object comprehension can only have one field.";
                    throw StaticError(next.location, msg);
                }
                const ObjectField &field = *field_ptr;

                if (field.hide != ObjectField::INHERIT) {
                    auto msg = "object comprehensions cannot have hidden fields.";
                    throw StaticError(next.location, msg);
                }

                if (field.kind != ObjectField::FIELD_EXPR) {
                    auto msg = "object comprehensions can only have [e] fields.";
                    throw StaticError(next.location, msg);
                }

                std::vector<ComprehensionSpec> specs;
                Token last = parseComprehensionSpecs(Token::BRACE_R, next.fodder, specs);
                obj = alloc->make<ObjectComprehension>(
                    span(tok, last), tok.fodder, fields, got_comma, specs, last.fodder);

                return last;
            }

            if (!got_comma && !first)
                throw StaticError(next.location, "expected a comma before next field.");

            first = false;
            got_comma = false;

            switch (next.kind) {
                case Token::BRACKET_L:
                case Token::IDENTIFIER:
                case Token::STRING_DOUBLE:
                case Token::STRING_SINGLE:
                case Token::STRING_BLOCK:
                case Token::VERBATIM_STRING_DOUBLE:
                case Token::VERBATIM_STRING_SINGLE: {
                    ObjectField::Kind kind;
                    AST *expr1 = nullptr;
                    const Identifier *id = nullptr;
                    Fodder fodder1, fodder2;
                    if (next.kind == Token::IDENTIFIER) {
                        fodder1 = next.fodder;
                        kind = ObjectField::FIELD_ID;
                        id = alloc->makeIdentifier(next.data32());
                    } else if (next.kind == Token::STRING_DOUBLE) {
                        kind = ObjectField::FIELD_STR;
                        expr1 = alloc->make<LiteralString>(next.location,
                                                           next.fodder,
                                                           next.data32(),
                                                           LiteralString::DOUBLE,
                                                           "",
                                                           "");
                    } else if (next.kind == Token::STRING_SINGLE) {
                        kind = ObjectField::FIELD_STR;
                        expr1 = alloc->make<LiteralString>(next.location,
                                                           next.fodder,
                                                           next.data32(),
                                                           LiteralString::SINGLE,
                                                           "",
                                                           "");
                    } else if (next.kind == Token::STRING_BLOCK) {
                        kind = ObjectField::FIELD_STR;
                        expr1 = alloc->make<LiteralString>(next.location,
                                                           next.fodder,
                                                           next.data32(),
                                                           LiteralString::BLOCK,
                                                           next.stringBlockIndent,
                                                           next.stringBlockTermIndent);
                    } else if (next.kind == Token::VERBATIM_STRING_SINGLE) {
                        kind = ObjectField::FIELD_STR;
                        expr1 = alloc->make<LiteralString>(next.location,
                                                           next.fodder,
                                                           next.data32(),
                                                           LiteralString::VERBATIM_SINGLE,
                                                           "",
                                                           "");
                    } else if (next.kind == Token::VERBATIM_STRING_DOUBLE) {
                        kind = ObjectField::FIELD_STR;
                        expr1 = alloc->make<LiteralString>(next.location,
                                                           next.fodder,
                                                           next.data32(),
                                                           LiteralString::VERBATIM_DOUBLE,
                                                           "",
                                                           "");
                    } else {
                        kind = ObjectField::FIELD_EXPR;
                        fodder1 = next.fodder;
                        expr1 = parse(MAX_PRECEDENCE);
                        Token bracket_r = popExpect(Token::BRACKET_R);
                        fodder2 = bracket_r.fodder;
                    }

                    bool is_method = false;
                    bool meth_comma = false;
                    ArgParams params;
                    Fodder fodder_l;
                    Fodder fodder_r;
                    if (peek().kind == Token::PAREN_L) {
                        Token paren_l = pop();
                        fodder_l = paren_l.fodder;
                        params = parseParams("method parameter", meth_comma, fodder_r);
                        is_method = true;
                    }

                    bool plus_sugar = false;

                    Token op = popExpect(Token::OPERATOR);
                    const char *od = op.data.c_str();
                    if (*od == '+') {
                        plus_sugar = true;
                        od++;
                    }
                    unsigned colons = 0;
                    for (; *od != '\0'; ++od) {
                        if (*od != ':') {
                            throw StaticError(
                                next.location,
                                "expected one of :, ::, :::, +:, +::, +:::, got: " + op.data);
                        }
                        ++colons;
                    }
                    ObjectField::Hide field_hide;
                    switch (colons) {
                        case 1: field_hide = ObjectField::INHERIT; break;

                        case 2: field_hide = ObjectField::HIDDEN; break;

                        case 3: field_hide = ObjectField::VISIBLE; break;

                        default:
                            throw StaticError(
                                next.location,
                                "expected one of :, ::, :::, +:, +::, +:::, got: " + op.data);
                    }

                    // Basic checks for invalid Jsonnet code.
                    if (is_method && plus_sugar) {
                        throw StaticError(next.location,
                                          "cannot use +: syntax sugar in a method: " + next.data);
                    }
                    if (kind != ObjectField::FIELD_EXPR) {
                        if (!literal_fields.insert(next.data).second) {
                            throw StaticError(next.location, "duplicate field: " + next.data);
                        }
                    }

                    AST *body = parse(MAX_PRECEDENCE);

                    Fodder comma_fodder;
                    next = pop();
                    if (next.kind == Token::COMMA) {
                        comma_fodder = next.fodder;
                        next = pop();
                        got_comma = true;
                    }
                    fields.emplace_back(kind,
                                        fodder1,
                                        fodder2,
                                        fodder_l,
                                        fodder_r,
                                        field_hide,
                                        plus_sugar,
                                        is_method,
                                        expr1,
                                        id,
                                        params,
                                        meth_comma,
                                        op.fodder,
                                        body,
                                        nullptr,
                                        comma_fodder);
                } break;

                case Token::LOCAL: {
                    Fodder local_fodder = next.fodder;
                    Token var_id = popExpect(Token::IDENTIFIER);
                    auto *id = alloc->makeIdentifier(var_id.data32());

                    if (binds.find(id) != binds.end()) {
                        throw StaticError(var_id.location, "duplicate local var: " + var_id.data);
                    }
                    bool is_method = false;
                    bool func_comma = false;
                    ArgParams params;
                    Fodder paren_l_fodder;
                    Fodder paren_r_fodder;
                    if (peek().kind == Token::PAREN_L) {
                        Token paren_l = pop();
                        paren_l_fodder = paren_l.fodder;
                        is_method = true;
                        params = parseParams("function parameter", func_comma, paren_r_fodder);
                    }
                    Token eq = popExpect(Token::OPERATOR, "=");
                    AST *body = parse(MAX_PRECEDENCE);
                    binds.insert(id);

                    Fodder comma_fodder;
                    next = pop();
                    if (next.kind == Token::COMMA) {
                        comma_fodder = next.fodder;
                        next = pop();
                        got_comma = true;
                    }
                    fields.push_back(ObjectField::Local(local_fodder,
                                                        var_id.fodder,
                                                        paren_l_fodder,
                                                        paren_r_fodder,
                                                        is_method,
                                                        id,
                                                        params,
                                                        func_comma,
                                                        eq.fodder,
                                                        body,
                                                        comma_fodder));

                } break;

                case Token::ASSERT: {
                    Fodder assert_fodder = next.fodder;
                    AST *cond = parse(MAX_PRECEDENCE);
                    AST *msg = nullptr;
                    Fodder colon_fodder;
                    if (peek().kind == Token::OPERATOR && peek().data == ":") {
                        Token colon = pop();
                        colon_fodder = colon.fodder;
                        msg = parse(MAX_PRECEDENCE);
                    }

                    Fodder comma_fodder;
                    next = pop();
                    if (next.kind == Token::COMMA) {
                        comma_fodder = next.fodder;
                        next = pop();
                        got_comma = true;
                    }
                    fields.push_back(
                        ObjectField::Assert(assert_fodder, cond, colon_fodder, msg, comma_fodder));
                } break;

                default: throw unexpected(next, "parsing field definition");
            }

        } while (true);
    }

    /** parses for x in expr for y in expr if expr for z in expr ... */
    Token parseComprehensionSpecs(Token::Kind end, Fodder for_fodder,
                                  std::vector<ComprehensionSpec> &specs)
    {
        while (true) {
            LocationRange l;
            Token id_token = popExpect(Token::IDENTIFIER);
            const Identifier *id = alloc->makeIdentifier(id_token.data32());
            Token in_token = popExpect(Token::IN);
            AST *arr = parse(MAX_PRECEDENCE);
            specs.emplace_back(
                ComprehensionSpec::FOR, for_fodder, id_token.fodder, id, in_token.fodder, arr);

            Token maybe_if = pop();
            for (; maybe_if.kind == Token::IF; maybe_if = pop()) {
                AST *cond = parse(MAX_PRECEDENCE);
                specs.emplace_back(
                    ComprehensionSpec::IF, maybe_if.fodder, Fodder{}, nullptr, Fodder{}, cond);
            }
            if (maybe_if.kind == end) {
                return maybe_if;
            }
            if (maybe_if.kind != Token::FOR) {
                std::stringstream ss;
                ss << "expected for, if or " << end << " after for clause, got: " << maybe_if;
                throw StaticError(maybe_if.location, ss.str());
            }
            for_fodder = maybe_if.fodder;
        }
    }

    AST *parseTerminalBracketsOrUnary(void)
    {
        Token tok = pop();
        switch (tok.kind) {
            case Token::ASSERT:
            case Token::BRACE_R:
            case Token::BRACKET_R:
            case Token::COMMA:
            case Token::DOT:
            case Token::ELSE:
            case Token::ERROR:
            case Token::FOR:
            case Token::FUNCTION:
            case Token::IF:
            case Token::IN:
            case Token::IMPORT:
            case Token::IMPORTSTR:
            case Token::LOCAL:
            case Token::PAREN_R:
            case Token::SEMICOLON:
            case Token::TAILSTRICT:
            case Token::THEN: throw unexpected(tok, "parsing terminal");

            case Token::END_OF_FILE: throw StaticError(tok.location, "unexpected end of file.");

            case Token::OPERATOR: {
                UnaryOp uop;
                if (!op_is_unary(tok.data, uop)) {
                    std::stringstream ss;
                    ss << "not a unary operator: " << tok.data;
                    throw StaticError(tok.location, ss.str());
                }
                AST *expr = parse(UNARY_PRECEDENCE);
                return alloc->make<Unary>(span(tok, expr), tok.fodder, uop, expr);
            }
            case Token::BRACE_L: {
                AST *obj;
                parseObjectRemainder(obj, tok);
                return obj;
            }

            case Token::BRACKET_L: {
                Token next = peek();
                if (next.kind == Token::BRACKET_R) {
                    Token bracket_r = pop();
                    return alloc->make<Array>(
                        span(tok, next), tok.fodder, Array::Elements{}, false, bracket_r.fodder);
                }
                AST *first = parse(MAX_PRECEDENCE);
                bool got_comma = false;
                Fodder comma_fodder;
                next = peek();
                if (!got_comma && next.kind == Token::COMMA) {
                    Token comma = pop();
                    comma_fodder = comma.fodder;
                    next = peek();
                    got_comma = true;
                }

                if (next.kind == Token::FOR) {
                    // It's a comprehension
                    Token for_token = pop();
                    std::vector<ComprehensionSpec> specs;
                    Token last = parseComprehensionSpecs(Token::BRACKET_R, for_token.fodder, specs);
                    return alloc->make<ArrayComprehension>(span(tok, last),
                                                           tok.fodder,
                                                           first,
                                                           comma_fodder,
                                                           got_comma,
                                                           specs,
                                                           last.fodder);
                }

                // Not a comprehension: It can have more elements.
                Array::Elements elements;
                elements.emplace_back(first, comma_fodder);
                do {
                    if (next.kind == Token::BRACKET_R) {
                        Token bracket_r = pop();
                        return alloc->make<Array>(
                            span(tok, next), tok.fodder, elements, got_comma, bracket_r.fodder);
                    }
                    if (!got_comma) {
                        std::stringstream ss;
                        ss << "expected a comma before next array element.";
                        throw StaticError(next.location, ss.str());
                    }
                    AST *expr = parse(MAX_PRECEDENCE);
                    comma_fodder.clear();
                    got_comma = false;
                    next = peek();
                    if (next.kind == Token::COMMA) {
                        Token comma = pop();
                        comma_fodder = comma.fodder;
                        next = peek();
                        got_comma = true;
                    }
                    elements.emplace_back(expr, comma_fodder);
                } while (true);
            }

            case Token::PAREN_L: {
                auto *inner = parse(MAX_PRECEDENCE);
                Token close = popExpect(Token::PAREN_R);
                return alloc->make<Parens>(span(tok, close), tok.fodder, inner, close.fodder);
            }

            // Literals
            case Token::NUMBER: return alloc->make<LiteralNumber>(span(tok), tok.fodder, tok.data);

            case Token::STRING_SINGLE:
                return alloc->make<LiteralString>(
                    span(tok), tok.fodder, tok.data32(), LiteralString::SINGLE, "", "");
            case Token::STRING_DOUBLE:
                return alloc->make<LiteralString>(
                    span(tok), tok.fodder, tok.data32(), LiteralString::DOUBLE, "", "");
            case Token::STRING_BLOCK:
                return alloc->make<LiteralString>(span(tok),
                                                  tok.fodder,
                                                  tok.data32(),
                                                  LiteralString::BLOCK,
                                                  tok.stringBlockIndent,
                                                  tok.stringBlockTermIndent);
            case Token::VERBATIM_STRING_SINGLE:
                return alloc->make<LiteralString>(
                    span(tok), tok.fodder, tok.data32(), LiteralString::VERBATIM_SINGLE, "", "");
            case Token::VERBATIM_STRING_DOUBLE:
                return alloc->make<LiteralString>(
                    span(tok), tok.fodder, tok.data32(), LiteralString::VERBATIM_DOUBLE, "", "");

            case Token::FALSE: return alloc->make<LiteralBoolean>(span(tok), tok.fodder, false);

            case Token::TRUE: return alloc->make<LiteralBoolean>(span(tok), tok.fodder, true);

            case Token::NULL_LIT: return alloc->make<LiteralNull>(span(tok), tok.fodder);

            // Variables
            case Token::DOLLAR: return alloc->make<Dollar>(span(tok), tok.fodder);

            case Token::IDENTIFIER:
                return alloc->make<Var>(span(tok), tok.fodder, alloc->makeIdentifier(tok.data32()));

            case Token::SELF: return alloc->make<Self>(span(tok), tok.fodder);

            case Token::SUPER: {
                Token next = pop();
                AST *index = nullptr;
                const Identifier *id = nullptr;
                Fodder id_fodder;
                switch (next.kind) {
                    case Token::DOT: {
                        Token field_id = popExpect(Token::IDENTIFIER);
                        id_fodder = field_id.fodder;
                        id = alloc->makeIdentifier(field_id.data32());
                    } break;
                    case Token::BRACKET_L: {
                        index = parse(MAX_PRECEDENCE);
                        Token bracket_r = popExpect(Token::BRACKET_R);
                        id_fodder = bracket_r.fodder;  // Not id_fodder, but use the same var.
                    } break;
                    default: throw StaticError(tok.location, "expected . or [ after super.");
                }
                return alloc->make<SuperIndex>(
                    span(tok), tok.fodder, next.fodder, index, id_fodder, id);
            }
        }

        std::cerr << "INTERNAL ERROR: Unknown tok kind: " << tok.kind << std::endl;
        std::abort();
        return nullptr;  // Quiet, compiler.
    }

    // If the first token makes it clear that we will parsing a greedy construct, then return the
    // AST.  Otherwise, return nullptr.  Greedy constructs are those that consume as many tokens
    // as possible on the right hand side, because they have no closing token.
    AST *maybeParseGreedy(void)
    {
        // Allocate this on the heap to control stack growth.
        std::unique_ptr<Token> begin_(new Token(peek()));
        const Token &begin = *begin_;

        switch (begin.kind) {
            // These cases have effectively MAX_PRECEDENCE as the first
            // call to parse will parse them.
            case Token::ASSERT: {
                pop();
                AST *cond = parse(MAX_PRECEDENCE);
                Fodder colonFodder;
                AST *msg = nullptr;
                if (peek().kind == Token::OPERATOR && peek().data == ":") {
                    Token colon = pop();
                    colonFodder = colon.fodder;
                    msg = parse(MAX_PRECEDENCE);
                }
                Token semicolon = popExpect(Token::SEMICOLON);
                AST *rest = parse(MAX_PRECEDENCE);
                return alloc->make<Assert>(span(begin, rest),
                                           begin.fodder,
                                           cond,
                                           colonFodder,
                                           msg,
                                           semicolon.fodder,
                                           rest);
            }

            case Token::ERROR: {
                pop();
                AST *expr = parse(MAX_PRECEDENCE);
                return alloc->make<Error>(span(begin, expr), begin.fodder, expr);
            }

            case Token::IF: {
                pop();
                AST *cond = parse(MAX_PRECEDENCE);
                Token then = popExpect(Token::THEN);
                AST *branch_true = parse(MAX_PRECEDENCE);
                if (peek().kind == Token::ELSE) {
                    Token else_ = pop();
                    AST *branch_false = parse(MAX_PRECEDENCE);
                    return alloc->make<Conditional>(span(begin, branch_false),
                                                    begin.fodder,
                                                    cond,
                                                    then.fodder,
                                                    branch_true,
                                                    else_.fodder,
                                                    branch_false);
                }
                return alloc->make<Conditional>(span(begin, branch_true),
                                                begin.fodder,
                                                cond,
                                                then.fodder,
                                                branch_true,
                                                Fodder{},
                                                nullptr);
            }

            case Token::FUNCTION: {
                pop();  // Still available in 'begin'.
                Token paren_l = pop();
                if (paren_l.kind == Token::PAREN_L) {
                    std::vector<AST *> params_asts;
                    bool got_comma;
                    Fodder paren_r_fodder;
                    ArgParams params = parseParams("function parameter", got_comma, paren_r_fodder);
                    AST *body = parse(MAX_PRECEDENCE);
                    return alloc->make<Function>(span(begin, body),
                                                 begin.fodder,
                                                 paren_l.fodder,
                                                 params,
                                                 got_comma,
                                                 paren_r_fodder,
                                                 body);
                } else {
                    std::stringstream ss;
                    ss << "expected ( but got " << paren_l;
                    throw StaticError(paren_l.location, ss.str());
                }
            }

            case Token::IMPORT: {
                pop();
                AST *body = parse(MAX_PRECEDENCE);
                if (body->type == AST_LITERAL_STRING) {
                    auto *lit = static_cast<LiteralString *>(body);
                    if (lit->tokenKind == LiteralString::BLOCK) {
                        throw StaticError(lit->location,
                                          "Cannot use text blocks in import statements.");
                    }
                    return alloc->make<Import>(span(begin, body), begin.fodder, lit);
                } else {
                    std::stringstream ss;
                    ss << "computed imports are not allowed.";
                    throw StaticError(body->location, ss.str());
                }
            }

            case Token::IMPORTSTR: {
                pop();
                AST *body = parse(MAX_PRECEDENCE);
                if (body->type == AST_LITERAL_STRING) {
                    auto *lit = static_cast<LiteralString *>(body);
                    if (lit->tokenKind == LiteralString::BLOCK) {
                        throw StaticError(lit->location,
                                          "Cannot use text blocks in import statements.");
                    }
                    return alloc->make<Importstr>(span(begin, body), begin.fodder, lit);
                } else {
                    std::stringstream ss;
                    ss << "computed imports are not allowed.";
                    throw StaticError(body->location, ss.str());
                }
            }

            case Token::LOCAL: {
                pop();
                Local::Binds binds;
                do {
                    Token delim = parseBind(binds);
                    if (delim.kind != Token::SEMICOLON && delim.kind != Token::COMMA) {
                        std::stringstream ss;
                        ss << "expected , or ; but got " << delim;
                        throw StaticError(delim.location, ss.str());
                    }
                    if (delim.kind == Token::SEMICOLON)
                        break;
                } while (true);
                AST *body = parse(MAX_PRECEDENCE);
                return alloc->make<Local>(span(begin, body), begin.fodder, binds, body);
            }

            default:
            return nullptr;
        }
    }

    // Parse a general expression.
    //
    // Consume infix tokens up to (but not including) max_precedence, then stop.
    AST *parse(unsigned max_precedence)
    {
        AST *ast = maybeParseGreedy();
        // There cannot be an operator after a greedy parse.
        if (ast != nullptr) return ast;

        // If we get here, we could be parsing an infix construct.

        // Allocate this on the heap to control stack growth.
        std::unique_ptr<Token> begin_(new Token(peek()));
        const Token &begin = *begin_;

        AST *lhs = parseTerminalBracketsOrUnary();

        return parseInfix(lhs, begin, max_precedence);
    }

    AST *parseInfix(AST *lhs, const Token &begin, unsigned max_precedence)
    {
        while (true) {

            BinaryOp bop = BOP_PLUS;
            unsigned op_precedence = 0;

            switch (peek().kind) {
                // Logical / arithmetic binary operator.
                case Token::IN:
                case Token::OPERATOR:
                    // These occur if the outer statement was an assert or array slice.
                    // Either way, we terminate the parsing here.
                    if (peek().data == ":" || peek().data == "::") {
                        return lhs;
                    }
                    if (!op_is_binary(peek().data, bop)) {
                        std::stringstream ss;
                        ss << "not a binary operator: " << peek().data;
                        throw StaticError(peek().location, ss.str());
                    }
                    op_precedence = precedence_map[bop];
                    break;

                // Index, Apply
                case Token::DOT:
                case Token::BRACKET_L:
                case Token::PAREN_L:
                case Token::BRACE_L:
                    op_precedence = APPLY_PRECEDENCE;
                    break;

                default: 
                    // This happens when we reach EOF or the terminating token of an outer context.
                    return lhs;
            }

            // If higher precedence than the outer recursive call, let that handle it.
            if (op_precedence >= max_precedence)
                return lhs;

            Token op = pop();

            switch (op.kind) {
                case Token::BRACKET_L: {
                    bool is_slice;
                    AST *first = nullptr;
                    Fodder second_fodder;
                    AST *second = nullptr;
                    Fodder third_fodder;
                    AST *third = nullptr;

                    if (peek().kind == Token::BRACKET_R)
                        throw unexpected(pop(), "parsing index");

                    if (peek().data != ":" && peek().data != "::") {
                        first = parse(MAX_PRECEDENCE);
                    }

                    if (peek().kind == Token::OPERATOR && peek().data == "::") {
                        // Handle ::
                        is_slice = true;
                        Token joined = pop();
                        second_fodder = joined.fodder;

                        if (peek().kind != Token::BRACKET_R)
                            third = parse(MAX_PRECEDENCE);

                    } else if (peek().kind != Token::BRACKET_R) {
                        is_slice = true;
                        Token delim = pop();
                        if (delim.data != ":")
                            throw unexpected(delim, "parsing slice");

                        second_fodder = delim.fodder;

                        if (peek().data != ":" && peek().kind != Token::BRACKET_R)
                            second = parse(MAX_PRECEDENCE);

                        if (peek().kind != Token::BRACKET_R) {
                            Token delim = pop();
                            if (delim.data != ":")
                                throw unexpected(delim, "parsing slice");

                            third_fodder = delim.fodder;

                            if (peek().kind != Token::BRACKET_R)
                                third = parse(MAX_PRECEDENCE);
                        }
                    } else {
                        is_slice = false;
                    }
                    Token end = popExpect(Token::BRACKET_R);
                    lhs = alloc->make<Index>(span(begin, end),
                                             EMPTY_FODDER,
                                             lhs,
                                             op.fodder,
                                             is_slice,
                                             first,
                                             second_fodder,
                                             second,
                                             third_fodder,
                                             third,
                                             end.fodder);
                    break;
                }
                case Token::DOT: {
                    Token field_id = popExpect(Token::IDENTIFIER);
                    const Identifier *id = alloc->makeIdentifier(field_id.data32());
                    lhs = alloc->make<Index>(span(begin, field_id),
                                             EMPTY_FODDER,
                                             lhs,
                                             op.fodder,
                                             field_id.fodder,
                                             id);
                    break;
                }
                case Token::PAREN_L: {
                    ArgParams args;
                    bool got_comma;
                    Token end = parseArgs(args, Token::PAREN_R, "function argument", got_comma);
                    bool tailstrict = false;
                    Fodder tailstrict_fodder;
                    if (peek().kind == Token::TAILSTRICT) {
                        Token tailstrict_token = pop();
                        tailstrict_fodder = tailstrict_token.fodder;
                        tailstrict = true;
                    }
                    lhs = alloc->make<Apply>(span(begin, end),
                                             EMPTY_FODDER,
                                             lhs,
                                             op.fodder,
                                             args,
                                             got_comma,
                                             end.fodder,
                                             tailstrict_fodder,
                                             tailstrict);
                    break;
                }
                case Token::BRACE_L: {
                    AST *obj;
                    Token end = parseObjectRemainder(obj, op);
                    lhs = alloc->make<ApplyBrace>(span(begin, end), EMPTY_FODDER, lhs, obj);
                    break;
                }

                case Token::IN: {
                    if (peek().kind == Token::SUPER) {
                        Token super = pop();
                        lhs = alloc->make<InSuper>(
                            span(begin, super), EMPTY_FODDER, lhs, op.fodder, super.fodder);
                    } else {
                        AST *rhs = parse(op_precedence);
                        lhs = alloc->make<Binary>(
                            span(begin, rhs), EMPTY_FODDER, lhs, op.fodder, bop, rhs);
                    }
                    break;
                }

                case Token::OPERATOR: {
                    AST *rhs = parse(op_precedence);
                    lhs = alloc->make<Binary>(
                        span(begin, rhs), EMPTY_FODDER, lhs, op.fodder, bop, rhs);
                    break;
                }

                default: {
                    std::cerr << "Should not be here." << std::endl;
                    abort();
                }
            }
        }

        // (1 & ((1 + (1 * 1)) + 1)) & 1
        //
        //

/*
        // Allocate this on the heap to control stack growth.
        std::unique_ptr<Token> begin_(new Token(peek()));
        const Token &begin = *begin_;
*/
    }
};

}  // namespace

AST *jsonnet_parse(Allocator *alloc, Tokens &tokens)
{
    Parser parser(tokens, alloc);
    AST *expr = parser.parse(MAX_PRECEDENCE);
    if (tokens.front().kind != Token::END_OF_FILE) {
        std::stringstream ss;
        ss << "did not expect: " << tokens.front();
        throw StaticError(tokens.front().location, ss.str());
    }

    return expr;
}

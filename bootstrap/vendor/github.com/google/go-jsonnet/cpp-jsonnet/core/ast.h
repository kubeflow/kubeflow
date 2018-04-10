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

#ifndef JSONNET_AST_H
#define JSONNET_AST_H

#include <cassert>
#include <cstdlib>

#include <iostream>
#include <list>
#include <map>
#include <string>
#include <vector>

#include "lexer.h"
#include "unicode.h"

enum ASTType {
    AST_APPLY,
    AST_APPLY_BRACE,
    AST_ARRAY,
    AST_ARRAY_COMPREHENSION,
    AST_ARRAY_COMPREHENSION_SIMPLE,
    AST_ASSERT,
    AST_BINARY,
    AST_BUILTIN_FUNCTION,
    AST_CONDITIONAL,
    AST_DESUGARED_OBJECT,
    AST_DOLLAR,
    AST_ERROR,
    AST_FUNCTION,
    AST_IMPORT,
    AST_IMPORTSTR,
    AST_INDEX,
    AST_IN_SUPER,
    AST_LITERAL_BOOLEAN,
    AST_LITERAL_NULL,
    AST_LITERAL_NUMBER,
    AST_LITERAL_STRING,
    AST_LOCAL,
    AST_OBJECT,
    AST_OBJECT_COMPREHENSION,
    AST_OBJECT_COMPREHENSION_SIMPLE,
    AST_PARENS,
    AST_SELF,
    AST_SUPER_INDEX,
    AST_UNARY,
    AST_VAR
};

static inline std::string ASTTypeToString(ASTType type)
{
    switch (type) {
        case AST_APPLY: return "AST_APPLY";
        case AST_APPLY_BRACE: return "AST_APPLY_BRACE";
        case AST_ARRAY: return "AST_ARRAY";
        case AST_ARRAY_COMPREHENSION: return "AST_ARRAY_COMPREHENSION";
        case AST_ARRAY_COMPREHENSION_SIMPLE: return "AST_ARRAY_COMPREHENSION_SIMPLE";
        case AST_ASSERT: return "AST_ASSERT";
        case AST_BINARY: return "AST_BINARY";
        case AST_BUILTIN_FUNCTION: return "AST_BUILTIN_FUNCTION";
        case AST_CONDITIONAL: return "AST_CONDITIONAL";
        case AST_DESUGARED_OBJECT: return "AST_DESUGARED_OBJECT";
        case AST_DOLLAR: return "AST_DOLLAR";
        case AST_ERROR: return "AST_ERROR";
        case AST_FUNCTION: return "AST_FUNCTION";
        case AST_IMPORT: return "AST_IMPORT";
        case AST_IMPORTSTR: return "AST_IMPORTSTR";
        case AST_INDEX: return "AST_INDEX";
        case AST_IN_SUPER: return "AST_IN_SUPER";
        case AST_LITERAL_BOOLEAN: return "AST_LITERAL_BOOLEAN";
        case AST_LITERAL_NULL: return "AST_LITERAL_NULL";
        case AST_LITERAL_NUMBER: return "AST_LITERAL_NUMBER";
        case AST_LITERAL_STRING: return "AST_LITERAL_STRING";
        case AST_LOCAL: return "AST_LOCAL";
        case AST_OBJECT: return "AST_OBJECT";
        case AST_OBJECT_COMPREHENSION: return "AST_OBJECT_COMPREHENSION";
        case AST_OBJECT_COMPREHENSION_SIMPLE: return "AST_OBJECT_COMPREHENSION_SIMPLE";
        case AST_PARENS: return "AST_PARENS";
        case AST_SELF: return "AST_SELF";
        case AST_SUPER_INDEX: return "AST_SUPER_INDEX";
        case AST_UNARY: return "AST_UNARY";
        case AST_VAR: return "AST_VAR";
    }
    std::cerr << "Invalid AST type"
              << "\n";
    abort();
}

/** Represents a variable / parameter / field name. */
struct Identifier {
    UString name;
    Identifier(const UString &name) : name(name) {}
};

static inline std::ostream &operator<<(std::ostream &o, const Identifier *id)
{
    o << encode_utf8(id->name);
    return o;
}

typedef std::vector<const Identifier *> Identifiers;

/** All AST nodes are subtypes of this class.
 */
struct AST {
    LocationRange location;
    ASTType type;
    Fodder openFodder;
    Identifiers freeVariables;
    AST(const LocationRange &location, ASTType type, const Fodder &open_fodder)
        : location(location), type(type), openFodder(open_fodder)
    {
    }
    virtual ~AST(void) {}
};

typedef std::list<AST *> ASTs;

/** Either an arg in a function apply, or a param in a closure / other function definition.
 *
 * They happen to have exactly the same structure.
 *
 * In the case of an arg, the id is optional and the expr is required.  Presence of the id indicates
 * that this is a named rather than positional argument.
 *
 * In the case of a param, the id is required and if expr is given, it is a default argument to be
 * used when no argument is bound to the param.
 */
struct ArgParam {
    Fodder idFodder;       // Empty if no id.
    const Identifier *id;  // nullptr if there isn't one
    Fodder eqFodder;       // Empty if no id or no expr.
    AST *expr;             // nullptr if there wasn't one.
    Fodder commaFodder;    // Before the comma (if there is a comma).
    // Only has id
    ArgParam(const Fodder &id_fodder, const Identifier *id, const Fodder &comma_fodder)
        : idFodder(id_fodder), id(id), expr(nullptr), commaFodder(comma_fodder)
    {
    }
    // Only has expr
    ArgParam(AST *expr, const Fodder &comma_fodder)
        : id(nullptr), expr(expr), commaFodder(comma_fodder)
    {
    }
    // Has both id and expr
    ArgParam(const Fodder &id_fodder, const Identifier *id, const Fodder &eq_fodder, AST *expr,
             const Fodder &comma_fodder)
        : idFodder(id_fodder), id(id), eqFodder(eq_fodder), expr(expr), commaFodder(comma_fodder)
    {
    }
};

typedef std::vector<ArgParam> ArgParams;

/** Used in Object & Array Comprehensions. */
struct ComprehensionSpec {
    enum Kind { FOR, IF };
    Kind kind;
    Fodder openFodder;
    Fodder varFodder;       // {} when kind != SPEC_FOR.
    const Identifier *var;  // Null when kind != SPEC_FOR.
    Fodder inFodder;        // {} when kind != SPEC_FOR.
    AST *expr;
    ComprehensionSpec(Kind kind, const Fodder &open_fodder, const Fodder &var_fodder,
                      const Identifier *var, const Fodder &in_fodder, AST *expr)
        : kind(kind),
          openFodder(open_fodder),
          varFodder(var_fodder),
          var(var),
          inFodder(in_fodder),
          expr(expr)
    {
    }
};

/** Represents function calls. */
struct Apply : public AST {
    AST *target;
    Fodder fodderL;
    ArgParams args;
    bool trailingComma;
    Fodder fodderR;
    Fodder tailstrictFodder;
    bool tailstrict;
    Apply(const LocationRange &lr, const Fodder &open_fodder, AST *target, const Fodder &fodder_l,
          const ArgParams &args, bool trailing_comma, const Fodder &fodder_r,
          const Fodder &tailstrict_fodder, bool tailstrict)
        : AST(lr, AST_APPLY, open_fodder),
          target(target),
          fodderL(fodder_l),
          args(args),
          trailingComma(trailing_comma),
          fodderR(fodder_r),
          tailstrictFodder(tailstrict_fodder),
          tailstrict(tailstrict)
    {
    }
};

/** Represents e { }.  Desugared to e + { }. */
struct ApplyBrace : public AST {
    AST *left;
    AST *right;  // This is always an object or object comprehension.
    ApplyBrace(const LocationRange &lr, const Fodder &open_fodder, AST *left, AST *right)
        : AST(lr, AST_APPLY_BRACE, open_fodder), left(left), right(right)
    {
    }
};

/** Represents array constructors [1, 2, 3]. */
struct Array : public AST {
    struct Element {
        AST *expr;
        Fodder commaFodder;
        Element(AST *expr, const Fodder &comma_fodder) : expr(expr), commaFodder(comma_fodder) {}
    };
    typedef std::vector<Element> Elements;
    Elements elements;
    bool trailingComma;
    Fodder closeFodder;
    Array(const LocationRange &lr, const Fodder &open_fodder, const Elements &elements,
          bool trailing_comma, const Fodder &close_fodder)
        : AST(lr, AST_ARRAY, open_fodder),
          elements(elements),
          trailingComma(trailing_comma),
          closeFodder(close_fodder)
    {
    }
};

/** Represents array comprehensions (which are like Python list comprehensions). */
struct ArrayComprehension : public AST {
    AST *body;
    Fodder commaFodder;
    bool trailingComma;
    std::vector<ComprehensionSpec> specs;
    Fodder closeFodder;
    ArrayComprehension(const LocationRange &lr, const Fodder &open_fodder, AST *body,
                       const Fodder &comma_fodder, bool trailing_comma,
                       const std::vector<ComprehensionSpec> &specs, const Fodder &close_fodder)
        : AST(lr, AST_ARRAY_COMPREHENSION, open_fodder),
          body(body),
          commaFodder(comma_fodder),
          trailingComma(trailing_comma),
          specs(specs),
          closeFodder(close_fodder)
    {
        assert(specs.size() > 0);
    }
};

/** Represents an assert expression (not an object-level assert).
 *
 * After parsing, message can be nullptr indicating that no message was specified. This AST is
 * elimiated by desugaring.
 */
struct Assert : public AST {
    AST *cond;
    Fodder colonFodder;
    AST *message;
    Fodder semicolonFodder;
    AST *rest;
    Assert(const LocationRange &lr, const Fodder &open_fodder, AST *cond,
           const Fodder &colon_fodder, AST *message, const Fodder &semicolon_fodder, AST *rest)
        : AST(lr, AST_ASSERT, open_fodder),
          cond(cond),
          colonFodder(colon_fodder),
          message(message),
          semicolonFodder(semicolon_fodder),
          rest(rest)
    {
    }
};

enum BinaryOp {
    BOP_MULT,
    BOP_DIV,
    BOP_PERCENT,

    BOP_PLUS,
    BOP_MINUS,

    BOP_SHIFT_L,
    BOP_SHIFT_R,

    BOP_GREATER,
    BOP_GREATER_EQ,
    BOP_LESS,
    BOP_LESS_EQ,
    BOP_IN,

    BOP_MANIFEST_EQUAL,
    BOP_MANIFEST_UNEQUAL,

    BOP_BITWISE_AND,
    BOP_BITWISE_XOR,
    BOP_BITWISE_OR,

    BOP_AND,
    BOP_OR
};

static inline std::string bop_string(BinaryOp bop)
{
    switch (bop) {
        case BOP_MULT: return "*";
        case BOP_DIV: return "/";
        case BOP_PERCENT: return "%";

        case BOP_PLUS: return "+";
        case BOP_MINUS: return "-";

        case BOP_SHIFT_L: return "<<";
        case BOP_SHIFT_R: return ">>";

        case BOP_GREATER: return ">";
        case BOP_GREATER_EQ: return ">=";
        case BOP_LESS: return "<";
        case BOP_LESS_EQ: return "<=";
        case BOP_IN: return "in";

        case BOP_MANIFEST_EQUAL: return "==";
        case BOP_MANIFEST_UNEQUAL: return "!=";

        case BOP_BITWISE_AND: return "&";
        case BOP_BITWISE_XOR: return "^";
        case BOP_BITWISE_OR: return "|";

        case BOP_AND: return "&&";
        case BOP_OR: return "||";

        default:
            std::cerr << "INTERNAL ERROR: Unrecognised binary operator: " << bop << std::endl;
            std::abort();
    }
}

/** Represents binary operators. */
struct Binary : public AST {
    AST *left;
    Fodder opFodder;
    BinaryOp op;
    AST *right;
    Binary(const LocationRange &lr, const Fodder &open_fodder, AST *left, const Fodder &op_fodder,
           BinaryOp op, AST *right)
        : AST(lr, AST_BINARY, open_fodder), left(left), opFodder(op_fodder), op(op), right(right)
    {
    }
};

/** Represents built-in functions.
 *
 * There is no parse rule to build this AST.  Instead, it is used to build the std object in the
 * interpreter.
 */
struct BuiltinFunction : public AST {
    std::string name;
    Identifiers params;
    BuiltinFunction(const LocationRange &lr, const std::string &name, const Identifiers &params)
        : AST(lr, AST_BUILTIN_FUNCTION, Fodder{}), name(name), params(params)
    {
    }
};

/** Represents if then else.
 *
 * After parsing, branchFalse can be nullptr indicating that no else branch was specified.  The
 * desugarer fills this in with a LiteralNull.
 */
struct Conditional : public AST {
    AST *cond;
    Fodder thenFodder;
    AST *branchTrue;
    Fodder elseFodder;
    AST *branchFalse;
    Conditional(const LocationRange &lr, const Fodder &open_fodder, AST *cond,
                const Fodder &then_fodder, AST *branch_true, const Fodder &else_fodder,
                AST *branch_false)
        : AST(lr, AST_CONDITIONAL, open_fodder),
          cond(cond),
          thenFodder(then_fodder),
          branchTrue(branch_true),
          elseFodder(else_fodder),
          branchFalse(branch_false)
    {
    }
};

/** Represents the $ keyword. */
struct Dollar : public AST {
    Dollar(const LocationRange &lr, const Fodder &open_fodder) : AST(lr, AST_DOLLAR, open_fodder) {}
};

/** Represents error e. */
struct Error : public AST {
    AST *expr;
    Error(const LocationRange &lr, const Fodder &open_fodder, AST *expr)
        : AST(lr, AST_ERROR, open_fodder), expr(expr)
    {
    }
};

/** Represents closures. */
struct Function : public AST {
    Fodder parenLeftFodder;
    ArgParams params;
    bool trailingComma;
    Fodder parenRightFodder;
    AST *body;
    Function(const LocationRange &lr, const Fodder &open_fodder, const Fodder &paren_left_fodder,
             const ArgParams &params, bool trailing_comma, const Fodder &paren_right_fodder,
             AST *body)
        : AST(lr, AST_FUNCTION, open_fodder),
          parenLeftFodder(paren_left_fodder),
          params(params),
          trailingComma(trailing_comma),
          parenRightFodder(paren_right_fodder),
          body(body)
    {
    }
};

struct LiteralString;

/** Represents import "file". */
struct Import : public AST {
    LiteralString *file;
    Import(const LocationRange &lr, const Fodder &open_fodder, LiteralString *file)
        : AST(lr, AST_IMPORT, open_fodder), file(file)
    {
    }
};

/** Represents importstr "file". */
struct Importstr : public AST {
    LiteralString *file;
    Importstr(const LocationRange &lr, const Fodder &open_fodder, LiteralString *file)
        : AST(lr, AST_IMPORTSTR, open_fodder), file(file)
    {
    }
};

/** Represents both e[e] and the syntax sugar e.f.
 *
 * One of index and id will be nullptr before desugaring.  After desugaring id will be nullptr.
 */
struct Index : public AST {
    AST *target;
    Fodder dotFodder;  // When index is being used, this is the fodder before the [.
    bool isSlice;
    AST *index;
    Fodder endColonFodder;  // When end is being used, this is the fodder before the :.
    AST *end;
    Fodder stepColonFodder;  // When step is being used, this is the fodder before the :.
    AST *step;
    Fodder idFodder;  // When index is being used, this is the fodder before the ].
    const Identifier *id;
    // Use this constructor for e.f
    Index(const LocationRange &lr, const Fodder &open_fodder, AST *target, const Fodder &dot_fodder,
          const Fodder &id_fodder, const Identifier *id)
        : AST(lr, AST_INDEX, open_fodder),
          target(target),
          dotFodder(dot_fodder),
          isSlice(false),
          index(nullptr),
          end(nullptr),
          step(nullptr),
          idFodder(id_fodder),
          id(id)
    {
    }
    // Use this constructor for e[x:y:z] with nullptr for index, end or step if not present.
    Index(const LocationRange &lr, const Fodder &open_fodder, AST *target, const Fodder &dot_fodder,
          bool is_slice, AST *index, const Fodder &end_colon_fodder, AST *end,
          const Fodder &step_colon_fodder, AST *step, const Fodder &id_fodder)
        : AST(lr, AST_INDEX, open_fodder),
          target(target),
          dotFodder(dot_fodder),
          isSlice(is_slice),
          index(index),
          endColonFodder(end_colon_fodder),
          end(end),
          stepColonFodder(step_colon_fodder),
          step(step),
          idFodder(id_fodder),
          id(nullptr)
    {
    }
};

/** Represents local x = e; e.  After desugaring, functionSugar is false. */
struct Local : public AST {
    struct Bind {
        Fodder varFodder;
        const Identifier *var;
        Fodder opFodder;
        AST *body;
        bool functionSugar;
        Fodder parenLeftFodder;
        ArgParams params;  // If functionSugar == true
        bool trailingComma;
        Fodder parenRightFodder;
        Fodder closeFodder;
        Bind(const Fodder &var_fodder, const Identifier *var, const Fodder &op_fodder, AST *body,
             bool function_sugar, const Fodder &paren_left_fodder, const ArgParams &params,
             bool trailing_comma, const Fodder &paren_right_fodder, const Fodder &close_fodder)
            : varFodder(var_fodder),
              var(var),
              opFodder(op_fodder),
              body(body),
              functionSugar(function_sugar),
              parenLeftFodder(paren_left_fodder),
              params(params),
              trailingComma(trailing_comma),
              parenRightFodder(paren_right_fodder),
              closeFodder(close_fodder)
        {
        }
    };
    typedef std::vector<Bind> Binds;
    Binds binds;
    AST *body;
    Local(const LocationRange &lr, const Fodder &open_fodder, const Binds &binds, AST *body)
        : AST(lr, AST_LOCAL, open_fodder), binds(binds), body(body)
    {
    }
};

/** Represents true and false. */
struct LiteralBoolean : public AST {
    bool value;
    LiteralBoolean(const LocationRange &lr, const Fodder &open_fodder, bool value)
        : AST(lr, AST_LITERAL_BOOLEAN, open_fodder), value(value)
    {
    }
};

/** Represents the null keyword. */
struct LiteralNull : public AST {
    LiteralNull(const LocationRange &lr, const Fodder &open_fodder)
        : AST(lr, AST_LITERAL_NULL, open_fodder)
    {
    }
};

/** Represents JSON numbers. */
struct LiteralNumber : public AST {
    double value;
    std::string originalString;
    LiteralNumber(const LocationRange &lr, const Fodder &open_fodder, const std::string &str)
        : AST(lr, AST_LITERAL_NUMBER, open_fodder),
          value(strtod(str.c_str(), nullptr)),
          originalString(str)
    {
    }
};

/** Represents JSON strings. */
struct LiteralString : public AST {
    UString value;
    enum TokenKind { SINGLE, DOUBLE, BLOCK, VERBATIM_SINGLE, VERBATIM_DOUBLE };
    TokenKind tokenKind;
    std::string blockIndent;      // Only contains ' ' and '\t'.
    std::string blockTermIndent;  // Only contains ' ' and '\t'.
    LiteralString(const LocationRange &lr, const Fodder &open_fodder, const UString &value,
                  TokenKind token_kind, const std::string &block_indent,
                  const std::string &block_term_indent)
        : AST(lr, AST_LITERAL_STRING, open_fodder),
          value(value),
          tokenKind(token_kind),
          blockIndent(block_indent),
          blockTermIndent(block_term_indent)
    {
    }
};

struct ObjectField {
    // Depending on the kind of Jsonnet field, the fields of this C++ class are used for storing
    // different parts of the AST.
    enum Kind {

        // <fodder1> 'assert' <expr2>
        // [ <opFodder> : <expr3> ]
        // <commaFodder>
        ASSERT,

        // <fodder1> id
        // [ <fodderL> '(' <params> <fodderR> ')' ]
        // <opFodder> [+]:[:[:]] <expr2>
        // <commaFodder>
        FIELD_ID,

        // <fodder1> '[' <expr1> <fodder2> ']'
        // [ <fodderL> '(' <params> <fodderR> ')' ]
        // <opFodder> [+]:[:[:]] <expr2>
        // <commaFodder>
        FIELD_EXPR,

        // <expr1>
        // <fodderL> '(' <params> <fodderR> ')'
        // <opFodder> [+]:[:[:]] <expr2>
        // <commaFodder>
        FIELD_STR,

        // <fodder1> 'local' <fodder2> id
        // [ <fodderL> '(' <params> <fodderR> ')' ]
        // [ <opFodder> = <expr2> ]
        // <commaFodder>
        LOCAL,
    };

    // NOTE TO SELF: sort out fodder1-4, then modify desugarer (maybe) parser and unparser.

    enum Hide {
        HIDDEN,   // f:: e
        INHERIT,  // f: e
        VISIBLE,  // f::: e
    };
    enum Kind kind;
    Fodder fodder1, fodder2, fodderL, fodderR;
    enum Hide hide;    // (ignore if kind != FIELD_something
    bool superSugar;   // +:  (ignore if kind != FIELD_something)
    bool methodSugar;  // f(x, y, z): ...  (ignore if kind  == ASSERT)
    AST *expr1;        // Not in scope of the object
    const Identifier *id;
    ArgParams params;    // If methodSugar == true then holds the params.
    bool trailingComma;  // If methodSugar == true then remembers the trailing comma.
    Fodder opFodder;     // Before the : or =
    AST *expr2, *expr3;  // In scope of the object (can see self).
    Fodder commaFodder;  // If this field is followed by a comma, this is its fodder.

    ObjectField(enum Kind kind, const Fodder &fodder1, const Fodder &fodder2,
                const Fodder &fodder_l, const Fodder &fodder_r, enum Hide hide, bool super_sugar,
                bool method_sugar, AST *expr1, const Identifier *id, const ArgParams &params,
                bool trailing_comma, const Fodder &op_fodder, AST *expr2, AST *expr3,
                const Fodder &comma_fodder)
        : kind(kind),
          fodder1(fodder1),
          fodder2(fodder2),
          fodderL(fodder_l),
          fodderR(fodder_r),
          hide(hide),
          superSugar(super_sugar),
          methodSugar(method_sugar),
          expr1(expr1),
          id(id),
          params(params),
          trailingComma(trailing_comma),
          opFodder(op_fodder),
          expr2(expr2),
          expr3(expr3),
          commaFodder(comma_fodder)
    {
        // Enforce what is written in comments above.
        assert(kind != ASSERT || (hide == VISIBLE && !superSugar && !methodSugar));
        assert(kind != LOCAL || (hide == VISIBLE && !superSugar));
        assert(kind != FIELD_ID || (id != nullptr && expr1 == nullptr));
        assert(kind == FIELD_ID || kind == LOCAL || id == nullptr);
        assert(methodSugar || (params.size() == 0 && !trailingComma));
        assert(kind == ASSERT || expr3 == nullptr);
    }
    // For when we don't know if it's a function or not.
    static ObjectField Local(const Fodder &fodder1, const Fodder &fodder2, const Fodder &fodder_l,
                             const Fodder &fodder_r, bool method_sugar, const Identifier *id,
                             const ArgParams &params, bool trailing_comma, const Fodder &op_fodder,
                             AST *body, const Fodder &comma_fodder)
    {
        return ObjectField(LOCAL,
                           fodder1,
                           fodder2,
                           fodder_l,
                           fodder_r,
                           VISIBLE,
                           false,
                           method_sugar,
                           nullptr,
                           id,
                           params,
                           trailing_comma,
                           op_fodder,
                           body,
                           nullptr,
                           comma_fodder);
    }
    static ObjectField Local(const Fodder &fodder1, const Fodder &fodder2, const Identifier *id,
                             const Fodder &op_fodder, AST *body, const Fodder &comma_fodder)
    {
        return ObjectField(LOCAL,
                           fodder1,
                           fodder2,
                           Fodder{},
                           Fodder{},
                           VISIBLE,
                           false,
                           false,
                           nullptr,
                           id,
                           ArgParams{},
                           false,
                           op_fodder,
                           body,
                           nullptr,
                           comma_fodder);
    }
    static ObjectField LocalMethod(const Fodder &fodder1, const Fodder &fodder2,
                                   const Fodder &fodder_l, const Fodder &fodder_r,
                                   const Identifier *id, const ArgParams &params,
                                   bool trailing_comma, const Fodder &op_fodder, AST *body,
                                   const Fodder &comma_fodder)
    {
        return ObjectField(LOCAL,
                           fodder1,
                           fodder2,
                           fodder_l,
                           fodder_r,
                           VISIBLE,
                           false,
                           true,
                           nullptr,
                           id,
                           params,
                           trailing_comma,
                           op_fodder,
                           body,
                           nullptr,
                           comma_fodder);
    }
    static ObjectField Assert(const Fodder &fodder1, AST *body, const Fodder &op_fodder, AST *msg,
                              const Fodder &comma_fodder)
    {
        return ObjectField(ASSERT,
                           fodder1,
                           Fodder{},
                           Fodder{},
                           Fodder{},
                           VISIBLE,
                           false,
                           false,
                           nullptr,
                           nullptr,
                           ArgParams{},
                           false,
                           op_fodder,
                           body,
                           msg,
                           comma_fodder);
    }
};
typedef std::vector<ObjectField> ObjectFields;

/** Represents object constructors { f: e ... }.
 *
 * The trailing comma is only allowed if fields.size() > 0.  Converted to DesugaredObject during
 * desugaring.
 */
struct Object : public AST {
    ObjectFields fields;
    bool trailingComma;
    Fodder closeFodder;
    Object(const LocationRange &lr, const Fodder &open_fodder, const ObjectFields &fields,
           bool trailing_comma, const Fodder &close_fodder)
        : AST(lr, AST_OBJECT, open_fodder),
          fields(fields),
          trailingComma(trailing_comma),
          closeFodder(close_fodder)
    {
        assert(fields.size() > 0 || !trailing_comma);
        if (fields.size() > 0)
            assert(trailing_comma || fields[fields.size() - 1].commaFodder.size() == 0);
    }
};

/** Represents object constructors { f: e ... } after desugaring.
 *
 * The assertions either return true or raise an error.
 */
struct DesugaredObject : public AST {
    struct Field {
        enum ObjectField::Hide hide;
        AST *name;
        AST *body;
        Field(enum ObjectField::Hide hide, AST *name, AST *body)
            : hide(hide), name(name), body(body)
        {
        }
    };
    typedef std::vector<Field> Fields;
    ASTs asserts;
    Fields fields;
    DesugaredObject(const LocationRange &lr, const ASTs &asserts, const Fields &fields)
        : AST(lr, AST_DESUGARED_OBJECT, Fodder{}), asserts(asserts), fields(fields)
    {
    }
};

/** Represents object comprehension { [e]: e for x in e for.. if... }. */
struct ObjectComprehension : public AST {
    ObjectFields fields;
    bool trailingComma;
    std::vector<ComprehensionSpec> specs;
    Fodder closeFodder;
    ObjectComprehension(const LocationRange &lr, const Fodder &open_fodder,
                        const ObjectFields &fields, bool trailing_comma,
                        const std::vector<ComprehensionSpec> &specs, const Fodder &close_fodder)

        : AST(lr, AST_OBJECT_COMPREHENSION, open_fodder),
          fields(fields),
          trailingComma(trailing_comma),
          specs(specs),
          closeFodder(close_fodder)
    {
    }
};

/** Represents post-desugaring object comprehension { [e]: e for x in e }. */
struct ObjectComprehensionSimple : public AST {
    AST *field;
    AST *value;
    const Identifier *id;
    AST *array;
    ObjectComprehensionSimple(const LocationRange &lr, AST *field, AST *value, const Identifier *id,
                              AST *array)
        : AST(lr, AST_OBJECT_COMPREHENSION_SIMPLE, Fodder{}),
          field(field),
          value(value),
          id(id),
          array(array)
    {
    }
};

/** Represents (e), which is desugared. */
struct Parens : public AST {
    AST *expr;
    Fodder closeFodder;
    Parens(const LocationRange &lr, const Fodder &open_fodder, AST *expr,
           const Fodder &close_fodder)
        : AST(lr, AST_PARENS, open_fodder), expr(expr), closeFodder(close_fodder)
    {
    }
};

/** Represents the self keyword. */
struct Self : public AST {
    Self(const LocationRange &lr, const Fodder &open_fodder) : AST(lr, AST_SELF, open_fodder) {}
};

/** Represents the super[e] and super.f constructs.
 *
 * Either index or identifier will be set before desugaring.  After desugaring, id will be
 * nullptr.
 */
struct SuperIndex : public AST {
    Fodder dotFodder;
    AST *index;
    Fodder idFodder;
    const Identifier *id;
    SuperIndex(const LocationRange &lr, const Fodder &open_fodder, const Fodder &dot_fodder,
               AST *index, const Fodder &id_fodder, const Identifier *id)
        : AST(lr, AST_SUPER_INDEX, open_fodder),
          dotFodder(dot_fodder),
          index(index),
          idFodder(id_fodder),
          id(id)
    {
    }
};

/** Represents the e in super construct.
 */
struct InSuper : public AST {
    AST *element;
    Fodder inFodder;
    Fodder superFodder;
    InSuper(const LocationRange &lr, const Fodder &open_fodder, AST *element,
            const Fodder &in_fodder, const Fodder &super_fodder)
        : AST(lr, AST_IN_SUPER, open_fodder),
          element(element),
          inFodder(in_fodder),
          superFodder(super_fodder)
    {
    }
};

enum UnaryOp { UOP_NOT, UOP_BITWISE_NOT, UOP_PLUS, UOP_MINUS };

static inline std::string uop_string(UnaryOp uop)
{
    switch (uop) {
        case UOP_PLUS: return "+";
        case UOP_MINUS: return "-";
        case UOP_BITWISE_NOT: return "~";
        case UOP_NOT: return "!";

        default:
            std::cerr << "INTERNAL ERROR: Unrecognised unary operator: " << uop << std::endl;
            std::abort();
    }
}

/** Represents unary operators. */
struct Unary : public AST {
    UnaryOp op;
    AST *expr;
    Unary(const LocationRange &lr, const Fodder &open_fodder, UnaryOp op, AST *expr)
        : AST(lr, AST_UNARY, open_fodder), op(op), expr(expr)
    {
    }
};

/** Represents variables. */
struct Var : public AST {
    const Identifier *id;
    Var(const LocationRange &lr, const Fodder &open_fodder, const Identifier *id)
        : AST(lr, AST_VAR, open_fodder), id(id)
    {
    }
};

/** Allocates ASTs on demand, frees them in its destructor.
 */
class Allocator {
    std::map<UString, const Identifier *> internedIdentifiers;
    ASTs allocated;

   public:
    template <class T, class... Args>
    T *make(Args &&... args)
    {
        auto r = new T(std::forward<Args>(args)...);
        allocated.push_back(r);
        return r;
    }

    template <class T>
    T *clone(T *ast)
    {
        auto r = new T(*ast);
        allocated.push_back(r);
        return r;
    }
    /** Returns interned identifiers.
     *
     * The location used in the Identifier AST is that of the first one parsed.
     */
    const Identifier *makeIdentifier(const UString &name)
    {
        auto it = internedIdentifiers.find(name);
        if (it != internedIdentifiers.end()) {
            return it->second;
        }
        auto r = new Identifier(name);
        internedIdentifiers[name] = r;
        return r;
    }
    ~Allocator()
    {
        for (auto x : allocated) {
            delete x;
        }
        allocated.clear();
        for (auto x : internedIdentifiers) {
            delete x.second;
        }
        internedIdentifiers.clear();
    }
};

namespace {

// Precedences used by various compilation units are defined here.
const int APPLY_PRECEDENCE = 2;         // Function calls and indexing.
const int UNARY_PRECEDENCE = 4;         // Logical and bitwise negation, unary + -
const int MAX_PRECEDENCE = 15;          // higher than any other precedence

/** These are the binary operator precedences, unary precedence is given by
 * UNARY_PRECEDENCE.
 */
std::map<BinaryOp, int> build_precedence_map(void)
{
    std::map<BinaryOp, int> r;

    r[BOP_MULT] = 5;
    r[BOP_DIV] = 5;
    r[BOP_PERCENT] = 5;

    r[BOP_PLUS] = 6;
    r[BOP_MINUS] = 6;

    r[BOP_SHIFT_L] = 7;
    r[BOP_SHIFT_R] = 7;

    r[BOP_GREATER] = 8;
    r[BOP_GREATER_EQ] = 8;
    r[BOP_LESS] = 8;
    r[BOP_LESS_EQ] = 8;
    r[BOP_IN] = 8;

    r[BOP_MANIFEST_EQUAL] = 9;
    r[BOP_MANIFEST_UNEQUAL] = 9;

    r[BOP_BITWISE_AND] = 10;

    r[BOP_BITWISE_XOR] = 11;

    r[BOP_BITWISE_OR] = 12;

    r[BOP_AND] = 13;

    r[BOP_OR] = 14;

    return r;
}

std::map<std::string, UnaryOp> build_unary_map(void)
{
    std::map<std::string, UnaryOp> r;
    r["!"] = UOP_NOT;
    r["~"] = UOP_BITWISE_NOT;
    r["+"] = UOP_PLUS;
    r["-"] = UOP_MINUS;
    return r;
}

std::map<std::string, BinaryOp> build_binary_map(void)
{
    std::map<std::string, BinaryOp> r;

    r["*"] = BOP_MULT;
    r["/"] = BOP_DIV;
    r["%"] = BOP_PERCENT;

    r["+"] = BOP_PLUS;
    r["-"] = BOP_MINUS;

    r["<<"] = BOP_SHIFT_L;
    r[">>"] = BOP_SHIFT_R;

    r[">"] = BOP_GREATER;
    r[">="] = BOP_GREATER_EQ;
    r["<"] = BOP_LESS;
    r["<="] = BOP_LESS_EQ;
    r["in"] = BOP_IN;

    r["=="] = BOP_MANIFEST_EQUAL;
    r["!="] = BOP_MANIFEST_UNEQUAL;

    r["&"] = BOP_BITWISE_AND;
    r["^"] = BOP_BITWISE_XOR;
    r["|"] = BOP_BITWISE_OR;

    r["&&"] = BOP_AND;
    r["||"] = BOP_OR;
    return r;
}

auto precedence_map = build_precedence_map();
auto unary_map = build_unary_map();
auto binary_map = build_binary_map();

}  // namespace

#endif  // JSONNET_AST_H

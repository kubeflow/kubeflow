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

#include "lexer.h"

#include <list>
#include "gtest/gtest.h"

namespace {

void testLex(const char* name, const char* input, const std::list<Token>& tokens,
             const std::string& error)
{
    std::list<Token> test_tokens(tokens);
    test_tokens.push_back(Token(Token::Kind::END_OF_FILE, ""));

    try {
        std::list<Token> lexed_tokens = jsonnet_lex(name, input);
        ASSERT_EQ(test_tokens, lexed_tokens) << "Test failed: " << name << std::endl;
    } catch (StaticError& e) {
        ASSERT_EQ(error, e.toString());
    }
}

TEST(Lexer, TestWhitespace)
{
    testLex("empty", "", {}, "");
    testLex("whitespace", "  \t\n\r\r\n", {}, "");
}

TEST(Lexer, TestOperators)
{
    testLex("brace L", "{", {Token(Token::Kind::BRACE_L, "")}, "");
    testLex("brace R", "}", {Token(Token::Kind::BRACE_R, "")}, "");
    testLex("bracket L", "[", {Token(Token::Kind::BRACKET_L, "")}, "");
    testLex("bracket R", "]", {Token(Token::Kind::BRACKET_R, "")}, "");
    testLex("colon ", ":", {Token(Token::Kind::OPERATOR, ":")}, "");
    testLex("colon 2", "::", {Token(Token::Kind::OPERATOR, "::")}, "");
    testLex("colon 2", ":::", {Token(Token::Kind::OPERATOR, ":::")}, "");
    testLex("arrow right", "->", {Token(Token::Kind::OPERATOR, "->")}, "");
    testLex("less than minus",
            "<-",
            {Token(Token::Kind::OPERATOR, "<"), Token(Token::Kind::OPERATOR, "-")},
            "");
    testLex("comma", ",", {Token(Token::Kind::COMMA, "")}, "");
    testLex("dollar", "$", {Token(Token::Kind::DOLLAR, "")}, "");
    testLex("dot", ".", {Token(Token::Kind::DOT, "")}, "");
    testLex("paren L", "(", {Token(Token::Kind::PAREN_L, "")}, "");
    testLex("paren R", ")", {Token(Token::Kind::PAREN_R, "")}, "");
    testLex("semicolon", ";", {Token(Token::Kind::SEMICOLON, "")}, "");

    testLex("not 1", "!", {Token(Token::Kind::OPERATOR, "!")}, "");
    testLex("not 2", "! ", {Token(Token::Kind::OPERATOR, "!")}, "");
    testLex("not equal", "!=", {Token(Token::Kind::OPERATOR, "!=")}, "");
    testLex("tilde", "~", {Token(Token::Kind::OPERATOR, "~")}, "");
    testLex("plus", "+", {Token(Token::Kind::OPERATOR, "+")}, "");
    testLex("minus", "-", {Token(Token::Kind::OPERATOR, "-")}, "");
}

TEST(Lexer, TestMiscOperators)
{
    testLex("op *", "*", {Token(Token::Kind::OPERATOR, "*")}, "");
    testLex("op /", "/", {Token(Token::Kind::OPERATOR, "/")}, "");
    testLex("op %", "%", {Token(Token::Kind::OPERATOR, "%")}, "");
    testLex("op &", "&", {Token(Token::Kind::OPERATOR, "&")}, "");
    testLex("op |", "|", {Token(Token::Kind::OPERATOR, "|")}, "");
    testLex("op ^", "^", {Token(Token::Kind::OPERATOR, "^")}, "");
    testLex("op =", "=", {Token(Token::Kind::OPERATOR, "=")}, "");
    testLex("op <", "<", {Token(Token::Kind::OPERATOR, "<")}, "");
    testLex("op >", ">", {Token(Token::Kind::OPERATOR, ">")}, "");
    testLex("op >==|", ">==|", {Token(Token::Kind::OPERATOR, ">==|")}, "");
}

TEST(Lexer, TestNumbers)
{
    testLex("number 0", "0", {Token(Token::Kind::NUMBER, "0")}, "");
    testLex("number 1", "1", {Token(Token::Kind::NUMBER, "1")}, "");
    testLex("number 1.0", "1.0", {Token(Token::Kind::NUMBER, "1.0")}, "");
    testLex("number 0.10", "0.10", {Token(Token::Kind::NUMBER, "0.10")}, "");
    testLex("number 0e100", "0e100", {Token(Token::Kind::NUMBER, "0e100")}, "");
    testLex("number 1e100", "1e100", {Token(Token::Kind::NUMBER, "1e100")}, "");
    testLex("number 1.1e100", "1.1e100", {Token(Token::Kind::NUMBER, "1.1e100")}, "");
    testLex("number 1.1e-100", "1.1e-100", {Token(Token::Kind::NUMBER, "1.1e-100")}, "");
    testLex("number 1.1e+100", "1.1e+100", {Token(Token::Kind::NUMBER, "1.1e+100")}, "");
    testLex("number 0100",
            "0100",
            {Token(Token::Kind::NUMBER, "0"), Token(Token::Kind::NUMBER, "100")},
            "");
    testLex("number 10+10",
            "10+10",
            {Token(Token::Kind::NUMBER, "10"),
             Token(Token::Kind::OPERATOR, "+"),
             Token(Token::Kind::NUMBER, "10")},
            "");
    testLex("number 1.+3",
            "1.+3",
            {},
            "number 1.+3:1:1: couldn't lex number, junk after decimal point: +");
    testLex("number 1e!", "1e!", {}, "number 1e!:1:1: couldn't lex number, junk after 'E': !");
    testLex("number 1e+!",
            "1e+!",
            {},
            "number 1e+!:1:1: couldn't lex number, junk after exponent sign: !");
}

TEST(Lexer, TestDoubleStrings)
{
    testLex("double string \"hi\"", "\"hi\"", {Token(Token::Kind::STRING_DOUBLE, "hi")}, "");
    testLex("double string \"hi nl\"", "\"hi\n\"", {Token(Token::Kind::STRING_DOUBLE, "hi\n")}, "");
    testLex("double string \"hi\\\"\"",
            "\"hi\\\"\"",
            {Token(Token::Kind::STRING_DOUBLE, "hi\\\"")},
            "");
    testLex("double string \"hi\\nl\"",
            "\"hi\\\n\"",
            {Token(Token::Kind::STRING_DOUBLE, "hi\\\n")},
            "");
    testLex("double string \"hi", "\"hi", {}, "double string \"hi:1:1: unterminated string");
}

TEST(Lexer, TestSingleStrings)
{
    testLex("single string 'hi'", "'hi'", {Token(Token::Kind::STRING_SINGLE, "hi")}, "");
    testLex("single string 'hi nl'", "'hi\n'", {Token(Token::Kind::STRING_SINGLE, "hi\n")}, "");
    testLex("single string 'hi\\''", "'hi\\''", {Token(Token::Kind::STRING_SINGLE, "hi\\'")}, "");
    testLex(
        "single string 'hi\\nl'", "'hi\\\n'", {Token(Token::Kind::STRING_SINGLE, "hi\\\n")}, "");
    testLex("single string 'hi", "'hi", {}, "single string 'hi:1:1: unterminated string");
}

TEST(Lexer, TestVerbatimDoubleStrings)
{
    testLex("verbatim double string @\"hi\"",
            "@\"hi\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "hi")},
            "");
    testLex("verbatim double string @\"hi nl\"",
            "@\"hi\n\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "hi\n")},
            "");
    testLex("verbatim double string @\"hi\\\"",
            "@\"hi\\\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "hi\\")},
            "");
    testLex("verbatim double string @\"hi\\\\\"",
            "@\"hi\\\\\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "hi\\\\")},
            "");
    testLex("verbatim double string @\"hi\"\"\"",
            "@\"hi\"\"\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "hi\"")},
            "");
    testLex("verbatim double string @\"\"\"hi\"",
            "@\"\"\"hi\"",
            {Token(Token::Kind::VERBATIM_STRING_DOUBLE, "\"hi")},
            "");
}

TEST(Lexer, TestVerbatimSingleStrings)
{
    testLex("verbatim single string @'hi'",
            "@'hi'",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "hi")},
            "");
    testLex("verbatim single string @'hi nl'",
            "@'hi\n'",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "hi\n")},
            "");
    testLex("verbatim single string @'hi\\'",
            "@'hi\\'",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "hi\\")},
            "");
    testLex("verbatim single string @'hi\\\\'",
            "@'hi\\\\'",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "hi\\\\")},
            "");
    testLex("verbatim single string @'hi'''",
            "@'hi'''",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "hi'")},
            "");
    testLex("verbatim single string @'''hi'",
            "@'''hi'",
            {Token(Token::Kind::VERBATIM_STRING_SINGLE, "'hi")},
            "");
}

TEST(Lexer, TestBlockStringSpaces)
{
    const char str[] =
        "|||\n"
        "  test\n"
        "    more\n"
        "  |||\n"
        "    foo\n"
        "|||";
    const Token token =
        Token(Token::Kind::STRING_BLOCK, {}, "test\n  more\n|||\n  foo\n", "  ", "", {});
    testLex("block string spaces", str, {token}, "");
}

TEST(Lexer, TestBlockStringTabs)
{
    const char str[] =
        "|||\n"
        "\ttest\n"
        "\t  more\n"
        "\t|||\n"
        "\t  foo\n"
        "|||";
    const Token token =
        Token(Token::Kind::STRING_BLOCK, {}, "test\n  more\n|||\n  foo\n", "\t", "", {});
    testLex("block string tabs", str, {token}, "");
}

TEST(Lexer, TestBlockStringsMixed)
{
    const char str[] =
        "|||\n"
        "\t  \ttest\n"
        "\t  \t  more\n"
        "\t  \t|||\n"
        "\t  \t  foo\n"
        "|||";
    const Token token =
        Token(Token::Kind::STRING_BLOCK, {}, "test\n  more\n|||\n  foo\n", "\t  \t", "", {});
    testLex("block string mixed", str, {token}, "");
}

TEST(Lexer, TestBlockStringBlanks)
{
    const char str[] =
        "|||\n\n"
        "  test\n\n\n"
        "    more\n"
        "  |||\n"
        "    foo\n"
        "|||";
    const Token token =
        Token(Token::Kind::STRING_BLOCK, {}, "\ntest\n\n\n  more\n|||\n  foo\n", "  ", "", {});
    testLex("block string blanks", str, {token}, "");
}

TEST(Lexer, TestBlockStringBadIndent)
{
    const char str[] =
        "|||\n"
        "  test\n"
        " foo\n"
        "|||";
    testLex("block string bad indent",
            str,
            {},
            "block string bad indent:1:1: text block not terminated with |||");
}

TEST(Lexer, TestBlockStringEof)
{
    const char str[] =
        "|||\n"
        "  test";
    testLex("block string eof", str, {}, "block string eof:1:1: unexpected EOF");
}

TEST(Lexer, TestBlockStringNotTerm)
{
    const char str[] =
        "|||\n"
        "  test\n";
    testLex("block string not term",
            str,
            {},
            "block string not term:1:1: text block not terminated with |||");
}

TEST(Lexer, TestBlockStringNoWs)
{
    const char str[] =
        "|||\n"
        "test\n"
        "|||";
    testLex("block string no ws",
            str,
            {},
            "block string no ws:1:1: text block's first line must start with"
            " whitespace.");
}

TEST(Lexer, TestKeywords)
{
    testLex("assert", "assert", {Token(Token::Kind::ASSERT, "assert")}, "");
    testLex("else", "else", {Token(Token::Kind::ELSE, "else")}, "");
    testLex("error", "error", {Token(Token::Kind::ERROR, "error")}, "");
    testLex("false", "false", {Token(Token::Kind::FALSE, "false")}, "");
    testLex("for", "for", {Token(Token::Kind::FOR, "for")}, "");
    testLex("function", "function", {Token(Token::Kind::FUNCTION, "function")}, "");
    testLex("if", "if", {Token(Token::Kind::IF, "if")}, "");
    testLex("import", "import", {Token(Token::Kind::IMPORT, "import")}, "");
    testLex("importstr", "importstr", {Token(Token::Kind::IMPORTSTR, "importstr")}, "");
    testLex("in", "in", {Token(Token::Kind::IN, "in")}, "");
    testLex("local", "local", {Token(Token::Kind::LOCAL, "local")}, "");
    testLex("null", "null", {Token(Token::Kind::NULL_LIT, "null")}, "");
    testLex("self", "self", {Token(Token::Kind::SELF, "self")}, "");
    testLex("super", "super", {Token(Token::Kind::SUPER, "super")}, "");
    testLex("tailstrict", "tailstrict", {Token(Token::Kind::TAILSTRICT, "tailstrict")}, "");
    testLex("then", "then", {Token(Token::Kind::THEN, "then")}, "");
    testLex("true", "true", {Token(Token::Kind::TRUE, "true")}, "");
}

TEST(Lexer, TestIdentifier)
{
    testLex("identifier", "foobar123", {Token(Token::Kind::IDENTIFIER, "foobar123")}, "");
    testLex("identifier",
            "foo bar123",
            {Token(Token::Kind::IDENTIFIER, "foo"), Token(Token::Kind::IDENTIFIER, "bar123")},
            "");
}

TEST(Lexer, TestComments)
{
    // TODO(dzc): Test does not look at fodder yet.
    testLex("c++ comment", "// hi", {}, "");
    testLex("hash comment", "# hi", {}, "");
    testLex("c comment", "/* hi */", {}, "");
    testLex("c comment no term",
            "/* hi",
            {},
            "c comment no term:1:1: multi-line comment has no terminating */.");
}

}  // namespace

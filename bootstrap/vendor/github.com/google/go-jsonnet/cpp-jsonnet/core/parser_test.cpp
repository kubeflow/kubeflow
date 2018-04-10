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

#include "parser.h"

#include <list>
#include "ast.h"
#include "gtest/gtest.h"
#include "lexer.h"

namespace {

// Checks whether the provided snippet parses successfully.
// TODO(dzc): Update this test to check the parsed AST against an expected AST.
void testParse(const char* snippet)
{
    try {
        std::list<Token> tokens = jsonnet_lex("test", snippet);
        Allocator allocator;
        AST* ast = jsonnet_parse(&allocator, tokens);
        (void)ast;
    } catch (StaticError& e) {
        ASSERT_TRUE(false) << "Static error: " << e.toString() << std::endl
                           << "Snippet:" << std::endl
                           << snippet << std::endl;
    }
}

TEST(Parser, TestLiterals)
{
    testParse("true");
    testParse("1");
    testParse("1.2e3");
    testParse("!true");
    testParse("null");
    testParse(R"("world")");
    testParse(R"("world")");
    testParse("|||\n   world\n|||");
}

TEST(Parser, TestExpressions)
{
    testParse("$.foo.bar");
    testParse("self.foo.bar");
    testParse("super.foo.bar");
    testParse("super[1]");
    testParse(R"(error "Error!")");

    testParse("foo(bar)");
    testParse("foo(bar) tailstrict");
    testParse("foo.bar");
    testParse("foo[bar]");

    testParse("true || false");
    testParse("0 && 1 || 0");
    testParse("0 && (1 || 0)");
}

TEST(Parser, TestLocal)
{
    testParse(R"(local foo = "bar"; foo)");
    testParse("local foo(bar) = bar; foo(1)");
    testParse(R"({ local foo = "bar", baz: 1})");
    testParse("{ local foo(bar) = bar, baz: foo(1)}");
}

TEST(Parser, TestArray)
{
    testParse("[]");
    testParse("[a, b, c]");
    testParse("[x for x in [1,2,3] ]");
    testParse("[x for x in [1,2,3] if x <= 2]");
    testParse("[x+y for x in [1,2,3] if x <= 2 for y in [4, 5, 6]]");
}

TEST(Parser, TestTuple)
{
    testParse("{ foo(bar, baz): bar+baz }");

    testParse(R"({ ["foo" + "bar"]: 3 })");
    testParse(R"({ ["field" + x]: x for x in [1, 2, 3] })");
    testParse(R"({ local y = x, ["field" + x]: x for x in [1, 2, 3] })");
    testParse(R"({ ["field" + x]: x for x in [1, 2, 3] if x <= 2 })");
    testParse(R"({ ["field" + x + y]:)"
              R"( x + y for x in [1, 2, 3] if x <= 2 for y in [4, 5, 6]})");

    testParse("{}");
    testParse(R"({ hello: "world" })");
    testParse(R"({ hello +: "world" })");
    testParse(R"({
  hello: "world",
  "name":: joe,
  'mood'::: "happy",
  |||
    key type
|||: "block",
})");

    testParse("assert true: 'woah!'; true");
    testParse("{ assert true: 'woah!', foo: bar }");

    testParse("if n > 1 then 'foos' else 'foo'");

    testParse("local foo = function(x) x + 1; true");

    testParse("import 'foo.jsonnet'");
    testParse("importstr 'foo.text'");

    testParse("{a: b} + {c: d}");
    testParse("{a: b}{c: d}");
}

void testParseError(const char* snippet, const std::string& expectedError)
{
    try {
        std::list<Token> tokens = jsonnet_lex("test", snippet);
        Allocator allocator;
        AST* ast = jsonnet_parse(&allocator, tokens);
        (void)ast;
    } catch (StaticError& e) {
        ASSERT_EQ(expectedError, e.toString()) << "Snippet:" << std::endl << snippet << std::endl;
    }
}

TEST(Parser, TestInvalidFunctionCall)
{
    testParseError("function(a, b c)",
                   "test:1:15: expected a comma before next function parameter.");
    testParseError("function(a, 1)", "test:1:13: could not parse parameter here.");
    testParseError("a b", R"(test:1:3: did not expect: (IDENTIFIER, "b"))");
    testParseError("foo(a, bar(a b))",
                   "test:1:14: expected a comma before next function argument.");
}

TEST(Parser, TestInvalidLocal)
{
    testParseError("local", "test:1:6: expected token IDENTIFIER but got end of file");
    testParseError("local foo = 1, foo = 2; true", "test:1:16-19: duplicate local var: foo");
    testParseError("local foo(a b) = a; true",
                   "test:1:13: expected a comma before next function parameter.");
    testParseError("local foo(a): a; true", "test:1:13: expected operator = but got :");
    testParseError("local foo(a) = bar(a b); true",
                   "test:1:22: expected a comma before next function argument.");
    testParseError("local foo: 1; true", "test:1:10: expected operator = but got :");
    testParseError("local foo = bar(a b); true",
                   "test:1:19: expected a comma before next function argument.");

    testParseError("local a = b ()", "test:1:15: expected , or ; but got end of file");
    testParseError("local a = b; (a b)",
                   R"_(test:1:17: expected token ")" but got (IDENTIFIER, "b"))_");
}

TEST(Parser, TestInvalidTuple)
{
    testParseError("{a b}",
                   R"(test:1:4: expected token OPERATOR but got (IDENTIFIER, "b"))");
    testParseError("{a = b}", "test:1:2: expected one of :, ::, :::, +:, +::, +:::, got: =");
    testParseError("{a :::: b}", "test:1:2: expected one of :, ::, :::, +:, +::, +:::, got: ::::");
}

TEST(Parser, TestInvalidComprehension)
{
    testParseError("{assert x for x in [1, 2, 3]}",
                   "test:1:11-14: object comprehension cannot have asserts.");
    testParseError("{['foo' + x]: true, [x]: x for x in [1, 2, 3]}",
                   "test:1:28-31: object comprehension can only have one field.");
    testParseError("{foo: x for x in [1, 2, 3]}",
                   "test:1:9-12: object comprehensions can only have [e] fields.");
    testParseError("{[x]:: true for x in [1, 2, 3]}",
                   "test:1:13-16: object comprehensions cannot have hidden fields.");
    testParseError("{[x]: true for 1 in [1, 2, 3]}",
                   R"(test:1:16: expected token IDENTIFIER but got (NUMBER, "1"))");
    testParseError("{[x]: true for x at [1, 2, 3]}",
                   R"(test:1:18-20: expected token in but got (IDENTIFIER, "at"))");
    testParseError("{[x]: true for x in [1, 2 3]}",
                   "test:1:27: expected a comma before next array element.");
    testParseError("{[x]: true for x in [1, 2, 3] if (a b)}",
                   R"_(test:1:37: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("{[x]: true for x in [1, 2, 3] if a b}",
                   R"(test:1:36: expected for, if or "}" after for clause,)"
                   R"( got: (IDENTIFIER, "b"))");
}

TEST(Parser, TestInvalidNoComma)
{
    testParseError("{a: b c:d}", "test:1:7: expected a comma before next field.");
}

TEST(Parser, TestInvalidArrayKey)
{
    testParseError("{[(x y)]: z}", R"_(test:1:6: expected token ")" but got (IDENTIFIER, "y"))_");
    testParseError("{[x y]: z}", R"(test:1:5: expected token "]" but got (IDENTIFIER, "y"))");
}

TEST(Parser, TestInvalidFields)
{
    testParseError("{foo(x y): z}", "test:1:8: expected a comma before next method parameter.");
    testParseError("{foo(x)+: z}", "test:1:2-5: cannot use +: syntax sugar in a method: foo");
    testParseError("{foo: 1, foo: 2}", "test:1:10-13: duplicate field: foo");
    testParseError("{foo: (1 2)}", R"_(test:1:10: expected token ")" but got (NUMBER, "2"))_");
}

TEST(Parser, TestInvalidLocalInTuple)
{
    testParseError("{local 1 = 3, true}",
                   R"(test:1:8: expected token IDENTIFIER but got (NUMBER, "1"))");
    testParseError("{local foo = 1, local foo = 2, true}",
                   "test:1:23-26: duplicate local var: foo");
    testParseError("{local foo(a b) = 1, a: true}",
                   "test:1:14: expected a comma before next function parameter.");
    testParseError("{local foo(a): 1, a: true}", "test:1:14: expected operator = but got :");
    testParseError("{local foo(a) = (a b), a: true}",
                   R"_(test:1:20: expected token ")" but got (IDENTIFIER, "b"))_");
}

TEST(Parser, TestInvalidAssertInTuple)
{
    testParseError("{assert (a b), a: true}",
                   R"_(test:1:12: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("{assert a: (a b), a: true}",
                   R"_(test:1:15: expected token ")" but got (IDENTIFIER, "b"))_");
}

TEST(Parser, TestInvalidUnexpectedFunction)
{
    // TODO(jsonnet-team): The following error output differs from the Go
    // implementation, which is:
    // test:1:2-10 Unexpected: (function, "function") while parsing field
    // definition.
    testParseError("{function(a, b) a+b: true}",
                   "test:1:2-10: unexpected: function while parsing field definition");
}

TEST(Parser, TestInvalidArray)
{
    testParseError("[(a b), 2, 3]",
                   R"_(test:1:5: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("[1, (a b), 2, 3]",
                   R"_(test:1:8: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("[a for b in [1 2 3]]",
                   "test:1:16: expected a comma before next array element.");
}

TEST(Parser, TestInvalidExpression)
{
    // TODO(jsonnet-team): The error output of the following differs from the Go
    // implementation, which is:
    // test:1:1-4 Unexpected: (for, "for") while parsing terminal)
    testParseError("for", "test:1:1-4: unexpected: for while parsing terminal");
    testParseError("", "test:1:1: unexpected end of file.");
    testParseError("((a b))", R"_(test:1:5: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("a.1", R"(test:1:3: expected token IDENTIFIER but got (NUMBER, "1"))");
    testParseError("super.1", R"(test:1:7: expected token IDENTIFIER but got (NUMBER, "1"))");
    testParseError("super[(a b)]", R"_(test:1:10: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("super[a b]", R"(test:1:9: expected token "]" but got (IDENTIFIER, "b"))");
    testParseError("super", "test:1:1-6: expected . or [ after super.");
}

TEST(Parser, TestInvalidAssert)
{
    testParseError("assert (a b); true",
                   R"_(test:1:11: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("assert a: (a b); true",
                   R"_(test:1:14: expected token ")" but got (IDENTIFIER, "b"))_");
    // TODO(jsonnet-team): The error output of this differs from the Go
    // implementation, which is:
    // test:1:16: expected token ";" but got (",", ",")
    testParseError("assert a: 'foo', true",
                   R"(test:1:16: expected token ";" but got ",")");
    testParseError("assert a: 'foo'; (a b)",
                   R"_(test:1:21: expected token ")" but got (IDENTIFIER, "b"))_");
}

TEST(Parser, TestInvalidError)
{
    testParseError("error (a b)", R"_(test:1:10: expected token ")" but got (IDENTIFIER, "b"))_");
}

TEST(Parser, TestInvalidIf)
{
    testParseError("if (a b) then c",
                   R"_(test:1:7: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("if a b c",
                   R"(test:1:6: expected token then but got (IDENTIFIER, "b"))");
    testParseError("if a then (b c)",
                   R"_(test:1:14: expected token ")" but got (IDENTIFIER, "c"))_");
    testParseError("if a then b else (c d)",
                   R"_(test:1:21: expected token ")" but got (IDENTIFIER, "d"))_");
}

TEST(Parser, TestInvalidFunction)
{
    testParseError("function(a) (a b)",
                   R"_(test:1:16: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("function a a", R"(test:1:10: expected ( but got (IDENTIFIER, "a"))");
}

TEST(Parser, TestInvalidImport)
{
    testParseError("import (a b)", R"_(test:1:11: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("import (a+b)", "test:1:8-13: computed imports are not allowed.");
    testParseError("importstr (a b)",
                   R"_(test:1:14: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("importstr (a+b)", "test:1:11-16: computed imports are not allowed.");
}

TEST(Parser, TestInvalidOperator)
{
    testParseError("1+ <<", "test:1:4-6: not a unary operator: <<");
    testParseError("-(a b)", R"_(test:1:5: expected token ")" but got (IDENTIFIER, "b"))_");
    testParseError("1~2", "test:1:2: not a binary operator: ~");
}

TEST(Parser, TestInvalidArrayAccess)
{
    testParseError("a[(b c)]", R"_(test:1:6: expected token ")" but got (IDENTIFIER, "c"))_");
    // TODO(jsonnet-team): The error output of this differs from the Go
    // implementation, which is:
    // test:1:5: expected token "]" but got (IDENTIFIER, "c")
    testParseError("a[b c]", "test:1:5: unexpected: IDENTIFIER while parsing slice");
}

TEST(Parser, TestInvalidOverride)
{
    testParseError("a{b c}", R"(test:1:5: expected token OPERATOR but got (IDENTIFIER, "c"))");
}

}  // namespace

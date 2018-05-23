/*
Copyright 2016 Google Inc. All rights reserved.

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
package docparser

import (
	"testing"
)

type lexTest struct {
	name      string
	input     string
	tokens    tokens
	errString string
}

var (
	tEOF = token{kind: tokenEndOfFile}
)

var lexTests = []lexTest{
	{"empty", "", tokens{}, ""},
	{"whitespace", "  \t\n\r\r\n", tokens{}, ""},

	{"brace L", "{", tokens{{kind: tokenBraceL, data: "{"}}, ""},
	{"brace R", "}", tokens{{kind: tokenBraceR, data: "}"}}, ""},
	{"bracket L", "[", tokens{{kind: tokenBracketL, data: "["}}, ""},
	{"bracket R", "]", tokens{{kind: tokenBracketR, data: "]"}}, ""},
	{"colon", ":", tokens{{kind: tokenOperator, data: ":"}}, ""},
	{"colon2", "::", tokens{{kind: tokenOperator, data: "::"}}, ""},
	{"colon3", ":::", tokens{{kind: tokenOperator, data: ":::"}}, ""},
	{"arrow right", "->", tokens{{kind: tokenOperator, data: "->"}}, ""},
	{"less than minus", "<-", tokens{{kind: tokenOperator, data: "<"},
		{kind: tokenOperator, data: "-"}}, ""},
	{"comma", ",", tokens{{kind: tokenComma, data: ","}}, ""},
	{"dollar", "$", tokens{{kind: tokenDollar, data: "$"}}, ""},
	{"dot", ".", tokens{{kind: tokenDot, data: "."}}, ""},
	{"paren L", "(", tokens{{kind: tokenParenL, data: "("}}, ""},
	{"paren R", ")", tokens{{kind: tokenParenR, data: ")"}}, ""},
	{"semicolon", ";", tokens{{kind: tokenSemicolon, data: ";"}}, ""},

	{"not 1", "!", tokens{{kind: tokenOperator, data: "!"}}, ""},
	{"not 2", "! ", tokens{{kind: tokenOperator, data: "!"}}, ""},
	{"not equal", "!=", tokens{{kind: tokenOperator, data: "!="}}, ""},
	{"tilde", "~", tokens{{kind: tokenOperator, data: "~"}}, ""},
	{"plus", "+", tokens{{kind: tokenOperator, data: "+"}}, ""},
	{"minus", "-", tokens{{kind: tokenOperator, data: "-"}}, ""},

	{"number 0", "0", tokens{{kind: tokenNumber, data: "0"}}, ""},
	{"number 1", "1", tokens{{kind: tokenNumber, data: "1"}}, ""},
	{"number 1.0", "1.0", tokens{{kind: tokenNumber, data: "1.0"}}, ""},
	{"number 0.10", "0.10", tokens{{kind: tokenNumber, data: "0.10"}}, ""},
	{"number 0e100", "0e100", tokens{{kind: tokenNumber, data: "0e100"}}, ""},
	{"number 1e100", "1e100", tokens{{kind: tokenNumber, data: "1e100"}}, ""},
	{"number 1.1e100", "1.1e100", tokens{{kind: tokenNumber, data: "1.1e100"}}, ""},
	{"number 1.1e-100", "1.1e-100", tokens{{kind: tokenNumber, data: "1.1e-100"}}, ""},
	{"number 1.1e+100", "1.1e+100", tokens{{kind: tokenNumber, data: "1.1e+100"}}, ""},
	{"number 0100", "0100", tokens{
		{kind: tokenNumber, data: "0"},
		{kind: tokenNumber, data: "100"},
	}, ""},
	{"number 10+10", "10+10", tokens{
		{kind: tokenNumber, data: "10"},
		{kind: tokenOperator, data: "+"},
		{kind: tokenNumber, data: "10"},
	}, ""},
	{"number 1.+3", "1.+3", tokens{}, "number 1.+3:1:3 Couldn't lex number, junk after decimal point: '+'"},
	{"number 1e!", "1e!", tokens{}, "number 1e!:1:3 Couldn't lex number, junk after 'E': '!'"},
	{"number 1e+!", "1e+!", tokens{}, "number 1e+!:1:4 Couldn't lex number, junk after exponent sign: '!'"},

	{"double string \"hi\"", "\"hi\"", tokens{{kind: tokenStringDouble, data: "hi"}}, ""},
	{"double string \"hi nl\"", "\"hi\n\"", tokens{{kind: tokenStringDouble, data: "hi\n"}}, ""},
	{"double string \"hi\\\"\"", "\"hi\\\"\"", tokens{{kind: tokenStringDouble, data: "hi\\\""}}, ""},
	{"double string \"hi\\nl\"", "\"hi\\\n\"", tokens{{kind: tokenStringDouble, data: "hi\\\n"}}, ""},
	{"double string \"hi", "\"hi", tokens{}, "double string \"hi:1:1 Unterminated String"},

	{"single string 'hi'", "'hi'", tokens{{kind: tokenStringSingle, data: "hi"}}, ""},
	{"single string 'hi nl'", "'hi\n'", tokens{{kind: tokenStringSingle, data: "hi\n"}}, ""},
	{"single string 'hi\\''", "'hi\\''", tokens{{kind: tokenStringSingle, data: "hi\\'"}}, ""},
	{"single string 'hi\\nl'", "'hi\\\n'", tokens{{kind: tokenStringSingle, data: "hi\\\n"}}, ""},
	{"single string 'hi", "'hi", tokens{}, "single string 'hi:1:1 Unterminated String"},

	{"assert", "assert", tokens{{kind: tokenAssert, data: "assert"}}, ""},
	{"else", "else", tokens{{kind: tokenElse, data: "else"}}, ""},
	{"error", "error", tokens{{kind: tokenError, data: "error"}}, ""},
	{"false", "false", tokens{{kind: tokenFalse, data: "false"}}, ""},
	{"for", "for", tokens{{kind: tokenFor, data: "for"}}, ""},
	{"function", "function", tokens{{kind: tokenFunction, data: "function"}}, ""},
	{"if", "if", tokens{{kind: tokenIf, data: "if"}}, ""},
	{"import", "import", tokens{{kind: tokenImport, data: "import"}}, ""},
	{"importstr", "importstr", tokens{{kind: tokenImportStr, data: "importstr"}}, ""},
	{"in", "in", tokens{{kind: tokenIn, data: "in"}}, ""},
	{"local", "local", tokens{{kind: tokenLocal, data: "local"}}, ""},
	{"null", "null", tokens{{kind: tokenNullLit, data: "null"}}, ""},
	{"self", "self", tokens{{kind: tokenSelf, data: "self"}}, ""},
	{"super", "super", tokens{{kind: tokenSuper, data: "super"}}, ""},
	{"tailstrict", "tailstrict", tokens{{kind: tokenTailStrict, data: "tailstrict"}}, ""},
	{"then", "then", tokens{{kind: tokenThen, data: "then"}}, ""},
	{"true", "true", tokens{{kind: tokenTrue, data: "true"}}, ""},

	{"identifier", "foobar123", tokens{{kind: tokenIdentifier, data: "foobar123"}}, ""},
	{"identifier", "foo bar123", tokens{{kind: tokenIdentifier, data: "foo"}, {kind: tokenIdentifier, data: "bar123"}}, ""},

	{"c++ comment", "// hi", tokens{}, ""},                                                                     // This test doesn't look at fodder (yet?)
	{"hash comment", "# hi", tokens{}, ""},                                                                     // This test doesn't look at fodder (yet?)
	{"c comment", "/* hi */", tokens{}, ""},                                                                    // This test doesn't look at fodder (yet?)
	{"c comment no term", "/* hi", tokens{}, "c comment no term:1:1 Multi-line comment has no terminating */"}, // This test doesn't look at fodder (yet?)

	{
		"block string spaces",
		`|||
  test
    more
  |||
    foo
|||`,
		tokens{
			{
				kind:                  tokenStringBlock,
				data:                  "test\n  more\n|||\n  foo\n",
				stringBlockIndent:     "  ",
				stringBlockTermIndent: "",
			},
		},
		"",
	},
	{
		"block string tabs",
		`|||
	test
	  more
	|||
	  foo
|||`,
		tokens{
			{
				kind:                  tokenStringBlock,
				data:                  "test\n  more\n|||\n  foo\n",
				stringBlockIndent:     "\t",
				stringBlockTermIndent: "",
			},
		},
		"",
	},
	{
		"block string mixed",
		`|||
	  	test
	  	  more
	  	|||
	  	  foo
|||`,
		tokens{
			{
				kind:                  tokenStringBlock,
				data:                  "test\n  more\n|||\n  foo\n",
				stringBlockIndent:     "\t  \t",
				stringBlockTermIndent: "",
			},
		},
		"",
	},
	{
		"block string blanks",
		`|||

  test


    more
  |||
    foo
|||`,
		tokens{
			{
				kind:                  tokenStringBlock,
				data:                  "\ntest\n\n\n  more\n|||\n  foo\n",
				stringBlockIndent:     "  ",
				stringBlockTermIndent: "",
			},
		},
		"",
	},
	{
		"block string bad indent",
		`|||
  test
 foo
|||`,
		tokens{},
		"block string bad indent:1:1 Text block not terminated with |||",
	},
	{
		"block string eof",
		`|||
  test`,
		tokens{},
		"block string eof:1:1 Unexpected EOF",
	},
	{
		"block string not term",
		`|||
  test
`,
		tokens{},
		"block string not term:1:1 Text block not terminated with |||",
	},
	{
		"block string no ws",
		`|||
test
|||`,
		tokens{},
		"block string no ws:1:1 Text block's first line must start with whitespace",
	},

	{"verbatim_string1", `@""`, tokens{{kind: tokenVerbatimStringDouble, data: ""}}, ""},
	{"verbatim_string2", `@''`, tokens{{kind: tokenVerbatimStringSingle, data: ""}}, ""},
	{"verbatim_string3", `@""""`, tokens{{kind: tokenVerbatimStringDouble, data: `"`}}, ""},
	{"verbatim_string4", `@''''`, tokens{{kind: tokenVerbatimStringSingle, data: "'"}}, ""},
	{"verbatim_string5", `@"\n"`, tokens{{kind: tokenVerbatimStringDouble, data: "\\n"}}, ""},
	{"verbatim_string6", `@"''"`, tokens{{kind: tokenVerbatimStringDouble, data: "''"}}, ""},

	{"verbatim_string_unterminated", `@"blah blah`, tokens{}, "verbatim_string_unterminated:1:1 Unterminated String"},
	{"verbatim_string_junk", `@blah blah`, tokens{}, "verbatim_string_junk:1:1 Couldn't lex verbatim string, junk after '@': 98"},

	{"op *", "*", tokens{{kind: tokenOperator, data: "*"}}, ""},
	{"op /", "/", tokens{{kind: tokenOperator, data: "/"}}, ""},
	{"op %", "%", tokens{{kind: tokenOperator, data: "%"}}, ""},
	{"op &", "&", tokens{{kind: tokenOperator, data: "&"}}, ""},
	{"op |", "|", tokens{{kind: tokenOperator, data: "|"}}, ""},
	{"op ^", "^", tokens{{kind: tokenOperator, data: "^"}}, ""},
	{"op =", "=", tokens{{kind: tokenOperator, data: "="}}, ""},
	{"op <", "<", tokens{{kind: tokenOperator, data: "<"}}, ""},
	{"op >", ">", tokens{{kind: tokenOperator, data: ">"}}, ""},
	{"op >==|", ">==|", tokens{{kind: tokenOperator, data: ">==|"}}, ""},

	{"junk", "💩", tokens{}, "junk:1:1 Could not lex the character '\\U0001f4a9'"},
}

func tokensEqual(ts1, ts2 tokens) bool {
	if len(ts1) != len(ts2) {
		return false
	}
	for i := range ts1 {
		t1, t2 := ts1[i], ts2[i]
		if t1.kind != t2.kind {
			return false
		}
		if t1.data != t2.data {
			return false
		}
		if t1.stringBlockIndent != t2.stringBlockIndent {
			return false
		}
		if t1.stringBlockTermIndent != t2.stringBlockTermIndent {
			return false
		}
	}
	return true
}

func TestLex(t *testing.T) {
	for _, test := range lexTests {
		// Copy the test tokens and append an EOF token
		testTokens := append(tokens(nil), test.tokens...)
		testTokens = append(testTokens, tEOF)
		tokens, err := Lex(test.name, test.input)
		var errString string
		if err != nil {
			errString = err.Error()
		}
		if errString != test.errString {
			t.Errorf("%s: error result does not match. got\n\t%+v\nexpected\n\t%+v",
				test.name, errString, test.errString)
		}
		if err == nil && !tokensEqual(tokens, testTokens) {
			t.Errorf("%s: got\n\t%+v\nexpected\n\t%+v", test.name, tokens, testTokens)
		}
	}
}

// TODO: test fodder, test position reporting

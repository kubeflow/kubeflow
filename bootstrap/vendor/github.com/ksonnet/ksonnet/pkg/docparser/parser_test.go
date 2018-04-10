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

var tests = []string{
	`true`,
	`1`,
	`1.2e3`,
	`!true`,
	`null`,

	`$.foo.bar`,
	`self.foo.bar`,
	`super.foo.bar`,
	`super[1]`,
	`error "Error!"`,

	`"world"`,
	`'world'`,
	`|||
   world
|||`,

	`foo(bar)`,
	`foo(bar,)`,
	`foo(bar) tailstrict`,
	`foo(bar=42)`,
	`foo(bar=42,)`,
	`foo(bar, baz=42)`,
	`foo.bar`,
	`foo[bar]`,

	`true || false`,
	`0 && 1 || 0`,
	`0 && (1 || 0)`,

	`function(x) x`,
	`function(x=5) x`,
	`function(x, y=5) x`,

	`local foo = "bar"; foo`,
	`local foo(bar) = bar; foo(1)`,
	`{ local foo = "bar", baz: 1}`,
	`{ local foo(bar) = bar, baz: foo(1)}`,

	`{ foo(bar, baz): bar+baz }`,

	`{ ["foo" + "bar"]: 3 }`,
	`{ ["field" + x]: x for x in [1, 2, 3] }`,
	`{ local y = x, ["field" + x]: x for x in [1, 2, 3] }`,
	`{ ["field" + x]: x for x in [1, 2, 3] if x <= 2 }`,
	`{ ["field" + x + y]: x + y for x in [1, 2, 3] if x <= 2 for y in [4, 5, 6]}`,

	`[]`,
	`[a, b, c]`,
	`[x for x in [1,2,3] ]`,
	`[x for x in [1,2,3] if x <= 2]`,
	`[x+y for x in [1,2,3] if x <= 2 for y in [4, 5, 6]]`,

	`{}`,
	`{ hello: "world" }`,
	`{ hello +: "world" }`,
	`{
  hello: "world",
	"name":: joe,
	'mood'::: "happy",
	|||
	  key type
|||: "block",
}`,

	`assert true: 'woah!'; true`,
	`{ assert true: 'woah!', foo: bar }`,

	`if n > 1 then 'foos' else 'foo'`,

	`local foo = function(x) x + 1; true`,
	`local foo = function(x=5) x + 1; true`,
	`local foo = function(x=5) x + 1; x(x=3)`,

	`import 'foo.jsonnet'`,
	`importstr 'foo.text'`,

	`{a: b} + {c: d}`,
	`{a: b}{c: d}`,

	// no colons
	`[][0]`,
	// one colon
	`[][:]`,
	`[][1:]`,
	`[][:1]`,
	`[][1:2]`,
	// two colons
	`[][::]`,
	`[][1::]`,
	`[][:1:]`,
	`[][::1]`,
	`[][1:1:]`,
	`[][:1:1]`,
	`[][1::1]`,
	`[][1:1:1]`,

	`a in b`,
	`{ x: if "opt" in super then "x" else "y" }`,
}

func TestParser(t *testing.T) {
	for _, s := range tests {
		t.Run(s, func(t *testing.T) {
			tokens, err := Lex("test", s)
			if err != nil {
				t.Errorf("Unexpected lex error\n  input: %v\n  error: %v", s, err)
				return
			}
			_, err = Parse(tokens)
			if err != nil {
				t.Errorf("Unexpected parse error\n  input: %v\n  error: %v", s, err)
			}
		})

	}
}

type testError struct {
	input string
	err   string
}

var errorTests = []testError{
	{`,`, `test:1:1-2 Unexpected: (",", ",") while parsing terminal`},
	{`function(a, b c)`, `test:1:15-16 Expected a comma before next function parameter, got (IDENTIFIER, "c").`},
	{`function(a, 1)`, `test:1:13-14 Expected simple identifier but got a complex expression.`},
	{`function(,)`, `test:1:10-11 Unexpected: (",", ",") while parsing terminal`},
	{`function(a=)`, `test:1:12-13 Unexpected: (")", ")") while parsing terminal`},
	{`function(a=,)`, `test:1:12-13 Unexpected: (",", ",") while parsing terminal`},
	{`function(a=5, b)`, `test:1:15-16 Positional argument after a named argument is not allowed`},
	{`a b`, `test:1:3-4 Did not expect: (IDENTIFIER, "b")`},
	{`foo(a, bar(a b))`, `test:1:14-15 Expected a comma before next function argument, got (IDENTIFIER, "b").`},

	{`local`, `test:1:6 Expected token IDENTIFIER but got end of file`},
	{`local foo = 1, foo = 2; true`, `test:1:16-19 Duplicate local var: foo`},
	{`local foo(a b) = a; true`, `test:1:13-14 Expected a comma before next function parameter, got (IDENTIFIER, "b").`},
	{`local foo(a): a; true`, `test:1:13-14 Expected operator = but got ":"`},
	{`local foo(a) = bar(a b); true`, `test:1:22-23 Expected a comma before next function argument, got (IDENTIFIER, "b").`},
	{`local foo: 1; true`, `test:1:10-11 Expected operator = but got ":"`},
	{`local foo = bar(a b); true`, `test:1:19-20 Expected a comma before next function argument, got (IDENTIFIER, "b").`},

	{`{a b}`, `test:1:4-5 Expected token OPERATOR but got (IDENTIFIER, "b")`},
	{`{a = b}`, `test:1:4-5 Expected one of :, ::, :::, +:, +::, +:::, got: =`},
	{`{a :::: b}`, `test:1:4-8 Expected one of :, ::, :::, +:, +::, +:::, got: ::::`},

	{`{assert x for x in [1, 2, 3]}`, `test:1:11-14 Object comprehension cannot have asserts.`},
	{`{['foo' + x]: true, [x]: x for x in [1, 2, 3]}`, `test:1:28-31 Object comprehension can only have one field.`},
	{`{foo: x for x in [1, 2, 3]}`, `test:1:9-12 Object comprehensions can only have [e] fields.`},
	{`{[x]:: true for x in [1, 2, 3]}`, `test:1:13-16 Object comprehensions cannot have hidden fields.`},
	{`{[x]: true for 1 in [1, 2, 3]}`, `test:1:16-17 Expected token IDENTIFIER but got (NUMBER, "1")`},
	{`{[x]: true for x at [1, 2, 3]}`, `test:1:18-20 Expected token in but got (IDENTIFIER, "at")`},
	{`{[x]: true for x in [1, 2 3]}`, `test:1:27-28 Expected a comma before next array element.`},
	{`{[x]: true for x in [1, 2, 3] if (a b)}`, `test:1:37-38 Expected token ")" but got (IDENTIFIER, "b")`},
	{`{[x]: true for x in [1, 2, 3] if a b}`, `test:1:36-37 Expected for, if or "}" after for clause, got: (IDENTIFIER, "b")`},

	{`{a: b c:d}`, `test:1:7-8 Expected a comma before next field.`},

	{`{[(x y)]: z}`, `test:1:6-7 Expected token ")" but got (IDENTIFIER, "y")`},
	{`{[x y]: z}`, `test:1:5-6 Expected token "]" but got (IDENTIFIER, "y")`},

	{`{foo(x y): z}`, `test:1:8-9 Expected a comma before next method parameter, got (IDENTIFIER, "y").`},
	{`{foo(x)+: z}`, `test:1:2-5 Cannot use +: syntax sugar in a method: foo`},
	{`{foo: 1, foo: 2}`, `test:1:10-13 Duplicate field: foo`},
	{`{foo: (1 2)}`, `test:1:10-11 Expected token ")" but got (NUMBER, "2")`},

	{`{local 1 = 3, true}`, `test:1:8-9 Expected token IDENTIFIER but got (NUMBER, "1")`},
	{`{local foo = 1, local foo = 2, true}`, `test:1:23-26 Duplicate local var: foo`},
	{`{local foo(a b) = 1, a: true}`, `test:1:14-15 Expected a comma before next function parameter, got (IDENTIFIER, "b").`},
	{`{local foo(a): 1, a: true}`, `test:1:14-15 Expected operator = but got ":"`},
	{`{local foo(a) = (a b), a: true}`, `test:1:20-21 Expected token ")" but got (IDENTIFIER, "b")`},

	{`{assert (a b), a: true}`, `test:1:12-13 Expected token ")" but got (IDENTIFIER, "b")`},
	{`{assert a: (a b), a: true}`, `test:1:15-16 Expected token ")" but got (IDENTIFIER, "b")`},

	{`{function(a, b) a+b: true}`, `test:1:2-10 Unexpected: (function, "function") while parsing field definition`},

	{`[(a b), 2, 3]`, `test:1:5-6 Expected token ")" but got (IDENTIFIER, "b")`},
	{`[1, (a b), 2, 3]`, `test:1:8-9 Expected token ")" but got (IDENTIFIER, "b")`},
	{`[a for b in [1 2 3]]`, `test:1:16-17 Expected a comma before next array element.`},

	{`for`, `test:1:1-4 Unexpected: (for, "for") while parsing terminal`},
	{``, `test:1:1 Unexpected end of file.`},
	{`((a b))`, `test:1:5-6 Expected token ")" but got (IDENTIFIER, "b")`},
	{`a.1`, `test:1:3-4 Expected token IDENTIFIER but got (NUMBER, "1")`},
	{`super.1`, `test:1:7-8 Expected token IDENTIFIER but got (NUMBER, "1")`},
	{`super[(a b)]`, `test:1:10-11 Expected token ")" but got (IDENTIFIER, "b")`},
	{`super[a b]`, `test:1:9-10 Expected token "]" but got (IDENTIFIER, "b")`},
	{`super`, `test:1:1-6 Expected . or [ after super.`},

	{`assert (a b); true`, `test:1:11-12 Expected token ")" but got (IDENTIFIER, "b")`},
	{`assert a: (a b); true`, `test:1:14-15 Expected token ")" but got (IDENTIFIER, "b")`},
	{`assert a: 'foo', true`, `test:1:16-17 Expected token ";" but got (",", ",")`},
	{`assert a: 'foo'; (a b)`, `test:1:21-22 Expected token ")" but got (IDENTIFIER, "b")`},

	{`error (a b)`, `test:1:10-11 Expected token ")" but got (IDENTIFIER, "b")`},

	{`if (a b) then c`, `test:1:7-8 Expected token ")" but got (IDENTIFIER, "b")`},
	{`if a b c`, `test:1:6-7 Expected token then but got (IDENTIFIER, "b")`},
	{`if a then (b c)`, `test:1:14-15 Expected token ")" but got (IDENTIFIER, "c")`},
	{`if a then b else (c d)`, `test:1:21-22 Expected token ")" but got (IDENTIFIER, "d")`},

	{`function(a) (a b)`, `test:1:16-17 Expected token ")" but got (IDENTIFIER, "b")`},
	{`function a a`, `test:1:10-11 Expected ( but got (IDENTIFIER, "a")`},

	{`import (a b)`, `test:1:11-12 Expected token ")" but got (IDENTIFIER, "b")`},
	{`import (a+b)`, `test:1:9-12 Computed imports are not allowed`},
	{`importstr (a b)`, `test:1:14-15 Expected token ")" but got (IDENTIFIER, "b")`},
	{`importstr (a+b)`, `test:1:12-15 Computed imports are not allowed`},

	{`local a = b ()`, `test:1:15 Expected , or ; but got end of file`},
	{`local a = b; (a b)`, `test:1:17-18 Expected token ")" but got (IDENTIFIER, "b")`},

	{`1+ <<`, `test:1:4-6 Not a unary operator: <<`},
	{`-(a b)`, `test:1:5-6 Expected token ")" but got (IDENTIFIER, "b")`},
	{`1~2`, `test:1:2-3 Not a binary operator: ~`},

	{`a[(b c)]`, `test:1:6-7 Expected token ")" but got (IDENTIFIER, "c")`},
	{`a[b c]`, `test:1:5-6 Expected token "]" but got (IDENTIFIER, "c")`},
	{`a[]`, `test:1:3-4 ast.Index requires an expression`},
	{`a[42:42:42:42]`, `test:1:11-12 Invalid slice: too many colons`},
	{`a[42:42::42]`, `test:1:8-10 Invalid slice: too many colons`},

	{`a{b c}`, `test:1:5-6 Expected token OPERATOR but got (IDENTIFIER, "c")`},
}

func TestParserErrors(t *testing.T) {
	for _, s := range errorTests {
		t.Run(s.input, func(t *testing.T) {
			tokens, err := Lex("test", s.input)
			if err != nil {
				t.Errorf("Unexpected lex error\n  input: %v\n  error: %v", s.input, err)
				return
			}
			_, err = Parse(tokens)
			if err == nil {
				t.Errorf("Expected parse error but got success\n  input: %v", s.input)
				return
			}
			if err.Error() != s.err {
				t.Errorf("Error string not as expected\n  input: %v\n  expected error: %v\n  actual error: %v", s.input, s.err, err.Error())
			}
		})
	}

}

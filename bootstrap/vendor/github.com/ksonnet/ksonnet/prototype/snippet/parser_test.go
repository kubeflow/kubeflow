// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package snippet

import (
	"reflect"
	"testing"
)

func assertTokensEqual(t *testing.T, actual, expected tokenType) {
	if actual != expected {
		t.Fatalf("Expected token type '%d' but got '%d'", expected, actual)
	}
}

func TestLexer(t *testing.T) {
	lexer := newLexer()
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("a")
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("abc")
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("{{abc}}")
	assertTokensEqual(t, lexer.next().kind, curlyOpen)
	assertTokensEqual(t, lexer.next().kind, curlyOpen)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, curlyClose)
	assertTokensEqual(t, lexer.next().kind, curlyClose)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("abc() ")
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, format)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("abc 123")
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, format)
	assertTokensEqual(t, lexer.next().kind, number)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("$foo")
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("$foo_bar")
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("$foo-bar")
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, format)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("${foo}")
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, curlyOpen)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, curlyClose)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("${1223:foo}")
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, curlyOpen)
	assertTokensEqual(t, lexer.next().kind, number)
	assertTokensEqual(t, lexer.next().kind, colon)
	assertTokensEqual(t, lexer.next().kind, variableName)
	assertTokensEqual(t, lexer.next().kind, curlyClose)
	assertTokensEqual(t, lexer.next().kind, eof)

	lexer.text("\\${}")
	assertTokensEqual(t, lexer.next().kind, backslash)
	assertTokensEqual(t, lexer.next().kind, dollar)
	assertTokensEqual(t, lexer.next().kind, curlyOpen)
	assertTokensEqual(t, lexer.next().kind, curlyClose)
}

func assertText(t *testing.T, value, expected string) {
	p := newSnippetParser()
	actual := p.text(value)
	if actual != expected {
		t.Errorf("Expected text '%s', got '%s'", expected, actual)
	}
}

func assertMarkerTypes(t *testing.T, actual marker, expected marker) {
	actualType, expectedType := reflect.TypeOf(actual), reflect.TypeOf(expected)
	if actualType != expectedType {
		t.Errorf("Expected type '%v', got type '%v'", expectedType, actualType)
	}
}

func assertEqual(t *testing.T, actual, expected interface{}) {
	if actual != expected {
		t.Errorf("Expected '%v', got '%v'", expected, actual)
	}
}

func assertMarker(t *testing.T, actual markers, expected ...marker) {
	if len(actual) != len(expected) {
		t.Errorf("Number of markers and types are not the same")
	}
	for i := range actual {
		actualType := reflect.TypeOf(actual[i])
		expectedType := reflect.TypeOf(expected[i])
		if actualType != expectedType {
			t.Errorf("Expected type '%v', got type '%v'", expectedType, actualType)
			return
		}
	}
}

func assertMarkerValue(t *testing.T, value string, ctors ...marker) {
	p := newSnippetParser()
	m := p.parse(value, false, false)
	assertMarker(t, *m, ctors...)
}

func assertTextAndMarker(t *testing.T, value, escaped string, ctors ...marker) {
	assertText(t, value, escaped)
	assertMarkerValue(t, value, ctors...)
}

func TestParserText(t *testing.T) {
	assertText(t, `$`, `$`)
	assertText(t, `\\$`, `\$`)
	assertText(t, "{", "{")
	assertText(t, `\}`, `}`)
	assertText(t, `\abc`, `\abc`)
	assertText(t, `foo${f:\}}bar`, `foo}bar`)
	assertText(t, `\{`, `\{`)
	assertText(t, "I need \\\\\\$", "I need \\$")
	assertText(t, `\`, `\`)
	assertText(t, `\{{`, `\{{`)
	assertText(t, `{{`, `{{`)
	assertText(t, `{{dd`, `{{dd`)
	assertText(t, `}}`, `}}`)
	assertText(t, `ff}}`, `ff}}`)

	assertText(t, "farboo", "farboo")
	assertText(t, "far{{}}boo", "far{{}}boo")
	assertText(t, "far{{123}}boo", "far{{123}}boo")
	assertText(t, "far\\{{123}}boo", "far\\{{123}}boo")
	assertText(t, "far{{id:bern}}boo", "far{{id:bern}}boo")
	assertText(t, "far{{id:bern {{basel}}}}boo", "far{{id:bern {{basel}}}}boo")
	assertText(t, "far{{id:bern {{id:basel}}}}boo", "far{{id:bern {{id:basel}}}}boo")
	assertText(t, "far{{id:bern {{id2:basel}}}}boo", "far{{id:bern {{id2:basel}}}}boo")
}

func TestParserTMText(t *testing.T) {
	assertTextAndMarker(t, "foo${1:bar}}", "foobar}", &text{}, &placeholder{}, &text{})
	assertTextAndMarker(t, "foo${1:bar}${2:foo}}", "foobarfoo}", &text{}, &placeholder{}, &placeholder{}, &text{})

	assertTextAndMarker(t, "foo${1:bar\\}${2:foo}}", "foobar}foo", &text{}, &placeholder{})

	parse := *newSnippetParser().parse("foo${1:bar\\}${2:foo}}", false, false)
	ph := *parse[1].(*placeholder)
	children := *ph._children

	assertEqual(t, ph.index, 1)
	assertMarkerTypes(t, children[0], &text{})
	assertEqual(t, children[0].String(), "bar}")
	assertMarkerTypes(t, children[1], &placeholder{})
	assertEqual(t, children[1].String(), "foo")
}

func TestParserPlaceholder(t *testing.T) {
	assertTextAndMarker(t, "farboo", "farboo", &text{})
	assertTextAndMarker(t, "far{{}}boo", "far{{}}boo", &text{})
	assertTextAndMarker(t, "far{{123}}boo", "far{{123}}boo", &text{})
	assertTextAndMarker(t, "far\\{{123}}boo", "far\\{{123}}boo", &text{})
}

func TestParserLiteral(t *testing.T) {
	assertTextAndMarker(t, "far`123`boo", "far`123`boo", &text{})
	assertTextAndMarker(t, "far\\`123\\`boo", "far\\`123\\`boo", &text{})
}

func TestParserVariablesTabstop(t *testing.T) {
	assertTextAndMarker(t, "$far-boo", "-boo", &variable{}, &text{})
	assertTextAndMarker(t, "\\$far-boo", "$far-boo", &text{})
	assertTextAndMarker(t, "far$farboo", "far", &text{}, &variable{})
	assertTextAndMarker(t, "far${farboo}", "far", &text{}, &variable{})
	assertTextAndMarker(t, "$123", "", &placeholder{})
	assertTextAndMarker(t, "$farboo", "", &variable{})
	assertTextAndMarker(t, "$far12boo", "", &variable{})
}

func TestParserVariablesWithDefaults(t *testing.T) {
	assertTextAndMarker(t, "${name:value}", "value", &variable{})
	assertTextAndMarker(t, "${1:value}", "value", &placeholder{})
	assertTextAndMarker(t, "${1:bar${2:foo}bar}", "barfoobar", &placeholder{})

	assertTextAndMarker(t, "${name:value", "${name:value", &text{})
	assertTextAndMarker(t, "${1:bar${2:foobar}", "${1:barfoobar", &text{}, &placeholder{})
}

func TestParserTextmate(t *testing.T) {
	p := newSnippetParser()
	assertMarker(t, *p.parse("far{{}}boo", false, false), &text{})
	assertMarker(t, *p.parse("far{{123}}boo", false, false), &text{})
	assertMarker(t, *p.parse("far\\{{123}}boo", false, false), &text{})

	assertMarker(t, *p.parse("far$0boo", false, false), &text{}, &placeholder{}, &text{})
	assertMarker(t, *p.parse("far${123}boo", false, false), &text{}, &placeholder{}, &text{})
	assertMarker(t, *p.parse("far\\${123}boo", false, false), &text{})
}

func TestParserRealWorld(t *testing.T) {
	m := newSnippetParser().parse("console.warn(${1: $TM_SELECTED_TEXT })", false, false)

	assertEqual(t, (*m)[0].String(), "console.warn(")
	assertMarkerTypes(t, (*m)[1], &placeholder{})
	assertEqual(t, (*m)[2].String(), ")")

	ph := (*m)[1].(*placeholder)
	children := *ph.children()
	// assertEqual(t, placeholder, "false")
	assertEqual(t, ph.index, 1)
	assertEqual(t, len(children), 3)
	assertMarkerTypes(t, children[0], &text{})
	assertMarkerTypes(t, children[1], &variable{})
	assertMarkerTypes(t, children[2], &text{})
	assertEqual(t, children[0].String(), " ")
	assertEqual(t, children[1].String(), "")
	assertEqual(t, children[2].String(), " ")

	nestedVariable := children[1].(*variable)
	assertEqual(t, nestedVariable.name, "TM_SELECTED_TEXT")
	assertEqual(t, len(*nestedVariable.children()), 0)

	m = newSnippetParser().parse("$TM_SELECTED_TEXT", false, false)
	assertEqual(t, len(*m), 1)
	assertMarkerTypes(t, (*m)[0], &variable{})
}

func TestParserDefaultPlaceholderValues(t *testing.T) {
	assertMarkerValue(t, "errorContext: `${1:err}`, error: $1", &text{}, &placeholder{}, &text{}, &placeholder{})

	parsed := newSnippetParser().parse("errorContext: `${1:err}`, error:$1", false, false)
	assertMarkerTypes(t, (*parsed)[1], &placeholder{})
	assertMarkerTypes(t, (*parsed)[3], &placeholder{})
	p1, p2 := (*parsed)[1].(*placeholder), (*parsed)[3].(*placeholder)

	assertEqual(t, p1.index, 1)
	assertEqual(t, len(*p1.children()), 1)
	assertEqual(t, (*p1.children())[0].(*text).String(), "err")

	assertEqual(t, p2.index, 1)
	assertEqual(t, len(*p2.children()), 1)
	assertEqual(t, (*p2.children())[0].(*text).String(), "err")
}

func TestBackspace(t *testing.T) {
	actual := newSnippetParser().text("Foo \\\\${abc}bar")
	assertEqual(t, actual, "Foo \\bar")
}

func ColonAsVariableValue(t *testing.T) {
	actual := newSnippetParser().text("${TM_SELECTED_TEXT:foo:bar}")
	assertEqual(t, actual, "foo:bar")

	actual = newSnippetParser().text("${1:foo:bar}")
	assertEqual(t, actual, "foo:bar")
}

func assertLen(t *testing.T, template string, lengths ...int) {
	children := parse(template, false).children()
	walk(children, func(m marker) bool {
		var expected int
		expected, lengths = lengths[0], lengths[1:]
		assertEqual(t, m.len(), expected)
		return true
	})
}

func TestMarkerLen(t *testing.T) {
	assertLen(t, "text$0", 4, 0, 0)
	assertLen(t, "$1text$0", 0, 4, 0, 0)
	assertLen(t, "te$1xt$0", 2, 0, 2, 0, 0)
	assertLen(t, "errorContext: `${1:err}`, error: $0", 15, 0, 3, 10, 0, 0)
	assertLen(t, "errorContext: `${1:err}`, error: $1$0", 15, 0, 3, 10, 0, 3, 0, 0)
	assertLen(t, "$TM_SELECTED_TEXT$0", 0, 0, 0)
	assertLen(t, "${TM_SELECTED_TEXT:def}$0", 0, 3, 0, 0)
}

func TestParserParent(t *testing.T) {
	snippet := parse("This ${1:is ${2:nested}}$0", false)

	assertEqual(t, len(snippet.placeholders()), 3)
	first, second := snippet.placeholders()[0], snippet.placeholders()[1]
	assertEqual(t, first.index, 1)
	assertEqual(t, second.index, 2)
	assertEqual(t, second.parent(), first)
	assertEqual(t, first.parent(), snippet)

	snippet = parse("${VAR:default${1:value}}$0", false)
	phs := snippet.placeholders()
	assertEqual(t, len(phs), 2)
	first = phs[0]
	assertEqual(t, first.index, 1)

	firstChild := (*snippet.children())[0]
	assertMarkerTypes(t, firstChild, &variable{})
	assertEqual(t, first.parent(), firstChild)
}

func TestTextmateSnippetEnclosingPlaceholders(t *testing.T) {
	snippet := parse("This ${1:is ${2:nested}}$0", false)
	first, second := snippet.placeholders()[0], snippet.placeholders()[1]

	assertEqual(t, len(snippet.enclosingPlaceholders(*first)), 0)

	sndEnclosing := snippet.enclosingPlaceholders(*second)
	assertEqual(t, len(sndEnclosing), 1)
	assertEqual(t, sndEnclosing[0], first)
}

func TestTextmateSnippetOffset(t *testing.T) {
	snippet := parse("te$1xt", false)
	snippetChildren := *snippet.children()
	assertEqual(t, snippet.offset(snippetChildren[0]), 0)
	assertEqual(t, snippet.offset(snippetChildren[1]), 2)
	assertEqual(t, snippet.offset(snippetChildren[2]), 2)

	snippet = parse("${TM_SELECTED_TEXT:def}", false)
	snippetChildren = *snippet.children()
	assertEqual(t, snippet.offset(snippetChildren[0]), 0)
	assertMarkerTypes(t, snippetChildren[0], &variable{})
	assertEqual(t, snippet.offset((*snippetChildren[0].(*variable).children())[0]), 0)

	// forgein marker
	assertEqual(t, snippet.offset(newText("foo")), -1)
}

func TextmateSnippetPlaceholder(t *testing.T) {
	snippet := parse("te$1xt$0", false)
	placeholders := snippet.placeholders()
	assertEqual(t, len(placeholders), 2)

	snippet = parse("te$1xt$1$0", false)
	placeholders = snippet.placeholders()
	assertEqual(t, len(placeholders), 3)

	snippet = parse("te$1xt$2$0", false)
	placeholders = snippet.placeholders()
	assertEqual(t, len(placeholders), 3)

	snippet = parse("${1:bar${2:foo}bar}$0", false)
	placeholders = snippet.placeholders()
	assertEqual(t, len(placeholders), 3)
}

func TextmateSnippetReplace1(t *testing.T) {
	snippet := parse("aaa${1:bbb${2:ccc}}$0", false)

	assertEqual(t, len(snippet.placeholders()), 3)
	second := *snippet.placeholders()[1]
	assertEqual(t, second.index, 2)

	enclosing := snippet.enclosingPlaceholders(second)
	assertEqual(t, len(enclosing), 1)
	assertEqual(t, enclosing[0].index, 1)

	nested := parse("ddd$1eee$0", false)
	snippet.ReplacePlaceholder(2, nested.children())

	snippetPlaceholders := snippet.placeholders()
	assertEqual(t, snippet.text, "aaabbbdddeee")
	assertEqual(t, len(snippetPlaceholders), 4)
	assertEqual(t, snippetPlaceholders[0].index, "1")
	assertEqual(t, snippetPlaceholders[1].index, "1")
	assertEqual(t, snippetPlaceholders[2].index, "0")
	assertEqual(t, snippetPlaceholders[3].index, "0")

	newEnclosing := snippet.enclosingPlaceholders(*snippetPlaceholders[1])
	assertEqual(t, newEnclosing[0], snippetPlaceholders[0])
	assertEqual(t, len(newEnclosing), 1)
	assertEqual(t, newEnclosing[0].index, "1")
}

func TextmateSnippetReplace2(t *testing.T) {
	snippet := parse("aaa${1:bbb${2:ccc}}$0", false)

	assertEqual(t, len(snippet.placeholders()), 3)
	second := snippet.placeholders()[1]
	assertEqual(t, second.index, 2)

	nested := parse("dddeee$0", false)
	snippet.ReplacePlaceholder(2, nested.children())

	assertEqual(t, snippet.text, "aaabbbdddeee")
	assertEqual(t, len(snippet.placeholders()), 3)
}

func TestSnippetOrderPlaceholders(t *testing.T) {
	_10 := newPlaceholder(10, &markers{})
	_2 := newPlaceholder(2, &markers{})

	assertEqual(t, compareByIndex(*_10, *_2), 1)
}

func TestMaxCallStackExceeded(t *testing.T) {
	newSnippetParser().parse("${1:${foo:${1}}}", false, false)
}

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

type tokenType int

const (
	dollar tokenType = iota
	colon
	curlyOpen
	curlyClose
	backslash
	number
	variableName
	format
	eof
)

func (tt tokenType) String() string {
	s, _ := tokenTypeToString[tt]
	return s
}

type token struct {
	kind tokenType
	pos  int
	len  int
}

var stringToTokenType = map[rune]tokenType{
	'$':  dollar,
	':':  colon,
	'{':  curlyOpen,
	'}':  curlyClose,
	'\\': backslash,
}

var tokenTypeToString = map[tokenType]string{
	dollar:       "Dollar",
	colon:        "Colon",
	curlyOpen:    "CurlyOpen",
	curlyClose:   "CurlyClose",
	backslash:    "Backslash",
	number:       "Int",
	variableName: "VariableName",
	format:       "Format",
	eof:          "EOF",
}

type lexer struct {
	value []rune
	pos   int
}

func isDigitCharacter(ch rune) bool {
	return ch >= '0' && ch <= '9'
}

func isVariableCharacter(ch rune) bool {
	return ch == '_' || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
}

func newLexer() *lexer {
	s := lexer{}
	s.text("")

	return &s
}

func (s *lexer) text(value string) {
	s.value = []rune(value)
	s.pos = 0
}

func (s *lexer) tokenText(tok *token) string {
	return string(s.value[tok.pos : tok.pos+tok.len])
}

func (s *lexer) next() *token {
	valueLen := len(s.value)
	if s.pos >= valueLen {
		return &token{kind: eof, pos: s.pos, len: 0}
	}

	pos := s.pos
	len := 0
	ch := s.value[pos]

	// Known token types.
	var t tokenType
	if t, ok := stringToTokenType[ch]; ok {
		s.pos++
		return &token{kind: t, pos: pos, len: 1}
	}

	// Number token.
	if isDigitCharacter(ch) {
		t = number
		for pos+len < valueLen {
			ch = s.value[pos+len]
			if !isDigitCharacter(ch) {
				break
			}
			len++
		}

		s.pos += len
		return &token{t, pos, len}
	}

	// Variable.
	if isVariableCharacter(ch) {
		t = variableName
		for pos+len < valueLen {
			ch = s.value[pos+len]
			if !isVariableCharacter(ch) && !isDigitCharacter(ch) {
				break
			}
			len++
		}

		s.pos += len
		return &token{t, pos, len}
	}

	// Formatting characters.
	t = format
	for pos+len < valueLen {
		ch = s.value[pos+len]
		_, isStaticToken := stringToTokenType[ch]
		if isStaticToken || isDigitCharacter(ch) || isVariableCharacter(ch) {
			break
		}
		len++
	}

	s.pos += len
	return &token{t, pos, len}
}

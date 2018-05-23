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

package parser

import (
	"bytes"
	"fmt"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/google/go-jsonnet/ast"
)

// ---------------------------------------------------------------------------
// Fodder
//
// Fodder is stuff that is usually thrown away by lexers/preprocessors but is
// kept so that the source can be round tripped with full fidelity.
type fodderKind int

const (
	fodderWhitespace fodderKind = iota
	fodderCommentC
	fodderCommentCpp
	fodderCommentHash
)

type fodderElement struct {
	kind fodderKind
	data string
}

type fodder []fodderElement

// ---------------------------------------------------------------------------
// Token

type tokenKind int

const (
	// Symbols
	tokenBraceL tokenKind = iota
	tokenBraceR
	tokenBracketL
	tokenBracketR
	tokenComma
	tokenDollar
	tokenDot
	tokenParenL
	tokenParenR
	tokenSemicolon

	// Arbitrary length lexemes
	tokenIdentifier
	tokenNumber
	tokenOperator
	tokenStringBlock
	tokenStringDouble
	tokenStringSingle
	tokenVerbatimStringDouble
	tokenVerbatimStringSingle

	// Keywords
	tokenAssert
	tokenElse
	tokenError
	tokenFalse
	tokenFor
	tokenFunction
	tokenIf
	tokenImport
	tokenImportStr
	tokenIn
	tokenLocal
	tokenNullLit
	tokenSelf
	tokenSuper
	tokenTailStrict
	tokenThen
	tokenTrue

	// A special token that holds line/column information about the end of the
	// file.
	tokenEndOfFile
)

var tokenKindStrings = []string{
	// Symbols
	tokenBraceL:    `"{"`,
	tokenBraceR:    `"}"`,
	tokenBracketL:  `"["`,
	tokenBracketR:  `"]"`,
	tokenComma:     `","`,
	tokenDollar:    `"$"`,
	tokenDot:       `"."`,
	tokenParenL:    `"("`,
	tokenParenR:    `")"`,
	tokenSemicolon: `";"`,

	// Arbitrary length lexemes
	tokenIdentifier:           "IDENTIFIER",
	tokenNumber:               "NUMBER",
	tokenOperator:             "OPERATOR",
	tokenStringBlock:          "STRING_BLOCK",
	tokenStringDouble:         "STRING_DOUBLE",
	tokenStringSingle:         "STRING_SINGLE",
	tokenVerbatimStringDouble: "VERBATIM_STRING_DOUBLE",
	tokenVerbatimStringSingle: "VERBATIM_STRING_SINGLE",

	// Keywords
	tokenAssert:     "assert",
	tokenElse:       "else",
	tokenError:      "error",
	tokenFalse:      "false",
	tokenFor:        "for",
	tokenFunction:   "function",
	tokenIf:         "if",
	tokenImport:     "import",
	tokenImportStr:  "importstr",
	tokenIn:         "in",
	tokenLocal:      "local",
	tokenNullLit:    "null",
	tokenSelf:       "self",
	tokenSuper:      "super",
	tokenTailStrict: "tailstrict",
	tokenThen:       "then",
	tokenTrue:       "true",

	// A special token that holds line/column information about the end of the
	// file.
	tokenEndOfFile: "end of file",
}

func (tk tokenKind) String() string {
	if tk < 0 || int(tk) >= len(tokenKindStrings) {
		panic(fmt.Sprintf("INTERNAL ERROR: Unknown token kind:: %d", tk))
	}
	return tokenKindStrings[tk]
}

type token struct {
	kind   tokenKind // The type of the token
	fodder fodder    // Any fodder the occurs before this token
	data   string    // Content of the token if it is not a keyword

	// Extra info for when kind == tokenStringBlock
	stringBlockIndent     string // The sequence of whitespace that indented the block.
	stringBlockTermIndent string // This is always fewer whitespace characters than in stringBlockIndent.

	loc ast.LocationRange
}

// Tokens is a slice of token structs.
type Tokens []token

func (t *token) String() string {
	if t.data == "" {
		return t.kind.String()
	} else if t.kind == tokenOperator {
		return fmt.Sprintf("\"%v\"", t.data)
	} else {
		return fmt.Sprintf("(%v, \"%v\")", t.kind, t.data)
	}
}

// ---------------------------------------------------------------------------
// Helpers

func isUpper(r rune) bool {
	return r >= 'A' && r <= 'Z'
}

func isLower(r rune) bool {
	return r >= 'a' && r <= 'z'
}

func isNumber(r rune) bool {
	return r >= '0' && r <= '9'
}

func isIdentifierFirst(r rune) bool {
	return isUpper(r) || isLower(r) || r == '_'
}

func isIdentifier(r rune) bool {
	return isIdentifierFirst(r) || isNumber(r)
}

func isSymbol(r rune) bool {
	switch r {
	case '!', '$', ':', '~', '+', '-', '&', '|', '^', '=', '<', '>', '*', '/', '%':
		return true
	}
	return false
}

// Check that b has at least the same whitespace prefix as a and returns the
// amount of this whitespace, otherwise returns 0.  If a has no whitespace
// prefix than return 0.
func checkWhitespace(a, b string) int {
	i := 0
	for ; i < len(a); i++ {
		if a[i] != ' ' && a[i] != '\t' {
			// a has run out of whitespace and b matched up to this point.  Return
			// result.
			return i
		}
		if i >= len(b) {
			// We ran off the edge of b while a still has whitespace.  Return 0 as
			// failure.
			return 0
		}
		if a[i] != b[i] {
			// a has whitespace but b does not.  Return 0 as failure.
			return 0
		}
	}
	// We ran off the end of a and b kept up
	return i
}

// ---------------------------------------------------------------------------
// Lexer

type position struct {
	byteNo    int // Byte position of last rune read
	lineNo    int // Line number
	lineStart int // Rune position of the last newline
}

type lexer struct {
	fileName string // The file name being lexed, only used for errors
	input    string // The input string
	source   *ast.Source

	pos  position // Current position in input
	prev position // Previous position in input

	tokens Tokens // The tokens that we've generated so far

	// Information about the token we are working on right now
	fodder        fodder
	tokenStart    int
	tokenStartLoc ast.Location
}

const lexEOF = -1

func makeLexer(fn string, input string) *lexer {
	return &lexer{
		fileName:      fn,
		input:         input,
		source:        ast.BuildSource(input),
		pos:           position{byteNo: 0, lineNo: 1, lineStart: 0},
		prev:          position{byteNo: lexEOF, lineNo: 0, lineStart: 0},
		tokenStartLoc: ast.Location{Line: 1, Column: 1},
	}
}

// next returns the next rune in the input.
func (l *lexer) next() rune {
	if int(l.pos.byteNo) >= len(l.input) {
		l.prev = l.pos
		return lexEOF
	}
	r, w := utf8.DecodeRuneInString(l.input[l.pos.byteNo:])
	l.prev = l.pos
	l.pos.byteNo += w
	if r == '\n' {
		l.pos.lineStart = l.pos.byteNo
		l.pos.lineNo++
	}
	return r
}

func (l *lexer) acceptN(n int) {
	for i := 0; i < n; i++ {
		l.next()
	}
}

// peek returns but does not consume the next rune in the input.
func (l *lexer) peek() rune {
	r := l.next()
	l.backup()
	return r
}

// backup steps back one rune. Can only be called once per call of next.
func (l *lexer) backup() {
	if l.prev.byteNo == lexEOF {
		panic("backup called with no valid previous rune")
	}
	l.pos = l.prev
	l.prev = position{byteNo: lexEOF}
}

func locationFromPosition(pos position) ast.Location {
	return ast.Location{Line: pos.lineNo, Column: pos.byteNo - pos.lineStart + 1}
}

func (l *lexer) location() ast.Location {
	return locationFromPosition(l.pos)
}

func (l *lexer) prevLocation() ast.Location {
	if l.prev.byteNo == lexEOF {
		panic("prevLocation called with no valid previous rune")
	}
	return locationFromPosition(l.prev)
}

// Reset the current working token start to the current cursor position.  This
// may throw away some characters.  This does not throw away any accumulated
// fodder.
func (l *lexer) resetTokenStart() {
	l.tokenStart = l.pos.byteNo
	l.tokenStartLoc = l.location()
}

func (l *lexer) emitFullToken(kind tokenKind, data, stringBlockIndent, stringBlockTermIndent string) {
	l.tokens = append(l.tokens, token{
		kind:                  kind,
		fodder:                l.fodder,
		data:                  data,
		stringBlockIndent:     stringBlockIndent,
		stringBlockTermIndent: stringBlockTermIndent,
		loc: ast.MakeLocationRange(l.fileName, l.source, l.tokenStartLoc, l.location()),
	})
	l.fodder = fodder{}
}

func (l *lexer) emitToken(kind tokenKind) {
	l.emitFullToken(kind, l.input[l.tokenStart:l.pos.byteNo], "", "")
	l.resetTokenStart()
}

func (l *lexer) addWhitespaceFodder() {
	fodderData := l.input[l.tokenStart:l.pos.byteNo]
	if len(l.fodder) == 0 || l.fodder[len(l.fodder)-1].kind != fodderWhitespace {
		l.fodder = append(l.fodder, fodderElement{kind: fodderWhitespace, data: fodderData})
	} else {
		l.fodder[len(l.fodder)-1].data += fodderData
	}
	l.resetTokenStart()
}

func (l *lexer) addCommentFodder(kind fodderKind) {
	fodderData := l.input[l.tokenStart:l.pos.byteNo]
	l.fodder = append(l.fodder, fodderElement{kind: kind, data: fodderData})
	l.resetTokenStart()
}

func (l *lexer) addFodder(kind fodderKind, data string) {
	l.fodder = append(l.fodder, fodderElement{kind: kind, data: data})
}

func (l *lexer) makeStaticErrorPoint(msg string, loc ast.Location) StaticError {
	return StaticError{Msg: msg, Loc: ast.MakeLocationRange(l.fileName, l.source, loc, loc)}
}

// lexNumber will consume a number and emit a token.  It is assumed
// that the next rune to be served by the lexer will be a leading digit.
func (l *lexer) lexNumber() error {
	// This function should be understood with reference to the linked image:
	// http://www.json.org/number.gif

	// Note, we deviate from the json.org documentation as follows:
	// There is no reason to lex negative numbers as atomic tokens, it is better to parse them
	// as a unary operator combined with a numeric literal.  This avoids x-1 being tokenized as
	// <identifier> <number> instead of the intended <identifier> <binop> <number>.

	type numLexState int
	const (
		numBegin numLexState = iota
		numAfterZero
		numAfterOneToNine
		numAfterDot
		numAfterDigit
		numAfterE
		numAfterExpSign
		numAfterExpDigit
	)

	state := numBegin

outerLoop:
	for true {
		r := l.next()
		switch state {
		case numBegin:
			switch {
			case r == '0':
				state = numAfterZero
			case r >= '1' && r <= '9':
				state = numAfterOneToNine
			default:
				// The caller should ensure the first rune is a digit.
				panic("Couldn't lex number")
			}
		case numAfterZero:
			switch r {
			case '.':
				state = numAfterDot
			case 'e', 'E':
				state = numAfterE
			default:
				break outerLoop
			}
		case numAfterOneToNine:
			switch {
			case r == '.':
				state = numAfterDot
			case r == 'e' || r == 'E':
				state = numAfterE
			case r >= '0' && r <= '9':
				state = numAfterOneToNine
			default:
				break outerLoop
			}
		case numAfterDot:
			switch {
			case r >= '0' && r <= '9':
				state = numAfterDigit
			default:
				return l.makeStaticErrorPoint(
					fmt.Sprintf("Couldn't lex number, junk after decimal point: %v", strconv.QuoteRuneToASCII(r)),
					l.prevLocation())
			}
		case numAfterDigit:
			switch {
			case r == 'e' || r == 'E':
				state = numAfterE
			case r >= '0' && r <= '9':
				state = numAfterDigit
			default:
				break outerLoop
			}
		case numAfterE:
			switch {
			case r == '+' || r == '-':
				state = numAfterExpSign
			case r >= '0' && r <= '9':
				state = numAfterExpDigit
			default:
				return l.makeStaticErrorPoint(
					fmt.Sprintf("Couldn't lex number, junk after 'E': %v", strconv.QuoteRuneToASCII(r)),
					l.prevLocation())
			}
		case numAfterExpSign:
			if r >= '0' && r <= '9' {
				state = numAfterExpDigit
			} else {
				return l.makeStaticErrorPoint(
					fmt.Sprintf("Couldn't lex number, junk after exponent sign: %v", strconv.QuoteRuneToASCII(r)),
					l.prevLocation())
			}

		case numAfterExpDigit:
			if r >= '0' && r <= '9' {
				state = numAfterExpDigit
			} else {
				break outerLoop
			}
		}
	}

	l.backup()
	l.emitToken(tokenNumber)
	return nil
}

// lexIdentifier will consume a identifer and emit a token.  It is assumed
// that the next rune to be served by the lexer will be a leading digit.  This
// may emit a keyword or an identifier.
func (l *lexer) lexIdentifier() {
	r := l.next()
	if !isIdentifierFirst(r) {
		panic("Unexpected character in lexIdentifier")
	}
	for ; r != lexEOF; r = l.next() {
		if !isIdentifier(r) {
			break
		}
	}
	l.backup()

	switch l.input[l.tokenStart:l.pos.byteNo] {
	case "assert":
		l.emitToken(tokenAssert)
	case "else":
		l.emitToken(tokenElse)
	case "error":
		l.emitToken(tokenError)
	case "false":
		l.emitToken(tokenFalse)
	case "for":
		l.emitToken(tokenFor)
	case "function":
		l.emitToken(tokenFunction)
	case "if":
		l.emitToken(tokenIf)
	case "import":
		l.emitToken(tokenImport)
	case "importstr":
		l.emitToken(tokenImportStr)
	case "in":
		l.emitToken(tokenIn)
	case "local":
		l.emitToken(tokenLocal)
	case "null":
		l.emitToken(tokenNullLit)
	case "self":
		l.emitToken(tokenSelf)
	case "super":
		l.emitToken(tokenSuper)
	case "tailstrict":
		l.emitToken(tokenTailStrict)
	case "then":
		l.emitToken(tokenThen)
	case "true":
		l.emitToken(tokenTrue)
	default:
		// Not a keyword, assume it is an identifier
		l.emitToken(tokenIdentifier)
	}
}

// lexSymbol will lex a token that starts with a symbol.  This could be a
// C or C++ comment, block quote or an operator.  This function assumes that the next
// rune to be served by the lexer will be the first rune of the new token.
func (l *lexer) lexSymbol() error {
	r := l.next()

	// Single line C++ style comment
	if r == '/' && l.peek() == '/' {
		l.next()
		l.resetTokenStart() // Throw out the leading //
		for r = l.next(); r != lexEOF && r != '\n'; r = l.next() {
		}
		// Leave the '\n' in the lexer to be fodder for the next round
		l.backup()
		l.addCommentFodder(fodderCommentCpp)
		return nil
	}

	if r == '/' && l.peek() == '*' {
		commentStartLoc := l.tokenStartLoc
		l.next()            // consume the '*'
		l.resetTokenStart() // Throw out the leading /*
		for r = l.next(); ; r = l.next() {
			if r == lexEOF {
				return l.makeStaticErrorPoint("Multi-line comment has no terminating */",
					commentStartLoc)
			}
			if r == '*' && l.peek() == '/' {
				commentData := l.input[l.tokenStart : l.pos.byteNo-1] // Don't include trailing */
				l.addFodder(fodderCommentC, commentData)
				l.next()            // Skip past '/'
				l.resetTokenStart() // Start next token at this point
				return nil
			}
		}
	}

	if r == '|' && strings.HasPrefix(l.input[l.pos.byteNo:], "||") {
		commentStartLoc := l.tokenStartLoc
		l.acceptN(2) // Skip "||"
		var cb bytes.Buffer

		// Skip whitespace
		for r = l.next(); r == ' ' || r == '\t' || r == '\r'; r = l.next() {
		}

		// Skip \n
		if r != '\n' {
			return l.makeStaticErrorPoint("Text block requires new line after |||.",
				commentStartLoc)
		}

		// Process leading blank lines before calculating stringBlockIndent
		for r = l.next(); r == '\n'; r = l.next() {
			cb.WriteRune(r)
		}
		l.backup()
		numWhiteSpace := checkWhitespace(l.input[l.pos.byteNo:], l.input[l.pos.byteNo:])
		stringBlockIndent := l.input[l.pos.byteNo : l.pos.byteNo+numWhiteSpace]
		if numWhiteSpace == 0 {
			return l.makeStaticErrorPoint("Text block's first line must start with whitespace",
				commentStartLoc)
		}

		for {
			if numWhiteSpace <= 0 {
				panic("Unexpected value for numWhiteSpace")
			}
			l.acceptN(numWhiteSpace)
			for r = l.next(); r != '\n'; r = l.next() {
				if r == lexEOF {
					return l.makeStaticErrorPoint("Unexpected EOF", commentStartLoc)
				}
				cb.WriteRune(r)
			}
			cb.WriteRune('\n')

			// Skip any blank lines
			for r = l.next(); r == '\n'; r = l.next() {
				cb.WriteRune(r)
			}
			l.backup()

			// Look at the next line
			numWhiteSpace = checkWhitespace(stringBlockIndent, l.input[l.pos.byteNo:])
			if numWhiteSpace == 0 {
				// End of the text block
				var stringBlockTermIndent string
				for r = l.next(); r == ' ' || r == '\t'; r = l.next() {
					stringBlockTermIndent += string(r)
				}
				l.backup()
				if !strings.HasPrefix(l.input[l.pos.byteNo:], "|||") {
					return l.makeStaticErrorPoint("Text block not terminated with |||", commentStartLoc)
				}
				l.acceptN(3) // Skip '|||'
				l.emitFullToken(tokenStringBlock, cb.String(),
					stringBlockIndent, stringBlockTermIndent)
				l.resetTokenStart()
				return nil
			}
		}
	}

	// Assume any string of symbols is a single operator.
	for r = l.next(); isSymbol(r); r = l.next() {
		// Not allowed // in operators
		if r == '/' && strings.HasPrefix(l.input[l.pos.byteNo:], "/") {
			break
		}
		// Not allowed /* in operators
		if r == '/' && strings.HasPrefix(l.input[l.pos.byteNo:], "*") {
			break
		}
		// Not allowed ||| in operators
		if r == '|' && strings.HasPrefix(l.input[l.pos.byteNo:], "||") {
			break
		}
	}

	l.backup()

	// Operators are not allowed to end with + - ~ ! unless they are one rune long.
	// So, wind it back if we need to, but stop at the first rune.
	// This relies on the hack that all operator symbols are ASCII and thus there is
	// no need to treat this substring as general UTF-8.
	for r = rune(l.input[l.pos.byteNo-1]); l.pos.byteNo > l.tokenStart+1; l.pos.byteNo-- {
		switch r {
		case '+', '-', '~', '!':
			continue
		}
		break
	}

	if l.input[l.tokenStart:l.pos.byteNo] == "$" {
		l.emitToken(tokenDollar)
	} else {
		l.emitToken(tokenOperator)
	}
	return nil
}

// Lex returns a slice of tokens recognised in input.
func Lex(fn string, input string) (Tokens, error) {
	l := makeLexer(fn, input)

	var err error

	for r := l.next(); r != lexEOF; r = l.next() {
		switch r {
		case ' ', '\t', '\r', '\n':
			l.addWhitespaceFodder()
			continue
		case '{':
			l.emitToken(tokenBraceL)
		case '}':
			l.emitToken(tokenBraceR)
		case '[':
			l.emitToken(tokenBracketL)
		case ']':
			l.emitToken(tokenBracketR)
		case ',':
			l.emitToken(tokenComma)
		case '.':
			l.emitToken(tokenDot)
		case '(':
			l.emitToken(tokenParenL)
		case ')':
			l.emitToken(tokenParenR)
		case ';':
			l.emitToken(tokenSemicolon)

		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			l.backup()
			err = l.lexNumber()
			if err != nil {
				return nil, err
			}

			// String literals
		case '"':
			stringStartLoc := l.prevLocation()
			for r = l.next(); ; r = l.next() {
				if r == lexEOF {
					return nil, l.makeStaticErrorPoint("Unterminated String", stringStartLoc)
				}
				if r == '"' {
					// Don't include the quotes in the token data
					l.emitFullToken(tokenStringDouble, l.input[l.tokenStart+1:l.pos.byteNo-1], "", "")
					l.resetTokenStart()
					break
				}
				if r == '\\' && l.peek() != lexEOF {
					r = l.next()
				}
			}
		case '\'':
			stringStartLoc := l.prevLocation()
			for r = l.next(); ; r = l.next() {
				if r == lexEOF {
					return nil, l.makeStaticErrorPoint("Unterminated String", stringStartLoc)
				}
				if r == '\'' {
					// Don't include the quotes in the token data
					l.emitFullToken(tokenStringSingle, l.input[l.tokenStart+1:l.pos.byteNo-1], "", "")
					l.resetTokenStart()
					break
				}
				if r == '\\' && l.peek() != lexEOF {
					r = l.next()
				}
			}
		case '@':
			// Verbatim string literals.
			// ' and " quoting is interpreted here, unlike non-verbatim strings
			// where it is done later by jsonnet_string_unescape.  This is OK
			// in this case because no information is lost by resoving the
			// repeated quote into a single quote, so we can go back to the
			// original form in the formatter.
			var data []rune
			stringStartLoc := l.prevLocation()
			quot := l.next()
			var kind tokenKind
			if quot == '"' {
				kind = tokenVerbatimStringDouble
			} else if quot == '\'' {
				kind = tokenVerbatimStringSingle
			} else {
				return nil, l.makeStaticErrorPoint(
					fmt.Sprintf("Couldn't lex verbatim string, junk after '@': %v", quot),
					stringStartLoc,
				)
			}
			for r = l.next(); ; r = l.next() {
				if r == lexEOF {
					return nil, l.makeStaticErrorPoint("Unterminated String", stringStartLoc)
				} else if r == quot {
					if l.peek() == quot {
						l.next()
						data = append(data, r)
					} else {
						l.emitFullToken(kind, string(data), "", "")
						l.resetTokenStart()
						break
					}
				} else {
					data = append(data, r)
				}
			}

		case '#':
			l.resetTokenStart() // Throw out the leading #
			for r = l.next(); r != lexEOF && r != '\n'; r = l.next() {
			}
			// Leave the '\n' in the lexer to be fodder for the next round
			l.backup()
			l.addCommentFodder(fodderCommentHash)

		default:
			if isIdentifierFirst(r) {
				l.backup()
				l.lexIdentifier()
			} else if isSymbol(r) {
				l.backup()
				err = l.lexSymbol()
				if err != nil {
					return nil, err
				}
			} else {
				return nil, l.makeStaticErrorPoint(
					fmt.Sprintf("Could not lex the character %s", strconv.QuoteRuneToASCII(r)),
					l.prevLocation())
			}

		}
	}

	// We are currently at the EOF.  Emit a special token to capture any
	// trailing fodder
	l.emitToken(tokenEndOfFile)
	return l.tokens, nil
}

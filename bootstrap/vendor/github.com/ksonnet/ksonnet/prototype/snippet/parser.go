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
	"regexp"
	"strconv"
)

func parse(template string, enforceFinalTabstop bool) *textmateSnippet {
	m := newSnippetParser().parse(template, true, enforceFinalTabstop)
	return newTextmateSnippet(m)
}

type snippetParser struct {
	tokenizer lexer
	currToken *token
	prevToken *token
}

func newSnippetParser() *snippetParser {
	return &snippetParser{
		tokenizer: *newLexer(),
	}
}

func (sp *snippetParser) parse(value string, insertFinalTabstop bool, enforceFinalTabstop bool) *markers {
	ms := markers{}

	sp.tokenizer.text(value)
	sp.currToken = sp.tokenizer.next()
	for sp.parseAny(&ms) || sp.parseText(&ms) {
		// Consume these tokens.
	}

	placeholderDefaultValues := map[int]*markers{}
	walkDefaults(&ms, placeholderDefaultValues)

	_, hasFinalTabstop := placeholderDefaultValues[0]
	shouldInsertFinalTabstop := insertFinalTabstop && len(placeholderDefaultValues) > 0 || enforceFinalTabstop
	if !hasFinalTabstop && shouldInsertFinalTabstop {
		// Insert final tabstop.
		//
		// By default, when the user finishes filling out a snippet, they expect
		// their cursor to be at the end of the snippet. So, here, if the user is
		// using snippets but there is no final tabstop defined, we simply insert
		// one.
		ms.append(newPlaceholder(0, &markers{}))
	}

	return &ms
}

func (sp *snippetParser) text(value string) string {
	return sp.parse(value, false, false).String()
}

func (sp *snippetParser) accept(kind tokenType) bool {
	if sp.currToken.kind == kind {
		sp.prevToken = sp.currToken
		sp.currToken = sp.tokenizer.next()
		return true
	}
	return false
}

func (sp *snippetParser) acceptAny() bool {
	sp.prevToken = sp.currToken
	sp.currToken = sp.tokenizer.next()
	return true
}

func (sp *snippetParser) parseAny(ms *markers) bool {
	if sp.parseEscaped(ms) {
		return true
	} else if sp.parseTM(ms) {
		return true
	}
	return false
}

func (sp *snippetParser) parseText(ms *markers) bool {
	if sp.currToken.kind != eof {
		ms.append(newText(sp.tokenizer.tokenText(sp.currToken)))
		sp.acceptAny()
		return true
	}
	return false
}

func (sp *snippetParser) parseTM(ms *markers) bool {
	if sp.accept(dollar) {
		if sp.accept(variableName) || sp.accept(number) {
			// Cases like `$FOO` or `$123`.
			idOrName := sp.tokenizer.tokenText(sp.prevToken)
			if i, ok := parseNumber(idOrName); ok {
				// Cases like `$123`.
				ms.append(newPlaceholder(i, &markers{}))
			} else {
				// Cases like `$FOO`.
				ms.append(newVariable(idOrName, &markers{}))
			}
			return true
		} else if sp.accept(curlyOpen) {
			// Cases like `${name:nginx}`.
			name := markers{}
			children := &markers{}
			target := &name

			for {
				if target != children && sp.accept(colon) {
					target = children
					continue
				}

				if sp.accept(curlyClose) {
					idOrName := name.String()
					if i, ok := parseNumber(idOrName); ok {
						ms.append(newPlaceholder(i, children))
					} else {
						ms.append(newVariable(idOrName, children))
					}
					return true
				}

				if sp.parseAny(target) || sp.parseText(target) {
					continue
				}

				// fallback
				if len(*children) > 0 {
					ms.append(newText("${" + name.String() + ":"))
					ms.append(*children...)
				} else {
					ms.append(newText("${"))
					ms.append(name...)
				}
				return true
			}
		}

		ms.append(newText("$"))
		return true
	}

	return false
}

func (sp *snippetParser) parseEscaped(ms *markers) bool {
	if sp.accept(backslash) {
		if sp.accept(dollar) || sp.accept(curlyClose) || sp.accept(backslash) {
			// Do nothing.
		}
		ms.append(newText(sp.tokenizer.tokenText(sp.prevToken)))
		return true
	}
	return false
}

func parseNumber(id string) (int, bool) {

	if matches, err := regexp.MatchString(`^\d+$`, id); err != nil {
		return 0, false
	} else if !matches {
		return 0, false
	}

	i, err := strconv.ParseInt(id, 0, 0)
	if err != nil {
		return 0, false
	}
	return int(i), true
}

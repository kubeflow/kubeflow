package ksonnet

import (
	"bytes"
	"strings"
	"unicode"
)

var (
	jsonnetKeywords = []string{"assert", "else", "error", "false", "for", "function", "if",
		"import", "importstr", "in", "null", "tailstrict", "then", "self", "super",
		"true"}
)

// camelCase converts a string to camel case.
func camelCase(in string) string {
	out := ""

	for i, r := range in {
		if i == 0 {
			out += strings.ToLower(string(r))
			continue
		}

		out += string(r)

	}

	return out
}

// stringInSlice returns true if the string is in the slice.
func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

// capitalizer adjusts the case of terms found in a string.
func toLower(b byte) byte {
	return byte(unicode.ToLower(rune(b)))
}

func isUpper(b byte) bool {
	return unicode.IsUpper(rune(b))
}

// capitalize adjusts the case of terms found in a string. It will convert `HTTPHeader` into
// `HttpHeader`.
func capitalize(in string) string {
	l := len(in) - 1

	if l == 0 {
		// nothing to do when there is a one character strings
		return in
	}

	var b bytes.Buffer
	b.WriteByte(in[0])

	for i := 1; i <= l; i++ {
		if isUpper(in[i-1]) {
			if i < l {
				if isUpper(in[i+1]) || (isUpper(in[i]) && i+1 == l) {
					b.WriteByte(toLower(in[i]))
				} else {
					b.WriteByte(in[i])
				}
			} else if i == l && isUpper(in[i]) {
				b.WriteByte(toLower(in[i]))
			} else {
				b.WriteByte(in[i])
			}
		} else {
			b.WriteByte(in[i])
		}
	}

	return b.String()
}

// FormatKind formats a string in kind format. i.e camel case with jsonnet keywords massaged.
func FormatKind(s string) string {
	if strings.ToLower(s) == "local" {
		return "localStorage"
	}

	if strings.HasPrefix(s, "$") {
		s = "dollar" + strings.Title(strings.TrimPrefix(s, "$"))
		return s
	}
	s = capitalize(s)
	s = camelCase(s)

	if stringInSlice(s, jsonnetKeywords) {
		s = s + "Param"
	}

	return s
}

// Copyright 2017 The kubecfg authors
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

package strings

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestIsASCIIIdentifier(t *testing.T) {
	tests := []struct {
		input    string
		expected bool
	}{
		{
			input:    "HelloWorld",
			expected: true,
		},
		{
			input:    "Hello World",
			expected: false,
		},
		{
			input:    "helloworld",
			expected: true,
		},
		{
			input:    "hello-world",
			expected: false,
		},
		{
			input:    "hello世界",
			expected: false,
		},
	}
	for _, test := range tests {
		require.EqualValues(t, test.expected, IsASCIIIdentifier(test.input))
	}
}

func TestQuoteNonASCII(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{
			input:    "HelloWorld",
			expected: "HelloWorld",
		},
		{
			input:    "Hello World",
			expected: `"Hello World"`,
		},
		{
			input:    "helloworld",
			expected: "helloworld",
		},
		{
			input:    "hello-world",
			expected: `"hello-world"`,
		},
		{
			input:    "hello世界",
			expected: `"hello世界"`,
		},
	}
	for _, test := range tests {
		require.EqualValues(t, test.expected, QuoteNonASCII(test.input))
	}
}

func TestNormalizeURL(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{
			input:    "host/path/./a/b/../c",
			expected: "host/path/a/c",
		},
		{
			input:    "HTTP://host",
			expected: "http://host",
		},
		{
			input:    "http://host:80",
			expected: "http://host",
		},
	}
	for _, test := range tests {
		normalized, err := NormalizeURL(test.input)
		if err != nil {
			t.Error(err)
		}

		require.EqualValues(t, test.expected, normalized)
	}
}

func TestTable(t *testing.T) {
	tests := []struct {
		header   Row
		body     []Row
		expected []FormattedRow
	}{
		{
			header: Row{
				Content: []string{
					"FOO-HEADER",
					"BAR-HEADER",
				},
			},
			body: []Row{
				Row{
					Content: []string{
						"foo",
						"bar",
					},
				},
				Row{
					Content: []string{
						"another-foo",
						"another-bar",
					},
				},
			},
			expected: []FormattedRow{
				FormattedRow{
					Content: "FOO-HEADER  BAR-HEADER",
				},
				FormattedRow{
					Content: "==========  ==========",
				},
				FormattedRow{
					Content: "foo         bar",
				},
				FormattedRow{
					Content: "another-foo another-bar",
				},
			},
		},
	}
	for _, test := range tests {
		formatted, err := Table(test.header, test.body)
		if err != nil {
			t.Error(err)
		}
		require.EqualValues(t, test.expected, formatted)
	}
}

func TestPadRows(t *testing.T) {
	tests := []struct {
		input    [][]string
		expected string
	}{
		{
			input:    [][]string{},
			expected: ``,
		},
		{
			input: [][]string{
				[]string{"Hello", "World"},
			},
			expected: "Hello World\n",
		},
		{
			input: [][]string{
				[]string{"Hello", "World"},
				[]string{"Hi", "World"},
			},
			expected: `Hello World
Hi    World
`,
		},
		{
			input: [][]string{
				[]string{"Hello"},
				[]string{"Hi", "World"},
			},
			expected: `Hello
Hi    World
`,
		},
		{
			input: [][]string{
				[]string{},
				[]string{"Hi", "World"},
			},
			expected: `
Hi World
`,
		},
		{
			input: [][]string{
				[]string{"Hello", "World"},
				[]string{""},
			},
			expected: `Hello World

`,
		},
		{
			input: [][]string{
				[]string{""},
				[]string{""},
			},
			expected: `

`,
		},
	}
	for _, test := range tests {
		padded, err := PadRows(test.input)
		if err != nil {
			t.Error(err)
		}
		require.EqualValues(t, test.expected, padded)
	}
}

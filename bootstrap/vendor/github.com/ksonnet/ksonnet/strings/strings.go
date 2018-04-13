// Copyright 2017 The ksonnet authors
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
	"bytes"
	"fmt"
	"strings"

	"github.com/PuerkitoBio/purell"
	"github.com/fatih/color"
)

// IsASCIIIdentifier takes a string and returns true if the string does not
// contain any special characters.
func IsASCIIIdentifier(s string) bool {
	f := func(r rune) bool {
		return r < 'A' || r > 'z'
	}
	if strings.IndexFunc(s, f) != -1 {
		return false
	}
	return true
}

// QuoteNonASCII puts quotes around an identifier that contains non-ASCII
// characters.
func QuoteNonASCII(s string) string {
	if !IsASCIIIdentifier(s) {
		return fmt.Sprintf(`"%s"`, s)
	}
	return s
}

// NormalizeURL uses purell's "usually safe normalization" algorithm to
// normalize URLs. This includes removing dot segments, removing trailing
// slashes, removing unnecessary escapes, removing default ports, and setting
// the URL to lowercase.
func NormalizeURL(s string) (string, error) {
	return purell.NormalizeURLString(s, purell.FlagsUsuallySafeGreedy)
}

// Row represents a table row.
type Row struct {
	Content []string
	Color   *color.Color
}

// FormattedRow represents a formatted table row.
type FormattedRow struct {
	Content string
	Color   *color.Color
}

// Table outputs a properly-aligned table.
func Table(headers Row, body []Row) ([]FormattedRow, error) {
	var dividers []string
	for _, header := range headers.Content {
		dividers = append(dividers, strings.Repeat("=", len(header)))
	}

	var rows []Row
	rows = append(rows, headers)
	rows = append(rows, Row{Content: dividers})
	for _, row := range body {
		rows = append(rows, row)
	}

	return padRows(rows)
}

// PadRows takes a string matrix and returns a string representation of a
// properly-aligned table.
func PadRows(rows [][]string) (string, error) {
	var tableRows []Row

	for _, row := range rows {
		var tableRow Row
		for _, col := range row {
			tableRow.Content = append(tableRow.Content, col)
		}
		tableRows = append(tableRows, tableRow)
	}

	formattedRows, err := padRows(tableRows)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	for _, row := range formattedRows {
		_, err := buf.WriteString(fmt.Sprintln(row.Content))
		if err != nil {
			return "", err
		}
	}

	return buf.String(), nil
}

func padRows(rows []Row) ([]FormattedRow, error) {
	var result []FormattedRow

	maxRowLen := 0
	for _, row := range rows {
		if rowLen := len(row.Content); rowLen > maxRowLen {
			maxRowLen = rowLen
		}
	}

	colMaxes := make([]int, maxRowLen)
	for currCol := 0; currCol < maxRowLen; currCol++ {
		for _, row := range rows {
			rowLen := len(row.Content)
			if currCol >= rowLen {
				continue
			}

			cellLen := len(row.Content[currCol])
			if currCol < rowLen && colMaxes[currCol] < cellLen {
				colMaxes[currCol] = cellLen
			}
		}
	}

	var err error
	for _, row := range rows {
		var buf bytes.Buffer
		for j, col := range row.Content {
			_, err = buf.WriteString(col)
			if err != nil {
				return nil, err
			}

			// Don't add space to the end of the last column.
			if j >= len(row.Content)-1 {
				continue
			}

			padSize := colMaxes[j] + 1 - len(col)
			_, err = buf.WriteString(strings.Repeat(" ", padSize))
			if err != nil {
				return nil, err
			}
		}

		result = append(result, FormattedRow{Content: buf.String(), Color: row.Color})
	}

	return result, nil
}

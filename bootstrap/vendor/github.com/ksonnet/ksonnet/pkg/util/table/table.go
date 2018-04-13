// Copyright 2018 The ksonnet authors
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

package table

import (
	"fmt"
	"io"
	"strings"

	"github.com/pkg/errors"
)

const (
	// sepChar is the character used to separate the header from the content in a table.
	sepChar = "="
)

// Table creates an output table.
type Table struct {
	w io.Writer

	header []string
	rows   [][]string
}

// New creates an instance of table.
func New(w io.Writer) *Table {
	return &Table{
		w: w,
	}
}

// SetHeader sets the header for the table.
func (t *Table) SetHeader(columns []string) {
	t.header = columns
}

// Append appends a row to the table.
func (t *Table) Append(row []string) {
	t.rows = append(t.rows, row)
}

// AppendBulk appends multiple rows to the table.
func (t *Table) AppendBulk(rows [][]string) {
	t.rows = append(t.rows, rows...)
}

// Render writes the output to the table's writer.
func (t *Table) Render() error {
	var output [][]string

	if len(t.header) > 0 {
		headerRow := make([]string, len(t.header), len(t.header))
		sepRow := make([]string, len(t.header), len(t.header))

		for i := range t.header {
			sepLen := len(t.header[i])
			headerRow[i] = strings.ToUpper(t.header[i])
			sepRow[i] = strings.Repeat(sepChar, sepLen)
		}

		output = append(output, headerRow, sepRow)
	}

	output = append(output, t.rows...)

	counts := colLens(output)

	// print rows
	for _, row := range output {
		var parts []string
		for i, col := range row {
			val := col
			if i < len(row)-1 {
				format := fmt.Sprintf("%%-%ds", counts[i])
				val = fmt.Sprintf(format, col)
			}
			parts = append(parts, val)

		}

		_, err := fmt.Fprintf(t.w, "%s\n", strings.TrimSpace(strings.Join(parts, " ")))
		if err != nil {
			return errors.Wrap(err, "render table")
		}
	}

	return nil
}

func colLens(rows [][]string) []int {
	// count the number of columns
	colCount := 0
	for _, row := range rows {
		if l := len(row); l > colCount {
			colCount = l
		}
	}

	// get the max len for each column
	counts := make([]int, colCount, colCount)
	for _, row := range rows {
		for i := range row {
			if l := len(row[i]); l > counts[i] {
				counts[i] = l
			}
		}
	}

	return counts
}

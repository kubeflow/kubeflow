package ksonnet

import (
	"bytes"
	"fmt"
	"strings"
)

// indentWriter abstracts the task of writing out indented text to a
// buffer. Different components can call `indent` and `dedent` as
// appropriate to specify how indentation needs to change, rather than
// to keep track of the current indentation.
//
// For example, if one component is responsible for writing an array,
// and an element in that array is a function, the component
// responsible for the array need only know to call `indent` after the
// '[' character and `dedent` before the ']' character, while the
// routine responsible for writing out the function can handle its own
// indentation independently.
type indentWriter struct {
	depth  int
	err    error
	buffer bytes.Buffer
}

func newIndentWriter() *indentWriter {
	var buffer bytes.Buffer
	return &indentWriter{
		depth:  0,
		err:    nil,
		buffer: buffer,
	}
}

func (m *indentWriter) writeLine(text string) {
	if m.err != nil {
		return
	}
	prefix := strings.Repeat("  ", m.depth)
	line := fmt.Sprintf("%s%s\n", prefix, text)
	_, m.err = m.buffer.WriteString(line)
}

func (m *indentWriter) bytes() ([]byte, error) {
	if m.err != nil {
		return nil, m.err
	}

	return m.buffer.Bytes(), nil
}

func (m *indentWriter) indent() {
	m.depth++
}

func (m *indentWriter) dedent() {
	m.depth--
}

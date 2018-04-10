/*
Copyright 2017 Google Inc. All rights reserved.

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

package ast

import (
	"bytes"
	"fmt"
)

// Source represents a source file.
type Source struct {
	lines []string
}

//////////////////////////////////////////////////////////////////////////////
// Location

// Location represents a single location in an (unspecified) file.
type Location struct {
	Line int
	// Column is a byte offset from the beginning of the line
	Column int
}

// IsSet returns if this Location has been set.
func (l *Location) IsSet() bool {
	return l.Line != 0
}

func (l *Location) String() string {
	return fmt.Sprintf("%v:%v", l.Line, l.Column)
}

func locationBefore(a Location, b Location) bool {
	if a.Line != b.Line {
		return a.Line < b.Line
	}
	return a.Column < b.Column
}

//////////////////////////////////////////////////////////////////////////////
// LocationRange

// LocationRange represents a range of a source file.
type LocationRange struct {
	FileName string
	Begin    Location
	End      Location // TODO(sbarzowski) inclusive? exclusive? a gap?
	file     *Source
}

// LocationRangeBetween returns a LocationRange containing both a and b.
func LocationRangeBetween(a, b *LocationRange) LocationRange {
	if a.file != b.file {
		panic("Cannot create a LocationRange between different files")
	}
	return MakeLocationRange(a.FileName, a.file, a.Begin, b.End)
}

// IsSet returns if this LocationRange has been set.
func (lr *LocationRange) IsSet() bool {
	return lr.Begin.IsSet()
}

func (lr *LocationRange) String() string {
	if !lr.IsSet() {
		return lr.FileName
	}

	var filePrefix string
	if len(lr.FileName) > 0 {
		filePrefix = lr.FileName + ":"
	}
	if lr.Begin.Line == lr.End.Line {
		if lr.Begin.Column == lr.End.Column {
			return fmt.Sprintf("%s%v", filePrefix, lr.Begin.String())
		}
		return fmt.Sprintf("%s%v-%v", filePrefix, lr.Begin.String(), lr.End.Column)
	}

	return fmt.Sprintf("%s(%v)-(%v)", filePrefix, lr.Begin.String(), lr.End.String())
}

// WithCode returns true iff the LocationRange is linked to code.
// TODO: This is identical to lr.IsSet(). Is it required at all?
func (lr *LocationRange) WithCode() bool {
	return lr.Begin.Line != 0
}

// MakeLocationRangeMessage creates a pseudo-LocationRange with a message but no
// location information. This is useful for special locations, e.g.
// manifestation entry point.
func MakeLocationRangeMessage(msg string) LocationRange {
	return LocationRange{FileName: msg}
}

// MakeLocationRange creates a LocationRange.
func MakeLocationRange(fn string, fc *Source, begin Location, end Location) LocationRange {
	return LocationRange{FileName: fn, file: fc, Begin: begin, End: end}
}

// SourceProvider represents a source provider.
// TODO: Need an explanation of why this exists.
type SourceProvider struct {
}

// GetSnippet returns a code snippet corresponding to loc.
func (sp *SourceProvider) GetSnippet(loc LocationRange) string {
	var result bytes.Buffer
	if loc.Begin.Line == 0 {
		return ""
	}
	for i := loc.Begin.Line; i <= loc.End.Line; i++ {
		inLineRange := trimToLine(loc, i)
		for j := inLineRange.Begin.Column; j < inLineRange.End.Column; j++ {
			result.WriteByte(loc.file.lines[i-1][j-1])
		}
		if i != loc.End.Line {
			result.WriteByte('\n')
		}
	}
	return result.String()
}

// BuildSource transforms a source file string into a Source struct.
// TODO: This seems like a job for strings.Split() with a final \n touch-up.
func BuildSource(s string) *Source {
	var result []string
	var lineBuf bytes.Buffer
	for _, runeValue := range s {
		lineBuf.WriteRune(runeValue)
		if runeValue == '\n' {
			result = append(result, lineBuf.String())
			lineBuf.Reset()
		}
	}
	rest := lineBuf.String()
	// Stuff after last end-of-line (EOF or some more code)
	result = append(result, rest+"\n")
	return &Source{result}
}

func trimToLine(loc LocationRange, line int) LocationRange {
	if loc.Begin.Line > line {
		panic("invalid")
	}
	if loc.Begin.Line != line {
		loc.Begin.Column = 1
	}
	loc.Begin.Line = line
	if loc.End.Line < line {
		panic("invalid")
	}
	if loc.End.Line != line {
		loc.End.Column = len(loc.file.lines[line-1])
	}
	loc.End.Line = line
	return loc
}

// LineBeginning returns the part of a line directly before LocationRange
// for example:
// local x = foo()
//           ^^^^^ <- LocationRange loc
// then
// local x = foo()
// ^^^^^^^^^^ <- lineBeginning(loc)
func LineBeginning(loc *LocationRange) LocationRange {
	return LocationRange{
		Begin:    Location{Line: loc.Begin.Line, Column: 1},
		End:      loc.Begin,
		FileName: loc.FileName,
		file:     loc.file,
	}
}

// LineEnding returns the part of a line directly after LocationRange
// for example:
// local x = foo() + test
//           ^^^^^ <- LocationRange loc
// then
// local x = foo() + test
//                ^^^^^^^ <- lineEnding(loc)
func LineEnding(loc *LocationRange) LocationRange {
	return LocationRange{
		Begin:    loc.End,
		End:      Location{Line: loc.End.Line, Column: len(loc.file.lines[loc.End.Line-1])},
		FileName: loc.FileName,
		file:     loc.file,
	}
}

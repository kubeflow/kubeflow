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

package ast

import "sort"

// AddIdentifiers adds a slice of identifiers to an identifier set.
func (i IdentifierSet) AddIdentifiers(idents Identifiers) {
	for _, ident := range idents {
		i.Add(ident)
	}
}

// ToOrderedSlice returns the elements of the current set as an ordered slice.
func (i IdentifierSet) ToOrderedSlice() []Identifier {
	var s []Identifier
	for v := range i {
		s = append(s, v)
	}
	sort.Sort(identifierSorter(s))
	return s
}

type identifierSorter []Identifier

func (s identifierSorter) Len() int           { return len(s) }
func (s identifierSorter) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
func (s identifierSorter) Less(i, j int) bool { return s[i] < s[j] }

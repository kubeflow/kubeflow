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

package prototype

import "github.com/ghodss/yaml"

// Unmarshal takes the bytes of a JSON-encoded prototype specification, and
// deserializes them to a `SpecificationSchema`.
func Unmarshal(bytes []byte) (*SpecificationSchema, error) {
	var p SpecificationSchema
	err := yaml.Unmarshal(bytes, &p)
	if err != nil {
		return nil, err
	}

	if err = p.validate(); err != nil {
		return nil, err
	}

	return &p, nil
}

// SearchOptions represents the type of prototype search to execute on an
// `Index`.
type SearchOptions int

const (
	// Prefix represents a search over prototype name prefixes.
	Prefix SearchOptions = iota

	// Suffix represents a search over prototype name suffixes.
	Suffix

	// Substring represents a search over substrings of prototype names.
	Substring
)

// Index represents a queryable index of prototype specifications.
type Index interface {
	List() (SpecificationSchemas, error)
	SearchNames(query string, opts SearchOptions) (SpecificationSchemas, error)
}

// NewIndex constructs an index of prototype specifications from a list.
func NewIndex(prototypes []*SpecificationSchema) Index {
	idx := map[string]*SpecificationSchema{}

	for _, p := range defaultPrototypes {
		idx[p.Name] = p
	}

	for _, p := range prototypes {
		idx[p.Name] = p
	}

	return &index{
		prototypes: idx,
	}
}

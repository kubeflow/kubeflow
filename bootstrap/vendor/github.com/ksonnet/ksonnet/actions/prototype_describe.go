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

package actions

import (
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/pkg/errors"
)

// RunPrototypeDescribe runs `prototype describe`
func RunPrototypeDescribe(m map[string]interface{}) error {
	pd, err := NewPrototypeDescribe(m)
	if err != nil {
		return err
	}

	return pd.Run()
}

// PrototypeDescribe describes a prototype.
type PrototypeDescribe struct {
	app             app.App
	out             io.Writer
	query           string
	appPrototypesFn func(app.App, pkg.Descriptor) (prototype.SpecificationSchemas, error)
}

// NewPrototypeDescribe creates an instance of PrototypeDescribe
func NewPrototypeDescribe(m map[string]interface{}) (*PrototypeDescribe, error) {
	ol := newOptionLoader(m)

	pd := &PrototypeDescribe{
		app:   ol.loadApp(),
		query: ol.loadString(OptionQuery),

		out:             os.Stdout,
		appPrototypesFn: pkg.LoadPrototypes,
	}

	return pd, nil
}

// Run runs the env list action.
func (pd *PrototypeDescribe) Run() error {
	prototypes, err := allPrototypes(pd.app, pd.appPrototypesFn)
	if err != nil {
		return err
	}

	index := prototype.NewIndex(prototypes)

	prototypes, err = index.List()
	if err != nil {
		return err
	}

	p, err := findUniquePrototype(pd.query, prototypes)
	if err != nil {
		return err
	}

	fmt.Fprintln(pd.out, `PROTOTYPE NAME:`)
	fmt.Fprintln(pd.out, p.Name)
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `DESCRIPTION:`)
	fmt.Fprintln(pd.out, p.Template.Description)
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `REQUIRED PARAMETERS:`)
	fmt.Fprintln(pd.out, p.RequiredParams().PrettyString("  "))
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `OPTIONAL PARAMETERS:`)
	fmt.Fprintln(pd.out, p.OptionalParams().PrettyString("  "))
	fmt.Fprintln(pd.out)
	fmt.Fprintln(pd.out, `TEMPLATE TYPES AVAILABLE:`)
	fmt.Fprintf(pd.out, "  %s\n", p.Template.AvailableTemplates())

	return nil
}

type prototypeFn func(app.App, pkg.Descriptor) (prototype.SpecificationSchemas, error)

func allPrototypes(a app.App, appPrototypes prototypeFn) (prototype.SpecificationSchemas, error) {
	libraries, err := a.Libraries()
	if err != nil {
		return nil, err
	}

	var prototypes prototype.SpecificationSchemas

	for _, library := range libraries {
		d := pkg.Descriptor{
			Registry: library.Registry,
			Part:     library.Name,
		}

		p, err := appPrototypes(a, d)
		if err != nil {
			return nil, err
		}

		prototypes = append(prototypes, p...)
	}

	return prototypes, nil
}

func findUniquePrototype(query string, prototypes prototype.SpecificationSchemas) (*prototype.SpecificationSchema, error) {
	index := prototype.NewIndex(prototypes)

	sameSuffix, err := index.SearchNames(query, prototype.Suffix)
	if err != nil {
		return nil, err
	}

	if len(sameSuffix) == 1 {
		// Success.
		return sameSuffix[0], nil
	} else if len(sameSuffix) > 1 {
		// Ambiguous match.
		names := specNames(sameSuffix)
		return nil, errors.Errorf("ambiguous match for '%s': %s", query, strings.Join(names, ", "))
	} else {
		// No matches.
		substring, err := index.SearchNames(query, prototype.Substring)
		if err != nil || len(substring) == 0 {
			return nil, errors.Errorf("no prototype names matched '%s'", query)
		}

		partialMatches := specNames(substring)
		partials := strings.Join(partialMatches, "\n")
		return nil, errors.Errorf("no prototype names matched '%s'; a list of partial matches: %s", query, partials)
	}
}

func specNames(prototypes []*prototype.SpecificationSchema) []string {
	partialMatches := []string{}
	for _, proto := range prototypes {
		partialMatches = append(partialMatches, proto.Name)
	}

	return partialMatches
}

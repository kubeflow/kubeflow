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

import (
	"bytes"
	"fmt"
	"strconv"
	"strings"

	"github.com/blang/semver"
	"github.com/pkg/errors"
)

//
// NOTE: These members would ordinarily be private and exposed by interfaces,
// but because Go requires public structs for un/marshalling, it is more
// convenient to simply expose all of them.
//

const (
	DefaultAPIVersion = "0.0.1"

	apiVersionTag       = "@apiVersion"
	nameTag             = "@name"
	descriptionTag      = "@description"
	shortDescriptionTag = "@shortDescription"
	paramTag            = "@param"
	optParamTag         = "@optionalParam"
)

func FromJsonnet(data string) (*SpecificationSchema, error) {
	// Get comment block at the top of the file.
	seenCommentLine := false
	commentBlock := []string{}
	text := strings.Split(data, "\n")
	lastCommentLine := 0
	for i, line := range text {
		const commentPrefix = "// "
		line = strings.TrimSpace(line)

		// Skip blank lines
		if line == "" && !seenCommentLine {
			continue
		}

		if !strings.HasPrefix(line, "//") {
			lastCommentLine = i
			break
		}

		seenCommentLine = true

		// Reject comments formatted like this, with no space between '//'
		// and the first word:
		//
		//   //Foo
		//
		// But not the empty comment line:
		//
		//   //
		//
		// Also, trim any leading space between the '//' characters and
		// the first word, and place that in `commentBlock`.
		if !strings.HasPrefix(line, commentPrefix) {
			if len(line) > 3 {
				return nil, fmt.Errorf("Prototype heading comments are required to have a space after the '//' that begins the line")
			}
			commentBlock = append(commentBlock, strings.TrimPrefix(line, "//"))
		} else {
			commentBlock = append(commentBlock, strings.TrimPrefix(line, commentPrefix))
		}
	}

	// Parse the prototypeInfo from the heading comment block.
	pinfo := SpecificationSchema{}
	pinfo.Template.JsonnetBody = text[lastCommentLine+1:]
	firstPass := true
	openTag := ""
	var openText bytes.Buffer
	for _, line := range commentBlock {
		split := strings.SplitN(line, " ", 2)
		if len(split) < 1 {
			continue
		}

		if len(line) == 0 || strings.HasPrefix(line, " ") {
			if openTag == "" {
				return nil, fmt.Errorf("Free text is not allowed in heading comment of prototype spec, all text must be in a field. The line of the error:\n'%s'", line)
			}
			openText.WriteString(strings.TrimSpace(line) + "\n")
			continue
		} else if len(split) < 2 {
			return nil, fmt.Errorf("Invalid field '%s', fields must have a non-whitespace value", line)
		}

		if err := pinfo.addField(openTag, openText.String()); !firstPass && err != nil {
			return nil, err
		}
		openTag = split[0]
		openText = bytes.Buffer{}
		openText.WriteString(strings.TrimSpace(split[1]))
		switch split[0] {
		case apiVersionTag, nameTag, descriptionTag, shortDescriptionTag, paramTag, optParamTag: // Do nothing.
		default:
			return nil, fmt.Errorf(`Line in prototype heading comment is formatted incorrectly; '%s' is not
recognized as a tag. Only tags can begin lines, and text that is wrapped must
be indented. For example:
  // @description This is a long description
  //   that we are wrapping on two lines`, split[0])
		}

		firstPass = false
	}

	if err := pinfo.addField(openTag, openText.String()); !firstPass && err != nil {
		return nil, err
	}

	if pinfo.Name == "" || pinfo.Template.JsonnetBody == nil || pinfo.Template.Description == "" {
		return nil, fmt.Errorf("Invalid prototype specification, all fields are required. Object:\n%v", pinfo)
	}

	return &pinfo, nil
}

// SpecificationSchema is the JSON-serializable representation of a prototype
// specification.
type SpecificationSchema struct {
	APIVersion string `json:"apiVersion"`
	Kind       string `json:"kind"`

	// Unique identifier of the mixin library. The most reliable way to make a
	// name unique is to embed a domain you own into the name, as is commonly done
	// in the Java community.
	Name     string        `json:"name"`
	Params   ParamSchemas  `json:"params"`
	Template SnippetSchema `json:"template"`
}

func (s *SpecificationSchema) validate() error {
	compatVer, _ := semver.Make(DefaultAPIVersion)
	ver, err := semver.Make(s.APIVersion)
	if err != nil {
		return errors.Wrap(err, "Failed to parse version in app spec")
	} else if compatVer.Compare(ver) != 0 {
		return fmt.Errorf(
			"Current app uses unsupported spec version '%s' (this client only supports %s)",
			s.APIVersion,
			DefaultAPIVersion)
	}

	return nil
}

// SpecificationSchemas is a slice of pointer to `SpecificationSchema`.
type SpecificationSchemas []*SpecificationSchema

// RequiredParams retrieves all parameters that are required by a prototype.
func (s *SpecificationSchema) RequiredParams() ParamSchemas {
	reqd := ParamSchemas{}
	for _, p := range s.Params {
		if p.Default == nil {
			reqd = append(reqd, p)
		}
	}

	return reqd
}

func (s *SpecificationSchema) addField(tag, text string) error {
	switch tag {
	case apiVersionTag:
	case nameTag:
		if s.Name != "" {
			return fmt.Errorf("Prototype heading comment has two '@name' fields")
		}
		s.Name = text
	case descriptionTag:
		if s.Template.Description != "" {
			return fmt.Errorf("Prototype heading comment has two '@description' fields")
		}
		s.Template.Description = text
	case shortDescriptionTag:
		if s.Template.ShortDescription != "" {
			return fmt.Errorf("Prototype heading comment has two '@shortDescription' fields")
		}
		s.Template.ShortDescription = text
	case paramTag:
		// NOTE: There is usually more than one `@param`, so we don't
		// check length here.

		split := strings.SplitN(text, " ", 3)
		if len(split) < 3 {
			return fmt.Errorf("Param fields must have '<name> <type> <description>, but got:\n%s", text)
		}

		pt, err := parseParamType(split[1])
		if err != nil {
			return err
		}

		s.Params = append(s.Params, &ParamSchema{
			Name:        split[0],
			Alias:       &split[0],
			Description: split[2],
			Default:     nil,
			Type:        pt,
		})
	case optParamTag:
		// NOTE: There is usually more than one `@optionalParam`, so we
		// don't check length here.

		split := strings.SplitN(text, " ", 4)
		if len(split) < 4 {
			return fmt.Errorf("Optional param fields must have '<name> <type> <default-val> <description> (<default-val> currently cannot contain spaces), but got:\n%s", text)
		}

		pt, err := parseParamType(split[1])
		if err != nil {
			return err
		}

		s.Params = append(s.Params, &ParamSchema{
			Name:        split[0],
			Alias:       &split[0],
			Default:     &split[2],
			Description: split[3],
			Type:        pt,
		})
	default:
		return fmt.Errorf(`Line in prototype heading comment is formatted incorrectly; '%s' is not
recognized as a tag. Only tags can begin lines, and text that is wrapped must
be indented. For example:
// @description This is a long description
//   that we are wrapping on two lines`, tag)
	}

	return nil
}

// OptionalParams retrieves all parameters that can optionally be provided to a
// prototype.
func (s *SpecificationSchema) OptionalParams() ParamSchemas {
	opt := ParamSchemas{}
	for _, p := range s.Params {
		if p.Default != nil {
			opt = append(opt, p)
		}
	}

	return opt
}

// TemplateType represents the possible type of a prototype.
type TemplateType string

const (
	// YAML represents a prototype written in YAML.
	YAML TemplateType = "yaml"

	// JSON represents a prototype written in JSON.
	JSON TemplateType = "json"

	// Jsonnet represents a prototype written in Jsonnet.
	Jsonnet TemplateType = "jsonnet"
)

// ParseTemplateType attempts to parse a string as a `TemplateType`.
func ParseTemplateType(t string) (TemplateType, error) {
	switch strings.ToLower(t) {
	case "yaml":
		return YAML, nil
	case "json":
		return JSON, nil
	case "jsonnet":
		return Jsonnet, nil
	default:
		return "", fmt.Errorf("Unrecognized template type '%s'; must be one of: [yaml, json, jsonnet]", t)
	}
}

// SnippetSchema is the JSON-serializable representation of the TextMate snippet
// specification, as implemented by the Language Server Protocol.
type SnippetSchema struct {
	Prefix string `json:"prefix"`

	// Description describes what the prototype does.
	Description string `json:"description"`

	// ShortDescription briefly describes what the prototype does.
	ShortDescription string `json:"shortDescription"`

	// Various body types of the prototype. Follows the TextMate snippets syntax,
	// with several features disallowed. At least one of these is required to be
	// filled out.
	JSONBody    []string `json:"jsonBody"`
	YAMLBody    []string `json:"yamlBody"`
	JsonnetBody []string `json:"jsonnetBody"`
}

// Body attempts to retrieve the template body associated with some
// type `t`.
func (schema *SnippetSchema) Body(t TemplateType) (template []string, err error) {
	switch t {
	case YAML:
		template = schema.YAMLBody
	case JSON:
		template = schema.JSONBody
	case Jsonnet:
		template = schema.JsonnetBody
	default:
		return nil, fmt.Errorf("Unrecognized template type '%s'; must be one of: [yaml, json, jsonnet]", t)
	}

	if len(template) == 0 {
		available := schema.AvailableTemplates()
		err = fmt.Errorf("Template does not have a template for type '%s'. Available types: %s", t, available)
	}

	return
}

// AvailableTemplates returns the list of available `TemplateType`s this
// prototype implements.
func (schema *SnippetSchema) AvailableTemplates() (ts []TemplateType) {
	if len(schema.YAMLBody) != 0 {
		ts = append(ts, YAML)
	}

	if len(schema.JSONBody) != 0 {
		ts = append(ts, JSON)
	}

	if len(schema.JsonnetBody) != 0 {
		ts = append(ts, Jsonnet)
	}

	return
}

// ParamType represents a type constraint for a prototype parameter (e.g., it
// must be a number).
type ParamType string

const (
	// Number represents a prototype parameter that must be a number.
	Number ParamType = "number"

	// String represents a prototype parameter that must be a string.
	String ParamType = "string"

	// NumberOrString represents a prototype parameter that must be either a
	// number or a string.
	NumberOrString ParamType = "numberOrString"

	// Object represents a prototype parameter that must be an object.
	Object ParamType = "object"

	// Array represents a prototype parameter that must be a array.
	Array ParamType = "array"
)

func parseParamType(t string) (ParamType, error) {
	switch t {
	case "number":
		return Number, nil
	case "string":
		return String, nil
	case "numberOrString":
		return NumberOrString, nil
	case "object":
		return Object, nil
	case "array":
		return Array, nil
	default:
		return "", fmt.Errorf("Unknown param type '%s'", t)
	}
}

func (pt ParamType) String() string {
	switch pt {
	case Number:
		return "number"
	case String:
		return "string"
	case NumberOrString:
		return "number-or-string"
	case Object:
		return "object"
	case Array:
		return "array"
	default:
		return "unknown"
	}
}

// ParamSchema is the JSON-serializable representation of a parameter provided
// to a prototype.
type ParamSchema struct {
	Name        string    `json:"name"`
	Alias       *string   `json:"alias"` // Optional.
	Description string    `json:"description"`
	Default     *string   `json:"default"` // `nil` only if the parameter is optional.
	Type        ParamType `json:"type"`
}

// Quote will parse a prototype parameter and quote it appropriately, so that it
// shows up correctly in Jsonnet source code. For example, `--image nginx` would
// likely need to show up as `"nginx"` in Jsonnet source.
func (ps *ParamSchema) Quote(value string) (string, error) {
	switch ps.Type {
	case Number:
		_, err := strconv.ParseFloat(value, 64)
		if err != nil {
			return "", fmt.Errorf("Could not convert parameter '%s' to a number", ps.Name)
		}
		return value, nil
	case String:
		return fmt.Sprintf("\"%s\"", value), nil
	case NumberOrString:
		_, err := strconv.ParseFloat(value, 64)
		if err == nil {
			return value, nil
		}
		return fmt.Sprintf("\"%s\"", value), nil
	case Array, Object:
		return value, nil
	default:
		return "", fmt.Errorf("Unknown param type for param '%s'", ps.Name)
	}
}

// RequiredParam constructs a required parameter, i.e., a parameter that is
// meant to be required by some prototype, somewhere.
func RequiredParam(name, alias, description string, t ParamType) *ParamSchema {
	return &ParamSchema{
		Name:        name,
		Alias:       &alias,
		Description: description,
		Default:     nil,
		Type:        t,
	}
}

// OptionalParam constructs an optional parameter, i.e., a parameter that is
// meant to be optionally provided to some prototype, somewhere.
func OptionalParam(name, alias, description, defaultVal string, t ParamType) *ParamSchema {
	return &ParamSchema{
		Name:        name,
		Alias:       &alias,
		Description: description,
		Default:     &defaultVal,
		Type:        t,
	}
}

// ParamSchemas is a slice of `ParamSchema`
type ParamSchemas []*ParamSchema

// PrettyString creates a prettified string representing a collection of
// parameters.
func (ps ParamSchemas) PrettyString(prefix string) string {
	if len(ps) == 0 {
		return "  [none]"
	}

	flags := []string{}
	for _, p := range ps {
		alias := p.Name
		if p.Alias != nil {
			alias = *p.Alias
		}
		flags = append(flags, fmt.Sprintf("--%s=<%s>", p.Name, alias))
	}

	max := 0
	for _, flag := range flags {
		if flagLen := len(flag); max < flagLen {
			max = flagLen
		}
	}

	prettyFlags := []string{}
	for i := range flags {
		p := ps[i]
		flag := flags[i]

		var info string
		if p.Default != nil {
			info = fmt.Sprintf(" [default: %s, type: %s]", *p.Default, p.Type.String())
		} else {
			info = fmt.Sprintf(" [type: %s]", p.Type.String())
		}

		// NOTE: If we don't add 1 here, the longest line will look like:
		// `--flag=<flag>Description is here.`
		space := strings.Repeat(" ", max-len(flag)+1)
		pretty := fmt.Sprintf(prefix + flag + space + p.Description + info)
		prettyFlags = append(prettyFlags, pretty)
	}

	return strings.Join(prettyFlags, "\n")
}

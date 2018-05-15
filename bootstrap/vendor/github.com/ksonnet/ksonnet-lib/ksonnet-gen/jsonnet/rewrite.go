// Package jsonnet contains a collection of simple rewriting
// facilities that allow us to easily map text from the OpenAPI spec
// to things that are Jsonnet-friendly (e.g., renaming identifiers
// that are Jsonnet keywords, lowerCamelCase'ing names, and so on).
package jsonnet

import (
	"fmt"
	"log"
	"strings"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubeversion"
)

// FieldKey represents the literal text of a key for some JSON object
// field, after rewriting to avoid collisions with Jsonnet keywords.
// For example, for `{foo: ...}`, the `FieldKey` would be `foo`, while
// for `{error: ...}`, the `FieldKey` would be `"error"` (with
// quotation marks, to avoid collisions).
type FieldKey string

// FuncParam represents the parameter to a Jsonnet function, after
// being rewritten to avoid collisions with Jsonnet keywords and
// normalized to fit the Jsonnet style (i.e., lowerCamelCase) using a
// manual set of custom transformations that change per Kubernetes
// version. For example, in `foo(BarAPI) {...}`, `FuncParam` would be
// `barApi`, and in `foo(error) {...}`, `FuncParam` would be
// `errorParam`.
type FuncParam string

// Identifier represents any identifier in a Jsonnet program, after
// being normalized to fit the Jsonnet style (i.e., lowerCamelCase)
// using a manual set of custom transformations that change per
// Kubernetes version. For example, `fooAPI` becomes `fooApi`.
type Identifier string

func (id Identifier) ToSetterID() Identifier {
	return Identifier("with" + strings.Title(string(id)))
}

func (id Identifier) ToMixinID() Identifier {
	return Identifier("with" + strings.Title(string(id)) + "Mixin")
}

// RewriteAsFieldKey takes a `PropertyName` and converts it to a valid
// Jsonnet field name. For example, if the `PropertyName` has a value
// of `"error"`, then this would generate an invalid object, `{error:
// ...}`. Hence, this function will quote this string, so that it ends
// up like: `{"error": ...}`.
func RewriteAsFieldKey(text kubespec.PropertyName) FieldKey {
	// NOTE: Because the field needs to have precisely the same text as
	// the Kubernetes API spec, we do not compute a version-specific ID
	// alias as we do for other rewrites.
	if _, ok := jsonnetKeywordSet[text]; ok {
		return FieldKey(fmt.Sprintf("\"%s\"", text))
	}
	return FieldKey(text)
}

// RewriteAsFuncParam takes a `PropertyName` and converts it to a
// valid Jsonnet function parameter. For example, if the
// `PropertyName` has a value of `"error"`, then this would generate
// an invalid function parameter, `function(error) ...`. Hence, this
// function will alter the identifier, so that it ends up like:
// `function(errorParam) ...`.
//
// NOTE: This transformation involves a hand-curated style change to
// lowerCamelCase (e.g., `fooAPI` -> `fooApi`). This list changes per
// Kubernetes version, according to identifiers that don't conform to
// this style.
func RewriteAsFuncParam(
	k8sVersion string, text kubespec.PropertyName,
) FuncParam {
	id := RewriteAsIdentifier(k8sVersion, text)
	if _, ok := jsonnetKeywordSet[kubespec.PropertyName(id)]; ok {
		return FuncParam(fmt.Sprintf("%sParam", id))
	}
	return FuncParam(id)
}

// RewriteAsIdentifier takes a `GroupName`, `ObjectKind`,
// `PropertyName`, or `string`, and converts it to a Jsonnet-style
// Identifier. Typically this includes lower-casing the first letter,
// but also changing initialisms like fooAPI -> fooApi.
//
// NOTE: This transformation involves a hand-curated style change to
// lowerCamelCase (e.g., `fooAPI` -> `fooApi`). This list changes per
// Kubernetes version, according to identifiers that don't conform to
// this style.
func RewriteAsIdentifier(
	k8sVersion string, rawID fmt.Stringer,
) Identifier {
	var id = rawID.String()

	if len(id) == 0 {
		log.Fatalf("Can't lowercase first letter of 0-rune string")
	}
	kindString := kubeversion.MapIdentifier(k8sVersion, id)

	upper := strings.ToLower(kindString[:1])
	return Identifier(upper + kindString[1:])
}

var jsonnetKeywordSet = map[kubespec.PropertyName]string{
	"assert":     "assert",
	"else":       "else",
	"error":      "error",
	"false":      "false",
	"for":        "for",
	"function":   "function",
	"if":         "if",
	"import":     "import",
	"importstr":  "importstr",
	"in":         "in",
	"local":      "local",
	"null":       "null",
	"tailstrict": "tailstrict",
	"then":       "then",
	"self":       "self",
	"super":      "super",
	"true":       "true",
}

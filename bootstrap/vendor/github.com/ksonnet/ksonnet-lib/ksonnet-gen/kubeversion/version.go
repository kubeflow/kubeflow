// Package kubeversion contains a collection of helper methods that
// help to customize the code generated for ksonnet-lib to suit
// different Kubernetes versions.
//
// For example, we may choose not to emit certain properties for some
// objects in Kubernetes v1.7.0; or, we might want to rename a
// property method. This package contains both the helper methods that
// perform such transformations, as well as the data for the
// transformations we use for each version.
package kubeversion

import (
	"log"
	"strings"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
)

// KSource returns the source of `k.libsonnet` for a specific version
// of Kubernetes.
func KSource(k8sVersion string) string {
	var verStrs []string
	for k := range versions {
		verStrs = append(verStrs, k)
	}

	verData, ok := versions[k8sVersion]
	if !ok {
		log.Fatalf("Unrecognized Kubernetes version %q. Currently accepts %q",
			k8sVersion, strings.Join(verStrs, ", "))
	}

	return verData.kSource
}

// Beta returns the beta status of the version.
func Beta(k8sVersion string) bool {
	k8sVersion = strings.TrimLeft(k8sVersion, "v")
	ver := strings.Split(k8sVersion, ".")
	if len(ver) >= 2 {
		if ver[0] == "1" {
			if ver[1] == "8" {
				k8sVersion = "v1.8.0"
			} else if ver[1] == "7" {
				k8sVersion = "v1.7.0"
			}
		}
	}

	verData, ok := versions[k8sVersion]
	if !ok {
		return false
	}

	return verData.beta
}

// MapIdentifier takes a text identifier and maps it to a
// Jsonnet-appropriate identifier, for some version of Kubernetes. For
// example, in Kubernetes v1.7.0, we might map `clusterIP` ->
// `clusterIp`.
func MapIdentifier(k8sVersion, id string) string {
	verData, ok := versions[k8sVersion]
	if !ok {
		log.Fatalf("Unrecognized Kubernetes version '%s'", k8sVersion)
	}

	if alias, ok := verData.idAliases[id]; ok {
		return alias
	}
	return id
}

// IsBlacklistedProperty taks a definition name (e.g.,
// `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment`), a property
// name (e.g., `status`), and reports whether it is blacklisted for
// some Kubernetes version. This is particularly useful when deciding
// whether or not to generate mixins and property methods for a given
// property (as we likely wouldn't in the case of, say, `status`).
func IsBlacklistedID(k8sVersion string, path kubespec.DefinitionName) bool {
	verData, ok := versions[k8sVersion]
	if !ok {
		return false
	}

	_, ok = verData.idBlacklist[string(path)]
	return ok
}

// IsBlacklistedProperty taks a definition name (e.g.,
// `io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment`), a property
// name (e.g., `status`), and reports whether it is blacklisted for
// some Kubernetes version. This is particularly useful when deciding
// whether or not to generate mixins and property methods for a given
// property (as we likely wouldn't in the case of, say, `status`).
func IsBlacklistedProperty(
	k8sVersion string, path kubespec.DefinitionName,
	propertyName kubespec.PropertyName,
) bool {
	verData, ok := versions[k8sVersion]
	if !ok {
		return false
	}

	bl, ok := verData.propertyBlacklist[string(path)]
	if !ok {
		return false
	}

	_, ok = bl[string(propertyName)]
	return ok
}

func ConstructorSpec(
	k8sVersion string, path kubespec.DefinitionName,
) ([]CustomConstructorSpec, bool) {
	verData, ok := versions[k8sVersion]
	if !ok {
		log.Fatalf("Unrecognized Kubernetes version '%s'", k8sVersion)
	}

	spec, ok := verData.constructorSpecs[string(path)]
	return spec, ok
}

//-----------------------------------------------------------------------------
// Core data structures for specifying version information.
//-----------------------------------------------------------------------------

type versionData struct {
	idAliases         map[string]string
	constructorSpecs  map[string][]CustomConstructorSpec
	idBlacklist       map[string]interface{}
	propertyBlacklist map[string]propertySet
	kSource           string
	beta              bool
}

type propertySet map[string]bool

func newPropertySet(strings ...string) propertySet {
	ps := make(propertySet)
	for _, s := range strings {
		ps[s] = true
	}

	return ps
}

//-----------------------------------------------------------------------------
// Public Data structures for specifying custom constructors for API
// objects.
//-----------------------------------------------------------------------------

// CustomConstructorSpec specifies a custom constructor for
// `ksonnet-gen` to emit as part of ksonnet-lib. In particular, this
// specifies a constructor of the form:
//
//   foo(bar, baz):: self.bar(bar) + self.baz(baz)
//
// The parameter list and the body are all generated from the `Params`
// field.
//
// DESIGN NOTES:
//
// * If the user specifies a custom constructor, we will not emit the
//   default zero-argument constructor, `new()`. This is a purposeful
//   decision which we make because we are typically customizing the
//   constructors precisely because the zero-argument constructor is
//   not meaninful for a given API object.
// * We currently do not check that parameter names are unique.
//   Duplicate identifiers in a parameter list results in a Jsonnet
//   compiler error, though, so this should be caught by review and
//   CI, and it is hence not important for this case to be covered by
//   this code.
type CustomConstructorSpec struct {
	ID     string
	Params []CustomConstructorParam
}

func newConstructor(
	id string, params ...CustomConstructorParam,
) CustomConstructorSpec {
	return CustomConstructorSpec{
		ID:     id,
		Params: params,
	}
}

// CustomConstructorParam specifies a parameter for a
// `CustomConstructorSpec`. This class allows users to specify
// constructors of various forms, including:
//
// * The "normal" form, e.g., `foo(bar):: self.bar(bar)`,
// * Parameters with default values, e.g., `foo(bar="baz")::
//   self.bar(bar)`, and
// * Parameters that are nested inside the object, e.g., `foo(bar)::
//   self.baz.bat.bar(bar)`
//
// DESIGN NOTES:
//
// * For constructors that use nested paths, we do not currently check
//   that the path is valid. So for example, `self.baz.bat.bar` in the
//   example above may not correspond to a real property. We make this
//   decision because it complicates the code, and it doesn't seem
//   worth it since this feature is used relatively rarely.
type CustomConstructorParam struct {
	ID           string
	DefaultValue *string
	RelativePath *string
}

func newParam(name string) CustomConstructorParam {
	return CustomConstructorParam{
		ID:           name,
		DefaultValue: nil,
	}
}

func newParamWithDefault(name, def string) CustomConstructorParam {
	return CustomConstructorParam{
		ID:           name,
		DefaultValue: &def,
	}
}

func newParamNestedRef(name, relativePath string) CustomConstructorParam {
	return CustomConstructorParam{
		ID:           name,
		RelativePath: &relativePath,
	}
}

func newParamNestedRefDefault(
	name, relativePath, def string,
) CustomConstructorParam {
	return CustomConstructorParam{
		ID:           name,
		RelativePath: &relativePath,
		DefaultValue: &def,
	}
}

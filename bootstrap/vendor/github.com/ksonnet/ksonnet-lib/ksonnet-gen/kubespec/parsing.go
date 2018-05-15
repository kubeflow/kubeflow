package kubespec

import (
	"fmt"
	"log"
	"strings"
)

//-----------------------------------------------------------------------------
// Utility methods for `DefinitionName` and `ObjectRef`.
//-----------------------------------------------------------------------------

// Parse will parse a `DefinitionName` into a structured
// `ParsedDefinitionName`.
func (dn *DefinitionName) Parse() (*ParsedDefinitionName, error) {
	name := string(*dn)

	desc, err := describeDefinition(name)
	if err != nil {
		return nil, fmt.Errorf("describe definition: %#v", err)
	}

	pd := ParsedDefinitionName{
		Codebase:    desc.codebase,
		Kind:        desc.kind,
		PackageType: desc.packageType,
	}

	if desc.group != "" {
		group := GroupName(desc.group)
		pd.Group = &group
	}

	if desc.version != "" {
		version := VersionString(desc.version)
		pd.Version = &version
	}

	return &pd, nil
}

// Name parses a `DefinitionName` from an `ObjectRef`. `ObjectRef`s
// that refer to a definition contain two parts: (1) a special prefix,
// and (2) a `DefinitionName`, so this function simply strips the
// prefix off.
func (or *ObjectRef) Name() *DefinitionName {
	defn := "#/definitions/"
	ref := string(*or)
	if !strings.HasPrefix(ref, defn) {
		log.Fatalln(ref)
	}
	name := DefinitionName(strings.TrimPrefix(ref, defn))
	return &name
}

func (dn DefinitionName) AsObjectRef() *ObjectRef {
	or := ObjectRef("#/definitions/" + dn)
	return &or
}

//-----------------------------------------------------------------------------
// Parsed definition name.
//-----------------------------------------------------------------------------

// Package represents the type of the definition, either `APIs`, which
// have API groups (e.g., extensions, apps, meta, and so on), or
// `Core`, which does not.
type Package int

const (
	// Core is a package that contains the Kubernetes Core objects.
	Core Package = iota

	// APIs is a set of non-core packages grouped loosely by semantic
	// functionality (e.g., apps, extensions, and so on).
	APIs

	//
	// Internal packages.
	//

	// Util is a package that contains utilities used for both testing
	// and running Kubernetes.
	Util

	// Runtime is a package that contains various utilities used in the
	// Kubernetes runtime.
	Runtime

	// Version is a package that supplies version information collected
	// at build time.
	Version
)

// ParsedDefinitionName is a parsed version of a fully-qualified
// OpenAPI spec name. For example,
// `io.k8s.kubernetes.pkg.api.v1.Container` would parse into an
// instance of the struct below.
type ParsedDefinitionName struct {
	PackageType Package
	Codebase    string
	Group       *GroupName     // Pointer because it's optional.
	Version     *VersionString // Pointer because it's optional.
	Kind        ObjectKind
}

// GroupName represetents a Kubernetes group name (e.g., apps,
// extensions, etc.)
type GroupName string

func (gn GroupName) String() string {
	return string(gn)
}

// ObjectKind represents the `kind` of a Kubernetes API object (e.g.,
// Service, Deployment, etc.)
type ObjectKind string

func (ok ObjectKind) String() string {
	return string(ok)
}

// VersionString is the string representation of an API version (e.g.,
// v1, v1beta1, etc.)
type VersionString string

func (vs VersionString) String() string {
	return string(vs)
}

// Unparse transforms a `ParsedDefinitionName` back into its
// corresponding string, e.g.,
// `io.k8s.kubernetes.pkg.api.v1.Container`.
func (p *ParsedDefinitionName) Unparse(isLegacySchema bool) (DefinitionName, error) {
	withNewSchema := !isLegacySchema

	k8s := "kubernetes"
	switch p.PackageType {
	case Core:
		{
			if withNewSchema && p.Codebase == k8s {
				return DefinitionName(fmt.Sprintf(
					"io.k8s.api.core.%s.%s",
					*p.Version,
					p.Kind)), nil
			}

			return DefinitionName(fmt.Sprintf(
				"io.k8s.%s.pkg.api.%s.%s",
				p.Codebase,
				*p.Version,
				p.Kind)), nil
		}
	case Util:
		{
			return DefinitionName(fmt.Sprintf(
				"io.k8s.%s.pkg.util.%s.%s",
				p.Codebase,
				*p.Version,
				p.Kind)), nil
		}
	case APIs:
		{
			if withNewSchema && p.Codebase == k8s {
				return DefinitionName(fmt.Sprintf(
					"io.k8s.api.%s.%s.%s",
					*p.Group,
					*p.Version,
					p.Kind)), nil
			}
			return DefinitionName(fmt.Sprintf(
				"io.k8s.%s.pkg.apis.%s.%s.%s",
				p.Codebase,
				*p.Group,
				*p.Version,
				p.Kind)), nil
		}
	case Version:
		{
			return DefinitionName(fmt.Sprintf(
				"io.k8s.%s.pkg.version.%s",
				p.Codebase,
				p.Kind)), nil
		}
	case Runtime:
		{
			return DefinitionName(fmt.Sprintf(
				"io.k8s.%s.pkg.runtime.%s",
				p.Codebase,
				p.Kind)), nil
		}
	default:
		{
			return "",
				fmt.Errorf(
					"Failed to unparse definition name, did not recognize kind '%d'",
					p.PackageType)
		}
	}

}

package ksonnet

import (
	"fmt"
	"regexp"
)

const (
	groupCore = "core"
)

var (
	reNames = []*regexp.Regexp{
		// Core API, pre-1.8 Kubernetes OR non-Kubernetes codebase APIs
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.api\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Core API, 1.8+ Kubernetes
		regexp.MustCompile(`io\.k8s\.api\.(?P<packageType>core)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Other APIs, pre-1.8 Kubernetes OR non-Kubernetes codebase APIs
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>apis)\.(?P<group>\S+)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Other APIs, 1.8+ Kubernetes
		regexp.MustCompile(`io\.k8s\.api\.(?P<group>\S+)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Util packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>util)\.(?P<version>\S+)\.(?P<kind>\S+)`),
		// Version packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>version)\.(?P<kind>\S+)`),
		// Runtime packageType
		regexp.MustCompile(`io\.k8s\.(?P<codebase>\S+)\.pkg\.(?P<packageType>runtime)\.(?P<kind>\S+)`),
	}
)

// UnknownDefinitionError is an error signifying an unknown definition.
type UnknownDefinitionError struct {
	name string
}

var _ error = (*UnknownDefinitionError)(nil)

// NewUnknownDefinitionError creates an instance of UnknownDefinitionError.
func NewUnknownDefinitionError(name string) *UnknownDefinitionError {
	return &UnknownDefinitionError{
		name: name,
	}
}

func (e *UnknownDefinitionError) Error() string {
	return fmt.Sprintf("%q is not a known definition name", e.name)
}

// Description is a description of a Kubernetes definition name.
type Description struct {
	Name     string
	Version  string
	Kind     string
	Group    string
	Codebase string
}

// Validate validates the Description. A description is valid if it has a version.
func (d *Description) Validate() error {
	if d.Version == "" {
		return fmt.Errorf("version is nil for %q", d.Name)
	}

	return nil
}

// ParseDescription takes a definition name and returns a Description.
func ParseDescription(name string) (*Description, error) {
	for _, r := range reNames {
		if match := r.FindStringSubmatch(name); len(match) > 0 {

			result := make(map[string]string)
			for i, name := range r.SubexpNames() {
				if i != 0 {
					result[name] = match[i]
				}
			}

			codebase := result["codebase"]
			if codebase == "" {
				codebase = "api"
			}

			d := &Description{
				Name:     name,
				Version:  result["version"],
				Kind:     result["kind"],
				Group:    result["group"],
				Codebase: codebase,
			}

			return d, nil
		}
	}

	return nil, &UnknownDefinitionError{name: name}
}

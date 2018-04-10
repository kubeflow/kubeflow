package ksonnet

import (
	"fmt"

	"github.com/go-openapi/spec"
	"github.com/pkg/errors"
)

const (
	extensionGroupVersionKind = "x-kubernetes-group-version-kind"
)

// Component is resource information provided in the k8s swagger schema
// which contains the group, kind, and version for a definition.
type Component struct {
	Group   string
	Kind    string
	Version string
}

// NewComponent extracts component information from a schema.
func NewComponent(s spec.Schema) (*Component, error) {
	re := componentExtractor{schema: s}
	group := re.extract("group")
	kind := re.extract("kind")
	version := re.extract("version")

	if re.err != nil {
		return nil, re.err
	}

	return &Component{
		Group:   group,
		Kind:    kind,
		Version: version,
	}, nil
}

func (c *Component) String() string {
	group := c.Group
	if group == "" {
		group = "core"
	}

	return fmt.Sprintf("%s.%s.%s", group, c.Version, c.Kind)
}

type componentExtractor struct {
	err    error
	schema spec.Schema
}

func (re *componentExtractor) extract(key string) string {
	if re.err != nil {
		return ""
	}

	i, ok := re.schema.Extensions[extensionGroupVersionKind]
	if !ok {
		re.err = errors.New("no group/kind/version extension")
		return ""
	}

	s, ok := i.([]interface{})
	if ok {
		m, ok := s[0].(map[string]interface{})
		if ok {
			str, ok := m[key].(string)
			if ok {
				return str
			}
		}
	}

	return ""
}

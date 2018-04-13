package ksonnet

import (
	"github.com/go-openapi/spec"
	"github.com/pkg/errors"
)

func parsePaths(apiSpec *spec.Swagger) (map[string]Component, error) {
	m := make(map[string]Component)

	if apiSpec.Paths == nil {
		return nil, errors.New("api spec has zero paths")
	}
	paths := apiSpec.Paths.Paths
	for _, pathItem := range paths {
		verbs := []*spec.Operation{pathItem.Post, pathItem.Patch, pathItem.Put}
		for _, verb := range verbs {
			if verb == nil {
				continue
			}

			var body *spec.Parameter
			for _, param := range verb.Parameters {
				if param.Name == "body" {
					body = &param
				}
			}

			if body == nil {
				continue
			}

			ref := extractRef(*body.Schema)

			component, exists, err := pathExtensionComponent(verb.Extensions)
			if err != nil {
				return nil, errors.Wrapf(err, "extract component for %s", ref)
			}

			if exists {
				m[ref] = component
			}

		}
	}

	return m, nil
}

// pathExtensionComponent generates a component from a method tpe extension
func pathExtensionComponent(extensions spec.Extensions) (Component, bool, error) {
	for x, v := range extensions {
		if x == extensionGroupVersionKind {
			gvk, ok := v.(map[string]interface{})
			if !ok {
				return Component{}, false, errors.New("gvk extension was invalid")
			}

			component := Component{
				Group:   gvk["group"].(string),
				Version: gvk["version"].(string),
				Kind:    gvk["kind"].(string),
			}
			return component, true, nil
		}
	}

	return Component{}, false, nil
}

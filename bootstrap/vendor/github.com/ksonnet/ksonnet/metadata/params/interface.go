// Copyright 2017 The kubecfg authors
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

package params

import (
	"bytes"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/ksonnet/ksonnet/pkg/docparser"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
)

type Params map[string]string

// AppendComponent takes the following params
//
//   component: the name of the new component to be added.
//   snippet: a jsonnet snippet resembling the current component parameters.
//   params: the parameters for the new component.
//
// and returns the jsonnet snippet with the appended component and parameters.
func AppendComponent(component, snippet string, params Params) (string, error) {
	return appendComponent(component, snippet, params)
}

// DeleteComponent takes
//
//   component: the name of the component to be deleted.
//   snippet: a jsonnet snippet resembling the current component parameters.
//
// and returns the jsonnet snippet with the removed component.
func DeleteComponent(component, snippet string) (string, error) {
	return deleteComponent(component, snippet)
}

// GetComponentParams takes
//
//  component: the name of the component to retrieve params for.
//  snippet: the jsonnet snippet containing the component parameters.
//
// and returns a map of key-value param pairs corresponding to that component.
//
// An error will be returned if the component is not found in the snippet.
func GetComponentParams(component, snippet string) (Params, error) {
	params, _, err := getComponentParams(component, snippet)
	return params, err
}

// GetAllComponentParams takes
//
//  snippet: the jsonnet snippet containing the component params.
//
// and returns a map of key-value param pairs for each component identified.
func GetAllComponentParams(snippet string) (map[string]Params, error) {
	return getAllComponentParams(snippet)
}

// SetComponentParams takes
//
//   component: the name of the new component to be modified.
//   snippet: a jsonnet snippet resembling the current component parameters.
//   params: the parameters to be set for 'component'.
//
// and returns the jsonnet snippet with the modified set of component parameters.
func SetComponentParams(component, snippet string, params Params) (string, error) {
	return setComponentParams(component, snippet, params)
}

// GetAllEnvironmentParams takes
//
//  snippet: the jsonnet snippet containing the environment params. This is
//           expected to be non-expanded schema; i.e. does not include the
//           component params
//
// and returns a map of key-value param pairs for each component identified.
func GetAllEnvironmentParams(snippet string) (map[string]Params, error) {
	return getAllEnvironmentParams(snippet)
}

// SetEnvironmentParams takes
//
//   component: the name of the new component to be modified.
//   snippet: a jsonnet snippet resembling the current environment parameters (not expanded).
//   params: the parameters to be set for 'component'.
//
// and returns the jsonnet snippet with the modified set of environment parameters.
func SetEnvironmentParams(component, snippet string, params Params) (string, error) {
	return setEnvironmentParams(component, snippet, params)
}

// DeleteEnvironmentParam deletes a parameter for an environment param file. It returns
// the updated snippet.
func DeleteEnvironmentParam(componentName, paramName, snippet string) (string, error) {
	tokens, err := docparser.Lex("snippet", snippet)
	if err != nil {
		return "", err
	}

	node, err := docparser.Parse(tokens)
	if err != nil {
		return "", err
	}

	l, ok := node.(*ast.Local)
	if !ok {
		return "", errors.New("unable to parse params")
	}

	switch t := l.Body.(type) {
	default:
		return "", errors.Errorf("unknown body type %T", t)
	// params + {}
	case *ast.Binary:
		components, ok := t.Right.(*astext.Object)
		if !ok {
			return "", errors.New("unable to find components in params")
		}

		return deleteFromEnv(l, components, componentName, paramName)
	case *ast.ApplyBrace:
		components, ok := t.Right.(*astext.Object)
		if !ok {
			return "", errors.New("unable to find components in params")
		}

		return deleteFromEnv(l, components, componentName, paramName)
	}
}

func deleteFromEnv(l *ast.Local, components *astext.Object, componentName, paramName string) (string, error) {
	paramObject, err := jsonnet.FindObject(components, []string{"components", componentName, paramName})
	if err != nil {
		return "", err
	}

	var fields []astext.ObjectField

	for i := range paramObject.Fields {
		fieldID, err := jsonnet.FieldID(paramObject.Fields[i])
		if err != nil {
			return "", err
		}

		if fieldID != paramName {
			fields = append(fields, paramObject.Fields[i])
		}
	}

	paramObject.Fields = fields

	var buf bytes.Buffer
	if err := printer.Fprint(&buf, l); err != nil {
		return "", err
	}

	return buf.String(), nil
}

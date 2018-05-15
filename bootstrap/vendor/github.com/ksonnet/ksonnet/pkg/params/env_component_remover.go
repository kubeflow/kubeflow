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

package params

import (
	"bytes"
	"fmt"

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

var (
	errUnsupportedEnvParams = errors.New("unsupported param format. cannot programmatically remove component")
)

// EnvComponentRemover removes param configuration for components
// from env params libsonnet files.
type EnvComponentRemover struct {
}

// NewEnvComponentRemover creates an instance of EnvComponentRemover.
func NewEnvComponentRemover() *EnvComponentRemover {
	ecr := &EnvComponentRemover{}

	return ecr
}

// Remove removes component name from the jsonnet snippet.
func (ecr *EnvComponentRemover) Remove(componentName, snippet string) (string, error) {
	if componentName == "" {
		return "", errors.New("component name was blank")
	}

	logger := logrus.WithField("component-name", componentName)
	logger.Info("removing environment component")

	n, err := jsonnet.ParseNode("params.libsonnet", snippet)
	if err != nil {
		return "", err
	}

	obj, err := componentParams(n, componentName)
	if err != nil {
		return "", err
	}

	if err = ecr.deleteEntry(obj, componentName); err != nil {
		return "", errors.Wrap(err, "delete entry")
	}

	var buf bytes.Buffer
	if err = jsonnetPrinterFn(&buf, n); err != nil {
		return "", errors.Wrap(err, "unable to update snippet")
	}

	return buf.String(), nil
}

func (ecr *EnvComponentRemover) deleteEntry(obj *astext.Object, componentName string) error {
	of, err := findField(obj, "components")
	if err != nil {
		return errors.Wrap(errUnsupportedEnvParams, "unable to find components field")
	}

	componentsObj, ok := of.Expr2.(*astext.Object)
	if !ok {
		return errors.Wrap(errUnsupportedEnvParams, "components field is not an object")
	}

	match := -1

	var id string
	for i := range componentsObj.Fields {
		id, err = jsonnet.FieldID(componentsObj.Fields[i])
		if err != nil {
			return err
		}

		if id == componentName {
			match = i
		}
	}

	if match >= 0 {
		componentsObj.Fields = append(componentsObj.Fields[:match],
			componentsObj.Fields[match+1:]...)
	}

	return nil
}

func findNamedLocal(l *ast.Local, name string) (*ast.Local, error) {
	if len(l.Binds) != 1 {
		return nil, errors.New("local has multiple binds")
	}

	if name == string(l.Binds[0].Variable) {
		return l, nil
	}

	next, ok := l.Body.(*ast.Local)
	if !ok {
		return nil, errors.New("unable to find local by name")
	}

	return findNamedLocal(next, name)
}

// TODO: export find field in jsonnet and delete this
func findField(object *astext.Object, id string) (*astext.ObjectField, error) {
	for i := range object.Fields {
		fieldID, err := jsonnet.FieldID(object.Fields[i])
		if err != nil {
			return nil, err
		}

		if id == fieldID {
			return &object.Fields[i], nil
		}
	}

	return nil, &unknownField{name: id}
}

type unknownField struct {
	name string
}

func (e *unknownField) Error() string {
	return fmt.Sprintf("unable to find field %q", e.name)
}

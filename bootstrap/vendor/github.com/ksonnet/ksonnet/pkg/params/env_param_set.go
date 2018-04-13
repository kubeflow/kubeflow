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

	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

// EnvParamSet sets environment params for a component.
type EnvParamSet struct {
}

// NewEnvParamSet creates an instance of EnvParamSet.
func NewEnvParamSet() *EnvParamSet {
	epa := &EnvParamSet{}
	return epa
}

// Set sets params in environment parameter files.
func (epa *EnvParamSet) Set(componentName, snippet string, p params.Params) (string, error) {
	if componentName == "" {
		return "", errors.New("component name was blank")
	}

	logger := logrus.WithField("component-name", componentName)
	logger.Info("setting environment component")

	n, err := jsonnet.ParseNode("params.libsonnet", snippet)
	if err != nil {
		return "", err
	}

	obj, err := componentParams(n, componentName)
	if err != nil {
		return "", err
	}

	if err = epa.setParams(obj, componentName, p); err != nil {
		return "", errors.Wrap(err, "delete entry")
	}

	// root node should be a local if not, return an error
	var buf bytes.Buffer
	if err = jsonnetPrinterFn(&buf, n); err != nil {
		return "", errors.Wrap(err, "unable to update snippet")
	}

	return buf.String(), nil
}

func (epa *EnvParamSet) setParams(obj *astext.Object, componentName string, p params.Params) error {
	of, err := findField(obj, "components")
	if err != nil {
		return errors.Wrap(errUnsupportedEnvParams, "unable to find components field")
	}

	componentsObj, ok := of.Expr2.(*astext.Object)
	if !ok {
		return errors.Wrap(errUnsupportedEnvParams, "components field is not an object")
	}

	var componentObj *astext.Object
	of, err = findField(componentsObj, componentName)
	if err == nil {
		of.SuperSugar = true
		componentObj, ok = of.Expr2.(*astext.Object)
		if !ok {
			return errors.Wrapf(errUnsupportedEnvParams, "component field %q is not an object", componentName)
		}
	} else {
		componentObj = &astext.Object{}
		of, err := astext.CreateField(componentName)
		if err != nil {
			return err
		}
		of.SuperSugar = true
		of.Expr2 = componentObj
		of.Hide = ast.ObjectFieldInherit
		componentsObj.Fields = append(componentsObj.Fields, *of)
	}

	for key := range p {
		decoded, err := DecodeValue(p[key])
		if err != nil {
			return err
		}

		value, err := nm.ValueToNoder(decoded)
		if err != nil {
			return err
		}

		path := []string{key}
		if err = jsonnetSetFn(componentObj, path, value.Node()); err != nil {
			return err
		}

	}

	return nil
}

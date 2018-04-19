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

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

// EnvParamUnset unset param configuration for components
// from env params libsonnet files.
type EnvParamUnset struct {
}

// NewEnvParamUnset creates an instance of EnvParamUnset.
func NewEnvParamUnset() *EnvParamUnset {
	epu := &EnvParamUnset{}
	return epu
}

// Unset un-sets params.
func (epu *EnvParamUnset) Unset(componentName, paramName, snippet string) (string, error) {
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

	if err = epu.unsetEntry(obj, componentName, paramName); err != nil {
		return "", errors.Wrap(err, "delete entry")
	}

	var buf bytes.Buffer
	if err = jsonnetPrinterFn(&buf, n); err != nil {
		return "", errors.Wrap(err, "unable to update snippet")
	}

	return buf.String(), nil
}

func (epu *EnvParamUnset) unsetEntry(obj *astext.Object, componentName, paramName string) error {
	of, err := findField(obj, "components")
	if err != nil {
		return errors.Wrap(errUnsupportedEnvParams, "unable to find components field")
	}

	componentsObj, ok := of.Expr2.(*astext.Object)
	if !ok {
		return errors.Wrap(errUnsupportedEnvParams, "components field is not an object")
	}

	of, err = findField(componentsObj, componentName)
	if err != nil {
		return errors.Wrapf(errUnsupportedEnvParams, "unable to find component %q field", componentName)
	}

	componentObj, ok := of.Expr2.(*astext.Object)
	if !ok {
		return errors.Wrapf(errUnsupportedEnvParams, "component field %q is not an object", componentName)
	}

	match := -1

	var id string
	for i := range componentObj.Fields {
		id, err = jsonnet.FieldID(componentObj.Fields[i])
		if err != nil {
			return err
		}

		if id == paramName {
			match = i
		}
	}

	if match >= 0 {
		componentObj.Fields = append(componentObj.Fields[:match],
			componentObj.Fields[match+1:]...)
	}

	return nil
}

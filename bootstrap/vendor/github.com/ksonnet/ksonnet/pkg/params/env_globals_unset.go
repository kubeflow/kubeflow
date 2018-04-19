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

// EnvGlobalsUnset un-sets global environment params.
type EnvGlobalsUnset struct {
}

// NewEnvGlobalsUnset creates an instance of EnvGlobalsUnset.
func NewEnvGlobalsUnset() *EnvGlobalsUnset {
	egu := &EnvGlobalsUnset{}
	return egu
}

// Unset un-sets globals.
func (epu *EnvGlobalsUnset) Unset(paramName, snippet string) (string, error) {
	if paramName == "" {
		return "", errors.New("global name was blank")
	}

	logger := logrus.WithFields(logrus.Fields{})
	logger.WithField("name", paramName).Info("removing environment global")

	n, err := jsonnet.ParseNode("params.libsonnet", snippet)
	if err != nil {
		return "", err
	}

	obj, err := componentParams(n, "")
	if err != nil {
		return "", err
	}

	if err = epu.unsetEntry(obj, paramName); err != nil {
		return "", errors.Wrap(err, "delete entry")
	}

	var buf bytes.Buffer
	if err = jsonnetPrinterFn(&buf, n); err != nil {
		return "", errors.Wrap(err, "unable to update snippet")
	}

	return buf.String(), nil
}

func (epu *EnvGlobalsUnset) unsetEntry(obj *astext.Object, paramName string) error {
	match := -1

	var id string
	var err error
	for i := range obj.Fields {
		id, err = jsonnet.FieldID(obj.Fields[i])
		if err != nil {
			return err
		}

		if id == paramName {
			match = i
		}
	}

	if match >= 0 {
		obj.Fields = append(obj.Fields[:match], obj.Fields[match+1:]...)
	}

	return nil
}

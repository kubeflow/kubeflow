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
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

// EnvGlobalsSet sets environment globals.
type EnvGlobalsSet struct {
}

// NewEnvGlobalsSet creates an instance of EnvGlobalsSet.
func NewEnvGlobalsSet() *EnvGlobalsSet {
	egs := &EnvGlobalsSet{}
	return egs
}

// Set sets params in environment globals files.
func (egs *EnvGlobalsSet) Set(snippet string, p params.Params) (string, error) {
	logger := logrus.WithFields(logrus.Fields{})
	logger.Info("setting environment globals")

	n, err := jsonnet.ParseNode("globals.libsonnet", snippet)
	if err != nil {
		return "", err
	}

	obj, err := componentParams(n, "")
	if err != nil {
		return "", err
	}

	if err = egs.setParams(obj, p); err != nil {
		return "", errors.Wrap(err, "delete entry")
	}

	// root node should be a local if not, return an error
	var buf bytes.Buffer
	if err = jsonnetPrinterFn(&buf, n); err != nil {
		return "", errors.Wrap(err, "unable to update snippet")
	}

	return buf.String(), nil
}

func (egs *EnvGlobalsSet) setParams(obj *astext.Object, p params.Params) error {
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
		if err = jsonnetSetFn(obj, path, value.Node()); err != nil {
			return err
		}

	}

	return nil
}

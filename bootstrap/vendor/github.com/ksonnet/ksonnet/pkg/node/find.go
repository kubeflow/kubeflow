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

package node

import (
	"github.com/google/go-jsonnet/ast"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/pkg/errors"
)

// Find finds a node by name in a parent node.
func Find(node ast.Node, name string) (*astext.Object, error) {
	root, ok := node.(*astext.Object)
	if !ok {
		return nil, errors.New("node is not an object")
	}

	for _, of := range root.Fields {
		if of.Id == nil {
			continue
		}

		id := string(*of.Id)
		if id == name {
			if of.Expr2 == nil {
				return nil, errors.New("child object was nil")
			}

			child, ok := of.Expr2.(*astext.Object)
			if !ok {
				return nil, errors.New("child was not an Object")
			}

			return child, nil
		}
	}

	return nil, errors.Errorf("could not find %s", name)
}

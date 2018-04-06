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
	"fmt"
	"strings"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/astext"
	"github.com/pkg/errors"
)

var (
	errChildNotFound = errors.New("child not found")
)

type searchPath struct {
	path []string
}

func (sp *searchPath) len() int {
	return len(sp.path)
}

func (sp *searchPath) isEmpty() bool {
	return sp.len() == 0
}

func (sp *searchPath) head() string {
	return sp.path[0]
}

func (sp *searchPath) tail() string {
	return sp.path[len(sp.path)-1]
}

func (sp *searchPath) descendant() searchPath {
	return searchPath{path: sp.path[1:]}
}

func (sp *searchPath) String() string {
	return strings.Join(sp.path, ".")
}

// Node represents a node by name.
type Node struct {
	name    string
	obj     *astext.Object
	IsMixin bool
}

// New creates an instance of Node.
func New(name string, obj *astext.Object) *Node {
	return &Node{
		name: name,
		obj:  obj,
	}
}

// Search2 searches for a path in the node.
func (n *Node) Search2(path ...string) (*Item, error) {
	sp := searchPath{path: path}
	item, _, err := n.searchNode(n.obj, sp, make([]string, 0))
	return item, err
}

func (n *Node) searchNode(obj *astext.Object, sp searchPath, breadcrumbs []string) (*Item, []string, error) {
	if sp.isEmpty() {
		return nil, nil, errors.New("search path is empty")
	}

	members, err := FindMembers(obj)
	if err != nil {
		return nil, nil, errors.Wrap(err, "unable list object members")
	}

	if sp.len() == 1 {
		switch {
		case stringInSlice(sp.head(), members.Fields):
			path := append(breadcrumbs, sp.head())
			return &Item{Type: ItemTypeObject, Path: path}, nil, nil
		case stringInSlice("mixin", members.Fields):
			return n.findChild(obj, sp, "mixin", breadcrumbs)
		default:
			fnName, err := members.FindFunction(sp.head())
			if err != nil {
				return nil, nil, errors.Wrapf(err, "unable to find function %s", sp)
			}

			path := append(breadcrumbs, sp.head())
			name := fmt.Sprintf("%s.%s", strings.Join(breadcrumbs, "."), fnName)
			return &Item{Type: ItemTypeSetter, Name: name, Path: path}, nil, nil
		}
	}

	switch {
	case stringInSlice(sp.head(), members.Fields):
		return n.findChild(obj, sp.descendant(), sp.head(), breadcrumbs)
	case stringInSlice("mixin", members.Fields):
		return n.findChild(obj, sp, "mixin", breadcrumbs)
	}

	return nil, nil, errChildNotFound
}

func (n *Node) findChild(obj *astext.Object, sp searchPath, name string, breadcrumbs []string) (*Item, []string, error) {
	childBreadcrumbs := append(breadcrumbs, name)
	child, err := Find(obj, name)
	if err != nil {
		return nil, nil, err
	}

	item, path, err := n.searchNode(child, sp, childBreadcrumbs)
	if err != nil {
		if err == errChildNotFound {
			newSp := searchPath{path: append(breadcrumbs, name, sp.head())}
			return n.searchNode(n.obj, newSp, make([]string, 0))
		}

		return nil, nil, err
	}

	return item, path, nil
}

// ItemType is the type of item.
type ItemType int

const (
	// ItemTypeSetter is a item that is a setter function.
	ItemTypeSetter ItemType = iota
	// ItemTypeObject is a item that is an object.
	ItemTypeObject
)

// Item identifies an item in a Node.
type Item struct {
	Type ItemType
	Name string
	Path []string
}

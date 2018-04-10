// Copyright 2018 The kubecfg authors
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

package snippet

import "bytes"

// ----------------------------------------------------------------------------
// Interfaces.
// ----------------------------------------------------------------------------

type index int

type indices []index

type marker interface {
	children() *markers
	parent() marker
	setParent(p marker)
	String() string
	len() int
}

type markers []marker

func (ms *markers) append(m ...marker) {
	*ms = append(*ms, m...)
}

func (ms *markers) delete(i int) {
	*ms = append((*ms)[:i], (*ms)[i+1:]...)
}

func (ms *markers) String() string {
	var buf bytes.Buffer

	for _, m := range *ms {
		buf.WriteString(m.String())
	}
	return buf.String()
}

func (ms *markers) setParents(m marker) {
	for _, child := range *ms {
		child.setParent(m)
	}
}

// ----------------------------------------------------------------------------
// Base.
// ----------------------------------------------------------------------------

type markerImpl struct {
	// _markerBrand: any;
	_children *markers
	_parent   marker
}

func (mi *markerImpl) children() *markers {
	return mi._children
}

func (mi *markerImpl) parent() marker {
	return mi._parent
}

func (mi *markerImpl) setParent(p marker) {
	mi._parent = p
}

func (mi *markerImpl) String() string {
	return ""
}

func (mi *markerImpl) len() int {
	return 0
}

// ----------------------------------------------------------------------------
// Text.
// ----------------------------------------------------------------------------

type text struct {
	markerImpl
	data string
}

func newText(data string) *text {
	return &text{
		markerImpl: markerImpl{
			_children: &markers{},
		},
		data: data,
	}
}

func (t *text) String() string {
	return t.data
}

func (t *text) len() int {
	return len(t.data)
}

// ----------------------------------------------------------------------------
// Placeholder.
// ----------------------------------------------------------------------------

type placeholder struct {
	markerImpl
	index int
}

func newPlaceholder(index int, children *markers) *placeholder {
	p := &placeholder{
		// markerImpl: *newMarkerImplWithChildren(children),
		markerImpl: markerImpl{
			_children: children,
		},
		index: index,
	}
	p._children.setParents(p)
	return p
}

func (p *placeholder) String() string {
	return p._children.String()
}

func (p *placeholder) isFinalTabstop() bool {
	return p.index == 0
}

// ----------------------------------------------------------------------------
// Variable.
// ----------------------------------------------------------------------------

type variable struct {
	markerImpl
	resolvedValue *string
	name          string
}

func newVariable(name string, children *markers) *variable {
	v := &variable{
		markerImpl: markerImpl{
			_children: children,
		},
		name: name,
	}
	v._children.setParents(v)
	return v
}

func (v *variable) isDefined() bool {
	return v.resolvedValue != nil
}

func (v *variable) len() int {
	if v.isDefined() {
		return len(*v.resolvedValue)
	}
	return v.markerImpl.len()
}

func (v *variable) String() string {
	if v.isDefined() {
		return *v.resolvedValue
	}
	return v._children.String()
}

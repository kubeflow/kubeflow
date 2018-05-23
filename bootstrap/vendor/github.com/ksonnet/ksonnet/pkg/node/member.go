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

// Members are the members of an object.
type Members struct {
	Fields    []string
	Functions []string
	Types     []string
}

// FindMembers finds all the object members.
func FindMembers(obj *astext.Object) (Members, error) {
	if obj == nil {
		return Members{}, errors.New("object is nil")
	}

	var om Members

	for _, of := range obj.Fields {
		if of.Id == nil {
			continue
		}

		id := string(*of.Id)

		if of.Method != nil && !strings.HasPrefix(id, "__") && !strings.HasPrefix(id, "mixin") {
			om.Functions = append(om.Functions, id)
			continue
		}

		if _, ok := of.Expr2.(*astext.Object); ok && !strings.HasPrefix(id, "__") {
			om.Fields = append(om.Fields, id)
			continue
		}

		if strings.HasSuffix(id, "Type") {
			om.Types = append(om.Types, id)
			continue
		}
	}

	return om, nil
}

func (om *Members) FindFunction(name string) (string, error) {
	var hasSetter, hasSetterMixin, hasType bool

	name2 := strings.Title(name)

	for _, id := range om.Functions {
		if fn := fmt.Sprintf("with%s", name2); fn == id && stringInSlice(fn, om.Functions) {
			hasSetter = true
		}
		if fn := fmt.Sprintf("with%sMixin", name2); fn == id && stringInSlice(fn, om.Functions) {
			hasSetterMixin = true
		}
		if t := fmt.Sprintf("%sType", name); t == id && stringInSlice(t, om.Types) {
			hasType = true
		}
	}

	if hasSetter && hasSetterMixin && hasType {
		return fmt.Sprintf("with%s", name2), nil
	} else if hasSetter && hasSetterMixin {
		return fmt.Sprintf("with%s", name2), nil
	} else if hasType {
		return "", errors.New("what to do with mixins")
	} else if hasSetter {
		return fmt.Sprintf("with%s", name2), nil
	}

	return "", errors.Errorf("could not find function %s", name)
}

func stringInSlice(s string, sl []string) bool {
	for i := range sl {
		if sl[i] == s {
			return true
		}
	}

	return false
}

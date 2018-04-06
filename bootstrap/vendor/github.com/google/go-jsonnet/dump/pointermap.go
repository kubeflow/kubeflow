/*
Copyright 2017 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package dump

import "reflect"

type pointerMap struct {
	allpointers       []uintptr
	reusedPointers    []uintptr
	primitivePointers []uintptr
}

// GetPointers recursively maps all pointers mentioned in a tree, breaking
// circular references, and provides a list of:
// * all pointers
// * all pointers that were referenced at least twice
// * all pointers that point to primitive type
func GetPointers(v reflect.Value) ([]uintptr, []uintptr, []uintptr) {
	pm := &pointerMap{
		allpointers:       []uintptr{},
		reusedPointers:    []uintptr{},
		primitivePointers: []uintptr{},
	}
	pm.getAllAndReusedPointers(v)
	pm.getPrimitivePointers(v)
	return pm.allpointers, pm.reusedPointers, pm.primitivePointers
}

func (pm *pointerMap) getPrimitivePointers(v reflect.Value) {
	if v.Kind() == reflect.Invalid {
		return
	}
	// if v is a pointer pointing to a primitive value, register it as primitive pointer
	if isPrimitivePointer(v) {
		pm.addPrimitivePointer(v.Pointer())
		return
	}

	// Now descend into any children of this value
	switch v.Kind() {
	case reflect.Slice, reflect.Array:
		numEntries := v.Len()
		for i := 0; i < numEntries; i++ {
			pm.getPrimitivePointers(v.Index(i))
		}

	case reflect.Interface:
		pm.getPrimitivePointers(v.Elem())

	case reflect.Ptr:
		pm.getPrimitivePointers(v.Elem())

	case reflect.Map:
		for _, key := range v.MapKeys() {
			pm.getPrimitivePointers(v.MapIndex(key))
		}

	case reflect.Struct:
		numFields := v.NumField()
		for i := 0; i < numFields; i++ {
			pm.getPrimitivePointers(v.Field(i))
		}
	}
}

// Recursively consider v and each of its children, updating pointer information
func (pm *pointerMap) getAllAndReusedPointers(v reflect.Value) {
	if v.Kind() == reflect.Invalid {
		return
	}
	if isPointerValue(v) && v.Pointer() != 0 { // pointer is 0 for unexported fields
		reused := pm.addPointer(v.Pointer())
		if reused {
			// No use descending inside this value, since it have been seen before and all its descendants
			// have been considered
			return
		}
	}

	// Now descend into any children of this value
	switch v.Kind() {
	case reflect.Slice, reflect.Array:
		numEntries := v.Len()
		for i := 0; i < numEntries; i++ {
			pm.getAllAndReusedPointers(v.Index(i))
		}

	case reflect.Interface:
		pm.getAllAndReusedPointers(v.Elem())

	case reflect.Ptr:
		pm.getAllAndReusedPointers(v.Elem())

	case reflect.Map:
		for _, key := range v.MapKeys() {
			pm.getAllAndReusedPointers(v.MapIndex(key))
		}

	case reflect.Struct:
		numFields := v.NumField()
		for i := 0; i < numFields; i++ {
			pm.getAllAndReusedPointers(v.Field(i))
		}
	}
}

func (pm *pointerMap) addPrimitivePointer(ptr uintptr) {
	for _, have := range pm.primitivePointers {
		if ptr == have {
			return
		}
	}
	pm.primitivePointers = append(pm.primitivePointers, ptr)
}

// addPointer to the pointerMap, update reusedPointers. Returns true if pointer was reused
func (pm *pointerMap) addPointer(ptr uintptr) bool {
	// Is this already known to be reused?
	for _, have := range pm.reusedPointers {
		if ptr == have {
			return true
		}
	}
	// Have we seen it once before?
	for _, seen := range pm.allpointers {
		if ptr == seen {
			// Add it to the register of pointers we have seen more than once
			pm.reusedPointers = append(pm.reusedPointers, ptr)
			return true
		}
	}
	// This pointer was new to us
	pm.allpointers = append(pm.allpointers, ptr)
	return false
}

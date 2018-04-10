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

import (
	"fmt"
	"io"
	"reflect"
	"strconv"
	"strings"
)

func printBool(w io.Writer, value bool) {
	w.Write([]byte(strconv.FormatBool(value)))
}

func printInt(w io.Writer, val reflect.Value) {
	typeName := fmt.Sprintf("%s", val.Type())
	if strings.HasPrefix(typeName, "ast.") {
		typeName = typeName[4:]
	}
	w.Write([]byte(fmt.Sprintf("%s(%s)", typeName, strconv.FormatInt(val.Int(), 10))))
}

func printUint(w io.Writer, val reflect.Value) {
	typeName := fmt.Sprintf("%s", val.Type())
	w.Write([]byte(fmt.Sprintf("%s(%s)", typeName, strconv.FormatUint(val.Uint(), 10))))
}

func printFloat(w io.Writer, val float64, precision int, floatType string) {
	w.Write([]byte(fmt.Sprintf("%s(%s)", floatType, strconv.FormatFloat(val, 'g', -1, precision))))
}

func printComplex(w io.Writer, c complex128, floatPrecision int) {
	w.Write([]byte("complex"))
	w.Write([]byte(fmt.Sprintf("%d", floatPrecision*2)))
	r := real(c)
	w.Write([]byte("("))
	w.Write([]byte(strconv.FormatFloat(r, 'g', -1, floatPrecision)))
	i := imag(c)
	if i >= 0 {
		w.Write([]byte("+"))
	}
	w.Write([]byte(strconv.FormatFloat(i, 'g', -1, floatPrecision)))
	w.Write([]byte("i)"))
}

func printNil(w io.Writer) {
	w.Write([]byte("nil"))
}

// deInterface returns values inside of non-nil interfaces when possible.
// This is useful for data types like structs, arrays, slices, and maps which
// can contain varying types packed inside an interface.
func deInterface(v reflect.Value) reflect.Value {
	if v.Kind() == reflect.Interface && !v.IsNil() {
		v = v.Elem()
	}
	return v
}

func isPointerValue(v reflect.Value) bool {
	switch v.Kind() {
	case reflect.Chan, reflect.Func, reflect.Map, reflect.Ptr, reflect.Slice, reflect.UnsafePointer:
		return true
	}
	return false
}

func isPrimitivePointer(v reflect.Value) bool {
	if v.Kind() == reflect.Ptr && isPrimitiveValue(v.Elem()) {
		return true
	}
	return false
}

func isPrimitiveValue(v reflect.Value) bool {
	switch v.Kind() {
	case reflect.Bool, reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Float32,
		reflect.Float64, reflect.Complex64, reflect.Complex128, reflect.String:
		return true
	}
	return false
}

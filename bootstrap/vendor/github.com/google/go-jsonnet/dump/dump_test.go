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
	"testing"
)

func TestSdumpPrimitives(t *testing.T) {
	testcases := []struct {
		name     string
		input    func() interface{}
		expected string
	}{
		{
			"boolTrue",
			func() interface{} {
				return true
			},
			"var Obj = true\n",
		},
		{
			"boolFalse",
			func() interface{} {
				return false
			},
			"var Obj = false\n",
		},
		{
			"int",
			func() interface{} {
				return 10
			},
			"var Obj = int(10)\n",
		},
		{
			"int8",
			func() interface{} {
				return int8(10)
			},
			"var Obj = int8(10)\n",
		},
		{
			"int16",
			func() interface{} {
				return int16(10)
			},
			"var Obj = int16(10)\n",
		},
		{
			"int32",
			func() interface{} {
				return int32(10)
			},
			"var Obj = int32(10)\n",
		},
		{
			"int64",
			func() interface{} {
				return int64(10)
			},
			"var Obj = int64(10)\n",
		},
		{
			"uint",
			func() interface{} {
				return uint(10)
			},
			"var Obj = uint(10)\n",
		},
		{
			"uint8",
			func() interface{} {
				return uint8(10)
			},
			"var Obj = uint8(10)\n",
		},
		{
			"uint16",
			func() interface{} {
				return uint16(10)
			},
			"var Obj = uint16(10)\n",
		},
		{
			"uint32",
			func() interface{} {
				return uint32(10)
			},
			"var Obj = uint32(10)\n",
		},
		{
			"uint64",
			func() interface{} {
				return uint64(10)
			},
			"var Obj = uint64(10)\n",
		},
		{
			"float32",
			func() interface{} {
				return float32(10.5)
			},
			"var Obj = float32(10.5)\n",
		},
		{
			"float64",
			func() interface{} {
				return float64(10.5)
			},
			"var Obj = float64(10.5)\n",
		},
		{
			"complex64",
			func() interface{} {
				return complex64(10 + 10.5i)
			},
			"var Obj = complex64(10+10.5i)\n",
		},
		{
			"complex128",
			func() interface{} {
				return complex128(-1.2 - 0.5i)
			},
			"var Obj = complex128(-1.2-0.5i)\n",
		},
		{
			"string",
			func() interface{} {
				return "hello world"
			},
			"var Obj = \"hello world\"\n",
		},
	}

	for _, test := range testcases {
		output := Sdump(test.input())
		if test.expected != output {
			t.Errorf("test case %s failed, expected : \n%#v\n, got : \n%#v", test.name, test.expected, output)
		}
	}
}

func TestSdumpPrimitivePointers(t *testing.T) {
	testcases := []struct {
		name     string
		input    func() interface{}
		expected string
	}{
		{
			"booltruepointer",
			func() interface{} {
				var a = true
				return &a
			},
			`var p0Var = true
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"boolfalsepointer",
			func() interface{} {
				var a = false
				return &a
			},
			`var p0Var = false
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"intpointer",
			func() interface{} {
				var a = 10
				return &a
			},
			`var p0Var = int(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"int8pointer",
			func() interface{} {
				var a = int8(10)
				return &a
			},
			`var p0Var = int8(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"int16pointer",
			func() interface{} {
				var a = int16(10)
				return &a
			},
			`var p0Var = int16(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"int32pointer",
			func() interface{} {
				var a = int32(10)
				return &a
			},
			`var p0Var = int32(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"int64pointer",
			func() interface{} {
				var a = int64(10)
				return &a
			},
			`var p0Var = int64(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"uintpointer",
			func() interface{} {
				var a = uint(10)
				return &a
			},
			`var p0Var = uint(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"uint8pointer",
			func() interface{} {
				var a = uint8(10)
				return &a
			},
			`var p0Var = uint8(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"uint16pointer",
			func() interface{} {
				var a = uint16(10)
				return &a
			},
			`var p0Var = uint16(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"uint32pointer",
			func() interface{} {
				var a = uint32(10)
				return &a
			},
			`var p0Var = uint32(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"uint64pointer",
			func() interface{} {
				var a = uint64(10)
				return &a
			},
			`var p0Var = uint64(10)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"float32pointer",
			func() interface{} {
				var a = float32(10.5)
				return &a
			},
			`var p0Var = float32(10.5)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"float64pointer",
			func() interface{} {
				var a = float64(10.5)
				return &a
			},
			`var p0Var = float64(10.5)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"complex64pointer",
			func() interface{} {
				var a = complex64(10 + 10.5i)
				return &a
			},
			`var p0Var = complex64(10+10.5i)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"complex128pointer",
			func() interface{} {
				var a = complex128(-1.2 - 0.5i)
				return &a
			},
			`var p0Var = complex128(-1.2-0.5i)
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"stringpointer",
			func() interface{} {
				var a = "hello world"
				return &a
			},
			`var p0Var = "hello world"
var p0 = &p0Var
var Obj = p0
`,
		},
		{
			"nilpointer",
			func() interface{} {
				return nil
			},
			`var Obj = nil
`,
		},
		{
			"stringnilpointer",
			func() interface{} {
				var a *string
				return a
			},
			`var Obj = nil
`,
		},
	}

	for _, test := range testcases {
		output := Sdump(test.input())
		if test.expected != output {
			t.Errorf("test case %s failed, expected : \n%#v\n, got : \n%#v", test.name, test.expected, output)
		}
	}
}

func TestSdumpReusedPointers(t *testing.T) {
	testcases := []struct {
		name     string
		input    func() interface{}
		expected string
	}{
		{
			"reusedprimitivepointer",
			func() interface{} {
				var a = "hello world"
				return &struct {
					Foo *string
					Bar *string
				}{
					Foo: &a,
					Bar: &a,
				}
			},
			`var p1Var = "hello world"
var p1 = &p1Var
var Obj = &struct { Foo *string; Bar *string }{
	Foo: p1,
	Bar: p1,
}
`,
		},
		{
			"reusednilpointer",
			func() interface{} {
				var a *string
				return &struct {
					Foo *string
					Bar *string
				}{
					Foo: a,
					Bar: a,
				}
			},
			`var Obj = &struct { Foo *string; Bar *string }{
	Foo: nil,
	Bar: nil,
}
`,
		},
		{
			"reusedstructpointer",
			func() interface{} {
				type Zeo struct {
					A string
				}
				var z = Zeo{
					A: "hello world",
				}
				return &struct {
					Foo *Zeo
					Bar *Zeo
				}{
					Foo: &z,
					Bar: &z,
				}
			},
			`var p1 = &Zeo{
	A: "hello world",
}
var Obj = &struct { Foo *Zeo; Bar *Zeo }{
	Foo: p1,
	Bar: p1,
}
`,
		},
	}
	for _, test := range testcases {
		Config.StripPackageNames = true
		output := Sdump(test.input())
		if test.expected != output {
			t.Errorf("test case %s failed, expected : \n%#v\n, got : \n%#v", test.name, test.expected, output)
		}
	}
}

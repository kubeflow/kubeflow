package main

import "fmt"
import "github.com/google/go-jsonnet"

// #cgo CXXFLAGS: -std=c++11 -Wall
import "C"

//export test
func test() {
	fmt.Printf("hello")
}

//export run_jsonnet
func run_jsonnet(code *C.char) {
	s := C.GoString(code)
	vm := jsonnet.MakeVM()
	out, err := vm.EvaluateSnippet("c", s)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(out)
	}
}

//export jsonnet_evaluate_snippet2
func jsonnet_evaluate_snippet2(filename *C.char, code *C.char, e *C.int) *C.char {
	f := C.GoString(filename)
	fmt.Println(code)
	s := C.GoString(code)
	vm := jsonnet.MakeVM()
	fmt.Println(s)
	out, err := vm.EvaluateSnippet(f, s)
	var result *C.char
	if err != nil {
		*e = 1
		result = C.CString(err.Error())
	} else {
		*e = 0
		fmt.Println(out)
		result = C.CString(out)
	}
	return result
}

func main() {

}

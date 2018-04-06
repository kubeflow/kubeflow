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

package jsonnet

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"math"
	"sort"
	"strings"

	"github.com/google/go-jsonnet/ast"
)

func builtinPlus(e *evaluator, xp, yp potentialValue) (value, error) {
	// TODO(sbarzowski) more types, mixing types
	// TODO(sbarzowski) perhaps a more elegant way to dispatch
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluate(yp)
	if err != nil {
		return nil, err
	}
	switch right := y.(type) {
	case *valueString:
		left, err := builtinToString(e, xp)
		if err != nil {
			return nil, err
		}
		return concatStrings(left.(*valueString), right), nil

	}
	switch left := x.(type) {
	case *valueNumber:
		right, err := e.getNumber(y)
		if err != nil {
			return nil, err
		}
		return makeValueNumber(left.value + right.value), nil
	case *valueString:
		right, err := builtinToString(e, yp)
		if err != nil {
			return nil, err
		}
		return concatStrings(left, right.(*valueString)), nil
	case valueObject:
		right, err := e.getObject(y)
		if err != nil {
			return nil, err
		}
		return makeValueExtendedObject(left, right), nil
	case *valueArray:
		right, err := e.getArray(y)
		if err != nil {
			return nil, err
		}
		return concatArrays(left, right), nil
	default:
		return nil, e.typeErrorGeneral(x)
	}
}

func builtinMinus(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluateNumber(yp)
	if err != nil {
		return nil, err
	}
	return makeValueNumber(x.value - y.value), nil
}

func builtinMult(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluateNumber(yp)
	if err != nil {
		return nil, err
	}
	return makeValueNumber(x.value * y.value), nil
}

func builtinDiv(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluateNumber(yp)
	if err != nil {
		return nil, err
	}
	if y.value == 0 {
		return nil, e.Error("Division by zero.")
	}
	return makeDoubleCheck(e, x.value/y.value)
}

func builtinModulo(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluateNumber(yp)
	if err != nil {
		return nil, err
	}
	if y.value == 0 {
		return nil, e.Error("Division by zero.")
	}
	return makeDoubleCheck(e, math.Mod(x.value, y.value))
}

func builtinLess(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	switch left := x.(type) {
	case *valueNumber:
		right, err := e.evaluateNumber(yp)
		if err != nil {
			return nil, err
		}
		return makeValueBoolean(left.value < right.value), nil
	case *valueString:
		right, err := e.evaluateString(yp)
		if err != nil {
			return nil, err
		}
		return makeValueBoolean(stringLessThan(left, right)), nil
	default:
		return nil, e.typeErrorGeneral(x)
	}
}

func builtinGreater(e *evaluator, xp, yp potentialValue) (value, error) {
	return builtinLess(e, yp, xp)
}

func builtinGreaterEq(e *evaluator, xp, yp potentialValue) (value, error) {
	res, err := builtinLess(e, xp, yp)
	if err != nil {
		return nil, err
	}
	return res.(*valueBoolean).not(), nil
}

func builtinLessEq(e *evaluator, xp, yp potentialValue) (value, error) {
	res, err := builtinGreater(e, xp, yp)
	if err != nil {
		return nil, err
	}
	return res.(*valueBoolean).not(), nil
}

func builtinAnd(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateBoolean(xp)
	if err != nil {
		return nil, err
	}
	if !x.value {
		return x, nil
	}
	y, err := e.evaluateBoolean(yp)
	if err != nil {
		return nil, err
	}
	return y, nil
}

func builtinOr(e *evaluator, xp, yp potentialValue) (value, error) {
	x, err := e.evaluateBoolean(xp)
	if err != nil {
		return nil, err
	}
	if x.value {
		return x, nil
	}
	y, err := e.evaluateBoolean(yp)
	if err != nil {
		return nil, err
	}
	return y, nil
}

func builtinLength(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	var num int
	switch x := x.(type) {
	case valueObject:
		num = len(objectFields(x, withoutHidden))
	case *valueArray:
		num = len(x.elements)
	case *valueString:
		num = x.length()
	case *valueFunction:
		num = len(x.parameters().required)
	default:
		return nil, e.typeErrorGeneral(x)
	}
	return makeValueNumber(float64(num)), nil
}

func builtinToString(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	switch x := x.(type) {
	case *valueString:
		return x, nil
	}
	var buf bytes.Buffer
	err = e.i.manifestAndSerializeJSON(&buf, e.trace, x, false, "")
	if err != nil {
		return nil, err
	}
	return makeValueString(buf.String()), nil
}

func builtinMakeArray(e *evaluator, szp potentialValue, funcp potentialValue) (value, error) {
	sz, err := e.evaluateInt(szp)
	if err != nil {
		return nil, err
	}
	fun, err := e.evaluateFunction(funcp)
	if err != nil {
		return nil, err
	}
	var elems []potentialValue
	for i := 0; i < sz; i++ {
		elem := fun.call(args(&readyValue{intToValue(i)}))
		elems = append(elems, elem)
	}
	return makeValueArray(elems), nil
}

func builtinFlatMap(e *evaluator, funcp potentialValue, arrp potentialValue) (value, error) {
	arr, err := e.evaluateArray(arrp)
	if err != nil {
		return nil, err
	}
	fun, err := e.evaluateFunction(funcp)
	if err != nil {
		return nil, err
	}
	num := arr.length()
	// Start with capacity of the original array.
	// This may spare us a few reallocations.
	// TODO(sbarzowski) verify that it actually helps
	elems := make([]potentialValue, 0, num)
	for i := 0; i < num; i++ {
		returned, err := e.evaluateArray(fun.call(args(arr.elements[i])))
		if err != nil {
			return nil, err
		}
		for _, elem := range returned.elements {
			elems = append(elems, elem)
		}
	}
	return makeValueArray(elems), nil
}

func joinArrays(e *evaluator, sep *valueArray, arr *valueArray) (value, error) {
	result := make([]potentialValue, 0, arr.length())
	first := true
	for _, elem := range arr.elements {
		elemValue, err := e.evaluate(elem)
		if err != nil {
			return nil, err
		}
		switch v := elemValue.(type) {
		case *valueNull:
			continue
		case *valueArray:
			if !first {
				for _, subElem := range sep.elements {
					result = append(result, subElem)
				}
			}
			for _, subElem := range v.elements {
				result = append(result, subElem)
			}
		default:
			return nil, e.typeErrorSpecific(elemValue, &valueArray{})
		}
		first = false

	}
	return makeValueArray(result), nil
}

func joinStrings(e *evaluator, sep *valueString, arr *valueArray) (value, error) {
	result := make([]rune, 0, arr.length())
	first := true
	for _, elem := range arr.elements {
		elemValue, err := e.evaluate(elem)
		if err != nil {
			return nil, err
		}
		switch v := elemValue.(type) {
		case *valueNull:
			continue
		case *valueString:
			if !first {
				result = append(result, sep.value...)
			}
			result = append(result, v.value...)
		default:
			return nil, e.typeErrorSpecific(elemValue, &valueString{})
		}
		first = false
	}
	return &valueString{value: result}, nil
}

func builtinJoin(e *evaluator, sepp potentialValue, arrp potentialValue) (value, error) {
	arr, err := e.evaluateArray(arrp)
	if err != nil {
		return nil, err
	}
	sep, err := e.evaluate(sepp)
	if err != nil {
		return nil, err
	}
	switch sep := sep.(type) {
	case *valueString:
		return joinStrings(e, sep, arr)
	case *valueArray:
		return joinArrays(e, sep, arr)
	default:
		return nil, e.Error("join first parameter should be string or array, got " + sep.getType().name)
	}
}

func builtinFilter(e *evaluator, funcp potentialValue, arrp potentialValue) (value, error) {
	arr, err := e.evaluateArray(arrp)
	if err != nil {
		return nil, err
	}
	fun, err := e.evaluateFunction(funcp)
	if err != nil {
		return nil, err
	}
	num := arr.length()
	// Start with capacity of the original array.
	// This may spare us a few reallocations.
	// TODO(sbarzowski) verify that it actually helps
	elems := make([]potentialValue, 0, num)
	for i := 0; i < num; i++ {
		included, err := e.evaluateBoolean(fun.call(args(arr.elements[i])))
		if err != nil {
			return nil, err
		}
		if included.value {
			elems = append(elems, arr.elements[i])
		}
	}
	return makeValueArray(elems), nil
}

func builtinRange(e *evaluator, fromp potentialValue, top potentialValue) (value, error) {
	from, err := e.evaluateInt(fromp)
	if err != nil {
		return nil, err
	}
	to, err := e.evaluateInt(top)
	if err != nil {
		return nil, err
	}
	elems := make([]potentialValue, to-from+1)
	for i := from; i <= to; i++ {
		elems[i-from] = &readyValue{intToValue(i)}
	}
	return makeValueArray(elems), nil
}

func builtinNegation(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateBoolean(xp)
	if err != nil {
		return nil, err
	}
	return makeValueBoolean(!x.value), nil
}

func builtinBitNeg(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	i := int64(x.value)
	return int64ToValue(^i), nil
}

func builtinIdentity(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	return x, nil
}

func builtinUnaryMinus(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	return makeValueNumber(-x.value), nil
}

func primitiveEquals(e *evaluator, xp potentialValue, yp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	y, err := e.evaluate(yp)
	if err != nil {
		return nil, err
	}
	if x.getType() != y.getType() {
		return makeValueBoolean(false), nil
	}
	switch left := x.(type) {
	case *valueBoolean:
		right, err := e.getBoolean(y)
		if err != nil {
			return nil, err
		}
		return makeValueBoolean(left.value == right.value), nil
	case *valueNumber:
		right, err := e.getNumber(y)
		if err != nil {
			return nil, err
		}
		return makeValueBoolean(left.value == right.value), nil
	case *valueString:
		right, err := e.getString(y)
		if err != nil {
			return nil, err
		}
		return makeValueBoolean(stringEqual(left, right)), nil
	case *valueNull:
		return makeValueBoolean(true), nil
	case *valueFunction:
		return nil, e.Error("Cannot test equality of functions")
	default:
		return nil, e.Error(
			"primitiveEquals operates on primitive types, got " + x.getType().name,
		)
	}
}

func builtinType(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluate(xp)
	if err != nil {
		return nil, err
	}
	return makeValueString(x.getType().name), nil
}

func builtinMd5(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateString(xp)
	if err != nil {
		return nil, err
	}
	hash := md5.Sum([]byte(string(x.value)))
	return makeValueString(hex.EncodeToString(hash[:])), nil
}

// Maximum allowed unicode codepoint
// https://en.wikipedia.org/wiki/Unicode#Architecture_and_terminology
const codepointMax = 0x10FFFF

func builtinChar(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateNumber(xp)
	if err != nil {
		return nil, err
	}
	if x.value > codepointMax {
		return nil, e.Error(fmt.Sprintf("Invalid unicode codepoint, got %v", x.value))
	} else if x.value < 0 {
		return nil, e.Error(fmt.Sprintf("Codepoints must be >= 0, got %v", x.value))
	}
	return makeValueString(string(rune(x.value))), nil
}

func builtinCodepoint(e *evaluator, xp potentialValue) (value, error) {
	x, err := e.evaluateString(xp)
	if err != nil {
		return nil, err
	}
	if x.length() != 1 {
		return nil, e.Error(fmt.Sprintf("codepoint takes a string of length 1, got length %v", x.length()))
	}
	return makeValueNumber(float64(x.value[0])), nil
}

func makeDoubleCheck(e *evaluator, x float64) (value, error) {
	if math.IsNaN(x) {
		return nil, e.Error("Not a number")
	}
	if math.IsInf(x, 0) {
		return nil, e.Error("Overflow")
	}
	return makeValueNumber(x), nil
}

func liftNumeric(f func(float64) float64) func(*evaluator, potentialValue) (value, error) {
	return func(e *evaluator, xp potentialValue) (value, error) {
		x, err := e.evaluateNumber(xp)
		if err != nil {
			return nil, err
		}
		return makeDoubleCheck(e, f(x.value))
	}
}

var builtinSqrt = liftNumeric(math.Sqrt)
var builtinCeil = liftNumeric(math.Ceil)
var builtinFloor = liftNumeric(math.Floor)
var builtinSin = liftNumeric(math.Sin)
var builtinCos = liftNumeric(math.Cos)
var builtinTan = liftNumeric(math.Tan)
var builtinAsin = liftNumeric(math.Asin)
var builtinAcos = liftNumeric(math.Acos)
var builtinAtan = liftNumeric(math.Atan)
var builtinLog = liftNumeric(math.Log)
var builtinExp = liftNumeric(func(f float64) float64 {
	res := math.Exp(f)
	if res == 0 && f > 0 {
		return math.Inf(1)
	}
	return res
})
var builtinMantissa = liftNumeric(func(f float64) float64 {
	mantissa, _ := math.Frexp(f)
	return mantissa
})
var builtinExponent = liftNumeric(func(f float64) float64 {
	_, exponent := math.Frexp(f)
	return float64(exponent)
})

func liftBitwise(f func(int64, int64) int64) func(*evaluator, potentialValue, potentialValue) (value, error) {
	return func(e *evaluator, xp, yp potentialValue) (value, error) {
		x, err := e.evaluateNumber(xp)
		if err != nil {
			return nil, err
		}
		y, err := e.evaluateNumber(yp)
		if err != nil {
			return nil, err
		}
		return makeDoubleCheck(e, float64(f(int64(x.value), int64(y.value))))
	}
}

// TODO(sbarzowski) negative shifts
var builtinShiftL = liftBitwise(func(x, y int64) int64 { return x << uint(y) })
var builtinShiftR = liftBitwise(func(x, y int64) int64 { return x >> uint(y) })
var builtinBitwiseAnd = liftBitwise(func(x, y int64) int64 { return x & y })
var builtinBitwiseOr = liftBitwise(func(x, y int64) int64 { return x | y })
var builtinBitwiseXor = liftBitwise(func(x, y int64) int64 { return x ^ y })

func builtinObjectFieldsEx(e *evaluator, objp potentialValue, includeHiddenP potentialValue) (value, error) {
	obj, err := e.evaluateObject(objp)
	if err != nil {
		return nil, err
	}
	includeHidden, err := e.evaluateBoolean(includeHiddenP)
	if err != nil {
		return nil, err
	}
	fields := objectFields(obj, withHiddenFromBool(includeHidden.value))
	sort.Strings(fields)
	elems := []potentialValue{}
	for _, fieldname := range fields {
		elems = append(elems, &readyValue{makeValueString(fieldname)})
	}
	return makeValueArray(elems), nil
}

func builtinObjectHasEx(e *evaluator, objp potentialValue, fnamep potentialValue, includeHiddenP potentialValue) (value, error) {
	obj, err := e.evaluateObject(objp)
	if err != nil {
		return nil, err
	}
	fname, err := e.evaluateString(fnamep)
	if err != nil {
		return nil, err
	}
	includeHidden, err := e.evaluateBoolean(includeHiddenP)
	if err != nil {
		return nil, err
	}
	h := withHiddenFromBool(includeHidden.value)
	fieldp := tryObjectIndex(objectBinding(obj), string(fname.value), h)
	return makeValueBoolean(fieldp != nil), nil
}

func builtinPow(e *evaluator, basep potentialValue, expp potentialValue) (value, error) {
	base, err := e.evaluateNumber(basep)
	if err != nil {
		return nil, err
	}
	exp, err := e.evaluateNumber(expp)
	if err != nil {
		return nil, err
	}
	return makeDoubleCheck(e, math.Pow(base.value, exp.value))
}

func builtinStrReplace(e *evaluator, strp, fromp, top potentialValue) (value, error) {
	str, err := e.evaluateString(strp)
	if err != nil {
		return nil, err
	}
	from, err := e.evaluateString(fromp)
	if err != nil {
		return nil, err
	}
	to, err := e.evaluateString(top)
	if err != nil {
		return nil, err
	}
	sStr := str.getString()
	sFrom := from.getString()
	sTo := to.getString()
	if len(sFrom) == 0 {
		return nil, e.Error("'from' string must not be zero length.")
	}
	return makeValueString(strings.Replace(sStr, sFrom, sTo, -1)), nil
}

func builtinUglyObjectFlatMerge(e *evaluator, objarrp potentialValue) (value, error) {
	objarr, err := e.evaluateArray(objarrp)
	if err != nil {
		return nil, err
	}
	if len(objarr.elements) == 0 {
		return &valueSimpleObject{}, nil
	}
	newFields := make(simpleObjectFieldMap)
	for _, elem := range objarr.elements {
		obj, err := e.evaluateObject(elem)
		if err != nil {
			return nil, err
		}
		// starts getting ugly - we mess with object internals
		simpleObj := obj.(*valueSimpleObject)
		for fieldName, fieldVal := range simpleObj.fields {
			if _, alreadyExists := newFields[fieldName]; alreadyExists {
				return nil, e.Error(duplicateFieldNameErrMsg(fieldName))
			}
			newFields[fieldName] = simpleObjectField{
				hide: fieldVal.hide,
				field: &bindingsUnboundField{
					inner:    fieldVal.field,
					bindings: simpleObj.upValues,
				},
			}
		}
	}
	return makeValueSimpleObject(
		nil, // no binding frame
		newFields,
		[]unboundField{}, // No asserts allowed
	), nil
}

func builtinExtVar(e *evaluator, namep potentialValue) (value, error) {
	name, err := e.evaluateString(namep)
	if err != nil {
		return nil, err
	}
	index := name.getString()
	if pv, ok := e.i.extVars[index]; ok {
		return e.evaluate(pv)
	}
	return nil, e.Error("Undefined external variable: " + string(index))
}

func builtinNative(e *evaluator, namep potentialValue) (value, error) {
	name, err := e.evaluateString(namep)
	if err != nil {
		return nil, err
	}
	index := name.getString()
	if f, exists := e.i.nativeFuncs[index]; exists {
		return &valueFunction{ec: f}, nil

	}
	return nil, e.Error(fmt.Sprintf("Unrecognized native function name: %v", index))

}

type unaryBuiltinFunc func(*evaluator, potentialValue) (value, error)
type binaryBuiltinFunc func(*evaluator, potentialValue, potentialValue) (value, error)
type ternaryBuiltinFunc func(*evaluator, potentialValue, potentialValue, potentialValue) (value, error)

type unaryBuiltin struct {
	name       ast.Identifier
	function   unaryBuiltinFunc
	parameters ast.Identifiers
}

func getBuiltinEvaluator(e *evaluator, name ast.Identifier) *evaluator {
	loc := ast.MakeLocationRangeMessage("<builtin>")
	context := "builtin function <" + string(name) + ">"
	trace := TraceElement{loc: &loc, context: &context}
	return &evaluator{i: e.i, trace: &trace}
}

func (b *unaryBuiltin) EvalCall(args callArguments, e *evaluator) (value, error) {
	flatArgs := flattenArgs(args, b.Parameters())
	return b.function(getBuiltinEvaluator(e, b.name), flatArgs[0])
}

func (b *unaryBuiltin) Parameters() Parameters {
	return Parameters{required: b.parameters}
}

func (b *unaryBuiltin) Name() ast.Identifier {
	return b.name
}

type binaryBuiltin struct {
	name       ast.Identifier
	function   binaryBuiltinFunc
	parameters ast.Identifiers
}

// flattenArgs transforms all arguments to a simple array of positional arguments.
// It's needed, because it's possible to use named arguments for required parameters.
// For example both `toString("x")` and `toString(a="x")` are allowed.
// It assumes that we have already checked for duplicates.
func flattenArgs(args callArguments, params Parameters) []potentialValue {
	if len(args.named) == 0 {
		return args.positional
	}
	if len(params.optional) != 0 {
		panic("Can't normalize arguments if optional parameters are present")
	}
	needed := make(map[ast.Identifier]int)

	for i := len(args.positional); i < len(params.required); i++ {
		needed[params.required[i]] = i
	}

	flatArgs := make([]potentialValue, len(params.required))
	copy(flatArgs, args.positional)
	for _, arg := range args.named {
		flatArgs[needed[arg.name]] = arg.pv
	}
	return flatArgs
}

func (b *binaryBuiltin) EvalCall(args callArguments, e *evaluator) (value, error) {
	flatArgs := flattenArgs(args, b.Parameters())
	return b.function(getBuiltinEvaluator(e, b.name), flatArgs[0], flatArgs[1])
}

func (b *binaryBuiltin) Parameters() Parameters {
	return Parameters{required: b.parameters}
}

func (b *binaryBuiltin) Name() ast.Identifier {
	return b.name
}

type ternaryBuiltin struct {
	name       ast.Identifier
	function   ternaryBuiltinFunc
	parameters ast.Identifiers
}

func (b *ternaryBuiltin) EvalCall(args callArguments, e *evaluator) (value, error) {
	flatArgs := flattenArgs(args, b.Parameters())
	return b.function(getBuiltinEvaluator(e, b.name), flatArgs[0], flatArgs[1], flatArgs[2])
}

func (b *ternaryBuiltin) Parameters() Parameters {
	return Parameters{required: b.parameters}
}

func (b *ternaryBuiltin) Name() ast.Identifier {
	return b.name
}

var desugaredBop = map[ast.BinaryOp]ast.Identifier{
	ast.BopPercent:         "mod",
	ast.BopManifestEqual:   "equals",
	ast.BopManifestUnequal: "notEquals", // Special case
	ast.BopIn:              "objectHasAll",
}

var bopBuiltins = []*binaryBuiltin{
	ast.BopMult: &binaryBuiltin{name: "operator*", function: builtinMult, parameters: ast.Identifiers{"x", "y"}},
	ast.BopDiv:  &binaryBuiltin{name: "operator/", function: builtinDiv, parameters: ast.Identifiers{"x", "y"}},
	// ast.BopPercent:  <desugared>,

	ast.BopPlus:  &binaryBuiltin{name: "operator+", function: builtinPlus, parameters: ast.Identifiers{"x", "y"}},
	ast.BopMinus: &binaryBuiltin{name: "operator-", function: builtinMinus, parameters: ast.Identifiers{"x", "y"}},

	ast.BopShiftL: &binaryBuiltin{name: "operator<<", function: builtinShiftL, parameters: ast.Identifiers{"x", "y"}},
	ast.BopShiftR: &binaryBuiltin{name: "operator>>", function: builtinShiftR, parameters: ast.Identifiers{"x", "y"}},

	ast.BopGreater:   &binaryBuiltin{name: "operator>", function: builtinGreater, parameters: ast.Identifiers{"x", "y"}},
	ast.BopGreaterEq: &binaryBuiltin{name: "operator>=", function: builtinGreaterEq, parameters: ast.Identifiers{"x", "y"}},
	ast.BopLess:      &binaryBuiltin{name: "operator<,", function: builtinLess, parameters: ast.Identifiers{"x", "y"}},
	ast.BopLessEq:    &binaryBuiltin{name: "operator<=", function: builtinLessEq, parameters: ast.Identifiers{"x", "y"}},

	// bopManifestEqual:   <desugared>,
	// bopManifestUnequal: <desugared>,

	ast.BopBitwiseAnd: &binaryBuiltin{name: "operator&", function: builtinBitwiseAnd, parameters: ast.Identifiers{"x", "y"}},
	ast.BopBitwiseXor: &binaryBuiltin{name: "operator^", function: builtinBitwiseXor, parameters: ast.Identifiers{"x", "y"}},
	ast.BopBitwiseOr:  &binaryBuiltin{name: "operator|", function: builtinBitwiseOr, parameters: ast.Identifiers{"x", "y"}},

	ast.BopAnd: &binaryBuiltin{name: "operator&&", function: builtinAnd, parameters: ast.Identifiers{"x", "y"}},
	ast.BopOr:  &binaryBuiltin{name: "operator||", function: builtinOr, parameters: ast.Identifiers{"x", "y"}},
}

var uopBuiltins = []*unaryBuiltin{
	ast.UopNot:        &unaryBuiltin{name: "operator!", function: builtinNegation, parameters: ast.Identifiers{"x"}},
	ast.UopBitwiseNot: &unaryBuiltin{name: "operator~", function: builtinBitNeg, parameters: ast.Identifiers{"x"}},
	ast.UopPlus:       &unaryBuiltin{name: "operator+ (unary)", function: builtinIdentity, parameters: ast.Identifiers{"x"}},
	ast.UopMinus:      &unaryBuiltin{name: "operator- (unary)", function: builtinUnaryMinus, parameters: ast.Identifiers{"x"}},
}

type builtin interface {
	evalCallable
	Name() ast.Identifier
}

func buildBuiltinMap(builtins []builtin) map[string]evalCallable {
	result := make(map[string]evalCallable)
	for _, b := range builtins {
		result[string(b.Name())] = b
	}
	return result
}

var funcBuiltins = buildBuiltinMap([]builtin{
	&unaryBuiltin{name: "extVar", function: builtinExtVar, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "length", function: builtinLength, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "toString", function: builtinToString, parameters: ast.Identifiers{"a"}},
	&binaryBuiltin{name: "makeArray", function: builtinMakeArray, parameters: ast.Identifiers{"sz", "func"}},
	&binaryBuiltin{name: "flatMap", function: builtinFlatMap, parameters: ast.Identifiers{"func", "arr"}},
	&binaryBuiltin{name: "join", function: builtinJoin, parameters: ast.Identifiers{"sep", "arr"}},
	&binaryBuiltin{name: "filter", function: builtinFilter, parameters: ast.Identifiers{"func", "arr"}},
	&binaryBuiltin{name: "range", function: builtinRange, parameters: ast.Identifiers{"from", "to"}},
	&binaryBuiltin{name: "primitiveEquals", function: primitiveEquals, parameters: ast.Identifiers{"sz", "func"}},
	&binaryBuiltin{name: "objectFieldsEx", function: builtinObjectFieldsEx, parameters: ast.Identifiers{"obj", "hidden"}},
	&ternaryBuiltin{name: "objectHasEx", function: builtinObjectHasEx, parameters: ast.Identifiers{"obj", "fname", "hidden"}},
	&unaryBuiltin{name: "type", function: builtinType, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "char", function: builtinChar, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "codepoint", function: builtinCodepoint, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "ceil", function: builtinCeil, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "floor", function: builtinFloor, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "sqrt", function: builtinSqrt, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "sin", function: builtinSin, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "cos", function: builtinCos, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "tan", function: builtinTan, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "asin", function: builtinAsin, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "acos", function: builtinAcos, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "atan", function: builtinAtan, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "log", function: builtinLog, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "exp", function: builtinExp, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "mantissa", function: builtinMantissa, parameters: ast.Identifiers{"x"}},
	&unaryBuiltin{name: "exponent", function: builtinExponent, parameters: ast.Identifiers{"x"}},
	&binaryBuiltin{name: "pow", function: builtinPow, parameters: ast.Identifiers{"base", "exp"}},
	&binaryBuiltin{name: "modulo", function: builtinModulo, parameters: ast.Identifiers{"x", "y"}},
	&unaryBuiltin{name: "md5", function: builtinMd5, parameters: ast.Identifiers{"x"}},
	&ternaryBuiltin{name: "strReplace", function: builtinStrReplace, parameters: ast.Identifiers{"str", "from", "to"}},
	&unaryBuiltin{name: "native", function: builtinNative, parameters: ast.Identifiers{"x"}},

	// internal
	&unaryBuiltin{name: "$objectFlatMerge", function: builtinUglyObjectFlatMerge, parameters: ast.Identifiers{"x"}},
})

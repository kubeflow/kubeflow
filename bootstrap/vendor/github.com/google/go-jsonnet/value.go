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
	"errors"
	"fmt"

	"github.com/google/go-jsonnet/ast"
)

// value represents a concrete jsonnet value of a specific type.
// Various operations on values are allowed, depending on their type.
// All values are of course immutable.
type value interface {
	aValue()

	getType() *valueType
}

type valueType struct {
	name string
}

var stringType = &valueType{"string"}
var numberType = &valueType{"number"}
var functionType = &valueType{"function"}
var objectType = &valueType{"object"}
var booleanType = &valueType{"boolean"}
var nullType = &valueType{"null"}
var arrayType = &valueType{"array"}

// potentialValue is something that may be evaluated to a concrete value.
// The result of the evaluation may *NOT* depend on the current state
// of the interpreter. The evaluation may fail.
//
// It can be used to represent lazy values (e.g. variables values in jsonnet
// are not calculated before they are used). It is also a useful abstraction
// in other cases like error handling.
//
// It may or may not require arbitrary computation when getValue is called the
// first time, but any subsequent calls will immediately return.
//
// TODO(sbarzowski) perhaps call it just "Thunk"?
type potentialValue interface {
	// fromWhere keeps the information from where the evaluation was requested.
	getValue(i *interpreter, fromWhere *TraceElement) (value, error)

	aPotentialValue()
}

// A set of variables with associated potentialValues.
type bindingFrame map[ast.Identifier]potentialValue

type valueBase struct{}

func (v *valueBase) aValue() {}

// Primitive values
// -------------------------------------

// valueString represents a string value, internally using a []rune for quick
// indexing.
type valueString struct {
	valueBase
	// We use rune slices instead of strings for quick indexing
	value []rune
}

func (s *valueString) index(e *evaluator, index int) (value, error) {
	if 0 <= index && index < s.length() {
		return makeValueString(string(s.value[index])), nil
	}
	return nil, e.Error(fmt.Sprintf("Index %d out of bounds, not within [0, %v)", index, s.length()))
}

func concatStrings(a, b *valueString) *valueString {
	result := make([]rune, 0, len(a.value)+len(b.value))
	for _, r := range a.value {
		result = append(result, r)
	}
	for _, r := range b.value {
		result = append(result, r)
	}
	return &valueString{value: result}
}

func stringLessThan(a, b *valueString) bool {
	var length int
	if len(a.value) < len(b.value) {
		length = len(a.value)
	} else {
		length = len(b.value)
	}
	for i := 0; i < length; i++ {
		if a.value[i] != b.value[i] {
			return a.value[i] < b.value[i]
		}
	}
	return len(a.value) < len(b.value)
}

func stringEqual(a, b *valueString) bool {
	if len(a.value) != len(b.value) {
		return false
	}
	for i := 0; i < len(a.value); i++ {
		if a.value[i] != b.value[i] {
			return false
		}
	}
	return true
}

func (s *valueString) length() int {
	return len(s.value)
}

func (s *valueString) getString() string {
	return string(s.value)
}

func makeValueString(v string) *valueString {
	return &valueString{value: []rune(v)}
}

func (*valueString) getType() *valueType {
	return stringType
}

type valueBoolean struct {
	valueBase
	value bool
}

func (*valueBoolean) getType() *valueType {
	return booleanType
}

func makeValueBoolean(v bool) *valueBoolean {
	return &valueBoolean{value: v}
}

func (b *valueBoolean) not() *valueBoolean {
	return makeValueBoolean(!b.value)
}

type valueNumber struct {
	valueBase
	value float64
}

func (*valueNumber) getType() *valueType {
	return numberType
}

func makeValueNumber(v float64) *valueNumber {
	return &valueNumber{value: v}
}

func intToValue(i int) *valueNumber {
	return makeValueNumber(float64(i))
}

func int64ToValue(i int64) *valueNumber {
	return makeValueNumber(float64(i))
}

type valueNull struct {
	valueBase
}

var nullValue valueNull

func makeValueNull() *valueNull {
	return &nullValue
}

func (*valueNull) getType() *valueType {
	return nullType
}

// ast.Array
// -------------------------------------

type valueArray struct {
	valueBase
	elements []potentialValue
}

func (arr *valueArray) index(e *evaluator, index int, tc tailCallStatus) (value, error) {
	if 0 <= index && index < arr.length() {
		return e.evaluateTailCall(arr.elements[index], tc)
	}
	return nil, e.Error(fmt.Sprintf("Index %d out of bounds, not within [0, %v)", index, arr.length()))
}

func (arr *valueArray) length() int {
	return len(arr.elements)
}

func makeValueArray(elements []potentialValue) *valueArray {
	// We don't want to keep a bigger array than necessary
	// so we create a new one with minimal capacity
	var arrayElems []potentialValue
	if len(elements) == cap(elements) {
		arrayElems = elements
	} else {
		arrayElems = make([]potentialValue, len(elements))
		for i := range elements {
			arrayElems[i] = elements[i]
		}
	}
	return &valueArray{
		elements: arrayElems,
	}
}

func concatArrays(a, b *valueArray) *valueArray {
	result := make([]potentialValue, 0, len(a.elements)+len(b.elements))
	for _, r := range a.elements {
		result = append(result, r)
	}
	for _, r := range b.elements {
		result = append(result, r)
	}
	return &valueArray{elements: result}
}

func (*valueArray) getType() *valueType {
	return arrayType
}

// ast.Function
// -------------------------------------

type valueFunction struct {
	valueBase
	ec evalCallable
}

// TODO(sbarzowski) better name?
type evalCallable interface {
	EvalCall(args callArguments, e *evaluator) (value, error)
	Parameters() Parameters
}

type partialPotentialValue interface {
	inEnv(env *environment) potentialValue
}

func (f *valueFunction) call(args callArguments) potentialValue {
	return makeCallThunk(f.ec, args)
}

func (f *valueFunction) parameters() Parameters {
	return f.ec.Parameters()
}

func checkArguments(e *evaluator, args callArguments, params Parameters) error {
	received := make(map[ast.Identifier]bool)
	accepted := make(map[ast.Identifier]bool)

	numPassed := len(args.positional)
	numExpected := len(params.required) + len(params.optional)

	if numPassed > numExpected {
		return e.Error(fmt.Sprintf("function expected %v positional argument(s), but got %v", numExpected, numPassed))
	}

	for _, param := range params.required {
		accepted[param] = true
	}

	for _, param := range params.optional {
		accepted[param.name] = true
	}

	for i := range args.positional {
		if i < len(params.required) {
			received[params.required[i]] = true
		} else {
			received[params.optional[i-len(params.required)].name] = true
		}
	}

	for _, arg := range args.named {
		if _, present := received[arg.name]; present {
			return e.Error(fmt.Sprintf("Argument %v already provided", arg.name))
		}
		if _, present := accepted[arg.name]; !present {
			return e.Error(fmt.Sprintf("function has no parameter %v", arg.name))
		}
		received[arg.name] = true
	}

	for _, param := range params.required {
		if _, present := received[param]; !present {
			return e.Error(fmt.Sprintf("Missing argument: %v", param))
		}
	}

	return nil
}

func (f *valueFunction) getType() *valueType {
	return functionType
}

// Parameters represents required position and optional named parameters for a
// function definition.
type Parameters struct {
	required ast.Identifiers
	optional []namedParameter
}

type namedParameter struct {
	name       ast.Identifier
	defaultArg potentialValueInEnv
}

type potentialValueInEnv interface {
	inEnv(env *environment) potentialValue
}

type callArguments struct {
	positional []potentialValue
	named      []namedCallArgument
	tailstrict bool
}

type namedCallArgument struct {
	name ast.Identifier
	pv   potentialValue
}

func args(xs ...potentialValue) callArguments {
	return callArguments{positional: xs}
}

// Objects
// -------------------------------------

// Object is a value that allows indexing (taking a value of a field)
// and combining through mixin inheritence (operator +).
//
// Note that every time a field is indexed it evaluates it again, there is
// no caching of field values. See: https://github.com/google/go-jsonnet/issues/113
type valueObject interface {
	value
	inheritanceSize() int
	index(e *evaluator, field string) (value, error)
	assertionsChecked() bool
	setAssertionsCheckResult(err error)
	getAssertionsCheckResult() error
}

type selfBinding struct {
	// self is the lexically nearest object we are in, or nil.  Note
	// that this is not the same as context, because we could be inside a function,
	// inside an object and then context would be the function, but self would still point
	// to the object.
	self valueObject

	// superDepth is the "super" level of self.  Sometimes, we look upwards in the
	// inheritance tree, e.g. via an explicit use of super, or because a given field
	// has been inherited.  When evaluating a field from one of these super objects,
	// we need to bind self to the concrete object (so self must point
	// there) but uses of super should be resolved relative to the object whose
	// field we are evaluating.  Thus, we keep a second field for that.  This is
	// usually 0, unless we are evaluating a super object's field.
	// TODO(sbarzowski) provide some examples
	// TODO(sbarzowski) provide somewhere a complete explanation of the object model
	superDepth int
}

func makeUnboundSelfBinding() selfBinding {
	return selfBinding{
		nil,
		123456789, // poison value
	}
}

func objectBinding(obj valueObject) selfBinding {
	return selfBinding{self: obj, superDepth: 0}
}

func (sb selfBinding) super() selfBinding {
	return selfBinding{self: sb.self, superDepth: sb.superDepth + 1}
}

// Hidden represents wether to include hidden fields in a lookup.
type Hidden int

// With/without hidden fields
const (
	withHidden Hidden = iota
	withoutHidden
)

func withHiddenFromBool(with bool) Hidden {
	if with {
		return withHidden
	}
	return withoutHidden
}

// Hack - we need to distinguish not-checked-yet and no error situations
// so we have a special value for no error and nil means that we don't know yet.
var errNoErrorInObjectInvariants = errors.New("no error - assertions passed")

type valueObjectBase struct {
	valueBase
	assertionError error
}

func (*valueObjectBase) getType() *valueType {
	return objectType
}

func (obj *valueObjectBase) assertionsChecked() bool {
	// nil - not checked yet
	// errNoErrorInObjectInvariants - we checked and there is no error (or checking in progress)
	return obj.assertionError != nil
}

func (obj *valueObjectBase) setAssertionsCheckResult(err error) {
	if err != nil {
		obj.assertionError = err
	} else {
		obj.assertionError = errNoErrorInObjectInvariants
	}
}

func (obj *valueObjectBase) getAssertionsCheckResult() error {
	if obj.assertionError == nil {
		panic("Assertions not checked yet")
	}
	if obj.assertionError == errNoErrorInObjectInvariants {
		return nil
	}
	return obj.assertionError
}

// valueSimpleObject represents a flat object (no inheritance).
// Note that it can be used as part of extended objects
// in inheritance using operator +.
//
// Fields are late bound (to object), so they are not values or potentialValues.
// This is important for inheritance, for example:
// Let a = {x: 42} and b = {y: self.x}. Evaluating b.y is an error,
// but (a+b).y evaluates to 42.
type valueSimpleObject struct {
	valueObjectBase
	upValues bindingFrame
	fields   simpleObjectFieldMap
	asserts  []unboundField
}

func checkAssertionsHelper(e *evaluator, obj valueObject, curr valueObject, superDepth int) error {
	switch curr := curr.(type) {
	case *valueExtendedObject:
		err := checkAssertionsHelper(e, obj, curr.right, superDepth)
		if err != nil {
			return err
		}
		err = checkAssertionsHelper(e, obj, curr.left, superDepth+curr.right.inheritanceSize())
		if err != nil {
			return err
		}
		return nil
	case *valueSimpleObject:
		for _, assert := range curr.asserts {
			_, err := e.evaluate(assert.bindToObject(selfBinding{self: obj, superDepth: superDepth}, curr.upValues, ""))
			if err != nil {
				return err
			}
		}
		return nil
	default:
		panic(fmt.Sprintf("Unknown object type %#v", obj))
	}
}

func checkAssertions(e *evaluator, obj valueObject) error {
	if !obj.assertionsChecked() {
		// Assertions may refer to the object that will normally
		// trigger checking of assertions, resulting in an endless recursion.
		// To avoid that, while we check them, we treat them as already passed.
		obj.setAssertionsCheckResult(errNoErrorInObjectInvariants)
		obj.setAssertionsCheckResult(checkAssertionsHelper(e, obj, obj, 0))
	}
	return obj.getAssertionsCheckResult()
}

func (o *valueSimpleObject) index(e *evaluator, field string) (value, error) {
	return objectIndex(e, objectBinding(o), field)
}

func (*valueSimpleObject) inheritanceSize() int {
	return 1
}

func makeValueSimpleObject(b bindingFrame, fields simpleObjectFieldMap, asserts []unboundField) *valueSimpleObject {
	return &valueSimpleObject{
		upValues: b,
		fields:   fields,
		asserts:  asserts,
	}
}

type simpleObjectFieldMap map[string]simpleObjectField

type simpleObjectField struct {
	hide  ast.ObjectFieldHide
	field unboundField
}

// unboundField is a field that doesn't know yet in which object it is.
type unboundField interface {
	bindToObject(sb selfBinding, origBinding bindingFrame, fieldName string) potentialValue
}

// valueExtendedObject represents an object created through inheritence (left + right).
// We represent it as the pair of objects. This results in a tree-like structure.
// Example:
// (A + B) + C
//
//        +
//       / \
//      +   C
//     / \
//    A   B
//
// It is possible to create an arbitrary binary tree.
// Note however, that because + is associative the only thing that matters
// is the order of leafs.
//
// This represenation allows us to implement "+" in O(1),
// but requires going through the tree and trying subsequent leafs for field access.
//
type valueExtendedObject struct {
	valueObjectBase
	left, right          valueObject
	totalInheritanceSize int
}

func (o *valueExtendedObject) index(e *evaluator, field string) (value, error) {
	return objectIndex(e, objectBinding(o), field)
}

func (o *valueExtendedObject) inheritanceSize() int {
	return o.totalInheritanceSize
}

func makeValueExtendedObject(left, right valueObject) *valueExtendedObject {
	return &valueExtendedObject{
		left:                 left,
		right:                right,
		totalInheritanceSize: left.inheritanceSize() + right.inheritanceSize(),
	}
}

// findField returns a field in object curr, with superDepth at least minSuperDepth
// It also returns an associated bindingFrame and actual superDepth that the field
// was found at.
func findField(curr value, minSuperDepth int, f string) (*simpleObjectField, bindingFrame, int) {
	switch curr := curr.(type) {
	case *valueExtendedObject:
		if curr.right.inheritanceSize() > minSuperDepth {
			field, frame, counter := findField(curr.right, minSuperDepth, f)
			if field != nil {
				return field, frame, counter
			}
		}
		field, frame, counter := findField(curr.left, minSuperDepth-curr.right.inheritanceSize(), f)
		return field, frame, counter + curr.right.inheritanceSize()

	case *valueSimpleObject:
		if minSuperDepth <= 0 {
			if field, ok := curr.fields[f]; ok {
				return &field, curr.upValues, 0
			}
		}
		return nil, nil, 0
	default:
		panic(fmt.Sprintf("Unknown object type %#v", curr))
	}
}

func objectIndex(e *evaluator, sb selfBinding, fieldName string) (value, error) {
	err := checkAssertions(e, sb.self)
	if err != nil {
		return nil, err
	}
	if sb.superDepth >= sb.self.inheritanceSize() {
		return nil, e.Error("Attempt to use super when there is no super class.")
	}
	objp := tryObjectIndex(sb, fieldName, withHidden)
	if objp == nil {
		return nil, e.Error(fmt.Sprintf("Field does not exist: %s", fieldName))
	}
	return e.evaluate(objp)
}

func tryObjectIndex(sb selfBinding, fieldName string, h Hidden) potentialValue {
	field, upValues, foundAt := findField(sb.self, sb.superDepth, fieldName)
	if field == nil || (h == withoutHidden && field.hide == ast.ObjectFieldHidden) {
		return nil
	}
	fieldSelfBinding := selfBinding{self: sb.self, superDepth: foundAt}

	return field.field.bindToObject(fieldSelfBinding, upValues, fieldName)
}

type fieldHideMap map[string]ast.ObjectFieldHide

func objectFieldsVisibility(obj valueObject) fieldHideMap {
	r := make(fieldHideMap)
	switch obj := obj.(type) {
	case *valueExtendedObject:
		r = objectFieldsVisibility(obj.left)
		rightMap := objectFieldsVisibility(obj.right)
		for k, v := range rightMap {
			if v == ast.ObjectFieldInherit {
				if _, alreadyExists := r[k]; !alreadyExists {
					r[k] = v
				}
			} else {
				r[k] = v
			}
		}
		return r

	case *valueSimpleObject:
		for fieldName, field := range obj.fields {
			r[fieldName] = field.hide
		}
	}
	return r
}

func objectFields(obj valueObject, h Hidden) []string {
	var r []string
	for fieldName, hide := range objectFieldsVisibility(obj) {
		if h == withHidden || hide != ast.ObjectFieldHidden {
			r = append(r, fieldName)
		}
	}
	return r
}

func duplicateFieldNameErrMsg(fieldName string) string {
	return fmt.Sprintf("Duplicate field name: %s", unparseString(fieldName))
}

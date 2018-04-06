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
	"fmt"

	"github.com/google/go-jsonnet/ast"
)

// evaluator is a convenience wrapper for interpreter
// Most importantly it keeps the context for traces and handles details
// of error handling.
type evaluator struct {
	i     *interpreter
	trace *TraceElement
}

func makeEvaluator(i *interpreter, trace *TraceElement) *evaluator {
	return &evaluator{i: i, trace: trace}
}

func (e *evaluator) inNewContext(trace *TraceElement) *evaluator {
	return makeEvaluator(e.i, trace)
}

func (e *evaluator) evaluate(ph potentialValue) (value, error) {
	return ph.getValue(e.i, e.trace)
}

func (e *evaluator) evaluateTailCall(ph potentialValue, tc tailCallStatus) (value, error) {
	if tc == tailCall {
		e.i.stack.tailCallTrimStack()
	}
	return ph.getValue(e.i, e.trace)
}

func (e *evaluator) Error(s string) error {
	err := makeRuntimeError(s, e.i.getCurrentStackTrace(e.trace))
	return err
}

func (e *evaluator) typeErrorSpecific(bad value, good value) error {
	return e.Error(
		fmt.Sprintf("Unexpected type %v, expected %v", bad.getType().name, good.getType().name),
	)
}

func (e *evaluator) typeErrorGeneral(bad value) error {
	return e.Error(
		fmt.Sprintf("Unexpected type %v", bad.getType().name),
	)
}

func (e *evaluator) getNumber(val value) (*valueNumber, error) {
	switch v := val.(type) {
	case *valueNumber:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueNumber{})
	}
}

func (e *evaluator) evaluateNumber(pv potentialValue) (*valueNumber, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getNumber(v)
}

func (e *evaluator) getInt(val value) (int, error) {
	num, err := e.getNumber(val)
	if err != nil {
		return 0, err
	}
	// We conservatively convert ot int32, so that it can be machine-sized int
	// on any machine. And it's used only for indexing anyway.
	intNum := int(int32(num.value))
	if float64(intNum) != num.value {
		return 0, e.Error(fmt.Sprintf("Expected an integer, but got %v", num.value))
	}
	return intNum, nil
}

func (e *evaluator) evaluateInt(pv potentialValue) (int, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return 0, err
	}
	return e.getInt(v)
}

func (e *evaluator) getInt64(val value) (int64, error) {
	num, err := e.getNumber(val)
	if err != nil {
		return 0, err
	}
	intNum := int64(num.value)
	if float64(intNum) != num.value {
		return 0, e.Error(fmt.Sprintf("Expected an integer, but got %v", num.value))
	}
	return intNum, nil
}

func (e *evaluator) evaluateInt64(pv potentialValue) (int64, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return 0, err
	}
	return e.getInt64(v)
}

func (e *evaluator) getString(val value) (*valueString, error) {
	switch v := val.(type) {
	case *valueString:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueString{})
	}
}

func (e *evaluator) evaluateString(pv potentialValue) (*valueString, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getString(v)
}

func (e *evaluator) getBoolean(val value) (*valueBoolean, error) {
	switch v := val.(type) {
	case *valueBoolean:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueBoolean{})
	}
}

func (e *evaluator) evaluateBoolean(pv potentialValue) (*valueBoolean, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getBoolean(v)
}

func (e *evaluator) getArray(val value) (*valueArray, error) {
	switch v := val.(type) {
	case *valueArray:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueArray{})
	}
}

func (e *evaluator) evaluateArray(pv potentialValue) (*valueArray, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getArray(v)
}

func (e *evaluator) getFunction(val value) (*valueFunction, error) {
	switch v := val.(type) {
	case *valueFunction:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueFunction{})
	}
}

func (e *evaluator) evaluateFunction(pv potentialValue) (*valueFunction, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getFunction(v)
}

func (e *evaluator) getObject(val value) (valueObject, error) {
	switch v := val.(type) {
	case valueObject:
		return v, nil
	default:
		return nil, e.typeErrorSpecific(val, &valueSimpleObject{})
	}
}

func (e *evaluator) evaluateObject(pv potentialValue) (valueObject, error) {
	v, err := e.evaluate(pv)
	if err != nil {
		return nil, err
	}
	return e.getObject(v)
}

func (e *evaluator) evalInCurrentContext(a ast.Node, tc tailCallStatus) (value, error) {
	return e.i.evaluate(a, tc)
}

func (e *evaluator) evalInCleanEnv(env *environment, ast ast.Node, trimmable bool) (value, error) {
	return e.i.EvalInCleanEnv(e.trace, env, ast, trimmable)
}

func (e *evaluator) lookUpVar(ident ast.Identifier) potentialValue {
	th := e.i.stack.lookUpVar(ident)
	if th == nil {
		panic(fmt.Sprintf("RUNTIME: Unknown variable: %v (we should have caught this statically)", ident))
	}
	return th
}

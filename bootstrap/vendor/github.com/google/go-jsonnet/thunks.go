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

import "github.com/google/go-jsonnet/ast"

// readyValue
// -------------------------------------

// readyValue is a wrapper which allows to use a concrete value where normally
// some evaluation would be expected (e.g. object fields). It's not part
// of the value interface for increased type safety (it would be very easy
// to "overevaluate" otherwise) and conveniently it also saves us from implementing
// these methods for all value types.
type readyValue struct {
	content value
}

func (rv *readyValue) getValue(i *interpreter, t *TraceElement) (value, error) {
	return rv.content, nil
}

func (rv *readyValue) bindToObject(sb selfBinding, origBinding bindingFrame, fieldName string) potentialValue {
	return rv
}

func (rv *readyValue) aPotentialValue() {}

// potentialValues
// -------------------------------------

// evaluable is something that can be evaluated and the result is always the same
// It may require computation every time evaluation is requested (in contrast with
// potentialValue which guarantees that computation happens at most once).
type evaluable interface {
	// fromWhere keeps the information from where the evaluation was requested.
	getValue(i *interpreter, fromWhere *TraceElement) (value, error)
}

// thunk holds code and environment in which the code is supposed to be evaluated
type thunk struct {
	env  environment
	body ast.Node
}

// TODO(sbarzowski) feedback from dcunnin:
//					makeThunk returning a cachedThunk is weird.
//					Maybe call thunk 'exprThunk' (or astThunk but then it looks like an AST node).
//					Then call cachedThunk just thunk?
//					Or, call this makeCachedExprThunk because that's what it really is.
func makeThunk(env environment, body ast.Node) *cachedThunk {
	return makeCachedThunk(&thunk{
		env:  env,
		body: body,
	})
}

func (t *thunk) getValue(i *interpreter, trace *TraceElement) (value, error) {
	return i.EvalInCleanEnv(trace, &t.env, t.body, false)
}

// callThunk represents a concrete, but not yet evaluated call to a function
type callThunk struct {
	function evalCallable
	args     callArguments
}

func makeCallThunk(ec evalCallable, args callArguments) potentialValue {
	return makeCachedThunk(&callThunk{function: ec, args: args})
}

func call(ec evalCallable, arguments ...potentialValue) potentialValue {
	return makeCallThunk(ec, args(arguments...))
}

func (th *callThunk) getValue(i *interpreter, trace *TraceElement) (value, error) {
	evaluator := makeEvaluator(i, trace)
	err := checkArguments(evaluator, th.args, th.function.Parameters())
	if err != nil {
		return nil, err
	}
	return th.function.EvalCall(th.args, evaluator)
}

// deferredThunk allows deferring creation of evaluable until it's actually needed.
// It's useful for self-recursive structures.
type deferredThunk func() evaluable

func (th deferredThunk) getValue(i *interpreter, trace *TraceElement) (value, error) {
	return th().getValue(i, trace)
}

func makeDeferredThunk(th deferredThunk) potentialValue {
	return makeCachedThunk(th)
}

// cachedThunk is a wrapper that caches the value of a potentialValue after
// the first evaluation.
// Note: All potentialValues are required to provide the same value every time,
// so it's only there for efficiency.
// TODO(sbarzowski) investigate efficiency of various representations
type cachedThunk struct {
	pv evaluable
}

func makeCachedThunk(pv evaluable) *cachedThunk {
	return &cachedThunk{pv}
}

func (t *cachedThunk) getValue(i *interpreter, trace *TraceElement) (value, error) {
	v, err := t.pv.getValue(i, trace)
	if err != nil {
		// TODO(sbarzowski) perhaps cache errors as well
		// may be necessary if we allow handling them in any way
		return nil, err
	}
	t.pv = &readyValue{v}
	return v, nil
}

func (t *cachedThunk) aPotentialValue() {}

// errorThunk can be used when potentialValue is expected, but we already
// know that something went wrong
type errorThunk struct {
	err error
}

func (th *errorThunk) getValue(i *interpreter, trace *TraceElement) (value, error) {
	return nil, th.err
}

func makeErrorThunk(err error) *errorThunk {
	return &errorThunk{err}
}

func (th *errorThunk) aPotentialValue() {}

// unboundFields
// -------------------------------------

type codeUnboundField struct {
	body ast.Node
}

func (f *codeUnboundField) bindToObject(sb selfBinding, origBindings bindingFrame, fieldName string) potentialValue {
	// TODO(sbarzowski) better object names (perhaps include a field name too?)
	return makeThunk(makeEnvironment(origBindings, sb), f.body)
}

// Provide additional bindings for a field. It shadows bindings from the object.
type bindingsUnboundField struct {
	inner unboundField
	// in addition to "generic" binding frame from the object
	bindings bindingFrame
}

func (f *bindingsUnboundField) bindToObject(sb selfBinding, origBindings bindingFrame, fieldName string) potentialValue {
	var upValues bindingFrame
	upValues = make(bindingFrame)
	for variable, pvalue := range origBindings {
		upValues[variable] = pvalue
	}
	for variable, pvalue := range f.bindings {
		upValues[variable] = pvalue
	}
	return f.inner.bindToObject(sb, upValues, fieldName)
}

// PlusSuperUnboundField represents a `field+: ...` that hasn't been bound to an object.
type PlusSuperUnboundField struct {
	inner unboundField
}

func (f *PlusSuperUnboundField) bindToObject(sb selfBinding, origBinding bindingFrame, fieldName string) potentialValue {
	left := tryObjectIndex(sb.super(), fieldName, withHidden)
	right := f.inner.bindToObject(sb, origBinding, fieldName)
	if left != nil {
		return call(bopBuiltins[ast.BopPlus], left, right)
	}
	return right
}

// evalCallables
// -------------------------------------

type closure struct {
	// base environment of a closure
	// arguments should be added to it, before executing it
	env      environment
	function *ast.Function
	params   Parameters
}

func forceThunks(e *evaluator, args bindingFrame) error {
	for _, arg := range args {
		_, err := e.evaluate(arg)
		if err != nil {
			return err
		}
	}
	return nil
}

func (closure *closure) EvalCall(arguments callArguments, e *evaluator) (value, error) {
	argThunks := make(bindingFrame)
	parameters := closure.Parameters()
	for i, arg := range arguments.positional {
		var name ast.Identifier
		if i < len(parameters.required) {
			name = parameters.required[i]
		} else {
			name = parameters.optional[i-len(parameters.required)].name
		}
		argThunks[name] = arg
	}

	for _, arg := range arguments.named {
		argThunks[arg.name] = arg.pv
	}

	var calledEnvironment environment

	for i := range parameters.optional {
		param := &parameters.optional[i]
		if _, exists := argThunks[param.name]; !exists {
			argThunks[param.name] = makeDeferredThunk(func() evaluable {
				// Default arguments are evaluated in the same environment as function body
				return param.defaultArg.inEnv(&calledEnvironment)
			})
		}
	}

	if arguments.tailstrict {
		err := forceThunks(e, argThunks)
		if err != nil {
			return nil, err
		}
	}

	calledEnvironment = makeEnvironment(
		addBindings(closure.env.upValues, argThunks),
		closure.env.sb,
	)
	return e.evalInCleanEnv(&calledEnvironment, closure.function.Body, arguments.tailstrict)
}

func (closure *closure) Parameters() Parameters {
	return closure.params

}

func prepareClosureParameters(parameters ast.Parameters, env environment) Parameters {
	optionalParameters := make([]namedParameter, 0, len(parameters.Optional))
	for _, named := range parameters.Optional {
		optionalParameters = append(optionalParameters, namedParameter{
			name: named.Name,
			defaultArg: &defaultArgument{
				body: named.DefaultArg,
			},
		})
	}
	return Parameters{
		required: parameters.Required,
		optional: optionalParameters,
	}
}

func makeClosure(env environment, function *ast.Function) *closure {
	return &closure{
		env:      env,
		function: function,
		params:   prepareClosureParameters(function.Parameters, env),
	}
}

// NativeFunction represents a function implemented in Go.
type NativeFunction struct {
	Func   func([]interface{}) (interface{}, error)
	Params ast.Identifiers
	Name   string
}

// EvalCall evaluates a call to a NativeFunction and returns the result.
func (native *NativeFunction) EvalCall(arguments callArguments, e *evaluator) (value, error) {
	flatArgs := flattenArgs(arguments, native.Parameters())
	nativeArgs := make([]interface{}, 0, len(flatArgs))
	for _, arg := range flatArgs {
		v, err := e.evaluate(arg)
		if err != nil {
			return nil, err
		}
		json, err := e.i.manifestJSON(e.trace, v)
		if err != nil {
			return nil, err
		}
		nativeArgs = append(nativeArgs, json)
	}
	resultJSON, err := native.Func(nativeArgs)
	if err != nil {
		return nil, e.Error(err.Error())
	}
	return jsonToValue(e, resultJSON)
}

// Parameters returns a NativeFunction's parameters.
func (native *NativeFunction) Parameters() Parameters {
	return Parameters{required: native.Params}
}

// partialPotentialValue
// -------------------------------------

type defaultArgument struct {
	body ast.Node
}

func (da *defaultArgument) inEnv(env *environment) potentialValue {
	return makeThunk(*env, da.body)
}

package ksonnet

import (
	"regexp"
	"sort"

	"github.com/google/go-jsonnet/ast"
	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"
)

var (
	// reCtorSetter is a regex that matches function names. It'll successfully
	// match `withName`, `foo.withName`, and `foo.bar.withName`.
	reCtorSetter = regexp.MustCompile(`((^.*?)\.)*(with\w+)$`)
)

func matchCtorSetter(in string) (string, string, error) {
	match := reCtorSetter.FindAllStringSubmatch(in, -1)
	if len(match) == 0 {
		return "", "", errors.New("no match")
	}

	cur := match[0]
	if cur[1] == "" {
		return "self", cur[3], nil
	}

	return "self." + cur[2], cur[3], nil
}

type constructor struct {
	name   string
	params []constructorParam
}

func newConstructor(name string, params ...constructorParam) *constructor {
	return &constructor{
		name:   name,
		params: params,
	}
}

// Key creates an object key for the constructor.
func (c *constructor) Key() (nm.Key, error) {
	var args []nm.OptionalArg

	for _, param := range c.params {
		option, err := param.Option()
		if err != nil {
			return nm.Key{}, errors.Wrap(err, "unable to create key from param")
		}

		args = append(args, option)
	}

	key := nm.FunctionKey(c.name, []string{}, nm.KeyOptNamedParams(args...))
	return key, nil
}

func (c *constructor) Body(baseNodes ...nm.Noder) nm.Noder {
	var items []nm.Noder
	for _, node := range baseNodes {
		items = append(items, node)
	}

	// collection functions so they can be de-duplicated.
	funs := make(map[string][]argRef)
	for _, param := range c.params {
		path, fn, err := matchCtorSetter(param.function)
		if err != nil {
			// TODO should we handle this error?
			continue
		}

		if _, ok := funs[path]; !ok {
			funs[path] = make([]argRef, 0)
		}

		funs[path] = append(funs[path], argRef{name: param.name, fn: fn})
	}

	var funNames []string
	for funName := range funs {
		funNames = append(funNames, funName)
	}
	sort.Strings(funNames)

	for _, funName := range funNames {

		call := nm.NewCall(funName)

		var curApply *ctorApply
		var addedCall bool

		ars := funs[funName]
		sort.Slice(ars, func(i, j int) bool {
			return ars[i].fn < ars[j].fn
		})

		for _, ar := range ars {
			indexID := ast.Identifier(ar.fn)
			index := &ast.Index{Id: &indexID}
			if !addedCall {
				index.Target = call.Node()
				addedCall = true
			} else {
				index.Target = curApply.Node()
			}

			arg := &ast.Var{Id: ast.Identifier(ar.name)}
			apply := ast.Apply{
				Arguments: ast.Arguments{Positional: ast.Nodes{arg}},
				Target:    index,
			}

			curApply = &ctorApply{Apply: apply}
		}

		items = append(items, curApply)
	}

	return nm.Combine(items...)
}

type ctorApply struct {
	ast.Apply
}

func (ca *ctorApply) Node() ast.Node {
	return &ca.Apply
}

type argRef struct {
	name string
	fn   string
}

type constructorParam struct {
	name         string
	function     string
	defaultValue interface{}
}

func newConstructorParam(name, function string, defaultValue interface{}) *constructorParam {
	if defaultValue == nil {
		defaultValue = ""
	}

	return &constructorParam{
		name:         name,
		function:     function,
		defaultValue: defaultValue,
	}
}

func (cp *constructorParam) Option() (nm.OptionalArg, error) {
	var node nm.Noder

	var err error

	switch t := cp.defaultValue.(type) {
	case string:
		node = nm.NewStringDouble(t)
	case map[string]interface{}:
		node, err = nm.KVFromMap(t)
		if err != nil {
			return nm.OptionalArg{}, errors.Wrap(err, "invalid parameter")
		}
	case []string:
		var items []nm.Noder
		for _, item := range t {
			items = append(items, nm.NewStringDouble(item))
		}
		node = nm.NewArray(items)
	case float64:
		node = nm.NewFloat(t)
	case int:
		node = nm.NewInt(t)
	case bool:
		node = nm.NewBoolean(t)
	default:
		return nm.OptionalArg{}, errors.Errorf("unable to use type %T in param", t)
	}

	return nm.OptionalArg{Name: cp.name, Default: node}, nil
}

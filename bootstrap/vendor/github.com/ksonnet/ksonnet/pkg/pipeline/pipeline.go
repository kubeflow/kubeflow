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

package pipeline

import (
	"bytes"
	"io"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/util/jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

// OverrideManager overrides the component manager interface for a pipeline.
func OverrideManager(c component.Manager) Opt {
	return func(p *Pipeline) {
		p.cm = c
	}
}

// Opt is an option for configuring Pipeline.
type Opt func(p *Pipeline)

// Pipeline is the ks build pipeline.
type Pipeline struct {
	app     app.App
	envName string
	cm      component.Manager
}

// New creates an instance of Pipeline.
func New(ksApp app.App, envName string, opts ...Opt) *Pipeline {
	logrus.Debugf("creating ks pipeline for environment %q", envName)
	p := &Pipeline{
		app:     ksApp,
		envName: envName,
		cm:      component.DefaultManager,
	}

	for _, opt := range opts {
		opt(p)
	}

	return p
}

// Modules returns the modules that belong to this pipeline.
func (p *Pipeline) Modules() ([]component.Module, error) {
	return p.cm.Modules(p.app, p.envName)
}

// EnvParameters creates parameters for a namespace given an environment.
func (p *Pipeline) EnvParameters(module string) (string, error) {
	ns, err := p.cm.Module(p.app, module)
	if err != nil {
		return "", errors.Wrapf(err, "load module %s", module)
	}

	paramsStr, err := p.cm.NSResolveParams(ns)
	if err != nil {
		return "", errors.Wrapf(err, "resolve params for %s", module)
	}

	data, err := p.app.EnvironmentParams(p.envName)
	if err != nil {
		return "", errors.Wrapf(err, "retrieve environment params for %s", p.envName)
	}

	envParams := upgradeParams(p.envName, data)

	env, err := p.app.Environment(p.envName)
	if err != nil {
		return "", errors.Wrapf(err, "load environment %s", p.envName)
	}

	vm := jsonnet.NewVM()
	vm.JPaths = []string{
		env.MakePath(p.app.Root()),
		filepath.Join(p.app.Root(), "vendor")}
	vm.ExtCode("__ksonnet/params", paramsStr)
	return vm.EvaluateSnippet("snippet", string(envParams))
}

// Components returns the components that belong to this pipeline.
func (p *Pipeline) Components(filter []string) ([]component.Component, error) {
	namespaces, err := p.Modules()
	if err != nil {
		return nil, err
	}

	components := make([]component.Component, 0)
	for _, ns := range namespaces {
		members, err := p.cm.Components(ns)
		if err != nil {
			return nil, err
		}

		members = filterComponents(filter, members)
		components = append(components, members...)
	}

	return components, nil
}

// Objects converts components into Kubernetes objects.
func (p *Pipeline) Objects(filter []string) ([]*unstructured.Unstructured, error) {
	namespaces, err := p.Modules()
	if err != nil {
		return nil, errors.Wrap(err, "get namespaces")
	}

	var names []string
	for _, n := range namespaces {
		names = append(names, n.Name())
	}

	logrus.Debugf("pipeline: build objects for namespaces: %s", strings.Join(names, ", "))

	objects := make([]*unstructured.Unstructured, 0)
	for _, ns := range namespaces {
		paramsStr, err := p.EnvParameters(ns.Name())
		if err != nil {
			return nil, errors.Wrap(err, "create environment parameters")
		}

		components, err := p.Components(filter)
		if err != nil {
			return nil, errors.Wrapf(err, "find objects in namespace %s", ns.Name())
		}

		names = make([]string, 0)
		for _, c := range components {
			names = append(names, c.Name(true))
		}

		logrus.Debugf("pipeline: components for %s: %s", ns.Name(), strings.Join(names, ", "))

		for i := range components {
			o, err := components[i].Objects(paramsStr, p.envName)
			if err != nil {
				return nil, errors.Wrapf(err, "find objects for %s in %s", components[i].Name(false), ns.Name())
			}

			objects = append(objects, o...)
		}
	}

	return objects, nil
}

// YAML converts components into YAML.
func (p *Pipeline) YAML(filter []string) (io.Reader, error) {
	objects, err := p.Objects(filter)
	if err != nil {
		return nil, err
	}

	var buf bytes.Buffer
	if err := Fprint(&buf, objects, "yaml"); err != nil {
		return nil, errors.Wrap(err, "convert objects to YAML")
	}

	return &buf, nil
}

func filterComponents(filter []string, components []component.Component) []component.Component {
	if len(filter) == 0 {
		return components
	}

	var out []component.Component
	for _, c := range components {
		if stringInSlice(c.Name(true), filter) {
			out = append(out, c)
		}
	}

	return out
}

var (
	reParamSwap = regexp.MustCompile(`(?m)import "\.\.\/\.\.\/components\/params\.libsonnet"`)
)

// upgradeParams replaces relative params imports with an extVar to handle
// multiple component namespaces.
// NOTE: It warns when it makes a change. This serves as a temporary fix until
// ksonnet generates the correct file.
func upgradeParams(envName, in string) string {
	if reParamSwap.MatchString(in) {
		logrus.Warnf("rewriting %q environment params to not use relative paths", envName)
		return reParamSwap.ReplaceAllLiteralString(in, `std.extVar("__ksonnet/params")`)
	}

	return in
}

func stringInSlice(s string, sl []string) bool {
	for i := range sl {
		if sl[i] == s {
			return true
		}
	}

	return false
}

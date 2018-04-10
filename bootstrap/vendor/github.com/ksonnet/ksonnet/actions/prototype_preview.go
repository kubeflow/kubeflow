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

package actions

import (
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/ksonnet/ksonnet/metadata"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pkg"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/ksonnet/ksonnet/prototype/snippet"
	"github.com/ksonnet/ksonnet/prototype/snippet/jsonnet"
	strutil "github.com/ksonnet/ksonnet/strings"
	"github.com/pkg/errors"
	"github.com/spf13/pflag"
)

// RunPrototypePreview runs `prototype describe`
func RunPrototypePreview(m map[string]interface{}) error {
	pp, err := NewPrototypePreview(m)
	if err != nil {
		return err
	}

	return pp.Run()
}

// PrototypePreview lists available namespaces
type PrototypePreview struct {
	app             app.App
	out             io.Writer
	query           string
	args            []string
	appPrototypesFn func(app.App, pkg.Descriptor) (prototype.SpecificationSchemas, error)
}

// NewPrototypePreview creates an instance of PrototypePreview
func NewPrototypePreview(m map[string]interface{}) (*PrototypePreview, error) {
	ol := newOptionLoader(m)

	pp := &PrototypePreview{
		app:   ol.loadApp(),
		query: ol.loadString(OptionQuery),
		args:  ol.loadStringSlice(OptionArguments),

		out:             os.Stdout,
		appPrototypesFn: pkg.LoadPrototypes,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return pp, nil
}

// Run runs the env list action.
func (pp *PrototypePreview) Run() error {
	prototypes, err := allPrototypes(pp.app, pp.appPrototypesFn)
	if err != nil {
		return err
	}

	index := prototype.NewIndex(prototypes)

	prototypes, err = index.List()
	if err != nil {
		return err
	}

	p, err := findUniquePrototype(pp.query, prototypes)
	if err != nil {
		return err
	}

	flags := bindPrototypeParams(p)
	if err = flags.Parse(pp.args); err != nil {
		return errors.Wrap(err, "parse preview args")
	}

	// NOTE: only supporting jsonnet templates
	templateType := prototype.Jsonnet

	params, err := getParameters(p, flags)
	if err != nil {
		return err
	}

	text, err := expandPrototype(p, templateType, params, "preview")
	if err != nil {
		return err
	}

	fmt.Fprintln(pp.out, text)
	return nil
}

func bindPrototypeParams(p *prototype.SpecificationSchema) *pflag.FlagSet {
	fs := pflag.NewFlagSet("preview", pflag.ContinueOnError)

	for _, param := range p.RequiredParams() {
		fs.String(param.Name, "", param.Description)
	}

	for _, param := range p.OptionalParams() {
		fs.String(param.Name, *param.Default, param.Description)
	}

	return fs
}

func getParameters(proto *prototype.SpecificationSchema, flags *pflag.FlagSet) (map[string]string, error) {
	missingRequired := prototype.ParamSchemas{}
	values := map[string]string{}
	for _, param := range proto.RequiredParams() {
		val, err := flags.GetString(param.Name)
		if err != nil {
			return nil, err
		} else if val == "" {
			missingRequired = append(missingRequired, param)
		} else if _, ok := values[param.Name]; ok {
			return nil, errors.Errorf("Prototype '%s' has multiple parameters with name '%s'", proto.Name, param.Name)
		}

		quoted, err := param.Quote(val)
		if err != nil {
			return nil, err
		}
		values[param.Name] = quoted
	}

	if len(missingRequired) > 0 {
		return nil, errors.Errorf("failed to instantiate prototype '%s'. The following required parameters are missing:\n%s", proto.Name, missingRequired.PrettyString(""))
	}

	for _, param := range proto.OptionalParams() {
		val, err := flags.GetString(param.Name)
		if err != nil {
			return nil, err
		} else if _, ok := values[param.Name]; ok {
			return nil, errors.Errorf("prototype '%s' has multiple parameters with name '%s'", proto.Name, param.Name)
		}

		quoted, err := param.Quote(val)
		if err != nil {
			return nil, err
		}
		values[param.Name] = quoted
	}

	return values, nil
}

// TODO: this doesn't belong here. Needs to be closer to where other jsonnet processing happens.
func expandPrototype(proto *prototype.SpecificationSchema, templateType prototype.TemplateType, params map[string]string, componentName string) (string, error) {
	template, err := proto.Template.Body(templateType)
	if err != nil {
		return "", err
	}
	if templateType == prototype.Jsonnet {
		componentsText := "components." + componentName
		if !strutil.IsASCIIIdentifier(componentName) {
			componentsText = fmt.Sprintf(`components["%s"]`, componentName)
		}
		template = append([]string{
			`local env = std.extVar("` + metadata.EnvExtCodeKey + `");`,
			`local params = std.extVar("` + metadata.ParamsExtCodeKey + `").` + componentsText + ";"},
			template...)
		return jsonnet.Parse(componentName, strings.Join(template, "\n"))
	}

	tm := snippet.Parse(strings.Join(template, "\n"))
	return tm.Evaluate(params)
}

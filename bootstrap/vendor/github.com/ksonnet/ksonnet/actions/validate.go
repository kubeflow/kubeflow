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

	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/pipeline"
	"github.com/ksonnet/ksonnet/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/client-go/discovery"
)

// RunValidate runs `ns list`
func RunValidate(m map[string]interface{}) error {
	v, err := NewValidate(m)
	if err != nil {
		return err
	}

	return v.Run()
}

type discoveryFn func(a app.App, clientConfig *client.Config, envName string) (discovery.DiscoveryInterface, error)

type validateObjectFn func(d discovery.DiscoveryInterface,
	obj *unstructured.Unstructured) []error

type findObjectsFn func(a app.App, envName string,
	componentNames []string) ([]*unstructured.Unstructured, error)

// Validate lists namespaces.
type Validate struct {
	app            app.App
	envName        string
	module         string
	componentNames []string
	clientConfig   *client.Config
	out            io.Writer

	discoveryFn      discoveryFn
	validateObjectFn validateObjectFn
	findObjectsFn    findObjectsFn
}

// NewValidate creates an instance of Validate.
func NewValidate(m map[string]interface{}) (*Validate, error) {
	ol := newOptionLoader(m)

	v := &Validate{
		app:            ol.loadApp(),
		envName:        ol.loadString(OptionEnvName),
		module:         ol.loadString(OptionModule),
		componentNames: ol.loadStringSlice(OptionComponentNames),
		clientConfig:   ol.loadClientConfig(),

		out:              os.Stdout,
		discoveryFn:      loadDiscovery,
		validateObjectFn: validateObject,
		findObjectsFn:    findObjects,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return v, nil
}

// Run lists namespaces.
func (v *Validate) Run() error {
	objects, err := v.findObjectsFn(v.app, v.envName, v.componentNames)
	if err != nil {
		return err
	}

	disc, err := v.discoveryFn(v.app, v.clientConfig, v.envName)
	if err != nil {
		return err
	}

	var hasError bool

	for _, obj := range objects {
		desc := fmt.Sprintf("%s %s", utils.ResourceNameFor(disc, obj), utils.FqName(obj))
		log.Info("Validating ", desc)

		errs := v.validateObjectFn(disc, obj)
		for _, err := range errs {
			log.Errorf("Error in %s: %v", desc, err)
			hasError = true
		}
	}

	if hasError {
		return errors.Errorf("validation failed")
	}

	return nil
}

func loadDiscovery(a app.App, clientConfig *client.Config, envName string) (discovery.DiscoveryInterface, error) {
	_, d, _, err := clientConfig.RestClient(a, &envName)
	return d, err
}

func validateObject(d discovery.DiscoveryInterface, obj *unstructured.Unstructured) []error {
	schema, err := utils.NewSwaggerSchemaFor(d, obj.GroupVersionKind().GroupVersion())
	if err != nil {
		return []error{errors.Wrap(err, "unable to retrieve schema")}
	}

	return schema.Validate(obj)
}

func findObjects(a app.App, envName string, componentNames []string) ([]*unstructured.Unstructured, error) {
	p := pipeline.New(a, envName)
	return p.Objects(componentNames)
}

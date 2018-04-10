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

	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

const (
	// OptionApp is app option.
	OptionApp = "app"
	// OptionArguments is arguments option. Used for passing arguments to prototypes.
	OptionArguments = "arguments"
	// OptionClientConfig is clientConfig option.
	OptionClientConfig = "client-config"
	// OptionComponentName is a componentName option.
	OptionComponentName = "component-name"
	// OptionComponentNames is componentNames option.
	OptionComponentNames = "component-names"
	// OptionCreate is create option.
	OptionCreate = "create"
	// OptionDryRun is dryRun option.
	OptionDryRun = "dry-run"
	// OptionEnvName is envName option.
	OptionEnvName = "env-name"
	// OptionFormat is format option.
	OptionFormat = "format"
	// OptionFs is fs option.
	OptionFs = "fs"
	// OptionGcTag is gcTag option.
	OptionGcTag = "gc-tag"
	// OptionGlobal is global option.
	OptionGlobal = "global"
	// OptionGracePeriod is gracePeriod option.
	OptionGracePeriod = "grace-period"
	// OptionIndex is index option. Is used to target individual items in multi object
	// components.
	OptionIndex = "index"
	// OptionLibName is libName.
	OptionLibName = "lib-name"
	// OptionName is name option.
	OptionName = "name"
	// OptionModule is component module option.
	OptionModule = "module"
	// OptionNamespace is a cluster namespace option
	OptionNamespace = "namespace"
	// OptionNewEnvName is newEnvName option. Used for renaming environments.
	OptionNewEnvName = "new-env-name"
	// OptionOutput is output option.
	OptionOutput = "output"
	// OptionOverride is override option.
	OptionOverride = "override"
	// OptionPackageName is packageName option.
	OptionPackageName = "package-name"
	// OptionPath is path option.
	OptionPath = "path"
	// OptionQuery is query option.
	OptionQuery = "query"
	// OptionRootPath is path option.
	OptionRootPath = "root-path"
	// OptionServer is server option.
	OptionServer = "server"
	// OptionServerURI is serverURI option.
	OptionServerURI = "server-uri"
	// OptionSkipDefaultRegistries is skipDefaultRegistries option. Used by init.
	OptionSkipDefaultRegistries = "skip-default-registries"
	// OptionSkipGc is skipGc option.
	OptionSkipGc = "skip-gc"
	// OptionSpecFlag is specFlag option. Used for setting k8s spec.
	OptionSpecFlag = "spec-flag"
	// OptionURI is uri option. Used for setting registry URI.
	OptionURI = "URI"
	// OptionValue is value option.
	OptionValue = "value"
	// OptionVersion is version option.
	OptionVersion = "version"
)

var (
	// ErrNotInApp is an error stating the user is not in a ksonnet application directory
	// hierarchy.
	ErrNotInApp = errors.Errorf("could not find ksonnet app")
)

type missingOptionError struct {
	name string
}

func newMissingOptionError(name string) *missingOptionError {
	return &missingOptionError{
		name: name,
	}
}

func (e *missingOptionError) Error() string {
	return fmt.Sprintf("missing required %s option", e.name)
}

type invalidOptionError struct {
	name string
}

func newInvalidOptionError(name string) *invalidOptionError {
	return &invalidOptionError{
		name: name,
	}
}

func (e *invalidOptionError) Error() string {
	return fmt.Sprintf("invalid type for option %s", e.name)
}

type optionLoader struct {
	err error
	m   map[string]interface{}
}

func newOptionLoader(m map[string]interface{}) *optionLoader {
	return &optionLoader{
		m: m,
	}
}

func (o *optionLoader) loadFs(name string) afero.Fs {
	i := o.load(name)
	if i == nil {
		return nil
	}

	a, ok := i.(afero.Fs)
	if !ok {
		o.err = newInvalidOptionError(name)
		return nil
	}

	return a
}

func (o *optionLoader) loadBool(name string) bool {
	i := o.load(name)
	if i == nil {
		return false
	}

	a, ok := i.(bool)
	if !ok {
		o.err = newInvalidOptionError(name)
		return false
	}

	return a
}

func (o *optionLoader) loadOptionalBool(name string) bool {
	i := o.loadOptional(name)
	if i == nil {
		return false
	}

	a, ok := i.(bool)
	if !ok {
		return false
	}

	return a
}

func (o *optionLoader) loadInt(name string) int {
	i := o.load(name)
	if i == nil {
		return 0
	}

	a, ok := i.(int)
	if !ok {
		o.err = newInvalidOptionError(name)
		return 0
	}

	return a
}

func (o *optionLoader) loadInt64(name string) int64 {
	i := o.load(name)
	if i == nil {
		return 0
	}

	a, ok := i.(int64)
	if !ok {
		o.err = newInvalidOptionError(name)
		return 0
	}

	return a
}

func (o *optionLoader) loadOptionalInt(name string) int {
	i := o.loadOptional(name)
	if i == nil {
		return 0
	}

	a, ok := i.(int)
	if !ok {
		return 0
	}

	return a
}

func (o *optionLoader) loadString(name string) string {
	i := o.load(name)
	if i == nil {
		return ""
	}

	a, ok := i.(string)
	if !ok {
		o.err = newInvalidOptionError(name)
		return ""
	}

	return a
}

func (o *optionLoader) loadOptionalString(name string) string {
	i := o.loadOptional(name)
	if i == nil {
		return ""
	}

	a, ok := i.(string)
	if !ok {
		return ""
	}

	return a
}

func (o *optionLoader) loadStringSlice(name string) []string {
	i := o.load(name)
	if i == nil {
		return nil
	}

	a, ok := i.([]string)
	if !ok {
		o.err = newInvalidOptionError(name)
		return nil
	}

	return a
}

func (o *optionLoader) loadClientConfig() *client.Config {
	i := o.load(OptionClientConfig)
	if i == nil {
		return nil
	}

	a, ok := i.(*client.Config)
	if !ok {
		o.err = newInvalidOptionError(OptionClientConfig)
		return nil
	}

	return a
}

func (o *optionLoader) loadApp() app.App {
	i := o.load(OptionApp)
	if i == nil {
		o.err = ErrNotInApp
		return nil
	}

	a, ok := i.(app.App)
	if !ok {
		o.err = newInvalidOptionError(OptionApp)
		return nil
	}

	return a
}

func (o *optionLoader) load(key string) interface{} {
	if o.err != nil {
		return nil
	}

	i, ok := o.m[key]
	if !ok {
		o.err = newMissingOptionError(key)
	}

	return i
}

func (o *optionLoader) loadOptional(key string) interface{} {
	if o.err != nil {
		return nil
	}

	i, ok := o.m[key]
	if !ok {
		return nil
	}

	return i
}

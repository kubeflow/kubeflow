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

package cmd

const (
	// For use in the commands (e.g., diff, apply, delete) that require either an
	// environment or the -f flag.
	flagAPISpec               = "api-spec"
	flagComponent             = "component"
	flagCreate                = "create"
	flagDir                   = "dir"
	flagDryRun                = "dry-run"
	flagEnv                   = "env"
	flagExtVar                = "ext-str"
	flagExtVarFile            = "ext-str-file"
	flagFilename              = "filename"
	flagGcTag                 = "gc-tag"
	flagGracePeriod           = "grace-period"
	flagIndex                 = "index"
	flagJpath                 = "jpath"
	flagModule                = "module"
	flagNamespace             = "namespace"
	flagResolver              = "resolve-images"
	flagResolvFail            = "resolve-images-error"
	flagSkipDefaultRegistries = "skip-default-registries"
	flagSkipGc                = "skip-gc"
	flagTlaVar                = "tla-str"
	flagTlaVarFile            = "tla-str-file"
	flagOutput                = "output"
	flagOverride              = "override"
	flagVerbose               = "verbose"
	flagVersion               = "version"

	shortComponent = "c"
	shortFilename  = "f"
	shortFormat    = "o"
	shortIndex     = "i"
	shortOutput    = "o"
	shortOverride  = "o"
)

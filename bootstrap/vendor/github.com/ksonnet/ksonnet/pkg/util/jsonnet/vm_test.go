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

package jsonnet

import (
	"testing"

	jsonnet "github.com/google/go-jsonnet"
	"github.com/ksonnet/ksonnet/pkg/util/test"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func stubVMOpt() VMOpt {
	return func(vm *VM) {
		vm.makeVMFn = func() *jsonnet.VM { return &jsonnet.VM{} }
	}
}

func stubVMEvalOpt(fn func(*jsonnet.VM, string, string) (string, error)) VMOpt {
	return func(vm *VM) {
		vm.evaluateSnippetFn = fn
	}
}

func TestVM_ExtCode(t *testing.T) {
	vm := NewVM(stubVMOpt())
	vm.ExtCode("key", "value")
	require.Equal(t, "value", vm.extCodes["key"])
}

func TestVM_TLACode(t *testing.T) {
	vm := NewVM(stubVMOpt())
	vm.TLACode("key", "value")
	require.Equal(t, "value", vm.tlaCodes["key"])
}

func TestVM_TLAVar(t *testing.T) {
	vm := NewVM(stubVMOpt())
	vm.TLAVar("key", "value")
	require.Equal(t, "value", vm.tlaVars["key"])
}

func TestVM_EvaluateSnippet(t *testing.T) {

	fn := func(vm *jsonnet.VM, name, snippet string) (string, error) {
		assert.Equal(t, "snippet", name)
		assert.Equal(t, "code", snippet)

		return "evaluated", nil
	}

	vm := NewVM(stubVMOpt(), stubVMEvalOpt(fn))
	vm.TLAVar("key", "value")
	vm.TLACode("key", "value")
	vm.ExtCode("key", "value")

	out, err := vm.EvaluateSnippet("snippet", "code")
	require.NoError(t, err)

	require.Equal(t, "evaluated", out)
}

func TestVM_EvaluateSnippet_memory_importer(t *testing.T) {
	fs := afero.NewMemMapFs()
	test.StageFile(t, fs, "set-map.jsonnet", "/lib/set-map.jsonnet")

	fn := func(vm *jsonnet.VM, name, snippet string) (string, error) {
		assert.Equal(t, "snippet", name)
		assert.Equal(t, "code", snippet)

		return "evaluated", nil
	}

	vm := NewVM(stubVMOpt(), stubVMEvalOpt(fn))
	vm.UseMemoryImporter = true
	vm.Fs = fs
	vm.JPaths = []string{"/lib"}

	vm.TLAVar("key", "value")
	vm.TLACode("key", "value")
	vm.ExtCode("key", "value")

	out, err := vm.EvaluateSnippet("snippet", "code")
	require.NoError(t, err)

	require.Equal(t, "evaluated", out)
}

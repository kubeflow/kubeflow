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
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/go-jsonnet"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"github.com/spf13/afero"
)

type makeVMFn func() *jsonnet.VM
type evaluateSnippetFn func(vm *jsonnet.VM, name, snippet string) (string, error)

// VMOpt is an option for configuring VM.
type VMOpt func(*VM)

// VM is a ksonnet wrapper for the jsonnet VM.
type VM struct {
	// JPaths are jsonnet library paths
	JPaths []string
	// UseMemoryImporter forces the vm to use a memory importer rather than the
	// file import.
	UseMemoryImporter bool
	Fs                afero.Fs

	extCodes map[string]string
	tlaCodes map[string]string
	tlaVars  map[string]string

	makeVMFn          makeVMFn
	evaluateSnippetFn evaluateSnippetFn
}

// NewVM creates an instance of VM.
func NewVM(opts ...VMOpt) *VM {
	vm := &VM{
		JPaths:   make([]string, 0),
		extCodes: make(map[string]string),
		tlaCodes: make(map[string]string),
		tlaVars:  make(map[string]string),

		makeVMFn:          jsonnet.MakeVM,
		evaluateSnippetFn: evaluateSnippet,
	}

	for _, opt := range opts {
		opt(vm)
	}

	return vm
}

// ExtCode sets ExtCode for the jsonnet VM.
func (vm *VM) ExtCode(key, value string) {
	vm.extCodes[key] = value
}

// TLACode sets TLACode for the jsonnet VM.
func (vm *VM) TLACode(key, value string) {
	vm.tlaCodes[key] = value
}

// TLAVar sets TLAVar for the jsonnet VM.
func (vm *VM) TLAVar(key, value string) {
	vm.tlaVars[key] = value
}

func evaluateSnippet(vm *jsonnet.VM, name, snippet string) (string, error) {
	return vm.EvaluateSnippet(name, snippet)
}

// EvaluateSnippet evaluates a jsonnet snippet.
func (vm *VM) EvaluateSnippet(name, snippet string) (string, error) {
	now := time.Now()

	fields := logrus.Fields{
		"jPaths":  strings.Join(vm.JPaths, ", "),
		"name":    name,
		"snippet": snippet,
	}

	jvm := jsonnet.MakeVM()
	jvm.ErrorFormatter.SetMaxStackTraceSize(40)
	importer, err := vm.createImporter()
	if err != nil {
		return "", errors.Wrap(err, "create jsonnet importer")
	}
	jvm.Importer(importer)

	for k, v := range vm.extCodes {
		jvm.ExtCode(k, v)
		key := fmt.Sprintf("extCode#%s", k)
		fields[key] = v
	}

	for k, v := range vm.tlaCodes {
		jvm.TLACode(k, v)
		key := fmt.Sprintf("tlaCode#%s", k)
		fields[key] = v
	}

	for k, v := range vm.tlaVars {
		jvm.TLAVar(k, v)
		key := fmt.Sprintf("tlaVar#%s", k)
		fields[key] = v
	}

	defer func() {
		fields["elapsed"] = time.Since(now)
		logrus.WithFields(fields).Debug("jsonnet evaluate snippet")
	}()

	return vm.evaluateSnippetFn(jvm, name, snippet)
}

func (vm *VM) createImporter() (jsonnet.Importer, error) {
	if !vm.UseMemoryImporter {
		return &jsonnet.FileImporter{
			JPaths: vm.JPaths,
		}, nil
	}

	if vm.Fs == nil {
		return nil, errors.New("unable to use memory importer without fs")
	}

	importer := &jsonnet.MemoryImporter{
		Data: make(map[string]string),
	}

	for _, jPath := range vm.JPaths {
		fis, err := afero.ReadDir(vm.Fs, jPath)
		if err != nil {
			return nil, err
		}

		for _, fi := range fis {
			if fi.IsDir() {
				continue
			}

			s, err := vm.readString(filepath.Join(jPath, fi.Name()))
			if err != nil {
				return nil, err
			}

			importer.Data[fi.Name()] = s
		}
	}

	return importer, nil
}

func (vm *VM) readString(path string) (string, error) {
	var b []byte

	b, err := afero.ReadFile(vm.Fs, path)
	if err != nil {
		return "", err
	}

	return string(b), nil
}

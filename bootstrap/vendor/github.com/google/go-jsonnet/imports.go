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
	"io/ioutil"
	"os"
	"path"
)

// ImportedData represents imported data and where it came from.
type ImportedData struct {
	FoundHere string
	Content   string
}

// An Importer imports data from a path.
type Importer interface {
	Import(codeDir string, importedPath string) (*ImportedData, error)
}

// ImportCacheValue represents a value in an imported-data cache.
type ImportCacheValue struct {
	// nil if we got an error
	data *ImportedData

	// nil if we got an error or have only imported it via importstr
	asCode potentialValue

	// Errors can occur during import, we have to cache these too.
	err error
}

type importCacheKey struct {
	dir          string
	importedPath string
}

type importCacheMap map[importCacheKey]*ImportCacheValue

// ImportCache represents a cache of imported data.
type ImportCache struct {
	cache    importCacheMap
	importer Importer
}

// MakeImportCache creates and ImportCache using an importer.
func MakeImportCache(importer Importer) *ImportCache {
	return &ImportCache{importer: importer, cache: make(importCacheMap)}
}

func (cache *ImportCache) importData(key importCacheKey) *ImportCacheValue {
	if cached, ok := cache.cache[key]; ok {
		return cached
	}
	data, err := cache.importer.Import(key.dir, key.importedPath)
	cached := &ImportCacheValue{
		data: data,
		err:  err,
	}
	cache.cache[key] = cached
	return cached
}

// ImportString imports a string, caches it and then returns it.
func (cache *ImportCache) ImportString(codeDir, importedPath string, e *evaluator) (*valueString, error) {
	cached := cache.importData(importCacheKey{codeDir, importedPath})
	if cached.err != nil {
		return nil, e.Error(cached.err.Error())
	}
	return makeValueString(cached.data.Content), nil
}

func codeToPV(e *evaluator, filename string, code string) potentialValue {
	node, err := snippetToAST(filename, code)
	if err != nil {
		// TODO(sbarzowski) we should wrap (static) error here
		// within a RuntimeError. Because whether we get this error or not
		// actually depends on what happens in Runtime (whether import gets
		// evaluated).
		// The same thinking applies to external variables.
		return makeErrorThunk(err)
	}
	return makeThunk(makeInitialEnv(filename, e.i.baseStd), node)
}

// ImportCode imports code from a path.
func (cache *ImportCache) ImportCode(codeDir, importedPath string, e *evaluator) (value, error) {
	cached := cache.importData(importCacheKey{codeDir, importedPath})
	if cached.err != nil {
		return nil, e.Error(cached.err.Error())
	}
	if cached.asCode == nil {
		// File hasn't been parsed before, update the cache record.
		cached.asCode = codeToPV(e, cached.data.FoundHere, cached.data.Content)
	}
	return e.evaluate(cached.asCode)
}

// Concrete importers
// -------------------------------------

// FileImporter imports data from files.
type FileImporter struct {
	JPaths []string
}

func tryPath(dir, importedPath string) (found bool, content []byte, foundHere string, err error) {
	var absPath string
	if path.IsAbs(importedPath) {
		absPath = importedPath
	} else {
		absPath = path.Join(dir, importedPath)
	}
	content, err = ioutil.ReadFile(absPath)
	if os.IsNotExist(err) {
		return false, nil, "", nil
	}
	return true, content, absPath, err
}

// Import imports a file.
func (importer *FileImporter) Import(dir, importedPath string) (*ImportedData, error) {
	found, content, foundHere, err := tryPath(dir, importedPath)
	if err != nil {
		return nil, err
	}

	for i := len(importer.JPaths) - 1; !found && i >= 0; i-- {
		found, content, foundHere, err = tryPath(importer.JPaths[i], importedPath)
		if err != nil {
			return nil, err
		}
	}

	if !found {
		return nil, fmt.Errorf("couldn't open import %#v: no match locally or in the Jsonnet library paths", importedPath)
	}
	return &ImportedData{Content: string(content), FoundHere: foundHere}, nil
}

// MemoryImporter "imports" data from an in-memory map.
type MemoryImporter struct {
	Data map[string]string
}

// Import imports a map entry.
func (importer *MemoryImporter) Import(dir, importedPath string) (*ImportedData, error) {
	if content, ok := importer.Data[importedPath]; ok {
		return &ImportedData{Content: content, FoundHere: importedPath}, nil
	}
	return nil, fmt.Errorf("import not available %v", importedPath)
}

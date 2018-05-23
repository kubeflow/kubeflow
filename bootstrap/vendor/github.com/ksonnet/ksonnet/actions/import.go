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
	"bytes"
	"os"
	"path/filepath"
	"strings"

	"github.com/ksonnet/ksonnet/component"
	"github.com/ksonnet/ksonnet/metadata/app"
	ksparam "github.com/ksonnet/ksonnet/metadata/params"
	"github.com/ksonnet/ksonnet/prototype"
	"github.com/pkg/errors"
	"github.com/spf13/afero"
)

// RunImport runs `import`
func RunImport(m map[string]interface{}) error {
	i, err := NewImport(m)
	if err != nil {
		return err
	}

	return i.Run()
}

// Import imports files or directories into ksonnet.
type Import struct {
	app    app.App
	module string
	path   string
	cm     component.Manager
}

// NewImport creates an instance of Import. `module` is the name of the component and
// entity is the file or directory to import.
func NewImport(m map[string]interface{}) (*Import, error) {
	ol := newOptionLoader(m)

	i := &Import{
		app:    ol.loadApp(),
		module: ol.loadString(OptionModule),
		path:   ol.loadString(OptionPath),

		cm: component.DefaultManager,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return i, nil
}

// Run runs the import process.
func (i *Import) Run() error {
	if i.path == "" {
		return errors.New("filename is required")
	}
	pathFi, err := i.app.Fs().Stat(i.path)
	if err != nil {
		if os.IsNotExist(err) {
			return errors.Errorf("%s does not exist", i.path)
		}
		return err
	}

	var paths []string
	if pathFi.IsDir() {
		fis, err := afero.ReadDir(i.app.Fs(), i.path)
		if err != nil {
			return err
		}

		for _, fi := range fis {
			path := filepath.Join(i.path, fi.Name())
			paths = append(paths, path)
		}
	} else {
		paths = append(paths, i.path)
	}

	for _, path := range paths {
		if err := i.importFile(path); err != nil {
			return err
		}
	}

	return nil
}

func (i *Import) importFile(fileName string) error {
	var name bytes.Buffer
	if i.module != "" {
		name.WriteString(i.module + "/")
	}

	base := filepath.Base(fileName)
	ext := filepath.Ext(base)

	templateType, err := prototype.ParseTemplateType(strings.TrimPrefix(ext, "."))
	if err != nil {
		return errors.Wrap(err, "parse template type")
	}

	name.WriteString(strings.TrimSuffix(base, ext))

	contents, err := afero.ReadFile(i.app.Fs(), fileName)
	if err != nil {
		return errors.Wrap(err, "read manifest")
	}

	sourcePath := filepath.Clean(name.String())

	params := ksparam.Params{}

	_, err = i.cm.CreateComponent(i.app, sourcePath, string(contents), params, templateType)
	if err != nil {
		return errors.Wrap(err, "create component")
	}

	return nil
}

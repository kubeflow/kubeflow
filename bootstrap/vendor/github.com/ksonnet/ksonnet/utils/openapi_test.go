// Copyright 2017 The kubecfg authors
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

package utils

import (
	"encoding/json"
	"fmt"
	"path"
	"path/filepath"
	"strings"
	"testing"

	swagger "github.com/emicklei/go-restful-swagger12"
	"github.com/spf13/afero"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	utilerrors "k8s.io/apimachinery/pkg/util/errors"
)

type schemaFromFile struct {
	dir string
	fs  afero.Fs
}

func (s schemaFromFile) SwaggerSchema(gv schema.GroupVersion) (*swagger.ApiDeclaration, error) {
	file := path.Join(s.dir, fmt.Sprintf("schema-%s.json", gv))
	data, err := afero.ReadFile(s.fs, file)
	if err != nil {
		return nil, err
	}

	var schema swagger.ApiDeclaration
	if err := json.Unmarshal(data, &schema); err != nil {
		return nil, err
	}

	return &schema, nil
}

func TestValidate(t *testing.T) {
	schemaReader := schemaFromFile{dir: filepath.FromSlash("../testdata"), fs: afero.NewOsFs()}
	s, err := NewSwaggerSchemaFor(schemaReader, schema.GroupVersion{Version: "v1"})
	if err != nil {
		t.Fatalf("Error reading schema: %v", err)
	}

	valid := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "v1",
			"kind":       "Service",
			"spec": map[string]interface{}{
				"ports": []interface{}{
					map[string]interface{}{"port": 80},
				},
			},
		},
	}
	if errs := s.Validate(valid); len(errs) != 0 {
		t.Errorf("schema errors from valid object: %v", errs)
	}

	invalid := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "v1",
			"kind":       "Service",
			"spec": map[string]interface{}{
				"bogus": false,
				"ports": []interface{}{
					map[string]interface{}{"port": "bogus"},
				},
			},
		},
	}
	errs := s.Validate(invalid)
	if len(errs) == 0 {
		t.Error("no schema errors from invalid object :(")
	}
	err = utilerrors.NewAggregate(errs)
	t.Logf("Invalid object produced error: %v", err)
	if !strings.Contains(err.Error(), "expected type int, for field spec.ports[0].port, got string") {
		t.Errorf("Wrong error1 produced from invalid object: %v", err)
	}
	if !strings.Contains(err.Error(), "found invalid field bogus for v1.ServiceSpec") {
		t.Errorf("Wrong error2 produced from invalid object: %v", err)
	}
}

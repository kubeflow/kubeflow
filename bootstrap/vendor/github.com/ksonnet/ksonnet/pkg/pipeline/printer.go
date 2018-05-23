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
	"encoding/json"
	"fmt"
	"io"

	yaml "gopkg.in/yaml.v2"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

// Fprint prints objects to a writer in a format (yaml or json).
func Fprint(out io.Writer, objects []*unstructured.Unstructured, format string) error {
	switch format {
	case "yaml":
		return printYAML(out, objects)
	case "json":
		return printJSON(out, objects)
	default:
		return fmt.Errorf("unknown format: %s", format)
	}
}

func printYAML(out io.Writer, objects []*unstructured.Unstructured) error {
	for _, obj := range objects {
		fmt.Fprintln(out, "---")
		buf, err := yaml.Marshal(obj.Object)
		if err != nil {
			return err
		}
		out.Write(buf)
	}

	return nil
}

func printJSON(out io.Writer, objects []*unstructured.Unstructured) error {
	enc := json.NewEncoder(out)
	enc.SetIndent("", "  ")
	for _, obj := range objects {
		// TODO: this is not valid framing for JSON
		if len(objects) > 1 {
			fmt.Fprintln(out, "---")
		}
		if err := enc.Encode(obj); err != nil {
			return err
		}
	}

	return nil
}

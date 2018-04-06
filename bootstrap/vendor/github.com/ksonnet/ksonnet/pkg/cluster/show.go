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

package cluster

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/pkg/errors"
	yaml "gopkg.in/yaml.v2"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

// ShowConfig is configuration for Show.
type ShowConfig struct {
	App            app.App
	ComponentNames []string
	EnvName        string
	Format         string
	Out            io.Writer
}

// ShowOpts is an option for configuring Show.
type ShowOpts func(*Show)

// Show shows objects.
type Show struct {
	ShowConfig

	// these make it easier to test Show.
	findObjectsFn findObjectsFn
}

// RunShow shows objects for a given configuration.
func RunShow(config ShowConfig, opts ...ShowOpts) error {
	s := &Show{
		ShowConfig:    config,
		findObjectsFn: findObjects,
	}

	for _, opt := range opts {
		opt(s)
	}

	return s.Show()
}

// Show shows objects.
func (s *Show) Show() error {
	apiObjects, err := s.findObjectsFn(s.App, s.EnvName, s.ComponentNames)
	if err != nil {
		return errors.Wrap(err, "find objects")
	}

	switch s.Format {
	case "yaml":
		return s.showYAML(apiObjects)
	case "json":
		return s.showJSON(apiObjects)
	default:
		return fmt.Errorf("Unknown --format: %s", s.Format)
	}
}

func (s *Show) showYAML(apiObjects []*unstructured.Unstructured) error {
	for _, obj := range apiObjects {
		fmt.Fprintln(s.Out, "---")
		// Go via json because we need
		// to trigger the custom scheme
		// encoding.
		buf, err := json.Marshal(obj)
		if err != nil {
			return err
		}
		o := map[string]interface{}{}
		if err = json.Unmarshal(buf, &o); err != nil {
			return err
		}
		buf, err = yaml.Marshal(o)
		if err != nil {
			return err
		}
		s.Out.Write(buf)
	}

	return nil
}

func (s *Show) showJSON(apiObjects []*unstructured.Unstructured) error {
	enc := json.NewEncoder(s.Out)
	enc.SetIndent("", "  ")
	for _, obj := range apiObjects {
		// TODO: this is not valid framing for JSON
		if len(apiObjects) > 1 {
			fmt.Fprintln(s.Out, "---")
		}
		if err := enc.Encode(obj); err != nil {
			return err
		}
	}

	return nil
}

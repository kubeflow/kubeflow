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

package parts

import (
	"fmt"

	"github.com/blang/semver"
	"github.com/ghodss/yaml"
	"github.com/pkg/errors"
)

const (
	DefaultAPIVersion = "0.0.1"
	DefaultKind       = "ksonnet.io/parts"
)

type Spec struct {
	APIVersion string `json:"apiVersion"`
	Kind       string `json:"kind"`

	Prototypes   PrototypeRefSpecs `json:"prototypes"`
	Name         string            `json:"name"`
	Version      string            `json:"version"`
	Description  string            `json:"description"`
	Author       string            `json:"author"`
	Contributors ContributorSpecs  `json:"contributors"`
	Repository   RepositorySpec    `json:"repository"`
	Bugs         *BugSpec          `json:"bugs"`
	Keywords     []string          `json:"keywords"`
	QuickStart   *QuickStartSpec   `json:"quickStart"`
	License      string            `json:"license"`
}

func Unmarshal(bytes []byte) (*Spec, error) {
	schema := Spec{}
	err := yaml.Unmarshal(bytes, &schema)
	if err != nil {
		return nil, err
	}

	if err = schema.validate(); err != nil {
		return nil, err
	}

	return &schema, nil
}

func (s *Spec) Marshal() ([]byte, error) {
	return yaml.Marshal(s)
}

func (s *Spec) validate() error {
	compatVer, _ := semver.Make(DefaultAPIVersion)
	ver, err := semver.Make(s.APIVersion)
	if err != nil {
		return errors.Wrap(err, "Failed to parse version in app spec")
	} else if compatVer.Compare(ver) != 0 {
		return fmt.Errorf(
			"Library '%s' uses unsupported spec version '%s' (this client only supports %s)",
			s.Name,
			s.APIVersion,
			DefaultAPIVersion)
	}

	return nil
}

type ContributorSpec struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type ContributorSpecs []*ContributorSpec

type RepositorySpec struct {
	Type string `json:"type"`
	URL  string `json:"url"`
}

type BugSpec struct {
	URL string `json:"url"`
}

type QuickStartSpec struct {
	Prototype     string            `json:"prototype"`
	ComponentName string            `json:"componentName"`
	Flags         map[string]string `json:"flags"`
	Comment       string            `json:"comment"`
}

type Specs []*Spec

type PrototypeRefSpecs []string

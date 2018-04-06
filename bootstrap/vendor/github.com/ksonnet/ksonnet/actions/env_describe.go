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
	"io"
	"os"

	"github.com/ksonnet/ksonnet/metadata/app"
	yaml "gopkg.in/yaml.v2"
)

// RunEnvDescribe runs `env describe`
// func RunEnvDescribe(ksApp app.App, envName string) error {
func RunEnvDescribe(m map[string]interface{}) error {
	ed, err := NewEnvDescribe(m)
	if err != nil {
		return err
	}

	return ed.Run()
}

// EnvDescribe describes an environment by printing its configuration.
type EnvDescribe struct {
	app     app.App
	envName string
	out     io.Writer
}

// NewEnvDescribe creates an instance of EnvDescribe.
func NewEnvDescribe(m map[string]interface{}) (*EnvDescribe, error) {
	ol := newOptionLoader(m)

	ed := &EnvDescribe{
		app:     ol.loadApp(),
		envName: ol.loadString(OptionEnvName),

		out: os.Stdout,
	}

	if ol.err != nil {
		return nil, ol.err
	}

	return ed, nil
}

// Run runs the EnvDescribe action.
func (ed *EnvDescribe) Run() error {
	env, err := ed.app.Environment(ed.envName)
	if err != nil {
		return err
	}

	env.Name = ed.envName

	b, err := yaml.Marshal(env)
	if err != nil {
		return err
	}

	_, err = ed.out.Write(b)
	return err
}

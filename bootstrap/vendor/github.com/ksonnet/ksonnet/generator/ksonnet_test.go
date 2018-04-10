// Copyright 2018 The kubecfg authors
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

package generator

import (
	"errors"
	"testing"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/ksonnet"
)

func TestKsonnet(t *testing.T) {
	ogEmitter := ksonnetEmitter
	defer func() {
		ksonnetEmitter = ogEmitter
	}()

	var (
		ext            = []byte("k")
		lib            = []byte("k8s")
		successfulEmit = func(string) (*ksonnet.Lib, error) {
			return &ksonnet.Lib{
				Version:    "v1.8.0",
				K8s:        lib,
				Extensions: ext,
			}, nil
		}
		failureEmit = func(string) (*ksonnet.Lib, error) {
			return nil, errors.New("failure")
		}
		v180swagger = []byte(`{"info":{"version":"v1.8.0"}}`)
	)

	cases := []struct {
		name        string
		emitter     func(string) (*ksonnet.Lib, error)
		swaggerData []byte
		version     string
		isErr       bool
	}{
		{
			name:        "valid swagger",
			emitter:     successfulEmit,
			swaggerData: v180swagger,
			version:     "v1.8.0",
		},
		{
			name:        "invalid swagger",
			emitter:     failureEmit,
			swaggerData: []byte(`{`),
			isErr:       true,
		},
		{
			name:        "emitter error",
			emitter:     failureEmit,
			swaggerData: v180swagger,
			isErr:       true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ogKSEmitter := ksonnetEmitter
			defer func() { ksonnetEmitter = ogKSEmitter }()
			ksonnetEmitter = tc.emitter

			kl, err := Ksonnet(tc.swaggerData)

			if tc.isErr {
				if err == nil {
					t.Fatal("Ksonnet() should have returned an error")
				}
			} else {
				if err != nil {
					t.Fatalf("Ksonnet() returned unexpected error: %#v", err)
				}

				if got, expected := string(kl.K), string(ext); got != expected {
					t.Errorf("Ksonnet() K = %s; expected = %s", got, expected)
				}
				if got, expected := string(kl.K8s), string(lib); got != expected {
					t.Errorf("Ksonnet() K8s = %s; expected = %s", got, expected)
				}
				if got, expected := string(kl.Swagger), string(tc.swaggerData); got != expected {
					t.Errorf("Ksonnet() Swagger = %s; expected = %s", got, expected)
				}
				if got, expected := string(kl.Version), tc.version; got != expected {
					t.Errorf("Ksonnet() Version = %s; expected = %s", got, expected)
				}
			}
		})
	}

}

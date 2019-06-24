// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package app

import (
	"reflect"
	"testing"

	"k8s.io/api/storage/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	k8sVersion "k8s.io/apimachinery/pkg/version"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

func TestModifyGcloudCommand(t *testing.T) {
	type TestCase struct {
		Input    clientcmdapi.Config
		Expected clientcmdapi.Config
	}

	cases := []TestCase{
		{
			Input: clientcmdapi.Config{
				AuthInfos: map[string]*clientcmdapi.AuthInfo{
					"some-user": {
						AuthProvider: &clientcmdapi.AuthProviderConfig{
							Name: "gcp",
							Config: map[string]string{
								"cmd-path": "/usr/local/bin/gcloud",
							},
						},
					},
				},
			},
			Expected: clientcmdapi.Config{
				AuthInfos: map[string]*clientcmdapi.AuthInfo{
					"some-user": {
						AuthProvider: &clientcmdapi.AuthProviderConfig{
							Name: "gcp",
							Config: map[string]string{
								"cmd-path": "gcloud",
							},
						},
					},
				},
			},
		},
	}

	for _, c := range cases {
		if err := modifyGcloudCommand(&c.Input); err != nil {
			t.Errorf("ModifyGcloudCommand returned error; %v", err)
		}
		if !reflect.DeepEqual(c.Expected, c.Input) {
			pInput, _ := Pformat(c.Input)
			pExpected, _ := Pformat(c.Expected)
			t.Errorf("ModifyGcloudCommand not correct; got %v; want %v", pInput, pExpected)
		}
	}
}

func TestIsGke(t *testing.T) {
	type TestCase struct {
		Input    k8sVersion.Info
		Expected bool
	}

	cases := []TestCase{
		{
			Input: k8sVersion.Info{
				GitVersion: "1.9.0-gke",
			},
			Expected: true,
		},

		{
			Input: k8sVersion.Info{
				GitVersion: "1.9.0",
			},
			Expected: false,
		},
	}

	for _, c := range cases {
		result := isGke(&c.Input)
		if result != c.Expected {
			t.Errorf("IsGke(%v) not correct; got %v; want %v", c.Input.String(), result, c.Expected)
		}
	}
}

func TestHasDefaultStorageClass(t *testing.T) {
	type TestCase struct {
		Input    v1.StorageClassList
		Expected bool
	}

	cases := []TestCase{
		{
			Input: v1.StorageClassList{
				Items: []v1.StorageClass{
					{
						ObjectMeta: metav1.ObjectMeta{
							Annotations: map[string]string{
								"storageclass.beta.kubernetes.io/is-default-class": "true",
							},
						},
					},
				},
			},
			Expected: true,
		},
		{
			Input: v1.StorageClassList{
				Items: []v1.StorageClass{
					{
						ObjectMeta: metav1.ObjectMeta{
							Annotations: map[string]string{
								"storageclass.beta.kubernetes.io/is-default-class": "false",
							},
						},
					},
				},
			},
			Expected: false,
		},
	}
	for _, c := range cases {
		result := hasDefaultStorage(&c.Input)
		if result != c.Expected {
			pInput, _ := Pformat(c.Input)
			t.Errorf("hasDefaultStorage(%v) not correct; got %+v; want %+v", pInput, result, c.Expected)
		}
	}
}

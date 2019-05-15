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
	"fmt"
	"testing"

	"google.golang.org/api/cloudresourcemanager/v1"
)

func TestGetUpdatedPolicy(t *testing.T) {
	etags := "etagValueNeedPreserve"
	tests := []struct {
		// Name of the test.
		name string

		// Arguments for UpdatePolicy function.
		currentPolicy *cloudresourcemanager.Policy
		iamConf       *IamConf
		req           ApplyIamRequest

		// Check function that checks if the result from UpdatePolicy is valid.
		check func(cloudresourcemanager.Policy) error
	}{
		{
			name: "preserve role 'admin'",
			currentPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					&cloudresourcemanager.Binding{
						Role: "admin",
					},
				},
				Etag: etags,
			},
			iamConf: &IamConf{},
			req:     ApplyIamRequest{},
			check: func(policy cloudresourcemanager.Policy) error {
				if len(policy.Bindings) != 1 {
					return fmt.Errorf("bindings should have only one element")
				}
				if policy.Bindings[0].Role != "admin" {
					return fmt.Errorf("'admin' role wasn't added")
				}
				if policy.Etag != etags {
					return fmt.Errorf("'Etag' role was deleted")
				}
				return nil
			},
		},
		{
			name: "preserve role 'admin' with member 'john'",
			currentPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					&cloudresourcemanager.Binding{
						Role:    "admin",
						Members: []string{"john"},
					},
				},
			},
			iamConf: &IamConf{},
			req:     ApplyIamRequest{},
			check: func(policy cloudresourcemanager.Policy) error {
				if len(policy.Bindings) != 1 {
					return fmt.Errorf("bindings should have only one element")
				}
				if policy.Bindings[0].Role != "admin" {
					return fmt.Errorf("'admin' role wasn't added")
				}
				if len(policy.Bindings[0].Members) != 1 {
					return fmt.Errorf("'admin' role has invalid number of members (%d), tried to add one",
						len(policy.Bindings[0].Members))
				}
				if policy.Bindings[0].Members[0] != "john" {
					return fmt.Errorf("'admin' role has invalid member %q, different than 'john'",
						policy.Bindings[0].Members[0])
				}
				return nil
			},
		},
		{
			name: "add 'service-account' identity for 'admin' role",
			currentPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{},
			},
			iamConf: &IamConf{
				IamBindings: []IamBinding{
					IamBinding{
						Members: []string{"set-kubeflow-user-service-account"},
						Roles:   []string{"admin"},
					},
				},
			},
			req: ApplyIamRequest{
				Cluster: "production",
				Project: "tests",
				Action:  "add",
			},
			check: func(policy cloudresourcemanager.Policy) error {
				if len(policy.Bindings) != 1 {
					return fmt.Errorf("invalid number of returned policies (%d), expected 1",
						len(policy.Bindings))
				}
				binding := policy.Bindings[0]
				if binding.Role != "admin" {
					return fmt.Errorf("added invalid role, got: %q, wanted 'admin'", binding.Role)
				}
				if len(binding.Members) != 1 {
					return fmt.Errorf("added invalid number of members for 'admin'")
				}
				expectedAccount := PrepareAccount(fmt.Sprintf(
					"%v-user@%v.iam.gserviceaccount.com", "production", "tests",
				))
				if binding.Members[0] != expectedAccount {
					return fmt.Errorf("invalid member value, got: %q, wanted: %q",
						binding.Members[0], expectedAccount)
				}
				return nil
			},
		},
		{
			name: "remove 'iap-account' member for 'admin' role",
			currentPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					&cloudresourcemanager.Binding{
						Role:    "admin",
						Members: []string{"user:admin@mail.com"},
					},
				},
			},
			iamConf: &IamConf{
				IamBindings: []IamBinding{
					IamBinding{
						Members: []string{"set-kubeflow-iap-account"},
						Roles:   []string{"admin"},
					},
				},
			},
			req: ApplyIamRequest{
				Email:  "admin@mail.com",
				Action: "remove",
			},
			check: func(policy cloudresourcemanager.Policy) error {
				if len(policy.Bindings) != 1 {
					return fmt.Errorf("invalid number of bindings, expected to preserve 'admin'")
				}
				binding := policy.Bindings[0]
				if binding.Role != "admin" {
					return fmt.Errorf("invalid role for the binding %q, expected to preserve 'admin'",
						binding.Role)
				}
				if len(binding.Members) > 0 {
					return fmt.Errorf("the only existing member wasn't removed")
				}
				return nil
			},
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			UpdatePolicy(test.currentPolicy, test.iamConf, test.req)
			if test.check == nil {
				t.Errorf("no check implemented")
				return
			}
			if err := test.check(*test.currentPolicy); err != nil {
				t.Error(err)
			}
		})
	}
}

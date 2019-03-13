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

package utils

import (
	"fmt"
	"testing"

	"google.golang.org/api/cloudresourcemanager/v1"
)

func Test(t *testing.T) {
	tests := []struct {
		// Name of the test.
		name string

		// Arguments for GetUpdatedPolicy function.
		currentPolicy *cloudresourcemanager.Policy
		// service account policy pending change
		saPolicy      *cloudresourcemanager.Policy

		// Check function that checks if the result from GetUpdatedPolicy is valid.
		check func(*cloudresourcemanager.Policy) error
	}{
		{
			name: "test clear iam policy",
			currentPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					&cloudresourcemanager.Binding{
						Role: "roles/source.admin",
						Members: []string{
							"serviceAccount:kfctl-admin@project.iam.gserviceaccount.com",
							"serviceAccount:kfctl-vm@project.iam.gserviceaccount.com",
							"serviceAccount:should-stay@project.iam.gserviceaccount.com",
						},
					},
					&cloudresourcemanager.Binding{
						Role: "roles/editor",
						Members: []string{
							"user:user1@google.com",
						},
					},
				},
			},
			saPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					&cloudresourcemanager.Binding{
						Role: "roles/source.admin",
						Members: []string{
							"serviceAccount:kfctl-admin@project.iam.gserviceaccount.com",
							"serviceAccount:kfctl-vm@project.iam.gserviceaccount.com",
						},
					},
					&cloudresourcemanager.Binding{
						Role: "roles/iap.httpsResourceAccessor",
						Members: []string{
							"user:user1@google.com",
						},
					},
				},
			},
			check: func(policy *cloudresourcemanager.Policy) error {
				if len(policy.Bindings) != 2 {
					return fmt.Errorf("bindings should have 2 elements")
				}
				if len(policy.Bindings[0].Members) != 1 {
					return fmt.Errorf("'kfctl' service accounts binding wasn't deleted")
				}
				if policy.Bindings[0].Members[0] != "serviceAccount:should-stay@project.iam.gserviceaccount.com" {
					return fmt.Errorf("'should-stay' service accounts binding should not be deleted")
				}
				if policy.Bindings[1].Members[0] != "user:user1@google.com" {
					return fmt.Errorf("'user1@google.com' binding should not be deleted")
				}
				return nil
			},
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			clearedPolicy := GetClearedIamPolicy(test.currentPolicy, test.saPolicy)
			if test.check == nil {
				t.Errorf("no check implemented")
				return
			}
			if err := test.check(clearedPolicy); err != nil {
				t.Error(err)
			}
		})
	}
}

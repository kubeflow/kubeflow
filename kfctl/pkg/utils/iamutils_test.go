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
	"reflect"
	"testing"

	"google.golang.org/api/cloudresourcemanager/v1"
)

func Test(t *testing.T) {
	type TestCase struct {
		// Arguments for GetUpdatedPolicy function.
		currentPolicy *cloudresourcemanager.Policy
		// service account policy pending change
		saPolicy *cloudresourcemanager.Policy

		// Expected output policy
		expectedPolicy *cloudresourcemanager.Policy
	}
	tests := []TestCase{
		{
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
				Etag: "ShouldKeep",
			},
			expectedPolicy: &cloudresourcemanager.Policy{
				Bindings: []*cloudresourcemanager.Binding{
					// 'kfctl' service accounts binding should be deleted
					// 'should-stay' service accounts binding should not be deleted
					&cloudresourcemanager.Binding{
						Role: "roles/source.admin",
						Members: []string{
							"serviceAccount:should-stay@project.iam.gserviceaccount.com",
						},
					},
					// 'user1@google.com' binding should not be deleted
					&cloudresourcemanager.Binding{
						Role: "roles/editor",
						Members: []string{
							"user:user1@google.com",
						},
					},
				},
				Etag: "ShouldKeep",
			},
		},
	}
	for _, test := range tests {
		ClearIamPolicy(test.currentPolicy, "kfctl", "project")
		if !reflect.DeepEqual(test.currentPolicy, test.expectedPolicy) {
			t.Errorf("Expect:\n%v; Output:\n%v", PolicyToString(test.expectedPolicy),
				PolicyToString(test.currentPolicy))
		}
	}
}

func PolicyToString(input *cloudresourcemanager.Policy) string {
	policy, err := input.MarshalJSON()
	if err != nil {
		return fmt.Sprintf("Unable to parse policy: %v", err)
	}
	return string(policy)
}

/*
Copyright 2019 The Kubeflow Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"fmt"
	"github.com/onsi/gomega"
	"google.golang.org/api/iam/v1"
	"reflect"
	"testing"
)

func TestGetProjectID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	instance := &GcpWorkloadIdentity{GcpServiceAccount: "kubeflow@project-id.iam.gserviceaccount.com"}
	projId, _ := instance.GetProjectID()
	g.Expect(projId, "project-id")
}

type TestCase struct {
	// Original iam policy.
	currentPolicy *iam.Policy
	// member pending change
	member string
	// Expected output policy
	expectedPolicy *iam.Policy
}

func IamPolicyToString(input *iam.Policy) string {
	policy, err := input.MarshalJSON()
	if err != nil {
		return fmt.Sprintf("Unable to parse policy: %v", err)
	}
	return string(policy)
}

func TestAddBinding(t *testing.T) {
	tests := []TestCase{
		{
			currentPolicy: &iam.Policy{
				Bindings: []*iam.Binding{
					{
						Role: "roles/iam.workloadIdentityUser",
						Members: []string{
							"serviceAccount:kfctl.svc.id.goog[istio-system/kf-user]",
							"serviceAccount:kfctl.svc.id.goog[kubeflow-user1/default-editor]",
						},
					},
				},
				Etag: "ShouldKeep",
			},
			member: "serviceAccount:kfctl.svc.id.goog[should/add]",
			expectedPolicy: &iam.Policy{
				Bindings: []*iam.Binding{
					{
						Role: "roles/iam.workloadIdentityUser",
						Members: []string{
							"serviceAccount:kfctl.svc.id.goog[istio-system/kf-user]",
							"serviceAccount:kfctl.svc.id.goog[kubeflow-user1/default-editor]",
						},
					},
					{
						Role: "roles/iam.workloadIdentityUser",
						Members: []string{
							"serviceAccount:kfctl.svc.id.goog[should/add]",
						},
					},
				},
				Etag: "ShouldKeep",
			},
		},
	}
	for _, test := range tests {
		addBinding(test.currentPolicy, test.member)
		if !reflect.DeepEqual(test.currentPolicy, test.expectedPolicy) {
			t.Errorf("Expect:\n%v; Output:\n%v", IamPolicyToString(test.expectedPolicy),
				IamPolicyToString(test.currentPolicy))
		}
	}
}

func TestRevokeBinding(t *testing.T) {
	tests := []TestCase{
		{
			currentPolicy: &iam.Policy{
				Bindings: []*iam.Binding{
					{
						Role: "roles/iam.workloadIdentityUser",
						Members: []string{
							"serviceAccount:kfctl.svc.id.goog[istio-system/kf-user]",
							"serviceAccount:kfctl.svc.id.goog[kubeflow-user1/default-editor]",
							"serviceAccount:kfctl.svc.id.goog[should/remove]",
						},
					},
				},
				Etag: "ShouldKeep",
			},
			member: "serviceAccount:kfctl.svc.id.goog[should/remove]",
			expectedPolicy: &iam.Policy{
				Bindings: []*iam.Binding{
					{
						Role: "roles/iam.workloadIdentityUser",
						Members: []string{
							"serviceAccount:kfctl.svc.id.goog[istio-system/kf-user]",
							"serviceAccount:kfctl.svc.id.goog[kubeflow-user1/default-editor]",
						},
					},
				},
				Etag: "ShouldKeep",
			},
		},
	}
	for _, test := range tests {
		revokeBinding(test.currentPolicy, test.member)
		if !reflect.DeepEqual(test.currentPolicy, test.expectedPolicy) {
			t.Errorf("Expect:\n%v; Output:\n%v", IamPolicyToString(test.expectedPolicy),
				IamPolicyToString(test.currentPolicy))
		}
	}
}

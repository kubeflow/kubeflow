/*
Copyright The Kubeflow Authors.

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

package utils

import (
	"fmt"
	"github.com/deckarep/golang-set"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	"golang.org/x/net/context"
	"google.golang.org/api/cloudresourcemanager/v1"
	"io/ioutil"
	"net/http"
)

func transformSliceToInterface(slice []string) []interface{} {
	ret := make([]interface{}, len(slice))
	for i, m := range slice {
		ret[i] = m
	}
	return ret
}

func transformInterfaceToSlice(inter []interface{}) []string {
	ret := make([]string, len(inter))
	for i, m := range inter {
		ret[i] = m.(string)
	}
	return ret
}

// Gets IAM plicy from GCP for the whole project.
func GetIamPolicy(project string, gcpClient *http.Client) (*cloudresourcemanager.Policy, error) {
	ctx := context.Background()
	service, serviceErr := cloudresourcemanager.New(gcpClient)
	if serviceErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: serviceErr.Error(),
		}
	}
	req := &cloudresourcemanager.GetIamPolicyRequest{}
	if policy, err := service.Projects.GetIamPolicy(project, req).Context(ctx).Do(); err == nil {
		return policy, nil
	} else {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}
}

// Modify currentPolicy: Remove existing bindings associated with service accounts of current deployment
func ClearIamPolicy(currentPolicy *cloudresourcemanager.Policy, deployName string, project string) {
	serviceAccounts := map[string]bool{
		fmt.Sprintf("serviceAccount:%v-admin@%v.iam.gserviceaccount.com", deployName, project): true,
		fmt.Sprintf("serviceAccount:%v-user@%v.iam.gserviceaccount.com", deployName, project):  true,
		fmt.Sprintf("serviceAccount:%v-vm@%v.iam.gserviceaccount.com", deployName, project):    true,
	}
	var newBindings []*cloudresourcemanager.Binding
	for _, binding := range currentPolicy.Bindings {
		newBinding := cloudresourcemanager.Binding{
			Role: binding.Role,
		}
		for _, member := range binding.Members {
			// Skip bindings for service accounts of current deployment.
			// We'll reset bindings for them in following steps.
			if _, ok := serviceAccounts[member]; !ok {
				newBinding.Members = append(newBinding.Members, member)
			}
		}
		newBindings = append(newBindings, &newBinding)
	}
	currentPolicy.Bindings = newBindings
}

// TODO: Move type definitions to appropriate place.
type Members []string
type Roles []string

type Bindings struct {
	Members Members
	Roles   Roles
}

type IamBindingsYAML struct {
	Bindings []Bindings
}

// Reads IAM bindings file in YAML format.
func ReadIamBindingsYAML(filename string) (*cloudresourcemanager.Policy, error) {
	buf, bufErr := ioutil.ReadFile(filename)
	if bufErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: bufErr.Error(),
		}
	}

	iam := IamBindingsYAML{}
	if err := yaml.Unmarshal(buf, &iam); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}

	entries := make(map[string]mapset.Set)
	for _, binding := range iam.Bindings {
		membersSet := mapset.NewSetFromSlice(transformSliceToInterface(binding.Members))
		for _, role := range binding.Roles {
			if m, ok := entries[role]; ok {
				m.Union(membersSet)
			} else {
				entries[role] = membersSet
			}
		}
	}

	policy := &cloudresourcemanager.Policy{}
	for role, members := range entries {
		policy.Bindings = append(policy.Bindings, &cloudresourcemanager.Binding{
			Role:    role,
			Members: transformInterfaceToSlice(members.ToSlice()),
		})
	}

	return policy, nil
}

// Either patch or remove role bindings from `src` policy.
func RewriteIamPolicy(currentPolicy *cloudresourcemanager.Policy, adding *cloudresourcemanager.Policy) {
	policyMap := map[string]map[string]bool{}
	for _, binding := range currentPolicy.Bindings {
		policyMap[binding.Role] = make(map[string]bool)
		for _, member := range binding.Members {
			policyMap[binding.Role][member] = true
		}
	}

	for _, binding := range adding.Bindings {
		for _, member := range binding.Members {
			if _, ok := policyMap[binding.Role]; !ok {
				policyMap[binding.Role] = make(map[string]bool)
			}
			policyMap[binding.Role][member] = true
		}
	}
	var newBindings []*cloudresourcemanager.Binding
	for role, memberSet := range policyMap {
		binding := cloudresourcemanager.Binding{}
		binding.Role = role
		for member, exists := range memberSet {
			if exists {
				binding.Members = append(binding.Members, member)
			}
		}
		newBindings = append(newBindings, &binding)
	}
	currentPolicy.Bindings = newBindings
}

// "Override" project's IAM policy with given config.
func SetIamPolicy(project string, policy *cloudresourcemanager.Policy, gcpClient *http.Client) error {
	ctx := context.Background()
	service, serviceErr := cloudresourcemanager.New(gcpClient)
	if serviceErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: serviceErr.Error(),
		}
	}

	req := &cloudresourcemanager.SetIamPolicyRequest{
		Policy: policy,
	}
	_, err := service.Projects.SetIamPolicy(project, req).Context(ctx).Do()
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}
}

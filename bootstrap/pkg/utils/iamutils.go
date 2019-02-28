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
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/cloudresourcemanager/v1"
	"io/ioutil"
	"net/http"
)

func getServiceClient(ctx context.Context) (*http.Client, error) {
	client, err := google.DefaultClient(ctx, cloudresourcemanager.CloudPlatformScope)
	if err != nil {
		log.Fatalf("Could not get authenticated client: %v", err)
		return nil, err
	}
	return client, nil
}

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

func getBindingSet(policy *cloudresourcemanager.Policy) map[string]mapset.Set {
	bindings := make(map[string]mapset.Set)
	for _, binding := range policy.Bindings {
		val := transformSliceToInterface(binding.Members)
		if set, ok := bindings[binding.Role]; ok {
			set.Union(mapset.NewSetFromSlice(val))
		} else {
			bindings[binding.Role] = mapset.NewSetFromSlice(val)
		}
	}
	return bindings
}

// Gets IAM plicy from GCP for the whole project.
func GetIamPolicy(project string) (*cloudresourcemanager.Policy, error) {
	ctx := context.Background()
	client, clientErr := getServiceClient(ctx)
	if clientErr != nil {
		return nil, clientErr
	}
	service, serviceErr := cloudresourcemanager.New(client)
	if serviceErr != nil {
		return nil, serviceErr
	}

	req := &cloudresourcemanager.GetIamPolicyRequest{}
	return service.Projects.GetIamPolicy(project, req).Context(ctx).Do()
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
		return nil, bufErr
	}

	iam := IamBindingsYAML{}
	if err := yaml.Unmarshal(buf, &iam); err != nil {
		return nil, err
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
func RewriteIamPolicy(src *cloudresourcemanager.Policy,
	adding *cloudresourcemanager.Policy,
	deleting *cloudresourcemanager.Policy) error {
	if src == nil {
		return fmt.Errorf("Source IAM policy is nil.")
	}
	curr := getBindingSet(src)
	if adding != nil {
		patch := getBindingSet(adding)
		for role, members := range patch {
			log.Infof("%v adding: %+v", role, members)
			if m, ok := curr[role]; ok {
				m.Union(members)
			} else {
				curr[role] = members
			}
		}
	}
	if deleting != nil {
		removal := getBindingSet(deleting)
		for role, members := range removal {
			if m, ok := curr[role]; ok {
				m.Difference(members)
			}
		}
	}

	return nil
}

// "Override" project's IAM policy with given config.
func SetIamPolicy(project string, policy *cloudresourcemanager.Policy) error {
	ctx := context.Background()
	client, clientErr := getServiceClient(ctx)
	if clientErr != nil {
		return clientErr
	}
	service, serviceErr := cloudresourcemanager.New(client)
	if serviceErr != nil {
		return serviceErr
	}

	req := &cloudresourcemanager.SetIamPolicyRequest{
		Policy: policy,
	}
	_, err := service.Projects.SetIamPolicy(project, req).Context(ctx).Do()
	return err
}

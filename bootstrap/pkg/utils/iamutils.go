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

func GetServiceClient(ctx context.Context) (*http.Client, error) {
	client, err := google.DefaultClient(ctx, cloudresourcemanager.CloudPlatformScope)
	if err != nil {
		log.Fatalf("Could not get authenticated client: %v", err)
		return nil, err
	}
	return client, nil
}

func TransformSliceToInterface(slice []string) []interface{} {
	ret := make([]interface{}, len(slice))
	for i, m := range slice {
		ret[i] = m
	}
	return ret
}

func TransformInterfaceToSlice(inter []interface{}) []string {
	ret := make([]string, len(inter))
	for i, m := range inter {
		ret[i] = m.(string)
	}
	return ret
}

func GetBindingSet(policy *cloudresourcemanager.Policy) map[string]mapset.Set {
	bindings := make(map[string]mapset.Set)
	for _, binding := range policy.Bindings {
		val := TransformSliceToInterface(binding.Members)
		if set, ok := bindings[binding.Role]; ok {
			set.Union(mapset.NewSetFromSlice(val))
		} else {
			bindings[binding.Role] = mapset.NewSetFromSlice(val)
		}
	}
	return bindings
}

func GetIamPolicy(project string) (*cloudresourcemanager.Policy, error) {
	ctx := context.Background()
	client, clientErr := GetServiceClient(ctx)
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

type Members []string
type Roles []string

type Bindings struct {
	Members Members
	Roles   Roles
}

type IamBindingsYAML struct {
	Bindings []Bindings
}

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
		membersSet := mapset.NewSetFromSlice(TransformSliceToInterface(binding.Members))
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
			Members: TransformInterfaceToSlice(members.ToSlice()),
		})
	}

	return policy, nil
}

func UpdateIamPolicy(src *cloudresourcemanager.Policy,
	adding *cloudresourcemanager.Policy,
	deleting *cloudresourcemanager.Policy) error {
	if src == nil {
		return fmt.Errorf("Source IAM policy is nil.")
	}
	curr := GetBindingSet(src)
	if adding != nil {
		patch := GetBindingSet(adding)
		for role, members := range patch {
			if m, ok := curr[role]; ok {
				m.Union(members)
			} else {
				curr[role] = members
			}
		}
	}
	if deleting != nil {
		removal := GetBindingSet(deleting)
		for role, members := range removal {
			if m, ok := curr[role]; ok {
				m.Difference(members)
			}
		}
	}

	return nil
}

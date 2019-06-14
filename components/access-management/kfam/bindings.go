// Copyright 2019 The Kubeflow Authors
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

package kfam

import (
	"fmt"
	"net/url"
	"regexp"
	"strings"

	istiorbac "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/istiorbac/v1alpha1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
)

const ServiceRoleBinding = "servicerolebindings"
const SERVICEROLEISTIO = "ns-access-istio"
const USER = "user"
const ROLE = "role"

type BindingInterface interface {
	Create(binding *Binding, userIdHeader string, userIdPrefix string) error
	Delete(binding *Binding) error
	List(user string, namespaces []string, role string) (*BindingEntries, error)
}

type BindingClient struct {
	restClient rest.Interface
	kubeClient *clientset.Clientset
}

//getBindingName returns bindingName, which is combination of user kind, username, RoleRef kind, RoleRef name.
func getBindingName(binding *Binding) (string, error) {
	nameRaw := strings.ToLower(
		strings.Join([]string{
			binding.User.Kind,
			url.QueryEscape(binding.User.Name),
			binding.RoleRef.Kind,
			binding.RoleRef.Name,
		},"-"),
	)
	// Only keep lower case letters, replace other with -
	reg, err := regexp.Compile("[^a-z]+")
	if err != nil {
		return "", err
	}
	return reg.ReplaceAllString(nameRaw, "-"), nil
}

func (c *BindingClient) Create(binding *Binding, userIdHeader string, userIdPrefix string) error {
	// TODO: permission check before go ahead
	bindingName, err := getBindingName(binding)
	if err != nil {
		return err
	}
	roleBinding := rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: binding.User.Name, ROLE: binding.RoleRef.Name},
			Name: bindingName,
		},
		RoleRef: *binding.RoleRef,
		Subjects: []rbacv1.Subject{
			*binding.User,
		},
	}
	_, err = c.kubeClient.RbacV1().RoleBindings(binding.ReferredNamespace).Create(&roleBinding)
	if err != nil {
		return err
	}

	// create istio service role binding
	istioServiceRoleBinding := &istiorbac.ServiceRoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: binding.User.Name, ROLE: binding.RoleRef.Name},
			Name:      bindingName,
			Namespace: binding.ReferredNamespace,
		},
		Spec: istiorbac.ServiceRoleBindingSpec{
			Subjects: []*istiorbac.Subject{
				{
					Properties: map[string]string{fmt.Sprintf("request.headers[%v]", userIdHeader): userIdPrefix + binding.User.Name},
				},
			},
			RoleRef: &istiorbac.RoleRef{
				Kind: "ServiceRole",
				Name: SERVICEROLEISTIO,
			},
		},
	}
	result := istiorbac.ServiceRoleBinding{}
	return c.restClient.
		Post().
		Namespace(binding.ReferredNamespace).
		Resource(ServiceRoleBinding).
		Body(istioServiceRoleBinding).
		Do().
		Into(&result)
}

func (c *BindingClient) Delete(binding *Binding) error {
	// TODO: permission check before go ahead
	// First check existence
	bindingName, err := getBindingName(binding)
	if err != nil {
		return err
	}
	_, err = c.kubeClient.RbacV1().RoleBindings(binding.ReferredNamespace).Get(bindingName, metav1.GetOptions{})
	if err != nil {
		return err
	}
	result := istiorbac.ServiceRoleBinding{}
	err = c.restClient.
		Get().
		Namespace(binding.ReferredNamespace).
		Resource(ServiceRoleBinding).
		Name(bindingName).
		VersionedParams(&metav1.GetOptions{}, scheme.ParameterCodec).
		Do().
		Into(&result)
	if err != nil {
		return err
	}
	// Delete if exists
	err = c.kubeClient.RbacV1().RoleBindings(binding.ReferredNamespace).Delete(bindingName, &metav1.DeleteOptions{})
	if err != nil {
		return err
	}
	return c.restClient.
		Delete().
		Namespace(binding.ReferredNamespace).
		Resource(ServiceRoleBinding).
		Name(bindingName).
		Body(&metav1.DeleteOptions{}).
		Do().
		Error()
}

func (c *BindingClient) List(user string, namespaces []string, role string) (*BindingEntries, error) {
	bindings := []Binding{}
	for _, ns := range namespaces {
		roleBindingList, err := c.kubeClient.RbacV1().RoleBindings(ns).List(metav1.ListOptions{})
		if err != nil {
			return nil, err
		}
		for _, roleBinding := range roleBindingList.Items {
			userVal, ok := roleBinding.Annotations[USER]
			if !ok {
				continue
			}
			if user != "" && user != userVal {
				continue
			}
			roleVal, ok := roleBinding.Annotations[ROLE]
			if !ok {
				continue
			}
			if role != "" && role != roleVal {
				continue
			}
			if len(roleBinding.Subjects) != 1 {
				return nil, fmt.Errorf("binding subject length not equal to 1, actual length: %v",
					len(roleBinding.Subjects))
			}
			binding := Binding{
				User:
					&rbacv1.Subject{
						Kind: roleBinding.Subjects[0].Kind,
						Name: roleBinding.Subjects[0].Name,

					},
				ReferredNamespace: 	ns,
				RoleRef:
					&rbacv1.RoleRef{
						Kind: roleBinding.RoleRef.Kind,
						Name: roleBinding.RoleRef.Name,
					},
			}
			bindings = append(bindings, binding)
		}
	}
	return &BindingEntries{
		Bindings: bindings,
	}, nil
}

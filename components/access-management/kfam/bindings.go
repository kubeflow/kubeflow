package kfam

import (
	"fmt"
	"net/url"
	"strings"

	istiorbac "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/istiorbac/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	//"k8s.io/client-go/kubernetes/scheme"
	clientset "k8s.io/client-go/kubernetes"
	rbacv1 "k8s.io/api/rbac/v1"
	"k8s.io/client-go/rest"
)

const ServiceRoleBinding = "servicerolebindings"
const SERVICEROLEISTIO = "ns-access-istio"

type BindingInterface interface {
	Create(binding *Binding) error
	//Delete(name string, opts *metav1.DeleteOptions) error
	//List(binding *Binding, opts metav1.ListOptions) (*BindingList, error)
}

type BindingClient struct {
	restClient rest.Interface
	kubeClient *clientset.Clientset
	userIdHeader string
	userIdPrefix string
}

func (c *BindingClient) Create(binding *Binding) error {
	// TODO: permission check before go ahead
	//bindingName is combination of username and role name.
	bindingName := strings.Join([]string{binding.RoleRef.Name, url.QueryEscape(binding.User.Name)},"-")

	roleBinding := rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name: bindingName,
		},
		RoleRef: *binding.RoleRef,
		Subjects: []rbacv1.Subject{
			*binding.User,
		},
	}
	_, err := c.kubeClient.RbacV1().RoleBindings(binding.ReferredNamespace).Create(&roleBinding)
	if err != nil {
		return err
	}

	// create istio service role binding
	istioServiceRoleBinding := &istiorbac.ServiceRoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name:      bindingName,
			Namespace: binding.ReferredNamespace,
		},
		Spec: istiorbac.ServiceRoleBindingSpec{
			Subjects: []*istiorbac.Subject{
				{
					Properties: map[string]string{fmt.Sprintf("request.headers[%v]", c.userIdHeader): c.userIdPrefix + binding.User.Name},
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

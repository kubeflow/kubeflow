package kfam

import (
	"github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/kubeflow/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
)

type ProfileInterface interface {
	Create(profile *v1alpha1.Profile) (*v1alpha1.Profile, error)
	Delete(name string, opts *metav1.DeleteOptions) error
	Get(name string, opts metav1.GetOptions) (*v1alpha1.Profile, error)
	List(opts metav1.ListOptions) (*v1alpha1.ProfileList, error)
	Update(profile *v1alpha1.Profile) (*v1alpha1.Profile, error)
}

type ProfileClient struct {
	restClient rest.Interface
}

const Profiles = "profiles"

func (c *ProfileClient) Create(profile *v1alpha1.Profile) (*v1alpha1.Profile, error) {
	result := v1alpha1.Profile{}
	err := c.restClient.
		Post().
		Resource(Profiles).
		Body(profile).
		Do().
		Into(&result)

	return &result, err
}

func (c *ProfileClient) Delete(name string, opts *metav1.DeleteOptions) error {
	return c.restClient.
		Delete().
		Resource(Profiles).
		Name(name).
		Body(opts).
		Do().
		Error()
}

func (c *ProfileClient) Get(name string, opts metav1.GetOptions) (*v1alpha1.Profile, error) {
	result := v1alpha1.Profile{}
	err := c.restClient.
		Get().
		Resource(Profiles).
		Name(name).
		VersionedParams(&opts, scheme.ParameterCodec).
		Do().
		Into(&result)

	return &result, err
}

func (c *ProfileClient) List(opts metav1.ListOptions) (*v1alpha1.ProfileList, error) {
	result := v1alpha1.ProfileList{}
	err := c.restClient.
		Get().
		Resource(Profiles).
		VersionedParams(&opts, scheme.ParameterCodec).
		Do().
		Into(&result)

	return &result, err
}

func (c *ProfileClient) Update(profile *v1alpha1.Profile) (*v1alpha1.Profile, error) {
	result := v1alpha1.Profile{}
	err := c.restClient.
		Put().
		Resource(Profiles).
		Body(profile).
		Do().
		Into(&result)

	return &result, err
}

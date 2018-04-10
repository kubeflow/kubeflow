// Copyright 2018 The ksonnet authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package cluster

import (
	"github.com/ksonnet/ksonnet/utils"
	"github.com/pkg/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"

	// client go auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/azure"
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
	_ "k8s.io/client-go/plugin/pkg/client/auth/openstack"
)

// ResourceClient is a wrapper for a resource client.
type ResourceClient interface {
	Create() (*unstructured.Unstructured, error)
	Delete(options *metav1.DeleteOptions) error
	Get(options metav1.GetOptions) (*unstructured.Unstructured, error)
	Patch(pt types.PatchType, data []byte) (*unstructured.Unstructured, error)
}

type clientOpts struct {
	clientPool dynamic.ClientPool
	discovery  discovery.DiscoveryInterface
	namespace  string
}

type resourceClientOpt func(*resourceClient)

type resourceClient struct {
	object *unstructured.Unstructured
	opts   clientOpts
	c      dynamic.ResourceInterface
}

var _ ResourceClient = (*resourceClient)(nil)

func newResourceClient(opts clientOpts, object runtime.Object, rcOpts ...resourceClientOpt) (*resourceClient, error) {
	o, ok := object.(*unstructured.Unstructured)
	if !ok {
		return nil, errors.Errorf("unsupported runtime object type %T", object)
	}

	rc := &resourceClient{
		object: o,
		opts:   opts,
	}

	for _, opt := range rcOpts {
		opt(rc)
	}

	if rc.c == nil {
		c, err := utils.ClientForResource(opts.clientPool, opts.discovery, object, opts.namespace)
		if err != nil {
			return nil, err
		}

		rc.c = c
	}

	return rc, nil
}

func resourceClientFactory(opts clientOpts, object runtime.Object) (ResourceClient, error) {
	return newResourceClient(opts, object)
}

func (c *resourceClient) Create() (*unstructured.Unstructured, error) {
	return c.c.Create(c.object)
}

func (c *resourceClient) Delete(options *metav1.DeleteOptions) error {
	name := c.object.GetName()
	return c.c.Delete(name, options)
}

func (c *resourceClient) Get(options metav1.GetOptions) (*unstructured.Unstructured, error) {
	name := c.object.GetName()
	return c.c.Get(name, options)
}

func (c *resourceClient) Patch(pt types.PatchType, data []byte) (*unstructured.Unstructured, error) {
	name := c.object.GetName()
	return c.c.Patch(name, pt, data)
}

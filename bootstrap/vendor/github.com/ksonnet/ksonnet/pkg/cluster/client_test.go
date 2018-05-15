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
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/watch"
)

func Test_newResourceClient(t *testing.T) {
	aOpts := clientOpts{}
	aObject := &unstructured.Unstructured{}

	mockDI := &mockDynamicInterface{}

	mockClientOpt := func(rc *resourceClient) {
		rc.c = mockDI
	}

	_, err := newResourceClient(aOpts, aObject, mockClientOpt)
	require.NoError(t, err)
}

func Test_resourceClient_Create(t *testing.T) {
	withMockResourceClient(t, func(rc *resourceClient, di *mockDynamicInterface, obj *unstructured.Unstructured) {
		di.createFn = func(in *unstructured.Unstructured) (*unstructured.Unstructured, error) {
			assert.EqualValues(t, obj, in)
			return in, nil
		}

		_, err := rc.Create()
		require.NoError(t, err)
	})
}

func Test_resourceClient_Delete(t *testing.T) {
	withMockResourceClient(t, func(rc *resourceClient, di *mockDynamicInterface, obj *unstructured.Unstructured) {
		options := &metav1.DeleteOptions{}

		di.deleteFn = func(name string, opts *metav1.DeleteOptions) error {
			assert.Equal(t, "anObject", name)
			assert.Equal(t, options, opts)
			return nil
		}

		err := rc.Delete(options)
		require.NoError(t, err)
	})
}

func Test_resourceClient_Get(t *testing.T) {
	withMockResourceClient(t, func(rc *resourceClient, di *mockDynamicInterface, obj *unstructured.Unstructured) {
		options := metav1.GetOptions{}

		di.getFn = func(name string, opts metav1.GetOptions) (*unstructured.Unstructured, error) {
			assert.Equal(t, "anObject", name)
			assert.Equal(t, options, opts)
			return obj, nil
		}

		_, err := rc.Get(options)
		require.NoError(t, err)
	})
}

func Test_resourceClient_Patch(t *testing.T) {
	withMockResourceClient(t, func(rc *resourceClient, di *mockDynamicInterface, obj *unstructured.Unstructured) {
		aPt := types.MergePatchType
		aData := []byte("data")

		di.patchFn = func(name string, pt types.PatchType, data []byte) (*unstructured.Unstructured, error) {
			assert.Equal(t, "anObject", name)
			assert.Equal(t, aPt, pt)
			assert.Equal(t, aData, data)
			return obj, nil
		}

		_, err := rc.Patch(aPt, aData)
		require.NoError(t, err)
	})
}

func withMockResourceClient(t *testing.T, fn func(rc *resourceClient, di *mockDynamicInterface, ob *unstructured.Unstructured)) {
	aOpts := clientOpts{}
	aObject := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"metadata": map[string]interface{}{
				"name": "anObject",
			},
		},
	}

	mockDI := &mockDynamicInterface{}

	mockClientOpt := func(rc *resourceClient) {
		rc.c = mockDI
	}

	rc, err := newResourceClient(aOpts, aObject, mockClientOpt)
	require.NoError(t, err)

	fn(rc, mockDI, aObject)
}

type mockDynamicInterface struct {
	listFn             func(opts metav1.ListOptions) (runtime.Object, error)
	getFn              func(name string, opts metav1.GetOptions) (*unstructured.Unstructured, error)
	deleteFn           func(name string, opts *metav1.DeleteOptions) error
	deleteCollectionFn func(deleteOptions *metav1.DeleteOptions, listOptions metav1.ListOptions) error
	createFn           func(obj *unstructured.Unstructured) (*unstructured.Unstructured, error)
	updateFn           func(obj *unstructured.Unstructured) (*unstructured.Unstructured, error)
	watchFn            func(opts metav1.ListOptions) (watch.Interface, error)
	patchFn            func(name string, pt types.PatchType, data []byte) (*unstructured.Unstructured, error)
}

func (d *mockDynamicInterface) List(opts metav1.ListOptions) (runtime.Object, error) {
	return d.listFn(opts)
}

func (d *mockDynamicInterface) Get(name string, opts metav1.GetOptions) (*unstructured.Unstructured, error) {
	return d.getFn(name, opts)
}

func (d *mockDynamicInterface) Delete(name string, opts *metav1.DeleteOptions) error {
	return d.deleteFn(name, opts)
}

func (d *mockDynamicInterface) DeleteCollection(deleteOptions *metav1.DeleteOptions, listOptions metav1.ListOptions) error {
	return d.deleteCollectionFn(deleteOptions, listOptions)
}

func (d *mockDynamicInterface) Create(obj *unstructured.Unstructured) (*unstructured.Unstructured, error) {
	return d.createFn(obj)
}

func (d *mockDynamicInterface) Update(obj *unstructured.Unstructured) (*unstructured.Unstructured, error) {
	return d.updateFn(obj)
}

func (d *mockDynamicInterface) Watch(opts metav1.ListOptions) (watch.Interface, error) {
	return d.watchFn(opts)
}

func (d *mockDynamicInterface) Patch(name string, pt types.PatchType, data []byte) (*unstructured.Unstructured, error) {
	return d.patchFn(name, pt, data)
}

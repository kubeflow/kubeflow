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

package actions

import (
	"testing"

	swagger "github.com/emicklei/go-restful-swagger12"
	"github.com/googleapis/gnostic/OpenAPIv2"
	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	"k8s.io/client-go/discovery"
	restclient "k8s.io/client-go/rest"
)

func TestValidate(t *testing.T) {
	withApp(t, func(appMock *amocks.App) {
		aEnvName := "default"
		aComponentNames := make([]string, 0)
		aModuleName := "module"
		aClientConfig := &client.Config{}

		env := &app.EnvironmentSpec{}
		appMock.On("Environment", aEnvName).Return(env, nil)

		in := map[string]interface{}{
			OptionApp:            appMock,
			OptionEnvName:        aEnvName,
			OptionModule:         aModuleName,
			OptionComponentNames: aComponentNames,
			OptionClientConfig:   aClientConfig,
		}

		a, err := NewValidate(in)
		require.NoError(t, err)

		a.discoveryFn = func(a app.App, clientConfig *client.Config, envName string) (discovery.DiscoveryInterface, error) {
			assert.Equal(t, aEnvName, envName)
			return &stubDiscovery{}, nil
		}

		objects := []*unstructured.Unstructured{
			{},
		}
		a.findObjectsFn = func(a app.App, envName string, componentNames []string) ([]*unstructured.Unstructured, error) {
			assert.Equal(t, "default", envName)
			assert.Equal(t, aComponentNames, componentNames)

			return objects, nil
		}

		a.validateObjectFn = func(d discovery.DiscoveryInterface, obj *unstructured.Unstructured) []error {
			return make([]error, 0)
		}

		err = a.Run()
		require.NoError(t, err)
	})
}

type stubDiscovery struct{}

func (d *stubDiscovery) RESTClient() restclient.Interface {
	return nil
}

func (d *stubDiscovery) ServerGroups() (*metav1.APIGroupList, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) ServerResourcesForGroupVersion(groupVersion string) (*metav1.APIResourceList, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) ServerResources() ([]*metav1.APIResourceList, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) ServerPreferredResources() ([]*metav1.APIResourceList, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) ServerPreferredNamespacedResources() ([]*metav1.APIResourceList, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) ServerVersion() (*version.Info, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) SwaggerSchema(version schema.GroupVersion) (*swagger.ApiDeclaration, error) {
	return nil, errors.New("not implemented")
}

func (d *stubDiscovery) OpenAPISchema() (*openapi_v2.Document, error) {
	return nil, errors.New("not implemented")
}

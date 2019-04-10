/*
Copyright (c) 2016-2017 Bitnami
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
	"bytes"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer"
	k8stypes "k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/discovery/cached"
	"k8s.io/client-go/dynamic"
	"strings"
	"sync"

	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	"time"

	// Auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
)

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

const (
	yamlSeparator   = "---"
	maxRetries      = 5
	backoffInterval = 5 * time.Second
)

func getRESTClient(config *rest.Config, group string, version string) (*rest.RESTClient, error) {
	c := rest.CopyConfig(config)
	c.GroupVersion = &schema.GroupVersion{
		Group:   group,
		Version: version,
	}
	c.NegotiatedSerializer = serializer.DirectCodecFactory{CodecFactory: scheme.Codecs}
	if group == "" {
		c.APIPath = "/api"
	} else {
		c.APIPath = "/apis"
	}
	return rest.RESTClientFor(c)
}

// TODO: Might need to return response if needed.
func getResource(mapping *meta.RESTMapping, config *rest.Config, group string,
	version string, namespace string, name string) error {
	restClient, err := getRESTClient(config, group, version)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("getResource error: %v", err),
		}
	}

	if _, err = restClient.
		Get().
		Resource(mapping.Resource).
		NamespaceIfScoped(namespace, mapping.Scope.Name() == "namespace").
		Name(name).
		Do().
		Get(); err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("getResource error: %v", err),
		}
	}
}

// TODO(#2391): kubectl is hard to be used as library - it's deeply integrated with
// Cobra. Currently using RESTClient with `kubectl create` has some issues with YAML
// generated with `ks show`.
func patchResource(mapping *meta.RESTMapping, config *rest.Config, group string,
	version string, namespace string, data []byte) error {
	restClient, err := getRESTClient(config, group, version)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("patchResource error: %v", err),
		}
	}

	if _, err = restClient.
		Patch(k8stypes.JSONPatchType).
		Resource(mapping.Resource).
		NamespaceIfScoped(namespace, mapping.Scope.Name() == "namespace").
		Body(data).
		Do().
		Get(); err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("patchResource error: %v", err),
		}
	}
}

func deleteResource(mapping *meta.RESTMapping, config *rest.Config, group string,
	version string, namespace string, name string) error {
	restClient, err := getRESTClient(config, group, version)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("deleteResource error: %v", err),
		}
	}

	_, err = restClient.
		Delete().
		Resource(mapping.Resource).
		NamespaceIfScoped(namespace, mapping.Scope.Name() == "namespace").
		Name(name).
		Do().
		Get()

	if err != nil {
		if k8serrors.IsNotFound(err) {
			return nil
		} else {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Resource deletion error: %v", err),
			}
		}
	}

	return backoff.Retry(func() error {
		getErr := getResource(mapping, config, group, version, namespace, name)
		if k8serrors.IsNotFound(getErr) {
			log.Infof("%v in namespace %v is deleted ...", name, namespace)
			return nil
		} else {
			msg := fmt.Sprintf("%v in namespace %v is being deleted ...",
				name, namespace)
			if getErr != nil {
				msg = msg + getErr.Error()
			}
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: msg,
			}
		}
	}, backoff.NewExponentialBackOff())
}

func createResource(mapping *meta.RESTMapping, config *rest.Config, group string,
	version string, namespace string, data []byte) error {
	restClient, err := getRESTClient(config, group, version)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("createResource error: %v", err),
		}
	}

	if _, err = restClient.
		Post().
		Resource(mapping.Resource).
		NamespaceIfScoped(namespace, mapping.Scope.Name() == "namespace").
		Body(data).
		Do().
		Get(); err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("createResource error: %v", err),
		}
	}
}

// TODO(#2585): Should try to have 3 way merge functionality.
func patchOrCreate(mapping *meta.RESTMapping, config *rest.Config, group string,
	version string, namespace string, name string, data []byte) error {
	log.Infof("Applying resource configuration for %v", name)
	err := getResource(mapping, config, group, version, namespace, name)
	if err != nil {
		log.Infof("getResource error, treating as not found: %v", err)
		err = createResource(mapping, config, group, version, namespace, data)
	} else {
		log.Infof("getResource succeeds, treating as found.")
		err = patchResource(mapping, config, group, version, namespace, data)
	}

	for i := 1; i < maxRetries && k8serrors.IsConflict(err); i++ {
		time.Sleep(backoffInterval)

		log.Infof("Retrying patchOrCreate at %v attempt ...", i)
		err = getResource(mapping, config, group, version, namespace, name)
		if err != nil {
			return err
		}
		err = patchResource(mapping, config, group, version, namespace, data)
	}

	if err != nil && (k8serrors.IsConflict(err) || k8serrors.IsInvalid(err) ||
		k8serrors.IsMethodNotSupported(err)) {
		log.Infof("Trying delete and create as last resort ...")
		if err = deleteResource(mapping, config, group, version, namespace, name); err != nil {
			return err
		}
		err = createResource(mapping, config, group, version, namespace, data)
	}
	return err
}

// CreateResourceFromFile creates resources from a file, just like `kubectl create -f filename`
// We use some libraries in an old way (e.g. the RestMapper is in discovery instead of restmapper)
// because ksonnet (one of our dependency) is using the old library version.
// TODO: it can't handle "kind: list" yet.
func CreateResourceFromFile(config *rest.Config, filename string) error {
	// Create a restmapper to determine the resource type.
	discoveryClient, err := discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}
	cached := cached.NewMemCacheClient(discoveryClient)
	mapper := discovery.NewDeferredDiscoveryRESTMapper(cached, dynamic.VersionInterfaces)

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: err.Error(),
		}
	}
	objects := bytes.Split(data, []byte(yamlSeparator))
	var o map[string]interface{}
	errors := make([]error, len(objects))
	var wg sync.WaitGroup
	log.Infof("%v of resources creation ...", len(objects))
	wg.Add(len(objects))
	for idx, object := range objects {
		if err = yaml.Unmarshal(object, &o); err != nil {
			log.Warnf("Resource marshal error: %v", err)
			errors[idx] = nil
			wg.Done()
			continue
		}
		a := o["apiVersion"]
		if a == nil {
			log.Warnf("Unknown resource: %v", object)
			errors[idx] = nil
			wg.Done()
			continue
		}

		// Identify the name of deployment.
		metadata := o["metadata"].(map[string]interface{})
		if metadata["name"] == nil {
			log.Warnf("Cannot name in resource: %v", string(object))
			errors[idx] = nil
			wg.Done()
			continue
		}
		name := metadata["name"].(string)
		log.Infof("creating %v\n", name)

		apiVersion := strings.Split(a.(string), "/")
		var group, version string
		if len(apiVersion) == 1 {
			// core v1, no group. e.g. namespace
			group, version = "", apiVersion[0]
		} else {
			group, version = apiVersion[0], apiVersion[1]
		}
		log.Infof("using group (%v) and version (%v)", group, version)

		var namespace string
		if metadata["namespace"] != nil {
			namespace = metadata["namespace"].(string)
		} else {
			namespace = "default"
		}
		log.Infof("namespace = %v", namespace)

		kind := o["kind"].(string)
		log.Infof("kind: %v", kind)
		gk := schema.GroupKind{
			Group: group,
			Kind:  kind,
		}

		data, err := yaml.YAMLToJSON(object)
		if err != nil {
			log.Warnf("YAMLToJSON error for %v: %v", name, err)
			errors[idx] = nil
			wg.Done()
			continue
		}

		go func(idx int, gk schema.GroupKind, config *rest.Config, group string,
			version string, namespace string, name string, data []byte) {
			log.Infof("Goroutine for %v is started ...", name)
			var resourceErr error
			resourceErr = nil
			defer func() {
				log.Infof("Goroutine for %v is DONE ...", name)
				errors[idx] = resourceErr
				wg.Done()
			}()

			resourceErr = backoff.Retry(func() error {
				// result.resource is the resource we need (e.g. pods, services)
				mapping, retryErr := mapper.RESTMapping(gk, version)
				if retryErr == nil {
					retryErr = patchOrCreate(mapping, config, group, version,
						namespace, name, data)
				}
				if retryErr == nil {
					log.Infof("Resource creation for %v is finished ...", name)
					return nil
				}
				log.Infof("Resource creation for %v is failed, backoff and retry: %v",
					name, retryErr.Error())
				return &kfapis.KfError{
					Code:    int(kfapis.INVALID_ARGUMENT),
					Message: retryErr.Error(),
				}
			}, backoff.NewExponentialBackOff())
		}(idx, gk, config, group, version, namespace, name, data)
	}

	wg.Wait()
	for _, e := range errors {
		if e != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: e.Error(),
			}
		}
	}
	return nil
}

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
	"context"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	k8serrors "k8s.io/apimachinery/v2/pkg/api/errors"
	"k8s.io/apimachinery/v2/pkg/api/meta"
	"k8s.io/apimachinery/v2/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/v2/pkg/runtime/schema"
	"k8s.io/apimachinery/v2/pkg/runtime/serializer"
	k8stypes "k8s.io/apimachinery/v2/pkg/types"
	"k8s.io/client-go/v2/kubernetes/scheme"
	"k8s.io/client-go/v2/rest"
	"regexp"
	"sigs.k8s.io/controller-runtime/v2/pkg/client"
	"strings"
	"time"
	// Auth plugins
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/oidc"
)

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

const (
	maxRetries      = 5
	backoffInterval = 5 * time.Second
	YamlSeparator   = "(?m)^---[ \t]*$"
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
		Resource(mapping.Resource.Resource).
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
		Resource(mapping.Resource.Resource).
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
		Resource(mapping.Resource.Resource).
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
		Resource(mapping.Resource.Resource).
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

func CreateResourceFromFile(config *rest.Config, filename string) error {
	c, err := client.New(config, client.Options{})
	if err != nil {
		return errors.WithStack(err)
	}

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return errors.WithStack(err)
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objectStrings := splitter.Split(string(data), -1)
	for _, str := range objectStrings {
		if strings.TrimSpace(str) == "" {
			continue
		}
		u := &unstructured.Unstructured{}
		if err := yaml.Unmarshal([]byte(str), u); err != nil {
			return errors.WithStack(err)
		}

		name := u.GetName()
		namespace := u.GetNamespace()

		log.Infof("Creating %s", name)

		err := c.Get(context.TODO(), k8stypes.NamespacedName{Name: name, Namespace: namespace}, u.DeepCopy())
		if err == nil {
			log.Info("object already exists...")
			continue
		}
		if !k8serrors.IsNotFound(err) {
			return errors.WithStack(err)
		}

		err = c.Create(context.TODO(), u)
		if err != nil {
			return errors.WithStack(err)
		}
	}
	return nil
}

func DeleteResourceFromFile(config *rest.Config, filename string) error {
	c, err := client.New(config, client.Options{})
	if err != nil {
		return errors.WithStack(err)
	}

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return errors.WithStack(err)
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objectStrings := splitter.Split(string(data), -1)
	for _, str := range objectStrings {
		if strings.TrimSpace(str) == "" {
			continue
		}
		u := &unstructured.Unstructured{}
		if err := yaml.Unmarshal([]byte(str), u); err != nil {
			return errors.WithStack(err)
		}

		name := u.GetName()
		namespace := u.GetNamespace()

		log.Infof("Deleting %s", name)

		err := c.Get(context.TODO(), k8stypes.NamespacedName{Name: name, Namespace: namespace}, u.DeepCopy())
		if k8serrors.IsNotFound(err) {
			log.Info("object already deleted...")
			continue
		}
		if err != nil {
			return errors.WithStack(err)
		}

		err = c.Delete(context.TODO(), u)
		if err != nil {
			return errors.WithStack(err)
		}
	}
	return nil
}

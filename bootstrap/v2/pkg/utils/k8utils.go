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
	"encoding/json"
	"github.com/ghodss/yaml"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/client-go/v2/dynamic"
	"strings"

	"k8s.io/apimachinery/v2/pkg/runtime/schema"
	"k8s.io/apimachinery/v2/pkg/runtime/serializer"
	"k8s.io/client-go/v2/discovery"
	"k8s.io/client-go/v2/discovery/cached"

	"k8s.io/client-go/v2/kubernetes/scheme"
	"k8s.io/client-go/v2/rest"

	// Auth plugins
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/oidc"
)

// RecommendedConfigPathEnvVar is a environment variable for path configuration
const RecommendedConfigPathEnvVar = "KUBECONFIG"

const (
	yamlSeparator = "---"
)

// TODO COPIED from bootstrap/app/k8sUtil.go. Need to merge.
// CreateResourceFromFile creates resources from a file, just like `kubectl create -f filename`
// We use some libraries in an old way (e.g. the RestMapper is in discovery instead of restmapper)
// because ksonnet (one of our dependency) is using the old library version.
// TODO: it can't handle "kind: list" yet.
func CreateResourceFromFile(config *rest.Config, filename string) error {
	// Create a restmapper to determine the resource type.
	discoveryClient, err := discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		return err
	}
	cached := cached.NewMemCacheClient(discoveryClient)
	mapper := discovery.NewDeferredDiscoveryRESTMapper(cached, dynamic.VersionInterfaces)

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	objects := bytes.Split(data, []byte(yamlSeparator))
	var o map[string]interface{}
	for _, object := range objects {
		if err = yaml.Unmarshal(object, &o); err != nil {
			return err
		}
		a := o["apiVersion"]
		if a == nil {
			log.Warnf("Unknown resource: %v", object)
			continue
		}
		apiVersion := strings.Split(a.(string), "/")
		var group, version string
		if len(apiVersion) == 1 {
			// core v1, no group. e.g. namespace
			group, version = "", apiVersion[0]
		} else {
			group, version = apiVersion[0], apiVersion[1]
		}
		kind := o["kind"].(string)
		gk := schema.GroupKind{
			Group: group,
			Kind:  kind,
		}
		result, err := mapper.RESTMapping(gk, version)
		// result.resource is the resource we need (e.g. pods, services)
		if err != nil {
			return err
		}

		// build config for restClient
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
		restClient, err := rest.RESTClientFor(c)
		if err != nil {
			return err
		}

		// build the request
		metadata := o["metadata"].(map[string]interface{})
		name := metadata["name"].(string)
		log.Infof("creating %v\n", name)

		var namespace string
		if metadata["namespace"] != nil {
			namespace = metadata["namespace"].(string)
		} else {
			namespace = "default"
		}
		body, err := json.Marshal(o)
		if err != nil {
			return err
		}
		request := restClient.Post().Resource(result.Resource).Body(body)
		if result.Scope.Name() == "namespace" {
			request = request.Namespace(namespace)
		}
		_, err = request.DoRaw()
		if err != nil {
			return err
		}
	}

	return nil
}

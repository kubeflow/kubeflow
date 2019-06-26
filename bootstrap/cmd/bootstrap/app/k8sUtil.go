package app

import (
	"encoding/json"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	"io/ioutil"
	"regexp"
	"strings"

	"github.com/ghodss/yaml"
	ksUtil "github.com/ksonnet/ksonnet/utils"
	log "github.com/sirupsen/logrus"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
)

const (
	YamlSeparator = "(?m)^---[ \t]*$"
)

// CreateResourceFromFile creates resources from a file, just like `kubectl create -f filename`
// We use some libraries in an old way (e.g. the RestMapper is in discovery instead of restmapper)
// because ksonnet (one of our dependency) is using the old library version.
// TODO: it can't handle "kind: list" yet.
func CreateResourceFromFile(config *rest.Config, filename string, elems ...configtypes.NameValue) error {
	elemsMap := make(map[string]configtypes.NameValue)
	for _, nv := range elems {
		elemsMap[nv.Name] = nv
	}
	// Create a restmapper to determine the resource type.
	discoveryClient, err := discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		return err
	}
	cacheClient := ksUtil.NewMemcachedDiscoveryClient(discoveryClient)
	mapper := discovery.NewDeferredDiscoveryRESTMapper(cacheClient, dynamic.VersionInterfaces)

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objects := splitter.Split(string(data), -1)
	var o map[string]interface{}
	for _, object := range objects {
		if err = yaml.Unmarshal([]byte(object), &o); err != nil {
			return err
		}
		if len(o) == 0 {
			continue
		}
		a := o["apiVersion"]
		if a == nil {
			log.Warnf("Unknown resource: %v", o)
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
		} else if val, exists := elemsMap["namespace"]; exists {
			namespace = val.Value
			metadata["namespace"] = namespace
		} else {
			namespace = "default"
		}

		// Get first to see if object already exists
		getRequest := restClient.Get().Resource(result.Resource).Name(name)
		if result.Scope.Name() == "namespace" {
			getRequest = getRequest.Namespace(namespace)
		}
		_, err = getRequest.DoRaw()
		if err == nil {
			log.Infof("object already exists...\n")
			continue
		}

		// Post to create the resource.
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

/*
Copyright The Kubernetes Authors.

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

package kustomize

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/imdario/mergo"
	"github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfapisv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis"
	kftypesv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/v2/core/v1"
	crdclientset "k8s.io/apiextensions-apiserver/v2/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"k8s.io/apimachinery/v2/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/v2/pkg/runtime/schema"
	"k8s.io/apimachinery/v2/pkg/runtime/serializer"
	"k8s.io/client-go/v2/discovery"
	"k8s.io/client-go/v2/discovery/cached"
	"k8s.io/client-go/v2/kubernetes/scheme"
	corev1 "k8s.io/client-go/v2/kubernetes/typed/core/v1"
	rbacv1 "k8s.io/client-go/v2/kubernetes/typed/rbac/v1"
	"k8s.io/client-go/v2/rest"
	"k8s.io/client-go/v2/restmapper"
	clientcmdapi "k8s.io/client-go/v2/tools/clientcmd/api"
	"os"
	"path"
	"path/filepath"
	"regexp"
	application "sigs.k8s.io/application/v2/pkg/apis/app/v1beta1"
	"sigs.k8s.io/kustomize/v2/k8sdeps"
	"sigs.k8s.io/kustomize/v2/pkg/fs"
	"sigs.k8s.io/kustomize/v2/pkg/image"
	"sigs.k8s.io/kustomize/v2/pkg/loader"
	"sigs.k8s.io/kustomize/v2/pkg/patch"
	"sigs.k8s.io/kustomize/v2/pkg/resmap"
	"sigs.k8s.io/kustomize/v2/pkg/target"
	"sigs.k8s.io/kustomize/v2/pkg/types"
	"strings"

	// Auth plugins
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/v2/plugin/pkg/client/auth/oidc"
)

// kustomize implements KfApp Interface
// It should include functionality needed for the kustomize platform
// In addition to `kustomize build`, there is `kustomize edit ...`
// As noted below there are lots of different ways to use edit
//  kustomize edit add configmap my-configmap --from-file=my-key=file/path --from-literal=my-literal=12345
//  kustomize edit add configmap my-configmap --from-file=file/path
//  kustomize edit add configmap my-configmap --from-env-file=env/path.env
//  kustomize edit add configmap NAME --from-literal=k=v
//  kustomize edit add resource <filepath>
//  kustomize edit add patch <filepath>
//  kustomize edit add base <filepath1>,<filepath2>,<filepath3>
//  kustomize edit set nameprefix <prefix-value>

type MapType int

const (
	basesMap MapType = 0
	commonAnnotationsMap MapType = 1
	commonLabelsMap MapType = 2
	imagesMap MapType = 3
	resourcesMap MapType = 4
	crdsMap MapType = 5
	varsMap MapType = 6
	configurationsMap MapType = 7
	configMapGeneratorMap MapType = 8
	secretsMapGeneratorMap MapType = 9
	patchesStrategicMergeMap MapType = 10
	patchesJson6902Map MapType = 11
	YamlSeparator = "(?m)^---[ \t]*$"
)
type kustomize struct {
	kfdefsv2.KfDef
	out              *os.File
	err              *os.File
	componentPathMap map[string]string
	componentMap     map[string]bool
	packageMap       map[string]*[]string
	application      *application.Application
	restConfig       *rest.Config
	apiConfig        *clientcmdapi.Config
}

const (
	outputDir     = "kustomize"
)

// GetKfApp is the common entry point for all implmentations of the KfApp interface
func GetKfApp(kfdef *kfdefsv2.KfDef) kftypes.KfApp {
	/*
	kfdef := kfdefsv2.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       kfdef.TypeMeta.Kind,
			APIVersion: kfdef.TypeMeta.APIVersion,
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:        kfdef.Name,
			Namespace:   kfdef.Namespace,
			Labels:      kfdef.Labels,
			Annotations: kfdef.Annotations,
			ClusterName: kfdef.ClusterName,
		},
		Spec: kfdef.Spec,
	}
	*/
	_kustomize := &kustomize{
		KfDef:        *kfdef,
		out:          os.Stdout,
		err:          os.Stderr,
		componentMap: make(map[string]bool),
		packageMap:   make(map[string]*[]string),
	}
	if _kustomize.Spec.ManifestsRepo != "" {
		for _, compName := range _kustomize.Spec.Components {
			_kustomize.componentMap[compName] = true
		}
		for _, packageName := range _kustomize.Spec.Packages {
			arrayOfComponents := &[]string{}
			_kustomize.packageMap[packageName] = arrayOfComponents
		}
		_kustomize.componentPathMap = _kustomize.mapDirs(_kustomize.Spec.ManifestsRepo, true, 0, make(map[string]string))
	}
	_kustomize.application = &application.Application{
		TypeMeta: metav1.TypeMeta{
			Kind:       "Application",
			APIVersion: "app.k8s.io/v1beta1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      _kustomize.Name,
			Namespace: _kustomize.Namespace,
			Labels: map[string]string{
				kftypesv2.DefaultAppLabel: _kustomize.Name,
			},
		},
		Spec: application.ApplicationSpec{
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					kftypesv2.DefaultAppLabel: _kustomize.Name,
				},
			},
			Descriptor: application.Descriptor{
				Type:    kftypesv2.DefaultAppType,
				Version: _kustomize.Spec.Version,
			},
			Info: []application.InfoItem {

			},

		},
	}

	// build restConfig and apiConfig using $HOME/.kube/config if the file exist
	_kustomize.restConfig = kftypesv2.GetConfig()
	_kustomize.apiConfig = kftypesv2.GetKubeConfig()
	return _kustomize
}

// Apply deploys kustomize generated resources to the kubenetes api server
func (kustomize *kustomize) Apply(resources kftypes.ResourceEnum) error {
	if kustomize.restConfig == nil || kustomize.apiConfig == nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INVALID_ARGUMENT),
			Message: "Error: ksApp has nil restConfig or apiConfig, exit",
		}
	}
	clientset := kftypesv2.GetClientset(kustomize.restConfig)
	namespace := kustomize.ObjectMeta.Namespace
	log.Infof(string(kftypes.NAMESPACE)+": %v", namespace)
	_, nsMissingErr := clientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr != nil {
		log.Infof("Creating namespace: %v", namespace)
		nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
		_, nsErr := clientset.CoreV1().Namespaces().Create(nsSpec)
		if nsErr != nil {
			return &kfapisv2.KfError{
				Code: int(kfapisv2.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create %v %v Error: %v",
					string(kftypes.NAMESPACE), namespace, nsErr),
			}
		}
	}
	continuation := func() func(string, schema.GroupKind, map[string]interface{}) ([]byte, error) {
		componentGroupKindsMap := make(map[string]metav1.GroupKind)
		callback := func(namespace string, sgk schema.GroupKind, obj map[string]interface{}) ([]byte, error) {
			gk := metav1.GroupKind{
				Kind:  sgk.Kind,
				Group: sgk.Group,
			}
			if gk.Group == "" {
				gk.Group = "core"
			}
			if namespace == kustomize.Namespace {
				encoded := gk.Group + "-" + gk.Kind
				switch encoded {
				case "app.k8s.io-Application":
					app := application.Application{}
					out, _ := json.Marshal(obj)
					_ = json.Unmarshal([]byte(out), &app)
					app.Name = kustomize.application.Name
					app.Namespace = kustomize.application.Namespace
					app.Spec.ComponentGroupKinds = make([]metav1.GroupKind, 0)
					for _, groupKind := range componentGroupKindsMap {
						app.Spec.ComponentGroupKinds = append(app.Spec.ComponentGroupKinds, groupKind)
					}
					body, err := json.Marshal(&app)
					if err != nil {
						return nil, err
					}
					return body, nil
				default:
					if _, exists := componentGroupKindsMap[encoded]; !exists {
						componentGroupKindsMap[encoded] = gk
					}
				}
			}
			body, err := json.Marshal(obj)
			if err != nil {
				return nil, err
			}
			return body, nil
		}
		return callback
	}()

	kustomizeDir := path.Join(kustomize.Spec.AppDir, outputDir)
	for _, compName := range kustomize.Spec.Components {
		kustomizeFile := filepath.Join(kustomizeDir, compName+".yaml")
		if _, err := os.Stat(kustomizeFile); err == nil {
			resourcesErr := kustomize.deployResources(kustomize.restConfig, kustomizeFile, continuation)
			if resourcesErr != nil {
				return &kfapisv2.KfError{
					Code:    int(kfapisv2.INTERNAL_ERROR),
					Message: fmt.Sprintf("couldn't create resources from %v Error: %v", kustomizeFile, resourcesErr),
				}
			}
		}
	}
	return nil
}

// deployResources creates resources from a file, just like `kubectl create -f filename`
// We use some libraries in an old way (e.g. the RestMapper is in discovery instead of restmapper)
// because ksonnet (one of our dependency) is using the old library version.
// TODO based on bootstrap/app/k8sUtil.go. Need to merge.
// TODO: it can't handle "kind: list" yet.
func (kustomize *kustomize) deployResources(config *rest.Config, filename string,
	callback func(string, schema.GroupKind, map[string]interface{})([]byte, error)) error {
	// Create a restmapper to determine the resource type.
	_discoveryClient, err := discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		return err
	}
	_cached := cached.NewMemCacheClient(_discoveryClient)
	_cached.Invalidate()
	mapper := restmapper.NewDeferredDiscoveryRESTMapper(_cached)

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objects := splitter.Split(string(data), -1)

	for _, object := range objects {
		var o map[string]interface{}
		if err = yaml.Unmarshal([]byte(object), &o); err != nil {
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
		metadata := o["metadata"].(map[string]interface{})
		var namespace string
		if metadata["namespace"] != nil {
			namespace = metadata["namespace"].(string)
		} else {
			namespace = ""
		}
		kind := o["kind"].(string)
		gk := schema.GroupKind{
			Group: group,
			Kind:  kind,
		}
		mapping, retryErr := mapper.RESTMapping(gk, version)
		if retryErr != nil {
			return retryErr
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
		if metadata["name"] != nil {
			name := metadata["name"].(string)
			log.Infof("creating %v/%v\n", kind, name)
			body, err := callback(namespace, gk, o)
			if err != nil {
				return err
			}
			request := restClient.Post().Resource(mapping.Resource.Resource).Body(body)
			if mapping.Scope.Name() == "namespace" {
				request = request.Namespace(namespace)
			}
			result := request.Do()
			if result.Error() != nil {
				statusCode := 200
				result.StatusCode(&statusCode)
				switch statusCode {
				case 200:
					fallthrough
				case 409:
					continue
				default:
					return result.Error()
				}
			}
		} else {
			log.Warnf("object with kind %v has no name\n", metadata["kind"])
		}

	}
	return nil
}

// deleteGlobalResources is called from Delete and deletes CRDs, ClusterRoles, ClusterRoleBindings
func (kustomize *kustomize) deleteGlobalResources() error {
	apiextclientset, err := crdclientset.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get apiextensions client Error: %v", err),
		}
	}
	do := &metav1.DeleteOptions{}
	lo := metav1.ListOptions{
		LabelSelector: kftypesv2.DefaultAppLabel + "=" + kustomize.Name,
	}
	crdsErr := apiextclientset.CustomResourceDefinitions().DeleteCollection(do, lo)
	if crdsErr != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete customresourcedefinitions Error: %v", crdsErr),
		}
	}
	rbacclient, err := rbacv1.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get rbac/v1 client Error: %v", err),
		}
	}
	crbsErr := rbacclient.ClusterRoleBindings().DeleteCollection(do, lo)
	if crbsErr != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete clusterrolebindings Error: %v", crbsErr),
		}
	}
	crsErr := rbacclient.ClusterRoles().DeleteCollection(do, lo)
	if crsErr != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete clusterroles Error: %v", crsErr),
		}
	}
	return nil
}

// Delete is called from 'kfctl delete ...'. Will delete all resources deployed from the Apply method
func (kustomize *kustomize) Delete(resources kftypes.ResourceEnum) error {
	if kustomize.restConfig == nil || kustomize.apiConfig == nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INVALID_ARGUMENT),
			Message: "Error: nil restConfig or apiConfig, exit",
		}
	}
	if err := kustomize.deleteGlobalResources(); err != nil {
		return err
	}
	corev1client, err := corev1.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get core/v1 client Error: %v", err),
		}
	}
	namespace := kustomize.Namespace
	log.Infof("deleting namespace: %v", namespace)
	ns, nsMissingErr := corev1client.Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr == nil {
		nsErr := corev1client.Namespaces().Delete(ns.Name, metav1.NewDeleteOptions(int64(100)))
		if nsErr != nil {
			return &kfapisv2.KfError{
				Code:    int(kfapisv2.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't delete namespace %v Error: %v", namespace, nsErr),
			}
		}
	}
	return nil
}

// Generate is called from 'kfctl generate ...' and produces yaml output files under <deployment>/kustomize.
// One yaml file per component
func (kustomize *kustomize) Generate(resources kftypes.ResourceEnum) error {
	generate := func() error {
		kustomizeDir := path.Join(kustomize.Spec.AppDir, outputDir)
		// idempotency
		if _, err := os.Stat(kustomizeDir); !os.IsNotExist(err) {
			_ = os.RemoveAll(kustomizeDir)
		}
		kustomizeDirErr := os.MkdirAll(kustomizeDir, os.ModePerm)
		if kustomizeDirErr != nil {
			return &kfapisv2.KfError{
				Code:    int(kfapisv2.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create directory %v Error %v", kustomizeDir, kustomizeDirErr),
			}
		}
		for _, compName := range kustomize.Spec.Components {
			if compPath, ok := kustomize.componentPathMap[compName]; ok {
				resMap, err := GenerateKustomizationFile(&kustomize.KfDef, kustomize.Spec.ManifestsRepo, compPath,
					kustomize.Spec.ComponentParams[compName])
				if err != nil {
					return &kfapisv2.KfError{
						Code:    int(kfapisv2.INTERNAL_ERROR),
						Message: fmt.Sprintf("error generating kustomization for %v Error %v", compPath, err),
					}
				}
				writeErr := WriteKustomizationFile(compName, kustomizeDir, resMap)
				if writeErr != nil {
					return &kfapisv2.KfError{
						Code:    int(kfapisv2.INTERNAL_ERROR),
						Message: fmt.Sprintf("error writing to %v Error %v", compPath, writeErr),
					}
				}
			}
		}
		return nil
	}

	switch resources {
	case kftypes.PLATFORM:
	case kftypes.ALL:
		fallthrough
	case kftypes.K8S:
		generateErr := generate()
		if generateErr != nil {
			return fmt.Errorf("kustomize generate failed Error: %v", generateErr)
		}
	}
	return nil
}

// Init is called from 'kfctl init ...' and creates a <deployment> directory with an app.yaml file that
// holds deployment information like components, parameters
func (kustomize *kustomize) Init(resources kftypes.ResourceEnum) error {
	parts := strings.Split(kustomize.Spec.PackageManager, "@")
	version := "master"
	if len(parts) == 2 {
		version = parts[1]
	}
	cacheDir, cacheDirErr := kftypesv2.DownloadToCache(kustomize.Spec.AppDir, kftypesv2.ManifestsRepo, version)
	if cacheDirErr != nil || cacheDir == "" {
		log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
	}
	kustomize.Spec.ManifestsRepo = cacheDir
	createConfigErr := kustomize.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file %v in %v", kftypesv2.KfConfigFile, kustomize.Spec.AppDir)
	}
	return nil
}

// mapDirs is a recursive method that will return a map of component -> path-to-kustomization.yaml
// under the manifests downloaded cache
func (kustomize *kustomize) mapDirs(dirPath string, root bool, depth int, leafMap map[string]string) map[string]string {
	dirName := path.Base(dirPath)
	// package is component, stop here
	if depth == 1 && kustomize.packageMap[dirName] != nil && kustomize.componentMap[dirName] {
		subdirCheck := path.Join(dirPath, dirName)
		// border case manifests/jupyter/jupyter
		if _, err := os.Stat(subdirCheck); err != nil {
			leafMap[dirName] = dirName
			arrayOfComponents := *kustomize.packageMap[dirName]
			arrayOfComponents = append(arrayOfComponents, dirName)
			kustomize.packageMap[dirName] = &arrayOfComponents
			return leafMap
		}
	}
	files, err := ioutil.ReadDir(dirPath)
	if err != nil {
		return leafMap
	}
	for _, f := range files {
		if f.IsDir() {
			leafDir := path.Join(dirPath, f.Name())
			if depth < 2 {
				kustomize.mapDirs(leafDir, false, depth+1, leafMap)
			}
		}
	}
	if depth == 2 {
		componentPath := extractSuffix(kustomize.Spec.ManifestsRepo, dirPath)
		packageName := strings.Split(componentPath, "/")[0]
		if components, exists := kustomize.packageMap[packageName]; exists {
			leafMap[path.Base(dirPath)] = componentPath
			arrayOfComponents := *components
			arrayOfComponents = append(arrayOfComponents, dirName)
			kustomize.packageMap[packageName] = &arrayOfComponents
		}
	}
	return leafMap
}

// writeConfigFile will marshal kustomize to <deployment>/app.yaml
func (kustomize *kustomize) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(kustomize)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(kustomize.Spec.AppDir, kftypesv2.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

// GetKustomization will read a kustomization.yaml and return Kustomization type
func GetKustomization(kustomizationPath string) *types.Kustomization {
	kustomizationFile := filepath.Join(kustomizationPath, kftypesv2.KustomizationFile)
	data, err := ioutil.ReadFile(kustomizationFile)
	if err != nil {
		return nil
	}
	kustomization := &types.Kustomization{}
	if err = yaml.Unmarshal(data, kustomization); err != nil {
		return nil
	}
	return kustomization
}

// ReadUnstructured will read a resource .yaml and return the Unstructured type
func ReadUnstructured(kfDefFile string) (*unstructured.Unstructured, error) {
	data, err := ioutil.ReadFile(kfDefFile)
	if err != nil {
		return nil, err
	}
	def := &unstructured.Unstructured{}
	if err = yaml.Unmarshal(data, def); err != nil {
		return nil, err
	}
	return def, nil
}

// ReadKfDef will read a config .yaml and return the KfDef type
func ReadKfDef(kfDefFile string) *kfdefsv2.KfDef {
	data, err := ioutil.ReadFile(kfDefFile)
	if err != nil {
		return nil
	}
	kfdef := &kfdefsv2.KfDef{}
	if err = yaml.Unmarshal(data, kfdef); err != nil {
		return nil
	}
	return kfdef
}

// WriteKfDef will write a KfDef to a config .yaml
func WriteKfDef(kfdef *kfdefsv2.KfDef, kfdefpath string) error {
	data, err := yaml.Marshal(kfdef)
	if err != nil {
		return err
	}
	writeErr := ioutil.WriteFile(kfdefpath, data, 0644)
	if writeErr != nil {
		return writeErr
	}
	return nil
}

// MergeKustomization will merge the child into the parent
// if the child has no bases, then the parent just needs to add the child as base
// otherwise the parent needs to merge with behaviors
// Multiple overlays are constrained in what they can merge
// which exclude NamePrefixes, NameSuffixes, CommonLabels, CommonAnnotations.
// Any of these will generate an error
func MergeKustomization(compDir string, targetDir string, kfDef *kfdefsv2.KfDef, params []config.NameValue,
	parent *types.Kustomization, child *types.Kustomization, kustomizationMaps map[MapType]map[string]bool) error {

	paramMap := make(map[string]string)
	for _, nv := range params {
		paramMap[nv.Name] = nv.Value
	}
	updateParamFiles := func() error {
		paramFile := filepath.Join(targetDir, kftypesv2.KustomizationParamFile)
		if _, err := os.Stat(paramFile); err == nil {
			params, paramFileErr := readLines(paramFile)
			if paramFileErr != nil {
				return &kfapisv2.KfError{
					Code:    int(kfapisv2.INVALID_ARGUMENT),
					Message: fmt.Sprintf("could not open %v. Error: %v", paramFile, paramFileErr),
				}
			}
			// in params.env look for name=value that we can substitute from componentParams[component]
			// or if there is just namespace= or project= - fill in the values from KfDef
			for i, param := range params {
				paramName := strings.Split(param, "=")[0]
				if val, ok := paramMap[paramName]; ok && val != "" {
					params[i] = paramName + "=" + val
				} else {
					switch paramName {
					case "appName":
						params[i] = paramName + "=" + kfDef.Name
					case "namespace":
						params[i] = paramName + "=" + kfDef.Namespace
					case "project":
						params[i] = paramName + "=" + kfDef.Spec.Project
					}
				}
			}
			paramFileErr = writeLines(params, paramFile)
			if paramFileErr != nil {
				return &kfapisv2.KfError{
					Code:    int(kfapisv2.INTERNAL_ERROR),
					Message: fmt.Sprintf("could not update %v. Error: %v", paramFile, paramFileErr),
				}
			}
		}
		return nil
	}
	updateConfigMapArgs := func(parentConfigMapArgs *types.ConfigMapArgs, childConfigMapArgs types.ConfigMapArgs) {
		parentConfigMapArgs.Name = childConfigMapArgs.Name
		parentConfigMapArgs.Namespace = childConfigMapArgs.Namespace
		if childConfigMapArgs.EnvSource != "" {
			envAbsolutePathSource := path.Join(targetDir, childConfigMapArgs.EnvSource)
			envSource := extractSuffix(compDir, envAbsolutePathSource)
			parentConfigMapArgs.EnvSource = envSource
		}
		if childConfigMapArgs.FileSources != nil && len(childConfigMapArgs.FileSources) > 0 {
			parentConfigMapArgs.FileSources = make([]string,0)
			for _, fileSource := range childConfigMapArgs.FileSources {
				fileAbsolutePathSource := path.Join(targetDir, fileSource)
				parentConfigMapArgs.EnvSource = extractSuffix(compDir, fileAbsolutePathSource)
			}
		}
		if childConfigMapArgs.LiteralSources != nil && len(childConfigMapArgs.LiteralSources) > 0 {
			parentConfigMapArgs.LiteralSources = make([]string,0)
			for _, literalSource := range childConfigMapArgs.LiteralSources {
				parentConfigMapArgs.LiteralSources = append(parentConfigMapArgs.LiteralSources, literalSource)
			}
		}
		behavior := types.NewGenerationBehavior(childConfigMapArgs.Behavior)
		switch behavior {
		case types.BehaviorCreate:
			if _, ok := kustomizationMaps[configMapGeneratorMap][childConfigMapArgs.Name]; !ok {
				parent.ConfigMapGenerator = append(parent.ConfigMapGenerator, *parentConfigMapArgs)
				kustomizationMaps[configMapGeneratorMap][childConfigMapArgs.Name] = true
			}
		case types.BehaviorMerge, types.BehaviorReplace, types.BehaviorUnspecified:
			fallthrough
		default:
			parentConfigMapArgs.Behavior = behavior.String()
			parent.ConfigMapGenerator = append(parent.ConfigMapGenerator, *parentConfigMapArgs)
			kustomizationMaps[configMapGeneratorMap][childConfigMapArgs.Name] = true
		}
	}

	if err := updateParamFiles(); err != nil {
		return err
	}
	if child.Bases == nil {
		basePath := extractSuffix(compDir, targetDir)
		if _, ok := kustomizationMaps[basesMap][basePath]; !ok {
			parent.Bases = append(parent.Bases, basePath)
			kustomizationMaps[basesMap][basePath] = true
		}
		return nil
	}
	for _, value := range child.Bases {
		baseAbsolutePath := path.Join(targetDir, value)
		basePath := extractSuffix(compDir, baseAbsolutePath)
		if _, ok := kustomizationMaps[basesMap][basePath]; !ok {
			parent.Bases = append(parent.Bases, basePath)
			kustomizationMaps[basesMap][basePath] = true
		} else {
			childPath := extractSuffix(compDir, targetDir)
			kustomizationMaps[basesMap][childPath] = true
		}
	}
	/*
	if child.NamePrefix != "" {
		log.Fatalf("cannot merge nameprefix %v ", child.NamePrefix)
	}
	if child.NameSuffix != "" {
		log.Fatalf("cannot merge namesuffix %v ", child.NamePrefix)
	}
	if (child.CommonLabels != nil && len(child.CommonLabels) > 0) {
		log.Fatalf("cannot merge commonLabels for %v ", compDir)
	}
	if (child.CommonAnnotations != nil && len(child.CommonAnnotations) > 0) {
		log.Fatalf("cannot merge commonAnnotations for %v ", compDir)
	}
	*/
	if child.NamePrefix != "" && parent.NamePrefix == "" {
		parent.NamePrefix = child.NamePrefix
	}
	if child.NameSuffix != "" && parent.NameSuffix == "" {
		parent.NameSuffix = child.NameSuffix
	}
	for k, v := range child.CommonLabels {
		//allow replacement
		parent.CommonLabels[k] = v
		kustomizationMaps[commonLabelsMap][k] = true
	}
	for k, v := range child.CommonAnnotations {
		//allow replacement
		parent.CommonAnnotations[k] = v
		kustomizationMaps[commonAnnotationsMap][k] = true
	}

	if child.GeneratorOptions != nil && parent.GeneratorOptions == nil {
		parent.GeneratorOptions = child.GeneratorOptions
	}
	for _, value := range child.Resources {
		resourceAbsoluteFile := filepath.Join(targetDir, string(value))
		resourceFile := extractSuffix(compDir, resourceAbsoluteFile)
		if _, ok := kustomizationMaps[resourcesMap][resourceFile]; !ok {
			parent.Resources = append(parent.Resources, resourceFile)
			kustomizationMaps[resourcesMap][resourceFile] = true
		}
	}
	for _, value := range child.Images {
		imageName := value.Name
		if _, ok := kustomizationMaps[imagesMap][imageName]; !ok {
			parent.Images = append(parent.Images, value)
			kustomizationMaps[imagesMap][imageName] = true
		} else {
			kFile := filepath.Join(targetDir, kftypesv2.KustomizationFile)
			log.Warnf("ignoring image %v specified in %v", imageName, kFile)
		}
	}
	for _, value := range child.Crds {
		if _, ok := kustomizationMaps[crdsMap][value]; !ok {
			parent.Crds = append(parent.Crds, value)
			kustomizationMaps[crdsMap][value] = true
		} else {
			kFile := filepath.Join(targetDir, kftypesv2.KustomizationFile)
			log.Warnf("ignoring crd %v specified in %v", value, kFile)
		}
	}
	for _, value := range child.ConfigMapGenerator {
		parentConfigMapArgs := new(types.ConfigMapArgs)
		updateConfigMapArgs(parentConfigMapArgs, value)
	}
	for _, value := range child.SecretGenerator {
		secretName := value.Name
		switch types.NewGenerationBehavior(value.Behavior) {
		case types.BehaviorCreate:
			if _, ok := kustomizationMaps[secretsMapGeneratorMap][secretName]; !ok {
				parent.SecretGenerator = append(parent.SecretGenerator, value)
				kustomizationMaps[secretsMapGeneratorMap][secretName] = true
			}
		case types.BehaviorMerge, types.BehaviorReplace:
			parent.SecretGenerator = append(parent.SecretGenerator, value)
			kustomizationMaps[secretsMapGeneratorMap][secretName] = true
		}
	}
	for _, value := range child.Vars {
		varName := value.Name
		if _, ok := kustomizationMaps[varsMap][varName]; !ok {
			parent.Vars = append(parent.Vars, value)
			kustomizationMaps[varsMap][varName] = true
		} else {
			kFile := filepath.Join(targetDir, kftypesv2.KustomizationFile)
			log.Warnf("ignoring var %v specified in %v", varName, kFile)
		}
	}
	for _, value := range child.PatchesStrategicMerge {
		patchAbsoluteFile := filepath.Join(targetDir, string(value))
		patchFile := extractSuffix(compDir, patchAbsoluteFile)
		if _, ok := kustomizationMaps[patchesStrategicMergeMap][patchFile]; !ok {
			patchFileCasted := patch.StrategicMerge(patchFile)
			parent.PatchesStrategicMerge = append(parent.PatchesStrategicMerge, patchFileCasted)
			kustomizationMaps[patchesStrategicMergeMap][patchFile] = true
		}
	}
	// json patches are aggregated and merged into local patch files
	for _, value := range child.PatchesJson6902 {
		patchJson := new(patch.Json6902)
		patchJson.Target = value.Target
		patchAbsolutePath := filepath.Join(targetDir, value.Path)
		patchJson.Path = extractSuffix(compDir, patchAbsolutePath)
		if _, ok := kustomizationMaps[patchesJson6902Map][patchJson.Path]; !ok {
			parent.PatchesJson6902 = append(parent.PatchesJson6902, *patchJson)
			kustomizationMaps[patchesJson6902Map][patchJson.Path] = true
		}
	}
	for _, value := range child.Configurations {
		configurationAbsolutePath := filepath.Join(targetDir, value)
		configurationPath := extractSuffix(compDir, configurationAbsolutePath)
		if _, ok := kustomizationMaps[configurationsMap][configurationPath]; !ok {
			parent.Configurations = append(parent.Configurations, configurationPath)
			kustomizationMaps[configurationsMap][configurationPath] = true
		}
	}
	return nil
}

// MergeKustomizations will merge base and all overlay kustomization files into
// a single kustomization file
func MergeKustomizations(kfDef *kfdefsv2.KfDef, compDir string, params []config.NameValue) (*types.Kustomization, error) {
	kustomizationMaps := CreateKustomizationMaps()
	kustomization := &types.Kustomization{
		TypeMeta: types.TypeMeta{
			APIVersion: types.KustomizationVersion,
			Kind:       types.KustomizationKind,
		},
		Bases: make([]string,0),
		CommonLabels: make(map[string]string),
		CommonAnnotations: make(map[string]string),
		PatchesStrategicMerge: make([]patch.StrategicMerge,0),
		PatchesJson6902: make([]patch.Json6902,0),
		Images: make([]image.Image,0),
		Vars: make([]types.Var,0),
		Crds: make([]string,0),
		Resources: make([]string,0),
		ConfigMapGenerator: make([]types.ConfigMapArgs,0),
		SecretGenerator: make([]types.SecretArgs,0),
		Configurations: make([]string,0),
	}
	baseDir := path.Join(compDir, "base")
	base := GetKustomization(baseDir)
	if base == nil {
		comp := GetKustomization(compDir)
		if comp != nil {
			return comp, nil
		}
	} else {
		err := MergeKustomization(compDir, baseDir, kfDef, params, kustomization, base, kustomizationMaps)
		if err != nil {
			return nil, &kfapisv2.KfError{
				Code:    int(kfapisv2.INTERNAL_ERROR),
				Message: fmt.Sprintf("error merging kustomization at %v Error %v", baseDir, err),
			}
		}
	}
	overlayParams := []string{}
	if params != nil {
		for _, nv := range params {
			name := nv.Name
			switch name {
			case "overlay":
				overlayParams = append(overlayParams, nv.Value)
			case "namespace":
				kustomization.Namespace = nv.Value
			}
		}
	}
	for _, overlayParam := range overlayParams {
		overlayDir := path.Join(compDir, "overlays", overlayParam)
		if _, err := os.Stat(overlayDir); err == nil {
			err := MergeKustomization(compDir, overlayDir, kfDef, params, kustomization,
				GetKustomization(overlayDir), kustomizationMaps)
			if err != nil {
				return nil, &kfapisv2.KfError{
					Code:    int(kfapisv2.INTERNAL_ERROR),
					Message: fmt.Sprintf("error merging kustomization at %v Error %v", overlayDir, err),
				}
			}
		}
	}
	if len(kustomization.PatchesJson6902) > 0 {
		patches := map[string][]patch.Json6902{}
		for _, jsonPatch := range kustomization.PatchesJson6902 {
			key := jsonPatch.Target.Name + "-" + jsonPatch.Target.Kind
			if _, exists := patches[key]; !exists {
				patchArray := make([]patch.Json6902, 0)
				patchArray = append(patchArray, jsonPatch)
				patches[key] = patchArray
			} else {
				patches[key] = append(patches[key], jsonPatch)
			}
		}
		kustomization.PatchesJson6902 = make([]patch.Json6902, 0)
		aggregatedPatchOps := make([]byte, 0)
		patchFile := ""
		for key, values := range patches {
			aggregatedPatch := new(patch.Json6902)
			aggregatedPatch.Path = key + ".yaml"
			patchFile = path.Join(compDir, aggregatedPatch.Path)
			aggregatedPatch.Target = new(patch.Target)
			aggregatedPatch.Target.Name = values[0].Target.Name
			aggregatedPatch.Target.Namespace = values[0].Target.Namespace
			aggregatedPatch.Target.Group = values[0].Target.Group
			aggregatedPatch.Target.Version = values[0].Target.Version
			aggregatedPatch.Target.Kind = values[0].Target.Kind
			aggregatedPatch.Target.Gvk = values[0].Target.Gvk
			for _, eachPatch := range values {
				patchPath := path.Join(compDir, eachPatch.Path)
				if _, err := os.Stat(patchPath); err == nil {
					data, err := ioutil.ReadFile(patchPath)
					if err != nil {
						return nil, err
					}
					aggregatedPatchOps = append(aggregatedPatchOps, data...)
				}
			}
			kustomization.PatchesJson6902 = append(kustomization.PatchesJson6902, *aggregatedPatch)
		}
		patchErr := ioutil.WriteFile(patchFile, aggregatedPatchOps, 0644)
		if patchErr != nil {
			return nil, patchErr
		}
	}
	return kustomization, nil
}

// GenerateKustomizationFile will create a kustomization.yaml
// It will parse a args structure that provides mixin or multiple overlays to be merged with the base kustomization file
// for example
//
//   componentParams:
//    tf-job-operator:
//    - name: overlay
//      value: namespaced-gangscheduled
//
// It will return a resmap.ResMap which is an accumulated ResMap of the base + any overlays
func GenerateKustomizationFile(kfDef *kfdefsv2.KfDef, root string,
	compPath string, params []config.NameValue) (resmap.ResMap, error) {

	moveToFront := func(item string, list []string) []string {
		olen := len(list)
		newlist := make([]string, 0)
		for i, component := range list {
			if component == item {
				newlist = append(newlist, list[i])
				newlist = append(newlist, list[0:i]...)
				newlist = append(newlist, list[i+1:olen]...)
				break
			}
		}
		return newlist
	}
	factory := k8sdeps.NewFactory()
	fsys := fs.MakeRealFS()
	compDir := path.Join(root, compPath)
	kustomization, kustomizationErr := MergeKustomizations(kfDef, compDir, params)
	if kustomizationErr != nil {
		return nil, kustomizationErr
	}
	if kustomization.Namespace == "" {
		kustomization.Namespace = kfDef.Namespace
	}
	if kustomization.CommonLabels == nil {
		kustomization.CommonLabels = map[string]string {
			kftypesv2.DefaultAppLabel: kfDef.Name,
		}
	}
	//TODO(#2685) we may want to delegate this to separate tooling so kfctl is not dynamically mixing in overlays.
	if len(kustomization.PatchesStrategicMerge) > 0 {
		basename := filepath.Base(string(kustomization.PatchesStrategicMerge[0]))
		basefile := filepath.Join(compDir, "base", basename)
		def, err := ReadUnstructured(basefile)
		if err != nil {
			return nil, err
		}
		apiVersion := def.GetAPIVersion()
		if apiVersion == kfDef.APIVersion {
			baseKfDef := ReadKfDef(basefile)
			for _, k := range kustomization.PatchesStrategicMerge {
				overlayfile := filepath.Join(compDir, string(k))
				overlay := ReadKfDef(overlayfile)
				mergeErr := mergo.Merge(&baseKfDef.Spec.ComponentConfig, overlay.Spec.ComponentConfig, mergo.WithAppendSlice)
				if mergeErr != nil {
					return nil, mergeErr
				}
			}
			if kfDef.Spec.UseIstio {
				baseKfDef.Spec.Components = moveToFront("istio", baseKfDef.Spec.Components)
				baseKfDef.Spec.Components = moveToFront("istio-install", baseKfDef.Spec.Components)
				baseKfDef.Spec.Components = moveToFront("istio-crds", baseKfDef.Spec.Components)
			}
			writeErr := WriteKfDef(baseKfDef, basefile)
			if writeErr != nil {
				return nil, writeErr
			}
			kustomization.PatchesStrategicMerge = nil
		}
	}
	buf, bufErr := yaml.Marshal(kustomization)
	if bufErr != nil {
		return nil, bufErr
	}
	kustomizationPath := filepath.Join(compDir, kftypesv2.KustomizationFile)
	kustomizationPathErr := ioutil.WriteFile(kustomizationPath, buf, 0644)
	if kustomizationPathErr != nil {
		return nil, kustomizationPathErr
	}
	_loader, loaderErr := loader.NewLoader(compDir, fsys)
	if loaderErr != nil {
		return nil, fmt.Errorf("could not load kustomize loader: %v", loaderErr)
	}
	defer _loader.Cleanup()
	kt, err := target.NewKustTarget(_loader, factory.ResmapF, factory.TransformerF)
	if err != nil {
		return nil, err
	}
	allResources, err := kt.MakeCustomizedResMap()
	if err != nil {
		return nil, err
	}
	return allResources, nil
}

func WriteKustomizationFile(name string, kustomizeDir string, resMap resmap.ResMap) error {
	// Output the objects.
	yamlResources, yamlResourcesErr := resMap.EncodeAsYaml()
	if yamlResourcesErr != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INTERNAL_ERROR),
			Message: fmt.Sprintf("error generating yaml Error %v", yamlResourcesErr),
		}
	}
	kustomizeFile := filepath.Join(kustomizeDir, name+".yaml")
	kustomizationFileErr := ioutil.WriteFile(kustomizeFile, yamlResources, 0644)
	if kustomizationFileErr != nil {
		return &kfapisv2.KfError{
			Code:    int(kfapisv2.INTERNAL_ERROR),
			Message: fmt.Sprintf("error writing to %v Error %v", kustomizeFile, kustomizationFileErr),
		}
	}
	return nil
}

// readLines reads a file into an array of strings
func readLines(path string) ([]string, error) {
	var file, err = os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines, scanner.Err()
}

// writeLines writes a string array to the given file - one line per array entry.
func writeLines(lines []string, path string) error {
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	w := bufio.NewWriter(file)
	for _, line := range lines {
		fmt.Fprintln(w, line)
	}
	return w.Flush()
}

// extractSuffix will return the non-overlapped part of 2 paths eg
// /foo/bar/baz/zed and /foo/bar/ will return baz/zed
func extractSuffix(dirPath string, subDirPath string) string {
	suffix := strings.TrimPrefix(subDirPath, dirPath)[1:]
	return suffix
}

func CreateKustomizationMaps() map[MapType]map[string]bool {
	return map[MapType]map[string]bool{
		basesMap: make(map[string]bool),
		commonAnnotationsMap: make(map[string]bool),
		commonLabelsMap: make(map[string]bool),
		imagesMap: make(map[string]bool),
		resourcesMap: make(map[string]bool),
		crdsMap: make(map[string]bool),
		varsMap: make(map[string]bool),
		configurationsMap: make(map[string]bool),
		configMapGeneratorMap: make(map[string]bool),
		secretsMapGeneratorMap: make(map[string]bool),
		patchesStrategicMergeMap: make(map[string]bool),
		patchesJson6902Map: make(map[string]bool),
	}
}

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
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/imdario/mergo"
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapisv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	profilev2 "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/kubeflow/v1alpha1"
	"github.com/otiai10/copy"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	rbacv2 "k8s.io/api/rbac/v1"
	crdclientset "k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset/typed/apiextensions/v1beta1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	corev1 "k8s.io/client-go/kubernetes/typed/core/v1"
	rbacv1 "k8s.io/client-go/kubernetes/typed/rbac/v1"
	"k8s.io/client-go/rest"
	"math/rand"
	"os"
	"path"
	"path/filepath"
	"sigs.k8s.io/kustomize/k8sdeps"
	"sigs.k8s.io/kustomize/pkg/fs"
	"sigs.k8s.io/kustomize/pkg/image"
	"sigs.k8s.io/kustomize/pkg/loader"
	"sigs.k8s.io/kustomize/pkg/patch"
	"sigs.k8s.io/kustomize/pkg/resmap"
	"sigs.k8s.io/kustomize/pkg/target"
	"sigs.k8s.io/kustomize/pkg/types"
	"strings"
	"time"

	// Auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
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
	basesMap                 MapType = 0
	commonAnnotationsMap     MapType = 1
	commonLabelsMap          MapType = 2
	imagesMap                MapType = 3
	resourcesMap             MapType = 4
	crdsMap                  MapType = 5
	varsMap                  MapType = 6
	configurationsMap        MapType = 7
	configMapGeneratorMap    MapType = 8
	secretsMapGeneratorMap   MapType = 9
	patchesStrategicMergeMap MapType = 10
	patchesJson6902Map       MapType = 11
	OverlayParamName                 = "overlay"
)

type kustomize struct {
	kfDef            *kfdefsv3.KfDef
	out              *os.File
	err              *os.File
	componentPathMap map[string]string
	componentMap     map[string]bool
	packageMap       map[string]*[]string
	restConfig       *rest.Config
	// when set to true, apply() will skip local kube config, directly build config from restConfig
	configOverwrite bool
}

const (
	defaultUserId = "anonymous"
	outputDir     = "kustomize"
)

// Setter defines an interface for modifying the plugin.
type Setter interface {
	SetK8sRestConfig(r *rest.Config)
}

// GetKfApp is the common entry point for all implementations of the KfApp interface
func GetKfApp(kfdef *kfdefsv3.KfDef) kftypesv3.KfApp {
	_kustomize := &kustomize{
		kfDef: kfdef,
		out:   os.Stdout,
		err:   os.Stderr,
	}

	// We explicitly do not initiate restConfig  here.
	// We want to delay creating the clients until we actually need them.
	// This is for two reasons
	// 1. We want to allow injecting the config and not relying on
	//    $HOME/.kube/config always
	// 2. We want to be able to generate the manifests without the K8s cluster existing.
	// build restConfig using $HOME/.kube/config if the file exists
	return _kustomize
}

// initComponentMaps checks if we have already initialized the maps locating the various manifest
// packages and if not initializes them.
func (kustomize *kustomize) initComponentMaps() error {
	if kustomize.componentMap != nil && kustomize.packageMap != nil {
		log.Infof("kustomize package map already initialized")
		return nil
	}

	log.Infof("Initializing kustomize package map")

	kustomize.componentMap = make(map[string]bool)
	kustomize.packageMap = make(map[string]*[]string)

	repo, ok := kustomize.kfDef.Status.ReposCache[kftypesv3.ManifestsRepoName]

	if !ok {
		err := fmt.Errorf("Could not initialize kustomize component maps; missing repo cache for repo %v", kftypesv3.ManifestsRepoName)
		return errors.WithStack(err)
	}

	for _, compName := range kustomize.kfDef.Spec.Components {
		kustomize.componentMap[compName] = true
	}
	for _, packageName := range kustomize.kfDef.Spec.Packages {
		arrayOfComponents := &[]string{}
		kustomize.packageMap[packageName] = arrayOfComponents
	}
	kustomize.componentPathMap = kustomize.mapDirs(repo.LocalPath, true, 0, make(map[string]string))

	log.Infof("Component path map: %v\n", utils.PrettyPrint(kustomize.componentPathMap))
	return nil
}

// backfillApplications backfills the applications from the components componentParams
func (kustomize *kustomize) backfillApplications() error {
	currentApplications := map[string]bool{}

	if kustomize.kfDef.Spec.Applications == nil {
		kustomize.kfDef.Spec.Applications = []kfdefsv3.Application{}
	}

	// Build a set of applications currently defined.
	for _, a := range kustomize.kfDef.Spec.Applications {
		currentApplications[a.Name] = true
	}

	// We need repoCache to know the local path strip from componentPathMap
	repo, ok := kustomize.kfDef.Status.ReposCache[kftypesv3.ManifestsRepoName]

	if !ok {
		err := fmt.Errorf("Could not backfillApplications; missing repo cache for repo %v", kftypesv3.ManifestsRepoName)
		return errors.WithStack(err)
	}

	// Loop over all the components
	for _, cName := range kustomize.kfDef.Spec.Components {
		if _, ok := currentApplications[cName]; ok {
			log.Infof("There is already an application named %v; not converting component again", cName)
			continue
		}

		log.Infof("Converting component %v to an application in KfDef.Spec", cName)

		cPath, ok := kustomize.componentPathMap[cName]

		if !ok {
			log.Errorf("Could not backfill the component %v; no component path specified", cName)
			return errors.WithStack(fmt.Errorf("Could not backfill the component %v; no component path specified", cName))
		}

		// Strip out the local path
		relPath := strings.TrimPrefix(cPath, repo.LocalPath)

		currentApplications[cName] = true
		app := kfdefsv3.Application{
			Name: cName,
			KustomizeConfig: &kfdefsv3.KustomizeConfig{
				RepoRef: &kfdefsv3.RepoRef{
					Name: kftypesv3.ManifestsRepoName,
					Path: relPath,
				},
				Overlays:   []string{},
				Parameters: []config.NameValue{},
			},
		}

		if cParams, ok := kustomize.kfDef.Spec.ComponentParams[cName]; ok {
			for _, p := range cParams {
				if p.Name == OverlayParamName {
					app.KustomizeConfig.Overlays = append(app.KustomizeConfig.Overlays, p.Value)
				} else {
					app.KustomizeConfig.Parameters = append(app.KustomizeConfig.Parameters, p)
				}
			}
		}

		kustomize.kfDef.Spec.Applications = append(kustomize.kfDef.Spec.Applications, app)
	}

	// Preserve the backfill
	return kustomize.kfDef.WriteToConfigFile()
}

// initK8sClients initializes the K8s clients if they haven't already been initialized.
// it is a null op otherwise.
func (kustomize *kustomize) initK8sClients() error {
	if kustomize.restConfig == nil {
		log.Infof("Initializing a default restConfig for Kubernetes")
		kustomize.restConfig = kftypesv3.GetConfig()
	}

	return nil
}

// Apply deploys kustomize generated resources to the kubenetes api server
func (kustomize *kustomize) Apply(resources kftypesv3.ResourceEnum) error {
	var restConfig *rest.Config = nil
	if kustomize.configOverwrite && kustomize.restConfig != nil {
		restConfig = kustomize.restConfig
	}
	apply, err := utils.NewApply(kustomize.kfDef.ObjectMeta.Namespace, restConfig)
	if err != nil {
		return err
	}

	kustomizeDir := path.Join(kustomize.kfDef.Spec.AppDir, outputDir)
	for _, app := range kustomize.kfDef.Spec.Applications {
		resMap, err := EvaluateKustomizeManifest(path.Join(kustomizeDir, app.Name))
		if err != nil {
			log.Errorf("error evaluating kustomization manifest for %v Error %v", app.Name, err)
			return &kfapisv3.KfError{
				Code:    int(kfapisv3.INTERNAL_ERROR),
				Message: fmt.Sprintf("error evaluating kustomization manifest for %v Error %v", app.Name, err),
			}
		}
		//TODO this should be streamed
		data, err := resMap.EncodeAsYaml()
		if err != nil {
			return &kfapisv3.KfError{
				Code:    int(kfapisv3.INTERNAL_ERROR),
				Message: fmt.Sprintf("can not encode component %v as yaml Error %v", app.Name, err),
			}
		}
		err = apply.Apply(data)
		if err != nil {
			return err
		}
	}

	// Create default profile
	// When user identity available, the user will be owner of the profile
	// Otherwise the profile would be a public one.
	if kustomize.kfDef.Spec.Email != "" {
		userId := defaultUserId
		// Use user email as user id if available.
		// When platform == GCP, same user email is also identity in requests through IAP.
		userId = kustomize.kfDef.Spec.Email
		defaultProfileNamespace := kftypesv3.EmailToDefaultName(userId)
		profile := &profilev2.Profile{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Profile",
				APIVersion: "kubeflow.org/v1alpha1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name: defaultProfileNamespace,
			},
			Spec: profilev2.ProfileSpec{
				Owner: rbacv2.Subject{
					Kind: "User",
					Name: userId,
				},
			},
		}

		if !apply.DefaultProfileNamespace(defaultProfileNamespace) {
			body, err := json.Marshal(profile)
			if err != nil {
				return err
			}
			err = apply.Apply(body)
			if err != nil {
				return err
			}
			b := backoff.NewExponentialBackOff()
			b.InitialInterval = 3 * time.Second
			b.MaxInterval = 30 * time.Second
			b.MaxElapsedTime = 5 * time.Minute
			return backoff.Retry(func() error {
				if !apply.DefaultProfileNamespace(defaultProfileNamespace) {
					msg := fmt.Sprintf("Could not find namespace %v, wait and retry", defaultProfileNamespace)
					log.Warnf(msg)
					return &kfapisv3.KfError{
						Code:    int(kfapisv3.INVALID_ARGUMENT),
						Message: msg,
					}
				}
				return nil
			}, b)
		} else {
			log.Infof("Default profile namespace already exists: %v within owner %v", defaultProfileNamespace,
				profile.Spec.Owner.Name)
		}
	}
	return nil
}

// deleteGlobalResources is called from Delete and deletes CRDs, ClusterRoles, ClusterRoleBindings
func (kustomize *kustomize) deleteGlobalResources() error {
	if err := kustomize.initK8sClients(); err != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error: kustomize plugin couldn't initialize a K8s client %v", err),
		}
	}
	apiextclientset, err := crdclientset.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get apiextensions client Error: %v", err),
		}
	}
	do := &metav1.DeleteOptions{}
	lo := metav1.ListOptions{
		LabelSelector: kftypesv3.DefaultAppLabel + "=" + kustomize.kfDef.Name,
	}
	crdsErr := apiextclientset.CustomResourceDefinitions().DeleteCollection(do, lo)
	if crdsErr != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete customresourcedefinitions Error: %v", crdsErr),
		}
	}
	rbacclient, err := rbacv1.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get rbac/v1 client Error: %v", err),
		}
	}
	crbsErr := rbacclient.ClusterRoleBindings().DeleteCollection(do, lo)
	if crbsErr != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete clusterrolebindings Error: %v", crbsErr),
		}
	}
	crsErr := rbacclient.ClusterRoles().DeleteCollection(do, lo)
	if crsErr != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INVALID_ARGUMENT),
			Message: fmt.Sprintf("couldn't delete clusterroles Error: %v", crsErr),
		}
	}
	return nil
}

// Delete is called from 'kfctl delete ...'. Will delete all resources deployed from the Apply method
func (kustomize *kustomize) Delete(resources kftypesv3.ResourceEnum) error {
	if err := kustomize.initK8sClients(); err != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error: kustomize plugin couldn't initialize a K8s client %v", err),
		}
	}
	if err := kustomize.deleteGlobalResources(); err != nil {
		return err
	}
	corev1client, err := corev1.NewForConfig(kustomize.restConfig)
	if err != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't get core/v1 client Error: %v", err),
		}
	}
	namespace := kustomize.kfDef.Namespace
	log.Infof("deleting namespace: %v", namespace)
	ns, nsMissingErr := corev1client.Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr == nil {
		nsErr := corev1client.Namespaces().Delete(ns.Name, metav1.NewDeleteOptions(int64(100)))
		if nsErr != nil {
			return &kfapisv3.KfError{
				Code:    int(kfapisv3.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't delete namespace %v Error: %v", namespace, nsErr),
			}
		}
	}
	return nil
}

// Generate is called from 'kfctl generate ...' and produces yaml output files under <deployment>/kustomize.
// One yaml file per component
func (kustomize *kustomize) Generate(resources kftypesv3.ResourceEnum) error {
	generate := func() error {
		kustomizeDir := path.Join(kustomize.kfDef.Spec.AppDir, outputDir)

		// idempotency
		if _, err := os.Stat(kustomizeDir); !os.IsNotExist(err) {
			_ = os.RemoveAll(kustomizeDir)
		}
		kustomizeDirErr := os.MkdirAll(kustomizeDir, os.ModePerm)
		if kustomizeDirErr != nil {
			return &kfapisv3.KfError{
				Code:    int(kfapisv3.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create directory %v Error %v", kustomizeDir, kustomizeDirErr),
			}
		}

		_, ok := kustomize.kfDef.Status.ReposCache[kftypesv3.ManifestsRepoName]

		if !ok {
			log.Infof("Repo %v not listed in KfDef.Status; Resync'ing cache", kftypesv3.ManifestsRepoName)
			if err := kustomize.kfDef.SyncCache(); err != nil {
				log.Errorf("Syncing the cached failed; error %v", err)
				return errors.WithStack(err)
			}
		}

		_, ok = kustomize.kfDef.Status.ReposCache[kftypesv3.ManifestsRepoName]

		if !ok {
			return errors.WithStack(fmt.Errorf("Repo %v not listed in KfDef.Status; ", kftypesv3.ManifestsRepoName))
		}

		if err := kustomize.initComponentMaps(); err != nil {
			log.Errorf("Could not initialize kustomize component map paths; error %v", err)
			return errors.WithStack(err)
		}

		if err := kustomize.backfillApplications(); err != nil {
			log.Errorf("Could not backfill KfDef.Spec.Applications from components; error %v", err)
			return errors.WithStack(err)
		}

		for _, app := range kustomize.kfDef.Spec.Applications {
			log.Infof("Processing application: %v", app.Name)

			if app.KustomizeConfig == nil {
				err := fmt.Errorf("Application %v is missing KustomizeConfig", app.Name)
				log.Errorf("%v", err)
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
					Message: err.Error(),
				}
			}

			repoName := app.KustomizeConfig.RepoRef.Name
			repoCache, ok := kustomize.kfDef.Status.ReposCache[repoName]

			if !ok {
				err := fmt.Errorf("Application %v refers to repo %v which wasn't found in KfDef.Status.ReposCache", app.Name, repoName)
				log.Errorf("%v", err)
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
					Message: err.Error(),
				}
			}

			appPath := path.Join(repoCache.LocalPath, app.KustomizeConfig.RepoRef.Path)

			// Copy the component to kustomizeDir
			if err := copy.Copy(appPath, path.Join(kustomizeDir, app.Name)); err != nil {
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
					Message: fmt.Sprintf("couldn't copy application %s", app.Name),
				}
			}
			if err := GenerateKustomizationFile(kustomize.kfDef, kustomizeDir, app.Name,
				app.KustomizeConfig.Overlays, app.KustomizeConfig.Parameters); err != nil {
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
					Message: fmt.Sprintf("couldn't generate kustomization file for component %s", app.Name),
				}
			}
		}
		return nil
	}

	switch resources {
	case kftypesv3.PLATFORM:
	case kftypesv3.ALL:
		fallthrough
	case kftypesv3.K8S:
		generateErr := generate()
		if generateErr != nil {
			return fmt.Errorf("kustomize generate failed Error: %v", generateErr)
		}
	}
	return nil
}

// Init is called from 'kfctl init ...' and creates a <deployment> directory with an app.yaml file that
// holds deployment information like components, parameters
func (kustomize *kustomize) Init(resources kftypesv3.ResourceEnum) error {
	// TODO(https://github.com/kubeflow/kubeflow/issues/3546): This code
	// needs to be updated.
	// TODO(jlewi): I believe we can get rid of this code now? I believe are backfilling Repos not
	// in the coordinator; here https://github.com/kubeflow/kubeflow/blob/865f10e98e8ca65a722bbc879a3acd8f06e86db1/bootstrap/v2/pkg/kfapp/coordinator/coordinator.go#L443
	if len(kustomize.kfDef.Spec.Repos) == 0 {
		log.Warnf("kustomize.kfDef.Spec.Repos isn't set; this is deprecated. Repos should be set in app.yaml")
		parts := strings.Split(kustomize.kfDef.Spec.PackageManager, "@")
		version := "master"
		if len(parts) == 2 {
			version = parts[1]
		}

		// TODO(jlewi): This is a legacy code path. Once we we use Spec.Repos we can get rid of this code path.
		log.Infof("Downloading kustomize manifests from %v", kftypesv3.ManifestsRepo)
		cacheDir, cacheDirErr := kftypesv3.DownloadToCache(kustomize.kfDef.Spec.AppDir, kftypesv3.ManifestsRepo, version)
		if cacheDirErr != nil || cacheDir == "" {
			log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
		}
		createConfigErr := kustomize.kfDef.WriteToConfigFile()
		if createConfigErr != nil {
			return fmt.Errorf("cannot create config file %v in %v", kftypesv3.KfConfigFile, kustomize.kfDef.Spec.AppDir)
		}
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
		componentPath := extractSuffix(kustomize.kfDef.Status.ReposCache[kftypesv3.ManifestsRepoName].LocalPath, dirPath)
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

func (kustomize *kustomize) SetK8sRestConfig(r *rest.Config) {
	kustomize.restConfig = r
	kustomize.configOverwrite = true
}

// GetKustomization will read a kustomization.yaml and return Kustomization type
func GetKustomization(kustomizationPath string) *types.Kustomization {
	kustomizationFile := filepath.Join(kustomizationPath, kftypesv3.KustomizationFile)
	data, err := ioutil.ReadFile(kustomizationFile)
	if err != nil {
		log.Warnf("Cannot get kustomization from %v: error %v", kustomizationPath, err)
		return nil
	}
	kustomization := &types.Kustomization{}
	if err = yaml.Unmarshal(data, kustomization); err != nil {
		log.Warnf("Cannot unmarshal kustomization from %v: error %v", kustomizationPath, err)
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
func ReadKfDef(kfDefFile string) *kfdefsv3.KfDef {
	data, err := ioutil.ReadFile(kfDefFile)
	if err != nil {
		return nil
	}
	kfdef := &kfdefsv3.KfDef{}
	if err = yaml.Unmarshal(data, kfdef); err != nil {
		return nil
	}
	return kfdef
}

// WriteKfDef will write a KfDef to a config .yaml
func WriteKfDef(kfdef *kfdefsv3.KfDef, kfdefpath string) error {
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
func MergeKustomization(compDir string, targetDir string, kfDef *kfdefsv3.KfDef, params []config.NameValue,
	parent *types.Kustomization, child *types.Kustomization, kustomizationMaps map[MapType]map[string]bool) error {

	paramMap := make(map[string]string)
	for _, nv := range params {
		paramMap[nv.Name] = nv.Value
	}
	updateParamFiles := func() error {
		paramFile := filepath.Join(targetDir, kftypesv3.KustomizationParamFile)
		if _, err := os.Stat(paramFile); err == nil {
			params, paramFileErr := readLines(paramFile)
			if paramFileErr != nil {
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INVALID_ARGUMENT),
					Message: fmt.Sprintf("could not open %v. Error: %v", paramFile, paramFileErr),
				}
			}
			// in params.env look for name=value that we can substitute from componentParams[component]
			// or if there is just namespace= or project= - fill in the values from KfDef
			for i, param := range params {
				paramName := strings.Split(param, "=")[0]
				if val, ok := paramMap[paramName]; ok && val != "" {
					switch paramName {
					case "generateName":
						arr := strings.Split(param, "=")
						if len(arr) == 1 || arr[1] == "" {
							b := make([]byte, 4) //equals 8 charachters
							rand.Read(b)
							s := hex.EncodeToString(b)
							val += s
						}
					}
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
				return &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
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
			parentConfigMapArgs.FileSources = make([]string, 0)
			for _, fileSource := range childConfigMapArgs.FileSources {
				fileAbsolutePathSource := path.Join(targetDir, fileSource)
				parentConfigMapArgs.EnvSource = extractSuffix(compDir, fileAbsolutePathSource)
			}
		}
		if childConfigMapArgs.LiteralSources != nil && len(childConfigMapArgs.LiteralSources) > 0 {
			parentConfigMapArgs.LiteralSources = make([]string, 0)
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
			kFile := filepath.Join(targetDir, kftypesv3.KustomizationFile)
			log.Warnf("ignoring image %v specified in %v", imageName, kFile)
		}
	}
	for _, value := range child.Crds {
		if _, ok := kustomizationMaps[crdsMap][value]; !ok {
			parent.Crds = append(parent.Crds, value)
			kustomizationMaps[crdsMap][value] = true
		} else {
			kFile := filepath.Join(targetDir, kftypesv3.KustomizationFile)
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
			kFile := filepath.Join(targetDir, kftypesv3.KustomizationFile)
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
func MergeKustomizations(kfDef *kfdefsv3.KfDef, compDir string, overlayParams []string, params []config.NameValue) (*types.Kustomization, error) {
	kustomizationMaps := CreateKustomizationMaps()
	kustomization := &types.Kustomization{
		TypeMeta: types.TypeMeta{
			APIVersion: types.KustomizationVersion,
			Kind:       types.KustomizationKind,
		},
		Bases:                 make([]string, 0),
		CommonLabels:          make(map[string]string),
		CommonAnnotations:     make(map[string]string),
		PatchesStrategicMerge: make([]patch.StrategicMerge, 0),
		PatchesJson6902:       make([]patch.Json6902, 0),
		Images:                make([]image.Image, 0),
		Vars:                  make([]types.Var, 0),
		Crds:                  make([]string, 0),
		Resources:             make([]string, 0),
		ConfigMapGenerator:    make([]types.ConfigMapArgs, 0),
		SecretGenerator:       make([]types.SecretArgs, 0),
		Configurations:        make([]string, 0),
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
			return nil, &kfapisv3.KfError{
				Code:    int(kfapisv3.INTERNAL_ERROR),
				Message: fmt.Sprintf("error merging kustomization at %v Error %v", baseDir, err),
			}
		}
	}
	if params != nil {
		for _, nv := range params {
			name := nv.Name
			switch name {
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
				return nil, &kfapisv3.KfError{
					Code:    int(kfapisv3.INTERNAL_ERROR),
					Message: fmt.Sprintf("error merging kustomization at %v Error %v", overlayDir, err),
				}
			}
		} else {
			log.Warnf("No overlay %v for component at %v, skipping...", overlayParam, compDir)
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
// TODO(https://github.com/kubeflow/kubeflow/issues/3491): As part of fixing the discovery
// logic we should change the KfDef spec to provide a list of applications (not a map).
// and preserve order when applying them so we can get rid of the logic hard-coding
// moving some applications to the front.
//
// TODO(jlewi): Why is the path split between root and compPath?
// TODO(jlewi): Why is this taking kfDef and writing kfDef? Is this because it is reordering components?
// TODO(jlewi): This function appears to special case handling of using kustomize
// for KfDef. Presumably this is because of the code in coordinator which is using it to generate
// KfDef from overlays. But this function is also used to generate the manifests for the individual
// kustomize packages.
func GenerateKustomizationFile(kfDef *kfdefsv3.KfDef, root string,
	compPath string, overlays []string, params []config.NameValue) error {

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
	compDir := path.Join(root, compPath)
	kustomization, kustomizationErr := MergeKustomizations(kfDef, compDir, overlays, params)
	if kustomizationErr != nil {
		return kustomizationErr
	}
	if kustomization.Namespace == "" {
		kustomization.Namespace = kfDef.Namespace
	}
	//TODO(#2685) we may want to delegate this to separate tooling so kfctl is not dynamically mixing in overlays.
	if len(kustomization.PatchesStrategicMerge) > 0 {
		basename := filepath.Base(string(kustomization.PatchesStrategicMerge[0]))
		basefile := filepath.Join(compDir, "base", basename)
		def, err := ReadUnstructured(basefile)
		if err != nil {
			return err
		}
		apiVersion := def.GetAPIVersion()
		if apiVersion == kfDef.APIVersion {
			// This code is only invoked when using Kustomize to generate the KFDef spec.
			baseKfDef := ReadKfDef(basefile)
			for _, k := range kustomization.PatchesStrategicMerge {
				overlayfile := filepath.Join(compDir, string(k))
				overlay := ReadKfDef(overlayfile)
				mergeErr := mergo.Merge(&baseKfDef.Spec, overlay.Spec, mergo.WithAppendSlice)
				if mergeErr != nil {
					return mergeErr
				}
			}
			//TODO look at sort options
			//See https://github.com/kubernetes-sigs/kustomize/issues/821
			//TODO upgrade to v2.0.4 when available
			if kfDef.Spec.EnableApplications {
				baseKfDef.Spec.Components = moveToFront("application", baseKfDef.Spec.Components)
				baseKfDef.Spec.Components = moveToFront("application-crds", baseKfDef.Spec.Components)
			}
			if kfDef.Spec.UseIstio {
				baseKfDef.Spec.Components = moveToFront("istio", baseKfDef.Spec.Components)
				baseKfDef.Spec.Components = moveToFront("istio-install", baseKfDef.Spec.Components)
				baseKfDef.Spec.Components = moveToFront("istio-crds", baseKfDef.Spec.Components)
			}
			writeErr := WriteKfDef(baseKfDef, basefile)
			if writeErr != nil {
				return writeErr
			}
			kustomization.PatchesStrategicMerge = nil
		}
	}
	buf, bufErr := yaml.Marshal(kustomization)
	if bufErr != nil {
		return bufErr
	}
	kustomizationPath := filepath.Join(compDir, kftypesv3.KustomizationFile)
	kustomizationPathErr := ioutil.WriteFile(kustomizationPath, buf, 0644)
	return kustomizationPathErr
}

// EvaluateKustomizeManifest evaluates the kustomize dir compDir, and returns the resources.
func EvaluateKustomizeManifest(compDir string) (resmap.ResMap, error) {
	factory := k8sdeps.NewFactory()
	fsys := fs.MakeRealFS()
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
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INTERNAL_ERROR),
			Message: fmt.Sprintf("error generating yaml Error %v", yamlResourcesErr),
		}
	}
	kustomizeFile := filepath.Join(kustomizeDir, name+".yaml")
	kustomizationFileErr := ioutil.WriteFile(kustomizeFile, yamlResources, 0644)
	if kustomizationFileErr != nil {
		return &kfapisv3.KfError{
			Code:    int(kfapisv3.INTERNAL_ERROR),
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
		basesMap:                 make(map[string]bool),
		commonAnnotationsMap:     make(map[string]bool),
		commonLabelsMap:          make(map[string]bool),
		imagesMap:                make(map[string]bool),
		resourcesMap:             make(map[string]bool),
		crdsMap:                  make(map[string]bool),
		varsMap:                  make(map[string]bool),
		configurationsMap:        make(map[string]bool),
		configMapGeneratorMap:    make(map[string]bool),
		secretsMapGeneratorMap:   make(map[string]bool),
		patchesStrategicMergeMap: make(map[string]bool),
		patchesJson6902Map:       make(map[string]bool),
	}
}

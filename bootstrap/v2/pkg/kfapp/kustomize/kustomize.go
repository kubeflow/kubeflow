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
	"fmt"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kftypesv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps"
	"sigs.k8s.io/kustomize/v2/pkg/types"
	"strings"

	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	cltypesv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	utilsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/utils"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/v2/core/v1"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"k8s.io/client-go/v2/rest"
	clientcmdapi "k8s.io/client-go/v2/tools/clientcmd/api"
	"os"
	"path"
	"path/filepath"
	"sigs.k8s.io/kustomize/v2/k8sdeps"
	"sigs.k8s.io/kustomize/v2/pkg/factory"
	"sigs.k8s.io/kustomize/v2/pkg/fs"
	"sigs.k8s.io/kustomize/v2/pkg/loader"
	"sigs.k8s.io/kustomize/v2/pkg/target"
)

// Kustomize implements KfApp Interface
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

// A good example is kustomize/pkg/examplelayout/simple
// which creates an instance from a package, this may be the most similar to ksonnet packages
// and is taken from [Declarative Application Management in Kubernetes]
// (https://docs.google.com/document/d/1cLPGweVEYrVqQvBLJg6sxV-TrE5Rm2MNOBA_cxZP2WU)
type kustomize struct {
	cltypesv2.KfDef
	factory    *factory.KustFactory
	fsys       fs.FileSystem
	out        *os.File
	err        *os.File
	componentMap map[string]string
	restConfig *rest.Config
	apiConfig  *clientcmdapi.Config
}

const (
	outputDir    = "kustomize"
	outputFile   = "resources.yaml"
)

func GetKfApp(kfdef *cltypes.KfDef) kftypes.KfApp {
	kfdef2 := cltypesv2.KfDef {
		TypeMeta: metav1.TypeMeta{
			Kind: kfdef.TypeMeta.Kind,
			APIVersion: kfdef.TypeMeta.APIVersion,
		},
		ObjectMeta: metav1.ObjectMeta{
			Name: kfdef.Name,
			Namespace: kfdef.Namespace,
			Labels: kfdef.Labels,
			Annotations: kfdef.Annotations,
			ClusterName: kfdef.ClusterName,
		},
		Spec: kfdef.Spec,
	}
	_kustomize := &kustomize{
		KfDef: kfdef2,
		factory:    k8sdeps.NewFactory(),
		fsys:       fs.MakeRealFS(),
		out:        os.Stdout,
		err:        os.Stderr,
	}
	if _kustomize.Spec.ManifestsRepo != "" {
		_kustomize.componentMap = mapDirs(_kustomize.Spec.ManifestsRepo, make(map[string]string))
	}
	// build restConfig and apiConfig using $HOME/.kube/config if the file exist
	_kustomize.restConfig = kftypesv2.GetConfig()
	_kustomize.apiConfig = kftypesv2.GetKubeConfig()
	return _kustomize
}

func (kustomize *kustomize) Apply(resources kftypes.ResourceEnum) error {
	if kustomize.restConfig == nil || kustomize.apiConfig == nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
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
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create %v %v Error: %v",
					string(kftypes.NAMESPACE), namespace, nsErr),
			}
		}
	}
	kustomizeDir := path.Join(kustomize.Spec.AppDir, outputDir)
	kustomizeFile := filepath.Join(kustomizeDir, outputFile)
	return utilsv2.CreateResourceFromFile(kustomize.restConfig, kustomizeFile)
}

func (kustomize *kustomize) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (kustomize *kustomize) generate() error {
	updateParamFilesErr := kustomize.updateParamFiles()
	if updateParamFilesErr != nil {
		return updateParamFilesErr
	}
	writeKustomizationFileErr := kustomize.writeKustomizationFile()
	if writeKustomizationFileErr != nil {
		return writeKustomizationFileErr
	}
	_loader, loaderErr := loader.NewLoader(kustomize.Spec.ManifestsRepo, kustomize.fsys)
	if loaderErr != nil {
		return fmt.Errorf("could not load kustomize loader: %v", loaderErr)
	}
	defer _loader.Cleanup()
	kt, err := target.NewKustTarget(_loader, kustomize.factory.ResmapF, kustomize.factory.TransformerF)
	if err != nil {
		return err
	}
	allResources, err := kt.MakeCustomizedResMap()
	if err != nil {
		return err
	}
	// Output the objects.
	res, err := allResources.EncodeAsYaml()
	if err != nil {
		return err
	}
	kustomizeDir := path.Join(kustomize.Spec.AppDir, outputDir)
	kustomizeDirErr := os.Mkdir(kustomizeDir, os.ModePerm)
	if kustomizeDirErr != nil {
		log.Fatalf("couldn't create directory %v Error %v", kustomizeDir, kustomizeDirErr)
	}
	kustomizeFile := filepath.Join(kustomizeDir, outputFile)
	kustomizeFileErr := kustomize.fsys.WriteFile(kustomizeFile, res)
	if kustomizeFileErr != nil {
		return kustomizeFileErr
	}
	return err
}

func (kustomize *kustomize) Generate(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.PLATFORM:
	case kftypes.ALL:
		fallthrough
	case kftypes.K8S:
		generateErr := kustomize.generate()
		if generateErr != nil {
			return fmt.Errorf("kustomize generate failed Error: %v", generateErr)
		}
	}
	return nil
}

func (kustomize *kustomize) Init(resources kftypes.ResourceEnum) error {
	parts := strings.Split(kustomize.Spec.PackageManager, "@")
	version := "master"
	if len(parts) == 2 {
		version = parts[1]
	}
	cacheDir, cacheDirErr := kftypes.DownloadToCache(kustomize.Spec.AppDir, kftypes.ManifestsRepo, version)
	if cacheDirErr != nil || cacheDir == "" {
		log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
	}
	kustomize.Spec.ManifestsRepo = cacheDir
	createConfigErr := kustomize.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", kustomize.Spec.AppDir)
	}
	return nil
}

func (kustomize *kustomize) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(kustomize)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(kustomize.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (kustomize *kustomize) writeKustomizationFile() error {
	bases := []string{}
	for _, compName := range kustomize.Spec.Components {
		if val, ok := kustomize.componentMap[compName]; ok {
			bases = append(bases, val)
		}
	}
	kustomization := &types.Kustomization{
		TypeMeta: types.TypeMeta{
			Kind: types.KustomizationKind,
			APIVersion: types.KustomizationVersion,
		},
		Bases: bases,
		CommonLabels: map[string]string{
			"app": kustomize.Name,
		},
		Namespace: kustomize.Namespace,
	}
	buf, bufErr := yaml.Marshal(kustomization)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(kustomize.Spec.ManifestsRepo, kftypes.KustomizationFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (kustomize *kustomize) updateParamFiles() error {
	for _, compName := range kustomize.Spec.Components {
		if val, ok := kustomize.Spec.ComponentParams[compName]; ok {
			paramMap := make(map[string]string)
			for _, nv := range val {
				paramMap[nv.Name] = nv.Value
			}
			compDir := kustomize.componentMap[compName]
			paramFile := filepath.Join(compDir, kftypes.KustomizationParamFile)
			if _, err := os.Stat(paramFile); err == nil {
				params, paramFileErr := readLines(paramFile)
				if paramFileErr != nil {
					return &kfapis.KfError{
						Code:    int(kfapis.INVALID_ARGUMENT),
						Message: fmt.Sprintf("could not open %v. Error: %v", paramFile, paramFileErr),
					}
				}
				for i, param := range params {
					paramName := strings.Split(param, "=")[0]
					if val, ok := paramMap[paramName]; ok {
						params[i] = paramName + "=" + val
					}
				}
				paramFileErr = writeLines(params, paramFile)
				if paramFileErr != nil {
					return &kfapis.KfError{
						Code:    int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("could not update %v. Error: %v", paramFile, paramFileErr),
					}
				}
			}
		}
	}
	return nil
}

func readLines(path string) ([]string, error) {
	file, err := os.Open(path)
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

// writeLines writes the lines to the given file.
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

func mapDirs(dirPath string, leafMap map[string]string) map[string]string {
	files, err := ioutil.ReadDir(dirPath)
	if err != nil {
		return leafMap
	}
	hasDir := false
	for _, f := range files {
		if f.IsDir() {
			hasDir = true
			mapDirs(path.Join(dirPath, f.Name()), leafMap)
		}
	}
	if !hasDir {
		leafMap[path.Base(dirPath)] = dirPath
	}
	return leafMap
}

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
	"fmt"
	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"io/ioutil"
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
	cltypes.KfDef
	factory    *factory.KustFactory
	fsys       fs.FileSystem
	outputFile string
	out        *os.File
	err        *os.File
}

func GetKfApp(kfdef *cltypes.KfDef) kftypes.KfApp {
	_kustomize := &kustomize{
		KfDef: *kfdef,
		factory:    k8sdeps.NewFactory(),
		fsys:       fs.MakeRealFS(),
		outputFile: "output.yaml",
		out:        os.Stdout,
		err:        os.Stderr,
	}
	return _kustomize
}

func (kustomize *kustomize) Apply(resources kftypes.ResourceEnum) error {
	return nil
}

func (kustomize *kustomize) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (kustomize *kustomize) generate() error {
	//TODO see #2629
	kustomizeDir := path.Join(kustomize.Spec.AppDir, "manifests", "master")
	loader, loaderErr := loader.NewLoader(kustomizeDir, kustomize.fsys)
	if loaderErr != nil {
		return fmt.Errorf("could not load kustomize loader: %v", loaderErr)
	}
	defer loader.Cleanup()
	kt, err := target.NewKustTarget(loader, kustomize.factory.ResmapF, kustomize.factory.TransformerF)
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
	kustomizeFile := filepath.Join(kustomize.Spec.AppDir, kustomize.outputFile)
	kustomizeFileErr := kustomize.fsys.WriteFile(kustomizeFile, res)
	if kustomizeFileErr != nil {
		return kustomizeFileErr
	}
	return err
}

// kfctl generate all -V --email <service_account_name>@<project>.iam.gserviceaccount.com
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

// kfctl init kustomize -V --platform kustomize --project <project>
func (kustomize *kustomize) Init(resources kftypes.ResourceEnum) error {
	kustomizeDir := path.Join(kustomize.Spec.AppDir, "manifests")
	kustomizeDirErr := os.Mkdir(kustomizeDir, os.ModePerm)
	if kustomizeDirErr != nil {
		return fmt.Errorf("couldn't create directory %v Error %v", kustomizeDir, kustomizeDirErr)
	}
	//TODO see #2629
	version := kustomize.Spec.Version
	//tarballUrl := "https://github.com/kubeflow/manifests/tarball/" + version + "?archive=tar.gz"
	tarballUrl := "https://github.com/kubeflow/manifests/tarball/master?archive=tar.gz"
	tarballUrlErr := gogetter.GetAny(kustomizeDir, tarballUrl)
	if tarballUrlErr != nil {
		return fmt.Errorf("couldn't download kustomize manifests repo %v Error %v", tarballUrl, tarballUrlErr)
	}
	files, filesErr := ioutil.ReadDir(kustomizeDir)
	if filesErr != nil {
		return fmt.Errorf("couldn't read %v Error %v", kustomizeDir, filesErr)
	}
	subdir := files[0].Name()
	extractedPath := filepath.Join(kustomizeDir, subdir)
	newPath := filepath.Join(kustomizeDir, "master")
	renameErr := os.Rename(extractedPath, newPath)
	if renameErr != nil {
		return fmt.Errorf("couldn't rename %v to %v Error %v", extractedPath, newPath, renameErr)
	}
	repoPath := path.Join(kustomize.Spec.AppDir, kftypes.DefaultCacheDir, version)
	kustomize.Spec.Repo = path.Join(repoPath, "kubeflow")
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

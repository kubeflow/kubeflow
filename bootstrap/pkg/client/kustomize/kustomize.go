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
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"sigs.k8s.io/kustomize/pkg/fs"
	"sigs.k8s.io/kustomize/pkg/loader"
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
	fsys      fs.FileSystem
	out       *os.File
	err       *os.File
	Kustomize *cltypes.Client
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_kustomize := &kustomize{
		fsys: fs.MakeRealFS(),
		out:  os.Stdout,
		err:  os.Stderr,
		Kustomize: &cltypes.Client{
			TypeMeta: metav1.TypeMeta{
				Kind:       "KustomizE",
				APIVersion: "kustomize.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	_kustomize.Kustomize.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	if options[string(kftypes.APPNAME)] != nil {
		_kustomize.Kustomize.Name = options[string(kftypes.APPNAME)].(string)
	}
	if options[string(kftypes.APPDIR)] != nil {
		_kustomize.Kustomize.Spec.AppDir = options[string(kftypes.APPDIR)].(string)
	}
	if options[string(kftypes.NAMESPACE)] != nil {
		namespace := options[string(kftypes.NAMESPACE)].(string)
		_kustomize.Kustomize.Namespace = namespace
	}
	if options[string(kftypes.REPO)] != nil {
		kubeflowRepo := options[string(kftypes.REPO)].(string)
		re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
		goPathVar := os.Getenv("GOPATH")
		if goPathVar != "" {
			kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
		}
		_kustomize.Kustomize.Spec.Repo = path.Join(kubeflowRepo, "kubeflow")
	}
	if options[string(kftypes.VERSION)] != nil {
		kubeflowVersion := options[string(kftypes.VERSION)].(string)
		_kustomize.Kustomize.Spec.Version = kubeflowVersion
	}
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _kustomize.Kustomize)
		if specErr != nil {
			log.Errorf("couldn't unmarshal DATA. Error: %v", specErr)
		}
	}
	return _kustomize
}

func (kustomize *kustomize) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (kustomize *kustomize) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (kustomize *kustomize) generate(options map[string]interface{}) error {
	kustomizeDir := path.Join(kustomize.Kustomize.Spec.AppDir, "kustomize")
	_, loaderErr := loader.NewLoader(kustomizeDir, kustomize.fsys)
	if loaderErr != nil {
		return fmt.Errorf("could not load kustomize loader: %v", loaderErr)
	}
	return nil
}

// kfctl generate all -V --email <service_account_name>@<project>.iam.gserviceaccount.com
func (kustomize *kustomize) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := kustomize.generate(options)
		if generateErr != nil {
			return fmt.Errorf("kustomize generate failed Error: %v", generateErr)
		}
	}
	return nil
}

// kfctl init kustomize -V --platform kustomize --project <project>
func (kustomize *kustomize) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	kustomizeDir := path.Join(kustomize.Kustomize.Spec.AppDir, "kustomize")
	kustomizeDirErr := os.Mkdir(kustomizeDir, os.ModePerm)
	if kustomizeDirErr != nil {
		return fmt.Errorf("couldn't create directory %v Error %v", kustomizeDir, kustomizeDirErr)
	}
	tarballUrl := "https://github.com/kubeflow/kubeflow/tarball/" + kustomize.Kustomize.Spec.Version + "?archive=tar.gz"
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
	newPath := filepath.Join(kustomizeDir, kustomize.Kustomize.Spec.Version)
	renameErr := os.Rename(extractedPath, newPath)
	if renameErr != nil {
		return fmt.Errorf("couldn't rename %v to %v Error %v", extractedPath, newPath, renameErr)
	}
	return nil
}

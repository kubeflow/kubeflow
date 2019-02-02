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

package gcpapp

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"
)

const (
	GCP_CONFIG = "gcp_config"
	K8S_SPECS  = "k8s_specs"
)

// GcpApp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type GcpApp struct {
	ksApp kftypes.KfApp
	//TODO add additional types required for gcp platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_gcpapp := &GcpApp{
		ksApp: ksapp.GetKfApp(options),
	}
	return _gcpapp
}

func (gcpApp *GcpApp) writeConfigFile() error {
	//TODO write files under gcp_config, k8s_specs
	return nil
}

func (gcpApp *GcpApp) Apply(resources kftypes.ResourceEnum) error {
	ksApplyErr := gcpApp.ksApp.Apply(resources)
	if ksApplyErr != nil {
		return fmt.Errorf("gcp apply failed for ksapp: %v", ksApplyErr)
	}
	return nil
}

func (gcpApp *GcpApp) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (gcpApp *GcpApp) copyFile(source string, dest string) error {
	from, err := os.Open(source)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", err)
	}
	defer from.Close()
	to, err := os.OpenFile(dest, os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		return fmt.Errorf("cannot create dest file %v  Error %v", dest, err)
	}
	defer to.Close()
	_, err = io.Copy(to, from)
	if err != nil {
		return fmt.Errorf("copy failed source %v dest %v Error %v", source, dest, err)
	}

	return nil
}

func (gcpApp *GcpApp) generateKsApp() error {
	// ksonnet
	ksApp := gcpApp.ksApp.(*ksapp.KsApp)
	email := ksApp.CfgFile.GetString("email")
	if email == "" {
		return fmt.Errorf("email parameter required for cert-manager")
	}
	ipName := ksApp.CfgFile.GetString("ipName")
	if ipName == "" {
		return fmt.Errorf("ipName parameter required for iap-ingress")
	}
	packages := append(kstypes.DefaultPackages, []string{"gcp"}...)
	ksApp.CfgFile.Set("packages", packages)
	comps := append(kstypes.DefaultComponents, []string{"cloud-endpoints", "cert-manager", "iap-ingress"}...)
	ksApp.CfgFile.Set("components", comps)
	parameters := make(map[string][]string)
	parameters["cert-manager"] = []string{
		"acmeEmail",
		email,
	}
	parameters["iap-ingress"] = []string{
		"ipName",
		ipName,
	}
	parameters["application"] = []string{
		"components",
		"[" + strings.Join(kstypes.QuoteItems(comps), ",") + "]",
	}
	ksApp.CfgFile.Set("parameters", parameters)
	ksGenerateErr := gcpApp.ksApp.Generate(kftypes.ALL)
	if ksGenerateErr != nil {
		return fmt.Errorf("gcp generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (gcpApp *GcpApp) generateDMConfigs() error {
	appDir, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("could not get current directory %v", err)
	}
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.Mkdir(gcpConfigDir, os.ModePerm)
	if gcpConfigDirErr != nil {
		return fmt.Errorf("cannot create directory %v", gcpConfigDirErr)
	}
	ksApp := gcpApp.ksApp.(*ksapp.KsApp)
	repo := ksApp.KsApp.Spec.Repo
	parentDir := path.Dir(repo)
	sourceDir := path.Join(parentDir, "deployment/gke/deployment_manager_configs")
	files := []string{"cluster-kubeflow.yaml", "cluster.jinja", "cluster.jinja.schema"}
	for _, file := range files {
		sourceFile := filepath.Join(sourceDir, file)
		destFile := filepath.Join(gcpConfigDir, file)
		copyErr := gcpApp.copyFile(sourceFile, destFile)
		if copyErr != nil {
			return fmt.Errorf("could not copy %v to %v Error %v", sourceFile, destFile, copyErr)
		}
	}
	iamBindings := map[string]string{
		"from": filepath.Join(sourceDir, "iam_bindings_template.yaml"),
		"to":   filepath.Join(gcpConfigDir, "iam_bindings.yaml"),
	}
	iamBindingsErr := gcpApp.copyFile(iamBindings["from"], iamBindings["to"])
	if iamBindingsErr != nil {
		return fmt.Errorf("could not copy iam_bindings Error %v", iamBindingsErr)
	}
	return nil
}

func (gcpApp *GcpApp) downloadK8sManifests() error {
	appDir, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("could not get current directory %v", err)
	}
	k8sSpecsDir := path.Join(appDir, K8S_SPECS)
	k8sSpecsDirErr := os.Mkdir(k8sSpecsDir, os.ModePerm)
	if k8sSpecsDirErr != nil {
		return fmt.Errorf("cannot create directory %v", k8sSpecsDirErr)
	}
	return nil
}

func (gcpApp *GcpApp) Generate(resources kftypes.ResourceEnum) error {
	switch resources {
	case kftypes.ALL:
		// k8s
		generateK8sSpecsErr := gcpApp.downloadK8sManifests()
		if generateK8sSpecsErr != nil {
			return fmt.Errorf("could not generate files under %v Error: %v", K8S_SPECS, generateK8sSpecsErr)
		}
		fallthrough
	case kftypes.PLATFORM:
		// platform
		gcpConfigFilesErr := gcpApp.generateDMConfigs()
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
		// ksonnet
		ksErr := gcpApp.generateKsApp()
		if ksErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksErr)
		}
	case kftypes.K8S:
		generateK8sSpecsErr := gcpApp.downloadK8sManifests()
		if generateK8sSpecsErr != nil {
			return fmt.Errorf("could not generate files under %v Error: %v", K8S_SPECS, generateK8sSpecsErr)
		}
	}
	return nil
}

func (gcpApp *GcpApp) Init() error {
	ksInitErr := gcpApp.ksApp.Init()
	if ksInitErr != nil {
		return fmt.Errorf("gcp init failed for ksapp: %v", ksInitErr)
	}
	return nil
}

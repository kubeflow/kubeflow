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

package gcp

import (
	"fmt"
	"github.com/ghodss/yaml"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"io/ioutil"
	"regexp"
	/* DEBUG
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	-DEBUG */
	gcptypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/v1alpha1"
	log "github.com/sirupsen/logrus"
	"io"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"strings"
)

const (
	GCP_CONFIG = "gcp_config"
	K8S_SPECS  = "k8s_specs"
)

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type Gcp struct {
	Ksonnet kftypes.KfApp
	GcpApp  *gcptypes.Gcp
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	/* DEBUG
	_ksonnet := ksonnet.GetKfApp(options)
	-DEBUG */
	// NO_DEBUG
	options[string(kftypes.PLATFORM)] = "ksonnet"
	_ksonnet, ksonnetErr := kftypes.LoadPlatform(options)
	if ksonnetErr != nil {
		log.Errorf("loadplatform failed for ksonnet: %v", ksonnetErr)
		return nil
	}
	options[string(kftypes.PLATFORM)] = "gcp"
	// NO_DEBUG //
	_gcp := &Gcp{
		Ksonnet: _ksonnet,
		GcpApp: &gcptypes.Gcp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Gcp",
				APIVersion: "gcp.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _gcp.GcpApp)
		if specErr != nil {
			log.Errorf("couldn't unmarshal GcpApp. Error: %v", specErr)
			return nil
		}
	}
	if options[string(kftypes.PLATFORM)] != nil {
		_gcp.GcpApp.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	}
	if options[string(kftypes.APPNAME)] != nil {
		_gcp.GcpApp.Name = options[string(kftypes.APPNAME)].(string)
	}
	if options[string(kftypes.APPDIR)] != nil {
		_gcp.GcpApp.Spec.AppDir = options[string(kftypes.APPDIR)].(string)
	}
	if options[string(kftypes.NAMESPACE)] != nil {
		namespace := options[string(kftypes.NAMESPACE)].(string)
		_gcp.GcpApp.Namespace = namespace
	}
	if options[string(kftypes.REPO)] != nil {
		kubeflowRepo := options[string(kftypes.REPO)].(string)
		re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
		goPathVar := os.Getenv("GOPATH")
		if goPathVar != "" {
			kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
		}
		_gcp.GcpApp.Spec.Repo = path.Join(kubeflowRepo, "kubeflow")
	}
	if options[string(kftypes.VERSION)] != nil {
		kubeflowVersion := options[string(kftypes.VERSION)].(string)
		_gcp.GcpApp.Spec.Version = kubeflowVersion
	}
	if options[string(kftypes.EMAIL)] != nil {
		email := options[string(kftypes.EMAIL)].(string)
		_gcp.GcpApp.Spec.Email = email
	}
	if options[string(kftypes.ZONE)] != nil {
		zone := options[string(kftypes.ZONE)].(string)
		_gcp.GcpApp.Spec.Zone = zone
	}
	if options[string(kftypes.IPNAME)] != nil {
		ipName := options[string(kftypes.IPNAME)].(string)
		_gcp.GcpApp.Spec.IpName = ipName
	}
	if options[string(kftypes.PROJECT)] != nil {
		project := options[string(kftypes.PROJECT)].(string)
		_gcp.GcpApp.Spec.Project = project
	}
	return _gcp
}

func (gcp *Gcp) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(gcp.GcpApp)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(gcp.GcpApp.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

func (gcp *Gcp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksApplyErr := gcp.Ksonnet.Apply(resources, options)
	if ksApplyErr != nil {
		return fmt.Errorf("gcp apply failed for ksonnet: %v", ksApplyErr)
	}
	return nil
}

func (gcp *Gcp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksDeleteErr := gcp.Ksonnet.Delete(resources, options)
	if ksDeleteErr != nil {
		return fmt.Errorf("gcp delete failed for ksonnet: %v", ksDeleteErr)
	}
	return nil
}

func (gcp *Gcp) copyFile(source string, dest string) error {
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

func (gcp *Gcp) generateKsonnet(options map[string]interface{}) error {
	email := gcp.GcpApp.Spec.Email
	if options[string(kftypes.EMAIL)] != nil {
		email = options[string(kftypes.EMAIL)].(string)
		if email == "" {
			return fmt.Errorf("email parameter required for cert-manager")
		}
	}
	ipName := gcp.GcpApp.Spec.IpName
	if options[string(kftypes.IPNAME)] != nil {
		ipName := options[string(kftypes.IPNAME)].(string)
		if ipName == "" {
			return fmt.Errorf("ipName parameter required for iap-ingress")
		}
	}
	project := gcp.GcpApp.Spec.Project
	if options[string(kftypes.PROJECT)] != nil {
		project = options[string(kftypes.PROJECT)].(string)
		if project == "" {
			return fmt.Errorf("project parameter required for iam_bindings")
		}
	}
	zone := gcp.GcpApp.Spec.Zone
	if options[string(kftypes.ZONE)] != nil {
		zone = options[string(kftypes.ZONE)].(string)
		if zone == "" {
			return fmt.Errorf("zone parameter required for iam_bindings")
		}
	}
	kstypes.DefaultPackages = append(kstypes.DefaultPackages, []string{"gcp"}...)
	kstypes.DefaultComponents = append(kstypes.DefaultComponents, []string{"cloud-endpoints", "cert-manager", "iap-ingress"}...)
	kstypes.DefaultParameters["cert-manager"] = []kstypes.NameValue{
		{
			Name:  "acmeEmail",
			Value: email,
		},
	}
	kstypes.DefaultParameters["iap-ingress"] = []kstypes.NameValue{
		{
			Name:  "ipName",
			Value: ipName,
		},
	}
	kstypes.DefaultParameters["application"] = []kstypes.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kstypes.QuoteItems(kstypes.DefaultComponents), ",") + "]",
		},
	}
	ksGenerateErr := gcp.Ksonnet.Generate(kftypes.ALL, options)
	if ksGenerateErr != nil {
		return fmt.Errorf("gcp generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (gcp *Gcp) replaceText(regex string, repl string, src []byte) []byte {
	re := regexp.MustCompile(regex)
	buf := re.ReplaceAll(src, []byte(repl))
	return buf
}

func (gcp *Gcp) generateDMConfigs(options map[string]interface{}) error {
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.Mkdir(gcpConfigDir, os.ModePerm)
	if gcpConfigDirErr != nil {
		return fmt.Errorf("cannot create directory %v", gcpConfigDirErr)
	}
	repo := gcp.GcpApp.Spec.Repo
	parentDir := path.Dir(repo)
	sourceDir := path.Join(parentDir, "deployment/gke/deployment_manager_configs")
	files := []string{"cluster-kubeflow.yaml", "cluster.jinja", "cluster.jinja.schema"}
	for _, file := range files {
		sourceFile := filepath.Join(sourceDir, file)
		destFile := filepath.Join(gcpConfigDir, file)
		copyErr := gcp.copyFile(sourceFile, destFile)
		if copyErr != nil {
			return fmt.Errorf("could not copy %v to %v Error %v", sourceFile, destFile, copyErr)
		}
	}
	from := filepath.Join(sourceDir, "iam_bindings_template.yaml")
	to := filepath.Join(gcpConfigDir, "iam_bindings.yaml")
	iamBindings := map[string]string{
		"from": from,
		"to":   to,
	}
	iamBindingsErr := gcp.copyFile(iamBindings["from"], iamBindings["to"])
	if iamBindingsErr != nil {
		return fmt.Errorf("could not copy iam_bindings Error %v", iamBindingsErr)
	}
	iamBindingsData, iamBindingsDataErr := ioutil.ReadFile(to) // just pass the file name
	if iamBindingsDataErr != nil {
		return fmt.Errorf("could not read %v Error %v", to, iamBindingsDataErr)
	}
	repl := "serviceAccount:" + gcp.GcpApp.Name + "-admin@" + gcp.GcpApp.Spec.Project + ".iam.gserviceaccount.com"
	iamBindingsData = gcp.replaceText("set-kubeflow-admin-service-account", repl, iamBindingsData)
	repl = "serviceAccount:" + gcp.GcpApp.Name + "-user@" + gcp.GcpApp.Spec.Project + ".iam.gserviceaccount.com"
	iamBindingsData = gcp.replaceText("set-kubeflow-admin-service-account", repl, iamBindingsData)
	repl = "serviceAccount:" + gcp.GcpApp.Name + "-vm@" + gcp.GcpApp.Spec.Project + ".iam.gserviceaccount.com"
	iamBindingsData = gcp.replaceText("set-kubeflow-vm-service-account", repl, iamBindingsData)
	iamEntry := "serviceAccount:" + gcp.GcpApp.Spec.Email
	re := regexp.MustCompile("iam.gserviceaccount.com")
	if !re.MatchString(gcp.GcpApp.Spec.Email) {
		iamEntry = "user:" + gcp.GcpApp.Spec.Email
	}
	iamBindingsData = gcp.replaceText("set-kubeflow-iap-account", iamEntry, iamBindingsData)
	srcErr := ioutil.WriteFile(to, iamBindingsData, 0644)
	if srcErr != nil {
		return fmt.Errorf("cound not write to %v Error %v", to, srcErr)
	}
	return nil
}

func (gcp *Gcp) downloadK8sManifests() error {
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

func (gcp *Gcp) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
		generateK8sSpecsErr := gcp.downloadK8sManifests()
		if generateK8sSpecsErr != nil {
			return fmt.Errorf("could not generate files under %v Error: %v", K8S_SPECS, generateK8sSpecsErr)
		}
		ksonnetErr := gcp.generateKsonnet(options)
		if ksonnetErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksonnetErr)
		}
	case kftypes.ALL:
		gcpConfigFilesErr := gcp.generateDMConfigs(options)
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
		generateK8sSpecsErr := gcp.downloadK8sManifests()
		if generateK8sSpecsErr != nil {
			return fmt.Errorf("could not generate files under %v Error: %v", K8S_SPECS, generateK8sSpecsErr)
		}
		ksonnetErr := gcp.generateKsonnet(options)
		if ksonnetErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksonnetErr)
		}
	case kftypes.PLATFORM:
		gcpConfigFilesErr := gcp.generateDMConfigs(options)
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
		ksonnetErr := gcp.generateKsonnet(options)
		if ksonnetErr != nil {
			return fmt.Errorf("could not generate kssonnet under %v Error: %v", kstypes.KsName, ksonnetErr)
		}
	}
	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.GcpApp.Spec.AppDir)
	}
	return nil
}

func (gcp *Gcp) Init(options map[string]interface{}) error {
	ksInitErr := gcp.Ksonnet.Init(options)
	if ksInitErr != nil {
		return fmt.Errorf("gcp init failed for ksonnet: %v", ksInitErr)
	}
	cacheDir := path.Join(gcp.GcpApp.Spec.AppDir, kftypes.DefaultCacheDir)
	newPath := filepath.Join(cacheDir, gcp.GcpApp.Spec.Version)
	gcp.GcpApp.Spec.Repo = path.Join(newPath, "kubeflow")
	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.GcpApp.Spec.AppDir)
	}
	return nil
}

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
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"regexp"

	gogetter "github.com/hashicorp/go-getter"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	log "github.com/sirupsen/logrus"
)

// Generate the gcp kfapp
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

// TODO(#2515): Switch from string replacement to YAML config.
func (gcp *Gcp) generateDMConfigs(options map[string]interface{}) error {
	// TODO(gabrielwen): Use YAML support instead of string replacement.
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.Mkdir(gcpConfigDir, os.ModePerm)
	if gcpConfigDirErr != nil {
		return fmt.Errorf("cannot create directory %v", gcpConfigDirErr)
	}
	repo := gcp.GcpApp.Spec.Repo
	parentDir := path.Dir(repo)
	sourceDir := path.Join(parentDir, "deployment/gke/deployment_manager_configs")
	files := []string{"cluster-kubeflow.yaml", "cluster.jinja", "cluster.jinja.schema",
		"storage-kubeflow.yaml", "storage.jinja", "storage.jinja.schema"}
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
	adminEmail := getSA(gcp.GcpApp.Name, "admin", gcp.GcpApp.Spec.Project)
	repl := "serviceAccount:" + adminEmail
	iamBindingsData = gcp.replaceText("set-kubeflow-admin-service-account", repl, iamBindingsData)
	userEmail := getSA(gcp.GcpApp.Name, "user", gcp.GcpApp.Spec.Project)
	repl = "serviceAccount:" + userEmail
	iamBindingsData = gcp.replaceText("set-kubeflow-user-service-account", repl, iamBindingsData)
	vmEmail := getSA(gcp.GcpApp.Name, "vm", gcp.GcpApp.Spec.Project)
	repl = "serviceAccount:" + vmEmail
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
	configFile := filepath.Join(gcpConfigDir, CONFIG_FILE)
	configFileData, configFileDataErr := ioutil.ReadFile(configFile)
	if configFileDataErr != nil {
		return fmt.Errorf("could not read %v Error %v", configFile, configFileDataErr)
	}
	storageFile := filepath.Join(gcpConfigDir, STORAGE_FILE)
	storageFileData, storageFileDataErr := ioutil.ReadFile(storageFile)
	if storageFileDataErr != nil {
		return fmt.Errorf("could not read %v Error %v", storageFile, storageFileDataErr)
	}
	configFileData = gcp.replaceText("SET_GKE_API_VERSION", kftypes.DefaultGkeApiVer, configFileData)
	repl = "zone: " + gcp.GcpApp.Spec.Zone
	configFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, configFileData)
	storageFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, storageFileData)
	repl = "users: [\"" + iamEntry + "\"]"
	configFileData = gcp.replaceText("users:", repl, configFileData)
	repl = "ipName: " + gcp.GcpApp.Spec.IpName
	configFileData = gcp.replaceText("ipName: kubeflow-ip", repl, configFileData)
	configFileErr := ioutil.WriteFile(configFile, configFileData, 0644)
	if configFileErr != nil {
		return fmt.Errorf("cound not write to %v Error %v", configFile, configFileErr)
	}
	repl = "createPipelinePersistentStorage: true"
	storageFileData = gcp.replaceText("createPipelinePersistentStorage: SET_CREATE_PIPELINE_PERSISTENT_STORAGE",
		repl, storageFileData)
	storageFileErr := ioutil.WriteFile(storageFile, storageFileData, 0644)
	if storageFileErr != nil {
		return fmt.Errorf("cound not write to %v Error %v", storageFile, storageFileErr)
	}
	return nil
}

func (gcp *Gcp) downloadK8sManifests() error {
	appDir := gcp.GcpApp.Spec.AppDir
	k8sSpecsDir := path.Join(appDir, K8S_SPECS)
	k8sSpecsDirErr := os.Mkdir(k8sSpecsDir, os.ModePerm)
	if k8sSpecsDirErr != nil {
		return fmt.Errorf("cannot create directory %v Error %v", k8sSpecsDir, k8sSpecsDirErr)
	}
	daemonsetPreloaded := filepath.Join(k8sSpecsDir, "daemonset-preloaded.yaml")
	url := "https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/nvidia-driver-installer/cos/daemonset-preloaded.yaml"
	urlErr := gogetter.GetFile(daemonsetPreloaded, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}
	rbacSetup := filepath.Join(k8sSpecsDir, "rbac-setup.yaml")
	url = "https://storage.googleapis.com/stackdriver-kubernetes/stable/rbac-setup.yaml"
	urlErr = gogetter.GetFile(rbacSetup, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}
	agents := filepath.Join(k8sSpecsDir, "agents.yaml")
	url = "https://storage.googleapis.com/stackdriver-kubernetes/stable/agents.yaml"
	urlErr = gogetter.GetFile(agents, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}

	// Download Istio manifests.
	if gcp.GcpApp.Spec.UseIstio {
		istioManifestDir := path.Join(appDir, ISTIO_DIR)
		if err := os.Mkdir(istioManifestDir, os.ModePerm); err != nil {
			return fmt.Errorf("cannot create directory %v Error %v", istioManifestDir, err)
		}
		repo := gcp.GcpApp.Spec.Repo
		parentDir := path.Dir(repo)
		// copy crd
		sourceFile := filepath.Join(parentDir, "dependencies/istio/install/crds.yaml")
		destFile := filepath.Join(istioManifestDir, ISTIO_CRD)
		if err := gcp.copyFile(sourceFile, destFile); err != nil {
			return fmt.Errorf("could not copy %v to %v Error %v", sourceFile, destFile, err)
		}
		// copy istio manifest
		sourceFile = filepath.Join(parentDir, "dependencies/istio/install/istio-noauth.yaml")
		destFile = filepath.Join(istioManifestDir, ISTIO_INSTALL)
		if err := gcp.copyFile(sourceFile, destFile); err != nil {
			return fmt.Errorf("could not copy %v to %v Error %v", sourceFile, destFile, err)
		}
	}

	//TODO - copied from scripts/gke/util.sh. The rbac-setup command won't need admin since the user will be
	// running as admin.
	//  # Install the GPU driver. It has no effect on non-GPU nodes.
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/daemonset-preloaded.yaml
	//  # Install Stackdriver Kubernetes agents.
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/rbac-setup.yaml --as=admin --as-group=system:masters
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/agents.yaml

	return nil
}

func (gcp *Gcp) generateKsonnet(options map[string]interface{}) error {
	configPath := path.Join(gcp.GcpApp.Spec.AppDir,
		kftypes.DefaultCacheDir,
		gcp.GcpApp.Spec.Version,
		kftypes.GcpConfigDir)
	if gcp.GcpApp.Spec.UseBasicAuth {
		configPath = path.Join(configPath, kftypes.GcpBasicAuth)
	} else {
		configPath = path.Join(configPath, kftypes.GcpIapConfig)
	}
	if options[string(kftypes.DefaultConfig)] == nil {
		options[string(kftypes.DefaultConfig)] = configPath
	}

	if options[string(kftypes.EMAIL)] != nil &&
		options[string(kftypes.EMAIL)].(string) != "" {
		gcp.GcpApp.Spec.Email = options[string(kftypes.EMAIL)].(string)
	} else if gcp.GcpApp.Spec.Email == "" {
		return fmt.Errorf("Email is not set in default nor passed.")
	} else {
		options[string(kftypes.EMAIL)] = gcp.GcpApp.Spec.Email
	}
	if options[string(kftypes.IPNAME)] != nil &&
		options[string(kftypes.IPNAME)].(string) != "" {
		gcp.GcpApp.Spec.IpName = options[string(kftypes.IPNAME)].(string)
	} else if gcp.GcpApp.Spec.IpName == "" {
		return fmt.Errorf("ipName is not set in default nor passed.")
	} else {
		log.Infof("Using default ipName: %v", gcp.GcpApp.Spec.IpName)
		options[string(kftypes.IPNAME)] = gcp.GcpApp.Spec.IpName
	}

	if options[string(kftypes.HOSTNAME)] != nil &&
		options[string(kftypes.HOSTNAME)].(string) != "" {
		gcp.GcpApp.Spec.Hostname = options[string(kftypes.HOSTNAME)].(string)
	} else if gcp.GcpApp.Spec.Hostname == "" {
		return fmt.Errorf("hostname is not set in default nor passed.")
	} else {
		log.Infof("Using default hostname: %v", gcp.GcpApp.Spec.Hostname)
		options[string(kftypes.HOSTNAME)] = gcp.GcpApp.Spec.Hostname
	}
	if options[string(kftypes.ZONE)] != nil {
		gcp.GcpApp.Spec.Zone = options[string(kftypes.ZONE)].(string)
	}
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksGenerateErr := ks.Generate(kftypes.ALL, options)
		if ksGenerateErr != nil {
			return fmt.Errorf("gcp generate failed for %v: %v", string(kftypes.KSONNET), ksGenerateErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

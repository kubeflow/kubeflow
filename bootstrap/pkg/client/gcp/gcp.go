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
	gcptypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/v1alpha1"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/serviceusage/v1"
	"io"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

const (
	GCP_CONFIG        = "gcp_config"
	K8S_SPECS         = "k8s_specs"
	SECRETS           = "secrets"
	CONFIG_FILE       = "cluster-kubeflow.yaml"
	STORAGE_FILE      = "storage-kubeflow.yaml"
	ADMIN_SECRET_NAME = "admin-gcp-sa"
	USER_SECRET_NAME  = "user-gcp-sa"
)

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type Gcp struct {
	kftypes.FullKfApp
	GcpApp *gcptypes.Gcp
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	options[string(kftypes.PLATFORM)] = string(kftypes.KSONNET)
	log.Infof("getting ksonnet platform in gcp")
	_ksonnet := ksonnet.GetKfApp(options)
	options[string(kftypes.PLATFORM)] = "gcp"
	_gcp := &Gcp{
		FullKfApp: kftypes.FullKfApp{
			Children: make(map[kftypes.Platform]kftypes.KfApp),
		},
		GcpApp: &gcptypes.Gcp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Gcp",
				APIVersion: "gcp.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	_gcp.Children[kftypes.KSONNET] = _ksonnet
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
	if options[string(kftypes.HOSTNAME)] != nil {
		hostname := options[string(kftypes.HOSTNAME)].(string)
		_gcp.GcpApp.Spec.IpName = hostname
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

func (gcp *Gcp) createDeployment() error {
	return nil
}

func (gcp *Gcp) updateDeployment(deployment string, yamlfile string) error {
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	ctx := context.Background()
	client, clientErr := google.DefaultClient(ctx, deploymentmanager.CloudPlatformScope)
	if clientErr != nil {
		return clientErr
	}
	deploymentmanagerService, err := deploymentmanager.New(client)
	if err != nil {
		return err
	}
	project := gcp.GcpApp.Spec.Project
	resp, err := deploymentmanagerService.Deployments.Get(project, deployment).Context(ctx).Do()
	if err != nil {
		return gcp.createDeployment()
	}
	if resp.Name == gcp.GcpApp.Name {
		filePath := filepath.Join(gcpConfigDir, yamlfile)
		buf, bufErr := ioutil.ReadFile(filePath)
		if bufErr != nil {
			return bufErr
		}
		dp := &deploymentmanager.Deployment{}
		specErr := yaml.Unmarshal(buf, dp)
		if specErr != nil {
			return fmt.Errorf("couldn't unmarshal %v. Error: %v", filePath, specErr)
		}
		_, err := deploymentmanagerService.Deployments.Update(project, deployment, dp).Context(ctx).Do()
		if err != nil {
			return err
		}
	}
	return nil
}

func (gcp *Gcp) updateDM(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	err := gcp.updateDeployment(gcp.GcpApp.Name+"-storage", "storage-kubeflow.yaml")
	if err != nil {
		return fmt.Errorf("could not update %v", "storage-kubeflow.yaml")
	}
	err = gcp.updateDeployment(gcp.GcpApp.Name, CONFIG_FILE)
	if err != nil {
		return fmt.Errorf("could not update %v", CONFIG_FILE)
	}
	err = gcp.updateDeployment(gcp.GcpApp.Name+"-network", "network.yaml")
	if err != nil {
		return fmt.Errorf("could not update %v", "network.yaml")
	}
	err = gcp.updateDeployment(gcp.GcpApp.Name+"-gcfs", "gcfs.yaml")
	if err != nil {
		return fmt.Errorf("could not update %v", "gcfs.yaml")
	}
	return nil
}

func (gcp *Gcp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	updateDMErr := gcp.updateDM(resources, options)
	if updateDMErr != nil {
		return fmt.Errorf("gcp apply could not update deployment manager Error %v", updateDMErr)
	}
	secretsErr := gcp.createSecrets()
	if secretsErr != nil {
		return fmt.Errorf("gcp apply could not create secrets Error %v", secretsErr)
	}
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksApplyErr := ks.Apply(resources, options)
		if ksApplyErr != nil {
			return fmt.Errorf("gcp apply failed for %v: %v", string(kftypes.KSONNET), ksApplyErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

func (gcp *Gcp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksDeleteErr := ks.Delete(resources, options)
		if ksDeleteErr != nil {
			return fmt.Errorf("gcp delete failed for %v: %v", string(kftypes.KSONNET), ksDeleteErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
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
		ipName = options[string(kftypes.IPNAME)].(string)
		if ipName == "" {
			return fmt.Errorf("ipName parameter required for iap-ingress")
		}
	}
	hostname := gcp.GcpApp.Spec.Hostname
	if options[string(kftypes.HOSTNAME)] != nil {
		hostname = options[string(kftypes.HOSTNAME)].(string)
		if hostname == "" {
			return fmt.Errorf("hostname parameter required for iap-ingress")
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
		{
			Name:  "hostname",
			Value: hostname,
		},
	}
	if kstypes.DefaultParameters["jupyter"] != nil {
		namevalues := kstypes.DefaultParameters["jupyter"]
		namevalues = append(namevalues,
			kstypes.NameValue{
				Name:  "jupyterHubAuthenticator",
				Value: "iap",
			},
			kstypes.NameValue{
				Name:  string(kftypes.PLATFORM),
				Value: gcp.GcpApp.Spec.Platform,
			},
		)
	} else {
		kstypes.DefaultParameters["jupyter"] = []kstypes.NameValue{
			{
				Name:  "jupyterHubAuthenticator",
				Value: "iap",
			},
			{
				Name:  string(kftypes.PLATFORM),
				Value: gcp.GcpApp.Spec.Platform,
			},
		}
	}
	if kstypes.DefaultParameters["ambassador"] != nil {
		namevalues := kstypes.DefaultParameters["ambassador"]
		namevalues = append(namevalues,
			kstypes.NameValue{
				Name:  string(kftypes.PLATFORM),
				Value: gcp.GcpApp.Spec.Platform,
			},
		)
	} else {
		kstypes.DefaultParameters["ambassador"] = []kstypes.NameValue{
			{
				Name:  string(kftypes.PLATFORM),
				Value: gcp.GcpApp.Spec.Platform,
			},
		}
	}
	if kstypes.DefaultParameters["pipeline"] != nil {
		namevalues := kstypes.DefaultParameters["pipeline"]
		namevalues = append(namevalues,
			kstypes.NameValue{
				Name:  "mysqlPd",
				Value: gcp.GcpApp.Name + "-storage-pipeline-db",
			},
			kstypes.NameValue{
				Name:  "nfsPd",
				Value: gcp.GcpApp.Name + "-storage-pipeline-nfs",
			},
		)
	} else {
		kstypes.DefaultParameters["pipeline"] = []kstypes.NameValue{
			{
				Name:  "mysqlPd",
				Value: gcp.GcpApp.Name + "-storage-pipeline-db",
			},
			{
				Name:  "nfsPd",
				Value: gcp.GcpApp.Name + "-storage-pipeline-nfs",
			},
		}
	}
	kstypes.DefaultParameters["application"] = []kstypes.NameValue{
		{
			Name:  "components",
			Value: "[" + strings.Join(kstypes.QuoteItems(kstypes.DefaultComponents), ",") + "]",
		},
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
	repl = "zone: " + gcp.GcpApp.Spec.Zone
	configFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, configFileData)
	storageFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, configFileData)
	repl = "users: [\"" + iamEntry + "\"]"
	configFileData = gcp.replaceText("users:", repl, configFileData)
	repl = "ipName:" + gcp.GcpApp.Spec.IpName
	configFileData = gcp.replaceText("ipName: kubeflow-ip", repl, configFileData)
	configFileErr := ioutil.WriteFile(to, configFileData, 0644)
	if configFileErr != nil {
		return fmt.Errorf("cound not write to %v Error %v", configFile, configFileErr)
	}
	repl = "createPipelinePersistentStorage: true"
	storageFileData = gcp.replaceText("createPipelinePersistentStorage: SET_CREATE_PIPELINE_PERSISTENT_STORAGE",
		repl, configFileData)
	storageFileErr := ioutil.WriteFile(to, storageFileData, 0644)
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
	return nil
}

func (gcp *Gcp) createGcpSecret(email string, secretName string) error {
	cli, cliErr := kftypes.GetClientOutOfCluster()
	if cliErr != nil {
		return fmt.Errorf("couldn't create client Error: %v", cliErr)
	}
	namespace := gcp.GcpApp.Name
	secret, secretMissingErr := cli.CoreV1().Secrets(namespace).Get(secretName, metav1.GetOptions{})
	if secretMissingErr != nil {
		ctx := context.Background()
		ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
		if err != nil {
			return err
		}
		client := oauth2.NewClient(ctx, ts)
		iamService, err := iam.New(client)
		if err != nil {
			return err
		}
		name := "projects/" + gcp.GcpApp.Spec.Project + "/serviceAccounts/" + email
		req := &iam.CreateServiceAccountKeyRequest{
			// TODO: Fill request struct fields.
		}
		resp, err := iamService.Projects.ServiceAccounts.Keys.Create(name, req).Context(ctx).Do()
		if err != nil {
			return err
		}
		data, err := resp.MarshalJSON()
		if err != nil {
			return err
		}
		log.Infof("data = %v", data)
	} else {
		return fmt.Errorf("couldn't create %v it already exists with UID %v", secretName, secret.GetUID())
	}
	return nil
}

func (gcp *Gcp) createSecrets() error {
	appDir := gcp.GcpApp.Spec.AppDir
	secretsDir := path.Join(appDir, SECRETS)
	secretsDirErr := os.Mkdir(secretsDir, os.ModePerm)
	if secretsDirErr != nil {
		return fmt.Errorf("cannot create directory %v Error %v", secretsDir, secretsDirErr)
	}
	adminEmail := gcp.GcpApp.Name + "admin@" + gcp.GcpApp.Spec.Project + ".iam.gserviceaccount.com"
	userEmail := gcp.GcpApp.Name + "user@" + gcp.GcpApp.Spec.Project + ".iam.gserviceaccount.com"
	adminSecretErr := gcp.createGcpSecret(adminEmail, ADMIN_SECRET_NAME)
	if adminSecretErr != nil {
		return fmt.Errorf("cannot create admin secret %v Error %v", ADMIN_SECRET_NAME, adminSecretErr)

	}
	userSecretErr := gcp.createGcpSecret(userEmail, USER_SECRET_NAME)
	if userSecretErr != nil {
		return fmt.Errorf("cannot create user secret %v Error %v", USER_SECRET_NAME, userSecretErr)

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

func (gcp *Gcp) gcpInitProject() error {
	ctx := context.Background()
	// doesn't work currently - get invalid_grant
	oauthClient, err := google.DefaultClient(ctx, serviceusage.CloudPlatformScope)
	if err != nil {
		return err
	}
	serviceusageService, err := serviceusage.New(oauthClient)
	_, opErr := serviceusageService.Services.Enable("deploymentmanager.googleapis.com", &serviceusage.EnableServiceRequest{}).Context(ctx).Do()
	if opErr != nil {
		return fmt.Errorf("could not enable deploymentmanager %v", opErr)
	}
	return nil
}

func (gcp *Gcp) Init(options map[string]interface{}) error {
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksInitErr := ks.Init(options)
		if ksInitErr != nil {
			return fmt.Errorf("gcp init failed for %v: %v", string(kftypes.KSONNET), ksInitErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	cacheDir := path.Join(gcp.GcpApp.Spec.AppDir, kftypes.DefaultCacheDir)
	newPath := filepath.Join(cacheDir, gcp.GcpApp.Spec.Version)
	gcp.GcpApp.Spec.Repo = path.Join(newPath, "kubeflow")
	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.GcpApp.Spec.AppDir)
	}
	/* Currently doesn't work
	initProjectErr := gcp.gcpInitProject()
	if initProjectErr != nil {
		return fmt.Errorf("cannot init gcp project %v", initProjectErr)
	}
	*/
	return nil
}

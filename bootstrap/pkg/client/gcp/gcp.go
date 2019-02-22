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
	gogetter "github.com/hashicorp/go-getter"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	gcptypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/v1alpha1"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	kfctlutils "github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	gke "google.golang.org/api/container/v1"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/serviceusage/v1"
	"io"
	"io/ioutil"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

const (
	GCP_CONFIG        = "gcp_config"
	K8S_SPECS         = "k8s_specs"
	SECRETS           = "secrets"
	CONFIG_FILE       = "cluster-kubeflow.yaml"
	STORAGE_FILE      = "storage-kubeflow.yaml"
	NETWORK_FILE      = "network.yaml"
	GCFS_FILE         = "gcfs.yaml"
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
	} else if _gcp.GcpApp.Name != "" {
		_gcp.GcpApp.Spec.IpName = _gcp.GcpApp.Name + "-ip"
	}
	if options[string(kftypes.PROJECT)] != nil {
		project := options[string(kftypes.PROJECT)].(string)
		_gcp.GcpApp.Spec.Project = project
	}
	if options[string(kftypes.HOSTNAME)] != nil {
		hostname := options[string(kftypes.HOSTNAME)].(string)
		_gcp.GcpApp.Spec.Hostname = hostname
	} else if _gcp.GcpApp.Name != "" && _gcp.GcpApp.Spec.Project != "" {
		_gcp.GcpApp.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog", _gcp.GcpApp.Name, _gcp.GcpApp.Spec.Project)
	}
	if options[string(kftypes.GKE_API_VERSION)] != nil {
		_gcp.GcpApp.Spec.GkeApiVersion = options[string(kftypes.GKE_API_VERSION)].(string)
	} else {
		// Default to be v1beta1.
		_gcp.GcpApp.Spec.GkeApiVersion = "v1beta1"
	}
	if options[string(kftypes.USE_BASIC_AUTH)] != nil {
		_gcp.GcpApp.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	}
	if options[string(kftypes.SKIP_INIT_GCP_PROJECT)] != nil {
		skipInitProject := options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
		_gcp.GcpApp.Spec.SkipInitProject = skipInitProject
	}
	return _gcp
}

func getSA(name string, nameSuffix string, project string) string {
	return fmt.Sprintf("%v-%v@%v.iam.gserviceaccount.com", name, nameSuffix, project)
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

func (gcp *Gcp) updateDeployment(deployment string, yamlfile string) error {
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	ctx := context.Background()
	client, clientErr := google.DefaultClient(ctx, deploymentmanager.CloudPlatformScope)
	if clientErr != nil {
		return fmt.Errorf("Error getting DefaultClient: %v", clientErr)
	}
	deploymentmanagerService, err := deploymentmanager.New(client)
	if err != nil {
		return fmt.Errorf("Error creating deploymentmanagerService: %v", err)
	}
	filePath := filepath.Join(gcpConfigDir, yamlfile)
	buf, bufErr := ioutil.ReadFile(filePath)
	if bufErr != nil {
		return fmt.Errorf("Read yamlfile error: %v", bufErr)
	}
	dp := &deploymentmanager.Deployment{
		Name: deployment,
		Target: &deploymentmanager.TargetConfiguration{
			Config: &deploymentmanager.ConfigFile{
				Content: string(buf),
			},
		},
	}

	project := gcp.GcpApp.Spec.Project
	resp, err := deploymentmanagerService.Deployments.Get(project, deployment).Context(ctx).Do()
	if err == nil {
		dp.Fingerprint = resp.Fingerprint
		op, updateErr := deploymentmanagerService.Deployments.Update(project, deployment, dp).Context(ctx).Do()
		if updateErr != nil {
			return fmt.Errorf("Update deployment error: %v", updateErr)
		}
		for {
			nextOp, err := deploymentmanagerService.Operations.Get(project, op.Name).Context(ctx).Do()
			if nextOp.Status == "DONE" {
				return nil
			} else if err != nil {
				return err
			} else {
				log.Infof("Updating deployment %v is on %v, sleep and poll...", deployment, nextOp.Status)
				op = nextOp
				time.Sleep(10000 * time.Millisecond)
			}
		}
	} else {
		log.Infof("Get deployment error, creating: %v", err)
		op, insertErr := deploymentmanagerService.Deployments.Insert(project, dp).Context(ctx).Do()
		if insertErr != nil {
			return fmt.Errorf("Insert deployment error: %v", insertErr)
		}
		for {
			nextOp, err := deploymentmanagerService.Operations.Get(project, op.Name).Context(ctx).Do()
			if nextOp.Status == "DONE" {
				return nil
			} else if err != nil {
				return err
			} else {
				log.Infof("Updating deployment %v is on %v, sleep and poll...", deployment, nextOp.Status)
				op = nextOp
				time.Sleep(10000 * time.Millisecond)
			}
		}
	}
}

func (gcp *Gcp) updateDM(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	if err := gcp.updateDeployment(gcp.GcpApp.Name+"-storage", STORAGE_FILE); err != nil {
		return fmt.Errorf("could not update %v: %v", STORAGE_FILE, err)
	}
	if err := gcp.updateDeployment(gcp.GcpApp.Name, CONFIG_FILE); err != nil {
		return fmt.Errorf("could not update %v: %v", CONFIG_FILE, err)
	}
	if _, networkStatErr := os.Stat(path.Join(gcp.GcpApp.Spec.AppDir, NETWORK_FILE)); !os.IsNotExist(networkStatErr) {
		err := gcp.updateDeployment(gcp.GcpApp.Name+"-network", NETWORK_FILE)
		if err != nil {
			return fmt.Errorf("could not update %v: %v", NETWORK_FILE, err)
		}
	}
	if _, gcfsStatErr := os.Stat(path.Join(gcp.GcpApp.Spec.AppDir, GCFS_FILE)); !os.IsNotExist(gcfsStatErr) {
		err := gcp.updateDeployment(gcp.GcpApp.Name+"-gcfs", GCFS_FILE)
		if err != nil {
			return fmt.Errorf("could not update %v: %v", GCFS_FILE, err)
		}
	}

	policy, policyErr := kfctlutils.GetIamPolicy(gcp.GcpApp.Spec.Project)
	if policyErr != nil {
		return fmt.Errorf("GetIamPolicy error: %v", policyErr)
	}
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	iamPolicy, iamPolicyErr := kfctlutils.ReadIamBindingsYAML(
		filepath.Join(gcpConfigDir, "iam_bindings.yaml"))
	if iamPolicyErr != nil {
		return fmt.Errorf("Read IAM policy YAML error: %v", iamPolicyErr)
	}
	kfctlutils.RewriteIamPolicy(policy, iamPolicy, nil)
	if err := kfctlutils.SetIamPolicy(gcp.GcpApp.Spec.Project, policy); err != nil {
		return fmt.Errorf("SetIamPolicy error: %v", err)
	}

	// TODO(gabrielwen): Set credentials for kubectl context.
	// TODO(gabrielwen): Create a named context.
	// TODO(gabrielwen): Set user as cluster admin.
	// TODO(gabrielwen): Create namespace if necessary.
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

func setNameVal(entries []configtypes.NameValue, name string, val string) {
	for i, nv := range entries {
		if nv.Name == name {
			log.Infof("Setting %v to %v", name, val)
			entries[i].Value = val
			return
		}
	}
	log.Infof("Appending %v as %v", name, val)
	entries = append(entries, configtypes.NameValue{
		Name:  name,
		Value: val,
	})
}

func (gcp *Gcp) generateKsonnet(options map[string]interface{}) error {
	email := gcp.GcpApp.Spec.Email
	configPath := path.Join(gcp.GcpApp.Spec.AppDir,
		kftypes.DefaultCacheDir,
		gcp.GcpApp.Spec.Version,
		kftypes.GcpConfigDir)
	if gcp.GcpApp.Spec.UseBasicAuth {
		configPath = path.Join(configPath, kftypes.GcpBasicAuth)
	} else {
		configPath = path.Join(configPath, kftypes.GcpIapConfig)
	}
	config := &configtypes.Config{}
	if buf, bufErr := ioutil.ReadFile(configPath); bufErr == nil {
		if readErr := yaml.Unmarshal(buf, config); readErr != nil {
			return fmt.Errorf("Unable to parse config: %v", readErr)
		}
	} else {
		return fmt.Errorf("Unable to read config %v: %v", configPath, bufErr)
	}

	config.Repo = gcp.GcpApp.Spec.Repo
	if options[string(kftypes.EMAIL)] != nil {
		email = options[string(kftypes.EMAIL)].(string)
		// TODO(gabrielwen): We should be able to make it optional.
		if email == "" {
			return fmt.Errorf("email parameter required for cert-manager")
		}
	}
	setNameVal(config.ProtoParams["cert-manager"], "acmeEmail", email)
	ipName := gcp.GcpApp.Spec.IpName
	if options[string(kftypes.IPNAME)] != nil {
		ipName = options[string(kftypes.IPNAME)].(string)
		if ipName == "" {
			return fmt.Errorf("ipName parameter required for iap-ingress")
		}
	}
	if gcp.GcpApp.Spec.UseBasicAuth {
		setNameVal(config.ProtoParams["basic-auth-ingress"], "ipName", ipName)
	} else {
		setNameVal(config.ProtoParams["iap-ingress"], "ipName", ipName)
	}
	hostname := gcp.GcpApp.Spec.Hostname
	if options[string(kftypes.HOSTNAME)] != nil {
		hostname = options[string(kftypes.HOSTNAME)].(string)
		if hostname == "" {
			return fmt.Errorf("hostname parameter required for iap-ingress")
		}
	}
	if gcp.GcpApp.Spec.UseBasicAuth {
		setNameVal(config.ProtoParams["basic-auth-ingress"], "hostname", hostname)
	} else {
		setNameVal(config.ProtoParams["iap-ingress"], "hostname", hostname)
	}
	project := gcp.GcpApp.Spec.Project
	if options[string(kftypes.PROJECT)] != nil {
		project = options[string(kftypes.PROJECT)].(string)
		if project == "" {
			return fmt.Errorf("project parameter required for iam_bindings")
		}
		// TODO: ????
	}
	zone := gcp.GcpApp.Spec.Zone
	if options[string(kftypes.ZONE)] != nil {
		zone = options[string(kftypes.ZONE)].(string)
		if zone == "" {
			return fmt.Errorf("zone parameter required for iam_bindings")
		}
		// TODO: ????
	}
	// kstypes.DefaultPackages = append(kstypes.DefaultPackages, []string{"gcp"}...)
	// kstypes.DefaultComponents = append(kstypes.DefaultComponents, []string{"cloud-endpoints", "cert-manager", "iap-ingress"}...)
	// kstypes.DefaultParameters["cert-manager"] = []kstypes.NameValue{
	// 	{
	// 		Name:  "acmeEmail",
	// 		Value: email,
	// 	},
	// }
	// kstypes.DefaultParameters["iap-ingress"] = []kstypes.NameValue{
	// 	{
	// 		Name:  "ipName",
	// 		Value: ipName,
	// 	},
	// 	{
	// 		Name:  "hostname",
	// 		Value: hostname,
	// 	},
	// }
	// if kstypes.DefaultParameters["jupyter"] != nil {
	// 	namevalues := kstypes.DefaultParameters["jupyter"]
	// 	namevalues = append(namevalues,
	// 		kstypes.NameValue{
	// 			Name:  "jupyterHubAuthenticator",
	// 			Value: "iap",
	// 		},
	// 		kstypes.NameValue{
	// 			Name:  string(kftypes.PLATFORM),
	// 			Value: gcp.GcpApp.Spec.Platform,
	// 		},
	// 	)
	// } else {
	// 	kstypes.DefaultParameters["jupyter"] = []kstypes.NameValue{
	// 		{
	// 			Name:  "jupyterHubAuthenticator",
	// 			Value: "iap",
	// 		},
	// 		{
	// 			Name:  string(kftypes.PLATFORM),
	// 			Value: gcp.GcpApp.Spec.Platform,
	// 		},
	// 	}
	// }
	// if kstypes.DefaultParameters["ambassador"] != nil {
	// 	namevalues := kstypes.DefaultParameters["ambassador"]
	// 	namevalues = append(namevalues,
	// 		kstypes.NameValue{
	// 			Name:  string(kftypes.PLATFORM),
	// 			Value: gcp.GcpApp.Spec.Platform,
	// 		},
	// 	)
	// } else {
	// 	kstypes.DefaultParameters["ambassador"] = []kstypes.NameValue{
	// 		{
	// 			Name:  string(kftypes.PLATFORM),
	// 			Value: gcp.GcpApp.Spec.Platform,
	// 		},
	// 	}
	// }
	// if kstypes.DefaultParameters["pipeline"] != nil {
	// 	namevalues := kstypes.DefaultParameters["pipeline"]
	// 	namevalues = append(namevalues,
	// 		kstypes.NameValue{
	// 			Name:  "mysqlPd",
	// 			Value: gcp.GcpApp.Name + "-storage-metadata-store",
	// 		},
	// 		kstypes.NameValue{
	// 			Name:  "nfsPd",
	// 			Value: gcp.GcpApp.Name + "-storage-artifact-store",
	// 		},
	// 	)
	// } else {
	// 	kstypes.DefaultParameters["pipeline"] = []kstypes.NameValue{
	// 		{
	// 			Name:  "mysqlPd",
	// 			Value: gcp.GcpApp.Name + "-storage-metadata-store",
	// 		},
	// 		{
	// 			Name:  "nfsPd",
	// 			Value: gcp.GcpApp.Name + "-storage-artifact-store",
	// 		},
	// 	}
	// }
	setNameVal(config.CompParams["pipline"], "mysqlPd", gcp.GcpApp.Name+"-storage-metadata-store")
	setNameVal(config.CompParams["pipline"], "minioPd", gcp.GcpApp.Name+"-storage-artifact-store")
	setNameVal(config.CompParams["application"], "components",
		"["+strings.Join(kstypes.QuoteItems(kstypes.DefaultComponents), ",")+"]")
	// kstypes.DefaultParameters["application"] = []kstypes.NameValue{
	// 	{
	// 		Name:  "components",
	// 		Value: "[" + strings.Join(kstypes.QuoteItems(kstypes.DefaultComponents), ",") + "]",
	// 	},
	// }
	log.Infof("config afterwards: %+v", config)
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

//TODO(#2515)
func (gcp *Gcp) replaceText(regex string, repl string, src []byte) []byte {
	re := regexp.MustCompile(regex)
	buf := re.ReplaceAll(src, []byte(repl))
	return buf
}

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
	configFileData = gcp.replaceText("SET_GKE_API_VERSION", gcp.GcpApp.Spec.GkeApiVersion, configFileData)
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
	urlErr := gogetter.GetAny(daemonsetPreloaded, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}
	rbacSetup := filepath.Join(k8sSpecsDir, "rbac-setup.yaml")
	url = "https://storage.googleapis.com/stackdriver-kubernetes/stable/rbac-setup.yaml"
	urlErr = gogetter.GetAny(rbacSetup, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}
	agents := filepath.Join(k8sSpecsDir, "agents.yaml")
	url = "https://storage.googleapis.com/stackdriver-kubernetes/stable/agents.yaml"
	urlErr = gogetter.GetAny(agents, url)
	if urlErr != nil {
		return fmt.Errorf("couldn't download %v Error %v", url, urlErr)
	}

	/*TODO
	  # Install the GPU driver. It has no effect on non-GPU nodes.
	  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/daemonset-preloaded.yaml

	  # Install Stackdriver Kubernetes agents.
	  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/rbac-setup.yaml --as=admin --as-group=system:masters
	  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/agents.yaml
	*/

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
		_, secretMissingErr := cli.CoreV1().Secrets(gcp.GcpApp.Namespace).Get(secretName, metav1.GetOptions{})
		if secretMissingErr != nil {
			secretSpec := &v1.Secret{
				ObjectMeta: metav1.ObjectMeta{
					Name:      secretName,
					Namespace: gcp.GcpApp.Namespace,
				},
				Data: map[string][]byte{
					v1.ServiceAccountTokenKey: []byte(data),
				},
			}
			_, nsErr := cli.CoreV1().Secrets(gcp.GcpApp.Namespace).Create(secretSpec)
			if nsErr != nil {
				return fmt.Errorf("couldn't create "+string(kftypes.NAMESPACE)+" %v Error: %v", namespace, nsErr)
			}
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
	adminEmail := getSA(gcp.GcpApp.Name, "admin", gcp.GcpApp.Spec.Project)
	userEmail := getSA(gcp.GcpApp.Name, "user", gcp.GcpApp.Spec.Project)
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

func (gcp *Gcp) getServiceClient(ctx context.Context) (*http.Client, error) {

	// See https://cloud.google.com/docs/authentication/.
	// Use GOOGLE_APPLICATION_CREDENTIALS environment variable to specify
	// a service account key file to authenticate to the API.

	client, err := google.DefaultClient(ctx, gke.CloudPlatformScope)
	if err != nil {
		log.Fatalf("Could not get authenticated client: %v", err)
		return nil, err
	}
	return client, nil
}

func (gcp *Gcp) gcpInitProject() error {
	ctx := context.Background()
	client, clientErr := gcp.getServiceClient(ctx)
	if clientErr != nil {
		return fmt.Errorf("could not create client %v", clientErr)
	}
	serviceusageService, serviceusageServiceErr := serviceusage.New(client)
	if serviceusageServiceErr != nil {
		return fmt.Errorf("could not create service usage service %v", serviceusageServiceErr)
	}

	enabledApis := []string{
		"deploymentmanager.googleapis.com",
		"servicemanagement.googleapis.com",
		"container.googleapis.com",
		"cloudresourcemanager.googleapis.com",
		"endpoints.googleapis.com",
		"file.googleapis.com",
		"ml.googleapis.com",
		"iam.googleapis.com",
		"sqladmin.googleapis.com",
	}
	for _, api := range enabledApis {
		service := fmt.Sprintf("projects/%v/services/%v", gcp.GcpApp.Spec.Project, api)
		_, opErr := serviceusageService.Services.Enable(service, &serviceusage.EnableServiceRequest{}).Context(ctx).Do()
		if opErr != nil {
			return fmt.Errorf("could not enable API service %v: %v", api, opErr)
		}
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

	if !gcp.GcpApp.Spec.SkipInitProject {
		log.Infof("Not skipping GCP project init, running gcpInitProject.")
		initProjectErr := gcp.gcpInitProject()
		if initProjectErr != nil {
			return fmt.Errorf("cannot init gcp project %v", initProjectErr)
		}
	}

	return nil
}

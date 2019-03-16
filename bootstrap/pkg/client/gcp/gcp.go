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
	"cloud.google.com/go/container/apiv1"
	"encoding/base64"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	gcptypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	gke "google.golang.org/api/container/v1"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/option"
	"google.golang.org/api/serviceusage/v1"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"io"
	"io/ioutil"
	v1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"net/http"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

const (
	GCP_CONFIG        = "gcp_config"
	K8S_SPECS         = "k8s_specs"
	CONFIG_FILE       = "cluster-kubeflow.yaml"
	STORAGE_FILE      = "storage-kubeflow.yaml"
	NETWORK_FILE      = "network.yaml"
	GCFS_FILE         = "gcfs.yaml"
	ADMIN_SECRET_NAME = "admin-gcp-sa"
	USER_SECRET_NAME  = "user-gcp-sa"
	KUBEFLOW_OAUTH    = "kubeflow-oauth"
	IMPORTS           = "imports"
	PATH              = "path"
	CLIENT_ID         = "CLIENT_ID"
	CLIENT_SECRET     = "CLIENT_SECRET"
	BASIC_AUTH_SECRET = "kubeflow-login"
)

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type Gcp struct {
	GcpApp *gcptypes.Gcp
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_gcp := &Gcp{
		GcpApp: &gcptypes.Gcp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Client",
				APIVersion: "client.apps.kubeflow.org/v1alpha1",
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
	if options[string(kftypes.CONFIG)] != nil {
		dat := options[string(kftypes.CONFIG)].([]byte)
		specErr := yaml.Unmarshal(dat, &_gcp.GcpApp.Spec)
		if specErr != nil {
			log.Errorf("couldn't unmarshal Ksonnet. Error: %v", specErr)
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
	if options[string(kftypes.ZONE)] != nil &&
		options[string(kftypes.ZONE)].(string) != "" {
		zone := options[string(kftypes.ZONE)].(string)
		_gcp.GcpApp.Spec.Zone = zone
	} else if _gcp.GcpApp.Spec.Zone != "" {
		options[string(kftypes.ZONE)] = _gcp.GcpApp.Spec.Zone
	}
	if options[string(kftypes.IPNAME)] != nil &&
		options[string(kftypes.IPNAME)].(string) != "" {
		ipName := options[string(kftypes.IPNAME)].(string)
		_gcp.GcpApp.Spec.IpName = ipName
	} else if _gcp.GcpApp.Name != "" {
		_gcp.GcpApp.Spec.IpName = _gcp.GcpApp.Name + "-ip"
	}
	if options[string(kftypes.PROJECT)] != nil &&
		options[string(kftypes.PROJECT)].(string) != "" {
		project := options[string(kftypes.PROJECT)].(string)
		_gcp.GcpApp.Spec.Project = project
	} else if _gcp.GcpApp.Spec.Project != "" {
		options[string(kftypes.PROJECT)] = _gcp.GcpApp.Spec.Project
	}
	if options[string(kftypes.HOSTNAME)] != nil &&
		options[string(kftypes.HOSTNAME)].(string) != "" {
		hostname := options[string(kftypes.HOSTNAME)].(string)
		_gcp.GcpApp.Spec.Hostname = hostname
	} else if _gcp.GcpApp.Name != "" && _gcp.GcpApp.Spec.Project != "" {
		_gcp.GcpApp.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog",
			_gcp.GcpApp.Name, _gcp.GcpApp.Spec.Project)
	}
	if options[string(kftypes.USE_BASIC_AUTH)] != nil {
		_gcp.GcpApp.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	}
	if options[string(kftypes.BASIC_AUTH_USERNAME)] != nil {
		_gcp.GcpApp.Spec.BasicAuthUsername = options[string(kftypes.BASIC_AUTH_USERNAME)].(string)
	}
	if options[string(kftypes.BASIC_AUTH_PASSWORD)] != nil {
		_gcp.GcpApp.Spec.BasicAuthPassword = options[string(kftypes.BASIC_AUTH_PASSWORD)].(string)
	}
	if options[string(kftypes.SKIP_INIT_GCP_PROJECT)] != nil {
		skipInitProject := options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
		_gcp.GcpApp.Spec.SkipInitProject = skipInitProject
	}
	return _gcp
}

func GetClusterInfo(ctx context.Context, project string, loc string, cluster string) (*containerpb.Cluster, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	getClusterReq := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone:      loc,
		ClusterId: cluster,
	}
	return c.GetCluster(ctx, getClusterReq)
}

// BuildConfigFromClusterInfo returns k8s config using gcloud Application Default Credentials
// typically $HOME/.config/gcloud/application_default_credentials.json
func BuildConfigFromClusterInfo(ctx context.Context, cluster *containerpb.Cluster) (*rest.Config, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	t, err := ts.Token()
	if err != nil {
		return nil, fmt.Errorf("Token retrieval error: %v", err)
	}
	caDec, _ := base64.StdEncoding.DecodeString(cluster.MasterAuth.ClusterCaCertificate)
	config := &rest.Config{
		Host:        "https://" + cluster.Endpoint,
		BearerToken: t.AccessToken,
		TLSClientConfig: rest.TLSClientConfig{
			CAData: []byte(string(caDec)),
		},
	}
	return config, nil
}

func getSA(name string, nameSuffix string, project string) string {
	return fmt.Sprintf("%v-%v@%v.iam.gserviceaccount.com", name, nameSuffix, project)
}

func (gcp *Gcp) writeConfigFile(options map[string]interface{}) error {
	buf, bufErr := yaml.Marshal(gcp.GcpApp)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(gcp.GcpApp.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	buf, bufErr = yaml.Marshal(&gcp.GcpApp.Spec)
	if bufErr != nil {
		return bufErr
	}
	options[string(kftypes.CONFIG)] = buf
	return nil
}

// Simple deploymentmanager.TargetConfiguration factory method. This method assumes imported paths
// are all within the same filesystem. From gcloud CLI source codes it appears URL is a possible
// option. We might need to update this method or find a way to work with Python source code from
// gcloud.
func generateTarget(configPath string) (*deploymentmanager.TargetConfiguration, error) {
	if !filepath.IsAbs(configPath) {
		if p, err := filepath.Abs(configPath); err != nil {
			return nil, fmt.Errorf("Getting absolute path error: %v", err)
		} else {
			configPath = p
		}
	}
	log.Infof("Reading config file: %v", configPath)
	configBuf, bufErr := ioutil.ReadFile(configPath)
	if bufErr != nil {
		return nil, fmt.Errorf("Reading config file error: %v", bufErr)
	}
	targetConfig := &deploymentmanager.TargetConfiguration{
		Config: &deploymentmanager.ConfigFile{
			Content: string(configBuf),
		},
	}

	var config map[string]interface{}
	if err := yaml.Unmarshal(configBuf, &config); err != nil {
		return nil, fmt.Errorf("Unable to read YAML: %v", err)
	}
	if _, ok := config[IMPORTS]; !ok {
		return targetConfig, nil
	}

	entries := config[IMPORTS].([]interface{})
	dirName := filepath.Dir(configPath)
	for _, entry := range entries {
		entryMap := entry.(map[string]interface{})
		if _, ok := entryMap[PATH]; !ok {
			continue
		}
		importPath := entryMap[PATH].(string)
		if !filepath.IsAbs(importPath) {
			importPath = path.Join(dirName, importPath)
		}
		log.Infof("Reading import file: %v", importPath)
		if buf, err := ioutil.ReadFile(importPath); err == nil {
			targetConfig.Imports = append(targetConfig.Imports, &deploymentmanager.ImportFile{
				Name:    entryMap[PATH].(string),
				Content: string(buf),
			})
		} else {
			return nil, fmt.Errorf("error reading import file: %v", err)
		}
	}
	return targetConfig, nil
}

func (gcp *Gcp) getK8sClientset(ctx context.Context) (*clientset.Clientset, error) {
	cluster, err := GetClusterInfo(ctx, gcp.GcpApp.Spec.Project,
		gcp.GcpApp.Spec.Zone, gcp.GcpApp.Name)
	if err != nil {
		return nil, fmt.Errorf("get Cluster error: %v", err)
	}
	config, err := BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return nil, fmt.Errorf("build ClientConfig error: %v", err)
	}

	return clientset.NewForConfig(config)
}

func blockingWait(project string, opName string, deploymentmanagerService *deploymentmanager.Service,
	ctx context.Context) error {
	// Explicitly copy string to avoid memory leak.
	p := "" + project
	name := "" + opName
	return backoff.Retry(func() error {
		op, err := deploymentmanagerService.Operations.Get(p, name).Context(ctx).Do()
		if op.Status == "DONE" {
			if op.HttpErrorStatusCode > 0 {
				return backoff.Permanent(fmt.Errorf("Deployment error(%v): %v",
					op.HttpErrorStatusCode, op.HttpErrorMessage))
			}
			log.Infof("Deployment service is finished: %v", op.Status)
			return nil
		} else if err != nil {
			return backoff.Permanent(fmt.Errorf("Deployment error: %v", err))
		}
		log.Warnf("Deployment service is not ready: %v", op.Status)
		name = op.Name
		return fmt.Errorf("Deployment is not ready: %v", op.Status)
	}, backoff.NewExponentialBackOff())
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
	dp := &deploymentmanager.Deployment{
		Name: deployment,
	}
	if target, targetErr := generateTarget(filePath); targetErr != nil {
		return targetErr
	} else {
		dp.Target = target
	}

	project := gcp.GcpApp.Spec.Project
	resp, err := deploymentmanagerService.Deployments.Get(project, deployment).Context(ctx).Do()
	if err == nil {
		dp.Fingerprint = resp.Fingerprint
		op, updateErr := deploymentmanagerService.Deployments.Update(project, deployment, dp).Context(ctx).Do()
		if updateErr != nil {
			return fmt.Errorf("Update deployment error: %v", updateErr)
		}
		return blockingWait(project, op.Name, deploymentmanagerService, ctx)
	} else {
		log.Infof("Get deployment error, creating: %v", err)
		op, insertErr := deploymentmanagerService.Deployments.Insert(project, dp).Context(ctx).Do()
		if insertErr != nil {
			return fmt.Errorf("Insert deployment error: %v", insertErr)
		}
		return blockingWait(project, op.Name, deploymentmanagerService, ctx)
	}
}

func createNamespace(k8sClientset *clientset.Clientset, namespace string) error {
	log.Infof("Creating namespace: %v", namespace)
	_, err := k8sClientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if err == nil {
		log.Infof("Namespace already exists...")
		return nil
	}
	log.Infof("Get namespace error: %v", err)
	_, err = k8sClientset.CoreV1().Namespaces().Create(
		&v1.Namespace{
			ObjectMeta: metav1.ObjectMeta{
				Name: namespace,
			},
		},
	)
	return err
}

func bindAdmin(k8sClientset *clientset.Clientset, user string) error {
	log.Infof("Binding admin role for %v ...", user)
	defaultAdmin := "default-admin"
	_, err := k8sClientset.RbacV1().ClusterRoleBindings().Get(defaultAdmin,
		metav1.GetOptions{
			TypeMeta: metav1.TypeMeta{
				APIVersion: "rbac.authorization.k8s.io/v1beta1",
				Kind:       "ClusterRoleBinding",
			},
		})

	binding := &rbacv1.ClusterRoleBinding{
		TypeMeta: metav1.TypeMeta{
			APIVersion: "rbac.authorization.k8s.io/v1beta1",
			Kind:       "ClusterRoleBinding",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name: "default-admin",
		},
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     "cluster-admin",
		},
		Subjects: []rbacv1.Subject{
			{
				Kind: rbacv1.UserKind,
				Name: user,
			},
		},
	}
	if err == nil {
		log.Infof("Updating default-admin...")
		_, err = k8sClientset.RbacV1().ClusterRoleBindings().Update(binding)
	} else {
		log.Infof("default-admin not found, creating...")
		_, err = k8sClientset.RbacV1().ClusterRoleBindings().Create(binding)
	}
	return err
}

func (gcp *Gcp) ConfigK8s() error {
	ctx := context.Background()
	k8sClientset, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return err
	}
	if err = createNamespace(k8sClientset, gcp.GcpApp.Namespace); err != nil {
		return fmt.Errorf("Creating namespace error: %v", err)
	}
	if err = bindAdmin(k8sClientset, gcp.GcpApp.Spec.Email); err != nil {
		return fmt.Errorf("Binding user as admin error: %v", err)
	}

	return nil
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

	policy, policyErr := utils.GetIamPolicy(gcp.GcpApp.Spec.Project)
	if policyErr != nil {
		return fmt.Errorf("GetIamPolicy error: %v", policyErr)
	}
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	iamPolicy, iamPolicyErr := utils.ReadIamBindingsYAML(
		filepath.Join(gcpConfigDir, "iam_bindings.yaml"))
	if iamPolicyErr != nil {
		return fmt.Errorf("Read IAM policy YAML error: %v", iamPolicyErr)
	}
	clearedPolicy := utils.GetClearedIamPolicy(policy, iamPolicy)
	if err := utils.SetIamPolicy(gcp.GcpApp.Spec.Project, clearedPolicy); err != nil {
		return fmt.Errorf("Set Cleared IamPolicy error: %v", err)
	}
	newPolicy, err := utils.RewriteIamPolicy(policy, iamPolicy)
	if err := utils.SetIamPolicy(gcp.GcpApp.Spec.Project, newPolicy); err != nil {
		return fmt.Errorf("Set New IamPolicy error: %v", err)
	}

	if err := gcp.ConfigK8s(); err != nil {
		return fmt.Errorf("Configure K8s is failed: %v", err)
	}

	ctx := context.Background()
	cluster, err := GetClusterInfo(ctx, gcp.GcpApp.Spec.Project,
		gcp.GcpApp.Spec.Zone, gcp.GcpApp.Name)
	if err != nil {
		return fmt.Errorf("Get Cluster error: %v", err)
	}
	client, err := BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return fmt.Errorf("Build ClientConfig error: %v", err)
	}

	// TODO(#2604): Need to create a named context.
	cred_cmd := exec.Command("gcloud", "container", "clusters", "get-credentials",
		gcp.GcpApp.Name,
		"--zone="+gcp.GcpApp.Spec.Zone,
		"--project="+gcp.GcpApp.Spec.Project)
	cred_cmd.Stdout = os.Stdout
	log.Infof("Running get-credentials ...")
	if err = cred_cmd.Run(); err != nil {
		return fmt.Errorf("Error when running gcloud container clusters get-credentials: %v", err)
	}

	k8sSpecsDir := path.Join(appDir, K8S_SPECS)
	daemonsetPreloaded := filepath.Join(k8sSpecsDir, "daemonset-preloaded.yaml")
	daemonsetPreloadedErr := utils.RunKubectlApply(daemonsetPreloaded)
	if daemonsetPreloadedErr != nil {
		return fmt.Errorf("could not create resources in daemonset-preloaded.yaml %v", daemonsetPreloadedErr)
	}
	adminClient := rest.CopyConfig(client)
	adminClient.Impersonate.UserName = "admin"
	adminClient.Impersonate.Groups = []string{"system:masters"}
	rbacSetup := filepath.Join(k8sSpecsDir, "rbac-setup.yaml")
	rbacSetupErr := utils.RunKubectlApply(rbacSetup)
	if rbacSetupErr != nil {
		return fmt.Errorf("could not create resources in rbac-setup.yaml %v", rbacSetupErr)
	}
	agents := filepath.Join(k8sSpecsDir, "agents.yaml")
	agentsErr := utils.RunKubectlApply(agents)
	if agentsErr != nil {
		return fmt.Errorf("could not create resources in agents.yaml %v", agents)
	}
	return nil
}

func (gcp *Gcp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	updateDMErr := gcp.updateDM(resources, options)
	if updateDMErr != nil {
		return fmt.Errorf("gcp apply could not update deployment manager Error %v", updateDMErr)
	}
	secretsErr := gcp.createSecrets(options)
	if secretsErr != nil {
		return fmt.Errorf("gcp apply could not create secrets Error %v", secretsErr)
	}
	return nil
}

func (gcp *Gcp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
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

func setNameVal(entries *[]configtypes.NameValue, name string, val string, required bool) {
	for i, nv := range *entries {
		if nv.Name == name {
			log.Infof("Setting %v to %v", name, val)
			(*entries)[i].Value = val
			return
		}
	}
	log.Infof("Appending %v as %v", name, val)
	*entries = append(*entries, configtypes.NameValue{
		Name:         name,
		Value:        val,
		InitRequired: required,
	})
}

//TODO(#2515)
func (gcp *Gcp) replaceText(regex string, repl string, src []byte) []byte {
	re := regexp.MustCompile(regex)
	buf := re.ReplaceAll(src, []byte(repl))
	return buf
}

// TODO(#2515): Switch from string replacement to YAML config.
func (gcp *Gcp) generateDMConfigs(options map[string]interface{}) error {
	// TODO(gabrielwen): Use YAML support instead of string replacement.
	appDir := gcp.GcpApp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.MkdirAll(gcpConfigDir, os.ModePerm)
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
	k8sSpecsDirErr := os.MkdirAll(k8sSpecsDir, os.ModePerm)
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

	//TODO - copied from scripts/gke/util.sh. The rbac-setup command won't need admin since the user will be
	// running as admin.
	//  # Install the GPU driver. It has no effect on non-GPU nodes.
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/daemonset-preloaded.yaml
	//  # Install Stackdriver Kubernetes agents.
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/rbac-setup.yaml --as=admin --as-group=system:masters
	//  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/agents.yaml

	return nil
}

// Write configuration to cluster as secret.
func (gcp *Gcp) writeGcpSecret(client *clientset.Clientset, secretName string, data map[string][]byte) error {
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      secretName,
			Namespace: gcp.GcpApp.Namespace,
		},
		Data: data,
	}
	_, err := client.CoreV1().Secrets(gcp.GcpApp.Namespace).Create(secret)
	return err
}

// Create key for service account and write to GCP as secret.
func (gcp *Gcp) createGcpServiceAcctSecret(ctx context.Context, client *clientset.Clientset,
	email string, secretName string) error {
	namespace := gcp.GcpApp.Namespace
	_, err := client.CoreV1().Secrets(namespace).Get(secretName, metav1.GetOptions{})
	if err == nil {
		log.Infof("Secret for %v already exists ...", secretName)
		return nil
	}

	log.Infof("Secret for %v not found, creating ...", secretName)
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return fmt.Errorf("Get IAM token source error: %v", err)
	}
	oClient := oauth2.NewClient(ctx, ts)
	iamService, err := iam.New(oClient)
	if err != nil {
		return fmt.Errorf("Get Oauth client error: %v", err)
	}
	name := fmt.Sprintf("projects/%v/serviceAccounts/%v", gcp.GcpApp.Spec.Project,
		email)
	req := &iam.CreateServiceAccountKeyRequest{
		KeyAlgorithm:   "KEY_ALG_RSA_2048",
		PrivateKeyType: "TYPE_GOOGLE_CREDENTIALS_FILE",
	}
	saKey, err := iamService.Projects.ServiceAccounts.Keys.Create(name, req).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("Service account key creation error: %v", err)
	}
	privateKeyData, err := base64.StdEncoding.DecodeString(saKey.PrivateKeyData)
	if err != nil {
		return fmt.Errorf("PrivateKeyData decoding error: %v", err)
	}
	return gcp.writeGcpSecret(client, secretName, map[string][]byte{
		secretName + ".json": privateKeyData,
	})
}

// User CLIENT_ID and CLIENT_SECRET from GCP to create a secret for IAP.
func (gcp *Gcp) createIapSecret(ctx context.Context, client *clientset.Clientset,
	options map[string]interface{}) error {
	if _, err := client.CoreV1().Secrets(gcp.GcpApp.Namespace).
		Get(KUBEFLOW_OAUTH, metav1.GetOptions{}); err == nil {
		log.Infof("Secret for %v already exits ...", KUBEFLOW_OAUTH)
		return nil
	}
	oauthId := ""
	if options[string(kftypes.OAUTH_ID)] != nil &&
		options[string(kftypes.OAUTH_ID)].(string) != "" {
		oauthId = options[string(kftypes.OAUTH_ID)].(string)
	} else {
		oauthId = os.Getenv(CLIENT_ID)
	}
	if oauthId == "" && !gcp.GcpApp.Spec.UseBasicAuth {
		return fmt.Errorf("At least one of --%v or ENV `%v` needs to be set.",
			string(kftypes.OAUTH_ID), CLIENT_ID)
	}
	oauthSecret := ""
	if options[string(kftypes.OAUTH_SECRET)] != nil &&
		options[string(kftypes.OAUTH_SECRET)].(string) != "" {
		oauthSecret = options[string(kftypes.OAUTH_SECRET)].(string)
	} else {
		oauthSecret = os.Getenv(CLIENT_SECRET)
	}
	if oauthSecret == "" && !gcp.GcpApp.Spec.UseBasicAuth {
		return fmt.Errorf("At least one of --%v or ENV `%v` needs to be set.",
			string(kftypes.OAUTH_SECRET), CLIENT_SECRET)
	}
	return gcp.writeGcpSecret(client, KUBEFLOW_OAUTH, map[string][]byte{
		strings.ToLower(CLIENT_ID):     []byte(oauthId),
		strings.ToLower(CLIENT_SECRET): []byte(oauthSecret),
	})
}

// Use username and password provided by user and create secret for basic auth.
func (gcp *Gcp) createBasicAuthSecret(client *clientset.Clientset, options map[string]interface{}) error {
	encodedPasswordHash := base64.StdEncoding.EncodeToString([]byte(gcp.GcpApp.Spec.BasicAuthPassword))
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      BASIC_AUTH_SECRET,
			Namespace: gcp.GcpApp.Namespace,
		},
		Data: map[string][]byte{
			"username":     []byte(gcp.GcpApp.Spec.BasicAuthUsername),
			"passwordhash": []byte(encodedPasswordHash),
		},
	}
	_, err := client.CoreV1().Secrets(gcp.GcpApp.Namespace).Update(secret)
	if err != nil {
		log.Warnf("Updating basic auth login is failed, trying to create one: %v", err)
		_, err = client.CoreV1().Secrets(gcp.GcpApp.Namespace).Create(secret)
	}
	return err
}

func (gcp *Gcp) createSecrets(options map[string]interface{}) error {
	ctx := context.Background()
	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return fmt.Errorf("Get K8s clientset error: %v", err)
	}
	adminEmail := getSA(gcp.GcpApp.Name, "admin", gcp.GcpApp.Spec.Project)
	userEmail := getSA(gcp.GcpApp.Name, "user", gcp.GcpApp.Spec.Project)
	if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME); err != nil {
		return fmt.Errorf("cannot create admin secret %v Error %v", ADMIN_SECRET_NAME, err)

	}
	if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME); err != nil {
		return fmt.Errorf("cannot create user secret %v Error %v", USER_SECRET_NAME, err)

	}
	if gcp.GcpApp.Spec.UseBasicAuth {
		if err := gcp.createBasicAuthSecret(k8sClient, options); err != nil {
			return fmt.Errorf("cannot create basic auth login secret: %v", err)
		}
	} else {
		if err := gcp.createIapSecret(ctx, k8sClient, options); err != nil {
			return fmt.Errorf("cannot create IAP auth secret: %v", err)
		}
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
	case kftypes.ALL:
		gcpConfigFilesErr := gcp.generateDMConfigs(options)
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
		generateK8sSpecsErr := gcp.downloadK8sManifests()
		if generateK8sSpecsErr != nil {
			return fmt.Errorf("could not generate files under %v Error: %v", K8S_SPECS, generateK8sSpecsErr)
		}
	case kftypes.PLATFORM:
		gcpConfigFilesErr := gcp.generateDMConfigs(options)
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
	}
	email := options[string(kftypes.EMAIL)].(string)
	nv := gcp.GcpApp.Spec.ComponentParams["cert-manager"]
	setNameVal(&nv, "acmeEmail", email, true)
	ipName := options[string(kftypes.IPNAME)].(string)
	if ipName == "" {
		ipName = gcp.GcpApp.Name + "-ip"
	}
	hostname := options[string(kftypes.HOSTNAME)].(string)
	if hostname == "" {
		hostname = gcp.GcpApp.Name + ".endpoints." + gcp.GcpApp.Spec.Project + ".cloud.goog"
	}
	if gcp.GcpApp.Spec.UseBasicAuth {
		nv = gcp.GcpApp.Spec.ComponentParams["basic-auth-ingress"]
		setNameVal(&nv, "ipName", ipName, true)
		setNameVal(&nv, "hostname", hostname, true)
	} else {
		nv = gcp.GcpApp.Spec.ComponentParams["iap-ingress"]
		setNameVal(&nv, "ipName", ipName, true)
		setNameVal(&nv, "hostname", hostname, true)
	}
	nv = gcp.GcpApp.Spec.ComponentParams["pipeline"]
	setNameVal(&nv, "mysqlPd", gcp.GcpApp.Name+"-storage-metadata-store", false)
	setNameVal(&nv, "minioPd", gcp.GcpApp.Name+"-storage-artifact-store", false)
	createConfigErr := gcp.writeConfigFile(options)
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
		log.Fatalf("Could not authenticate client: %v", err)
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

func (gcp *Gcp) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	cacheDir := path.Join(gcp.GcpApp.Spec.AppDir, kftypes.DefaultCacheDir)
	newPath := filepath.Join(cacheDir, gcp.GcpApp.Spec.Version)
	gcp.GcpApp.Spec.Repo = path.Join(newPath, "kubeflow")
	createConfigErr := gcp.writeConfigFile(options)
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

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
	"encoding/base64"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/deckarep/golang-set"
	"github.com/ghodss/yaml"
	bootstrap "github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	gke "google.golang.org/api/container/v1"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/googleapi"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/serviceusage/v1"
	"io"
	"io/ioutil"
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"net/http"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

// TODO: golint complains that we should not use all capital var name.
const (
	GCP_CONFIG        = "gcp_config"
	K8S_SPECS         = "k8s_specs"
	CONFIG_FILE       = "cluster-kubeflow.yaml"
	STORAGE_FILE      = "storage-kubeflow.yaml"
	NETWORK_FILE      = "network.yaml"
	GCFS_FILE         = "gcfs.yaml"
	ISTIO_DIR         = "istio"
	ADMIN_SECRET_NAME = "admin-gcp-sa"
	USER_SECRET_NAME  = "user-gcp-sa"
	KUBEFLOW_OAUTH    = "kubeflow-oauth"
	IMPORTS           = "imports"
	PATH              = "path"
	CLIENT_ID         = "CLIENT_ID"
	CLIENT_SECRET     = "CLIENT_SECRET"
	BASIC_AUTH_SECRET = "kubeflow-login"
)

// The namespace for Istio
const IstioNamespace = "istio-system"

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type Gcp struct {
	kfdefs.KfDef
}

// GetKfApp returns the gcp kfapp. It's called by coordinator.GetKfApp
func GetKfApp(kfdef *kfdefs.KfDef) kftypes.KfApp {
	_gcp := &Gcp{
		KfDef: *kfdef,
	}
	return _gcp
}

func getSA(name string, nameSuffix string, project string) string {
	return fmt.Sprintf("%v-%v@%v.iam.gserviceaccount.com", name, nameSuffix, project)
}

// if --email is not supplied try and the get account info using gmail
func GetAccount() (string, error) {
	output, err := exec.Command("gcloud", "config", "get-value", "account").Output()
	if err != nil {
		return "", fmt.Errorf("could not call 'gcloud config get-value account': %v", err)
	}
	account := string(output)
	return strings.TrimSpace(account), nil
}

func (gcp *Gcp) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(gcp)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(gcp.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
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
	cluster, err := utils.GetClusterInfo(ctx, gcp.Spec.Project,
		gcp.Spec.Zone, gcp.Name)
	if err != nil {
		return nil, fmt.Errorf("get Cluster error: %v", err)
	}
	config, err := utils.BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return nil, fmt.Errorf("build ClientConfig error: %v", err)
	}

	return clientset.NewForConfig(config)
}

func blockingWait(project string, opName string, deploymentmanagerService *deploymentmanager.Service,
	ctx context.Context, logPrefix string) error {
	// Explicitly copy string to avoid memory leak.
	p := "" + project
	name := "" + opName
	return backoff.Retry(func() error {
		op, err := deploymentmanagerService.Operations.Get(p, name).Context(ctx).Do()

		if err != nil {
			return backoff.Permanent(fmt.Errorf("%v error: %v", logPrefix, err))
		}
		if op.Error != nil {
			for _, e := range op.Error.Errors {
				log.Errorf("%v error: %+v", logPrefix, e)
			}
		}
		if op.Status == "DONE" {
			if op.HttpErrorStatusCode > 0 {
				return backoff.Permanent(fmt.Errorf("%v error(%v): %v",
					logPrefix,
					op.HttpErrorStatusCode, op.HttpErrorMessage))
			}
			log.Infof("%v is finished: %v", logPrefix, op.Status)
			return nil
		}
		log.Warnf("%v status: %v (op = %v)", logPrefix, op.Status, op.Name)
		name = op.Name
		return fmt.Errorf("%v did not succeed; status: %v (op = %v)", logPrefix, op.Status, op.Name)
	}, backoff.NewExponentialBackOff())
}

func (gcp *Gcp) updateDeployment(deployment string, yamlfile string) error {
	appDir := gcp.Spec.AppDir
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

	project := gcp.Spec.Project
	resp, err := deploymentmanagerService.Deployments.Get(project, deployment).Context(ctx).Do()
	if err == nil {
		dp.Fingerprint = resp.Fingerprint
		log.Infof("Updating deployment %v", deployment)
		op, updateErr := deploymentmanagerService.Deployments.Update(project, deployment, dp).Context(ctx).Do()
		if updateErr != nil {
			return fmt.Errorf("Update deployment error: %v", updateErr)
		}
		return blockingWait(project, op.Name, deploymentmanagerService, ctx,
			"Updating "+deployment)
	} else {
		log.Infof("Creating deployment %v", deployment)
		op, insertErr := deploymentmanagerService.Deployments.Insert(project, dp).Context(ctx).Do()
		if insertErr != nil {
			return fmt.Errorf("Insert deployment error: %v", insertErr)
		}
		return blockingWait(project, op.Name, deploymentmanagerService, ctx,
			"Creating "+deployment)
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
	if err = createNamespace(k8sClientset, gcp.Namespace); err != nil {
		return fmt.Errorf("Creating namespace error: %v", err)
	}
	if err = bindAdmin(k8sClientset, gcp.Spec.Email); err != nil {
		return fmt.Errorf("Binding user as admin error: %v", err)
	}

	return nil
}

func (gcp *Gcp) updateDM(resources kftypes.ResourceEnum) error {
	if err := gcp.updateDeployment(gcp.Name+"-storage", STORAGE_FILE); err != nil {
		return fmt.Errorf("could not update %v: %v", STORAGE_FILE, err)
	}
	if err := gcp.updateDeployment(gcp.Name, CONFIG_FILE); err != nil {
		return fmt.Errorf("could not update %v: %v", CONFIG_FILE, err)
	}
	if _, networkStatErr := os.Stat(path.Join(gcp.Spec.AppDir, NETWORK_FILE)); !os.IsNotExist(networkStatErr) {
		err := gcp.updateDeployment(gcp.Name+"-network", NETWORK_FILE)
		if err != nil {
			return fmt.Errorf("could not update %v: %v", NETWORK_FILE, err)
		}
	}
	if _, gcfsStatErr := os.Stat(path.Join(gcp.Spec.AppDir, GCFS_FILE)); !os.IsNotExist(gcfsStatErr) {
		err := gcp.updateDeployment(gcp.Name+"-gcfs", GCFS_FILE)
		if err != nil {
			return fmt.Errorf("could not update %v: %v", GCFS_FILE, err)
		}
	}

	policy, policyErr := utils.GetIamPolicy(gcp.Spec.Project)
	if policyErr != nil {
		return fmt.Errorf("GetIamPolicy error: %v", policyErr)
	}
	appDir := gcp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	iamPolicy, iamPolicyErr := utils.ReadIamBindingsYAML(
		filepath.Join(gcpConfigDir, "iam_bindings.yaml"))
	if iamPolicyErr != nil {
		return fmt.Errorf("Read IAM policy YAML error: %v", iamPolicyErr)
	}
	utils.ClearIamPolicy(policy, iamPolicy)
	if err := utils.SetIamPolicy(gcp.Spec.Project, policy); err != nil {
		return fmt.Errorf("Set Cleared IamPolicy error: %v", err)
	}

	// Need to read policy again as latest Etag changed.
	newPolicy, policyErr := utils.GetIamPolicy(gcp.Spec.Project)
	if policyErr != nil {
		return fmt.Errorf("GetIamPolicy error: %v", policyErr)
	}
	utils.RewriteIamPolicy(newPolicy, iamPolicy)
	if err := utils.SetIamPolicy(gcp.Spec.Project, newPolicy); err != nil {
		return fmt.Errorf("Set New IamPolicy error: %v", err)
	}

	if err := gcp.ConfigK8s(); err != nil {
		return fmt.Errorf("Configure K8s is failed: %v", err)
	}

	ctx := context.Background()
	cluster, err := utils.GetClusterInfo(ctx, gcp.Spec.Project,
		gcp.Spec.Zone, gcp.Name)
	if err != nil {
		return fmt.Errorf("Get Cluster error: %v", err)
	}
	client, err := utils.BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return fmt.Errorf("Build ClientConfig error: %v", err)
	}
	// Install Istio
	if gcp.Spec.UseIstio {
		log.Infof("Installing istio...")
		parentDir := path.Dir(gcp.Spec.Repo)
		err = bootstrap.CreateResourceFromFile(client, path.Join(parentDir, "dependencies/istio/install/crds.yaml"))
		if err != nil {
			log.Errorf("Failed to create istio CRD: %v", err)
			return err
		}
		err = bootstrap.CreateResourceFromFile(client, path.Join(parentDir, "dependencies/istio/install/istio-noauth.yaml"))
		if err != nil {
			log.Errorf("Failed to create istio manifest: %v", err)
			return err
		}
		err = bootstrap.CreateResourceFromFile(client, path.Join(parentDir, "dependencies/istio/kf-istio-resources.yaml"))
		if err != nil {
			log.Errorf("Failed to create kubeflow istio resource: %v", err)
			return err
		}
		log.Infof("Done installing istio.")
	}

	// TODO(#2604): Need to create a named context.
	cred_cmd := exec.Command("gcloud", "container", "clusters", "get-credentials",
		gcp.Name,
		"--zone="+gcp.Spec.Zone,
		"--project="+gcp.Spec.Project)
	cred_cmd.Stdout = os.Stdout
	log.Infof("Running get-credentials %v --zone=%v --project=%v ...", gcp.KfDef.Name,
		gcp.KfDef.Spec.Zone, gcp.KfDef.Spec.Project)
	if err := cred_cmd.Run(); err != nil {
		return fmt.Errorf("Error when running gcloud container clusters get-credentials: %v", err)
	}

	return nil
}

// Apply applies the gcp kfapp.
func (gcp *Gcp) Apply(resources kftypes.ResourceEnum) error {
	if gcp.KfDef.Spec.UseBasicAuth && (os.Getenv(kftypes.KUBEFLOW_USERNAME) == "" ||
		os.Getenv(kftypes.KUBEFLOW_PASSWORD) == "") {
		return fmt.Errorf("gcp apply needs ENV %v and %v set when using basic auth",
			kftypes.KUBEFLOW_USERNAME, kftypes.KUBEFLOW_PASSWORD)
	}
	// Update deployment manager
	updateDMErr := gcp.updateDM(resources)
	if updateDMErr != nil {
		return fmt.Errorf("gcp apply could not update deployment manager Error %v", updateDMErr)
	}
	// Insert secrets into the cluster
	secretsErr := gcp.createSecrets()
	if secretsErr != nil {
		return fmt.Errorf("gcp apply could not create secrets Error %v", secretsErr)
	}
	return nil
}

// Try to get information for the deployment. If returned, delete it.
func deleteDeployment(deploymentmanagerService *deploymentmanager.Service, ctx context.Context,
	project string, name string) error {
	_, err := deploymentmanagerService.Deployments.Get(project, name).Context(ctx).Do()
	if err != nil {
		e := err.(*googleapi.Error)
		if e.Code == 404 {
			// Don't treat not found deployment deletion as error to make kfctl delete idempotent.
			log.Infof("Deployment %v/%v is not found during deletion.", project, name)
			return nil
		} else {
			return fmt.Errorf("Deployment %v/%v has unexpected error: %v", project, name, err)
		}
	}

	op, err := deploymentmanagerService.Deployments.Delete(project, name).Context(ctx).Do()
	if err != nil {
		return fmt.Errorf("Gcp.Delete is failed for %v/%v: %v", project, name, err)
	}
	if err = blockingWait(project, op.Name, deploymentmanagerService, ctx,
		"Deleting "+name); err != nil {
		return fmt.Errorf("Gcp.Delete is failed for %v/%v: %v", project, name, err)
	}
	return nil
}

func (gcp *Gcp) Delete(resources kftypes.ResourceEnum) error {
	ctx := context.Background()
	client, err := google.DefaultClient(ctx, deploymentmanager.CloudPlatformScope)
	if err != nil {
		return fmt.Errorf("Error getting DefaultClient: %v", err)
	}
	deploymentmanagerService, err := deploymentmanager.New(client)
	if err != nil {
		return fmt.Errorf("Error creating deploymentmanagerService: %v", err)
	}

	// cluster and storage deployments are required to be deleted. network and gcfs deployments are optional.
	project := gcp.Spec.Project
	deletingDeployments := []string{
		gcp.Name,
	}
	if gcp.Spec.DeleteStorage {
		deletingDeployments = append(deletingDeployments, gcp.Name+"-storage")
	}
	if _, networkStatErr := os.Stat(path.Join(gcp.Spec.AppDir, NETWORK_FILE)); !os.IsNotExist(networkStatErr) {
		deletingDeployments = append(deletingDeployments, gcp.Name+"-network")
	}
	if _, gcfsStatErr := os.Stat(path.Join(gcp.Spec.AppDir, GCFS_FILE)); !os.IsNotExist(gcfsStatErr) {
		deletingDeployments = append(deletingDeployments, gcp.Name+"-gcfs")
	}

	for _, d := range deletingDeployments {
		if err = deleteDeployment(deploymentmanagerService, ctx, project, d); err != nil {
			return err
		}
	}

	policy, err := utils.GetIamPolicy(project)
	if err != nil {
		return fmt.Errorf("Error when getting IAM policy: %v", err)
	}
	saSet := mapset.NewSet(
		"serviceAccount:"+getSA(gcp.Name, "admin", project),
		"serviceAccount:"+getSA(gcp.Name, "user", project),
		"serviceAccount:"+getSA(gcp.Name, "vm", project))
	for idx, binding := range policy.Bindings {
		cleanedMembers := []string{}
		for _, member := range binding.Members {
			if saSet.Contains(member) {
				log.Infof("Removing %v from %v", member, binding.Role)
			} else {
				cleanedMembers = append(cleanedMembers, member)
			}
		}
		policy.Bindings[idx].Members = cleanedMembers
	}
	if err = utils.SetIamPolicy(project, policy); err != nil {
		return fmt.Errorf("Error when cleaning IAM policy: %v", err)
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

// Usage: a = setNameVal(a, "acmeEmail", gcp.Spec.Email, true), similar to append
func setNameVal(entries []configtypes.NameValue, name string, val string, required bool) []configtypes.NameValue {
	for i, nv := range entries {
		if nv.Name == name {
			log.Infof("Setting %v to %v", name, val)
			entries[i].Value = val
			return entries
		}
	}
	log.Infof("Appending %v as %v", name, val)
	entries = append(entries, configtypes.NameValue{
		Name:         name,
		Value:        val,
		InitRequired: required,
	})
	return entries
}

//TODO(#2515)
func (gcp *Gcp) replaceText(regex string, repl string, src []byte) []byte {
	re := regexp.MustCompile(regex)
	buf := re.ReplaceAll(src, []byte(repl))
	return buf
}

// TODO(#2515): Switch from string replacement to YAML config.
func (gcp *Gcp) generateDMConfigs() error {
	// TODO(gabrielwen): Use YAML support instead of string replacement.
	appDir := gcp.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.MkdirAll(gcpConfigDir, os.ModePerm)
	if gcpConfigDirErr != nil {
		return fmt.Errorf("cannot create directory %v", gcpConfigDirErr)
	}
	repo := gcp.Spec.Repo
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
	adminEmail := getSA(gcp.Name, "admin", gcp.Spec.Project)
	repl := "serviceAccount:" + adminEmail
	iamBindingsData = gcp.replaceText("set-kubeflow-admin-service-account", repl, iamBindingsData)
	userEmail := getSA(gcp.Name, "user", gcp.Spec.Project)
	repl = "serviceAccount:" + userEmail
	iamBindingsData = gcp.replaceText("set-kubeflow-user-service-account", repl, iamBindingsData)
	vmEmail := getSA(gcp.Name, "vm", gcp.Spec.Project)
	repl = "serviceAccount:" + vmEmail
	iamBindingsData = gcp.replaceText("set-kubeflow-vm-service-account", repl, iamBindingsData)
	iamEntry := "serviceAccount:" + gcp.Spec.Email
	re := regexp.MustCompile("iam.gserviceaccount.com")
	if !re.MatchString(gcp.Spec.Email) {
		iamEntry = "user:" + gcp.Spec.Email
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
	repl = "zone: " + gcp.Spec.Zone
	configFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, configFileData)
	storageFileData = gcp.replaceText("zone: SET_THE_ZONE", repl, storageFileData)
	repl = "users: [\"" + iamEntry + "\"]"
	configFileData = gcp.replaceText("users:", repl, configFileData)
	repl = "ipName: " + gcp.Spec.IpName
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

func insertSecret(client *clientset.Clientset, secretName string, namespace string, data map[string][]byte) error {
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      secretName,
			Namespace: namespace,
		},
		Data: data,
	}
	_, err := client.CoreV1().Secrets(namespace).Create(secret)
	return err
}

// Create key for service account and write to GCP as secret.
func (gcp *Gcp) createGcpServiceAcctSecret(ctx context.Context, client *clientset.Clientset,
	email string, secretName string, namespace string) error {
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
		return fmt.Errorf("Get Oauth Client error: %v", err)
	}
	name := fmt.Sprintf("projects/%v/serviceAccounts/%v", gcp.Spec.Project,
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
	return insertSecret(client, secretName, namespace, map[string][]byte{
		secretName + ".json": privateKeyData,
	})
}

// User CLIENT_ID and CLIENT_SECRET from GCP to create a secret for IAP.
func (gcp *Gcp) createIapSecret(ctx context.Context, client *clientset.Clientset) error {
	oauthSecretNamespace := gcp.Namespace
	if gcp.Spec.UseIstio {
		oauthSecretNamespace = IstioNamespace
	}

	if _, err := client.CoreV1().Secrets(oauthSecretNamespace).
		Get(KUBEFLOW_OAUTH, metav1.GetOptions{}); err == nil {
		log.Infof("Secret for %v already exits ...", KUBEFLOW_OAUTH)
		return nil
	}
	oauthId := os.Getenv(CLIENT_ID)
	if oauthId == "" && !gcp.Spec.UseBasicAuth {
		return fmt.Errorf("At least one of --%v or ENV `%v` needs to be set.",
			string(kftypes.OAUTH_ID), CLIENT_ID)
	}
	oauthSecret := os.Getenv(CLIENT_SECRET)
	if oauthSecret == "" && !gcp.Spec.UseBasicAuth {
		return fmt.Errorf("At least one of --%v or ENV `%v` needs to be set.",
			string(kftypes.OAUTH_SECRET), CLIENT_SECRET)
	}

	return insertSecret(client, KUBEFLOW_OAUTH, oauthSecretNamespace, map[string][]byte{
		strings.ToLower(CLIENT_ID):     []byte(oauthId),
		strings.ToLower(CLIENT_SECRET): []byte(oauthSecret),
	})
}

// Use username and password provided by user and create secret for basic auth.
func (gcp *Gcp) createBasicAuthSecret(client *clientset.Clientset) error {
	username := os.Getenv(kftypes.KUBEFLOW_USERNAME)
	password := os.Getenv(kftypes.KUBEFLOW_PASSWORD)
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return fmt.Errorf("Error when hashing password: %v", err)
	}
	encodedPasswordHash := base64.StdEncoding.EncodeToString(passwordHash)
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      BASIC_AUTH_SECRET,
			Namespace: gcp.Namespace,
		},
		Data: map[string][]byte{
			"username":     []byte(username),
			"passwordhash": []byte(encodedPasswordHash),
		},
	}
	_, err = client.CoreV1().Secrets(gcp.KfDef.Namespace).Update(secret)
	if err != nil {
		log.Warnf("Updating basic auth login is failed, trying to create one: %v", err)
		_, err = client.CoreV1().Secrets(gcp.Namespace).Create(secret)
	}
	return err
}

func (gcp *Gcp) createSecrets() error {
	ctx := context.Background()
	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return fmt.Errorf("Get K8s clientset error: %v", err)
	}
	adminEmail := getSA(gcp.Name, "admin", gcp.Spec.Project)
	userEmail := getSA(gcp.Name, "user", gcp.Spec.Project)
	if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME, gcp.Namespace); err != nil {
		return fmt.Errorf("cannot create admin secret %v Error %v", ADMIN_SECRET_NAME, err)
	}
	if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME, gcp.Namespace); err != nil {
		return fmt.Errorf("cannot create user secret %v Error %v", USER_SECRET_NAME, err)
	}
	// Also create service account secret in istio namespace
	if gcp.Spec.UseIstio {
		if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME, IstioNamespace); err != nil {
			return fmt.Errorf("cannot create admin secret %v Error %v", ADMIN_SECRET_NAME, err)
		}
		if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME, IstioNamespace); err != nil {
			return fmt.Errorf("cannot create user secret %v Error %v", USER_SECRET_NAME, err)
		}
	}
	if gcp.Spec.UseBasicAuth {
		if err := gcp.createBasicAuthSecret(k8sClient); err != nil {
			return fmt.Errorf("cannot create basic auth login secret: %v", err)
		}
	} else {
		if err := gcp.createIapSecret(ctx, k8sClient); err != nil {
			return fmt.Errorf("cannot create IAP auth secret: %v", err)
		}
	}
	return nil
}

// Generate generates the gcp kfapp manifest.
func (gcp *Gcp) Generate(resources kftypes.ResourceEnum) error {
	if gcp.Spec.Email == "" {
		account, err := GetAccount()
		if err != nil {
			return fmt.Errorf("--email not specified and cannot get gcloud value. Error: %v", err)
		}
		gcp.Spec.Email = account
	}
	switch resources {
	case kftypes.ALL:
		gcpConfigFilesErr := gcp.generateDMConfigs()
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
	case kftypes.PLATFORM:
		gcpConfigFilesErr := gcp.generateDMConfigs()
		if gcpConfigFilesErr != nil {
			return fmt.Errorf("could not generate deployment manager configs under %v Error: %v", GCP_CONFIG, gcpConfigFilesErr)
		}
	}
	gcp.Spec.ComponentParams["cert-manager"] = setNameVal(gcp.Spec.ComponentParams["cert-manager"], "acmeEmail", gcp.Spec.Email, true)
	if gcp.Spec.IpName == "" {
		gcp.Spec.IpName = gcp.Name + "-ip"
	}
	if gcp.Spec.Hostname == "" {
		gcp.Spec.Hostname = gcp.Name + ".endpoints." + gcp.Spec.Project + ".cloud.goog"
	}
	if gcp.Spec.UseBasicAuth {
		gcp.Spec.ComponentParams["basic-auth-ingress"] = setNameVal(gcp.Spec.ComponentParams["basic-auth-ingress"], "ipName", gcp.Spec.IpName, true)
		gcp.Spec.ComponentParams["basic-auth-ingress"] = setNameVal(gcp.Spec.ComponentParams["basic-auth-ingress"], "hostname", gcp.Spec.Hostname, true)
	} else {
		gcp.Spec.ComponentParams["iap-ingress"] = setNameVal(gcp.Spec.ComponentParams["iap-ingress"], "ipName", gcp.Spec.IpName, true)
		gcp.Spec.ComponentParams["iap-ingress"] = setNameVal(gcp.Spec.ComponentParams["iap-ingress"], "hostname", gcp.Spec.Hostname, true)
	}
	gcp.Spec.ComponentParams["pipeline"] = setNameVal(gcp.Spec.ComponentParams["pipeline"], "mysqlPd", gcp.Name+"-storage-metadata-store", false)
	gcp.Spec.ComponentParams["pipeline"] = setNameVal(gcp.Spec.ComponentParams["pipeline"], "minioPd", gcp.Name+"-storage-artifact-store", false)

	if gcp.Spec.UseIstio {
		gcp.Spec.ComponentParams["iap-ingress"] = setNameVal(gcp.Spec.ComponentParams["iap-ingress"], "useIstio", "true", false)
	}

	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.Spec.AppDir)
	}
	return nil
}

func (gcp *Gcp) getServiceClient(ctx context.Context) (*http.Client, error) {
	// See https://cloud.google.com/docs/authentication/.
	// Use GOOGLE_APPLICATION_CREDENTIALS environment variable to specify
	// a service account key file to authenticate to the API.
	client, err := google.DefaultClient(ctx, gke.CloudPlatformScope)
	if err != nil {
		log.Fatalf("Could not authenticate Client: %v", err)
		return nil, err
	}
	return client, nil
}

func (gcp *Gcp) gcpInitProject() error {
	ctx := context.Background()
	client, clientErr := gcp.getServiceClient(ctx)
	if clientErr != nil {
		return fmt.Errorf("could not create Client %v", clientErr)
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
		service := fmt.Sprintf("projects/%v/services/%v", gcp.Spec.Project, api)
		_, opErr := serviceusageService.Services.Enable(service, &serviceusage.EnableServiceRequest{}).Context(ctx).Do()
		if opErr != nil {
			return fmt.Errorf("could not enable API service %v: %v", api, opErr)
		}
	}
	return nil
}

// Init initializes a gcp kfapp
func (gcp *Gcp) Init(resources kftypes.ResourceEnum) error {
	cacheDir := path.Join(gcp.Spec.AppDir, kftypes.DefaultCacheDir)
	newPath := filepath.Join(cacheDir, gcp.Spec.Version)
	swaggerFile := filepath.Join(newPath, kftypes.DefaultSwaggerFile)
	gcp.Spec.ServerVersion = "file:" + swaggerFile
	gcp.Spec.Repo = path.Join(newPath, "kubeflow")
	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.Spec.AppDir)
	}

	if !gcp.Spec.SkipInitProject {
		log.Infof("Not skipping GCP project init, running gcpInitProject.")
		initProjectErr := gcp.gcpInitProject()
		if initProjectErr != nil {
			return fmt.Errorf("cannot init gcp project %v", initProjectErr)
		}
	}
	return nil
}

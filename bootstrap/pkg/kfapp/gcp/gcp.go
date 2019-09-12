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
	"github.com/gogo/protobuf/proto"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/googleapi"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/servicemanagement/v1"
	"google.golang.org/api/serviceusage/v1"
	"io"
	"io/ioutil"
	"k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/runtime/serializer"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/discovery/cached"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	restv2 "k8s.io/client-go/rest"
	"k8s.io/client-go/restmapper"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

// TODO: golint complains that we should not use all capital var name.
const (
	GCP_CONFIG        = "gcp_config"
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
	KUBECONFIG_FORMAT = "gke_{project}_{zone}_{cluster}"

	// The default path in kubeflow/kubeflow to the deployment manager configs.
	// TODO(jlewi): This is only provided for legacy reasons. In 0.7 the path should be set explicitly
	// in the KfDef spec.
	DEFAULT_DM_PATH = "deployment/gke/deployment_manager_configs"

	// Plugin parameter constants
	GcpPluginName               = kftypesv3.GCP
	GcpAccessTokenName          = "accessToken"
	BasicAuthPasswordSecretName = "password"
)

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
// TODO(jlewi): Why doesn't Gcp store GcpArgs as opposed to duplicating the options?
type Gcp struct {
	kfDef       *kfdefs.KfDef
	client      *http.Client
	tokenSource oauth2.TokenSource

	// Function to get the GcpAccount.
	// Support injection for testing.
	gcpAccountGetter func() (string, error)

	runGetCredentials bool
}

type Setter interface {
	SetTokenSource(s oauth2.TokenSource) error

	// SetRunGetCredentials controls whether or not to run get credentials
	SetRunGetCredentials(v bool)
}

func (gcp *Gcp) SetTokenSource(s oauth2.TokenSource) error {
	gcp.tokenSource = s
	return nil
}

func (gcp *Gcp) SetRunGetCredentials(v bool) {
	gcp.runGetCredentials = v
}

type dmOperationEntry struct {
	operationName string
	// create or update dmName
	action string
}

// GetPlatform returns the gcp kfapp. It's called by coordinator.GetPlatform
func GetPlatform(kfdef *kfdefs.KfDef) (kftypesv3.Platform, error) {
	_gcp := &Gcp{
		kfDef:            kfdef,
		gcpAccountGetter: GetGcloudDefaultAccount,

		// Default to true for the CLI.
		runGetCredentials: true,
	}
	return _gcp, nil
}

// GetPluginSpec gets the plugin spec.
func (gcp *Gcp) GetPluginSpec() (*GcpPluginSpec, error) {
	// Not passing a pointer interface is a common cause of deserialization problems
	pluginSpec := &GcpPluginSpec{}

	err := gcp.kfDef.GetPluginSpec(GcpPluginName, pluginSpec)

	return pluginSpec, err
}

// initGcpClient initializes the clients to talk to GCP.
func (gcp *Gcp) initGcpClient() error {
	if gcp.client != nil {
		log.Infof("GCP client already configured")
		return nil
	}

	ctx := context.Background()

	if gcp.tokenSource == nil {
		// Defensive Programming.
		// If we try to create a DefaultTokenSource when an AccessToken is provided
		// Something has gone wrong. So we guard against that.
		// If accessToken is provided gcp.TokenSource should be set and we should use
		// that.
		if _, err := gcp.kfDef.GetSecret(GcpAccessTokenName); !kfdefs.IsSecretNotFound(err) {
			return errors.WithStack(fmt.Errorf("Gcp.tokenSource is nil and secret %v is in KfDef; Gcp.tokenSource must be set explicitly; using a default token source is not allowed in this case", GcpAccessTokenName))
		}
		log.Infof("Creating default token source")
		tokenSource, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)

		if err != nil {
			return errors.Wrap(err, "initGcpClient failed to create default token source")
		}

		gcp.tokenSource = tokenSource
	} else {
		log.Infof("Using current token source")
	}

	log.Infof("Creating GCP client.")
	gcp.client = oauth2.NewClient(ctx, gcp.tokenSource)

	return nil
}

func newDefaultBackoff() *backoff.ExponentialBackOff {
	b := backoff.NewExponentialBackOff()
	b.InitialInterval = 3 * time.Second
	b.MaxInterval = 30 * time.Second
	return b
}

func getSA(name string, nameSuffix string, project string) string {
	return fmt.Sprintf("%v-%v@%v.iam.gserviceaccount.com", name, nameSuffix, project)
}

// TODO(jlewi): We should be able to get rid of this method because it was only used
// for ksonnet.
func (gcp *Gcp) GetK8sConfig() (*rest.Config, *clientcmdapi.Config) {
	// TODO(jlewi): Should we unify the code by just setting ts and then calling
	// ts.Tpken to get a token?
	accessToken, _ := gcp.kfDef.GetSecret(GcpAccessTokenName)

	if accessToken == "" {
		return nil, nil
	}
	ctx := context.Background()

	// TODO(jlewi): Should we fix this so we can build a cluster config which takes
	// a TokenSource which can then be pointed at either the DefaultTokenSource
	// or the refreshable token source?
	restConfig, err := utils.BuildClusterConfig(ctx, accessToken, gcp.kfDef.Spec.Project,
		gcp.kfDef.Spec.Zone, gcp.kfDef.Name)
	if err != nil {
		return nil, nil
	}
	apiConfig := utils.BuildClientCmdAPI(restConfig, accessToken)
	return restConfig, apiConfig
}

// GetGcloudDefaultAccount try to get the default account.
func GetGcloudDefaultAccount() (string, error) {
	output, err := exec.Command("gcloud", "config", "get-value", "account").Output()
	if err != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not call 'gcloud config get-value account': %v", err),
		}
	}
	return strings.TrimSpace(string(output)), nil
}

// Simple deploymentmanager.TargetConfiguration factory method. This method assumes imported paths
// are all within the same filesystem. From gcloud CLI source codes it appears URL is a possible
// option. We might need to update this method or find a way to work with Python source code from
// gcloud.
func generateTarget(configPath string) (*deploymentmanager.TargetConfiguration, error) {
	if !filepath.IsAbs(configPath) {
		if p, err := filepath.Abs(configPath); err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Getting absolute path error: %v", err),
			}
		} else {
			configPath = p
		}
	}
	log.Infof("Reading config file: %v", configPath)
	configBuf, bufErr := ioutil.ReadFile(configPath)
	if bufErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", bufErr),
		}
	}
	targetConfig := &deploymentmanager.TargetConfiguration{
		Config: &deploymentmanager.ConfigFile{
			Content: string(configBuf),
		},
	}

	var config map[string]interface{}
	if err := yaml.Unmarshal(configBuf, &config); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to read YAML: %v", err),
		}
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
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("error reading import file: %v", err),
			}
		}
	}
	return targetConfig, nil
}

func (gcp *Gcp) getK8sClientset(ctx context.Context) (*clientset.Clientset, error) {
	cluster, err := utils.GetClusterInfo(ctx, gcp.kfDef.Spec.Project,
		gcp.kfDef.Spec.Zone, gcp.kfDef.Name, gcp.tokenSource)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("get Cluster error: %v", err),
		}
	}
	config, err := utils.BuildConfigFromClusterInfo(ctx, cluster, gcp.tokenSource)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("build ClientConfig error: %v", err),
		}
	}

	if cli, err := clientset.NewForConfig(config); err == nil {
		return cli, nil
	} else {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("create new ClientConfig error: %v", err),
		}
	}
}

func blockingWait(project string, deploymentmanagerService *deploymentmanager.Service,
	dmOperationEntries []*dmOperationEntry) error {
	ctx := context.Background()
	// Explicitly copy string to avoid memory leak.
	p := "" + project
	return backoff.Retry(func() error {
		for _, dmEntry := range dmOperationEntries {
			op, err := deploymentmanagerService.Operations.Get(p, dmEntry.operationName).Context(ctx).Do()

			if err != nil {
				// Retry here as there's a chance to get error for newly created DM operation.
				log.Errorf("%v error: %v", dmEntry.action, err)
				return &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("%v error: %v", dmEntry.action, err),
				}
			}
			if op.Error != nil {
				for _, e := range op.Error.Errors {
					log.Errorf("%v error: %+v", dmEntry.action, e)
				}
			}
			if op.Status != "DONE" {
				log.Infof("%v status: %v (op = %v)", dmEntry.action, op.Status, op.Name)
				return &kfapis.KfError{
					Code: int(kfapis.INVALID_ARGUMENT),
					Message: fmt.Sprintf("%v did not succeed; status: %v (op = %v)",
						dmEntry.action, op.Status, op.Name),
				}
			}
			if op.HttpErrorStatusCode > 0 {
				return backoff.Permanent(&kfapis.KfError{
					Code: int(kfapis.INVALID_ARGUMENT),
					Message: fmt.Sprintf("%v error(%v): %v",
						dmEntry.action,
						op.HttpErrorStatusCode, op.HttpErrorMessage),
				})
			}
			log.Infof("%v is finished: %v", dmEntry.action, op.Status)
		}
		return nil
	}, newDefaultBackoff())
}

func (gcp *Gcp) updateDeployment(deploymentmanagerService *deploymentmanager.Service, deployment string, yamlfile string) (*dmOperationEntry, error) {
	appDir := gcp.kfDef.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	ctx := context.Background()

	filePath := filepath.Join(gcpConfigDir, yamlfile)
	dp := &deploymentmanager.Deployment{
		Name:   deployment,
		Labels: []*deploymentmanager.DeploymentLabelEntry{},
	}

	// Add the labels
	for k, v := range gcp.kfDef.Labels {
		dp.Labels = append(dp.Labels, &deploymentmanager.DeploymentLabelEntry{
			Key:   k,
			Value: v,
		})
	}

	if target, targetErr := generateTarget(filePath); targetErr != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: targetErr.Error(),
		}
	} else {
		dp.Target = target
	}

	project := gcp.kfDef.Spec.Project
	resp, err := deploymentmanagerService.Deployments.Get(project, deployment).Context(ctx).Do()
	if err == nil {
		dp.Fingerprint = resp.Fingerprint
		opName := resp.Operation.Name
		if resp.Operation.Status == "DONE" {
			log.Infof("Updating deployment %v", deployment)
			op, updateErr := deploymentmanagerService.Deployments.Update(project, deployment, dp).Context(ctx).Do()
			if updateErr != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.UNKNOWN),
					Message: fmt.Sprintf("Update deployment error: %v", updateErr),
				}
			}
			opName = op.Name
		} else {
			log.Infof("Wait running deployment %v to finish; operation name: %v.", deployment, opName)
		}
		return &dmOperationEntry{
			operationName: opName,
			action:        "Updating " + deployment,
		}, nil
	} else {
		log.Infof("Creating deployment %v", deployment)
		op, insertErr := deploymentmanagerService.Deployments.Insert(project, dp).Context(ctx).Do()
		if insertErr != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("Insert deployment error: %v", insertErr),
			}
		}
		return &dmOperationEntry{
			operationName: op.Name,
			action:        "Creating " + deployment,
		}, nil
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
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}
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
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}
}

func (gcp *Gcp) ConfigK8s() error {
	ctx := context.Background()
	k8sClientset, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return err
	}
	if err = createNamespace(k8sClientset, gcp.kfDef.Namespace); err != nil {
		return err
	}
	if err = createNamespace(k8sClientset, gcp.getIstioNamespace()); err != nil {
		return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create istio namespace"))
	}
	// For deploy app, request will use service account credential instead of user credential.
	bindAccount := gcp.kfDef.Spec.Email

	pluginSpec, err := gcp.GetPluginSpec()

	if err != nil {
		return err
	}

	if pluginSpec.SAClientId != "" {
		log.Infof("Granting service account K8s permission.")
		bindAccount = pluginSpec.SAClientId
	}

	if err = bindAdmin(k8sClientset, bindAccount); err != nil {
		return err
	}

	return nil
}

// Add a conveniently named context to KUBECONFIG.
func (gcp *Gcp) AddNamedContext() error {
	name := strings.Replace(KUBECONFIG_FORMAT, "{project}", gcp.kfDef.Spec.Project, 1)
	name = strings.Replace(name, "{zone}", gcp.kfDef.Spec.Zone, 1)
	name = strings.Replace(name, "{cluster}", gcp.kfDef.Name, 1)
	log.Infof("KUBECONFIG name is %v", name)

	buf, err := ioutil.ReadFile(kftypesv3.KubeConfigPath())
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading KUBECONFIG error: %v", err),
		}
	}
	var config map[string]interface{}
	if err = yaml.Unmarshal(buf, &config); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unmarshaling KUBECONFIG error: %v", err),
		}
	}

	configNameChecker := func(config map[string]interface{}, entryName string, name string) error {
		e, ok := config[entryName]
		if !ok {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Not able to find %v in KUBECONFIG", entryName),
			}
		}
		entries := e.([]interface{})
		for _, entry := range entries {
			en := entry.(map[string]interface{})
			if mm, ok := en["name"]; ok {
				n := mm.(string)
				if n == name {
					return nil
				}
			} else {
				return &kfapis.KfError{
					Code:    int(kfapis.INVALID_ARGUMENT),
					Message: "Not able to find name in the entry",
				}
			}
		}
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Not able to find %v from %v in KUBECONFIG", name, entryName),
		}
	}

	if err = configNameChecker(config, "clusters", name); err != nil {
		return err
	}
	if err = configNameChecker(config, "users", name); err != nil {
		return err
	}
	if err = configNameChecker(config, "contexts", name); err != nil {
		return err
	}

	e, ok := config["contexts"]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Not able to find contexts in KUBECONFIG",
		}
	}
	contexts := e.([]interface{})
	context := make(map[string]interface{})
	context["name"] = gcp.kfDef.Name
	context["context"] = map[string]string{
		"cluster":   name,
		"user":      name,
		"namespace": gcp.kfDef.Namespace,
	}
	for idx, ctx := range contexts {
		c := ctx.(map[string]interface{})
		if c["name"] == gcp.kfDef.Name {
			// Remove the entry to override.
			contexts = append(contexts[:idx], contexts[idx+1:]...)
			break
		}
	}
	contexts = append(contexts, context)
	config["contexts"] = contexts
	config["current-context"] = gcp.kfDef.Name

	buf, err = yaml.Marshal(config)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when marshaling KUBECONFIG: %v", err),
		}
	}
	if err = ioutil.WriteFile(kftypesv3.KubeConfigPath(), buf, 0644); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when writing KUBECONFIG: %v", err),
		}
	}

	log.Infof("KUBECONFIG context %v is created and currently using", gcp.kfDef.Name)
	return nil
}

func (gcp *Gcp) updateDM(resources kftypesv3.ResourceEnum) error {
	ctx := context.Background()
	gcpClient := oauth2.NewClient(ctx, gcp.tokenSource)
	dmOperationEntries := []*dmOperationEntry{}
	deploymentmanagerService, err := deploymentmanager.New(gcp.client)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error creating deploymentmanagerService: %v", err),
		}
	}
	if _, storageStatErr := os.Stat(path.Join(gcp.kfDef.Spec.AppDir, GCP_CONFIG, STORAGE_FILE)); !os.IsNotExist(storageStatErr) {
		storageEntry, err := gcp.updateDeployment(deploymentmanagerService, gcp.kfDef.Name+"-storage", STORAGE_FILE)
		if err != nil {
			return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("could not update %v", STORAGE_FILE))
		}
		dmOperationEntries = append(dmOperationEntries, storageEntry)
	}
	dmEntry, err := gcp.updateDeployment(deploymentmanagerService, gcp.kfDef.Name, CONFIG_FILE)
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("could not update %v", CONFIG_FILE))
	}
	dmOperationEntries = append(dmOperationEntries, dmEntry)
	if _, networkStatErr := os.Stat(path.Join(gcp.kfDef.Spec.AppDir, GCP_CONFIG, NETWORK_FILE)); networkStatErr == nil {
		networkEntry, err := gcp.updateDeployment(deploymentmanagerService, gcp.kfDef.Name+"-network", NETWORK_FILE)
		if err != nil {
			return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("could not update %v", NETWORK_FILE))
		}
		dmOperationEntries = append(dmOperationEntries, networkEntry)
	}
	if _, gcfsStatErr := os.Stat(path.Join(gcp.kfDef.Spec.AppDir, GCP_CONFIG, GCFS_FILE)); gcfsStatErr == nil {
		gcfsEntry, err := gcp.updateDeployment(deploymentmanagerService, gcp.kfDef.Name+"-gcfs", GCFS_FILE)
		if err != nil {
			return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("could not update %v", GCFS_FILE))
		}
		dmOperationEntries = append(dmOperationEntries, gcfsEntry)
	}

	if err = blockingWait(gcp.kfDef.Spec.Project, deploymentmanagerService, dmOperationEntries); err != nil {
		return kfapis.NewKfErrorWithMessage(err, "could not update deployment manager entries")
	}
	exp := backoff.NewExponentialBackOff()
	exp.InitialInterval = 1 * time.Second
	exp.MaxInterval = 3 * time.Second
	exp.MaxElapsedTime = time.Minute
	exp.Reset()
	err = backoff.Retry(func() error {
		// Get current policy
		policy, policyErr := utils.GetIamPolicy(gcp.kfDef.Spec.Project, gcpClient)
		if policyErr != nil {
			return kfapis.NewKfErrorWithMessage(err, "GetIamPolicy error")
		}
		utils.ClearIamPolicy(policy, gcp.kfDef.Name, gcp.kfDef.Spec.Project)
		if err := utils.SetIamPolicy(gcp.kfDef.Spec.Project, policy, gcpClient); err != nil {
			return kfapis.NewKfErrorWithMessage(err, "Set Cleared IamPolicy error: %v")
		}
		return nil
	}, exp)
	if err != nil {
		return err
	}

	appDir := gcp.kfDef.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	iamPolicy, iamPolicyErr := utils.ReadIamBindingsYAML(
		filepath.Join(gcpConfigDir, "iam_bindings.yaml"))
	if iamPolicyErr != nil {
		return &kfapis.KfError{
			Code: iamPolicyErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Read IAM policy YAML error: %v",
				iamPolicyErr.(*kfapis.KfError).Message),
		}
	}

	exp.Reset()
	err = backoff.Retry(func() error {
		// Need to read policy again as latest Etag changed.
		newPolicy, policyErr := utils.GetIamPolicy(gcp.kfDef.Spec.Project, gcpClient)
		if policyErr != nil {
			return &kfapis.KfError{
				Code: policyErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("GetIamPolicy error: %v",
					policyErr.(*kfapis.KfError).Message),
			}
		}
		utils.RewriteIamPolicy(newPolicy, iamPolicy)
		if err := utils.SetIamPolicy(gcp.kfDef.Spec.Project, newPolicy, gcpClient); err != nil {
			return &kfapis.KfError{
				Code: err.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("Set New IamPolicy error: %v",
					err.(*kfapis.KfError).Message),
			}
		}
		return nil
	}, exp)
	if err != nil {
		return err
	}

	if err := gcp.ConfigK8s(); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Configure K8s is failed: %v",
				err.(*kfapis.KfError).Message),
		}
	}

	if gcp.runGetCredentials {
		log.Infof("Running get-credentials to build .kubeconfig")
		credCmd := exec.Command("gcloud", "container", "clusters", "get-credentials",
			gcp.kfDef.Name,
			"--zone="+gcp.kfDef.Spec.Zone,
			"--project="+gcp.kfDef.Spec.Project)
		credCmd.Stdout = os.Stdout
		log.Infof("Running get-credentials %v --zone=%v --project=%v ...", gcp.kfDef.Name,
			gcp.kfDef.Spec.Zone, gcp.kfDef.Spec.Project)
		if err := credCmd.Run(); err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error when running gcloud container clusters get-credentials: %v", err),
			}
		}
		if _, err := os.Stat(kftypesv3.KubeConfigPath()); !os.IsNotExist(err) {
			gcp.AddNamedContext()
		}
	} else {
		log.Debugf("Not running gcloud get-credentials")
	}
	return nil
}

// Apply applies the gcp kfapp.
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (gcp *Gcp) Apply(resources kftypesv3.ResourceEnum) error {
	if err := gcp.initGcpClient(); err != nil {
		log.Errorf("There was a problem initializing the GCP client; %v", err)
		return errors.WithMessagef(err, "Gcp.Apply Could not initatie a GCP client")
	}

	p, err := gcp.GetPluginSpec()

	if err != nil {
		return err
	}

	if isValid, msg := p.IsValid(); !isValid {
		log.Errorf("GcpPluginSpec isn't valid; error %v", msg)
		return fmt.Errorf(msg)
	}

	// Update deployment manager
	updateDMErr := gcp.updateDM(resources)
	if updateDMErr != nil {
		return &kfapis.KfError{
			Code: updateDMErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("gcp apply could not update deployment manager Error %v",
				updateDMErr.(*kfapis.KfError).Message),
		}
	}
	// Insert secrets into the cluster
	secretsErr := gcp.createSecrets()
	if secretsErr != nil {
		return &kfapis.KfError{
			Code: secretsErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("gcp apply could not create secrets Error %v",
				secretsErr.(*kfapis.KfError).Message),
		}
	}
	if *p.EnableWorkloadIdentity {
		// Create the role binding for k8s service account
		if err = gcp.setupWorkloadIdentity(gcp.kfDef.Namespace); err != nil {
			return &kfapis.KfError{
				Code: err.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("Fail to setup workload identity: Error %v",
					err.(*kfapis.KfError).Message),
			}
		}
		if err = gcp.setupWorkloadIdentity(gcp.getIstioNamespace()); err != nil {
			return &kfapis.KfError{
				Code: err.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("Fail to setup workload identity: Error %v",
					err.(*kfapis.KfError).Message),
			}
		}
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
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Deployment %v/%v has unexpected error: %v",
					project, name, err),
			}
		}
	}

	op, err := deploymentmanagerService.Deployments.Delete(project, name).Context(ctx).Do()
	if err != nil {
		return &kfapis.KfError{
			Code: int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Gcp.Delete is failed for %v/%v: %v",
				project, name, err),
		}
	}
	deleteEntry := []*dmOperationEntry{&dmOperationEntry{
		operationName: op.Name,
		action:        "Deleting " + name,
	}}
	if err = blockingWait(project, deploymentmanagerService, deleteEntry); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Gcp.Delete is failed for %v/%v: %v",
				project, name, err.(*kfapis.KfError).Message),
		}
	}
	return nil
}

// Delete endpoint service from resources.
func (gcp *Gcp) deleteEndpoints(ctx context.Context) error {
	servicemanagementService, err := servicemanagement.New(gcp.client)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("creating servicemanagement API client error: %v", err),
		}
	}

	services := servicemanagement.NewServicesService(servicemanagementService)
	op, deleteErr := services.Delete(gcp.kfDef.Spec.Hostname).Context(ctx).Do()
	if deleteErr != nil {
		nextPage := ""
		// Use a loop to read multi-page managed services list.
		for {
			list := services.List().ProducerProjectId(gcp.kfDef.Spec.Project)
			if nextPage != "" {
				list = list.PageToken(nextPage)
			}
			listResp, err := list.Do()
			if err != nil {
				return &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("listing managed services error: %v", err),
				}
			}
			for _, s := range listResp.Services {
				if s.ServiceName == gcp.kfDef.Spec.Hostname {
					return &kfapis.KfError{
						Code:    int(kfapis.INTERNAL_ERROR),
						Message: fmt.Sprintf("issuing endpoint deletion error: %v", deleteErr),
					}
				}
			}
			// Explicitly copy it to prevent memory leak.
			nextPage = "" + listResp.NextPageToken
			if nextPage == "" {
				break
			}
		}
		// Delete is not successful and we are not able to find endpoint in managed
		// services, treat it as OK.
		log.Infof("Endpoint %v deletion is failed but it is not found in managed services, treating it as successful.", gcp.kfDef.Spec.Hostname)
		return nil
	}

	opService := servicemanagement.NewOperationsService(servicemanagementService)
	opName := "" + op.Name
	return backoff.Retry(func() error {
		newOp, retryErr := opService.Get(opName).Context(ctx).Do()
		if retryErr != nil {
			log.Errorf("long running endpoint deletion error: %v", retryErr)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("long running endpoint deletion error: %v", retryErr),
			}
		}
		if newOp.Error != nil {
			return backoff.Permanent(&kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("long running endpoint deletion error: %v", newOp.Error.Message),
			})
		}
		if newOp.Done {
			if newOp.HTTPStatusCode != 200 {
				return backoff.Permanent(&kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("Abnormal response code: %v", newOp.HTTPStatusCode),
				})
			}
			log.Infof("endpoint deletion %v is completed: %v", gcp.kfDef.Spec.Hostname, string(newOp.Response))
			return nil
		}
		log.Infof("Endpoint deletion is running: %v (op = %v)", gcp.kfDef.Spec.Hostname, newOp.Name)
		opName = newOp.Name
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Endpoint deletion is running..."),
		}
	}, newDefaultBackoff())
}

func (gcp *Gcp) Delete(resources kftypesv3.ResourceEnum) error {
	if err := gcp.initGcpClient(); err != nil {
		log.Errorf("There was a problem initializing the GCP client; %v", err)
		return errors.WithMessagef(err, "Gcp.gcpInitProject Could not initatie a GCP client")
	}
	ctx := context.Background()
	deploymentmanagerService, err := deploymentmanager.New(gcp.client)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error creating deploymentmanagerService: %v", err),
		}
	}

	// cluster and storage deployments are required to be deleted. network and gcfs deployments are optional.
	project := gcp.kfDef.Spec.Project
	deletingDeployments := []string{
		gcp.kfDef.Name,
	}
	if gcp.kfDef.Spec.DeleteStorage {
		deletingDeployments = append(deletingDeployments, gcp.kfDef.Name+"-storage")
	}
	if _, networkStatErr := os.Stat(path.Join(gcp.kfDef.Spec.AppDir, GCP_CONFIG, NETWORK_FILE)); !os.IsNotExist(networkStatErr) {
		deletingDeployments = append(deletingDeployments, gcp.kfDef.Name+"-network")
	}
	if _, gcfsStatErr := os.Stat(path.Join(gcp.kfDef.Spec.AppDir, GCP_CONFIG, GCFS_FILE)); !os.IsNotExist(gcfsStatErr) {
		deletingDeployments = append(deletingDeployments, gcp.kfDef.Name+"-gcfs")
	}

	for _, d := range deletingDeployments {
		if err = deleteDeployment(deploymentmanagerService, ctx, project, d); err != nil {
			return err
		}
	}

	policy, err := utils.GetIamPolicy(project, gcp.client)
	if err != nil {
		return &kfapis.KfError{
			Code:    err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Error when getting IAM policy: %v", err.(*kfapis.KfError).Message),
		}
	}
	saSet := mapset.NewSet(
		"serviceAccount:"+getSA(gcp.kfDef.Name, "admin", project),
		"serviceAccount:"+getSA(gcp.kfDef.Name, "user", project),
		"serviceAccount:"+getSA(gcp.kfDef.Name, "vm", project))
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
	if err = utils.SetIamPolicy(project, policy, gcp.client); err != nil {
		return &kfapis.KfError{
			Code:    err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Error when cleaning IAM policy: %v", err.(*kfapis.KfError).Message),
		}
	}
	if err = gcp.deleteEndpoints(ctx); err != nil {
		return err
	}

	return nil
}

func (gcp *Gcp) copyFile(source string, dest string) error {
	from, err := os.Open(source)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot open input for copying: %v", err),
		}
	}
	defer from.Close()
	to, err := os.OpenFile(dest, os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot create dest file %v  Error %v", dest, err),
		}
	}
	defer to.Close()
	_, err = io.Copy(to, from)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("copy failed source %v dest %v Error %v", source, dest, err),
		}
	}

	return nil
}

// Helper function to generate account field for IAP.
func (gcp *Gcp) getIapAccount() string {
	iapAcct := "serviceAccount:" + gcp.kfDef.Spec.Email
	if !strings.Contains(gcp.kfDef.Spec.Email, "iam.gserviceaccount.com") {
		iapAcct = "user:" + gcp.kfDef.Spec.Email
	}
	return iapAcct
}

// Write IAM binding rules based on GCP app config.
func (gcp *Gcp) writeIamBindingsFile(src string, dest string) error {
	buf, err := ioutil.ReadFile(src)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when reading template %v: %v", src, err),
		}
	}

	var data map[string]interface{}
	if err = yaml.Unmarshal(buf, &data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when unmarshaling template %v: %v", src, err),
		}
	}

	e, ok := data["bindings"]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Invalid IAM bindings format: not able to find `bindings` entry.",
		}
	}

	roles := map[string]string{
		"set-kubeflow-admin-service-account": "serviceAccount:" + getSA(gcp.kfDef.Name, "admin", gcp.kfDef.Spec.Project),
		"set-kubeflow-user-service-account":  "serviceAccount:" + getSA(gcp.kfDef.Name, "user", gcp.kfDef.Spec.Project),
		"set-kubeflow-vm-service-account":    "serviceAccount:" + getSA(gcp.kfDef.Name, "vm", gcp.kfDef.Spec.Project),
		"set-kubeflow-iap-account":           gcp.getIapAccount(),
	}

	bindings := e.([]interface{})
	for idx, b := range bindings {
		binding := b.(map[string]interface{})
		if mem, ok := binding["members"]; ok {
			members := mem.([]interface{})
			var newMembers []string
			for _, m := range members {
				member := m.(string)
				if acct, ok := roles[member]; ok {
					newMembers = append(newMembers, acct)
				} else {
					newMembers = append(newMembers, member)
				}
			}
			binding["members"] = newMembers
			bindings[idx] = binding
		} else {
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: "Invalid IAM bindings format: not able to find `members` entry.",
			}
		}
	}
	data["bindings"] = bindings

	if buf, err = yaml.Marshal(data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when marshaling IAM bindings: %v", err),
		}
	}
	if err = ioutil.WriteFile(dest, buf, 0644); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when writing IAM bindings: %v", err),
		}
	}
	return nil
}

// Replace placeholders and write to cluster-kubeflow.yaml
//
// TODO(jlewi): Is it possible to deserialize YAML to a partially known struct?
func (gcp *Gcp) writeClusterConfig(src string, dest string, gcpPluginSpec GcpPluginSpec) error {
	buf, err := ioutil.ReadFile(src)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when reading template %v: %v", src, err),
		}
	}

	var data map[string]interface{}
	if err = yaml.Unmarshal(buf, &data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when unmarshaling template %v: %v", src, err),
		}
	}

	res, ok := data["resources"]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Invalid cluster config - not able to find resources entry.",
		}
	}

	resources := res.([]interface{})
	for idx, re := range resources {
		resource := re.(map[string]interface{})
		var properties map[string]interface{}
		if props, ok := resource["properties"]; ok {
			properties = props.(map[string]interface{})
		} else {
			properties = make(map[string]interface{})
		}
		properties["gkeApiVersion"] = kftypesv3.DefaultGkeApiVer
		properties["zone"] = gcp.kfDef.Spec.Zone
		properties["users"] = []string{
			gcp.getIapAccount(),
		}
		properties["ipName"] = gcp.kfDef.Spec.IpName
		resource["properties"] = properties
		if *gcpPluginSpec.EnableWorkloadIdentity {
			properties["enable-workload-identity"] = true
			properties["identity-namespace"] = gcp.kfDef.Spec.Project + ".svc.id.goog"
		}
		resources[idx] = resource
	}
	data["resources"] = resources

	if buf, err = yaml.Marshal(data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when marshaling for %v: %v", dest, err),
		}
	}
	if err = ioutil.WriteFile(dest, buf, 0644); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when writing to %v: %v", dest, err),
		}
	}

	return nil
}

// Replace placeholders and write to storage-kubeflow.yaml
func (gcp *Gcp) writeStorageConfig(src string, dest string) error {
	buf, err := ioutil.ReadFile(src)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when reading storage-kubeflow template: %v", err),
		}
	}

	var data map[string]interface{}
	if err = yaml.Unmarshal(buf, &data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when unmarshaling template %v: %v", src, err),
		}
	}

	res, ok := data["resources"]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Invalid storage config - not able to find resources entry.",
		}
	}

	resources := res.([]interface{})
	for idx, re := range resources {
		resource := re.(map[string]interface{})
		var properties map[string]interface{}
		if props, ok := resource["properties"]; ok {
			properties = props.(map[string]interface{})
		} else {
			properties = make(map[string]interface{})
		}
		properties["zone"] = gcp.kfDef.Spec.Zone
		properties["createPipelinePersistentStorage"] = true
		resource["properties"] = properties
		resources[idx] = resource
	}
	data["resources"] = resources

	if buf, err = yaml.Marshal(data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when marshaling for %v: %v", dest, err),
		}
	}
	if err = ioutil.WriteFile(dest, buf, 0644); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when writing to %v: %v", dest, err),
		}
	}

	return nil
}

func (gcp *Gcp) generateDMConfigs() error {
	pluginSpec, err := gcp.GetPluginSpec()

	if err != nil {
		return nil
	}

	appDir := gcp.kfDef.Spec.AppDir
	gcpConfigDir := path.Join(appDir, GCP_CONFIG)
	gcpConfigDirErr := os.MkdirAll(gcpConfigDir, os.ModePerm)
	if gcpConfigDirErr != nil {
		return &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot create directory %v using appdir %v",
				gcpConfigDirErr, appDir),
		}
	}
	repo, ok := gcp.kfDef.Status.ReposCache[pluginSpec.DeploymentManagerConfig.RepoRef.Name]

	if !ok {
		err := fmt.Errorf("Repo %v not found in KfDef.Status.ReposCache", pluginSpec.DeploymentManagerConfig.RepoRef.Name)
		log.Errorf("%v", err)
		return errors.WithStack(err)
	}

	sourceDir := path.Join(repo.LocalPath, pluginSpec.DeploymentManagerConfig.RepoRef.Path)
	files := []string{"cluster.jinja", "cluster.jinja.schema", "storage.jinja",
		"storage.jinja.schema"}
	for _, file := range files {
		sourceFile := filepath.Join(sourceDir, file)
		destFile := filepath.Join(gcpConfigDir, file)
		copyErr := gcp.copyFile(sourceFile, destFile)
		if copyErr != nil {
			return &kfapis.KfError{
				Code: copyErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("could not copy %v to %v using repo local path %v Error %v",
					sourceFile, destFile, repo.LocalPath, copyErr.(*kfapis.KfError).Message),
			}
		}
	}

	// Reading from templates and write to gcp_config directory with content had placeholders
	// replaced.
	from := filepath.Join(sourceDir, "iam_bindings_template.yaml")
	to := filepath.Join(gcpConfigDir, "iam_bindings.yaml")
	if err := gcp.writeIamBindingsFile(from, to); err != nil {
		return err
	}
	from = filepath.Join(sourceDir, CONFIG_FILE)
	to = filepath.Join(gcpConfigDir, CONFIG_FILE)
	if err := gcp.writeClusterConfig(from, to, *pluginSpec); err != nil {
		return err
	}
	if pluginSpec.GetCreatePipelinePersistentStorage() {
		log.Infof("Configuring pipelines persistent storage")
		from = filepath.Join(sourceDir, STORAGE_FILE)
		to = filepath.Join(gcpConfigDir, STORAGE_FILE)
		if err := gcp.writeStorageConfig(from, to); err != nil {
			return err
		}
	}

	return nil
}

// createOrUpdateSecret creates or updates the existing secret.
func createOrUpdateSecret(client *clientset.Clientset, secret *v1.Secret) error {
	// Try creating the secret
	_, err := client.CoreV1().Secrets(secret.Namespace).Create(secret)

	if err != nil {
		if k8serrors.IsAlreadyExists(err) {
			_, err = client.CoreV1().Secrets(secret.Namespace).Update(secret)

			if err != nil {
				log.Errorf("Error trying to update secret %v.%v; error %v", secret.Namespace, secret.Name, err)
				return &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: err.Error(),
				}
			}
		} else {
			log.Errorf("Error trying to create secret %v.%v; error %v", secret.Namespace, secret.Name, err)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: err.Error(),
			}
		}
	}
	return nil
}

// TODO(jlewi): We should replace all calls to this method with createOrUpdateSecret
func insertSecret(client *clientset.Clientset, secretName string, namespace string, data map[string][]byte) error {
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      secretName,
			Namespace: namespace,
		},
		Data: data,
	}
	_, err := client.CoreV1().Secrets(namespace).Create(secret)
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}
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
	oClient := oauth2.NewClient(ctx, gcp.tokenSource)
	iamService, err := iam.New(oClient)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Get Oauth Client error: %v", err),
		}
	}
	name := fmt.Sprintf("projects/%v/serviceAccounts/%v", gcp.kfDef.Spec.Project,
		email)
	req := &iam.CreateServiceAccountKeyRequest{
		KeyAlgorithm:   "KEY_ALG_RSA_2048",
		PrivateKeyType: "TYPE_GOOGLE_CREDENTIALS_FILE",
	}
	saKey, err := iamService.Projects.ServiceAccounts.Keys.Create(name, req).Context(ctx).Do()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Service account key creation error: %v", err),
		}
	}
	privateKeyData, err := base64.StdEncoding.DecodeString(saKey.PrivateKeyData)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("PrivateKeyData decoding error: %v", err),
		}
	}
	return insertSecret(client, secretName, namespace, map[string][]byte{
		secretName + ".json": privateKeyData,
	})
}

// User CLIENT_ID and CLIENT_SECRET from GCP to create a secret for IAP.
func (gcp *Gcp) createIapSecret(ctx context.Context, client *clientset.Clientset) error {
	p, err := gcp.GetPluginSpec()

	if err != nil {
		return err
	}

	oauthSecretNamespace := gcp.kfDef.Namespace

	if p.Auth == nil {
		return errors.WithStack(fmt.Errorf("GcpPluginSpec has no Auth"))
	}

	if p.Auth.IAP == nil {
		return errors.WithStack(fmt.Errorf("GcpPluginSpec has no Auth.IAP"))
	}

	if gcp.kfDef.Spec.UseIstio {
		oauthSecretNamespace = gcp.getIstioNamespace()
	}

	if _, err := client.CoreV1().Secrets(oauthSecretNamespace).
		Get(KUBEFLOW_OAUTH, metav1.GetOptions{}); err == nil {
		log.Infof("Secret for %v already exits ...", KUBEFLOW_OAUTH)
		return nil
	}

	oauthSecret, err := gcp.kfDef.GetSecret(p.Auth.IAP.OAuthClientSecret.Name)

	if err != nil {
		log.Errorf("Could not read IAP OAuth ClientSecret from KfDef; error %v", err)
		return err
	}

	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      KUBEFLOW_OAUTH,
			Namespace: oauthSecretNamespace,
		},
		Data: map[string][]byte{
			strings.ToLower(CLIENT_ID):     []byte(p.Auth.IAP.OAuthClientId),
			strings.ToLower(CLIENT_SECRET): []byte(oauthSecret),
		},
	}
	return createOrUpdateSecret(client, secret)
}

func base64EncryptPassword(password string) (string, error) {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return "", &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when hashing password: %v", err),
		}
	}
	encodedPassword := base64.StdEncoding.EncodeToString(passwordHash)

	return encodedPassword, nil
}

// TODO(jlewi): Add a unittest to this function.
func (gcp *Gcp) buildBasicAuthSecret() (*v1.Secret, error) {
	p, err := gcp.GetPluginSpec()

	if err != nil {
		return nil, err
	}

	if p.Auth == nil || p.Auth.BasicAuth == nil || p.Auth.BasicAuth.Password.Name == "" {
		err := errors.WithStack(fmt.Errorf("BasicAuth.Password.Name must be set"))
		log.Errorf("%v", err)
		return nil, err
	}

	encodedPassword, err := gcp.kfDef.GetSecret(p.Auth.BasicAuth.Password.Name)

	if err != nil {
		log.Errorf("There was a problem getting the password for basic auth; error %v", err)
		return nil, err
	}

	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      BASIC_AUTH_SECRET,
			Namespace: gcp.kfDef.Namespace,
		},
		Data: map[string][]byte{
			"username":     []byte(p.Auth.BasicAuth.Username),
			"passwordhash": []byte(encodedPassword),
		},
	}

	return secret, nil
}

// createBasicAuthSecret creates a secret containing basic auth information.
func (gcp *Gcp) createBasicAuthSecret(client *clientset.Clientset) error {
	secret, err := gcp.buildBasicAuthSecret()

	if err != nil {
		return err
	}

	return createOrUpdateSecret(client, secret)
}

func (gcp *Gcp) getIstioNamespace() string {
	if ingressNamespace, ok := gcp.kfDef.GetApplicationParameter("iap-ingress", "namespace"); ok {
		return ingressNamespace
	}
	if ingressNamespace, ok := gcp.kfDef.GetApplicationParameter("basic-auth-ingress", "namespace"); ok {
		return ingressNamespace
	}
	return gcp.kfDef.Namespace
}

func (gcp *Gcp) createSecrets() error {
	ctx := context.Background()

	p, err := gcp.GetPluginSpec()
	if err != nil {
		return err
	}

	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, "set K8s clientset error")
	}
	// If workload identity is enabled, we don't need to create secrets.
	if !(*p.EnableWorkloadIdentity) {
		adminEmail := getSA(gcp.kfDef.Name, "admin", gcp.kfDef.Spec.Project)
		userEmail := getSA(gcp.kfDef.Name, "user", gcp.kfDef.Spec.Project)
		if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME, gcp.kfDef.Namespace); err != nil {
			return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create admin secret %v", ADMIN_SECRET_NAME))
		}
		if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME, gcp.kfDef.Namespace); err != nil {
			return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create user secret %v", USER_SECRET_NAME))
		}
		// Also create service account secret in istio namespace
		if gcp.kfDef.Spec.UseIstio {
			if err = createNamespace(k8sClient, gcp.getIstioNamespace()); err != nil {
				return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create istio namespace"))
			}
			if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME, gcp.getIstioNamespace()); err != nil {
				return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create admin secret %v", ADMIN_SECRET_NAME))
			}
			if err := gcp.createGcpServiceAcctSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME, gcp.getIstioNamespace()); err != nil {
				return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create user secret %v", USER_SECRET_NAME))
			}
		}
	}
	if gcp.kfDef.Spec.UseBasicAuth {
		if err := gcp.createBasicAuthSecret(k8sClient); err != nil {
			return kfapis.NewKfErrorWithMessage(err, "cannot create basic auth login secret")
		}
	} else {
		if err := gcp.createIapSecret(ctx, k8sClient); err != nil {
			return kfapis.NewKfErrorWithMessage(err, "cannot create IAP auth secret")
		}
	}
	return nil
}

// setupWorkloadIdentity creates the k8s service accounts and IAM bindings for them
func (gcp *Gcp) setupWorkloadIdentity(namespace string) error {
	ctx := context.Background()
	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, "Get K8s clientset error")
	}
	// Create k8s service accounts
	// TODO(lunkai): Might be better to specify k8s sa by kustomize
	k8sServiceAccounts := []string{
		"kf-admin",
		"kf-user",
		"kf-vm",
	}
	gcpServiceAccounts := []string{
		fmt.Sprintf("%v-admin@%v.iam.gserviceaccount.com", gcp.kfDef.Name, gcp.kfDef.Spec.Project),
		fmt.Sprintf("%v-user@%v.iam.gserviceaccount.com", gcp.kfDef.Name, gcp.kfDef.Spec.Project),
		fmt.Sprintf("%v-vm@%v.iam.gserviceaccount.com", gcp.kfDef.Name, gcp.kfDef.Spec.Project),
	}
	for idx, k8sSa := range k8sServiceAccounts {
		createK8sServiceAccount(k8sClient, namespace, k8sSa, "serviceAccount:"+gcpServiceAccounts[idx])
	}

	oClient := oauth2.NewClient(ctx, gcp.tokenSource)
	iamService, err := iam.New(oClient)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Get Oauth Client error: %v", err),
		}
	}
	// Create IAM bindings under each GCP service account (different from IAM bindings for projects)
	// Could we combine the updates into a single set of Get/Set requests?
	// Can we also refactor the code so that we have a separate functions that generate the modified policy but don't apply it and then write a unittest that the modified policy is correct?
	for idx, gcpSa := range gcpServiceAccounts {
		log.Infof("Setting up iam policy for serviceaccount: %v in namespace %v", gcpSa, namespace)
		policy, err := utils.GetServiceAccountIamPolicy(iamService, gcp.kfDef.Spec.Project, gcpSa)
		if err != nil {
			return err
		}
		err = utils.UpdateWorkloadIdentityBindingsPolicy(policy, gcp.kfDef.Spec.Project, namespace, k8sServiceAccounts[idx])
		if err != nil {
			return err
		}
		log.Infof("New policy: %v", *policy)
		err = utils.SetServiceAccountIamPolicy(iamService, policy, gcp.kfDef.Spec.Project, gcpSa)
		if err != nil {
			return err
		}
	}
	return nil
}

// createK8sServiceAccount creates k8s servicea account with annotation
// iam.gke.io/gcp-service-account=gsa
// TODO(lunkai): Ideally the k8s service account should be specified by kustomize.
func createK8sServiceAccount(k8sClientset *clientset.Clientset, namespace string, name string, gsa string) error {
	log.Infof("Creating service account %v in namespace %v", name, namespace)
	_, err := k8sClientset.CoreV1().ServiceAccounts(namespace).Get(name, metav1.GetOptions{})
	if err == nil {
		log.Infof("Service account already exists...")
		return nil
	}
	log.Infof("Get service account error: %v", err)
	_, err = k8sClientset.CoreV1().ServiceAccounts(namespace).Create(
		&v1.ServiceAccount{
			ObjectMeta: metav1.ObjectMeta{
				Name:      name,
				Namespace: namespace,
				Annotations: map[string]string{
					// We don't need the "serviceAccount:" part here
					"iam.gke.io/gcp-service-account": strings.Split(gsa, ":")[1],
				},
			},
		},
	)
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}
}

func (gcp *Gcp) SetupDefaultNamespaceWorkloadIdentity() error {
	defaultNamespace := kftypesv3.EmailToDefaultName(gcp.kfDef.Spec.Email)
	return gcp.setupWorkloadIdentity(defaultNamespace)
}

func generatePodDefault(group string, version string, kind string, namespace string) *unstructured.Unstructured {
	log.Infof("Generating %v in namespace %v; APIVersion %v/%v", kind, namespace, group, version)

	// TODO(gabrielwen): Clean up after v2 dependencies are fixed.
	// https://github.com/kubeflow/kubeflow/issues/3713
	unstructuredContent := map[string]interface{}{
		"apiVersion": group + "/" + version,
		"kind":       kind,
		"metadata": map[string]interface{}{
			"name":      "add-gcp-secret",
			"namespace": namespace,
		},
		"spec": map[string]interface{}{
			"selector": map[string]interface{}{
				"matchLabels": map[string]interface{}{
					"add-gcp-secret": "true",
				},
			},
			"desc": "add gcp credential",
			"env": []interface{}{
				map[string]interface{}{
					"name":  "GOOGLE_APPLICATION_CREDENTIALS",
					"value": "/secret/gcp/user-gcp-sa.json",
				},
			},
			"volumeMounts": []interface{}{
				map[string]interface{}{
					"name":      "secret-volume",
					"mountPath": "/secret/gcp",
				},
			},
			"volumes": []interface{}{
				map[string]interface{}{
					"name": "secret-volume",
					"secret": map[string]interface{}{
						"secretName": USER_SECRET_NAME,
					},
				},
			},
		},
	}

	podDefault := &unstructured.Unstructured{
		Object: unstructuredContent,
	}
	return podDefault
}

// Configure PodDefault to add secret.
func (gcp *Gcp) ConfigPodDefault() error {
	if gcp.kfDef.Spec.Email == "" {
		return nil
	}

	ctx := context.Background()
	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, "set K8s clientset error")
	}

	log.Infof("Downloading secret %v from namespace %v", USER_SECRET_NAME, gcp.kfDef.Namespace)
	secret, err := k8sClient.CoreV1().Secrets(gcp.kfDef.Namespace).Get(USER_SECRET_NAME, metav1.GetOptions{})
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, "User service account secret is not created.")
	}
	defaultNamespace := kftypesv3.EmailToDefaultName(gcp.kfDef.Spec.Email)
	log.Infof("Creating secret %v to namespace %v", USER_SECRET_NAME, defaultNamespace)
	if err = insertSecret(k8sClient, USER_SECRET_NAME, defaultNamespace, secret.Data); err != nil {
		return kfapis.NewKfErrorWithMessage(err, fmt.Sprintf("cannot create secret %v in namespace %v", USER_SECRET_NAME, defaultNamespace))
	}

	group := "kubeflow.org"
	version := "v1alpha1"
	kind := "PodDefault"
	podDefault := generatePodDefault(group, version, kind, defaultNamespace)
	cluster, err := utils.GetClusterInfo(ctx, gcp.kfDef.Spec.Project,
		gcp.kfDef.Spec.Zone, gcp.kfDef.Name, gcp.tokenSource)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("get Cluster error: %v", err),
		}
	}
	body, err := podDefault.MarshalJSON()
	if err != nil {
		return kfapis.NewKfErrorWithMessage(err, "Marshal error for PodDefault config.")
	}

	// Need to re-configure restful client to remap group/kind/version.
	config, err := utils.BuildConfigFromClusterInfo(ctx, cluster, gcp.tokenSource)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("build ClientConfig error: %v", err),
		}
	}
	_discoveryClient, err := discovery.NewDiscoveryClientForConfig(config)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("build DiscoveryClient error: %v", err),
		}
	}
	_cached := cached.NewMemCacheClient(_discoveryClient)
	_cached.Invalidate()
	mapper := restmapper.NewDeferredDiscoveryRESTMapper(_cached)
	gk := schema.GroupKind{
		Group: group,
		Kind:  kind,
	}
	mapping, err := mapper.RESTMapping(gk, version)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("config Group/Version/Kind error: %v", err),
		}
	}
	c := restv2.CopyConfig(config)
	c.GroupVersion = &schema.GroupVersion{
		Group:   group,
		Version: version,
	}
	c.NegotiatedSerializer = serializer.DirectCodecFactory{CodecFactory: scheme.Codecs}
	c.APIPath = "/apis"
	crdClient, err := restv2.RESTClientFor(c)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("config RestClient error: %v", err),
		}
	}

	req := crdClient.Post().Resource(mapping.Resource.Resource).Body(body)
	req = req.Namespace(defaultNamespace)
	result := req.Do()

	return result.Error()
}

// setGcpPluginDefaults sets the GcpPlugin defaults.
func (gcp *Gcp) setGcpPluginDefaults() error {
	// Set the email
	if gcp.kfDef.Spec.Email == "" && gcp.gcpAccountGetter != nil {
		email, err := gcp.gcpAccountGetter()
		if err != nil {
			log.Errorf("cannot get gcloud account email. Error: %v", err)
			return err
		}
		email = strings.TrimSpace(email)
		gcp.kfDef.Spec.Email = email
	} else {
		log.Warnf("gcpAccountGetter not set; can't get default email")
	}

	// Set the defaults that will be used if not explicitly set.
	// If the plugin is provided these values will be overwritten,
	pluginSpec := &GcpPluginSpec{}
	err := gcp.kfDef.GetPluginSpec(GcpPluginName, pluginSpec)

	if err != nil && !kfdefs.IsPluginNotFound(err) {
		log.Errorf("There was a problem getting the gcp plugin %v", err)
		return errors.WithStack(err)
	}

	if pluginSpec.CreatePipelinePersistentStorage == nil {
		pluginSpec.CreatePipelinePersistentStorage = proto.Bool(pluginSpec.GetCreatePipelinePersistentStorage())
		log.Infof("CreatePipelinePersistentStorage not set defaulting to %v", *pluginSpec.CreatePipelinePersistentStorage)
	}

	if pluginSpec.EnableWorkloadIdentity == nil {
		pluginSpec.EnableWorkloadIdentity = proto.Bool(pluginSpec.GetEnableWorkloadIdentity())
		log.Infof("EnableWorkloadIdentity not set defaulting to %v", *pluginSpec.EnableWorkloadIdentity)
	}

	if pluginSpec.Auth == nil {
		pluginSpec.Auth = &Auth{}
	}

	if pluginSpec.Auth.BasicAuth == nil && pluginSpec.Auth.IAP == nil {
		log.Warnf("Backfilling auth; this is deprecated; Auth should be explicitly set in Gcp plugin")

		if gcp.kfDef.Spec.UseBasicAuth {
			pluginSpec.Auth.BasicAuth = &BasicAuth{}
			pluginSpec.Auth.BasicAuth.Username = os.Getenv(kftypesv3.KUBEFLOW_USERNAME)

			if pluginSpec.Auth.BasicAuth.Username == "" {
				log.Errorf("Could not configure basic auth; environment variable %s not set", kftypesv3.KUBEFLOW_USERNAME)
				return errors.WithStack(fmt.Errorf("Could not configure basic auth; environment variable %s not set", kftypesv3.KUBEFLOW_USERNAME))
			}

			pluginSpec.Auth.BasicAuth.Password = &kfdefs.SecretRef{
				Name: BasicAuthPasswordSecretName,
			}

			password := os.Getenv(kftypesv3.KUBEFLOW_PASSWORD)
			if password == "" {
				log.Errorf("Could not configure basic auth; environment variable %s not set", kftypesv3.KUBEFLOW_PASSWORD)
				return errors.WithStack(fmt.Errorf("Could not configure basic auth; environment variable %s not set", kftypesv3.KUBEFLOW_PASSWORD))
			}
			encodedPassword, err := base64EncryptPassword(password)

			if err != nil {
				log.Errorf("There was a problem encrypting the password; %v", err)
				return errors.WithStack(err)
			}

			gcp.kfDef.SetSecret(kfdefs.Secret{
				Name: BasicAuthPasswordSecretName,
				SecretSource: &kfdefs.SecretSource{
					HashedSource: &kfdefs.HashedSource{
						HashedValue: encodedPassword,
					},
				},
			})
		} else {
			pluginSpec.Auth.IAP = &IAP{}

			pluginSpec.Auth.IAP.OAuthClientId = os.Getenv(CLIENT_ID)

			if pluginSpec.Auth.IAP.OAuthClientId == "" {
				log.Errorf("Could not configure IAP auth; environment variable %s not set", CLIENT_ID)
				return errors.WithStack(fmt.Errorf("Could not configure IAP auth; environment variable %s not set", CLIENT_ID))
			}

			pluginSpec.Auth.IAP.OAuthClientSecret = &kfdefs.SecretRef{
				Name: CLIENT_SECRET,
			}

			gcp.kfDef.SetSecret(kfdefs.Secret{
				Name: CLIENT_SECRET,
				SecretSource: &kfdefs.SecretSource{
					EnvSource: &kfdefs.EnvSource{
						Name: CLIENT_SECRET,
					},
				},
			})
		}
	}

	// Initialize the deployment manager configs.
	if pluginSpec.DeploymentManagerConfig == nil {
		pluginSpec.DeploymentManagerConfig = &DeploymentManagerConfig{}
	}

	if pluginSpec.DeploymentManagerConfig.RepoRef == nil {
		pluginSpec.DeploymentManagerConfig.RepoRef = &kfdefs.RepoRef{
			Name: kftypesv3.KubeflowRepoName,
			Path: DEFAULT_DM_PATH,
		}
	}

	return gcp.kfDef.SetPluginSpec(GcpPluginName, pluginSpec)
}

// Generate generates the gcp kfapp manifest.
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (gcp *Gcp) Generate(resources kftypesv3.ResourceEnum) error {
	if err := gcp.kfDef.SyncCache(); err != nil {
		log.Errorf("Failed to synchronize the cache; error %v", err)
		return errors.WithStack(err)
	}

	if err := gcp.setGcpPluginDefaults(); err != nil {
		return errors.WithStack(err)
	}

	pluginSpec := &GcpPluginSpec{}
	err := gcp.kfDef.GetPluginSpec(GcpPluginName, pluginSpec)

	if err != nil {
		log.Errorf("Could not get GcpPluginSpec; error %v", err)
		return err
	}

	if gcp.kfDef.Spec.Email == "" {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "email not specified.",
		}
	}

	// Set default IPName and Hostname
	// This needs to happen before calling generateDM configs.
	if gcp.kfDef.Spec.IpName == "" {
		gcp.kfDef.Spec.IpName = gcp.kfDef.Name + "-ip"
	}
	if gcp.kfDef.Spec.Hostname == "" {
		gcp.kfDef.Spec.Hostname = gcp.kfDef.Name + ".endpoints." + gcp.kfDef.Spec.Project + ".cloud.goog"
	}

	switch resources {
	case kftypesv3.ALL:
		fallthrough
	case kftypesv3.PLATFORM:
		gcpConfigFilesErr := gcp.generateDMConfigs()
		if gcpConfigFilesErr != nil {

			code := http.StatusInternalServerError
			if v, ok := gcpConfigFilesErr.(*kfapis.KfError); ok {
				code = v.Code
			}

			return &kfapis.KfError{
				Code: code,
				Message: fmt.Sprintf("could not generate deployment manager configs under %v Error: %v",
					GCP_CONFIG, gcpConfigFilesErr),
			}
		}
	}

	if err := gcp.kfDef.SetApplicationParameter("profiles", "admin", gcp.kfDef.Spec.Email); err != nil {
		return errors.WithStack(err)
	}

	if gcp.kfDef.Spec.UseBasicAuth {
		if err := gcp.kfDef.SetApplicationParameter("basic-auth-ingress", "ipName", gcp.kfDef.Spec.IpName); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("basic-auth-ingress", "hostname", gcp.kfDef.Spec.Hostname); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("basic-auth-ingress", "project", gcp.kfDef.Spec.Project); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("istio", "clusterRbacConfig", "OFF"); err != nil {
			return errors.WithStack(err)
		}
	} else {
		if err := gcp.kfDef.SetApplicationParameter("iap-ingress", "ipName", gcp.kfDef.Spec.IpName); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("iap-ingress", "hostname", gcp.kfDef.Spec.Hostname); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("profiles", "admin", gcp.kfDef.Spec.Email); err != nil {
			return errors.WithStack(err)
		}
	}
	if *pluginSpec.CreatePipelinePersistentStorage {
		log.Infof("Configuring pipeline, minio, and mysql applications")
		minioPdName := gcp.kfDef.Name + "-storage-artifact-store"
		mysqlPdName := gcp.kfDef.Name + "-storage-metadata-store"

		if err := gcp.kfDef.SetApplicationParameter("minio", "minioPd", minioPdName); err != nil {
			return errors.WithStack(err)
		}
		if err := gcp.kfDef.SetApplicationParameter("mysql", "mysqlPd", mysqlPdName); err != nil {
			return errors.WithStack(err)
		}
	}

	// TODO(jlewi): Why is this hard coded here?
	if err := gcp.kfDef.SetApplicationParameter("notebook-controller", "injectGcpCredentials", "true"); err != nil {
		return errors.WithStack(err)
	}

	// TODO(jlewi): Why are we setting usage Id here (gcp.go) and not in kustomize.go so we do it for all platforms?
	rand.Seed(time.Now().UnixNano())
	if err := gcp.kfDef.SetApplicationParameter("spartakus", "usageId", strconv.Itoa(rand.Int())); err != nil {
		if kfdefs.IsAppNotFound(err) {
			log.Infof("Spartakus not included; not setting usageId")
		}
	}

	createConfigErr := gcp.kfDef.WriteToConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code: createConfigErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("cannot create config file %v in %v: %v", kftypesv3.KfConfigFile, gcp.kfDef.Spec.AppDir,
				createConfigErr.(*kfapis.KfError).Message),
		}
	}
	return nil
}

func (gcp *Gcp) gcpInitProject() error {
	if err := gcp.initGcpClient(); err != nil {
		log.Errorf("There was a problem initializing the GCP client; %v", err)
		return errors.WithMessagef(err, "Gcp.gcpInitProject Could not initatie a GCP client")
	}

	ctx := context.Background()
	serviceusageService, serviceusageServiceErr := serviceusage.New(gcp.client)
	if serviceusageServiceErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not create service usage service %v", serviceusageServiceErr),
		}
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
	op, opErr := serviceusageService.Services.BatchEnable("projects/"+gcp.kfDef.Spec.Project,
		&serviceusage.BatchEnableServicesRequest{
			ServiceIds: enabledApis,
		}).Context(ctx).Do()
	if opErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("issuing batch API enabling services error: %v", opErr),
		}
	}
	opService := serviceusage.NewOperationsService(serviceusageService)
	opName := "" + op.Name
	return backoff.Retry(func() error {
		newOp, retryErr := opService.Get(opName).Context(ctx).Do()
		if retryErr != nil {
			log.Errorf("long running batch API enabling services error: %v", retryErr)
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("long running batch API enabling services error: %v", retryErr),
			}
		}
		if newOp.Error != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("long running batch API enabling services error: %v", newOp.Error.Message),
			}
		}
		if newOp.Done {
			if newOp.HTTPStatusCode != 200 {
				return backoff.Permanent(&kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("Abnormal response code: %v", newOp.HTTPStatusCode),
				})
			}
			log.Infof("batch API enabling is completed: %v", enabledApis)
			return nil

		}
		log.Infof("batch API enabling is running: %v (op = %v)", enabledApis, newOp.Name)
		opName = "" + newOp.Name
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("batch API enabling is running..."),
		}
	}, newDefaultBackoff())
}

// Init initializes a gcp kfapp
func (gcp *Gcp) Init(resources kftypesv3.ResourceEnum) error {
	// TODO(jlewi): Can we get rid of this now that we ware using kustomize?
	swaggerFile := filepath.Join(path.Dir(gcp.kfDef.Spec.Repo), kftypesv3.DefaultSwaggerFile)
	gcp.kfDef.Spec.ServerVersion = "file:" + swaggerFile
	createConfigErr := gcp.kfDef.WriteToConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot create config file app.yaml in %v", gcp.kfDef.Spec.AppDir),
		}
	}

	if !gcp.kfDef.Spec.SkipInitProject {
		log.Infof("Not skipping GCP project init, running gcpInitProject.")
		initProjectErr := gcp.gcpInitProject()
		if initProjectErr != nil {
			return initProjectErr
		}
	}

	return nil
}

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
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfctlutils "github.com/kubeflow/kubeflow/bootstrap/pkg/utils"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/iam/v1"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

// The namespace for Istio
const IstioNamespace = "istio-system"

// Apply the gcp kfapp
func (gcp *Gcp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	// Update deployment manager
	updateDMErr := gcp.updateDM(resources, options)
	if updateDMErr != nil {
		return fmt.Errorf("gcp apply could not update deployment manager Error %v", updateDMErr)
	}
	// Install Istio
	if gcp.GcpApp.Spec.UseIstio {
		log.Infof("Installing istio...")
		istioDir := path.Join(gcp.GcpApp.Spec.AppDir, ISTIO_DIR)
		err := kfctlutils.RunKubectlApply(path.Join(istioDir, ISTIO_CRD))
		if err != nil {
			return fmt.Errorf("gcp apply could not install istio, Error %v", err)
		}
		err = kfctlutils.RunKubectlApply(path.Join(istioDir, ISTIO_INSTALL))
		if err != nil {
			return fmt.Errorf("gcp apply could not install istio, Error %v", err)
		}
		log.Infof("Done installing istio.")
	}
	// Insert secrets into the cluster
	secretsErr := gcp.createSecrets(options)
	if secretsErr != nil {
		return fmt.Errorf("gcp apply could not create secrets Error %v", secretsErr)
	}
	// Apply ksonnet components
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

	if err := gcp.ConfigK8s(); err != nil {
		return fmt.Errorf("Configure K8s is failed: %v", err)
	}

	ctx := context.Background()
	cluster, err := kftypes.GetClusterInfo(ctx, gcp.GcpApp.Spec.Project,
		gcp.GcpApp.Spec.Zone, gcp.GcpApp.Name)
	if err != nil {
		return fmt.Errorf("Get Cluster error: %v", err)
	}
	client, err := kftypes.BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return fmt.Errorf("Build ClientConfig error: %v", err)
	}

	// TODO(#2604): Need to create a named context.
	credCmd := exec.Command("gcloud", "container", "clusters", "get-credentials",
		gcp.GcpApp.Name,
		"--zone="+gcp.GcpApp.Spec.Zone,
		"--project="+gcp.GcpApp.Spec.Project)
	credCmd.Stdout = os.Stdout
	log.Infof("Running get-credentials ...")
	if err = credCmd.Run(); err != nil {
		return fmt.Errorf("Error when running gcloud container clusters get-credentials: %v", err)
	}

	k8sSpecsDir := path.Join(appDir, K8S_SPECS)
	daemonsetPreloaded := filepath.Join(k8sSpecsDir, "daemonset-preloaded.yaml")
	daemonsetPreloadedErr := kfctlutils.RunKubectlApply(daemonsetPreloaded)
	if daemonsetPreloadedErr != nil {
		return fmt.Errorf("could not create resources in daemonset-preloaded.yaml %v", daemonsetPreloadedErr)
	}
	adminClient := rest.CopyConfig(client)
	adminClient.Impersonate.UserName = "admin"
	adminClient.Impersonate.Groups = []string{"system:masters"}
	rbacSetup := filepath.Join(k8sSpecsDir, "rbac-setup.yaml")
	rbacSetupErr := kfctlutils.RunKubectlApply(rbacSetup)
	if rbacSetupErr != nil {
		return fmt.Errorf("could not create resources in rbac-setup.yaml %v", rbacSetupErr)
	}
	agents := filepath.Join(k8sSpecsDir, "agents.yaml")
	agentsErr := kfctlutils.RunKubectlApply(agents)
	if agentsErr != nil {
		return fmt.Errorf("could not create resources in agents.yaml %v", agents)
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

// createGcpSecret creates a gcp service account and inserts the service acount key
// into the cluster as a secret.
func (gcp *Gcp) createGcpSecret(ctx context.Context, client *clientset.Clientset,
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

	err = gcp.insertSecret(client, secretName, gcp.GcpApp.Namespace, map[string][]byte{
		secretName + ".json": privateKeyData,
	})
	if err != nil {
		return err
	}
	// If using istio, also creates the secret in istio's namespace
	if gcp.GcpApp.Spec.UseIstio {
		err = gcp.insertSecret(client, secretName, IstioNamespace, map[string][]byte{
			secretName + ".json": privateKeyData,
		})
		if err != nil {
			return err
		}
	}
	return nil
}

// createSecrets inserts the following secret into the cluster:
//   admin-gcp-sa, user-gcp-sa, kubeflow-oauth
func (gcp *Gcp) createSecrets(options map[string]interface{}) error {
	ctx := context.Background()
	k8sClient, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return fmt.Errorf("Get K8s clientset error: %v", err)
	}
	adminEmail := getSA(gcp.GcpApp.Name, "admin", gcp.GcpApp.Spec.Project)
	userEmail := getSA(gcp.GcpApp.Name, "user", gcp.GcpApp.Spec.Project)
	if err := gcp.createGcpSecret(ctx, k8sClient, adminEmail, ADMIN_SECRET_NAME); err != nil {
		return fmt.Errorf("cannot create admin secret %v Error %v", ADMIN_SECRET_NAME, err)
	}
	if err := gcp.createGcpSecret(ctx, k8sClient, userEmail, USER_SECRET_NAME); err != nil {
		return fmt.Errorf("cannot create user secret %v Error %v", USER_SECRET_NAME, err)
	}

	_, err = k8sClient.CoreV1().Secrets(gcp.GcpApp.Namespace).Get(KUBEFLOW_OAUTH, metav1.GetOptions{})
	if err == nil {
		log.Infof("Secret for %v already exits ...", KUBEFLOW_OAUTH)
		return nil
	}

	oauthID := ""
	if options[string(kftypes.OAUTH_ID)] != nil &&
		options[string(kftypes.OAUTH_ID)].(string) != "" {
		oauthID = options[string(kftypes.OAUTH_ID)].(string)
	} else {
		oauthID = os.Getenv(CLIENT_ID)
	}
	if oauthID == "" {
		return fmt.Errorf("at least one of --%v or ENV `%v` needs to be set",
			string(kftypes.OAUTH_ID), CLIENT_ID)
	}
	oauthSecret := ""
	if options[string(kftypes.OAUTH_SECRET)] != nil &&
		options[string(kftypes.OAUTH_SECRET)].(string) != "" {
		oauthSecret = options[string(kftypes.OAUTH_SECRET)].(string)
	} else {
		oauthSecret = os.Getenv(CLIENT_SECRET)
	}
	if oauthSecret == "" {
		return fmt.Errorf("at least one of --%v or ENV `%v` needs to be set",
			string(kftypes.OAUTH_SECRET), CLIENT_SECRET)
	}

	oauthSecretNamespace := gcp.GcpApp.Namespace
	if gcp.GcpApp.Spec.UseIstio {
		oauthSecretNamespace = IstioNamespace
	}
	return gcp.insertSecret(k8sClient, KUBEFLOW_OAUTH, oauthSecretNamespace, map[string][]byte{
		strings.ToLower(CLIENT_ID):     []byte(oauthID),
		strings.ToLower(CLIENT_SECRET): []byte(oauthSecret),
	})
}

// insertSecret inserts a k8s secret into the cluster.
func (gcp *Gcp) insertSecret(client *clientset.Clientset, secretName string, namespace string,
	data map[string][]byte) error {
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

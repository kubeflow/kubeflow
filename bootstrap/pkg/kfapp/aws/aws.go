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

package aws

import (
	"encoding/base64"
	"fmt"
	"github.com/kubeflow/kubeflow/bootstrap/v2/pkg/utils"
	"golang.org/x/crypto/bcrypt"
	"io"
	"io/ioutil"
	"math/rand"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	awssdk "github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iam"
	"github.com/ghodss/yaml"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

const (
	KUBEFLOW_AWS_INFRA_DIR      = "aws_config"
	KUBEFLOW_AWS_MANIFEST_DIR   = "ks_specs"
	CLUSTER_CONFIG_FILE         = "cluster_config.yaml"
	CLUSTER_FEATURE_CONFIG_FILE = "cluster_features.yaml"
	PATH                        = "path"
	BASIC_AUTH_SECRET           = "kubeflow-login"
)

// The namespace for Istio
const IstioNamespace = "istio-system"

// Aws implements KfApp Interface
// It includes the KsApp along with additional Aws types
type Aws struct {
	kfdefs.KfDef
	iamClient *iam.IAM
	// requried when choose basic-auth
	username        string
	encodedPassword string
}

// GetKfApp returns the aws kfapp. It's called by coordinator.GetKfApp
func GetPlatform(kfdef *kfdefs.KfDef) (kftypes.Platform, error) {
	sess := session.Must(session.NewSession())

	// use aws to call sts get-caller-identity to verify aws credential works.
	if err := utils.CheckAwsStsCallerIdentity(sess); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Could not authenticate aws client: %v, Please make sure you set up AWS credentials and regions", err),
		}
	}

	_aws := &Aws{
		KfDef:     *kfdef,
		iamClient: iam.New(sess),
	}

	return _aws, nil
}

// GetK8sConfig is only used with ksonnet packageManager. NotImplemented in this version, return nil to use default config for API compatibility.
func (aws *Aws) GetK8sConfig() (*rest.Config, *clientcmdapi.Config) {
	return nil, nil
}

// TODO: Do we need to add annnotations for AWS.
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

// applyAWSInfra do three things
// 1. Create EKS cluster if needed
// 2. Attach IAM roles like ALB, FSX, EFS, cloudWatch Fluentd
// 3. Update cluster configs to enable master log or private access config.
func (aws *Aws) applyAWSInfra() error {
	config, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", err),
		}
	}

	if _, ok := config["managed_cluster"]; !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to read YAML"),
		}
	}

	// 1. Create EKS cluster if there's no cluster available
	if config["managed_cluster"] == true {
		log.Infoln("Start to create eks cluster. Please wait for 10-15 mins...")
		clusterConfigFile := filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_CONFIG_FILE)
		output, err := exec.Command("eksctl", "create", "cluster", "--config-file="+clusterConfigFile).Output()
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Call 'eksctl create cluster --config-file=%s' with errors: %v", clusterConfigFile, string(output)),
			}
		}
		log.Infoln(string(output))

		// List all the roles and figure out nodeGroupWorkerRole
		input := &iam.ListRolesInput{}
		listRolesOutput, err := aws.iamClient.ListRoles(input)

		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Call not list roles with errors: %v", err),
			}
		}

		var nodeGroupIamRoles []string
		for _, output := range listRolesOutput.Roles {
			if strings.HasPrefix(*output.RoleName, "eksctl-"+aws.KfDef.Name+"-") && strings.Contains(*output.RoleName, "NodeInstanceRole") {
				nodeGroupIamRoles = append(nodeGroupIamRoles, *output.RoleName)
			}
		}

		aws.Spec.Roles = nodeGroupIamRoles
		aws.writeConfigFile()
	} else {
		log.Infof("You already have cluster setup. Skip creating new eks cluster. ")
	}

	// 2. Attach IAM Policies
	// TODO: Once pod level IAM complete, we don't need worker group roles. Authorize cloud services using service account.
	for _, iamRole := range aws.Spec.Roles {
		aws.attachIamInlinePolicy(iamRole, "iam_alb_ingress_policy",
			filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_alb_ingress_policy.json"))
		aws.attachIamInlinePolicy(iamRole, "iam_csi_fsx_policy",
			filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_csi_fsx_policy.json"))

		if config["worker_node_group_logging"] == "true" {
			aws.attachIamInlinePolicy(iamRole, "iam_cloudwatch_policy",
				filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_cloudwatch_policy.json"))
		}
	}

	// 3. Add private access and logging support for cluster.
	// TODO: Once CloudFormation add support for master log/ private access, we can configure in cluster_config.yaml.
	// https://github.com/weaveworks/eksctl/issues/778

	return nil
}

func (aws *Aws) copyFile(source string, dest string) error {
	from, err := os.Open(source)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot create directory: %v", err),
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

// updateClusterConfig replaces placeholders in cluster_config.yaml
func (aws *Aws) updateClusterConfig(clusterConfigFile string) error {
	buf, err := ioutil.ReadFile(clusterConfigFile)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when reading template %v: %v", clusterConfigFile, err),
		}
	}

	var data map[string]interface{}
	if err = yaml.Unmarshal(buf, &data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Error when unmarshaling template %v: %v", clusterConfigFile, err),
		}
	}

	res, ok := data["metadata"]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "Invalid cluster config - not able to find metadata entry.",
		}
	}

	// Replace placeholder with clusterName and Region
	metadata := res.(map[string]interface{})
	metadata["name"] = aws.KfDef.Name
	metadata["region"] = aws.KfDef.Spec.Region
	data["metadata"] = metadata

	if buf, err = yaml.Marshal(data); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when marshaling for %v: %v", clusterConfigFile, err),
		}
	}
	if err = ioutil.WriteFile(clusterConfigFile, buf, 0644); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Error when writing to %v: %v", clusterConfigFile, err),
		}
	}

	return nil
}

// ${KUBEFLOW_SRC}/${KFAPP}/aws_config -> destDir (dest)
func (aws *Aws) generateInfraConfigs() error {
	// 1. Copy and Paste all files from `sourceDir` to `destDir`
	parentDir := path.Dir(aws.Spec.Repo)
	sourceDir := path.Join(parentDir, "deployment/aws/infra_configs")
	destDir := path.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR)

	if _, err := os.Stat(destDir); os.IsNotExist(err) {
		log.Infof("Creating AWS infrastructure configs in directory %v", destDir)
		destDirErr := os.MkdirAll(destDir, os.ModePerm)
		if destDirErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Cannot create directory %v", destDirErr),
			}
		}
	} else {
		log.Infof("AWS infrastructure configs already exist in directory %v", destDir)
	}

	files := []string{"cluster_config.yaml", "cluster_features.yaml", "iam_alb_ingress_policy.json",
		"iam_cloudwatch_policy.json", "iam_csi_fsx_policy.json"}

	for _, file := range files {
		sourceFile := filepath.Join(sourceDir, file)
		destFile := filepath.Join(destDir, file)
		copyErr := aws.copyFile(sourceFile, destFile)
		if copyErr != nil {
			return &kfapis.KfError{
				Code: copyErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("Could not copy %v to %v Error %v",
					sourceFile, destFile, copyErr.(*kfapis.KfError).Message),
			}
		}
	}

	// 2. Reading from cluster_config.yaml and replace placeholders with values in aws.spec.
	clusterConfigFile := filepath.Join(destDir, CLUSTER_CONFIG_FILE)
	if err := aws.updateClusterConfig(clusterConfigFile); err != nil {
		return err
	}

	// 3. Update managed_cluster based on roles
	// By default, let's have managed_cluster true. If user pass roles, we make it false.
	featureCfg, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Can not get AWS feature config file %v", err),
		}
	}

	if aws.KfDef.Spec.Roles != nil && len(aws.KfDef.Spec.Roles) != 0 {
		featureCfg["managed_cluster"] = false
	} else {
		featureCfg["managed_cluster"] = true
	}

	writeFeatureCfgErr := aws.writeFeatureConfig(featureCfg)
	if writeFeatureCfgErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Can not update AWS feature config file %v", err),
		}
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
	if err == nil {
		return nil
	} else {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: err.Error(),
		}
	}
}

// Use username and password provided by user and create secret for basic auth.
func (aws *Aws) createBasicAuthSecret(client *clientset.Clientset) error {
	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      BASIC_AUTH_SECRET,
			Namespace: aws.Namespace,
		},
		Data: map[string][]byte{
			"username":     []byte(aws.username),
			"passwordhash": []byte(aws.encodedPassword),
		},
	}
	_, err := client.CoreV1().Secrets(aws.Namespace).Update(secret)
	if err != nil {
		log.Warnf("Updating basic auth login failed, trying to create one: %v", err)
		return insertSecret(client, BASIC_AUTH_SECRET, aws.Namespace, map[string][]byte{
			"username":     []byte(aws.username),
			"passwordhash": []byte(aws.encodedPassword),
		})
	}
	return nil
}

// Init initializes aws kfapp - platform
func (aws *Aws) Init(resources kftypes.ResourceEnum) error {
	// Step 1. Use AWS SDK to check if credentials from (~/.aws/credentials or ENV) and session verify
	commandsTocheck := []string{"aws", "aws-iam-authenticator", "eksctl"}
	for _, command := range commandsTocheck {
		if err := utils.CheckCommandExist(command); err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Could not find command %v in PATH", command),
			}
		}
	}

	// Step 2. Check if current eksctl version meets minimum requirement
	// [ℹ]  version.Info{BuiltAt:"", GitCommit:"", GitTag:"0.1.32"}
	if err := utils.GetEksctlVersion(); err != nil {
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Can not run eksctl version is %v", err),
			}
		}
	}

	// Finish initialization and write spec to config file
	swaggerFile := filepath.Join(path.Dir(aws.Spec.Repo), kftypes.DefaultSwaggerFile)
	aws.Spec.ServerVersion = "file:" + swaggerFile

	createConfigErr := aws.writeConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Cannot create config file app.yaml in %v", aws.Spec.AppDir),
		}
	}

	return nil
}

// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (aws *Aws) Generate(resources kftypes.ResourceEnum) error {
	awsConfigFilesErr := aws.generateInfraConfigs()
	if awsConfigFilesErr != nil {
		return &kfapis.KfError{
			Code: awsConfigFilesErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Could not generate cluster configs under %v Error: %v",
				KUBEFLOW_AWS_INFRA_DIR, awsConfigFilesErr.(*kfapis.KfError).Message),
		}
	}

	awsFeatureConfig, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", err),
		}
	}

	// Customize parameters for AWS components
	aws.Spec.ComponentParams["aws-alb-ingress-controller"] = setNameVal(aws.Spec.ComponentParams["aws-alb-ingress-controller"], "clusterName", aws.KfDef.Name, true)
	aws.Spec.ComponentParams["istio-ingress"] = setNameVal(aws.Spec.ComponentParams["istio-ingress"], "namespace", IstioNamespace, false)

	// TODO: Doesn't need mysqlPd and minioPd overlay and they bind to GCE now.

	// Special handling for cloud watch logs of worker node groups
	if awsFeatureConfig["worker_node_group_logging"] == true {
		aws.Spec.Components = append(aws.Spec.Components, "fluentd-cloud-watch")
		aws.Spec.ComponentParams["fluentd-cloud-watch"] = setNameVal(aws.Spec.ComponentParams["fluentd-cloud-watch"], "clusterName", aws.KfDef.Name, true)
		aws.Spec.ComponentParams["fluentd-cloud-watch"] = setNameVal(aws.Spec.ComponentParams["fluentd-cloud-watch"], "region", aws.KfDef.Spec.Region, true)
	}

	// Special handling for sparkakus
	for _, component := range aws.Spec.Components {
		if component == "spartakus" {
			rand.Seed(time.Now().UnixNano())
			aws.Spec.ComponentParams["spartakus"] = setNameVal(aws.Spec.ComponentParams["spartakus"],
				"usageId", strconv.Itoa(rand.Int()), true)
		}
	}

	createConfigErr := aws.writeConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code: createConfigErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Cannot create config file app.yaml in %v: %v", aws.Spec.AppDir,
				createConfigErr.(*kfapis.KfError).Message),
		}
	}
	return nil
}

// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (aws *Aws) Apply(resources kftypes.ResourceEnum) error {
	// kfctl only
	// TODO: Enable BasicAuth later
	if aws.Spec.UseBasicAuth {
		if os.Getenv(kftypes.KUBEFLOW_USERNAME) == "" || os.Getenv(kftypes.KUBEFLOW_PASSWORD) == "" {
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("aws apply needs ENV %v and %v set when using basic auth",
					kftypes.KUBEFLOW_USERNAME, kftypes.KUBEFLOW_PASSWORD),
			}
		}

		aws.username = os.Getenv(kftypes.KUBEFLOW_USERNAME)
		password := os.Getenv(kftypes.KUBEFLOW_PASSWORD)
		passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Error when hashing password: %v", err),
			}
		}
		aws.encodedPassword = base64.StdEncoding.EncodeToString(passwordHash)
	} else {
		// We should force people either use OIDC or Coginito if user doesn't enable BASIC_AUTHN
	}

	// Create cluster + IAM policy + enable logs
	applyInfraErr := aws.applyAWSInfra()
	if applyInfraErr != nil {
		return &kfapis.KfError{
			Code: applyInfraErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("aws apply could not update infra Error %v",
				applyInfraErr.(*kfapis.KfError).Message),
		}
	}

	return nil
}

func (aws *Aws) Delete(resources kftypes.ResourceEnum) error {
	awsPlatformUninstallError := aws.uninstallAwsPlatform()
	if awsPlatformUninstallError != nil {
		return &kfapis.KfError{
			Code:    awsPlatformUninstallError.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Could not delete aws deployment Error: %v", awsPlatformUninstallError.(*kfapis.KfError).Message),
		}
	}

	return nil
}

// writeConfigFile writes KfDef to app.yaml
func (aws *Aws) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(aws.KfDef)
	if bufErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("AWS marshaling error: %v", bufErr),
		}
	}
	cfgFilePath := filepath.Join(aws.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("AWS config file writing error: %v", cfgFilePathErr),
		}
	}
	return nil
}

// writeFeatureConfig writes KfDef to app.yaml
func (aws *Aws) writeFeatureConfig(featureConfig map[string]interface{}) error {
	buf, bufErr := yaml.Marshal(featureConfig)
	if bufErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("AWS marshaling error: %v", bufErr),
		}
	}
	featureCfgFilePath := filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_FEATURE_CONFIG_FILE)
	featureCfgFilePathErr := ioutil.WriteFile(featureCfgFilePath, buf, 0644)
	if featureCfgFilePathErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("AWS config file writing error: %v", featureCfgFilePathErr),
		}
	}
	return nil
}

func (aws *Aws) getFeatureConfig() (map[string]interface{}, error) {
	configPath := filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_FEATURE_CONFIG_FILE)
	log.Infof("Reading config file: %v", configPath)

	configBuf, bufErr := ioutil.ReadFile(configPath)
	if bufErr != nil {
		return nil, bufErr
	}

	var config map[string]interface{}
	if err := yaml.Unmarshal(configBuf, &config); err != nil {
		return nil, err
	}

	return config, nil
}

func (aws *Aws) uninstallAwsPlatform() error {
	config, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", err),
		}
	}

	if _, ok := config["worker_node_group_logging"]; !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to read YAML: %v", err),
		}
	}

	if _, ok := config["managed_cluster"]; !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to read YAML: %v", err),
		}
	}

	// Detach IAM Policies
	for _, iamRole := range aws.Spec.Roles {
		aws.deleteIamRolePolicy(iamRole, "iam_alb_ingress_policy")
		aws.deleteIamRolePolicy(iamRole, "iam_csi_fsx_policy")

		if config["worker_node_group_logging"] == "true" {
			aws.deleteIamRolePolicy(iamRole, "iam_cloudwatch_policy")
		}
	}

	// Delete cluster if it's a managed cluster created by kfctl
	if config["managed_cluster"] == true {
		log.Infoln("Start to delete eks cluster. Please wait for 5 mins...")
		clusterConfigFile := filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_CONFIG_FILE)
		output, err := exec.Command("eksctl", "delete", "cluster", "--config-file="+clusterConfigFile).Output()
		log.Infoln("Please go to aws console to check CloudFormation status and double make sure your cluster has been shutdown.")
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("could not call 'eksctl delete cluster --config-file=%s': %v", clusterConfigFile, string(output)),
			}
		}
		log.Infoln(string(output))
	}

	return nil
}

func (aws *Aws) deleteIamRolePolicy(roleName, policyName string) error {
	log.Infof("Deleting inline policy %s for iam role %s", policyName, roleName)

	input := &iam.DeleteRolePolicyInput{
		PolicyName: awssdk.String(policyName),
		RoleName:   awssdk.String(roleName),
	}

	result, err := aws.iamClient.DeleteRolePolicy(input)
	// This error can be skipped and should not block delete process.
	// It's possible user make any changes on IAM role.
	if err != nil {
		log.Warnf("Unable to delete iam inline policy %s because %v", policyName, err.Error())
	} else {
		log.Infof("Successfully delete policy from IAM Role %v", result)
	}

	return nil
}

func (aws *Aws) attachIamInlinePolicy(roleName, policyName, policyDocumentPath string) error {
	log.Infof("Attaching inline policy %s for iam role %s", policyName, roleName)
	policyDocumentJSONBytes, _ := ioutil.ReadFile(policyDocumentPath)

	input := &iam.PutRolePolicyInput{
		PolicyDocument: awssdk.String(string(policyDocumentJSONBytes)),
		PolicyName:     awssdk.String(policyName),
		RoleName:       awssdk.String(roleName),
	}

	_, err := aws.iamClient.PutRolePolicy(input)
	if err != nil {
		log.Warnf("Unable to attach iam inline policy %s because %v", policyName, err.Error())
		return nil
	}

	log.Infof("Successfully attach policy to IAM Role %v", roleName)
	return nil
}

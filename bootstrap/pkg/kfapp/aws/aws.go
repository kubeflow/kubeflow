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
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
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
	"github.com/aws/aws-sdk-go/service/eks"
	"github.com/aws/aws-sdk-go/service/iam"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

const (
	KUBEFLOW_AWS_INFRA_DIR      = "aws_config"
	CLUSTER_CONFIG_FILE         = "cluster_config.yaml"
	CLUSTER_FEATURE_CONFIG_FILE = "cluster_features.yaml"
	PATH                        = "path"
	BASIC_AUTH_SECRET           = "kubeflow-login"

	// The namespace for Istio
	IstioNamespace = "istio-system"

	// Plugin parameter constants
	AwsPluginName = kftypes.AWS
)

// Aws implements KfApp Interface
// It includes the KsApp along with additional Aws types
type Aws struct {
	kfDef     *kfdefs.KfDef
	iamClient *iam.IAM
	eksClient *eks.EKS
	sess      *session.Session

	region string
	roles  []string
}

// GetKfApp returns the aws kfapp. It's called by coordinator.GetKfApp
func GetPlatform(kfdef *kfdefs.KfDef) (kftypes.Platform, error) {
	session := session.Must(session.NewSession())

	_aws := &Aws{
		kfDef:     kfdef,
		sess:      session,
		iamClient: iam.New(session),
		eksClient: eks.New(session),
	}

	return _aws, nil
}

// GetPluginSpec gets the plugin spec.
func (aws *Aws) GetPluginSpec() (*AwsPluginSpec, error) {
	awsPluginSpec := &AwsPluginSpec{}

	err := aws.kfDef.GetPluginSpec(AwsPluginName, awsPluginSpec)

	return awsPluginSpec, err
}

// GetK8sConfig is only used with ksonnet packageManager. NotImplemented in this version, return nil to use default config for API compatibility.
func (aws *Aws) GetK8sConfig() (*rest.Config, *clientcmdapi.Config) {
	return nil, nil
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

// Create a new EKS cluster if needed
func (aws *Aws) createEKSCluster() error {
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

	if config["managed_cluster"] == true {
		log.Infoln("Start to create eks cluster. Please wait for 10-15 mins...")
		clusterConfigFile := filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_CONFIG_FILE)
		output, err := exec.Command("eksctl", "create", "cluster", "--config-file="+clusterConfigFile).Output()
		if err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Call 'eksctl create cluster --config-file=%s' with errors: %v", clusterConfigFile, string(output)),
			}
		}
		log.Infoln(string(output))

		nodeGroupIamRoles, getRoleError := aws.getWorkerNodeGroupRoles(aws.kfDef.Name)
		if getRoleError != nil {
			return errors.WithStack(getRoleError)
		}

		aws.roles = nodeGroupIamRoles
	} else {
		log.Infof("You already have cluster setup. Skip creating new eks cluster. ")
	}

	return nil
}

func (aws *Aws) attachPoliciesToWorkerRoles() error {
	config, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", err),
		}
	}

	for _, iamRole := range aws.roles {
		aws.attachIamInlinePolicy(iamRole, "iam_alb_ingress_policy",
			filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_alb_ingress_policy.json"))
		aws.attachIamInlinePolicy(iamRole, "iam_csi_fsx_policy",
			filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_csi_fsx_policy.json"))

		if config["worker_node_group_logging"] == "true" {
			aws.attachIamInlinePolicy(iamRole, "iam_cloudwatch_policy",
				filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_cloudwatch_policy.json"))
		}
	}

	return nil
}

// TODO: waiting to be implemented.
func (aws *Aws) updateEKSClusterConfig() error {
	return nil
}

func (aws *Aws) getWorkerNodeGroupRoles(clusterName string) ([]string, error) {
	// List all the roles and figure out nodeGroupWorkerRole
	input := &iam.ListRolesInput{}
	listRolesOutput, err := aws.iamClient.ListRoles(input)

	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Call not list roles with errors: %v", err),
		}
	}

	var nodeGroupIamRoles []string
	for _, output := range listRolesOutput.Roles {
		if strings.HasPrefix(*output.RoleName, "eksctl-"+clusterName+"-") && strings.Contains(*output.RoleName, "NodeInstanceRole") {
			nodeGroupIamRoles = append(nodeGroupIamRoles, *output.RoleName)
		}
	}

	return nodeGroupIamRoles, nil
}

func copyFile(source string, dest string) error {
	from, err := os.Open(source)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("cannot open input file for copying: %v", err),
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
	metadata["name"] = aws.kfDef.Name
	metadata["region"] = aws.region
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
	repo, ok := aws.kfDef.Status.ReposCache[kftypes.KubeflowRepoName]
	if !ok {
		err := fmt.Errorf("Repo %v not found in KfDef.Status.ReposCache", kftypes.KubeflowRepoName)
		log.Errorf("%v", err)
		return errors.WithStack(err)
	}

	sourceDir := path.Join(repo.LocalPath, "deployment/aws/infra_configs")
	destDir := path.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR)

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
		copyErr := copyFile(sourceFile, destFile)
		if copyErr != nil {
			return &kfapis.KfError{
				Code: copyErr.(*kfapis.KfError).Code,
				Message: fmt.Sprintf("Could not copy %v to %v Error %v",
					sourceFile, destFile, copyErr.(*kfapis.KfError).Message),
			}
		}
	}

	// 2. Reading from cluster_config.yaml and replace placeholders with values in aws.kfDef.Spec.
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

	if aws.roles != nil && len(aws.roles) != 0 {
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
	awsPluginSpec, err := aws.GetPluginSpec()
	if err != nil {
		return err
	}

	if awsPluginSpec.Auth == nil || awsPluginSpec.Auth.BasicAuth == nil || awsPluginSpec.Auth.BasicAuth.Password.Name == "" {
		err := errors.WithStack(fmt.Errorf("BasicAuth.Password.Name must be set"))
		return err
	}

	password, err := aws.kfDef.GetSecret(awsPluginSpec.Auth.BasicAuth.Password.Name)
	if err != nil {
		log.Errorf("There was a problem getting the password for basic auth; error %v", err)
		return err
	}

	encodedPassword, err := base64EncryptPassword(password)
	if err != nil {
		log.Errorf("There was a problem encrypting the password; %v", err)
		return err
	}

	secret := &v1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      BASIC_AUTH_SECRET,
			Namespace: aws.kfDef.Namespace,
		},
		Data: map[string][]byte{
			"username":     []byte(awsPluginSpec.Auth.BasicAuth.Username),
			"passwordhash": []byte(encodedPassword),
		},
	}
	_, err = client.CoreV1().Secrets(aws.kfDef.Namespace).Update(secret)
	if err != nil {
		log.Warnf("Updating basic auth login failed, trying to create one: %v", err)
		return insertSecret(client, BASIC_AUTH_SECRET, aws.kfDef.Namespace, map[string][]byte{
			"username":     []byte(awsPluginSpec.Auth.BasicAuth.Username),
			"passwordhash": []byte(encodedPassword),
		})
	}
	return nil
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

// Init initializes aws kfapp - platform
func (aws *Aws) Init(resources kftypes.ResourceEnum) error {
	// 1. Use AWS SDK to check if credentials from (~/.aws/credentials or ENV) and session verify
	commandsTocheck := []string{"aws", "aws-iam-authenticator", "eksctl"}
	for _, command := range commandsTocheck {
		if err := utils.CheckCommandExist(command); err != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Could not find command %v in PATH", command),
			}
		}
	}

	// 2. Check if current eksctl version meets minimum requirement
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
	swaggerFile := filepath.Join(path.Dir(aws.kfDef.Spec.Repo), kftypes.DefaultSwaggerFile)
	aws.kfDef.Spec.ServerVersion = "file:" + swaggerFile

	createConfigErr := aws.kfDef.WriteToConfigFile()
	if createConfigErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Cannot create config file app.yaml in %v", aws.kfDef.Spec.AppDir),
		}
	}

	return nil
}

// Generate generate aws infrastructure configs and aws kfapp manifest
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (aws *Aws) Generate(resources kftypes.ResourceEnum) error {
	// use aws to call sts get-caller-identity to verify aws credential works.
	if err := utils.CheckAwsStsCallerIdentity(aws.sess); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Could not authenticate aws client: %v, Please make sure you set up AWS credentials and regions", err),
		}
	}

	if setAwsPluginDefaultsErr := aws.setAwsPluginDefaults(); setAwsPluginDefaultsErr != nil {
		return &kfapis.KfError{
			Code: setAwsPluginDefaultsErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("aws set aws plugin defaults Error %v",
				setAwsPluginDefaultsErr.(*kfapis.KfError).Message),
		}
	}

	if awsConfigFilesErr := aws.generateInfraConfigs(); awsConfigFilesErr != nil {
		return &kfapis.KfError{
			Code: awsConfigFilesErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Could not generate cluster configs under %v Error: %v",
				KUBEFLOW_AWS_INFRA_DIR, awsConfigFilesErr.(*kfapis.KfError).Message),
		}
	}

	awsFeatureConfig, getAwsFeatureConfigErr := aws.getFeatureConfig()
	if getAwsFeatureConfigErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading config file error: %v", getAwsFeatureConfigErr),
		}
	}

	pluginSpec, err := aws.GetPluginSpec()
	if err != nil {
		return errors.WithStack(err)
	}

	if err := aws.kfDef.SetApplicationParameter("aws-alb-ingress-controller", "clusterName", aws.kfDef.Name); err != nil {
		return errors.WithStack(err)
	}

	if err := aws.kfDef.SetApplicationParameter("istio-ingress", "namespace", IstioNamespace); err != nil {
		return errors.WithStack(err)
	}

	if aws.kfDef.Spec.UseBasicAuth {
		if err := aws.kfDef.SetApplicationParameter("istio", "clusterRbacConfig", "OFF"); err != nil {
			return errors.WithStack(err)
		}

		if pluginSpec.Auth.BasicAuth == nil {
			return errors.WithStack(fmt.Errorf("AwsPluginSpec has no BasicAuth but UseBasicAuth set to true"))
		}

		// TODO: enable Basic Auth later
	} else {
		// TODO: Need to change profile header
		//if err := aws.kfDef.SetApplicationParameter("istio", "clusterRbacConfig", "ON"); err != nil {
		//	return errors.WithStack(err)
		//}
		//
		//if pluginSpec.Auth.Cognito == nil && pluginSpec.Auth.Oidc == nil {
		//	return errors.WithStack(fmt.Errorf("AwsPluginSpec has no OIDC or Cognito but UseBasicAuth set to false"))
		//}

		if pluginSpec.Auth.Cognito != nil {
			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "CognitoUserPoolArn", pluginSpec.Auth.Cognito.CognitoUserPoolArn); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "CognitoUserPoolDomain", pluginSpec.Auth.Cognito.CognitoUserPoolDomain); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "CognitoAppClientId", pluginSpec.Auth.Cognito.CognitoAppClientId); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "certArn", pluginSpec.Auth.Cognito.CertArn); err != nil {
				return errors.WithStack(err)
			}
		}

		if pluginSpec.Auth.Oidc != nil {
			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "oidcIssuer", pluginSpec.Auth.Oidc.OidcIssuer); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "oidcAuthorizationEndpoint", pluginSpec.Auth.Oidc.OidcAuthorizationEndpoint); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "oidcTokenEndpoint", pluginSpec.Auth.Oidc.OidcTokenEndpoint); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "oidcUserInfoEndpoint", pluginSpec.Auth.Oidc.OidcUserInfoEndpoint); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "certArn", pluginSpec.Auth.Oidc.CertArn); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "clientId", pluginSpec.Auth.Oidc.OAuthClientId); err != nil {
				return errors.WithStack(err)
			}

			if err := aws.kfDef.SetApplicationParameter("istio-ingress", "clientSecret", pluginSpec.Auth.Oidc.OAuthClientSecret); err != nil {
				return errors.WithStack(err)
			}
		}
	}

	// Special handling for cloud watch logs of worker node groups
	if awsFeatureConfig["worker_node_group_logging"] == true {
		//aws.kfDef.Spec.Components = append(aws.kfDef.Spec.Components, "fluentd-cloud-watch")
		if err := aws.kfDef.SetApplicationParameter("fluentd-cloud-watch", "clusterName", aws.kfDef.Name); err != nil {
			return errors.WithStack(err)
		}
		if err := aws.kfDef.SetApplicationParameter("fluentd-cloud-watch", "region", aws.region); err != nil {
			return errors.WithStack(err)
		}
	}

	// Special handling for sparkakus
	rand.Seed(time.Now().UnixNano())
	if err := aws.kfDef.SetApplicationParameter("spartakus", "usageId", strconv.Itoa(rand.Int())); err != nil {
		if kfdefs.IsAppNotFound(err) {
			log.Infof("Spartakus not included; not setting usageId")
		}
	}

	if createConfigErr := aws.kfDef.WriteToConfigFile(); createConfigErr != nil {
		return &kfapis.KfError{
			Code: createConfigErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Cannot create config file app.yaml in %v: %v", aws.kfDef.Spec.AppDir,
				createConfigErr.(*kfapis.KfError).Message),
		}
	}
	return nil
}

func (aws *Aws) setAwsPluginDefaults() error {
	awsPluginSpec, err := aws.GetPluginSpec()

	if err != nil {
		return err
	}

	// TODO: enable validation once we support basic auth
	//if isValid, msg := awsPluginSpec.IsValid(); !isValid {
	//	log.Errorf("AwsPluginSpec isn't valid; error %v", msg)
	//	return fmt.Errorf(msg)
	//}

	aws.region = awsPluginSpec.Region
	aws.roles = awsPluginSpec.Roles

	return nil
}

// Apply create eks cluster if needed, bind IAM policy to node group roles and enable cluster level configs.
// Remind: Need to be thread-safe: this entry is share among kfctl and deploy app
func (aws *Aws) Apply(resources kftypes.ResourceEnum) error {
	// use aws to call sts get-caller-identity to verify aws credential works.
	if err := utils.CheckAwsStsCallerIdentity(aws.sess); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Could not authenticate aws client: %v, Please make sure you set up AWS credentials and regions", err),
		}
	}

	if err := aws.setAwsPluginDefaults(); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("aws set aws plugin defaults Error %v",
				err.(*kfapis.KfError).Message),
		}
	}

	// 1. Create EKS cluster if needed
	if err := aws.createEKSCluster(); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Failed to create EKS cluster %v",
				err.(*kfapis.KfError).Message),
		}
	}

	// 2. Attach IAM policies like ALB, FSX, EFS, cloudWatch Fluentd to worker node group roles
	// TODO: Once pod level IAM complete, we don't need worker group roles. Authorize cloud services using service account.
	if err := aws.attachPoliciesToWorkerRoles(); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Failed to attach IAM policies %v",
				err.(*kfapis.KfError).Message),
		}

	}

	// 3. Update cluster configs to enable master log or private access config.
	// TODO: Once CloudFormation add support for master log/ private access, we can configure in cluster_config.yaml.
	// https://github.com/weaveworks/eksctl/issues/778
	if err := aws.updateEKSClusterConfig(); err != nil {
		return &kfapis.KfError{
			Code: err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Failed to update eks cluster configs %v",
				err.(*kfapis.KfError).Message),
		}
	}

	return nil
}

func (aws *Aws) Delete(resources kftypes.ResourceEnum) error {
	// use aws to call sts get-caller-identity to verify aws credential works.
	if err := utils.CheckAwsStsCallerIdentity(aws.sess); err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Could not authenticate aws client: %v, Please make sure you set up AWS credentials and regions", err),
		}
	}

	setAwsPluginDefaultsErr := aws.setAwsPluginDefaults()
	if setAwsPluginDefaultsErr != nil {
		return &kfapis.KfError{
			Code: setAwsPluginDefaultsErr.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("aws set aws plugin defaults Error %v",
				setAwsPluginDefaultsErr.(*kfapis.KfError).Message),
		}
	}

	// 1. Detach inline policies from worker IAM Roles
	if err := aws.detachPoliciesToWorkerRoles(); err != nil {
		return &kfapis.KfError{
			Code:    err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Could not detach iam role Error: %v", err.(*kfapis.KfError).Message),
		}
	}

	// 2. Delete EKS cluster
	if err := aws.uninstallEKSCluster(); err != nil {
		return &kfapis.KfError{
			Code:    err.(*kfapis.KfError).Code,
			Message: fmt.Sprintf("Could not uninstall eks cluster Error: %v", err.(*kfapis.KfError).Message),
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
	featureCfgFilePath := filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_FEATURE_CONFIG_FILE)
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
	configPath := filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_FEATURE_CONFIG_FILE)
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

func (aws *Aws) detachPoliciesToWorkerRoles() error {
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
			Message: fmt.Sprintf("Unable to read feature config YAML: %v", err),
		}
	}

	var roles []string

	// Find worker roles based on new cluster kfctl created or existing cluster
	if config["managed_cluster"] == true {
		workerRoles, err := aws.getWorkerNodeGroupRoles(aws.kfDef.Name)
		if err != nil {
			return errors.WithStack(err)
		}

		roles = workerRoles
	} else {
		awsPluginSpec, err := aws.GetPluginSpec()
		if err != nil {
			return errors.WithStack(err)
		}

		roles = awsPluginSpec.Roles
	}

	// Detach IAM Policies
	for _, iamRole := range roles {
		aws.deleteIamRolePolicy(iamRole, "iam_alb_ingress_policy")
		aws.deleteIamRolePolicy(iamRole, "iam_csi_fsx_policy")

		if config["worker_node_group_logging"] == "true" {
			aws.deleteIamRolePolicy(iamRole, "iam_cloudwatch_policy")
		}
	}

	return nil
}

func (aws *Aws) uninstallEKSCluster() error {
	config, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Reading feature config file error: %v", err),
		}
	}

	if _, ok := config["managed_cluster"]; !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to read YAML: %v", err),
		}
	}

	// Delete cluster if it's a managed cluster created by kfctl
	if config["managed_cluster"] == true {
		log.Infoln("Start to delete eks cluster. Please wait for 5 mins...")
		clusterConfigFile := filepath.Join(aws.kfDef.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_CONFIG_FILE)
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

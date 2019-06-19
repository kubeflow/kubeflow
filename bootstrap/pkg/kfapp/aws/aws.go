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

	"github.com/ghodss/yaml"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	v1 "k8s.io/api/core/v1"

	awssdk "github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iam"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
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
	// required fileds for aws users
}

// GetKfApp returns the aws kfapp. It's called by coordinator.GetKfApp
func GetKfApp(kfdef *kfdefs.KfDef) (kftypes.KfApp, error) {
	sess := session.Must(session.NewSession())

	// use aws to call sts get-caller-identity to verify aws credential works.
	if err := utils.CheckAwsStsCallerIdentity(sess); err != nil {
		log.Fatalf("Could not authenticate aws client: %v", err)
		log.Fatalf("Please make sure you set up AWS credentials and regions")
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Failed to get caller identity %v", err),
		}
	}

	_aws := &Aws{
		KfDef:     *kfdef,
		iamClient: iam.New(sess),
	}

	return _aws, nil
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
// 1. Create cluster if eks cluster doesn't exist
// 2. Attach inline policies (ALB, CloudWatch. etc) to node group roles.
// 3. Set master logs from cluster_features.yaml
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

	// Delete cluster if it's a managed cluster created by kfctl
	if config["managed_cluster"] == true {
		clusterConfigFile := filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, CLUSTER_CONFIG_FILE)
		// TODO: here we need to output cluster creation logs from eksctl
		output, err := exec.Command("eksctl", "create", "cluster", "--config-file=" + clusterConfigFile).Output()
		log.Infoln("Please go to aws console to check CloudFormation status and double make sure your cluster has been shutdown.")
		if err != nil {
			log.Fatal(err)
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Call 'eksctl create cluster --config-file=%s' with errors: %v", clusterConfigFile, string(output)),
			}
		}
		log.Infoln(output)

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
			if strings.HasPrefix(*output.RoleName, "eksctl-" + aws.KfDef.Name + "-") && strings.Contains(*output.RoleName, "NodeInstanceRole") {
				nodeGroupIamRoles = append(nodeGroupIamRoles, *output.RoleName)
			}
		}

		aws.Spec.Roles = nodeGroupIamRoles
		aws.writeConfigFile()
	}

	// Attach IAM Policies
	for _, iamRole := range aws.Spec.Roles {
		aws.attachIamInlinePolicy(iamRole, "iam_alb_ingress_policy", filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_alb_ingress_policy.json"))
		aws.attachIamInlinePolicy(iamRole, "iam_csi_fsx_policy", filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_csi_fsx_policy.json"))

		if config["worker_node_group_logging"] == "true" {
			aws.attachIamInlinePolicy(iamRole, "iam_cloudwatch_policy", filepath.Join(aws.Spec.AppDir, KUBEFLOW_AWS_INFRA_DIR, "iam_cloudwatch_policy.json"))
		}
	}

	// TODO: Add private access and logging support in CloudFormation
	return nil
}

// k8s. Remove ingress first and then
// uninstall_aws_k8s() {
//   source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh
//   kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-noauth.yaml
//   kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-crds.yaml
//   if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
//     kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
//   fi
// }

// TODO: move to common utils.
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
		log.Infoln("Creating AWS infrastructure configs in directory %s", destDir)
		destDirErr := os.MkdirAll(destDir, os.ModePerm)
		if destDirErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("Cannot create directory %v", destDirErr),
			}
		}
	} else {
		log.Infoln("AWS infrastructure configs already exist in directory %s", destDir)
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
	// By default, let's have managed_cluster true. if user pass roles, we make it false.
	featureCfg, err := aws.getFeatureConfig()
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Can not get AWS feature config file %v", err),
		}
	}

	if aws.KfDef.Spec.Roles != nil && len(aws.KfDef.Spec.Roles) == 0 {
		featureCfg["managed_cluster"] = false
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

	// Step 3.
	// AWS_CLUSTER_NAME - kfDef.Name
	// AWS_REGION - kfDef.Spec.Region
	// AWS_NODEGROUP_ROLE_NAMES - kfDef.Spec.Roles
	// Based on if there's a role. We need to export MANAGED_CLUSER. - better in Def
	// Or just use node_role_names.
	// TODO: extract to a new method


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

	// Customize parameters for AWS components
	aws.Spec.ComponentParams["aws-alb-ingress-controller"] = setNameVal(aws.Spec.ComponentParams["aws-alb-ingress-controller"], "clusterName", aws.KfDef.Name, true)

	if aws.Spec.UseBasicAuth {
		aws.Spec.ComponentParams["basic-auth-ingress"] = setNameVal(aws.Spec.ComponentParams["basic-auth-ingress"], "ipName", aws.Spec.IpName, true)
		aws.Spec.ComponentParams["basic-auth-ingress"] = setNameVal(aws.Spec.ComponentParams["basic-auth-ingress"], "hostname", aws.Spec.Hostname, true)
	} else {
		aws.Spec.ComponentParams["istio-ingress"] = setNameVal(aws.Spec.ComponentParams["istio-ingress"], "namespace", "istio-system", true)
		// Force users to use either BasicAuth or OIDC/Cognito.
	}
	// TODO: here we only make sure we have ComponentsParam, How to make sure we `ks generate`?

	// Special hanlding for sparkakus - is it possible to add ship to aws endpoints? at least for aws users.
	// Or ask Kubeflow team to share.
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
		// TODO: anything need to do ?

		// //TODO: AWS_ACCESS_KEY_ID ? What if ~/.aws/config has value? Need to validate both
		// if os.Getenv(CLIENT_ID) == "" {
		// 	return &kfapis.KfError{
		// 		Code:    int(kfapis.INVALID_ARGUMENT),
		// 		Message: fmt.Sprintf("Need to set environment variable `%v` for IAP.", CLIENT_ID),
		// 	}
		// }
		// if os.Getenv(CLIENT_SECRET) == "" {
		// 	return &kfapis.KfError{
		// 		Code:    int(kfapis.INVALID_ARGUMENT),
		// 		Message: fmt.Sprintf("Need to set environment variable `%v` for IAP.", CLIENT_SECRET),
		// 	}
		// }
		// Requires 443 and ALB
		// TOOD: How does this work? this is OAuth login, we should config OIDC/Coginito here?
		// gcp.oauthId = os.Getenv(CLIENT_ID)
		// gcp.oauthSecret = os.Getenv(CLIENT_SECRET)

		// Google requires OAuthId, or OAuthSecret. We can force people either use OIDC or Coginito or BASIC_AUTHN
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

	// Insert secrets into the cluster - do we want to create/add a secret there?
	// secretsErr := gcp.createSecrets()
	// if secretsErr != nil {
	// 	return &kfapis.KfError{
	// 		Code: secretsErr.(*kfapis.KfError).Code,
	// 		Message: fmt.Sprintf("gcp apply could not create secrets Error %v",
	// 			secretsErr.(*kfapis.KfError).Message),
	// 	}
	// }

	// AWS infrastructure changes
	// 1. Install EKS cluster
	// 2. Attach IAM roles like ALB, FSX, EFS, cloudWatch ?
	// 3. Based on log/private access, we need to call eks api to achieve that now. https://github.com/weaveworks/eksctl/issues/778

	// k8s
	// ks env, set application components.

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

	// aws.UninstallK8s
	return nil
}

func (aws *Aws) uninstallAwsK8s() error {
	// delete istio - this should be done by common utils
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
			Message: fmt.Sprintf("Unable to read worker_node_group_logging in YAML: %v", err),
		}
	}

	//if config["worker_node_group_logging"] == "true" {
	//	output, err := exec.Command("kubectl", "delete", "-f", clusterConfigFile).Output()
	//	if err != nil {
	//		return &kfapis.KfError{
	//			Code:    int(kfapis.INVALID_ARGUMENT),
	//			Message: fmt.Sprintf("could not call 'kubectl delete -f %s': %v", clusterConfigFile, err),
	//		}
	//	}
	//	log.Infoln(output)
	//}
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

	result, err := aws.iamClient.PutRolePolicy(input)
	if err != nil {
		log.Warnf("Unable to attach iam inline policy %s because %v", policyName, err.Error())
		return nil
	}

	log.Infof("Successfully attch policy to IAM Role %v", result)
	return nil
}

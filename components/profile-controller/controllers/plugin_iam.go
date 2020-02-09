package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	awssdk "github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iam"
	"github.com/go-logr/logr"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"github.com/tidwall/gjson"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/types"
	"net/url"
	"strings"
)

const (
	// plugin kind
	KIND_AWS_IAM_FOR_SERVICE_ACCOUNT = "AwsIamForServiceAccount"
	AWS_ANNOTATION_KEY               = "eks.amazonaws.com/role-arn"
	AWS_IAM_ROLE                     = "arn:aws:iam::AWS_ACCOUNT_ID:role/IAM_ROLE_NAME"
	AWS_TRUST_IDENTITY_SUBJECT       = "system:serviceaccount:%s:%s"
	AWS_DEFAULT_AUDIENCE             = "sts.amazonaws.com"
)

type AwsIAMForServiceAccount struct {
	AwsIAMRole string `json:"awsIamRole,omitempty"`
}


// ApplyPlugin annotate service account with the ARN of the IAM role and update trust relationship of IAM role
func (aws *AwsIAMForServiceAccount) ApplyPlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profile.Name)
	if err := aws.patchAnnotation(r, profile.Name, DEFAULT_EDITOR, addIAMRoleAnnotation, logger); err != nil {
		return err
	}
	logger.Info("Setting up iam roles and policy for service account.", "ServiceAccount", aws.AwsIAMRole)
	return aws.updateIAMForServiceAccount(profile.Name, DEFAULT_EDITOR, addServiceAccountInAssumeRolePolicy)
}

// RevokePlugin remove role in service account annotation and delete service account record in IAM trust relationship.
func (aws *AwsIAMForServiceAccount) RevokePlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profile.Name)
	if err := aws.patchAnnotation(r, profile.Name, DEFAULT_EDITOR, removeIAMRoleAnnotation, logger); err != nil {
		return err
	}
	logger.Info("Clean up AWS IAM Role for Service Account.", "ServiceAccount", aws.AwsIAMRole)
	return aws.updateIAMForServiceAccount(profile.Name, DEFAULT_EDITOR, removeServiceAccountInAssumeRolePolicy)
}


// patchAnnotation will patch annotation to k8s service account in order to pair up with GCP identity
func (aws *AwsIAMForServiceAccount) patchAnnotation(r *ProfileReconciler, namespace string, ksa string, annotationFunc func(*corev1.ServiceAccount, string), logger logr.Logger) error {
	ctx := context.Background()
	found := &corev1.ServiceAccount{}
	err := r.Get(ctx, types.NamespacedName{Name: ksa, Namespace: namespace}, found)
	if err != nil {
		return err
	}

	annotationFunc(found, aws.AwsIAMRole)
	logger.Info("Patch Annotation for service account: ", "namespace ", namespace, "name ", ksa)
	return r.Update(ctx, found)
}

// updateIAMForServiceAccount update AWS IAM Roles trust relationship with namespace and service account
// in this case.
func (aws *AwsIAMForServiceAccount) updateIAMForServiceAccount(serviceAccountNamespace, serviceAccountName string, updateAssumeRolePolicy func(string, string, string)(string, error)) error {
	// we should run a test
	svc := iam.New(session.New())
	roleInput := &iam.GetRoleInput{
		RoleName: awssdk.String(aws.AwsIAMRole),
	}

	output, err := svc.GetRole(roleInput)
	if err != nil {
		return err
	}

	// Seems AssumeRolePolicyDocument is URL encoded
	decodeValue, err := url.QueryUnescape(awssdk.StringValue(output.Role.AssumeRolePolicyDocument))
	if err != nil {
		return err
	}

	updatedRolePolicy, err := updateAssumeRolePolicy(decodeValue, serviceAccountNamespace, serviceAccountName)
	if err != nil {
		return err
	}

	input := &iam.UpdateAssumeRolePolicyInput{
		RoleName:       awssdk.String(aws.AwsIAMRole),
		PolicyDocument: awssdk.String(updatedRolePolicy),
	}
	if _, err = svc.UpdateAssumeRolePolicy(input); err != nil {
		return err
	}

	return nil
}

// addIAMRoleAnnotation add `eks.amazonaws.com/role-arn:roleName` to service account annotations
func addIAMRoleAnnotation(sa *corev1.ServiceAccount, iamRoleName string) {
	if sa.Annotations == nil {
		sa.Annotations = map[string]string{AWS_ANNOTATION_KEY : iamRoleName}
	} else {
		sa.Annotations[AWS_ANNOTATION_KEY] = iamRoleName
	}
}

// removeIAMRoleAnnotation remove `eks.amazonaws.com/role-arn:roleName` in service account annotations
func removeIAMRoleAnnotation(sa *corev1.ServiceAccount, iamRoleName string) {
	if sa.Annotations == nil {
	} else {
		if _, ok := sa.Annotations[AWS_ANNOTATION_KEY]; ok {
			delete(sa.Annotations, AWS_ANNOTATION_KEY)
		}
	}
}

// add serviceAccountNamespace/serviceAccountName in assumeRolePolicy
func addServiceAccountInAssumeRolePolicy(policyDocument, serviceAccountNamespace, serviceAccountName string) (string, error) {
	var oldDoc MapOfInterfaces
	json.Unmarshal([]byte(policyDocument), &oldDoc)
	var statements []MapOfInterfaces
	statementInBytes, err := json.Marshal(oldDoc["Statement"])
	if err != nil {
		return "", err
	}
	json.Unmarshal(statementInBytes, &statements)

	oidcRoleArn := gjson.Get(policyDocument, "Statement.0.Principal.Federated").String()
	issuerUrlWithProtocol := getIssuerUrlFromRoleArn(oidcRoleArn)

	document := MakeAssumeRoleWithWebIdentityPolicyDocument(oidcRoleArn, MapOfInterfaces{
		"StringEquals": map[string]string{
			issuerUrlWithProtocol + ":sub": fmt.Sprintf(AWS_TRUST_IDENTITY_SUBJECT, serviceAccountNamespace, serviceAccountName),
			issuerUrlWithProtocol + ":aud": AWS_DEFAULT_AUDIENCE,
		},
	})

	statements = append(statements, document)
	newAssumeRolePolicyDocument := MakePolicyDocument(statements...)
	newPolicyDoc, err := json.Marshal(newAssumeRolePolicyDocument)
	if err != nil {
		return "", err
	}
	return string(newPolicyDoc), nil
}

func removeServiceAccountInAssumeRolePolicy(policyDocument, serviceAccountNamespace, serviceAccountName string) (string, error) {
	var oldDoc MapOfInterfaces
	json.Unmarshal([]byte(policyDocument), &oldDoc)
	var statements []MapOfInterfaces
	statementInBytes, err := json.Marshal(oldDoc["Statement"])
	if err != nil {
		return "", err
	}
	json.Unmarshal(statementInBytes, &statements)

	oidcRoleArn := gjson.Get(policyDocument, "Statement.0.Principal.Federated").String()
	issuerUrlWithProtocol := getIssuerUrlFromRoleArn(oidcRoleArn)
	key := fmt.Sprintf("%s:sub", issuerUrlWithProtocol)
	trustIdentity := fmt.Sprintf(AWS_TRUST_IDENTITY_SUBJECT, serviceAccountNamespace, serviceAccountName)
	var newStatements []MapOfInterfaces
	for _, statement := range statements {
		statementInBytes, err := json.Marshal(statement)
		if err != nil {
			return "", err
		}
		identities := gjson.Get(string(statementInBytes), "Condition.StringEquals").Map()
		val, ok := identities[key]
		if ok && val.Str == trustIdentity {
			// exclude any statement has this trust identity
			continue
		}
		newStatements = append(newStatements, statement)
	}

	newAssumeRolePolicyDocument := MakePolicyDocument(newStatements...)
	newPolicyDoc, err := json.Marshal(newAssumeRolePolicyDocument)
	if err != nil {
		return "", err
	}
	return string(newPolicyDoc), nil
}


// getIssuerUrlFromRoleArn parse issuerUrl from Arn: arn:aws:iam::${accountId}:oidc-provider/${issuerUrl}
func getIssuerUrlFromRoleArn(arn string) string {
	return arn[strings.Index(arn, "/")+1:]
}

// MakeAssumeRoleWithWebIdentityPolicyDocument constructs a trust policy for given a web identity provider with given conditions
func MakeAssumeRoleWithWebIdentityPolicyDocument(providerARN string, condition MapOfInterfaces) MapOfInterfaces {
	return MapOfInterfaces{
		"Effect": "Allow",
		"Action": []string{"sts:AssumeRoleWithWebIdentity"},
		"Principal": map[string]string{
			"Federated": providerARN,
		},
		"Condition": condition,
	}
}

// MakePolicyDocument constructs a policy with given statements
func MakePolicyDocument(statements ...MapOfInterfaces) MapOfInterfaces {
	return MapOfInterfaces{
		"Version":   "2012-10-17",
		"Statement": statements,
	}
}

type (
	// MapOfInterfaces is an alias for map[string]interface{}
	MapOfInterfaces = map[string]interface{}

	// SliceOfInterfaces is an alias for []interface{}
	SliceOfInterfaces = []interface{}
)

type IAMRole struct {
	AssumeRolePolicyDocument MapOfInterfaces `json:",omitempty"`
}

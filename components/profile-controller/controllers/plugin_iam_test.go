package controllers

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"testing"
)


func TestAddIAMRoleAnnotation(t *testing.T) {
	roleName := "arn:aws:iam::34892524:role/s3-reader"
	sa := &corev1.ServiceAccount{
		ObjectMeta: v1.ObjectMeta{
			Namespace: "default",
			Name: "sa",
		},
	}

	addIAMRoleAnnotation(sa, roleName)
	assert.NotNil(t, sa.Annotations)
	assert.Equal(t, roleName, sa.Annotations[AWS_ANNOTATION_KEY])
}

func TestRemoveIAMRoleAnnotation(t *testing.T) {
	roleName := "arn:aws:iam::34892524:role/s3-reader"
	sa := &corev1.ServiceAccount{
		ObjectMeta: v1.ObjectMeta{
			Namespace: "default",
			Name: "sa",
			Annotations: map[string]string {AWS_ANNOTATION_KEY: roleName},
		},
	}

	addIAMRoleAnnotation(sa, roleName)
	assert.NotNil(t, sa.Annotations)
	assert.Empty(t, sa.Annotations[AWS_DEFAULT_AUDIENCE])
}

func TestGetIssuerUrlFromRoleArn(t *testing.T) {
	issuerUrl := "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
	arn := fmt.Sprintf("arn:aws:iam::34892524:oidc-provider/%v", issuerUrl)
	result := getIssuerUrlFromProviderArn(arn)
	assert.Equal(t, result, issuerUrl)
}

func TestGetIAMRoleNameFromIAMRoleArn(t *testing.T) {
	roleName := "test-iam-role"
	arn := fmt.Sprintf("arn:aws:iam::34892524:role/%v", roleName)
	result := getIAMRoleNameFromIAMRoleArn(arn)
	assert.Equal(t, result, roleName)
}


func TestAddServiceAccountInAssumeRolePolicy(t *testing.T) {
	serviceAccountNamespace := "ns1"
	serviceAccountName := "sa1"

	policy := `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com"
        }
      }
    }
  ]
}
`

	expectedPolicy := `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": [
        "sts:AssumeRoleWithWebIdentity"
      ],
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com",
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:sub": "system:serviceaccount:ns1:sa1"
        }
      }
    }
  ]
}
`
	result, _ := addServiceAccountInAssumeRolePolicy(policy, serviceAccountNamespace, serviceAccountName)
	require.JSONEq(t, expectedPolicy, result)
}


func TestRemoveServiceAccountInAssumeRolePolicy(t *testing.T) {
	serviceAccountNamespace := "ns1"
	serviceAccountName := "sa1"
	policy := `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": [
        "sts:AssumeRoleWithWebIdentity"
      ],
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com",
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:sub": "system:serviceaccount:ns1:sa1"
        }
      }
    }
  ]
}
`

	expectedPolicy := `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::34892524:oidc-provider/oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.beta.us-west-2.wesley.amazonaws.com/id/50D94CFC65139194EDC21891B611EF72:aud": "sts.amazonaws.com"
        }
      }
    }
  ]
}
`
	result, _ := removeServiceAccountInAssumeRolePolicy(policy, serviceAccountNamespace, serviceAccountName)
	require.JSONEq(t, expectedPolicy, result)
}

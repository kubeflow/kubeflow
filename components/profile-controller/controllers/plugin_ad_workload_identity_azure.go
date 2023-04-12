/*
Copyright 2019 The Kubeflow Authors.

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

package controllers

import (
	"context"
	"errors"

	"github.com/go-logr/logr"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/types"
)

const (
	KIND_AZURE_AD_WORKLOAD_IDENTITY = "AzureAdWorkloadIdentity"
	AD_DEFAULT_SERVICE_ACCOUNT      = DEFAULT_EDITOR
	AZURE_CLIENT_ID_ANNOTATION_KEY  = "azure.workload.identity/client-id"
	AZURE_TENANT_ID_ANNOTATION_KEY  = "azure.workload.identity/tenant-id"

	AZURE_SA_TOKEN_EXPIRATION_ANNOTATION_KEY = "azure.workload.identity/service-account-token-expiration"

	AZURE_WORKLOAD_IDENTITY_POD_ANNOTATION = "azure.workload.identity/use"
)

// AzureAdWorkloadIdentity: plugin that setup Azure AD workload identity for target profile namespace
type AzureAdWorkloadIdentity struct {
	AzureIdentityClientId              string `json:"identityClientId,omitempty"`
	AzureIdentityTenantId              string `json:"identityTenantId,omitempty"`
	AzureServiceAccountTokenExpiration string `json:"serviceAccountTokenExpiration,omitempty"`
}

// ApplyPlugin will grant Azure workload identity to service account DEFAULT_EDITOR
func (azure *AzureAdWorkloadIdentity) ApplyPlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profile.Name)
	if err := azure.patchAnnotation(r, profile.Name, DEFAULT_EDITOR, logger); err != nil {
		return err
	}

	logger.Info("Setting up workload identity", "ClientId", azure.AzureIdentityClientId)
	return nil
}

// patchAnnotation will patch annotation to k8s service account in order to pair up with GCP identity
func (azure *AzureAdWorkloadIdentity) patchAnnotation(r *ProfileReconciler, namespace string, ksa string, logger logr.Logger) error {
	ctx := context.Background()

	// Patch service account to enable workload identity
	found := &corev1.ServiceAccount{}
	err := r.Get(ctx, types.NamespacedName{Name: ksa, Namespace: namespace}, found)
	if err != nil {
		return err
	}

	if azure.AzureIdentityClientId == "" {
		return errors.New("failed to setup service account because AzureIdentityClientId is empty")
	}

	var serviceAccountAnnotations = map[string]string{
		AZURE_CLIENT_ID_ANNOTATION_KEY: azure.AzureIdentityClientId, AZURE_TENANT_ID_ANNOTATION_KEY: azure.AzureIdentityTenantId, AZURE_SA_TOKEN_EXPIRATION_ANNOTATION_KEY: azure.AzureServiceAccountTokenExpiration,
	}

	if found.Annotations == nil {
		found.Annotations = serviceAccountAnnotations
	} else {
		for k, v := range serviceAccountAnnotations {
			found.Annotations[k] = v
		}
	}

	// Patch pods to enable workload identity
	podFound := &corev1.Pod{}

	if podFound.Labels == nil {
		podFound.Labels = map[string]string{
			AZURE_WORKLOAD_IDENTITY_POD_ANNOTATION: "true",
		}
	} else {
		podFound.Labels[AZURE_WORKLOAD_IDENTITY_POD_ANNOTATION] = "true"
	}

	// add a label to alls pod to enable workload identity

	// TODO: add a label to all pods in the namespace

	return r.Update(ctx, found)
}

func (azure *AzureAdWorkloadIdentity) RevokePlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	ctx := context.Background()

	found := &corev1.ServiceAccount{}
	err := r.Get(ctx, types.NamespacedName{Name: DEFAULT_EDITOR, Namespace: profile.Name}, found)
	if err != nil {
		return err
	}

	var serviceAccountAnnotations = map[string]string{
		AZURE_CLIENT_ID_ANNOTATION_KEY: azure.AzureIdentityClientId, AZURE_TENANT_ID_ANNOTATION_KEY: azure.AzureIdentityTenantId, AZURE_SA_TOKEN_EXPIRATION_ANNOTATION_KEY: azure.AzureServiceAccountTokenExpiration,
	}

	for k := range serviceAccountAnnotations {
		delete(found.Annotations, k)
	}

	return r.Update(ctx, found)
}

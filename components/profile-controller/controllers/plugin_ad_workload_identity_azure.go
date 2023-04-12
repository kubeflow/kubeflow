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
	"fmt"
	"github.com/go-logr/logr"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/types"
	"regexp"
)

// plugin kind
const KIND_WORKLOAD_IDENTITY = "WorkloadIdentity"

const GCP_ANNOTATION_KEY = "iam.gke.io/gcp-service-account"
const GCP_SA_SUFFIX = ".iam.gserviceaccount.com"
const WORKLOAD_IDENTITY_ROLE = "roles/iam.workloadIdentityUser"

// GcpWorkloadIdentity: plugin that setup GKE workload identity (credentials for GCP API) for target profile namespace.
type GcpWorkloadIdentity struct {
	GcpServiceAccount string `json:"gcpServiceAccount,omitempty"`
}

// ApplyPlugin will grant GCP workload identity to service account DEFAULT_EDITOR
func (gcp *GcpWorkloadIdentity) ApplyPlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profile.Name)
	if err := gcp.patchAnnotation(r, profile.Name, DEFAULT_EDITOR, logger); err != nil {
		return err
	}
	logger.Info("Setting up iam policy.", "ServiceAccount", gcp.GcpServiceAccount)
	return gcp.updateWorkloadIdentity(profile.Name, DEFAULT_EDITOR, addBinding)
}

// GetProjectID will return GCP project id of GcpServiceAccount. Will return empty string if cannot parse GcpServiceAccount
func (gcp *GcpWorkloadIdentity) GetProjectID() (string, error) {
	if gcp.GcpServiceAccount[len(gcp.GcpServiceAccount)-len(GCP_SA_SUFFIX):len(gcp.GcpServiceAccount)] !=
		GCP_SA_SUFFIX {
		return "", fmt.Errorf("%v is not a valid GCP service account.", gcp.GcpServiceAccount)
	}
	re := regexp.MustCompile("\\@(.*?)\\.")
	match := re.FindStringSubmatch(gcp.GcpServiceAccount)
	if match == nil {
		return "", fmt.Errorf("Cannot extract project id from %v.", gcp.GcpServiceAccount)
	}
	return match[1], nil
}

// patchAnnotation will patch annotation to k8s service account in order to pair up with GCP identity
func (gcp *GcpWorkloadIdentity) patchAnnotation(r *ProfileReconciler, namespace string, ksa string, logger logr.Logger) error {
	ctx := context.Background()
	found := &corev1.ServiceAccount{}
	err := r.Get(ctx, types.NamespacedName{Name: ksa, Namespace: namespace}, found)
	if err != nil {
		return err
	}
	if found.Annotations == nil {
		found.Annotations = map[string]string{GCP_ANNOTATION_KEY: gcp.GcpServiceAccount}
	} else {
		found.Annotations[GCP_ANNOTATION_KEY] = gcp.GcpServiceAccount
	}
	logger.Info("Patch Annotation for service account: ", "namespace ", namespace, "name ", ksa)
	return r.Update(ctx, found)
}

// updateWorkloadIdentity update GCP service account IAM binding with provided binding update function f
func (gcp *GcpWorkloadIdentity) updateWorkloadIdentity(namespace string, ksa string, f func(*iam.Policy, string)) error {
	projectID, err := gcp.GetProjectID()
	if err != nil {
		return err
	}
	ctx := context.Background()
	gcpSa := gcp.GcpServiceAccount
	// Get client.
	client, err := google.DefaultClient(ctx, iam.CloudPlatformScope)
	if err != nil {
		return err
	}

	// Create the Cloud IAM service object.
	iamService, err := iam.New(client)
	if err != nil {
		return err
	}
	saResource := fmt.Sprintf("projects/%v/serviceAccounts/%v", projectID, gcpSa)

	// Get credentials.
	credentials, err := google.FindDefaultCredentials(ctx, iam.CloudPlatformScope)
	if err != nil {
		return err
	}

	// Get policy
	currentPolicy, err := iamService.Projects.ServiceAccounts.GetIamPolicy(saResource).Context(ctx).Do()
	if err != nil {
		return err
	}

	// Update policy
	// Use ProjectID from the default credentials for identity namespace if it's not empty in case gcpSa is from a different project
	ksaProjectID := credentials.ProjectID
	if ksaProjectID == "" {
		ksaProjectID = projectID
	}
	bindingMember := fmt.Sprintf("serviceAccount:%v.svc.id.goog[%v/%v]", ksaProjectID, namespace, ksa)
	f(currentPolicy, bindingMember)

	// Set iam policy
	req := &iam.SetIamPolicyRequest{
		Policy: currentPolicy,
	}
	_, err = iamService.Projects.ServiceAccounts.SetIamPolicy(saResource, req).Context(ctx).Do()
	return err
}

// addBinding add binding for <member, WORKLOAD_IDENTITY_ROLE>
func addBinding(currentPolicy *iam.Policy, member string) {
	// add new binding to policy
	newBinding := iam.Binding{}
	newBinding.Role = WORKLOAD_IDENTITY_ROLE
	newBinding.Members = []string{
		member,
	}
	currentPolicy.Bindings = append(currentPolicy.Bindings, &newBinding)
}

// revokeBinding remove binding for <member, WORKLOAD_IDENTITY_ROLE>
func revokeBinding(currentPolicy *iam.Policy, member string) {
	// remove binding member from policy
	for _, binding := range currentPolicy.Bindings {
		if binding.Role == WORKLOAD_IDENTITY_ROLE {
			binding.Members = removeString(binding.Members, member)
		}
	}
}

// RevokePlugin: undo changes made by ApplyPlugin.
func (gcp *GcpWorkloadIdentity) RevokePlugin(r *ProfileReconciler, profile *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profile.Name)
	logger.Info("Clean up Gcp Workload Identity.", "ServiceAccount", gcp.GcpServiceAccount)
	return gcp.updateWorkloadIdentity(profile.Name, DEFAULT_EDITOR, revokeBinding)
}

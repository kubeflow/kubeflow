package profile

import (
	"context"
	"fmt"
	kubeflowv1beta1 "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/kubeflow/v1beta1"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/types"
)

const GCP_PLUGIN = "gcp"
const GCP_ANNOTATION_KEY = "iam.gke.io/gcp-service-account"
// GcpPlugin defines the extra data provided for GCP actions
type GcpPlugin struct {
	GcpServiceAccount string `json:"gcpserviceaccount,omitempty"`
	Project    string `json:"project,omitempty"`
}

// ApplyPlugin will grant GCP workload identity to service account DEFAULT_EDITOR
func (gcp *GcpPlugin) ApplyPlugin(r *ReconcileProfile, profile *kubeflowv1beta1.Profile) error {
	if err := gcp.patchAnnotation(r, profile.Name, DEFAULT_EDITOR); err != nil {
		return err
	}
	return gcp.setupWorkloadIdentity(profile.Name, DEFAULT_EDITOR)
}

// setupWorkloadIdentity creates the k8s service accounts and IAM bindings for them
func (gcp *GcpPlugin) patchAnnotation(r *ReconcileProfile, namespace string, ksa string) error {
	ctx := context.Background()
	found := &corev1.ServiceAccount{}
	err := r.Get(ctx, types.NamespacedName{Name: ksa, Namespace: namespace}, found)
	if err != nil {
		return err
	}
	found.Annotations[GCP_ANNOTATION_KEY] = gcp.GcpServiceAccount
	log.Info("Patch Annotation for service account: ", "namespace ", namespace, "name ", ksa)
	return r.Update(ctx, found)
}

// setupWorkloadIdentity creates the k8s service accounts and IAM bindings for them
func (gcp *GcpPlugin) setupWorkloadIdentity(namespace string, ksa string) error {
	ctx := context.Background()
	gcpSa := gcp.GcpServiceAccount
	// Get credentials.
	client, err := google.DefaultClient(context.Background(), iam.CloudPlatformScope)
	if err != nil {
		return err
	}

	// Create the Cloud IAM service object.
	iamService, err := iam.New(client)
	if err != nil {
		return err
	}
	log.Info("Setting up iam policy for serviceaccount: ", gcpSa, " in namespace ", namespace)
	saResource := fmt.Sprintf("projects/%v/serviceAccounts/%v", gcp.Project, gcpSa)

	// get policy
	currentPolicy, err := iamService.Projects.ServiceAccounts.GetIamPolicy(saResource).Context(ctx).Do()
	if err != nil {
		return err
	}

	// update policy
	newBinding := iam.Binding{}
	newBinding.Role = "roles/iam.workloadIdentityUser"
	newBinding.Members = []string{
		fmt.Sprintf("serviceAccount:%v.svc.id.goog[%v/%v]", gcp.Project, namespace, ksa),
	}
	currentPolicy.Bindings = append(currentPolicy.Bindings, &newBinding)

	// Set iam policy
	req := &iam.SetIamPolicyRequest{
		Policy: currentPolicy,
	}
	_, err = iamService.Projects.ServiceAccounts.SetIamPolicy(saResource, req).Context(ctx).Do()
	return err
}

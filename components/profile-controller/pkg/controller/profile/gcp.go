package profile

import (
	"context"
	"fmt"
	kubeflowv1beta1 "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/kubeflow/v1beta1"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
)

// GcpPlugin defines the extra data provided for GCP actions
type GcpPlugin struct {
	Deployname string `json:"deployname,omitempty"`
	Project    string `json:"project,omitempty"`
}

func (gcp *GcpPlugin) ApplyPlugin(r *ReconcileProfile, profile *kubeflowv1beta1.Profile) error {
	annotation := map[string]string{
		"iam.gke.io/gcp-service-account": gcp.getGcpServiceAccount(),
	}
	if err := r.updateServiceAccount(profile, "kf-user", "edit", annotation); err != nil {
		log.Info("Failed Updating ServiceAccount", "namespace", profile.Name, "name",
			"kf-user", "error", err)
		return err
	}
	return gcp.setupWorkloadIdentity(profile.Name, "kf-user")
}

func (gcp *GcpPlugin) getGcpServiceAccount() string {
	return fmt.Sprintf("%v-user@%v.iam.gserviceaccount.com", gcp.Deployname, gcp.Project)
}

// setupWorkloadIdentity creates the k8s service accounts and IAM bindings for them
func (gcp *GcpPlugin) setupWorkloadIdentity(namespace string, ksa string) error {
	ctx := context.Background()
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
	gcpSa := gcp.getGcpServiceAccount()
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

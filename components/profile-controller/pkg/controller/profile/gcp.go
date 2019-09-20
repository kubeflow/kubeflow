package profile

import (
	"context"
	"fmt"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
)

type WorkloadIdentity struct {
	// SAClientId if supplied grant this service account cluster admin access
	K8sServiceAccount string `json:"username,omitempty"`
	GcpServiceAccount string `json:"username,omitempty"`
}

// GcpPlugin defines the extra data provided for GCP actions
type GcpPlugin struct {
	ServiceAccount string `json:"serviceaccount,omitempty"`
	Deployname string `json:"serviceaccount,omitempty"`
	Project string `json:"serviceaccount,omitempty"`
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
		log.Fatalf("google.DefaultClient: %v", err)
	}

	// Create the Cloud IAM service object.
	iamService, err := iam.New(client)
	if err != nil {
		log.Fatalf("iam.New: %v", err)
	}
	gcpSa := gcp.getGcpServiceAccount()
	log.Infof("Setting up iam policy for serviceaccount: %v in namespace %v", gcpSa, namespace)
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
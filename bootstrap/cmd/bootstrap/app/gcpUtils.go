package app

import (
	"fmt"
	"google.golang.org/api/option"
	"time"

	"strings"

	"github.com/cenkalti/backoff"
	"github.com/prometheus/client_golang/prometheus"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/cloudresourcemanager/v1"
	crm "google.golang.org/api/cloudresourcemanager/v1"
)

type Resource struct {
	Name       string                 `json:"name"`
	Type       string                 `json:"type"`
	Properties map[string]interface{} `json:"properties"`
}

type DmConf struct {
	Imports   interface{} `json:"imports"`
	Resources []Resource  `json:"resources"`
}

type IamBinding struct {
	Members []string `type:"members"`
	Roles   []string `type:"roles"`
}

type IamConf struct {
	IamBindings []IamBinding `json:"bindings"`
}

type ApplyIamRequest struct {
	Project string `json:"project"`
	Cluster string `json:"cluster"`
	Email   string `json:"email"`
	Token   string `json:"token"`
	Action  string `json:"action"`
}

var (
	deploymentsStartedCounter = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "deployments_started",
		Help: "Number of deployments kicked off",
	})
)

func init() {
	// Initialize prometheus counters
	prometheus.MustRegister(deploymentsStartedCounter)
}

func PrepareAccount(account string) string {
	if strings.Contains(account, "iam.gserviceaccount.com") {
		return "serviceAccount:" + account
	}
	if strings.Contains(account, "google-kubeflow-support") {
		return "group:" + account
	} else {
		return "user:" + account
	}
}

func UpdatePolicy(currentPolicy *cloudresourcemanager.Policy, iamConf *IamConf, req ApplyIamRequest) {
	// map from role to members.
	policyMap := map[string]map[string]bool{}
	for _, binding := range currentPolicy.Bindings {
		policyMap[binding.Role] = make(map[string]bool)
		for _, member := range binding.Members {
			policyMap[binding.Role][member] = true
		}
	}

	// Replace placeholder with actual identity.
	saMapping := map[string]string{
		"set-kubeflow-admin-service-account": PrepareAccount(fmt.Sprintf("%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project)),
		"set-kubeflow-user-service-account":  PrepareAccount(fmt.Sprintf("%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project)),
		"set-kubeflow-vm-service-account":    PrepareAccount(fmt.Sprintf("%v-vm@%v.iam.gserviceaccount.com", req.Cluster, req.Project)),
		"set-kubeflow-iap-account":           PrepareAccount(req.Email),
	}
	for _, binding := range iamConf.IamBindings {
		for _, member := range binding.Members {
			actualMember := member
			if val, ok := saMapping[member]; ok {
				actualMember = val
			}
			for _, role := range binding.Roles {
				if _, ok := policyMap[role]; !ok {
					policyMap[role] = make(map[string]bool)
				}
				if req.Action == "add" {
					policyMap[role][actualMember] = true
				} else {
					// action == "remove"
					policyMap[role][actualMember] = false
				}
			}
		}
	}
	var newBindings []*cloudresourcemanager.Binding
	for role, memberSet := range policyMap {
		binding := cloudresourcemanager.Binding{}
		binding.Role = role
		for member, exists := range memberSet {
			if exists {
				binding.Members = append(binding.Members, member)
			}
		}
		newBindings = append(newBindings, &binding)
	}
	currentPolicy.Bindings = newBindings
}

// ProjectAccessChecker defines a func that can be used to check project access
type ProjectAccessChecker func(string, oauth2.TokenSource) (bool, error)

// CheckProjectAccess verifies whether the supplied token provides access to the
// indicated project. A false could indicate the credential provides insufficient
// privileges or is expired
//
// TODO(jlewi): Add a unittest using https://onsi.github.io/gomega/#ghttp-testing-http-clients
func CheckProjectAccess(project string, ts oauth2.TokenSource) (bool, error) {
	ctx := context.Background()

	s, err := crm.NewService(ctx, option.WithTokenSource(ts))

	if err != nil {
		log.Errorf("Failed to create service with error; %+v", err)
		return false, err
	}

	p := crm.NewProjectsService(s)

	// TODO(jlewi): We use setIamPolicy as a check that we have sufficient access to the project
	// might be better to use cluster Admin or similar permission.
	req := &crm.TestIamPermissionsRequest{
		Permissions: []string{"resourcemanager.projects.setIamPolicy"},
	}

	exp := backoff.NewExponentialBackOff()
	exp.InitialInterval = 2 * time.Second
	exp.MaxInterval = 5 * time.Second
	exp.MaxElapsedTime = time.Minute
	exp.Reset()

	isValid := false

	log.Infof("Testing new token grants sufficient privileges")
	err = backoff.Retry(func() error {
		// Get current policy

		res, err := p.TestIamPermissions(project, req).Do()

		if err != nil {
			log.Errorf("There was a problem testing IAM permissions: %v", err)
			return err
		}

		if len(res.Permissions) > 0 {
			isValid = true
		}
		return nil
	}, exp)

	return isValid, err
}

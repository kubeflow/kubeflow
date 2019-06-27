package app

import (
	"fmt"
	"google.golang.org/api/option"
	"time"

	"io/ioutil"
	"path"
	"strings"

	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/prometheus/client_golang/prometheus"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/cloudresourcemanager/v1"
	crm "google.golang.org/api/cloudresourcemanager/v1"
	"google.golang.org/api/deploymentmanager/v2"
	"path/filepath"
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

// TODO: handle concurrent & repetitive deployment requests.
func (s *ksServer) InsertDeployment(ctx context.Context, req CreateRequest, dmSpec DmSpec) (*deploymentmanager.Deployment, error) {
	regPath := s.knownRegistries["kubeflow"].RegUri
	var dmconf DmConf
	err := LoadConfig(path.Join(regPath, dmSpec.ConfigFile), &dmconf)

	if err == nil {
		dmconf.Resources[0].Name = req.Name
		dmconf.Resources[0].Properties["zone"] = req.Zone
		dmconf.Resources[0].Properties["ipName"] = req.IPName
		dmconf.Resources[0].Properties["createPipelinePersistentStorage"] = req.StorageOption.CreatePipelinePersistentStorage
		// https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.zones.clusters
		if s.gkeVersionOverride != "" {
			dmconf.Resources[0].Properties["cluster-version"] = s.gkeVersionOverride
		}
	}
	confByte, err := yaml.Marshal(dmconf)
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return nil, err
	}
	templateData, err := ioutil.ReadFile(path.Join(regPath, dmSpec.TemplateFile))
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return nil, err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return nil, err
	}
	rb := &deploymentmanager.Deployment{
		Name: req.Name + dmSpec.DmNameSuffix,
		Target: &deploymentmanager.TargetConfiguration{
			Config: &deploymentmanager.ConfigFile{
				Content: string(confByte),
			},
			Imports: []*deploymentmanager.ImportFile{
				{
					Content: string(templateData),
					Name:    filepath.Base(dmSpec.TemplateFile),
				},
			},
		},
	}
	_, err = deploymentmanagerService.Deployments.Insert(req.Project, rb).Context(ctx).Do()
	if err != nil {
		// View deployment insert failure as INVALID_ARGUMENT.
		deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
		return nil, err
	}
	deploymentsStartedCounter.Inc()
	return rb, nil
}

func (s *ksServer) GetDeploymentStatus(ctx context.Context, req CreateRequest, deployName string) (string, string, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		return "", "", err
	}
	dm, err := deploymentmanagerService.Deployments.Get(req.Project, deployName).Context(ctx).Do()
	if err != nil {
		return "", "", err
	}
	if dm.Operation.Status == "DONE" {
		if dm.Operation.Error != nil && len(dm.Operation.Error.Errors) > 0 {
			return dm.Operation.Status, dm.Operation.Error.Errors[0].Message, nil
		}
	}
	return dm.Operation.Status, "", nil
}

// Clear existing bindings for auto-generated service accounts of current deployment.
// Those bindings could be leftover from previous actions.
func ClearServiceAccountPolicy(currentPolicy *cloudresourcemanager.Policy, req ApplyIamRequest) {
	serviceAccounts := map[string]bool{
		fmt.Sprintf("serviceAccount:%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project): true,
		fmt.Sprintf("serviceAccount:%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project):  true,
		fmt.Sprintf("serviceAccount:%v-vm@%v.iam.gserviceaccount.com", req.Cluster, req.Project):    true,
	}
	var newBindings []*cloudresourcemanager.Binding
	for _, binding := range currentPolicy.Bindings {
		newBinding := cloudresourcemanager.Binding{
			Role: binding.Role,
		}
		for _, member := range binding.Members {
			// Skip bindings for service accounts of current deployment.
			// We'll reset bindings for them in following steps.
			if _, ok := serviceAccounts[member]; !ok {
				newBinding.Members = append(newBinding.Members, member)
			}
		}
		newBindings = append(newBindings, &newBinding)
	}
	currentPolicy.Bindings = newBindings
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

func (s *ksServer) ApplyIamPolicy(ctx context.Context, req ApplyIamRequest) error {
	// Get the iam change from config.
	regPath := s.knownRegistries["kubeflow"].RegUri
	templatePath := path.Join(regPath, "../deployment/gke/deployment_manager_configs/iam_bindings_template.yaml")
	var iamConf IamConf
	err := LoadConfig(templatePath, &iamConf)
	if err != nil {
		log.Errorf("Failed to load iam config: %v", err)
		return err
	}

	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	resourceManager, err := cloudresourcemanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		log.Errorf("Cannot create resource manager client: %v", err)
		return err
	}
	projLock := s.GetProjectLock(req.Project)
	projLock.Lock()
	defer projLock.Unlock()

	exp := backoff.NewExponentialBackOff()
	exp.InitialInterval = 2 * time.Second
	exp.MaxInterval = 5 * time.Second
	exp.MaxElapsedTime = time.Minute
	exp.Reset()
	// Remove bindings of target service accounts
	err = backoff.Retry(func() error {
		// Get current policy
		saPolicy, err := resourceManager.Projects.GetIamPolicy(
			req.Project,
			&cloudresourcemanager.GetIamPolicyRequest{}).Do()
		if err != nil {
			log.Warningf("Cannot get current policy: %v", err)
			return fmt.Errorf("Cannot get current policy: %v", err)
		}

		// Force update iam bindings of service accounts
		ClearServiceAccountPolicy(saPolicy, req)
		_, err = resourceManager.Projects.SetIamPolicy(
			req.Project,
			&cloudresourcemanager.SetIamPolicyRequest{
				Policy: saPolicy,
			}).Do()
		if err != nil {
			log.Warningf("Cannot set refresh policy: %v", err)
			return fmt.Errorf("Cannot set refresh policy: %v", err)
		}
		return nil
	}, exp)
	if err != nil {
		return err
	}
	// Add new bindings to target service accounts
	exp.Reset()
	err = backoff.Retry(func() error {
		// Get current policy
		saPolicy, err := resourceManager.Projects.GetIamPolicy(
			req.Project,
			&cloudresourcemanager.GetIamPolicyRequest{}).Do()
		if err != nil {
			log.Warningf("Cannot get current policy: %v", err)
			return fmt.Errorf("Cannot get current policy: %v", err)
		}

		// Get the updated policy and apply it.
		UpdatePolicy(saPolicy, &iamConf, req)
		_, err = resourceManager.Projects.SetIamPolicy(
			req.Project,
			&cloudresourcemanager.SetIamPolicyRequest{
				Policy: saPolicy,
			}).Do()
		if err != nil {
			log.Warningf("Cannot set new policy: %v", err)
			return fmt.Errorf("Cannot set new policy: %v", err)
		}
		return nil
	}, exp)
	return nil
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

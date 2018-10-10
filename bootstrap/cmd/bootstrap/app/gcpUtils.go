package app

import (
	"fmt"
	"time"

	"golang.org/x/net/context"
	"google.golang.org/api/deploymentmanager/v2"
	"golang.org/x/oauth2"
	"github.com/ghodss/yaml"
	log "github.com/sirupsen/logrus"
	"google.golang.org/api/cloudresourcemanager/v1"
	"io/ioutil"
	"path"
)

type Resource struct {
	Name string `json:"name"`
	Type string `json:"type"`
	Properties map[string]interface{} `json:"properties"`
}

type DmConf struct {
	Imports interface{} `json:"imports"`
	Resources []Resource `json:"resources"`
}

type IamBinding struct {
	Members []string `type:"members`
	Roles   []string `type:"roles"`
}

type IamConf struct {
	IamBindings []IamBinding `json:"bindings"`
}

type ApplyIamRequest struct {
	Project string `json:"project"`
	Cluster string `json:"cluster"`
	Email string `json:"email"`
	Token string `json:"token"`
	Action string `json:"action`
}

// TODO: handle concurrent & repetitive deployment requests.
func (s *ksServer)InsertDeployment(ctx context.Context, req CreateRequest) error {
	regPath := s.knownRegistries["kubeflow"].RegUri
	var dmconf DmConf
	err := LoadConfig(path.Join(regPath, "../deployment/gke/deployment_manager_configs/cluster-kubeflow.yaml"), &dmconf)

	if err == nil {
		dmconf.Resources[0].Name = req.Name
		dmconf.Resources[0].Properties["zone"] = req.Zone
		dmconf.Resources[0].Properties["clientId"] = req.ClientId
		dmconf.Resources[0].Properties["clientSecret"] = req.ClientSecret
		dmconf.Resources[0].Properties["ipName"] = req.IpName
		dmconf.Resources[0].Properties["users"] = []string { "user:" + req.Email }
		dmconf.Resources[0].Properties["isWebapp"] = true
		// TODO: use get-server-config
		dmconf.Resources[0].Properties["cluster-version"] = "1.10.6-gke.2"
	}
	confByte, err := yaml.Marshal(dmconf)
	if err != nil {
		return err
	}
	templateData, err := ioutil.ReadFile(path.Join(regPath, "../deployment/gke/deployment_manager_configs/cluster.jinja"))
	if err != nil {
		return err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		return err
	}
	rb := &deploymentmanager.Deployment{
		Name: req.Name,
		Target: &deploymentmanager.TargetConfiguration{
			Config: &deploymentmanager.ConfigFile{
				Content: string(confByte),
			},
			Imports: []*deploymentmanager.ImportFile{
				{
					Content: string(templateData),
					Name: "cluster.jinja",
				},
			},
		},
	}
	_, err = deploymentmanagerService.Deployments.Insert(req.Project, rb).Context(ctx).Do()
	if err != nil {
		return err
	}
	return nil
}

func (s *ksServer)GetDeploymentStatus(ctx context.Context, req CreateRequest) (string, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		return "", err
	}
	dm, err := deploymentmanagerService.Deployments.Get(req.Project, req.Name).Context(ctx).Do()
	if err != nil {
		return "", err
	}
	return dm.Operation.Status, nil
}

// Clear existing bindings for auto-generated service accounts of current deployment.
// Those bindings could be leftover from previous actions.
func GetClearServiceAccountpolicy(currentPolicy *cloudresourcemanager.Policy, req ApplyIamRequest) cloudresourcemanager.Policy {
	serviceAccounts := map[string]bool {
		fmt.Sprintf("serviceAccount:%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project): true,
		fmt.Sprintf("serviceAccount:%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project): true,
		fmt.Sprintf("serviceAccount:%v-vm@%v.iam.gserviceaccount.com", req.Cluster, req.Project): true,
	}
	newPolicy := cloudresourcemanager.Policy{}
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
		newPolicy.Bindings = append(newPolicy.Bindings, &newBinding)
	}
	return newPolicy
}

func GetUpdatedPolicy(currentPolicy *cloudresourcemanager.Policy, iamConf *IamConf, req ApplyIamRequest) cloudresourcemanager.Policy {
	// map from role to members.
	policyMap := map[string]map[string]bool {}
	for _, binding := range currentPolicy.Bindings {
		policyMap[binding.Role] = make(map[string]bool)
		for _, member := range binding.Members {
			policyMap[binding.Role][member] = true
		}
	}

	// Replace placeholder with actual identity.
	saMapping := map[string]string {
		"set-kubeflow-admin-service-account": fmt.Sprintf("serviceAccount:%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project),
		"set-kubeflow-user-service-account": fmt.Sprintf("serviceAccount:%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project),
		"set-kubeflow-vm-service-account": fmt.Sprintf("serviceAccount:%v-vm@%v.iam.gserviceaccount.com", req.Cluster, req.Project),
		"set-kubeflow-iap-account": fmt.Sprintf("user:%v", req.Email),
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
	newPolicy := cloudresourcemanager.Policy{}
	for role, memberSet := range policyMap {
		binding := cloudresourcemanager.Binding{}
		binding.Role = role
		for member, exists := range memberSet {
			if exists {
				binding.Members = append(binding.Members, member)
			}
		}
		newPolicy.Bindings = append(newPolicy.Bindings, &binding)
	}
	return newPolicy
}

func (s *ksServer)ApplyIamPolicy(ctx context.Context, req ApplyIamRequest) error {
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
	s.serverMux.Lock()
	defer s.serverMux.Unlock()

	retry := 0
	for retry < 5 {
		retry += 1
		// Get current policy
		saPolicy, err := resourceManager.Projects.GetIamPolicy(
			req.Project,
			&cloudresourcemanager.GetIamPolicyRequest{
			}).Do()
		if err != nil {
			log.Warningf("Cannot get current policy: %v", err)
			time.Sleep(3 * time.Second)
			continue
		}

		// Force update iam bindings of service accounts
		clearedPolicy := GetClearServiceAccountpolicy(saPolicy, req)
		_, err = resourceManager.Projects.SetIamPolicy(
			req.Project,
			&cloudresourcemanager.SetIamPolicyRequest{
				Policy: &clearedPolicy,
			}).Do()
		if err != nil {
			log.Warningf("Cannot set refresh policy: %v", err)
			time.Sleep(3 * time.Second)
			continue
		}

		// Get the updated policy and apply it.
		newPolicy := GetUpdatedPolicy(saPolicy, &iamConf, req)
		_, err = resourceManager.Projects.SetIamPolicy(
			req.Project,
			&cloudresourcemanager.SetIamPolicyRequest{
				Policy: &newPolicy,
			}).Do()
		if err != nil {
			log.Warningf("Cannot set new policy: %v", err)
			time.Sleep(3 * time.Second)
			continue
		}
		break
	}
	if err != nil {
		return err
	}
	return nil
}

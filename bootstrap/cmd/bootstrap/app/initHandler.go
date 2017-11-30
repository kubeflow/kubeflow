package app

import (
	"github.com/go-kit/kit/endpoint"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/cloudresourcemanager/v1"
)

const IAM_ADMIN_ROLE = "roles/resourcemanager.projectIamAdmin"

type InitProjectRequest struct {
	Project       string
	ProjectNumber string
	Token         string
}

// TODO: migrate service enabling logic to initHandler
func makeInitProjectEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(InitProjectRequest)
		dmServiceAccount := req.ProjectNumber + "@cloudservices.gserviceaccount.com"
		err := svc.BindRole(ctx, req.Project, req.Token, dmServiceAccount)
		r := &basicServerResponse{}
		if err != nil {
			r.Err = err.Error()
		}
		return r, nil
	}
}

func (s *ksServer) BindRole(ctx context.Context, project string, token string, serviceAccount string) error {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	resourcManger, err := cloudresourcemanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		log.Errorf("Cannot create resourc manger client: %v", err)
		return err
	}

	// Even with lock here, there's still very small chance that updating project iam policy will fail
	// if other users are editing policy directly at the same time.
	projLock := s.GetProjectLock(project)
	projLock.Lock()
	defer projLock.Unlock()

	saPolicy, err := resourcManger.Projects.GetIamPolicy(
		project,
		&cloudresourcemanager.GetIamPolicyRequest{}).Do()

	if err != nil {
		log.Errorf("Cannot get current ploicy: %v", err)
		return err
	}
	saPolicy.Bindings = append(saPolicy.Bindings,
		&cloudresourcemanager.Binding{
			Members: []string{"serviceAccount:" + serviceAccount},
			Role:    IAM_ADMIN_ROLE,
		})
	_, err = resourcManger.Projects.SetIamPolicy(
		project,
		&cloudresourcemanager.SetIamPolicyRequest{
			Policy: saPolicy,
		}).Do()
	if err != nil {
		log.Errorf("Cannot set new ploicy: %v", err)
		return err
	}
	return nil
}

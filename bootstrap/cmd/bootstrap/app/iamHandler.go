package app

import (
	"github.com/go-kit/kit/endpoint"
	"golang.org/x/net/context"
		"golang.org/x/oauth2"
	log "github.com/sirupsen/logrus"
				"google.golang.org/api/cloudresourcemanager/v1"
)

type BindRoleRequest struct {
	Project string
	Role string
	ServiceAccount string
	Token string
}

func makeBindRoleEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(BindRoleRequest)
		err := svc.BindRole(ctx, req)
		r := &basicServerResponse{}
		if err != nil {
			r.Err = err.Error()
		}
		return r, nil
	}
}

func (s *ksServer) BindRole(ctx context.Context, request BindRoleRequest) error {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: request.Token,
	})
	resourcManger, err := cloudresourcemanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		log.Errorf("Cannot create resourc manger client: %v", err)
		return err
	}

	// Even with lock here, there's still very small chance that updating project iam policy will fail
	// if other users are editing policy directly at the same time.
	s.iamMux.Lock()
	defer s.iamMux.Unlock()

	saPolicy, err := resourcManger.Projects.GetIamPolicy(
		request.Project,
		&cloudresourcemanager.GetIamPolicyRequest{
		}).Do()

	if err != nil {
		log.Errorf("Cannot get current ploicy: %v", err)
		return err
	}
	saPolicy.Bindings = append(saPolicy.Bindings,
		&cloudresourcemanager.Binding{
			Members: []string{"serviceAccount:" + request.ServiceAccount},
			Role: request.Role,
		})
	_, err = resourcManger.Projects.SetIamPolicy(
		request.Project,
		&cloudresourcemanager.SetIamPolicyRequest{
			Policy: saPolicy,
		}).Do()
	if err != nil {
		log.Errorf("Cannot set new ploicy: %v", err)
		return err
	}
	return nil
}
package app

import (
	"context"
	"encoding/json"
	"fmt"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"net/http"
)

// KfctlCreatePath is the path on which to serve create requests
const KfctlCreatePath = "/kfctl/apps/v1alpha2/create"

// kfctlServer is a server to manage a single deployment.
// It is a wrapper around kfctl.
type kfctlServer struct {
	ts *RefreshableTokenSource
	c  chan CreateRequest

	kfApp NewKfAppFromKfDef
}

// NewServer returns a new kfctl server
func NewKfctlServer() (*kfctlServer, error) {
	s := &kfctlServer{
		c: make(chan CreateRequest, 10),
	}

	// Start a background thread to process requests
	go s.process()

	return s, nil
}

func (s *kfctlServer) process() {
	for {
		r := <-s.c

		kfApp, err := coordinator.NewKfAppFromKfDef(r.KfDef)

		if err != nil {
			pKfDef, _ := Pformat(r.KfDef)
			log.Errorf("There was a problem creating the KfApp; error %v;\nKfDef:\n%v",
				err, pKfDef)
		}
	}
}

// RegisterEndpoints creates the http endpoints for the router
func (s *kfctlServer) RegisterEndpoints() {
	createHandler := httptransport.NewServer(
		makeRouterCreateRequestEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request CreateRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				log.Info("Err decoding create request: " + err.Error())
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	// Override the default error encoder. We want to be able to set the status code based on the type of error.
	httptransport.ServerErrorEncoder(errorEncoder)(createHandler)

	// TODO(jlewi): We probably want to fix the URL we are serving on.
	// There are a variety of changes in flight
	// 1. Migrating click to deploy to use kfctl logic
	// 2. Migrating to a new REST API for deployments
	// 3. This PR aimed at running the deployment in each pod.
	// Depending on how we stage these changes we might need to change these URLs.
	http.Handle(KfctlCreatePath, optionsHandler(createHandler))
}

// CreateDeployment creates the deployment.
func (s *kfctlServer) CreateDeployment(ctx context.Context, req CreateRequest) (*CreateResponse, error) {
	if s.ts == nil {
		log.Infof("Initializing token source")
		ts, err := NewRefreshableTokenSource(req.Project)

		if err != nil {
			log.Errorf("Could not create token source; error %v", err)

			return nil, &httpError{
				Message: "Internal service error please try again later.",
				Code:    http.StatusInternalServerError,
			}
		}

		s.ts = ts
	}

	// Refresh the credential. This will fail if it doesn't provide access to the project
	err := s.ts.Refresh(oauth2.Token{
		AccessToken: req.Token,
	})

	if err != nil {
		log.Errorf("Refreshing the token failed; %v", err)
		return nil, &httpError{
			Message: fmt.Sprintf("Could not verify you have admin priveleges on project %v; please check that the project is correct and you have admin priveleges", req.Project),
			Code:    http.StatusInternalServerError,
		}
	}

	// Enqueue the request
	s.c <- req

	// Return the current status.
	// TODO(jlewi):
	// 1. Do IAM check
	// 2. Check if service exists by sending request
	// 3. If service doesn't exist create a service and statefulset
	log.Infof("Recieved deployment request: %+v", req)
	return nil, &httpError{
		Message: "CreateDeployment isn't implemented yet.",
		Code:    http.StatusNotImplemented,
	}
}

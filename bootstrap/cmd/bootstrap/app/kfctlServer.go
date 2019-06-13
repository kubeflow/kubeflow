package app

import (
	"context"
	"encoding/json"
	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	log "github.com/sirupsen/logrus"
	"net/http"
)

// KfctlCreatePath is the path on which to serve create requests
const KfctlCreatePath = "/kfctl/apps/v1alpha2/create"

// kfctlServer is a server to manage a single deployment.
// It is a wrapper around kfctl.
type kfctlServer struct {
}

// NewServer returns a new kfctl server
func NewKfctlServer() (*kfctlServer, error) {
	return &kfctlServer{}, nil
}

// makeKfctlCreateRequestEndpoint creates an endpoint to handle createdeployment requests
// using kfctl
func makeKfctlCreateRequestEndpoint(svc KfctlService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		r, err := svc.CreateDeployment(ctx, req)

		return r, err
	}
}

// RegisterEndpoints creates the http endpoints for the router
func (r *kfctlServer) RegisterEndpoints() {
	createHandler := httptransport.NewServer(
		makeRouterCreateRequestEndpoint(r),
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

// Apply runs apply on a ksonnet application.
func (r *kfctlServer) CreateDeployment(ctx context.Context, req CreateRequest) (*CreateResponse, error) {
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

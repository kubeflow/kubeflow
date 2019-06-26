package app

// TODO(jlewi): How could we create a unittest? I think one of the things we'd like to test
// is the interaction between the createDeployment request handler and the background processing.
// We'd like to verify that if we issue subsequent requests we will eventually get an updated status.
//
// 1 test we can right is to inject the channel.

import (
	"context"
	"encoding/json"
	"fmt"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"net/http"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"os"
	"path"
	"sync"
)

// KfctlCreatePath is the path on which to serve create requests
const KfctlCreatePath = "/kfctl/apps/v1alpha2/create"

// kfctlServer is a server to manage a single deployment.
// It is a wrapper around kfctl.
type kfctlServer struct {
	ts *RefreshableTokenSource
	c  chan kfdefsv2.KfDef

	appsDir string
	kfApp kftypes.KfApp
	kfDefGetter coordinator.KfDefGetter

	// Mutex protecting the latest KfDef spec
	kfDefMux    sync.Mutex

	// latestKfDef is updated to provide the latest status information.
	latestKfDef kfdefsv2.KfDef
}

// NewServer returns a new kfctl server
func NewKfctlServer(appsDir string) (*kfctlServer, error) {
	if appsDir != "" {
		return nil, errors.WithStack(fmt.Errorf("appsDir must be provided"))
	}

	s := &kfctlServer{
		c: make(chan kfdefsv2.KfDef, 10),
		appsDir: appsDir,
	}

	// Start a background thread to process requests
	go s.process()

	return s, nil
}

func (s *kfctlServer) process() {
	for {
		r := <-s.c

		if s.kfApp == nil {
			cfgFile := path.Join(s.appsDir, r.Name, kftypes.KfConfigFile)
			if _, err := os.Stat(cfgFile); os.IsNotExist(err) {
				log.Infof("Creating cfgFile; %v", cfgFile)
				newCfgFile, err := coordinator.CreateKfAppCfgFile(&r)

				if newCfgFile != cfgFile {
					log.Errorf("Actual config file %v; doesn't match expected %v", newCfgFile, cfgFile)
				}

				if err != nil {
					// TODO(jlewi): We should update the KfDef.Status so that we report
					// the failure to the user on the next call.
					log.Errorf("There was a problem creating %v; error %v", cfgFile, err)
					continue
				}

				kfApp, err := coordinator.LoadKfAppCfgFile(cfgFile)

				getter, ok := kfApp.(coordinator.KfDefGetter)
				if !ok {
					log.Errorf("Could not assert KfApp as type KfDefGetter; error %v", err)
				}

				s.kfApp = kfApp
				s.kfDefGetter = getter

				log.Errorf("Need to set tokenSource on GCP")
			}
		}

		log.Infof("Calling generate")
		if err := s.kfApp.Generate(kftypes.ALL); err != nil {
			// Update the latest spec.
			s.kfDefMux.Lock()
			defer s.kfDefMux.Unlock()

			s.latestKfDef = *s.kfDefGetter.GetKfDef()
			log.Errorf("Calling generate failed; %v", err)
		}

		log.Infof("Calling apply")
		if err := s.kfApp.Apply(kftypes.ALL); err != nil {
			// Update the latest spec.
			s.kfDefMux.Lock()
			defer s.kfDefMux.Unlock()

			s.kfDefGetter.GetKfDef().DeepCopyInto(&s.latestKfDef)
			log.Errorf("Calling apply failed; %v", err)
		}
	}
}

// RegisterEndpoints creates the http endpoints for the router
func (s *kfctlServer) RegisterEndpoints() {
	createHandler := httptransport.NewServer(
		makeRouterCreateRequestEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request kfdefsv2.KfDef
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
func (s *kfctlServer) CreateDeployment(ctx context.Context, req kfdefsv2.KfDef) (*kfdefsv2.KfDef, error) {
	token, err := req.GetSecret(gcp.GcpAccessTokenName)

	if err != nil {
		log.Errorf("Failed to get secret %v; error %v", gcp.GcpAccessTokenName, err)
		return nil, &httpError{
			Message: fmt.Sprintf("Could not obtain an access token from secret %v", gcp.GcpAccessTokenName),
			Code:    http.StatusBadRequest,
		}
	}

	if s.ts == nil {
		log.Infof("Initializing token source")
		ts, err := NewRefreshableTokenSource(token)

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
	err = s.ts.Refresh(oauth2.Token{
		AccessToken: token,
	})

	if err != nil {
		log.Errorf("Refreshing the token failed; %v", err)
		return nil, &httpError{
			Message: fmt.Sprintf("Could not verify you have admin priveleges on project %v; please check that the project is correct and you have admin priveleges", req.Spec.Project),
			Code:    http.StatusBadRequest,
		}
	}

	// Enqueue the request
	s.c <- req

	// Return the current status.
	s.kfDefMux.Lock()
	defer s.kfDefMux.Unlock()

	res := s.kfDefGetter.GetKfDef().DeepCopy()
	return res, nil
}

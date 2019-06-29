package app

// TODO(jlewi): How could we create a unittest? I think one of the things we'd like to test
// is the interaction between the createDeployment request handler and the background processing.
// We'd like to verify that if we issue subsequent requests we will eventually get an updated status.
//
// 1 test we can right is to inject the channel.

import (
	"cloud.google.com/go/container/apiv1"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	httptransport "github.com/go-kit/kit/transport/http"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v2/pkg/kfapp/kustomize"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"google.golang.org/api/option"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"k8s.io/client-go/v2/rest"
	"net/http"
	"os"
	"path"
	"sync"
)

// KfctlCreatePath is the path on which to serve create requests
const KfctlCreatePath = "/kfctl/apps/v1alpha2/create"

// kfctlServer is a server to manage a single deployment.
// It is a wrapper around kfctl.
type kfctlServer struct {
	ts TokenRefresher
	c  chan kfdefsv2.KfDef

	appsDir string

	// builder supports injecting the code to create the coordinator so we can inject a fake during testing.
	builder coordinator.Builder

	kfApp       kftypes.KfApp
	kfDefGetter coordinator.KfDefGetter

	// Mutex protecting the latest KfDef spec
	kfDefMux sync.Mutex

	// latestKfDef is updated to provide the latest status information.
	latestKfDef kfdefsv2.KfDef
}

// NewServer returns a new kfctl server
func NewKfctlServer(appsDir string) (*kfctlServer, error) {
	if appsDir == "" {
		return nil, errors.WithStack(fmt.Errorf("appsDir must be provided"))
	}

	s := &kfctlServer{
		c:       make(chan kfdefsv2.KfDef, 10),
		appsDir: appsDir,
		builder: &coordinator.DefaultBuilder{},
	}

	// Start a background thread to process requests
	go s.process()

	return s, nil
}

// handleDeployment handles a single deployment.
// Returns a pointer to an updated KfDef
//
// Not thread safe.
//
// TODO(jlewi): Errors should be reported to user by adding appropriate conditions
// to the KfDef.
func (s *kfctlServer) handleDeployment(r kfdefsv2.KfDef) (*kfdefsv2.KfDef, error) {
	ctx := context.Background()
	if s.kfApp == nil {
		if r.Spec.AppDir != "" {
			log.Warnf("r.Spec.AppDir is set it will be overwritten.")
		}
		r.Spec.AppDir = path.Join(s.appsDir, r.Name)
		cfgFile := path.Join(r.Spec.AppDir, kftypes.KfConfigFile)
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
				return &r, &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}

			kfApp, err := s.builder.LoadKfAppCfgFile(cfgFile)

			getter, ok := kfApp.(coordinator.KfDefGetter)
			if !ok {
				log.Errorf("Could not assert KfApp as type KfDefGetter; error %v", err)
				return &r, &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}

			p, ok := getter.GetPlugin(kftypes.GCP)
			if !ok {
				log.Errorf("Could not get GCP plugin from KfApp")
				return &r, &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}

			gcpPlugin, ok := p.(gcp.Setter)

			if !ok {
				log.Errorf("Plugin %v doesn't implement Setter interface; can't set TokenSource", kftypes.GCP)
				return &r, &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}

			setTokenSource := func() bool {
				s.kfDefMux.Lock()
				defer s.kfDefMux.Unlock()

				if s.ts == nil {
					log.Errorf("No token source set; can't create KfApp")
					return false
				}

				gcpPlugin.SetTokenSource(s.ts)
				return true
			}

			if !setTokenSource() {
				return &r, &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}
			s.kfApp = kfApp
			s.kfDefGetter = getter
		}
	}

	log.Infof("Calling generate")
	if err := s.kfApp.Generate(kftypes.ALL); err != nil {
		log.Errorf("Calling generate failed; %v", err)
		return s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}

	// We need to split the apply into two steps because after
	// creating the platform we need to construct and inject the K8s client to
	// be used with kustomize.
	log.Infof("Calling apply platform")
	if err := s.kfApp.Apply(kftypes.PLATFORM); err != nil {
		log.Errorf("Calling apply platform failed; %v", err)
		return s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}


	kPlugin, ok := s.kfDefGetter.GetPlugin(kftypes.KUSTOMIZE)
	if !ok {
		log.Errorf("Could not get %v plugin from KfApp", kftypes.KUSTOMIZE)
		return  s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}

	kPluginSetter, ok := kPlugin.(kustomize.Setter)

	if !ok {
		log.Errorf("Plugin %v doesn't implement Setter interface; can't set K8s client", kftypes.KUSTOMIZE)
		return  s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}

	log.Infof("Creating K8s client")
	token, err := s.ts.Token()

	if err != nil {
		log.Errorf("Could not get a GCP token; error %v", err)
		return  s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}

	// TODO(jlewi): BuildClusterConfig makes a call to the Containers API to get cluster info.
	// Should we add retries?
	k8sRest, err := BuildClusterConfig(ctx, token.AccessToken, r.Spec.Project, r.Spec.Zone, r.Name)
	if err != nil {
		log.Errorf("Could not build K8s client; error %v", err)
		return  s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}
	kPluginSetter.SetK8sRestConfig(k8sRest)

	log.Infof("Calling apply K8s")
	if err := s.kfApp.Apply(kftypes.K8S); err != nil {
		log.Errorf("Calling apply K8s failed; %v", err)
		return s.kfDefGetter.GetKfDef(), &httpError{
			Message: "Internal service error please try again later.",
			Code:    http.StatusInternalServerError,
		}
	}

	log.Errorf("Need to implement code to push app to source repo.")
	return s.kfDefGetter.GetKfDef(), nil

	// Push to source repo.
	//err = SaveAppToRepo(req.Email, path.Join(repoDir, GetRepoNameKfctl(req.Project)))
}

func (s *kfctlServer) process() {
	for {
		r := <-s.c

		newDeployment, err := s.handleDeployment(r)

		if err != nil {
			log.Errorf("Error occured; %v", err)
		}
		s.setLatestKfDef(newDeployment)
	}
}

func (s *kfctlServer) setLatestKfDef(r *kfdefsv2.KfDef) {
	s.kfDefMux.Lock()
	defer s.kfDefMux.Unlock()
	s.latestKfDef = *s.kfDefGetter.GetKfDef()

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

	initFunc := func() error {
		s.kfDefMux.Lock()
		defer s.kfDefMux.Unlock()

		if s.ts == nil {
			log.Infof("Initializing token source")
			ts, err := NewRefreshableTokenSource(req.Spec.Project)

			if err != nil {
				log.Errorf("Could not create token source; error %v", err)

				return &httpError{
					Message: "Internal service error please try again later.",
					Code:    http.StatusInternalServerError,
				}
			}

			s.ts = ts
		}
		return nil
	}

	if err := initFunc(); err != nil {
		return nil, err
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
	// TODO(jlewi): We should strip out the AccessToken from KfDef before enqueing it.
	// There's no reason to pass it along. Gcp now has the token source.
	// In fact we should actually pass it along via the request body. Instead
	// We should move it into an Auth Header.
	s.c <- req

	// Return the current status.
	s.kfDefMux.Lock()
	defer s.kfDefMux.Unlock()

	res := s.latestKfDef.DeepCopy()
	return res, nil
}

// BuildClusterConfig creates a Kubernetes rest config.
// TODO(jlewi): This is a duplicate of BuildClusterConfig defined in
// v2/pkgs/utils/k8sAUth.go. When I tried to use that method I ran into problems
// because here we are using "k8s.io/client-go/v2/rest" and that code is using
// "k8s.io/client-go/rest"; duplicating the code was a quick hack.
// I think this might go away once we remove ksonnet since then we can use a single version
// of the go client library.
func BuildClusterConfig(ctx context.Context, token string, project string, zone string,
	clusterID string) (*rest.Config, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	req := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone:      zone,
		ClusterId: clusterID,
	}
	resp, err := c.GetCluster(ctx, req)
	if err != nil {
		return nil, err
	}
	caDec, _ := base64.StdEncoding.DecodeString(resp.MasterAuth.ClusterCaCertificate)
	return &rest.Config{
		Host:        "https://" + resp.Endpoint,
		BearerToken: token,
		TLSClientConfig: rest.TLSClientConfig{
			CAData: []byte(string(caDec)),
		},
	}, nil
}
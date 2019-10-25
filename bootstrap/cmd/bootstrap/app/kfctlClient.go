package app

import (
	"context"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/ratelimit"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/configconverters"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	log "github.com/sirupsen/logrus"
	"golang.org/x/time/rate"
	"net/url"
	"path/filepath"
	"strings"
	"time"
)

// KfctlClient provides a client to the KfctlServer
type KfctlClient struct {
	createEndpoint endpoint.Endpoint
	getEndpoint    endpoint.Endpoint
}

// NewKfctlClient returns a KfctlClient backed by an HTTP server living at the
// remote instance.
func NewKfctlClient(instance string) (*KfctlClient, error) {
	// Quickly sanitize the instance string.
	if !strings.HasPrefix(instance, "http") {
		instance = "http://" + instance
	}
	u, err := url.Parse(instance)
	if err != nil {
		return nil, err
	}

	// We construct a single ratelimiter middleware, to limit the total outgoing
	// QPS from this client to all methods on the remote instance. We also
	// construct per-endpoint circuitbreaker middlewares to demonstrate how
	// that's done, although they could easily be combined into a single breaker
	// for the entire remote instance, too.
	limiter := ratelimit.NewErroringLimiter(rate.NewLimiter(rate.Every(time.Second), 100))

	// Each individual endpoint is an http/transport.Client (which implements
	// endpoint.Endpoint) that gets wrapped with various middlewares. If you
	// made your own client library, you'd do this work there, so your server
	// could rely on a consistent set of client behavior.
	var createEndpoint endpoint.Endpoint
	{
		createEndpoint = httptransport.NewClient(
			"POST",
			copyURL(u, KfctlCreatePath),
			encodeHTTPGenericRequest,
			decodeHTTPKfdefResponse,
		).Endpoint()
		createEndpoint = limiter(createEndpoint)
	}
	var getEndpoint endpoint.Endpoint
	{
		getEndpoint = httptransport.NewClient(
			"POST",
			copyURL(u, KfctlGetpath),
			encodeHTTPGenericRequest,
			decodeHTTPKfdefResponse,
		).Endpoint()
		getEndpoint = limiter(getEndpoint)
	}

	// Returning the endpoint.Set as a service.Service relies on the
	// endpoint.Set implementing the Service methods. That's just a simple bit
	// of glue code.
	return &KfctlClient{
		createEndpoint: createEndpoint,
		getEndpoint:    getEndpoint,
	}, nil
}

// CreateDeployment issues a CreateDeployment to the requested backend
func (c *KfctlClient) CreateDeployment(ctx context.Context, req C2DRequest) (*kfdefs.KfDef, error) {
	configFileBytes, err := configconverters.LoadFileFromURI(req.ConfigFile)
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, err
	}
	// appdir will be reset on kfctl server.
	kfconfigIns, err := configconverters.KfdefByteToKfConfig(configFileBytes, "/opt/bootstrap")
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		log.Errorf("Failed to convert kfdef-byte to kfconfig: %v", err)
		return nil, err
	}
	kfconfigIns.Spec.ConfigFileName = filepath.Base(req.ConfigFile)

	// Fill in user input
	kfconfigIns.Name = req.Name
	// Not passing a pointer interface is a common cause of deserialization problems
	pluginSpec := &gcp.GcpPluginSpec{}

	err = kfconfigIns.GetPluginSpec(gcp.GcpPluginName, pluginSpec)
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		log.Errorf("Failed to load GcpPluginSpec: %v", err)
		return nil, err
	}
	pluginSpec.Project = req.Project
	pluginSpec.Zone = req.Zone
	if req.EndpointConfig.BasicAuth.Username != "" && req.EndpointConfig.BasicAuth.Password != "" {

	} else {
		if req.EndpointConfig.IAP.OAuthClientId != "" && req.EndpointConfig.IAP.OAuthClientSecret != "" {

		} else {

		}
	}

	var resp interface{}
	bo := backoff.NewExponentialBackOff()
	bo.InitialInterval = 3 * time.Second

	if d, ok := ctx.Deadline(); ok {
		bo.MaxElapsedTime = d.Sub(time.Now())
	} else {
		// TODO(https://github.com/kubeflow/kubeflow/issues/4131) we should be able to set a more reasonable O(minute)
		// timeout if we move alerting and monitoring from the router into kfctl server.
		bo.MaxElapsedTime = 30 * time.Minute
	}
	// Add retry logic
	permErr := backoff.Retry(func() error {
		resp, err = c.createEndpoint(ctx, *kfconfigIns)
		if err != nil {
			log.Errorf("createEndpoint call failed with: %v", err)
			return err
		}
		log.Errorf("createEndpoint call succeeded!")
		return nil
	}, bo)

	if permErr != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, permErr
	}
	response, ok := resp.(*kfconfig.KfConfig)

	if !ok {
		log.Info("Response is not type *KfDef")
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		resErr, ok := resp.(*httpError)
		if ok {
			return nil, resErr
		}

		log.Info("Response is not type *httpError")
		pRes, _ := Pformat(resp)
		log.Errorf("Received unexpected response; %v", pRes)
		return nil, resErr
	}

	// Watch deployment status, update monitor signal as needed.
	log.Infof("Watching deployment status")

	if d, ok := ctx.Deadline(); ok {
		bo.MaxElapsedTime = d.Sub(time.Now())
	} else {
		// TODO(https://github.com/kubeflow/kubeflow/issues/4131) we should be able to set a more reasonable O(minute)
		// timeout if we move alerting and monitoring from the router into kfctl server.
		bo.MaxElapsedTime = 30 * time.Minute
	}
	bo.Reset()
	permErr = backoff.Retry(func() error {
		latestKfdef, err := c.GetLatestKfdef(*kfconfigIns)
		if err != nil {
			return backoff.Permanent(err)
		}
		response = latestKfdef
		if len(latestKfdef.Status.Conditions) == 0 {
			return fmt.Errorf("deployment condition not available")
		} else {
			if response.Status.Conditions[0].Type == kfdefs.Unhealthy {
				return backoff.Permanent(fmt.Errorf(response.Status.Conditions[0].Message))
			}
		}
		return nil
	}, bo)
	if permErr != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, permErr
	}
	log.Infof("Deployment succeeded")
	deployReqCounter.WithLabelValues("OK").Inc()
	kfDeploymentLatencies.Observe(timeSinceStart(ctx).Seconds())
	if req.Project != "kubeflow-prober-deploy" {
		kfDeploymentsDoneRaw.Inc()
		kfDeploymentsDoneUser.Inc()
	}
	return response, nil
}

func (c *KfctlClient) GetLatestKfdef(req kfconfig.KfConfig) (*kfconfig.KfConfig, error) {
	//resp, err := c.getEndpoint(context.Background(), req)
	//if err != nil {
	//	return nil, err
	//}
	//response, ok := resp.(*kfdefs.KfDef)
	//
	//if ok {
	//	return response, nil
	//}
	//
	//log.Info("Response is not type *KfDef")
	//resErr, ok := resp.(*httpError)
	//
	//if ok {
	//	return nil, resErr
	//}
	//
	//log.Info("Response is not type *httpError")
	//
	//pRes, _ := Pformat(resp)
	//log.Errorf("Received unexpected response; %v", pRes)
	//return nil, fmt.Errorf("Received unexpected response; %v", pRes)
	// TODO (kunming) finish implementaion; not blocking because it's not been used.
	return &kfconfig.Status{}, nil
}

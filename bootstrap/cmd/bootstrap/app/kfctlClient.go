package app

import (
	"context"
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/ratelimit"
	httptransport "github.com/go-kit/kit/transport/http"
	kfdefsv1alpha1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfdefsv1beta1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	log "github.com/sirupsen/logrus"
	"golang.org/x/time/rate"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// KfctlClient provides a client to the KfctlServer
type KfctlClient struct {
	createEndpoint endpoint.Endpoint
	getEndpoint    endpoint.Endpoint
}

// Default apps dir, could be rewrite on kfctl server side.
const DEFAULT_APPS_PATH = "/opt/bootstrap"

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
func (c *KfctlClient) CreateDeployment(ctx context.Context, req C2DRequest) (*kfdefsv1beta1.KfDef, error) {
	var client http.Client
	configResp, err := client.Get(req.ConfigFile)
	if err != nil || configResp == nil || configResp.StatusCode != http.StatusOK {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, fmt.Errorf("Failed fetching file %v: %v", req.ConfigFile, err)
	}
	defer configResp.Body.Close()
	configFileBytes, err := ioutil.ReadAll(configResp.Body)
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, fmt.Errorf("could not read from config file %s: %v", req.ConfigFile, err)
	}
	kfdef := &kfdefsv1beta1.KfDef{}
	if err := yaml.Unmarshal(configFileBytes, kfdef); err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, fmt.Errorf("could not unmarshal config file onto KfDef struct: %v", err)
	}

	kfdef.Name = req.Name
	kfdef.SetSecret(kfdefsv1beta1.Secret{
		Name: gcp.GcpAccessTokenName,
		SecretSource: &kfdefsv1beta1.SecretSource{
			LiteralSource: &kfdefsv1beta1.LiteralSource{
				Value: req.Token,
			},
		},
	})

	// Not passing a pointer interface is a common cause of deserialization problems
	pluginSpec := &gcp.GcpPluginSpec{}

	err = kfdef.GetPluginSpec(gcp.GcpPluginName, pluginSpec)
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		log.Errorf("Failed to load GcpPluginSpec: %v", err)
		return nil, err
	}
	pluginSpec.Project = req.Project
	pluginSpec.Zone = req.Zone
	pluginSpec.Email = req.Email
	pluginSpec.SkipInitProject = true

	if req.EndpointConfig.BasicAuth.Username != "" && req.EndpointConfig.BasicAuth.Password != "" {
		pluginSpec.Auth = &gcp.Auth{
			BasicAuth: &gcp.BasicAuth{
				Username: req.EndpointConfig.BasicAuth.Username,
				Password: &kfdefsv1alpha1.SecretRef{
					Name: gcp.BasicAuthPasswordSecretName,
				},
			},
		}
		kfdef.SetSecret(kfdefsv1beta1.Secret{
			Name: gcp.BasicAuthPasswordSecretName,
			SecretSource: &kfdefsv1beta1.SecretSource{
				LiteralSource: &kfdefsv1beta1.LiteralSource{
					Value: req.EndpointConfig.BasicAuth.Password,
				},
			},
		})
	} else {
		if req.EndpointConfig.IAP.OAuthClientId != "" && req.EndpointConfig.IAP.OAuthClientSecret != "" {
			pluginSpec.Auth = &gcp.Auth{
				IAP: &gcp.IAP{
					OAuthClientId: req.EndpointConfig.IAP.OAuthClientId,
					OAuthClientSecret: &kfdefsv1alpha1.SecretRef{
						Name: gcp.CLIENT_SECRET,
					},
				},
			}
			kfdef.SetSecret(kfdefsv1beta1.Secret{
				Name: gcp.CLIENT_SECRET,
				SecretSource: &kfdefsv1beta1.SecretSource{
					LiteralSource: &kfdefsv1beta1.LiteralSource{
						Value: req.EndpointConfig.IAP.OAuthClientSecret,
					},
				},
			})
		} else {
			log.Errorf("No valid EndpointConfig found in request body!")
			return nil, fmt.Errorf("No valid EndpointConfig found in request body!")
		}
	}
	if err := kfdef.SetPluginSpec(gcp.GcpPluginName, pluginSpec); err != nil {
		return nil, err
	}

	//kfconfigIns, err := configconverters.LoadConfigFromURI(req.ConfigFile, path.Join(DEFAULT_APPS_PATH, req.Name))
	//if err != nil {
	//	deployReqCounter.WithLabelValues("INTERNAL").Inc()
	//	log.Errorf("Failed to load config from URI to kfconfig: %v", err)
	//	return nil, err
	//}
	//kfconfigIns.Spec.ConfigFileName = filepath.Base(req.ConfigFile)
	//
	//// Fill in user input
	//kfconfigIns.Name = req.Name
	//kfconfigIns.Spec.Version = req.Version
	//kfconfigIns.Spec.Project = req.Project
	//kfconfigIns.Spec.Email = req.Email
	//kfconfigIns.Spec.Zone = req.Zone
	//kfconfigIns.Spec.SkipInitProject = true
	//
	//kfconfigIns.SetSecret(kfconfig.Secret{
	//	Name: gcp.GcpAccessTokenName,
	//	SecretSource: &kfconfig.SecretSource{
	//		LiteralSource: &kfconfig.LiteralSource{
	//			Value: req.Token,
	//		},
	//	},
	//})
	//
	//// Not passing a pointer interface is a common cause of deserialization problems
	//pluginSpec := &gcp.GcpPluginSpec{}
	//
	//err = kfconfigIns.GetPluginSpec(gcp.GcpPluginName, pluginSpec)
	//if err != nil {
	//	deployReqCounter.WithLabelValues("INTERNAL").Inc()
	//	log.Errorf("Failed to load GcpPluginSpec: %v", err)
	//	return nil, err
	//}
	//pluginSpec.Project = req.Project
	//pluginSpec.Zone = req.Zone
	//pluginSpec.Email = req.Email
	//pluginSpec.SkipInitProject = true
	//
	//if req.EndpointConfig.BasicAuth.Username != "" && req.EndpointConfig.BasicAuth.Password != "" {
	//	pluginSpec.Auth = &gcp.Auth{
	//		BasicAuth: &gcp.BasicAuth{
	//			Username: req.EndpointConfig.BasicAuth.Username,
	//			Password: &kfdefsv1alpha1.SecretRef{
	//				Name: gcp.BasicAuthPasswordSecretName,
	//			},
	//		},
	//	}
	//	kfconfigIns.SetSecret(kfconfig.Secret{
	//		Name: gcp.BasicAuthPasswordSecretName,
	//		SecretSource: &kfconfig.SecretSource{
	//			HashedSource: &kfconfig.HashedSource{
	//				HashedValue: req.EndpointConfig.BasicAuth.Password,
	//			},
	//		},
	//	})
	//} else {
	//	if req.EndpointConfig.IAP.OAuthClientId != "" && req.EndpointConfig.IAP.OAuthClientSecret != "" {
	//		pluginSpec.Auth = &gcp.Auth{
	//			IAP: &gcp.IAP{
	//				OAuthClientId: req.EndpointConfig.IAP.OAuthClientId,
	//				OAuthClientSecret: &kfdefsv1alpha1.SecretRef{
	//					Name: gcp.CLIENT_SECRET,
	//				},
	//			},
	//		}
	//		kfconfigIns.SetSecret(kfconfig.Secret{
	//			Name: gcp.CLIENT_SECRET,
	//			SecretSource: &kfconfig.SecretSource{
	//				LiteralSource: &kfconfig.LiteralSource{
	//					Value: req.EndpointConfig.IAP.OAuthClientSecret,
	//				},
	//			},
	//		})
	//	} else {
	//		log.Errorf("No valid EndpointConfig found in request body!")
	//		return nil, fmt.Errorf("No valid EndpointConfig found in request body!")
	//	}
	//}
	//if err := kfconfigIns.SetPluginSpec(gcp.GcpPluginName, pluginSpec); err != nil {
	//	return nil, err
	//}
	if !req.shareAnonymousUsage {
		kfdef.DeleteApplication("spartakus")
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
		resp, err = c.createEndpoint(ctx, *kfdef)
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
	response, ok := resp.(*kfdefsv1beta1.KfDef)

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
		latestKfConfig, err := c.GetLatestKfDef(*kfdef)
		if err != nil {
			return backoff.Permanent(err)
		}
		response = latestKfConfig
		if len(latestKfConfig.Status.Conditions) == 0 {
			return fmt.Errorf("deployment condition not available")
		} else {
			if response.Status.Conditions[0].Type == kfdefsv1beta1.Unhealthy {
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

func (c *KfctlClient) GetLatestKfDef(req kfdefsv1beta1.KfDef) (*kfdefsv1beta1.KfDef, error) {
	resp, err := c.getEndpoint(context.Background(), req)
	if err != nil {
		return nil, err
	}
	response, ok := resp.(*kfdefsv1beta1.KfDef)

	if ok {
		return response, nil
	}

	log.Info("Response is not type *kfconfig")
	resErr, ok := resp.(*httpError)

	if ok {
		return nil, resErr
	}

	log.Info("Response is not type *httpError")

	pRes, _ := Pformat(resp)
	log.Errorf("Received unexpected response; %v", pRes)
	return nil, fmt.Errorf("Received unexpected response; %v", pRes)
}

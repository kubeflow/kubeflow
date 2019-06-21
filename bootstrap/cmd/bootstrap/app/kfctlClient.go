package app

import (
	"context"
	"fmt"
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/ratelimit"
	httptransport "github.com/go-kit/kit/transport/http"
	"golang.org/x/time/rate"
	"net/url"
	"strings"
	"time"
)

// KfctlClient provides a client to the KfctlServer
type KfctlClient struct {
	createEndpoint endpoint.Endpoint
}

// NewKfctlClient returns a KfctlClient backed by an HTTP server living at the
// remote instance.
func NewKfctlClient(instance string) (KfctlService, error) {
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
			decodeHTTPCreateResponse,
		).Endpoint()
		createEndpoint = limiter(createEndpoint)
	}

	// Returning the endpoint.Set as a service.Service relies on the
	// endpoint.Set implementing the Service methods. That's just a simple bit
	// of glue code.
	return &KfctlClient{
		createEndpoint: createEndpoint,
	}, nil
}

// CreateDeployment issues a CreateDeployment to the requested backend
func (c *KfctlClient) CreateDeployment(ctx context.Context, req CreateRequest) (*CreateResponse, error) {
	resp, err := c.createEndpoint(ctx, req)
	if err != nil {
		return nil, err
	}
	response, ok := resp.(CreateResponse)

	if ok {
		return &response, nil
	}
	return nil, fmt.Errorf("Could not parse CreateResponse from response")
}

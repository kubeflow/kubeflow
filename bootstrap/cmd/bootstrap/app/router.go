package app

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	log "github.com/sirupsen/logrus"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	kubeclientset "k8s.io/client-go/kubernetes"
	"net/http"
)

// kfctlRouter implements the kfctl API but routes requests to stateful sets
// to handle them rather than handling them directly.
type kfctlRouter struct {
	k8sclient kubeclientset.Interface
}

// NewRouter returns a new router
func NewRouter(c kubeclientset.Interface) (*kfctlRouter, error) {
	return &kfctlRouter{
		k8sclient: c,
	}, nil
}

// KfctlService defines an interface for deploying Kubeflow using kfctl.
// TODO(jlewi): This will likely need to change or be replaced when we migrate to the new API.
// https://github.com/kubeflow/kubeflow/tree/master/bootstrap/api.
// Currently this is just a skeleton for implementing the router. Depending on how we stage that change this
// will likely need to change.
//
// https://github.com/kubeflow/kubeflow/pull/3045 is pending and contains changes to use kfctl
// to deploy from the backend.
type KfctlService interface {
	// CreateCreateDeployment creates a Kubeflow deployment
	CreateDeployment(context.Context, CreateRequest) error
}

// makeRouterCreateRequestEndpoint creates an endpoint to handle createdeployment requests in the router.
func makeRouterCreateRequestEndpoint(svc KfctlService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		err := svc.CreateDeployment(ctx, req)

		r := &basicServerResponse{}

		if err != nil {
			r.Err = err.Error()
		}

		return r, err
	}
}

// RegisterEndpoints creates the http endpoints for the router
func (r *kfctlRouter) RegisterEndpoints() {
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

	// TODO(jlewi): We probably want to fix the URL we are serving on.
	// There are a variety of changes in flight
	// 1. Migrating click to deploy to use kfctl logic
	// 2. Migrating to a new REST API for deployments
	// 3. This PR aimed at running the deployment in each pod.
	// Depending on how we stage these changes we might need to change these URLs.
	http.Handle("/kfctl/apps/v1alpha2/create", optionsHandler(createHandler))
}

// Apply runs apply on a ksonnet application.
func (r *kfctlRouter) CreateDeployment(ctx context.Context, req CreateRequest) error {
	// TODO(jlewi):
	// 1. Do IAM check
	// 2. Check if service exists by sending request
	// 3. If service doesn't exist create a service and statefulset

	// TODO(jlewi): The code below is just a skeleton. We will modify it in follow on
	// PRs to properly configure the service and create a statefulset based on the request.
	name := "test"
	namespace := "kfctl-test"
	svc := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			// TODO(jlewi): Set the name and namespace
			Name:      name,
			Namespace: namespace,
		},
		Spec: corev1.ServiceSpec{
			Type: "ClusterIP",
			// TODO(jlewi): Fix the selector
			Selector: map[string]string{"statefulset": name},
			Ports: []corev1.ServicePort{
				corev1.ServicePort{

					Name:       "http-" + name,
					Port:       int32(80),
					TargetPort: intstr.FromInt(80),
					Protocol:   "TCP",
				},
			},
		},
	}

	newService, err := r.k8sclient.CoreV1().Services(namespace).Create(svc)
	if err != nil && !k8serrors.IsAlreadyExists(err) {
		return fmt.Errorf("unable to create services: %v", err)
	}

	log.Infof("Result of create service: %+v", newService)
	// TODO(jlewi): Checking the K8s service exists on every request puts load on the Master.
	// Instead of doing that we should try assuming that the backend exists and if it doesn't then only then
	// create the req
	return err
}

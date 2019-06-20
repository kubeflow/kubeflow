package app

import (
	"context"
	"crypto/sha256"
	"encoding/base32"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/golang/protobuf/proto"
	log "github.com/sirupsen/logrus"
	apps "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	kubeclientset "k8s.io/client-go/kubernetes"
	"net/http"
	"net/url"
	"strings"
)

// kfctlRouter implements the kfctl API but routes requests to stateful sets
// to handle them rather than handling them directly.
type kfctlRouter struct {
	k8sclient kubeclientset.Interface

	// image is the docker image to use for the backend.
	image string

	// namespace is the namespace to launch the kfctl servers in
	namespace string
}

// NewRouter returns a new router
func NewRouter(c kubeclientset.Interface, image string, namespace string) (*kfctlRouter, error) {
	if c == nil {
		return nil, fmt.Errorf("K8s client can't be nil.")
	}
	if image == "" {
		return nil, fmt.Errorf("image must be the docker image to use for the kfctl backend pods")
	}

	if namespace == "" {
		return nil, fmt.Errorf("namespace must be the namespace to launch the kfctl backend pods")
	}
	return &kfctlRouter{
		k8sclient: c,
		image:     image,
		namespace: namespace,
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
	CreateDeployment(context.Context, CreateRequest) (*CreateResponse, error)
}

// makeRouterCreateRequestEndpoint creates an endpoint to handle createdeployment requests in the router.
func makeRouterCreateRequestEndpoint(svc KfctlService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		r, err := svc.CreateDeployment(ctx, req)

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

// decodeHTTPCreateResponse is a transport/http.DecodeResponseFunc that decodes a
// JSON-encoded CreateDeployment response from the HTTP response body. If the response has a
// non-200 status code, we will interpret that as an error and attempt to decode
// the specific error message from the response body. Primarily useful in a
// client.
func decodeHTTPCreateResponse(_ context.Context, r *http.Response) (interface{}, error) {
	if r.StatusCode != http.StatusOK {
		// Try to decode the error as an httpError
		h := httpError{}
		err := json.NewDecoder(r.Body).Decode(&h)
		if err == nil {
			return nil, &h
		}

		return nil, errors.New(r.Status)
	}
	var resp CreateResponse
	err := json.NewDecoder(r.Body).Decode(&resp)
	return resp, err
}

func copyURL(base *url.URL, path string) *url.URL {
	next := *base
	next.Path = path
	return &next
}

// k8sName returns the unique name for the K8s resources associated with the
// given kubeflow deployment. The name has to be unique per project.
func k8sName(name string, project string) (string, error) {
	// Project, name, and zone are required because they uniquely identify the resources
	// that will spawned to handle the request.
	if project == "" {
		return "", fmt.Errorf("project is required")
	}

	if name == "" {
		return "", fmt.Errorf("name is required")
	}

	h := sha256.New()
	h.Write([]byte(fmt.Sprintf("name=%s,project=%s", name, project)))

	// Using a base32 (5 bits) encoding gives us 51.2 characters
	id := base32.HexEncoding.WithPadding(base32.NoPadding).EncodeToString(h.Sum(nil))
	// DNS labels require lower case.
	id = strings.ToLower(id)
	// ref: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/identifiers.md
	// DNS labels have a max of 63 characters so we truncate the hash to the first 50 characters
	// DNS labels limits apply to names (e.g. service name) as well as label values.
	// The statefulset will add add a suffix matching regex "-[abcdef]{10}" of salt.
	// The prefix "kf-" takes 3 more characters.
	// So we can use at most
	//  63-3-11 = 49 characters for the hash
	name = fmt.Sprintf("kf-%s", id[0:45])

	return name, nil
}

// AppNameKey is the name of the label to use containing hte name of the kfctl app.
const AppNameKey = "app-name"

// CreateDeployment creates a Kubeflow deployment.
func (r *kfctlRouter) CreateDeployment(ctx context.Context, req CreateRequest) (*CreateResponse, error) {
	// TODO(jlewi):
	// 1. Do IAM check
	// 2. Check if service exists by sending request
	// 3. If service doesn't exist create a service and statefulset

	// TODO(jlewi): The code below is just a skeleton. We will modify it in follow on
	// PRs to properly configure the service and create a statefulset based on the request.
	name, err := k8sName(req.Name, req.Project)

	if err != nil {
		return nil, err
	}

	labels := map[string]string{
		"app":      "kfctl",
		AppNameKey: name,
	}

	targetPort := 8080

	svc := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: r.namespace,
			Labels:    labels,
		},
		Spec: corev1.ServiceSpec{
			Type: "ClusterIP",
			// TODO(jlewi): Fix the selector
			Selector: map[string]string{AppNameKey: labels[AppNameKey]},
			Ports: []corev1.ServicePort{
				corev1.ServicePort{

					Name:       "http-" + name,
					Port:       int32(80),
					TargetPort: intstr.FromInt(targetPort),
					Protocol:   "TCP",
				},
			},
		},
	}

	newService, err := r.k8sclient.CoreV1().Services(r.namespace).Create(svc)

	if err != nil && !k8serrors.IsAlreadyExists(err) {
		pService, _ := Pformat(svc)
		log.Errorf("unable to create service:%v\n\nerror:\n%+v", pService, err)
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	pService, _ := Pformat(newService)
	log.Infof("Result of create service: %+v", pService)

	// TODO(jlewi): Set reesource requests and limits.
	// TODO(jlewi): Set docker image
	backend := &apps.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: r.namespace,
			Labels:    labels,
		},
		Spec: apps.StatefulSetSpec{
			Replicas: proto.Int32(1),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					AppNameKey: labels[AppNameKey],
				},
			},

			ServiceName: name,
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: labels,
				},
				Spec: corev1.PodSpec{
					// We don't need a service account token so don't mount one.
					AutomountServiceAccountToken: proto.Bool(false),
					// TODO(jlewi): Avoid running as root.
					Containers: []corev1.Container{
						{
							Name: "kfctl",
							Command: []string{
								"/opt/kubeflow/bootstrapper",
								"--keep-alive=true",
								"--mode=kfctl",
								"--app-dir=/apps",
								"--registries-config-file=",
								"--in-cluster=true",
								fmt.Sprintf("--port=%v", targetPort),
							},
							Image: r.image,
							VolumeMounts: []corev1.VolumeMount{
								{
									Name:      "apps",
									MountPath: "/apps",
								},
							},
						},
					},
					Volumes: []corev1.Volume{
						{
							Name: "apps",
							VolumeSource: corev1.VolumeSource{
								EmptyDir: &corev1.EmptyDirVolumeSource{},
							},
						},
					},
				},
			},
		},
	}

	newBackend, err := r.k8sclient.AppsV1().StatefulSets(r.namespace).Create(backend)

	if err != nil && !k8serrors.IsAlreadyExists(err) {
		pbackend, _ := Pformat(backend)
		log.Errorf("unable to create statefulset:%v\n\nerror:\n%+v", pbackend, err)
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	pBackend, _ := Pformat(newBackend)

	log.Infof("Result of create statefulset: %+v", pBackend)

	address := fmt.Sprintf("http://%v.%v.svc.cluster.local:80", name, r.namespace)
	log.Infof("Creating client for %v", address)
	c, err := NewKfctlClient(address)

	if err != nil {
		log.Errorf("Error creating client; %v", err)
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	// TODO(jlewi): Add backoff.
	log.Infof("Calling CreateDeployment at %s", address)

	// TODO(jlewi): Set the timeout?
	res, err := c.CreateDeployment(ctx, req)
	log.Infof("CreateDeployment returned; response: %+v, error: %+v", c, err)
	return res, err
}

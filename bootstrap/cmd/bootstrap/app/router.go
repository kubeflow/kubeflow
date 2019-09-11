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
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	apps "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	kubeclientset "k8s.io/client-go/kubernetes"
	"net"
	"net/http"
	"net/url"
	"strings"
	"time"
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
	CreateDeployment(context.Context, kfdefs.KfDef) (*kfdefs.KfDef, error)
	// GetLatestKfdef returns latest KfDef copy which include deployment status
	GetLatestKfdef(kfdefs.KfDef) (*kfdefs.KfDef, error)
}

// makeRouterCreateRequestEndpoint creates an endpoint to handle createdeployment requests in the router.
func makeRouterCreateRequestEndpoint(svc KfctlService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(kfdefs.KfDef)
		if req.Spec.Project != "kubeflow-prober-deploy" {
			deployReqCounterRaw.Inc()
			deployReqCounterUser.Inc()
		}
		r, err := svc.CreateDeployment(ctx, req)
		return r, err
	}
}

func GetHealthzHandler() http.Handler {
	return httptransport.NewServer(
		makeHealthzEndpoint(),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			return nil, nil
		},
		encodeResponse,
	)
}

// RegisterEndpoints creates the http endpoints for the router
func (r *kfctlRouter) RegisterEndpoints() {
	createHandler := httptransport.NewServer(
		makeRouterCreateRequestEndpoint(r),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request kfdefs.KfDef
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				log.Info("Err decoding create request: " + err.Error())
				deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
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
	http.Handle("/", optionsHandler(GetHealthzHandler()))
}

// decodeHTTPKfdefResponse is a transport/http.DecodeResponseFunc that decodes a
// JSON-encoded KfDef response from the HTTP response body. If the response has a
// non-200 status code, we will interpret that as an error and attempt to decode
// the specific error message from the response body. Primarily useful in a
// client.
func decodeHTTPKfdefResponse(_ context.Context, r *http.Response) (interface{}, error) {
	if r.StatusCode != http.StatusOK {
		// Try to decode the error as an httpError
		h := httpError{}
		err := json.NewDecoder(r.Body).Decode(&h)
		if err == nil {
			return nil, &h
		}

		return nil, errors.New(r.Status)
	}
	var resp kfdefs.KfDef
	err := json.NewDecoder(r.Body).Decode(&resp)
	return &resp, err
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
		return "", &httpError{
			Message: fmt.Sprintf("project is required"),
			Code:    http.StatusBadRequest,
		}
	}

	if name == "" {
		return "", &httpError{
			Message: fmt.Sprintf("name is required"),
			Code:    http.StatusBadRequest,
		}
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

// authCheckAndExtractService: 1. check if request is owner of target project; 2. return service name that handle the request.
func (r *kfctlRouter) authCheckAndExtractService(req kfdefs.KfDef) (string, error) {
	token, err := req.GetSecret(gcp.GcpAccessTokenName)

	if err != nil {
		log.Errorf("Failed to get secret %v; error %v", gcp.GcpAccessTokenName, err)
		return "", &httpError{
			Message: fmt.Sprintf("Could not obtain an access token from secret %v", gcp.GcpAccessTokenName),
			Code:    http.StatusBadRequest,
		}
	}

	// Verify that user has access. We shouldn't do any processing until verifying access.
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})

	isValid, err := CheckProjectAccess(req.Spec.Project, ts)

	if err != nil {
		log.Errorf("CreateDeployment CheckProjectAccess failed; error %v", err)

		return "", &httpError{
			Message: fmt.Sprintf("There was a problem verifying access to project: %v; please try again later", req.Spec.Project),
			Code:    http.StatusUnauthorized,
		}
	}

	if !isValid {
		log.Errorf("CreateDeployment request isn't authorized for the project")
		return "", &httpError{
			Message: fmt.Sprintf("There was a problem verifying owner access to project: %v; please check the project id is correct and that you have admin priveleges", req.Spec.Project),
			Code:    http.StatusUnauthorized,
		}
	}

	log.Infof("User has sufficient access.")
	name, err := k8sName(req.Name, req.Spec.Project)

	if err != nil {
		log.Errorf("Could not generate the name; error %v", err)
		return "", err
	}
	return name, nil
}

// AppNameKey is the name of the label to use containing hte name of the kfctl app.
const AppNameKey = "app-name"

func (r *kfctlRouter) CreateKfctlServer(name string, currTime []byte) error {
	labels := map[string]string{
		"app":      "kfctl",
		AppNameKey: name,
	}

	targetPort := 8080

	// Create statefulset
	backend := &apps.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: r.namespace,
			Annotations: map[string]string{
				LastRequestTime: string(currTime),
			},
			Labels: labels,
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
							Ports: []corev1.ContainerPort{
								{
									ContainerPort: int32(targetPort),
								},
							},
							// Minimum resource for each pod.
							// TODO(kunming): verify through load test / memory pressure test
							Resources: corev1.ResourceRequirements{
								Requests: corev1.ResourceList{
									corev1.ResourceCPU:    resource.MustParse("2"),
									corev1.ResourceMemory: resource.MustParse("2Gi"),
								},
							},
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
	log.Infof("Create or update K8s statefulset")

	_, err := r.k8sclient.AppsV1().StatefulSets(r.namespace).Create(backend)

	if err != nil {
		pbackend, _ := Pformat(backend)
		log.Errorf("unable to create statefulset:%v\n\nerror:\n%+v", pbackend, err)
		return &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	// Create service
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

	log.Infof("Create K8s service")
	_, err = r.k8sclient.CoreV1().Services(r.namespace).Create(svc)

	if err != nil && !k8serrors.IsAlreadyExists(err) {
		pService, _ := Pformat(svc)
		log.Errorf("unable to create service:%v\n\nerror:\n%+v", pService, err)
		return &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}
	return nil
}

// CreateDeployment creates a Kubeflow deployment.
func (r *kfctlRouter) CreateDeployment(ctx context.Context, req kfdefs.KfDef) (*kfdefs.KfDef, error) {
	name, err := r.authCheckAndExtractService(req)
	if err != nil {
		deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
		log.Errorf("User doesn't pass permission check: %v", err)
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Permission error; please check login identity.",
		}
	}
	currTime, err := time.Now().MarshalText()
	if err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		log.Errorf("Cannot get current time; error %v", err)
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	// We check kube DNS record to see if target service / statefulset already exist in cluster
	_, err = net.LookupIP(fmt.Sprintf("%v.%v.svc.cluster.local", name, r.namespace))
	if err != nil {
		log.Infof("KfctlServer service could not be resolved: %v \n Try to create them", err)
		if err := r.CreateKfctlServer(name, currTime); err != nil {
			deployReqCounter.WithLabelValues("INTERNAL").Inc()
			return nil, &httpError{
				Code:    http.StatusServiceUnavailable,
				Message: "Unable to process your Kubeflow request; please try again later",
			}
		}
	} else {
		//	Update KfctlServer annotation
		// TODO(kunming): we should equeue this kube-API facing call and rate limit to avoid k8s master overload during traffic spikes
		currBackend, err := r.k8sclient.AppsV1().StatefulSets(r.namespace).Get(name, metav1.GetOptions{})
		if err != nil {
			deployReqCounter.WithLabelValues("INTERNAL").Inc()
			return nil, &httpError{
				Code:    http.StatusServiceUnavailable,
				Message: "Unable to process your Kubeflow request; please try again later",
			}
		}
		currBackend.Annotations[LastRequestTime] = string(currTime)
		_, err = r.k8sclient.AppsV1().StatefulSets(r.namespace).Update(currBackend)
		if err != nil {
			deployReqCounter.WithLabelValues("INTERNAL").Inc()
			return nil, &httpError{
				Code:    http.StatusServiceUnavailable,
				Message: "Unable to process your Kubeflow request; please try again later",
			}
		}
	}

	address := fmt.Sprintf("http://%v.%v.svc.cluster.local:80", name, r.namespace)
	log.Infof("Creating client for %v", address)
	c, err := NewKfctlClient(address)

	if err != nil {
		log.Errorf("Error creating client; %v", err)
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		return nil, &httpError{
			Code:    http.StatusServiceUnavailable,
			Message: "Unable to process your Kubeflow request; please try again later",
		}
	}

	log.Infof("Calling CreateDeployment at %s", address)

	// Continue request process in separate thread.
	go c.CreateDeployment(context.Background(), req)
	return &req, nil
}

// GetLatestKfdef returns latest kfdef status.
func (r *kfctlRouter) GetLatestKfdef(req kfdefs.KfDef) (*kfdefs.KfDef, error) {
	name, err := k8sName(req.Name, req.Spec.Project)
	if err != nil {
		log.Errorf("Could not generate the name; error %v", err)
		return nil, err
	}
	address := fmt.Sprintf("http://%v.%v.svc.cluster.local:80", name, r.namespace)
	log.Infof("Creating client for %v", address)
	c, err := NewKfctlClient(address)
	return c.GetLatestKfdef(req)
}

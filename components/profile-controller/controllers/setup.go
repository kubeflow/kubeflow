package controllers

import (
	"context"
	"os"

	"github.com/go-logr/logr"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"gopkg.in/yaml.v2"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
)

const (
	errListProfiles = "Failed to list profiles in order to trigger reconciliation"
)

type Manager interface {
	GetClient() client.Client
	GetScheme() *runtime.Scheme
	GetLogger() logr.Logger
}

type ProfileReconcilerOption func(r *ProfileReconciler)

func WithLogger(logger logr.Logger) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.Log = logger
	}
}

func WithUserIdHeader(header string) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.UserIdHeader = header
	}
}

func WithUserIdPrefix(pre string) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.UserIdPrefix = pre
	}
}

func WithWorkloadIdentity(wi string) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.WorkloadIdentity = wi
	}
}

func WithDefaultNamespaceLabelsPath(path string) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.DefaultNamespaceLabelsPath = path
	}
}

func WithLabelReaderFunc(f func(path string) (map[string]string, error)) ProfileReconcilerOption {
	return func(r *ProfileReconciler) {
		r.readLabelsFunc = f
	}
}

func NewProfileReconciler(mgr Manager, opts ...ProfileReconcilerOption) *ProfileReconciler {
	r := &ProfileReconciler{
		Client:           mgr.GetClient(),
		Scheme:           mgr.GetScheme(),
		Log:              mgr.GetLogger(),
		UserIdPrefix:     "",
		UserIdHeader:     "kubeflow-userid",
		WorkloadIdentity: "",
		readLabelsFunc: func(path string) (map[string]string, error) {
			var m map[string]string
			f, err := os.Open(path)
			if err != nil {
				return nil, err
			}
			return m, yaml.NewDecoder(f).Decode(&m)
		},
	}

	for _, f := range opts {
		f(r)
	}
	return r
}

func enqueueRequestsForProfiles(reader client.Reader, log logr.Logger) handler.EventHandler {
	return handler.EnqueueRequestsFromMapFunc(func(o client.Object) []ctrl.Request {
		proList := &profilev1.ProfileList{}
		if err := reader.List(context.TODO(), proList); err != nil {
			log.Error(err, errListProfiles)
			return nil
		}
		var reqs []ctrl.Request
		for _, item := range proList.Items {
			reqs = append(reqs, ctrl.Request{NamespacedName: client.ObjectKeyFromObject(&item)})
		}
		return reqs
	})
}

/*

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"
	"fmt"
	"os"
	"strings"

	v1alpha1 "github.com/kubeflow/kubeflow/components/notebook-controller/pkg/apis/notebook/v1alpha1"
	"github.com/kubeflow/kubeflow/components/notebook-controller/pkg/util"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	ctrl "sigs.k8s.io/controller-runtime"
	// "sigs.k8s.io/controller-runtime/pkg/client"
	// "sigs.k8s.io/controller-runtime/pkg/controller"
	// "sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	// "sigs.k8s.io/controller-runtime/pkg/event"
	// "sigs.k8s.io/controller-runtime/pkg/handler"
	// "sigs.k8s.io/controller-runtime/pkg/manager"
	// "sigs.k8s.io/controller-runtime/pkg/predicate"
	// "sigs.k8s.io/controller-runtime/pkg/reconcile"
	logf "sigs.k8s.io/controller-runtime/pkg/runtime/log"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

var log = logf.Log.WithName("notebook-controller")

const DefaultContainerPort = 8888
const DefaultServingPort = 80

// The default fsGroup of PodSecurityContext.
// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podsecuritycontext-v1-core
const DefaultFSGroup = int64(100)

// NotebookReconciler reconciles a Notebook object
type NotebookReconciler struct {
	client.Client
	Log logr.Logger
}

// +kubebuilder:rbac:groups==kubeflow.org,resources=notebooks,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=notebooks/status,verbs=get;update;patch

func (r *NotebookReconciler) Reconcile(req ctrl.Request) (ctrl.Result, error) {
	_ = context.Background()
	_ = r.Log.WithValues("notebook", req.NamespacedName)

	// your logic here

	return ctrl.Result{}, nil
}

func (r *NotebookReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&nbv1alpha1.Notebook{}).
		Complete(r)
}

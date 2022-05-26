/*
Copyright 2022.

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

package main

import (
	"flag"
	"os"

	// Import all Kubernetes client auth plugins (e.g. Azure, GCP, OIDC, etc.)
	// to ensure that exec-entrypoint and run can make use of them.
	_ "k8s.io/client-go/plugin/pkg/client/auth"

	istioSecurityClient "istio.io/client-go/pkg/apis/security/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/healthz"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	kubefloworgv1beta1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1beta1"
	"github.com/kubeflow/kubeflow/components/profile-controller/controllers"
	//+kubebuilder:scaffold:imports
)

const USERIDHEADER = "userid-header"
const USERIDPREFIX = "userid-prefix"
const WORKLOADIDENTITY = "workload-identity"
const DEFAULTNAMESPACELABELSPATH = "namespace-labels-path"

var (
	scheme   = runtime.NewScheme()
	setupLog = ctrl.Log.WithName("setup")
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))

	utilruntime.Must(profilev1.AddToScheme(scheme))
	utilruntime.Must(istioSecurityClient.AddToScheme(scheme))
	utilruntime.Must(kubefloworgv1beta1.AddToScheme(scheme))
	//+kubebuilder:scaffold:scheme
}

func main() {
	var metricsAddr, leaderElectionNamespace string
	var enableLeaderElection bool
	var probeAddr string
	var userIdHeader string
	var userIdPrefix string
	var workloadIdentity string
	var defaultNamespaceLabelsPath string
	flag.StringVar(&metricsAddr, "metrics-bind-address", ":8080", "The address the metric endpoint binds to.")
	flag.StringVar(&probeAddr, "health-probe-bind-address", ":9876", "The address the probe endpoint binds to.")
	flag.BoolVar(&enableLeaderElection, "leader-elect", false,
		"Enable leader election for controller manager. "+
			"Enabling this will ensure there is only one active controller manager.")
	flag.StringVar(&leaderElectionNamespace, "leader-election-namespace", "",
		"Determines the namespace in which the leader election configmap will be created.")
	flag.StringVar(&userIdHeader, USERIDHEADER, "x-goog-authenticated-user-email", "Key of request header containing user id")
	flag.StringVar(&userIdPrefix, USERIDPREFIX, "accounts.google.com:", "Request header user id common prefix")
	flag.StringVar(&workloadIdentity, WORKLOADIDENTITY, "", "Default identity (GCP service account) for workload_identity plugin")
	flag.StringVar(&defaultNamespaceLabelsPath, DEFAULTNAMESPACELABELSPATH, "/etc/profile-controller/namespace-labels.yaml", "A YAML file with a map of labels to be set on every Profile namespace")
	opts := zap.Options{
		Development: true,
	}
	opts.BindFlags(flag.CommandLine)
	flag.Parse()

	ctrl.SetLogger(zap.New(zap.UseFlagOptions(&opts)))

	mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
		Scheme:                 scheme,
		MetricsBindAddress:     metricsAddr,
		HealthProbeBindAddress: probeAddr,
		LeaderElection:         enableLeaderElection,
		LeaderElectionID:       "kubeflow-profile-controller",
	})
	if err != nil {
		setupLog.Error(err, "unable to start manager")
		os.Exit(1)
	}

	if err = (&controllers.ProfileReconciler{
		Client:                     mgr.GetClient(),
		Scheme:                     mgr.GetScheme(),
		Log:                        ctrl.Log.WithName("controllers").WithName("Profile"),
		UserIdHeader:               userIdHeader,
		UserIdPrefix:               userIdPrefix,
		WorkloadIdentity:           workloadIdentity,
		DefaultNamespaceLabelsPath: defaultNamespaceLabelsPath,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Profile")
		os.Exit(1)
	}
	//+kubebuilder:scaffold:builder

	if err := mgr.AddHealthzCheck("healthz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up health check")
		os.Exit(1)
	}
	if err := mgr.AddReadyzCheck("readyz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up ready check")
		os.Exit(1)
	}

	setupLog.Info("starting manager")
	if err := mgr.Start(ctrl.SetupSignalHandler()); err != nil {
		setupLog.Error(err, "problem running manager")
		os.Exit(1)
	}
}

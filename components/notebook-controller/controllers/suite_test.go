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
	"math/rand"
	"os"
	"path/filepath"
	"testing"
	"time"

	controllermetrics "github.com/kubeflow/kubeflow/components/notebook-controller/pkg/metrics"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/envtest"
	"sigs.k8s.io/controller-runtime/pkg/envtest/printer"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	beta1 "github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
	// +kubebuilder:scaffold:imports
)

// These tests use Ginkgo (BDD-style Go testing framework). Refer to
// http://onsi.github.io/ginkgo/ to learn more about Ginkgo.

var cfg *rest.Config
var k8sClient client.Client // You'll be using this client in your tests.
var testEnv *envtest.Environment

func init() {
	rand.Seed(time.Now().UnixNano())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyz")

func randStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func getEnvDefault(variable string, defaultVal string) string {
	envVar := os.Getenv(variable)
	if len(envVar) == 0 {
		return defaultVal
	}
	return envVar
}

// Cleaning the ENV
var _ = SynchronizedAfterSuite(func() {

}, func() {
	By("tearing down the test environment")
	err := testEnv.Stop()
	Expect(err).ToNot(HaveOccurred())
})

// Setting up the ENV. This will run once before all the tests.
var _ = SynchronizedBeforeSuite(func() []byte {
	logf.SetLogger(zap.LoggerTo(GinkgoWriter, true))

	By("bootstrapping test environment")
	var existingCluster bool
	// TEST_USE_EXISTING_CLUSTER determines whether to use an existing cluster
	// instead of standing up control plane with just API server.
	// None of the controllers will run as part of this.
	if getEnvDefault("TEST_USE_EXISTING_CLUSTER", "false") == "true" {
		existingCluster = true
		testEnv = &envtest.Environment{
			CRDDirectoryPaths:  []string{filepath.Join("..", "config", "crd", "bases")},
			UseExistingCluster: &existingCluster,
		}
	} else {
		existingCluster = false
		testEnv = &envtest.Environment{
			CRDDirectoryPaths:  []string{filepath.Join("..", "config", "crd", "bases")},
			UseExistingCluster: &existingCluster,
		}
	}

	var err error
	cfg, err = testEnv.Start()
	Expect(err).ToNot(HaveOccurred())
	Expect(cfg).ToNot(BeNil())

	err = beta1.AddToScheme(scheme.Scheme)
	Expect(err).NotTo(HaveOccurred())

	// +kubebuilder:scaffold:scheme

	k8sClient, err = client.New(cfg, client.Options{Scheme: scheme.Scheme})
	Expect(err).ToNot(HaveOccurred())
	Expect(k8sClient).ToNot(BeNil())

	k8sManager, err := ctrl.NewManager(cfg, ctrl.Options{
		Scheme: scheme.Scheme,
	})
	Expect(err).ToNot(HaveOccurred())

	err = (&NotebookReconciler{
		Client:        k8sManager.GetClient(),
		Log:           ctrl.Log.WithName("controllers").WithName("notebook-controller"),
		Scheme:        k8sManager.GetScheme(),
		Metrics:       controllermetrics.NewMetrics(k8sManager.GetClient()),
		EventRecorder: k8sManager.GetEventRecorderFor("notebook-controller"),
	}).SetupWithManager(k8sManager)
	Expect(err).ToNot(HaveOccurred())

	go func() {
		err = k8sManager.Start(ctrl.SetupSignalHandler())
		Expect(err).ToNot(HaveOccurred())
	}()

	k8sClient = k8sManager.GetClient()
	Expect(k8sClient).ToNot(BeNil())

	return nil
}, func(data []byte) {
})

func TestAPIs(t *testing.T) {
	RegisterFailHandler(Fail)

	RunSpecsWithDefaultAndCustomReporters(t,
		"Controller Suite",
		[]Reporter{printer.NewlineReporter{}})
}

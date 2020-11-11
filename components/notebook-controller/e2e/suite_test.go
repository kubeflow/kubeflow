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

package e2e

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"testing"
	"time"

	"github.com/kubeflow/kubeflow/components/notebook-controller/controllers"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"

	controllermetrics "github.com/kubeflow/kubeflow/components/notebook-controller/pkg/metrics"

	nbv1beta1 "github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	apiextensionsv1beta1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/envtest"
	"sigs.k8s.io/controller-runtime/pkg/envtest/printer"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"
	// +kubebuilder:scaffold:imports
)

// These tests use Ginkgo (BDD-style Go testing framework). Refer to
// http://onsi.github.io/ginkgo/ to learn more about Ginkgo.

const (
	K8S_DOCKER_IMAGE          = "K8S_DOCKER_IMAGE"
	TEST_USE_EXISTING_CLUSTER = "TEST_USE_EXISTING_CLUSTER"
	DOCKER_IMAGE              = "docker.io/rancher/k3s:v1.16.14-k3s1" // image used for spinning k8s cluster.
	TEST_IMAGE                = "TEST_IMAGE"
)

var (
	crdscheme          = scheme.Scheme
	letterRunes        = []rune("abcdefghijklmnopqrstuvwxyz") // for generating random names for tests.
	useExistingCluster bool                                   // flag for using an existing cluster for testing.
	cfg                *rest.Config
	k8sClient          client.Client // You'll be using this client in your tests.
	testEnv            *envtest.Environment
	clusterName        string                                           // cluster that was dynamically created.
	crds               []*apiextensionsv1beta1.CustomResourceDefinition // crds installed into the cluster.
	k8sDockerImage     string
)

func init() {
	rand.Seed(time.Now().UnixNano())
	useExistingCluster = getEnvDefault(TEST_USE_EXISTING_CLUSTER, "false") == "true"
	k8sDockerImage = getEnvDefault(K8S_DOCKER_IMAGE, DOCKER_IMAGE)
	_ = apiextensionsv1beta1.AddToScheme(scheme.Scheme)
}

// randStringRunes is used for generating random string.
func randStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

// getEnvDefault returns the ENV variable or the default value.
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
	if !useExistingCluster {
		By("Tearing down the test k8s cluster created by the test.")
		Expect(deleteK3DCluster(clusterName)).Should(BeNil())
	} else {
		By("Deleting the deployed CRD's in the existing cluster.")
		// Deleting CRD's that were deployed as part of the test.
		for _, crd := range runtimeCRDListToUnstructured(crds) {
			// Delete only if CRD exists.
			crdObjectKey := client.ObjectKey{
				Name: crd.GetName(),
			}
			var placeholder v1beta1.CustomResourceDefinition
			err := k8sClient.Get(context.TODO(), crdObjectKey, &placeholder)
			if err != nil && apierrors.IsNotFound(err) {
				continue
			}
			Expect(err).NotTo(HaveOccurred())
			Expect(k8sClient.Delete(context.TODO(), crd)).To(Succeed())
			Eventually(func() bool {
				err := k8sClient.Get(context.TODO(), crdObjectKey, &placeholder)
				return apierrors.IsNotFound(err)
			}, 1*time.Second).Should(BeTrue())
		}
	}
})

// Setting up the ENV. This will run once before all the tests.
var _ = SynchronizedBeforeSuite(func() []byte {
	logf.SetLogger(zap.LoggerTo(GinkgoWriter, true))
	By("Creating a k8s cluster.")
	if !useExistingCluster {
		err := bootstrapk8sCluster()
		Expect(err).NotTo(HaveOccurred())
	}
	existingCluster := true
	testEnv = &envtest.Environment{UseExistingCluster: &existingCluster}
	var err error
	cfg, err = testEnv.Start()
	Expect(err).ToNot(HaveOccurred())
	Expect(cfg).ToNot(BeNil())

	// Installing CRD's
	crds, err = envtest.InstallCRDs(cfg,
		envtest.CRDInstallOptions{ErrorIfPathMissing: false,
			Paths: []string{filepath.Join("..", "config", "crd", "bases")}})
	Expect(err).NotTo(HaveOccurred())
	Expect(crds).NotTo(BeNil())
	Expect(len(crds)).NotTo(BeZero())

	err = nbv1beta1.AddToScheme(scheme.Scheme)
	Expect(err).NotTo(HaveOccurred())

	// +kubebuilder:scaffold:scheme

	k8sClient, err = client.New(cfg, client.Options{Scheme: scheme.Scheme})
	Expect(err).ToNot(HaveOccurred())
	Expect(k8sClient).ToNot(BeNil())

	k8sManager, err := ctrl.NewManager(cfg, ctrl.Options{
		Scheme: scheme.Scheme,
	})
	Expect(err).ToNot(HaveOccurred())

	err = (&controllers.NotebookReconciler{
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

// bootstrapk8sCluster creates a k3d cluster with a random name. Loads the docker image into the cluster.
// The docker image name retrieved from the ENV variable TEST_IMAGE.
func bootstrapk8sCluster() error {
	clusterName = fmt.Sprintf("e2e-notebook-kf-cluster-%s", randStringRunes(6))

	cmd := exec.Command("k3d", "cluster", "create", clusterName, "-i", DOCKER_IMAGE,
		"--no-lb", "--wait", "--timeout", "5m",
		"--update-default-kubeconfig=false")
	cmd.Stderr, cmd.Stdout = os.Stderr, os.Stdout
	err := cmd.Run()
	if err != nil {
		return err
	}

	cmd = exec.Command("k3d", "kubeconfig", "write", clusterName)
	err = cmd.Run()
	if err != nil {
		return err
	}

	kubeconfigPath := path.Join(os.Getenv("HOME"), fmt.Sprintf(".k3d/kubeconfig-%s.yaml", clusterName))
	os.Setenv("KUBECONFIG", kubeconfigPath)
	imageName := os.Getenv(TEST_IMAGE)
	fmt.Println(imageName)
	cmd = exec.Command("k3d", "image", "import", "-c", clusterName, imageName)
	cmd.Stderr, cmd.Stdout = os.Stderr, os.Stdout
	return cmd.Run()
}

// deleteK3DCluster deletes the dynamically created k3d cluster.
func deleteK3DCluster(clusterName string) error {
	return exec.Command("k3d", "cluster", "delete", clusterName).Run()
}

func runtimeCRDListToUnstructured(l []*apiextensionsv1beta1.CustomResourceDefinition) []*unstructured.Unstructured {
	res := []*unstructured.Unstructured{}
	for _, obj := range l {
		u := &unstructured.Unstructured{}
		if err := crdscheme.Convert(obj, u, nil); err != nil {
			fmt.Println(err, "error converting to unstructured object", "object-kind", obj.GetObjectKind())
			continue
		}
		res = append(res, u)
	}
	fmt.Println(len(res))
	return res
}

func TestAPIs(t *testing.T) {
	RegisterFailHandler(Fail)

	RunSpecsWithDefaultAndCustomReporters(t,
		"Controller Suite",
		[]Reporter{printer.NewlineReporter{}})
}

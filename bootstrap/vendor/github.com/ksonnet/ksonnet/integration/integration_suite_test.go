// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

// +build integration

package integration

import (
	"flag"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path"
	"testing"

	"github.com/ksonnet/ksonnet/metadata/app"

	"k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/apimachinery/registered"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	corev1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	// For client auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth"
)

var kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
var ksonnetBin = flag.String("ksonnet-bin", "ks", "path to ksonnet executable under test")
var ksonnetData = flag.String("fixtures", "integration/fixtures", "path to ksonnet test data")

func init() {
	registrationManager, err := registered.NewAPIRegistrationManager("")
	if err != nil {
		panic(err.Error())
	}
	if missingVersions := registrationManager.ValidateEnvRequestedVersions(); len(missingVersions) != 0 {
		panic(fmt.Sprintf("KUBE_API_VERSIONS contains versions that are not installed: %q.", missingVersions))
	}
}

func clusterConfigOrDie() *rest.Config {
	var config *rest.Config
	var err error

	if *kubeconfig != "" {
		config, err = clientcmd.BuildConfigFromFlags("", *kubeconfig)
	} else {
		config, err = rest.InClusterConfig()
	}
	if err != nil {
		panic(err.Error())
	}

	return config
}

func createNsOrDie(c corev1.CoreV1Interface, ns string) string {
	result, err := c.Namespaces().Create(
		&v1.Namespace{
			ObjectMeta: metav1.ObjectMeta{
				GenerateName: ns,
			},
		})
	if err != nil {
		panic(err.Error())
	}
	name := result.GetName()
	fmt.Fprintf(GinkgoWriter, "Created namespace %s\n", name)
	return name
}

func deleteNsOrDie(c corev1.CoreV1Interface, ns string) {
	err := c.Namespaces().Delete(ns, &metav1.DeleteOptions{})
	if err != nil {
		panic(err.Error())
	}
}

func containsString(haystack []string, needle string) bool {
	for _, s := range haystack {
		if s == needle {
			return true
		}
	}
	return false
}

func runKsonnetWith(flags []string, host, ns string) error {
	spec := app.Spec{
		Version:    "0.0.1",
		APIVersion: "0.1.0",
		Environments: app.EnvironmentSpecs{
			"default": &app.EnvironmentSpec{
				Destination: &app.EnvironmentDestinationSpec{
					Namespace: ns,
					Server:    host,
				},
				KubernetesVersion: "v1.7.0",
			},
		},
	}

	appSpecPath := path.Join(*ksonnetData, "sampleapp/app.yaml")
	specFile, err := os.Create(appSpecPath)
	if err != nil {
		return err
	}
	data, err := spec.Marshal()
	if err != nil {
		return err
	}
	specFile.Write(data)
	if err := specFile.Close(); err != nil {
		return err
	}
	defer os.Remove(appSpecPath)

	args := []string{}
	if *kubeconfig != "" && !containsString(flags, "--kubeconfig") {
		args = append(args, "--kubeconfig", *kubeconfig)
	}
	args = append(args, flags...)

	fmt.Fprintf(GinkgoWriter, "Running %q %q\n", *ksonnetBin, args)
	cmd := exec.Command(*ksonnetBin, args...)
	cmd.Dir = path.Join(*ksonnetData, "sampleapp")
	cmd.Stdout = GinkgoWriter
	cmd.Stderr = GinkgoWriter

	if err := cmd.Run(); err != nil {
		return err
	}

	return nil
}

func encodeTo(w io.Writer, enc runtime.Encoder, objs []runtime.Object) error {
	for _, o := range objs {
		buf, err := runtime.Encode(enc, o)
		if err != nil {
			return err
		}
		fmt.Fprintf(w, "---\n")
		_, err = w.Write(buf)
		if err != nil {
			return err
		}
	}
	return nil
}

func TestE2e(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "ksonnet integration tests")
}

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
	"io/ioutil"
	"os"
	"os/exec"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	corev1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	clientcmdlatest "k8s.io/client-go/tools/clientcmd/api/latest"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("flags", func() {
	var c corev1.CoreV1Interface
	var ns string
	var host string
	var args []string
	var kubecfgExit *exec.ExitError

	BeforeEach(func() {
		config := clusterConfigOrDie()
		c = corev1.NewForConfigOrDie(config)
		host = config.Host
		ns = createNsOrDie(c, "kubeflags")
		args = []string{"apply", "default", "-v"}
	})
	AfterEach(func() {
		deleteNsOrDie(c, ns)
	})

	Describe("with custom kubeconfig", func() {
		var config *clientcmdapi.Config
		var kubeconfigFile string

		BeforeEach(func() {
			// Initialise config with our --kubeconfig
			clientConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
				&clientcmd.ClientConfigLoadingRules{ExplicitPath: *kubeconfig},
				&clientcmd.ConfigOverrides{})
			rawconf, err := clientConfig.RawConfig()
			Expect(err).NotTo(HaveOccurred())
			tmp, err := clientcmdlatest.Scheme.Copy(&rawconf)
			Expect(err).NotTo(HaveOccurred())
			config = tmp.(*clientcmdapi.Config)
		})

		JustBeforeEach(func() {
			f, err := ioutil.TempFile("", "kubeconfig")
			Expect(err).NotTo(HaveOccurred())

			buf, err := runtime.Encode(clientcmdlatest.Codec, config)
			Expect(err).NotTo(HaveOccurred())

			_, err = f.Write(buf)
			Expect(err).NotTo(HaveOccurred())

			err = f.Close()
			Expect(err).NotTo(HaveOccurred())

			kubeconfigFile = f.Name()
			args = append(args, "--kubeconfig", kubeconfigFile)
		})
		AfterEach(func() {
			os.Remove(kubeconfigFile)
		})

		JustBeforeEach(func() {
			kubecfgExit = nil
			err := runKsonnetWith(args, host, ns)
			if err != nil {
				Expect(err).To(BeAssignableToTypeOf(&exec.ExitError{}))
				kubecfgExit = err.(*exec.ExitError)
			}
		})

		Context("with explicit namespace in config", func() {
			BeforeEach(func() {
				config.Contexts[config.CurrentContext].Namespace = ns
			})

			It("should update correct namespace", func() {
				Expect(kubecfgExit).NotTo(HaveOccurred())
				Expect(c.Services(ns).List(metav1.ListOptions{})).
					NotTo(BeNil())
			})
		})

		Describe("with explicit --namespace", func() {
			BeforeEach(func() {
				// Test for https://github.com/kubernetes/client-go/issues/288
				config.Contexts[config.CurrentContext].Namespace = "bogusNamespace"

				args = append(args, "--namespace", ns)
			})

			It("should update correct namespace", func() {
				Expect(kubecfgExit).NotTo(HaveOccurred())
				Expect(c.Services(ns).List(metav1.ListOptions{})).
					NotTo(BeNil())
			})
		})
	})
})

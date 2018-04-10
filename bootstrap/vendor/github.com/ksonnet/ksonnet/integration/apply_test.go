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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	corev1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/api/core/v1"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func cmData(cm *v1.ConfigMap) map[string]string {
	return cm.Data
}

var _ = Describe("apply", func() {
	var c corev1.CoreV1Interface
	var host string
	var ns string
	const cmName = "testcm"

	BeforeEach(func() {
		config := clusterConfigOrDie()
		host = config.Host
		c = corev1.NewForConfigOrDie(config)
		ns = createNsOrDie(c, "apply")
	})
	AfterEach(func() {
		deleteNsOrDie(c, ns)
	})

	Describe("A simple apply", func() {
		var cm *v1.ConfigMap
		JustBeforeEach(func() {
			err := runKsonnetWith([]string{"apply", "default", "-v"}, host, ns)
			Expect(err).NotTo(HaveOccurred())
		})

		Context("With no existing state", func() {
			It("should produce expected object", func() {
				Expect(c.Services(ns).Get("guestbook-ui", metav1.GetOptions{})).
					NotTo(BeNil())
			})
		})

		Context("With existing object", func() {
			BeforeEach(func() {
				cm = &v1.ConfigMap{
					ObjectMeta: metav1.ObjectMeta{Name: cmName},
					Data:       map[string]string{"foo": "bar"},
				}

				_, err := c.ConfigMaps(ns).Create(cm)
				Expect(err).To(Not(HaveOccurred()))
			})

			It("should succeed", func() {
				Expect(c.Services(ns).Get("guestbook-ui", metav1.GetOptions{})).
					NotTo(BeNil())
			})
		})
	})

	Describe("An apply with mixed namespaces", func() {
		var ns2 string
		BeforeEach(func() {
			ns2 = createNsOrDie(c, "apply")
		})
		AfterEach(func() {
			deleteNsOrDie(c, ns2)
		})

		JustBeforeEach(func() {
			err := runKsonnetWith([]string{"apply", "default", "-v", "-n", ns2}, host, ns)
			Expect(err).NotTo(HaveOccurred())
		})

		It("should create objects in the correct namespaces", func() {
			Expect(c.Services(ns2).Get("guestbook-ui", metav1.GetOptions{})).
				NotTo(BeNil())
		})
	})
})

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
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/api/core/v1"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func objNames(list *v1.ConfigMapList) []string {
	ret := make([]string, 0, len(list.Items))
	for _, obj := range list.Items {
		ret = append(ret, obj.GetName())
	}
	return ret
}

var _ = Describe("delete", func() {
	var c corev1.CoreV1Interface
	var ns string
	var host string

	BeforeEach(func() {
		config := clusterConfigOrDie()
		c = corev1.NewForConfigOrDie(config)
		host = config.Host
		ns = createNsOrDie(c, "delete")
	})
	AfterEach(func() {
		deleteNsOrDie(c, ns)
	})

	Describe("Simple delete", func() {
		JustBeforeEach(func() {
			err := runKsonnetWith([]string{"delete", "default", "-v"}, host, ns)
			Expect(err).NotTo(HaveOccurred())
		})

		Context("With no existing state", func() {
			It("should succeed", func() {
				Expect(c.ConfigMaps(ns).List(metav1.ListOptions{})).
					To(WithTransform(objNames, BeEmpty()))
			})
		})

		Context("With existing objects", func() {
			BeforeEach(func() {
				objs := []runtime.Object{
					&v1.ConfigMap{
						ObjectMeta: metav1.ObjectMeta{Name: "foo"},
					},
					&v1.ConfigMap{
						ObjectMeta: metav1.ObjectMeta{Name: "bar"},
					},
				}

				toCreate := []*v1.ConfigMap{}
				for _, cm := range objs {
					toCreate = append(toCreate, cm.(*v1.ConfigMap))
				}

				for _, cm := range toCreate {
					_, err := c.ConfigMaps(ns).Create(cm)
					Expect(err).To(Not(HaveOccurred()))
				}
			})

			It("should only delete objects in the targeted env", func() {
				Expect(c.ConfigMaps(ns).List(metav1.ListOptions{})).
					NotTo(WithTransform(objNames, BeEmpty()))
			})
		})
	})
})

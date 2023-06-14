package controllers

import (
	"fmt"
	"os"
	"path/filepath"

	// "strconv"

	kubefloworgv1alpha1 "github.com/kubeflow/kubeflow/components/pvc-viewer/api/v1alpha1"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/util/intstr"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

var (
	// We're using these variables to keep track of the test-# and create a unique namespace for each test
	testCount  = 0
	testHelper *TestHelper
)

// +kubebuilder:docs-gen:collapse=Imports

var _ = Describe("PVCViewer controller", func() {

	// BeforeEach provides a clean namespace for each test
	BeforeEach(func() {
		// Each test should run in isolation. Using Namespaces is a good way to do this.
		// However, while EnvTest supports creating namespaces, it can't tear them down.
		// It is recommended to simply use a different namespace for each test.
		// See: https://book.kubebuilder.io/reference/envtest.html#namespace-usage-limitation
		testCount++
		testHelper = &TestHelper{
			namespace: "test-" + fmt.Sprint(testCount),
			ctx:       ctx,
			k8sClient: k8sClient,
		}

		ns := &corev1.Namespace{
			ObjectMeta: metav1.ObjectMeta{
				Name: testHelper.namespace,
			},
		}
		Expect(k8sClient.Create(ctx, ns)).Should(Succeed())
	})

	AfterEach(func() {
		// Delete objects in test namespace
		// Lets tests run deterministically, speeds them up and increases debugability
		objectsToDelete := []client.Object{
			&kubefloworgv1alpha1.PVCViewer{},
			&appsv1.Deployment{},
			&corev1.Service{},
			&corev1.Pod{},
			virtualServiceTemplate.DeepCopy(),
		}
		for _, object := range objectsToDelete {
			Expect(k8sClient.DeleteAllOf(ctx, object, client.InNamespace(testHelper.namespace))).Should(Succeed())
		}
	})

	// Test the validation and defaulting webhooks
	Context("Defaulting and Validating Webhooks", func() {
		It("Should create a PodSpec", func() {
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})

			Expect(pvcViewer.Spec.PodSpec).ShouldNot(BeNil())
			Expect(pvcViewer.Spec.PodSpec.Containers).Should(HaveLen(1))
			Expect(pvcViewer.Spec.PodSpec.Containers[0].Image).ShouldNot(HaveLen(0))

			Expect(pvcViewer.Spec.PodSpec.Volumes).Should(HaveLen(1))
			Expect(pvcViewer.Spec.PodSpec.Volumes[0].PersistentVolumeClaim.ClaimName).Should(Equal("test-pvc"))
		})

		It("Should use defaults if environment variable is set", func() {
			filePath, _ := filepath.Abs("testdata/podspec_default.yaml")
			os.Setenv(kubefloworgv1alpha1.DefaultPodSpecPathEnvName, filePath)
			defer os.Unsetenv(kubefloworgv1alpha1.DefaultPodSpecPathEnvName)

			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})

			Expect(pvcViewer.Spec.PodSpec).ShouldNot(BeNil())
			Expect(pvcViewer.Spec.PodSpec.Containers).Should(HaveLen(1))
			Expect(pvcViewer.Spec.PodSpec.Containers[0].Name).Should(Equal("test"))
			Expect(pvcViewer.Spec.PodSpec.SecurityContext).ShouldNot(BeNil())
			Expect(*pvcViewer.Spec.PodSpec.SecurityContext.RunAsUser).Should(Equal(int64(1234)))
		})

		It("The spec.PVC must be specified", func() {
			pvcViewer := &kubefloworgv1alpha1.PVCViewer{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "test-pvcviewer",
					Namespace: testHelper.namespace,
				},
				Spec: kubefloworgv1alpha1.PVCViewerSpec{
					PVC: "",
				},
			}
			err := k8sClient.Create(ctx, pvcViewer)
			Expect(err).Should(HaveOccurred())
			Expect(err.Error()).Should(ContainSubstring("denied the request: PVC name must be specified"))
		})

		It("Not using the spec.PVC in podSpec.volumes is forbidden", func() {
			pvcViewer := &kubefloworgv1alpha1.PVCViewer{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "test-pvcviewer",
					Namespace: testHelper.namespace,
				},
				Spec: kubefloworgv1alpha1.PVCViewerSpec{
					PVC: "test-pvc",
					PodSpec: corev1.PodSpec{
						Containers: []corev1.Container{
							{
								Name:  "test",
								Image: "test",
							},
						},
						Volumes: []corev1.Volume{},
					},
				},
			}
			err := k8sClient.Create(ctx, pvcViewer)
			Expect(err).Should(HaveOccurred())
			Expect(err.Error()).Should(ContainSubstring("denied the request: PVC test-pvc must be used in the podSpec"))
		})
	})

	// Test simple CRUD operations, i.e. the creation and update of deployments, services, virtualservices, etc.
	Context("When PVCViewer created", func() {

		It("Should CRUD Deployment", func() {
			By("By creating a viewer")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})

			deployment := &appsv1.Deployment{}
			Eventually(func() error {
				return testHelper.GetRelatedResource(pvcViewer, deployment)
			}, timeout, interval).Should(Succeed())
			Expect(deployment).ShouldNot(BeNil())
			Expect(deployment.Spec.Template.Spec.Containers).Should(HaveLen(1))
			Expect(deployment.Spec.Template.Spec.Containers[0].Image).Should(Equal(pvcViewer.Spec.PodSpec.Containers[0].Image))
			Expect(deployment.ObjectMeta.Labels).Should(And(
				HaveKeyWithValue(nameLabelKey, pvcViewer.Name),
				HaveKeyWithValue(instanceLabelKey, resourcePrefix+pvcViewer.Name),
				HaveKeyWithValue(partOfLabelKey, partOfLabelValue)))

			By("Updating the PVCViewer")
			newImageName := "sometestimage:123"
			newContainerName := "test-container"
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return err
				}
				viewer.Spec.PodSpec.Containers[0].Image = newImageName
				viewer.Spec.PodSpec.Containers = append(viewer.Spec.PodSpec.Containers,
					corev1.Container{
						Name:  newContainerName,
						Image: newImageName,
					})
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (int, error) {
				if err := testHelper.GetRelatedResource(pvcViewer, deployment); err != nil {
					return -1, err
				}
				return len(deployment.Spec.Template.Spec.Containers), nil
			}, timeout, interval).Should(Equal(2))
			Expect(deployment.Spec.Template.Spec.Containers[0].Image).Should(Equal(newImageName))
			Expect(deployment.Spec.Template.Spec.Containers[1].Name).Should(Equal(newContainerName))
			Expect(deployment.Spec.Template.Spec.Containers[1].Image).Should(Equal(newImageName))

			By("Deleting the PVCViewer")
			testHelper.ExpectMatchingOwnerReferences(pvcViewer, deployment.ObjectMeta.OwnerReferences)
		})

		It("Should CRUD Services", func() {
			By("Creating an empty Viewer, a service should not exist")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})
			service := &corev1.Service{}
			Consistently(func() error {
				return testHelper.GetRelatedResource(pvcViewer, service)
			}, duration, interval).ShouldNot(Succeed())

			By("Adding a Service to the PVCViewer")
			targetPort := 1234
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return err
				}
				viewer.Spec.Networking = kubefloworgv1alpha1.Networking{
					TargetPort: intstr.IntOrString{IntVal: int32(targetPort)},
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() error {
				return testHelper.GetRelatedResource(pvcViewer, service)
			}, timeout, interval).Should(Succeed())
			Expect(service).ShouldNot(BeNil())
			Expect(service.Spec.Ports).Should(HaveLen(1))
			Expect(service.Spec.Ports[0].Name).Should(Equal("http"))
			Expect(service.Spec.Ports[0].Port).Should(Equal(servicePort))
			Expect(service.Spec.Ports[0].TargetPort).Should(Equal(intstr.IntOrString{IntVal: int32(targetPort)}))
			Expect(service.ObjectMeta.Labels).Should(And(
				HaveKeyWithValue(nameLabelKey, pvcViewer.Name),
				HaveKeyWithValue(instanceLabelKey, resourcePrefix+pvcViewer.Name),
				HaveKeyWithValue(partOfLabelKey, partOfLabelValue)))

			By("Updating the Service in the PVCViewer")
			newTargetPort := 5678
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return err
				}
				viewer.Spec.Networking.TargetPort = intstr.IntOrString{IntVal: int32(newTargetPort)}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (bool, error) {
				if err := testHelper.GetRelatedResource(pvcViewer, service); err != nil {
					return false, err
				}
				return service.Spec.Ports[0].TargetPort == intstr.IntOrString{IntVal: int32(newTargetPort)}, nil
			}, timeout, interval).Should(BeTrue())

			By("Deleting the PVCViewer")
			testHelper.ExpectMatchingOwnerReferences(pvcViewer, service.ObjectMeta.OwnerReferences)
		})

		It("Should CRUD VirtualService", func() {
			By("Creating a default viewer, a VirtualService should not exist")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})
			virtualService := &unstructured.Unstructured{
				Object: map[string]interface{}{
					"apiVersion": "networking.istio.io/v1alpha3",
					"kind":       "VirtualService",
				},
			}
			Consistently(func() error {
				return testHelper.GetRelatedResource(pvcViewer, virtualService)
			}, duration, interval).ShouldNot(Succeed())

			By("Adding a minimal VirtualService")
			basePrefix := "/base"
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return err
				}
				viewer.Spec.Networking = kubefloworgv1alpha1.Networking{
					TargetPort: intstr.IntOrString{IntVal: 80},
					BasePrefix: basePrefix,
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() error {
				return testHelper.GetRelatedResource(pvcViewer, virtualService)
			}, timeout, interval).Should(Succeed())
			Expect(virtualService.Object["metadata"].(map[string]interface{})["labels"]).Should(And(
				HaveKeyWithValue(nameLabelKey, pvcViewer.Name),
				HaveKeyWithValue(instanceLabelKey, resourcePrefix+pvcViewer.Name),
				HaveKeyWithValue(partOfLabelKey, partOfLabelValue)))
			http := virtualService.Object["spec"].(map[string]interface{})["http"]
			Expect(http).Should(HaveLen(1))
			http0 := http.([]interface{})[0].(map[string]interface{})
			Expect(http0["timeout"]).Should(BeNil())
			expectedRewrite := fmt.Sprintf("%s/%s/%s/", basePrefix, testHelper.namespace, pvcViewer.Name)
			Expect(http0["match"].([]interface{})[0].(map[string]interface{})["uri"].(map[string]interface{})["prefix"]).Should(Equal(expectedRewrite))
			Expect(http0["rewrite"].(map[string]interface{})["uri"]).Should(Equal(expectedRewrite))

			// Test the status.URL gets set correctly
			Eventually(func() (string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil || viewer.Status.URL == nil {
					return "", err
				}
				return *viewer.Status.URL, nil
			}, timeout, interval).Should(Equal(expectedRewrite))

			By("Updating the defaults")
			newBasePrefix := "/newbase"
			newTimeout := "10s"
			newRewrite := "/newrewrite"
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return err
				}
				viewer.Spec.Networking.BasePrefix = newBasePrefix
				viewer.Spec.Networking.Timeout = newTimeout
				viewer.Spec.Networking.Rewrite = newRewrite
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (bool, error) {
				if err := testHelper.GetRelatedResource(pvcViewer, virtualService); err != nil {
					return false, err
				}
				return virtualService.Object["spec"].(map[string]interface{})["http"].([]interface{})[0].(map[string]interface{})["timeout"] != nil, nil
			}, timeout, interval).Should(BeTrue())
			Expect(virtualService.Object["metadata"].(map[string]interface{})["ownerReferences"]).Should(HaveLen(1))
			http = virtualService.Object["spec"].(map[string]interface{})["http"]
			Expect(http).Should(HaveLen(1))
			http0 = http.([]interface{})[0].(map[string]interface{})
			Expect(http0["timeout"]).Should(Equal(newTimeout))
			expectedRewrite = fmt.Sprintf("%s/%s/%s/", newBasePrefix, testHelper.namespace, pvcViewer.Name)
			Expect(http0["match"].([]interface{})[0].(map[string]interface{})["uri"].(map[string]interface{})["prefix"]).Should(Equal(expectedRewrite))
			Expect(http0["rewrite"].(map[string]interface{})["uri"]).Should(Equal(newRewrite))

			By("Deleting the PVCViewer")
			Expect(virtualService.Object["metadata"].(map[string]interface{})["ownerReferences"]).Should(HaveLen(1))
		})

		It("Should update status", func() {
			By("By checking a default PVCViewer's status")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: "test-pvc",
			})
			Consistently(func() (bool, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				if err := testHelper.GetRelatedResource(pvcViewer, viewer); err != nil {
					return true, err
				}
				return viewer.Status.Ready, nil
			}, duration, interval).Should(Equal(false))

			deployment := &appsv1.Deployment{}
			Eventually(func() error {
				return testHelper.GetRelatedResource(pvcViewer, deployment)
			}, timeout, interval).Should(Succeed())

			By("By updating the Deployment's status")
			// We need to update both ReadyReplicas and Replicas or else CRD validation will fail.
			deployment.Status.ReadyReplicas = 1
			deployment.Status.Replicas = 1
			Expect(k8sClient.Status().Update(ctx, deployment)).Should(Succeed())

			viewer := &kubefloworgv1alpha1.PVCViewer{}
			Eventually(func() (bool, error) {
				err := testHelper.GetRelatedResource(pvcViewer, viewer)
				return viewer.Status.Ready, err
			}, timeout, interval).Should(BeTrue())
			Expect(deployment.Status.ReadyReplicas).Should(Equal(int32(1)))
		})
	})

	// Test affinity generation for RWO scheduling
	Context("When RWO Scheduling is used", func() {
		It("Does not generate affinities for RWX PVCs", func() {
			By("Creating a RWX PVC and mounting Pod")
			pvcName := "rwx-pvc"
			testHelper.CreatePVC(pvcName, corev1.ReadWriteMany)
			testHelper.CreatePod("rwx-pod", "some-node", pvcName)

			By("Creating a PVCViewer for the RWX PVC")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: pvcName,
			})

			// RWX PVCs should not be considered
			Consistently(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := testHelper.GetRelatedResource(pvcViewer, deployment)
				return deployment.Spec.Template.Spec.Affinity, err
			}, duration, interval).Should(BeNil())
		})

		It("Should generate Affinity on existing RWO", func() {
			By("Creating a RWO PVC and mounting Pod")
			pvcName := "rwo-pvc"
			nodeName := "some-node-mounting-the-rwo-pvc"
			testHelper.CreatePVC(pvcName, corev1.ReadWriteOnce)
			testHelper.CreatePod("rwo-pod", nodeName, pvcName)

			By("By creating a viewer and referencing a RWO PVC")
			pvcViewer := testHelper.CreateViewer(&kubefloworgv1alpha1.PVCViewerSpec{
				PVC: pvcName,
				PodSpec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:  "main",
							Image: "busybox",
							VolumeMounts: []corev1.VolumeMount{
								{
									Name:      "pvc",
									MountPath: "/pvc",
								},
							},
						},
					},
					Volumes: []corev1.Volume{
						{
							Name: "pvc",
							VolumeSource: corev1.VolumeSource{
								PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{
									ClaimName: pvcName,
								},
							},
						},
					},
				},
			})

			Eventually(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := testHelper.GetRelatedResource(pvcViewer, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, err
			}, timeout, interval).ShouldNot(And(BeNil(), WithTransform(testHelper.ExtractNodeName, Equal(nodeName))))
		})
	})
})

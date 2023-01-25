package controllers

import (
	"fmt"
	"strconv"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	"sigs.k8s.io/controller-runtime/pkg/client"

	kubefloworgv1alpha1 "github.com/kubeflow/kubeflow/components/pvc-viewer/api/v1alpha1"
)

// +kubebuilder:docs-gen:collapse=Imports

var _ = Describe("PVCViewer controller", func() {

	// Define utility constants for object names and testing timeouts/durations and intervals.
	const (
		// Used for Eventually test
		timeout = time.Second * 10
		// Use for consistently test
		duration = time.Second * 5
		// Defines the interval for the Eventually/Consistency tests
		interval = time.Millisecond * 250
	)

	var (
		// We're using these variables to keep track of the test-# and create a unique namespace for each test
		testCount        = 0
		testingNamespace string

		// Provide a reusable lookup key for the controller created objects
		lookupKey         types.NamespacedName
		prefixedLookupKey types.NamespacedName

		// Provide the default viewer as a variable that is provided by the beforeEach function
		pvcViewer *kubefloworgv1alpha1.PVCViewer
	)

	// BeforeEach provides a clean namespace for each test, initializes variables and creates a default viewer
	BeforeEach(func() {
		// Each test should run in isolation. Using Namespaces is a good way to do this.
		// However, while EnvTest supports creating namespaces, it can't tear them down.
		// It is recommended to simply use a different namespace for each test.
		// See: https://book.kubebuilder.io/reference/envtest.html#namespace-usage-limitation
		testCount++
		testingNamespace = "test-" + fmt.Sprint(testCount)

		pvcViewerName := "test-pvcviewer"

		lookupKey = types.NamespacedName{Name: pvcViewerName, Namespace: testingNamespace}
		prefixedLookupKey = types.NamespacedName{Name: resourcePrefix + pvcViewerName, Namespace: testingNamespace}
		ns := &corev1.Namespace{
			ObjectMeta: metav1.ObjectMeta{
				Name: testingNamespace,
			},
		}
		Expect(k8sClient.Create(ctx, ns)).Should(Succeed())

		pvcViewer = &kubefloworgv1alpha1.PVCViewer{
			ObjectMeta: metav1.ObjectMeta{
				Name:      pvcViewerName,
				Namespace: testingNamespace,
			},
			Spec: kubefloworgv1alpha1.PVCViewerSpec{
				PodSpec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:  "viewer",
							Image: "filebrowser/filebrowser:latest",
						},
					},
				},
			},
		}
		Expect(k8sClient.Create(ctx, pvcViewer)).Should(Succeed())

		// We'll need to retry getting this newly created viewer, given that creation may not immediately happen.
		createdPVCViewer := &kubefloworgv1alpha1.PVCViewer{}
		Eventually(func() error {
			return k8sClient.Get(ctx, lookupKey, createdPVCViewer)
		}, timeout, interval).Should(Succeed())
		Expect(createdPVCViewer).ShouldNot(BeNil())
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
			Expect(k8sClient.DeleteAllOf(ctx, object, client.InNamespace(testingNamespace))).Should(Succeed())
		}
	})

	Context("When PVCViewer created", func() {
		var (
			//We cannot test deletions directly, as we are in a testing environment
			//However, testing the ownerReferences is a good proxy for testing deletion
			//See: https://book.kubebuilder.io/reference/envtest.html#testing-considerations
			expectedOwnerReferences metav1.OwnerReference
		)

		BeforeEach(func() {
			expectedOwnerReferences = metav1.OwnerReference{
				APIVersion:         "kubeflow.org/v1alpha1",
				Kind:               "PVCViewer",
				Name:               pvcViewer.Name,
				UID:                pvcViewer.UID,
				Controller:         &[]bool{true}[0],
				BlockOwnerDeletion: &[]bool{true}[0],
			}
		})

		It("Should CRUD Deployment", func() {
			By("By using the default viewer")
			deployment := &appsv1.Deployment{}
			Eventually(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, deployment)
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
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
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
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return -1, err
				}
				return len(deployment.Spec.Template.Spec.Containers), nil
			}, timeout, interval).Should(Equal(2))
			Expect(deployment.Spec.Template.Spec.Containers[0].Image).Should(Equal(newImageName))
			Expect(deployment.Spec.Template.Spec.Containers[1].Name).Should(Equal(newContainerName))
			Expect(deployment.Spec.Template.Spec.Containers[1].Image).Should(Equal(newImageName))

			By("Deleting the PVCViewer")
			Expect(deployment.ObjectMeta.OwnerReferences).To(ContainElement(expectedOwnerReferences))
		})

		It("Should CRUD Services", func() {
			By("Default a service should not exist")
			service := &corev1.Service{}
			Consistently(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, service)
			}, duration, interval).ShouldNot(Succeed())

			By("Adding a Service to the PVCViewer")
			targetPort := 1234
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.Networking = kubefloworgv1alpha1.Networking{
					TargetPort: intstr.IntOrString{IntVal: int32(targetPort)},
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, service)
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
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.Networking.TargetPort = intstr.IntOrString{IntVal: int32(newTargetPort)}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (bool, error) {
				err := k8sClient.Get(ctx, prefixedLookupKey, service)
				if err != nil {
					return false, err
				}
				return service.Spec.Ports[0].TargetPort == intstr.IntOrString{IntVal: int32(newTargetPort)}, nil
			}, timeout, interval).Should(BeTrue())

			By("Deleting the PVCViewer")
			Expect(service.ObjectMeta.OwnerReferences).To(ContainElement(expectedOwnerReferences))
		})

		It("Should CRUD VirtualService", func() {
			By("Not defining a VirtualService should not exist")
			virtualService := &unstructured.Unstructured{
				Object: map[string]interface{}{
					"apiVersion": "networking.istio.io/v1alpha3",
					"kind":       "VirtualService",
				},
			}
			Consistently(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, virtualService)
			}, duration, interval).ShouldNot(Succeed())

			By("Adding a minimal VirtualService")
			basePrefix := "/base"
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.Networking = kubefloworgv1alpha1.Networking{
					TargetPort: intstr.IntOrString{IntVal: 80},
					VirtualService: kubefloworgv1alpha1.VirtualService{
						BasePrefix: basePrefix,
					},
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, virtualService)
			}, timeout, interval).Should(Succeed())
			Expect(virtualService.Object["metadata"].(map[string]interface{})["labels"]).Should(And(
				HaveKeyWithValue(nameLabelKey, pvcViewer.Name),
				HaveKeyWithValue(instanceLabelKey, resourcePrefix+pvcViewer.Name),
				HaveKeyWithValue(partOfLabelKey, partOfLabelValue)))
			http := virtualService.Object["spec"].(map[string]interface{})["http"]
			Expect(http).Should(HaveLen(1))
			http0 := http.([]interface{})[0].(map[string]interface{})
			Expect(http0["timeout"]).Should(BeNil())
			expectedRewrite := fmt.Sprintf("%s/%s/%s/", basePrefix, testingNamespace, pvcViewer.Name)
			Expect(http0["match"].([]interface{})[0].(map[string]interface{})["uri"].(map[string]interface{})["prefix"]).Should(Equal(expectedRewrite))
			Expect(http0["rewrite"].(map[string]interface{})["uri"]).Should(Equal(expectedRewrite))

			// Test the status.URL gets set correctly
			Eventually(func() (string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil || viewer.Status.URL == nil {
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
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.Networking.VirtualService.BasePrefix = newBasePrefix
				viewer.Spec.Networking.VirtualService.Timeout = newTimeout
				viewer.Spec.Networking.VirtualService.Rewrite = newRewrite
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (bool, error) {
				err := k8sClient.Get(ctx, prefixedLookupKey, virtualService)
				if err != nil {
					return false, err
				}
				return virtualService.Object["spec"].(map[string]interface{})["http"].([]interface{})[0].(map[string]interface{})["timeout"] != nil, nil
			}, timeout, interval).Should(BeTrue())
			Expect(virtualService.Object["metadata"].(map[string]interface{})["ownerReferences"]).Should(HaveLen(1))
			http = virtualService.Object["spec"].(map[string]interface{})["http"]
			Expect(http).Should(HaveLen(1))
			http0 = http.([]interface{})[0].(map[string]interface{})
			Expect(http0["timeout"]).Should(Equal(newTimeout))
			expectedRewrite = fmt.Sprintf("%s/%s/%s/", newBasePrefix, testingNamespace, pvcViewer.Name)
			Expect(http0["match"].([]interface{})[0].(map[string]interface{})["uri"].(map[string]interface{})["prefix"]).Should(Equal(expectedRewrite))
			Expect(http0["rewrite"].(map[string]interface{})["uri"]).Should(Equal(newRewrite))

			By("Deleting the PVCViewer")
			Expect(virtualService.Object["metadata"].(map[string]interface{})["ownerReferences"]).Should(HaveLen(1))
		})

		It("Should update status", func() {
			By("By checking an initial PVCViewer status")
			Consistently(func() (int, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return -1, err
				}
				return int(viewer.Status.ReadyReplicas), nil
			}, duration, interval).Should(Equal(0))

			deployment := &appsv1.Deployment{}
			Eventually(func() error {
				return k8sClient.Get(ctx, prefixedLookupKey, deployment)
			}, timeout, interval).Should(Succeed())

			By("By updating the Deployment's status")
			// We need to update both ReadyReplicas and Replicas or else CRD validation will fail.
			deployment.Status.ReadyReplicas = 1
			deployment.Status.Replicas = 1
			Expect(k8sClient.Status().Update(ctx, deployment)).Should(Succeed())

			viewer := &kubefloworgv1alpha1.PVCViewer{}
			Eventually(func() (bool, error) {
				err := k8sClient.Get(ctx, lookupKey, viewer)
				return viewer.Status.Ready, err
			}, timeout, interval).Should(BeTrue())
			Expect(deployment.Status.ReadyReplicas).Should(Equal(int32(1)))
		})

		It("Strategically Merges Changes", func() {
			By("By updating the PVCViewer")
			// Make sure both existing values are overwritten but new fields aren't removed
			// Thus, we only enforce "our" values but ignore all others, whoever might have added them
			newImage := "newimagename"
			newSchedulerName := "test"

			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.PodSpec.Containers[0].Image = newImage
				viewer.Spec.PodSpec.SchedulerName = newSchedulerName
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (bool, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				return deployment.Spec.Template.Spec.Containers[0].Image == newImage &&
					deployment.Spec.Template.Spec.SchedulerName == newSchedulerName, err
			}, timeout, interval).Should(BeTrue())
		})
	})

	// Test affinity generation for RWO scheduling
	Context("When RWO Scheduling is used", func() {
		var (
			// Template PVCs/Pods so we can reuse the definitions
			pvcTemplate = &corev1.PersistentVolumeClaim{
				ObjectMeta: metav1.ObjectMeta{
					Name: "some-pvc-name",
				},
				Spec: corev1.PersistentVolumeClaimSpec{
					AccessModes: []corev1.PersistentVolumeAccessMode{},
					Resources: corev1.ResourceRequirements{
						Requests: corev1.ResourceList{
							corev1.ResourceStorage: resource.MustParse("1Gi"),
						},
					},
				},
			}
			podTemplate = &corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Name: "some-pod-name",
				},
				Spec: corev1.PodSpec{
					NodeName: "some-node-name",
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
								PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{},
							},
						},
					},
				},
			}
			volumeTemplate = &corev1.Volume{
				Name: "name",
				VolumeSource: corev1.VolumeSource{
					PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{
						ClaimName: "claim",
					},
				},
			}
		)

		BeforeEach(func() {
			// Note: this BeforeEach runs after the global BeforeEach defined above

			// Set the variable namespaces for our templates
			pvcTemplate.Namespace = testingNamespace
			podTemplate.Namespace = testingNamespace

			// Wait for our deployment to be ready
			Eventually(func() error {
				deployment := &appsv1.Deployment{}
				return k8sClient.Get(ctx, prefixedLookupKey, deployment)
			}, timeout, interval).Should(Succeed())

			// Update the PVCViewer to use RWO Scheduling for each test
			viewer := &kubefloworgv1alpha1.PVCViewer{}
			Eventually(func() error {
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.RWOScheduling = kubefloworgv1alpha1.RWOScheduling{
					Enabled: true,
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())
			pvcViewer = viewer

			// Once the deployment is created, it should consistently not have an affinity
			Consistently(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, duration, interval).Should(BeNil())
		})

		var extractNodeName = func(affinity *corev1.Affinity) string {
			if affinity == nil || affinity.NodeAffinity == nil || affinity.NodeAffinity.PreferredDuringSchedulingIgnoredDuringExecution == nil {
				return ""
			}
			return affinity.NodeAffinity.PreferredDuringSchedulingIgnoredDuringExecution[0].Preference.MatchExpressions[0].Values[0]
		}

		It("Should Ignore RWX PVCs", func() {
			By("Creating a PVC and mounting Pod")

			rwxPVC := pvcTemplate.DeepCopy()
			rwxPVC.Name = "rwx-pvc"
			rwxPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteMany,
			}
			Expect(k8sClient.Create(ctx, rwxPVC)).Should(Succeed())

			rwxPod := podTemplate.DeepCopy()
			rwxPod.Name = "rwx-pod"
			rwxPod.Spec.Volumes[0].PersistentVolumeClaim.ClaimName = rwxPVC.Name
			Expect(k8sClient.Create(ctx, rwxPod)).Should(Succeed())

			// RWX PVCs should not be considered
			Consistently(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				return deployment.Spec.Template.Spec.Affinity, err
			}, duration, interval).Should(BeNil())
		})

		It("Should generate Affinity on existing RWO", func() {
			By("Creating a RWO PVC and mounting Pod")
			rwoPVC := pvcTemplate.DeepCopy()
			rwoPVC.Name = "rwo-pvc"
			rwoPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteOnce,
			}
			Expect(k8sClient.Create(ctx, rwoPVC)).Should(Succeed())

			rwoPod := podTemplate.DeepCopy()
			rwoPod.Name = "rwo-pod"
			rwoPod.Spec.Volumes[0].PersistentVolumeClaim.ClaimName = rwoPVC.Name
			Expect(k8sClient.Create(ctx, rwoPod)).Should(Succeed())

			By("By referencing a RWO PVC")
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				mount := volumeTemplate.DeepCopy()
				mount.Name = rwoPVC.Name
				mount.VolumeSource.PersistentVolumeClaim.ClaimName = rwoPVC.Name
				viewer.Spec.PodSpec.Volumes = []corev1.Volume{*mount}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, err
			}, timeout, interval).ShouldNot(And(BeNil(), WithTransform(extractNodeName, Equal(rwoPod.Spec.NodeName))))
		})

		// Helper function that sets the rwo restart flag,
		// creates a RWO PVC,
		// lets the PVCViewer mount the PVC
		// and creates a contender Pod that mounts the PVC
		prepareRestartScenario := func(restart bool) {
			By("Setting the restart flag")
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.RWOScheduling = kubefloworgv1alpha1.RWOScheduling{
					Enabled: true,
					Restart: restart,
				}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			By("Creating a standalone RWO PVC")
			rwoPVC := pvcTemplate.DeepCopy()
			rwoPVC.Name = "rwo-pvc"
			rwoPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteOnce,
			}
			Expect(k8sClient.Create(ctx, rwoPVC)).Should(Succeed())

			By("By referencing a RWO PVC")
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				volume := volumeTemplate.DeepCopy()
				volume.Name = rwoPVC.Name
				volume.VolumeSource.PersistentVolumeClaim.ClaimName = rwoPVC.Name
				viewer.Spec.PodSpec.Volumes = []corev1.Volume{*volume}
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			// Make sure the controller is observing the PVC
			Eventually(func() ([]string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return nil, err
				}
				return viewer.Status.RWOVolumes, nil
			}, timeout, interval).Should(Equal([]string{rwoPVC.Name}))

			Consistently(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, duration, interval).Should(BeNil())

			By("Creating a mounting RWO Pod")
			rwoPod := podTemplate.DeepCopy()
			rwoPod.Name = "rwo-pod"
			rwoPod.Spec.Volumes[0].PersistentVolumeClaim.ClaimName = rwoPVC.Name
			Expect(k8sClient.Create(ctx, rwoPod)).Should(Succeed())
		}

		It("Should not set Affinity (i.e. restart) on Restart=False", func() {
			prepareRestartScenario(false)

			// Without restart, affinity should not be set / change
			Consistently(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, duration, interval).Should(BeNil())
		})

		It("Should set Affinity (i.e. restart) on Restart=True", func() {
			prepareRestartScenario(true)

			// Without restart, a node affinity should be set by the controller.
			// As we've checked before that the deployment was launched without a node affinity,
			// this would mean the Pod restarted after the Pod was created
			Eventually(func() (*corev1.Affinity, error) {
				deployment := &appsv1.Deployment{}
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, timeout, interval).ShouldNot(BeNil())
		})

		It("Should not change Affinity on conflicting nodeNames", func() {
			prepareRestartScenario(true)

			By("Creating and referencing another RWO PVC")
			rwoPVC := pvcTemplate.DeepCopy()
			rwoPVC.Name = "another-rwo-pvc"
			rwoPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteOnce,
			}
			Expect(k8sClient.Create(ctx, rwoPVC)).Should(Succeed())

			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				volume := volumeTemplate.DeepCopy()
				volume.Name = rwoPVC.Name
				volume.VolumeSource.PersistentVolumeClaim.ClaimName = rwoPVC.Name
				viewer.Spec.PodSpec.Volumes = append(viewer.Spec.PodSpec.Volumes, *volume)
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			// Make sure the controller is observing both PVCs
			Eventually(func() ([]string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				return viewer.Status.RWOVolumes, k8sClient.Get(ctx, lookupKey, viewer)
			}, timeout, interval).Should(And(HaveLen(2), ContainElements([]string{"rwo-pvc", rwoPVC.Name})))

			deployment := &appsv1.Deployment{}
			Eventually(func() (*corev1.Affinity, error) {
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, timeout, interval).ShouldNot(BeNil())

			initialNodeName := extractNodeName(deployment.Spec.Template.Spec.Affinity)
			Expect(initialNodeName).ShouldNot(Or(BeNil(), BeEmpty()))

			By("Creating a mounting RWO Pod with a conflicting nodeName")
			rwoPod := podTemplate.DeepCopy()
			rwoPod.Name = "another-rwo-pod"
			rwoPod.Spec.NodeName = "another-node"
			rwoPod.Spec.Volumes[0].PersistentVolumeClaim.ClaimName = rwoPVC.Name
			Expect(k8sClient.Create(ctx, rwoPod)).Should(Succeed())

			Consistently(func() (*corev1.Affinity, error) {
				err := k8sClient.Get(ctx, prefixedLookupKey, deployment)
				if err != nil {
					return nil, err
				}
				return deployment.Spec.Template.Spec.Affinity, nil
			}, duration, interval).Should(WithTransform(extractNodeName, Equal(initialNodeName)))
		})

		It("Should update Status.RWOVolumes", func() {
			By("Creating and Adding multiple PVCs to the PVCViewer")
			rwoPVCs := []corev1.PersistentVolumeClaim{}
			for i := 0; i < 3; i++ {
				rwoPVC := pvcTemplate.DeepCopy()
				rwoPVC.Name = "rwo-pvc-" + strconv.Itoa(i)
				rwoPVC.Namespace = testingNamespace
				rwoPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
					corev1.ReadWriteOnce,
				}
				Expect(k8sClient.Create(ctx, rwoPVC)).Should(Succeed())
				rwoPVCs = append(rwoPVCs, *rwoPVC)
				pod := podTemplate.DeepCopy()
				pod.Name = "rwo-pod-" + strconv.Itoa(i)
				pod.Spec.Volumes[0].PersistentVolumeClaim.ClaimName = rwoPVC.Name
				Expect(k8sClient.Create(ctx, pod)).Should(Succeed())
			}
			rwxPVC := pvcTemplate.DeepCopy()
			rwxPVC.Name = "rwx-pvc"
			rwxPVC.Spec.AccessModes = []corev1.PersistentVolumeAccessMode{
				corev1.ReadWriteMany,
			}
			Expect(k8sClient.Create(ctx, rwxPVC)).Should(Succeed())

			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				for _, pvc := range rwoPVCs {
					volume := volumeTemplate.DeepCopy()
					volume.Name = pvc.Name
					volume.VolumeSource.PersistentVolumeClaim.ClaimName = pvc.Name
					viewer.Spec.PodSpec.Volumes = append(viewer.Spec.PodSpec.Volumes, *volume)
				}
				// Append a rwx volume to the pod template
				volume := volumeTemplate.DeepCopy()
				volume.Name = rwxPVC.Name
				volume.VolumeSource.PersistentVolumeClaim.ClaimName = rwxPVC.Name
				viewer.Spec.PodSpec.Volumes = append(viewer.Spec.PodSpec.Volumes, *volume)
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() ([]string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return nil, err
				}
				return viewer.Status.RWOVolumes, err
			}, timeout, interval).Should(And(HaveLen(3), ContainElements([]string{rwoPVCs[0].Name, rwoPVCs[1].Name, rwoPVCs[2].Name})))

			By("Removing PVCs from the PVCViewer")
			Eventually(func() error {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				err := k8sClient.Get(ctx, lookupKey, viewer)
				if err != nil {
					return err
				}
				viewer.Spec.PodSpec.Volumes = viewer.Spec.PodSpec.Volumes[:1]
				return k8sClient.Update(ctx, viewer)
			}, timeout, interval).Should(Succeed())

			Eventually(func() ([]string, error) {
				viewer := &kubefloworgv1alpha1.PVCViewer{}
				return viewer.Status.RWOVolumes, k8sClient.Get(ctx, lookupKey, viewer)
			}, timeout, interval).Should(And(HaveLen(1), ContainElements([]string{rwoPVCs[0].Name})))
		})
	})
})

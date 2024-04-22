package controllers

import (
	"context"
	"reflect"
	"time"

	. "github.com/onsi/gomega"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"

	"sigs.k8s.io/controller-runtime/pkg/client"

	kubefloworgv1alpha1 "github.com/kubeflow/kubeflow/components/pvc-viewer/api/v1alpha1"
)

// Variables required for the tests utilities and passed by the test suite
type TestHelper struct {
	namespace string

	ctx       context.Context
	k8sClient client.Client
}

// Define utility constants for object names and testing timeouts/durations and intervals.
const (
	// Used for Eventually test
	timeout = time.Second * 10
	// Use for consistently test
	duration = time.Second * 5
	// Defines the interval for the Eventually/Consistency tests
	interval = time.Millisecond * 250
)

// Extracts the node name from the affinity of the PVCViewer
func (t *TestHelper) ExtractNodeName(affinity *corev1.Affinity) string {
	if affinity == nil || affinity.NodeAffinity == nil || affinity.NodeAffinity.PreferredDuringSchedulingIgnoredDuringExecution == nil {
		return ""
	}
	return affinity.NodeAffinity.PreferredDuringSchedulingIgnoredDuringExecution[0].Preference.MatchExpressions[0].Values[0]
}

// Creates a Pod that mounts the PVC with the given name
func (t *TestHelper) CreatePod(name string, nodeName string, mountedPVCName string) {
	pod := &corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: t.namespace,
		},
		Spec: corev1.PodSpec{
			NodeName: nodeName,
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
							ClaimName: mountedPVCName,
						},
					},
				},
			},
		},
	}
	Expect(t.k8sClient.Create(t.ctx, pod)).Should(Succeed())
}

// CreateViewer is a helper function that creates a PVCViewer and returns the created object
func (t *TestHelper) CreatePVC(name string, accessMode corev1.PersistentVolumeAccessMode) {
	pvc := &corev1.PersistentVolumeClaim{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: t.namespace,
		},
		Spec: corev1.PersistentVolumeClaimSpec{
			AccessModes: []corev1.PersistentVolumeAccessMode{
				accessMode,
			},
			Resources: corev1.VolumeResourceRequirements{
				Requests: corev1.ResourceList{
					corev1.ResourceStorage: resource.MustParse("1Gi"),
				},
			},
		},
	}
	Expect(t.k8sClient.Create(t.ctx, pvc)).Should(Succeed())
}

// We cannot test deletions directly, as we are in a testing environment
// However, testing the ownerReferences is a good proxy for testing deletion
// See: https://book.kubebuilder.io/reference/envtest.html#testing-considerations
func (t *TestHelper) ExpectMatchingOwnerReferences(pvcViewer *kubefloworgv1alpha1.PVCViewer, ownerReferences []metav1.OwnerReference) {
	expectedOwnerReferences := metav1.OwnerReference{
		APIVersion:         "kubeflow.org/v1alpha1",
		Kind:               "PVCViewer",
		Name:               pvcViewer.Name,
		UID:                pvcViewer.UID,
		Controller:         &[]bool{true}[0],
		BlockOwnerDeletion: &[]bool{true}[0],
	}
	Expect(ownerReferences).To(ContainElement(expectedOwnerReferences))
}

// Wrap the client.Get method to automatically set the correct lookupKey when getting resources the controller creates
func (t *TestHelper) GetRelatedResource(pvcViewer *kubefloworgv1alpha1.PVCViewer, obj client.Object) error {
	key := types.NamespacedName{Name: resourcePrefix + pvcViewer.Name, Namespace: t.namespace}
	if reflect.TypeOf(obj) == reflect.TypeOf(&kubefloworgv1alpha1.PVCViewer{}) {
		key.Name = pvcViewer.Name
	}
	return t.k8sClient.Get(t.ctx, key, obj)
}

// CreateViewer is a helper function that creates a PVCViewer and returns the created object
func (t *TestHelper) CreateViewer(viewerSpec *kubefloworgv1alpha1.PVCViewerSpec) *kubefloworgv1alpha1.PVCViewer {
	pvcViewer := &kubefloworgv1alpha1.PVCViewer{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "test-pvcviewer",
			Namespace: t.namespace,
		},
		Spec: *viewerSpec,
	}
	Expect(t.k8sClient.Create(t.ctx, pvcViewer)).Should(Succeed())

	createdPVCViewer := &kubefloworgv1alpha1.PVCViewer{}
	Eventually(func() error {
		return t.GetRelatedResource(pvcViewer, createdPVCViewer)
	}, timeout, interval).Should(Succeed())
	Expect(createdPVCViewer).ShouldNot(BeNil())

	return createdPVCViewer
}

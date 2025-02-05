package controllers

import (
	"reflect"
	"testing"
	"time"

	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"

	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/fake"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/scheme"

	"github.com/google/go-cmp/cmp"
	v1beta1 "github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
	ctrl "sigs.k8s.io/controller-runtime"
)

func TestNbNameFromInvolvedObject(t *testing.T) {
	testPod := &corev1.Pod{
		ObjectMeta: v1.ObjectMeta{
			Name:      "test-notebook-0",
			Namespace: "test-namespace",
			Labels: map[string]string{
				"notebook-name": "test-notebook",
			},
		},
	}

	podEvent := &corev1.Event{
		ObjectMeta: v1.ObjectMeta{
			Name: "pod-event",
		},
		InvolvedObject: corev1.ObjectReference{
			Kind:      "Pod",
			Name:      "test-notebook-0",
			Namespace: "test-namespace",
		},
	}

	testSts := &appsv1.StatefulSet{
		ObjectMeta: v1.ObjectMeta{
			Name:      "test-notebook",
			Namespace: "test",
		},
	}

	stsEvent := &corev1.Event{
		ObjectMeta: v1.ObjectMeta{
			Name: "sts-event",
		},
		InvolvedObject: corev1.ObjectReference{
			Kind:      "StatefulSet",
			Name:      "test-notebook",
			Namespace: "test-namespace",
		},
	}

	tests := []struct {
		name           string
		event          *corev1.Event
		expectedNbName string
	}{
		{
			name:           "pod event",
			event:          podEvent,
			expectedNbName: "test-notebook",
		},
		{
			name:           "statefulset event",
			event:          stsEvent,
			expectedNbName: "test-notebook",
		},
	}
	objects := []runtime.Object{testPod, testSts}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			c := fake.NewFakeClientWithScheme(scheme.Scheme, objects...)
			nbName, err := nbNameFromInvolvedObject(c, &test.event.InvolvedObject)
			if err != nil {
				t.Fatalf("Unexpected error: %v", err)
			}
			if nbName != test.expectedNbName {
				t.Fatalf("Got %v, Expected %v", nbName, test.expectedNbName)
			}
		})
	}
}

func TestCreateNotebookStatus(t *testing.T) {

	tests := []struct {
		name             string
		currentNb        v1beta1.Notebook
		pod              corev1.Pod
		sts              appsv1.StatefulSet
		expectedNbStatus v1beta1.NotebookStatus
	}{
		{
			name: "NotebookStatusReadyReplicas",
			currentNb: v1beta1.Notebook{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: v1beta1.NotebookStatus{},
			},
			pod: corev1.Pod{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: corev1.PodStatus{
					ContainerStatuses: []corev1.ContainerStatus{
						{
							Name: "test",
							State: corev1.ContainerState{
								Running: &corev1.ContainerStateRunning{
									StartedAt: v1.Time{},
								},
							},
						},
					},
				},
			},
			sts: appsv1.StatefulSet{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: appsv1.StatefulSetStatus{
					ReadyReplicas: int32(1),
				},
			},
			expectedNbStatus: v1beta1.NotebookStatus{
				Conditions:    []v1beta1.NotebookCondition{},
				ReadyReplicas: int32(1),
				ContainerState: corev1.ContainerState{
					Running: &corev1.ContainerStateRunning{
						StartedAt: v1.Time{},
					},
				},
			},
		},
		{
			name: "NotebookContainerState",
			currentNb: v1beta1.Notebook{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: v1beta1.NotebookStatus{},
			},
			pod: corev1.Pod{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: corev1.PodStatus{
					ContainerStatuses: []corev1.ContainerStatus{
						{
							Name: "test",
							State: corev1.ContainerState{
								Running: &corev1.ContainerStateRunning{
									StartedAt: v1.Time{},
								},
							},
						},
					},
				},
			},
			sts: appsv1.StatefulSet{},
			expectedNbStatus: v1beta1.NotebookStatus{
				Conditions:    []v1beta1.NotebookCondition{},
				ReadyReplicas: int32(0),
				ContainerState: corev1.ContainerState{
					Running: &corev1.ContainerStateRunning{
						StartedAt: v1.Time{},
					},
				},
			},
		},
		{
			name: "mirroringPodConditions",
			pod: corev1.Pod{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: corev1.PodStatus{
					Conditions: []corev1.PodCondition{
						{
							Type:               "Running",
							LastProbeTime:      v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
							LastTransitionTime: v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
						},
						{
							Type:               "Waiting",
							LastProbeTime:      v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
							LastTransitionTime: v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
							Reason:             "PodInitializing",
						},
					},
				},
			},
			sts: appsv1.StatefulSet{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: appsv1.StatefulSetStatus{
					ReadyReplicas: int32(1),
				},
			},
			expectedNbStatus: v1beta1.NotebookStatus{
				Conditions: []v1beta1.NotebookCondition{
					{
						Type:               "Running",
						LastProbeTime:      v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
						LastTransitionTime: v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
					},
					{
						Type:               "Waiting",
						LastProbeTime:      v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
						LastTransitionTime: v1.Date(2022, time.Month(8), 30, 1, 10, 30, 0, time.UTC),
						Reason:             "PodInitializing",
					},
				},
				ReadyReplicas:  int32(1),
				ContainerState: corev1.ContainerState{},
			},
		},
		{
			name: "unschedulablePod",
			pod: corev1.Pod{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: corev1.PodStatus{
					Conditions: []corev1.PodCondition{
						{
							Type:               "PodScheduled",
							LastProbeTime:      v1.Date(2022, time.Month(4), 21, 1, 10, 30, 0, time.UTC),
							LastTransitionTime: v1.Date(2022, time.Month(4), 21, 1, 10, 30, 0, time.UTC),
							Message:            "0/1 nodes are available: 1 Insufficient cpu.",
							Status:             "false",
							Reason:             "Unschedulable",
						},
					},
				},
			},
			sts: appsv1.StatefulSet{
				ObjectMeta: v1.ObjectMeta{
					Name:      "test",
					Namespace: "kubeflow-user",
				},
				Status: appsv1.StatefulSetStatus{},
			},
			expectedNbStatus: v1beta1.NotebookStatus{
				Conditions: []v1beta1.NotebookCondition{
					{
						Type:               "PodScheduled",
						LastProbeTime:      v1.Date(2022, time.Month(4), 21, 1, 10, 30, 0, time.UTC),
						LastTransitionTime: v1.Date(2022, time.Month(4), 21, 1, 10, 30, 0, time.UTC),
						Message:            "0/1 nodes are available: 1 Insufficient cpu.",
						Status:             "false",
						Reason:             "Unschedulable",
					},
				},
				ReadyReplicas:  int32(0),
				ContainerState: corev1.ContainerState{},
			},
		},
	}

	// create fake client
	fakeClient := fake.NewFakeClientWithScheme(scheme.Scheme)

	r := &NotebookReconciler{
		Client: fakeClient,
		Log:    ctrl.Log.WithName("controllers").WithName("Notebook"),
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			req := ctrl.Request{}
			status, err := createNotebookStatus(r, &test.currentNb, &test.sts, &test.pod, req)
			if err != nil {
				t.Errorf("Unexpected error: %v", err)
			}
			if !reflect.DeepEqual(status, test.expectedNbStatus) {
				t.Errorf("\nExpect: %v; \nOutput: %v", test.expectedNbStatus, status)
			}
		})
	}

}

func TestCheckWarningEvents(t *testing.T) {
	// Define the test data
	testCases := []struct {
		name          string
		annotations   map[string]string
		events        []corev1.Event
		expectedState v1beta1.NotebookStatus
	}{
		{
			name: "No warning events",
			events: []corev1.Event{
				{
					ObjectMeta:     metav1.ObjectMeta{Name: "test-event", Namespace: "test-namespace"},
					InvolvedObject: corev1.ObjectReference{Kind: "Notebook", Name: "test-notebook", Namespace: "test-namespace"},
					Reason:         "",
					Message:        "",
					FirstTimestamp: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					LastTimestamp:  v1.Time{},
					Type:           "Normal",
				},
			},
			expectedState: v1beta1.NotebookStatus{
				Conditions:     []v1beta1.NotebookCondition{},
				ReadyReplicas:  int32(0),
				ContainerState: corev1.ContainerState{},
			},
		},
		{
			name: "1 warning event",
			events: []corev1.Event{
				{
					ObjectMeta:     metav1.ObjectMeta{Name: "test-event-1", Namespace: "test-namespace"},
					InvolvedObject: corev1.ObjectReference{Kind: "Notebook", Name: "test-notebook", Namespace: "test-namespace"},
					Reason:         "FailedCreate",
					Message:        "Failed to create StatefulSet due to invalid configuration.",
					FirstTimestamp: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					LastTimestamp:  v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					Type:           "Warning",
				},
				{
					ObjectMeta:     metav1.ObjectMeta{Name: "test-event-2", Namespace: "test-namespace"},
					InvolvedObject: corev1.ObjectReference{Kind: "Notebook", Name: "test-notebook", Namespace: "test-namespace"},
					Reason:         "",
					Message:        "",
					FirstTimestamp: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					LastTimestamp:  v1.Time{},
					Type:           "Normal",
				},
			},
			expectedState: v1beta1.NotebookStatus{
				Conditions: []v1beta1.NotebookCondition{
					{
						Type:               "Warning",
						LastProbeTime:      v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
						LastTransitionTime: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
						Message:            "Failed to create StatefulSet due to invalid configuration.",
						Status:             "",
						Reason:             "FailedCreate",
					}},
				ReadyReplicas:  int32(0),
				ContainerState: corev1.ContainerState{},
			},
		},
		{
			name: "Duplicate warning events",
			events: []corev1.Event{
				{
					ObjectMeta:     metav1.ObjectMeta{Name: "event1", Namespace: "test-namespace"},
					InvolvedObject: corev1.ObjectReference{Kind: "Notebook", Name: "test-notebook", Namespace: "test-namespace"},
					Reason:         "FailedCreate",
					Message:        "Failed to create StatefulSet due to invalid configuration.",
					FirstTimestamp: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					LastTimestamp:  v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					Type:           "Warning",
				},
				{
					ObjectMeta:     metav1.ObjectMeta{Name: "event2", Namespace: "test-namespace"},
					InvolvedObject: corev1.ObjectReference{Kind: "Notebook", Name: "test-notebook", Namespace: "test-namespace"},
					Reason:         "FailedCreate",
					Message:        "Failed to create StatefulSet due to invalid configuration.",
					FirstTimestamp: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					LastTimestamp:  v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
					Type:           "Warning",
				},
			},
			expectedState: v1beta1.NotebookStatus{
				Conditions: []v1beta1.NotebookCondition{
					{
						Type:               "Warning",
						LastProbeTime:      v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
						LastTransitionTime: v1.Date(2023, time.Month(3), 1, 1, 10, 30, 0, time.UTC),
						Message:            "Failed to create StatefulSet due to invalid configuration.",
						Status:             "",
						Reason:             "FailedCreate",
					}},
				ReadyReplicas:  int32(0),
				ContainerState: corev1.ContainerState{},
			},
		},
	}

	// Add the v1beta1 (Notebooks) and corev1 (Events) API groups to the scheme
	// before creating the fake client
	scheme := runtime.NewScheme()
	v1beta1.AddToScheme(scheme)
	corev1.AddToScheme(scheme)

	// Loop over the test cases
	for _, tt := range testCases {
		t.Run(tt.name, func(t *testing.T) {
			// Create a fake client with the test data
			builder := fake.NewClientBuilder().WithScheme(scheme)
			nb := &v1beta1.Notebook{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: tt.annotations,
					Name:        "test-notebook",
					Namespace:   "test-namespace",
				},
			}
			// Add the Notebook resource to the fake client
			builder = builder.WithObjects(nb)

			var objs []client.Object
			// Convert each event item to a client.Object and append to objs slice
			for _, e := range tt.events {
				event := e // create a copy of event to avoid modifying the original
				objs = append(objs, &event)
			}
			// Add events to the fake client
			builder = builder.WithObjects(objs...)

			r := &NotebookReconciler{
				Client: builder.Build(),
				Scheme: scheme,
				Log:    ctrl.Log.WithName("controllers").WithName("Notebook"),
			}
			status := v1beta1.NotebookStatus{
				Conditions:     make([]v1beta1.NotebookCondition, 0),
				ReadyReplicas:  int32(0),
				ContainerState: corev1.ContainerState{},
			}
			req := ctrl.Request{NamespacedName: types.NamespacedName{Namespace: "test-namespace", Name: "test-notebook"}}

			// Call the checkWarningEvents function to test
			status, err := checkWarningEvents(r, status, nb, req)
			if err != nil {
				t.Errorf("Unexpected error: %v", err)
				return
			}

			// check if the status was updated with the correct condition
			if diff := cmp.Diff(tt.expectedState, status); diff != "" {
				t.Errorf("Unexpected status (-want +got):\n%s", diff)
			}

		})
	}
}

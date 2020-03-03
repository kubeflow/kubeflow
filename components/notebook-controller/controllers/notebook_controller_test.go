package controllers

import (
	"testing"

	"k8s.io/apimachinery/pkg/runtime"

	"sigs.k8s.io/controller-runtime/pkg/client/fake"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/scheme"
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

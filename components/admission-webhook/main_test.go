package main

import (
	"reflect"
	"testing"

	settingsapi "github.com/kubeflow/kubeflow/components/admission-webhook/pkg/apis/settings/v1alpha1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func TestMergeMapBad(t *testing.T) {
	for _, test := range []struct {
		name     string
		existing map[string]string
		defaults map[string]string
	}{
		{
			"Conflicting annotation",
			map[string]string{"foo": "bar"},
			map[string]string{"foo": "buz"},
		},
	} {
		if _, err := mergeMap(test.existing, []*map[string]string{&test.defaults}); err == nil {
			t.Fatal("Expected error but got none")
		}
	}
}

func TestMergeMapGood(t *testing.T) {
	for _, test := range []struct {
		name     string
		existing map[string]string
		defaults map[string]string
		out      map[string]string
	}{
		{
			"Add annotation",
			map[string]string{"foo": "bar"},
			map[string]string{"baz": "bux"},
			map[string]string{
				"foo": "bar",
				"baz": "bux",
			},
		},
		{
			"Add nothing",
			map[string]string{"foo": "bar"},
			map[string]string{},
			map[string]string{
				"foo": "bar",
			},
		},
		{
			"Same k/v in annotations",
			map[string]string{"foo": "bar"},
			map[string]string{"foo": "bar"},
			map[string]string{
				"foo": "bar",
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			out, err := mergeMap(test.existing, []*map[string]string{&test.defaults})
			if err != nil {
				t.Fatal(err)
			}
			if !reflect.DeepEqual(out, test.out) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", out, test.out)
			}
		})
	}
}

func newTrue() *bool {
	b := true
	return &b
}

func TestApplyPodDefaultsOnPod(t *testing.T) {
	for _, test := range []struct {
		name        string
		in          *corev1.Pod
		podDefaults []*settingsapi.PodDefault
		out         *corev1.Pod
	}{
		{
			"Add Annotations",
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{"foo": "bar"},
				},
			},
			[]*settingsapi.PodDefault{
				{
					Spec: settingsapi.PodDefaultSpec{
						Annotations:                  map[string]string{"baz": "bux"},
						ServiceAccountName:           "some-service-account",
						AutomountServiceAccountToken: newTrue(),
					},
				},
			},
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{
						"foo": "bar",
						"baz": "bux",
						"poddefault.admission.kubeflow.org/poddefault-": "",
					},
					Labels: map[string]string{},
				},
				Spec: corev1.PodSpec{
					ServiceAccountName:           "some-service-account",
					AutomountServiceAccountToken: newTrue(),
				},
			},
		}, {
			"Same k/v",
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{"foo": "bar"},
				},
			},
			[]*settingsapi.PodDefault{
				{
					Spec: settingsapi.PodDefaultSpec{
						Annotations: map[string]string{"foo": "bar"},
					},
				},
			},
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{
						"foo": "bar",
						"poddefault.admission.kubeflow.org/poddefault-": "",
					},
					Labels: map[string]string{},
				},
			},
		}, {
			"Add tolerations",
			&corev1.Pod{
				Spec: corev1.PodSpec{
					Tolerations: []corev1.Toleration{
						{
							Key:      "oldToleration",
							Operator: "Exists",
							Effect:   "NoSchedule",
						},
					},
				},
			},
			[]*settingsapi.PodDefault{
				{
					Spec: settingsapi.PodDefaultSpec{
						Tolerations: []corev1.Toleration{
							{
								Key:      "newToleration",
								Operator: "Equal",
								Value:    "foo",
								Effect:   "NoSchedule",
							},
						},
					},
				},
			},
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{
						"poddefault.admission.kubeflow.org/poddefault-": "",
					},
					Labels: map[string]string{},
				},
				Spec: corev1.PodSpec{
					Tolerations: []corev1.Toleration{
						{
							Key:      "oldToleration",
							Operator: "Exists",
							Effect:   "NoSchedule",
						},
						{
							Key:      "newToleration",
							Operator: "Equal",
							Value:    "foo",
							Effect:   "NoSchedule",
						},
					},
				},
			},
		}, {
			"Add init containers",
			&corev1.Pod{
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{},
				},
			},
			[]*settingsapi.PodDefault{
				{
					Spec: settingsapi.PodDefaultSpec{
						InitContainers: []corev1.Container{
							corev1.Container{
								Command: []string{
									"cmd1",
								},
								Args: []string{
									"arg1",
									"arg2",
								},
								Image: "nginx",
								Name:  "test initcontainer and sidecar",
							},
						},
					},
				},
			},
			&corev1.Pod{
				ObjectMeta: metav1.ObjectMeta{
					Annotations: map[string]string{
						"poddefault.admission.kubeflow.org/poddefault-": "",
					},
					Labels: map[string]string{},
				},
				Spec: corev1.PodSpec{
					InitContainers: []corev1.Container{
						corev1.Container{
							Command: []string{
								"cmd1",
							},
							Args: []string{
								"arg1",
								"arg2",
							},
							Image: "nginx",
							Name:  "test initcontainer and sidecar",
						},
					},
				},
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			if err := safeToApplyPodDefaultsOnPod(test.in, test.podDefaults); err != nil {
				t.Fatal(err)
			}
			applyPodDefaultsOnPod(test.in, test.podDefaults)
			if reflect.DeepEqual(test.in, test.out) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", test.in, test.out)
			}
		})
	}

}

func TestSetCommandAndArgs(t *testing.T) {
	commandOne := []string{
		"cmd1",
	}
	argsOne := []string{
		"arg1",
		"arg2",
	}
	commandTwo := []string{
		"cmd2",
	}
	argsTwo := []string{
		"arg3",
		"arg4",
	}
	for _, test := range []struct {
		name        string
		in          *corev1.Container
		podDefaults []*settingsapi.PodDefault
		out         *corev1.Container
	}{
		{
			name: "Set command and args",
			in:   &corev1.Container{},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						Command: commandOne,
						Args:    argsOne,
					},
				},
			},
			out: &corev1.Container{
				Command: commandOne,
				Args:    argsOne,
			},
		},
		{
			name: "Do not overwrite command and args in case they are already set",
			in: &corev1.Container{
				Command: commandTwo,
				Args:    argsTwo,
			},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						Command: commandOne,
						Args:    argsOne,
					},
				},
			},
			out: &corev1.Container{
				Command: commandTwo,
				Args:    argsTwo,
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			setCommandAndArgs(test.in, test.podDefaults)
			if !reflect.DeepEqual(test.in, test.out) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", test.in, test.out)
			}
		})
	}
}

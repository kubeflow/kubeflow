package main

import (
	"errors"
	"reflect"
	"testing"

	settingsapi "github.com/kubeflow/kubeflow/components/admission-webhook/pkg/apis/settings/v1alpha1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	utilerrors "k8s.io/apimachinery/pkg/util/errors"
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
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			if err := safeToApplyPodDefaultsOnPod(test.in, test.podDefaults); err != nil {
				t.Fatal(err)
			}
			applyPodDefaultsOnPod(test.in, test.podDefaults)
			if !reflect.DeepEqual(test.in, test.out) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", test.in.ObjectMeta, test.out.ObjectMeta)
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

func TestMergeVolumeMounts(t *testing.T) {
	
	ANY_ERROR := errors.New("ANY")
	
	for _, test := range []struct {
		name        string
		in          []corev1.VolumeMount
		podDefaults []*settingsapi.PodDefault
		outMounts   []corev1.VolumeMount
		outErrs     []error
	}{
		{
			name: "Can mount the same volume twice at different paths",
			// mounts already on the container
			in:   []corev1.VolumeMount{},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						// mounts in the podDefault
						VolumeMounts: []corev1.VolumeMount{
							{
								Name: "volume-1",
								MountPath: "/path1",
							},
							{
								Name: "volume-1",
								MountPath: "/path2",
							},
						},
					},
				},
			},
			// the final, merged set of mounts
			outMounts: []corev1.VolumeMount{
				{
					Name: "volume-1",
					MountPath: "/path1",
				},
				{
					Name: "volume-1",
					MountPath: "/path2",
				},
			},
			outErrs: nil,
		},
		{
			name: "Can mount the same volume twice at the same path",
			// mounts already on the container
			in:   []corev1.VolumeMount{},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						// mounts in the podDefault
						VolumeMounts: []corev1.VolumeMount{
							{
								Name: "volume-1",
								MountPath: "/path1",
							},
							{
								Name: "volume-1",
								MountPath: "/path1",
							},
						},
					},
				},
			},
			// the final, merged set of mounts
			outMounts: []corev1.VolumeMount{
				{
					Name: "volume-1",
					MountPath: "/path1",
				},
			},
			outErrs: nil,
		},
		{
			name: "Cannot mount the same volume twice at same path with different SubPath",
			// mounts already on the container
			in:   []corev1.VolumeMount{},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						// mounts in the podDefault
						VolumeMounts: []corev1.VolumeMount{
							{
								Name: "volume-1",
								MountPath: "/path1",
								SubPath: "/sp1",
							},
							{
								Name: "volume-1",
								MountPath: "/path1",
								SubPath: "/sp2",
							},
						},
					},
				},
			},
			// the final, merged set of mounts
			outMounts: nil,
			outErrs: []error{
				ANY_ERROR,
			},
		},
		{
			name: "Cannot mount different volumes to the same path",
			// mounts already on the container
			in:   []corev1.VolumeMount{},
			podDefaults: []*settingsapi.PodDefault{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "test-pod-default",
					},
					Spec: settingsapi.PodDefaultSpec{
						// mounts in the podDefault
						VolumeMounts: []corev1.VolumeMount{
							{
								Name: "volume-1",
								MountPath: "/path1",
							},
							{
								Name: "volume-2",
								MountPath: "/path1",
							},
						},
					},
				},
			},
			// the final, merged set of mounts
			outMounts: nil,
			outErrs: []error{
				ANY_ERROR,
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			outMounts, outErr := mergeVolumeMounts(test.in, test.podDefaults)
			
			if test.outErrs == nil && outErr != nil {
				// the test failed but it wasn't supposed to
				t.Fatalf("Unexpected ERROR raised: %s", outErr)
			} else if test.outErrs != nil {
				// the test is supposed to fail
				
				if len(test.outErrs) == 1 && test.outErrs[0] == ANY_ERROR {
					// There should be AN error but we don't care what it was.
					if outErr == nil {
						t.Fatalf("Expected an ERROR but none was raised.")
					}
				} else {
					// check the string content of the errors
					actualErrList := outErr.(utilerrors.Aggregate).Errors()
					if !reflect.DeepEqual(test.outErrs, actualErrList) {
						t.Fatalf("Expected ERROR:\n%s\nbut got\nERROR:\n%s", test.outErrs, actualErrList)
					}
				}
			} else if !reflect.DeepEqual(outMounts, test.outMounts) {
				// the test was supposed to pass and output was supposed to match.
				t.Fatalf("Expected volumeMounts\n%#v\nbut got\n%#v", test.outMounts, outMounts)
			}
		})
	}
}

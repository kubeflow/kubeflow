package controllers

import (
	"os"
	"testing"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
)

var TestLogger = logf.Log.WithName("test-logger")

func TestSetStopAnnotation(t *testing.T) {
	// Test if the annotation gets set
	testCases := []struct {
		testName string
		meta     *metav1.ObjectMeta
	}{
		{
			testName: "Nil Metadata",
			meta:     nil,
		},
		{
			testName: "No existing Annotations",
			meta:     &metav1.ObjectMeta{},
		},
		{
			testName: "Basic case",
			meta: &metav1.ObjectMeta{
				Annotations: map[string]string{},
			},
		},
		{
			testName: "Annotation is already set",
			meta: &metav1.ObjectMeta{
				Annotations: map[string]string{
					STOP_ANNOTATION: createTimestamp(),
				},
			},
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			setStopAnnotation(c.meta, nil, TestLogger)
			if c.meta == nil {
				return
			}

			if _, ok := c.meta.Annotations[STOP_ANNOTATION]; !ok {
				t.Errorf("StopAnnotation not set for case: %+v", c)
			}
		})
	}
}

func TestStopAnnotationIsSet(t *testing.T) {
	testCases := []struct {
		testName string
		meta     metav1.ObjectMeta
		result   bool
	}{
		{
			testName: "No existing Annotations",
			meta:     metav1.ObjectMeta{},
			result:   false,
		},
		{
			testName: "Stop Annotation not Set",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{},
			},
			result: false,
		},
		{
			testName: "Annotation is already set",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					STOP_ANNOTATION: createTimestamp(),
				},
			},
			result: true,
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			if StopAnnotationIsSet(c.meta) != c.result {
				t.Errorf("Wrong result for case: %+v", c)
			}
		})
	}
}

func TestAllKernelsAreIdle(t *testing.T) {
	testCases := []struct {
		testName string
		kernels  []KernelStatus
		result   bool
	}{
		{
			testName: "/api/kernels returns an empty list of kernels.",
			kernels:  []KernelStatus{},
			result:   true,
		},
		{
			testName: "/api/kernels returns an list of idle kernels.",
			kernels: []KernelStatus{
				{
					ExecutionState: KERNEL_EXECUTION_STATE_IDLE,
				},
				{
					ExecutionState: KERNEL_EXECUTION_STATE_IDLE,
				},
			},
			result: true,
		},
		{
			testName: "/api/kernels returns an list of kernels, with one kernel in busy state.",
			kernels: []KernelStatus{
				{
					ExecutionState: KERNEL_EXECUTION_STATE_IDLE,
				},
				{
					ExecutionState: KERNEL_EXECUTION_STATE_BUSY,
				},
			},
			result: false,
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			if allKernelsAreIdle(c.kernels, TestLogger) != c.result {
				t.Errorf("Wrong result for case object: %+v\n", c.testName)
			}
		})
	}

}

func TestNotebookIsIdle(t *testing.T) {
	// Test if the annotation gets set
	testCases := []struct {
		testName string
		meta     metav1.ObjectMeta
		env      map[string]string
		result   bool
	}{
		{
			testName: "No existing Annotations",
			meta:     metav1.ObjectMeta{},
			env:      map[string]string{},
			result:   false,
		},
		{
			testName: "Basic case",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{},
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "Stop Annotation already set",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					STOP_ANNOTATION: time.Now().Format(time.RFC3339),
				},
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is not set",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{},
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is not RF3339",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: "should-fail",
				},
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is old",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: "2021-08-30T15:37:36.990063Z",
				},
			},
			env:    map[string]string{},
			result: true,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is too old",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: "1900-08-30T15:37:36.990063Z",
				},
			},
			env:    map[string]string{},
			result: true,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is the current time",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: time.Now().Format(time.RFC3339),
				},
			},
			env: map[string]string{
				"CULL_IDLE_TIME": "5",
			},
			result: false,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is 1 minute MORE than the deadline.",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: time.Now().Add(-6 * time.Minute).Format(time.RFC3339),
				},
			},
			env: map[string]string{
				"CULL_IDLE_TIME": "5",
			},
			result: true,
		},
		{
			testName: "LAST_ACTIVITY_ANNOTATION is 1 minute LESS than the deadline.",
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					LAST_ACTIVITY_ANNOTATION: time.Now().Add(-3 * time.Minute).Format(time.RFC3339),
				},
			},
			env: map[string]string{
				"CULL_IDLE_TIME": "5",
			},
			result: false,
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			for envVar, val := range c.env {
				os.Setenv(envVar, val)
			}
			initGlobalVars()
			if notebookIsIdle(c.meta, TestLogger) != c.result {
				t.Errorf("ENV VAR: %+v\n", c.env)
				t.Errorf("Wrong result for case object: %+v\n", c.meta)
			}
		})
	}
}

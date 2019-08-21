package culler

import (
	"os"
	"testing"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

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
			SetStopAnnotation(c.meta)
			if c.meta == nil {
				return
			}

			if _, ok := c.meta.Annotations[STOP_ANNOTATION]; !ok {
				t.Errorf("StopAnnotation not set for case: %+v", c)
			}
		})
	}
}

func TestRemoveStopAnnotation(t *testing.T) {
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
			testName: "Stop Annotation not Set",
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
			RemoveStopAnnotation(c.meta)
			if c.meta == nil {
				return
			}

			if _, ok := c.meta.Annotations[STOP_ANNOTATION]; ok {
				t.Errorf("Stop Annotation not removed for case: %+v", c)
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

func TestNotebookIsIdle(t *testing.T) {
	testCases := []struct {
		testName string
		status   *NotebookStatus
		env      map[string]string
		result   bool
	}{
		{
			testName: "No Notebook Status received from Server",
			status:   nil,
			env:      map[string]string{},
			result:   false,
		},
		{
			testName: "LastActivity is empty string",
			status: &NotebookStatus{
				LastActivity: "",
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LastActivity is not RF3339 formated",
			status: &NotebookStatus{
				LastActivity: "should-fail",
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LastActivity is too old",
			status: &NotebookStatus{
				LastActivity: "1996-04-11T00:00:00Z",
			},
			env:    map[string]string{},
			result: true,
		},
		{
			testName: "LastActivity is too recent",
			status: &NotebookStatus{
				LastActivity: time.Now().Format(time.RFC3339),
			},
			env:    map[string]string{},
			result: false,
		},
		{
			testName: "LastActivity until Now is 1 minute MORE than the deadline",
			status: &NotebookStatus{
				LastActivity: time.Now().Add(-6 * time.Minute).Format(time.RFC3339),
			},
			env: map[string]string{
				"IDLE_TIME": "5",
			},
			result: true,
		},
		{
			testName: "LastActivity until Now is 1 minute LESS than the deadline",
			status: &NotebookStatus{
				LastActivity: time.Now().Add(-4 * time.Minute).Format(time.RFC3339),
			},
			env: map[string]string{
				"IDLE_TIME": "5",
			},
			result: false,
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			// Apply env variables
			for envVar, val := range c.env {
				os.Setenv(envVar, val)
			}

			if notebookIsIdle("test", "kubeflow", c.status) != c.result {
				t.Errorf("Wrong result for case status: %+v", c.status)
			}
		})
	}
}

func TestNotebookNeedsCulling(t *testing.T) {
	testCases := []struct {
		testName string
		meta     metav1.ObjectMeta
		env      map[string]string
		result   bool
	}{
		{
			testName: "ENABLE_CULLING disabled",
			env: map[string]string{
				"ENABLE_CULLING": "false",
			},
			meta:   metav1.ObjectMeta{},
			result: false,
		},
		{
			testName: "Stop Annotation already set",
			env: map[string]string{
				"ENABLE_CULLING": "true",
			},
			meta: metav1.ObjectMeta{
				Annotations: map[string]string{
					STOP_ANNOTATION: time.Now().Format(time.RFC3339),
				},
			},
			result: false,
		},
	}

	for _, c := range testCases {
		t.Run(c.testName, func(t *testing.T) {
			// Apply env variables
			for envVar, val := range c.env {
				os.Setenv(envVar, val)
			}

			if NotebookNeedsCulling(c.meta) != c.result {
				t.Errorf("Wrong result for case: %+v", c)
			}
		})
	}

}

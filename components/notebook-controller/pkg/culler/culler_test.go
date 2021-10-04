package culler

import (
	"testing"

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
			SetStopAnnotation(c.meta, nil)
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

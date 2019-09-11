package app

import (
	apps "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"testing"
	"time"
)

// TestStartGC make sure gcServer will not delete active services.
func TestStartGC(t *testing.T) {
	type TestCase struct {
		// GC threshold
		thresholdInSec int
		// lastRequestTime to be set in statefulset
		lastRequestTime string
		// Expected output
		expectedValue bool
	}
	server := &gcServer{
		targetnamespace: "",
	}
	defaultTime, _ := time.Now().Add(-1 * time.Minute).MarshalText()
	tests := []TestCase{
		{
			thresholdInSec:  100,
			lastRequestTime: string(defaultTime),
			expectedValue:   false,
		},
		{
			thresholdInSec:  10,
			lastRequestTime: string(defaultTime),
			expectedValue:   true,
		},
	}
	for _, test := range tests {
		server.thresholdInSec = test.thresholdInSec
		statefulSet := &apps.StatefulSet{
			ObjectMeta: metav1.ObjectMeta{
				Name:      "test_set",
				Namespace: "test_ns",
				Annotations: map[string]string{
					LastRequestTime: test.lastRequestTime,
				},
			},
		}
		isExpired := server.IsExpired(statefulSet)
		if test.expectedValue != isExpired {
			t.Errorf("Expected: %v; output: %v", test.expectedValue, isExpired)
		}
	}
}

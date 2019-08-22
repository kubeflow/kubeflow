package app

import (
	apps "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"testing"
	"time"
)

// TestStartGC make sure gcServer will not delete active services.
func TestStartGC(t *testing.T) {
	server := &gcServer{
		targetnamespace: "",
		thresholdInSec: 100,
	}
	currTime, _ := time.Now().MarshalText()
	statefulSet := &apps.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "test_set",
			Namespace: "test_ns",
			Annotations: map[string]string{
				LastRequestTime: string(currTime),
			},
		},
	}
	err := server.GCResources(statefulSet)
	if _, ok := err.(ActiveError); !ok {
		t.Errorf("GCServer deleted active resource: %v", err)
	}
}

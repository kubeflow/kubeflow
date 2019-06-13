package app

import (
	"fmt"
	"github.com/cenkalti/backoff"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/prometheus/common/log"
	"golang.org/x/net/context"
	"io/ioutil"
	"net/http"
	"testing"
	"time"
)

// TestKfctlClientServerSmoke runs a smoke test of the KfctlServer.
// We start the KfctlServer in a background thread and then try sending a request using the client.
// The client should return a suitable error since the server doesn't have valid credentials or a project.
func TestKfctlClientServerSmoke(t *testing.T) {
	//go func() {
	//	Run(&options.ServerOption{
	//		Mode: "kfctl",
	//		KeepAlive: true,
	//	})

	log.Info("Creating server")

	dir, err := ioutil.TempDir("", "kfctl-test")
	if err != nil {
		t.Fatalf("Could not create temporary directory; %v", err)
	}
	ksServer, err := NewServer(dir, []*kstypes.RegistryConfig{}, "", false)
	if err != nil {
		t.Errorf("There was a problem starting the server %+v", err)
	}

	kfctlServer, err := NewKfctlServer()
	if err != nil {
		t.Errorf("There was a problem starting the kfctl servier %+v", err)
	}

	kfctlServer.RegisterEndpoints()

	go func() {
		ksServer.StartHttp(0)
	}()

	b := backoff.NewExponentialBackOff()
	b.InitialInterval = 3 * time.Second
	b.MaxInterval = 30 * time.Second
	b.MaxElapsedTime = 1 * time.Minute

	// Wait for server to be ready
	err = backoff.Retry(func() error {
		if ksServer.Addr() == nil {
			return fmt.Errorf("Waiting for server to start")
		}
		return nil
	}, b)

	if err != nil {
		t.Errorf("There was a problem starting the servier %+v", err)
	}

	t.Logf("Connecting to server: %v", ksServer.Addr().String())
	c, err := NewKfctlClient(ksServer.Addr().String())

	if err != nil {
		t.Errorf("There was a problem starting the server %+v", err)
	}

	_, err = c.CreateDeployment(context.Background(), CreateRequest{})

	h, ok := err.(*httpError)

	if !ok {
		t.Errorf("Want httpError got %+v", err)
	}

	if h.Code != http.StatusNotImplemented {
		t.Errorf("Status code: Want %v got %+v", http.StatusNotImplemented, h.Code)
	}
}

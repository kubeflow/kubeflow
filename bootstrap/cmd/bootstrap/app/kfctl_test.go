package app

import (
	"fmt"
	"github.com/cenkalti/backoff"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/prometheus/common/log"
	"golang.org/x/net/context"
	"io/ioutil"
	"testing"
	"time"
)

// TestKfctlClientServerSmoke runs a smoke test of the KfctlServer.
// We start the KfctlServer in a background thread and then try sending a request using the client.
// The client should return a suitable error since the server doesn't have valid credentials or a project.
//
// TODO(jlewi): The purpose of this test is to test all the encoding/decoding that happens
// on the server & client using go-kit. This test would work better by substiting in a KfctlService
// for the server that allows us to exactly control the response. We could then
// run various tests in terms of returning KfDef and httpErrors and verifying the client
// gets the correct value.
func TestKfctlClientServer_GoKit(t *testing.T) {
	log.Info("Creating server")

	dir, err := ioutil.TempDir("", "kfctl-test")
	if err != nil {
		t.Fatalf("Could not create temporary directory; %v", err)
	}
	ksServer, err := NewServer(dir, []*kstypes.RegistryConfig{}, "", false)
	if err != nil {
		t.Errorf("There was a problem starting the server %+v", err)
	}

	appDir, err := ioutil.TempDir("", "")

	if err != nil {
		t.Fatalf("Error creating temporary directory; error %v", err)
	}
	kfctlServer, err := NewKfctlServer(appDir)
	if err != nil {
		t.Errorf("There was a problem starting the kfctl servier %+v", err)
	}

	kfctlServer.ts = &FakeRefreshableTokenSource{}
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

	ctx, _ := context.WithTimeout(context.Background(), 3 * time.Second)
	_, err = c.CreateDeployment(ctx, kfdefsv3.KfDef{
		Spec: kfdefsv3.KfDefSpec{
			Secrets: []kfdefsv3.Secret{
				{
					Name: gcp.GcpAccessTokenName,
					SecretSource: &kfdefsv3.SecretSource{
						LiteralSource: &kfdefsv3.LiteralSource{
							Value: "1234",
						},
					},
				},
			},
		},
	})
}

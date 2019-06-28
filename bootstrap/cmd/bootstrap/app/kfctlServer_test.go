package app

import (
	"context"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/coordinator/fake"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"golang.org/x/oauth2"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"reflect"
	"testing"
)

type FakeRefreshableTokenSource struct {
	token string
}

func (ts *FakeRefreshableTokenSource) Refresh(newToken oauth2.Token) error {
	ts.token = newToken.AccessToken
	return nil
}

func (ts *FakeRefreshableTokenSource) Token() (*oauth2.Token, error) {
	return &oauth2.Token{AccessToken: ts.token}, nil
}

func TestKfctlServer_CreateDeployment(t *testing.T) {
	ts := &FakeRefreshableTokenSource{}

	s := &kfctlServer{
		ts: ts,
		c:  make(chan kfdefsv2.KfDef, 1),
		latestKfDef: kfdefsv2.KfDef{
			ObjectMeta: metav1.ObjectMeta{
				Name: "input",
			},
			Spec: kfdefsv2.KfDefSpec{
				Secrets: []kfdefsv2.Secret{
					{
						Name: gcp.GcpAccessTokenName,
						SecretSource: &kfdefsv2.SecretSource{
							LiteralSource: &kfdefsv2.LiteralSource{
								Value: "access1234",
							},
						},
					},
				},
			},
		},
	}

	req := kfdefsv2.KfDef{
		ObjectMeta: metav1.ObjectMeta{
			Name: "input",
		},
		Spec: kfdefsv2.KfDefSpec{
			Secrets: []kfdefsv2.Secret{
				{
					Name: gcp.GcpAccessTokenName,
					SecretSource: &kfdefsv2.SecretSource{
						LiteralSource: &kfdefsv2.LiteralSource{
							Value: "access1234",
						},
					},
				},
			},
		},
	}

	ctx := context.Background()

	res, err := s.CreateDeployment(ctx, req)

	if err != nil {
		t.Fatalf("CreateDeployment error; %v", err)
	}

	if !reflect.DeepEqual(*res, s.latestKfDef) {
		pWant, _ := Pformat(s.latestKfDef)
		pActual, _ := Pformat(res)
		t.Errorf("Incorrect CreateDeployment Response:got\n:%v\nwant:%v", pActual, pWant)
	}

	v := <-s.c

	if !reflect.DeepEqual(req, v) {
		pWant, _ := Pformat(req)
		pActual, _ := Pformat(v)
		t.Errorf("Incorrect CreateDeployment on channel :got\n:%v\nwant:%v", pActual, pWant)
	}

	expectedToken := "access1234"

	if expectedToken != ts.token {
		t.Errorf("Refresh token not reset; got %v; want %v", ts.token, expectedToken)
	}
}

func TestKfctlServer_HandleDeployment(t *testing.T) {
	appsDir, err := ioutil.TempDir("", "")

	if err != nil {
		t.Fatalf("Could not create temorary directory error %v", err)
	}

	ts := &FakeRefreshableTokenSource{}

	s := kfctlServer{
		builder: &fake.FakeBuilder{
		},
		appsDir: appsDir,
		ts: ts,
	}

	req := &kfdefsv2.KfDef{
	}

	req.SetPluginSpec(kftypes.GCP, &gcp.GcpPluginSpec{})
	_, err = s.handleDeployment(*req)

	if err != nil {
		t.Fatalf("handleDeployment returned error %v", err)
	}

}
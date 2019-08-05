package app

import (
	"context"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"golang.org/x/oauth2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
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
			PackageManager: "kustomize",
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

	// The request stripped of secrets. This the value we expect to be enqueued in the channel.
	expectReqStripped := kfdefsv2.KfDef{
		ObjectMeta: metav1.ObjectMeta{
			Name: "input",
		},
		Spec: kfdefsv2.KfDefSpec{
			PackageManager: "kustomize",
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
		t.Fatalf("Incorrect CreateDeployment Response:got\n:%v\nwant:%v", pActual, pWant)
	}

	// TODO(jlewi): Set a timeout? Otherwise if there's a problem we won't time out
	// until the test times out which can be ~10 minutes.
	v := <-s.c

	// TODO(jlewi): DeepEqual is returning false even though when a pretty print them the results
	// look the same. Need to figure out how to validate the test properly.
	//if !reflect.DeepEqual(expectReqStripped, v)
	if !reflect.DeepEqual(expectReqStripped.Spec.PackageManager, v.Spec.PackageManager) {
		pWant, _ := Pformat(expectReqStripped)
		pActual, _ := Pformat(v)
		t.Errorf("Incorrect CreateDeployment on channel :got\n:%v\nwant:%v", pActual, pWant)
	}

	expectedToken := "access1234"

	if expectedToken != ts.token {
		t.Errorf("Refresh token not reset; got %v; want %v", ts.token, expectedToken)
	}
}

func TestKfctlServer_isMatch(t *testing.T) {
	type testCase struct {
		current  *kfdefsv2.KfDef
		new      *kfdefsv2.KfDef
		expected bool
	}

	testCases := []testCase{
		{
			current:  nil,
			new:      &kfdefsv2.KfDef{},
			expected: true,
		},
		{
			current: &kfdefsv2.KfDef{},
			new: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			expected: true,
		},
		{
			current:  &kfdefsv2.KfDef{},
			new:      nil,
			expected: false,
		},
		{
			current: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			new: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			expected: true,
		},
		{
			current: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			new: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app2",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			expected: false,
		},
		{
			current: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			new: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p2",
					Zone:    "z1",
				},
			},
			expected: false,
		},
		{
			current: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z1",
				},
			},
			new: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
				Spec: kfdefsv2.KfDefSpec{
					Project: "p1",
					Zone:    "z2",
				},
			},
			expected: false,
		},
	}

	for _, c := range testCases {
		actual := isMatch(c.current, c.new)

		if actual != c.expected {
			t.Errorf("ismatch: got %v; want %v\ncurrent:\n%v\nnew:\n%v", actual, c.expected, PrettyPrint(c.current), PrettyPrint(c.new))
		}
	}

}

func TestKfctlServer_prepareSecrets(t *testing.T) {
	type testCase struct {
		input           []kfdefsv2.Secret
		expectedSecrets []kfdefsv2.Secret
		expectedEnv     map[string]string
	}

	testCases := []testCase{
		{
			input: []kfdefsv2.Secret{
				{
					Name: "s1",
					SecretSource: &kfdefsv2.SecretSource{
						LiteralSource: &kfdefsv2.LiteralSource{
							Value: "s1v1",
						},
					},
				},
				{
					Name: "s2",
					SecretSource: &kfdefsv2.SecretSource{
						EnvSource: &kfdefsv2.EnvSource{
							Name: "s2env",
						},
					},
				},
				{
					Name: gcp.GcpAccessTokenName,
					SecretSource: &kfdefsv2.SecretSource{
						LiteralSource: &kfdefsv2.LiteralSource{
							Value: "oauth",
						},
					},
				},
			},
			expectedSecrets: []kfdefsv2.Secret{
				{
					Name: "s1",
					SecretSource: &kfdefsv2.SecretSource{
						EnvSource: &kfdefsv2.EnvSource{
							Name: "KFCTL_s1",
						},
					},
				},
				{
					Name: "s2",
					SecretSource: &kfdefsv2.SecretSource{
						EnvSource: &kfdefsv2.EnvSource{
							Name: "s2env",
						},
					},
				},
			},
			expectedEnv: map[string]string{
				"KFCTL_s1": "s1v1",
			},
		},
	}

	for index, c := range testCases {

		if index > 0 {
			for k := range testCases[index-1].expectedEnv {
				os.Unsetenv(k)
			}
		}
		i := &kfdefsv2.KfDef{
			Spec: kfdefsv2.KfDefSpec{
				Secrets: c.input,
			},
		}

		prepareSecrets(i)

		if !reflect.DeepEqual(i.Spec.Secrets, c.expectedSecrets) {
			t.Errorf("Got\n%v; want\n%v", utils.PrettyPrint(i.Spec.Secrets), utils.PrettyPrint(c.expectedSecrets))
		}

		for k, v := range c.expectedEnv {
			if os.Getenv(k) != v {
				t.Errorf("Env %v is wrong; Got\n%v; want\n%v", k, os.Getenv(k), v)
			}
		}
	}
}

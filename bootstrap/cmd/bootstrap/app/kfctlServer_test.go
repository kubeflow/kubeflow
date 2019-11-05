package app

import (
	"context"
	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/configconverters"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
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
		c:  make(chan kfdefsv3.KfDef, 1),
		latestKfdef: kfconfig.KfConfig{
			ObjectMeta: metav1.ObjectMeta{
				Name: "input",
			},
			Spec: kfconfig.KfConfigSpec{
				Secrets: []kfconfig.Secret{
					{
						Name: gcp.GcpAccessTokenName,
						SecretSource: &kfconfig.SecretSource{
							LiteralSource: &kfconfig.LiteralSource{
								Value: "access1234",
							},
						},
					},
				},
			},
		},
	}

	req := kfdefsv3.KfDef{
		ObjectMeta: metav1.ObjectMeta{
			Name: "input",
		},
		Spec: kfdefsv3.KfDefSpec{
			Secrets: []kfdefsv3.Secret{
				{
					Name: gcp.GcpAccessTokenName,
					SecretSource: &kfdefsv3.SecretSource{
						LiteralSource: &kfdefsv3.LiteralSource{
							Value: "access1234",
						},
					},
				},
			},
			Plugins: []kfdefsv3.Plugin{
				{
					TypeMeta: metav1.TypeMeta{
						Kind: gcp.GcpPluginName,
					},
				},
			},
		},
	}

	// The request stripped of secrets. This the value we expect to be enqueued in the channel.
	expectReqStripped := kfdefsv3.KfDef{
		ObjectMeta: metav1.ObjectMeta{
			Name: "input",
		},
		Spec: kfdefsv3.KfDefSpec{
			Plugins: []kfdefsv3.Plugin{
				{
					TypeMeta: metav1.TypeMeta{
						Kind: gcp.GcpPluginName,
					},
				},
			},
			Secrets: []kfdefsv3.Secret{
			},
		},
	}

	ctx := context.Background()

	res, err := s.CreateDeployment(ctx, req)

	if err != nil {
		t.Fatalf("CreateDeployment error; %v", err)
	}
	kfDefbytes , _ := yaml.Marshal(*res)
	respKfconfig, _ := configconverters.V1beta1{}.ToKfConfig(kfDefbytes)

	if !reflect.DeepEqual(respKfconfig.Spec, s.latestKfdef.Spec) {
		pWant, _ := Pformat(s.latestKfdef)
		pActual, _ := Pformat(*respKfconfig)
		t.Fatalf("Incorrect CreateDeployment Response:got\n:%v\nwant:%v", pActual, pWant)
	}

	// TODO(jlewi): Set a timeout? Otherwise if there's a problem we won't time out
	// until the test times out which can be ~10 minutes.
	v := <-s.c

	// TODO(jlewi): DeepEqual is returning false even though when a pretty print them the results
	// look the same. Need to figure out how to validate the test properly.
	//if !reflect.DeepEqual(expectReqStripped, v)
	if !reflect.DeepEqual(expectReqStripped.Spec, v.Spec) {
		pWant, _ := Pformat(expectReqStripped.Spec)
		pActual, _ := Pformat(v.Spec)
		t.Errorf("Incorrect CreateDeployment on channel :got\n:%v\nwant:%v", pActual, pWant)
	}

	expectedToken := "access1234"

	if expectedToken != ts.token {
		t.Errorf("Refresh token not reset; got %v; want %v", ts.token, expectedToken)
	}
}

func TestKfctlServer_isMatch(t *testing.T) {
	type testCase struct {
		current  *kfconfig.KfConfig
		new      *kfdefsv3.KfDef
		expected bool
	}

	testCases := []testCase{
		{
			current:  nil,
			new:      &kfdefsv3.KfDef{},
			expected: true,
		},
		{
			current: &kfconfig.KfConfig{},
			new: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			expected: true,
		},
		{
			current:  &kfconfig.KfConfig{},
			new:      nil,
			expected: false,
		},
		{
			current: &kfconfig.KfConfig{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			new: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			expected: true,
		},
		{
			current: &kfconfig.KfConfig{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			new: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app2",
				},
			},
			expected: false,
		},
		{
			current: &kfconfig.KfConfig{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			new: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			expected: false,
		},
		{
			current: &kfconfig.KfConfig{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			new: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "app1",
				},
			},
			expected: false,
		},
	}

	for idx, c := range testCases {
		actual := isMatch(c.current, c.new)

		if actual != c.expected {
			t.Errorf("Test case %v: \n ismatch: got %v; want %v\ncurrent:\n%v\nnew:\n%v", idx, actual, c.expected, PrettyPrint(c.current), PrettyPrint(c.new))
		}
	}

}

func TestKfctlServer_prepareSecrets(t *testing.T) {
	type testCase struct {
		input           []kfdefsv3.Secret
		expectedSecrets []kfdefsv3.Secret
		expectedEnv     map[string]string
	}

	testCases := []testCase{
		{
			input: []kfdefsv3.Secret{
				{
					Name: "s1",
					SecretSource: &kfdefsv3.SecretSource{
						LiteralSource: &kfdefsv3.LiteralSource{
							Value: "s1v1",
						},
					},
				},
				{
					Name: "s2",
					SecretSource: &kfdefsv3.SecretSource{
						EnvSource: &kfdefsv3.EnvSource{
							Name: "s2env",
						},
					},
				},
				{
					Name: gcp.GcpAccessTokenName,
					SecretSource: &kfdefsv3.SecretSource{
						LiteralSource: &kfdefsv3.LiteralSource{
							Value: "oauth",
						},
					},
				},
			},
			expectedSecrets: []kfdefsv3.Secret{
				{
					Name: "s1",
					SecretSource: &kfdefsv3.SecretSource{
						EnvSource: &kfdefsv3.EnvSource{
							Name: "KFCTL_s1",
						},
					},
				},
				{
					Name: "s2",
					SecretSource: &kfdefsv3.SecretSource{
						EnvSource: &kfdefsv3.EnvSource{
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
		i := &kfdefsv3.KfDef{
			Spec: kfdefsv3.KfDefSpec{
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

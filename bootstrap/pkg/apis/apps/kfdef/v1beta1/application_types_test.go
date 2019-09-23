package v1beta1

import (
	"github.com/ghodss/yaml"
	kfutils "github.com/kubeflow/kfctl/v3/pkg/utils"
	"github.com/prometheus/common/log"
	"io/ioutil"
	"k8s.io/api/core/v1"
	"os"
	"path"
	"reflect"
	"testing"
)

type FakeOAuthSecret struct {
	Name string `json:"name,omitempty"`
}

type FakeIap struct {
	OAuthClientId     string          `json:"oAuthClientId,omitempty"`
	OAuthClientSecret FakeOAuthSecret `json:"oAuthClientSecret,omitempty"`
}

type FakeAuth struct {
	Iap FakeIap `json:"iap,omitempty"`
}

type GcpFakePluginSpec struct {
	Auth                            FakeAuth `json:"auth,omitempty"`
	CreatePipelinePersistentStorage bool     `json:"createPipelinePersistentStorage,omitempty"`
}

func TestKfDef_GetPluginSpec(t *testing.T) {
	// Test that we can properly parse the gcp structs.
	type testCase struct {
		Filename   string
		PluginName string
		Expected   *GcpFakePluginSpec
	}

	cases := []testCase{
		{
			Filename:   "kfctl_plugin_test.yaml",
			PluginName: "gcp-fake-plugin",
			Expected: &GcpFakePluginSpec{
				Auth: FakeAuth{
					Iap: FakeIap{
						OAuthClientId: "foo-user",
						OAuthClientSecret: FakeOAuthSecret{
							Name: "CLIENT_SECRET",
						},
					},
				},
				CreatePipelinePersistentStorage: true,
			},
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Filename)

		buf, bufErr := ioutil.ReadFile(fPath)
		if bufErr != nil {
			t.Fatalf("Error reading file %v; error %v", fPath, bufErr)
		}

		log.Infof("Want ")
		d := &KfDef{}
		err := yaml.Unmarshal(buf, d)
		if err != nil {
			t.Fatalf("Could not parse as KfDef error %v", err)
		}

		actual := &GcpFakePluginSpec{}
		err = d.GetPluginSpec(c.PluginName, actual)

		if err != nil {
			t.Fatalf("Could not get plugin spec; error %v", err)
		}

		if !reflect.DeepEqual(actual, c.Expected) {
			pGot := kfutils.PrettyPrint(actual)
			pWant := kfutils.PrettyPrint(c.Expected)
			t.Errorf("Error parsing plugin spec got;\n%v\nwant;\n%v", pGot, pWant)
		}
	}
}

func TestKfDef_ConditionStatus(t *testing.T) {
	type testCase struct {
		Type    KfDefConditionType
		Status  v1.ConditionStatus
		Name    string
		Reason  string
		Message string
	}

	cases := []testCase{
		testCase{
			Type:    KfAWSPluginSucceeded,
			Status:  v1.ConditionFalse,
			Message: "foo status",
		},
		testCase{
			Type:    KfGCPPluginSucceeded,
			Status:  v1.ConditionTrue,
			Message: "bar status",
		},
	}

	for _, c := range cases {
		kfdef := KfDef{}
		kfdef.SetCondition(c.Type, c.Status, c.Reason, c.Message)

		cond, err := kfdef.GetCondition(c.Type)
		if err != nil {
			t.Fatalf("error when getting condition: %v", err)
		}
		if cond == nil {
			t.Fatalf("condition returned is nil")
		}
		if cond.Type != c.Type || cond.Status != c.Status ||
			cond.Reason != c.Reason || cond.Message != c.Message {
			t.Errorf("condition returned doesn't match the condition set;\nexpected\n%v\ngot\n%v",
				kfutils.PrettyPrint(c),
				kfutils.PrettyPrint(cond))
		}
	}
}

func TestKfDef_SetPluginStatus(t *testing.T) {
	type testCase struct {
		PluginKind string
		Failed     bool
		Expected   bool
	}

	cases := []testCase{
		testCase{
			PluginKind: "KfGcpPlugin",
			Failed:     false,
			Expected:   true,
		},
		testCase{
			PluginKind: "KfExistingArriktoPlugin",
			Failed:     false,
			Expected:   true,
		},
		testCase{
			PluginKind: "KfMinikubePlugin",
			Failed:     true,
			Expected:   true,
		},
	}

	for _, c := range cases {
		kfdef := KfDef{}
		if c.Failed {
			kfdef.SetPluginFailed(c.PluginKind, "")
		} else {
			kfdef.SetPluginFinished(c.PluginKind, "")
		}
		actual := false
		if c.Failed {
			actual = kfdef.IsPluginFailed(c.PluginKind)
		} else {
			actual = kfdef.IsPluginFinished(c.PluginKind)
		}
		if actual != c.Expected {
			t.Errorf("IsPluginFinished doesn't returned expected value; expected %v; got %v",
				c.Expected, actual)
		}
	}
}

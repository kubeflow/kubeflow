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

func TestKfDef_PluginStatus(t *testing.T) {
	type testCase struct {
		kfdef KfDef
		name  string

		pluginKind string
		expected   bool
	}

	cases := []testCase{
		testCase{
			kfdef: KfDef{
				Status: KfDefStatus{
					Conditions: []KfDefCondition{
						KfDefCondition{
							Type:   KfAWSPluginSucceeded,
							Status: v1.ConditionTrue,
						},
					},
				},
			},
			pluginKind: "KfAwsPlugin",
			expected:   true,
		},
		testCase{
			kfdef: KfDef{
				Status: KfDefStatus{
					Conditions: []KfDefCondition{
						KfDefCondition{
							Type:   KfExistingArriktoPluginSucceeded,
							Status: v1.ConditionFalse,
						},
					},
				},
			},
			pluginKind: "KfExistingArriktoPlugin",
			expected:   false,
		},
	}

	for _, c := range cases {
		if c.kfdef.IsPluginFinished(c.pluginKind) != c.expected {
			t.Errorf("IsPluginFinished doesn't matched expected; expected %v; got %v",
				c.expected, c.kfdef.IsPluginFinished(c.pluginKind))
		}
	}
}

func TestKfDef_SetPluginFinished(t *testing.T) {
	type testCase struct {
		pluginKind string
		expected   bool
	}

	cases := []testCase{
		testCase{
			pluginKind: "KfGcpPlugin",
			expected:   true,
		},
		testCase{
			pluginKind: "KfExistingArriktoPlugin",
			expected:   true,
		},
	}

	for _, c := range cases {
		kfdef := KfDef{}
		kfdef.SetPluginFinished(c.pluginKind)
		actual := kfdef.IsPluginFinished(c.pluginKind)
		if actual != c.expected {
			t.Errorf("IsPluginFinished doesn't returned expected value; expected %v; got %v",
				c.expected, actual)
		}
	}
}

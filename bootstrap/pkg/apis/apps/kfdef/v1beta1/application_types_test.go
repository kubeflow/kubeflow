package v1beta1

import (
	"github.com/ghodss/yaml"
	kfutils "github.com/kubeflow/kfctl/v3/pkg/utils"
	"github.com/prometheus/common/log"
	"io/ioutil"
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

package gcp

import (
	"encoding/json"
	"io/ioutil"
	"github.com/ghodss/yaml"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"os"
	"path"
	"reflect"
	"testing"
)

func TestGcp_ParsePlugin(t *testing.T) {
	// Test that we can properly parse the gcp structs.
	type testCase struct {
		Filename string
		Expected *GcpPluginSpec
	}


	cases := []testCase {
		{
			Filename: "kfctl_gcp.yaml",
			Expected: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "someuser",
						Password: &kfdefs.SecretRef{
							Name: "password",
						},
					},
				},
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

		d := &kfdefs.KfDef{}
		err := yaml.Unmarshal(buf, d)
		if err != nil {
			t.Fatalf("Could not parse as KfDef error %v", err)
		}

		args := d.Spec.Plugins[0].Args

		argBytes, err := yaml.Marshal(args)

		if err != nil {
			t.Fatalf("Could not marsh args; error %v", err)
		}

		p  := &GcpPlugin{}
		err = yaml.Unmarshal(argBytes, p)

		if err != nil {
			t.Fatalf("Could not unmarshal as GcpPlugin; error %v", err)
		}

		pWant, _ := Pformat(c.Expected)
		t.Logf("Want\n%v", pWant)
		//if !ok {
		//	pGot, _ := Pformat(args)
		//	t.Fatalf("Could not assert plugin args as type GcpPlugin; Got\n%v", pGot)
		//}

		if !reflect.DeepEqual(p, c.Expected) {
			pGot, _ := Pformat(p)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error parsing plugin parameters got;\n%v\nwant;\n%v", pGot, pWant)
		}
	}
}

// Pformat returns a pretty format output of any value.
func Pformat(value interface{}) (string, error) {
	if s, ok := value.(string); ok {
		return s, nil
	}
	valueJson, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return "", err
	}
	return string(valueJson), nil
}

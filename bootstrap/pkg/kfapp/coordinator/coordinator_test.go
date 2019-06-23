package coordinator

import (
	"encoding/json"
	"reflect"
	"testing"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

func Test_backfillKfDefFromOptions(t *testing.T) {
	type testCase struct {
		Input    kfdefsv2.KfDef
		Options map[string]interface{}
		Expected kfdefsv2.KfDef
	}

	cases := []testCase{
		// Basic auth should populate the GCP plugin
		{
			Input: kfdefsv2.KfDef{},
			Options: map[string]interface{} {
				string(kftypes.USE_BASIC_AUTH): true,
				string(kftypes.PLATFORM) : kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin {
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name: "username",
									SecretRef: &kfdefsv2.SecretRef{
										Name: "username",
									},
								},
								{
									Name: "password",
									SecretRef: &kfdefsv2.SecretRef{
										Name: "password",
									},
								},
							},
						},
					},
					Secrets: []kfdefsv2.Secret{
						{
							Name: "username",
							SecretSource: &kfdefsv2.SecretSource{
								EnvSource: &kfdefsv2.EnvSource{
									Name: kftypes.KUBEFLOW_USERNAME,
								},
							},
						},
						{
							Name: "password",
							SecretSource: &kfdefsv2.SecretSource{
								EnvSource: &kfdefsv2.EnvSource{
									Name: kftypes.KUBEFLOW_PASSWORD,
								},
							},
						},
					},
				},
			},
		},
	}

	for _, c := range cases {
		i := &kfdefsv2.KfDef{}
		*i = c.Input
		err := backfillKfDefFromOptions(i, c.Options)
		if err != nil {
			t.Errorf("Error backfilling KfDef error %v", err)
		}

		if !reflect.DeepEqual(*i, c.Expected) {
			pGot, _ := Pformat(i)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error backfilling KfDef got;\n%v\nwant;\n%v", pGot, pWant)
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

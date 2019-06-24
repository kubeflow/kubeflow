package coordinator

import (
	"encoding/json"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"reflect"
	"testing"
)

func Test_backfillKfDefFromOptions(t *testing.T) {
	type testCase struct {
		Input    kfdefsv2.KfDef
		Options  map[string]interface{}
		Expected kfdefsv2.KfDef
	}

	cases := []testCase{
		// Basic auth should populate the GCP plugin
		{
			Input: kfdefsv2.KfDef{},
			Options: map[string]interface{}{
				string(kftypes.USE_BASIC_AUTH): true,
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
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
		// If basic auth is explicitly set then it shouldn't be ovewriten.
		{
			Input: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name:  "username",
									Value: "someusername",
								},
								{
									Name:  "password",
									Value: "somepassword",
								},
							},
						},
					},
				},
			},
			Options: map[string]interface{}{
				string(kftypes.USE_BASIC_AUTH): true,
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name:  "username",
									Value: "someusername",
								},
								{
									Name:  "password",
									Value: "somepassword",
								},
							},
						},
					},
				},
			},
		},
		// GCP IAP auth should populate the GCP plugin with client id and client secret
		// from environment variables.
		{
			Input: kfdefsv2.KfDef{},
			Options: map[string]interface{}{
				string(kftypes.USE_BASIC_AUTH): false,
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name: "iapOauthClientId",
									SecretRef: &kfdefsv2.SecretRef{
										Name: "iapOauthClientId",
									},
								},
								{
									Name: "iapOauthClientSecret",
									SecretRef: &kfdefsv2.SecretRef{
										Name: "iapOauthClientSecret",
									},
								},
							},
						},
					},
					Secrets: []kfdefsv2.Secret{
						{
							Name: "iapOauthClientId",
							SecretSource: &kfdefsv2.SecretSource{
								EnvSource: &kfdefsv2.EnvSource{
									Name: gcp.CLIENT_ID,
								},
							},
						},
						{
							Name: "iapOauthClientSecret",
							SecretSource: &kfdefsv2.SecretSource{
								EnvSource: &kfdefsv2.EnvSource{
									Name: gcp.CLIENT_SECRET,
								},
							},
						},
					},
				},
			},
		},
		// GCP IAP auth client id and client secret are explicitly set in the input spec
		// so they should not be overwritten.
		{
			Input: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name:  "iapOauthClientId",
									Value: "someclient",
								},
								{
									Name:  "iapOauthClientSecret",
									Value: "somesecret",
								},
							},
						},
					},
				},
			},
			Options: map[string]interface{}{
				string(kftypes.USE_BASIC_AUTH): false,
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					Plugins: []kfdefsv2.Plugin{
						{
							Name: "gcp",
							Parameters: []kfdefsv2.PluginParameter{
								{
									Name:  "iapOauthClientId",
									Value: "someclient",
								},
								{
									Name:  "iapOauthClientSecret",
									Value: "somesecret",
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

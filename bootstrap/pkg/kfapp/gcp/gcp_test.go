package gcp

import (
	"encoding/json"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"k8s.io/api/v2/core/v1"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"reflect"
	"testing"
)

func TestGcp_buildBasicAuthSecret(t *testing.T) {
	type testCase struct {
		Gcp           *Gcp
		GcpPluginSpec *GcpPluginSpec
		Expected      *v1.Secret
	}

	encodedPassword, err := base64EncryptPassword("somepassword")

	if err != nil {
		t.Fatalf("Could not encode password; %v", err)
	}

	cases := []testCase{
		{
			Gcp: &Gcp{
				kfDef: &kfdefs.KfDef{
					ObjectMeta: metav1.ObjectMeta{
						Namespace: "gcpnamespace",
					},
					Spec: kfdefs.KfDefSpec{
						Plugins: []kfdefs.Plugin{
							{
								Name: "gcp",
							},
						},
						Secrets: []kfdefs.Secret{
							{
								Name: "passwordSecret",
								SecretSource: &kfdefs.SecretSource{
									LiteralSource: &kfdefs.LiteralSource{
										Value: "somepassword",
									},
								},
							},
						},
					},
				},
			},
			GcpPluginSpec: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "kfuser",
						Password: &kfdefs.SecretRef{
							Name: "passwordSecret",
						},
					},
				},
			},
			Expected: &v1.Secret{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "kubeflow-login",
					Namespace: "gcpnamespace",
				},
				Data: map[string][]byte{
					"passwordhash": []byte(encodedPassword),
					"username":     []byte("kfuser"),
				},
			},
		},
	}

	for _, c := range cases {

		err := c.Gcp.kfDef.SetPluginSpec("gcp", c.GcpPluginSpec)

		if err != nil {
			t.Fatalf("Could not set pluginspec")
		}
		actual, err := c.Gcp.buildBasicAuthSecret()

		if err != nil {
			t.Fatalf("Could not get build secret; error %v", err)
		}

		if !reflect.DeepEqual(actual.TypeMeta, c.Expected.TypeMeta) {
			pGot, _ := Pformat(actual.TypeMeta)
			pWant, _ := Pformat(c.Expected.TypeMeta)
			t.Errorf("Error building secret TypeMeta got;\n%v\nwant;\n%v", pGot, pWant)
		}

		for _, k := range []string{"username", "passwordHash"} {
			if string(actual.Data[k]) != string(c.Expected.Data[k]) {
				pGot, _ := actual.Data[k]
				pWant, _ := c.Expected.Data[k]
				t.Errorf("Error building secret Key %v got;\n%v\nwant;\n%v", k, pGot, pWant)
			}
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

package gcp

import (
	"encoding/json"
	"github.com/gogo/protobuf/proto"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"

	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
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

func TestGcp_setGcpPluginDefaults(t *testing.T) {
	type testCase struct {
		Name          string
		Input         *kfdefs.KfDef
		InputSpec     *GcpPluginSpec
		Env           map[string]string
		EmailGetter   func() (string, error)
		Expected      *GcpPluginSpec
		ExpectedEmail string
	}

	cases := []testCase{
		{
			Name: "no-plugin-basic-auth",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: true,
				},
			},
			Env: map[string]string{
				kftypes.KUBEFLOW_USERNAME: "someuser",
				kftypes.KUBEFLOW_PASSWORD: "password",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "someuser",
						Password: &kfdefs.SecretRef{
							Name: BasicAuthPasswordSecretName,
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
		},
		{
			Name: "no-plugin-iap",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "someclient",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: CLIENT_SECRET,
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
		},
		{
			Name: "set-email",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "someclient",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: CLIENT_SECRET,
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
			EmailGetter: func() (string, error) {
				return "myemail", nil
			},
			ExpectedEmail: "myemail",
		},
		{
			// Make sure emails get trimmed.
			Name: "trim-email",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "someclient",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: CLIENT_SECRET,
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
			EmailGetter: func() (string, error) {
				return "\nmyemail\n", nil
			},
			ExpectedEmail: "myemail",
		},
		// Verify that we don't override createPipelinePersistentStorage.
		{
			// Make sure emails get trimmed.
			Name: "no-override",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			InputSpec: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(false),
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(false),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "someclient",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: CLIENT_SECRET,
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
			EmailGetter: func() (string, error) {
				return "\nmyemail\n", nil
			},
			ExpectedEmail: "myemail",
		},
		{
			Name: "iap-not-overwritten",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			InputSpec: &GcpPluginSpec{
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "original_client",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "original_client",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
		},
		{
			Name: "basic-auth-not-overwritten",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			InputSpec: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "original_user",
						Password: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "original_user",
						Password: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "kubeflow",
						Path: "deployment/gke/deployment_manager_configs",
					},
				},
			},
		},
		{
			Name: "dm-configs-not-overwritten",
			Input: &kfdefs.KfDef{
				Spec: kfdefs.KfDefSpec{
					UseBasicAuth: false,
				},
			},
			InputSpec: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "original_user",
						Password: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "somerepo",
						Path: "somepath",
					},
				},
			},
			Env: map[string]string{
				CLIENT_ID: "someclient",
			},
			Expected: &GcpPluginSpec{
				CreatePipelinePersistentStorage: proto.Bool(true),
				EnableWorkloadIdentity:          proto.Bool(false),
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "original_user",
						Password: &kfdefs.SecretRef{
							Name: "original_secret",
						},
					},
				},
				DeploymentManagerConfig: &DeploymentManagerConfig{
					RepoRef: &kfdefs.RepoRef{
						Name: "somerepo",
						Path: "somepath",
					},
				},
			},
		},
	}

	for index, c := range cases {
		if index > 0 {
			// Unset previous environment variables
			for k, _ := range cases[index-1].Env {
				os.Unsetenv(k)
			}
		}

		for k, v := range c.Env {
			os.Setenv(k, v)
		}

		i := c.Input.DeepCopy()

		if c.InputSpec != nil {
			i.SetPluginSpec(GcpPluginName, c.InputSpec)
		}

		gcp := &Gcp{
			kfDef:            i,
			gcpAccountGetter: c.EmailGetter,
		}

		if err := gcp.setGcpPluginDefaults(); err != nil {
			t.Errorf("Case %v; setGcpPluginDefaults() error %v", c.Name, err)
			continue
		}

		plugin := &GcpPluginSpec{}
		err := i.GetPluginSpec(GcpPluginName, plugin)

		if err != nil {
			t.Errorf("Case %v; GetPluginSpec() error %v", c.Name, err)
			continue
		}

		if !reflect.DeepEqual(plugin, c.Expected) {
			pGot, _ := Pformat(plugin)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Case %v; got:\n%v\nwant:\n%v", c.Name, pGot, pWant)
		}

		if c.ExpectedEmail != "" {
			if c.ExpectedEmail != i.Spec.Email {
				t.Errorf("Case %v; email: got %v; want %v", c.Name, i.Spec.Email, c.ExpectedEmail)
			}
		}
	}
}

func TestGcp_setPodDefault(t *testing.T) {
	group := "kubeflow.org"
	version := "v1alpha1"
	kind := "PodDefault"
	namespace := "foo-bar-baz"
	expected := map[string]interface{}{
		"apiVersion": group + "/" + version,
		"kind":       kind,
		"metadata": map[string]interface{}{
			"name":      "add-gcp-secret",
			"namespace": namespace,
		},
		"spec": map[string]interface{}{
			"selector": map[string]interface{}{
				"matchLabels": map[string]interface{}{
					"add-gcp-secret": "true",
				},
			},
			"desc": "add gcp credential",
			"env": []interface{}{
				map[string]interface{}{
					"name":  "GOOGLE_APPLICATION_CREDENTIALS",
					"value": "/secret/gcp/user-gcp-sa.json",
				},
			},
			"volumeMounts": []interface{}{
				map[string]interface{}{
					"name":      "secret-volume",
					"mountPath": "/secret/gcp",
				},
			},
			"volumes": []interface{}{
				map[string]interface{}{
					"name": "secret-volume",
					"secret": map[string]interface{}{
						"secretName": "user-gcp-sa",
					},
				},
			},
		},
	}

	actual := generatePodDefault(group, version, kind, namespace)
	if !reflect.DeepEqual(actual.UnstructuredContent(), expected) {
		pGot, _ := Pformat(actual.UnstructuredContent())
		pWant, _ := Pformat(expected)
		t.Errorf("PodDefault not matching; got\n%v\nwant\n%v", pGot, pWant)
	}
}

// Pformat returns a pretty format output of any value.
// TODO(jlewi): Use utils.PrettyPrint
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

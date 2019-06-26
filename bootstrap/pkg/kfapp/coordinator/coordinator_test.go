package coordinator

import (
	"encoding/json"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kftypesv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	config "github.com/kubeflow/kubeflow/bootstrap/config"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"os"
	"path"
	"reflect"
	"testing"
)

func Test_CreateKfAppCfgFile(t *testing.T) {
	type testCase struct {
		Input    kfdefsv2.KfDef
		DirExists bool
		CfgFileExists bool
		ExpectError  bool
	}

	cases := []testCase{
		{
			Input: kfdefsv2.KfDef{},
			DirExists: false,
			CfgFileExists: false,
			ExpectError: false,
		},
		{
			Input: kfdefsv2.KfDef{},
			DirExists: true,
			CfgFileExists: false,
			ExpectError: false,
		},
		{
			Input: kfdefsv2.KfDef{},
			DirExists: true,
			CfgFileExists: true,
			ExpectError: true,
		},
	}

	for _, c := range cases {

		tDir, err := ioutil.TempDir("","")

		if err != nil {
			t.Fatalf("Could not create temporary directory; %v", err)
		}

		if !c.DirExists {
			err := os.RemoveAll(tDir)
			if err != nil {
				t.Fatalf("Could not delete %v; error %v", tDir, err)
			}
		}


		if c.CfgFileExists {
			existingCfgFile := path.Join(tDir, kftypesv2.KfConfigFile)
			err := ioutil.WriteFile(existingCfgFile, []byte("hello world"), 0644)

			if err != nil {
				t.Fatalf("Could not write %v; error %v", existingCfgFile, err)
			}
		}

		c.Input.Spec.AppDir = tDir
		cfgFile, err := CreateKfAppCfgFile(&c.Input)

		pCase, _ := Pformat(c)
		hasError := err == nil
		if  hasError != c.ExpectError {
			t.Errorf("Test case %v;\n CreateKfAppCfgFile returns error; got %v want %v", pCase, hasError, c.ExpectError)
		}

		expectFile := path.Join(tDir, kftypesv2.KfConfigFile)

		if !c.ExpectError {
			if expectFile != cfgFile {
				t.Errorf("Test case %v;\n CreateKfAppCfgFile returns cfgFile; got %v want %v", pCase, cfgFile, expectFile)
			}
		}
	}
}

func Test_backfillKfDefFromOptions(t *testing.T) {
	type testCase struct {
		Input    kfdefsv2.KfDef
		Options  map[string]interface{}
		Expected kfdefsv2.KfDef
	}

	cases := []testCase{
		// Check that if a bunch of options are provided they
		// are converted into KfDef.
		{
			Input: kfdefsv2.KfDef{},
			Options: map[string]interface{}{
				string(kftypes.EMAIL): "user@kubeflow.org",
				string(kftypes.IPNAME): "someip",
				string(kftypes.HOSTNAME): "somehost",
				string(kftypes.PROJECT): "someproject",
				string(kftypes.ZONE): "somezone",
				string(kftypes.USE_BASIC_AUTH): true,
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email: "user@kubeflow.org",
					IpName: "someip",
					Hostname: "somehost",
					Project: "someproject",
					Zone:"somezone",
					UseBasicAuth: true,
				},
			},
		},

		// Check that if a bunch of options are provided in the KfDef spec they
		// are not overwritten by options.
		{
			Input: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email: "user@kubeflow.org",
					IpName: "someip",
					Hostname: "somehost",
					Project: "someproject",
					Zone:"somezone",
					UseBasicAuth: true,
				},
			},
			Options: map[string]interface{}{
				string(kftypes.EMAIL): "newuser@kubeflow.org",
				string(kftypes.IPNAME): "newip",
				string(kftypes.HOSTNAME): "newhost",
				string(kftypes.PROJECT): "newproject",
				string(kftypes.ZONE): "newezone",
				string(kftypes.PLATFORM):       kftypes.GCP,
			},
			Expected: kfdefsv2.KfDef{
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email: "user@kubeflow.org",
					IpName: "someip",
					Hostname: "somehost",
					Project: "someproject",
					Zone:"somezone",
					UseBasicAuth: true,
				},
			},
		},
		// Check IP name is correctly generated from Name if not explicitly set
		// either in KfDef or in options.
		{
			Input: kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
				},
			},
			Options: map[string]interface{}{
			},
			Expected: kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					IpName: "someapp-ip",
					UseBasicAuth: false,
					Zone: "us-east1-d",
				},
			},
		},
		// Check hostname is correctly generated from name and project
		// Check IP name is correctly generated from Name if not explicitly set
		// either in KfDef or in options.
		{
			Input: kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Project: "acmeproject",
				},
			},
			Options: map[string]interface{}{
			},
			Expected: kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv2.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					IpName: "someapp-ip",
					Project: "acmeproject",
					UseBasicAuth: false,
					Zone: "us-east1-d",
					Hostname: "someapp.endpoints.acmeproject.cloud.goog",
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
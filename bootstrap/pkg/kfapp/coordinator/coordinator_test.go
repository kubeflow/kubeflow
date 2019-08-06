package coordinator

import (
	"encoding/json"
	config "github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"reflect"
	"testing"
)

func Test_CreateKfAppCfgFile(t *testing.T) {
	type testCase struct {
		Input         kfdefsv3.KfDef
		DirExists     bool
		CfgFileExists bool
		ExpectError   bool
	}

	cases := []testCase{
		// Test file is created when directory doesn't exist.
		{
			Input:         kfdefsv3.KfDef{},
			DirExists:     false,
			CfgFileExists: false,
			ExpectError:   false,
		},
		// Test file is created when directory exists
		{
			Input:         kfdefsv3.KfDef{},
			DirExists:     true,
			CfgFileExists: false,
			ExpectError:   false,
		},
		// Test an error is raised if the config file already exists.
		{
			Input:         kfdefsv3.KfDef{},
			DirExists:     true,
			CfgFileExists: true,
			ExpectError:   true,
		},
	}

	for _, c := range cases {

		tDir, err := ioutil.TempDir("", "")

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
			existingCfgFile := path.Join(tDir, kftypesv3.KfConfigFile)
			err := ioutil.WriteFile(existingCfgFile, []byte("hello world"), 0644)

			if err != nil {
				t.Fatalf("Could not write %v; error %v", existingCfgFile, err)
			}
		}

		c.Input.Spec.AppDir = tDir
		cfgFile, err := CreateKfAppCfgFile(&c.Input)

		pCase, _ := Pformat(c)
		hasError := err != nil
		if hasError != c.ExpectError {
			t.Errorf("Test case %v;\n CreateKfAppCfgFile returns error; got %v want %v", pCase, hasError, c.ExpectError)
		}

		expectFile := path.Join(tDir, kftypesv3.KfConfigFile)

		if !c.ExpectError {
			if expectFile != cfgFile {
				t.Errorf("Test case %v;\n CreateKfAppCfgFile returns cfgFile; got %v want %v", pCase, cfgFile, expectFile)
			}
		}
	}
}

func Test_backfillKfDefFromInitOptions(t *testing.T) {
	type testCase struct {
		Name     string
		Input    kfdefsv3.KfDef
		Options  map[string]interface{}
		Expected kfdefsv3.KfDef
	}

	cases := []testCase{
		// Check that if a bunch of options are provided they
		// are converted into KfDef.
		{
			Name:  "Case 1",
			Input: kfdefsv3.KfDef{},
			Options: map[string]interface{}{
				string(kftypesv3.PROJECT):        "someproject",
				string(kftypesv3.USE_BASIC_AUTH): true,
				string(kftypesv3.PLATFORM):       kftypesv3.GCP,
			},
			Expected: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Project:      "someproject",
					UseBasicAuth: true,
				},
			},
		},

		// Check that if a bunch of options are provided in the KfDef spec they
		// are not overwritten by options.
		{
			Name: "Case 2",
			Input: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Project: "someproject",
				},
			},
			Options: map[string]interface{}{
				string(kftypesv3.PROJECT):  "newproject",
				string(kftypesv3.PLATFORM): kftypesv3.GCP,
			},
			Expected: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Project: "someproject",
				},
			},
		},
		// --platform-packmanager=kustomize should add a manifests repo
		{
			Name: "Case kustomize",
			Input: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{},
			},
			Options: map[string]interface{}{
				string(kftypesv3.PACKAGE_MANAGER): kftypesv3.KUSTOMIZE,
			},
			Expected: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					PackageManager: kftypesv3.KUSTOMIZE,
					Repos: []kfdefsv3.Repo{
						{
							Name: "manifests",
							Uri:  "https://github.com/kubeflow/manifests/archive/master.tar.gz",
							Root: "manifests-master",
						},
					},
				},
			},
		},
		// --platform-packmanager=kustomize@12345 should add a manifests repo
		{
			Name: "Case kustomize-commit",
			Input: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{},
			},
			Options: map[string]interface{}{
				string(kftypesv3.PACKAGE_MANAGER): kftypesv3.KUSTOMIZE + "@12345",
			},
			Expected: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					PackageManager: kftypesv3.KUSTOMIZE,
					Repos: []kfdefsv3.Repo{
						{
							Name: "manifests",
							Uri:  "https://github.com/kubeflow/manifests/archive/12345.tar.gz",
							Root: "manifests-12345",
						},
					},
				},
			},
		},
	}

	for _, c := range cases {
		i := &kfdefsv3.KfDef{}
		*i = c.Input
		err := backfillKfDefFromInitOptions(i, c.Options)
		if err != nil {
			t.Errorf("Error backfilling KfDef error %v", err)
		}

		if !reflect.DeepEqual(*i, c.Expected) {
			pGot, _ := Pformat(i)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Case: %v; Error backfilling KfDef got;\n%v\nwant;\n%v", c.Name, pGot, pWant)
		}
	}
}

func Test_backfillKfDefFromGenerateOptions(t *testing.T) {
	type testCase struct {
		Name     string
		Input    kfdefsv3.KfDef
		Options  map[string]interface{}
		Expected kfdefsv3.KfDef
	}

	cases := []testCase{
		// Check that if a bunch of options are provided they
		// are converted into KfDef.
		{
			Name: "gcp-from-options",
			Input: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
				},
			},
			Options: map[string]interface{}{
				string(kftypesv3.EMAIL):    "user@kubeflow.org",
				string(kftypesv3.IPNAME):   "someip",
				string(kftypesv3.HOSTNAME): "somehost",
				string(kftypesv3.ZONE):     "somezone",
			},
			Expected: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email:    "user@kubeflow.org",
					IpName:   "someip",
					Hostname: "somehost",
					Zone:     "somezone",
				},
			},
		},

		// Check that if a bunch of options are provided in the KfDef spec they
		// are not overwritten by options.
		{
			Name: "gcp-no-override",
			Input: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email:    "user@kubeflow.org",
					IpName:   "someip",
					Hostname: "somehost",
					Zone:     "somezone",
				},
			},
			Options: map[string]interface{}{
				string(kftypesv3.EMAIL):    "newuser@kubeflow.org",
				string(kftypesv3.IPNAME):   "newip",
				string(kftypesv3.HOSTNAME): "newhost",
				string(kftypesv3.ZONE):     "newezone",
			},
			Expected: kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Email:    "user@kubeflow.org",
					IpName:   "someip",
					Hostname: "somehost",
					Zone:     "somezone",
				},
			},
		},
		// Check IP name is correctly generated from Name if not explicitly set
		// either in KfDef or in options.
		{
			Name: "gcp-ip-name",
			Input: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
				},
			},
			Options: map[string]interface{}{},
			Expected: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					IpName:       "someapp-ip",
					UseBasicAuth: false,
					Zone:         "us-east1-d",
				},
			},
		},
		// Check hostname is correctly generated from name and project
		// Check IP name is correctly generated from Name if not explicitly set
		// either in KfDef or in options.
		{
			Name: "gcp-hostname",
			Input: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					Project: "acmeproject",
				},
			},
			Options: map[string]interface{}{},
			Expected: kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Name: "someapp",
				},
				Spec: kfdefsv3.KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						Platform: "gcp",
					},
					IpName:       "someapp-ip",
					Project:      "acmeproject",
					UseBasicAuth: false,
					Zone:         "us-east1-d",
					Hostname:     "someapp.endpoints.acmeproject.cloud.goog",
				},
			},
		},
	}

	for _, c := range cases {
		i := &kfdefsv3.KfDef{}
		*i = c.Input
		err := backfillKfDefFromGenerateOptions(i, c.Options)
		if err != nil {
			t.Errorf("Case %v; Error backfilling KfDef error %v", c.Name, err)
		}

		if !reflect.DeepEqual(*i, c.Expected) {
			pGot, _ := Pformat(i)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Case %v; Error backfilling KfDef got;\n%v\nwant;\n%v", c.Name, pGot, pWant)
		}
	}
}

func Test_repoVersionToRepoStruct(t *testing.T) {
	type testCase struct {
		name     string
		version  string
		expected string
	}

	testCases := []testCase{
		{
			name:     "kubeflow",
			version:  "master",
			expected: "https://github.com/kubeflow/kubeflow/tarball/master?archive=tar.gz",
		},
		{
			name:     "manifests",
			version:  "pull/189",
			expected: "https://github.com/kubeflow/manifests/tarball/pull/189/head?archive=tar.gz",
		},
	}

	for _, c := range testCases {
		actual := repoVersionToUri(c.name, c.version)

		if !reflect.DeepEqual(actual, c.expected) {
			pGot, _ := Pformat(actual)
			pWant, _ := Pformat(c.expected)
			t.Errorf("Error converting got;\n%v\nwant;\n%v", pGot, pWant)
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

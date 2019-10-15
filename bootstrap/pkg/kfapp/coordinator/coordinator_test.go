package coordinator

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"reflect"
	"testing"

	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Test_CreateKfAppCfgFile(t *testing.T) {
	type testCase struct {
		Input         kfconfig.KfConfig
		DirExists     bool
		CfgFileExists bool
		ExpectError   bool
	}

	cases := []testCase{
		// Test file is created when directory doesn't exist.
		{
			Input: kfconfig.KfConfig{
				TypeMeta: metav1.TypeMeta{
					APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
				},
			},
			DirExists:     false,
			CfgFileExists: false,
			ExpectError:   false,
		},
		// Test file is created when directory exists
		{
			Input: kfconfig.KfConfig{
				TypeMeta: metav1.TypeMeta{
					APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
				},
			},
			DirExists:     true,
			CfgFileExists: false,
			ExpectError:   false,
		},
		// Test an error is raised if the config file already exists.
		{
			Input: kfconfig.KfConfig{
				TypeMeta: metav1.TypeMeta{
					APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
				},
			},
			DirExists:     true,
			CfgFileExists: true,
			ExpectError:   false,
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

package configconverters

import (
	"github.com/ghodss/yaml"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfctlconfig"
	kfutils "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"io/ioutil"
	"os"
	"path"
	"reflect"
	"testing"
)

func TestV1alpha1_ConvertToKfConfigs(t *testing.T) {
	type testCase struct {
		Input    string
		Expected string
	}

	cases := []testCase{
		testCase{
			Input:    "v1alpha1.yaml",
			Expected: "kfconfig_v1alpha1.yaml",
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Input)

		buf, bufErr := ioutil.ReadFile(fPath)
		if bufErr != nil {
			t.Fatalf("Error reading file %v; error %v", fPath, bufErr)
		}

		v1alpha1 := V1alpha1{}
		config, err := v1alpha1.ToKfConfig("", buf)
		if err != nil {
			t.Fatalf("Error converting to KfConfig: %v", err)
		}

		ePath := path.Join(wd, "testdata", c.Expected)
		eBuf, err := ioutil.ReadFile(ePath)
		if err != nil {
			t.Fatalf("Error when reading KfConfig: %v", err)
		}
		expectedConfig := &kfconfig.KfctlConfig{}
		err = yaml.Unmarshal(eBuf, expectedConfig)
		if err != nil {
			t.Fatalf("Error when unmarshaling KfConfig: %v", err)
		}

		if !reflect.DeepEqual(config, expectedConfig) {
			pGot := kfutils.PrettyPrint(config)
			pWant := kfutils.PrettyPrint(expectedConfig)
			t.Errorf("Loaded KfConfig doesn't match;\nexpected\n%v\ngot\n%v\n", pWant, pGot)
		}
	}
}

package configconverters

import (
	"github.com/ghodss/yaml"
	// "github.com/prometheus/common/log"
	"io/ioutil"
	"os"
	"path"
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
			Expected: "kfconfig.yaml",
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

		configBytes, err := yaml.Marshal(*config)
		if err != nil {
			t.Fatalf("Error when unmarshaling: %v", err)
		}
		oPath := path.Join(wd, "testdata", c.Expected)
		err = ioutil.WriteFile(oPath, configBytes, 0644)
		if err != nil {
			t.Fatalf("Error when writing out KfConfig: %v", err)
		}
	}
}

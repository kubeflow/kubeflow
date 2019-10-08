package configconverters

import (
	"github.com/ghodss/yaml"
	"github.com/google/go-cmp/cmp"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	kfdeftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfgcp "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
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
		expectedConfig := &kfconfig.KfConfig{}
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

func TestV1alpha1_ConvertToKfDef(t *testing.T) {
	type testCase struct {
		Input    string
		Expected string
	}

	cases := []testCase{
		testCase{
			Input:    "kfconfig_v1alpha1.yaml",
			Expected: "v1alpha1.yaml",
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Input)

		buf, bufErr := ioutil.ReadFile(fPath)
		if bufErr != nil {
			t.Fatalf("Error reading file %v; error %v", fPath, bufErr)
		}
		config := &kfconfig.KfConfig{}
		err := yaml.Unmarshal(buf, config)
		if err != nil {
			t.Fatalf("Error when unmarshaling KfConfig: %v", err)
		}

		v1alpha1 := V1alpha1{}
		kfdefBytes, err := v1alpha1.ToKfDefSerialized(*config)
		if err != nil {
			t.Fatalf("Error converting to KfDef: %v", err)
		}
		got := &kfdeftypes.KfDef{}
		err = yaml.Unmarshal(kfdefBytes, got)
		if err != nil {
			t.Fatalf("Error when unmarshaling to KfDef: %v", err)
		}
		gcpSpec := &kfgcp.GcpPluginSpec{}
		err = got.GetPluginSpec(kftypes.GCP, gcpSpec)
		if err != nil {
			t.Fatalf("Error when getting spec: %v", err)
		}
		newSpec := &kfgcp.GcpPluginSpec{}
		newSpec.CreatePipelinePersistentStorage = gcpSpec.CreatePipelinePersistentStorage
		newSpec.EnableWorkloadIdentity = gcpSpec.EnableWorkloadIdentity
		newSpec.DeploymentManagerConfig = gcpSpec.DeploymentManagerConfig
		err = got.SetPluginSpec(kftypes.GCP, newSpec)
		if err != nil {
			t.Fatalf("Error when writing back GcpPluginSpec: %v", err)
		}

		ePath := path.Join(wd, "testdata", c.Expected)
		eBuf, err := ioutil.ReadFile(ePath)
		if err != nil {
			t.Fatalf("Error when reading KfDef: %v", err)
		}
		want := &kfdeftypes.KfDef{}
		err = yaml.Unmarshal(eBuf, want)
		if err != nil {
			t.Fatalf("Error when unmarshaling to KfDef: %v", err)
		}

		if !reflect.DeepEqual(got, want) {
			pGot := kfutils.PrettyPrint(got)
			pWant := kfutils.PrettyPrint(want)
			t.Errorf("Loaded KfConfig doesn't match: %v", cmp.Diff(pGot, pWant))
		}
	}
}

package kfdef

import (
	kfdefv1beta1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	kfutils "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"os"
	"path"
	"testing"
)

func TestKfLoader_LoadConfigs(t *testing.T) {
	type testCase struct {
		Filename string
		Expected *kfdefv1beta1.KfDef
	}

	cases := []testCase{
		{
			Filename: "kfdef_v1alpha1.yaml",
			Expected: &kfdefv1beta1.KfDef{},
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Filename)

		kfdef, err := LoadKfDefFromURI(fPath)
		if err != nil {
			t.Fatalf("Error when loading KfDef: %v", err)
		}
		t.Fatalf("GG TEST: %v", kfutils.PrettyPrint(kfdef))
	}
}

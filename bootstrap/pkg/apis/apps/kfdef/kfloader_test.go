package kfdef

import (
	kfdefv1beta "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	"os"
	"path"
	"testing"
)

func TestKfLoader_LoadConfigs(t *testing.T) {
	type testCase struct {
		Filename string
		Expected *kfdefv1beta.KfDef
	}

	cases := []testCase{
		{
			Filename: "kfdef_v1alpha1.yaml",
			Expected: &kfdefv1beta.KfDef{},
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Filename)

		_, err := LoadKfDefFromURI(fPath)
		if err != nil {
			t.Fatalf("Error when loading KfDef: %v", err)
		}
	}
}

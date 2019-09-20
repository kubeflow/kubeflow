package kfdef

import (
	kfutils "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"io/ioutil"
	"os"
	"path"
	"reflect"
	"testing"
)

func TestKfLoader_LoadKfDefBackwardCompatibility(t *testing.T) {
	wd, _ := os.Getwd()

	alpha, err := LoadKfDefFromURI(path.Join(wd, "testdata", "kfdef_v1alpha1.yaml"))
	if err != nil {
		t.Fatalf("error when loading v1alpha1 KfDef: %v", err)
	}
	beta, err := LoadKfDefFromURI(path.Join(wd, "testdata", "kfdef_v1beta1.yaml"))
	if err != nil {
		t.Fatalf("error when loading v1beta1 KfDef: %v", err)
	}
	if !reflect.DeepEqual(alpha, beta) {
		t.Errorf("KfDef loaded is not compatible;\n%v\nv.s.\n%v",
			kfutils.PrettyPrint(alpha),
			kfutils.PrettyPrint(beta))
		_ = ioutil.WriteFile(path.Join(wd, "alpha.txt"), []byte(kfutils.PrettyPrint(alpha)), 0644)
		_ = ioutil.WriteFile(path.Join(wd, "beta.txt"), []byte(kfutils.PrettyPrint(beta)), 0644)
	}
}

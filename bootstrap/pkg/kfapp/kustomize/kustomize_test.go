package kustomize

import (
	"bytes"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	"github.com/otiai10/copy"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"path"
	"testing"
)

// This test tests that GenerateKustomizationFile will produce correct kustomization.yaml
func TestGenerateKustomizationFile(t *testing.T) {
	type testCase struct {
		kfDef  *kfconfig.KfConfig
		params []kfconfig.NameValue
		// The directory of a (testing) kustomize package
		packageDir string
		overlays   []string
		// Expected kustomization.yaml
		expectedFile string
	}
	testCases := []testCase{
		{
			kfDef: &kfconfig.KfConfig{
				ObjectMeta: metav1.ObjectMeta{
					Namespace: "kubeflow",
				},
				Spec: kfconfig.KfConfigSpec{},
			},
			overlays: []string{
				"application",
			},
			packageDir:   "testdata/kustomizeExample/pytorch-operator",
			expectedFile: "testdata/kustomizeExample/pytorch-operator/expected/kustomization.yaml",
		},
	}
	packageName := "dummy"
	for _, c := range testCases {
		testDir, err := ioutil.TempDir("", "")
		if err != nil {
			t.Fatalf("Failed to create temp dir: %v", err)
		}
		t.Logf("testdir: %v", testDir)
		err = copy.Copy(c.packageDir, path.Join(testDir, packageName))
		if err != nil {
			t.Fatalf("Failed to copy package to temp dir: %v", err)
		}
		err = GenerateKustomizationFile(c.kfDef, testDir, packageName, c.overlays, c.params)
		if err != nil {
			t.Fatalf("Failed to GenerateKustomizationFile: %v", err)
		}
		data, err := ioutil.ReadFile(path.Join(testDir, packageName, "kustomization.yaml"))
		if err != nil {
			t.Fatalf("Failed to read kustomization.yaml: %v", err)
		}
		expected, err := ioutil.ReadFile(c.expectedFile)
		if err != nil {
			t.Fatalf("Failed to read expected kustomization.yaml: %v", err)
		}
		if bytes.Compare(data, expected) != 0 {
			t.Fatalf("kustomization.yaml is different from expected.\nactual:\n--------\n%s\nexpected:\n--------\n%s\n", string(data), string(expected))
		}
	}
}

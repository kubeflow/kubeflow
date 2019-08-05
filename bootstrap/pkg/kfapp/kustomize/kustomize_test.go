package kustomize

import (
	"bytes"
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"github.com/otiai10/copy"
	"io/ioutil"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"path"
	"reflect"
	"testing"
)

func TestKustomize_BackfillOptions(t *testing.T) {
	type testCase struct {
		input    *kustomize
		expected []kfdefsv3.Application
	}

	testCases := []testCase{
		{
			input: &kustomize{
				kfDef: &kfdefsv3.KfDef{
					Spec: kfdefsv3.KfDefSpec{
						ComponentConfig: config.ComponentConfig{
							Packages: []string{
								"istio-crds",
							},
							Components: []string{
								"istio-crds",
							},
							ComponentParams: config.Parameters{
								"istio-crds": []config.NameValue{
									{
										Name:  "overlay",
										Value: "someoverlay",
									},
									{
										Name:  "p1",
										Value: "v1",
									},
								},
							},
						},
					},
					Status: kfdefsv3.KfDefStatus{
						ReposCache: map[string]kfdefsv3.RepoCache{
							"manifests": {
								LocalPath: "/cache/manifests",
							},
						},
					},
				},
				componentPathMap: map[string]string{
					"istio-crds": "/cache/manifests/gcp/istio/istio-crds",
				},
			},
			expected: []kfdefsv3.Application{
				{
					Name: "istio-crds",
					KustomizeConfig: &kfdefsv3.KustomizeConfig{
						RepoRef: &kfdefsv3.RepoRef{
							Name: "manifests",
							Path: "/gcp/istio/istio-crds",
						},
						Overlays: []string{
							"someoverlay",
						},
						Parameters: []config.NameValue{
							{
								Name:  "p1",
								Value: "v1",
							},
						},
					},
				},
			},
		},
	}

	for _, c := range testCases {
		if err := c.input.backfillApplications(); err != nil {
			t.Errorf("kustomize.backfillApplications error; %v", err)
			continue
		}

		if !reflect.DeepEqual(c.input.kfDef.Spec.Applications, c.expected) {
			t.Errorf("backfill produced incorrect results; got\n%v\nwant:\n%v", utils.PrettyPrint(c.input.kfDef.Spec.Applications), utils.PrettyPrint(c.expected))
		}
	}
}

// This test tests that GenerateKustomizationFile will produce correct kustomization.yaml
func TestGenerateKustomizationFile(t *testing.T) {
	type testCase struct {
		kfDef  *kfdefsv3.KfDef
		params []config.NameValue
		// The directory of a (testing) kustomize package
		packageDir string
		overlays   []string
		// Expected kustomization.yaml
		expectedFile string
	}
	testCases := []testCase{
		{
			kfDef: &kfdefsv3.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Namespace: "kubeflow",
				},
				Spec: kfdefsv3.KfDefSpec{
					EnableApplications: true,
					PackageManager:     "kustomize",
				},
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
			t.Fatalf("kustomization.yaml is different from expected.")
		}
	}
}

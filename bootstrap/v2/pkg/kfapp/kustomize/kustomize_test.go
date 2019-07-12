// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package kustomize

import (
	"bytes"
	"io/ioutil"
	"path"
	"testing"

	"github.com/kubeflow/kubeflow/bootstrap/config"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/otiai10/copy"
	"github.com/prometheus/common/log"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
)

// This test tests that GenerateKustomizationFile will produce correct kustomization.yaml
func TestGenerateKustomizationFile(t *testing.T) {
	type testCase struct {
		kfDef  *kfdefsv2.KfDef
		params []config.NameValue
		// The directory of a (testing) kustomize package
		packageDir string
		// Expected kustomization.yaml
		expectedFile string
	}
	testCases := []testCase{
		{
			kfDef: &kfdefsv2.KfDef{
				ObjectMeta: metav1.ObjectMeta{
					Namespace: "kubeflow",
				},
				Spec: kfdefsv2.KfDefSpec{
					EnableApplications: true,
					PackageManager:     "kustomize",
				},
			},
			params: []config.NameValue{
				{
					Name:  "overlay",
					Value: "application",
				},
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
		log.Infof("testdir: %v", testDir)
		err = copy.Copy(c.packageDir, path.Join(testDir, packageName))
		if err != nil {
			t.Fatalf("Failed to copy package to temp dir: %v", err)
		}
		err = GenerateKustomizationFile(c.kfDef, testDir, packageName, c.params)
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

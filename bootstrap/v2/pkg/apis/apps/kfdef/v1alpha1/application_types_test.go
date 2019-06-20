// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package v1alpha1

import (
	"io/ioutil"
	"os"
	"path"
	"testing"
)

// TODO(https://github.com/kubeflow/kubeflow/issues/3056): Fix the test and uncomment.
//import (
//	"testing"
//
//	"github.com/onsi/gomega"
//	"golang.org/x/net/context"
//	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
//	"k8s.io/apimachinery/v2/pkg/types"
//)
//
//func TestStorageApplication(t *testing.T) {
//	key := types.NamespacedName{
//		Name:      "foo",
//		Namespace: "default",
//	}
//	created := &KfDef{
//		ObjectMeta: metav1.ObjectMeta{
//			Name:      "foo",
//			Namespace: "default",
//		}}
//	g := gomega.NewGomegaWithT(t)
//
//	// Test Create
//	fetched := &KfDef{}
//	g.Expect(c.Create(context.TODO(), created)).NotTo(gomega.HaveOccurred())
//
//	g.Expect(c.Get(context.TODO(), key, fetched)).NotTo(gomega.HaveOccurred())
//	g.Expect(fetched).To(gomega.Equal(created))
//
//	// Test Updating the Labels
//	updated := fetched.DeepCopy()
//	updated.Labels = map[string]string{"hello": "world"}
//	g.Expect(c.Update(context.TODO(), updated)).NotTo(gomega.HaveOccurred())
//
//	g.Expect(c.Get(context.TODO(), key, fetched)).NotTo(gomega.HaveOccurred())
//	g.Expect(fetched).To(gomega.Equal(updated))
//
//	// Test Delete
//	g.Expect(c.Delete(context.TODO(), fetched)).NotTo(gomega.HaveOccurred())
//	g.Expect(c.Get(context.TODO(), key, fetched)).To(gomega.HaveOccurred())
//}

func TestSyncCache(t *testing.T) {
	// Verify that we can sync some files.
	testDir, _ := ioutil.TempDir("", "")

	srcDir := path.Join(testDir, "src")
	err := os.Mkdir(srcDir, os.ModePerm)

	if err != nil {
		t.Fatalf("Failed to create directoy; %v", err)
	}

	ioutil.WriteFile(path.Join(srcDir, "file1"), []byte("hello world"), os.ModePerm)

	appDir := path.Join(testDir, "app")
	d := &KfDef{
		Spec: KfDefSpec{
			AppDir: appDir,
			Repos: []Repo{{
				Name: "testrepo",
				Uri:  srcDir,
			},
			},
		},
	}

	err = d.SyncCache()

	if err != nil {
		t.Fatalf("Could not sync cache; %v", err)
	}

	expectedDir := path.Join(appDir, ".cache", "testrepo")
	if d.Status.ReposCache["testrepo"].LocalPath != path.Join(expectedDir) {
		t.Fatalf("LocalPath; want %v; got %v", expectedDir, d.Status.ReposCache["testrepo"].LocalPath)
	}

	//Check file was copied
	// os.Stat(path.jo)
}

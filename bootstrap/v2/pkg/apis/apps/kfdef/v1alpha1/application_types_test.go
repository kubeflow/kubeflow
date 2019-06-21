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
	"github.com/ghodss/yaml"
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"reflect"
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
}

func TestWriteKfDef(t *testing.T) {
	// Verify that if we write KfDef it will be stripped of any literal secrets.
	type testCase struct {
		input *KfDef
		output *KfDef
	}

	cases := []testCase {
		{
			input: &KfDef {
				Spec: KfDefSpec{
					AppDir: "someapp",
					Secrets: []Secret{
						{
							Name: "s1",
							SecretSource: SecretSource{
								LiteralSource: &LiteralSource{
									Value: "somedata",
								},
							},
						},
						{
							Name: "s2",
							SecretSource: SecretSource{
								EnvSource: &EnvSource{
									Name: "somesecret",
								},
							},
						},
					},
				},
			},
			output: &KfDef {
				Spec: KfDefSpec{
					AppDir: "someapp",
					Secrets: []Secret{
						{
							Name: "s2",
							SecretSource: SecretSource{
								EnvSource: &EnvSource{
									Name: "somesecret",
								},
							},
						},
					},
				},
			},
		},
	}


	for _, c:= range cases {
		testDir, _ := ioutil.TempDir("", "")

		testFile := path.Join(testDir, "app.yaml")
		err := c.input.WriteToFile(testFile)

		if err != nil {
			t.Fatalf("Could not write file; %v", err)
		}

		// Read contents
		configFileBytes, err := ioutil.ReadFile(testFile)
		if err != nil {
			t.Fatalf("Could not read file; %v", err)
		}

		result := &KfDef{}
		if err := yaml.Unmarshal(configFileBytes, result); err != nil {
			t.Fatalf("Could not unmarshal the result; %v", err)
		}

		// Test they are equal
		if !reflect.DeepEqual(result, c.output) {
			pExpected, _ := Pformat(c.output)
			pActual, _ := Pformat(result)

			t.Errorf("Result wasn't properly stripped: Got:\n%v;\n Want:\n%v", pActual, pExpected)
		}
	}
}

// Pformat returns a pretty format output of any value.
func Pformat(value interface{}) (string, error) {
	if s, ok := value.(string); ok {
		return s, nil
	}
	valueJson, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return "", err
	}
	return string(valueJson), nil
}
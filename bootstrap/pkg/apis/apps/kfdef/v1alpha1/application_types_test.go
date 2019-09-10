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
	"encoding/json"
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	"github.com/prometheus/common/log"
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
//	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
//	"k8s.io/apimachinery/pkg/types"
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

// TODO(jlewi): We should add a unittest for the case where Status.ReposCache
// points to some incorrect locations but the actual cache dir exists and is correct.
func TestSyncCache(t *testing.T) {
	type testCase struct {
		input    *KfDef
		expected map[string]RepoCache
	}

	// Verify that we can sync some files.
	testDir, _ := ioutil.TempDir("", "")

	srcDir := path.Join(testDir, "src")
	err := os.Mkdir(srcDir, os.ModePerm)

	if err != nil {
		t.Fatalf("Failed to create directoy; %v", err)
	}

	ioutil.WriteFile(path.Join(srcDir, "file1"), []byte("hello world"), os.ModePerm)

	repoName := "testRepo"

	testCases := []testCase{
		{
			input: &KfDef{
				Spec: KfDefSpec{
					AppDir: path.Join(testDir, "app1"),
					Repos: []Repo{{
						Name: repoName,
						Uri:  srcDir,
					},
					},
				},
			},
			expected: map[string]RepoCache{
				repoName: {
					LocalPath: path.Join(testDir, "app1", ".cache", repoName),
				},
			},
		},
		// The following test cases pull from GitHub. The may be worth commenting
		// out in the unittests and only running manually
		//{
		//	input: &KfDef{
		//		Spec: KfDefSpec{
		//			AppDir: path.Join(testDir, "app2"),
		//			Repos: []Repo{{
		//				Name: repoName,
		//				Uri:  "https://github.com/kubeflow/manifests/archive/master.tar.gz",
		//			},
		//			},
		//		},
		//	},
		//	expected: map[string]RepoCache {
		//		repoName: {
		//			LocalPath: path.Join(testDir, "app2", ".cache", repoName, "manifests-master"),
		//		},
		//	},
		//},
		//{
		//	input: &KfDef{
		//		Spec: KfDefSpec{
		//			AppDir: path.Join(testDir, "app3"),
		//			Repos: []Repo{{
		//				Name: repoName,
		//				Uri:  "https://github.com/kubeflow/manifests/tarball/pull/187/head?archive=tar.gz",
		//			},
		//			},
		//		},
		//	},
		//	expected: map[string]RepoCache {
		//		repoName: {
		//			LocalPath: path.Join(testDir, "app3", ".cache", repoName, "kubeflow-manifests-c04764b"),
		//		},
		//	},
		//},
	}

	for _, c := range testCases {
		err = c.input.SyncCache()

		if err != nil {
			t.Fatalf("Could not sync cache; %v", err)
		}

		actual := c.input.Status.ReposCache[repoName].LocalPath
		expected := c.expected[repoName].LocalPath
		if actual != expected {
			t.Fatalf("LocalPath; got %v; want %v", actual, expected)
		}
	}
}

func TestWriteKfDef(t *testing.T) {
	// Verify that if we write KfDef it will be stripped of any literal secrets.
	type testCase struct {
		input  *KfDef
		output *KfDef
	}

	cases := []testCase{
		{
			input: &KfDef{
				Spec: KfDefSpec{
					AppDir: "someapp",
					Secrets: []Secret{
						{
							Name: "s1",
							SecretSource: &SecretSource{
								LiteralSource: &LiteralSource{
									Value: "somedata",
								},
							},
						},
						{
							Name: "s2",
							SecretSource: &SecretSource{
								EnvSource: &EnvSource{
									Name: "somesecret",
								},
							},
						},
					},
				},
			},
			output: &KfDef{
				Spec: KfDefSpec{
					AppDir: "someapp",
					Secrets: []Secret{
						{
							Name: "s2",
							SecretSource: &SecretSource{
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

	for _, c := range cases {
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

type FakePluginSpec struct {
	Param     string `json:"param,omitempty"`
	BoolParam bool   `json:"boolParam,omitempty"`
}

func TestKfDef_GetPluginSpec(t *testing.T) {
	// Test that we can properly parse the gcp structs.
	type testCase struct {
		Filename   string
		PluginName string
		Expected   *FakePluginSpec
	}

	cases := []testCase{
		{
			Filename:   "kfctl_plugin_test.yaml",
			PluginName: "fakeplugin",
			Expected: &FakePluginSpec{
				Param:     "someparam",
				BoolParam: true,
			},
		},
	}

	for _, c := range cases {
		wd, _ := os.Getwd()
		fPath := path.Join(wd, "testdata", c.Filename)

		buf, bufErr := ioutil.ReadFile(fPath)
		if bufErr != nil {
			t.Fatalf("Error reading file %v; error %v", fPath, bufErr)
		}

		log.Infof("Want ")
		d := &KfDef{}
		err := yaml.Unmarshal(buf, d)
		if err != nil {
			t.Fatalf("Could not parse as KfDef error %v", err)
		}

		actual := &FakePluginSpec{}
		err = d.GetPluginSpec(c.PluginName, actual)

		if err != nil {
			t.Fatalf("Could not get plugin spec; error %v", err)
		}

		if !reflect.DeepEqual(actual, c.Expected) {
			pGot, _ := Pformat(actual)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error parsing plugin spec got;\n%v\nwant;\n%v", pGot, pWant)
		}
	}
}

func TestKfDef_SetPluginSpec(t *testing.T) {
	// Test that we can properly parse the gcp structs.
	type testCase struct {
		PluginName string
		Expected   *FakePluginSpec
	}

	cases := []testCase{
		{
			PluginName: "fakeplugin",
			Expected: &FakePluginSpec{
				Param:     "oldparam",
				BoolParam: true,
			},
		},
		// Override the existing plugin
		{
			PluginName: "fakeplugin",
			Expected: &FakePluginSpec{
				Param:     "newparam",
				BoolParam: true,
			},
		},
		// Add a new plugin
		{
			PluginName: "fakeplugin",
			Expected: &FakePluginSpec{
				Param:     "newparam",
				BoolParam: true,
			},
		},
	}

	d := &KfDef{}

	for _, c := range cases {
		err := d.SetPluginSpec(c.PluginName, c.Expected)

		if err != nil {
			t.Fatalf("Could not set plugin spec; error %v", err)
		}

		actual := &FakePluginSpec{}
		err = d.GetPluginSpec(c.PluginName, actual)

		if err != nil {
			t.Fatalf("Could not get plugin spec; error %v", err)
		}

		if !reflect.DeepEqual(actual, c.Expected) {
			pGot, _ := Pformat(actual)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error parsing plugin spec got;\n%v\nwant;\n%v", pGot, pWant)
		}
	}
}

func TestKfDef_GetSecret(t *testing.T) {
	d := &KfDef{
		Spec: KfDefSpec{
			AppDir: "someapp",
			Secrets: []Secret{
				{
					Name: "s1",
					SecretSource: &SecretSource{
						LiteralSource: &LiteralSource{
							Value: "somedata",
						},
					},
				},
				{
					Name: "s2",
					SecretSource: &SecretSource{
						EnvSource: &EnvSource{
							Name: "s2",
						},
					},
				},
			},
		},
	}

	type testCase struct {
		SecretName    string
		ExpectedValue string
	}

	cases := []testCase{
		{
			SecretName:    "s1",
			ExpectedValue: "somedata",
		},
		{
			SecretName:    "s2",
			ExpectedValue: "somesecret",
		},
	}

	os.Setenv("s2", "somesecret")
	for _, c := range cases {
		actual, err := d.GetSecret(c.SecretName)
		if err != nil {
			t.Errorf("Error getting secret %v; error %v", c.SecretName, err)
		}

		if actual != c.ExpectedValue {
			t.Errorf("Secret %v value is wrong; got %v; want %v", c.SecretName, actual, c.ExpectedValue)
		}
	}
}

func TestKfDef_SetSecret(t *testing.T) {
	type testCase struct {
		Input    KfDef
		Secret   Secret
		Expected KfDef
	}

	cases := []testCase{
		// No Secrets exist
		{
			Input: KfDef{},
			Secret: Secret{
				Name: "s1",
				SecretSource: &SecretSource{
					LiteralSource: &LiteralSource{
						Value: "v1",
					},
				},
			},
			Expected: KfDef{
				Spec: KfDefSpec{
					Secrets: []Secret{
						{
							Name: "s1",
							SecretSource: &SecretSource{
								LiteralSource: &LiteralSource{
									Value: "v1",
								},
							},
						},
					},
				},
			},
		},
		// Override a secret
		{
			Input: KfDef{
				Spec: KfDefSpec{
					Secrets: []Secret{
						{
							Name: "s1",
							SecretSource: &SecretSource{
								LiteralSource: &LiteralSource{
									Value: "oldvalue",
								},
							},
						},
					},
				},
			},
			Secret: Secret{
				Name: "s1",
				SecretSource: &SecretSource{
					LiteralSource: &LiteralSource{
						Value: "newvalue",
					},
				},
			},
			Expected: KfDef{
				Spec: KfDefSpec{
					Secrets: []Secret{
						{
							Name: "s1",
							SecretSource: &SecretSource{
								LiteralSource: &LiteralSource{
									Value: "newvalue",
								},
							},
						},
					},
				},
			},
		},
	}

	for _, c := range cases {
		i := &KfDef{}
		*i = c.Input
		i.SetSecret(c.Secret)

		if !reflect.DeepEqual(*i, c.Expected) {
			pGot, _ := Pformat(i)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error setting secret %v; got;\n%v\nwant;\n%v", c.Secret.Name, pGot, pWant)
		}
	}
}

func Test_PluginNotFoundError(t *testing.T) {
	type testCase struct {
		Input    error
		Expected bool
	}

	cases := []testCase{
		{
			Input:    NewPluginNotFound("someplugin"),
			Expected: true,
		},
		{
			Input:    fmt.Errorf("some error"),
			Expected: false,
		},
	}

	for _, c := range cases {
		actual := IsPluginNotFound(c.Input)
		if actual != c.Expected {
			t.Errorf("IsPluginNotFound: Got %v; Want %v", actual, c.Expected)
		}
	}
}

func TestKfDef_SetApplicationParameter(t *testing.T) {
	type testCase struct {
		Input     *KfDef
		AppName   string
		ParamName string
		Value     string
		Expected  *KfDef
	}

	cases := []testCase{
		// New parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name:            "app1",
							KustomizeConfig: &KustomizeConfig{},
						},
					},
				},
			},
			AppName:   "app1",
			ParamName: "p1",
			Value:     "v1",
			Expected: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name: "app1",
							KustomizeConfig: &KustomizeConfig{
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
			},
		},
		// Override parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name: "app1",
							KustomizeConfig: &KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
					},
				},
			},
			AppName:   "app1",
			ParamName: "p1",
			Value:     "v1",
			Expected: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name: "app1",
							KustomizeConfig: &KustomizeConfig{
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
			},
		},
		// Test cases below deal with backwards compatibility when we don't have an application.
		// New parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app1": []config.NameValue{},
						},
					},
				},
			},
			AppName:   "app1",
			ParamName: "p1",
			Value:     "v1",
			Expected: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app1": []config.NameValue{
								{
									Name:  "p1",
									Value: "v1",
								},
							},
						},
					},
				},
			},
		},
		// Override parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app1": []config.NameValue{
								{
									Name:  "p1",
									Value: "oldvalue",
								},
							},
						},
					},
				},
			},
			AppName:   "app1",
			ParamName: "p1",
			Value:     "v1",
			Expected: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app1": []config.NameValue{
								{
									Name:  "p1",
									Value: "v1",
								},
							},
						},
					},
				},
			},
		},
	}

	for _, c := range cases {
		c.Input.SetApplicationParameter(c.AppName, c.ParamName, c.Value)
		if !reflect.DeepEqual(c.Input, c.Expected) {
			pGot, _ := Pformat(c.Input)
			pWant, _ := Pformat(c.Expected)
			t.Errorf("Error setting App %v; Param %v; value %v; got;\n%v\nwant;\n%v", c.AppName, c.ParamName, c.Value, pGot, pWant)
		}
	}
}

func TestKfDef_GetApplicationParameter(t *testing.T) {
	type testCase struct {
		Input     *KfDef
		AppName   string
		ParamName string
		Expected  string
		HasParam  bool
	}

	cases := []testCase{
		// No parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name:            "app1",
							KustomizeConfig: &KustomizeConfig{},
						},
					},
				},
			},
			AppName:   "app1",
			ParamName: "p1",
			Expected:  "",
			HasParam:  false,
		},
		// Has Parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					Applications: []Application{
						{
							Name: "app2",
							KustomizeConfig: &KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
					},
				},
			},
			AppName:   "app2",
			ParamName: "p1",
			Expected:  "old1",
			HasParam:  true,
		},
		// Test cases below deal with backwards compatibility when we don't have an application.
		// No parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app3": []config.NameValue{},
						},
					},
				},
			},
			AppName:   "app3",
			ParamName: "p1",
			Expected:  "",
			HasParam:  false,
		},
		// Has parameter
		{
			Input: &KfDef{
				Spec: KfDefSpec{
					ComponentConfig: config.ComponentConfig{
						ComponentParams: config.Parameters{
							"app4": []config.NameValue{
								{
									Name:  "p1",
									Value: "oldvalue",
								},
							},
						},
					},
				},
			},
			AppName:   "app4",
			ParamName: "p1",
			Expected:  "oldvalue",
			HasParam:  true,
		},
	}

	for _, c := range cases {
		v, hasParam := c.Input.GetApplicationParameter(c.AppName, c.ParamName)

		if c.HasParam != hasParam {
			t.Errorf("Error getting App %v; Param %v; hasParam; got; %v; want %v", c.AppName, c.ParamName, hasParam, c.HasParam)
		}

		if c.Expected != v {
			t.Errorf("Error getting App %v; Param %v; got; %v; want %v", c.AppName, c.ParamName, c, c.Expected)
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

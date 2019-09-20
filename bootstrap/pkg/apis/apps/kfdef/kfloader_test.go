package kfdef

import (
	kfdefv1alpha1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfdefv1beta1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	kfgcp "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	kfutils "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"os"
	"path"
	"reflect"
	"testing"
)

func TestKfLoad_LoadKfDefFomURI(t *testing.T) {
	type testCase struct {
		filename string
		expected *kfdefv1beta1.KfDef
	}

	createPipelinePersistentStorage := true
	expectedOutput := &kfdefv1beta1.KfDef{
		Spec: kfdefv1beta1.KfDefSpec{
			Repos: []kfdefv1beta1.Repo{
				kfdefv1beta1.Repo{
					Name: "manifests",
					URI:  "https://github.com/kubeflow/manifests/archive/master.tar.gz",
				},
			},
			Applications: []kfdefv1beta1.Application{
				kfdefv1beta1.Application{
					Name: "istio-crds",
					KustomizeConfig: &kfdefv1beta1.KustomizeConfig{
						RepoRef: &kfdefv1beta1.RepoRef{
							Name: "manifests",
							Path: "istio/istio-crds",
						},
						Parameters: []kfdefv1beta1.NameValue{
							kfdefv1beta1.NameValue{
								Name:  "namespace",
								Value: "istio-system",
							},
						},
					},
				},
				kfdefv1beta1.Application{
					Name: "istio-install",
					KustomizeConfig: &kfdefv1beta1.KustomizeConfig{
						RepoRef: &kfdefv1beta1.RepoRef{
							Name: "manifests",
							Path: "istio/istio-install",
						},
						Parameters: []kfdefv1beta1.NameValue{
							kfdefv1beta1.NameValue{
								Name:  "namespace",
								Value: "istio-system",
							},
						},
					},
				},
				kfdefv1beta1.Application{
					Name: "istio",
					KustomizeConfig: &kfdefv1beta1.KustomizeConfig{
						RepoRef: &kfdefv1beta1.RepoRef{
							Name: "manifests",
							Path: "istio/istio",
						},
						Parameters: []kfdefv1beta1.NameValue{
							kfdefv1beta1.NameValue{
								Name:  "clusterRbacConfig",
								Value: "ON",
							},
						},
					},
				},
			},
		},
	}
	expectedOutput.Kind = "KdDef"
	expectedOutput.APIVersion = "kfdef.apps.kubeflow.org/v1beta1"
	gcpPluginSpec := &kfgcp.GcpPluginSpec{
		Project:                         "foo-project",
		Email:                           "foo@gmail.com",
		IpName:                          "foo-ip",
		Hostname:                        "foo.endpoints.foo-project.cloud.goog",
		Zone:                            "us-east1-b",
		UseBasicAuth:                    false,
		SkipInitProject:                 true,
		EnableApplications:              true,
		DeleteStorage:                   true,
		CreatePipelinePersistentStorage: &createPipelinePersistentStorage,
		Auth: &kfgcp.Auth{
			IAP: &kfgcp.IAP{
				OAuthClientId: "foo-user",
				OAuthClientSecret: &kfdefv1alpha1.SecretRef{
					Name: "CLIENT_SECRET",
				},
			},
		},
	}
	if err := expectedOutput.SetPluginSpec("gcp", gcpPluginSpec); err != nil {
		t.Fatalf("error when setting plugin spec: %v", err)
	}
	expectedOutput.Spec.Plugins[0].Kind = "KfGcpPlugin"

	testCases := []testCase{
		testCase{
			filename: "kfdef_v1beta1.yaml",
			expected: expectedOutput,
		},
	}

	for _, c := range testCases {
		wd, _ := os.Getwd()
		path := path.Join(wd, "testdata", c.filename)
		kfdef, err := LoadKfDefFromURI(path)
		if err != nil {
			t.Fatalf("error when loading kfdef: %v", err)
		}
		if !reflect.DeepEqual(kfdef, *c.expected) {
			t.Errorf("KfDef loaded doesn't match expected;\nloaded\n%v\nexpected\n%v",
				kfutils.PrettyPrint(kfdef),
				kfutils.PrettyPrint(*c.expected))
		}
	}
}

func TestKfLoader_LoadKfDefBackwardCompatible(t *testing.T) {
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
		t.Errorf("KfDef loaded is not compatible;\nalpha\n%v\nbeta\n%v",
			kfutils.PrettyPrint(alpha),
			kfutils.PrettyPrint(beta))
	}
}

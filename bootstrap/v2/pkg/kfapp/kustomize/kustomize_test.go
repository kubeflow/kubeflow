package kustomize

import (
	"github.com/kubeflow/kubeflow/bootstrap/config"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v2/pkg/utils"
	"reflect"
	"testing"
)

func TestKustomize_BackfillOptions(t *testing.T) {
	type testCase struct {
		input    *kustomize
		expected []kfdefsv2.Application
	}

	testCases := []testCase{
		{
			input: &kustomize{
				kfDef: &kfdefsv2.KfDef{
					Spec: kfdefsv2.KfDefSpec{
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
					Status: kfdefsv2.KfDefStatus{
						ReposCache: map[string]kfdefsv2.RepoCache{
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
			expected: []kfdefsv2.Application{
				{
					Name: "istio-crds",
					KustomizeConfig: &kfdefsv2.KustomizeConfig{
						RepoRef: &kfdefsv2.RepoRef{
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

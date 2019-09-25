package kfupgrade

import (
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"reflect"
	"testing"
)

func Test_MergeKfDef(t *testing.T) {
	type testCase struct {
		oldKf    *kfdefsv3.KfDef
		newKf    *kfdefsv3.KfDef
		expected *kfdefsv3.KfDef
	}

	testCases := []testCase{
		// Param names are different; no merging.
		{
			oldKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
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
			newKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
			expected: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
		},
		// App names are different, no merging
		{
			oldKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app2",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
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
			newKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app3",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "new1",
									},
								},
							},
						},
					},
				},
			},
			expected: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app3",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "new1",
									},
								},
							},
						},
					},
				},
			},
		},
		// Merging old param values to new
		{
			oldKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
			newKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "new1",
									},
									{
										Name:  "p2",
										Value: "new2",
									},
								},
							},
						},
					},
				},
			},
			expected: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
		},
		// Merging two apps
		{
			oldKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
			newKf: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "new1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p2",
										Value: "new2",
									},
								},
							},
						},
					},
				},
			},
			expected: &kfdefsv3.KfDef{
				Spec: kfdefsv3.KfDefSpec{
					Applications: []kfdefsv3.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfdefsv3.KustomizeConfig{
								Parameters: []config.NameValue{
									{
										Name:  "p2",
										Value: "old2",
									},
								},
							},
						},
					},
				},
			},
		},
	}

	for _, c := range testCases {
		MergeKfDef(c.oldKf, c.newKf)
		if !reflect.DeepEqual(c.newKf, c.expected) {
			t.Errorf("MergeKfDef produced incorrect results; got\n%v\nwant:\n%v", utils.PrettyPrint(c.newKf), utils.PrettyPrint(c.expected))
		}
	}
}

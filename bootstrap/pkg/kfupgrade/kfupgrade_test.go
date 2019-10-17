package kfupgrade

import (
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"reflect"
	"testing"
)

func Test_MergeKfCfg(t *testing.T) {
	type testCase struct {
		oldKf    *kfconfig.KfConfig
		newKf    *kfconfig.KfConfig
		expected *kfconfig.KfConfig
	}

	testCases := []testCase{
		// Param names are different; no merging.
		{
			oldKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			newKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			expected: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			oldKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app2",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			newKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app3",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			expected: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app3",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			oldKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			newKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			expected: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			oldKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			newKf: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
									{
										Name:  "p1",
										Value: "new1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
			expected: &kfconfig.KfConfig{
				Spec: kfconfig.KfConfigSpec{
					Applications: []kfconfig.Application{
						{
							Name: "app1",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
									{
										Name:  "p1",
										Value: "old1",
									},
								},
							},
						},
						{
							Name: "app2",
							KustomizeConfig: &kfconfig.KustomizeConfig{
								Parameters: []kfconfig.NameValue{
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
		MergeKfCfg(c.oldKf, c.newKf)
		if !reflect.DeepEqual(c.newKf, c.expected) {
			t.Errorf("MergeKfCfg produced incorrect results; got\n%v\nwant:\n%v", utils.PrettyPrint(c.newKf), utils.PrettyPrint(c.expected))
		}
	}
}

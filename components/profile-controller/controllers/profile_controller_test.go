package controllers

import (
	"encoding/json"
	"fmt"
	istioSecurity "istio.io/api/security/v1beta1"
	rbacv1 "k8s.io/api/rbac/v1"
	"reflect"
	"sort"
	"testing"

	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"github.com/stretchr/testify/assert"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
)

type namespaceLabelSuite struct {
	current  corev1.Namespace
	labels   map[string]string
	expected corev1.Namespace
}

func TestEnforceNamespaceLabelsFromConfig(t *testing.T) {
	name := "test-namespace"
	tests := []namespaceLabelSuite{
		namespaceLabelSuite{
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: name,
				},
			},
			map[string]string{
				"katib.kubeflow.org/metrics-collector-injection": "enabled",
				"serving.kubeflow.org/inferenceservice":          "enabled",
				"pipelines.kubeflow.org/enabled":                 "true",
				"app.kubernetes.io/part-of":                      "kubeflow-profile",
			},
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"katib.kubeflow.org/metrics-collector-injection": "enabled",
						"serving.kubeflow.org/inferenceservice":          "enabled",
						"pipelines.kubeflow.org/enabled":                 "true",
						"app.kubernetes.io/part-of":                      "kubeflow-profile",
					},
					Name: name,
				},
			},
		},
		namespaceLabelSuite{
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"user-name":                             "Jim",
						"serving.kubeflow.org/inferenceservice": "disabled",
					},
					Name: name,
				},
			},
			map[string]string{
				"katib.kubeflow.org/metrics-collector-injection": "enabled",
				"serving.kubeflow.org/inferenceservice":          "enabled",
				"pipelines.kubeflow.org/enabled":                 "true",
				"app.kubernetes.io/part-of":                      "kubeflow-profile",
			},
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"user-name": "Jim",
						"katib.kubeflow.org/metrics-collector-injection": "enabled",
						"serving.kubeflow.org/inferenceservice":          "disabled",
						"pipelines.kubeflow.org/enabled":                 "true",
						"app.kubernetes.io/part-of":                      "kubeflow-profile",
					},
					Name: name,
				},
			},
		},
		namespaceLabelSuite{
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"user-name":     "Jim",
						"removal-label": "enabled",
					},
					Name: name,
				},
			},
			map[string]string{
				"katib.kubeflow.org/metrics-collector-injection": "enabled",
				"serving.kubeflow.org/inferenceservice":          "enabled",
				"pipelines.kubeflow.org/enabled":                 "true",
				"app.kubernetes.io/part-of":                      "kubeflow-profile",
				"removal-label":                                  "",
			},
			corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"user-name": "Jim",
						"katib.kubeflow.org/metrics-collector-injection": "enabled",
						"serving.kubeflow.org/inferenceservice":          "enabled",
						"pipelines.kubeflow.org/enabled":                 "true",
						"app.kubernetes.io/part-of":                      "kubeflow-profile",
					},
					Name: name,
				},
			},
		},
	}
	for _, test := range tests {
		setNamespaceLabels(&test.current, test.labels)
		if !reflect.DeepEqual(&test.expected, &test.current) {
			t.Errorf("Expect:\n%v; Output:\n%v", &test.expected, &test.current)
		}
	}
}

type getPluginSpecSuite struct {
	profile         *profilev1.Profile
	expectedPlugins []Plugin
}

func TestGetPluginSpec(t *testing.T) {
	role_arn := "arn:aws:iam::123456789012:role/test-iam-role"
	gcp_sa := "kubeflow2@project-id.iam.gserviceaccount.com"
	tests := []getPluginSpecSuite{
		{
			&profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "aws-user-profile",
					Namespace: "k8snamespace",
				},
				Spec: profilev1.ProfileSpec{
					Plugins: []profilev1.Plugin{
						{
							TypeMeta: metav1.TypeMeta{
								Kind: KIND_AWS_IAM_FOR_SERVICE_ACCOUNT,
							},
							Spec: &runtime.RawExtension{
								Raw: []byte(fmt.Sprintf(`{"awsIamRole": "%v"}`, role_arn)),
							},
						},
					},
				},
			},
			[]Plugin{
				&AwsIAMForServiceAccount{
					AwsIAMRole: role_arn,
				},
			},
		},
		{
			&profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "gcp-user-profile",
					Namespace: "k8snamespace",
				},
				Spec: profilev1.ProfileSpec{
					Plugins: []profilev1.Plugin{
						{
							TypeMeta: metav1.TypeMeta{
								Kind: KIND_WORKLOAD_IDENTITY,
							},
							Spec: &runtime.RawExtension{
								Raw: []byte(fmt.Sprintf(`{"gcpServiceAccount": "%v"}`, gcp_sa)),
							},
						},
					},
				},
			},
			[]Plugin{
				&GcpWorkloadIdentity{
					GcpServiceAccount: gcp_sa,
				},
			},
		},
	}
	for _, test := range tests {
		loadedPlugins, err := createMockReconciler().GetPluginSpec(test.profile)

		assert.Nil(t, err)
		if !reflect.DeepEqual(&test.expectedPlugins, &loadedPlugins) {
			expected, _ := json.Marshal(test.expectedPlugins)
			found, _ := json.Marshal(loadedPlugins)
			t.Errorf("Test: %v. Expected:\n%v\nFound:\n%v", test.profile.Name, string(expected), string(found))
		}
	}
}

type getAuthorizationPolicySpecSuite struct {
	profile       *profilev1.Profile
	expectedWhens map[string][]string
}

func TestGetAuthorizationPolicy(t *testing.T) {
	mockReconcilier := createMockReconciler()
	tests := []getAuthorizationPolicySpecSuite{
		{
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "k8s-profile",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "profile-owner",
						Kind: "User",
					},
					Contributors: []rbacv1.Subject{},
				},
			},
			expectedWhens: map[string][]string{
				"source.namespace": {"k8s-profile"},
				fmt.Sprintf("request.headers[%v]", mockReconcilier.UserIdHeader): {fmt.Sprintf("%sprofile-owner", mockReconcilier.UserIdPrefix)},
			},
		},
		{
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "k8s-profile",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "profile-owner",
						Kind: "User",
					},
					Contributors: []rbacv1.Subject{
						{
							Name: "profile-member",
							Kind: "User",
						},
					},
				},
			},
			expectedWhens: map[string][]string{
				"source.namespace": {"k8s-profile"},
				fmt.Sprintf("request.headers[%v]", mockReconcilier.UserIdHeader): {
					fmt.Sprintf("%sprofile-owner", mockReconcilier.UserIdPrefix),
					fmt.Sprintf("%sprofile-member", mockReconcilier.UserIdPrefix),
				},
			},
		},
		{
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "k8s-profile",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "profile-group-owner",
						Kind: "Group",
					},
					Contributors: []rbacv1.Subject{
						{
							Name: "profile-member",
							Kind: "User",
						},
					},
				},
			},
			expectedWhens: map[string][]string{
				"source.namespace": {"k8s-profile"},
				fmt.Sprintf("request.headers[%v]", mockReconcilier.UserIdHeader): {
					fmt.Sprintf("%sprofile-member", mockReconcilier.UserIdPrefix),
				},
				fmt.Sprintf("request.headers[%v]", mockReconcilier.GroupHeader): {
					"*,profile-group-owner",
					"*,profile-group-owner,*",
					"profile-group-owner",
					"profile-group-owner,*",
				},
			},
		},
		{
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "k8s-profile",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "profile-group-owner",
						Kind: "Group",
					},
					Contributors: []rbacv1.Subject{
						{
							Name: "profile-group-member",
							Kind: "Group",
						},
					},
				},
			},
			expectedWhens: map[string][]string{
				"source.namespace": {"k8s-profile"},
				fmt.Sprintf("request.headers[%v]", mockReconcilier.GroupHeader): {
					"*,profile-group-owner",
					"*,profile-group-owner,*",
					"profile-group-owner",
					"profile-group-owner,*",
					"*,profile-group-member",
					"*,profile-group-member,*",
					"profile-group-member",
					"profile-group-member,*",
				},
			},
		},
	}

	for _, test := range tests {
		policy := createMockReconciler().getAuthorizationPolicy(test.profile)
		var whens []*istioSecurity.Condition
		// Collect all when conditions in generated policy
		for _, rule := range policy.Rules {
			if rule.When != nil {
				whens = append(whens, rule.When...)
			}
		}

		for _, when := range whens {
			values, ok := test.expectedWhens[when.Key]
			// Sort to allow comparison
			sort.Strings(values)
			sort.Strings(when.Values)

			assert.True(t, ok, "a `when` condition is in the generated policy without corresponding test case")
			assert.Equal(t, values, when.Values, "the `when` values does not correspond")
		}
	}
}

func createMockReconciler() *ProfileReconciler {
	reconciler := &ProfileReconciler{
		Scheme:                     runtime.NewScheme(),
		Log:                        ctrl.Log,
		UserIdHeader:               "userid",
		UserIdPrefix:               "dummy",
		GroupHeader:                "group",
		WorkloadIdentity:           "dummy",
		DefaultNamespaceLabelsPath: "dummy",
	}
	return reconciler
}

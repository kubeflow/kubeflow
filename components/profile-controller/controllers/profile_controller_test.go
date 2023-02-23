package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	qt "github.com/frankban/quicktest"
	"github.com/go-logr/logr"
	"github.com/google/go-cmp/cmp/cmpopts"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"github.com/stretchr/testify/assert"
	istioRegister "istio.io/client-go/pkg/apis/security/v1beta1"
	corev1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/utils/pointer"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/fake"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"
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

func createMockReconciler() *ProfileReconciler {
	reconciler := &ProfileReconciler{
		Scheme:                     runtime.NewScheme(),
		Log:                        ctrl.Log,
		UserIdHeader:               "dummy",
		UserIdPrefix:               "dummy",
		WorkloadIdentity:           "dummy",
		DefaultNamespaceLabelsPath: "dummy",
	}
	return reconciler
}

func TestProfileReconciler_ReconcileNamespace(t *testing.T) {
	cases := map[string]struct {
		profile     *profilev1.Profile
		initObjects []client.Object
		want        *corev1.Namespace
		opts        []ProfileReconcilerOption
	}{
		"CreatesANamespace": {
			opts: []ProfileReconcilerOption{WithLabelReaderFunc(nopLabelReader)},
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					UID:  "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "chunk@example.com",
						Kind: rbacv1.UserKind,
					},
				},
			},
			initObjects: []client.Object{},
			want: &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					Annotations: map[string]string{
						"owner": "chunk@example.com",
					},
					Labels: map[string]string{
						"istio-injection": "enabled",
					},
					OwnerReferences: []metav1.OwnerReference{{
						APIVersion:         "kubeflow.org/v1",
						Kind:               profilev1.ProfileKind,
						Name:               "chunk",
						UID:                "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
						Controller:         pointer.Bool(true),
						BlockOwnerDeletion: pointer.Bool(true),
					}},
				},
			},
		},
		"CreatesANamespaceWithProvidedLabels": {
			opts: []ProfileReconcilerOption{WithLabelReaderFunc(
				passThroughLabelReader(map[string]string{
					"app.kubernetes.io/part-of": "kubeflow-profile",
					"foo":                       "bar",
				}),
			)},
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					UID:  "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "chunk@example.com",
						Kind: rbacv1.UserKind,
					},
				},
			},
			initObjects: []client.Object{},
			want: &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					Annotations: map[string]string{
						"owner": "chunk@example.com",
					},
					Labels: map[string]string{
						"istio-injection":           "enabled",
						"app.kubernetes.io/part-of": "kubeflow-profile",
						"foo":                       "bar",
					},
					OwnerReferences: []metav1.OwnerReference{{
						APIVersion:         "kubeflow.org/v1",
						Kind:               profilev1.ProfileKind,
						Name:               "chunk",
						UID:                "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
						Controller:         pointer.Bool(true),
						BlockOwnerDeletion: pointer.Bool(true),
					}},
				},
			},
		},
		"IgnoresANamespacesNotOwned": {
			opts: []ProfileReconcilerOption{WithLabelReaderFunc(nopLabelReader)},
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					UID:  "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "chunk@example.com",
						Kind: rbacv1.UserKind,
					},
				},
			},
			initObjects: []client.Object{
				&corev1.Namespace{
					ObjectMeta: metav1.ObjectMeta{
						Name: "chunk",
					},
				},
			},
			want: &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
				},
			},
		},
		"AdoptsAnAnnotatedNamespace": {
			opts: []ProfileReconcilerOption{WithLabelReaderFunc(passThroughLabelReader(
				map[string]string{"foo": "bar"},
			))},
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					UID:  "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "chunk@example.com",
						Kind: rbacv1.UserKind,
					},
				},
			},
			initObjects: []client.Object{
				&corev1.Namespace{
					ObjectMeta: metav1.ObjectMeta{
						Name: "chunk",
						Annotations: map[string]string{
							"owner": "chunk@example.com",
						},
					},
				},
			},
			want: &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					Annotations: map[string]string{
						"owner": "chunk@example.com",
					},
					Labels: map[string]string{
						"foo":             "bar",
						"istio-injection": "enabled",
					},
					OwnerReferences: []metav1.OwnerReference{{
						APIVersion:         "kubeflow.org/v1",
						Kind:               profilev1.ProfileKind,
						Name:               "chunk",
						UID:                "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
						Controller:         pointer.Bool(true),
						BlockOwnerDeletion: pointer.Bool(true),
					}},
				},
			},
		},
		"IgnoresNamespaceAnnotatedWithDifferentOwner": {
			opts: []ProfileReconcilerOption{WithLabelReaderFunc(nopLabelReader)},
			profile: &profilev1.Profile{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					UID:  "53ac5675-9391-4f62-8b4f-cae88bdaaf0f",
				},
				Spec: profilev1.ProfileSpec{
					Owner: rbacv1.Subject{
						Name: "chunk@example.com",
						Kind: rbacv1.UserKind,
					},
				},
			},
			initObjects: []client.Object{
				&corev1.Namespace{
					ObjectMeta: metav1.ObjectMeta{
						Name: "chunk",
						Annotations: map[string]string{
							"owner": "sloth@example.com",
						},
					},
				},
			},
			want: &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: "chunk",
					Annotations: map[string]string{
						"owner": "sloth@example.com",
					},
				},
			},
		},
	}
	zl := zap.New(zap.UseDevMode(true))
	ctx := context.TODO()

	for name, subtest := range cases {
		t.Run(name, func(t *testing.T) {
			k8s := fake.NewClientBuilder().
				WithObjects(subtest.profile).
				WithObjects(subtest.initObjects...).
				WithScheme(newScheme(t)).
				Build()

			req := ctrl.Request{NamespacedName: client.ObjectKeyFromObject(subtest.profile)}
			r := NewProfileReconciler(newFakeManager(k8s, zl), subtest.opts...)
			res, err := r.Reconcile(ctx, req)

			qt.Assert(t, err, qt.IsNil)
			qt.Assert(t, res, qt.Equals, ctrl.Result{})
			got := &corev1.Namespace{}
			qt.Assert(t, k8s.Get(ctx, client.ObjectKeyFromObject(subtest.want), got), qt.IsNil)
			qt.Assert(t, got, qt.CmpEquals(
				cmpopts.IgnoreFields(corev1.Namespace{}, "ResourceVersion", "TypeMeta"),
			), subtest.want)
		})
	}
}

func newFakeManager(cli client.Client, logger logr.Logger) *fakeManager {
	return &fakeManager{client: cli, logger: logger}
}

type fakeManager struct {
	client client.Client
	logger logr.Logger
}

func (fm *fakeManager) GetClient() client.Client   { return fm.client }
func (fm *fakeManager) GetScheme() *runtime.Scheme { return fm.client.Scheme() }
func (fm *fakeManager) GetLogger() logr.Logger     { return fm.logger }

func nopLabelReader(path string) (map[string]string, error) {
	return map[string]string{}, nil
}

func passThroughLabelReader(m map[string]string) func(string) (map[string]string, error) {
	return func(_ string) (map[string]string, error) {
		return m, nil
	}
}

func newScheme(t *testing.T) *runtime.Scheme {
	scheme := runtime.NewScheme()
	assert.Nil(t, profilev1.AddToScheme(scheme))
	assert.Nil(t, corev1.AddToScheme(scheme))
	assert.Nil(t, rbacv1.AddToScheme(scheme))
	assert.Nil(t, istioRegister.AddToScheme(scheme))
	return scheme
}

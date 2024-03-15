package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path"
	"reflect"
	"testing"
	"time"

	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"github.com/stretchr/testify/assert"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/event"
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
		Scheme:                      runtime.NewScheme(),
		Log:                         ctrl.Log,
		UserIdHeader:                "placeholder",
		UserIdPrefix:                "placeholder",
		WorkloadIdentity:            "placeholder",
		DefaultNamespaceLabelsPaths: []string{"placeholder"},
	}
	return reconciler
}

type readDefaultLabelsFromFileSuite struct {
	name           string
	files          map[string]string
	expectedLabels map[string]string
	paths          []string
	hasError       bool
}

func TestReadDefaultLabelsFromFiles(t *testing.T) {
	tests := []readDefaultLabelsFromFileSuite{
		{
			name: "single",
			files: map[string]string{
				"single-file.yaml": "test-key: test-value",
			},
			expectedLabels: map[string]string{
				"test-key": "test-value",
			},
			paths:    []string{"single-file.yaml"},
			hasError: false,
		},
		{
			name: "multiple",
			files: map[string]string{
				"multiple-files/file1.yaml": "test-key1: test-value1",
				"file2.yaml":                "test-key2: test-value2",
			},
			expectedLabels: map[string]string{
				"test-key1": "test-value1",
				"test-key2": "test-value2",
			},
			paths:    []string{"multiple-files/file1.yaml", "file2.yaml"},
			hasError: false,
		},
		{
			name:     "file does not exist",
			paths:    []string{"does-not-exist.yaml"},
			hasError: true,
		},
		{
			name: "file is not yaml",
			files: map[string]string{
				"test-not-yaml.yaml": "notyaml",
			},
			paths:    []string{"test-not-yaml.yaml"},
			hasError: true,
		},
	}
	for _, test := range tests {
		for name, content := range test.files {
			fullPath := path.Join(test.name, name)
			dir, _ := path.Split(fullPath)
			err := os.MkdirAll(dir, 0700)
			defer os.RemoveAll(test.name)
			assert.Nil(t, err)
			err = os.WriteFile(fullPath, []byte(content), 0700)
			defer os.Remove(fullPath)
			assert.Nil(t, err)
		}
		var fullPaths []string
		for _, file := range test.paths {
			fullPaths = append(fullPaths, path.Join(test.name, file))
		}
		labels, err := createMockReconciler().readDefaultLabelsFromFiles(fullPaths)
		if test.hasError {
			assert.NotNil(t, err)
		} else {
			assert.Nil(t, err)
		}
		assert.Equal(t, test.expectedLabels, labels, "Expect:\n%v; Output:\n%v")
	}
}

type FakeManager struct {
	ctrl.Manager
	elected chan struct{}
}

func (f FakeManager) Elected() <-chan struct{} {
	return f.elected
}

func TestSetupFileWatchers(t *testing.T) {
	// Setup file
	fileName := "file.yaml"
	dirName := "setup-watchers"
	err := os.MkdirAll(dirName, 0700)
	defer os.RemoveAll(dirName)
	assert.Nil(t, err)
	fullPath := path.Join(dirName, fileName)
	err = os.WriteFile(fullPath, []byte("testing"), 0700)
	defer os.Remove(fullPath)
	assert.Nil(t, err)
	events := make(chan event.GenericEvent)
	defer close(events)
	r := createMockReconciler()
	r.DefaultNamespaceLabelsPaths = []string{fullPath}
	elected := make(chan struct{})
	fakeMgr := FakeManager{
		elected: elected,
	}
	// The manager is not the leader so we shouldn't receive any events on file update
	err = r.setupFileWatchers(events, fakeMgr)
	assert.Nil(t, err)
	defer r.ShutdownFileWatchers()
	ctx, cancelWatchTestFunction := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancelWatchTestFunction()
	err = os.WriteFile(fullPath, []byte("change file"), 0700)
	eventReceived := watchTestFunction(events, ctx)
	assert.Nil(t, err)
	assert.False(t, eventReceived)
	// Make the manager the leader and make sure updates to file provide event
	clearEvents(events)
	close(fakeMgr.elected)
	ctx, cancelWatchTestFunctionLeader := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancelWatchTestFunctionLeader()
	err = os.WriteFile(fullPath, []byte("change file another time"), 0700)
	eventReceived = watchTestFunction(events, ctx)
	assert.Nil(t, err)
	assert.True(t, eventReceived)
	// Make sure after shutting down no more events are sent
	clearEvents(events)
	r.ShutdownFileWatchers()
	ctx, cancelWatchTestFunctionShutdown := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancelWatchTestFunctionShutdown()
	err = os.WriteFile(fullPath, []byte("change file again"), 0700)
	eventReceived = watchTestFunction(events, ctx)
	assert.Nil(t, err)
	assert.False(t, eventReceived)
}

func TestSetupFileWatchersMissingFile(t *testing.T) {
	events := make(chan event.GenericEvent)
	defer close(events)
	r := createMockReconciler()
	r.DefaultNamespaceLabelsPaths = []string{"missing-file.yaml"}
	fakeMgr := FakeManager{}
	err := r.setupFileWatchers(events, fakeMgr)
	assert.NotNil(t, err)
	defer r.ShutdownFileWatchers()
}

func TestSetupFileWatchersMissingSecondFile(t *testing.T) {
	// Set up file
	fileName := "file.yaml"
	dirName := "setup-watchers-missing-second"
	err := os.MkdirAll(dirName, 0700)
	defer os.RemoveAll(dirName)
	assert.Nil(t, err)
	fullPath := path.Join(dirName, fileName)
	err = os.WriteFile(fullPath, []byte("testing"), 0700)
	defer os.Remove(fullPath)
	assert.Nil(t, err)
	events := make(chan event.GenericEvent)
	defer close(events)
	r := createMockReconciler()
	r.DefaultNamespaceLabelsPaths = []string{fullPath, "missing-file.yaml"}
	fakeMgr := FakeManager{}
	err = r.setupFileWatchers(events, fakeMgr)
	assert.NotNil(t, err)
	defer r.ShutdownFileWatchers()
	// Make sure updates to first file does not provide event
	ctx, cancelWatchTestFunction := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancelWatchTestFunction()
	eventReceived := watchTestFunction(events, ctx)
	err = os.WriteFile(fullPath, []byte("change file"), 0700)
	assert.Nil(t, err)
	assert.False(t, eventReceived)
}

func watchTestFunction(events chan event.GenericEvent, ctx context.Context) bool {
	// true is returned if an event was received
	for {
		select {
		case _ = <-events:
			return true
		case <-ctx.Done():
			return false
		}
	}
}

func clearEvents(events chan event.GenericEvent) {
	// clear events for 1 second between different stages of the file watcher tests
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	for {
		select {
		case _ = <-events:
			return
		case <-ctx.Done():
			return
		}
	}
}

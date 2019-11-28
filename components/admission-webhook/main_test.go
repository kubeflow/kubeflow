package main

import (
	"fmt"
	"reflect"
	"testing"

	settingsapi "github.com/kubeflow/kubeflow/components/admission-webhook/pkg/apis/settings/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func TestMergeMetadataBad(t *testing.T) {
	for _, test := range []struct {
		name   string
		meta   metav1.ObjectMeta
		pdMeta metav1.ObjectMeta
	}{
		{
			"Conflicting annotation",
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "buz"}},
		},
		{
			"Conflicting labels",
			metav1.ObjectMeta{Labels: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Labels: map[string]string{"foo": "buz"}},
		},
	} {
		podDefault := &settingsapi.PodDefault{ObjectMeta: test.pdMeta}
		if _, err := mergeMetadata(test.meta, []*settingsapi.PodDefault{podDefault}); err == nil {
			t.Fatal("Expected error but got none")
		}
	}
}

func TestMergeMetadataGood(t *testing.T) {
	for _, test := range []struct {
		name    string
		meta    metav1.ObjectMeta
		pdMeta  metav1.ObjectMeta
		expMeta metav1.ObjectMeta
	}{
		{
			"Add annotation",
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Annotations: map[string]string{"baz": "bux"}},
			metav1.ObjectMeta{Annotations: map[string]string{
				"foo": "bar",
				"baz": "bux",
			}},
		},
		{
			"Add nothing",
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{},
			metav1.ObjectMeta{Annotations: map[string]string{
				"foo": "bar",
			}},
		},
		{
			"Same k/v in annotations",
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Annotations: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Annotations: map[string]string{
				"foo": "bar",
			}},
		},
		{
			"Add label",
			metav1.ObjectMeta{Labels: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Labels: map[string]string{"baz": "bux"}},
			metav1.ObjectMeta{Labels: map[string]string{
				"foo": "bar",
				"baz": "bux",
			}},
		},
		{
			"Same k/v in labels",
			metav1.ObjectMeta{Labels: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Labels: map[string]string{"foo": "bar"}},
			metav1.ObjectMeta{Labels: map[string]string{
				"foo": "bar",
			}},
		},
		{
			"Mixed annotations and labels",
			metav1.ObjectMeta{
				Annotations: map[string]string{"foo": "bar"},
				Labels:      map[string]string{"fizz": "buzz"},
			},
			metav1.ObjectMeta{Labels: map[string]string{"fooz": "barz"}},
			metav1.ObjectMeta{
				Annotations: map[string]string{"foo": "bar"},
				Labels: map[string]string{
					"fizz": "buzz",
					"fooz": "barz",
				}},
		},
	} {
		t.Run(fmt.Sprintf(test.name), func(t *testing.T) {
			var (
				expected   = test.expMeta.DeepCopy()
				podDefault = &settingsapi.PodDefault{ObjectMeta: test.pdMeta}
			)
			mergedMeta, err := mergeMetadata(test.meta, []*settingsapi.PodDefault{podDefault})
			if err != nil {
				t.Fatal(err)
			}
			if !reflect.DeepEqual(mergedMeta, expected) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", mergedMeta, expected)
			}
		})
	}
}

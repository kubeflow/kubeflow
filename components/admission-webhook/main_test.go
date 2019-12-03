package main

import (
	"fmt"
	"reflect"
	"testing"
)

func TestMergeMapBad(t *testing.T) {
	for _, test := range []struct {
		name     string
		existing map[string]string
		defaults map[string]string
	}{
		{
			"Conflicting annotation",
			map[string]string{"foo": "bar"},
			map[string]string{"foo": "buz"},
		},
	} {
		if _, err := mergeMap(test.existing, []*map[string]string{&test.defaults}); err == nil {
			t.Fatal("Expected error but got none")
		}
	}
}

func TestMergeMapGood(t *testing.T) {
	for _, test := range []struct {
		name     string
		existing map[string]string
		defaults map[string]string
		out      map[string]string
	}{
		{
			"Add annotation",
			map[string]string{"foo": "bar"},
			map[string]string{"baz": "bux"},
			map[string]string{
				"foo": "bar",
				"baz": "bux",
			},
		},
		{
			"Add nothing",
			map[string]string{"foo": "bar"},
			map[string]string{},
			map[string]string{
				"foo": "bar",
			},
		},
		{
			"Same k/v in annotations",
			map[string]string{"foo": "bar"},
			map[string]string{"foo": "bar"},
			map[string]string{
				"foo": "bar",
			},
		},
	} {
		t.Run(fmt.Sprintf(test.name), func(t *testing.T) {
			out, err := mergeMap(test.existing, []*map[string]string{&test.defaults})
			if err != nil {
				t.Fatal(err)
			}
			if !reflect.DeepEqual(out, test.out) {
				t.Fatalf("%#v\n  Not Equals:\n%#v", out, test.out)
			}
		})
	}
}

package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_UnknownDefinitionError(t *testing.T) {
	err := NewUnknownDefinitionError("name")
	require.Equal(t, `"name" is not a known definition name`, err.Error())
}

func Test_Description_Validate(t *testing.T) {
	cases := []struct {
		name        string
		description Description
		isErr       bool
	}{
		{
			name:        "with version",
			description: Description{Version: "version"},
		},
		{
			name:        "with out version",
			description: Description{},
			isErr:       true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := tc.description.Validate()
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func Test_ParseDescription(t *testing.T) {
	cases := []struct {
		name        string
		description Description
		err         error
	}{
		{
			name: "foo.bar",
			err:  NewUnknownDefinitionError("foo.bar"),
		},
		{
			name: "io.k8s.apimachinery.pkg.version.Info",
			description: Description{
				Name:     "io.k8s.apimachinery.pkg.version.Info",
				Kind:     "Info",
				Codebase: "apimachinery",
			},
		},
		{
			name: "io.k8s.apimachinery.pkg.apis.meta.v1.Status",
			description: Description{
				Name:     "io.k8s.apimachinery.pkg.apis.meta.v1.Status",
				Kind:     "Status",
				Version:  "v1",
				Group:    "meta",
				Codebase: "apimachinery",
			},
		},
		{
			name: "io.k8s.api.admissionregistration.v1alpha1.AdmissionHookClientConfig",
			description: Description{
				Name:     "io.k8s.api.admissionregistration.v1alpha1.AdmissionHookClientConfig",
				Version:  "v1alpha1",
				Kind:     "AdmissionHookClientConfig",
				Group:    "admissionregistration",
				Codebase: "api",
			},
		},
		{
			name: "io.k8s.codebase.pkg.api.version.kind",
			description: Description{
				Name:     "io.k8s.codebase.pkg.api.version.kind",
				Version:  "version",
				Kind:     "kind",
				Codebase: "codebase",
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			d, err := ParseDescription(tc.name)
			if tc.err == nil {
				require.NoError(t, err)
				require.Equal(t, tc.description, *d)
			} else {
				require.Error(t, err)
			}
		})
	}
}

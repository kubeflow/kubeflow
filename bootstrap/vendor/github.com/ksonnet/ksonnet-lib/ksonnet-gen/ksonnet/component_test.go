package ksonnet

import (
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
	"github.com/stretchr/testify/require"
)

func testdata(name string) string {
	return filepath.Join("testdata", name)
}

func TestComponent(t *testing.T) {
	cases := []struct {
		name     string
		expected *Component
		isErr    bool
	}{
		{
			name: "io.k8s.api.apps.v1beta2.Deployment",
			expected: &Component{
				Group:   "apps",
				Version: "v1beta2",
				Kind:    "Deployment",
			},
		},
		{
			name:  "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
			isErr: true,
		},
		{
			name:  "missing",
			isErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			apiSpec, _, err := kubespec.Import(testdata("swagger-1.8.json"))
			require.NoError(t, err)

			schema := apiSpec.Definitions[tc.name]

			c, err := NewComponent(schema)
			if tc.isErr {
				require.Error(t, err)

			} else {
				require.NoError(t, err)
				require.Equal(t, tc.expected, c)
			}

		})
	}

}

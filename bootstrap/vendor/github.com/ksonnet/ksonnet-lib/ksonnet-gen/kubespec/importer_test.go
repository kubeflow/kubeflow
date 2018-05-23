package kubespec_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"

	"github.com/stretchr/testify/require"
)

func testdata(name string) string {
	return filepath.Join("testdata", name)
}

func TestImporter_Import(t *testing.T) {
	cases := []struct {
		name     string
		location string
		checksum string
		isErr    bool
	}{
		{
			name:     "missing file",
			location: "missing.json",
			isErr:    true,
		},
		{
			name:     "invalid file",
			location: testdata("invalid.json"),
			isErr:    true,
		},
		{
			name:     "valid file",
			location: testdata("deployment.json"),
			checksum: "0958866ac95c381dc661136396c73456038854df20b06688332a91a463857135",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				t.Logf("path = %s", r.URL.Path)
				if r.URL.Path != "/swagger.json" {
					http.NotFound(w, r)
					return
				}

				fmt.Fprintln(w, `{"swagger": "2.0", "info": {"title": "Kubernetes"}}`)
			}))
			defer ts.Close()

			apiSpec, checksum, err := kubespec.Import(tc.location)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.NotNil(t, apiSpec)
				require.Equal(t, tc.checksum, checksum)
			}
		})
	}
}

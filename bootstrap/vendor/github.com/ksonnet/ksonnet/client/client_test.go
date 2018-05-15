// Copyright 2018 The ksonnet authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package client

import (
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/pkg/errors"
	"github.com/stretchr/testify/require"
	restclient "k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

func TestConfig_GetAPISpec(t *testing.T) {
	b, err := ioutil.ReadFile("testdata/swagger.json")
	require.NoError(t, err)

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, string(b))
	})

	ts := httptest.NewServer(handler)
	defer ts.Close()

	tsTLS := httptest.NewTLSServer(handler)
	defer tsTLS.Close()

	tmpfile, err := ioutil.TempFile("", "")
	require.NoError(t, err)
	defer os.Remove(tmpfile.Name())

	certPEM := buildPEM(tsTLS.Certificate())

	_, err = tmpfile.Write(certPEM)
	require.NoError(t, err)

	err = tmpfile.Close()
	require.NoError(t, err)

	cases := []struct {
		name      string
		serverURL string
		expected  string
		caData    []byte
		caFile    string
	}{
		{
			name:      "invalid server URL",
			serverURL: "http://+++",
			expected:  defaultVersion,
		},
		{
			name:      "with a server",
			serverURL: ts.URL,
			expected:  "version:v1.9.3",
		},
		{
			name:      "TLS with file cert",
			serverURL: tsTLS.URL,
			expected:  "version:v1.9.3",
			caFile:    tmpfile.Name(),
		},
		{
			name:      "TLS with data cert",
			serverURL: tsTLS.URL,
			expected:  "version:v1.9.3",
			caData:    certPEM,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			c := Config{
				Config: &clientConfig{
					caFile: tc.caFile,
					caData: tc.caData,
				},
			}
			got := c.GetAPISpec(tc.serverURL)
			require.Equal(t, tc.expected, got)
		})
	}
}

func buildPEM(cert *x509.Certificate) []byte {
	b := &pem.Block{Type: "CERTIFICATE", Bytes: cert.Raw}
	return pem.EncodeToMemory(b)
}

type clientConfig struct {
	caFile string
	caData []byte
}

var _ clientcmd.ClientConfig = (*clientConfig)(nil)

func (c *clientConfig) RawConfig() (clientcmdapi.Config, error) {
	return clientcmdapi.Config{}, errors.Errorf("not implemented")
}

func (c *clientConfig) ClientConfig() (*restclient.Config, error) {
	rc := &restclient.Config{
		TLSClientConfig: restclient.TLSClientConfig{
			CAData: c.caData,
			CAFile: c.caFile,
		},
	}

	return rc, nil
}

func (c *clientConfig) Namespace() (string, bool, error) {
	return "", false, errors.Errorf("not implemented")
}

func (c *clientConfig) ConfigAccess() clientcmd.ConfigAccess {
	var ca clientcmd.ConfigAccess

	return ca
}

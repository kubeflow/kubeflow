package existing_arrikto

import (
	"crypto/tls"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"log"
	"os"
	"sigs.k8s.io/controller-runtime/pkg/client/fake"
	"testing"
)

func TestGenerateCert(t *testing.T) {
	cases := []struct {
		name        string
		addr        string
		expectError bool
	}{
		{
			name:        "ip",
			addr:        "10.0.93.8",
			expectError: false,
		},
		{
			name:        "dns missing scheme",
			addr:        "customdnsdomain.com",
			expectError: false,
		},
		{
			name:        "invalid ip",
			addr:        "451.4.4",
			expectError: true,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			certPEM, keyPEM, err := generateCert(c.addr)
			if err != nil {
				if !c.expectError {
					t.Fatalf("Unexpected error occured: %+v", err)
				} else {
					return
				}
			}

			cert, err := tls.X509KeyPair(certPEM, keyPEM)
			if err != nil {
				log.Fatalf("Unexpected error while loading keypair: %+v", cert)
			}
		})
	}
}

func TestGetEndpoints(t *testing.T) {
	cases := []struct {
		name                     string
		kubeflowEndpoint         string
		oidcEndpoint             string
		expectedKubeflowEndpoint string
		expectedOIDCEndpoint     string
		expectError              bool
	}{
		{
			name:                     "ip",
			kubeflowEndpoint:         "https://172.56.12.125",
			expectedKubeflowEndpoint: "https://172.56.12.125",
			expectedOIDCEndpoint:     "https://172.56.12.125:5556/dex",
			expectError:              false,
		},
		{
			name:                     "hostname",
			kubeflowEndpoint:         "https://example.com",
			expectedKubeflowEndpoint: "https://example.com",
			expectedOIDCEndpoint:     "https://example.com:5556/dex",
			expectError:              false,
		},
		{
			name:             "ip without scheme",
			kubeflowEndpoint: "172.56.12.125",
			expectError:      true,
		},
		{
			name:             "hostname without scheme",
			kubeflowEndpoint: "example.com",
			expectError:      true,
		},
		{
			name:                     "predetermined",
			kubeflowEndpoint:         "https://172.56.12.125",
			oidcEndpoint:             "https://172.56.12.125:5556/dex",
			expectedKubeflowEndpoint: "https://172.56.12.125",
			expectedOIDCEndpoint:     "https://172.56.12.125:5556/dex",
			expectError:              false,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			os.Setenv(KUBEFLOW_ENDPOINT, c.kubeflowEndpoint)
			os.Setenv(OIDC_ENDPOINT, c.oidcEndpoint)

			kubeflowEndpoint, oidcEndpoint, err := getEndpoints(nil)

			if err != nil {
				if !c.expectError {
					t.Fatalf("Unexpected error occured: %+v", err)
				} else {
					return
				}
			}

			if kubeflowEndpoint != c.expectedKubeflowEndpoint {
				t.Fatalf("Wrong Kubeflow Endpoint. Got %s, expected %s.", kubeflowEndpoint, c.expectedKubeflowEndpoint)
			}
			if oidcEndpoint != c.expectedOIDCEndpoint {
				t.Fatalf("Wrong Kubeflow Endpoint. Got %s, expected %s.", oidcEndpoint, c.expectedOIDCEndpoint)
			}
		})
	}
}

func TestGetLBAddress(t *testing.T) {
	cases := []struct {
		name         string
		lbIngresses  []corev1.LoadBalancerIngress
		expectedAddr string
		expectError  bool
	}{
		{
			name: "ip",
			lbIngresses: []corev1.LoadBalancerIngress{
				{
					IP:       "172.56.12.125",
					Hostname: "",
				},
			},
			expectedAddr: "172.56.12.125",
			expectError:  false,
		},
		{
			name: "hostname",
			lbIngresses: []corev1.LoadBalancerIngress{
				{
					IP:       "",
					Hostname: "mydomain.com",
				},
			},
			expectedAddr: "mydomain.com",
			expectError:  false,
		},
		{
			name: "ip and hostname",
			lbIngresses: []corev1.LoadBalancerIngress{
				{
					IP:       "172.56.12.125",
					Hostname: "mydomain.com",
				},
			},
			expectedAddr: "mydomain.com",
			expectError:  false,
		},
		{
			name: "multiple ingresses",
			lbIngresses: []corev1.LoadBalancerIngress{
				{
					IP:       "172.56.12.125",
					Hostname: "mydomain.com",
				},
				{
					IP:       "163.15.42.78",
					Hostname: "otherdomain.com",
				},
			},
			expectedAddr: "mydomain.com",
			expectError:  false,
		},
		{
			name: "empty",
			lbIngresses: []corev1.LoadBalancerIngress{
				{
					IP:       "",
					Hostname: "",
				},
			},
			expectError: true,
		},
	}

	for _, c := range cases {

		t.Run(c.name, func(t *testing.T) {
			lbService := &corev1.Service{
				ObjectMeta: metav1.ObjectMeta{
					Name:      "istio-ingressgateway",
					Namespace: "istio-system",
				},
				Status: corev1.ServiceStatus{
					LoadBalancer: corev1.LoadBalancerStatus{
						Ingress: c.lbIngresses,
					},
				},
			}
			kubeclient := fake.NewFakeClient(lbService)
			addr, err := getLBAddress(kubeclient)

			if err != nil {
				if !c.expectError {
					t.Fatalf("Unexpected error occured: %+v", err)
				} else {
					return
				}
			}

			if addr != c.expectedAddr {
				t.Fatalf("Wrong address. Got %s, expected %s", addr, c.expectedAddr)
			}
		})
	}
}

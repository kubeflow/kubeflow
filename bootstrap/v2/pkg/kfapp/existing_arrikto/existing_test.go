package existing_arrikto

import (
	"crypto/tls"
	"log"
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
			name:        "dns domain",
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

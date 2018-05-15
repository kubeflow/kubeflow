package kubespec

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"

	"github.com/go-openapi/spec"
	"github.com/go-openapi/swag"
	"github.com/pkg/errors"
)

// Import imports an OpenAPI swagger schema.
func Import(path string) (*spec.Swagger, string, error) {
	b, err := swag.LoadFromFileOrHTTP(path)
	if err != nil {
		return nil, "", errors.Wrap(err, "load schema from path")
	}

	h := sha256.New()
	h.Write(b)

	checksum := fmt.Sprintf("%x", h.Sum(nil))

	spec, err := CreateAPISpec(b)
	if err != nil {
		return nil, "", err
	}

	return spec, checksum, nil
}

// CreateAPISpec a swagger file into a *spec.Swagger.
func CreateAPISpec(b []byte) (*spec.Swagger, error) {
	var apiSpec spec.Swagger
	if err := json.Unmarshal(b, &apiSpec); err != nil {
		return nil, errors.Wrap(err, "parse swagger JSON")
	}

	return &apiSpec, nil
}

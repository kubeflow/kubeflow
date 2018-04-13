package ksonnet

import (
	"bytes"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/pkg/errors"
)

// Lib is a ksonnet lib.
type Lib struct {
	K8s        []byte
	Extensions []byte
	Version    string
}

// GenerateLib generates ksonnet lib.
func GenerateLib(source string) (*Lib, error) {
	apiSpec, checksum, err := kubespec.Import(source)
	if err != nil {
		return nil, errors.Wrap(err, "import Kubernetes spec")
	}

	c, err := NewCatalog(apiSpec, CatalogOptChecksum(checksum))
	if err != nil {
		return nil, errors.Wrap(err, "create ksonnet catalog")
	}

	k8s, err := createK8s(c)
	if err != nil {
		return nil, errors.Wrap(err, "create k8s.libsonnet")
	}

	k, err := createK(c)
	if err != nil {
		return nil, errors.Wrap(err, "create k.libsonnet")
	}

	lib := &Lib{
		K8s:        k8s,
		Extensions: k,
		Version:    c.apiVersion.String(),
	}

	return lib, nil
}

func createK8s(c *Catalog) ([]byte, error) {
	doc, err := NewDocument(c)
	if err != nil {
		return nil, errors.Wrapf(err, "create document")
	}

	node, err := doc.Node()
	if err != nil {
		return nil, errors.Wrapf(err, "build document node")
	}

	var buf bytes.Buffer

	if err := printer.Fprint(&buf, node.Node()); err != nil {
		return nil, errors.Wrap(err, "print AST")
	}

	return buf.Bytes(), nil
}

func createK(c *Catalog) ([]byte, error) {
	e := NewExtension(c)

	node, err := e.Node()
	if err != nil {
		return nil, errors.Wrapf(err, "build extension node")
	}

	var buf bytes.Buffer

	if err := printer.Fprint(&buf, node.Node()); err != nil {
		return nil, errors.Wrap(err, "print AST")
	}

	return buf.Bytes(), nil
}

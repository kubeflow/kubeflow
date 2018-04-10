package ksonnet

import (
	"bytes"
	"io/ioutil"
	"testing"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/printer"
	"github.com/stretchr/testify/require"
)

func TestExtension_Output(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	e := NewExtension(c)

	node, err := e.Node()
	require.NoError(t, err)

	var buf bytes.Buffer
	require.NoError(t, printer.Fprint(&buf, node.Node()))

	expected, err := ioutil.ReadFile("testdata/generated_k.libsonnet")
	require.NoError(t, err)

	if got := buf.String(); got != string(expected) {
		t.Fatal(got)
	}
}

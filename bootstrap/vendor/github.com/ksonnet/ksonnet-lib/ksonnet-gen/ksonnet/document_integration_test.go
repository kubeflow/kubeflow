package ksonnet_test

import (
	"bytes"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"testing"

	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/ksonnet"
	"github.com/stretchr/testify/require"
)

func testdata(name string) string {
	return filepath.Join("testdata", name)
}

func TestDocument_Integration(t *testing.T) {
	dir, err := ioutil.TempDir("", "document")
	require.NoError(t, err)

	defer os.RemoveAll(dir)

	lib := genDoc(t, "testdata/swagger-1.8.json")

	k8sPath := filepath.Join(dir, "k8s.libsonnet")
	writeFile(t, k8sPath, lib.K8s)
	verifyJsonnet(t, dir, "k8s.libsonnet")

	ksPath := filepath.Join(dir, "k.libsonnet")
	writeFile(t, ksPath, lib.Extensions)
	verifyJsonnet(t, dir, "k.libsonnet")

	compPath := filepath.Join(dir, "component.libsonnet")
	copyFile(t, testdata("component.libsonnet"), compPath)

	cmd := exec.Command(jsonnetCmd(), "component.libsonnet")
	cmd.Dir = dir

	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatal(string(out))
	}

	expected, err := ioutil.ReadFile(testdata("component.json"))
	require.NoError(t, err)

	require.Equal(t, string(expected), string(out))
}

func jsonnetCmd() string {
	bin := os.Getenv("JSONNET_BIN")
	if bin == "" {
		bin = "jsonnet"
	}

	return bin
}

func verifyJsonnet(t *testing.T, dir, fileName string) {
	cmd := exec.Command(jsonnetCmd(), "fmt", fileName)
	cmd.Dir = dir

	var b bytes.Buffer
	cmd.Stderr = &b

	err := cmd.Run()
	if err != nil {
		t.Fatalf("%s verification failed: %v", fileName, b.String())
	}
}

func genDoc(t *testing.T, input string) *ksonnet.Lib {
	lib, err := ksonnet.GenerateLib(input)
	require.NoError(t, err)

	return lib
}

func writeFile(t *testing.T, name string, content []byte) {
	err := ioutil.WriteFile(name, content, 0600)
	require.NoError(t, err)
}

func copyFile(t *testing.T, src, dest string) {
	from, err := os.Open(src)
	require.NoError(t, err)
	defer from.Close()

	to, err := os.OpenFile(dest, os.O_RDWR|os.O_CREATE, 0666)
	require.NoError(t, err)
	defer to.Close()

	_, err = io.Copy(to, from)
	require.NoError(t, err)
}

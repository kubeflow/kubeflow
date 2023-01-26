package controllers

import (
	"errors"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

const outDir = "tmp_crds"

var paths = map[string]string{"https://raw.githubusercontent.com/kubeflow/manifests/master/common/istio-1-16/istio-crds/base/crd.yaml": "istio_crds.yaml"}

func createOutDirIfNotExists() error {
	if _, err := os.Stat(outDir); errors.Is(err, os.ErrNotExist) {
		err := os.Mkdir(outDir, os.ModePerm)
		if err != nil {
			return err
		}
	}
	return nil
}

// Downloads external CRDs to tmp_crds directory
// We need to add istio CRDs to our scheme to be able to use them in our tests
func DownloadExternalCRDs() ([]string, error) {
	err := createOutDirIfNotExists()
	if err != nil {
		return nil, err
	}

	var resultFiles []string

	for url, file := range paths {
		filePath := filepath.Join(outDir, file)
		resultFiles = append(resultFiles, filePath)
		if _, err := os.Stat(filePath); err == nil {
			continue
		}
		file, err := os.Create(filePath)
		if err != nil {
			return nil, err
		}
		client := http.Client{
			CheckRedirect: func(r *http.Request, via []*http.Request) error {
				r.URL.Opaque = r.URL.Path
				return nil
			},
		}
		resp, err := client.Get(url)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()
		_, err = io.Copy(file, resp.Body)
		defer file.Close()

		if err != nil {
			return nil, err
		}
	}
	return resultFiles, nil
}

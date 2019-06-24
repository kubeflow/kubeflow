package app

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"os"
)

func copyFile(src, dst string) error {
	source, err := os.Open(src)
	if err != nil {
		return err
	}
	defer source.Close()

	destination, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destination.Close()
	_, err = io.Copy(destination, source)
	return err
}

// Pformat returns a pretty format output of any value.
func Pformat(value interface{}) (string, error) {
	if s, ok := value.(string); ok {
		return s, nil
	}
	valueJson, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return "", err
	}
	return string(valueJson), nil
}

func err2code(err error) int {
	// TODO(jlewi): We should map different errors to different http status codes.
	return http.StatusInternalServerError
}

// errorEncoder is a custom error used to encode errors into the http response.
// If the error is of type httpError that is used to obtain the statuscode.
// TODO(jlewi): Should we follow the model
func errorEncoder(_ context.Context, err error, w http.ResponseWriter) {
	h, ok := err.(*httpError)

	if ok {
		w.WriteHeader(h.Code)
	} else {
		w.WriteHeader(err2code(err))
	}
	json.NewEncoder(w).Encode(err)
}

// httpError allows us to attach add an http status code to an error
//
// Inspired by on https://cloud.google.com/apis/design/errors
type httpError struct {
	Message string
	Code    int
}

func (e *httpError) Error() string {
	return e.Message
}

type errorWrapper struct {
	Error string `json:"error"`
}

// encodeHTTPGenericRequest is a transport/http.EncodeRequestFunc that
// JSON-encodes any request to the request body. Primarily useful in a client.
func encodeHTTPGenericRequest(_ context.Context, r *http.Request, request interface{}) error {
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(request); err != nil {
		return err
	}
	r.Body = ioutil.NopCloser(&buf)
	return nil
}

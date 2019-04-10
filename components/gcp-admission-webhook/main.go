/*
Copyright 2019 The Kubeflow Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"crypto/tls"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"

	"k8s.io/api/admission/v1beta1"
	admissionregistrationv1beta1 "k8s.io/api/admissionregistration/v1beta1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/serializer"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	"k8s.io/klog"
)

// Config contains the server (the webhook) cert and key.
type Config struct {
	CertFile string
	KeyFile  string
}

// admitFunc is the type we use for all of our validators and mutators
type admitFunc func(v1beta1.AdmissionReview) *v1beta1.AdmissionResponse

var scheme = runtime.NewScheme()
var codecs = serializer.NewCodecFactory(scheme)

type patchOperation struct {
	Op    string      `json:"op"`
	Path  string      `json:"path"`
	Value interface{} `json:"value,omitempty"`
}

func addToScheme(scheme *runtime.Scheme) {
	utilruntime.Must(corev1.AddToScheme(scheme))
	utilruntime.Must(v1beta1.AddToScheme(scheme))
	utilruntime.Must(admissionregistrationv1beta1.AddToScheme(scheme))
}

func configTLS(config Config) *tls.Config {
	sCert, err := tls.LoadX509KeyPair(config.CertFile, config.KeyFile)
	if err != nil {
		klog.Fatal(err)
	}
	return &tls.Config{
		Certificates: []tls.Certificate{sCert},
		// TODO: uses mutual tls after we agree on what cert the apiserver should use.
		// ClientAuth:   tls.RequireAndVerifyClientCert,
	}
}

// toAdmissionResponse is a helper function to create an AdmissionResponse
// with an embedded error
func toAdmissionResponse(err error) *v1beta1.AdmissionResponse {
	return &v1beta1.AdmissionResponse{
		Result: &metav1.Status{
			Message: err.Error(),
		},
	}
}

// serve handles the http portion of a request prior to handing to an admit
// function
func serve(w http.ResponseWriter, r *http.Request, admit admitFunc) {
	var body []byte
	if r.Body != nil {
		if data, err := ioutil.ReadAll(r.Body); err == nil {
			body = data
		}
	}

	// verify the content type is accurate
	contentType := r.Header.Get("Content-Type")
	if contentType != "application/json" {
		klog.Errorf("contentType=%s, expect application/json", contentType)
		return
	}

	klog.V(2).Info(fmt.Sprintf("handling request: %s", body))

	// The AdmissionReview that was sent to the webhook
	requestedAdmissionReview := v1beta1.AdmissionReview{}

	// The AdmissionReview that will be returned
	responseAdmissionReview := v1beta1.AdmissionReview{}

	deserializer := codecs.UniversalDeserializer()
	if _, _, err := deserializer.Decode(body, nil, &requestedAdmissionReview); err != nil {
		klog.Error(err)
		responseAdmissionReview.Response = toAdmissionResponse(err)
	} else {
		// pass to admitFunc
		responseAdmissionReview.Response = admit(requestedAdmissionReview)
	}

	// Return the same UID
	responseAdmissionReview.Response.UID = requestedAdmissionReview.Request.UID

	respBytes, err := json.Marshal(responseAdmissionReview)
	if err != nil {
		klog.Error(err)
	}
	if _, err := w.Write(respBytes); err != nil {
		klog.Error(err)
	}
}

// Add Gcp credentials to pod
func addGcpCred(ar v1beta1.AdmissionReview) *v1beta1.AdmissionResponse {
	podResource := metav1.GroupVersionResource{Group: "", Version: "v1", Resource: "pods"}
	if ar.Request.Resource != podResource {
		klog.Errorf("expect resource to be %s", podResource)
		return nil
	}

	raw := ar.Request.Object.Raw
	pod := corev1.Pod{}
	deserializer := codecs.UniversalDeserializer()
	if _, _, err := deserializer.Decode(raw, nil, &pod); err != nil {
		klog.Error(err)
		return toAdmissionResponse(err)
	}
	reviewResponse := v1beta1.AdmissionResponse{}
	reviewResponse.Allowed = true

	if secretName, ok := pod.Labels["gcp-cred-secret"]; ok {
		if fileName, ok2 := pod.Labels["gcp-cred-secret-filename"]; ok2 {
			patched, err := getPatchString(pod, secretName, fileName)
			if err != nil {
				klog.Error(err)
				return toAdmissionResponse(err)
			}
			klog.Info("patch: " + string(patched[:]))
			reviewResponse.Patch = patched
			pt := v1beta1.PatchTypeJSONPatch
			reviewResponse.PatchType = &pt
		}
	}
	return &reviewResponse
}

func getPatchString(pod corev1.Pod, secretName string, fileName string) ([]byte, error) {
	patches := []patchOperation{}
	// volume patch
	volumePath := "/spec/volumes"
	volumeValue := corev1.Volume{
		Name: "gcp-credentials",
		VolumeSource: corev1.VolumeSource{
			Secret: &corev1.SecretVolumeSource{SecretName: secretName},
		},
	}
	var volumePatch patchOperation
	if len(pod.Spec.Volumes) == 0 {
		// First one, value is an array.
		volumePatch = patchOperation{
			Op:    "add",
			Path:  volumePath,
			Value: []corev1.Volume{volumeValue},
		}
	} else {
		// Not first one, add to the end.
		volumePatch = patchOperation{
			Op:    "add",
			Path:  volumePath + "/-",
			Value: volumeValue,
		}
	}
	patches = append(patches, volumePatch)
	// volumeMount patch
	volumeMountPath := "/spec/containers/0/volumeMounts"
	volumeMountValue := corev1.VolumeMount{
		Name:      "gcp-credentials",
		ReadOnly:  true,
		MountPath: "/secrets/gcp-service-account-credentials",
	}
	var volumeMountPatch patchOperation
	if len(pod.Spec.Containers[0].VolumeMounts) == 0 {
		// First one, value is an array.
		volumeMountPatch = patchOperation{
			Op:    "add",
			Path:  volumeMountPath,
			Value: []corev1.VolumeMount{volumeMountValue},
		}
	} else {
		// Not first one, add to the end.
		volumeMountPatch = patchOperation{
			Op:    "add",
			Path:  volumeMountPath + "/-",
			Value: volumeMountValue,
		}
	}
	patches = append(patches, volumeMountPatch)
	// env var patch
	envPath := "/spec/containers/0/env"
	envValue := corev1.EnvVar{
		Name:  "GOOGLE_APPLICATION_CREDENTIALS",
		Value: "/secrets/gcp-service-account-credentials/" + fileName,
	}
	var envPatch patchOperation
	if len(pod.Spec.Containers[0].Env) == 0 {
		// First one, value is an array.
		envPatch = patchOperation{
			Op:    "add",
			Path:  envPath,
			Value: []corev1.EnvVar{envValue},
		}
	} else {
		// Not first one, add to the end.
		envPatch = patchOperation{
			Op:    "add",
			Path:  envPath + "/-",
			Value: envValue,
		}
	}
	patches = append(patches, envPatch)

	return json.Marshal(patches)
}

func serveCred(w http.ResponseWriter, r *http.Request) {
	serve(w, r, addGcpCred)
}

func main() {
	addToScheme(scheme)

	var config Config
	flag.StringVar(&config.CertFile, "tlsCertFile", "/etc/webhook/certs/cert.pem", "File containing the x509 Certificate for HTTPS.")
	flag.StringVar(&config.KeyFile, "tlsKeyFile", "/etc/webhook/certs/key.pem", "File containing the x509 private key to --tlsCertFile.")
	flag.Parse()

	http.HandleFunc("/add-cred", serveCred)
	server := &http.Server{
		Addr:      ":443",
		TLSConfig: configTLS(config),
	}
	klog.Info("Start serving")
	server.ListenAndServeTLS("", "")
}

/*
Copyright 2018 The Kubernetes Authors.

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
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"reflect"
	"strings"

	"github.com/golang/glog"
	settingsapi "github.com/kubeflow/kubeflow/components/admission-webhook/pkg/apis/settings/v1alpha1"
	"github.com/mattbaird/jsonpatch"
	"k8s.io/api/admission/v1beta1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	utilerrors "k8s.io/apimachinery/pkg/util/errors"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/klog"
)

const (
	annotationPrefix = "podpreset.admission.kubeflow.org"
)

// Config contains the server (the webhook) cert and key.
type Config struct {
	CertFile string
	KeyFile  string
}

func (c *Config) addFlags() {
	flag.StringVar(&c.CertFile, "tls-cert-file", c.CertFile, ""+
		"File containing the default x509 Certificate for HTTPS. (CA cert, if any, concatenated "+
		"after server cert).")
	flag.StringVar(&c.KeyFile, "tls-private-key-file", c.KeyFile, ""+
		"File containing the default x509 private key matching --tls-cert-file.")
}

func toAdmissionResponse(err error) *v1beta1.AdmissionResponse {
	return &v1beta1.AdmissionResponse{
		Result: &metav1.Status{
			Message: err.Error(),
		},
	}
}

func filterPodPresets(list []settingsapi.PodPreset, pod *corev1.Pod) ([]*settingsapi.PodPreset, error) {
	var matchingPPs []*settingsapi.PodPreset

	for _, pp := range list {
		selector, err := metav1.LabelSelectorAsSelector(&pp.Spec.Selector)
		if err != nil {
			return nil, fmt.Errorf("label selector conversion failed: %v for selector: %v", pp.Spec.Selector, err)
		}

		// check if the pod labels match the selector
		if !selector.Matches(labels.Set(pod.Labels)) {
			glog.V(6).Infof("PodPreset '%s' does NOT match pod '%s' labels", pp.GetName(), pod.GetName())
			continue
		}
		// check if the pod namespace match the podpreset's namespace
		if pp.GetNamespace() != pod.GetNamespace() {
			klog.Infof("PodPreset '%s' is not in the namespcae of pod '%s' ", pp.GetName(), pod.GetName())
			continue
		}
		glog.V(4).Infof("PodPreset '%s' matches pod '%s' labels", pp.GetName(), pod.GetName())
		// create pointer to a non-loop variable
		newPP := pp
		matchingPPs = append(matchingPPs, &newPP)
	}
	return matchingPPs, nil
}

// safeToApplyPodPresetsOnPod determines if there is any conflict in information
// injected by given PodPresets in the Pod.
func safeToApplyPodPresetsOnPod(pod *corev1.Pod, podPresets []*settingsapi.PodPreset) error {
	var errs []error

	// volumes attribute is defined at the Pod level, so determine if volumes
	// injection is causing any conflict.
	if _, err := mergeVolumes(pod.Spec.Volumes, podPresets); err != nil {
		errs = append(errs, err)
	}
	for _, ctr := range pod.Spec.Containers {
		if err := safeToApplyPodPresetsOnContainer(&ctr, podPresets); err != nil {
			errs = append(errs, err)
		}
	}
	return utilerrors.NewAggregate(errs)
}

// safeToApplyPodPresetsOnContainer determines if there is any conflict in
// information injected by given PodPresets in the given container.
func safeToApplyPodPresetsOnContainer(ctr *corev1.Container, podPresets []*settingsapi.PodPreset) error {
	var errs []error
	// check if it is safe to merge env vars and volume mounts from given podpresets and
	// container's existing env vars.
	if _, err := mergeEnv(ctr.Env, podPresets); err != nil {
		errs = append(errs, err)
	}
	if _, err := mergeVolumeMounts(ctr.VolumeMounts, podPresets); err != nil {
		errs = append(errs, err)
	}

	return utilerrors.NewAggregate(errs)
}

// mergeEnv merges a list of env vars with the env vars injected by given list podPresets.
// It returns an error if it detects any conflict during the merge.
func mergeEnv(envVars []corev1.EnvVar, podPresets []*settingsapi.PodPreset) ([]corev1.EnvVar, error) {
	origEnv := map[string]corev1.EnvVar{}
	for _, v := range envVars {
		origEnv[v.Name] = v
	}

	mergedEnv := make([]corev1.EnvVar, len(envVars))
	copy(mergedEnv, envVars)

	var errs []error

	for _, pp := range podPresets {
		for _, v := range pp.Spec.Env {
			found, ok := origEnv[v.Name]
			if !ok {
				// if we don't already have it append it and continue
				origEnv[v.Name] = v
				mergedEnv = append(mergedEnv, v)
				klog.Info(fmt.Sprintf("env is added %s", v.Name))
				continue
			}

			// make sure they are identical or throw an error
			if !reflect.DeepEqual(found, v) {
				errs = append(errs, fmt.Errorf("merging env for %s has a conflict on %s: \n%#v\ndoes not match\n%#v\n in container", pp.GetName(), v.Name, v, found))
			}
		}
	}

	err := utilerrors.NewAggregate(errs)
	if err != nil {
		klog.Error(err)
		return nil, err
	}

	return mergedEnv, err
}

func mergeEnvFrom(envSources []corev1.EnvFromSource, podPresets []*settingsapi.PodPreset) ([]corev1.EnvFromSource, error) {
	var mergedEnvFrom []corev1.EnvFromSource

	mergedEnvFrom = append(mergedEnvFrom, envSources...)
	for _, pp := range podPresets {
		mergedEnvFrom = append(mergedEnvFrom, pp.Spec.EnvFrom...)
	}

	return mergedEnvFrom, nil
}

func mergeServiceaccountName(currentServiceaccount string, podPresets []*settingsapi.PodPreset) (string, error) {
	for _, pp := range podPresets {
		if pp.Spec.ServiceAccountName != "" {
			currentServiceaccount = pp.Spec.ServiceAccountName
		}
	}
	return currentServiceaccount, nil
}

// mergeVolumeMounts merges given list of VolumeMounts with the volumeMounts
// injected by given podPresets. It returns an error if it detects any conflict during the merge.
func mergeVolumeMounts(volumeMounts []corev1.VolumeMount, podPresets []*settingsapi.PodPreset) ([]corev1.VolumeMount, error) {

	origVolumeMounts := map[string]corev1.VolumeMount{}
	volumeMountsByPath := map[string]corev1.VolumeMount{}
	for _, v := range volumeMounts {
		origVolumeMounts[v.Name] = v
		volumeMountsByPath[v.MountPath] = v
	}

	mergedVolumeMounts := make([]corev1.VolumeMount, len(volumeMounts))
	copy(mergedVolumeMounts, volumeMounts)

	var errs []error

	for _, pp := range podPresets {
		for _, v := range pp.Spec.VolumeMounts {
			found, ok := origVolumeMounts[v.Name]
			if !ok {
				// if we don't already have it append it and continue
				origVolumeMounts[v.Name] = v
				mergedVolumeMounts = append(mergedVolumeMounts, v)
				klog.Info(fmt.Sprintf("volumeMount  name is added: %s", v.Name))

			} else {
				// make sure they are identical or throw an error
				// shall we throw an error for identical volumeMounts ?
				if !reflect.DeepEqual(found, v) {
					errs = append(errs, fmt.Errorf("merging volume mounts for %s has a conflict on %s: \n%#v\ndoes not match\n%#v\n in container", pp.GetName(), v.Name, v, found))
				}
			}

			found, ok = volumeMountsByPath[v.MountPath]
			if !ok {
				// if we don't already have it append it and continue
				volumeMountsByPath[v.MountPath] = v
				klog.Info(fmt.Sprintf("volumeMount path is added : %s", v.MountPath))

			} else {
				// make sure they are identical or throw an error
				if !reflect.DeepEqual(found, v) {
					errs = append(errs, fmt.Errorf("merging volume mounts for %s has a conflict on mount path %s: \n%#v\ndoes not match\n%#v\n in container", pp.GetName(), v.MountPath, v, found))
				}
			}
		}
	}

	err := utilerrors.NewAggregate(errs)
	if err != nil {
		klog.Error(err)
		return nil, err
	}

	return mergedVolumeMounts, err
}

// mergeVolumes merges given list of Volumes with the volumes injected by given
// podPresets. It returns an error if it detects any conflict during the merge.
func mergeVolumes(volumes []corev1.Volume, podPresets []*settingsapi.PodPreset) ([]corev1.Volume, error) {
	origVolumes := map[string]corev1.Volume{}
	for _, v := range volumes {
		origVolumes[v.Name] = v
	}

	mergedVolumes := make([]corev1.Volume, len(volumes))
	copy(mergedVolumes, volumes)

	var errs []error

	for _, pp := range podPresets {
		for _, v := range pp.Spec.Volumes {
			found, ok := origVolumes[v.Name]
			if !ok {
				// if we don't already have it append it and continue
				origVolumes[v.Name] = v
				klog.Info(fmt.Sprintf("volume is added : %s", v.Name))
				mergedVolumes = append(mergedVolumes, v)
				continue
			}

			// make sure they are identical or throw an error
			if !reflect.DeepEqual(found, v) {
				errs = append(errs, fmt.Errorf("merging volumes for %s has a conflict on %s: \n%#v\ndoes not match\n%#v\n in container", pp.GetName(), v.Name, v, found))
			}
		}
	}

	err := utilerrors.NewAggregate(errs)
	if err != nil {
		klog.Error(err)
		return nil, err
	}

	if len(mergedVolumes) == 0 {
		return nil, nil
	}

	return mergedVolumes, err
}

// func recordConflictEvent(recorder record.EventRecorder, pod *corev1.Pod, message string) {
// 	// Event API doesn't support corv1.Pod object for strange reason,
// 	podRef := &corev1.ObjectReference{
// 		Kind:      "Pod",
// 		Name:      pod.GetName(),
// 		Namespace: pod.GetNamespace(),
// 	}
// 	recorder.Event(podRef, corev1.EventTypeWarning, "PodPreset", message)
// 	ref := metav1.GetControllerOf(pod)
// 	if ref != nil {
// 		// raise the event at the immediate parent controller as well
// 		ctrl := &corev1.ObjectReference{
// 			Kind:       ref.Kind,
// 			Name:       ref.Name,
// 			Namespace:  pod.GetNamespace(),
// 			UID:        ref.UID,
// 			APIVersion: ref.APIVersion,
// 		}
// 		recorder.Eventf(ctrl, corev1.EventTypeWarning, "PodPreset", message)
// 	}
// }

// applyPodPresetsOnPod updates the PodSpec with merged information from all the
// applicable PodPresets. It ignores the errors of merge functions because merge
// errors have already been checked in safeToApplyPodPresetsOnPod function.
func applyPodPresetsOnPod(pod *corev1.Pod, podPresets []*settingsapi.PodPreset) {
	klog.Info(fmt.Sprintf("mutating pod: %s", pod.ObjectMeta.Name))

	if len(podPresets) == 0 {
		return
	}

	volumes, err := mergeVolumes(pod.Spec.Volumes, podPresets)
	if err != nil {
		klog.Error(err)
	}
	pod.Spec.Volumes = volumes

	for i, ctr := range pod.Spec.Containers {
		applyPodPresetsOnContainer(&ctr, podPresets)
		pod.Spec.Containers[i] = ctr
	}

	saName, _ := mergeServiceaccountName(pod.Spec.ServiceAccountName, podPresets)
	if saName != "" {
		pod.Spec.ServiceAccountName = saName
	}

	if pod.ObjectMeta.Annotations == nil {
		pod.ObjectMeta.Annotations = map[string]string{}
	}

	// add annotation information to mark podpreset mutation has occurred
	for _, pp := range podPresets {
		pod.ObjectMeta.Annotations[fmt.Sprintf("%s/podpreset-%s", annotationPrefix, pp.GetName())] = pp.GetResourceVersion()
	}
}

// applyPodPresetsOnContainer injects envVars, VolumeMounts and envFrom from
// given podPresets in to the given container. It ignores conflict errors
// because it assumes those have been checked already by the caller.
func applyPodPresetsOnContainer(ctr *corev1.Container, podPresets []*settingsapi.PodPreset) {
	envVars, _ := mergeEnv(ctr.Env, podPresets)
	klog.Info(fmt.Sprintf("%v number of envs are added", len(envVars)))

	ctr.Env = envVars

	volumeMounts, err := mergeVolumeMounts(ctr.VolumeMounts, podPresets)
	if err != nil {
		klog.Error(err)
	}
	ctr.VolumeMounts = volumeMounts
	klog.Info(fmt.Sprintf("%v number of volumeMounts are added", len(envVars)))
	envFrom, err := mergeEnvFrom(ctr.EnvFrom, podPresets)
	if err != nil {
		klog.Error(err)
	}
	ctr.EnvFrom = envFrom
}

func mutatePods(ar v1beta1.AdmissionReview) *v1beta1.AdmissionResponse {
	klog.Info("Entering mutatePods in mutating webhook")
	podResource := metav1.GroupVersionResource{Group: "", Version: "v1", Resource: "pods"}
	if ar.Request.Resource != podResource {
		klog.Errorf("expect resource to be %s", podResource)
		return nil
	}

	raw := ar.Request.Object.Raw
	pod := corev1.Pod{}
	deserializer := codecs.UniversalDeserializer()
	if _, _, err := deserializer.Decode(raw, nil, &pod); err != nil {
		glog.Error(err)
		return toAdmissionResponse(err)
	}
	reviewResponse := v1beta1.AdmissionResponse{}
	reviewResponse.Allowed = true
	podCopy := pod.DeepCopy()
	glog.V(1).Infof("Examining pod: %v\n", pod.GetName())

	// Ignore if exclusion annotation is present
	if podAnnotations := pod.GetAnnotations(); podAnnotations != nil {
		klog.Info(fmt.Sprintf("Looking at pod annotations, found: %v", podAnnotations))
		if podAnnotations[fmt.Sprintf("%s/exclude", annotationPrefix)] == "true" {
			return &reviewResponse
		}
		if _, isMirrorPod := podAnnotations[corev1.MirrorPodAnnotationKey]; isMirrorPod {
			return &reviewResponse
		}
	}

	crdclient := getCrdClient()
	list := &settingsapi.PodPresetList{}
	err := crdclient.List(context.TODO(), &client.ListOptions{Namespace: pod.Namespace}, list)
	if meta.IsNoMatchError(err) {
		glog.Errorf("%v (has the CRD been loaded?)", err)
		return toAdmissionResponse(err)
	} else if err != nil {
		glog.Errorf("error fetching podpresets: %v", err)
		return toAdmissionResponse(err)
	}

	klog.Info(fmt.Sprintf("fetched %d podpreset(s) in namespace %s", len(list.Items), pod.Namespace))
	if len(list.Items) == 0 {
		glog.V(5).Infof("No pod presets created, so skipping pod %v", pod.Name)
		fmt.Printf("No pod presets created, so skipping pod %s", pod.Name)

		return &reviewResponse
	}

	matchingPPs, err := filterPodPresets(list.Items, &pod)
	if err != nil {
		glog.Errorf("filtering pod presets failed: %v", err)
		return toAdmissionResponse(err)
	}

	if len(matchingPPs) == 0 {
		glog.V(5).Infof("No matching pod presets, so skipping pod %v", pod.Name)
		return &reviewResponse
	}
	klog.Infof("%d matching pod presets, for pod %v", len(matchingPPs), pod.Name)
	presetNames := make([]string, len(matchingPPs))
	for i, pp := range matchingPPs {
		presetNames[i] = pp.GetName()
	}

	klog.Info(fmt.Sprintf("Matching PP detected of count %v, patching spec", len(matchingPPs)))

	// detect merge conflict
	err = safeToApplyPodPresetsOnPod(&pod, matchingPPs)
	if err != nil {
		// conflict, ignore the error, but raise an event
		// TODO: investigate why GetGenerateName doesn't work, might be because it's too early to exist yet
		msg := fmt.Errorf("conflict occurred while applying podpresets: %s on pod: %v err: %v",
			strings.Join(presetNames, ","), pod.GetName(), err)
		//recordConflictEvent(recorder, &pod, msg)
		glog.Warning(msg)
		return toAdmissionResponse(msg)
	}

	applyPodPresetsOnPod(&pod, matchingPPs)

	// TODO: investigate why GetGenerateName doesn't work
	klog.Infof("applied podpresets: %s successfully on Pod: %+v ", strings.Join(presetNames, ","), pod.GetName())

	podCopyJSON, err := json.Marshal(podCopy)
	if err != nil {
		return toAdmissionResponse(err)
	}
	podJSON, err := json.Marshal(pod)
	if err != nil {
		return toAdmissionResponse(err)
	}
	jsonPatch, err := jsonpatch.CreatePatch(podCopyJSON, podJSON)
	if err != nil {
		return toAdmissionResponse(err)
	}
	jsonPatchBytes, _ := json.Marshal(jsonPatch)

	reviewResponse.Patch = jsonPatchBytes
	pt := v1beta1.PatchTypeJSONPatch
	reviewResponse.PatchType = &pt

	// if !reviewResponse.Allowed {
	// 	reviewResponse.Result = &metav1.Status{Message: strings.TrimSpace(msg)}
	// }
	return &reviewResponse
}

type admitFunc func(v1beta1.AdmissionReview) *v1beta1.AdmissionResponse

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
		glog.Errorf("contentType=%s, expect application/json", contentType)
		return
	}

	var reviewResponse *v1beta1.AdmissionResponse
	ar := v1beta1.AdmissionReview{}
	deserializer := codecs.UniversalDeserializer()
	if _, _, err := deserializer.Decode(body, nil, &ar); err != nil {
		glog.Error(err)
		reviewResponse = toAdmissionResponse(err)
	} else {
		reviewResponse = admit(ar)
	}

	response := v1beta1.AdmissionReview{}
	if reviewResponse != nil {
		response.Response = reviewResponse
		response.Response.UID = ar.Request.UID
	}
	// reset the Object and OldObject, they are not needed in a response.
	ar.Request.Object = runtime.RawExtension{}
	ar.Request.OldObject = runtime.RawExtension{}

	resp, err := json.Marshal(response)
	if err != nil {
		glog.Error(err)
	}
	if _, err := w.Write(resp); err != nil {
		glog.Error(err)
	}
}

func serveMutatePods(w http.ResponseWriter, r *http.Request) {
	serve(w, r, mutatePods)
}

func main() {
	var config Config
	klog.Infof("Start serving")

	flag.StringVar(&config.CertFile, "tlsCertFile", "/etc/webhook/certs/cert.pem", "File containing the x509 Certificate for HTTPS.")
	flag.StringVar(&config.KeyFile, "tlsKeyFile", "/etc/webhook/certs/key.pem", "File containing the x509 private key to --tlsCertFile.")
	flag.Parse()

	http.HandleFunc("/add-cred", serveMutatePods)

	server := &http.Server{
		Addr:      ":443",
		TLSConfig: configTLS(config),
	}
	klog.Info(fmt.Sprintf("About to start serving webhooks: %#v", server))
	server.ListenAndServeTLS("", "")
}

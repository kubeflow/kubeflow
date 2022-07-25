package culler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-logr/logr"
	"github.com/kubeflow/kubeflow/components/notebook-controller/pkg/metrics"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
)

var log = logf.Log.WithName("culler")
var client = &http.Client{
	Timeout: time.Second * 10,
}

// The constants with name 'DEFAULT_{ENV_Var}' are the default values to be
// used, if the respective ENV vars are not present.
// All the time numbers correspond to minutes.
const DEFAULT_CULL_IDLE_TIME = "1440" // One day
const DEFAULT_IDLENESS_CHECK_PERIOD = "1"
const DEFAULT_ENABLE_CULLING = "false"
const DEFAULT_CLUSTER_DOMAIN = "cluster.local"
const DEFAULT_DEV = "false"

// When a Resource should be stopped/culled, then the controller should add this
// annotation in the Resource's Metadata. Then, inside the reconcile loop,
// the controller must check if this annotation is set and then apply the
// respective culling logic for that Resource. The value of the annotation will
// be a timestamp of when the Resource was stopped/culled.
//
// In case of Notebooks, the controller will reduce the replicas to 0 if
// this annotation is set. If it's not set, then it will make the replicas 1.
const STOP_ANNOTATION = "kubeflow-resource-stopped"
const LAST_ACTIVITY_ANNOTATION = "notebooks.kubeflow.org/last-activity"

const (
	KERNEL_EXECUTION_STATE_IDLE     = "idle"
	KERNEL_EXECUTION_STATE_BUSY     = "busy"
	KERNEL_EXECUTION_STATE_STARTING = "starting"
)

// Each kernel of the Notebook Server has a status.
// KernelStatus struct:
type KernelStatus struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	LastActivity   string `json:"last_activity"`
	ExecutionState string `json:"execution_state"`
	Connections    int    `json:"connections"`
}

// Each terminal of the Notebook Server has a status.
// TerminalStatus struct:
type TerminalStatus struct {
	Name           string `json:"name"`
	LastActivity   string `json:"last_activity"`
}

// Some Utility Functions
func getEnvDefault(variable string, defaultVal string) string {
	envVar := os.Getenv(variable)
	if len(envVar) == 0 {
		return defaultVal
	}
	return envVar
}

func getNamespacedNameFromMeta(meta metav1.ObjectMeta) types.NamespacedName {
	return types.NamespacedName{
		Name:      meta.GetName(),
		Namespace: meta.GetNamespace(),
	}
}

// Time / Frequency Utility functions
func createTimestamp() string {
	now := time.Now()
	return now.Format(time.RFC3339)
}

func GetRequeueTime() time.Duration {
	// The frequency in which we check if the Pod needs culling
	// Uses ENV var: IDLENESS_CHECK_PERIOD
	cullingPeriod := getEnvDefault(
		"IDLENESS_CHECK_PERIOD", DEFAULT_IDLENESS_CHECK_PERIOD)
	realCullingPeriod, err := strconv.Atoi(cullingPeriod)
	if err != nil {
		log.Info(fmt.Sprintf(
			"Culling Period should be Int. Got '%s'. Using default value.",
			cullingPeriod))
		realCullingPeriod, _ = strconv.Atoi(DEFAULT_IDLENESS_CHECK_PERIOD)
	}

	return time.Duration(realCullingPeriod) * time.Minute
}

func getMaxIdleTime() time.Duration {
	idleTime := getEnvDefault("CULL_IDLE_TIME", DEFAULT_CULL_IDLE_TIME)
	realIdleTime, err := strconv.Atoi(idleTime)
	if err != nil {
		log.Info(fmt.Sprintf(
			"CULL_IDLE_TIME should be Int. Got %s instead. Using default value.",
			idleTime))
		realIdleTime, _ = strconv.Atoi(DEFAULT_CULL_IDLE_TIME)
	}

	return time.Minute * time.Duration(realIdleTime)
}

// Stop Annotation handling functions
func SetStopAnnotation(meta *metav1.ObjectMeta, m *metrics.Metrics) {
	if meta == nil {
		log.Info("Error: Metadata is Nil. Can't set Annotations")
		return
	}
	t := time.Now()
	if meta.GetAnnotations() != nil {
		meta.Annotations[STOP_ANNOTATION] = t.Format(time.RFC3339)
	} else {
		meta.SetAnnotations(map[string]string{
			STOP_ANNOTATION: t.Format(time.RFC3339),
		})
	}
	if m != nil {
		m.NotebookCullingCount.WithLabelValues(meta.Namespace, meta.Name).Inc()
		m.NotebookCullingTimestamp.WithLabelValues(meta.Namespace, meta.Name).Set(float64(t.Unix()))
	}

	if meta.GetAnnotations() != nil {
		if _, ok := meta.GetAnnotations()["notebooks.kubeflow.org/last_activity"]; ok {
			delete(meta.GetAnnotations(), "notebooks.kubeflow.org/last_activity")
		}
	}
}

func StopAnnotationIsSet(meta metav1.ObjectMeta) bool {
	if meta.GetAnnotations() == nil {
		return false
	}

	if _, ok := meta.GetAnnotations()[STOP_ANNOTATION]; ok {
		return true
	} else {
		return false
	}
}

func getNotebookResourceResponse(nm, ns string, resource string) *http.Response {
	domain := getEnvDefault("CLUSTER_DOMAIN", DEFAULT_CLUSTER_DOMAIN)
	url := fmt.Sprintf(
		"http://%s.%s.svc.%s/notebook/%s/%s/api/%s",
		nm, ns, domain, ns, nm, resource)
	if getEnvDefault("DEV", DEFAULT_DEV) != "false" {
		url = fmt.Sprintf(
			"http://localhost:8001/api/v1/namespaces/%s/services/%s:http-%s/proxy/notebook/%s/%s/api/%s",
			ns, nm, nm, ns, nm, resource)
	}

	resp, err := client.Get(url)
	if err != nil {
		log.Error(err, fmt.Sprintf("Error talking to %s", url))
		return nil
	}

	// Decode the body
	if resp.StatusCode != 200 {
		log.Info(fmt.Sprintf(
			"Warning: GET to %s: %d", url, resp.StatusCode))
		return nil
	}

	return resp
}

// Kernels culling logic
func getNotebookApiKernels(nm, ns string) []KernelStatus {
	// Get the Kernels' status from the Server's `/api/kernels` endpoint

	resp := getNotebookResourceResponse(nm, ns, "kernels")
	if resp == nil {
		return nil
	}

	var kernels []KernelStatus

	defer resp.Body.Close()
	err := json.NewDecoder(resp.Body).Decode(&kernels)
	if err != nil {
		log.Error(err, "Error parsing JSON response for Notebook API Kernels.")
		return nil
	}

	return kernels
}

// Terminals culling logic
func getNotebookApiTerminals(nm, ns string) []TerminalStatus {
	// Get the Terminals' status from the Server's `/api/terminals` endpoint
	resp := getNotebookResourceResponse(nm, ns, "terminals")
	if resp == nil {
		return nil
	}

	var terminals []TerminalStatus

	defer resp.Body.Close()
	err := json.NewDecoder(resp.Body).Decode(&terminals)
	if err != nil {
		log.Error(err, "Error parsing JSON response for Notebook API terminals.")
		return nil
	}

	return terminals
}

func allKernelsAreIdle(kernels []KernelStatus, log logr.Logger) bool {
	// Iterate on the list of kernels' status.
	// If all kernels are on execution_state=idle then this function returns true.
	log.Info("Examining if all kernels are idle")

	if kernels == nil {
		return false
	}

	for i := 0; i < len(kernels); i++ {
		if kernels[i].ExecutionState != KERNEL_EXECUTION_STATE_IDLE {
			log.Info("Not all kernels are idle")
			return false
		}
	}
	log.Info("All kernels are idle")
	return true
}

func getNotebookRecentTime(t []string, api string) string {
	// Checking for the most recent resource last_activity. The LAST_ACTIVITY_ANNOTATION
	// should be the most recent resource last-activity among the kernels and terminals.
	recentTime, err := time.Parse(time.RFC3339, t[0])
	if err != nil {
		log.Error(err, "Error parsing the last-activity from the /api/kernels")
		return ""
	}

	for i := 1; i < len(t); i++ {
		kernelLastActivity, err := time.Parse(time.RFC3339, t[i])
		if err != nil {
			log.Error(err, "Error parsing the last-activity from the %s", api)
			return ""
		}
		if kernelLastActivity.After(recentTime) {
			recentTime = kernelLastActivity
		}
	}
	return recentTime.Format(time.RFC3339)
}


// Update LAST_ACTIVITY_ANNOTATION
func UpdateNotebookLastActivityAnnotation(meta *metav1.ObjectMeta) bool {
	log := log.WithValues("notebook", getNamespacedNameFromMeta(*meta))
	if meta == nil {
		log.Info("Metadata is Nil. Can't update Last Activity Annotation.")
		return false
	}

	log.Info("Updating the last-activity annotation.")
	nm, ns := meta.GetName(), meta.GetNamespace()

	// No last-activity found in the CR. Setting to Now()
	if _, ok := meta.GetAnnotations()[LAST_ACTIVITY_ANNOTATION]; !ok {
		t := createTimestamp()
		log.Info(fmt.Sprintf("No last-activity found in the CR. Setting to %s", t))

		if len(meta.GetAnnotations()) == 0 {
			meta.SetAnnotations(map[string]string{})
		}
		meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
		return true
	}

	log.Info("last-activity annotation exists. Checking /api/kernels")
	kernels :=  getNotebookApiKernels(nm, ns)
	log.Info("last-activity annotation exists. Checking /api/terminals")
	terminals :=  getNotebookApiTerminals(nm, ns)
	if kernels == nil  && terminals == nil{
		log.Info("Could not GET the notebook status. Will not update last-activity.")
		return false
	}

	kernelsBool := updateTimestampFromKernelsActivity(meta, kernels)
	terminalsBool := updateTimestampFromTerminalsActivity(meta, terminals)
	return kernelsBool || terminalsBool
}

func compareAnnotationTimeToResource(meta *metav1.ObjectMeta, resourceTime string) bool {
	log := log.WithValues("notebook", getNamespacedNameFromMeta(*meta))

	annotationTime, err := time.Parse(time.RFC3339, meta.GetAnnotations()[LAST_ACTIVITY_ANNOTATION])
	if err != nil {
		log.Error(err, "Error parsing the last-activity from the notebook CRD")
		return false
	}
	t, err := time.Parse(time.RFC3339, resourceTime)
	if err != nil {
		log.Error(err, "Error parsing the last-activity from the resource return time")
		return false
	}
	// If the resource time is less than the annotation time on the resource return false
	if annotationTime.After(t) {
		return false
	}

	return true
}

func updateTimestampFromKernelsActivity(meta *metav1.ObjectMeta, kernels []KernelStatus) bool {
	log := log.WithValues("notebook", getNamespacedNameFromMeta(*meta))

	if kernels == nil || len(kernels) == 0 {
		log.Info("Notebook has no kernels. Will not update last-activity")
		return false
	}

	if !allKernelsAreIdle(kernels, log) {
		// At least one kernel is "busy" so the last-activity annotation should
		// be the current time.
		t := createTimestamp()
		log.Info(fmt.Sprintf("Found a busy kernel. Updating the last-activity to %s", t))

		meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
		return true
	}

	arr := make([]string, len(kernels))
	for i := 0; i < len(kernels); i++ {
		arr[i] = kernels[i].LastActivity
	}

	t := getNotebookRecentTime(arr, "api/kernels")
	log.Info(fmt.Sprintf("Comparing api/kernels last_activity time to current notebook annotation time"))
	if t == "" || !compareAnnotationTimeToResource(meta, t) {
		return false
	}

	meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
	log.Info(fmt.Sprintf("Successfully updated last-activity from latest kernel action, %s", t))
	return true
}

func updateTimestampFromTerminalsActivity(meta *metav1.ObjectMeta, terminals []TerminalStatus) bool {
	// check the latest_activity timestamp from the `api/terminals` jupyter api. also
	// check this timestamp against the current annotation timestamp to ensure we are not
	// going backwards in time.
	log := log.WithValues("notebook", getNamespacedNameFromMeta(*meta))

	if terminals == nil || len(terminals) == 0 {
		log.Info("Notebook has no terminals. Will not update last-activity")
		return false
	}

	arr := make([]string, len(terminals))
	for i := 0; i < len(terminals); i++ {
		arr[i] = terminals[i].LastActivity
	}

	t := getNotebookRecentTime(arr, "api/terminals")
	log.Info(fmt.Sprintf("Comparing api/terminals last_activity time to current notebook annotation time"))
	if t == "" || !compareAnnotationTimeToResource(meta, t) {
		return false
	}

	meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
	log.Info(fmt.Sprintf("Successfully updated last-activity from latest terminal action, %s", t))
	return true
}

func notebookIsIdle(meta metav1.ObjectMeta) bool {
	// Being idle means that the Notebook can be culled
	log := log.WithValues("notebook", getNamespacedNameFromMeta(meta))

	if meta.GetAnnotations() != nil {
		// Read the current LAST_ACTIVITY_ANNOTATION
		tempLastActivity := meta.GetAnnotations()[LAST_ACTIVITY_ANNOTATION]
		LastActivity, err := time.Parse(time.RFC3339, tempLastActivity)
		if err != nil {
			log.Error(err, "Error parsing last-activity time")
			return false
		}

		timeCap := LastActivity.Add(getMaxIdleTime())
		if time.Now().After(timeCap) {
			return true
		}
	}
	return false
}

func NotebookNeedsCulling(meta metav1.ObjectMeta) bool {
	log := log.WithValues("notebook", getNamespacedNameFromMeta(meta))

	if getEnvDefault("ENABLE_CULLING", DEFAULT_ENABLE_CULLING) != "true" {
		log.Info("Culling of idle Pods is Disabled. To enable it set the " +
			"ENV Var 'ENABLE_CULLING=true'")
		return false
	}

	if StopAnnotationIsSet(meta) {
		log.Info("Notebook is already stopping")
		return false
	}

	return notebookIsIdle(meta)
}

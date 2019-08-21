package culler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	logf "sigs.k8s.io/controller-runtime/pkg/runtime/log"
)

var log = logf.Log.WithName("culler")
var client = &http.Client{
	Timeout: time.Second * 10,
}

// The constants with name 'DEFAULT_{ENV_Var}' are the default values to be
// used, if the respective ENV vars are not present.
// All the time numbers correspond to minutes.
const DEFAULT_PROMETHEUS_SVC = "prometheus.istio-system.svc.cluster.local:9090"
const DEFAULT_IDLE_TIME = "1440" // One day
const DEFAULT_CULLING_CHECK_PERIOD = "1"
const DEFAULT_ENABLE_CULLING = "false"
const STOP_ANNOTATION = "kubeflow-resource-stopped"

type PrometheusResp struct {
	Status string                 `json:"status"`
	Data   map[string]interface{} `json:"data"`
}

type NotebookStatus struct {
	Started      string `json:"started"`
	LastActivity string `json:"last_activity"`
	Connections  int    `json:"connections"`
	Kernels      int    `json:"kernels"`
}

// Some Utility Fuctions
func getEnvDef(variable string, default_val string) string {
	envVar := os.Getenv(variable)
	if len(envVar) == 0 {
		return default_val
	}
	return envVar
}

// Time / Frequency Utility functions
func createTimestamp() string {
	now := time.Now()
	return now.Format(time.RFC3339)
}

func GetRequeueTime() time.Duration {
	// The frequency in which we check if the Pod needs culling
	// Uses ENV var: CULLING_CHECK_PERIOD
	culling_period := getEnvDef(
		"CULLING_CHECK_PERIOD", DEFAULT_CULLING_CHECK_PERIOD)
	culling_period_m, err := strconv.Atoi(culling_period)
	if err != nil {
		log.Info(fmt.Sprintf(
			"Culling Period should be Int. Got '%s'. Using default value.",
			culling_period))
		culling_period_m, _ = strconv.Atoi(DEFAULT_CULLING_CHECK_PERIOD)
	}

	return time.Duration(culling_period_m) * time.Minute
}

func getMaxIdleTime() time.Duration {
	idle_time := getEnvDef("IDLE_TIME", DEFAULT_IDLE_TIME)
	idle_time_m, err := strconv.Atoi(idle_time)
	if err != nil {
		log.Info(fmt.Sprintf(
			"IDLE_TIME should be Int. Got %s instead. Using default value.",
			idle_time))
		idle_time_m, _ = strconv.Atoi(DEFAULT_IDLE_TIME)
	}

	return time.Minute * time.Duration(idle_time_m)
}

// Stop Annotation handling functions
func SetStopAnnotation(meta *metav1.ObjectMeta) {
	if meta.GetAnnotations() != nil {
		annotations := meta.GetAnnotations()
		annotations[STOP_ANNOTATION] = createTimestamp()
		meta.SetAnnotations(annotations)
	} else {
		meta.SetAnnotations(map[string]string{
			STOP_ANNOTATION: createTimestamp(),
		})
	}
}

func RemoveStopAnnotation(meta *metav1.ObjectMeta) {
	if meta.GetAnnotations() == nil {
		return
	}

	if _, ok := meta.GetAnnotations()[STOP_ANNOTATION]; ok {
		delete(meta.GetAnnotations(), STOP_ANNOTATION)
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

// Culling Logic
func getNotebookApiStatus(nm, ns string) *NotebookStatus {
	// Get the Notebook Status from the Server's /api/status endpoint
	url := fmt.Sprintf("http://localhost:8001/api/v1/namespaces/%s/services/%s:80/proxy/notebook/%s/%s/api/status", ns, nm, ns, nm)
	// url := fmt.Sprintf(
	// 	"http://%s.%s.svc.cluster.local/notebook/%s/%s/api/status",
	// 	nm, ns, ns, nm)

	resp, err := client.Get(url)
	if err != nil {
		log.Info(fmt.Sprintf("Error talking to %s", url), "error", err)
		return nil
	}

	// Decode the body
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		log.Info(fmt.Sprintf(
			"Warning: GET to %s: %d", url, resp.StatusCode))
		return nil
	}

	status := new(NotebookStatus)
	err = json.NewDecoder(resp.Body).Decode(status)
	if err != nil {
		log.Info(fmt.Sprintf(
			"Error parsing the JSON response for Notebook %s/%s", nm, ns),
			"error", err)
		return nil
	}

	return status
}

func notebookIsIdle(nm, ns string, status *NotebookStatus) bool {
	if status == nil {
		return false
	}

	lastActivity, err := time.Parse(time.RFC3339, status.LastActivity)
	if err != nil {
		log.Info(fmt.Sprintf("Error parsing time for Notebook %s/%s", nm, ns),
			"error", err)
		return false
	}

	time_cap := lastActivity.Add(getMaxIdleTime())
	if time.Now().After(time_cap) {
		return true
	} else {
		return false
	}
}

func NotebookNeedsCulling(nbMeta metav1.ObjectMeta) bool {
	if getEnvDef("ENABLE_CULLING", DEFAULT_ENABLE_CULLING) != "true" {
		log.Info("Culling of idle Pods is Disabled. To enable it set the " +
			"ENV Var 'ENABLE_CULLING=true'")
		return false
	}

	nm, ns := nbMeta.GetName(), nbMeta.GetNamespace()
	if StopAnnotationIsSet(nbMeta) {
		log.Info(fmt.Sprintf("Notebook %s/%s is already stopping", ns, nm))
		return false
	}

	notebookStatus := getNotebookApiStatus(nm, ns)
	return notebookIsIdle(nm, ns, notebookStatus)
}

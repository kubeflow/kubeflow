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
func getPromethiusRequestsQuery(svcMeta metav1.ObjectMeta) string {
	idle_time := getEnvDef("IDLE_TIME", DEFAULT_IDLE_TIME)
	svc := fmt.Sprintf("%s.%s.svc.cluster.local",
		svcMeta.GetName(), svcMeta.GetNamespace())

	return fmt.Sprintf(
		"query=sum(rate(istio_requests_total{destination_service=\"%s\""+
			",response_code!=\"404\"}[%sm]))", svc, idle_time)
}

func getRequestsCountFromResp(body *PrometheusResp) string {
	// Get the Number of the requests on the Pod from the response
	// of the Prometheus Service
	// None: No metrics for this Pod, or error ocurred
	res, ok := body.Data["result"].([]interface{})
	if !ok {
		log.Info("Prometheus' response not as expected", "resp", body)
		return "None"
	}

	if len(res) == 0 {
		return "0"
	}

	value := res[0].(map[string]interface{})["value"]
	if !ok {
		log.Info("Prometheus' response not as expected", "resp", body)
		return "None"
	}

	requests, ok := value.([]interface{})[1].(string)
	if !ok {
		log.Info("Prometheus' response not as expected", "resp", body)
		return "None"
	}

	return requests
}

func podIsNew(meta metav1.ObjectMeta) bool {
	// If the pod's lifetime is less that the IDLE_TIME, don't cull it
	created_t := meta.GetCreationTimestamp()
	idle_time := getEnvDef("IDLE_TIME", DEFAULT_IDLE_TIME)
	idle_time_m, err := strconv.Atoi(idle_time)
	if err != nil {
		log.Info(fmt.Sprintf(
			"IDLE_TIME should be Int. Got %s instead. Using default value.",
			idle_time))
		idle_time_m, _ = strconv.Atoi(DEFAULT_IDLE_TIME)
	}

	pod_fresh_time_cap := created_t.Add(
		time.Minute * time.Duration(idle_time_m))
	if pod_fresh_time_cap.Before(time.Now()) {
		return false
	} else {
		return true
	}
}

func ResourceNeedsCulling(rsrcMeta, podMeta, svcMeta metav1.ObjectMeta) bool {
	// Decide based on Prometheus response. This function will return true if
	// the provided resource has not been created
	if getEnvDef("ENABLE_CULLING", DEFAULT_ENABLE_CULLING) != "true" {
		log.Info("Culling of idle Pods is Disabled. To enable it set the " +
			"ENV Var 'ENABLE_CULLING=true'")
		return false
	}

	nm, ns := rsrcMeta.GetName(), rsrcMeta.GetNamespace()
	if StopAnnotationIsSet(rsrcMeta) {
		log.Info(fmt.Sprintf("Notebook %s/%s is already stopping", ns, nm))
		return false
	}

	// If the reconcile function gets triggered too quickly when the Pod is
	// created, then no requests will have been registered. Thus, the Pod will
	// be immediately culled after it was started..
	// To prevent this, we won't cull any Pod whose lifetime is less than the
	// idle time
	if podIsNew(podMeta) {
		log.Info(fmt.Sprintf(
			"Pod %s/%s was created recently. Won't check for culling.",
			podMeta.GetNamespace(), podMeta.GetName()))
		return false
	}

	prometheus_svc := getEnvDef("PROMETHEUS_SVC", DEFAULT_PROMETHEUS_SVC)
	query := getPromethiusRequestsQuery(svcMeta)
	url := fmt.Sprintf("http://%s/api/v1/query?"+query, prometheus_svc)

	// Make the request to Prometheus to get number of requests
	resp, err := client.Get(url)
	if err != nil {
		log.Info(fmt.Sprintf("Error talking to %s", url), "error", err)
		return false
	}

	// Decode the body
	defer resp.Body.Close()
	body := new(PrometheusResp)
	err = json.NewDecoder(resp.Body).Decode(body)
	if err != nil {
		log.Info("Error parsing the json response", "url", url, "body", body)
	}

	requests := getRequestsCountFromResp(body)
	log.Info(fmt.Sprintf(
		"Pod %s/%s received %s requests in the last %s minutes",
		podMeta.GetNamespace(), podMeta.GetName(),
		requests, getEnvDef("IDLE_TIME", DEFAULT_IDLE_TIME)))

	if requests == "None" {
		return false
	} else if requests == "0" {
		return true
	} else {
		return false
	}
}

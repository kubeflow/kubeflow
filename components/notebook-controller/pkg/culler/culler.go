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

const DEFAULT_PROMETHEUS_SVC = "prometheus.istio-system.svc.cluster.local:9090"
const DEFAULT_IDLE_TIME = "1" // In minutes TODO(kimwnasptd): Should increase this value
const STOP_ANNOTATION = "kubeflow-resource-stop"

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

// Stop Annotation handling functions
func SetStopAnnotation(meta *metav1.ObjectMeta) {
	if meta.GetAnnotations() != nil {
		annotations := meta.GetAnnotations()
		annotations[STOP_ANNOTATION] = "true"
		meta.SetAnnotations(annotations)
	} else {
		meta.SetAnnotations(map[string]string{
			STOP_ANNOTATION: "true",
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
func getPromethiusRequestsQuery(nm string, ns string) string {
	idle_time := getEnvDef("IDLE_TIME", DEFAULT_IDLE_TIME)
	return fmt.Sprintf(
		"query=sum(rate(istio_requests_total{destination_service="+
			"\"%s.%s.svc.cluster.local\",response_code!=\"404\"}[%sm]))",
		nm, ns, idle_time)
}

func getRequestsCountFromResp(body *PrometheusResp) float64 {
	// Get the Number of the requests on the Pod from the response
	// of the Prometheus Service
	// -1: No metrics for this Pod, or error ocurred
	log.Info("Prometheus response", "data", body)
	res, ok := body.Data["result"].([]interface{})
	if !ok {
		log.Info("Prometheus' response not as expected", "resp", body)
		return -1
	}

	if len(res) == 0 {
		log.Info("No metrics for this Pod registered in Prometheus...")
		return 0
	}

	value := res[0].(map[string]interface{})["value"]
	if !ok {
		log.Info("Prometheus' response not as expected", "resp", body)
		return -1
	}

	requests, err := strconv.ParseFloat(value.([]interface{})[1].(string), 64)
	if err != nil {
		log.Info("Prometheus' response not as expected", "resp", body)
		return -1
	}

	return requests
}

func ResourceNeedsCulling(meta metav1.ObjectMeta) bool {
	// Decide based on Prometheus response. This function will return true if
	// the provided resource has not been created
	nm, ns := meta.GetName(), meta.GetNamespace()
	if StopAnnotationIsSet(meta) {
		log.Info(fmt.Sprintf("Object %s/%s is already stopping", ns, nm))
		return false
	}

	svc := getEnvDef("PROMETHEUS_SVC", DEFAULT_PROMETHEUS_SVC)
	query := getPromethiusRequestsQuery(nm, ns)
	url := fmt.Sprintf("http://%s/api/v1/query?"+query, svc)

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
	if requests == 0 {
		return true
	} else {
		return false
	}
}

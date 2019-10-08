package monitoring_util

import (
	"fmt"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/prometheus/common/log"
	"net"
	"net/http"
)

// Common label keys for all metrics signals
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// COMPONENT: name of Component outputing the metrics, eg. "tf-operator"
const COMPONENT = "Component"
// KIND: each componenet can label their metrics with custom tag "kind". Suggest keeping "kind" value to be CONSTANT PER METRICS.
const KIND = "kind"
const NAMESPACE = "namespace"
// ACTION: request action type of the metrics, eg. "CRUD"
const ACTION = "action"
// SEVERITY: level of importance, used to filter alerts
const SEVERITY  = "severity"
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Alerting metrics severity levels
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const SEVERITY_MINOR = "Minor"
const SEVERITY_MAJOR = "Major"
const SEVERITY_CRITICAL = "Critical"
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Util const values
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const METRICSPORT = 8079
const METRICSPATH = "/metrics"
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var (
	// Counter metrics
	// num of requests counter vec
	requestCounter = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "request_counter",
			Help: "Number of request_counter",
		},
		[]string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY},
	)
	// Counter metrics for failed requests
	requestFailureCounter = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "request_failure_counter",
		Help: "Number of request_failure_counter",
	}, []string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY})

	// Gauge metrics
	requestGauge = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "requests_gauge",
		Help: "Number of requests_gauge",
	}, []string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY})

	// Gauge metrics for failed requests
	requestFailureGauge = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "requests_failure_gauge",
		Help: "Number of requests_failure_gauge",
	}, []string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY})

	// Linear latencies
	requestLinearLatency = prometheus.NewHistogramVec(prometheus.HistogramOpts{
		Name:    "request_linear_latency",
		Help:    "A histogram of request_linear_latency",
		Buckets: prometheus.LinearBuckets(1, 1, 15),
	}, []string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY})

	// Exponential latencies
	requestExponentialLatency = prometheus.NewHistogramVec(prometheus.HistogramOpts{
		Name:    "request_exponential_latency",
		Help:    "A histogram of request_exponential_latency",
	}, []string{COMPONENT, KIND, NAMESPACE, ACTION, SEVERITY})

	serviceHeartbeat = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "service_heartbeat",
		Help: "Heartbeat signal every 10 seconds indicating pods are alive.",
	}, []string{COMPONENT, SEVERITY})
)

func init() {
	// Register prometheus counters
	prometheus.MustRegister(requestCounter)
	prometheus.MustRegister(requestFailureCounter)
	prometheus.MustRegister(requestGauge)
	prometheus.MustRegister(requestFailureGauge)
	prometheus.MustRegister(requestLinearLatency)
	prometheus.MustRegister(requestExponentialLatency)
	prometheus.MustRegister(serviceHeartbeat)
}

type MetricsExporter struct {
	Component   string
	MetricsPort int
}

func NewMetricsExporter(component string) *MetricsExporter {
	return &MetricsExporter{
		Component:   component,
		MetricsPort: METRICSPORT,
	}
}

func (me *MetricsExporter) IncRequestCounter(kind string, namespace string, action string, severity string) {
	labels := prometheus.Labels{COMPONENT: me.Component, KIND: kind, NAMESPACE: namespace, ACTION: action,
		SEVERITY: severity}
	requestCounter.With(labels).Inc()
}

func (me *MetricsExporter) IncRequestFailureCounter(kind string, namespace string, action string, severity string) {
	labels := prometheus.Labels{COMPONENT: me.Component, KIND: kind, NAMESPACE: namespace, ACTION: action,
		SEVERITY: severity}
	requestFailureCounter.With(labels).Inc()
}

func (me *MetricsExporter) AddRequestGauge(kind string, namespace string, action string, severity string, val float64) {
	labels := prometheus.Labels{COMPONENT: me.Component, KIND: kind, NAMESPACE: namespace, ACTION: action,
		SEVERITY: severity}
	requestGauge.With(labels).Add(val)
}

func (me *MetricsExporter) ObserveRequestExponentialLatency(kind string, namespace string, action string,
	severity string, val float64) {
	labels := prometheus.Labels{COMPONENT: me.Component, KIND: kind, NAMESPACE: namespace, ACTION: action,
		SEVERITY: severity}
	requestExponentialLatency.With(labels).Observe(val)
}

func (me *MetricsExporter) ServeMetrics() error {
	mux := http.NewServeMux()
	mux.Handle(METRICSPATH, promhttp.Handler())
	server := http.Server{
		Handler: mux,
	}
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", me.MetricsPort))
	if err != nil {
		log.Errorf("listener failed to start! %v", err)
		return err
	}
	// Count heartbeat
	go func() {
		labels := prometheus.Labels{COMPONENT: me.Component, SEVERITY: SEVERITY_CRITICAL}
		for {
			time.Sleep(10 * time.Second)
			serviceHeartbeat.With(labels).Inc()
		}
	}()
	// Serve metrics
	log.Infof("starting metrics server at %v:%v", me.MetricsPort, METRICSPATH)
	if err := server.Serve(listener); err != nil && err != http.ErrServerClosed {
		log.Errorf("Metrics server failed to start! %v", err)
		return err
	}
	return nil
}

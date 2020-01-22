package controllers

import (
	"time"

	"github.com/prometheus/client_golang/prometheus"
	log "github.com/sirupsen/logrus"
)

const PROFILE = "profile_controller"
const COMPONENT = "component"
const KIND = "kind"
// User that make the request
const REQUSER = "user"
const ACTION = "action"
const PATH = "path"
const SEVERITY  = "severity"
const SEVERITY_MINOR = "minor"
const SEVERITY_MAJOR = "major"
const SEVERITY_CRITICAL = "critical"
const MAX_TAG_LEN = 30

var (
	// Counter metrics
	// num of requests counter vec
	requestCounter = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "request_kf",
			Help: "Number of request_counter",
		},
		[]string{COMPONENT, KIND, REQUSER, ACTION, PATH},
	)
	// Counter metrics for failed requests
	requestErrorCounter = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "request_kf_failure",
		Help: "Number of request_failure_counter",
	}, []string{COMPONENT, KIND, REQUSER, ACTION, PATH, SEVERITY})

	serviceHeartbeat = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "service_heartbeat",
		Help: "Heartbeat signal every 10 seconds indicating pods are alive.",
	}, []string{COMPONENT, SEVERITY})
)

func init() {
	// Register prometheus counters
	prometheus.MustRegister(requestCounter)
	prometheus.MustRegister(requestErrorCounter)
	prometheus.MustRegister(serviceHeartbeat)
	// Count heartbeat
	go func() {
		labels := prometheus.Labels{COMPONENT: PROFILE, SEVERITY: SEVERITY_CRITICAL}
		for {
			time.Sleep(10 * time.Second)
			serviceHeartbeat.With(labels).Inc()
		}
	}()
}

func IncRequestCounter(kind string) {
	if len(kind) > MAX_TAG_LEN{
		kind = kind[0:MAX_TAG_LEN]
	}
	labels := prometheus.Labels{COMPONENT: PROFILE, KIND: kind}
	requestCounter.With(labels).Inc()
}

func IncRequestErrorCounter(kind string, severity string) {
	if len(kind) > MAX_TAG_LEN{
		kind = kind[0:MAX_TAG_LEN]
	}
	labels := prometheus.Labels{COMPONENT: PROFILE, KIND: kind, SEVERITY: severity}
	log.Errorf("Failed request with kind: %v", kind)
	requestErrorCounter.With(labels).Inc()
}
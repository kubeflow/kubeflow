package metrics

import (
	"context"

	"github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
	"github.com/prometheus/client_golang/prometheus"
	"sigs.k8s.io/controller-runtime/pkg/cache"
	"sigs.k8s.io/controller-runtime/pkg/metrics"
)

// Metrics includes metrics used in notebook controller
type Metrics struct {
	cache                    cache.Cache
	runningNotebooks         *prometheus.GaugeVec
	NotebookCreation         *prometheus.CounterVec
	NotebookFailCreation     *prometheus.CounterVec
	NotebookCullingCount     *prometheus.CounterVec
	NotebookCullingTimestamp *prometheus.GaugeVec
}

func NewMetrics(c cache.Cache) *Metrics {
	m := &Metrics{
		cache: c,
		runningNotebooks: prometheus.NewGaugeVec(
			prometheus.GaugeOpts{
				Name: "notebook_running",
				Help: "Current running notebooks in the cluster",
			},
			[]string{"namespace"},
		),
		NotebookCreation: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Name: "notebook_create_total",
				Help: "Total times of creating notebooks",
			},
			[]string{"namespace"},
		),
		NotebookFailCreation: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Name: "notebook_create_failed_total",
				Help: "Total failure times of creating notebooks",
			},
			[]string{"namespace"},
		),
		NotebookCullingCount: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Name: "notebook_culling_total",
				Help: "Total times of culling notebooks",
			},
			[]string{"namespace", "name"},
		),
		NotebookCullingTimestamp: prometheus.NewGaugeVec(
			prometheus.GaugeOpts{
				Name: "last_notebook_culling_timestamp_seconds",
				Help: "Timestamp of the last notebook culling in seconds",
			},
			[]string{"namespace", "name"},
		),
	}

	metrics.Registry.MustRegister(m)
	return m
}

// Describe implements the prometheus.Collector interface.
func (m *Metrics) Describe(ch chan<- *prometheus.Desc) {
	m.runningNotebooks.Describe(ch)
	m.NotebookCreation.Describe(ch)
	m.NotebookFailCreation.Describe(ch)
}

// Collect implements the prometheus.Collector interface.
func (m *Metrics) Collect(ch chan<- prometheus.Metric) {
	m.scrape()
	m.runningNotebooks.Collect(ch)
	m.NotebookCreation.Collect(ch)
	m.NotebookFailCreation.Collect(ch)
}

// scrape gets current running notebooks.
func (m *Metrics) scrape() {
	nbLists := &v1beta1.NotebookList{}
	if err := m.cache.List(context.TODO(), nbLists); err != nil {
		return
	}
	nbCache := map[string]int{}
	for _, nb := range nbLists.Items {
		nbCache[nb.Namespace] += 1
	}
	for ns, v := range nbCache {
		m.runningNotebooks.WithLabelValues(ns).Set(float64(v))
	}
}

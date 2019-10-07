# kf-monitoring

kf-monitoring is common monitoring util library for Kubeflow components written in go.
The goal is to provide interface for both metrics generators (kubeflow components) and metrics consumters (alerts / UI). 
When upstream components record metrics through kf-monitoring, new metrics will be picked up by downstream consumers without changing downstream configs.

**Benefit of using kf-monitoring**

kf-monitoring defines:
- Fixed metrics names and types
  - Metrics names is consumed by downstream components who is configured by metrics names
  - Two major downstream consumers:
    - [alert rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) that keep scanning metrics
    - [monitoring dashboard](https://prometheus.io/docs/visualization/grafana/) that display metrics groups
- structured label group
  - Each component use labels to identify the metrics they are recording.
  - Current label group: `component, kind, namespace, action, severity`
  
**Integration instruction**

WIP


/** Time-series interval enumeration. */
export enum Interval {
  Last5m = 'Last5m',
  Last15m = 'Last15m',
  Last30m = 'Last30m',
  Last60m = 'Last60m',
  Last180m = 'Last180m',
}

/** Data-point contained in a time series. */
export interface TimeSeriesPoint {
  timestamp: number;
  label: string;
  value: number;
}

export interface MetricsInfo {
  resourceChartsLink: string | undefined;
  resourceChartsLinkText: string;
}

/**
 * Interface definition for implementers of metrics services capable of
 * returning time-series resource utilization metrics for the Kubeflow system.
 */
export interface MetricsService {
  /**
   * Returns CPU utilization time-series over the specified interval for the
   * Nodes in the cluster.
   * @param interval
   */
  getNodeCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]>;

  /**
   * Returns CPU utilization time-series over the specified interval for Pods
   * within the cluster.
   * @param interval
   */
  getPodCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]>;

  /**
   * Returns memory usage in bytes time-series over the specified interval
   * for Pods within the cluster.
   * @param interval
   */
  getPodMemoryUsage(interval: Interval): Promise<TimeSeriesPoint[]>;

  /**
   * Return a MetricsInfo object containing the url of the metric dashboard and the
   * text to display for the redirect button.
   */
  getChartsLink(): MetricsInfo;
}

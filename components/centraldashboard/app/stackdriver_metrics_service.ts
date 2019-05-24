import * as monitoring from '@google-cloud/monitoring';

import {Interval, MetricsService, TimeSeriesPoint} from './metrics_service';

const INSTANCE_METRIC_TYPE_PREFIX = 'compute.googleapis.com/instance';
const INSTANCE_CPU_UTILIZATION_METRIC_TYPE =
    `${INSTANCE_METRIC_TYPE_PREFIX}/cpu/utilization`;
const CONTAINER_METRIC_TYPE_PREFIX = 'container.googleapis.com/container';
const CONTAINER_CPU_UTILIZATION_METRIC_TYPE =
    `${CONTAINER_METRIC_TYPE_PREFIX}/cpu/utilization`;
const CONTAINER_MEMORY_USED_METRIC_TYPE =
    `${CONTAINER_METRIC_TYPE_PREFIX}/memory/bytes_used`;

export class StackdriverMetricsService implements MetricsService {
  constructor(
      private client: monitoring.MetricServiceClient, private projectId: string,
      private nodeNames: string[]) {}

  async getNodeCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]> {
    const response: TimeSeriesPoint[] = [];
    let filter = `metric.type="${
        INSTANCE_CPU_UTILIZATION_METRIC_TYPE}" AND metric.label.instance_name = `;
    if (this.nodeNames.length > 1) {
      filter += `one_of("${this.nodeNames.join('", "')}")`;
    } else {
      filter += `"${this.nodeNames[0]}"`;
    }
    try {
      const timeSeries = await this.fetchTimeSeries(filter, interval);
      timeSeries.forEach((ts) => {
        ts.points.forEach((p) => {
          // Override the inferred type from the Point's TimeInterval
          // since the actual response type is a proto Timestamp object
          const endTime =
              (p.interval.endTime as unknown) as monitoring.Timestamp;
          response.push({
            timestamp: Number(endTime.seconds),
            label: ts.metric.labels['instance_name'],
            value: p.value.doubleValue,
          });
        });
      });
    } catch (err) {
      console.error(
          'Unable to fetch Node CPU Utilization metrics:',
          err.details ? err.details : err);
    }
    return this.chronologicalSort(response);
  }


  async getPodCpuUtilization(interval: Interval): Promise<TimeSeriesPoint[]> {
    const response: TimeSeriesPoint[] = [];
    const filter = `metric.type="${CONTAINER_CPU_UTILIZATION_METRIC_TYPE}"`;
    try {
      const timeSeries = await this.fetchTimeSeries(filter, interval);
      timeSeries.forEach((ts) => {
        ts.points.forEach((p) => {
          // Override the inferred type from the Point's TimeInterval
          // since the actual response type is a proto Timestamp object
          const endTime =
              (p.interval.endTime as unknown) as monitoring.Timestamp;
          response.push({
            timestamp: Number(endTime.seconds),
            label: ts.resource.labels['container_name'] ||
                ts.resource.labels['pod_id'],
            value: p.value.doubleValue,
          });
        });
      });
    } catch (err) {
      console.error(
          'Unable to fetch Pod CPU Utilization metrics:',
          err.details ? err.details : err);
    }
    return this.chronologicalSort(response);
  }

  async getPodMemoryUsage(interval: Interval): Promise<TimeSeriesPoint[]> {
    const response: TimeSeriesPoint[] = [];
    const filter = `metric.type="${CONTAINER_MEMORY_USED_METRIC_TYPE}" AND ` +
        `metric.label.memory_type = "non-evictable"`;
    try {
      const timeSeries = await this.fetchTimeSeries(filter, interval);
      timeSeries.forEach((ts) => {
        ts.points.forEach((p) => {
          // Override the inferred type from the Point's TimeInterval
          // since the actual response type is a proto Timestamp object
          const endTime =
              (p.interval.endTime as unknown) as monitoring.Timestamp;
          response.push({
            timestamp: Number(endTime.seconds),
            label: ts.resource.labels['container_name'] ||
                ts.resource.labels['pod_id'],
            value: Number(p.value.doubleValue)
          });
        });
      });
    } catch (err) {
      console.error(
          'Unable to fetch Pod Memory Utilization metrics:',
          err.details ? err.details : err);
    }
    return this.chronologicalSort(response);
  }

  // Sorts the list of TimeSeriesPoint objects ascending by time (in-place).
  private chronologicalSort(points: TimeSeriesPoint[]): TimeSeriesPoint[] {
    points.sort((a, b) => a.timestamp - b.timestamp);
    return points;
  }

  // Fetches the time series data aligned at 1m intervals
  private async fetchTimeSeries(filter: string, interval: Interval):
      Promise<gapi.client.monitoring.TimeSeries[]> {
    try {
      const [data] = await this.client.listTimeSeries({
        name: this.client.projectPath(this.projectId),
        filter,
        interval: this.getTimeSeriesInterval(interval),
        aggregation: {
          alignmentPeriod: {
            seconds: 60,
          },
          perSeriesAligner: 'ALIGN_MEAN',
          crossSeriesReducer: 'REDUCE_NONE',
        }
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  private getTimeSeriesInterval(interval: Interval):
      {startTime: monitoring.Timestamp, endTime: monitoring.Timestamp} {
    const now = Math.floor(Date.now() / 1000);
    let minutesToSubtract = 0;
    switch (interval) {
      case Interval.Last5m:
        minutesToSubtract = 5;
        break;
      case Interval.Last15m:
        minutesToSubtract = 15;
        break;
      case Interval.Last30m:
        minutesToSubtract = 30;
        break;
      case Interval.Last60m:
        minutesToSubtract = 60;
        break;
      case Interval.Last180m:
        minutesToSubtract = 180;
        break;
      default:
    }
    return {
      startTime: {seconds: now - (60 * minutesToSubtract)},
      endTime: {seconds: now},
    };
  }
}

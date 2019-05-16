/**
 * Manually written TypeScript definition file for @google-cloud/monitoring
 * since it doesn't exist yet.
 */
/// <reference types="gapi.client.monitoring" />

declare module '@google-cloud/monitoring' {
  interface Timestamp {
    seconds: number;
    nanos?: number;
  }

  class MetricServiceClient {
    /** Return a fully-qualified project resource name string. */
    projectPath(projectId: string): string;

    /**
     * Simplified type definition for listTimeSeries method.
     * https://cloud.google.com/nodejs/docs/reference/monitoring/0.7.x/v3.MetricServiceClient#listTimeSeries
     */
    listTimeSeries(request: {
      name: string,
      filter: string,
      interval: {startTime: Timestamp, endTime: Timestamp},
      aggregation?: {
        alignmentPeriod?: {
          seconds: number,
        },
        perSeriesAligner?: string,
        crossSeriesReducer?: string,
      }
    }): Promise<[gapi.client.monitoring.TimeSeries[]]>;
  }
}

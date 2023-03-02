import * as monitoring from '@google-cloud/monitoring';
import * as fetch from 'node-fetch';

import {Interval} from './metrics_service';
import {StackdriverMetricsService} from './stackdriver_metrics_service';

describe('StackdriverMetricsService', () => {
  const projectId = 'test-project';
  const nodeNames = ['node-1', 'node-2'];
  const emptyTimeSeriesPromise =
      Promise.resolve([[]] as [gapi.client.monitoring.TimeSeries[]]);
  const aggregation = {
    alignmentPeriod: {
      seconds: 60,
    },
    perSeriesAligner: 'ALIGN_MEAN',
    crossSeriesReducer: 'REDUCE_NONE',
  };
  let stackdriverClient: jasmine.SpyObj<monitoring.MetricServiceClient>;
  let service: StackdriverMetricsService;
  let mockFetch: jasmine.Spy;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(1557705600000));
    stackdriverClient = jasmine.createSpyObj<monitoring.MetricServiceClient>(
        'mockStackdriverClient', ['listTimeSeries', 'projectPath']);
    stackdriverClient.projectPath.withArgs(projectId).and.returnValue(
        `projects/${projectId}`);
    const response = {
      ok: true,
      text: () => Promise.resolve('test-cluster'),
    } as fetch.Response;
    mockFetch =
        spyOn(fetch, 'default').and.returnValue(Promise.resolve(response));
    service =
        new StackdriverMetricsService(stackdriverClient, projectId, nodeNames);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('Node CPU Utilization', () => {
    it('Retrieves for multiple nodes', async () => {
      const response =
          ([
            {
              resource: {labels: {node_name: 'node-1-gce-instance-abc'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600},
                  },
                  value: {
                    doubleValue: 0.08,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300}
                  },
                  value: {
                    doubleValue: 0.1,
                  },
                },
              ]
            },
            {
              resource: {labels: {node_name: 'node-2-gce-instance-xyz'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600},
                  },
                  value: {
                    doubleValue: 0.07,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300},
                  },
                  value: {
                    doubleValue: 0.12,
                  },
                },
              ]
            }
          ] as unknown) as gapi.client.monitoring.TimeSeries[];

      stackdriverClient.listTimeSeries
          .withArgs({
            name: 'projects/test-project',
            filter:
                'metric.type="kubernetes.io/node/cpu/allocatable_utilization" ' +
                'AND resource.label.node_name=one_of("node-1", "node-2")',
            interval: {
              startTime: {seconds: 1557705300},
              endTime: {seconds: 1557705600}
            },
            aggregation
          })
          .and.returnValue(Promise.resolve(
              [response] as [gapi.client.monitoring.TimeSeries[]]));
      const timeSeriesPoints =
          await service.getNodeCpuUtilization(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(4);
      expect(timeSeriesPoints).toEqual([
        {timestamp: 1557705300, label: 'node-1-gce-instance-abc', value: 0.1},
        {timestamp: 1557705300, label: 'node-2-gce-instance-xyz', value: 0.12},
        {timestamp: 1557705600, label: 'node-1-gce-instance-abc', value: 0.08},
        {timestamp: 1557705600, label: 'node-2-gce-instance-xyz', value: 0.07}
      ]);
    });

    it('Retrieves for a single node cluster', async () => {
      const request = {
        name: 'projects/test-project',
        filter:
            'metric.type="kubernetes.io/node/cpu/allocatable_utilization" ' +
            'AND resource.label.node_name="node-1"',
        interval: {
          startTime: {seconds: 1557705300},
          endTime: {seconds: 1557705600},
        },
        aggregation: {
          alignmentPeriod: {
            seconds: 60,
          },
          perSeriesAligner: 'ALIGN_MEAN',
          crossSeriesReducer: 'REDUCE_NONE',
        }
      };
      service = new StackdriverMetricsService(
          stackdriverClient, projectId, ['node-1']);
      stackdriverClient.listTimeSeries.withArgs(request).and.returnValue(
          emptyTimeSeriesPromise);
      await service.getNodeCpuUtilization(Interval.Last5m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith(request);
    });

    it('Returns an empty list on error', async () => {
      stackdriverClient.listTimeSeries.and.throwError('Stackdriver error');
      const timeSeriesPoints =
          await service.getNodeCpuUtilization(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(0);
    });

    it('Retrieves for different time intervals', async () => {
      const request = {
        name: 'projects/test-project',
        filter:
            'metric.type="kubernetes.io/node/cpu/allocatable_utilization" ' +
            'AND resource.label.node_name="node-1"',
        interval: {
          startTime: {seconds: 1557704700},
          endTime: {seconds: 1557705600},
        },
        aggregation
      };
      service = new StackdriverMetricsService(
          stackdriverClient, projectId, ['node-1']);
      stackdriverClient.listTimeSeries.and.returnValue(emptyTimeSeriesPromise);
      await service.getNodeCpuUtilization(Interval.Last15m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith(request);

      request.interval.startTime.seconds = 1557703800;
      await service.getNodeCpuUtilization(Interval.Last30m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith(request);

      request.interval.startTime.seconds = 1557702000;
      await service.getNodeCpuUtilization(Interval.Last60m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith(request);

      request.interval.startTime.seconds = 1557694800;
      await service.getNodeCpuUtilization(Interval.Last180m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith(request);
    });
  });

  describe('Pod CPU Utilization', () => {
    it('Retrieves for multiple pods', async () => {
      const response =
          ([
            {
              resource: {labels: {container_name: 'foo-container'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300},
                  },
                  value: {
                    doubleValue: 0.08,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600}
                  },
                  value: {
                    doubleValue: 0.10,
                  },
                },
              ]
            },
            {
              resource:
                  {labels: {pod_name: 'fe1f5b92-66a8-11e9-9fd0-42010a800178'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300},
                  },
                  value: {
                    doubleValue: 0.07,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600},
                  },
                  value: {
                    doubleValue: 0.12,
                  },
                },
              ]
            }
          ] as unknown) as gapi.client.monitoring.TimeSeries[];
      stackdriverClient.listTimeSeries
          .withArgs({
            name: 'projects/test-project',
            filter:
                'metric.type="kubernetes.io/container/cpu/limit_utilization"' +
                ' AND resource.label.cluster_name="test-cluster"',
            interval: {
              startTime: {seconds: 1557705300},
              endTime: {seconds: 1557705600}
            },
            aggregation
          })
          .and.returnValue(Promise.resolve(
              [response] as [gapi.client.monitoring.TimeSeries[]]));
      const timeSeriesPoints =
          await service.getPodCpuUtilization(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(4);
      expect(timeSeriesPoints).toEqual([
        {
          timestamp: 1557705300,
          label: 'foo-container',
          value: 0.08,
        },
        {
          timestamp: 1557705300,
          label: 'fe1f5b92-66a8-11e9-9fd0-42010a800178',
          value: 0.07,
        },
        {
          timestamp: 1557705600,
          label: 'foo-container',
          value: 0.1,
        },
        {
          timestamp: 1557705600,
          label: 'fe1f5b92-66a8-11e9-9fd0-42010a800178',
          value: 0.12,
        }
      ]);

      // Call again to validate that cluster-name is cached
      await service.getPodCpuUtilization(Interval.Last5m);
      expect(mockFetch).toHaveBeenCalledWith(
          'http://metadata.google.internal/computeMetadata/v1/instance/attributes/cluster-name',
          {headers: {'Metadata-Flavor': 'Google'}});
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('Filters without cluster name', async () => {
      const response = {ok: false} as unknown as fetch.Response;
      mockFetch.and.returnValue(Promise.resolve(response));
      await service.getPodCpuUtilization(Interval.Last5m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith({
        name: 'projects/test-project',
        filter: 'metric.type="kubernetes.io/container/cpu/limit_utilization"',
        interval:
            {startTime: {seconds: 1557705300}, endTime: {seconds: 1557705600}},
        aggregation
      });
    });

    it('Returns an empty list on error', async () => {
      stackdriverClient.listTimeSeries.and.throwError('Stackdriver error');
      const timeSeriesPoints =
          await service.getPodCpuUtilization(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(0);
    });
  });

  describe('Pod Memory Usage', () => {
    it('Retrieves for multiple pods', async () => {
      const response =
          ([
            {
              resource: {labels: {container_name: 'foo-container'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300},
                  },
                  value: {
                    doubleValue: 800,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600}
                  },
                  value: {
                    doubleValue: 1000,
                  },
                },
              ]
            },
            {
              resource:
                  {labels: {pod_name: 'fe1f5b92-66a8-11e9-9fd0-42010a800178'}},
              points: [
                {
                  interval: {
                    startTime: {seconds: 1557705300},
                    endTime: {seconds: 1557705300},
                  },
                  value: {
                    doubleValue: 700,
                  },
                },
                {
                  interval: {
                    startTime: {seconds: 1557705600},
                    endTime: {seconds: 1557705600},
                  },
                  value: {
                    doubleValue: 1200,
                  },
                },
              ]
            }
          ] as unknown) as gapi.client.monitoring.TimeSeries[];

      stackdriverClient.listTimeSeries
          .withArgs({
            name: 'projects/test-project',
            filter: 'metric.type="kubernetes.io/container/memory/used_bytes"' +
                ' AND metric.label.memory_type = "non-evictable"' +
                ' AND resource.label.cluster_name="test-cluster"',
            interval: {
              startTime: {seconds: 1557705300},
              endTime: {seconds: 1557705600}
            },
            aggregation
          })
          .and.returnValue(Promise.resolve(
              [response] as [gapi.client.monitoring.TimeSeries[]]));
      const timeSeriesPoints = await service.getPodMemoryUsage(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(4);
      expect(timeSeriesPoints).toEqual([
        {
          timestamp: 1557705300,
          label: 'foo-container',
          value: 800,
        },
        {
          timestamp: 1557705300,
          label: 'fe1f5b92-66a8-11e9-9fd0-42010a800178',
          value: 700,
        },
        {
          timestamp: 1557705600,
          label: 'foo-container',
          value: 1000,
        },
        {
          timestamp: 1557705600,
          label: 'fe1f5b92-66a8-11e9-9fd0-42010a800178',
          value: 1200,
        }
      ]);

      // Call again to validate that cluster-name is cached
      await service.getPodMemoryUsage(Interval.Last5m);
      expect(mockFetch).toHaveBeenCalledWith(
          'http://metadata.google.internal/computeMetadata/v1/instance/attributes/cluster-name',
          {headers: {'Metadata-Flavor': 'Google'}});
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('Returns an empty list on error', async () => {
      stackdriverClient.listTimeSeries.and.throwError('Stackdriver error');
      const timeSeriesPoints = await service.getPodMemoryUsage(Interval.Last5m);
      expect(timeSeriesPoints.length).toBe(0);
    });

    it('Filters without cluster name', async () => {
      mockFetch.and.returnValue(
          Promise.reject(new Error('Unable to get Metadata')));
      await service.getPodMemoryUsage(Interval.Last5m);
      expect(stackdriverClient.listTimeSeries).toHaveBeenCalledWith({
        name: 'projects/test-project',
        filter: 'metric.type="kubernetes.io/container/memory/used_bytes"' +
            ' AND metric.label.memory_type = "non-evictable"',
        interval:
            {startTime: {seconds: 1557705300}, endTime: {seconds: 1557705600}},
        aggregation
      });
    });
  });
});

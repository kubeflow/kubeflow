import express from 'express';
import {get} from 'http';

import {Api} from './api';
import {DefaultApi} from './clients/profile_controller';
import {KubernetesService} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

describe('Main API', () => {
  let mockK8sService: jasmine.SpyObj<KubernetesService>;
  let mockMetricsService: jasmine.SpyObj<MetricsService>;
  let mockProfilesService: jasmine.SpyObj<DefaultApi>;
  let testApp: express.Application;
  let port: number;
  const newAPI = (withMetrics = false) => new Api(
    mockK8sService,
    withMetrics ? mockMetricsService : undefined,
  );

  describe('Without a Metrics Service', () => {
    beforeEach(() => {
      mockK8sService = jasmine.createSpyObj<KubernetesService>(['']);
      mockProfilesService = jasmine.createSpyObj<DefaultApi>(['']);

      testApp = express();
      testApp.use(express.json());
      testApp.use(
          '/api', newAPI().routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      }
      port = addressInfo.port;
    });

    it('Should return a 405 status code', (done) => {
      get(`http://localhost:${port}/api/metrics/podcpu`, (res) => {
        expect(res.statusCode).toBe(405);
        done();
      });
    });
  });

  describe('With a Metrics Service', () => {
    beforeEach(() => {
      mockK8sService = jasmine.createSpyObj<KubernetesService>(['']);
      mockProfilesService = jasmine.createSpyObj<DefaultApi>(['']);
      mockMetricsService = jasmine.createSpyObj<MetricsService>([
        'getNodeCpuUtilization', 'getPodCpuUtilization', 'getPodMemoryUsage'
      ]);

      testApp = express();
      testApp.use(express.json());
      testApp.use(
          '/api',
          newAPI(true).routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      } else {
        port = addressInfo.port;
      }
    });

    it('Should retrieve Node CPU Utilization for default 15m interval',
       async () => {
         const defaultInterval = new Promise((resolve) => {
           get(`http://localhost:${port}/api/metrics/node`, (res) => {
             expect(res.statusCode).toBe(200);
             expect(mockMetricsService.getNodeCpuUtilization)
                 .toHaveBeenCalledWith(Interval.Last15m);
             resolve();
           });
         });
         const invalidQsInterval = new Promise((resolve) => {
           get(`http://localhost:${port}/api/metrics/node?interval=100`,
               (res) => {
                 expect(res.statusCode).toBe(200);
                 expect(mockMetricsService.getNodeCpuUtilization)
                     .toHaveBeenCalledWith(Interval.Last15m);
                 resolve();
               });
         });
         await Promise.all([defaultInterval, invalidQsInterval]);
       });

    it('Should retrieve Pod CPU Utilization for default 15m interval',
       (done) => {
         get(`http://localhost:${port}/api/metrics/podcpu`, (res) => {
           expect(res.statusCode).toBe(200);
           expect(mockMetricsService.getPodCpuUtilization)
               .toHaveBeenCalledWith(Interval.Last15m);
           done();
         });
       });

    it('Should retrieve Pod Memory Usage for default 15m interval', (done) => {
      get(`http://localhost:${port}/api/metrics/podmem`, (res) => {
        expect(res.statusCode).toBe(200);
        expect(mockMetricsService.getPodMemoryUsage)
            .toHaveBeenCalledWith(Interval.Last15m);
        done();
      });
    });

    it('Should retrieve Node CPU Utilization for a user-specified interval',
       (done) => {
         get(`http://localhost:${port}/api/metrics/node?interval=Last60m`,
             (res) => {
               expect(res.statusCode).toBe(200);
               expect(mockMetricsService.getNodeCpuUtilization)
                   .toHaveBeenCalledWith(Interval.Last60m);
               done();
             });
       });
  });
});

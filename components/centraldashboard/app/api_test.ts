import {V1Namespace} from '@kubernetes/client-node';
import express from 'express';
import {get} from 'http';

import {Api} from './api';
import {KubernetesService} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

describe('Dashboard API', () => {
  let mockK8sService: jasmine.SpyObj<KubernetesService>;
  let mockMetricsService: jasmine.SpyObj<MetricsService>;
  let testApp: express.Application;
  let port: number;

  describe('Environment Information', () => {
    beforeEach(() => {
      mockK8sService = jasmine.createSpyObj<KubernetesService>([
        'getPlatformInfo',
        'getNamespaces',
      ]);
      const namespaces = [
        {
          apiVersion: 'v1',
          kind: 'Namespace',
          metadata: {
            name: 'default',
          },
        },
        {
          apiVersion: 'v1',
          kind: 'Namespace',
          metadata: {
            name: 'kubeflow',
          },
        },
      ] as V1Namespace[];
      mockK8sService.getNamespaces.and.returnValue(Promise.resolve(namespaces));
      mockK8sService.getPlatformInfo.and.returnValue(Promise.resolve({
        provider: 'onprem',
        providerName: 'onprem',
        kubeflowVersion: '1.0.0',
      }));

      testApp = express();
      testApp.use(express.json());
      testApp.use('/api', new Api(mockK8sService).routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      }
      port = addressInfo.port;
    });

    const getResponse = (headers?: {[header: string]: string}) =>
        new Promise((resolve) => {
          get(`http://localhost:${port}/api/env-info`, {headers}, (res) => {
            expect(res.statusCode).toBe(200);
            expect(mockK8sService.getNamespaces).toHaveBeenCalled();
            let body = '';
            res.on('data', (chunk) => body += String(chunk));
            res.on('end', () => {
              resolve(JSON.parse(body));
            });
          });
        });

    it('Should retrieve and cache information', async () => {
      let response = await getResponse();
      expect(response).toEqual({
        platform: {
          provider: 'onprem',
          providerName: 'onprem',
          kubeflowVersion: '1.0.0',
        },
        user: 'anonymous@kubeflow.org',
        namespaces: ['default', 'kubeflow'],
      });
      expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();

      // Second call should use cached platform information
      response = await getResponse();
      expect(response).toEqual({
        platform: {
          provider: 'onprem',
          providerName: 'onprem',
          kubeflowVersion: '1.0.0',
        },
        user: 'anonymous@kubeflow.org',
        namespaces: ['default', 'kubeflow'],
      });
      expect(mockK8sService.getNamespaces.calls.count()).toBe(2);
      expect(mockK8sService.getPlatformInfo.calls.count()).toBe(1);
    });

    it('Should parse email from IAP header', async () => {
      const headers = {
        'X-Goog-Authenticated-User-Email':
            'accounts.google.com:test@testdomain.com',
      };
      const response = await getResponse(headers);
      expect(response).toEqual({
        platform: {
          provider: 'onprem',
          providerName: 'onprem',
          kubeflowVersion: '1.0.0',
        },
        user: 'test@testdomain.com',
        namespaces: ['default', 'kubeflow'],
      });
    });
  });

  describe('Without a Metrics Service', () => {
    beforeEach(() => {
      mockK8sService = jasmine.createSpyObj<KubernetesService>(['']);

      testApp = express();
      testApp.use(express.json());
      testApp.use('/api', new Api(mockK8sService).routes());
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
      mockMetricsService = jasmine.createSpyObj<MetricsService>([
        'getNodeCpuUtilization', 'getPodCpuUtilization', 'getPodMemoryUsage'
      ]);

      testApp = express();
      testApp.use(express.json());
      testApp.use('/api', new Api(mockK8sService, mockMetricsService).routes());
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

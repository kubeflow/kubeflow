import {V1Namespace} from '@kubernetes/client-node';
import express from 'express';
import {get, request} from 'http';

import {Api} from './api';
import {attachUser} from './attach_user_middleware';
import {DefaultApi} from './clients/profile_controller';
import {KubernetesService} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {
  WorkgroupApi,
  mapSimpleBindingToWorkgroupBinding,
} from './api_workgroup';

// Helper function to send a test request and return a Promise for the response
function sendTestRequest(
    url: string, headers?: {[header: string]: string}, expectedStatus = 200,
    method = 'get', body: {} = null): Promise<{}> {
  return new Promise((resolve) => {
    const clientRequest = request(url, {method, headers}, (res) => {
      expect(res.statusCode).toBe(expectedStatus);
      let body = '';
      res.on('data', (chunk) => body += String(chunk));
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
    if (body !== null) {
      clientRequest.write(JSON.stringify(body));
    }
    clientRequest.end();
  });
}

describe('Dashboard API', () => {
  const header = 'X-Goog-Authenticated-User-Email';
  const prefix = 'accounts.google.com:';
  const attachUserMiddleware = attachUser(header, prefix);
  let mockK8sService: jasmine.SpyObj<KubernetesService>;
  let mockMetricsService: jasmine.SpyObj<MetricsService>;
  let mockProfilesService: jasmine.SpyObj<DefaultApi>;
  let testApp: express.Application;
  let port: number;
  const newAPI = (withMetrics = false) => new Api(
    mockK8sService,
    new WorkgroupApi(mockProfilesService),
    withMetrics ? mockMetricsService : undefined,
  );

  describe('Environment Information', () => {
    let url: string;
    beforeEach(() => {
      mockK8sService = jasmine.createSpyObj<KubernetesService>([
        'getPlatformInfo',
        'getNamespaces',
      ]);
      mockK8sService.getPlatformInfo.and.returnValue(Promise.resolve({
        provider: 'onprem',
        providerName: 'onprem',
        kubeflowVersion: '1.0.0',
      }));
      mockProfilesService = jasmine.createSpyObj<DefaultApi>(
          ['readBindings', 'v1RoleClusteradminGet']);

      mockProfilesService.readBindings.withArgs()
          .and.returnValue(Promise.resolve({
            response: null,
            body: {
              bindings: [
                {user: 'anyone@kubeflow.org', namespace: 'default', role: 'owner'},
                {user: 'user1@kubeflow.org', namespace: 'default', role: 'contributor'},
                {user: 'user1@kubeflow.org', namespace: 'kubeflow', role: 'owner'},
              ].map(mapSimpleBindingToWorkgroupBinding)
            },
          }));

      testApp = express();
      testApp.use(express.json());
      testApp.use(attachUserMiddleware);
      testApp.use(
          '/api', newAPI().routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      }
      port = addressInfo.port;
      url = `http://localhost:${port}/api/env-info`;
    });

    it('Should retrieve information for a non-identity aware cluster',
       async () => {
         const expectedResponse = {
           platform: {
             provider: 'onprem',
             providerName: 'onprem',
             kubeflowVersion: '1.0.0',
           },
           user: 'anonymous@kubeflow.org',
           isClusterAdmin: true,
           namespaces: [
             {
               user: 'anonymous@kubeflow.org',
               namespace: 'default',
               role: 'contributor',
             },
             {
               user: 'anonymous@kubeflow.org',
               namespace: 'kubeflow',
               role: 'contributor',
             },
           ],
         };

         let response = await sendTestRequest(url);
         expect(response).toEqual(expectedResponse);
         expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();

         // Second call should use cached platform information
         response = await sendTestRequest(url);
         expect(response).toEqual(expectedResponse);
         expect(mockK8sService.getPlatformInfo.calls.count()).toBe(1);
         expect(mockProfilesService.readBindings).toHaveBeenCalled();
         expect(mockProfilesService.v1RoleClusteradminGet)
             .not.toHaveBeenCalled();
       });

    it('Should retrieve information for an identity aware cluster',
       async () => {
         mockProfilesService.v1RoleClusteradminGet
             .withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({response: null, body: false}));
         mockProfilesService.readBindings.withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({
               response: null,
               body: {
                 bindings: [{
                   user: {kind: 'user', name: 'test@testdomain.com'},
                   referredNamespace: 'test',
                   roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'edit'}
                 }]
               },
             }));

         const headers = {
           [header]: `${prefix}test@testdomain.com`,
         };
         const expectedResponse = {
           platform: {
             provider: 'onprem',
             providerName: 'onprem',
             kubeflowVersion: '1.0.0',
           },
           user: 'test@testdomain.com',
           isClusterAdmin: false,
           namespaces: [
             {
               user: 'test@testdomain.com',
               namespace: 'test',
               role: 'contributor',
             },
           ],
         };

         const response = await sendTestRequest(url, headers);
         expect(response).toEqual(expectedResponse);
         expect(mockK8sService.getNamespaces).not.toHaveBeenCalled();
         expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();
         expect(mockProfilesService.readBindings)
             .toHaveBeenCalledWith('test@testdomain.com');
         expect(mockProfilesService.v1RoleClusteradminGet)
             .toHaveBeenCalledWith('test@testdomain.com');
       });

    it('Returns an error status if the Profiles service fails', async () => {
      mockProfilesService.v1RoleClusteradminGet.withArgs('test@testdomain.com')
          .and.callFake(
              () => Promise.reject(
                  {response: {statusCode: 400}, body: 'A bad thing happened'}));
      mockProfilesService.readBindings.withArgs('test@testdomain.com')
          .and.returnValue(Promise.resolve({
            response: null,
            body: {
              bindings: [{
                user: {kind: 'user', name: 'test@testdomain.com'},
                referredNamespace: 'test',
                roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'edit'}
              }]
            },
          }));

      const headers = {
        [header]: `${prefix}test@testdomain.com`,
      };
      const response = await sendTestRequest(url, headers, 400);
      expect(response).toEqual({error: 'A bad thing happened'});
      expect(mockK8sService.getNamespaces).not.toHaveBeenCalled();
      expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();
      expect(mockProfilesService.readBindings)
          .toHaveBeenCalledWith('test@testdomain.com');
      expect(mockProfilesService.v1RoleClusteradminGet)
          .toHaveBeenCalledWith('test@testdomain.com');
    });
  });

  describe('Has Workgroup', () => {
    let url: string;
    beforeEach(() => {
      mockProfilesService = jasmine.createSpyObj<DefaultApi>(
          ['readBindings', 'v1RoleClusteradminGet']);

      testApp = express();
      testApp.use(express.json());
      testApp.use(attachUserMiddleware);
      testApp.use(
          '/api', newAPI().routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      }
      port = addressInfo.port;
      url = `http://localhost:${port}/api/workgroup/exists`;
    });

    it('Should return for a non-identity aware cluster', async () => {
      const expectedResponse = {hasAuth: false, hasWorkgroup: false, user: 'anonymous'};

      const response = await sendTestRequest(url);
      expect(response).toEqual(expectedResponse);
      expect(mockProfilesService.v1RoleClusteradminGet).not.toHaveBeenCalled();
      expect(mockProfilesService.readBindings).not.toHaveBeenCalled();
    });

    it('Should return for an identity aware cluster with a Workgroup',
       async () => {
         mockProfilesService.v1RoleClusteradminGet
             .withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({response: null, body: false}));
         mockProfilesService.readBindings.withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({
               response: null,
               body: {
                 bindings: [{
                   user: {kind: 'user', name: 'test@testdomain.com'},
                   referredNamespace: 'test',
                   roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'admin'}
                 }]
               },
             }));

         const expectedResponse = {hasAuth: true, hasWorkgroup: true, user: 'test'};

         const headers = {
           [header]: `${prefix}test@testdomain.com`,
         };
         const response = await sendTestRequest(url, headers);
         expect(response).toEqual(expectedResponse);
         expect(mockProfilesService.readBindings)
             .toHaveBeenCalledWith('test@testdomain.com');
         expect(mockProfilesService.v1RoleClusteradminGet)
             .toHaveBeenCalledWith('test@testdomain.com');
       });

    it('Should return for an identity aware cluster without a Workgroup',
       async () => {
         mockProfilesService.v1RoleClusteradminGet
             .withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({response: null, body: false}));
         mockProfilesService.readBindings.withArgs('test@testdomain.com')
             .and.returnValue(Promise.resolve({
               response: null,
               body: {bindings: []},
             }));

         const expectedResponse = {hasAuth: true, hasWorkgroup: false, user: 'test'};

         const headers = {
           [header]: `${prefix}test@testdomain.com`,
         };
         const response = await sendTestRequest(url, headers);
         expect(response).toEqual(expectedResponse);
         expect(mockProfilesService.readBindings)
             .toHaveBeenCalledWith('test@testdomain.com');
         expect(mockProfilesService.v1RoleClusteradminGet)
             .toHaveBeenCalledWith('test@testdomain.com');
       });
  });

  describe('Create Workgroup', () => {
    let url: string;

    beforeEach(() => {
      mockProfilesService = jasmine.createSpyObj<DefaultApi>(['createProfile']);

      testApp = express();
      testApp.use(express.json());
      testApp.use(attachUserMiddleware);
      testApp.use(
          '/api', newAPI().routes());
      const addressInfo = testApp.listen(0).address();
      if (typeof addressInfo === 'string') {
        throw new Error(
            'Unable to determine system-assigned port for test API server');
      }
      port = addressInfo.port;
      url = `http://localhost:${port}/api/workgroup/create`;
    });

    it('Should use user identity if no body is provided', async () => {
      const headers = {
        [header]: `${prefix}test@testdomain.com`,
      };
      const response = await sendTestRequest(url, headers, 200, 'post');
      expect(response).toEqual({message: 'Created namespace test'});
      expect(mockProfilesService.createProfile).toHaveBeenCalledWith({
        metadata: {
          name: 'test',
        },
        spec: {
          owner: {
            kind: 'User',
            name: 'test@testdomain.com',
          }
        },
      });
    });

    it('Should use post body when provided', async () => {
      const headers = {
        [header]: `${prefix}test@testdomain.com`,
        'content-type': 'application/json',
      };
      const response = await sendTestRequest(
          url, headers, 200, 'post',
          {namespace: 'a_different_namespace', user: 'another_user@foo.bar'});
      expect(response).toEqual({message: 'Created namespace a_different_namespace'});
      expect(mockProfilesService.createProfile).toHaveBeenCalledWith({
        metadata: {
          name: 'a_different_namespace',
        },
        spec: {
          owner: {
            kind: 'User',
            name: 'another_user@foo.bar',
          }
        },
      });
    });

    it('Returns an error status if the Profiles service fails', async () => {
      mockProfilesService.createProfile
          .withArgs({
            metadata: {
              name: 'test',
            },
            spec: {
              owner: {
                kind: 'User',
                name: 'test@testdomain.com',
              }
            },
          })
          .and.callFake(() => Promise.reject({response: {statusCode: 405}}));

      const headers = {
        [header]: `${prefix}test@testdomain.com`,
      };
      const response = await sendTestRequest(url, headers, 405, 'post');
      expect(response).toEqual({error: 'Unexpected error creating profile'});
    });
  });

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

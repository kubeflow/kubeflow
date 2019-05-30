import express from 'express';

import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

interface UserInfo {
  email: string;
  image: string;
}

interface EnvironmentInfo {
  user: UserInfo;
  platform: PlatformInfo;
}

/** Function that provides user information back */
function getUserInfo() {
  return {
    email: 'user@kubeflow.org',
  };
}

/** API routes exposing information from Kubernetes */
export function api(
    k8sService: KubernetesService,
    metricsService?: MetricsService): express.Router {
  return express.Router()
      .get(
          '/env-info',
          async (_: express.Request, res: express.Response) => {
            const [platform, user] = await Promise.all([
              k8sService.getPlatformInfo(),
              getUserInfo(),
            ]);
            const returnPayoad = {platform, user} as EnvironmentInfo;
            res.json(returnPayoad);
          })
      .get(
          '/metrics/:type((node|podcpu|podmem))',
          async (req: express.Request, res: express.Response) => {
            let interval = Interval.Last15m;
            if (Interval[req.query.interval] !== undefined) {
              interval = Number(Interval[req.query.interval]);
            }
            if (metricsService) {
              switch (req.params.type) {
                case 'node':
                  res.json(
                      await metricsService.getNodeCpuUtilization(interval));
                  break;
                case 'podcpu':
                  res.json(await metricsService.getPodCpuUtilization(interval));
                  break;
                case 'podmem':
                  res.json(await metricsService.getPodMemoryUsage(interval));
                  break;
                default:
              }
            } else {
              res.sendStatus(405);
            }
          })
      .get(
          '/namespaces',
          async (_: express.Request, res: express.Response) => {
            res.json(await k8sService.getNamespaces());
          })
      .get(
          '/activities/:namespace',
          async (req: express.Request, res: express.Response) => {
            res.json(
                await k8sService.getEventsForNamespace(req.params.namespace));
          });
}

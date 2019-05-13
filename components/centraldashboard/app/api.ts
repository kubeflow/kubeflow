import express from 'express';

import {KubernetesService} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

/** API routes exposing information from Kubernetes */
export function api(
    k8sService: KubernetesService,
    metricsService?: MetricsService): express.Router {
  return express.Router()
      .get(
          '/platform-info',
          async (_: express.Request, res: express.Response) => {
            res.json(await k8sService.getPlatformInfo());
          })
      .get(
          '/namespaces',
          async (_: express.Request, res: express.Response) => {
            res.json(await k8sService.getNamespaces());
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
          '/activities/:namespace',
          async (req: express.Request, res: express.Response) => {
            res.json(
                await k8sService.getEventsForNamespace(req.params.namespace));
          });
}

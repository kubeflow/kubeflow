import express from 'express';

import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

interface EnvironmentInfo {
  namespaces: string[];
  platform: PlatformInfo;
  user: string;
}

const IAP_HEADER = 'X-Goog-Authenticated-User-Email';
const IAP_PREFIX = 'accounts.google.com:';

export class Api {
  private platformInfo: PlatformInfo;

  constructor(
      private k8sService: KubernetesService,
      private metricsService?: MetricsService) {}

  /** Retrieves and memoizes the PlatformInfo. */
  private async getPlatformInfo(): Promise<PlatformInfo> {
    if (!this.platformInfo) {
      this.platformInfo = await this.k8sService.getPlatformInfo();
    }
    return this.platformInfo;
  }

  /**
   * Retrieves user information from headers.
   * Supports:
   *  GCP IAP (https://cloud.google.com/iap/docs/identity-howto)
   */
  private getUser(req: express.Request): string {
    let email = 'anonymous@kubeflow.org';
    if (req.header(IAP_HEADER)) {
      email = req.header(IAP_HEADER).slice(IAP_PREFIX.length);
    }
    return email;
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): express.Router {
    return express.Router()
        .get(
            '/env-info',
            async (req: express.Request, res: express.Response) => {
              const [platform, user, namespaces] = await Promise.all([
                this.getPlatformInfo(),
                this.getUser(req),
                this.k8sService.getNamespaces(),
              ]);
              res.json({
                platform,
                user,
                namespaces: namespaces.map((n) => n.metadata.name),
              });
            })
        .get(
            '/metrics/:type((node|podcpu|podmem))',
            async (req: express.Request, res: express.Response) => {
              if (!this.metricsService) {
                res.sendStatus(405);
                return;
              }

              let interval = Interval.Last15m;
              if (Interval[req.query.interval] !== undefined) {
                interval = Number(Interval[req.query.interval]);
              }
              switch (req.params.type) {
                case 'node':
                  res.json(await this.metricsService.getNodeCpuUtilization(
                      interval));
                  break;
                case 'podcpu':
                  res.json(
                      await this.metricsService.getPodCpuUtilization(interval));
                  break;
                case 'podmem':
                  res.json(
                      await this.metricsService.getPodMemoryUsage(interval));
                  break;
                default:
              }
            })
        .get(
            '/namespaces',
            async (_: express.Request, res: express.Response) => {
              res.json(await this.k8sService.getNamespaces());
            })
        .get(
            '/activities/:namespace',
            async (req: express.Request, res: express.Response) => {
              res.json(await this.k8sService.getEventsForNamespace(
                  req.params.namespace));
            });
  }
}

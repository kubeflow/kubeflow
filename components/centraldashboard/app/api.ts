import express from 'express';

import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {DefaultApi, Binding as WorkgroupBinding} from './clients/profile_controller';

const IAP_HEADER = 'X-Goog-Authenticated-User-Email';
const IAP_PREFIX = 'accounts.google.com:';

interface WorkgroupInfo {
  namespaces: WorkgroupBinding[];
  isClusterAdmin: boolean;
}

interface AuthObject {
  [IAP_HEADER]: string;
}

export class Api {
  private platformInfo: PlatformInfo;

  constructor(
      private k8sService: KubernetesService,
      private metricsService?: MetricsService,
      private profileController?: DefaultApi) {}

  /** Retrieves and memoizes the PlatformInfo. */
  private async getPlatformInfo(): Promise<PlatformInfo> {
    if (!this.platformInfo) {
      this.platformInfo = await this.k8sService.getPlatformInfo();
    }
    return this.platformInfo;
  }

  private getAuthOption(req: express.Request): AuthObject {
    return {
      [IAP_HEADER]: req.get(IAP_HEADER),
    };
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
   * Retrieves workgroup info from Profile Controller.
   */
  private async getWorkgroup(req: express.Request, user: string): Promise<WorkgroupInfo> {
    const {profileController} = this;
    const auth = this.getAuthOption(req);
    const adminResponse = await profileController.v1RoleClusteradminGet(user, auth);
    const bindings = await profileController.readBindings(user, undefined, undefined, auth);
    const namespaces = bindings.body.bindings;
    return {
      isClusterAdmin: adminResponse.body,
      namespaces,
    };
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): express.Router {
    return express.Router()
        .get(
            '/env-info',
            async (req: express.Request, res: express.Response) => {
              try {
                const user = this.getUser(req);
                const [platform, {namespaces, isClusterAdmin}] = await Promise.all([
                  this.getPlatformInfo(),
                  this.getWorkgroup(req, user),
                ]);
                res.json({
                  platform,
                  user,
                  namespaces,
                  isClusterAdmin,
                  // namespaces: namespaces.map((n) => n.metadata.name),
                });
              } catch(e) {console.log('EXCEPTION HAPPENED:', e);}              
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

import express, {Request, Response} from 'express';

import {V1Namespace} from '@kubernetes/client-node';
import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {DefaultApi, Binding as WorkgroupBinding} from './clients/profile_controller';

const {env} = process;
const IAP_HEADER = env.IAP_HEADER || 'X-Goog-Authenticated-User-Email';
const IAP_PREFIX = env.IAP_PREFIX || 'accounts.google.com:';

interface WorkgroupInfo {
  namespaces: WorkgroupBinding[];
  isClusterAdmin: boolean;
}

interface AuthObject {
  [iapHeader: string]: string;
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

  private getAuthOption(req: Request): AuthObject {
    return {
      [IAP_HEADER]: req.get(IAP_HEADER),
    };
  }

  /**
   * Retrieves user information from headers.
   * Supports:
   *  GCP IAP (https://cloud.google.com/iap/docs/identity-howto)
   */
  private getUser(req: Request): string {
    let email = 'anonymous@kubeflow.org';
    if (req.header(IAP_HEADER)) {
      email = req.header(IAP_HEADER).slice(IAP_PREFIX.length);
    }
    return email;
  }

  /**
   * Retrieves workgroup info from Profile Controller.
   */
  private async getWorkgroup(req: Request, user: string): Promise<WorkgroupInfo> {
    const {profileController} = this;
    const auth = this.getAuthOption(req);
    const [adminResponse, bindings] = await Promise.all([
      profileController.v1RoleClusteradminGet(user, auth),
      profileController.readBindings(user, undefined, undefined, auth),
    ]);
    const namespaces = bindings.body.bindings;
    return {
      isClusterAdmin: adminResponse.body,
      namespaces,
    };
  }

  /**
   * Retrieves environment information including profile data
   */
  private async getProfileAwareEnv(req: Request, res: Response) {
    const user = this.getUser(req);
    const [platform, {namespaces, isClusterAdmin}] = await Promise.all([
      this.getPlatformInfo(),
      this.getWorkgroup(req, user),
    ]);
    res.json({platform, user, namespaces, isClusterAdmin});
  }
  
  /**
   * Retrieves environment information without profile data
   */
  private async getBasicEnvironment(req: Request, res: Response) {
    const user = this.getUser(req);
    const namespaces = this.kubeNamespacesORM(user, await this.k8sService.getNamespaces());
    res.json({
      platform: await this.getPlatformInfo(),
      user,
      namespaces,
    });
  }
  
  /**
   * ORM Adapter to convert kubernetes namespace list to profile controller style list
   */
  private kubeNamespacesORM(user: string, namespaces: V1Namespace[]): WorkgroupBinding[] {
    return namespaces.map((n) => ({
      user: {kind: 'user', name: user},
      referredNamespace: n.metadata.name,
      RoleRef: {
        apiGroup: '',
        kind: 'ClusterRole',
        name: 'editor',
      }
    }));
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): express.Router {
    return express.Router()
        .get(
            '/env-info',
            async (req: Request, res: Response) =>
              this.getProfileAwareEnv(req, res)
                .catch((e) => {
                  console.log('Profile based environment lookup failed, falling back to simple lookup', e);
                  this.getBasicEnvironment(req, res);
                })
            )
        .get(
            '/metrics/:type((node|podcpu|podmem))',
            async (req: Request, res: Response) => {
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
            async (_: Request, res: Response) => {
              res.json(await this.k8sService.getNamespaces());
            })
        .get(
            '/activities/:namespace',
            async (req: Request, res: Response) => {
              res.json(await this.k8sService.getEventsForNamespace(
                  req.params.namespace));
            });
  }
}

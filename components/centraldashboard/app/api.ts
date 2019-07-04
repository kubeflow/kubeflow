import express, {Request, Response} from 'express';

import {V1Namespace} from '@kubernetes/client-node';
import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {DefaultApi, Binding as WorkgroupBinding} from './clients/profile_controller';

interface WorkgroupInfo {
  namespaces: WorkgroupBinding[];
  isClusterAdmin: boolean;
}

const apiErr = (res: Response, error: string) => 
  res.status(400).json({error});

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

  /**
   * Retrieves workgroup info from Profile Controller.
   */
  private async getWorkgroup(req: Request, user: string): Promise<WorkgroupInfo> {
    const {profileController} = this;
    const auth = req.user.authHeaders;
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
    const user = req.user.name;
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
    const user = req.user.name;
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
            (req: Request, res: Response) =>
              this.getProfileAwareEnv(req, res)
                .catch((e) => {
                  console.log('Profile based environment lookup failed, falling back to simple lookup', e);
                  this.getBasicEnvironment(req, res);
                })
                .catch((e) => res.status(400).json({
                  msg: 'Could not fetch environment',
                  error: e.toString(),
                }))
            )
        .get(
            '/has-workgroup',
            async (req: Request, res: Response) => {
              const {user} = req;
              const {hasWorkgroup} = user;
              const profile = await hasWorkgroup();
              res.json({user, hasWorkgroup: profile});
            })
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
            })
        .post(
            '/create-workgroup',
            async (req: Request, res: Response) => {
              const invalidChars = /[^a-z0-9\-\_]/;
              // tslint:disable-next-line: no-any
              const {referredNamespace} = req.body || {} as any;
              if (!referredNamespace) return apiErr(res, 'No namespace provided');
              if (invalidChars.test(referredNamespace)) return apiErr(res, 'Invalid characters in namespace');
              const {profileController} = this;
              const {user, authHeaders} = req.user;
              const binding = Object.assign(
                new WorkgroupBinding(),
                {user, referredNamespace, roleRef: 'admin'}
              );
              profileController.createBinding(binding, authHeaders)
                .then(data =>
                  res.json({message: 'Successfully created your namespace!', data})
                )
                .catch(e => {
                  if (e.code === 'ENOTFOUND') return apiErr(res, 'Could not find profile controller in cluster');
                  return apiErr(res, e.stack);
                });
            });
  }
}

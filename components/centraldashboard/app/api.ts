import {V1Namespace} from '@kubernetes/client-node';
import express, {Request, Response} from 'express';

import {Binding as WorkgroupBinding, DefaultApi, Profile, BindingEntries} from './clients/profile_controller';
import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

interface WorkgroupInfo {
  namespaces: WorkgroupBinding[];
  isClusterAdmin: boolean;
}

interface EnvironmentInfo {
  namespaces: WorkgroupBinding[];
  platform: PlatformInfo;
  user: string;
  isClusterAdmin: boolean;
}

// Shape of the CreateProfileRequest body
interface CreateProfileRequest {
  namespace?: string;
  user?: string;
}

interface HasWorkgroupResponse {
  user: string;
  hasAuth: boolean;
  hasWorkgroup: boolean;
}

const OPERATION_NOT_SUPPORTED = {
  error: 'Operation not supported'
};

export class Api {
  private platformInfo: PlatformInfo;

  constructor(
      private k8sService: KubernetesService,
      private profilesService: DefaultApi,
      private metricsService?: MetricsService) {}

  /** Retrieves and memoizes the PlatformInfo. */
  private async getPlatformInfo(): Promise<PlatformInfo> {
    if (!this.platformInfo) {
      this.platformInfo = await this.k8sService.getPlatformInfo();
    }
    return this.platformInfo;
  }

  /**
   * Retrieves WorkgroupInfo from Profile Controller for the given user.
   */
  private async getWorkgroupInfo(user: User.User): Promise<WorkgroupInfo> {
    const [adminResponse, bindings] = await Promise.all([
      this.profilesService.v1RoleClusteradminGet(user.email),
      this.profilesService.readBindings(user.email),
    ]);
    return {
      isClusterAdmin: adminResponse.body,
      namespaces: bindings.body.bindings || [],
    };
  }

  /**
   * Builds EnvironmentInfo for the case with identity awareness
   */
  private async getProfileAwareEnv(user: User.User): Promise<EnvironmentInfo> {
    const [platform, {namespaces, isClusterAdmin}] = await Promise.all([
      this.getPlatformInfo(),
      this.getWorkgroupInfo(user),
    ]);
    return {user: user.email, platform, namespaces, isClusterAdmin};
  }

  /**
   * Builds EnvironmentInfo for the case without identity awareness
   */
  private async getBasicEnvironment(user: User.User): Promise<EnvironmentInfo> {
    const [platform, namespaces] = await Promise.all([
      this.getPlatformInfo(),
      this.k8sService.getNamespaces(),
    ]);
    return {
      user: user.email,
      platform,
      namespaces: this.mapNamespacesToWorkgroupBindings(user.email, namespaces),
      isClusterAdmin: true,
    };
  }

  /**
   * Converts Kubernetes Namespace types to WorkgroupBindings to ensure
   * compatibility between identity-aware and non-identity aware clusters
   */
  private mapNamespacesToWorkgroupBindings(
      user: string, namespaces: V1Namespace[]): WorkgroupBinding[] {
    return namespaces.map((n) => ({
      user: {kind: 'user', name: user},
      referredNamespace: n.metadata.name,
      RoleRef: {
        apiGroup: '',
        kind: 'ClusterRole',
        name: 'editor',
      },
    }));
  }

  // tslint:disable-next-line: no-any
  private surfaceProfileControllerErrors = (res: Response, errorMessage: string) => (err: any) => {
    const status = (err.response && err.response.statusCode) || 400;
    const error = err.body || errorMessage;
    console.log(`${errorMessage} ${error}`);
    res.status(status).json({error});
    // tslint:disable-next-line: no-any
    return {body: undefined, response: undefined} as any;
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): express.Router {
    return express.Router()
        .get(
            '/env-info',
            async (req: Request, res: Response) => {
              try {
                if (req.user.hasAuth) {
                  res.json(await this.getProfileAwareEnv(req.user));
                  return;
                }
                res.json(await this.getBasicEnvironment(req.user));
              } catch (err) {
                const status = (err.response && err.response.statusCode) || 400;
                const error =
                    err.body || 'Unexpected error getting environment info';
                console.log(`Unable to get environment info: ${error}`);
                res.status(status).json({error});
              }
            })
        .get(
            '/has-workgroup',
            async (req: Request, res: Response) => {
              const response: HasWorkgroupResponse = {
                hasAuth: req.user.hasAuth,
                user: req.user.username,
                hasWorkgroup: false,
              };
              if (req.user.hasAuth) {
                const workgroup = await this.getWorkgroupInfo(req.user);
                response.hasWorkgroup =
                    workgroup.namespaces && workgroup.namespaces.length > 0;
              }
              res.json(response);
            })
        .get(
            '/metrics/:type((node|podcpu|podmem))',
            async (req: Request, res: Response) => {
              if (!this.metricsService) {
                res.status(405).json(OPERATION_NOT_SUPPORTED);
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
        .get(
            '/get-contributors/:namespace',
            async (req: Request, res: Response) => {
              const {namespace} = req.params;
              const {body} = await this.profilesService
                .readBindings(undefined, namespace)
                .catch(this.surfaceProfileControllerErrors(res, `Unable to fetch contributors for ${namespace}`));
              if (!(body instanceof BindingEntries)) return;
              const users = body.bindings.map((b) => 
                b.user.name
              );
              res.json(users);
            })
        .post('/create-workgroup', async (req: Request, res: Response) => {
          if (!req.user.hasAuth) {
            res.status(405).json(OPERATION_NOT_SUPPORTED);
            return;
          }

          const profile = req.body as CreateProfileRequest;
          try {
            // Use the request body if provided, fallback to auth headers
            await this.profilesService.createProfile({
              metadata: {
                name: profile.namespace || req.user.username,
              },
              spec: {
                owner: {
                  kind: 'User',
                  name: profile.user || req.user.email,
                }
              },
            });
            res.json(true);
          } catch (err) {
            this.surfaceProfileControllerErrors(res,
              'Unexpected error creating profile')(err);
          }
        });
  }
}

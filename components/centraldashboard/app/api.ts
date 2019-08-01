import {V1Namespace} from '@kubernetes/client-node';
import {Router, Request, Response} from 'express';

import {Binding as WorkgroupBinding, DefaultApi} from './clients/profile_controller';
import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {ContributorAPI} from './api_contributors';

interface SimpleBinding {
  namespace: string;
  role: 'owner' | 'contributor';
  user: string;
}

interface WorkgroupInfo {
  namespaces: SimpleBinding[];
  isClusterAdmin: boolean;
}

interface EnvironmentInfo {
  namespaces: SimpleBinding[];
  platform: PlatformInfo;
  user: string;
  isClusterAdmin: boolean;
}

interface HasWorkgroupResponse {
  user: string;
  hasAuth: boolean;
  hasWorkgroup: boolean;
}


export type SimpleRole = 'owner'| 'contributor';
export type WorkgroupRole = 'admin' | 'edit';
export type Role = SimpleRole | WorkgroupRole;
export const roleMap: ReadonlyMap<Role, Role> = new Map([
  ['admin', 'owner'],
  ['owner', 'admin'],
  ['edit', 'contributor'],
  ['contributor', 'edit'],
]);

export const ERRORS = {
  operation_not_supported: 'Operation not supported'
};

export function apiError (a: {res: Response, error: string, code?: number}) {
  const {res, error} = a;
  const code = a.code || 400;
  return res.status(code).json({
    error,
  });
}

/**
 * Converts Workgroup Binding from Profile Controller to SimpleBinding
 */
export function mapWorkgroupBindingToSimpleBinding (bindings: WorkgroupBinding[]): SimpleBinding[] {
  return bindings.map((n) => ({
    user: n.user.name,
    namespace: n.referredNamespace,
    role: roleMap.get(n.roleRef.name as Role) as SimpleRole,
  }));
}

/**
 * Converts Kubernetes Namespace types to SimpleBinding to ensure
 * compatibility between identity-aware and non-identity aware clusters
 */
export function mapNamespacesToSimpleBinding (user: string, namespaces: V1Namespace[]): SimpleBinding[] {
  return namespaces.map((n) => ({
    user,
    namespace: n.metadata.name,
    role: roleMap.get('edit') as SimpleRole,
  }));
}

/**
 * Converts SimpleBinding to Workgroup Binding from Profile Controller
 */
export function mapSimpleBindingToWorkgroupBinding (binding: SimpleBinding): WorkgroupBinding {
  const {user, namespace, role} = binding;
  return {
    user: {
      kind: 'User',
      name: user,
    },
    referredNamespace: namespace,
    roleRef: {
      kind: 'ClusterRole',
      name: roleMap.get(role) as WorkgroupRole,
    }
  };
}

export class Api {
  private platformInfo: PlatformInfo;
  private contribApi: ContributorAPI;

  constructor(
    private k8sService: KubernetesService,
    private profilesService: DefaultApi,
    private metricsService?: MetricsService) {
      this.contribApi = new ContributorAPI(this.profilesService);
    }

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
    const namespaces = mapWorkgroupBindingToSimpleBinding(
      bindings.body.bindings || []
    );
    return {
      isClusterAdmin: adminResponse.body,
      namespaces,
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
      namespaces: mapNamespacesToSimpleBinding(user.email, namespaces),
      isClusterAdmin: true,
    };
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): Router {
    return Router()
        .get(
            '/env-info',
            async (req: Request, res: Response) => {
              try {
                if (req.user.hasAuth) {
                  return res.json(await this.getProfileAwareEnv(req.user));
                }
                res.json(await this.getBasicEnvironment(req.user));
              } catch (err) {
                const code = (err.response && err.response.statusCode) || 400;
                const error =
                    err.body || 'Unexpected error getting environment info';
                console.log(`Unable to get environment info: ${error}`);
                apiError({res, code, error});
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
                response.hasWorkgroup = !!(workgroup.namespaces || [])
                  .find((w) => w.role === 'owner');
              }
              res.json(response);
            })
        .get(
            '/metrics/:type((node|podcpu|podmem))',
            async (req: Request, res: Response) => {
              if (!this.metricsService) {
                return apiError({
                  res, code: 405,
                  error: ERRORS.operation_not_supported,
                });
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
        .use('/workgroup', this.contribApi.routes())
        .use((req: Request, res: Response) => {
          res.status(404).json(`Could not find the route you're looking for`);
        });
  }
}

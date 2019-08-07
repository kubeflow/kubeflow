import {Router, Request, Response, NextFunction} from 'express';

import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';
import {
  WorkgroupApi,
  SimpleBinding,
} from './api_workgroup';

interface EnvironmentInfo {
  namespaces: SimpleBinding[];
  platform: PlatformInfo;
  user: string;
  isClusterAdmin: boolean;
}

export const ERRORS = {
  operation_not_supported: 'Operation not supported'
};

export function apiError(a: {res: Response, error: string, code?: number}) {
  const {res, error} = a;
  const code = a.code || 400;
  return res.status(code).json({
    error,
  });
}

export class Api {
  private platformInfo: PlatformInfo;

  constructor(
      private k8sService: KubernetesService,
      private workgroupApi?: WorkgroupApi,
      private metricsService?: MetricsService,
    ) {}

  /** Retrieves and memoizes the PlatformInfo. */
  private async getPlatformInfo(): Promise<PlatformInfo> {
    if (!this.platformInfo) {
      this.platformInfo = await this.k8sService.getPlatformInfo();
    }
    return this.platformInfo;
  }

  /**
   * Builds EnvironmentInfo for the case with identity awareness
   */
  private async getProfileAwareEnv(user: User.User): Promise<EnvironmentInfo> {
    const [platform, {namespaces, isClusterAdmin}] = await Promise.all([
      this.getPlatformInfo(),
      this.workgroupApi.getWorkgroupInfo(
        user,
      ),
    ]);
    return {user: user.email, platform, namespaces, isClusterAdmin};
  }

  /**
   * Builds EnvironmentInfo for the case without identity awareness
   */
  private async getBasicEnvironment(user: User.User): Promise<EnvironmentInfo> {
    const [platform, namespaces] = await Promise.all([
      this.getPlatformInfo(),
      this.workgroupApi.getAllWorkgroups(user.email),
    ]);
    return {
      user: user.email,
      platform,
      namespaces,
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
                console.log(`Unable to get environment info: ${error}${err.stack?'\n'+err.stack:''}`);
                apiError({res, code, error});
              }
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
        .use('/workgroup', this.workgroupApi
          ? this.workgroupApi.routes()
          : (req: Request, res: Response, next: NextFunction)  => {
            next();
          }
        )
        .use((req: Request, res: Response) => 
          apiError({
            res,
            error: `Could not find the route you're looking for`,
            code: 404,
          })
        );
  }
}

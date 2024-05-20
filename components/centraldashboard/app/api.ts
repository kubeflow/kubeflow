import {Router, Request, Response, NextFunction} from 'express';
import {KubernetesService} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

export const ERRORS = {
  no_metrics_service_configured: 'No metrics service configured',
  operation_not_supported: 'Operation not supported',
  invalid_links_config: 'Cannot load dashboard menu link',
  invalid_settings: 'Cannot load dashboard settings'
};

export function apiError(a: {res: Response, error: string, code?: number}) {
  const {res, error} = a;
  const code = a.code || 400;
  return res.status(code).json({
    error,
  });
}

export class Api {
  constructor(
      private k8sService: KubernetesService,
      private metricsService?: MetricsService,
    ) {}


  /**
   * Returns the Express router for the API routes.
   */
  routes(): Router {
    return Router()
        .get('/metrics', async (req: Request, res: Response) => {
            if (!this.metricsService) {
                return apiError({
                    res, code: 405,
                    error: ERRORS.operation_not_supported,
                });
            }
            res.json(this.metricsService.getChartsLink());
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
              const intervalQuery = req.query.interval as string;
              const intervalQueryKey = intervalQuery as keyof typeof Interval;
              if (Interval[intervalQueryKey] !== undefined) {
                  interval = Interval[intervalQueryKey];
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
          '/dashboard-links',
          async (_: Request, res: Response) => {
            const cm = await this.k8sService.getConfigMap();
            let links = {};
            try {
              links=JSON.parse(cm.data["links"]);
            }catch(e){
              return apiError({
                res, code: 500,
                error: ERRORS.invalid_links_config,
              });
            }
            res.json(links);
          })
        .get(
          '/dashboard-settings',
          async (_: Request, res: Response) => {
            const cm = await this.k8sService.getConfigMap();
            let settings = {};
            try {
              settings=JSON.parse(cm.data["settings"]);
            }catch(e){
              return apiError({
                res, code: 500,
                error: ERRORS.invalid_settings,
              });
            }
            res.json(settings);
          });
  }
}

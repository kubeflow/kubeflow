import {KubeConfig} from '@kubernetes/client-node';
import express, {Request, Response} from 'express';
import {resolve} from 'path';

import {Api, apiError} from './api';
import {attachUser} from './attach_user_middleware';
import {DefaultApi} from './clients/profile_controller';
import {WorkgroupApi} from './api_workgroup';
import {KubernetesService} from './k8s_service';
import {enableMetricsCollection} from './metrics';
import {getMetricsService} from './metrics_service_factory';
import {PrometheusMetricsService} from "./prometheus_metrics_service";
import {PrometheusDriver} from "prometheus-query";

const isProduction = process.env.NODE_ENV === 'production';
const codeEnvironment = isProduction?'production':'development';
const defaultKfam = isProduction
? 'profiles-kfam.kubeflow'
: 'localhost';

/* PROFILES_KFAM env vars will be set by Kubernetes if the Kfam service is
 * available
 * https://kubernetes.io/docs/concepts/containers/container-environment-variables/#cluster-information
 * When developing locally kubectl port-forward services/profiles-kfam
 * <localport>:8081 can be used and the environment variables set before
 * starting the server.
 */
const {
  PORT_1 = 8082,
  PROFILES_KFAM_SERVICE_HOST = defaultKfam,
  PROFILES_KFAM_SERVICE_PORT = '8081',
  USERID_HEADER = 'X-Goog-Authenticated-User-Email',
  USERID_PREFIX = 'accounts.google.com:',
  REGISTRATION_FLOW = "true",
  PROMETHEUS_URL = undefined,
  METRICS_DASHBOARD = undefined,
  COLLECT_METRICS = "true",
} = process.env;


async function main() {
  const port: number = Number(PORT_1);
  const frontEnd: string = resolve(__dirname, 'public');
  const registrationFlowAllowed = (REGISTRATION_FLOW.toLowerCase() === "true");
  const profilesServiceUrl =
      `http://${PROFILES_KFAM_SERVICE_HOST}:${PROFILES_KFAM_SERVICE_PORT}/kfam`;

  const app: express.Application = express();
  const k8sService = new KubernetesService(new KubeConfig());

  const metricsService = PROMETHEUS_URL
      ? new PrometheusMetricsService(new PrometheusDriver({ endpoint: PROMETHEUS_URL }), METRICS_DASHBOARD)
      : await getMetricsService(k8sService);

  console.info(`Using Profiles service at ${profilesServiceUrl}`);
  const profilesService = new DefaultApi(profilesServiceUrl);
  const metrics: boolean = (COLLECT_METRICS.toLowerCase() === "true");

  // Custom metrics configuration
  if (metrics) {
    console.info("Enabling the metrics collections to be accessible in the path `/prometheus/metrics`.");
    enableMetricsCollection(app);
  }

  app.use(express.json());
  app.use(express.static(frontEnd));
  app.use(attachUser(USERID_HEADER, USERID_PREFIX));
  app.get('/debug', (req: Request, res: Response) => {
    res.json({
      user: req.user,
      profilesServiceUrl,
      codeEnvironment,
      registrationFlowAllowed,
      headersForIdentity: {
        USERID_HEADER,
        USERID_PREFIX,
      },
    });
  });
  app.get('/healthz', (req: Request, res: Response) => {
    res.json({
      codeEnvironment,
      message: `I tick, therfore I am!`,
    });
  });
  app.use('/api', new Api(k8sService, metricsService).routes());
  app.use('/api/workgroup', new WorkgroupApi(profilesService, k8sService, registrationFlowAllowed, USERID_HEADER).routes());
  app.use('/api', (req: Request, res: Response) =>
    apiError({
      res,
      error: `Could not find the route you're looking for`,
      code: 404,
    })
  );
  app.get('/*', (_: express.Request, res: express.Response) => {
    res.sendFile(resolve(frontEnd, 'index.html'));
  });
  app.listen(
      port,
      () => console.info(`Server listening on port http://localhost:${port} (in ${codeEnvironment} mode)`));
}

// This will allow us to inspect uncaught exceptions around the app
process.on('unhandledRejection', error => {
  console.error('[SEVERE] unhandledRejection', error);
});

process.on('uncaughtException', error => {
  console.error('[SEVERE] uncaughtException', error);
});

main();

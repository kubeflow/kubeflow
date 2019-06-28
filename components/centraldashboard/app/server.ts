import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';
import {resolve} from 'path';

import {Api} from './api';
import {KubernetesService} from './k8s_service';
import {getMetricsService} from './metrics_service_factory';
import {DefaultApi} from './clients/profile_controller';
import {getProfileContext, handleAuth} from './profile_route_handlers';

const DEFAULT_NAMESPACE = process.env.KUBEFLOW_DEFAULT_NAMESPACE || 'kubeflow';

async function main() {
  const {PORT_1} = process.env;  // PORT_1 was defined in an earlier version
  const port: number = Number(PORT_1) || 8082;

  const frontEnd: string = resolve(__dirname, 'public');
  const app: express.Application = express();
  const k8sService = new KubernetesService(new KubeConfig());
  const metricsService = await getMetricsService(k8sService);
  const profileController = new DefaultApi(`http://kfam.${DEFAULT_NAMESPACE}.svc.cluster.local/kfam/`);
  const registrationPage = resolve(frontEnd, 'register.html');

  app.use(express.json());
  app.use(express.static(frontEnd));
  app.use(getProfileContext(profileController)); // Detects the auth status for the current user
  app.use('/api', new Api(k8sService, metricsService, profileController).routes());
  app.use(handleAuth(registrationPage)); // Check if user is connected to an owned profile, if not register them
  app.get('/register', (_: express.Request, res: express.Response) => res.sendFile(resolve(frontEnd, 'registration.html')));
  app.get('/*', (_: express.Request, res: express.Response) => {
    res.sendFile(resolve(frontEnd, 'index.html'));
  });
  app.listen(
      port,
      () => console.info(`Server listening on port http://localhost:${port}`));
}

process.on('unhandledRejection', (e, promise) => {
  console.log('Unhandled Rejection at: ', {promise}, e.stack);
});
main();

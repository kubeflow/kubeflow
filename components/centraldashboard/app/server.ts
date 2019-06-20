import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';
import {resolve} from 'path';

import {Api} from './api';
import {KubernetesService} from './k8s_service';
import {getMetricsService} from './metrics_service_factory';

async function main() {
  const {PORT_1} = process.env;  // PORT_1 was defined in an earlier version
  const port: number = Number(PORT_1) || 8082;

  const frontEnd: string = resolve(__dirname, 'public');
  const app: express.Application = express();
  const k8sService = new KubernetesService(new KubeConfig());
  const metricsService = await getMetricsService(k8sService);

  app.use(express.json());
  app.use(express.static(frontEnd));
  app.use('/api', new Api(k8sService, metricsService).routes());
  app.get('/*', (_: express.Request, res: express.Response) => {
    res.sendFile(resolve(frontEnd, 'index.html'));
  });
  app.listen(
      port,
      () => console.info(`Server listening on port http://localhost:${port}`));
}

main();

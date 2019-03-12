import express from 'express';
import {resolve} from 'path';

import {KubernetesService} from './k8s_service';

const frontEnd: string = resolve(__dirname, 'public');

/**
 * Routes defined for the Express server.
 */
export function routes(k8sService: KubernetesService): express.Router {
  const routes: express.Router = express.Router();

  routes.use(express.json());
  routes.use(express.static(frontEnd));
  routes.get(
      '/api/namespaces',
      async (_: express.Request, res: express.Response) => {
        res.json(await k8sService.getNamespaces());
      });
  routes.get(
      '/api/activities/:namespace',
      async (req: express.Request, res: express.Response) => {
        res.json(await k8sService.getEventsForNamespace(req.params.namespace));
      });
  routes.get('/*', (_: express.Request, res: express.Response) => {
    res.sendFile(resolve(frontEnd, 'index.html'));
  });
  return routes;
}

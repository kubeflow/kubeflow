import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';

import {KubernetesService} from './k8s_service';

/** API routes exposing information from Kubernetes */
export function api(kubeConfig: KubeConfig): express.Router {
  const k8sService = new KubernetesService(kubeConfig);
  return express.Router()
      .get(
          '/namespaces',
          async (_: express.Request, res: express.Response) => {
            res.json(await k8sService.getNamespaces());
          })
      .get(
          '/activities/:namespace',
          async (req: express.Request, res: express.Response) => {
            res.json(
                await k8sService.getEventsForNamespace(req.params.namespace));
          });
}

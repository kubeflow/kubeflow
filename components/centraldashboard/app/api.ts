import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';

import {KubernetesService, PlatformInfo} from './k8s_service';

interface UserInfo {
    email: string;
    image: string;
}

interface EnvironmentInfo {
    user: UserInfo;
    platform: PlatformInfo;
}

/** Function that provides user information back */
function getUserInfo() {
    return {
        email: 'user@kubeflow.org',
    };
}

/** API routes exposing information from Kubernetes */
export function api(kubeConfig: KubeConfig): express.Router {
    const k8sService = new KubernetesService(kubeConfig);
    return express.Router()
        .get(
            '/env-info',
            async (_: express.Request, res: express.Response) => {
                const [platform, user] = await Promise.all([
                    k8sService.getPlatformInfo(),
                    getUserInfo(),
                ]);
                const returnPayoad = {platform, user} as EnvironmentInfo;
                res.json(returnPayoad);
            })
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

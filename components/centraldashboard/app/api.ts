import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';

import {KubernetesService} from './k8s_service';

interface PlatformStatics {
    [key: string]: PlatformMeta;
}
interface PlatformMeta {
    logo: string;
    title: string;
}

/** API routes exposing information from Kubernetes */
function _platformStatics(platform: string): {meta: PlatformMeta|undefined} {
    console.log("Loading meta for", {platform});
    const meta = ({
        gce: {
            logo: 'https://cloud.google.com/_static/images/cloud/icons/favicons/onecloud/super_cloud.png',
            title: 'Google Cloud Platform',
        },
    } as PlatformStatics)[platform];
    return {meta};
}

/** API routes exposing information from Kubernetes */
export function api(kubeConfig: KubeConfig): express.Router {
    const k8sService = new KubernetesService(kubeConfig);
    return express.Router()
        .get(
            '/platform-info',
            async (_: express.Request, res: express.Response) => {
                const response = await k8sService.getPlatformInfo();
                const {providerName} = response;
                Object.assign(response, _platformStatics(providerName));
                res.json(response);
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

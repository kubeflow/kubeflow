import {V1Namespace} from '@kubernetes/client-node';
import {Router, Request, Response, NextFunction} from 'express';
import {Binding as WorkgroupBinding, DefaultApi} from './clients/profile_controller';
import {KubernetesService, PlatformInfo} from './k8s_service';

import {
    apiError,
    ERRORS,
} from './api';

// From: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const EMAIL_RGX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Valid actions for handling a contributor
type ContributorActions = 'create' | 'remove';

interface CreateProfileRequest {
    namespace?: string;
    user?: string;
}

interface AddOrRemoveContributorRequest {
    contributor?: string;
}

interface ProfileCullingConfig {
    enabled?: boolean;
    defaultIdleTime?: string;
    defaultCheckPeriod?: string;
    minIdleTime?: string;
    maxIdleTime?: string;
    allowUserExemption?: boolean;
    exemptNotebooks?: string[];
    overrideClusterDefaults?: boolean;
    // GPU culling configuration
    gpuEnabled?: boolean;
    gpuMode?: string;
    gpuMemoryThreshold?: number;
    gpuComputeThreshold?: number;
    gpuKernelTimeout?: string;
    gpuSustainedDuration?: string;
}

interface ClusterCullingDefaults {
    enabled: boolean;
    defaultIdleTime: string;
    defaultMinIdleTime: string;
    defaultMaxIdleTime: string;
    allowUserExemption: boolean;
}

interface HasWorkgroupResponse {
    user: string;
    hasAuth: boolean;
    hasWorkgroup: boolean;
    registrationFlowAllowed: boolean;
}

interface EnvironmentInfo {
    namespaces: SimpleBinding[];
    platform: PlatformInfo;
    user: string;
    isClusterAdmin: boolean;
}

export type SimpleRole = 'owner' | 'contributor' | 'viewer';
export type WorkgroupRole = 'admin' | 'edit' | 'view';
export type Role = SimpleRole | WorkgroupRole;
export const roleMap: ReadonlyMap<Role, Role> = new Map([
    ['admin', 'owner'],
    ['owner', 'admin'],
    ['edit', 'contributor'],
    ['contributor', 'edit'],
    ['view', 'viewer'],
    ['viewer', 'view'],
]);

export interface SimpleBinding {
    namespace: string;
    role: SimpleRole;
    user: string;
}

export interface WorkgroupInfo {
    namespaces: SimpleBinding[];
    isClusterAdmin: boolean;
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
        role: 'contributor',
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

/**
 * Handles an exception in an async block and converts it to a JSON
 * response sent back to client
 */
// tslint:disable-next-line: no-any
const surfaceProfileControllerErrors = (info: {res: Response, msg: string, err: any}) => {
    const {res, msg, err} = info;
    const code = (err.response && err.response.statusCode) || 400;
    const devError = err.body || '';
    // Msg is the developer reason of what happened, devError is the technical details as to why
    console.error(msg+(devError?` ${devError}`:''), err.stack?err:'');
    apiError({res, code, error: devError || msg});
};

export class WorkgroupApi {
    private platformInfo: PlatformInfo;
    constructor(
        private profilesService: DefaultApi,
        private k8sService: KubernetesService,
        private registrationFlowAllowed: boolean,
        private userIdHeader: string) {}
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
            this.getWorkgroupInfo(
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
            this.getAllWorkgroups(user.email),
        ]);
        return {
            user: user.email,
            platform,
            namespaces,
            isClusterAdmin: true,
        };
    }
    /**
     * Retrieves all namespaces in case of basic auth.
     */
    async getAllWorkgroups(fakeUser: string): Promise<SimpleBinding[]> {
        const bindings = await this.profilesService.readBindings();
        const namespaces = mapWorkgroupBindingToSimpleBinding(
            bindings.body.bindings || []
        );
        const names = new Set(namespaces.map((n) => n.namespace));
        return Array.from(names).map((n) => ({
            namespace: n,
            role: 'contributor',
            user: fakeUser,
        }));
    }
    /**
     * Retrieves WorkgroupInfo from Profile Controller for the given user.
     */
    async getWorkgroupInfo(user: User.User): Promise<WorkgroupInfo> {
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
    async handleContributor(action: ContributorActions, req: Request, res: Response) {
        const {namespace} = req.params;
        const {contributor} = req.body as AddOrRemoveContributorRequest;
        const {profilesService} = this;
        if (!contributor || !namespace) {
            const missing = [];
            // tslint:disable: no-unused-expression
            contributor || missing.push('contributor');
            namespace || missing.push('namespace');
            // tslint:enable: no-unused-expression
            return apiError({
                res,
                error: `Missing ${missing.join(' and ')} field${missing.length-1?'s':''}.`,
            });
        }
        if (!EMAIL_RGX.test(contributor)) {
            return apiError({
                res,
                error: `Contributor doesn't look like a valid email address`,
            });
        }
        let errIndex = 0;
        try {
            const binding = mapSimpleBindingToWorkgroupBinding({
                user: contributor,
                namespace,
                role: 'contributor',
            });
            // only pass the auth-related headers from the user's request on to kfam
            const authHeaders = ['authorization', 'cookie', this.userIdHeader];
            const {headers} = req;
            Object.keys(headers).forEach(
                (key) => authHeaders.includes(key) || delete headers[key]
            );
            const actionAPI = action === 'create' ? 'createBinding' : 'deleteBinding';
            await profilesService[actionAPI](binding, {headers});
            errIndex++;
            const users = await this.getContributors(namespace);
            res.json(users);
        } catch (err) {
            const errMessage = [
                `Unable to add new contributor for ${namespace}. HTTP ${err.response.statusCode || '???'} - ${err.response.statusMessage || 'Unknown'}`,
                `Unable to fetch contributors for ${namespace}. HTTP ${err.response.statusCode || '???'} - ${err.response.statusMessage || 'Unknown'}`,
            ][errIndex];
            surfaceProfileControllerErrors({
                res,
                msg: errMessage,
                err,
            });
        }
    }
    /**
     * Given an owned namespace, list all contributors under it
     * @param namespace Namespace to find contributors for
     */
    async getContributors(namespace: string) {
        const {body} = await this.profilesService
            .readBindings(undefined, namespace);
        const users = mapWorkgroupBindingToSimpleBinding(body.bindings)
            .filter((b) => b.role === 'contributor')
            .map((b) => b.user);
        return users;
    }
    routes() {return Router()
        .get('/exists', async (req: Request, res: Response) => {
            try {
                const response: HasWorkgroupResponse = {
                    hasAuth: req.user.hasAuth,
                    user: req.user.username,
                    hasWorkgroup: false,
                    registrationFlowAllowed: this.registrationFlowAllowed,
                };
                if (req.user.hasAuth) {
                    const workgroup = await this.getWorkgroupInfo(
                        req.user,
                    );
                    response.hasWorkgroup = !!(workgroup.namespaces || [])
                        .find((w) => w.role === 'owner');
                } else {
                    // Basic auth workgroup condition
                    response.hasWorkgroup = !!(await this.getAllWorkgroups(req.user.username)).length;
                }
                res.json(response);
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: 'Unable to contact Profile Controller',
                    err,
                });
            }
        })
        .post('/create', async (req: Request, res: Response) => {
            const profile = req.body as CreateProfileRequest;
            try {
                const namespace = profile.namespace || req.user.username;
                // Use the request body if provided, fallback to auth headers
                await this.profilesService.createProfile({
                    metadata: {
                        name: namespace,
                    },
                    spec: {
                        owner: {
                            kind: 'User',
                            name: profile.user || req.user.email,
                        }
                    },
                });
                res.json({message: `Created namespace ${namespace}`});
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: 'Unexpected error creating profile',
                    err,
                });
            }
        })
        .get('/env-info', async (req: Request, res: Response) => {
            try {
                if (req.user.hasAuth) {
                    return res.json(await this.getProfileAwareEnv(req.user));
                }
                res.json(await this.getBasicEnvironment(req.user));
            } catch (err) {
                const code = (err.response && err.response.statusCode) || 400;
                const error = err.body || 'Unexpected error getting environment info';
                console.log(`Unable to get environment info: ${error}${err.stack?'\n'+err.stack:''}`);
                apiError({res, code, error});
            }
        })
        .use((req: Request, res: Response, next: NextFunction) => {
            if (!req.user.hasAuth) {
                return apiError({
                    res,
                    code: 405,
                    error: 'Unable to ascertain user identity from request, cannot access route.',
                });
            }
            next();
        })
        .delete('/nuke-self', async (req: Request, res: Response) => {
            try {
                const headers = req.user.auth;
                const namespace = req.user.username;
                const {body: serverBody} = await this.profilesService.deleteProfile(namespace, {headers});
                res.json({message: `Removed namespace/profile ${namespace}`, serverBody});
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: 'Unexpected error deleting profile',
                    err,
                });
            }
        })
        .get('/get-all-namespaces', async (req: Request, res: Response) => {
            try {
                const {body} = await this.profilesService.readBindings();
                // tslint:disable-next-line: no-any
                const namespaces = {} as any;
                const bindings = mapWorkgroupBindingToSimpleBinding(
                    body.bindings
                );
                bindings.forEach((b) => {
                    const name = b.namespace;
                    if (!namespaces[name]) {namespaces[name] = {contributors: []};}
                    const namespace = namespaces[name];
                    if (b.role === 'owner') {namespace.owner = b.user; return;}
                    namespaces[name].contributors.push(b.user);
                });
                const tabular = Object.keys(namespaces).map(namespace => [
                    namespace,
                    namespaces[namespace].owner,
                    namespaces[namespace].contributors.join(', '),
                ]);
                res.json(tabular);
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: `Unable to fetch all workgroup data`,
                    err,
                });
            }
        })
        .get('/get-contributors/:namespace', async (req: Request, res: Response) => {
            const {namespace} = req.params;
            try {
                const users = await this.getContributors(namespace);
                res.json(users);
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: `Unable to fetch contributors for ${namespace}`,
                    err,
                });
            }
        })
        .post('/add-contributor/:namespace', async (req: Request, res: Response) => {
            this.handleContributor('create', req, res);
        })
        .delete('/remove-contributor/:namespace', async (req: Request, res: Response) => {
            this.handleContributor('remove', req, res);
        })
        .get('/profile-culling-config/:namespace', async (req: Request, res: Response) => {
            const {namespace} = req.params;
            try {
                const config = await this.getProfileCullingConfig(namespace);
                res.json(config);
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: `Unable to fetch culling configuration for ${namespace}`,
                    err,
                });
            }
        })
        .put('/profile-culling-config/:namespace', async (req: Request, res: Response) => {
            const {namespace} = req.params;
            const config = req.body as ProfileCullingConfig;
            try {
                await this.updateProfileCullingConfig(namespace, config);
                res.json({message: `Updated culling configuration for ${namespace}`});
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: `Unable to update culling configuration for ${namespace}`,
                    err,
                });
            }
        })
        .get('/cluster-culling-defaults', async (req: Request, res: Response) => {
            try {
                const defaults = await this.getClusterCullingDefaults();
                res.json(defaults);
            } catch (err) {
                surfaceProfileControllerErrors({
                    res,
                    msg: 'Unable to fetch cluster culling defaults',
                    err,
                });
            }
        });
    }

    /**
     * Get profile culling configuration from Profile CRD annotations
     */
    async getProfileCullingConfig(namespace: string): Promise<ProfileCullingConfig> {
        try {
            // Get the Profile CRD for this namespace
            const profile = await this.k8sService.getProfile(namespace);
            const annotations = profile.metadata?.annotations || {};

            // Parse culling annotations
            const config: ProfileCullingConfig = {
                enabled: annotations['culling.kubeflow.org/enabled'] === 'true',
                defaultIdleTime: annotations['culling.kubeflow.org/default-idle-time'],
                defaultCheckPeriod: annotations['culling.kubeflow.org/default-check-period'],
                minIdleTime: annotations['culling.kubeflow.org/min-idle-time'],
                maxIdleTime: annotations['culling.kubeflow.org/max-idle-time'],
                allowUserExemption: annotations['culling.kubeflow.org/allow-user-exemption'] === 'true',
                exemptNotebooks: annotations['culling.kubeflow.org/exempt-notebooks']?.split(',').filter((n: string) => n.trim()) || [],
                overrideClusterDefaults: annotations['culling.kubeflow.org/override-cluster-defaults'] === 'true',

                // GPU culling configuration
                gpuEnabled: annotations['culling.kubeflow.org/gpu-enabled'] === 'true',
                gpuMode: annotations['culling.kubeflow.org/gpu-mode'] || 'gpu-priority',
                gpuMemoryThreshold: Number(annotations['culling.kubeflow.org/gpu-memory-threshold']) || 10,
                gpuComputeThreshold: Number(annotations['culling.kubeflow.org/gpu-compute-threshold']) || 5,
                gpuKernelTimeout: annotations['culling.kubeflow.org/gpu-kernel-timeout'] || '5m',
                gpuSustainedDuration: annotations['culling.kubeflow.org/gpu-sustained-duration'] || '10m',
            };

            return config;
        } catch (err) {
            throw new Error(`Failed to get profile culling config: ${err.message}`);
        }
    }

    /**
     * Update profile culling configuration by modifying Profile CRD annotations
     */
    async updateProfileCullingConfig(namespace: string, config: ProfileCullingConfig): Promise<void> {
        try {
            // Get the current Profile CRD
            const profile = await this.k8sService.getProfile(namespace);

            // Ensure annotations object exists
            if (!profile.metadata) {
                profile.metadata = {};
            }
            if (!profile.metadata.annotations) {
                profile.metadata.annotations = {};
            }

            // Update culling annotations
            const annotations = profile.metadata.annotations;

            // Basic culling configuration
            if (config.enabled !== undefined) {
                annotations['culling.kubeflow.org/enabled'] = config.enabled.toString();
            }
            if (config.defaultIdleTime) {
                annotations['culling.kubeflow.org/default-idle-time'] = config.defaultIdleTime;
            }
            if (config.defaultCheckPeriod) {
                annotations['culling.kubeflow.org/default-check-period'] = config.defaultCheckPeriod;
            }
            if (config.minIdleTime) {
                annotations['culling.kubeflow.org/min-idle-time'] = config.minIdleTime;
            }
            if (config.maxIdleTime) {
                annotations['culling.kubeflow.org/max-idle-time'] = config.maxIdleTime;
            }
            if (config.allowUserExemption !== undefined) {
                annotations['culling.kubeflow.org/allow-user-exemption'] = config.allowUserExemption.toString();
            }
            if (config.exemptNotebooks) {
                annotations['culling.kubeflow.org/exempt-notebooks'] = config.exemptNotebooks.join(',');
            }
            if (config.overrideClusterDefaults !== undefined) {
                annotations['culling.kubeflow.org/override-cluster-defaults'] = config.overrideClusterDefaults.toString();
            }

            // GPU culling configuration
            if (config.gpuEnabled !== undefined) {
                annotations['culling.kubeflow.org/gpu-enabled'] = config.gpuEnabled.toString();
            }
            if (config.gpuMode) {
                annotations['culling.kubeflow.org/gpu-mode'] = config.gpuMode;
            }
            if (config.gpuMemoryThreshold !== undefined) {
                annotations['culling.kubeflow.org/gpu-memory-threshold'] = config.gpuMemoryThreshold.toString();
            }
            if (config.gpuComputeThreshold !== undefined) {
                annotations['culling.kubeflow.org/gpu-compute-threshold'] = config.gpuComputeThreshold.toString();
            }
            if (config.gpuKernelTimeout) {
                annotations['culling.kubeflow.org/gpu-kernel-timeout'] = config.gpuKernelTimeout;
            }
            if (config.gpuSustainedDuration) {
                annotations['culling.kubeflow.org/gpu-sustained-duration'] = config.gpuSustainedDuration;
            }

            // Update the Profile CRD
            await this.k8sService.updateProfile(namespace, profile);
        } catch (err) {
            throw new Error(`Failed to update profile culling config: ${err.message}`);
        }
    }

    /**
     * Get cluster-level culling defaults from ConfigMap
     */
    async getClusterCullingDefaults(): Promise<ClusterCullingDefaults> {
        try {
            // Get cluster culling configuration from ConfigMap
            const configMap = await this.k8sService.getNamespacedConfigMap('cluster-culling-config', 'kubeflow');
            const data = configMap.data || {};

            const defaults: ClusterCullingDefaults = {
                enabled: data['cluster-enable-culling'] === 'true',
                defaultIdleTime: data['cluster-default-idle-time'] || '1440',
                defaultMinIdleTime: data['cluster-default-min-idle-time'] || '60',
                defaultMaxIdleTime: data['cluster-default-max-idle-time'] || '2880',
                allowUserExemption: data['cluster-allow-user-exemption'] === 'true',
            };

            return defaults;
        } catch (err) {
            // Return sensible defaults if ConfigMap doesn't exist
            return {
                enabled: true,
                defaultIdleTime: '1440', // 24 hours
                defaultMinIdleTime: '60', // 1 hour
                defaultMaxIdleTime: '2880', // 48 hours
                allowUserExemption: true,
            };
        }
    }
}

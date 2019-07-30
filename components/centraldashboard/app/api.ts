import {V1Namespace} from '@kubernetes/client-node';
import express, {Request, Response} from 'express';

import {Binding as WorkgroupBinding, DefaultApi} from './clients/profile_controller';
import {KubernetesService, PlatformInfo} from './k8s_service';
import {Interval, MetricsService} from './metrics_service';

interface SimpleBinding {
  namespace: string;
  role: 'owner' | 'contributor';
  user: string;
}

interface WorkgroupInfo {
  namespaces: SimpleBinding[];
  isClusterAdmin: boolean;
}

interface EnvironmentInfo {
  namespaces: SimpleBinding[];
  platform: PlatformInfo;
  user: string;
  isClusterAdmin: boolean;
}

// Shape of the CreateProfileRequest body
interface CreateProfileRequest {
  namespace?: string;
  user?: string;
}

// Shape of the AddContributorRequest body
interface AddOrRemoveContributorRequest {
  contributor?: string;
}

interface HasWorkgroupResponse {
  user: string;
  hasAuth: boolean;
  hasWorkgroup: boolean;
}

export const roleMap = {
  admin: 'owner',
  edit: 'contributor',
  tr(a: string) {
    return this[a] || a;
  },
  reverse(value: string) {
    return Object.keys(this)
      .find((k) => (this[k] === value));
  }
};


const ERRORS = {
  operation_not_supported: 'Operation not supported'
};
// From: https://www.w3resource.com/javascript/form/email-validation.php
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const apiError = (a: {res: Response, error: string, code?: number}) => {
  const {res, error} = a;
  const code = a.code || 400;
  return res.status(code).json({
    error,
  });
};

export class Api {
  private platformInfo: PlatformInfo;

  constructor(
      private k8sService: KubernetesService,
      private profilesService: DefaultApi,
      private metricsService?: MetricsService) {}

  /** Retrieves and memoizes the PlatformInfo. */
  private async getPlatformInfo(): Promise<PlatformInfo> {
    if (!this.platformInfo) {
      this.platformInfo = await this.k8sService.getPlatformInfo();
    }
    return this.platformInfo;
  }

  /**
   * Retrieves WorkgroupInfo from Profile Controller for the given user.
   */
  private async getWorkgroupInfo(user: User.User): Promise<WorkgroupInfo> {
    const [adminResponse, bindings] = await Promise.all([
      this.profilesService.v1RoleClusteradminGet(user.email),
      this.profilesService.readBindings(user.email),
    ]);
    const namespaces = this.mapWorkgroupBindingToSimpleBinding(
      bindings.body.bindings || []
    );
    return {
      isClusterAdmin: adminResponse.body,
      namespaces,
    };
  }

  /**
   * Builds EnvironmentInfo for the case with identity awareness
   */
  private async getProfileAwareEnv(user: User.User): Promise<EnvironmentInfo> {
    const [platform, {namespaces, isClusterAdmin}] = await Promise.all([
      this.getPlatformInfo(),
      this.getWorkgroupInfo(user),
    ]);
    return {user: user.email, platform, namespaces, isClusterAdmin};
  }

  /**
   * Builds EnvironmentInfo for the case without identity awareness
   */
  private async getBasicEnvironment(user: User.User): Promise<EnvironmentInfo> {
    const [platform, namespaces] = await Promise.all([
      this.getPlatformInfo(),
      this.k8sService.getNamespaces(),
    ]);
    return {
      user: user.email,
      platform,
      namespaces: this.mapNamespacesToSimpleBinding(user.email, namespaces),
      isClusterAdmin: true,
    };
  }

  /**
   * Converts Kubernetes Namespace types to SimpleBinding to ensure
   * compatibility between identity-aware and non-identity aware clusters
   */
  private mapNamespacesToSimpleBinding(
      user: string, namespaces: V1Namespace[]): SimpleBinding[] {
    return namespaces.map((n) => ({
      user,
      namespace: n.metadata.name,
      role: roleMap.tr('edit'),
    }));
  }
  /**
   * Converts Workgroup Binding from Profile Controller to SimpleBinding
   */
  private mapWorkgroupBindingToSimpleBinding(bindings: WorkgroupBinding[]): SimpleBinding[] {
    return bindings.map((n) => ({
      user: n.user.name,
      namespace: n.referredNamespace,
      role: roleMap.tr(n.roleRef.name),
    }));
  }
  /**
   * Converts SimpleBinding to Workgroup Binding from Profile Controller
   */
  private mapSimpleBindingToWorkgroupBinding(binding: SimpleBinding): WorkgroupBinding {
    const {user, namespace, role} = binding;
    return {
      user: {
        kind: 'User',
        name: user,
      },
      referredNamespace: namespace,
      roleRef: {
        kind: 'ClusterRole',
        name: roleMap.reverse(role),
      }
    };
  }

  /**
   * Handles an exception in an async block and converts it to a JSON
   * response sent back to client
   */
  // tslint:disable-next-line: no-any
  private surfaceProfileControllerErrors = (info: {res: Response, msg: string, err: any}) => {
    const {res, msg, err} = info;
    const code = (err.response && err.response.statusCode) || 400;
    const error = err.body || msg;
    console.log(`${msg} ${error}`);
    apiError({res, code, error});
  }

  async getContributors(namespace: string) {
    const {body} = await this.profilesService
      .readBindings(undefined, namespace);
    const users = this.mapWorkgroupBindingToSimpleBinding(body.bindings)
      .filter((b) => b.role === 'contributor')
      .map((b) =>
        b.user
      );
    return users;
  }

  /**
   * Returns the Express router for the API routes.
   */
  routes(): express.Router {
    return express.Router()
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
                console.log(`Unable to get environment info: ${error}`);
                apiError({res, code, error});
              }
            })
        .get(
            '/has-workgroup',
            async (req: Request, res: Response) => {
              const response: HasWorkgroupResponse = {
                hasAuth: req.user.hasAuth,
                user: req.user.username,
                hasWorkgroup: false,
              };
              if (req.user.hasAuth) {
                const workgroup = await this.getWorkgroupInfo(req.user);
                response.hasWorkgroup = !!(workgroup.namespaces || [])
                  .find((w) => w.role === 'owner');
              }
              res.json(response);
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
        .get(
              '/get-all-namespaces',
              async (req: Request, res: Response) => {
                try {
                  const {body} = await this.profilesService.readBindings();
                  // tslint:disable-next-line: no-any
                  const namespaces = {} as any;
                  const bindings = this.mapWorkgroupBindingToSimpleBinding(
                    body.bindings
                  );
                  bindings.forEach((b) => {
                    const name = b.namespace;
                    if (!namespaces[name]) {namespaces[name] = {contributors: []};}
                    const namespace = namespaces[name];
                    if (b.role === 'owner') {namespace.owner = b.user;return;}
                    namespaces[name].contributors.push(b.user);
                  });
                  const tabular = Object.keys(namespaces).map(namespace => [
                    namespace,
                    namespaces[namespace].owner,
                    namespaces[namespace].contributors.join(', '),
                  ]);
                  res.json(tabular);
                } catch(err) {
                  this.surfaceProfileControllerErrors({
                    res,
                    msg: `Unable to fetch all workgroup data`,
                    err,
                  });
                }
              })
        .get(
            '/get-contributors/:namespace',
            async (req: Request, res: Response) => {
              const {namespace} = req.params;
              try {
                const users = await this.getContributors(namespace);
                res.json(users);
              } catch(err) {
                this.surfaceProfileControllerErrors({
                  res,
                  msg: `Unable to fetch contributors for ${namespace}`,
                  err,
                });
              }
            })
        .post('/create-workgroup', async (req: Request, res: Response) => {
              if (!req.user.hasAuth) {
                return apiError({
                  res,
                  code: 405,
                  error: ERRORS.operation_not_supported,
                });
              }
    
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
                this.surfaceProfileControllerErrors({
                  res,
                  msg: 'Unexpected error creating profile',
                  err,
                });
              }
            })
        .post(
              '/add-contributor/:namespace',
              async (req: Request, res: Response) => {
                const {namespace} = req.params;
                const {contributor} = req.body as AddOrRemoveContributorRequest;
                if (!contributor || !namespace) {
                  return apiError({
                    res,
                    error: `Missing contributor / namespace fields.`,
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
                  const binding = this.mapSimpleBindingToWorkgroupBinding({
                    user: contributor,
                    namespace,
                    role: 'contributor',
                  });
                  const {headers} = req;
                  delete headers['content-length'];
                  await this.profilesService
                    .createBinding(binding, {headers});
                  errIndex++;
                  const users = await this.getContributors(namespace);
                  res.json(users);
                } catch(err) {
                  const errMessage = [
                    `Unable to add new contributor for ${namespace}: ${err.stack || err}`,
                    `Unable to fetch contributors for ${namespace}: ${err.stack || err}`,
                  ][errIndex];
                  this.surfaceProfileControllerErrors({
                    res,
                    msg: errMessage,
                    err,
                  });
                }
              })
        .delete(
              '/remove-contributor/:namespace',
              async (req: Request, res: Response) => {
                const {namespace} = req.params;
                const {contributor} = req.body as AddOrRemoveContributorRequest;
                if (!contributor || !namespace) {
                  return apiError({
                    res,
                    error: `Missing contributor / namespace fields.`,
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
                  const binding = this.mapSimpleBindingToWorkgroupBinding({
                    user: contributor,
                    namespace,
                    role: 'contributor',
                  });
                  const {headers} = req;
                  delete headers['content-length'];
                  await this.profilesService
                    .deleteBinding(binding, {headers});
                  errIndex++;
                  const users = await this.getContributors(namespace);
                  res.json(users);
                } catch(err) {
                  const errMessage = [
                    `Unable to remove contributor for ${namespace}: ${err.stack || err}`,
                    `Unable to fetch contributors for ${namespace}: ${err.stack || err}`,
                  ][errIndex];
                  this.surfaceProfileControllerErrors({
                    res,
                    msg: errMessage,
                    err,
                  });
                }
              });
  }
}

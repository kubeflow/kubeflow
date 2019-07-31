import {Router, Request, Response, NextFunction} from 'express';
import {DefaultApi} from './clients/profile_controller';
import {
    apiError,
    mapWorkgroupBindingToSimpleBinding,
    mapSimpleBindingToWorkgroupBinding,
    ERRORS,
} from './api';

// Valid actions for handling a contributor
type CONTRIBUTOR_ACTIONS = 'create' | 'remove';

// Shape of the CreateProfileRequest body
interface CreateProfileRequest {
    namespace?: string;
    user?: string;
}

// Shape of the AddContributorRequest body
interface AddOrRemoveContributorRequest {
    contributor?: string;
}

// From: https://www.w3resource.com/javascript/form/email-validation.php
const EMAIL_RGX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Handles an exception in an async block and converts it to a JSON
 * response sent back to client
 */
// tslint:disable-next-line: no-any
const surfaceProfileControllerErrors = (info: {res: Response, msg: string, err: any}) => {
    const {res, msg, err} = info;
    const code = (err.response && err.response.statusCode) || 400;
    const error = err.body || msg;
    console.log(`${msg} ${error}`);
    apiError({res, code, error});
};

/**
 * Given an owned namespace, list all contributors under it
 * @param namespace Namespace to find contributors for
 * @param profilesService The instance of DefaultApi to use
 */
const getContributors = async (namespace: string, profilesService: DefaultApi) => {
    const {body} = await profilesService
        .readBindings(undefined, namespace);
    const users = mapWorkgroupBindingToSimpleBinding(body.bindings)
        .filter((b) => b.role === 'contributor')
        .map((b) => b.user);
    return users;
};

const handleContributor = async (action: CONTRIBUTOR_ACTIONS, profilesService: DefaultApi, req: Request, res: Response) => {
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
        const binding = mapSimpleBindingToWorkgroupBinding({
            user: contributor,
            namespace,
            role: 'contributor',
        });
        const {headers} = req;
        delete headers['content-length'];
        const actionAPI = action === 'create' ? 'createBinding' : 'deleteBinding';
        await profilesService[actionAPI](binding, {headers});
        errIndex++;
        const users = await getContributors(namespace, profilesService);
        res.json(users);
    } catch (err) {
        const errMessage = [
            `Unable to add new contributor for ${namespace}: ${err.stack || err}`,
            `Unable to fetch contributors for ${namespace}: ${err.stack || err}`,
        ][errIndex];
        surfaceProfileControllerErrors({
            res,
            msg: errMessage,
            err,
        });
    }
};

export const contributorAPI = (profilesService: DefaultApi) => Router()
    .post('/create', async (req: Request, res: Response) => {
        console.log('Recieved a call');
        if (!req.user.hasAuth) {
            return apiError({
                res,
                code: 405,
                error: ERRORS.operation_not_supported,
            });
        }
        
        console.log('No Error');
        const profile = req.body as CreateProfileRequest;
        console.log('Good body');
        try {
            const namespace = profile.namespace || req.user.username;
            // Use the request body if provided, fallback to auth headers
            console.log('Creating profile');
            await profilesService.createProfile({
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
            console.log('Done');
            res.json({message: `Created namespace ${namespace}`});
        } catch (err) {
            console.log('ERROR');
            surfaceProfileControllerErrors({
                res,
                msg: 'Unexpected error creating profile',
                err,
            });
        }
    })
    .get('/get-all-namespaces', async (req: Request, res: Response) => {
        try {
            const {body} = await profilesService.readBindings();
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
                const users = await getContributors(namespace, profilesService);
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
        handleContributor('create', profilesService, req, res);
    })
    .delete('/remove-contributor/:namespace', async (req: Request, res: Response) => {
        handleContributor('remove', profilesService, req, res);
    });
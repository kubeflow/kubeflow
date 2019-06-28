/**
 * This file contains the middleware used by the server to:
 * 
 * - Enrichen the request object with user / profile context
 * - Redirect users to registration page if they have no profile
 */
import {Request, Response, NextFunction} from 'express';
import {DefaultApi, Binding as WorkgroupBinding} from './clients/profile_controller';


const {env} = process;
const IAP_HEADER = env.USERID_HEADER || 'X-Goog-Authenticated-User-Email';
const IAP_PREFIX = env.USERID_PREFIX || 'accounts.google.com:';

// tslint:disable-next-line: no-any
const G = global as any;
G.USER_CACHE = {} || G.USER_CACHE;

export interface AuthObject {
    [iapHeader: string]: string;
}

// tslint:disable-next-line: no-any
const fallbackForMissingKFAM = (goodValue: any) => (e: any) => {
    if (e.code === 'ENOTFOUND') return goodValue;
    throw e;
};

export class UserData {
    private readonly name: string;

    constructor(readonly req: Request, private profileAPI: DefaultApi) {
        this.name = this._getUser();
    }
    get user() {return this.name;}
    get email() {return this.name;}
    get ldap() {return this.name.split('@')[0];}
    get subdomain() {return this.name.split('@')[1];}

    async hasProfile(): Promise<boolean> {
        if (G.USER_CACHE[this.name]) {return true;}
        const namespaces = await this._fetchProfile()
            .catch(fallbackForMissingKFAM);
        const hasProfile = namespaces.length > 0;
        if (hasProfile) {
            G.USER_CACHE[this.name] = 1;
        }
        return hasProfile;
    }
    get authHeaders(): AuthObject {return {
        [IAP_HEADER]: this.req.get(IAP_HEADER),
    };}

    private async _fetchProfile(): Promise<WorkgroupBinding[]> {
        const resp = await this.profileAPI.readBindings(this.user, undefined, undefined, this.authHeaders);
        return resp.body.bindings;
    }
    private _getUser(): string {
        let email = 'anonymous@kubeflow.org';
        const {req} = this;
        if (req.header(IAP_HEADER)) {
            email = req.header(IAP_HEADER).slice(IAP_PREFIX.length);
        }
        return email;
    }
}

export const handleAuth = (registrationPage: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (await req.user.hasProfile()) return next();
    res.sendFile(registrationPage);
};

export const getProfileContext = (profileController: DefaultApi) => (req: Request, res: Response, next: NextFunction) => {
    req.user = new UserData(req, profileController);
    next();
};

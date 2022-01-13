export interface AmplifyConfig {
    Analytics?: object;
    Auth?: object;
    API?: object;
    Storage?: object;
    Cache?: object;
    UI?: object;
    XR?: object;
    Predictions?: object;
}
export interface ICredentials {
    accessKeyId: string;
    sessionToken: string;
    secretAccessKey: string;
    identityId: string;
    authenticated: boolean;
}

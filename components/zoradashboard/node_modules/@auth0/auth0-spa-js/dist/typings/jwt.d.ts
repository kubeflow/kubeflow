import { IdToken, JWTVerifyOptions } from './global';
export declare const decode: (token: string) => {
    encoded: {
        header: string;
        payload: string;
        signature: string;
    };
    header: any;
    claims: IdToken;
    user: any;
};
export declare const verify: (options: JWTVerifyOptions) => {
    encoded: {
        header: string;
        payload: string;
        signature: string;
    };
    header: any;
    claims: IdToken;
    user: any;
};

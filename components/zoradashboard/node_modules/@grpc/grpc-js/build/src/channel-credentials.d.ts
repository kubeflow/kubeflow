/// <reference types="node" />
import { ConnectionOptions } from 'tls';
import { CallCredentials } from './call-credentials';
/**
 * A certificate as received by the checkServerIdentity callback.
 */
export interface Certificate {
    /**
     * The raw certificate in DER form.
     */
    raw: Buffer;
}
/**
 * A callback that will receive the expected hostname and presented peer
 * certificate as parameters. The callback should return an error to
 * indicate that the presented certificate is considered invalid and
 * otherwise returned undefined.
 */
export declare type CheckServerIdentityCallback = (hostname: string, cert: Certificate) => Error | undefined;
/**
 * Additional peer verification options that can be set when creating
 * SSL credentials.
 */
export interface VerifyOptions {
    /**
     * If set, this callback will be invoked after the usual hostname verification
     * has been performed on the peer certificate.
     */
    checkServerIdentity?: CheckServerIdentityCallback;
}
/**
 * A class that contains credentials for communicating over a channel, as well
 * as a set of per-call credentials, which are applied to every method call made
 * over a channel initialized with an instance of this class.
 */
export declare abstract class ChannelCredentials {
    protected callCredentials: CallCredentials;
    protected constructor(callCredentials?: CallCredentials);
    /**
     * Returns a copy of this object with the included set of per-call credentials
     * expanded to include callCredentials.
     * @param callCredentials A CallCredentials object to associate with this
     * instance.
     */
    abstract compose(callCredentials: CallCredentials): ChannelCredentials;
    /**
     * Gets the set of per-call credentials associated with this instance.
     */
    _getCallCredentials(): CallCredentials;
    /**
     * Gets a SecureContext object generated from input parameters if this
     * instance was created with createSsl, or null if this instance was created
     * with createInsecure.
     */
    abstract _getConnectionOptions(): ConnectionOptions | null;
    /**
     * Indicates whether this credentials object creates a secure channel.
     */
    abstract _isSecure(): boolean;
    /**
     * Check whether two channel credentials objects are equal. Two secure
     * credentials are equal if they were constructed with the same parameters.
     * @param other The other ChannelCredentials Object
     */
    abstract _equals(other: ChannelCredentials): boolean;
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     */
    static createSsl(rootCerts?: Buffer | null, privateKey?: Buffer | null, certChain?: Buffer | null, verifyOptions?: VerifyOptions): ChannelCredentials;
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure(): ChannelCredentials;
}

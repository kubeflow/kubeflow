import { CognitoIdentityClient } from "./CognitoIdentityClient";
import {
  CreateIdentityPoolCommand,
  CreateIdentityPoolCommandInput,
  CreateIdentityPoolCommandOutput,
} from "./commands/CreateIdentityPoolCommand";
import {
  DeleteIdentitiesCommand,
  DeleteIdentitiesCommandInput,
  DeleteIdentitiesCommandOutput,
} from "./commands/DeleteIdentitiesCommand";
import {
  DeleteIdentityPoolCommand,
  DeleteIdentityPoolCommandInput,
  DeleteIdentityPoolCommandOutput,
} from "./commands/DeleteIdentityPoolCommand";
import {
  DescribeIdentityCommand,
  DescribeIdentityCommandInput,
  DescribeIdentityCommandOutput,
} from "./commands/DescribeIdentityCommand";
import {
  DescribeIdentityPoolCommand,
  DescribeIdentityPoolCommandInput,
  DescribeIdentityPoolCommandOutput,
} from "./commands/DescribeIdentityPoolCommand";
import {
  GetCredentialsForIdentityCommand,
  GetCredentialsForIdentityCommandInput,
  GetCredentialsForIdentityCommandOutput,
} from "./commands/GetCredentialsForIdentityCommand";
import { GetIdCommand, GetIdCommandInput, GetIdCommandOutput } from "./commands/GetIdCommand";
import {
  GetIdentityPoolRolesCommand,
  GetIdentityPoolRolesCommandInput,
  GetIdentityPoolRolesCommandOutput,
} from "./commands/GetIdentityPoolRolesCommand";
import {
  GetOpenIdTokenCommand,
  GetOpenIdTokenCommandInput,
  GetOpenIdTokenCommandOutput,
} from "./commands/GetOpenIdTokenCommand";
import {
  GetOpenIdTokenForDeveloperIdentityCommand,
  GetOpenIdTokenForDeveloperIdentityCommandInput,
  GetOpenIdTokenForDeveloperIdentityCommandOutput,
} from "./commands/GetOpenIdTokenForDeveloperIdentityCommand";
import {
  ListIdentitiesCommand,
  ListIdentitiesCommandInput,
  ListIdentitiesCommandOutput,
} from "./commands/ListIdentitiesCommand";
import {
  ListIdentityPoolsCommand,
  ListIdentityPoolsCommandInput,
  ListIdentityPoolsCommandOutput,
} from "./commands/ListIdentityPoolsCommand";
import {
  ListTagsForResourceCommand,
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  LookupDeveloperIdentityCommand,
  LookupDeveloperIdentityCommandInput,
  LookupDeveloperIdentityCommandOutput,
} from "./commands/LookupDeveloperIdentityCommand";
import {
  MergeDeveloperIdentitiesCommand,
  MergeDeveloperIdentitiesCommandInput,
  MergeDeveloperIdentitiesCommandOutput,
} from "./commands/MergeDeveloperIdentitiesCommand";
import {
  SetIdentityPoolRolesCommand,
  SetIdentityPoolRolesCommandInput,
  SetIdentityPoolRolesCommandOutput,
} from "./commands/SetIdentityPoolRolesCommand";
import { TagResourceCommand, TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import {
  UnlinkDeveloperIdentityCommand,
  UnlinkDeveloperIdentityCommandInput,
  UnlinkDeveloperIdentityCommandOutput,
} from "./commands/UnlinkDeveloperIdentityCommand";
import {
  UnlinkIdentityCommand,
  UnlinkIdentityCommandInput,
  UnlinkIdentityCommandOutput,
} from "./commands/UnlinkIdentityCommand";
import {
  UntagResourceCommand,
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  UpdateIdentityPoolCommand,
  UpdateIdentityPoolCommandInput,
  UpdateIdentityPoolCommandOutput,
} from "./commands/UpdateIdentityPoolCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <fullname>Amazon Cognito Federated Identities</fullname>
 *          <p>Amazon Cognito Federated Identities is a web service that delivers scoped temporary
 *          credentials to mobile devices and other untrusted environments. It uniquely identifies a
 *          device and supplies the user with a consistent identity over the lifetime of an
 *          application.</p>
 *          <p>Using Amazon Cognito Federated Identities, you can enable authentication with one or
 *          more third-party identity providers (Facebook, Google, or Login with Amazon) or an Amazon
 *          Cognito user pool, and you can also choose to support unauthenticated access from your app.
 *          Cognito delivers a unique identifier for each user and acts as an OpenID token provider
 *          trusted by AWS Security Token Service (STS) to access temporary, limited-privilege AWS
 *          credentials.</p>
 *          <p>For a description of the authentication flow from the Amazon Cognito Developer Guide
 *          see <a href="https://docs.aws.amazon.com/cognito/latest/developerguide/authentication-flow.html">Authentication Flow</a>.</p>
 *          <p>For more information see <a href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html">Amazon Cognito Federated Identities</a>.</p>
 */
export class CognitoIdentity extends CognitoIdentityClient {
  /**
   * <p>Creates a new identity pool. The identity pool is a store of user identity
   *          information that is specific to your AWS account. The keys for <code>SupportedLoginProviders</code> are as follows:</p>
   *
   *          <ul>
   *             <li>
   *                <p>Facebook: <code>graph.facebook.com</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>Google: <code>accounts.google.com</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>Amazon: <code>www.amazon.com</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>Twitter: <code>api.twitter.com</code>
   *                </p>
   *             </li>
   *             <li>
   *                <p>Digits: <code>www.digits.com</code>
   *                </p>
   *             </li>
   *          </ul>
   *
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public createIdentityPool(
    args: CreateIdentityPoolCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateIdentityPoolCommandOutput>;
  public createIdentityPool(
    args: CreateIdentityPoolCommandInput,
    cb: (err: any, data?: CreateIdentityPoolCommandOutput) => void
  ): void;
  public createIdentityPool(
    args: CreateIdentityPoolCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateIdentityPoolCommandOutput) => void
  ): void;
  public createIdentityPool(
    args: CreateIdentityPoolCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateIdentityPoolCommandOutput) => void),
    cb?: (err: any, data?: CreateIdentityPoolCommandOutput) => void
  ): Promise<CreateIdentityPoolCommandOutput> | void {
    const command = new CreateIdentityPoolCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes identities from an identity pool. You can specify a list of 1-60 identities
   *          that you want to delete.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public deleteIdentities(
    args: DeleteIdentitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteIdentitiesCommandOutput>;
  public deleteIdentities(
    args: DeleteIdentitiesCommandInput,
    cb: (err: any, data?: DeleteIdentitiesCommandOutput) => void
  ): void;
  public deleteIdentities(
    args: DeleteIdentitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteIdentitiesCommandOutput) => void
  ): void;
  public deleteIdentities(
    args: DeleteIdentitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteIdentitiesCommandOutput) => void),
    cb?: (err: any, data?: DeleteIdentitiesCommandOutput) => void
  ): Promise<DeleteIdentitiesCommandOutput> | void {
    const command = new DeleteIdentitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an identity pool. Once a pool is deleted, users will not be able to
   *          authenticate with the pool.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public deleteIdentityPool(
    args: DeleteIdentityPoolCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteIdentityPoolCommandOutput>;
  public deleteIdentityPool(
    args: DeleteIdentityPoolCommandInput,
    cb: (err: any, data?: DeleteIdentityPoolCommandOutput) => void
  ): void;
  public deleteIdentityPool(
    args: DeleteIdentityPoolCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteIdentityPoolCommandOutput) => void
  ): void;
  public deleteIdentityPool(
    args: DeleteIdentityPoolCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteIdentityPoolCommandOutput) => void),
    cb?: (err: any, data?: DeleteIdentityPoolCommandOutput) => void
  ): Promise<DeleteIdentityPoolCommandOutput> | void {
    const command = new DeleteIdentityPoolCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns metadata related to the given identity, including when the identity was
   *          created and any associated linked logins.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public describeIdentity(
    args: DescribeIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeIdentityCommandOutput>;
  public describeIdentity(
    args: DescribeIdentityCommandInput,
    cb: (err: any, data?: DescribeIdentityCommandOutput) => void
  ): void;
  public describeIdentity(
    args: DescribeIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeIdentityCommandOutput) => void
  ): void;
  public describeIdentity(
    args: DescribeIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeIdentityCommandOutput) => void),
    cb?: (err: any, data?: DescribeIdentityCommandOutput) => void
  ): Promise<DescribeIdentityCommandOutput> | void {
    const command = new DescribeIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets details about a particular identity pool, including the pool name, ID
   *          description, creation date, and current number of users.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public describeIdentityPool(
    args: DescribeIdentityPoolCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeIdentityPoolCommandOutput>;
  public describeIdentityPool(
    args: DescribeIdentityPoolCommandInput,
    cb: (err: any, data?: DescribeIdentityPoolCommandOutput) => void
  ): void;
  public describeIdentityPool(
    args: DescribeIdentityPoolCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeIdentityPoolCommandOutput) => void
  ): void;
  public describeIdentityPool(
    args: DescribeIdentityPoolCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeIdentityPoolCommandOutput) => void),
    cb?: (err: any, data?: DescribeIdentityPoolCommandOutput) => void
  ): Promise<DescribeIdentityPoolCommandOutput> | void {
    const command = new DescribeIdentityPoolCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns credentials for the provided identity ID. Any provided logins will be
   *          validated against supported login providers. If the token is for
   *          cognito-identity.amazonaws.com, it will be passed through to AWS Security Token Service
   *          with the appropriate role for the token.</p>
   *          <p>This is a public API. You do not need any credentials to call this API.</p>
   */
  public getCredentialsForIdentity(
    args: GetCredentialsForIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCredentialsForIdentityCommandOutput>;
  public getCredentialsForIdentity(
    args: GetCredentialsForIdentityCommandInput,
    cb: (err: any, data?: GetCredentialsForIdentityCommandOutput) => void
  ): void;
  public getCredentialsForIdentity(
    args: GetCredentialsForIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCredentialsForIdentityCommandOutput) => void
  ): void;
  public getCredentialsForIdentity(
    args: GetCredentialsForIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCredentialsForIdentityCommandOutput) => void),
    cb?: (err: any, data?: GetCredentialsForIdentityCommandOutput) => void
  ): Promise<GetCredentialsForIdentityCommandOutput> | void {
    const command = new GetCredentialsForIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Generates (or retrieves) a Cognito ID. Supplying multiple logins will create an
   *          implicit linked account.</p>
   *          <p>This is a public API. You do not need any credentials to call this API.</p>
   */
  public getId(args: GetIdCommandInput, options?: __HttpHandlerOptions): Promise<GetIdCommandOutput>;
  public getId(args: GetIdCommandInput, cb: (err: any, data?: GetIdCommandOutput) => void): void;
  public getId(
    args: GetIdCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetIdCommandOutput) => void
  ): void;
  public getId(
    args: GetIdCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetIdCommandOutput) => void),
    cb?: (err: any, data?: GetIdCommandOutput) => void
  ): Promise<GetIdCommandOutput> | void {
    const command = new GetIdCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets the roles for an identity pool.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public getIdentityPoolRoles(
    args: GetIdentityPoolRolesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetIdentityPoolRolesCommandOutput>;
  public getIdentityPoolRoles(
    args: GetIdentityPoolRolesCommandInput,
    cb: (err: any, data?: GetIdentityPoolRolesCommandOutput) => void
  ): void;
  public getIdentityPoolRoles(
    args: GetIdentityPoolRolesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetIdentityPoolRolesCommandOutput) => void
  ): void;
  public getIdentityPoolRoles(
    args: GetIdentityPoolRolesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetIdentityPoolRolesCommandOutput) => void),
    cb?: (err: any, data?: GetIdentityPoolRolesCommandOutput) => void
  ): Promise<GetIdentityPoolRolesCommandOutput> | void {
    const command = new GetIdentityPoolRolesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Gets an OpenID token, using a known Cognito ID. This known Cognito ID is returned by
   *             <a>GetId</a>. You can optionally add additional logins for the identity.
   *          Supplying multiple logins creates an implicit link.</p>
   *          <p>The OpenId token is valid for 10 minutes.</p>
   *          <p>This is a public API. You do not need any credentials to call this API.</p>
   */
  public getOpenIdToken(
    args: GetOpenIdTokenCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetOpenIdTokenCommandOutput>;
  public getOpenIdToken(
    args: GetOpenIdTokenCommandInput,
    cb: (err: any, data?: GetOpenIdTokenCommandOutput) => void
  ): void;
  public getOpenIdToken(
    args: GetOpenIdTokenCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetOpenIdTokenCommandOutput) => void
  ): void;
  public getOpenIdToken(
    args: GetOpenIdTokenCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetOpenIdTokenCommandOutput) => void),
    cb?: (err: any, data?: GetOpenIdTokenCommandOutput) => void
  ): Promise<GetOpenIdTokenCommandOutput> | void {
    const command = new GetOpenIdTokenCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Registers (or retrieves) a Cognito <code>IdentityId</code> and an OpenID Connect
   *          token for a user authenticated by your backend authentication process. Supplying multiple
   *          logins will create an implicit linked account. You can only specify one developer provider
   *          as part of the <code>Logins</code> map, which is linked to the identity pool. The developer
   *          provider is the "domain" by which Cognito will refer to your users.</p>
   *          <p>You can use <code>GetOpenIdTokenForDeveloperIdentity</code> to create a new identity
   *          and to link new logins (that is, user credentials issued by a public provider or developer
   *          provider) to an existing identity. When you want to create a new identity, the
   *             <code>IdentityId</code> should be null. When you want to associate a new login with an
   *          existing authenticated/unauthenticated identity, you can do so by providing the existing
   *             <code>IdentityId</code>. This API will create the identity in the specified
   *             <code>IdentityPoolId</code>.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public getOpenIdTokenForDeveloperIdentity(
    args: GetOpenIdTokenForDeveloperIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetOpenIdTokenForDeveloperIdentityCommandOutput>;
  public getOpenIdTokenForDeveloperIdentity(
    args: GetOpenIdTokenForDeveloperIdentityCommandInput,
    cb: (err: any, data?: GetOpenIdTokenForDeveloperIdentityCommandOutput) => void
  ): void;
  public getOpenIdTokenForDeveloperIdentity(
    args: GetOpenIdTokenForDeveloperIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetOpenIdTokenForDeveloperIdentityCommandOutput) => void
  ): void;
  public getOpenIdTokenForDeveloperIdentity(
    args: GetOpenIdTokenForDeveloperIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetOpenIdTokenForDeveloperIdentityCommandOutput) => void),
    cb?: (err: any, data?: GetOpenIdTokenForDeveloperIdentityCommandOutput) => void
  ): Promise<GetOpenIdTokenForDeveloperIdentityCommandOutput> | void {
    const command = new GetOpenIdTokenForDeveloperIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the identities in an identity pool.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public listIdentities(
    args: ListIdentitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListIdentitiesCommandOutput>;
  public listIdentities(
    args: ListIdentitiesCommandInput,
    cb: (err: any, data?: ListIdentitiesCommandOutput) => void
  ): void;
  public listIdentities(
    args: ListIdentitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListIdentitiesCommandOutput) => void
  ): void;
  public listIdentities(
    args: ListIdentitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListIdentitiesCommandOutput) => void),
    cb?: (err: any, data?: ListIdentitiesCommandOutput) => void
  ): Promise<ListIdentitiesCommandOutput> | void {
    const command = new ListIdentitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists all of the Cognito identity pools registered for your account.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public listIdentityPools(
    args: ListIdentityPoolsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListIdentityPoolsCommandOutput>;
  public listIdentityPools(
    args: ListIdentityPoolsCommandInput,
    cb: (err: any, data?: ListIdentityPoolsCommandOutput) => void
  ): void;
  public listIdentityPools(
    args: ListIdentityPoolsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListIdentityPoolsCommandOutput) => void
  ): void;
  public listIdentityPools(
    args: ListIdentityPoolsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListIdentityPoolsCommandOutput) => void),
    cb?: (err: any, data?: ListIdentityPoolsCommandOutput) => void
  ): Promise<ListIdentityPoolsCommandOutput> | void {
    const command = new ListIdentityPoolsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the tags that are assigned to an Amazon Cognito identity pool.</p>
   *          <p>A tag is a label that you can apply to identity pools to categorize and manage them in
   *          different ways, such as by purpose, owner, environment, or other criteria.</p>
   *          <p>You can use this action up to 10 times per second, per account.</p>
   */
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForResourceCommandOutput>;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTagsForResourceCommandOutput) => void),
    cb?: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): Promise<ListTagsForResourceCommandOutput> | void {
    const command = new ListTagsForResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the <code>IdentityID</code> associated with a
   *             <code>DeveloperUserIdentifier</code> or the list of <code>DeveloperUserIdentifier</code>
   *          values associated with an <code>IdentityId</code> for an existing identity. Either
   *             <code>IdentityID</code> or <code>DeveloperUserIdentifier</code> must not be null. If you
   *          supply only one of these values, the other value will be searched in the database and
   *          returned as a part of the response. If you supply both,
   *             <code>DeveloperUserIdentifier</code> will be matched against <code>IdentityID</code>. If
   *          the values are verified against the database, the response returns both values and is the
   *          same as the request. Otherwise a <code>ResourceConflictException</code> is
   *          thrown.</p>
   *          <p>
   *             <code>LookupDeveloperIdentity</code> is intended for low-throughput control plane
   *          operations: for example, to enable customer service to locate an identity ID by username.
   *          If you are using it for higher-volume operations such as user authentication, your requests
   *          are likely to be throttled. <a>GetOpenIdTokenForDeveloperIdentity</a> is a
   *          better option for higher-volume operations for user authentication.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public lookupDeveloperIdentity(
    args: LookupDeveloperIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<LookupDeveloperIdentityCommandOutput>;
  public lookupDeveloperIdentity(
    args: LookupDeveloperIdentityCommandInput,
    cb: (err: any, data?: LookupDeveloperIdentityCommandOutput) => void
  ): void;
  public lookupDeveloperIdentity(
    args: LookupDeveloperIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: LookupDeveloperIdentityCommandOutput) => void
  ): void;
  public lookupDeveloperIdentity(
    args: LookupDeveloperIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: LookupDeveloperIdentityCommandOutput) => void),
    cb?: (err: any, data?: LookupDeveloperIdentityCommandOutput) => void
  ): Promise<LookupDeveloperIdentityCommandOutput> | void {
    const command = new LookupDeveloperIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Merges two users having different <code>IdentityId</code>s, existing in the same
   *          identity pool, and identified by the same developer provider. You can use this action to
   *          request that discrete users be merged and identified as a single user in the Cognito
   *          environment. Cognito associates the given source user (<code>SourceUserIdentifier</code>)
   *          with the <code>IdentityId</code> of the <code>DestinationUserIdentifier</code>. Only
   *          developer-authenticated users can be merged. If the users to be merged are associated with
   *          the same public provider, but as two different users, an exception will be
   *          thrown.</p>
   *          <p>The number of linked logins is limited to 20. So, the number of linked logins for the
   *          source user, <code>SourceUserIdentifier</code>, and the destination user,
   *          <code>DestinationUserIdentifier</code>, together should not be larger than 20.
   *          Otherwise, an exception will be thrown.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public mergeDeveloperIdentities(
    args: MergeDeveloperIdentitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<MergeDeveloperIdentitiesCommandOutput>;
  public mergeDeveloperIdentities(
    args: MergeDeveloperIdentitiesCommandInput,
    cb: (err: any, data?: MergeDeveloperIdentitiesCommandOutput) => void
  ): void;
  public mergeDeveloperIdentities(
    args: MergeDeveloperIdentitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: MergeDeveloperIdentitiesCommandOutput) => void
  ): void;
  public mergeDeveloperIdentities(
    args: MergeDeveloperIdentitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: MergeDeveloperIdentitiesCommandOutput) => void),
    cb?: (err: any, data?: MergeDeveloperIdentitiesCommandOutput) => void
  ): Promise<MergeDeveloperIdentitiesCommandOutput> | void {
    const command = new MergeDeveloperIdentitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the roles for an identity pool. These roles are used when making calls to <a>GetCredentialsForIdentity</a> action.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public setIdentityPoolRoles(
    args: SetIdentityPoolRolesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SetIdentityPoolRolesCommandOutput>;
  public setIdentityPoolRoles(
    args: SetIdentityPoolRolesCommandInput,
    cb: (err: any, data?: SetIdentityPoolRolesCommandOutput) => void
  ): void;
  public setIdentityPoolRoles(
    args: SetIdentityPoolRolesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetIdentityPoolRolesCommandOutput) => void
  ): void;
  public setIdentityPoolRoles(
    args: SetIdentityPoolRolesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SetIdentityPoolRolesCommandOutput) => void),
    cb?: (err: any, data?: SetIdentityPoolRolesCommandOutput) => void
  ): Promise<SetIdentityPoolRolesCommandOutput> | void {
    const command = new SetIdentityPoolRolesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Assigns a set of tags to an Amazon Cognito identity pool. A tag is a label that you can
   *          use to categorize and manage identity pools in different ways, such as by purpose, owner,
   *          environment, or other criteria.</p>
   *          <p>Each tag consists of a key and value, both of which you define. A key is a general
   *          category for more specific values. For example, if you have two versions of an identity
   *          pool, one for testing and another for production, you might assign an
   *             <code>Environment</code> tag key to both identity pools. The value of this key might be
   *             <code>Test</code> for one identity pool and <code>Production</code> for the
   *          other.</p>
   *          <p>Tags are useful for cost tracking and access control. You can activate your tags so that
   *          they appear on the Billing and Cost Management console, where you can track the costs
   *          associated with your identity pools. In an IAM policy, you can constrain permissions for
   *          identity pools based on specific tags or tag values.</p>
   *          <p>You can use this action up to 5 times per second, per account. An identity pool can have
   *          as many as 50 tags.</p>
   */
  public tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
  public tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
  public tagResource(
    args: TagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  public tagResource(
    args: TagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TagResourceCommandOutput) => void),
    cb?: (err: any, data?: TagResourceCommandOutput) => void
  ): Promise<TagResourceCommandOutput> | void {
    const command = new TagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Unlinks a <code>DeveloperUserIdentifier</code> from an existing identity. Unlinked
   *          developer users will be considered new identities next time they are seen. If, for a given
   *          Cognito identity, you remove all federated identities as well as the developer user
   *          identifier, the Cognito identity becomes inaccessible.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public unlinkDeveloperIdentity(
    args: UnlinkDeveloperIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UnlinkDeveloperIdentityCommandOutput>;
  public unlinkDeveloperIdentity(
    args: UnlinkDeveloperIdentityCommandInput,
    cb: (err: any, data?: UnlinkDeveloperIdentityCommandOutput) => void
  ): void;
  public unlinkDeveloperIdentity(
    args: UnlinkDeveloperIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UnlinkDeveloperIdentityCommandOutput) => void
  ): void;
  public unlinkDeveloperIdentity(
    args: UnlinkDeveloperIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UnlinkDeveloperIdentityCommandOutput) => void),
    cb?: (err: any, data?: UnlinkDeveloperIdentityCommandOutput) => void
  ): Promise<UnlinkDeveloperIdentityCommandOutput> | void {
    const command = new UnlinkDeveloperIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Unlinks a federated identity from an existing account. Unlinked logins will be
   *          considered new identities next time they are seen. Removing the last linked login will make
   *          this identity inaccessible.</p>
   *          <p>This is a public API. You do not need any credentials to call this API.</p>
   */
  public unlinkIdentity(
    args: UnlinkIdentityCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UnlinkIdentityCommandOutput>;
  public unlinkIdentity(
    args: UnlinkIdentityCommandInput,
    cb: (err: any, data?: UnlinkIdentityCommandOutput) => void
  ): void;
  public unlinkIdentity(
    args: UnlinkIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UnlinkIdentityCommandOutput) => void
  ): void;
  public unlinkIdentity(
    args: UnlinkIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UnlinkIdentityCommandOutput) => void),
    cb?: (err: any, data?: UnlinkIdentityCommandOutput) => void
  ): Promise<UnlinkIdentityCommandOutput> | void {
    const command = new UnlinkIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes the specified tags from an Amazon Cognito identity pool. You can use this action
   *          up to 5 times per second, per account</p>
   */
  public untagResource(
    args: UntagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagResourceCommandOutput>;
  public untagResource(
    args: UntagResourceCommandInput,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UntagResourceCommandOutput) => void),
    cb?: (err: any, data?: UntagResourceCommandOutput) => void
  ): Promise<UntagResourceCommandOutput> | void {
    const command = new UntagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an identity pool.</p>
   *          <p>You must use AWS Developer credentials to call this API.</p>
   */
  public updateIdentityPool(
    args: UpdateIdentityPoolCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateIdentityPoolCommandOutput>;
  public updateIdentityPool(
    args: UpdateIdentityPoolCommandInput,
    cb: (err: any, data?: UpdateIdentityPoolCommandOutput) => void
  ): void;
  public updateIdentityPool(
    args: UpdateIdentityPoolCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateIdentityPoolCommandOutput) => void
  ): void;
  public updateIdentityPool(
    args: UpdateIdentityPoolCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateIdentityPoolCommandOutput) => void),
    cb?: (err: any, data?: UpdateIdentityPoolCommandOutput) => void
  ): Promise<UpdateIdentityPoolCommandOutput> | void {
    const command = new UpdateIdentityPoolCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}

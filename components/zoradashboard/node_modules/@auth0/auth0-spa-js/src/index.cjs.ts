import createAuth0Client, {
  Auth0Client,
  GenericError,
  AuthenticationError,
  TimeoutError,
  PopupTimeoutError
} from './index';

/**
 * @ignore
 */
const wrapper = createAuth0Client as any;

wrapper.Auth0Client = Auth0Client;
wrapper.createAuth0Client = createAuth0Client;
wrapper.GenericError = GenericError;
wrapper.AuthenticationError = AuthenticationError;
wrapper.TimeoutError = TimeoutError;
wrapper.PopupTimeoutError = PopupTimeoutError;

export default wrapper;

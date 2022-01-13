export type ErrorOverlayOptions = {
  /**
   * Path to a JS file that sets up the error overlay integration.
   */
  entry?: string | false | undefined;
  /**
   * The error overlay module to use.
   */
  module?: string | false | undefined;
  /**
   * The socket host to use (WDS only).
   */
  sockHost?: string | undefined;
  /**
   * Path to a JS file that sets up the Webpack socket integration.
   */
  sockIntegration?:
    | false
    | (string & {
        _?: undefined;
      })
    | 'wds'
    | 'whm'
    | 'wps'
    | undefined;
  /**
   * The socket path to use (WDS only).
   */
  sockPath?: string | undefined;
  /**
   * The socket port to use (WDS only).
   */
  sockPort?: number | undefined;
  /**
   * Uses a custom SocketJS implementation for older versions of webpack-dev-server.
   */
  useLegacyWDSSockets?: boolean | undefined;
};
export type NormalizedErrorOverlayOptions = {
  /**
   * The socket host to use (WDS only).
   */
  sockHost?: string | undefined;
  /**
   * The socket path to use (WDS only).
   */
  sockPath?: string | undefined;
  /**
   * The socket port to use (WDS only).
   */
  sockPort?: number | undefined;
  /**
   * Uses a custom SocketJS implementation for older versions of webpack-dev-server.
   */
  useLegacyWDSSockets?: boolean | undefined;
  /**
   * The error overlay module to use.
   */
  module: string | false;
  /**
   * Path to a JS file that sets up the error overlay integration.
   */
  entry: string | false;
  /**
   * Path to a JS file that sets up the Webpack socket integration.
   */
  sockIntegration: import('type-fest').LiteralUnion<'wds' | 'whm' | 'wps' | false, string>;
};
export type ReactRefreshPluginOptions = {
  /**
   * Disables detection of react-refresh's Babel plugin (Deprecated since v0.3.0).
   */
  disableRefreshCheck?: boolean | undefined;
  /**
   * Files to explicitly exclude from processing.
   */
  exclude?: string | RegExp | (string | RegExp)[] | undefined;
  /**
   * Enables the plugin forcefully.
   */
  forceEnable?: boolean | undefined;
  /**
   * Files to explicitly include for processing.
   */
  include?: string | RegExp | (string | RegExp)[] | undefined;
  /**
   * Modifies how the error overlay integration works in the plugin.
   */
  overlay?: boolean | ErrorOverlayOptions | undefined;
};
export type OverlayOverrides = {
  /**
   * Modifies how the error overlay integration works in the plugin.
   */
  overlay: false | NormalizedErrorOverlayOptions;
};
export type NormalizedPluginOptions = Pick<
  {
    /**
     * Enables the plugin forcefully.
     */
    forceEnable?: boolean | undefined;
    /**
     * Files to explicitly include for processing.
     */
    include: string | RegExp | Array<string | RegExp>;
    /**
     * Files to explicitly exclude from processing.
     */
    exclude: string | RegExp | Array<string | RegExp>;
  },
  'include' | 'exclude' | 'forceEnable'
> &
  OverlayOverrides;

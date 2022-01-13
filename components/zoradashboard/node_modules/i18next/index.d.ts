type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type MergeBy<T, K> = Omit<T, keyof K> & K;

export interface FallbackLngObjList {
  [language: string]: readonly string[];
}

export type FallbackLng =
  | string
  | readonly string[]
  | FallbackLngObjList
  | ((code: string) => string | readonly string[] | FallbackLngObjList);

export type FormatFunction = (
  value: any,
  format?: string,
  lng?: string,
  options?: InterpolationOptions & { [key: string]: any },
) => string;

export interface InterpolationOptions {
  /**
   * Format function see formatting for details
   * @default noop
   */
  format?: FormatFunction;
  /**
   * Used to separate format from interpolation value
   * @default ','
   */
  formatSeparator?: string;
  /**
   * Escape function
   * @default str => str
   */
  escape?(str: string): string;

  /**
   * Always format interpolated values.
   * @default false
   */
  alwaysFormat?: boolean;
  /**
   * Escape passed in values to avoid xss injection
   * @default true
   */
  escapeValue?: boolean;
  /**
   * If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type check
   * @default false
   */
  useRawValueToEscape?: boolean;
  /**
   * Prefix for interpolation
   * @default '{{'
   */
  prefix?: string;
  /**
   * Suffix for interpolation
   * @default '}}'
   */
  suffix?: string;
  /**
   * Escaped prefix for interpolation (regexSafe)
   * @default undefined
   */
  prefixEscaped?: string;
  /**
   * Escaped suffix for interpolation (regexSafe)
   * @default undefined
   */
  suffixEscaped?: string;
  /**
   * Suffix to unescaped mode
   * @default undefined
   */
  unescapeSuffix?: string;
  /**
   * Prefix to unescaped mode
   * @default '-'
   */
  unescapePrefix?: string;
  /**
   * Prefix for nesting
   * @default '$t('
   */
  nestingPrefix?: string;
  /**
   * Suffix for nesting
   * @default ')'
   */
  nestingSuffix?: string;
  /**
   * Escaped prefix for nesting (regexSafe)
   * @default undefined
   */
  nestingPrefixEscaped?: string;
  /**
   * Escaped suffix for nesting (regexSafe)
   * @default undefined
   */
  nestingSuffixEscaped?: string;
  /**
   * Separates options from key
   * @default ','
   */
  nestingOptionsSeparator?: string;
  /**
   * Global variables to use in interpolation replacements
   * @default undefined
   */

  defaultVariables?: { [index: string]: any };
  /**
   * After how many interpolation runs to break out before throwing a stack overflow
   * @default 1000
   */
  maxReplaces?: number;

  /**
   * If true, it will skip to interpolate the variables
   * @default false
   */
  skipOnVariables?: boolean;
}

export interface ReactOptions {
  /**
   * Set to true if you like to wait for loaded in every translated hoc
   * @default false
   */
  wait?: boolean;
  /**
   * Set it to fallback to let passed namespaces to translated hoc act as fallbacks
   * @default 'default'
   */
  nsMode?: 'default' | 'fallback';
  /**
   * Set it to the default parent element created by the Trans component.
   * @default 'div'
   */
  defaultTransParent?: string;
  /**
   * Set which events trigger a re-render, can be set to false or string of events
   * @default 'languageChanged'
   */
  bindI18n?: string | false;
  /**
   * Set which events on store trigger a re-render, can be set to false or string of events
   * @default ''
   */
  bindI18nStore?: string | false;
  /**
   * Set fallback value for Trans components without children
   * @default undefined
   */
  transEmptyNodeValue?: string;
  /**
   * Set it to false if you do not want to use Suspense
   * @default true
   */
  useSuspense?: boolean;
  /**
   * Function to generate an i18nKey from the defaultValue (or Trans children)
   * when no key is provided.
   * By default, the defaultValue (Trans text) itself is used as the key.
   * If you want to require keys for all translations, supply a function
   * that always throws an error.
   * @default undefined
   */
  hashTransKey?(defaultValue: TOptionsBase['defaultValue']): TOptionsBase['defaultValue'];
  /**
   * Convert eg. <br/> found in translations to a react component of type br
   * @default true
   */
  transSupportBasicHtmlNodes?: boolean;
  /**
   * Which nodes not to convert in defaultValue generation in the Trans component.
   * @default ['br', 'strong', 'i', 'p']
   */
  transKeepBasicHtmlNodesFor?: readonly string[];
  /**
   * Wrap text nodes in a user-specified element.
   * @default ''
   */
  transWrapTextNodes?: string;
}

/**
 * This interface can be augmented by users to add types to `i18next` default PluginOptions.
 */
export interface PluginOptions {}

interface DefaultPluginOptions {
  /**
   * Options for language detection - check documentation of plugin
   * @default undefined
   */
  detection?: object;

  /**
   * Options for backend - check documentation of plugin
   * @default undefined
   */
  backend?: object;

  /**
   * Options for cache layer - check documentation of plugin
   * @default undefined
   */
  cache?: object;

  /**
   * Options for i18n message format - check documentation of plugin
   * @default undefined
   */
  i18nFormat?: object;
}

export interface InitOptions extends MergeBy<DefaultPluginOptions, PluginOptions> {
  /**
   * Logs info level to console output. Helps finding issues with loading not working.
   * @default false
   */
  debug?: boolean;

  /**
   * Resources to initialize with (if not using loading or not appending using addResourceBundle)
   * @default undefined
   */
  resources?: Resource;

  /**
   * Allow initializing with bundled resources while using a backend to load non bundled ones.
   * @default false
   */
  partialBundledLanguages?: boolean;

  /**
   * Language to use (overrides language detection)
   * @default undefined
   */
  lng?: string;

  /**
   * Language to use if translations in user language are not available.
   * @default 'dev'
   */
  fallbackLng?: false | FallbackLng;

  /**
   * DEPRECATED use supportedLngs
   * @default false
   */
  whitelist?: false | readonly string[];

  /**
   * DEPRECTADED use nonExplicitSupportedLngs
   * @default false
   */
  nonExplicitWhitelist?: boolean;

  /**
   * Array of allowed languages
   * @default false
   */
  supportedLngs?: false | readonly string[];

  /**
   * If true will pass eg. en-US if finding en in supportedLngs
   * @default false
   */
  nonExplicitSupportedLngs?: boolean;

  /**
   * Language codes to lookup, given set language is
   * 'en-US': 'all' --> ['en-US', 'en', 'dev'],
   * 'currentOnly' --> 'en-US',
   * 'languageOnly' --> 'en'
   * @default 'all'
   */
  load?: 'all' | 'currentOnly' | 'languageOnly';

  /**
   * Array of languages to preload. Important on server-side to assert translations are loaded before rendering views.
   * @default false
   */
  preload?: false | readonly string[];

  /**
   * Language will be lowercased eg. en-US --> en-us
   * @default false
   */
  lowerCaseLng?: boolean;

  /**
   * Language will be lowercased EN --> en while leaving full locales like en-US
   * @default false
   */
  cleanCode?: boolean;

  /**
   * String or array of namespaces to load
   * @default 'translation'
   */
  ns?: string | readonly string[];

  /**
   * Default namespace used if not passed to translation function
   * @default 'translation'
   */
  defaultNS?: string;

  /**
   * String or array of namespaces to lookup key if not found in given namespace.
   * @default false
   */
  fallbackNS?: false | string | readonly string[];

  /**
   * Calls save missing key function on backend if key not found
   * @default false
   */
  saveMissing?: boolean;

  /**
   * Experimental: enable to update default values using the saveMissing
   * (Works only if defaultValue different from translated value.
   * Only useful on initial development or when keeping code as source of truth not changing values outside of code.
   * Only supported if backend supports it already)
   * @default false
   */
  updateMissing?: boolean;

  /**
   * @default 'fallback'
   */
  saveMissingTo?: 'current' | 'all' | 'fallback';

  /**
   * Used for custom missing key handling (needs saveMissing set to true!)
   * @default false
   */
  missingKeyHandler?:
    | false
    | ((lngs: readonly string[], ns: string, key: string, fallbackValue: string) => void);

  /**
   * Receives a key that was not found in `t()` and returns a value, that will be returned by `t()`
   * @default noop
   */
  parseMissingKeyHandler?(key: string): any;

  /**
   * Appends namespace to missing key
   * @default false
   */
  appendNamespaceToMissingKey?: boolean;

  /**
   * Gets called in case a interpolation value is undefined. This method will not be called if the value is empty string or null
   * @default noop
   */
  missingInterpolationHandler?: (text: string, value: any, options: InitOptions) => any;

  /**
   * Will use 'plural' as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers
   * @default true
   */
  simplifyPluralSuffix?: boolean;

  /**
   * String or array of postProcessors to apply per default
   * @default false
   */
  postProcess?: false | string | readonly string[];

  /**
   * passthrough the resolved object including 'usedNS', 'usedLang' etc into options object of postprocessors as 'i18nResolved' property
   * @default false
   */
  postProcessPassResolved?: boolean;

  /**
   * Allows null values as valid translation
   * @default true
   */
  returnNull?: boolean;

  /**
   * Allows empty string as valid translation
   * @default true
   */
  returnEmptyString?: boolean;

  /**
   * Allows objects as valid translation result
   * @default false
   */
  returnObjects?: boolean;

  /**
   * Gets called if object was passed in as key but returnObjects was set to false
   * @default noop
   */
  returnedObjectHandler?(key: string, value: string, options: any): void;

  /**
   * Char, eg. '\n' that arrays will be joined by
   * @default false
   */
  joinArrays?: false | string;

  /**
   * Sets defaultValue
   * @default args => ({ defaultValue: args[1] })
   */
  overloadTranslationOptionHandler?(args: string[]): TOptions;

  /**
   * @see https://www.i18next.com/interpolation.html
   */
  interpolation?: InterpolationOptions;

  /**
   * Options for react - check documentation of plugin
   * @default undefined
   */
  react?: ReactOptions;

  /**
   * Triggers resource loading in init function inside a setTimeout (default async behaviour).
   * Set it to false if your backend loads resources sync - that way calling i18next.t after
   * init is possible without relaying on the init callback.
   * @default true
   */
  initImmediate?: boolean;

  /**
   * Char to separate keys
   * @default '.'
   */
  keySeparator?: false | string;

  /**
   * Char to split namespace from key
   * @default ':'
   */
  nsSeparator?: false | string;

  /**
   * Char to split plural from key
   * @default '_'
   */
  pluralSeparator?: string;

  /**
   * Char to split context from key
   * @default '_'
   */
  contextSeparator?: string;

  /**
   * Prefixes the namespace to the returned key when using `cimode`
   * @default false
   */
  appendNamespaceToCIMode?: boolean;

  /**
   * Compatibility JSON version
   * @default 'v3'
   */
  compatibilityJSON?: 'v1' | 'v2' | 'v3';

  /**
   * Options for https://github.com/locize/locize-editor
   * @default undefined
   */
  editor?: {
    /**
     * Enable on init without the need of adding querystring locize=true
     * @default false
     */
    enabled?: boolean;
    /**
     * If set to false you will need to open the editor via API
     * @default true
     */
    autoOpen?: boolean;

    /**
     * Enable by adding querystring locize=true; can be set to another value or turned off by setting to false
     * @default 'locize'
     */
    enableByQS?: string | false;

    /**
     * Turn on/off by pressing key combination. Combine this with `toggleKeyCode`
     * @default 'ctrlKey'
     */
    toggleKeyModifier?: 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey';
    /**
     * Turn on/off by pressing key combination. Combine this with `toggleKeyModifier`
     * @default 24 (x)
     */
    toggleKeyCode?: number;

    /**
     * Use lng in editor taken from query string, eg. if running with lng=cimode (i18next, locize)
     * @default 'useLng'
     */
    lngOverrideQS?: string;

    /**
     * Use lng in editor, eg. if running with lng=cimode (i18next, locize)
     * @default null
     */
    lngOverride?: string | null;

    /**
     * How the editor will open.
     * Setting to window will open a new window/tab instead
     * @default 'iframe'
     */
    mode?: 'iframe' | 'window';

    /**
     * Styles to adapt layout in iframe mode to your website layout.
     * This will add a style to the `<iframe>`
     * @default 'z-index: 2000; position: fixed; top: 0; right: 0; bottom: 0; width: 600px; box-shadow: -3px 0 5px 0 rgba(0,0,0,0.5);'
     */
    iframeContainerStyle?: string;
    /**
     * Styles to adapt layout in iframe mode to your website layout.
     * This will add a style to the parent of `<iframe>`
     * @default 'height: 100%; width: 600px; border: none;'
     */
    iframeStyle?: string;
    /**
     * Styles to adapt layout in iframe mode to your website layout.
     * This will add a style to `<body>`
     * @default 'margin-right: 605px;'
     */
    bodyStyle?: string;

    /**
     * Handle when locize saved the edited translations, eg. reload website
     * @default noop
     */
    onEditorSaved?: (lng: null, ns: string | readonly string[]) => void;
  };

  /**
   * Options for https://github.com/locize/locize-lastused
   * @default undefined
   */
  locizeLastUsed?: {
    /**
     * The id of your locize project
     */
    projectId: string;

    /**
     * An api key if you want to send missing keys
     */
    apiKey?: string;

    /**
     * The reference language of your project
     * @default 'en'
     */
    referenceLng?: string;

    /**
     * Version
     * @default 'latest'
     */
    version?: string;

    /**
     * Debounce interval to send data in milliseconds
     * @default 90000
     */
    debounceSubmit?: number;

    /**
     * Hostnames that are allowed to send last used data.
     * Please keep those to your local system, staging, test servers (not production)
     * @default ['localhost']
     */
    allowedHosts?: readonly string[];
  };

  /**
   * Automatically lookup for a flat key if a nested key is not found an vice-versa
   * @default true
   */
  ignoreJSONStructure?: boolean;
}

export interface TOptionsBase {
  /**
   * Default value to return if a translation was not found
   */
  defaultValue?: any;
  /**
   * Count value used for plurals
   */
  count?: number;
  /**
   * Used for contexts (eg. male\female)
   */
  context?: any;
  /**
   * Object with vars for interpolation - or put them directly in options
   */
  replace?: any;
  /**
   * Override language to use
   */
  lng?: string;
  /**
   * Override languages to use
   */
  lngs?: readonly string[];
  /**
   * Override language to lookup key if not found see fallbacks for details
   */
  fallbackLng?: FallbackLng;
  /**
   * Override namespaces (string or array)
   */
  ns?: string | readonly string[];
  /**
   * Override char to separate keys
   */
  keySeparator?: false | string;
  /**
   * Override char to split namespace from key
   */
  nsSeparator?: false | string;
  /**
   * Accessing an object not a translation string (can be set globally too)
   */
  returnObjects?: boolean;
  /**
   * Char, eg. '\n' that arrays will be joined by (can be set globally too)
   */
  joinArrays?: string;
  /**
   * String or array of postProcessors to apply see interval plurals as a sample
   */
  postProcess?: string | readonly string[];
  /**
   * Override interpolation options
   */
  interpolation?: InterpolationOptions;
}

/**
 * indexer that is open to any value
 */
export type StringMap = { [key: string]: any };

/**
 * Options that allow open ended values for interpolation unless type is provided.
 */
export type TOptions<TInterpolationMap extends object = StringMap> = TOptionsBase &
  TInterpolationMap;

export type Callback = (error: any, t: TFunction) => void;

/**
 * Uses similar args as the t function and returns true if a key exists.
 */
export interface ExistsFunction<
  TKeys extends string = string,
  TInterpolationMap extends object = StringMap
> {
  (key: TKeys | TKeys[], options?: TOptions<TInterpolationMap>): boolean;
}

export interface WithT {
  // Expose parameterized t in the i18next interface hierarchy
  t: TFunction;
}

export type TFunctionResult = string | object | Array<string | object> | undefined | null;
export type TFunctionKeys = string | TemplateStringsArray;
export interface TFunction {
  // basic usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string,
  ): TResult;
  // overloaded usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string,
  ): TResult;
}

export interface Resource {
  [language: string]: ResourceLanguage;
}

export interface ResourceLanguage {
  [namespace: string]: ResourceKey;
}

export type ResourceKey =
  | string
  | {
      [key: string]: any;
    };

export interface Interpolator {
  init(options: InterpolationOptions, reset: boolean): undefined;
  reset(): undefined;
  resetRegExp(): undefined;
  interpolate(str: string, data: object, lng: string, options: InterpolationOptions): string;
  nest(str: string, fc: (...args: any[]) => any, options: InterpolationOptions): string;
}

export class ResourceStore {
  constructor(data: Resource, options: InitOptions);

  public data: Resource;
  public options: InitOptions;

  /**
   * Gets fired when resources got added or removed
   */
  on(event: 'added' | 'removed', callback: (lng: string, ns: string) => void): void;
  /**
   * Remove event listener
   * removes all callback when callback not specified
   */
  off(event: 'added' | 'removed', callback?: (lng: string, ns: string) => void): void;
}

export interface Services {
  backendConnector: any;
  i18nFormat: any;
  interpolator: Interpolator;
  languageDetector: any;
  languageUtils: any;
  logger: any;
  pluralResolver: any;
  resourceStore: ResourceStore;
}

export interface Module {
  type: 'backend' | 'logger' | 'languageDetector' | 'postProcessor' | 'i18nFormat' | '3rdParty';
}

export type CallbackError = Error | null | undefined;
export type ReadCallback = (
  err: CallbackError,
  data: ResourceKey | boolean | null | undefined,
) => void;
export type MultiReadCallback = (err: CallbackError, data: Resource | null | undefined) => void;

/**
 * Used to load data for i18next.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'backend'` For a prototype constructor set static property.
 */
export interface BackendModule<TOptions = object> extends Module {
  type: 'backend';
  init(services: Services, backendOptions: TOptions, i18nextOptions: InitOptions): void;
  read(language: string, namespace: string, callback: ReadCallback): void;
  /** Save the missing translation */
  create?(
    languages: readonly string[],
    namespace: string,
    key: string,
    fallbackValue: string,
  ): void;
  /** Load multiple languages and namespaces. For backends supporting multiple resources loading */
  readMulti?(
    languages: readonly string[],
    namespaces: readonly string[],
    callback: MultiReadCallback,
  ): void;
  /** Store the translation. For backends acting as cache layer */
  save?(language: string, namespace: string, data: ResourceLanguage): void;
}

/**
 * Used to detect language in user land.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'languageDetector'` For a prototype constructor set static property.
 */
export interface LanguageDetectorModule extends Module {
  type: 'languageDetector';
  init(services: Services, detectorOptions: object, i18nextOptions: InitOptions): void;
  /** Must return detected language */
  detect(): string | readonly string[] | undefined;
  cacheUserLanguage(lng: string): void;
}

/**
 * Used to detect language in user land.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'languageDetector'` For a prototype constructor set static property.
 */
export interface LanguageDetectorAsyncModule extends Module {
  type: 'languageDetector';
  /** Set to true to enable async detection */
  async: true;
  init(services: Services, detectorOptions: object, i18nextOptions: InitOptions): void;
  /** Must call callback passing detected language */
  detect(callback: (lng: string | readonly string[] | undefined) => void): void;
  cacheUserLanguage(lng: string): void;
}

/**
 * Used to extend or manipulate the translated values before returning them in `t` function.
 * Need to be a singleton object.
 */
export interface PostProcessorModule extends Module {
  /** Unique name */
  name: string;
  type: 'postProcessor';
  process(value: string, key: string, options: TOptions, translator: any): string;
}

/**
 * Override the built-in console logger.
 * Do not need to be a prototype function.
 */
export interface LoggerModule extends Module {
  type: 'logger';
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export interface I18nFormatModule extends Module {
  type: 'i18nFormat';
}

export interface ThirdPartyModule extends Module {
  type: '3rdParty';
  init(i18next: i18n): void;
}

export interface Modules {
  backend?: BackendModule;
  logger?: LoggerModule;
  languageDetector?: LanguageDetectorModule | LanguageDetectorAsyncModule;
  i18nFormat?: I18nFormatModule;
  external: ThirdPartyModule[];
}

// helper to identify class https://stackoverflow.com/a/45983481/2363935
export type Newable<T> = { new (...args: any[]): T };

export interface i18n {
  // Expose parameterized t in the i18next interface hierarchy
  t: TFunction;

  /**
   * The default of the i18next module is an i18next instance ready to be initialized by calling init.
   * You can create additional instances using the createInstance function.
   *
   * @param options - Initial options.
   * @param callback - will be called after all translations were loaded or with an error when failed (in case of using a backend).
   */
  init(callback?: Callback): Promise<TFunction>;
  init(options: InitOptions, callback?: Callback): Promise<TFunction>;

  loadResources(callback?: (err: any) => void): void;

  /**
   * The use function is there to load additional plugins to i18next.
   * For available module see the plugins page and don't forget to read the documentation of the plugin.
   *
   * Accepts a class or object
   */
  use<T extends Module>(
    module: T | Newable<T> | ThirdPartyModule[] | Newable<ThirdPartyModule>[],
  ): i18n;

  /**
   * List of modules used
   */
  modules: Modules;

  /**
   * Internal container for all used plugins and implementation details like languageUtils, pluralResolvers, etc.
   */
  services: Services;

  /**
   * Internal container for translation resources
   */
  store: ResourceStore;

  /**
   * Uses similar args as the t function and returns true if a key exists.
   */
  exists: ExistsFunction;

  /**
   * Returns a resource data by language.
   */
  getDataByLanguage(lng: string): { translation: { [key: string]: string } } | undefined;

  /**
   * Returns a t function that defaults to given language or namespace.
   * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
   * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
   */
  getFixedT(lng: string | readonly string[], ns?: string | readonly string[]): TFunction;
  getFixedT(lng: null, ns: string | readonly string[]): TFunction;

  /**
   * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
   * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
   */
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>;

  /**
   * Is set to the current detected or set language.
   * If you need the primary used language depending on your configuration (supportedLngs, load) you will prefer using i18next.languages[0].
   */
  language: string;

  /**
   * Is set to an array of language-codes that will be used it order to lookup the translation value.
   */
  languages: readonly string[];

  /**
   * Loads additional namespaces not defined in init options.
   */
  loadNamespaces(ns: string | readonly string[], callback?: Callback): Promise<void>;

  /**
   * Loads additional languages not defined in init options (preload).
   */
  loadLanguages(lngs: string | readonly string[], callback?: Callback): Promise<void>;

  /**
   * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
   */
  reloadResources(
    lngs?: string | readonly string[],
    ns?: string | readonly string[],
    callback?: () => void,
  ): Promise<void>;
  reloadResources(lngs: null, ns: string | readonly string[], callback?: () => void): Promise<void>;

  /**
   * Changes the default namespace.
   */
  setDefaultNamespace(ns: string): void;

  /**
   * Returns rtl or ltr depending on languages read direction.
   */
  dir(lng?: string): 'ltr' | 'rtl';

  /**
   * Exposes interpolation.format function added on init.
   */
  format: FormatFunction;

  /**
   * Will return a new i18next instance.
   * Please read the options page for details on configuration options.
   * Providing a callback will automatically call init.
   * The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).
   */
  createInstance(options?: InitOptions, callback?: Callback): i18n;

  /**
   * Creates a clone of the current instance. Shares store, plugins and initial configuration.
   * Can be used to create an instance sharing storage but being independent on set language or namespaces.
   */
  cloneInstance(options?: InitOptions, callback?: Callback): i18n;

  /**
   * Gets fired after initialization.
   */
  on(event: 'initialized', callback: (options: InitOptions) => void): void;

  /**
   * Gets fired on loaded resources.
   */
  on(event: 'loaded', callback: (loaded: boolean) => void): void;

  /**
   * Gets fired if loading resources failed.
   */
  on(event: 'failedLoading', callback: (lng: string, ns: string, msg: string) => void): void;

  /**
   * Gets fired on accessing a key not existing.
   */
  on(
    event: 'missingKey',
    callback: (lngs: readonly string[], namespace: string, key: string, res: string) => void,
  ): void;

  /**
   * Gets fired when resources got added or removed.
   */
  on(event: 'added' | 'removed', callback: (lng: string, ns: string) => void): void;

  /**
   * Gets fired when changeLanguage got called.
   */
  on(event: 'languageChanged', callback: (lng: string) => void): void;

  /**
   * Event listener
   */
  on(event: string, listener: (...args: any[]) => void): void;

  /**
   * Remove event listener
   * removes all callback when callback not specified
   */
  off(event: string, listener?: (...args: any[]) => void): void;

  /**
   * Gets one value by given key.
   */
  getResource(
    lng: string,
    ns: string,
    key: string,
    options?: Pick<InitOptions, 'keySeparator' | 'ignoreJSONStructure'>,
  ): any;

  /**
   * Adds one key/value.
   */
  addResource(
    lng: string,
    ns: string,
    key: string,
    value: string,
    options?: { keySeparator?: string; silent?: boolean },
  ): i18n;

  /**
   * Adds multiple key/values.
   */
  addResources(lng: string, ns: string, resources: any): i18n;

  /**
   * Adds a complete bundle.
   * Setting deep param to true will extend existing translations in that file.
   * Setting overwrite to true it will overwrite existing translations in that file.
   */
  addResourceBundle(
    lng: string,
    ns: string,
    resources: any,
    deep?: boolean,
    overwrite?: boolean,
  ): i18n;

  /**
   * Checks if a resource bundle exists.
   */
  hasResourceBundle(lng: string, ns: string): boolean;

  /**
   * Returns a resource bundle.
   */
  getResourceBundle(lng: string, ns: string): any;

  /**
   * Removes an existing bundle.
   */
  removeResourceBundle(lng: string, ns: string): i18n;

  /**
   * Current options
   */
  options: InitOptions;

  /**
   * Is initialized
   */
  isInitialized: boolean;

  /**
   * Emit event
   */
  emit(eventName: string): void;
}

declare const i18next: i18n;
export default i18next;

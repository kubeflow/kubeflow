/**
 * Export I18n APIs
 */
export declare class I18n {
    /**
     * @static
     * @method
     * Configure I18n part
     * @param {Object} config - Configuration of the I18n
     */
    static configure(config: any): any;
    static getModuleName(): string;
    /**
     * @static
     * @method
     * Create an instance of I18n for the library
     */
    static createInstance(): void;
    /**
     * @static @method
     * Explicitly setting language
     * @param {String} lang
     */
    static setLanguage(lang: any): any;
    /**
     * @static @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */
    static get(key: any, defVal?: any): any;
    /**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {String} langurage - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */
    static putVocabulariesForLanguage(language: any, vocabularies: any): any;
    /**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */
    static putVocabularies(vocabularies: any): any;
    static checkConfig(): boolean;
}
/**
 * @deprecated use named import
 */
export default I18n;

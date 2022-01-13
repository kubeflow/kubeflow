import { I18nOptions } from './types';
/**
 * Language transition class
 */
export declare class I18n {
    /**
     * @private
     */
    _options: I18nOptions;
    /**
     * @private
     */
    _lang: any;
    /**
     * @private
     */
    _dict: {};
    /**
     * @constructor
     * Initialize with configurations
     * @param {Object} options
     */
    constructor(options: I18nOptions);
    /**
     * @method
     * Explicitly setting language
     * @param {String} lang
     */
    setLanguage(lang: string): void;
    /**
     * @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */
    get(key: any, defVal?: any): any;
    /**
     * @method
     * Get value according to specified language
     * @param {String} key
     * @param {String} language - Specified langurage to be used
     * @param {String} defVal - Default value
     */
    getByLanguage(key: any, language: any, defVal?: any): any;
    /**
     * @method
     * Add vocabularies for one language
     * @param {String} language - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */
    putVocabulariesForLanguage(language: any, vocabularies: any): void;
    /**
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */
    putVocabularies(vocabularies: any): void;
}

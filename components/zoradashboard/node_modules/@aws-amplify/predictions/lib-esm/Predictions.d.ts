import { PredictionsOptions, TranslateTextInput, TranslateTextOutput, TextToSpeechInput, ProviderOptions, TextToSpeechOutput, SpeechToTextInput, SpeechToTextOutput, IdentifyTextInput, IdentifyTextOutput, IdentifyLabelsOutput, IdentifyLabelsInput, IdentifyEntitiesInput, IdentifyEntitiesOutput, InterpretTextOutput, InterpretTextInput } from './types';
import { AbstractPredictionsProvider } from './types/Providers';
export declare class PredictionsClass {
    private _options;
    private _convertPluggables;
    private _identifyPluggables;
    private _interpretPluggables;
    /**
     * Initialize Predictions with AWS configurations
     * @param {PredictionsOptions} options - Configuration object for Predictions
     */
    constructor(options: PredictionsOptions);
    getModuleName(): string;
    /**
     * add plugin/pluggable into Predictions category
     * @param {Object} pluggable - an instance of the plugin/pluggable
     **/
    addPluggable(pluggable: AbstractPredictionsProvider): void;
    /**
     * Get the plugin object
     * @param providerName - the name of the plugin
     */
    getPluggable(providerName: string): AbstractPredictionsProvider;
    /**
     * Remove the plugin object
     * @param providerName - the name of the plugin
     */
    removePluggable(providerName: string): void;
    /**
     * To make both top level providers and category level providers work with same interface and configuration
     * this method duplicates Predictions config into parent level config (for top level provider) and
     * category level config (such as convert, identify etc) and pass both to each provider.
     */
    configure(options: PredictionsOptions): void;
    interpret(input: InterpretTextInput, options?: ProviderOptions): Promise<InterpretTextOutput>;
    convert(input: TranslateTextInput, options?: ProviderOptions): Promise<TranslateTextOutput>;
    convert(input: TextToSpeechInput, options?: ProviderOptions): Promise<TextToSpeechOutput>;
    convert(input: SpeechToTextInput, options?: ProviderOptions): Promise<SpeechToTextOutput>;
    identify(input: IdentifyTextInput, options?: ProviderOptions): Promise<IdentifyTextOutput>;
    identify(input: IdentifyLabelsInput, options?: ProviderOptions): Promise<IdentifyLabelsOutput>;
    identify(input: IdentifyEntitiesInput, options?: ProviderOptions): Promise<IdentifyEntitiesOutput>;
    private getPluggableToExecute;
    private getAllProviders;
    private configurePluggable;
    private implementsConvertPluggable;
    private implementsIdentifyPluggable;
    private implementsInterpretPluggable;
}
export declare const Predictions: PredictionsClass;

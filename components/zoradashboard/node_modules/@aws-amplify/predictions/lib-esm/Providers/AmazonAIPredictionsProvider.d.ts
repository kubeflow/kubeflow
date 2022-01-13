import { AbstractPredictionsProvider } from '../types/Providers';
import { TranslateTextInput, TextToSpeechInput, SpeechToTextInput, PredictionsOptions, IdentifyTextInput, IdentifyTextOutput, IdentifyLabelsInput, IdentifyLabelsOutput, IdentifyEntitiesInput, IdentifyEntitiesOutput, TranslateTextOutput, TextToSpeechOutput, SpeechToTextOutput, InterpretTextInput, InterpretTextOutput } from '../types';
export declare class AmazonAIPredictionsProvider extends AbstractPredictionsProvider {
    private convertProvider;
    private identifyProvider;
    private interpretProvider;
    constructor();
    getCategory(): string;
    getProviderName(): string;
    configure(config: PredictionsOptions): PredictionsOptions;
    interpret(input: InterpretTextInput): Promise<InterpretTextOutput>;
    convert(input: TranslateTextInput | TextToSpeechInput | SpeechToTextInput): Promise<TextToSpeechOutput | TranslateTextOutput | SpeechToTextOutput>;
    identify(input: IdentifyTextInput | IdentifyLabelsInput | IdentifyEntitiesInput): Promise<IdentifyTextOutput | IdentifyLabelsOutput | IdentifyEntitiesOutput>;
}
/**
 * @deprecated use named import
 */
export default AmazonAIPredictionsProvider;
